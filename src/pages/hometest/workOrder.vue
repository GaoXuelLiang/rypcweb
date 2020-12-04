<template>
    <i-col class="col"
           span="24">
        <Card :bordered="false">
            <p slot="title"
               class="title">
                <Icon type="ios-paper"></Icon>
                <span style="margin-left: 5px;">
                    {{$t('lang_homePage.order.mine')}}</span>
            </p>
            <!-- <a href="#" slot="extra" >
        <Icon type="ios-more" size="18" />
      </a> -->
            <div class="inner">
                <div class="inner-tit">
                    <div @click="goMore(peopleNum[0],2)"
                         :class="{pointer: peopleNum[0] != 0 }"
                         style="color:#41b4fa;">
                        <span>{{peopleNum[0]}} </span>
                        {{$t('lang_homePage.order.back')}}
                        <!-- 待反馈 -->
                    </div>
                    <div @click="goMore(peopleNum[1],3)"
                         :class="{pointer: peopleNum[1] != 0 }"
                         style="color:#ff9911;">
                        <span>{{peopleNum[1]}}</span>
                        {{$t('lang_homePage.order.new')}}
                        <!-- 今日新增 -->
                    </div>
                    <div @click="goMore(peopleNum[2],4)"
                         :class="{pointer: peopleNum[2] != 0 }"
                         style="color:#64d673;">
                        <span>{{peopleNum[2]}}</span>
                        {{$t('lang_homePage.order.dis')}}
                        <!-- 今日处理 -->
                    </div>
                </div>
                <ul>
                    <li class="inner-tab">
                        <span>{{$t('lang_homePage.order.no')}}</span>
                        <span>{{$t('lang_homePage.order.type')}}</span>
                        <span>{{$t('lang_homePage.order.peo')}}</span>
                    </li>
                    <li v-for="(item, index) in list"
                        :key='index'
                        @click="clickHandleing(item)">
                        <span>{{item.cmwdCode}}</span>
                        <span>{{item.cmwdTypeDis}}</span>
                        <span>{{item.cmwdAuthorDis}}</span>
                    </li>
                    <li v-if="isMore"
                        @click="showMore()"
                        style="text-align:right;width:90%;color:#179dfc;display: inline-block;">{{$t('lang_homePage.new.more')}}>></li>
                </ul>
            </div>
        </Card>
        <update v-show="showUpdate"
                ref="update"
                @close=close></update>
    </i-col>
</template>
<script>
import { getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccess, getCookie } from '../../lib/util'
import update from './orderMore'
export default {
    data () {
        return {
            list: [],
            peopleNum: '',
            isMore: false,
            showUpdate: false,
        }
    },
    components: {
        update
    },
    mounted () {
        this.getData()
        this.getDataPeo()
    },
    methods: {
        getData () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'CmutWorkorder.getPage',
                APsort: "id",
                APorder: "desc",
                AProws: 10,
                APpage: 1,
                handleStatus: 3
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.list = res.data.content[0].rows || []
                    if (t.list.length > 7) {
                        t.list = t.list.slice(0, 6)
                        t.isMore = true
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getDataPeo () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'CmutWorkorder.getOrderCount',
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.peopleNum = res.data.content[0].value.split(',')
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        showMore () {
            const t = this
            t.$nextTick(() => {
                t.$refs.update.getData(3)
            })
            t.showUpdate = true
        },
        close () {
            this.showUpdate = false
        },
        goMore (num, type) {
            const t = this
            if (num == 0) {
                return
            } else {
                t.$nextTick(() => {
                    t.$refs.update.getData(type)
                })
                t.showUpdate = true
            }
        },
        //点击到工单处理中的详情
        clickHandleing (item) {
            const t = this
            //根据code获取id 360200
            const data = {
                _mt: this.$global.mt + 'SysFunctions.getFunByCode',
                APfunCode: '360200',
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.id = res.data.content[0].id
                    const tag = {
                        title: '工单服务处理',
                        path: '/handleWorkOrder',
                        name: 'handleWorkOrder',
                        query: { id: t.id, code: '360200', state: true },
                    }
                    this.$router.push({
                        path: 'handleWorkOrder', query: {
                            id: t.id,
                            code: '360200',
                            state: true
                        }
                    })
                    this.$store.commit('increateTag', tag)
                    t.$store.commit('workOrder/setHandleItem', 'handleing')
                    t.openUp(item)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        //打开沟通详情
        openUp (row) {
            const t = this
            t.getFirstAttachData(row)
            t.$store.commit('workOrder/setHandleClick', row)
            t.$store.commit('workOrder/setHandleDetail', false)
            t.$store.commit('workOrder/setIsYesHandle', true)
            t.$store.commit('workOrder/setIsCommit', false)
        },
        //获取第一条沟通记录的附件信息
        getFirstAttachData (pRow) {
            const t = this
            if (pRow.cmwdAttach) {
                let attachData = pRow.cmwdAttach.split('|')
                let resAttch = []
                let fileType = ''
                for (let x = 0; x < attachData.length; x++) {
                    const t = this
                    let data = {
                        _mt: this.$global.mt + 'UserInfo.getfiletoken',
                        APisprivate: true,
                        APfilekey: attachData[x].split(':')[1],
                        APexpiresecs: 180,
                    }
                    getDataLevelUserLoginData(data).then((res) => {
                        if (isSuccess(res, t)) {
                            resAttch.push({
                                kname: attachData[x].split(':')[0],
                                vname: attachData[x].split(':')[1],
                                kType: attachData[x].split(':')[0].split('.')[1],
                                upUrl: pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(attachData[x].split(':')[1]),
                            })
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
                pRow.cmwdAttach = resAttch
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.inner {
    height: 400px;
    .inner-tit {
        display: flex;
        div {
            flex: 1;
            line-height: 38px;
            vertical-align: middle;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
                display: block;
                font-weight: bold;
                font-size: 36px;
            }
        }
    }
    .inner-tab {
        background: #e3e3e3;
        height: 40px;
        line-height: 40px;
    }
    .inner-tab:hover {
        color: unset;
    }
    li {
        display: flex;
        text-align: center;
        vertical-align: middle;
        height: 36px;
        line-height: 36px;
        margin-bottom: 6px;
        font-size: 12px;
        cursor: pointer;
        span {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    li:hover {
        color: #2d8cf0;
    }
    .pointer {
        cursor: pointer;
    }
}
</style>
