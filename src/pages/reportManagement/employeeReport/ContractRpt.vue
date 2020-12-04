<template>
    <div class="table">
        <Row>
            <i-Col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        员工合同报表
                    </p>
                    <Row id="row"
                         style="font-size:0;line-height:40px">
                        <Select class="btn"
                                v-model="empctStatus"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择员工状态">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empctStatusList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <DatePicker class="btn"
                                    v-model="empctContractSdate"
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    placeholder="请选择到期起始日期"
                                    style="width: 200px"></DatePicker>
                        <DatePicker class="btn"
                                    v-model="empctContractEdate"
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    placeholder="请选择到期截止日期"
                                    style="width: 200px"></DatePicker>
                        <Select class="btn"
                                v-model="empctContractperiod"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择合同期限">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empctContractperiodList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <!--<span @dblclick="opencompet(3)">-->
                        <!--<Input v-model="empkiDeptDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择部门"  @on-click="opencompetType(3)"/>-->
                        <!--</span>-->
                        <span class="btn"
                              @dblclick="opencompet(4)">
                            <Input v-model="empctDutyDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择职务"
                                   @on-click="opencompetType(4)" />
                        </span>
                        <!--<span @dblclick="opencompet(1)">-->
                        <!--<Input v-model="empcompPostDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择岗位"  @on-click="opencompetType(1)"/>-->
                        <!--</span>-->
                        <Select class="btn"
                                v-model="empctEmpType"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择员工类型">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empctEmpTypeList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <Select class="btn"
                                v-model="empctIfVip"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择是否VIP">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empctIfVipList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <Select class="btn"
                                v-model="empctConfidential"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择保密协议">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empctConfidentialList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <span class="btn"
                              @dblclick="opencompet(2)">
                            <Input v-model="empctHirecompanyDis"
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
    name: 'ContractRpt',
    data () {
        return {
            isSpin: false,
            expDataTital: [
                {
                    name: '员工工号',
                    code: 'empctWorkNoDis',
                },
                {
                    name: '中文姓名',
                    code: 'empctNameDis',
                },
                {
                    name: '性别',
                    code: 'empctSexDis',
                },
                {
                    name: '员工状态',
                    code: 'empctStatusDis',
                },
                {
                    name: '入职日期',
                    code: 'empctEnterDate',
                },
                {
                    name: '合同类别',
                    code: 'empctContracttypeDis',
                },
                {
                    name: '合同期限',
                    code: 'empctContractperiodDis',
                },
                {
                    name: '合同开始日期',
                    code: 'empctContractsdate',
                },
                {
                    name: '合同结束日期',
                    code: 'empctContractedate',
                },
                {
                    name: '合同工作时间',
                    code: 'empctContractworktimeDis',
                },
                {
                    name: '保密协议',
                    code: 'empctConfidentialDis',
                },
                {
                    name: '公司',
                    code: 'empctHirecompanyDis',
                },
                {
                    name: '部门',
                    code: 'empctDeptDis',
                },
                {
                    name: '岗位',
                    code: 'empctPostDis',
                },
                {
                    name: '职务',
                    code: 'empctDutyDis',
                },
                {
                    name: '员工类型',
                    code: 'empctEmpTypeDis',
                },
                {
                    name: '工作地点',
                    code: 'empctWorkLocationDis',
                },
                {
                    name: '业务上级经理',
                    code: 'empctBinPmpDis',
                },
                {
                    name: '离职日期',
                    code: 'empctSepDate',
                },
                {
                    name: '离职类型',
                    code: 'empctSepType',
                },
            ],
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            tableheight: document.body.offsetHeight - 300,
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
                    key: 'empctWorkNoDis',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '中文姓名',
                    key: 'empctNameDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '性别',
                    key: 'empctSexDis',
                    width: 80,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '员工状态',
                    key: 'empctStatusDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '入职日期',
                    key: 'empctEnterDate',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同类别',
                    key: 'empctContracttypeDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同期限',
                    key: 'empctContractperiodDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同开始日期',
                    key: 'empctContractsdate',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同结束日期',
                    key: 'empctContractedate',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '合同工作时间',
                    key: 'empctContractworktimeDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '保密协议',
                    key: 'empctConfidentialDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '公司',
                    key: 'empctHirecompanyDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '部门',
                    key: 'empctDeptDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '岗位',
                    key: 'empctPostDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '职务',
                    key: 'empctDutyDis',
                    width: 140,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '员工类型',
                    key: 'empctEmpTypeDis',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '工作地点',
                    key: 'empctWorkLocationDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '业务上级经理',
                    key: 'empctBinPmpDis',
                    width: 120,
                    // sortable: 'custom',
                },

                {
                    title: '离职日期',
                    key: 'empctSepDate',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
                {
                    title: '离职类型',
                    key: 'empctSepType',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1000',
            AccessControl: [],
            empctStatus: '10all',
            empctStatusList: [],
            empctEmpType: '',
            empctEmpTypeList: [],
            empctContractSdate: '',
            empctContractEdate: '',
            showModal: false,
            reqName: '',
            dataParams: {},
            empctHirecompanyDis: '',
            empctHirecompany: '',
            empctDutyDis: '',
            empctDuty: '',
            empctContractperiod: '',
            empctContractperiodList: [],
            empctConfidential: '',
            empctConfidentialList: [],
            empctIfVip: '',
            empctIfVipList: [],
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
            t.empctStatusDis = '10all'
            t.empctStatusList = []
            t.empctEmpType = ''
            t.empctEmpTypeList = []
            t.empctContractSdate = ''
            t.empctContractEdate = ''
            t.showModal = false
            t.reqName = ''
            t.dataParams = {}
            t.empctHirecompanyDis = ''
            t.empctHirecompany = ''
            t.empctDuty = ''
            t.empctDutyDis = ''
            t.empctContractperiod = ''
            t.empctContractperiodList = []
            t.empctConfidential = ''
            t.empctConfidentialList = []
            t.empctIfVip = ''
            t.empctIfVipList = []
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
            if (t.empctContractEdate.valueOf() < t.empctContractSdate.valueOf() && t.empctContractEdate && t.empctContractSdate) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择正确的日期',
                })
                t.isSpin = false
                return
            }
            const data = {
                _mt:  this.$global.mt+'AnsrptEmpContract.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                empctStatus: this.empctStatus,
                empctContractSdate: this.empctContractSdate ? new Date(this.empctContractSdate).format('yyyy-MM-dd') : '',
                empctContractEdate: this.empctContractEdate ? new Date(this.empctContractEdate).format('yyyy-MM-dd') : '',
                empctHirecompany: this.empctHirecompany,
                empctDuty: this.empctDuty,
                empctEmpType: this.empctEmpType,
                empctContractperiod: this.empctContractperiod,
                empctConfidential: this.empctConfidential,
                empctIfVip: this.empctIfVip,
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
                typeCode: 'empstatus,emptype,yesno,confidential,contperiod',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.empctStatusList = res.data.content[0].value[0].paramList
                    t.empctEmpTypeList = res.data.content[0].value[1].paramList
                    t.empctIfVipList = res.data.content[0].value[2].paramList
                    t.empctConfidentialList = res.data.content[0].value[3].paramList
                    t.empctContractperiodList = res.data.content[0].value[4].paramList
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
                empctStatus: this.empctStatus,
                empctContractSdate: this.empctContractSdate ? new Date(this.empctContractSdate).format('yyyy-MM-dd') : '',
                empctContractEdate: this.empctContractEdate ? new Date(this.empctContractEdate).format('yyyy-MM-dd') : '',
                empctHirecompany: this.empctHirecompany,
                empctDuty: this.empctDuty,
                empctEmpType: this.empctEmpType,
                empctContractperiod: this.empctContractperiod,
                empctConfidential: this.empctConfidential,
                empctIfVip: this.empctIfVip,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital, 'ansrptEmpContract.export', data)
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
                t.empctHirecompanyDis = row.unitsName
                t.empctHirecompany = row.id
            } else if (t.reqName === 'org-duty') {
                t.empctDutyDis = row.dutyName
                t.empctDuty = row.id
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
                t.empctHirecompanyDis = ''
                t.empctHirecompany = ''
            } else if (type == 4) {
                t.empctDutyDis = ''
                t.empctDuty = ''
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
