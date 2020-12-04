<template>
    <div class="table">
        <Row>
            <i-Col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        合同续延报表
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
                        <DatePicker class="btn"
                                    v-model="empconSdate"
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    placeholder="原合同到期起始日期"
                                    style="width: 200px"></DatePicker>
                        <DatePicker class="btn"
                                    v-model="empconEdate"
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    placeholder="原合同到期截止日期"
                                    style="width: 200px"></DatePicker>
                        <!-- <span @dblclick="opencompet(3)">
            <Input v-model="empkiDeptDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择部门"  @on-click="opencompetType(3)"/>
          </span>
          <span @dblclick="opencompet(4)">
            <Input v-model="empDutyDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择职务"  @on-click="opencompetType(4)"/>
          </span>
          <span @dblclick="opencompet(1)">
            <Input v-model="empcompPostDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择岗位"  @on-click="opencompetType(1)"/>
          </span> -->
                        <Select class="btn"
                                v-model="empconEmptype"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择员工类型">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empconEmptypeList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <Select class="btn"
                                v-model="empconIsvip"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择是否VIP">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empconIsvipList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <span class="btn"
                              @dblclick="opencompet(2)">
                            <Input v-model="empconHirecompanyDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择公司"
                                   @on-click="opencompetType(2)" />
                        </span>
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
    </div>
</template>
<script>
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import autoSearchtable from '@/components/searchTableComponents/autoSearchtable'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'ExtensionRpt',
    data () {
        return {
            isSpin: false,
            expDataTital: [
                {
                    name: '员工工号',
                    code: 'empconWorkno',
                },
                {
                    name: '中文姓名',
                    code: 'empconCname',
                },
                {
                    name: '性别',
                    code: 'empconGenderDis',
                },
                {
                    name: '状态',
                    code: 'flowStateDis',
                },
                {
                    name: '入职日期',
                    code: 'empconEntrydate',
                },
                {
                    name: '原合同到期日期',
                    code: 'empconOrgcontredate',
                },
                {
                    name: '公司',
                    code: 'empconHirecompanyDis',
                },
                {
                    name: '员工是否续签',
                    code: 'empconIsextendofself',
                },
                {
                    name: '员工不续签原因',
                    code: 'empconDisreason',
                },
                {
                    name: '公司是否续签',
                    code: 'empconIsextensionDis',
                },
                {
                    name: '公司不续签原因',
                    code: 'empconNorereasonhr',
                },
                {
                    name: '后续管理动作',
                    code: 'empconRejectaction',
                },
                {
                    name: '合同类别',
                    code: 'empconContracttypeDis',
                },
                {
                    name: '合同期限',
                    code: 'empconContractperiod',
                },
                {
                    name: '合同开始日期',
                    code: 'empconContractsdate',
                },
                {
                    name: '合同结束日期',
                    code: 'empconContractedate',
                },
                {
                    name: '保密协议',
                    code: 'empconConfidential',
                },
                {
                    name: '合同工作时间',
                    code: 'empconContractworktime',
                },
                {
                    name: '文件签署确认',
                    code: 'empconDocconfirm',
                },
                {
                    name: '部门',
                    code: 'empconDeptDis',
                },
                {
                    name: '岗位',
                    code: 'empconPostDis',
                },
                {
                    name: '职务',
                    code: 'empconDutyDis',
                },
                {
                    name: '员工类型',
                    code: 'empconEmptypeDis',
                },
                {
                    name: '是否VIP',
                    code: 'empconIsvipDis',
                },
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
                    title: '员工工号',
                    key: 'empconWorkno',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '中文姓名',
                    key: 'empconCname',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '性别',
                    key: 'empconGenderDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '状态',
                    key: 'flowStateDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '入职日期',
                    key: 'empconEntrydate',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '原合同到期日期',
                    key: 'empconOrgcontredate',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '公司',
                    key: 'empconHirecompanyDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '员工是否续签',
                    key: 'empconIsextendofself',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '员工不续签原因',
                    key: 'empconDisreason',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '公司是否续签',
                    key: 'empconIsextensionDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '公司不续签原因',
                    key: 'empconNorereasonhr',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '后续管理动作',
                    key: 'empconRejectaction',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同类别',
                    key: 'empconContracttypeDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同期限',
                    key: 'empconContractperiod',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同开始日期',
                    key: 'empconContractsdate',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同结束日期',
                    key: 'empconContractedate',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '保密协议',
                    key: 'empconConfidential',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同工作时间',
                    key: 'empconContractworktime',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '文件签署确认',
                    key: 'empconDocconfirm',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '部门',
                    key: 'empconDeptDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '岗位',
                    key: 'empconPostDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '职务',
                    key: 'empconDutyDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '员工类型',
                    key: 'empconEmptypeDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '是否VIP',
                    key: 'empconIsvipDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
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
            empconEmptype: '',
            empconEmptypeList: [],
            empconSdate: '',
            empconEdate: '',
            showModal: false,
            reqName: '',
            dataParams: {},
            empconHirecompanyDis: '',
            empconHirecompany: '',
            empconIsvip: '',
            empconIsvipList: '',
            btnArr: []
        }
    },
    components: {
        expwindow,
        expdow,
        btnList
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            //        t.getData(1)
            t.getSelect()
            t.flowState = 'all'
            t.empconEmptype = ''
            t.empconEmptypeList = []
            t.empconSdate = ''
            t.empconEdate = ''
            t.showModal = false
            t.reqName = ''
            t.dataParams = {}
            t.empconHirecompanyDis = ''
            t.empconHirecompany = ''
            t.empconIsvip = ''
            t.empconIsvipList = []
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
            if (t.empconEdate.valueOf() < t.empconSdate.valueOf() && t.empconSdate && t.empconEdate) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择正确的日期',
                })
                t.isSpin = false
                return
            }
            const data = {
                _mt:  this.$global.mt+'AnsrptEmpFlowContract.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                flowState: this.flowState,
                empconSdate: this.empconSdate ? new Date(this.empconSdate).format('yyyy-MM-dd') : '',
                empconEdate: this.empconEdate ? new Date(this.empconEdate).format('yyyy-MM-dd') : '',
                empconHirecompany: this.empconHirecompany,
                empconIsvip: this.empconIsvip,
                empconEmptype: this.empconEmptype,
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
                typeCode: 'yesno,emptype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.empconIsvipList = res.data.content[0].value[0].paramList
                    t.empconEmptypeList = res.data.content[0].value[1].paramList
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
                empconSdate: this.empconSdate ? new Date(this.empconSdate).format('yyyy-MM-dd') : '',
                empconEdate: this.empconEdate ? new Date(this.empconEdate).format('yyyy-MM-dd') : '',
                empconHirecompany: this.empconHirecompany,
                empconIsvip: this.empconIsvip,
                empconEmptype: this.empconEmptype,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital, 'ansrptEmpFlowContract.export', data)
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
        closeModal () {
            this.showModal = false
        },
        changeinput1 (row) {
            const t = this
            if (t.reqName === 'training-needs-company') {
                t.empconHirecompanyDis = row.unitsName
                t.empconHirecompany = row.id
            }
        },
        opencompetType (type) {
            const t = this
            if (type == 2) {
                t.reqName = 'training-needs-company'
                let obj = {}
                obj['unitType'] = '01company'
                t.dataParams = obj
            }
            t.showModal = true
        },
        opencompet (type) {
            const t = this
            if (type == 2) {
                t.empconHirecompanyDis = ''
                t.empconHirecompany = ''
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
