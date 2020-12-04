<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    汇报人及编制调整
                </p>
                <Row>
                    <Col span="20"
                         style="width:100% !important;">
                    <Row class="btnHeight">
                        <span @dblclick="clearUnit">
                            <Input placeholder="请输入公司名称"
                                   style="width: 200px;"
                                   v-model="form.empcompHirecompanyDis"
                                   @on-click="selectComp(1)" />
                        </span>
                        <span @dblclick="clearUnit1">
                            <Input placeholder="请输入部门名称"
                                   style="width: 200px;"
                                   v-model="form.empcompDeptDis"
                                   @on-click="selectComp(2)" />
                        </span>
                        <span>
                            <Input placeholder="请输入员工名字"
                                   style="width: 200px;"
                                   v-model="form.empName" />
                        </span>
                        <span @dblclick="clearUnit2">
                            <Input placeholder="汇报人"
                                   style="width: 200px;"
                                   v-model="form.empcompBuspmpDis"
                                   @on-click="selectComp(3)" />
                        </span>
                        <!--<span>-->
                        <!--<Select style="width: 210px" v-model="form.empkiTraineeounds" placeholder="编制类别">-->
                        <!--<Option :value="item.fyYear" v-for="(item,index) in selectFyear" :key="index">{{item.fyYear}}</Option>-->
                        <!--</Select>-->
                        <!--</span>-->
                        <span>
                            <Select style="width: 200px;"
                                    v-model="form.empkiTraineeounds"
                                    placeholder="管培生届数">
                                <Option :value="item.fyYear"
                                        v-for="(item,index) in selectFyear"
                                        :key="index">{{item.fyYear}}</Option>
                            </Select>
                        </span>
                        <span>
                            <Select style="width: 200px;"
                                    v-model="form.empkiEstablishmentDis"
                                    placeholder="编制类别"
                                    @on-change="onChange">
                                <Option :value="item.paramInfoName"
                                        v-for="(item,index) in selectList1"
                                        :key="index">{{item.paramInfoName}}</Option>
                            </Select>
                        </span>
                        <!--查看-->
                        <span style="margin: 0;">
                            <!-- <Button type="info" :loading="isSpin"  @click="search()" style="margin-bottom: 10px;">{{$t('button.ser')}}</Button> -->
                            <!-- <Button type="primary" v-if="AccessControl.toString().includes('button_adjust')" @click="report('汇报人调整')" style="margin-bottom: 10px;">汇报人调整</Button>
              <Button type="primary" v-if="AccessControl.toString().includes('button_staffing')" @click="report('编制调整')" style="margin-bottom: 10px;">编制调整</Button> -->
                            <!--<Button type="primary" @click="advSearch()" style="margin-bottom: 10px;">高级查询</Button>-->
                            <btn-list @operatorBtn="operatorBtn"
                                      @openUp="btnEvent"
                                      ref="btnList">
                            </btn-list>
                        </span>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table :height="tableheight"
                               :no-data-text="noDataImg"
                               size="small"
                               stripe
                               ref="selection"
                               :columns="columns"
                               :data="data"
                               @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
                               @on-sort-change="sortable">
                        </Table>
                    </row>
                    <Row style="display: flex">
                        <Row style="display: flex">
                            <Page :total="total"
                                  size="small"
                                  show-elevator
                                  show-sizer
                                  placement="top"
                                  :current="page"
                                  @on-page-size-change="sizeChange"
                                  @on-change="pageChange"
                                  :page-size-opts="[10, 20, 50, 100]">
                            </Page>
                            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page * rows > total ? total : page * rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                        </Row>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="refresh"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <update v-show="openUpdate"
                    :logType="logType"
                    @closeUpd="closeUpd"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <!--<transition >-->
        <!--<expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>-->
        <!--</transition>-->
        <!--<transition >-->
        <!--<expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>-->
        <!--</transition>-->
        <!--<transition name="fade">-->
        <!--<importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport" ref="importExcel"></importExcel>-->
        <!--</transition>-->
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <!--公司选择弹框-->
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         :dataParame=dataParame
                         dataType="row"
                         @changeinput="changeinput1"
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import update from './update.vue'
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import advanced from '../../../components/searchTable/searchAdvanced'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'empNewhireEducation',
    data () {
        return {
            noDataImg: '<div id="noData"></div>',
            inde: 0,
            showModal: false,
            modiaContent: '',
            dataParame: {},
            isSpin: false,
            indes: 0,
            openUpdate: false,
            tableheight: document.body.offsetHeight - 260,
            tableselected: [],
            updateId: NaN,
            form: {
                id: '',
                empcompHirecompany: '', // 公司名称
                empcompHirecompanyDis: '', // 公司名称
                empcompDept: '', // 部门
                empcompDeptDis: '', // 部门
                empName: '', // 名字
                empcompBuspmp: '', // 汇报人
                empcompBuspmpDis: '', // 汇报人
                empkiTraineeounds: '', //
                empkiEstablishment: '', // 编制类别
                empkiEstablishmentDis: '', // 编制类别
            },
            paramCode: [],
            selectFyear: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: '公司',
                    key: 'empcompHirecompanyDis',
                    width: 200,
                },
                {
                    title: '部门',
                    key: 'empcompDeptDis',
                    width: 100,
                },
                {
                    title: '岗位',
                    key: 'empcompPostDis',
                    width: 160,
                    sortable: 'custom',
                },
                {
                    title: '员工工号',
                    key: 'empkiWorkno',
                    width: 160,
                    sortable: 'custom',
                },
                {
                    title: '姓名',
                    key: 'empCname',
                    sortable: 'custom',
                    width: 120,
                },
                {
                    title: '汇报人',
                    key: 'empcompBuspmpDis',
                    sortable: 'custom',
                    width: 120,
                },
                {
                    title: '编制类别',
                    key: 'empkiEstablishmentDis',
                    sortable: 'custom',
                    width: 120,
                },
                {
                    title: '管培生届数',
                    key: 'empkiTraineeounds',
                    sortable: 'custom',
                    width: 120,
                },
                //        {
                //          title: '生效时间',
                //          key: 'empctContractsdate',
                //          sortable: 'custom',
                //          width: 120,
                //        },
                //        {
                //          title: '失效时间',
                //          key: 'empctContractedate',
                //          sortable: 'custom',
                //          width: 120,
                //        },
                //        {
                //          title: '备注',
                //          key: 'empedComment',
                //          sortable: 'custom',
                //          width: 120,
                //        },
                //        {
                //          title: this.$t('button.opr'),
                //          key: 'action',
                //          fixed: 'right',
                //          width: 64,
                //          align: 'center',
                //          render: (h, params) => {
                //            return h('div', [
                //              h('Button', {
                //                props: {
                //                  type: 'success',
                //                  size: 'small',
                //                },
                //                on: {
                //                  click: () => {
                //                    this.openUp(params.row.id, this.$t('button.view'), params.index)
                //                  },
                //                },
                //              }, this.$t('button.view')),
                //            ])
                //          },
                //        },
            ],
            imp_mt: this.$global.mt + 'OrgContractcompany.importData',
            openImport: false,
            expDataTital: [
                { code: 'concompCode', name: '合同公司编码' },
                { code: 'concompName', name: '合同公司名称' },
                { code: 'concompUnit', name: '所属组织' }],
            openExpDow: false,
            openExp: false,
            filekey: '',
            filename: '',
            data: [],
            selectList1: [],
            logType: '',
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            showAdvanced: false,
            AccessControl: [],
        }
    },
    components: {
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
            // 公司名称
            t.form.empcompHirecompanyDis = ''
            // 部门
            t.form.empcompDeptDis = ''
            // 名字
            t.form.empName = ''
            // 汇报人
            t.form.empcompBuspmpDis = ''
            // 年份
            t.form.empkiTraineeounds = ''
            // 编制类别
            t.form.empkiEstablishmentDis = ''

            t.tableselected = []

            // 数据清空
            t.data = []
        }
        this.getFiscalYearSelect()
        this.getSelect()
    },
    methods: {
        advSearch () {
            this.showAdvanced = true
            this.$nextTick(() => {
                this.$refs.advanced.getData()
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
                case 'button_adjust':
                    this.report('汇报人调整')
                    break;
                case 'button_staffing':
                    this.report('编制调整')
                    break;
                case 'button_query':
                    this.search()
                    break;
            }
        },
        closeAdvanced () {
            this.showAdvanced = false
        },
        getData (page, value) {
            const t = this
            //        console.log(t.form.empkiTraineeounds)
            t.isSpin = true
            t.$refs.btnList.loading = true
            if (page) {
                t.page = page
            }
            const data = {
                //				_mt:  this.$global.mt+'OrgContractcompany.getPage',
                _mt: this.$global.mt + 'EmpAdjustAfterSS.getPage',
                AProws: t.rows,
                APpage: t.page,
                APsort: t.sort,
                APorder: t.order,
                // 公司名称
                empcompHirecompany: t.form.empcompHirecompany,
                // 部门
                empcompDept: t.form.empcompDept,
                // 名字
                empName: t.form.empName,
                // 汇报人
                empcompBuspmp: t.form.empcompBuspmp,
                // 年份
                empkiTraineeounds: t.form.empkiTraineeounds,
                // 编制类别
                empkiEstablishment: t.form.empkiEstablishment,
            }
            console.log(data)
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                //        console.log(res)
                t.isSpin = false
                t.$refs.btnList.loading = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    this.btnControl(this).then((res1) => {
                        if (isSuccess(res1, t)) {
                            res1.data.content[0].value.forEach((item) => {
                                t.AccessControl.push(item.btnLancode)
                            })
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch(() => {
                t.isSpin = false
                t.$refs.btnList.loading = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        report (Name) {
            const t = this
            if (Name === '编制调整' && t.form.empkiTraineeounds === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择管培生届数',
                })
                return
            }
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '选择变更的数据',
                })
            } else {
                t.updateId = parseInt(t.tableselected.toString(), 10)
                t.logType = Name
                t.openUpdate = true
                // t.index = index
                t.$refs.update.getData(Number(t.tableselected.toString()))
                t.tableselected = []
            }
        },
        // 保存修改后刷新页面
        updateArray (res) {
            console.log(res)
            const t = this
            //			t.data.splice(t.index, 1, res)
            t.openUpdate = false
            t.getData(1)
        },
        addNewArray (res) {
            const t = this
            t.data.unshift(res)
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
                        getDataLevelUserLoginData({
                            _mt: this.$global.mt + 'OrgContractcompany.delByIds',
                            APlogType: this.$t('button.del'),
                            APdelIds: t.tableselected.toString(),
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
        closeUpd () {
            const t = this
            t.openUpdate = false
        },
        search () {
            this.page = 1
            const t = this.form
            if (t.empcompHirecompany === '' && t.empcompDept === '' && t.empName === '' && t.empcompBuspmp === '' && t.empkiTraineeounds === '' && t.empkiEstablishmentDis === '') {
                this.$Message.warning('请选择查询条件')
            } else {
                this.getData()
            }
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
        refresh () {
            this.getData(1)
        },

        closeImport () {
            const t = this
            t.openImport = false
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
        closeExpDowMain () {
            const t = this
            t.openExpDow = false
        },
        /*
        * 弹出选择
        * */
        selectComp (ind) {
            const t = this
            t.dataParame = {}
            if (ind === 1) {
                t.modiaContent = 'org-org-std'
                t.form.EmpComp = ''
            } else if (ind === 2) {
                t.modiaContent = 'org-department-std'
                t.dataParame = {
                    unitPid: t.form.empcompHirecompany,
                }
            } else if (ind === 3) {
                t.modiaContent = 'emp-base-std'
            }
            t.inde = ind
            t.showModal = true
        },
        clearUnit () {
            const t = this
            t.form.empcompHirecompany = ''
            t.form.empcompHirecompanyDis = ''
            t.form.empcompDept = ''
            t.form.empcompDeptDis = ''
            t.form.EmpName = ''
            t.form.empcompBuspmp = ''
            t.form.empcompBuspmpDis = ''
        },
        clearUnit1 () {
            const t = this
            t.form.empcompDept = ''
            t.form.empcompDeptDis = ''
        },
        clearUnit2 () {
            const t = this
            t.form.empcompBuspmp = ''
            t.form.empcompBuspmpDis = ''
        },
        // 选择公司的弹出处理
        closeModal () {
            const t = this
            t.showModal = false
        },
        changeinput1 (row, type) {
            const t = this
            console.log(row)
            if (t.inde === 1) {
                // 公司名称
                t.form.empcompHirecompanyDis = row.unitsName
                t.form.empcompHirecompany = row.id
            } else if (t.inde === 2) {
                // 部门
                t.form.empcompDeptDis = row.unitsName
                t.form.empcompDept = row.id
            } else if (t.inde === 3) {
                // 汇报人
                t.form.empcompBuspmpDis = row.empName
                t.form.empcompBuspmp = row.id
            }
            //      console.log(t.form.empcompHirecompany, t.form.EmpSection, t.form.EmpReporter)
        },
        getFiscalYearSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatFiscalyear.getSelectValue',
                APdata: '{}',
            }).then((res) => {
                t.selectFyear = res.data.content[0].value
            }).catch(() => {
                t.$Modal.error({
                    title: t.$t('reminder.err'),
                    content: t.$t('reminder.errormessage'),
                })
            })
        },
        // 获取编制类别
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'establishmenttype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectList1 = res.data.content[0].value[0].paramList
                    t.paramCode.paramCode1 = res.data.content[0].value[0].paramList[0].paramCode
                    t.paramCode.paramCode2 = res.data.content[0].value[0].paramList[1].paramCode
                    t.paramCode.paramCode3 = res.data.content[0].value[0].paramList[2].paramCode
                    t.paramCode.paramCode4 = res.data.content[0].value[0].paramList[3].paramCode
                    t.paramCode.paramCode5 = res.data.content[0].value[0].paramList[4].paramCode
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        onChange (inde) {
            const t = this
            console.log(inde)
            if (inde === '占编') {
                t.form.empkiEstablishment = t.paramCode.paramCode1
            } else if (inde === '管培生') {
                t.form.empkiEstablishment = t.paramCode.paramCode2
            } else if (inde === '司机') {
                t.form.empkiEstablishment = t.paramCode.paramCode3
            } else if (inde === '项目销售/渠道岗') {
                t.form.empkiEstablishment = t.paramCode.paramCode4
            } else if (inde === '其他不占编') {
                t.form.empkiEstablishment = t.paramCode.paramCode5
            }
            console.log(t.form.empkiEstablishment)
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
.ivu-select,
.ivu-input-wrapper {
    margin-right: 5px;
}
</style>
