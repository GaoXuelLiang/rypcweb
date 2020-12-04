<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_flow.flow.title')}}
                </p>
                <Row class="btnHeight">
                    <Input class="searchInput"
                           :placeholder="$t('lang_flow.flow.flowName')"
                           style="width: 200px"
                           v-model="flowName" />
                    <Dropdown>
                        <Button type="primary">
                            {{statusDis}}
                            <Icon type="md-arrow-dropdown"
                                  size="18"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <span v-for="(item,index) in dropdownMenuList"
                                  :key="index"
                                  @click="getPageByState(item.paramCode,item.paramInfoCn)">
                                <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                            </span>
                        </DropdownMenu>
                    </Dropdown>
                    <span style="margin: 0;"><Button style="width:56px" type="info"
                                :loading="isSpin"
                                @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
                    <Button type="warning"
                            v-show="flowStatus === '' || flowStatus === '01draft'"
                            @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                    <Button type="success"
                            v-show="flowStatus === '02valid'"
                            @click="modifystatu('01draft')">{{$t('status.draft')}}</Button>
                    <Button type="primary"
                            v-show="flowStatus === '01draft' || flowStatus === '03invalid'"
                            @click="modifystatu('02valid')">{{$t('status.valid')}}</Button>
                    <Button type="error"
                            v-show="flowStatus === '02valid'"
                            @click="modifystatu('03invalid')">{{$t('status.invalid')}}</Button>
                    <Button type="error"
                            v-show="flowStatus === '01draft' || flowStatus === '03invalid'"
                            @click="deletemsg">{{$t('button.del')}}</Button>
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Table stripe
                           :loading="loading"
                           :height="tableheight"
                           :no-data-text="noDataImg"
                           @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-sort-change="sortable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           size="small"
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :total="total"
                          size="small"
                          show-elevator
                          show-sizer
                          :current="page"
                          placement="top"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                            shape="circle"
                            icon="md-refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="getData(1)"></Button>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    ref="update"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"></update>
        </transition>
        <flowchart @closeUp="close"
                   v-show="flowchart"
                   ref="flowchart"
                   logType="流程图编辑"></flowchart>
        <flowchat-view @closeUp="closeView"
                       v-show="flowchartView"
                       ref="flowchartView"
                       logType="流程图编辑"></flowchat-view>
    </div>
</template>
<script>
import flowchart from './flowchat/flowchat.vue'
import flowchatView from "./flowchat/flowchatView";
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import update from './flowchat/editPlatFlow.vue'


export default {
    name: ' platFlowListNew',
    data () {
        return {
            loading: false,
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            noDataImg: '<div id="noData"></div>',
            value: '',
            statusDis: this.$t('status.valid'),
            logType: '流程图编辑',
            openUpdate: false,
            flowchart: false,
            flowchartView: false,
            updateId: NaN,
            flowchartId: NaN,
            dropdownMenuList: [],
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_flow.flow.flowCode'),
                    key: 'flowCode',
                    //            width: 120,
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_flow.flow.flowName'),
                    key: 'flowName',
                    //          width: 150,
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_flow.flow.flowFormtype'),
                    key: 'flowFormtypeDis',
                    //          width: 150,
                },
                {
                    title: this.$t('lang_flow.flow.flowForm'),
                    key: 'flowFormDis',
                    //          width: 150,
                },
                {
                    title: this.$t('lang_flow.flow.flowVersion'),
                    key: 'flowVersion',
                    //          width: 150,
                },
                {
                    title: this.$t('lang_flow.flow.flowStatus'),
                    key: 'flowStatusDis',
                    //          width: 150,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    fixed: 'right',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '10px',
                                    display: params.row.flowStatus === '01draft' ? 'none' : 'inline',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.view'))
                                    },
                                },
                            }, this.$t('button.view')),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '10px',
                                    display: params.row.flowStatus !== '01draft' ? 'none' : 'inline',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'))
                                    },
                                },
                            }, this.$t('button.y.upd')),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    // marginRight: '10px',
                                    display: params.row.flowStatus !== '01draft' ? 'none' : 'inline',
                                },
                                on: {
                                    click: () => {
                                        this.open(params.row.id)
                                    },
                                },
                            }, this.$t('lang_flow.flow.flowSetting')),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                style: {
                                    // marginRight: '5px',
                                    display: params.row.flowStatus === '01draft' ? 'none' : 'inline',
                                },
                                on: {
                                    click: () => {
                                        this.openView(params.row.id)
                                    },
                                },
                            }, '流程查看'),
                        ])
                    },
                },
            ],
            data: [],
            total: NaN, // 总页数
            index: 0,
            companyId: 1,
            sort: 'flowCode',
            order: 'asc',
            rows: 10,
            page: 1,
            select: '已生效',
            name: '',
            flowStatus: '02valid',
            flowName: '',
        }
    },
    computed: {

    },
    components: {
        update,
        flowchart,
        flowchatView,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.flowName = ''
            t.statusDis = this.$t('status.valid')
            t.flowStatus = '02valid'
            t.getData(1)
            t.getSelect()
        }
    },
    methods: {
        getData (page) {
            const t = this;
            t.loading = true;
            t.isSpin = true;
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'PlatFlow.getPage',
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                funId: '1',
                logType: '查询List',
                flowStatus: t.flowStatus,
                name: t.name,
                flowName: t.flowName,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
                t.isSpin = false;
            })
        },
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.page = page
            t.getData()
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        deletemsg () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.confirmdelete'),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt:  this.$global.mt+'PlatFlow.delByIds',
                            funId: '1',
                            companyId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
                            }
                        }).catch(() => {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        })
                    },
                    onCancel: () => { },
                })
            }
        },
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
                t.$refs.update.getData(t.updateId)
            }
        },
        open (id) {
            const t = this
            t.flowchart = true
            t.$refs.flowchart.states = 'update'
            t.$refs.flowchart.getListById(id)
        },
        openView (id) {
            const t = this
            t.flowchartView = true
            t.$refs.flowchartView.states = 'update'
            t.$refs.flowchartView.getListById(id)
        },
        close () {
            const t = this
            t.flowchart = false
        },
        closeView () {
            const t = this
            t.flowchartView = false
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.clear()
        },
        addNewArray (res) {
            const t = this
            if (t.data.length === 0) {
                t.data.push(res)
            } else {
                t.data.unshift(res)
            }
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        // 获取下拉状态
        getSelect () {
            const t = this
            t.dropdownMenuList = []
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'pubuserstatus',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.dropdownMenuList = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        /**
         * 状态的更改
         * @param paramCode
         * @param paramInfoName
         */
        getPageByState (paramCode, paramInfoName) {
            const t = this
            if (paramCode === '00all') {
                t.flowStatus = ''
            } else {
                t.flowStatus = paramCode
            }
            t.getData(1)
            t.statusDis = paramInfoName
        },
        // 更新数据的状态
        modifystatu (state) {
            const t = this
            let logType = ''
            if (state === '02valid') {
                logType = '生效'
            } else if (state === '03invalid') {
                logType = '失效'
            } else if (state === '01draft') {
                logType = '编辑中'
            }
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'PlatFlow.modifystatus',
                    logType: logType,
                    status: state,
                    ids: t.tableselected.toString(),
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.getData(1)
                        t.$Modal.success({
                            title: this.$t('reminder.suc'),
                            content: '操作完成',
                        })
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.table-form {
    margin: 10px 0;
}
.margin-right-10 {
    margin-right: 10px;
}
//
@import "../../../sass/table.scss";
.searchInput {
    margin-right: 5px;
}
.ivu-btn {
    margin-right: 5px;
}
/deep/ .ivu-table-cell {
    padding: 0 10px;
}
// /deep/ .ivu-table-cell {
//   padding: 0 5px 0 10px;
// }
</style>
