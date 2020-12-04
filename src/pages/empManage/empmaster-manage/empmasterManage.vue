<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_employee.empmaster.title')}}
                </p>
                <Row>
                    <!--<Col span="6" class="colTree">-->
                    <!--<div class="divtree" :style="{height:treeheight + 'px'}">-->
                    <!--<Tree v-if="dataTree != ''" :data="dataTree" :render="renderContent"></Tree>-->
                    <!--<Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>-->
                    <!--</div>-->
                    <!--</Col>-->
                    <Col span="5"
                         class="colTree">
                    <div class="divtree"
                         :style="{height:(treeheight - 8) + 'px'}">
                        <Tree v-if="dataTree != ''"
                              :data="dataTree"
                              @on-select-change="selectChange"
                              :render="renderContent"></Tree>
                        <Spin v-if="loading"
                              size="large"
                              :style="{height:treeheight + 'px'}"></Spin>
                    </div>
                    <!-- <div class="refresh" style="margin: 10px;">
              <Button size="small" shape="circle" icon="md-refresh" @click="getTree()"></Button>
            </div> -->
                    </Col>
                    <Col span="19">
                    <Row class="btnHeight">
                        <Input :placeholder="$t('lang_employee.empmaster.empCnameDis')"
                               style="width: 180px"
                               v-model="empCname" />
                        <Input :placeholder="$t('lang_employee.empmaster.empkiWorknoDis')"
                               style="width: 180px"
                               v-model="empNo" />
                        <!-- <span style="margin: 0;"><Button type="info" :loading="isSpin"  @click="search()">{{$t('button.ser')}}</Button></span> -->

                        <Dropdown class="leftMar">
                            <Button type="primary">
                                {{statusDis}}
                                <Icon type="md-arrow-dropdown"
                                      size="18"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <!--<span key="index" @click="getPageByState('',$t('button.all'))">-->
                                <!--<DropdownItem name="">{{$t('button.all')}}</DropdownItem>-->
                                <!--</span>-->
                                <span v-for="(item,index) in Empstatus"
                                      :key="index"
                                      @click="getPageByState(item.paramCode,item.paramInfoCn)">
                                    <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                                </span>
                            </DropdownMenu>
                        </Dropdown>
                        <!-- <Button type="warning" v-if="AccessControl.toString().includes('button_add')" @click="openUp1(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" v-if="AccessControl.toString().includes('button_del')" @click="deletemsg">{{$t('button.del')}}</Button>
            <Button type="primary" v-if="AccessControl.toString().includes('button_master')"  @click="openPerson">推送主数据</Button>
            <Button type="primary"  v-if="AccessControl.toString().includes('button_import')" @click="importExcel">{{$t('button.imp')}}</Button> -->
                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                        <btnList @operatorBtn="operatorBtn"
                                 @openUp="btnEvent"
                                 ref="btnList"></btnList>
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table @on-select="selectedtable"
                               :loading="loading"
                               @on-select-cancel="selectedtable"
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
                               @on-sort-change="sortable"
                               :no-data-text="noDataImg"
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
                              show-elevator
                              show-sizer
                              placement="top"
                              :current="page"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size-opts="[10, 20, 50, 100]"></Page>
                        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="search()"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <!--<transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>-->
        <transition name="fade">
            <update v-if="openUpdate"
                    :pklv="pklv"
                    @closeUp="closeUp"
                    :logType="logType"></update>
        </transition>
        <transition name="fade">
            <addemployee v-show="openAddEmp"
                         @closeEmp="closeEmp"
                         :id="addEmpId"
                         @getData="addNewArray"
                         @update="updateArray"
                         :logType="logType"
                         ref="addemployee"></addemployee>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <!-- 推送主数据 -->
        <transition name="fade">
            <mainData v-show="openUpPerson"
                      :mainType='mainType'
                      :priValue='priValue'
                      @closePerson="closePerson"
                      @getData="getData"
                      ref="modalPerson"></mainData>
        </transition>
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
import update from './empPoBase'
import addemployee from './addNewEmployee'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import advanced from '../../../components/searchTable/searchAdvanced'
import mainData from '../../rootManage/orgframe-manage/components/mainData'
import importExcel from '../../../components/importModel/importParam'
import btnList from "@/components/commonBtn/commonBtn"
export default {
    name: 'empMaster',
    data () {
        return {
            noDataImg: '<div id="noData"></div>',
            openUpPerson: false, // 推送主数据
            openImport: false, // 推送主数据
            mainType: 'emplyee', // 推送主数据
            priValue:  this.$global.mt+'r_employee_', // 推送主数据
            isSpin: false,
            Empstatus: [], // 员工状态下拉选择
            dataTree: [],
            loading: true,
            treeheight: document.body.offsetHeight - 200,
            tableheight: document.body.offsetHeight - 250,
            value: '',
            logType: '',
            addEmpId: NaN,
            openAddEmp: false,
            openUpdate: false,
            imp_mt:  this.$global.mt+'EmpMaster.importEmpData',
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '姓名',
                    key: 'empCname',
                    width: 100,
                },
                {
                    title: this.$t('lang_employee.empmaster.empGenderDis'),
                    key: 'empGenderDis',
                    width: 70,
                },
                {
                    title: this.$t('lang_employee.empmaster.companyName'),
                    key: 'empcompHirecompanyDis',
                    width: 200,
                },
                {
                    title: this.$t('lang_employee.empmaster.deptName'),
                    key: 'empcompDeptDis',
                    width: 200,
                },
                {
                    title: this.$t('lang_employee.empmaster.empcompPostDis'),
                    key: 'empcompPostDis',
                    width: 200,
                },
                // {
                //   title: this.$t('lang_employee.empmaster.empGid'),
                //   key: 'empGid',
                //   width: 120,
                // },
                {
                    title: this.$t('lang_employee.empmaster.empcompEntrydate'),
                    key: 'empcompEntrydate',
                    width: 200,
                },
                {
                    title: this.$t('lang_employee.empmaster.empkiWorkno'),
                    key: 'empkiWorkno',
                    width: 200,
                },
                //          {
                //            title: this.$t('lang_employee.empmaster.empkiEmptypeName'),
                //            key: 'empkiEmptypeDis',
                //            width: 200,
                //          },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 80,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', this.generaBtn(h, params))
                        // return h('div', [
                        //   h('Button', {
                        //     style: {
                        //       display: this.empkiStatus !== '02inactive' ? 'inline' : 'none',
                        //     },
                        //     props: {
                        //       type: 'success',
                        //       size: 'small',
                        //     },
                        //     on: {
                        //       click: () => {
                        //         this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                        //       },
                        //     },
                        //   }, this.$t('button.y.upd')),
                        //   h('Button', {
                        //     style: {
                        //       display: this.empkiStatus === '02inactive' ? 'inline' : 'none',
                        //     },
                        //     props: {
                        //       type: 'success',
                        //       size: 'small',
                        //     },
                        //     on: {
                        //       click: () => {
                        //         this.openUp(params.row.id, this.$t('button.view'), params.index)
                        //       },
                        //     },
                        //   }, this.$t('button.view')),
                        // ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            empCname: '',
            empNo: '',
            empkiStatus: '01active',
            statusDis: '在职',
            treeid: '',
            treeType: '',
            pklv: '',
            pid: '',
            AccessControl: [],
            showAdvanced: false,
            btnArr: []
        }
    },
    computed: {

    },
    components: {
        update,
        addemployee,
        advanced,
        mainData,
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
            t.empCname = ''
            t.empNo = ''
            t.pid = ''
            t.empkiStatus = '01active'
            t.statusDis = '在职'
            t.getData(1)
            t.getSelect()
            t.getTree()
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
            console.log(btnList, '5555555555')
        },
        btnEvent (code) {
            switch (code) {
                case 'button_add':
                    this.openUp1(NaN, this.$t('button.add'))
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
                case 'button_pinyin':
                    this.send()
                    break
                case 'button_master':
                    this.openPerson()
                    break;
                case 'button_query':
                    this.search()
                    break;
            }
        },
        getData (page, value) {
            const t = this
            t.isSpin = true
            t.$refs.btnList.loading = true
            // if (id === '$') {
            //   id = ''
            // }
            if (page) {
                t.page = page
            }
            const dataPar = {
                _mt:  this.$global.mt+'ViewEmpMaster.getLitePage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: '员工主数据查询',
                empkiWorkno: t.empNo,
                empCname: t.empCname,
                empkiStatus: t.empkiStatus,
                pid: t.pid,
            }
            if (value) {
                dataPar.searchData = JSON.stringify(value)
            }
            for (const dat in dataPar) {
                if (dataPar[dat] === '') {
                    delete dataPar[dat]
                }
            }
            getDataLevelUserLoginNew(dataPar).then((res) => {
                t.isSpin = false
                t.$refs.btnList.loading = false
                if (isSuccess(res, t)) {
                    t.data = []
                    if (res.data.content[0].rows) {
                        for (let i = 0; i < res.data.content[0].rows.length; i++) {
                            t.data.push({
                                id: res.data.content[0].rows[i].id,
                                empCname: res.data.content[0].rows[i].empCname,
                                empcompHirecompanyDis: res.data.content[0].rows[i].empcompHirecompanyDis,
                                empcompEntrydate: res.data.content[0].rows[i].empcompEntrydate,
                                empcompDeptDis: res.data.content[0].rows[i].empcompDeptDis,
                                empGenderDis: res.data.content[0].rows[i].empGenderDis,
                                empGid: res.data.content[0].rows[i].empGid,
                                empcompPostDis: res.data.content[0].rows[i].empcompPostDis,
                                empkiWorkno: res.data.content[0].rows[i].empkiWorkno,
                                empkiEmptypeDis: res.data.content[0].rows[i].empkiEmptypeDis,
                            })
                        }
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
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'empstatus',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.Empstatus = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        /**
         * 状态的更改
         * @param paramCode
         * @param paramInfoName
         */
        getPageByState (paramCode, paramInfoName) {
            const t = this
            if (paramCode === '10all') {
                t.empkiStatus = ''
            } else {
                t.empkiStatus = paramCode
            }
            t.pid = ''
            t.getData(1)
            t.statusDis = paramInfoName
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            //        t.$refs.update.clear()
        },
        getTree () {
            const t = this
            const data = {
                _mt:  this.$global.mt+'OrgUnits.getTree',
                rows: '100',
                page: 1,
                sort: 'unitCode',
                order: 'asc',
                logType: this.$t('button.ser'),
                id: '0',
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.loading = true
            t.dataTree = []
            getDataLevelUserLoginNew(data).then((res) => {
                t.loading = false
                if (isSuccess(res, t)) {
                    setTimeout(() => {
                        t.dataTree = t.toTree(res.data.content[0].value)
                    }, 500)
                }
            }).catch(() => {
                t.loading = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        /* 树点击事件 */
        selectChange (e) {
            this.treeid = e[0].id
            this.treeType = e[0].unitType
            this.page = 1
            this.pid = e[0].unitType + '$' + e[0].id
            this.getData()
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach((item) => {
                item.checked = item.authRoleFunDis === '1'
                item.title = item.unitCode + ' ' + item.unitsSname
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.unitPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    item.expand = true
                    val.push(item)
                }
            })
            return val
        },
        addNewArray (res) {
            const t = this
            // t.data.unshift(res)
            // t.getTree()
            t.getData()
        },
        updateArray (res) {
            const t = this
            t.data.splice(t.index, 1, res)
            t.getTree()
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.pid = this.treeType + '$' + this.treeid
                this.getData()
            }
        },
        sizeChange (size) {
            const t = this
            t.rows = size
            t.pid = this.treeType + '$' + this.treeid
            t.getData()
        },
        pageChange (page) {
            const t = this
            t.page = page
            t.pid = this.treeType + '$' + this.treeid
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
                            _mt:  this.$global.mt+'EmpMaster.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getTree()
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
        open () {
            const t = this
            t.opendialog = true
        },
        openUp1 (id, logType) {
            const t = this
            t.addEmpId = parseInt(id, 10)
            t.logType = logType
            t.openAddEmp = true
            t.$refs.addemployee.resetField()
        },
        openUp (id, logType, index) {
            const t = this
            t.openUpdate = true
            t.logType = logType
            //      将本条数据的id传入mainid（如果有的话）
            this.pklv = id
            //        this.$store.commit('empPo/setChildId1', id)
            //        this.$store.commit('empPo/setIndex', index)
            //        if (id) {
            //          t.$refs.update.getOptionData()
            //        }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeEmp () {
            const t = this
            t.$refs.addemployee.formEmpValidate.baseGid = ''
            t.$refs.addemployee.formEmpValidate.baseCname = ''
            t.$refs.addemployee.formEmpValidate.baseAlias = ''
            t.$refs.addemployee.formEmpValidate.baseLastname = ''
            t.$refs.addemployee.formEmpValidate.baseFirstname = ''
            t.$refs.addemployee.formEmpValidate.idsType = ''
            t.$refs.addemployee.formEmpValidate.idsNo = ''
            t.$refs.addemployee.formEmpValidate.baseBirthdate = ''
            t.$refs.addemployee.formEmpValidate.baseGender = ''
            t.$refs.addemployee.formEmpValidate.baseMarriage = ''
            t.$refs.addemployee.formEmpValidate.baseNation = ''
            t.$refs.addemployee.formEmpValidate.basePolitical = ''
            t.$refs.addemployee.formEmpValidate.baseTechnicaltitle = ''
            t.$refs.addemployee.formEmpValidate.baseTechspec = ''
            t.$refs.addemployee.formEmpValidate.baseFirstworkdate = ''
            t.$refs.addemployee.formEmpValidate.baseTechdate = ''
            t.$refs.addemployee.formEmpValidate.pkiWorkno = 'xxxxxx'
            t.$refs.addemployee.formEmpValidate.pkiEmptype = ''
            t.$refs.addemployee.formEmpValidate.compHirecompany = ''
            t.$refs.addemployee.formEmpValidate.compDept = ''
            t.$refs.addemployee.formEmpValidate.compPost = ''
            t.$refs.addemployee.formEmpValidate.compCostcenter = ''
            t.$refs.addemployee.formEmpValidate.compHirelocation = ''
            t.$refs.addemployee.formEmpValidate.compWorklocation = ''
            t.$refs.addemployee.formEmpValidate.compBuspmp = ''
            t.$refs.addemployee.formEmpValidate.compFunpmp = ''
            t.$refs.addemployee.formEmpValidate.compEntrydate = ''
            t.$refs.addemployee.formEmpValidate.compServicedate = ''
            t.$refs.addemployee.formEmpValidate.compCertificatedate = ''
            t.$refs.addemployee.formEmpValidate.compHr = ''
            t.$refs.addemployee.formEmpValidate.ctContracttype = ''
            t.$refs.addemployee.formEmpValidate.ctContractperiod = ''
            t.$refs.addemployee.formEmpValidate.ctContractsdate = ''
            t.$refs.addemployee.formEmpValidate.ctContractedate = ''
            t.$refs.addemployee.formEmpValidate.ctContractprom = ''
            t.$refs.addemployee.formEmpValidate.ctConfidential = ''
            t.$refs.addemployee.formEmpValidate.ctContractworktime = ''
            t.$refs.addemployee.formEmpValidate.ctSigndate = ''
            t.$refs.addemployee.formEmpValidate.ctProbation = ''
            t.$refs.addemployee.formEmpValidate.ctProbationdate = ''
            t.$refs.addemployee.formEmpValidate.ctProbationprom = ''
            t.$refs.addemployee.formEmpValidate.salPostlevel = ''
            t.$refs.addemployee.formEmpValidate.salSalarylevel = ''
            t.$refs.addemployee.formEmpValidate.salTravellevel = ''
            t.$refs.addemployee.formEmpValidate.salAdminlevel = ''
            t.$refs.addemployee.formEmpValidate.salSalaryset = ''
            t.$refs.addemployee.formEmpValidate.bkBank = ''
            t.$refs.addemployee.formEmpValidate.bkAccount = ''
            t.$refs.addemployee.formEmpValidate.bkAccnane = ''
            t.$refs.addemployee.formEmpValidate.sbBenefitlocation = ''
            t.$refs.addemployee.formEmpValidate.sbHfundlocatio = ''
            t.$refs.addemployee.formEmpValidate.sbBenefitpolicy = ''
            t.$refs.addemployee.formEmpValidate.sbBenefittype = ''
            t.$refs.addemployee.formEmpValidate.edEducationlevel = ''
            t.$refs.addemployee.formEmpValidate.edCuntry = ''
            t.$refs.addemployee.formEmpValidate.edSchool = ''
            t.$refs.addemployee.formEmpValidate.edDegree = ''
            t.$refs.addemployee.formEmpValidate.edSpecialty = ''
            t.$refs.addemployee.formEmpValidate.edSdate = ''
            t.$refs.addemployee.formEmpValidate.edEdate = ''
            t.$refs.addemployee.formEmpValidate.ctaMobile = ''
            t.$refs.addemployee.formEmpValidate.ctaPhone = ''
            t.$refs.addemployee.formEmpValidate.ctaPersmail = ''
            t.$refs.addemployee.formEmpValidate.ctaCompmail = ''
            t.$refs.addemployee.formEmpValidate.ctaQq = ''
            t.$refs.addemployee.formEmpValidate.ctaWechat = ''
            t.$refs.addemployee.formEmpValidate.ctaEmergcontact = ''
            t.$refs.addemployee.formEmpValidate.ctaEmcrelation = ''
            t.$refs.addemployee.formEmpValidate.ctaEmcphone = ''
            t.$refs.addemployee.formEmpValidate.ctaEmcaddr = ''
            t.$refs.addemployee.formEmpValidate.addCuntry = ''
            t.$refs.addemployee.formEmpValidate.addProvince = ''
            t.$refs.addemployee.formEmpValidate.addCity = ''
            t.$refs.addemployee.formEmpValidate.addStreet = ''
            t.$refs.addemployee.formEmpValidate.addZip = ''
            t.$refs.addemployee.formEmpValidate.addrCuntry = ''
            t.$refs.addemployee.formEmpValidate.addrProvince = ''
            t.$refs.addemployee.formEmpValidate.addrCity = ''
            t.$refs.addemployee.formEmpValidate.addrStreet = ''
            t.$refs.addemployee.formEmpValidate.addrRegisterproperty = ''
            t.$refs.addemployee.formEmpValidate.addrZip = ''
            t.$refs.addemployee.cropedImg = ''
            t.$refs.addemployee.cropedImgDis = ''
            t.$refs.addemployee.formEmpValidate.empcompBnchpostDis = ''
            t.$refs.addemployee.formEmpValidate.empcompBnchpost = ''
            t.$refs.addemployee.formEmpValidate.empcompPostseq = ''
            t.$refs.addemployee.formEmpValidate.empcompPostseqDis = ''
            t.$refs.addemployee.formEmpValidate.empctMaincompDis = ''
            t.$refs.addemployee.formEmpValidate.empctMaincomp = ''
            t.$refs.addemployee.formEmpValidate.edQualifications = ''
            t.$refs.addemployee.formEmpValidate.edSchooltype = ''
            t.$refs.addemployee.formEmpValidate.edLearntype = ''
            t.openAddEmp = false
        },
        search () {
            this.treeid = ''
            this.page = 1
            this.treeType = ''
            this.getData()
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%',
                },
            }, [
                h('Button', {
                    props: {
                        type: 'text',
                        size: 'small',
                    },
                    on: {
                        click: () => { this.selectChange(data) },
                    },
                }, [
                    h('Icon', {
                        props: {
                            type: data.unitType === '01company' ? 'ios-home' : data.unitType === '10area' ? 'md-contact' : data.unitType === '20city' ? 'md-contact' : data.unitType === '30busi' ? 'md-locate' : 'md-ionic',
                            size: '15',
                            color: data.unitType === '01company' ? '#15a1f7' : data.unitType === '10area' ? '#f97432' : data.unitType === '20city' ? '#f97432' : data.unitType === '30busi' ? '#f46186' : '#00bed5',
                        },
                        style: {
                            marginRight: '8px',
                        },
                    }),
                    h('span', data.title),
                ]),
            ])
        },
        // 推送主数据
        openPerson () {
            this.openUpPerson = true
        },
        closePerson () {
            const t = this
            t.openUpPerson = false
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
.colTree {
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
}
.divtree {
    border-top: 2px solid;
    border-top-color: rgba(9, 161, 252, 1);
    padding-left: 6px;
    /*height: 750px;*/
    overflow: auto;
    position: relative;
}
/deep/ .ivu-tree-title {
    width: auto !important;
}
.ivu-input-wrapper {
    margin-right: 5px;
}
.leftMar {
    margin-right: 5px;
}
</style>
