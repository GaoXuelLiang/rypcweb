<template>
    <div class="table">
        <Row>
            <i-Col span='24'>
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        考勤日报管理
                    </p>
                    <Row class="btnHeight">
                        <DatePicker :value="value2"
                                    v-model="startTime"
                                    format="yyyy/MM/dd"
                                    type="daterange"
                                    placement="top-start"
                                    placeholder="选择开始日期和结束日期"
                                    style="width: 200px"></DatePicker>
                        <span @dblclick="dbHCompany">
                            <Input v-model="positionCompDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择公司"
                                   @on-click="selectHCompany" />
                        </span>
                        <span @dblclick="clearData">
                            <Input v-model="attSfrdTeamidDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择班组"
                                   @on-click="selectOpen" />
                        </span>
                        <Input placeholder="请输入员工姓名"
                               style="width: 200px"
                               v-model="requestCode" />
                        <!--<span @dblclick="clearDepart">-->
                        <!--<Input v-model="positionDeptDis" style="width: 180px"  icon="ios-search" :readonly="true" placeholder="请选择部门"  @on-click="pickDepart"/>-->
                        <!--</span>-->
                        <!--<DatePicker type="date" :clearable='true' placeholder="结束时间" :editable="false" v-model="endTime" style="width: 180px"></DatePicker>-->

                        <Button type="info"
                                :loading="isSpin"
                                @click="getList(1)">{{$t('button.ser')}}</Button>
                        <Button type="primary"
                                v-if="AccessControl.toString().includes('button_dispo')"
                                @click='autoAccount'>自动处理</Button>
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
                        <Table @on-sort-change="sortable"
                               @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
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
                  ref="advanced"></advanced>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         :dataParame=dataParame
                         dataType="row"
                         @changeinput="changeinput1"
                         urlType="loginNew">
        </autoSearchtable>
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
import searchHCompany from '../../../components/searchTable/searchHCompany'
import advanced from '@/components/searchTable/searchAdvanced'
import searchDept from '../../../components/searchTable/searchDept'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'attendanceSingleRecord',
    data () {
        return {
            openExpDow: false, // 导出
            openExp: false, // 导出
            filekey: '', // 导出
            filename: '', // 导出
            expDataTital: [
                { code: 'attSfrdEmpDis', name: '员工' },
                { code: 'attSfrdCompidDis', name: '公司' },
                { code: 'attSfrdDeptidDis', name: '部门' },
                { code: 'attSfrdEmpno', name: '员工工号' },
                { code: 'attSfrdWorkdate', name: '考勤日期' },
                { code: 'attSfrdTeamidDis', name: '班组名称' },
                { code: 'attSfrdShiftidDis', name: '班次名称' },
                { code: 'attSfrdChkintime', name: '上班时间' },
                { code: 'attSfrdOffwork', name: '下班时间' },
                { code: 'attSfrdRealintime', name: '实到时间' },
                { code: 'attSfrdRealofftime', name: '实走时间' },
                { code: 'attSfrdRealinloc', name: '实到打卡地点' },
                { code: 'attSfrdRealoffloc', name: '实走打卡地点' },
            ], // 导出
            showModal: false,
            selectType: '',
            modiaContent: 'time-attendteam-std',
            dataParame: {},
            isSpin: false,
            rows: 10,
            page: 1,
            sort: 'id', // 排序字段
            order: 'asc', // 排序类型
            requestCode: '', // 员工
            startTime: '', // 开始时间
            endTime: '', // 结束时间
            //      雇佣公司
            openHCompany: false,
            showAdvanced: false,
            value2: [],
            AccessControl: [],
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
                    title: this.$t('lang_employee.searchColumn.departCnFullName'),
                    key: 'compFnameCnDis',
                },
                {
                    title: this.$t('lang_employee.searchColumn.departEnFullName'),
                    key: 'compFnameEnDis',
                },
            ],
            paramsDept: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1106',
                logType: '部门',
                unitType: '70dept',
            },
            positionCompDis: '',
            positionDeptDis: '',
            positionComp: '',
            positionDept: '',
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left',
                },
                {
                    title: '员工',
                    key: 'attSfrdEmpDis',
                    width: 100,
                    sortable: 'custom',
                    fixed: 'left',
                },
                {
                    title: '公司',
                    key: 'attSfrdCompidDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '部门',
                    key: 'attSfrdDeptidDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '员工工号',
                    key: 'attSfrdEmpno',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '考勤日期',
                    key: 'attSfrdWorkdate',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '班组名称',
                    key: 'attSfrdTeamidDis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '班次名称',
                    key: 'attSfrdShiftidDis',
                    width: 140,
                    sortable: 'custom',
                },
                // {
                //   title: '考勤结果',
                //   key: 'attSfrdResultDis',
                //   width: 140,
                //   sortable: 'custom',
                // },
                {
                    title: '上班时间',
                    key: 'attSfrdChkintime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '下班时间',
                    key: 'attSfrdOffwork',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '实到时间',
                    key: 'attSfrdRealintime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '实走时间',
                    key: 'attSfrdRealofftime',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '实到打卡地点',
                    key: 'attSfrdRealinloc',
                    width: 140,
                },
                {
                    title: '实走打卡地点',
                    key: 'attSfrdRealoffloc',
                    width: 140,
                },
            ],
            attSfrdTeamidDis: '',
            attSfrdTeamid: '',
            total: 0,
            data: [],
            tableselected: [],
            logType: '',
            comp: '',
            index: 0,
            tableheight: document.body.offsetHeight - 250, // table高度

        }
    },
    components: {
        expwindow,
        expdow,
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
            t.startTime = ''
            t.requestCode = ''
            t.positionCompDis = ''
            t.positionComp = ''
            t.attSfrdTeamidDis = ''
            t.attSfrdTeamid = ''
            t.data = []
            t.total = 0
            t.AccessControl = []
            // t.getData(1)
            t.getColumns()
        }
    },
    methods: {
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
            const t = this;
            if (!t.startTime) {
                t.$Message.warning('请选择日期')
                return
            }
            this.getData(page);
        },
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
            })
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'AttendShiftrecord.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                attSfrdEmpDis: t.requestCode,
                attSfrdCompid: t.positionComp,
                attSfrdTeamid: t.attSfrdTeamid,
                attSfrdWorkdate1: t.startTime[0] ? new Date(t.startTime[0]).format('yyyy-MM-dd') : '',
                attSfrdWorkdate2: t.startTime[0] ? new Date(t.startTime[1]).format('yyyy-MM-dd') : '',
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
                    // t.data.forEach((item,idx) => {
                    //   item.imgSrc = 'https://www.baidu.com/img/bd_logo1.png?qua=high'
                    // })
                    t.btnControl(this).then((res1) => {
                        if (isSuccess(res1, t)) {
                            res1.data.content[0].value.forEach((item) => {
                                t.AccessControl.push(item.btnLancode)
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
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
        getColumns () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'AttendRptitem.getListColumn',
                logType: 'getListColumn',
                type: 'day',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let aa = []
                    aa = res.data.content[0].value
                    let columns = t.columns
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
            }).catch(() => {
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
            //        t.dbDept()
        },
        // 选择部门
        pickDepart () {
            const t = this
            t.$refs.searchDept.getData(this.paramsDept)
            t.openDept = true
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
        // 核算
        busAccount () {
            const t = this
            if (!t.startTime) {
                t.$Message.warning('请选择日期')
                return
            }
            t.startTime = t.startTime === '' ? '' : new Date(t.startTime).format('yyyy-MM-dd')
            const data = {
                _mt:  this.$global.mt+'AttendShiftrecord.dailyAccounting',
                funId: '1',
                logType: '核算',
                attSfrdEmpDis: t.requestCode,
                attSfrdWorkdate: t.startTime,
            }
            if (!data.attSfrdEmpDis) delete data.attSfrdEmpDis
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Message.warning('核算成功')
                    t.getData()
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
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        // 自动处理
        autoAccount () {
            const t = this;
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
                        const data = {
                            _mt:  this.$global.mt+'AttendShiftrecord.automaticProcessing',
                            funId: '1',
                            logType: '自动处理',
                            id: this.tableselected.toString(),
                        }
                        for (const dat in data) {
                            if (data[dat] === '') {
                                delete data[dat]
                            }
                        }
                        getDataLevelUserLogin(data).then((res) => {
                            if (isSuccess(res, t)) {
                                t.comp = window.setInterval(t.countSihfCalcState, 1000)
                                t.jobQueueId = res.data.content[0].jobQueueId
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: '系统正在进行自动处理，请稍后。。。',
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
                    onCancel: () => { },
                })
            }
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
        /*
        * 弹出选择
        * */
        selectOpen () {
            const t = this
            t.dataParame = {
                attTeamHircompany: t.positionComp,
            }
            t.showModal = true
        },
        clearData () {
            const t = this
            t.attSfrdTeamidDis = ''
            t.attSfrdTeamid = ''
        },
        closeModal () {
            const t = this
            t.showModal = false
        },
        changeinput1 (row, type) {
            const t = this
            t.attSfrdTeamidDis = row.attTeamName
            t.attSfrdTeamid = row.id
        },
        // 导出
        expData () {
            const t = this
            const data = {
                attSfrdEmpDis: t.requestCode,
                attSfrdCompid: t.positionComp,
                attSfrdTeamid: t.attSfrdTeamid,
                attSfrdWorkdate1: t.startTime[0] ? new Date(t.startTime[0]).format('yyyy-MM-dd') : '',
                attSfrdWorkdate2: t.startTime[0] ? new Date(t.startTime[1]).format('yyyy-MM-dd') : '',
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'AttendShiftrecord.export', data)
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
