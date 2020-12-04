<template>
    <div class="card_box">
        <Card :bordered="false"
              class="card">
            <p slot="title"
               class="title">
                <!-- <Icon type="md-notifications"></Icon> -->
                <span class="title-tip"></span>
                <span>{{$t('lang_homePage.toDoList.title')}}</span>
            </p>
            <RadioGroup v-model="type"
                        slot="extra"
                        @on-change="getMainData">
                <Radio :label="item.paramCode"
                       v-for="(item,index) in toDoType"
                       :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
            <div class="block">
                <Spin fix
                      v-if="isSpin"></Spin>
                <span></span>
                <div class="block_row"
                     v-for="(item, index) in toDoData"
                     :key="index"
                     @click="doAnsrpt(item)">
                    <div class="dbTitle">
                        <Icon type="md-radio-button-on"
                              class="dbIcon" />
                        {{item.dbcdTitle}}
                    </div>
                    <div class="dbButton">
                        {{$t('button.view')}}
                    </div>
                </div>
                <div @click="lookAllToDoList"
                     style="position: absolute;bottom: 30px;right: 30px;color:#179dfc;cursor: pointer;">
                    {{$t('lang_homePage.new.more')}}>>
                </div>
            </div>
        </Card>
        <Modal v-model="openTestUpd"
               :width="0"
               :height="0"
               :closable="false"
               :footer-hide="true">
            <transition name="fade">
                <commonFlowUpdate v-if="openTestUpd"
                                  @close="closeTest"
                                  @getAllDataMain="getAllDataMain"
                                  ref="commonFlowUpdate"
                                  :pkValue="pkValue"
                                  :flowId="flowId"
                                  :stepId="stepId"
                                  :funId="funId"
                                  :aprvrelaRecordidAll="aprvrelaRecordidAll"
                                  :aprvrelTitle="aprvrelTitle"
                                  :aprvrelaApproverid="aprvrelaApproverid"
                                  :aprvStepid="aprvStepid"
                                  :dbcdType="dbcdType"
                                  :dbcdHqtype="dbcdHqtype"
                                  :clStatus="clStatus"
                                  isType="toDoList">
                </commonFlowUpdate>
            </transition>
        </Modal>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginData
} from '@/axios/axios'
import {
    isSuccess, getCookie,
} from '@/lib/util'
import commonFlowUpdate from '../ansrptManage/toDoListManage/commonFlowUpdate'
import Bus from '@/lib/bus'
export default {
    data () {
        return {
            userTodoKey: '',
            fID: '',
            toDoData: [],
            toDoDataAll: [],
            approval: [],
            isSpin: false,
            id: '',
            aprvrelTitle: '',
            openTestUpd: false,
            flowId: '',
            pkValue: '',
            aprdBillid: '',
            aprdApprover: '',
            aprvrelaApproverid: '',
            aprvrelaRecordidAll: '',
            aprvrelaStepidAll: '',
            aprvStepid: '',
            stop: true,
            toDoType: [],
            type: '01all',
            dbcdType: '',
            dbcdHqtype: '',
            // page页过滤
            homePageFiltering: '',
            clStatus: '01hand'
        }
    },
    computed: {
        roleType () {
            return this.$store.state.user.roleType
        },
        disabled () {
            let rtn = false;
            if (this.dbcdType === '02approval') rtn = true;
            return rtn;
        }
    },
    components: {
        commonFlowUpdate,
    },
    mounted () {
        this.getSelect();
        this.getMainData();
    },
    methods: {
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'To-doCategory',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value[0].paramList.length > 0) {
                        t.toDoType = res.data.content[0].value[0].paramList;
                    }
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getAllDataMain () {
            this.getMainData()
        },
        getMainData () {
            const t = this;
            t.isSpin = true;
            t.toDoData = [];
            const data = {
                _mt: this.$global.mt + 'PubDbrecd.getPage',
                APpage: 1,
                AProws: 10,
                APorder: 'desc',
                APsort: 'id',
                APffk: '0',
                clStatus: '01hand'
            }
            if (t.type !== '01all') {
                data.dbcdType = t.type
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].rows.length > 0) {
                        this.toDoData = res.data.content[0].rows
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false
            })
        },
        lookAllToDoList () {
            const tag = {
                title: '待办事项',
                path: '/ansrptToDoList',
                name: 'ansrptToDoList',
            }
            this.$store.commit('increateTag', tag)
            this.$router.push({ path: '/ansrptToDoList', query: { state: true } })
        },
        doAnsrpt (item) {
            const t = this
            t.flowId = item.flowId
            t.pkValue = item.dataId
            t.aprdBillid = item.dataId
            t.aprvrelaRecordidAll = item.recdId
            t.stepId = Number(item.stepId)
            t.funId = item.funId
            t.aprvStepid = item.aprvStepid
            t.aprvrelaApproverid = item.recUserId
            t.aprvrelTitle = item.dbcdTitle
            t.dbcdType = item.dbcdType
            t.dbcdHqtype = item.dbcdHqtype
            t.getFuncData(item.funId)
            // t.openTestUpd = true
            if (item.dbcdType) {
                if (item.dbcdType.trim() === '04inform') {
                    getDataLevelUserLoginData({
                        _mt: t.$global.mt + 'PubDbrecd.addOrUpd',
                        APlogType: '告知',
                        id: item.id,
                        clStatus: '02processed',
                        gzStatus: 'isRead'
                    }).then(res => {
                        if (isSuccess(res, t)) {
                            this.getMainData();
                        }
                    })
                }
            }
        },
        // 获取流程节点数据 
        getFuncData (funId) {
            const t = this;
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'SysFunctions.getById',
                APid: funId,
                APffk: '0'
            }).then(res => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    t.homePageFiltering = data.funPageTerm;
                    t.openTestUpd = true
                }
            })
        },
        closeTest () {
            const t = this
            t.openTestUpd = false
        },
    },
    watch: {
        roleType (value) {
            const t = this
            t.toDoDataAll = []
            t.getMainData()
        },
        $lang (value) {
            this.isSpin = true
        },
    },
}

</script>

<style lang="scss" scoped>
.card_box {
    width: 100%;
    height: 100%;
    .card {
        width: 100%;
        height: 100%;
    }
}
.block {
    font-size: 12px;
    // height: 280px;
    height: 425px;
    overflow-y: auto;
    overflow-x: hidden;
    .block_row {
        height: 52px;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;
        line-height: 36px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #f0f2f5;
        // padding-bottom: 5px;
        // margin: 5px 0;
        // .icon {
        //     line-height: 36px;
        //     position: absolute;
        // }
        .dbIcon {
            font-size: 16px;
            margin-right: 10px;
        }
        .dbTitle {
            width: 80%;
            // padding-left: 20px;
            padding-right: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .dbButton {
            border-radius: 10px;
            color: #999999;
            border: 1px solid #cccccc;
            width: 10%;
            text-align: center;
            line-height: 20px;
        }
        // .dbButton:hover {
        //     color: red;
        //     border: 1px solid red;
        // }
    }
    .block_row:hover {
        color: #2d8cf0;
    }
}
.title {
    display: flex;
    justify-content: start;
    align-items: center;
}
/deep/ .ivu-card-extra {
    top: 8px;
}
</style>
