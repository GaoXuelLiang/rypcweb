<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    非年假信息管理
                </p>
                <Row class="btnHeight">
                    <!--<span>-->
                    <!--<Select style="width: 200px" v-model="appOthlvYear" @on-change="getData(1)"  placeholder="请输入年度">-->
                    <!--<Option :value="item.fyYear" v-for="(item,index) in selectFyear" :key="index">{{item.fyYear}}</Option>-->
                    <!--</Select>-->
                    <!--</span>-->
                    <span @dblclick="dbHCompany">
                        <Input v-model="positionCompDis"
                               style="width: 200px"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="$t('lang_payroll.payAdd.pladCompanyDis')"
                               @on-click="selectHCompany" />
                    </span>
                    <!--<span @dblclick="clearDepart">-->
                    <!--<Input v-model="positionDeptDis" style="width: 160px"  icon="ios-search" :readonly="true"-->
                    <!--:placeholder="$t('lang_payroll.payAdd.pladDeptDis')" @on-click="pickDepart"/>-->
                    <!--</span>-->
                    <span @dblclick="dbHCompanyTwo">
                        <Input v-model="pladCompanyDisTwo"
                               style="width: 200px"
                               icon="ios-search"
                               :readonly="true"
                               placeholder="选择员工"
                               @on-click="showMsgBtn(NaN,$t('button.add'))" />
                    </span>

                    <!--<span style="margin: 0;">-->
                    <!-- <Button type="info"
                            :loading="isSpin"
                            @click="getData(1)">{{$t('button.ser')}}</Button> -->
                    <!-- <Button type="warning" v-if="AccessControl.toString().includes('button_add')" :loading="isSpin" @click="openUp(null,$t('button.add'))">新增</Button>

          <Button type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary"   @click="expData">{{$t('button.exp')}}</Button>
          <Button type="primary"  v-if="AccessControl.toString().includes('button_import')" @click="importExcel">{{$t('button.imp')}}</Button> -->
                    <btnList @operatorBtn="operatorBtn"
                             @openUp="btnEvent"></btnList>
                    <!--</span>-->
                    <!--<Button type="primary" @click="generateVacadata">核算调休数据</Button>-->
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
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page * rows > total ? total : page * rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                    <Button size="small"
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
        <transition>
            <expwindow v-show="openExp"
                       :id="tableselected"
                       @setFileKey="setFileKey"
                       :logType="logType"
                       :index="index"
                       @closeExp="closeExp"
                       ref="expwindow"></expwindow>
        </transition>
        <!--导出-->
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
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
    </div>
</template>
<script>
import searchHCompany from '../../../components/searchTable/searchHCompany'
import advanced from '@/components/searchTable/searchAdvanced'
import searchDept from '../../../components/searchTable/searchDept'
import searchPost from '../../../components/searchTable/searchPost'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import staffPage from './staffPage'
import update from './update'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'apply_otherleveal',
    data () {
        return {
            imp_mt:  this.$global.mt+'ApplyOtherleveal.importData',
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            logType: '',
            filename: '',
            filekey: '',
            updateId: NaN,
            showAdvanced: false,
            openImport: false,
            showMsg: false,
            openExpDow: false,
            select: this.$t('button.all'),
            tableselected: [],
            openExp: false,
            expDataTital: [
                { code: 'appOthlvEmp', name: '姓名' },
                { code: 'appOthlvCompid', name: '公司' },
                { code: 'appOthlvDeptid', name: '部门' },
                //        { code: 'appOthlvPostid', name: '岗位' },
                { code: 'appOthlvEmpno', name: '工号' },
                { code: 'appOthlvType', name: '假期类型' },
                { code: 'appOthlvEffdate', name: '生效时间' },
                { code: 'appOthlvInvdate', name: '失效时间' },
                { code: 'appOthlvQuota', name: '年假配额' },
                { code: 'appOthlvQuotaHour', name: '年假配额（天）' },
                { code: 'appOthlvFinished', name: '已休年假' },
                { code: 'appOthlvFinishedHour', name: '已休年假（天）' },
                { code: 'appOthlvSerplus', name: '剩余年假' },
                { code: 'appOthlvSerplusHour', name: '剩余年假（天）' },
                { code: 'appOthlvApping', name: '审批中年假' },
                { code: 'appOthlvAppingHour', name: '审批中年假（天）' },
                { code: 'comment', name: '备注' },
            ],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '姓名',
                    key: 'appOthlvEmpDis',
                    width: 140,
                },
                {
                    title: '公司名称',
                    key: 'appOthlvCompidDis',
                    width: 140,
                },
                {
                    title: '部门名称',
                    key: 'appOthlvDeptidDis',
                    width: 140,
                },
                {
                    title: '工号',
                    key: 'appOthlvEmpno',
                    width: 140,
                },
                {
                    title: '假期类型',
                    key: 'appOthlvTypeDis',
                    width: 140,
                },
                {
                    title: '生效时间',
                    key: 'appOthlvEffdate',
                    width: 140,
                },
                {
                    title: '失效时间',
                    key: 'appOthlvInvdate',
                    width: 140,
                },
                {
                    title: '年假配额(小时)',
                    key: 'appOthlvQuota',
                    width: 140,
                },
                {
                    title: '年假配额(天)',
                    key: 'appOthlvQuotaHour',
                    width: 140,
                },
                {
                    title: '年假已休(小时)',
                    key: 'appOthlvFinished',
                    width: 140,
                },
                {
                    title: '年假已休(天)',
                    key: 'appOthlvFinishedHour',
                    width: 140,
                },
                {
                    title: '审批中年假(小时)',
                    key: 'appOthlvApping',
                    width: 140,
                },
                {
                    title: '审批中年假(天)',
                    key: 'appOthlvAppingHour',
                    width: 140,
                },
                {
                    title: '剩余年假(小时)',
                    key: 'appOthlvSerplus',
                    width: 140,
                },
                {
                    title: '剩余年假(天)',
                    key: 'appOthlvSerplusHour',
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
            data: [],
            selectFyear: [],
            AccessControl: [],
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
            //        appOthlvYear: '2019',
            appOthlvEmp: '',
            btnArr: []
        }
    },
    computed: {},
    components: {
        searchHCompany,
        searchDept,
        searchPost,
        staffPage,
        update,
        advanced,
        expwindow,
        expdow,
        importExcel,
        btnList
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
            t.appOthlvYear = '2019'
            t.appOthlvEmp = ''
            t.appOthlvEmpDis = ''
            t.positionComp = ''
            t.positionCompDis = ''
            t.positionDept = ''
            t.positionDeptDis = ''
            t.getData(1)
            t.getSelect()
            t.getBtn()
            t.getFiscalYearSelect()
        }
    },
    methods: {
        getBtn () {
            const t = this
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
                case 'button_query':
                    this.getData(1)
                    break;
            }
        },
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
            })
        },
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        closeImport () {
            const t = this
            t.openImport = false
        },
        importExcel () {
            const t = this
            t.openImport = true
            // t.$refs.importExcel.getDowModelFile()
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        getData (page, value) {
            console.log(1)
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            //        if (t.appOthlvYear === '') {
            //          t.$Modal.warning({
            //            title: this.$t('reminder.err'),
            //            content: '请选择年度',
            //          })
            //          return
            //        }
            const data = {
                _mt:  this.$global.mt+'ApplyOtherleveal.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: '查询',

                appOthlvEmp: t.appOthlvEmp, // 员工
                appOthlvCompid: t.positionComp, // 公司
                //          appOthlvDeptid: t.positionDept, // 部门
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            console.log(data)
            this.btnControl(this).then((res1) => {
                if (isSuccess(res1, t)) {
                    res1.data.content[0].value.forEach((item) => {
                        t.AccessControl.push(item.btnLancode)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
            getDataLevelUserLoginNew(data).then((res) => {
                console.log(res)
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            })
                .catch(() => {
                    t.isSpin = false
                    //          t.$Modal.error({
                    //            title: this.$t('reminder.err'),
                    //            content: this.$t('reminder.errormessage'),
                    //          })
                })
        },
        // 根据状态 获取值
        getPageByState (value) {
            this.appOthlvStatus = value
            this.getData(1)
        },
        // 根据季度，生成员工的休假数据
        generateVacadata () {
            const t = this
            //        if (t.appOthlvYear === '') {
            //          t.$Modal.warning({
            //            title: this.$t('reminder.err'),
            //            content: '请选择年度',
            //          })
            //          return
            //        }
            const data = {
                _mt:  this.$global.mt+'ApplyAnandbrk.generateVacadata',
                logType: '生成年假休假数据',
                appOthlvYear: t.appOthlvYear, // 年度
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.getData(1)
                    //            t.$Modal.success({
                    //              title: this.$t('reminder.suc'),
                    //              content: t.appOthlvYear + '年度调休数据核算成功!',
                    //            })
                }
            }).catch(() => {
                //          t.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
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
            t.appOthlvEmp = ''
        },
        changeinput (name, id) {
            const t = this
            t.pladCompanyDisTwo = name
            t.appOthlvEmp = id
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
            console.log(id)
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
                            _mt:  this.$global.mt+'ApplyOtherleveal.delByIds',
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
        expData () {
            const data = {
                countryCname: this.countryCname,
                countryEname: this.countryEname,
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'ApplyOtherleveal.export', data)
            this.openExp = true
        },
        closeExp () {
            const t = this
            t.openExp = false
        },
        setFileKey (filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'annualevalHandlstatus',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.AppOthlvStatus = res.data.content[0].value[0].paramList.splice(1)
                }
            }).catch(() => {
                //          this.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
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
                //          t.$Modal.error({
                //            title: t.$t('reminder.err'),
                //            content: t.$t('reminder.errormessage'),
                //          })
            })
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
.ivu-input-wrapper {
    margin-right: 5px;
}
</style>
