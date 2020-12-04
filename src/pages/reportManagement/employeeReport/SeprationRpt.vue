<template>
    <div class="table">
        <Row>
            <i-Col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        离职员工报表
                    </p>
                    <Row style="font-size:0;">
                        <Select class="btn"
                                v-model="flowState"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择状态">
                            <Option :value="item.key"
                                    v-for="(item,index) in flowStateList"
                                    :key="index">{{item.value}}</Option>
                        </Select>
                        <!--<DatePicker v-model="empconSdate" type="datetime" format="yyyy-MM-dd" placeholder="原合同到期起始日期" style="width: 150px" ></DatePicker>-->
                        <!--<DatePicker v-model="empconEdate" type="datetime" format="yyyy-MM-dd"  placeholder="原合同到期截止日期" style="width: 150px"></DatePicker>-->
                        <!--<span @dblclick="opencompet(3)">-->
                        <!--<Input v-model="empkiDeptDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择部门"  @on-click="opencompetType(3)"/>-->
                        <!--</span>-->
                        <span class="btn"
                              @dblclick="opencompet(2)">
                            <Input v-model="empdimCompanyDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择公司"
                                   @on-click="selectHCompany" />
                        </span>
                        <span class="btn"
                              @dblclick="opencompet(4)">
                            <Input v-model="empdimDutyDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择部门"
                                   @on-click="pickDepart" />
                        </span>
                        <Input class="btn"
                               v-model="empdimCname"
                               style="width: 200px"
                               placeholder="请输入员工姓名" />
                        <!--<span @dblclick="opencompet(1)">-->
                        <!--<Input v-model="empcompPostDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择岗位"  @on-click="opencompetType(1)"/>-->
                        <!--</span> -->
                        <!-- <Select v-model="empdimDimtype" clearable style="width: 150px;" placeholder="请选择离职类型" >
            <Option :value="item.paramCode" v-for="(item,index) in empdimDimtypeList" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <Select v-model="empdimEmptype" clearable style="width: 150px;" placeholder="请选择员工类型" >
            <Option :value="item.paramCode" v-for="(item,index) in empdimEmptypeList" :key="index">{{item.paramInfoCn}}</Option>
          </Select>
          <Select v-model="empdimIsvip" clearable style="width: 150px;" placeholder="请选择是否VIP" >
            <Option :value="item.paramCode" v-for="(item,index) in empdimIsvipList" :key="index">{{item.paramInfoCn}}</Option>
          </Select> -->
                        <span class="btn"><Button type="info"
                                    :loading="isSpin"
                                    @click="getData(1)">{{$t('button.ser')}}</Button></span>
                        <!-- <Button class="btn" type="primary"  @click="expData">{{$t('button.exp')}}</Button> -->
                        <btn-list @operatorBtn="operatorBtn"
                                  @openUp="btnEvent">
                        </btn-list>
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
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent="reqName"
                         @changeinput="changeinput1"
                         urlType='login'
                         dataType="row"
                         :dataParame='dataParams'>
        </autoSearchtable>
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
    </div>
</template>
<script>
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import autoSearchtable from '@/components/searchTableComponents/autoSearchtable'
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'ExtensionRpt',
    data () {
        return {
            isSpin: false,
            expDataTital: [
                {
                    name: '公司',
                    code: 'empdimCompanyDis',
                },
                {
                    name: '姓名',
                    code: 'empdimCnameDis',
                },
                {
                    name: '条线',
                    code: 'empdimPostseqDis',
                },
                {
                    name: '部门',
                    code: 'empdimDeptDis',
                },
                {
                    name: '职位',
                    code: 'empdimPostDis',
                },
                {
                    name: '职级',
                    code: 'empdimPostlevel',
                },
                {
                    name: '薪制类别',
                    code: 'empdimPaystyleDis',
                },
                {
                    name: '编制类别',
                    code: 'empdimEstablishmentDis',
                },
                {
                    name: '岗位类别',
                    code: 'empdimDeptTypeDis',
                },
                {
                    name: '入职日期',
                    code: 'empdimEntrydate',
                },
                {
                    name: '离职日期',
                    code: 'empdimFinalsepdate',
                },
                {
                    name: '离职类别',
                    code: 'empdimDimtypeDis',
                },
                {
                    name: '身份证号码',
                    code: 'empdimIdno',
                },
                {
                    name: '出生日期',
                    code: 'empdimBirthdate',
                },
                {
                    name: '年龄',
                    code: 'empdimempAge',
                },
                {
                    name: '性别',
                    code: 'empdimGenderDis',
                },
                {
                    name: '司龄',
                    code: 'empdimcompCompage',
                },
                {
                    name: '最高学历',
                    code: 'empdimQualificationsDis',
                },
                {
                    name: '最近一次绩效考核等级',
                    code: 'empdimEvaresultDis',
                },
                {
                    name: '备注',
                    code: 'empdimComment',
                },
                {
                    name: '年龄区间',
                    code: '',
                },
                {
                    name: '司龄区间',
                    code: '',
                },
                {
                    name: '学历区间',
                    code: '',
                }
            ],
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            tableheight: document.body.offsetHeight - 250,
            value: '',
            logType: '',
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '公司',
                    key: 'empdimCompanyDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '姓名',
                    key: 'empdimCnameDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '条线',
                    key: 'empdimPostseqDis',//
                    width: 140,
                    align: 'center'
                },
                {
                    title: '部门',
                    key: 'empdimDeptDis',
                    width: 140,
                    align: 'center'
                },
                {
                    title: '职位',
                    key: 'empdimPostDis',
                    width: 140,
                    align: 'center'
                },
                {
                    title: '职级',
                    key: 'empdimPostlevel',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '薪制类别',
                    key: 'empdimPaystyleDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '编制类别',
                    key: 'empdimEstablishmentDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '岗位类别',
                    key: 'empdimDeptTypeDis',//
                    width: 140,
                    align: 'center',
                },
                {
                    title: '入职日期',
                    key: 'empdimEntrydate',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '离职日期',
                    key: 'empdimFinalsepdate',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '离职类别',
                    key: 'empdimDimtypeDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '身份证号码',
                    key: 'empdimIdno',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '出生日期',
                    key: 'empdimBirthdate',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '年龄',
                    key: 'empdimempAge',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '性别',
                    key: 'empdimGenderDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '司龄',
                    key: 'empdimcompCompage',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '最高学历',
                    key: 'empdimQualificationsDis',//
                    width: 140,
                    align: 'center',
                },
                {
                    title: '最近一次绩效考核等级',
                    key: 'empdimEvaresultDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '备注',
                    key: 'empdimComment',//
                    width: 140,
                    align: 'center',
                },
                {
                    title: '年龄区间',
                    key: '',//
                    width: 140,
                    align: 'center',
                },
                {
                    title: '司龄区间',
                    key: '',//
                    width: 140,
                    align: 'center',
                },
                {
                    title: '学历区间',
                    key: '',//
                    width: 140,
                    align: 'center',
                }
                // 合同结束日期	合同工作时间	职位级别	个税缴纳地	社保缴纳地	公积金缴纳地	是否需要职业健康体检	员工工号
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1000',
            flowState: 'all',
            flowStateList: [
                {
                    value: '全部',
                    key: 'all',
                },
                {
                    value: '处理中',
                    key: 'p_flowst_2',
                },
                {
                    value: '已完成',
                    key: 'p_flowst_3',
                },
            ],
            empdimEmptype: '',
            empdimEmptypeList: [],
            empdimDimtype: '',
            empdimDimtypeList: [],
            showModal: false,
            reqName: '',
            dataParams: {},
            empdimCompanyDis: '',
            empdimCompany: '',
            empdimDutyDis: '',
            empdimDuty: '',
            empdimCname: '',
            empdimIsvip: '',
            empdimIsvipList: [],
            openHCompany: false,//公司弹框
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
            openDept: false,//部门弹框
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
            btnArr: []
        }
    },
    components: {
        expwindow,
        expdow,
        searchHCompany,
        searchDept,
        btnList
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            //        t.getData(1)
            t.getSelect()
            t.flowState = 'all'
            t.empdimEmptype = ''
            t.empdimEmptypeList = []
            t.empdimDimtype = ''
            t.empdimDimtypeList = []
            t.showModal = false
            t.reqName = ''
            t.dataParams = {}
            t.empdimCompanyDis = ''
            t.empdimCompany = ''
            t.empdimDutyDis = ''
            t.empdimDuty = ''
            t.empdimIsvip = ''
            t.empdimIsvipList = []
        }
    },
    watch: {
        empdimCompany (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.empdimDutyDis = '';
                this.empdimDuty = '';
            }
        }
    },
    methods: {
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
        },
        btnEvent (code) {
            switch (code) {
                case 'button_export':
                    this.expData()
                    break;
            }
        },
        refresh () {
            this.getData(1)
        },
        getData (page) {
            const t = this
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'AnsrptEmpFlowDimission.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                flowState: this.flowState,
                empdimCompany: this.empdimCompany,
                empdimDept: this.empdimDuty,
                empdimCnameDis: this.empdimCname
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.isSpin = true
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    // this.btnControl(this).then((res1) => {
                    //   if (isSuccess(res1, t)) {
                    //     res1.data.content[0].value.forEach((item) => {
                    //       t.AccessControl.push(item.btnLancode)
                    //     })
                    //   }
                    // }).catch((err) => {
                    //   console.log(err)
                    // })
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'yesno,emptype,separatereason',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.empdimIsvipList = res.data.content[0].value[0].paramList
                    t.empdimEmptypeList = res.data.content[0].value[1].paramList
                    t.empdimDimtypeList = res.data.content[0].value[2].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        expData () {
            const data = {
                flowState: this.flowState,
                empdimCompany: this.empdimCompany,
                empdimDuty: this.empdimDuty,
                empdimCname: this.empdimCname,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'AnsrptEmpFlowDimission.export', data)
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
        /*
         弹出选择
        */
        //  	雇佣公司
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        inputHCompany (name, id) {
            const t = this
            t.empdimCompanyDis = name
            t.empdimCompany = id
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        // 部门
        pickDepart () {
            const t = this
            if (t.empdimCompany === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empHireCompDis'),
                })
            } else {
                t.$refs.searchDept.getData(t.paramsDept, t.empdimCompany)
                t.openDept = true
            }
        },
        inputDept (name, id) {
            const t = this
            t.empdimDutyDis = name
            t.empdimDuty = id
        },
        closeDept () {
            const t = this
            t.$refs.searchDept.unitCode = ''
            t.openDept = false
        },
        clearSearch () {
            const t = this;
            t.empdimCompanyDis = ''
            t.empdimCompany = ''
            t.empdimDuty = ''
            t.empdimDuty = ''
            t.flowState = 'all'
            t.empdimCname = ''
        },
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            const t = this
            if (t.reqName === 'training-needs-company') {
                t.empdimCompanyDis = row.unitsName
                t.empdimCompany = row.id
            } else if (t.reqName === 'org-duty') {
                t.empdimDutyDis = row.dutyName
                t.empdimDuty = row.id
            }
        },
        opencompetType (type) {
            const t = this
            if (type == 2) {
                t.reqName = 'training-needs-company'
                let obj = {}
                obj['unitType'] = '01company'
                t.dataParams = obj
            } else if (type == 4) {
                t.reqName = 'org-duty'
                t.dataParams = {}
            }
            t.showModal = true
        },
        opencompet (type) {
            const t = this
            if (type == 2) {
                t.empdimCompanyDis = ''
                t.empdimCompany = ''
            } else if (type == 4) {
                t.empdimDutyDis = ''
                t.empdimDuty = ''
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.btn {
    margin-right: 5px;
}
</style>
