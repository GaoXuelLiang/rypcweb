<template>
    <div class="table">
        <Row>
            <i-Col span='24'>
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        原始记录管理
                    </p>
                    <Row class="btnHeight">
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
                        <Input placeholder="请输入员工姓名"
                               style="width: 200px"
                               v-model="requestCode" />
                        <DatePicker type="date"
                                    :clearable='true'
                                    placeholder="开始时间"
                                    :editable="false"
                                    v-model="startTime"
                                    style="width: 200px"></DatePicker>
                        <DatePicker type="date"
                                    :clearable='true'
                                    placeholder="结束时间"
                                    :editable="false"
                                    v-model="endTime"
                                    style="width: 200px"></DatePicker>

                        <span style="margin: 0;"><Button type="info"
                                    :loading="isSpin"
                                    @click="getData(1)">{{$t('button.ser')}}</Button></span>
                        <Button type="primary"
                                v-if="AccessControl.toString().includes('button_export')"
                                @click="expData">{{$t('button.exp')}}</Button>
                        <!-- <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button> -->
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
        <!--导入-->
        <!--<transition name="fade">-->
        <!--<importExcel v-show="openImport"  :imp_mt="imp_mt"  @closeImport="closeImport" ref="importExcel"></importExcel>-->
        <!--</transition>-->
    </div>
</template>

<script>
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
//  import importExcel from '../../../components/importModel/importParam'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'attendanceRecord',
    data () {
        return {
            AccessControl: [], // 按钮权限
            openExpDow: false, // 导出
            openExp: false, // 导出
            filekey: '', // 导出
            filename: '', // 导出
            expDataTital: [
                { code: 'attResrecEmpDis', name: '员工' },
                { code: 'attResrecCompidDis', name: '公司' },
                { code: 'attResrecDeptidDis', name: '部门' },
                { code: 'attResrecEmpno', name: '员工工号' },
                { code: 'attResrecWorkdate', name: '考勤日期' },
                { code: 'attResrecChkintime', name: '打卡时间' },
                { code: 'attResrecChkinloc', name: '打卡地址' },
                { code: 'attResrecRemarkDis', name: '进出标志' },
            ], // 导出
            isSpin: false,
            openImport: false,
            imp_mt:  this.$global.mt+'AttendResrecord.importData',
            rows: 10,
            page: 1,
            sort: 'id', // 排序字段
            order: 'asc', // 排序类型
            requestCode: '', // 员工
            startTime: '', // 开始时间
            endTime: '', // 结束时间
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
                //          {
                //            title: this.$t('lang_employee.searchColumn.compEnFullName'),
                //            key: 'compFnameEnDis',
                //          },
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
                //          {
                //            title: this.$t('lang_employee.searchColumn.departEnFullName'),
                //            key: 'compFnameEnDis',
                //          },
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
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left',
                },
                {
                    title: '员工',
                    key: 'attResrecEmpDis',
                    width: 120,
                    sortable: 'custom',
                    fixed: 'left',
                },
                {
                    title: '公司',
                    key: 'attResrecCompidDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '部门',
                    key: 'attResrecDeptidDis',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '员工工号',
                    key: 'attResrecEmpno',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '考勤日期',
                    key: 'attResrecWorkdate',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '打卡时间',
                    key: 'attResrecChkintime',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '打卡地址',
                    key: 'attResrecChkinloc',
                    width: 200,
                    sortable: 'custom',
                },
                {
                    title: '进出标志',
                    key: 'attResrecRemarkDis',
                    width: 140,
                    sortable: 'custom',
                },
                {
                    title: '打卡备注',
                    key: 'comment',
                    width: 140,
                },
            ],
            total: 0,
            data: [],
            logType: '',
            index: 0,
            tableheight: document.body.offsetHeight - 250, // table高度
            tableselected: [],

        }
    },
    components: {
        expwindow,
        expdow,
        searchHCompany,
        searchDept,
        //      importExcel,
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
            t.endTime = ''
            t.requestCode = ''
            t.positionDept = ''
            t.positionDeptDis = ''
            t.positionComp = ''
            t.positionCompDis = ''
            t.getData(1)
        }
    },
    methods: {
        /*
        *  导入
        * */
        //      importExcel() {
        //        const t = this
        //        t.openImport = true
        //        t.$refs.importExcel.getDowModelFile()
        //      },
        //      closeImport() {
        //        const t = this
        //        t.openImport = false
        //      },
        /*
        *  点击分页
        * */
        refresh () {
            this.getData(1)
        },
        /*
        *  获取列表
        * */
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'AttendResrecord.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                attResrecEmpDis: t.requestCode,
                attResrecCompid: t.positionComp,
                attResrecDeptid: t.positionDept,
                startTime: t.startTime,
                endTime: t.endTime,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.startTime !== undefined) {
                data.startTime = data.startTime === '' ? '' : new Date(data.startTime).format('yyyy-MM-dd')
            }
            if (data.endTime !== undefined) {
                data.endTime = data.endTime === '' ? '' : new Date(data.endTime).format('yyyy-MM-dd')
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
            //        t.dbDept()
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
            //        t.$refs.searchDept.getData(this.paramsDept)
            //        t.openDept = true
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
        // 导出
        expData () {
            const t = this
            const data = {
                attResrecEmpDis: t.requestCode,
                attResrecCompid: t.positionComp,
                attResrecDeptid: t.positionDept,
                startTime: t.startTime,
                endTime: t.endTime,
            }
            if (data.startTime) {
                data.startTime = new Date(data.startTime).format('yyyy-MM-dd')
            }
            if (data.endTime) {
                data.endTime = new Date(data.endTime).format('yyyy-MM-dd')
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'AttendResrecord.export', data)
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
        // 勾选
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
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
.ivu-input-wrapper,
.ivu-date-picker,
.ivu-button {
    margin-right: 5px;
}
</style>
