<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>&nbsp;{{title}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="blocksTitle">
                <Icon type="compose"
                      style="margin-right: 5px;"></Icon>
                选择员工
            </div>
            <Row class="table-form">
                <!--<span @dblclick="dbHCompany">-->
                <!--<Input v-model="positionCompDis" style="width: 150px"  icon="ios-search" :readonly="true" placeholder="请选择公司"  @on-click="selectHCompany"/>-->
                <!--</span>-->
                <span @dblclick="clearDepart">
                    <Input placeholder="请选择部门"
                           style="width: 150px"
                           v-model="empcompDeptDis"
                           icon="ios-search"
                           :readonly="true"
                           @on-click="pickDepart" />
                </span>
                <span @dblclick="dbPost">
                    <Input placeholder="请选择岗位"
                           style="width: 150px"
                           icon="ios-search"
                           :readonly="true"
                           v-model="empcompPostDis"
                           @on-click="selectPost" />
                </span>
                <Input placeholder="请输入员工姓名"
                       style="width: 150px"
                       v-model="empCname" />
                <span style="margin: 0;"><Button type="primary"
                            @click="search"
                            :loading="isSpin">{{$t('button.ser')}}</Button></span>
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
                       height="250"
                       size="small"
                       border
                       ref="selection"
                       :columns="searchCloumns"
                       @on-sort-change="sortable"
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

            <div class="blocksTitle"
                 style="margin-top: 20px;">
                <Icon type="compose"
                      style="margin-right: 5px;"></Icon>
                选择时间
            </div>
            <Row>
                <Form class="content"
                      ref="upFormData"
                      :label-width="135">
                    <Row>
                        <i-col span="11">
                            <FormItem label="排班开始日期"
                                      prop='attShifmorningoff'>
                                <DatePicker type="date"
                                            format="yyyy-MM-dd"
                                            v-model="startTime"
                                            :editable='false'
                                            placeholder="请选择排班开始日期"
                                            style="width: 200px"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11">
                            <FormItem label="排班结束日期"
                                      prop='attShifmorningoff'>
                                <DatePicker type="date"
                                            format="yyyy-MM-dd"
                                            v-model="endTime"
                                            :editable='false'
                                            placeholder="请选择排班结束日期"
                                            style="width: 200px"></DatePicker>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="23">
                            <Row type="flex"
                                 justify="end">
                                <FormItem>
                                    <Button type="primary"
                                            :loading="isSpin"
                                            @click="save">{{$t('button.sav')}}</Button>
                                </FormItem>
                            </Row>
                        </i-col>
                    </Row>
                </Form>
            </Row>
        </div>
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
        <!--<transition name="fade">-->
        <!--<searchPost v-if="showSearchPost" @closeUpP="closeUpP" @changeinputP="changeinputP"></searchPost>-->
        <!--</transition>-->
        <!--岗位-->
        <transition name="fade">
            <searchPost v-show="openPost"
                        @closePost="closePost"
                        :searchPostClo="searchPostClo"
                        @inputPost="inputPost"
                        :params="paramsPost"
                        ref="searchPost"></searchPost>
        </transition>

    </div>
</template>
<script>
import searchHCompany from '../../../components/searchTable/searchHCompany'
import searchDept from '../../../components/searchTable/searchDept'
import searchPost from '../../../components/searchTable/searchPost'
import { getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    components: {
        searchHCompany,
        searchDept,
        searchPost,
    },
    data () {
        return {
            startTime: '', // 开始日期
            endTime: '', // 结束日期
            isSpin: false,
            title: '选择员工',
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
                    fixed: 'left',
                },
                {
                    title: '员工',
                    key: 'empCname',
                    fixed: 'left',
                },
                {
                    title: '工号',
                    key: 'empkiWorkno',
                    fixed: 'left',
                },
                {
                    title: this.$t('lang_performance.fileClass.checkCompany'),
                    key: 'empcompHirecompanyDis',
                    fixed: 'left',
                },
                {
                    title: this.$t('lang_performance.fileClass.checkSection'),
                    key: 'empcompDeptDis',
                    fixed: 'left',
                },
                {
                    title: this.$t('lang_performance.fileClass.checkStation'),
                    key: 'empcompPostDis',
                    fixed: 'left',
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
                unitType: '70dept,20city,30busi',
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
            //        positionComp: '',
            //        positionCompDis: '',
            empcompDept: '',
            empcompDeptDis: '',
            empcompPost: '',
            empcompPostDis: '',
        }
    },
    props: {
        logType: String,
        id: Number,
        positionComp: '',
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
            data.empcompPost = t.empcompPost
            data.empcompDept = t.empcompDept
            data.empcompHirecompany = t.positionComp
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
            this.positionComp = ''
            //        this.positionCompDis = ''
            this.empcompDept = ''
            this.empcompDeptDis = ''
            this.empcompPost = ''
            this.empcompPostDis = ''
            this.normName = ''
            this.params.page = 1
            this.startTime = ''
            this.endTime = ''
            this.$emit('hideMsg')
        },
        // 保存选择的员工
        save () {
            let t = this
            if (t.newArr.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
                return
            }
            if (!t.startTime) {
                t.$Message.warning('请选择排班开始日期')
                return
            }
            let params2 = {
                _mt:  this.$global.mt+'AttendTeammem.addOrUpd',
                funId: '1',
                logType: '班组新增员工',
                attTmmemEmpid: t.newArr.toString(),
                attTmmemTeamid: t.id,
                attTmmemSdate: t.startTime,
                attTmmemEdate: t.endTime,
            }
            if (params2.attTmmemSdate) {
                params2.attTmmemSdate = params2.attTmmemSdate === '' ? '' : new Date(params2.attTmmemSdate).format('yyyy-MM-dd')
            }
            if (params2.attTmmemEdate) {
                params2.attTmmemEdate = params2.attTmmemEdate === '' ? '' : new Date(params2.attTmmemEdate).format('yyyy-MM-dd')
            }
            t.isSpin = true
            getDataLevelUserLoginNew(params2).then((res) => {
                t.isSpin = false
                t.newArr = []
                t.$refs.selection.selectAll(false)
                if (isSuccess(res, t)) {
                    t.close()
                }
            }).catch(() => {
                t.isSpin = false
                t.newArr = []
                t.$refs.selection.selectAll(false)
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
        // 勾选
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.newArr = newArr
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
        padding: 60px 20px 0px 20px;
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
.blocksTitle {
    background-color: rgba(39, 142, 255, 0.2);
    font-size: 14px;
    padding: 0 20px;
    margin-bottom: 10px;
    height: 26px;
    font-weight: bold;
    line-height: 26px;
}
</style>
