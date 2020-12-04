<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    年假信息管理
                </p>
                <Row class="btnHeight">
                    <span>
                        <Select style="width: 200px"
                                v-model="appAnbrkYear"
                                @on-change="getData(1)"
                                placeholder="请输入年度">
                            <Option :value="item.fyYear"
                                    v-for="(item,index) in selectFyear"
                                    :key="index">{{item.fyYear}}</Option>
                        </Select>
                    </span>
                    <span @dblclick="dbHCompany">
                        <Input v-model="positionCompDis"
                               style="width: 200px"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="$t('lang_payroll.payAdd.pladCompanyDis')"
                               @on-click="selectHCompany" />
                    </span>
                    <!--<span @dblclick="clearDepart">-->
                    <!--<Input v-model="positionDeptDis" style="width: 160px"  icon="ios-search" :readonly="true"  :placeholder="$t('lang_payroll.payAdd.pladDeptDis')"  @on-click="pickDepart"/>-->
                    <!--</span>-->
                    <span @dblclick="dbHCompanyTwo">
                        <Input v-model="pladCompanyDisTwo"
                               style="width: 200px"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="选择员工"
                               @on-click="showMsgBtn(NaN,$t('button.add'))" />
                    </span>
                    <span style="margin: 0;">
                        <!-- <Button type="info"
                                :loading="isSpin"
                                @click="getData(1)">{{$t('button.ser')}}</Button> -->
                        <!-- <Button type="warning" v-if="AccessControl.toString().includes('button_add')" :loading="isSpin" @click="openUp(null,$t('button.add'))">新增</Button>
            <Button type="error"  v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button> -->
                        <!--<Button type="primary" :loading="isSpin"  @click="getData(1)">{{$t('button.ser')}}</Button>-->
                        <btn-list @operatorBtn="operatorBtn"
                                  @openUp="btnEvent">
                        </btn-list>
                    </span>
                    <!-- <Button type="primary" v-if="AccessControl.toString().includes('button_checklevda')" @click="generateVacadata">核算</Button>
          <Button type="primary"   v-if="AccessControl.toString().includes('button_export')" @click="expData">{{$t('button.exp')}}</Button>
          <Button type="primary" v-if="AccessControl.toString().includes('button_import')"  @click="importExcel">{{$t('button.imp')}}</Button> -->
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
                           stripe
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :total="total"
                          size="small"
                          :current="page"
                          show-elevator
                          show-sizer
                          placement="top"
                          @on-page-size-change="sizeChange"
                          @on-change="pageChange"
                          :page-size-opts="[10, 20, 50, 100]"></Page>
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                            shape="circle"
                            icon="md-refresh"
                            style="margin-left: 20px;display: inline-block;"
                            @click="getData(1)"></Button>
                </Row>
            </card>
            </Col>
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
        <transition name="fade">
            <searchDept v-show="openDept"
                        @closeDept="closeDept"
                        :searchDeptClo="searchDeptClo"
                        @inputDept="inputDept"
                        :params="paramsDept"
                        ref="searchDept"></searchDept>
        </transition>
        <!--岗位-->
        <transition name="fade">
            <searchPost v-show="openPost"
                        @closePost="closePost"
                        :searchPostClo="searchPostClo"
                        @inputPost="inputPost"
                        :params="paramsPost"
                        ref="searchPost"></searchPost>
        </transition>

        <!-- 员工 -->
        <transition name="fade">
            <staffPage v-show="showMsg"
                       :logType="logType"
                       ref="staffPage"
                       @hideMsg="hideMsg"
                       @changeinput="changeinput"></staffPage>
        </transition>
        <transition name="fade">
            <update v-show="openUpdate"
                    :logType="logType"
                    ref="update"
                    @close="close"
                    @getData="getData"></update>
        </transition>

        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>

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

        <!--导入-->
        <transition name="fade">
            <importExcel v-show="openImport"
                         :impid="updateId"
                         :imp_mt="imp_mt"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>

    </div>
</template>
<script>
import searchHCompany from '../../../components/searchTable/searchHCompany'
import importExcel from '../../../components/importModel/importParam'
import advanced from '@/components/searchTable/searchAdvanced'
import searchDept from '../../../components/searchTable/searchDept'
import searchPost from '../../../components/searchTable/searchPost'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import staffPage from './staffPage'
import update from './update'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'annualRule',
    data () {
        return {
            openExp: false,
            openExpDow: false,
            imp_mt:  this.$global.mt+'ApplyAnandbrk.importData',
            openImport: false,
            isSpin: false,
            filename: '',
            filekey: '',
            tableheight: document.body.offsetHeight - 250,
            logType: '',
            updateId: NaN,
            showAdvanced: false,
            showMsg: false,
            select: this.$t('button.all'),
            tableselected: [],
            AccessControl: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '年度',
                    key: 'appAnbrkYear',
                    width: 140,
                },
                {
                    title: '员工',
                    key: 'appAnbrkEmpDis',
                    width: 140,
                },
                {
                    title: '公司',
                    key: 'appAnbrkCompidDis',
                    width: 140,
                },
                {
                    title: '部门',
                    key: 'appAnbrkDeptidDis',
                    width: 140,
                },
                {
                    title: '岗位',
                    key: 'appAnbrkPostidDis',
                    width: 140,
                },
                {
                    title: '员工号',
                    key: 'appAnbrkEmpno',
                    width: 140,
                },
                {
                    title: '年假配额(小时)',
                    key: 'appAnbrkQuota',
                    width: 140,
                },
                {
                    title: '年假配额(天)',
                    key: 'appAnbrkQuotaHour',
                    width: 140
                },
                {
                    title: '年假已休(小时)',
                    key: 'appAnbrkFinished',
                    width: 140,
                },
                {
                    title: '年假已休(天)',
                    key: 'appAnbrkFinishedHour',
                    width: 140,
                },
                {
                    title: '审批中年假(小时)',
                    key: 'appAnbrkApping',
                    width: 140,
                },
                {
                    title: '审批中年假(天)',
                    key: 'appAnbrkAppingHour',
                    width: 140,
                },
                {
                    title: '剩余年假(小时)',
                    key: 'appAnbrkSerplus',
                    width: 140,
                },
                {
                    title: '剩余年假(天)',
                    key: 'appAnbrkSerplusHour',
                    width: 140,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    fixed: 'right',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                        // return h('div', [
                        //   h('Button', {
                        //     props: {
                        //       type: 'info',
                        //       size: 'small',
                        //     },
                        //     on: {
                        //       click: () => {
                        //         this.openUp(params.row.id, '修改', params.index)
                        //       },
                        //     },
                        //   }, '修改'),
                        // ])
                    },
                },
            ],
            //      部门
            openDept: false,
            searchDeptClo: [
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '部门名称',
                    key: 'compFnameCnDis',
                },
                // {
                //   title: this.$t('lang_employee.searchColumn.departEnFullName'),
                //   key: 'compFnameEnDis',
                // },
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
            //  选择雇佣公司
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
                // {
                //   title: this.$t('lang_employee.searchColumn.compEnFullName'),
                //   key: 'compFnameEnDis',
                // },
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
            // 岗位
            openPost: false,
            openUpdate: false,
            searchPostClo: [
                {
                    title: this.$t('lang_employee.searchColumn.postCode'),
                    key: 'postCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameCnDis'),
                    key: 'postFnameCnDis',
                },
                {
                    title: this.$t('lang_employee.searchColumn.postFnameEnDis'),
                    key: 'postFnameEnDis',
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
            expDataTital: [
                { code: 'appAnbrkYear', name: '年度' },
                { code: 'appAnbrkEmpDis', name: '员工' },
                { code: 'appAnbrkCompidDis', name: '公司' },
                { code: 'appAnbrkDeptidDis', name: '部门' },
                { code: 'appAnbrkPostidDis', name: '岗位' },
                { code: 'appAnbrkEmpno', name: '员工号' },
                { code: 'appAnbrkQuota', name: '年假配额(小时)' },
                { code: 'appAnbrkQuotaHour', name: '年假配额(天)' },
                { code: 'appAnbrkFinished', name: '年假已休(小时)' },
                { code: 'appAnbrkFinishedHour', name: '年假已休(天)' },
                { code: 'appAnbrkApping', name: '审批中年假(小时)' },
                { code: 'appAnbrkAppingHour', name: '审批中年假(天)' },
                { code: 'appAnbrkSerplus', name: '剩余年假(小时)' },
                { code: 'appAnbrkSerplusHour', name: '剩余年假(天)' }
            ],
            data: [],
            selectFyear: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            pladCompanyDisTwo: '',
            positionCompDis: '',
            positionDeptDis: '',
            positionComp: '',
            positionDept: '',
            appAnbrkYear: '2020',
            appAnbrkEmp: '',
            btnArr: []
        }
    },
    computed: {
    },
    components: {
        searchHCompany,
        searchDept,
        searchPost,
        staffPage,
        update,
        importExcel,
        advanced,
        expwindow,
        expdow,
        btnList,
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.appAnbrkYear = '2020'
            t.appAnbrkEmp = ''
            t.appAnbrkEmpDis = ''
            t.positionComp = ''
            t.positionCompDis = ''
            t.positionDept = ''
            t.positionDeptDis = ''
            t.getData(1)
            t.getSelect()
            t.getFiscalYearSelect()
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
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            if (t.appAnbrkYear === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.err'),
                    content: '请选择年度',
                })
                return
            }
            const data = {
                _mt:  this.$global.mt+'ApplyAnandbrk.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                appAnbrkYear: t.appAnbrkYear, // 年度
                appAnbrkEmp: t.appAnbrkEmp, // 员工
                appAnbrkCompid: t.positionComp, // 公司
                //          appAnbrkDeptid: t.positionDept, // 部门
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
                console.log(res)
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
                this.btnControl(this).then((res1) => {
                    if (isSuccess(res1, t)) {
                        res1.data.content[0].value.forEach((item) => {
                            t.AccessControl.push(item.btnLancode)
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }).catch(() => {
                t.isSpin = false
                //          t.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        // 根据状态 获取值
        getPageByState (value) {
            this.appAnbrkStatus = value
            this.getData(1)
        },
        // 根据季度，生成员工的休假数据
        generateVacadata () {
            const t = this
            if (t.appAnbrkYear === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择年度',
                })
                return
            }
            if (t.positionComp === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择公司',
                })
                return
            }
            const data = {
                _mt:  this.$global.mt+'ApplyAnandbrk.generateVacadata',
                logType: '生成年假休假数据',
                appAnbrkYear: t.appAnbrkYear, // 年度
                appAnbrkCompid: t.positionComp, // 年度
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.getData(1)
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: t.appAnbrkYear + '年度调休数据核算成功!',
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        generaBtn (h, params) {
            let arr = []
            this.btnArr.forEach((item) => {
                arr.push(
                    h('Button', {
                        props: {
                            type: item.btnLancode === 'button_y_upd' ? 'success' : 'primary',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                                this.openUp(params.row.id, item.name, params.index)
                            },
                        },
                    }, item.name),
                )
            })
            return arr
        },
        operatorBtn (btnList) {
            btnList.map((item) => {
                item.name = this.$t(`${item.btnLancode.split('_').join('.')}`)
            })
            this.btnArr = btnList
        },
        btnEvent (code) {
            switch (code) {
                case 'button_add':
                    this.openUp(NaN, this.$t('button.add'))
                    break;
                case 'button_del':
                    this.deletemsg()
                    break;
                case 'button_export':
                    this.expData()
                    break;
                case 'button_import':
                    this.importExcel()
                    break;
                case 'button_checklevda':
                    this.generateVacadata()
                    break;
                case 'button_query':
                    this.getData(1)
                    break;
            }
        },
        //  	雇佣公司
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        showMsgBtn (id, logType, index) {
            const t = this
            t.showMsg = true
            t.index = index
            t.logType = logType
            t.$refs.staffPage.getData()
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
            // const paramsDept = deepCopy(t.paramsDept)
            // t.$refs.searchDept.getData(paramsDept, t.pladCompany)
            // t.openDept = true
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
        // 岗位
        selectPost () {
            const t = this
            const paramsPost = deepCopy(t.paramsPost)
            t.$refs.searchPost.getData(paramsPost, '')
            t.openPost = true
        },
        closePost () {
            const t = this
            t.$refs.searchPost.postCode = ''
            t.openPost = false
        },
        inputPost (name, id, postName, postId) {
            const t = this
            t.positionNameDis = name
            t.positionName = id
        },
        dbPost () {
            const t = this
            t.positionNameDis = ''
            t.positionName = ''
        },
        // 公用基础方法
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
        // 选择员工
        dbHCompanyTwo () {
            const t = this
            t.pladCompanyDisTwo = ''
            t.appAnbrkEmp = ''
        },
        changeinput (name, id) {
            const t = this
            t.pladCompanyDisTwo = name
            t.appAnbrkEmp = id
            t.showMsg = false
        },
        hideMsg () {
            let t = this
            t.showMsg = false
        },
        close () {
            let t = this
            t.openUpdate = false
        },
        openUp (id, logType, index) {
            const t = this
            t.logType = logType
            t.openUpdate = true
            t.index = index
            if (logType === '修改') {
                t.$refs.update.getData(id)
                t.$refs.update.getSelect()
            } else if (logType === '添加') {
                t.$refs.update.getData()
                t.$refs.update.getSelect()
            }
        },
        // 删除
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
                            //                _mt:  this.$global.mt+'ApplyVacation.delByIds',
                            _mt:  this.$global.mt+'ApplyAnandbrk.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected.toString(),
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
                    onCancel: () => {
                    },
                })
            }
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'annualevalHandlstatus',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.AppAnbrkStatus = res.data.content[0].value[0].paramList.splice(1)
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getFiscalYearSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatFiscalyear.getSelectValue',
                data: '{}',
                logType: this.$t('button.ser'),
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectFyear = (res.data.content[0].value)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: t.$t('reminder.err'),
                    content: t.$t('reminder.errormessage'),
                })
            })
        },

        importExcel () {
            const t = this
            t.openImport = true
            // t.$refs.importExcel.getDowModelFile()
        },
        closeImport () {
            const t = this
            t.openImport = false
        },
        expData () {
            const t = this
            const data = {
                // levaCode: t.levaCode,
                // levaCname: t.levaCname,
                appAnbrkYear: t.appAnbrkYear, // 年度
                appAnbrkEmp: t.appAnbrkEmp, // 员工
                appAnbrkCompid: t.positionComp, // 公司
                //          appAnbrkDeptid: t.positionDept, // 部门
            }
            //        导出的接口
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'ApplyAnandbrk.export', data)
            this.openExp = true
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
        closeExp () {
            const t = this
            t.openExp = false
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
.ivu-input-wrapper,
.ivu-select {
    margin-right: 5px;
}
</style>
