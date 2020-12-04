<template>
    <div class="table">
        <Row>
            <i-Col span="24">
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        员工异动统计
                    </p>
                    <Row>
                        <Select class="btn"
                                v-model="empChgTotalStatus"
                                clearable
                                style="width: 200px;"
                                placeholder="请选择状态">
                            <Option :value="item.key"
                                    v-for="(item,index) in empChgTotalStatusList"
                                    :key="index">{{item.value}}</Option>
                        </Select>
                        <DatePicker class="btn"
                                    v-model="empChgTotalSmonth"
                                    type="month"
                                    format="yyyyMM"
                                    placeholder="请选择起始月份"
                                    style="width: 200px"></DatePicker>
                        <DatePicker class="btn"
                                    v-model="empChgTotalEmonth"
                                    type="month"
                                    format="yyyyMM"
                                    placeholder="请选择截止月份"
                                    style="width: 200px"></DatePicker>
                        <span class="btn"
                              @dblclick="opencompet(2)">
                            <Input v-model="empChgTotalCompDis"
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
                               :data="data"
                               show-summary
                               :summary-method="handleSummary"></Table>
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
/* eslint-disable no-trailing-spaces */

import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import autoSearchtable from '@/components/searchTableComponents/autoSearchtable'
export default {
    name: 'TransactionStatistics',
    data () {
        return {
            isSpin: false,
            expDataTital: [
                {
                    name: '月份',
                    code: 'empChgTotalMonth',
                },
                {
                    name: '公司',
                    code: 'empChgTotalCompDis',
                },
                {
                    name: '入职',
                    code: 'empChgTotalNewHrie',
                },
                {
                    name: '转正',
                    code: 'empChgTotalPro',
                },
                {
                    name: '调动',
                    code: 'empChgTotalTrans',
                },
                {
                    name: '合同续签',
                    code: 'empChgTotalCt',
                },
                {
                    name: '离职',
                    code: 'empChgTotalSep',
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
                    title: '月份',
                    key: 'empChgTotalMonth',
                    width: 140,
                    align: 'center',
                },
                {
                    title: '公司',
                    key: 'empChgTotalCompDis',
                },
                {
                    title: '入职',
                    key: 'empChgTotalNewHrie',
                },
                {
                    title: '转正',
                    key: 'empChgTotalPro',
                },
                {
                    title: '调动',
                    key: 'empChgTotalTrans',
                },
                {
                    title: '合同续签',
                    key: 'empChgTotalCt',
                },
                {
                    title: '离职',
                    key: 'empChgTotalSep',
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
            empChgTotalStatus: 'all',
            empChgTotalStatusList: [
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

            empChgTotalSmonth: '',
            empChgTotalEmonth: '',
            showModal: false,
            reqName: '',
            dataParams: {},
            empChgTotalCompDis: '',
            empChgTotalComp: '',
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
            t.empChgTotalStatus = 'all'
            t.empChgTotalSmonth = ''
            t.empChgTotalEmonth = ''
            t.showModal = false
            t.reqName = ''
            t.dataParams = {}
            t.empChgTotalCompDis = ''
            t.empChgTotalComp = ''
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
            if (t.empChgTotalEmonth.valueOf() < t.empChgTotalSmonth.valueOf() && t.empChgTotalSmonth && t.empChgTotalEmonth) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择正确的周期',
                })
                t.isSpin = false
                return
            }
            const data = {
                _mt:  this.$global.mt+'AnsrptEmpChangeTotal.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                empChgTotalStatus: this.empChgTotalStatus,
                empChgTotalSmonth: this.empChgTotalSmonth ? new Date(this.empChgTotalSmonth).format('yyyyMM') : '',
                empChgTotalEmonth: this.empChgTotalEmonth ? new Date(this.empChgTotalEmonth).format('yyyyMM') : '',
                empChgTotalComp: this.empChgTotalComp,
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
                empChgTotalStatus: this.empChgTotalStatus,
                empChgTotalSmonth: this.empChgTotalSmonth ? new Date(this.empChgTotalSmonth).format('yyyyMM') : '',
                empChgTotalEmonth: this.empChgTotalEmonth ? new Date(this.empChgTotalEmonth).format('yyyyMM') : '',
                empChgTotalComp: this.empChgTotalComp,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital, 'ansrptEmpChangeTotal.export', data)
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
                t.empChgTotalCompDis = row.unitsName
                t.empChgTotalComp = row.id
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
                t.empChgTotalCompDis = ''
                t.empChgTotalComp = ''
            }
        },
        handleSummary (columns) {
            const t = this
            const sums = {}
            columns.columns.forEach((column, index) => {
                const key = column.key
                if (index === 0) {
                    sums[key] = {
                        key,
                        value: '合计'
                    };
                    return;
                }
                if (column.key === 'empChgTotalMonth' || column.key === 'empChgTotalCompDis') {
                    sums[key] = {
                        key,
                        value: ''
                    };
                    return;
                }
                const values = columns.data.map(item => Number(item[key]));
                if (!values.every(value => isNaN(value))) {
                    const v = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[key] = {
                        key,
                        value: v
                    };
                } else {
                    sums[key] = {
                        key,
                        value: 'N/A'
                    };
                }
            })
            return sums
        }
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
