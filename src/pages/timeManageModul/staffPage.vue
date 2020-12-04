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
            <!--<Row class="table-form">-->
            <!--<span @dblclick="clearDepart">-->
            <!--<Input placeholder="请选择部门" style="width: 200px" v-model="empcompDeptDis" icon="ios-search" :readonly="true"   @on-click="pickDepart"/>-->
            <!--</span>-->
            <!--<span @dblclick="dbPeriod">-->
            <!--<Input placeholder="请选择岗位" style="width: 200px" v-model="post" icon="ios-search" :readonly="true"   @on-click="selectPerid"/>-->
            <!--</span>-->
            <Input placeholder="请输入员工姓名"
                   style="width: 200px;margin-bottom: 10px"
                   v-model="empCname" />
            <span style="margin: 0;"><Button type="primary"
                        style="margin-bottom: 10px"
                        @click="search">{{$t('button.ser')}}</Button></span>
            <!--<span style="margin: 0;"><Button type="primary" @click="save">{{$t('button.sav')}}</Button></span>-->
            <!--</Row>-->
            <row class="table-form"
                 ref="table-form">
                <Table height="320"
                       size="small"
                       border
                       ref="selection"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
                       @on-selection-change="selectChange"
                       @on-select-cancel="selectCancel"
                       @on-row-dblclick="dbCkick"
                       :data="data"></Table>
                <!-- @on-row-dblclick="dbCkick" -->
            </row>
            <Page :total="total"
                  :current="params.page"
                  size="small"
                  show-elevator
                  show-sizer
                  placement="top"
                  @on-page-size-change="sizeChange"
                  @on-change="pageChange"
                  :page-size-opts="[10, 20, 50, 100]"></Page>
            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
        </div>
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
import searchDept from '../../../components/searchTable/searchDept'
import { getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    components: {
        searchDept,
    },
    data () {
        return {
            title: '选择考核对象',
            data: [],
            total: NaN,
            post: '',
            postId: '',
            showSearchPost: false,
            newArr: [],
            current: 1,
            empCname: '',
            searchCloumns: [
                {
                    title: this.$t('lang_performance.fileClass.checkStaff'),
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
            },
            //      部门
            empcompDept: '',
            empcompDeptDis: '',
            openDept: false,
            searchDeptClo: [
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
    props: {
        logType: String,
        id: Number,
    },
    mounted () {

    },
    methods: {
        dbCkick (row) {
            const t = this
            t.empCname = ''
            this.$emit('changeinput', row.empCname, row.id)
            this.getData()
            t.close()
        },
        search () {
            this.params.page = 1
            this.getData()
        },
        getData () {
            const t = this
            let data = deepCopy(t.params)
            data.empCname = t.empCname
            data.empcompPost = t.postId
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
        },
        // 保存选择的员工
        save () {
            let t = this;
            let params2 = {
                _mt:  this.$global.mt+'EvaluationTargetemp.addList',
                funId: '1',
                logType: '新增考核对象',
                evateEmpid: t.newArr.toString(),
                evateActionid: this.id
            }
            getDataLevelUserLoginNew(params2).then((res) => {
                t.newArr = [];
                if (isSuccess(res, t)) {
                    t.close();
                }
            }).catch(() => {
                t.newArr = []
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
        // 多选触发函数
        selectChange (row) {
            let t = this;
            for (let i = 0; i <= row.length - 1; i++) {
                if (t.newArr.indexOf(row[i].id) == -1) {
                    t.newArr.push(row[i].id)
                }
            }
        },
        // 取消选中时触发
        selectCancel (selection, row) {
            let t = this
            for (let i = 0; i <= t.newArr.length - 1; i++) {
                if (t.newArr[i] == row.id) {
                    t.newArr.splice(i, 1)
                }
            }
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
