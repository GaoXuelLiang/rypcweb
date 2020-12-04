<template>
    <div class="table">
        <Row>
            <Col name="body"
                 span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    员工排班查询
                </p>
                <Row class="btnHeight">
                    <span @dblclick="clearTeam">
                        <Input @on-click="pickDataTeam"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="请选择班组"
                               style="width: 200px"
                               v-model="sicalcTeamDis" />
                    </span>
                    <span @dblclick="clearPeriod">
                        <!--<Input @on-click="pickDataPeriod"  icon="ios-search" :readonly="true"-->
                        <!--placeholder="请选择期间"-->
                        <!--style="width: 200px" v-model="sicalcPeriodDis"/>-->

                        <DatePicker type="date"
                                    placeholder="开始时间"
                                    style="width: 200px"
                                    v-model="startTime"></DatePicker>
                        <DatePicker type="date"
                                    placeholder="结束时间"
                                    style="width: 200px"
                                    v-model="endTime"></DatePicker>
                    </span>
                    <span style="margin: 0;"><Button type="info"
                                :loading="isSpin"
                                @click="getData(1)">{{$t('button.ser')}}</Button></span>
                    <Button type="primary"
                            v-if="AccessControl.toString().includes('button_export')"
                            @click="expData">{{$t('button.exp')}}</Button>
                    <!-- <Button v-if="AccessControl.toString().includes('button_autosche')" type="primary" @click='autoAtt'>自动排班</Button> -->
                    <!--<Button type="primary" @click="allAtt">批量排班</Button>-->
                    <!-- <Button type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button> -->
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
                    <Page :total="total"
                          size="small"
                          show-elevator
                          show-sizer
                          placement="top"
                          :current="page"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                    <Button size="small"
                            shape="circle"
                            icon="md-refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="getData(1)"></Button>
                </Row>
                <!--<Spin v-if="loading" fix></Spin>-->
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    :attEmpsfPeriod='sicalcPeriod'
                    :qijian='qijian'
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!--选择期间-->
        <transition name="fade">
            <searchFyperiod v-show="openPickPeriod"
                            @closeUp="closePeriod"
                            @changeinput="changeinputPeriod"
                            ref="searchFyperiod"></searchFyperiod>
        </transition>
        <!--选择班组-->
        <transition name="fade">
            <searchFyteam v-show="openPickTeam"
                          @closeUp="closeTeam"
                          @changeinput="changeinputTeam"
                          ref="searchFyteam"></searchFyteam>
        </transition>
        <!--导出-->
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       :logType="logType"
                       :index="index"
                       @closeExp="closeExp"
                       ref="expwindow"></expwindow>
        </transition>
        <transition>
            <expdow v-show="openExpDow"
                    :filekey="filekey"
                    :filename="filename"
                    @closeExpDowMain="closeExpDowMain"
                    ref="expdow"></expdow>
        </transition>
    </div>
</template>
<script>
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import update from './paySalplanView'
import searchFyperiod from '../../../components/searchTable/searchFyperiod'
import searchFyteam from '../../../components/searchTable/searchFyteam'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import Bus from '../../.././lib/bus'

export default {
    name: 'attendanceStasff',
    data () {
        return {
            openExpDow: false, // 导出
            openExp: false, // 导出
            filekey: '', // 导出
            filename: '', // 导出
            expDataTital: [
                { code: 'attRddlPeriod', name: '期间' },
                { code: 'attTmmemEmpidDis', name: '员工姓名' },
                { code: 'attTmmemCompidDis', name: '公司' },
                { code: 'attTmmemDeptidDis', name: '部门' },
                { code: 'attTeamName', name: '班组名称' },
                { code: 'attRddlDate', name: '排班日期' },
                { code: 'attShifName', name: '班次名称' },
                { code: 'attShifSworktime', name: '上班时间' },
                { code: 'attShifEworktime', name: '下班时间' },
            ], // 导出
            isSpin: false,
            openPickPeriod: false, // 期间弹出
            sicalcPeriod: '',
            sicalcPeriodDis: '',
            // 开始时间
            startTime: '',
            // 结束时间
            endTime: '',
            openPickTeam: false, // 班组弹出
            sicalcTeam: [],
            sicalcTeamDis: '',
            tableheight: document.body.offsetHeight - 250,
            value: '',
            logType: '',
            loading: false,
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            isFperiod: true,
            hackReset: true,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    //            align: 'center',
                },
                {
                    title: '期间',
                    key: 'attRddlPeriod',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '员工姓名',
                    key: 'attTmmemEmpidDis',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '公司',
                    key: 'attTmmemCompidDis',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '部门',
                    key: 'attTmmemDeptidDis',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '班组名称',
                    key: 'attTeamName',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '排班日期',
                    key: 'attRddlDate',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '班次名称',
                    key: 'attShifName',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '上班时间',
                    key: 'attShifSworktime',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: '下班时间',
                    key: 'attShifEworktime',
                    width: 140,
                    //            sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 120,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    //                    icon: 'calendar',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '5px',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, '排班明细', params.index, params.row.attRddlPeriod, params.row.attTmmemEmpid)
                                    },
                                },
                            }, '排班明细'),
                        ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'attRddlDate',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1000',
            salplPeriod: '',
            salplSalset: '',
            qijian: '',
            AccessControl: [],
        }
    },
    computed: {},
    components: {
        expwindow,
        expdow,
        update,
        searchFyperiod,
        searchFyteam,
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
            t.sicalcPeriodDis = ''
            // 开始
            t.startTime = ''
            t.endTime = ''
            // t.sicalcPeriod = ''
            t.sicalcTeam = ''
            t.sicalcTeamDis = ''
            t.data = []
            t.total = 0
            // t.getData(1)
        }
    },
    methods: {
        // 默认不查询，选了班组查询班组下面的排班
        getData (page, value) {
            const t = this
            if (!t.sicalcTeam.length) {
                t.$Message.warning('请选择班组')
                return
            }
            if (!t.startTime && !t.startTime) {
                t.$Message.warning('请选择开始时间或结束时间')
                return
            }
            if (page) {
                t.page = page
            }
            const data = {
                // _mt:  this.$global.mt+'AttendEmpshift.getPage',
                _mt:  this.$global.mt+'ViewEmpshifts.getPageForComplexQuery',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                // attEmpsfPeriod: t.sicalcPeriodDis,
                // attEmpsfTeamid: t.sicalcTeam ? t.sicalcTeam.join(',') : '',
                teamid: t.sicalcTeam ? t.sicalcTeam.join(',') : '',
                QSdate: t.startTime,
                QEdate: t.endTime,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.QSdate !== undefined) {
                data.QSdate = data.QSdate === '' ? '' : new Date(data.QSdate).format('yyyy-MM-dd')
            }
            if (data.QEdate !== undefined) {
                data.QEdate = data.QEdate === '' ? '' : new Date(data.QEdate).format('yyyy-MM-dd')
            }
            t.isSpin = true
            t.data = []
            t.total = 0
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
        init () {
            const t = this
            if (t.salplPeriod === '' || t.salplSalset === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_payroll.paySalplan.error'),
                })
            } else {
                t.loading = true
                const data = {
                    _mt:  this.$global.mt+'PaySalplan.init',
                    logType: '初始化',
                    salplYear: t.salplYear,
                    salplPeriod: t.salplPeriod,
                    salplSalset: t.salplSalset,
                }
                for (const dat in data) {
                    if (data[dat] === '') {
                        delete data[dat]
                    }
                }
                getDataLevelUserLoginNew(data).then((res) => {
                    t.loading = false
                    if (isSuccess(res, t)) {
                        t.getData()
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        getPeriod1 (value) {
            //        console.log(value)
            //        console.log(this.selectFperiod)
            //        this.salplPeriod = value
            this.hackReset = false
            this.$nextTick(() => {
                this.hackReset = true
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
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'asc'
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
                            _mt:  this.$global.mt+'AttendEmpshift.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            ids: t.tableselected.toString(),
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
                    onCancel: () => {
                    },
                })
            }
        },
        confirm (id) {
            const t = this
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: this.$t('lang_payroll.paySalplan.confirm'),
                onOk: () => {
                    getDataLevelUserLoginNew({
                        _mt:  this.$global.mt+'PaySalplan.addOrUpd',
                        logType: '提交',
                        id: id,
                        salplStatus: '02confirm',
                    }).then((res) => {
                        if (isSuccess(res, t)) {
                            t.getData()
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                },
                onCancel: () => {
                },
            })
        },
        open () {
            const t = this
            t.opendialog = true
        },
        openUp (id, logType, index, PeriodDiss, attTmmemEmpid) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            // t.$refs.update.getSelect()
            // t.$refs.update.TransformationMode(2)
            if (logType === '排班明细') {
                t.$refs.update.getTime(id, PeriodDiss, attTmmemEmpid)
                // t.$refs.update.getDetail(attTmmemEmpid, PeriodDiss) // 6.16
            }
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.planId = ''
            // t.$refs.update.formValidate = ''
        },
        // 期间弹出框start
        clearPeriod () {
            const t = this
            t.sicalcPeriodDis = ''
            t.sicalcPeriod = ''
        },
        pickDataPeriod () {
            const t = this
            this.$refs.searchFyperiod.getData()
            this.openPickPeriod = true
        },
        closePeriod () {
            const t = this
            t.openPickPeriod = false
        },
        changeinputPeriod (row) {
            const t = this
            t.sicalcPeriodDis = row.fypdPeriod
            t.sicalcPeriod = row.id
        },
        // 轮次弹出框start
        clearTeam () {
            const t = this
            t.sicalcTeamDis = ''
            t.sicalcTeam = ''
        },
        pickDataTeam () {
            const t = this
            this.$refs.searchFyteam.getData()
            this.openPickTeam = true
        },
        closeTeam () {
            const t = this
            t.openPickTeam = false
        },
        changeinputTeam (arrDis, arr) {
            const t = this
            t.sicalcTeamDis = arrDis.join(',')
            t.sicalcTeam = arr
        },
        // 自动排班
        autoAtt () {
            const t = this
            //        if (t.sicalcPeriodDis === '') {
            //          t.$Modal.warning({
            //            title: this.$t('reminder.remind'),
            //            content: '请选择期间',
            //          })
            //          return
            //        }
            // 开始时间 结束时间
            t.startTime = new Date(t.startTime).format('yyyy-MM-dd')
            t.endTime = new Date(t.endTime).format('yyyy-MM-dd')
            if (t.startTime === 'NaN-aN-aN' || t.endTime === 'NaN-aN-aN') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择开始时间和结束时间',
                })
                return
            }
            if (t.sicalcTeam.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择班组',
                })
                return
            }
            const data = {
                _mt:  this.$global.mt+'AttendEmpshift.automaticScheduling',
                funId: '1',
                logType: '自动排班',
                //          attEmpsfPeriod: t.sicalcPeriodDis,
                // 开始时间
                fypdStartdate: t.startTime,
                // 结束数据
                fypdEnddate: t.endTime,
                attEmpsfTeamid: t.sicalcTeam ? t.sicalcTeam.join(',') : '',
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '确认自动排班',
                onOk: () => {
                    getDataLevelUserLoginNew(data).then((res) => {
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
                onCancel: () => {
                },
            })
        },
        // 批量排班
        //      allAtt() {
        //        const t = this
        //        // 开始时间 结束时间
        //        t.startTime = new Date(t.startTime).format('yyyy-MM-dd')
        //        t.endTime = new Date(t.endTime).format('yyyy-MM-dd')
        //        if (t.startTime === 'NaN-aN-aN' || t.endTime === 'NaN-aN-aN') {
        //          t.$Modal.warning({
        //            title: this.$t('reminder.remind'),
        //            content: '请选择开始时间和结束时间',
        //          })
        //          return
        //        }
        //        t.openUp(null, '批量排班')
        //      },
        // 导出
        expData () {
            const t = this
            const data = {
                // attEmpsfTeamid: t.sicalcTeam ? t.sicalcTeam.join(',') : '',
                // startTime: t.startTime,
                // endTime: t.endTime,
                teamid: t.sicalcTeam ? t.sicalcTeam.join(',') : '',
                QSdate: t.startTime,
                QEdate: t.endTime,
            }
            if (data.QSdate) {
                data.QSdate = new Date(data.QSdate).format('yyyy-MM-dd')
            }
            if (data.QEdate) {
                data.QEdate = new Date(data.QEdate).format('yyyy-MM-dd')
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'ViewEmpshifts.export', data)
            this.openExp = true
        },
        closeExp () {
            const t = this
            t.openExp = false
        },
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
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
.ivu-date-picker,
.ivu-btn {
    margin-right: 5px;
}
</style>
