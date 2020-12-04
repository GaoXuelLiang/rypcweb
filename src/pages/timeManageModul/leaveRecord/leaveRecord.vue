<template>
    <div class="table">
        <Row>
            <i-Col span='24'>
                <card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        请假记录
                    </p>
                    <Row>
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
                        <DatePicker type="date"
                                    :clearable='false'
                                    placeholder="开始时间"
                                    :editable="false"
                                    v-model="startTime"
                                    style="width: 180px"></DatePicker>
                        <DatePicker type="date"
                                    :clearable='true'
                                    placeholder="结束时间"
                                    :editable="false"
                                    v-model="endTime"
                                    style="width: 180px"></DatePicker>

                        <span style="margin: 0;"><Button type="primary"
                                    @click="getData(1)">{{$t('button.ser')}}</Button></span>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
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
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import { isSuccess, deepCopy } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'

export default {
    data () {
        return {
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
                    key: 'requestPersonDis',
                    width: 100,
                },
                {
                    title: '公司',
                    key: 'positionCompDis',
                    width: 220,
                },
                {
                    title: '部门',
                    key: 'positionDeptDis',
                    width: 180,
                },
                {
                    title: '员工工号',
                    key: 'requestCode',
                    width: 160,
                },
                {
                    title: '请假类型',
                    key: 'requestCode',
                    width: 160,
                },
                {
                    title: '开始时间',
                    key: 'positionNameDis',
                    width: 160,
                },
                {
                    title: '结束时间',
                    key: 'positionNumber',
                    width: 160,
                },
                {
                    title: '请假事由',
                    key: 'positionSexDis',
                    width: 100,
                },
                {
                    title: '说明附件',
                    key: 'positionSexDis',
                    width: 160,
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
        searchHCompany,
        searchDept,
    },
    mounted () {
        this.getData(1)
    },
    methods: {
        /*
        *  点击分页
        * */
        refresh () {
            this.getData(1)
        },
        /*
        *  获取列表
        * */
        getData (page) {
            const t = this
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'RecruitePosition.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                requestCode: t.requestCode,
                positionComp: t.positionComp,
                positionDept: t.positionDept,
                startTime: t.startTime,
                endTime: t.endTime,
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
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    t.data.forEach((item, idx) => {
                        item.imgSrc = 'https://www.baidu.com/img/bd_logo1.png?qua=high'
                    })
                }
            }).catch(() => {
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
