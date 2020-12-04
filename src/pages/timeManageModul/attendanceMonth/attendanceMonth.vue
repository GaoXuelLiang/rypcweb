<template>
    <div class="table">
        <Row>
            <i-Col span='24'>
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        考勤月报管理
                    </p>
                    <Row class="btnHeight">
                        <DatePicker type="month"
                                    placeholder="选择期间"
                                    style="width: 200px"
                                    v-model="sicalcPeriodDis"></DatePicker>
                        <!--<DatePicker type="date" :clearable='false' placeholder="日期" :editable="false" v-model="attUpdrecWorkdate" style="width: 180px"></DatePicker>-->
                        <span @dblclick="dbHCompany">
                            <Input v-model="positionCompDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择公司"
                                   @on-click="selectHCompany" />
                        </span>
                        <span @dblclick="clearDepart">
                            <Input v-model="positionDeptDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择部门"
                                   @on-click="pickDepart" />
                        </span>
                        <!--            <span @dblclick="clearPeriod">-->
                        <!--            <Input @on-click="pickDataPeriod"  icon="ios-search" :readonly="true"-->
                        <!--                   placeholder="请选择期间"-->
                        <!--                   style="width: 200px" v-model="sicalcPeriodDis"/>-->
                        <!--             </span>-->
                        <Input placeholder="请输入员工姓名"
                               style="width: 200px"
                               v-model="requestCode" />
                        <Button type="info"
                                :loading="isSpin"
                                @click="getList(1)">{{$t('button.ser')}}</Button>
                        <Button type="primary"
                                v-if="AccessControl.toString().includes('button_check')"
                                @click='busAccount'>核算</Button>
                        <Button type="primary"
                                v-if="AccessControl.toString().includes('button_export')"
                                @click="expData">{{$t('button.exp')}}</Button>
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
                                @click="refresh()"></Button>
                    </Row>
                </card>
            </i-Col>
        </Row>
        <!--选择期间-->
        <transition name="fade">
            <searchFyperiod v-show="openPickPeriod"
                            @closeUp="closePeriod"
                            @changeinput="changeinputPeriod"
                            ref="searchFyperiod"></searchFyperiod>
        </transition>
        <!--雇佣公司-->
        <transition name="fade">
            <searchHCompany v-show="openHCompany"
                            @closeHCompany="closeHCompany"
                            :searchHCClo="searchHCClo"
                            @inputHCompany="inputHCompany"
                            :params="paramsHCompany"
                            ref="searchHCompany"></searchHCompany>
        </transition>
        <!--部门-->
        <transition name="fade">
            <searchDept v-show="openDept"
                        @closeDept="closeDept"
                        :searchDeptClo="searchDeptClo"
                        @inputDept="inputDept"
                        :params="paramsDept"
                        ref="searchDept"></searchDept>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
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
import advanced from '@/components/searchTable/searchAdvanced'
import searchFyperiod from '../../../components/searchTable/searchFyperiod'
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'attendanceMonth',
    data () {
        return {
            AccessControl: [], // 按钮权限
            openExpDow: false, // 导出
            openExp: false, // 导出
            filekey: '', // 导出
            filename: '', // 导出
            isSpin: false,
            tableselected: [],
            showAdvanced: false,
            rows: 10,
            page: 1,
            sort: 'id', // 排序字段
            order: 'asc', // 排序类型
            requestCode: '', // 员工
            //        attUpdrecWorkdate: '', // 日期
            //        startTime: '', // 开始时间
            //        stopTime: '', // 结束时间
            //        attUpdrecChkintime: '', // 时间
            openPickPeriod: false, // 期间弹出
            sicalcPeriod: '',
            sicalcPeriodDis: '',
            //      雇佣公司
            openHCompany: false,
            searchHCClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '公司名称',
                    key: 'compFnameCnDis',
                },
                // {
                //   title: this.$t('lang_employee.searchColumn.compEnFullName'),
                //   key: 'compFnameEnDis',
                // },
            ],
            paramsHCompany: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                unitType: '01company,10area',
                logType: '雇佣公司',
            },
            //      部门
            openDept: false,
            searchDeptClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '部门名称',
                    key: 'compFnameCnDis',
                },
                // {
                //   title: this.$t('lang_employee.searchColumn.departEnFullName'),
                //   key: 'compFnameEnDis',
                // },
            ],
            paramsDept: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1106',
                logType: '部门',
                unitType: '70dept,20city,30busi',
            },
            positionCompDis: '',
            positionDeptDis: '',
            positionComp: '',
            positionDept: '',
            expDataTital: [
                { code: 'attMtsfrdEmpDis', name: '员工' },
                { code: 'attMtsfrdCompidDis', name: '公司' },
                { code: 'attMtsfrdDeptidDis', name: '部门' },
                { code: 'attMtsfrdEmpno', name: '员工工号' },
                { code: 'attMtsfrdPeriod', name: '考勤期间' },
            ], // 导出
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left',
                },
                {
                    title: '员工',
                    key: 'attMtsfrdEmpDis',
                    width: 100,
                    sortable: 'custom',
                    fixed: 'left',
                },
                {
                    title: '公司',
                    key: 'attMtsfrdCompidDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '部门',
                    key: 'attMtsfrdDeptidDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '员工工号',
                    key: 'attMtsfrdEmpno',
                    width: 160,
                    sortable: 'custom',
                },
                {
                    title: '考勤期间',
                    key: 'attMtsfrdPeriod',
                    width: 160,
                    sortable: 'custom',
                },
                // {
                //   title: '当前月工作日(天数)',
                //   key: 'attMtsfrdWkdays',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: '迟到(次)',
                //   key: 'attMtsfrdLate',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: '早退(次)',
                //   key: 'attMtsfrdEarly',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: '迟到且早退(次)',
                //   key: 'attMtsfrdEllt',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: '矿工天数(天)',
                //   key: 'attMtsfrdMiner',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: '未报到天数(天)',
                //   key: 'attMtsfrdNorpt',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: '已离职天数(天)',
                //   key: 'attMtsfrdDimdays',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: 'OT(150)',
                //   key: 'attMtsfrdOt150',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: 'OT(200)',
                //   key: 'attMtsfrdOt200',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: 'OT(300)',
                //   key: 'attMtsfrdOt300',
                //   width: 160,
                //   sortable: 'custom',
                // },
                // {
                //   title: '请假天数',
                //   key: 'attMtsfrdLvdays',
                //   width: 160,
                //   sortable: 'custom',
                // },
            ],
            total: 0,
            data: [],
            logType: '',
            index: 0,
            tableheight: document.body.offsetHeight - 250, // table高度
            comp: '',
            isSend: false,
            jobQueueId: '',
            AccessControl: [],
        }
    },
    components: {
        expwindow,
        expdow,
        searchFyperiod,
        searchHCompany,
        searchDept,
        advanced,
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
            t.positionComp = ''
            t.positionCompDis = ''
            t.positionDept = ''
            t.positionDeptDis = ''
            t.requestCode = ''
            t.data = [];
            t.total = 0;
            t.AccessControl = [];
            // t.getData(1)
            t.getColumns()
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
        /*
        *  点击分页
        * */
        refresh () {
            this.getData(1)
            this.getColumns()
        },
        /*
        *  获取列表
        * */
        getList (page) {
            const t = this
            if (!t.sicalcPeriodDis) {
                t.$Message.warning('请选择期间')
                return
            }
            this.getData(page);
        },
        getColumns () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'AttendRptitem.getListColumn',
                logType: 'getListColumn',
                type: 'month',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (JSON.stringify(res.data.content[0]) !== '{}') {
                        let aa = []
                        aa = res.data.content[0].value
                        let obj = {}
                        aa.forEach((item, index) => {
                            obj = {
                                title: item.attRptitName,
                                key: item.attRptitNo,
                                width: 140,
                            }
                            t.columns.push(obj)
                            t.expDataTital.push({
                                name: item.attRptitName,
                                code: item.attRptitNo,
                            })
                        })
                        t.columns = t.uniqObj(t.columns)
                        t.expDataTital = t.uniqObjExp(t.expDataTital)
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            //        if (t.attUpdrecWorkdate !== undefined) {
            //          t.attUpdrecWorkdate = t.attUpdrecWorkdate === '' ? '' : new Date(t.attUpdrecWorkdate).format('yyyy-MM-dd')
            //        }
            const data = {
                _mt:  this.$global.mt+'AttendMonthshiftrecord.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                attMtsfrdEmpDis: t.requestCode,
                attMtsfrdCompid: t.positionComp,
                attMtsfrdDeptid: t.positionDept,
                attMtsfrdPeriod: new Date(t.sicalcPeriodDis).format('yyyyMM'),
                //          attUpdrecWorkdate: t.attUpdrecWorkdate,
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
                    t.data.forEach((item, idx) => {
                        item.imgSrc = 'https://www.baidu.com/img/bd_logo1.png?qua=high'
                    })
                }
                this.btnControl(this).then((res1) => {
                    if (isSuccess(res1, t)) {
                        res1.data.content[0].value.forEach((item) => {
                            t.AccessControl.push(item.btnLancode)
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },

        /*
        *  选中table中的几项，点击删除
        * */

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
        //  	雇佣公司
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        inputHCompany (name, id) {
            const t = this
            t.positionCompDis = name
            t.positionComp = id
        },
        dbHCompany () {
            const t = this
            t.positionCompDis = ''
            t.positionComp = ''
            t.clearDepart()
        },
        // 选择部门
        pickDepart () {
            const t = this
            if (t.positionComp === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empHireCompDis'),
                })
            } else {
                const paramsDept = deepCopy(t.paramsDept)
                t.$refs.searchDept.getData(paramsDept, t.positionComp)
                t.openDept = true
            }
            // t.$refs.searchDept.getData(this.paramsDept)
            // t.openDept = true
        },
        inputDept (name, id) {
            const t = this
            t.positionDeptDis = name
            t.positionDept = id
        },
        clearDepart () {
            const t = this
            t.positionDeptDis = ''
            t.positionDept = ''
        },
        closeDept () {
            const t = this
            t.$refs.searchDept.unitCode = ''
            t.openDept = false
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
        // 核算
        busAccount () {
            const t = this
            if (!t.sicalcPeriodDis) {
                t.$Message.warning('请选择期间')
                return
            }
            const data = {
                _mt:  this.$global.mt+'AttendMonthshiftrecord.monthAccounting',
                funId: '1',
                logType: '核算',
                attMtsfrdEmpDis: t.requestCode,
                attMtsfrdCompid: t.positionComp,
                attMtsfrdDeptid: t.positionDept,
                attMtsfrdPeriod: t.sicalcPeriodDis,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.attMtsfrdPeriod !== undefined) {
                data.attMtsfrdPeriod = new Date(data.attMtsfrdPeriod).format('yyyyMM')
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.comp = window.setInterval(t.countSihfCalcState, 1000)
                    t.jobQueueId = res.data.content[0].jobQueueId
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '系统正在进行核算，请稍后。。。',
                        onOk: () => {
                            t.isSend = true
                            clearInterval(t.comp)
                        },
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        countSihfCalcState () {
            const t = this
            clearInterval(t.comp)
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'UserJobQueue.compStatusQuery',
                jobueueId: t.jobQueueId,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].status !== '100') {
                        setTimeout(() => {
                            if (!t.isSend) {
                                t.countSihfCalcState()
                            } else {
                                t.isSend = false
                            }
                        }, 1000)
                    } else {
                        t.isSend = false
                        clearInterval(t.comp)
                        t.$Modal.success({
                            title: this.$t('reminder.suc'),
                            content: this.$t('reminder.suc'),
                            onOk: () => {
                                t.isSend = false
                            },
                        })
                    }
                } else {
                    clearInterval(t.comp)
                }
            }).catch(() => {
                clearInterval(t.comp)
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        uniqObj (arr) {
            let result = []
            let obj = {}
            for (let i = 0; i < arr.length; i++) {
                if (!obj[arr[i].key]) {
                    result.push(arr[i])
                    obj[arr[i].key] = true
                }
            }
            return result
        },
        uniqObjExp (arr) {
            let result = []
            let obj = {}
            for (let i = 0; i < arr.length; i++) {
                if (!obj[arr[i].code]) {
                    result.push(arr[i])
                    obj[arr[i].code] = true
                }
            }
            return result
        },
        // 导出
        expData () {
            const t = this
            const data = {
                attMtsfrdEmpDis: t.requestCode,
                attMtsfrdCompid: t.positionComp,
                attMtsfrdDeptid: t.positionDept,
                attMtsfrdPeriod: new Date(t.sicalcPeriodDis).format('yyyyMM'),
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'AttendMonthshiftrecord.export', data)
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

<style lang='scss' scoped>
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
