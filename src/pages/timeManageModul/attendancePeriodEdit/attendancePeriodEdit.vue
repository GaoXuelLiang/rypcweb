<template>
    <div class="table">
        <Row>
            <i-Col span='24'>
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        期间数据修改
                    </p>
                    <Row>
                        <!--<DatePicker type="date" :clearable='false' placeholder="日期" :editable="false" v-model="attUpdrecWorkdate" style="width: 180px"></DatePicker>-->
                        <Input placeholder="请输入员工姓名"
                               style="width: 180px"
                               v-model="requestCode" />
                        <span @dblclick="dbHCompany">
                            <Input v-model="positionCompDis"
                                   style="width: 180px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择公司"
                                   @on-click="selectHCompany" />
                        </span>
                        <span @dblclick="clearDepart">
                            <Input v-model="positionDeptDis"
                                   style="width: 180px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择部门"
                                   @on-click="pickDepart" />
                        </span>
                        <span @dblclick="clearPeriod">
                            <Input @on-click="pickDataPeriod"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择期间"
                                   style="width: 200px"
                                   v-model="sicalcPeriodDis" />
                        </span>
                        <Button type="primary"
                                :loading="isSpin"
                                @click="getData(1)">{{$t('button.ser')}}</Button>
                        <Button type="primary"
                                @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
                        <Button type="error"
                                @click="deletemsg">{{$t('button.del')}}</Button>
                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
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
        <!--编辑-->
        <transition name="fade">
            <update v-show="openUpdate"
                    :logType="logType"
                    @closeUpd="closeUpd"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
    </div>
</template>

<script>
import searchFyperiod from '../../../components/searchTable/searchFyperiod'
import advanced from '@/components/searchTable/searchAdvanced'
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import update from './update.vue'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    name: 'attendancePeriodEdit',
    data () {
        return {
            isSpin: false,
            tableselected: [],
            openUpdate: false,
            showAdvanced: false,
            rows: 10,
            page: 1,
            sort: 'id', // 排序字段
            order: 'asc', // 排序类型
            requestCode: '', // 员工
            //        attUpdrecWorkdate: '', // 日期
            //        startTime: '', // 开始时间
            //        stopTime: '', // 结束时间
            //        attUpdrecChkintime: '', // 时间
            openPickPeriod: false, // 期间弹出
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
                unitType: '01company',
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
                    key: 'attUpdrecEmpDis',
                    width: 100,
                    sortable: 'custom',
                    fixed: 'left',
                },
                {
                    title: '公司',
                    key: 'attUpdrecCompidDis',
                    width: 230,
                    sortable: 'custom',
                },
                {
                    title: '部门',
                    key: 'attUpdrecDeptidDis',
                    width: 230,
                    sortable: 'custom',
                },
                {
                    title: '员工工号',
                    key: 'attUpdrecEmpno',
                    width: 210,
                    sortable: 'custom',
                },
                {
                    title: '打卡时间',
                    key: 'attUpdrecChkintime',
                    width: 210,
                    sortable: 'custom',
                },
                {
                    title: '进出标志',
                    key: 'attUpdrecRemarkDis',
                    width: 210,
                    sortable: 'custom',
                },
                {
                    title: '修改原因',
                    key: 'attUpdrecUpdresDis',
                    width: 210,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    fixed: 'right',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                },
                                style: {
                                    marginLeft: '5px',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, '修改'),
                        ])
                    },
                },

            ],
            total: 0,
            data: [],
            logType: '',
            index: 0,
            tableheight: document.body.offsetHeight - 250, // table高度

        }
    },
    components: {
        searchFyperiod,
        searchHCompany,
        searchDept,
        update,
        advanced,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.requestCode = ''
            t.positionComp = ''
            t.positionCompDis = ''
            t.positionDept = ''
            t.positionDeptDis = ''
            t.sicalcPeriodDis = ''
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
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            //        if (t.attUpdrecWorkdate !== undefined) {
            //          t.attUpdrecWorkdate = t.attUpdrecWorkdate === '' ? '' : new Date(t.attUpdrecWorkdate).format('yyyy-MM-dd')
            //        }
            const data = {
                _mt:  this.$global.mt+'AttendUpdrecord.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                attUpdrecEmpDis: t.requestCode,
                attUpdrecCompid: t.positionComp,
                attUpdrecDeptid: t.positionDept,
                attEmpsfPeriod: t.sicalcPeriodDis,
                //          attUpdrecWorkdate: t.attUpdrecWorkdate,
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
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        deletemsg () {
            const t = this
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
                        getDataLevelUserLogin({
                            _mt:  this.$global.mt+'AttendUpdrecord.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getData()
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
        openUp (id, logType, index) {
            const t = this
            t.openUpdate = true
            t.logType = logType
            t.index = index
            t.$refs.update.getSelect()
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
            }
        },
        closeUpd () {
            const t = this
            t.openUpdate = false
        },
        // 新增修改后刷新页面
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
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
            t.clearDepart()
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
