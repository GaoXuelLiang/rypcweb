<template>
    <i-col class="col"
           span="24">
        <card :bordered="false">
            <p slot="title"
               class="title">
                <Icon type="md-mail"></Icon>
                <span style="margin-left: 5px;">
                    {{$t('lang_homePage.email.title')}}
                </span>
            </p>
            <!-- <a href="#" slot="extra" @click="openMa()">
        <Icon type="more" ></Icon>
      </a> -->
            <div class="block short">
                <div class="block_row"
                     v-for="(item , index) in data"
                     :key="index">
                    <Icon class="icon"
                          type="ios-copy"
                          color="#64d572"></Icon>
                    <div class="div"
                         @click="openUp(item.id, index)">{{item.mailTime}} {{item.mailObject}}</div>
                    <div style="color:#41b3f9;height:20px;width:20px;line-height:20px"
                         class="icon_end">
                        <Icon type="ios-information-circle-outline"
                              size="25" />
                    </div>
                </div>
                <div v-if="isMore"
                     @click="openMa()"
                     style="margin-top:1px;text-align:right;width:95%;color:#179dfc;cursor: pointer;">{{$t('lang_homePage.new.more')}}>></div>
            </div>
        </card>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :ty="1"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <transition name="fade">
            <manage v-if="openManage"
                    @closeMa="closeMa"
                    ref="manage"></manage>
        </transition>
    </i-col>
</template>

<script>
import { isSuccess, deepCopy } from '../../lib/util'
import { getDataLevelUserLoginNew } from '../../axios/axios'
import update from './../baseManage/emaillog-manage/emaillogView'
import manage from './../baseManage/emaillog-manage/emaillogUserManage'

export default {
    data () {
        return {
            data: [],
            value: '',
            logType: '',
            openUpdate: false,
            openManage: false,
            updateId: NaN,
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: '10',
            page: '1',
            mailTime: '',
            mailEtime: '',
            mailObject: '',
            mailTo: '',
            mailCc: '',
            mailContent: '',
            mailStatus: '',
            isMore: false,
        }
    },
    components: {
        update,
        manage,
    },
    props: {
        roleType: String,
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'BaseEmaillog.getPage',
                AProws: 6,
                APpage: 1,
                APsort: 'mailTime',
                APorder: 'desc',
                id: '1',
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    // t.data = res.data.content[0].rows
                    let value = res.data.content[0].rows
                    if (value.length > 4) {
                        t.isMore = true
                        t.data = value.slice(0, 4) || []
                    } else {
                        t.data = value
                    }
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        openUp (id, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = t.$t('lang_homePage.mailMsg.view')
            t.openUpdate = true
            t.index = index
            t.$refs.update.getData(id)
        },
        closeUp () {
            const t = this
            t.openUpdate = false
        },
        openMa () {
            const t = this
            t.openManage = true
            t.$refs.manage.setView('1')
        },
        closeMa () {
            const t = this
            t.openManage = false
        },
    },
}
</script>
<style lang="scss" scoped>
.block {
    font-size: 12px;
    height: 160px;
    // overflow-y: auto;
    // overflow-x: hidden;
    .block_row {
        height: 36px;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;
        line-height: 36px;
        .icon {
            line-height: 36px;
            position: absolute;
        }
        .div {
            padding-left: 20px;
            padding-right: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .icon_end {
            position: absolute;
            width: 24px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            border-radius: 50%;
            right: 0;
            top: 5px;
        }
    }
    .block_row:hover {
        color: #2d8cf0;
    }
}
</style>
