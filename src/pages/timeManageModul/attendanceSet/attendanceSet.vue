<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    班次时间管理
                </p>
                <Row>
                    <Col span="20"
                         style="width:100% !important;">
                    <Row class="btnHeight">
                        <span>
                            <Input placeholder="请输入班次编号"
                                   style="width: 200px"
                                   v-model="form.attShifCode" />
                        </span>
                        <span>
                            <Input placeholder="请输入班次名称"
                                   style="width: 200px"
                                   v-model="form.attShifName" />
                        </span>
                        <span style="margin: 0;"><Button type="info"
                                    :loading="isSpin"
                                    @click="search()">{{$t('button.ser')}}</Button></span>
                        <Button type="warning"
                                v-if="AccessControl.toString().includes('button_add')"
                                @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
                        <Button type="error"
                                v-if="AccessControl.toString().includes('button_del')"
                                @click="deletemsg">{{$t('button.del')}}</Button>
                        <Button type="primary"
                                v-if="AccessControl.toString().includes('button_copygroup')"
                                @click="showMsgBtn">复制集团</Button>
                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
                               @on-sort-change="sortable"
                               :height="tableheight"
                               size="small"
                               stripe
                               ref="selection"
                               :columns="columns"
                               :data="data"></Table>
                    </row>
                    <Row style="display: flex">
                        <Row style="display: flex">
                            <Page :total="total"
                                  size="small"
                                  show-elevator
                                  show-sizer
                                  placement="top"
                                  :current="page"
                                  @on-page-size-change="sizeChange"
                                  @on-change="pageChange"
                                  :page-size-opts="[10, 20, 50, 100]">
                            </Page>
                            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                        </Row>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="refresh"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :logType="logType"
                    @closeUpd="closeUpd"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <!-- 复制集团 -->
        <transition name="fade">
            <staffPage v-show="showMsg"
                       :logType="logType"
                       ref="staffPage"
                       @getData="getData"
                       @hideMsg="hideMsg"></staffPage>
        </transition>
    </div>
</template>
<script>
import staffPage from './staffPage'
import update from './update.vue'
import advanced from '@/components/searchTable/searchAdvanced'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'attendanceSet',
    components: {
        staffPage,
        update,
        advanced,
    },
    data () {
        return {
            showMsg: false,
            isSpin: false,
            openSearchNormActive: false,
            showAdvanced: false,
            tableheight: document.body.offsetHeight - 250,
            logType: '',
            openUpdate: false,
            tableselected: [],
            form: {
                id: '',
                attShifName: '', // 班次编号
                attShifCode: '', // 班次
            },
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '班次编号',
                    key: 'attShifCode',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '班次名称',
                    key: 'attShifName',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '公司',
                    key: 'attShifHircompanyDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '上班时间',
                    key: 'attShifSworktime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '下班时间',
                    key: 'attShifEworktime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '上班上限（分）',
                    key: 'attShifUpstime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '下班下限（分）',
                    key: 'attShifDownetime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '午休开始时间',
                    key: 'attShifmorningoff',
                    sortable: 'custom',
                    width: 140,
                },
                {
                    title: '午休结束时间',
                    key: 'attShifAfternoonwork',
                    sortable: 'custom',
                    width: 140,
                },
                {
                    title: '下班卡开始时间',
                    key: 'attShifOutchktime',
                    sortable: 'custom',
                    width: 140,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    fixed: 'right',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                style: {
                                    // display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                                    display: params.row.attShifCode !== 'BC00001' ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                style: {
                                    //                    marginRight: '5px',
                                    display: params.row.attShifCode === 'BC00001' ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.view'))
                                    },
                                },
                            }, this.$t('button.view')),
                        ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            AccessControl: [],
        }
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.form.attShifCode = ''
            t.form.attShifName = ''
            t.getData(1)
        }
    },
    methods: {
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
            })
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        refresh () {
            this.getData()
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'AttendShift.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: t.$t('button.ser'),
                attShifCode: t.form.attShifCode,
                attShifName: t.form.attShifName + '&&1',
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.data = [];
            t.total = 0;
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    this.btnControl(this).then((res1) => {
                        if (isSuccess(res1, t)) {
                            res1.data.content[0].value.forEach((item) => {
                                t.AccessControl.push(item.btnLancode)
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 新增修改后刷新页面
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
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
                            _mt:  this.$global.mt+'AttendShift.delByIds',
                            funId: '1',
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
            t.openUpdate = true
            t.logType = logType
            t.index = index
            // 获取编号
            if (logType === this.$t('button.add')) {
                t.$refs.update.getCode()
            }
            if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
                t.$refs.update.getData(id)
            }
        },
        closeUpd () {
            const t = this
            t.openUpdate = false
        },
        search () {
            this.page = 1
            this.getData()
        },
        /**
         * @name: 复制集团
         * @param {type} 
         * @return: 
         */
        showMsgBtn () {
            const t = this
            t.showMsg = true
            t.logType = '复制集团'
            t.$refs.staffPage.getData()
        },
        hideMsg () {
            let t = this
            t.showMsg = false
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.ivu-input-wrapper,
.ivu-btn {
    margin-right: 5px;
}
</style>
