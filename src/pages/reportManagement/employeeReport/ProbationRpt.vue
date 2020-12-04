<template>
    <div class="table">
        <Row>
            <i-Col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        转正员工报表
                    </p>
                    <Row style="font-size:0">
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
                                    v-model="empprobSdate"
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    placeholder="请选择转正起始日期"
                                    style="width: 200px"></DatePicker>
                        <DatePicker class="btn"
                                    v-model="empprobEdate"
                                    type="datetime"
                                    format="yyyy-MM-dd"
                                    placeholder="请选择转正截止日期"
                                    style="width: 200px"></DatePicker>
                        <span class="btn"
                              @dblclick="opencompet(2)">
                            <Input v-model="empprobHirecompanyDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择公司"
                                   @on-click="opencompetType(2)" />
                        </span>
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
                                v-model="empprobEmptype"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择员工类型">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empprobEmptypeList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <Select class="btn"
                                v-model="empprobIsvip"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择是否VIP">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empprobIsvipList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <Select class="btn"
                                v-model="empprobProbation"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择试用期限">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empprobProbationList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
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
    name: 'ProbationRpt',
    data () {
        return {
            isSpin: false,
            expDataTital: [
                {
                    name: '员工工号',
                    code: 'empprobWorkno',
                },
                {
                    name: '中文姓名',
                    code: 'empprobCname',
                },
                {
                    name: '性别',
                    code: 'empprobGenderDis',
                },
                {
                    name: '公司',
                    code: 'empprobHirecompanyDis',
                },
                {
                    name: '部门',
                    code: 'empprobDeptDis',
                },
                {
                    name: '岗位',
                    code: 'empprobPostDis',
                },
                {
                    name: '员工类型',
                    code: 'empprobEmptypeDis',
                },
                {
                    name: '状态',
                    code: 'flowStateDis',
                },
                {
                    name: '入职日期',
                    code: 'empprobEntrydate',
                },
                {
                    name: '试用期限',
                    code: 'empprobProbationDis',
                },
                {
                    name: '试用到期日',
                    code: 'empprobProbationdate',
                },
                {
                    name: '业务上级经理',
                    code: 'empprobBuspmpDis',
                },
                {
                    name: '转正结论',
                    code: 'empprobIspass2Dis',
                },
                {
                    name: '后续管理行为',
                    code: 'empprobMgtbehavior2Dis',
                },
                {
                    name: '是否VIP',
                    code: 'empprobIsvipDis',
                },
                {
                    name: '职位级别',
                    code: 'empprobPostlevelDis',
                },
                {
                    name: '雇佣地点',
                    code: 'empprobHirelocationDis',
                },
                {
                    name: '工作地点',
                    code: 'empprobWorklocationDis',
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
                    key: 'empprobWorkno',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '中文姓名',
                    key: 'empprobCname',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '性别',
                    key: 'empprobGenderDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '公司',
                    key: 'empprobHirecompanyDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '部门',
                    key: 'empprobDeptDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '岗位',
                    key: 'empprobPostDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '员工类型',
                    key: 'empprobEmptypeDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'flowStateDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '入职日期',
                    key: 'empprobEntrydate',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '试用期限',
                    key: 'empprobProbationDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '试用到期日',
                    key: 'empprobProbationdate',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '业务上级经理',
                    key: 'empprobBuspmpDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '转正结论',
                    key: 'empprobIspass2Dis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '后续管理行为',
                    key: 'empprobMgtbehavior2Dis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '是否VIP',
                    key: 'empprobIsvipDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '职位级别',
                    key: 'empprobPostlevelDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '雇佣地点',
                    key: 'empprobHirelocationDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '工作地点',
                    key: 'empprobWorklocationDis',
                    width: 140,
                    align: 'center',
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
            empprobEmptype: '',
            empprobEmptypeList: [],
            empprobSdate: '',
            empprobEdate: '',
            showModal: false,
            reqName: '',
            dataParams: {},
            empprobHirecompanyDis: '',
            empprobHirecompany: '',
            empprobIsvip: '',
            empprobIsvipList: '',
            empprobProbation: '',
            empprobProbationList: '',
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
            t.empprobEmptype = ''
            t.empprobEmptypeList = []
            t.empprobSdate = ''
            t.empprobEdate = ''
            t.showModal = false
            t.reqName = ''
            t.dataParams = {}
            t.empprobHirecompanyDis = ''
            t.empprobHirecompany = ''
            t.empprobIsvip = ''
            t.empprobIsvipList = []
            t.empprobProbation = ''
            t.empprobProbationList = []
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
            if (t.empprobEdate.valueOf() < t.empprobSdate.valueOf() && t.empprobSdate && t.empprobEdate) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择正确的日期',
                })
                t.isSpin = false
                return
            }
            const data = {
                _mt:  this.$global.mt+'AnsrptEmpFlowProbation.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                flowState: this.flowState,
                empprobSdate: this.empprobSdate ? new Date(this.empprobSdate).format('yyyy-MM-dd') : '',
                empprobEdate: this.empprobEdate ? new Date(this.empprobEdate).format('yyyy-MM-dd') : '',
                empprobHirecompany: this.empprobHirecompany,
                empprobIsvip: this.empprobIsvip,
                empprobEmptype: this.empprobEmptype,
                empprobProbation: this.empprobProbation,
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
                typeCode: 'yesno,emptype,probperiod',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.empprobIsvipList = res.data.content[0].value[0].paramList
                    t.empprobEmptypeList = res.data.content[0].value[1].paramList
                    t.empprobProbationList = res.data.content[0].value[2].paramList
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
                empprobSdate: this.empprobSdate ? new Date(this.empprobSdate).format('yyyy-MM-dd') : '',
                empprobEdate: this.empprobEdate ? new Date(this.empprobEdate).format('yyyy-MM-dd') : '',
                empprobHirecompany: this.empprobHirecompany,
                empprobIsvip: this.empprobIsvip,
                empprobEmptype: this.empprobEmptype,
                empprobProbation: this.empprobProbation,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital, 'ansrptEmpFlowProbation.export', data)
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
                t.empprobHirecompanyDis = row.unitsName
                t.empprobHirecompany = row.id
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
                t.empprobHirecompanyDis = ''
                t.empprobHirecompany = ''
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
