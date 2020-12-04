<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;选择员工
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row class="table-form">
                <span @dblclick="dbHCompany">
                    <Input v-model="positionCompDis"
                           style="width: 160px"
                           icon="ios-search"
                           :readonly="true"
                           :placeholder="$t('lang_payroll.payAdd.pladCompanyDis')"
                           @on-click="selectHCompany" />
                </span>
                <span @dblclick="clearDepart">
                    <Input placeholder="请选择部门"
                           style="width: 160px"
                           v-model="empcompDeptDis"
                           icon="ios-search"
                           :readonly="true"
                           @on-click="pickDepart" />
                </span>
                <!--<span @dblclick="dbPeriod">-->
                <!--<Input placeholder="请选择岗位" style="width: 200px" v-model="post" icon="ios-search" :readonly="true"   @on-click="selectPerid"/>-->
                <!--</span>-->
                <Input placeholder="请输入员工姓名"
                       style="width: 160px"
                       v-model="empCname" />
                <span style="margin: 0;"><Button type="primary"
                            @click="search">{{$t('button.ser')}}</Button></span>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Table @on-select="selectedtable"
                       @on-select-cancel="selectedtable"
                       @on-select-all="selectedtable"
                       @on-select-all-cancel="selectedtable"
                       @on-sort-change="sortable"
                       height="320"
                       size="small"
                       border
                       ref="selection"
                       :columns="searchCloumns"
                       :data="data"></Table>
            </row>
            <row style="display: flex">
                <Page :total="total"
                      :current="params.page"
                      size="small"
                      show-elevator
                      show-sizer
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page>
                <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
            </row>
            <Row>
                <i-col span="23">
                    <Row type="flex"
                         justify="end">
                        <Button style='margin-right: 10px;'
                                @click="close">{{$t('button.clo')}}</Button>
                        <Button type="primary"
                                @click="save">{{$t('button.join')}}</Button>
                    </Row>
                </i-col>
            </Row>
        </div>
        <!--<transition name="fade">-->
        <!--<searchPost v-if="showSearchPost" @closeUpP="closeUpP" @changeinputP="changeinputP"></searchPost>-->
        <!--</transition>-->
        <!--雇佣公司-->
        <transition name="fade">
            <searchHCompany v-show="openHCompany"
                            @closeHCompany="closeHCompany"
                            :searchHCClo="searchHCClo"
                            @inputHCompany="inputHCompany"
                            :params="paramsHCompany"
                            ref="searchHCompany"></searchHCompany>
        </transition>
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
//  import searchPost from './searchPost.vue'
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    components: {
        //      searchPost,
        searchHCompany,
        searchDept,
    },
    data () {
        return {
            tableselected: [],
            title: '选择考核对象',
            data: [],
            total: NaN,
            post: '',
            postId: '',
            showSearchPost: false,
            current: 1,
            empCname: '',
            searchCloumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '员工工号',
                    key: 'empkiWorkno',
                },
                {
                    title: '中文名',
                    key: 'empCname',
                },
                {
                    title: this.$t('lang_performance.fileClass.checkCompany'),
                    key: 'empcompHirecompanyDis',
                },
                {
                    title: this.$t('lang_performance.fileClass.checkSection'),
                    key: 'empcompDeptDis',
                },
                {
                    title: this.$t('lang_performance.fileClass.checkStation'),
                    key: 'empcompPostDis',
                },
            ],
            params: {
                _mt:  this.$global.mt+'ViewEmpMaster.getPage',
                funId: '1',
                logType: '查询要添加的员工信息列表',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'asc',
                funId: '1',
            },
            //  选择雇佣公司
            positionComp: '',
            positionCompDis: '',
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
            empcompDept: '',
            empcompDeptDis: '',
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
        }
    },
    mounted () {

    },
    methods: {
        search () {
            this.params.page = 1
            this.getData()
        },
        getData () {
            const t = this
            let data = deepCopy(t.params)
            data.empCname = t.empCname
            data.empcompHirecompany = t.positionComp
            data.empcompDept = t.empcompDept
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    t.current = res.data.content[0].page
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        close () {
            this.normName = ''
            this.params.page = 1
            this.$emit('hideMsg')
            this.$emit('getData', 1)
        },
        // 保存选择的员工
        save () {
            let t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
                return
            }
            let params2 = {
                _mt:  this.$global.mt+'EmpBatchadjust.addListByEmpIds',
                funId: '1',
                logType: '添加员工',
                empIds: t.tableselected.join(','),
            }
            getDataLevelUserLogin(params2).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Message.success({
                        content: '加入成功',
                        duration: 3,
                    })
                    t.tableselected = []
                    t.close()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        sizeChange (size) {
            const t = this
            t.params.rows = size
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.params.page = page
            t.getData()
        },
        // 点击弹出岗位弹窗
        selectPerid () {
            let t = this
            t.showSearchPost = true
        },
        // 双击清除选中岗位
        dbPeriod () {
            let t = this
            t.post = ''
            t.postId = ''
        },
        // 关闭岗位弹窗
        closeUpP () {
            let t = this
            t.showSearchPost = false
        },
        // 双击选中岗位
        changeinputP (row, id) {
            let t = this
            t.showSearchPost = false
            t.post = row.postFnameCnDis
            t.postId = id
        },
        // 多选
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        // 修改列表排序
        sortable (column) {
            this.params.sort = column.key
            this.params.order = column.order
            if (column.order !== 'normal') {
                this.getData()
            } else {
                this.params.order = 'desc'
            }
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
        },
        // 选择部门
        pickDepart () {
            const t = this
            const paramsDept = deepCopy(t.paramsDept)
            t.$refs.searchDept.getData(paramsDept, '')
            t.openDept = true
        },
        inputDept (name, id) {
            const t = this
            t.empcompDeptDis = name
            t.empcompDept = id
        },
        clearDepart () {
            const t = this
            t.empcompDeptDis = ''
            t.empcompDept = ''
        },
        closeDept () {
            const t = this
            t.$refs.searchDept.unitCode = ''
            t.openDept = false
        },
    },
}
</script>
<style lang="scss" scoped>
.table-form {
    margin-bottom: 10px;
}
.background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
        position: relative;
        width: 800px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;

            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
</style>
