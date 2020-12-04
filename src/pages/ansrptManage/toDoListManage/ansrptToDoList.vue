<template>
    <div>
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    待办事项
                </p>
                <RadioGroup v-model="type"
                            slot="extra"
                            @on-change="getAllData">
                    <Radio :label="item.paramCode"
                           v-for="(item,index) in toDoType"
                           :key="index">{{item.paramInfoCn}}</Radio>
                </RadioGroup>
                <Row class="divContent">
                    <div>
                        <Spin fix
                              size="large"
                              v-if="isSpin">
                            <!--<div>数据加载中...</div>-->
                        </Spin>
                        <div class="inpGroup"
                             style="margin-bottom: 10px">
                            <Input v-model="dbcdTitle"
                                   placeholder="请输入待办标题"
                                   type="text"
                                   class="table_search_int" />
                            <Button class="table_search_btn"
                                    type="primary"
                                    style="width: 56px"
                                    :loading="isSpin"
                                    @click="getAllData">
                                <span v-show="!isSpin">查询</span>
                            </Button>
                            <RadioGroup v-model="clStatus"
                                        @on-change="getAllData">
                                <Radio v-for="(item, index) in dataType"
                                       :key="index"
                                       :label="item.key">{{item.value}}</Radio>
                            </RadioGroup>
                        </div>
                        <div :style="{height: rowHeight + 'px'}"
                             class="toDoContent">
                            <div v-for="(item, index) in toDoAllData"
                                 :key="index"
                                 class="dataClass"
                                 @click="doAnsrpt(item)">
                                <span v-if="item.dbcdTitle">
                                    {{item.dbcdTitle}}
                                </span>
                                <span v-if="item.apblTitlecn">
                                    {{item.apblTitlecn}}
                                </span>
                            </div>
                        </div>
                        <Row type="flex"
                             class="page">
                            <Page :total="total"
                                  size="small"
                                  show-elevator
                                  show-sizer
                                  :current='page'
                                  :page-size="rows"
                                  placement="top"
                                  @on-page-size-change="sizeChange"
                                  @on-change="pageChange"
                                  :page-size-opts="[10, 20, 50, 100]">
                            </Page>
                            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                            <Button size="small"
                                    shape="circle"
                                    icon="md-refresh"
                                    class="refresh"
                                    @click="refresh">
                            </Button>
                        </Row>
                    </div>
                </Row>
            </card>
            </Col>
        </Row>
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
                              :homePageFiltering="homePageFiltering"
                              :clStatus="clStatus"
                              isType="toDoList">
            </commonFlowUpdate>
        </transition>
    </div>
</template>

<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLoginSenior, getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, getCookie, getUrlKey } from '@/lib/util'
import commonFlowUpdate from './commonFlowUpdate'
import Bus from '@/lib/bus'
export default {
    data () {
        return {
            rowHeight: document.body.offsetHeight - 174 - 32 - 15 - 32,
            userTodoKey: '',
            toDoAllData: [],
            fID: '',
            isSpin: true,
            id: '',
            openTestUpd: false,
            displayHide: true,
            flowId: '',
            pkValue: '',
            aprdBillid: '',
            aprdApprover: '',
            aprvrelaApproverid: '',
            aprvrelaRecordidAll: '',
            aprvStepid: '',
            aprvrelTitle: '',
            stop: true,
            flowNew: '', // 流程id
            dbcdType: '',
            clStatus: '01hand',//数据状态
            dataType: [
                {
                    key: '01hand',
                    value: '未处理'
                },
                {
                    key: '02processed',
                    value: '已处理'
                }
            ],
            //分页
            total: NaN,
            page: 1,
            rows: 10,
            // page过滤
            homePageFiltering: '',
            // 单选参数
            toDoType: [],
            type: '01all',
            // 查询字段
            dbcdTitle: '',
            // 华夏会签字段
            dbcdHqtype: ''
        }
    },
    props: {
    },
    computed: {
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
        const t = this
        t.getSelect()
        t.getAllData()
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
        getAllDataMain () { },
        clearAllToDoList () {
            console.log("clearAllToDoList")
        },
        getAllData () {
            const t = this
            t.isSpin = true
            t.toDoAllData = []
            const data = {
                _mt: this.$global.mt + 'PubDbrecd.getPage',
                APpage: t.page,
                AProws: t.rows,
                APorder: 'desc',
                APsort: 'id',
                APffk: '0',
                clStatus: t.clStatus,
            }
            if (t.type !== '01all') {
                data.dbcdType = t.type
            }
            if (t.dbcdTitle) {
                data.dbcdTitle = t.dbcdTitle
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.total = res.data.content[0].records
                    this.toDoAllData = res.data.content[0].rows
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
        doAnsrpt (item) {
            const t = this
            t.flowId = item.flowId
            t.pkValue = item.dataId
            t.aprdBillid = item.aprdAprvid
            t.aprvrelaRecordidAll = item.recdId
            t.stepId = Number(item.stepId)
            t.funId = item.funId
            t.aprvStepid = item.aprvStepid
            t.aprvrelaApproverid = item.recUserId
            t.aprvrelTitle = item.dbcdTitle
            t.dbcdType = item.dbcdType
            t.dbcdHqtype = item.dbcdHqtype
            t.getFuncData(item.funId)
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
            t.openTestUpd = false;
            t.getAllData()
        },
        getAllDataList () {
            const t = this
            t.toDoAllData = []
            t.getAllData()
        },
        // 分页
        //改变rows
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getAllData();
        },
        //改变page
        pageChange (page) {
            const t = this;
            t.page = page;
            t.getAllData();
        },
        // 刷新
        refresh () {
            const t = this;
            t.page = 1;
            t.rows = 10;
            t.total = NaN;
            t.clStatus = '01hand';
            t.dbcdType = '02approval';
            t.dbcdTitle = '';
            t.getAllData();
        }
    },
}
</script>

<style lang="scss" scoped>
.toDoContent {
    overflow: auto;
}
.dataClass {
    height: 40px;
    line-height: 40px;
    margin-bottom: -1px;
    padding-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.dataClass:nth-child(2n + 1) {
    background-color: #f8f8f9;
    border-top: 1px solid #ededed !important;
}
.dataClass:hover {
    cursor: pointer;
}
.page {
    padding-top: 10px;
    border-top: 1px solid #e5e5e5 !important;
}
.refresh {
    margin-left: 10px;
}
.inpGroup {
    font-size: 0;
    .table_search_int {
        width: 200px;
        font-size: 12px;
    }
    .table_search_btn {
        font-size: 12px;
        margin: 0 10px;
    }
}
/deep/ .ivu-card-extra {
    top: 10px;
}
</style>
