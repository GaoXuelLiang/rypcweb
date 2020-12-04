<template>
    <div class="table">
        <Row>
            <i-Col span='24'>
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        期间考勤记录
                    </p>
                    <Row>
                        <span @dblclick="clearPeriod">
                            <Input @on-click="pickDataPeriod"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择期间"
                                   style="width: 200px"
                                   v-model="sicalcPeriodDis" />
                        </span>
                        <Input placeholder="请输入员工姓名"
                               style="width: 180px"
                               v-model="requestCode" />
                        <!--<span @dblclick="dbHCompany">-->
                        <!--<Input v-model="positionCompDis" style="width: 180px"  icon="ios-search" :readonly="true" placeholder="请选择公司"  @on-click="selectHCompany"/>-->
                        <!--</span>-->
                        <!--<span @dblclick="clearDepart">-->
                        <!--<Input v-model="positionDeptDis" style="width: 180px"  icon="ios-search" :readonly="true" placeholder="请选择部门"  @on-click="pickDepart"/>-->
                        <!--</span>-->
                        <!--<DatePicker type="date" :clearable='false' placeholder="日期" :editable="false" v-model="startTime" style="width: 180px"></DatePicker>-->
                        <!--<DatePicker type="date" :clearable='true' placeholder="结束时间" :editable="false" v-model="endTime" style="width: 180px"></DatePicker>-->

                        <Button type="primary"
                                :loading="isSpin"
                                @click="getList(1)">{{$t('button.ser')}}</Button>
                        <Button type="primary"
                                @click='busAccount'>核算</Button>
                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table @on-sort-change="sortable"
                               :height="tableheight"
                               size="small"
                               border
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
    </div>
</template>

<script>
import searchFyperiod from '../../../components/searchTable/searchFyperiod'
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import advanced from '@/components/searchTable/searchAdvanced'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'attendancePeriodRecord',
    data () {
        return {
            isSpin: false,
            rows: 10,
            page: 1,
            sort: 'id', // 排序字段
            order: 'asc', // 排序类型
            requestCode: '', // 员工
            openPickPeriod: false, // 期间弹出
            showAdvanced: false,
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
                    title: this.$t('lang_employee.searchColumn.compCnFullName'),
                    key: 'compFnameCnDis',
                },
                {
                    title: this.$t('lang_employee.searchColumn.compEnFullName'),
                    key: 'compFnameEnDis',
                },
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
                {
                    title: '考勤结果',
                    key: 'attSfrdResultDis',
                    width: 140,
                    sortable: 'custom',
                },
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
                    width: 160,
                },
                {
                    title: '实走打卡地点',
                    key: 'attSfrdRealoffloc',
                    width: 160,
                },
                {
                    title: '是否外勤打卡',
                    key: 'attSfrdIsoutDis',
                    width: 160,
                },
            ],
            total: 0,
            data: [],
            logType: '',
            index: 0,
            tableheight: document.body.offsetHeight - 250, // table高度
            comp: '',
            isSend: false,
            jobQueueId: '',
        }
    },
    components: {
        searchFyperiod,
        searchHCompany,
        searchDept,
        advanced,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.sicalcPeriodDis = ''
            t.requestCode = ''
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
        /*
        *  点击分页
        * */
        refresh () {
            this.getData(1)
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
                attEmpsfPeriod: t.sicalcPeriodDis,
                //          attSfrdWorkdate: t.startTime,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    t.data.forEach((item, idx) => {
                        item.imgSrc = 'https://www.baidu.com/img/bd_logo1.png?qua=high'
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
            t.dbDept()
        },
        // 选择部门
        pickDepart () {
            console.log(444)
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
                _mt:  this.$global.mt+'AttendShiftrecord.monthAccounting',
                funId: '1',
                logType: '期间核算',
                attSfrdEmpDis: t.requestCode,
                attEmpsfPeriod: t.sicalcPeriodDis,  // 期间
            }
            if (!data.attSfrdEmpDis) delete data.attSfrdEmpDis
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
    }
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
</style>
