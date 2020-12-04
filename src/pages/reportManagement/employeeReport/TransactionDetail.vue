<template>
    <div class="table">
        <Row>
            <i-Col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        员工异动明细
                    </p>
                    <Row style="font-size:0;line-height:40px">
                        <Select class="btn"
                                v-model="empChgDetailStatus"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择状态">
                            <Option :value="item.key"
                                    v-for="(item,index) in empChgDetailStatusList"
                                    :key="index">{{item.value}}</Option>
                        </Select>
                        <DatePicker class="btn"
                                    v-model="empChgDetailSmonth"
                                    type="month"
                                    format="yyyyMM"
                                    placeholder="请选择起始月份"
                                    style="width: 200px"></DatePicker>
                        <DatePicker class="btn"
                                    v-model="empChgDetailEmonth"
                                    type="month"
                                    format="yyyyMM"
                                    placeholder="请选择截止月份"
                                    style="width: 200px"></DatePicker>

                        <Input class="btn"
                               v-model="empChgDetailCname"
                               style="width: 200px"
                               placeholder="请选择中文姓名" />
                        <span class="btn"
                              @dblclick="opencompet(2)">
                            <Input v-model="empChgDetailCompDis"
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
                                v-model="empChgDetailType"
                                clearable
                                style="width: 200px;"
                                placeholder="异动类别">
                            <Option :value="item.key"
                                    v-for="(item,index) in empChgDetailTypeList"
                                    :key="index">{{item.value}}</Option>
                        </Select>
                        <Select class="btn"
                                v-model="empChgDetailEmpType"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择员工类型">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empChgDetailEmpTypeList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <Select class="btn"
                                v-model="empChgDetailIfVip"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择是否VIP">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in empChgDetailIfVipList"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <span class="btn"><Button type="info"
                                    :loading="isSpin"
                                    @click="getData(1)">{{$t('button.ser')}}</Button></span>
                        <Button class="btn"
                                type="primary"
                                @click="expData">{{$t('button.exp')}}</Button>
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
export default {
    name: 'TransactionDetail',
    data () {
        return {
            isSpin: false,
            expDataTital: [
                {
                    name: '中文姓名',
                    code: 'empChgDetailCname',
                },
                {
                    name: '性别',
                    code: 'empChgDetailGender',
                },
                {
                    name: '员工工号',
                    code: 'empChgDetailWorkno',
                },
                {
                    name: '异动类别',
                    code: 'empChgDetailType',
                },
                {
                    name: '状态',
                    code: 'empChgDetailStatusDis',
                },
                {
                    name: '异动日期',
                    code: 'empChgDetailDate',
                },
                {
                    name: '公司',
                    code: 'empChgDetailCompDis',
                },
                {
                    name: '员工类型',
                    code: 'empChgDetailEmpTypeDis',
                },
                {
                    name: '是否VIP',
                    code: 'empChgDetailIfVipDis',
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
                    title: '中文姓名',
                    key: 'empChgDetailCname',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '性别',
                    key: 'empChgDetailGender',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '员工工号',
                    key: 'empChgDetailWorkno',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '异动类别',
                    key: 'empChgDetailType',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '状态',
                    key: 'empChgDetailStatusDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '异动日期',
                    key: 'empChgDetailDate',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '公司',
                    key: 'empChgDetailCompDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '员工类型',
                    key: 'empChgDetailEmpTypeDis',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '是否VIP',
                    key: 'empChgDetailIfVipDis',
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
            empChgDetailStatus: 'all',
            empChgDetailStatusList: [
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
            empChgDetailEmpType: '',
            empChgDetailEmpTypeList: [],
            empChgDetailSmonth: '',
            empChgDetailEmonth: '',
            showModal: false,
            reqName: '',
            dataParams: {},
            empChgDetailCompDis: '',
            empChgDetailComp: '',
            empChgDetailIfVip: '',
            empChgDetailIfVipList: [],
            empChgDetailType: '',
            empChgDetailTypeList: [
                {
                    value: '入职',
                    key: '入职',
                },
                {
                    value: '转正',
                    key: '转正',
                },
                {
                    value: '调动',
                    key: '调动',
                },
                {
                    value: '合同续签',
                    key: '合同续签',
                },
                {
                    value: '离职',
                    key: '离职',
                },
            ],
            empChgDetailCname: '',
        }
    },
    components: {
        expwindow,
        expdow,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            //        t.getData(1)
            t.getSelect()
            t.empChgDetailStatus = 'all'
            t.empChgDetailEmpType = ''
            t.empChgDetailEmpTypeList = []
            t.empChgDetailSmonth = ''
            t.empChgDetailEmonth = ''
            t.showModal = false
            t.reqName = ''
            t.dataParams = {}
            t.empChgDetailCompDis = ''
            t.empChgDetailComp = ''
            t.empChgDetailIfVip = ''
            t.empChgDetailIfVipList = []
            t.empChgDetailType = ''
            t.empChgDetailCname = ''
        }
    },
    methods: {
        refresh () {
            this.getData(1)
        },
        getData (page) {
            const t = this
            if (page) {
                t.page = page
            }
            if (t.empChgDetailEmonth.valueOf() < t.empChgDetailSmonth.valueOf() && t.empChgDetailSmonth && t.empChgDetailEmonth) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择正确的周期',
                })
                t.isSpin = false
                return
            }
            const data = {
                _mt:  this.$global.mt+'AnsrptEmpChangeDetail.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                empChgDetailStatus: this.empChgDetailStatus,
                empChgDetailSmonth: this.empChgDetailSmonth ? new Date(this.empChgDetailSmonth).format('yyyyMM') : '',
                empChgDetailEmonth: this.empChgDetailEmonth ? new Date(this.empChgDetailEmonth).format('yyyyMM') : '',
                empChgDetailComp: this.empChgDetailComp,
                empChgDetailIfVip: this.empChgDetailIfVip,
                empChgDetailEmpType: this.empChgDetailEmpType,
                empChgDetailType: this.empChgDetailType,
                empChgDetailCname: this.empChgDetailCname,
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
                    t.empChgDetailIfVipList = res.data.content[0].value[0].paramList
                    t.empChgDetailEmpTypeList = res.data.content[0].value[1].paramList
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
                empChgDetailStatus: this.empChgDetailStatus,
                empChgDetailSmonth: this.empChgDetailSmonth ? new Date(this.empChgDetailSmonth).format('yyyyMM') : '',
                empChgDetailEmonth: this.empChgDetailEmonth ? new Date(this.empChgDetailEmonth).format('yyyyMM') : '',
                empChgDetailComp: this.empChgDetailComp,
                empChgDetailIfVip: this.empChgDetailIfVip,
                empChgDetailEmpType: this.empChgDetailEmpType,
                empChgDetailType: this.empChgDetailType,
                empChgDetailCname: this.empChgDetailCname,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital, 'ansrptEmpChangeDetail.export', data)
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
                t.empChgDetailCompDis = row.unitsName
                t.empChgDetailComp = row.id
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
                t.empChgDetailCompDis = ''
                t.empChgDetailComp = ''
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
