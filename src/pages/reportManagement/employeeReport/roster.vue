<template>
    <div class="table">
        <Row>
            <i-Col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        员工花名册
                    </p>
                    <Row style="font-size:0;">
                        <!-- <Select v-model="empkiStatus" clearable style="width: 150px;" placeholder="请选择员工状态" >
            <Option :value="item.paramCode" v-for="(item,index) in empkiStatusList" :key="index">{{item.paramInfoCn}}</Option>
          </Select> -->
                        <!-- <DatePicker v-model="NhSdate" type="datetime" format="yyyy-MM-dd" placeholder="请选择入职起始日期" style="width: 150px" ></DatePicker>
          <DatePicker v-model="NhEdate" type="datetime" format="yyyy-MM-dd"  placeholder="请选择入职截止日期" style="width: 150px"></DatePicker> -->
                        <span class="btn"
                              @dblclick="opencompet(2)">
                            <Input v-model="empkiHirecompanyDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择公司"
                                   @on-click="opencompetType(2)" />
                        </span>
                        <span class="btn"
                              @dblclick="opencompet(3)">
                            <Input v-model="empkiDeptDis"
                                   style="width: 200px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择部门"
                                   @on-click="opencompetType(3)" />
                        </span>
                        <span class="btn">
                            <Input v-model="empCname"
                                   style="width: 200px"
                                   placeholder="请输入姓名" />
                        </span>
                        <!-- <span @dblclick="opencompet(4)">
            <Input v-model="empDutyDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择职务"  @on-click="opencompetType(4)"/>
          </span> -->
                        <!-- <span @dblclick="opencompet(1)">
            <Input v-model="empcompPostDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择岗位"  @on-click="opencompetType(1)"/>
          </span> -->
                        <!-- <Select v-model="empkiEmptype" clearable style="width: 150px;" placeholder="请选择员工类型" >
            <Option :value="item.paramCode" v-for="(item,index) in empkiEmptypeList" :key="index">{{item.paramInfoCn}}</Option>
          </Select> -->
                        <!-- <span class="btn"><Button type="info"
                                    :loading="isSpin"
                                    @click="getData(1)">{{$t('button.ser')}}</Button></span> -->
                        <!-- <Button class="btn" type="primary"  @click="expData">{{$t('button.exp')}}</Button> -->
                        <btn-list @operatorBtn="operatorBtn"
                                  @openUp="btnEvent" ref="btnList">
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
                               :no-data-text="noDataImg"
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
    name: 'EmpRoster',
    data () {
        return {
            isSpin: false,
            expDataTital: [
                {
                    name: '公司',
                    code: 'compName',
                },
                {
                    name: '姓名',
                    code: 'empCname',
                },
                {
                    name: '条线',
                    code: 'empcompPostseqDis',
                },
                {
                    name: '部门',
                    code: 'empcompDeptDis',
                },
                {
                    name: '职位',
                    code: 'empcompPostDis',
                },
                {
                    name: '职级',
                    code: 'empcompPostlevel',
                },
                {
                    name: '薪制类别',
                    code: 'empkiPaystyleDis',
                },
                {
                    name: '编制类别',
                    code: 'empkiEstablishmentDis',
                },
                {
                    name: '岗位类别',
                    code: 'empcompDeptTypeDis',
                },
                {
                    name: '入职日期',
                    code: 'empcompEntrydate',
                },
                {
                    name: '身份证号码',
                    code: 'empidNo',
                },
                {
                    name: '出生日期',
                    code: 'empBirthdate',
                },
                {
                    name: '年龄',
                    code: 'empAge',
                },
                {
                    name: '性别',
                    code: 'empGenderDis',
                },
                {
                    name: '第一学历',
                    code: 'empedQualificationsDis',
                },
                {
                    name: '第一学历毕业院校',
                    code: 'empedSchool',
                },
                {
                    name: '第一学历专业',
                    code: 'empedSpecialty',
                },
                {
                    name: '第一学历起止年月',
                    code: 'empedSandEdate',
                },
                {
                    name: '第一学历院校类别',
                    code: 'empedSchooltypeDis',
                },
                {
                    name: '最高学历',
                    code: 'empedQualificationsDis1',
                },
                {
                    name: '最高学历毕业院校',
                    code: 'empedSchool1',
                },
                {
                    name: '最高学历专业',
                    code: 'empedSpecialty1',
                },
                {
                    name: '最高学历起止日期',
                    code: 'empedSandEdate1',
                },
                {
                    name: '最高学历院校类别',
                    code: 'empedSchooltypeDis1',
                },
                {
                    name: '入职前工作经历',
                    code: 'repaentryJob',
                },
                {
                    name: '任职三盛期间的岗位异动情况',
                    code: 'repsanshengentryJob',
                },
                {
                    name: '三盛司龄',
                    code: 'empcompCompage',
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
                    title: '公司',
                    key: 'compName',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.compName
                                },
                            }, params.row.compName)
                        ])
                    }
                },
                {
                    title: '姓名',
                    key: 'empCname',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empCname
                                },
                            }, params.row.empCname)
                        ])
                    }
                },
                {
                    title: '条线',
                    key: 'empcompPostseqDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empcompPostseqDis
                                },
                            }, params.row.empcompPostseqDis)
                        ])
                    }
                },
                {
                    title: '部门',
                    key: 'empcompDeptDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empcompDeptDis
                                },
                            }, params.row.empcompDeptDis)
                        ])
                    }
                },
                {
                    title: '职位',
                    key: 'empcompPostDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empcompPostDis
                                },
                            }, params.row.empcompPostDis)
                        ])
                    }
                },
                {
                    title: '职级',
                    key: 'empcompPostlevel',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empcompPostlevel
                                },
                            }, params.row.empcompPostlevel)
                        ])
                    }
                },
                {
                    title: '薪制类别',
                    key: 'empkiPaystyleDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empkiPaystyleDis
                                },
                            }, params.row.empkiPaystyleDis)
                        ])
                    }
                },
                {
                    title: '编制类别',
                    key: 'empkiEstablishmentDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empkiEstablishmentDis
                                },
                            }, params.row.empkiEstablishmentDis)
                        ])
                    }
                },
                {
                    title: '岗位类别',
                    key: 'empcompDeptTypeDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empcompDeptTypeDis
                                },
                            }, params.row.empcompDeptTypeDis)
                        ])
                    }
                },
                {
                    title: '入职日期',
                    key: 'empcompEntrydate',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empcompEntrydate
                                },
                            }, params.row.empcompEntrydate)
                        ])
                    }
                },
                {
                    title: '身份证号码',
                    key: 'empidNo',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empidNo
                                },
                            }, params.row.empidNo)
                        ])
                    }
                },
                {
                    title: '出生日期',
                    key: 'empBirthdate',
                    width: 100,
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empBirthdate
                                },
                            }, params.row.empBirthdate)
                        ])
                    }
                },
                {
                    title: '年龄',
                    key: 'empAge',
                    width: 100,
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empAge
                                },
                            }, params.row.empAge)
                        ])
                    }
                },
                {
                    title: '性别',
                    key: 'empGenderDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empGenderDis
                                },
                            }, params.row.empGenderDis)
                        ])
                    }
                },
                {
                    title: '第一学历',
                    key: 'empedQualificationsDis',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedQualificationsDis
                                },
                            }, params.row.empedQualificationsDis)
                        ])
                    }
                },
                {
                    title: '第一学历毕业院校',
                    key: 'empedSchool',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedSchool
                                },
                            }, params.row.empedSchool)
                        ])
                    }
                },
                {
                    title: '第一学历专业',
                    key: 'empedSpecialty',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedSpecialty
                                },
                            }, params.row.empedSpecialty)
                        ])
                    }
                },
                {
                    title: '第一学历起止年月',
                    key: 'empedSandEdate',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedSandEdate
                                },
                            }, params.row.empedSandEdate)
                        ])
                    }
                },
                {
                    title: '第一学历院校类别',
                    key: 'empedSchooltypeDis',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedSchooltypeDis
                                },
                            }, params.row.empedSchooltypeDis)
                        ])
                    }
                },
                {
                    title: '最高学历',
                    key: 'empedQualificationsDis1',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedQualificationsDis1
                                },
                            }, params.row.empedQualificationsDis1)
                        ])
                    }
                },
                {
                    title: '最高学历毕业院校',
                    key: 'empedSchool1',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedSchool1
                                },
                            }, params.row.empedSchool1)
                        ])
                    }
                },
                {
                    title: '最高学历专业',
                    key: 'empedSpecialty1',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedSpecialty1
                                },
                            }, params.row.empedSpecialty1)
                        ])
                    }
                },
                {
                    title: '最高学历起止日期',
                    key: 'empedSandEdate1',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedSandEdate1
                                },
                            }, params.row.empedSandEdate1)
                        ])
                    }
                },
                {
                    title: '最高学历院校类别',
                    key: 'empedSchooltypeDis1',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empedSchooltypeDis1
                                },
                            }, params.row.empedSchooltypeDis1)
                        ])
                    }
                },
                {
                    title: '入职前工作经历',
                    key: 'repaentryJob',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.repaentryJob
                                },
                            }, params.row.repaentryJob)
                        ])
                    }
                },
                {
                    title: '任职三盛期间的岗位异动情况',
                    key: 'repsanshengentryJob',
                    width: 120,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.repsanshengentryJob
                                },
                            }, params.row.repsanshengentryJob)
                        ])
                    }
                },
                {
                    title: '三盛司龄',
                    key: 'empcompCompage',
                    width: 100,
                    align: 'center',
                    // sortable: 'custom',
                    render: (h, params) => {
                        return h('div', [
                            h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    content: params.row.empcompCompage
                                },
                            }, params.row.empcompCompage)
                        ])
                    }
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
            empkiStatus: '10all',
            empkiStatusList: [],
            empkiEmptype: '',
            empkiEmptypeList: [],
            NhSdate: '',
            NhEdate: '',
            showModal: false,
            reqName: '',
            dataParams: {},
            empcompPostDis: '',
            empcompPost: '',
            empCname: '',//员工姓名
            empkiHirecompanyDis: '',
            empkiHirecompany: '',
            empkiDeptDis: '',
            empkiDept: '',
            empDutyDis: '',
            empDuty: '',
            btnArr: [],
            noDataImg:  '<div id="noData"></div>'
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
            t.empkiStatus = '10all'
            t.empkiStatusList = []
            t.empkiEmptype = ''
            t.empkiEmptypeList = []
            t.NhSdate = ''
            t.NhEdate = ''
            t.showModal = false
            t.reqName = ''
            t.dataParams = {}
            t.empcompPostDis = ''
            t.empcompPost = ''
            t.empkiHirecompanyDis = ''
            t.empkiHirecompany = ''
            t.empkiDept = ''
            t.empkiDeptDis = ''
            t.empDuty = ''
            t.empDutyDis = ''
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
                case 'button_query':
					this.getData(1)
					break;
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
            if (t.NhEdate.valueOf() < t.NhSdate.valueOf() && t.NhEdate && t.NhSdate) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择正确的日期',
                })
                t.isSpin = false
                return
            }
            const data = {
                // viewReportMaster.getPage
                _mt: 'viewReportMaster.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                // empkiStatus: this.empkiStatus,//员工状态
                // NhSdate: this.NhSdate ? new Date(this.NhSdate).format('yyyy-MM-dd') : '',
                // NhEdate: this.NhEdate ? new Date(this.NhEdate).format('yyyy-MM-dd') : '',
                empCname: this.empCname,//姓名
                compid: this.empkiHirecompany,//公司
                empcompDept: this.empkiDept,//部门
                // empcompPost: this.empcompPost,//岗位
                // empDuty: this.empDuty,//职务
                // empkiEmptype: this.empkiEmptype,//员工类型
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.isSpin = true
			t.$refs.btnList.loading=true
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
			    t.$refs.btnList.loading=false
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
			    t.$refs.btnList.loading=false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(()=>{
                t.isSpin = false
			    t.$refs.btnList.loading=false
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'empstatus,emptype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.empkiStatusList = res.data.content[0].value[0].paramList
                    t.empkiEmptypeList = res.data.content[0].value[1].paramList
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
                // empkiStatus: this.empkiStatus,
                NhSdate: this.NhSdate ? new Date(this.NhSdate).format('yyyy-MM-dd') : '',
                NhEdate: this.NhEdate ? new Date(this.NhEdate).format('yyyy-MM-dd') : '',
                empCname: this.empCname,//姓名
                compid: this.empkiHirecompany,//公司
                empcompDept: this.empkiDept,//部门
                // empcompPost: this.empcompPost,
                // empDuty: this.empDuty,
                // empkiEmptype: this.empkiEmptype,
            }
            this.logType = this.$t('button.exp')
            // viewReportMaster.export
            this.$refs.expwindow.getData(this.expDataTital, 'viewReportMaster.export', data)
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
            if (t.reqName === 'base-choose-job') {
                t.empcompPostDis = row.postFnameCnDis
                t.empcompPost = row.id
            } else if (t.reqName === 'training-needs-company') {
                t.empkiHirecompanyDis = row.unitsName
                t.empkiHirecompany = row.id
            } else if (t.reqName === 'training-needs-depart') {
                t.empkiDeptDis = row.unitsName
                t.empkiDept = row.id
            } else if (t.reqName === 'org-duty') {
                t.empDutyDis = row.dutyName
                t.empDuty = row.id
            }
        },
        opencompetType (type) {
            const t = this
            if (type == 1) {
                t.reqName = 'base-choose-job'
                t.dataParams = {}
            } else if (type == 2) {
                t.reqName = 'training-needs-company'
                let obj = {}
                obj['unitType'] = '01company'
                t.dataParams = obj
            } else if (type == 3) {
                t.reqName = 'training-needs-depart'
                let obj = {}
                obj['unitType'] = '70dept'
                t.dataParams = obj
            } else if (type == 4) {
                t.reqName = 'org-duty'
                t.dataParams = {}
            }
            t.showModal = true
        },
        opencompet (type) {
            const t = this
            if (type == 1) {
                t.empcompPostDis = ''
                t.empcompPost = ''
            } else if (type == 2) {
                t.empkiHirecompanyDis = ''
                t.empkiHirecompany = ''
            } else if (type == 3) {
                t.empkiDeptDis = ''
                t.empkiDept = ''
            } else if (type == 4) {
                t.empDutyDis = ''
                t.empDuty = ''
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
    margin-right: 8px;
}
</style>
