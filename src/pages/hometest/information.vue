<template>
    <i-col class="col"
           span="12">
        <Card :bordered="false">
            <p slot="title"
               class="title">
                <Icon type="md-text"></Icon>
                <span style="margin-left: 5px;">{{$t('lang_homePage.msg.show')}}</span>
            </p>
            <!-- <a href="#" slot="extra">
        <Icon type="ios-more" size="18" />
      </a> -->
            <div class="inner">
                <div class="inner-tit">
                    <span :class="{active_color:isActive == 1}"
                          @click="change(1)">{{$t('lang_homePage.new.news')}}</span>
                    <span :class="{active_color:isActive == 2}"
                          @click="change(2)">{{$t('lang_homePage.new.laws')}}</span>
                </div>
                <ul>
                    <li v-for="(item, index) in noteList"
                        :key="index"
                        @click="goDetails(item.id)">
                        <Icon type="volume-low"
                              color='#ff990f'
                              style='font-size: 20px;vertical-align: middle;'></Icon>
                        <span>{{isActive == 1 ? item.cmutNoticeTitle : item.cmutKldTitle }}</span>
                    </li>
                    <li v-if="isMore"
                        @click="goMore()"
                        style="text-align:right;width:90%;color:#179dfc;font-size: 12px;">{{$t('lang_homePage.new.more')}}>></li>
                </ul>
            </div>
        </Card>
        <update v-show="openUpdate"
                @close="close"
                ref="update"></update>
        <inforMore v-show="showMore"
                   ref="inforMore"
                   @closeMore=closeMore></inforMore>
    </i-col>
</template>
<script>
import { getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccess, getCookie, } from '../../lib/util'
import update from './inforUpdate.vue'
import inforMore from './inforMore'
export default {
    data () {
        return {
            isActive: 1,
            noteList: [],
            openUpdate: false,
            showMore: false,
            isMore: false,
        }
    },
    mounted () {
        this.getData()
    },
    components: {
        update,
        inforMore
    },
    methods: {
        getData () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'CmutNotic.getPage',
                APsort: "id",
                APorder: "desc",
                AProws: 10,
                APpage: 1,
                cmutNoticeState: "02valid",
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    let value = res.data.content[0].rows
                    if (value.length > 4) {
                        t.isMore = true
                        t.noteList = value.slice(0, 4) || []
                    } else {
                        t.noteList = value
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getDataLaws () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'CmutKnowledge.getByRules',
                APlogType: '查询政策法规',
                APKnowCode: '185',
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let value = JSON.parse(res.data.content[0].value)
                        if (value.length > 4) {
                            t.isMore = true
                            t.noteList = value.slice(0, 4) || []
                        } else {
                            t.noteList = value
                        }
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        change (type) {
            const t = this
            if (type == 1) {
                t.noteList = []
                t.isMore = false
                t.isActive = 1
                t.getData()
            } else {
                t.noteList = []
                t.isMore = false
                t.isActive = 2
                t.getDataLaws()
            }
        },
        // 详情展示
        goDetails (id) {
            const t = this
            if (id) {
                t.openUpdate = true
                t.$refs.update.getData(id, t.isActive)
            }
        },
        close () {
            this.openUpdate = false
        },
        // 更多
        goMore () {
            const t = this
            t.showMore = true
            console.log(t.isActive)
            t.$refs.inforMore.getData(t.isActive)
        },
        closeMore () {
            this.showMore = false
        },
    }
}
</script>

<style lang="scss" scoped>
.inner {
    height: 220px;
    .inner-tit {
        span {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            vertical-align: middle;
            text-align: center;
            width: 30%;
            border: 1px solid #179dfc;
            border-radius: 3px;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .active_color {
            color: #fff;
            background-color: #179dfc;
            border: none;
        }
    }
    ul {
        margin-top: 5px;
        padding: 10px 0 10px 10px;
        li {
            margin-bottom: 15px;
            cursor: pointer;
            span {
                margin-left: 10px;
                font-size: 12px;
                width: 80%;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: middle;
            }
        }
        li:hover {
            color: #2d8cf0;
        }
    }
}
</style>
