<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>{{title}} (当前组织: {{pname}})
                </div>
                <span class="title-close" @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </span>
            </div>
            <Row class="table-form">
                <!--<span @dblclick="dbHCompany">-->
                <!--<Input v-model="positionCompDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择公司"  @on-click="selectHCompany"/>-->
                <!--</span>-->
                <!--<span @dblclick="clearDepart">-->
                <!--<Input placeholder="请选择部门" style="width: 150px" v-model="empcompDeptDis" icon="ios-search" :readonly="true" -->
                <!--@on-click="pickDepart"/>-->
                <!--</span>-->
                <!--<span @dblclick="dbPost">-->
                <!--<Input placeholder="请选择岗位" style="width: 150px"  icon="ios-search" :readonly="true" v-model="empcompPostDis" @on-click="selectPost"/>-->
                <!--</span>-->
                <Input placeholder="请输入用户姓名" class="searchInput" v-model="empCname" />
                <span class="btnStyle">
                    <Button type="info" @click="search" style="width:56px" :loading="isSpin">
                        <span v-if="!isSpin">{{$t('button.ser')}}</span>
                    </Button>
                </span>
                <span class="btnStyle"><Button type="primary" @click="save">{{$t('button.sav')}}</Button></span>
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Spin fix v-if="isSpin" size="large"></Spin>
                <Table height="320"
                       size="small"
                       stripe
                       ref="selection"
                       :no-data-text="noDataImg"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
                       @on-select="selectedtable"
                       @on-select-cancel="selectedtable"
                       @on-select-all="selectedtable"
                       @on-select-all-cancel="selectedtable"
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
        </div>
        <!--雇佣公司-->
        <!--<transition name="fade">-->
        <!--<searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>-->
        <!--</transition>-->
        <!--<transition name="fade">-->
        <!--<searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept"-->
        <!--:params="paramsDept" ref="searchDept"></searchDept>-->
        <!--</transition>-->
        <!--&lt;!&ndash;岗位&ndash;&gt;-->
        <!--<transition name="fade">-->
        <!--<searchPost v-show="openPost" @closePost="closePost" :searchPostClo="searchPostClo" @inputPost="inputPost" :params="paramsPost" ref="searchPost"></searchPost>-->
        <!--</transition>-->

    </div>
</template>
<script>
//  import searchHCompany from '../../../components/searchTable/searchHCompany'
//  import searchDept from '../../../components/searchTable/searchDept'
//  import searchPost from '../../../components/searchTable/searchPost'
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    components: {
        //      searchHCompany,
        //      searchDept,
        //      searchPost,
    },
    data () {
        return {
            isSpin: false,
            title: '选择用户',
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
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    //            fixed: 'left',
                },
                {
                    title: '姓名',
                    key: 'userName',
                    //            fixed: 'left',
                },
                {
                    title: '邮箱',
                    key: 'email',
                    //            fixed: 'left',
                },
                {
                    title: '用户登陆名',
                    key: 'loginName',
                    //            fixed: 'left',
                },
                //          {
                //            title: this.$t('lang_performance.fileClass.checkCompany'),
                //            key: 'empcompHirecompanyDis',
                //            fixed: 'left',
                //          },
                //          {
                //            title: this.$t('lang_performance.fileClass.checkSection'),
                //            key: 'empcompDeptDis',
                //            fixed: 'left',
                //          },
                //          {
                //            title: this.$t('lang_performance.fileClass.checkStation'),
                //            key: 'empcompPostDis',
                //            fixed: 'left',
                //          },
            ],
            params: {
                _mt:  this.$global.mt+'SysUserinfo.getUserinfoByPage',
                funId: '1',
                logType: '查询',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'asc',
                funId: '1',
                sysBsvalid: '1',
            },
            //      雇佣公司
            openHCompany: false,
            searchHCClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '公司名称',
                    key: 'compFnameCnDis',
                },
                //          {
                //            title: this.$t('lang_employee.searchColumn.compEnFullName'),
                //            key: 'compFnameEnDis',
                //          },
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
            // 部门
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
                //          {
                //            title: this.$t('lang_employee.searchColumn.departEnFullName'),
                //            key: 'compFnameEnDis',
                //          },
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
            //      岗位
            openPost: false,
            searchPostClo: [
                {
                    title: this.$t('lang_employee.searchColumn.postCode'),
                    key: 'postCode',
                    sortable: 'custom',
                },
                {
                    title: '岗位名称',
                    key: 'postFnameCnDis',
                },
            ],
            paramsPost: {
                _mt:  this.$global.mt+'OrgPost.getPage',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                funId: '1107',
                logType: '岗位',
            },
            positionComp: '',
            positionCompDis: '',
            empcompDept: '',
            empcompDeptDis: '',
            empcompPost: '',
            empcompPostDis: '',
            tableselected: [],
            noDataImg: '<div id="noData"></div>',
        }
    },
    props: {
        logType: String,
        pid: String,
        pname: String,
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
            data.userName = t.empCname
            //        data.empcompPost = t.empcompPost
            //        data.empcompDept = t.empcompDept
            //        data.empcompHirecompany = t.positionComp
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
                    t.current = res.data.content[0].page
                }
            }).catch(() => {
                t.isSpin = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        close () {
            this.empCname = ''
            //        this.positionComp = ''
            //        this.positionCompDis = ''
            //        this.empcompDept = ''
            //        this.empcompDeptDis = ''
            //        this.empcompPost = ''
            //        this.empcompPostDis = ''
            //        this.normName = ''
            this.params.page = 1
            this.tableselected = []
            this.$emit('hideMsg')
        },
        // 保存选择的员工
        save () {
            let t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                let params2 = {
                    _mt:  this.$global.mt+'AuthRolePower.addMgUserForOrgUnit',
                    // funId: '1',
                    logType: '选择用户',
                    unitId: t.pid,
                    sysUserIds: t.tableselected.toString(),
                }
                getDataLevelUserLogin(params2).then((res) => {
                    t.tableselected = []
                    if (isSuccess(res, t)) {
                        t.$Modal.success({
                            title: this.$t('reminder.suc'),
                            content: '保存成功',
                        })
                        t.close()
                    }
                }).catch(() => {
                    t.tableselected = []
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
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
        // 多选触发函数
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
            t.clearDepart()
        },
        // 选择部门
        pickDepart () {
            const t = this
            if (t.positionComp === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empHireCompDis'),
                })
            } else {
                const paramsDept = deepCopy(t.paramsDept)
                t.$refs.searchDept.getData(paramsDept, t.positionComp)
                t.openDept = true
            }
            //        const paramsDept = deepCopy(t.paramsDept)
            //        t.$refs.searchDept.getData(paramsDept, '')
            //        t.openDept = true
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
            t.dbPost()
        },
        closeDept () {
            const t = this
            t.$refs.searchDept.unitCode = ''
            t.openDept = false
        },
        //  	岗位
        selectPost () {
            const t = this
            if (t.empcompDept === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_employee.empmaster.empPostDis'),
                })
            } else {
                const paramsPost = deepCopy(t.paramsPost)
                //	    		paramsPost.postUnit = 'unit' + t.formEmpValidate.compDeptPid
                t.$refs.searchPost.getData(paramsPost, 'unit' + t.empcompDept)
                t.openPost = true
            }
        },
        closePost () {
            const t = this
            t.$refs.searchPost.postCode = ''
            t.openPost = false
        },
        inputPost (name, id, postName, postId) {
            const t = this
            t.empcompPost = id
            t.empcompPostDis = name
        },
        dbPost () {
            const t = this
            t.empcompPost = ''
            t.empcompPostDis = ''
        },
    },
}
</script>
<style lang="scss" scoped>
 @import "../../../sass/searchTable";
 .title-close{
    padding:0 20px 0 0;
    display:flex;
    justify-content: center;
    align-items:center;
    cursor: pointer;
}
.title-close:hover /deep/ .ivu-icon-md-close{
    color:#5cadff !important;
}
</style>
