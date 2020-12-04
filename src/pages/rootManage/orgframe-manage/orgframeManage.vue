<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_organization.orgframe.title')}}
                </p>
                <Row>
                    <!-- <Col span="5" class="colTree">
          <div class="divtree" :style="{height:treeheight + 'px'}">
            <Tree v-if="dataTree != ''" :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>
            <Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>
          </div> -->
                    <!-- <div class="refresh" style="margin-top: 10px;">
            <Button size="small" shape="circle" icon="md-refresh" @click="getTree()"></Button>
          </div> -->
                    <!-- </Col> -->
                    <Col span="24">
                    <Row class="btnHeight">
                        <Input class="btn"
                               :placeholder="$t('lang_organization.orgframe.unitCodeInp')"
                               style="width: 200px"
                               v-model="unitCode" />
                        <Input class="btn"
                               :placeholder="$t('lang_organization.orgframe.compCOrENameInp')"
                               style="width: 200px"
                               v-model="compFnameCnDis" />
                        <Select class="btn"
                                v-model="unitType"
                                clearable
                                style="width: 200px"
                                placeholder="选择组织类型">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectUnitType"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                        <span>
                            <Button class="btn"
                                    style="width:56px"
                                    type="info"
                                    :loading="isSpin"
                                    @click="search()">
                                <span v-if="!isSpin">{{$t('button.ser')}}</span>
                            </Button>
                        </span>
                        <!--<Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>-->
                        <Dropdown class="btn">
                            <Button type="primary">
                                {{statusDis}}
                                <Icon type="md-arrow-dropdown"
                                      size="18"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <span v-for="(item,index) in dropdownMenuList"
                                      :key="index"
                                      @click="getPageByState(item.paramCode,item.paramInfoCn)">
                                    <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                                </span>
                            </DropdownMenu>
                        </Dropdown>
                        <!--  新增 -->
                        <Button class="btn"
                                type="warning"
                                v-if="AccessControl.toString().includes('button_add')"
                                v-show="dutyStatus === '' || dutyStatus === '0105draft'"
                                @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                        <!--  生效 -->
                        <span v-if="AccessControl.toString().includes('button_valid')">
                            <Button class="btn"
                                    type="primary"
                                    v-show="dutyStatus === '0105draft'"
                                    @click="modifystatu('01valid')">{{$t('status.valid')}}</Button>
                        </span>
                        <!--  失效 -->
                        <span v-if="AccessControl.toString().includes('button_invalid')">
                            <Button class="btn"
                                    type="error"
                                    v-show="dutyStatus === '0206valid'"
                                    @click="modifystatu('02invalid')">{{$t('status.invalid')}}</Button>
                        </span>
                        <!--  s删除 -->
                        <Button class="btn"
                                type="error"
                                v-if="AccessControl.toString().includes('button_del')"
                                v-show="dutyStatus === '0105draft' || dutyStatus === '0203tovalid'"
                                @click="deletemsg">{{$t('button.del')}}</Button>
                        <!--  重启 -->
                        <!--            <Button type="primary" v-show="dutyStatus === '0303toinvalid' || dutyStatus === '0306invalid'"  @click="modifystatu('03reboot')">{{$t('status.reboot')}}</Button>-->
                        <!--  复制 -->
                        <!--            <Button type="primary" v-show="dutyStatus === '0206valid'" @click="openUp(NaN,$t('status.copy'))">{{$t('status.copy')}}</Button>-->
                        <!--  合并 -->
                        <!--            <Button type="primary" v-show="dutyStatus === '0206valid'" @click="openUp(NaN,$t('status.merge'))">{{$t('status.merge')}}</Button>-->
                        <!--  组织架构图 -->
                        <Button class="btn"
                                type="primary"
                                v-show="dutyStatus === '0206valid'"
                                @click="pickData">{{$t('lang_organization.orgChart.title')}}</Button>
                        <Button class="btn"
                                type="primary"
                                v-if="AccessControl.toString().includes('button_import')"
                                @click="importExcel">{{$t('button.imp')}}</Button>
                        <Button class="btn"
                                type="primary"
                                v-if="AccessControl.toString().includes('button_master')"
                                @click="openPerson">推送主数据</Button>
                        <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
                    </Row>
                    <row class="table-form"
                         ref="table-form">
                        <Spin fix
                              v-if="isSpin"
                              size="large"></Spin>
                        <Table :no-data-text="noDataImg"
                               @on-select="selectedtable"
                               @on-select-cancel="selectedtable"
                               stripe
                               @on-select-all="selectedtable"
                               @on-select-all-cancel="selectedtable"
                               @on-sort-change="sortable"
                               :height="tableheight"
                               size="small"
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
                                @click="search()"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <div class="cover"
             v-if="modal">
            <div class="box">
                <div class="title">
                    <div class="title-text">
                        <Icon type="ios-bookmark"
                              size="16"></Icon>
                        &nbsp;添加
                    </div>
                    <Button type="text"
                            @click="handleReset">
                        <Icon type="md-close"
                              size="20"></Icon>
                    </Button>
                </div>
                <Row>
                    <Form ref="formValidate"
                          :model="formValidate"
                          :rules="ruleValidate"
                          :label-width="100"
                          style="height: 100px">
                        <i-col span="11"
                               v-if="dutyStatus === '0206valid'">
                            <FormItem label="失效时间"
                                      prop="invalidDate">
                                <DatePicker type="date"
                                            placeholder="失效时间"
                                            :editable="false"
                                            v-model="formValidate.invalidDate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               v-if="dutyStatus === '0303toinvalid' || dutyStatus === '0306invalid'">
                            <FormItem label="重新启用生效时间"
                                      prop="validdate">
                                <DatePicker type="date"
                                            placeholder="重新启用生效时间"
                                            :editable="false"
                                            v-model="formValidate.validdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               v-if="dutyStatus === '0303toinvalid' || dutyStatus === '0306invalid'">
                            <FormItem label="是否同时启用下属组织单元"
                                      prop="isSubUnits">
                                <RadioGroup v-model="formValidate.isSubUnits" type="button" size="small">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               v-if="dutyStatus === '0303toinvalid' || dutyStatus === '0306invalid'">
                            <FormItem label="是否同时启用所属岗位"
                                      prop="isPost">
                                <RadioGroup v-model="formValidate.isPost" type="button" size="small">
                                    <Radio label="1">是</Radio>
                                    <Radio label="0">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </i-col>
                        <i-col span="23"
                               v-if="dutyStatus === '0206valid'">
                            <FormItem label="失效原因"
                                      prop="invalidReason">
                                <Input v-model="formValidate.invalidReason"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="失效原因"></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="23"
                               style="text-align: right">
                            <Button type="primary"
                                    @click="isSubmit">保存</Button>
                        </i-col>
                    </Form>
                </Row>
            </div>

        </div>
        <transition name="fade">
            <update v-show="openUpdate"
                    :disabledVaild="disabledVaild"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
        <transition name="fade">
            <orgframeChart v-show="openChart"
                           @closeChart="closeChart"
                           ref="orgframeChart"></orgframeChart>
        </transition>
        <transition name="fade">
            <searchOrgframe v-show="openPick"
                            :searchCloumns="searchCloumns"
                            :params="params"
                            @closeUp="closeFrame"
                            @changeinput="changeinput"
                            ref="searchOrgframe"></searchOrgframe>
        </transition>

        <!-- 组织单元复制 -->
        <transition name="fade">
            <orgframeCopy v-show="orgframeCopyShow"
                          @closeUp="closeUp"
                          :logType="logType"></orgframeCopy>
        </transition>
        <!-- 组织单元合并 -->
        <transition name="fade">
            <orgframeMerge v-show="orgframeMergeShow"
                           @closeUp="closeUp"
                           :logType="logType"></orgframeMerge>
        </transition>
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <transition name="fade">
            <importExcel v-show="openImport"
                         :impid="updateId"
                         :imp_mt="imp_mt"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
        <!-- 推送主数据 -->
        <transition name="fade">
            <mainData v-show="openUpPerson"
                      :mainType='mainType'
                      :priValue='priValue'
                      @closePerson="closePerson"
                      @getData="getData"
                      ref="modalPerson"></mainData>
        </transition>
    </div>
</template>
<script>
import orgframeChart from './orgframeChart'
//import update from './orgframeInfoView'
import update from './orgframeComponent/orgpostBase'
import searchOrgframe from '../../../components/searchTable/searchOrgframe'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import orgframeCopy from './orgframeCopy.vue'
import orgframeMerge from './orgframeMerge.vue'
import advanced from '../../../components/searchTable/searchAdvanced'
import importExcel from '../../../components/importModel/importParam'
import mainData from './components/mainData'
export default {
    name: 'orgFrameList',
    data () {
        return {
            openUpPerson: false, // 推送主数据
            mainType: 'orgUnit', // 推送主数据
            priValue:  this.$global.mt+'r_org_', // 推送主数据
            imp_mt:  this.$global.mt+'OrgUnits.importData',
            openImport: false,
            isSpin: false,
            openChart: false,
            loading: true,
            disabledVaild: true,
            unitType: '01all',
            dataTree: [],
            treeheight: document.body.offsetHeight - 200,
            tableheight: document.body.offsetHeight - 250,
            value: '',
            logType: '',
            openUpdate: false,
            modal: false,
            updateId: NaN,
            /* 生效失效 */
            tableselected: [],
            /* 生效失效 */
            dutyStatus: '02valid',
            statusDis: '已生效',
            dropdownMenuList: [],
            selectUnitType: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    fixed: 'left',
                    align: 'center',
                },
                {
                    title: this.$t('lang_organization.orgframe.unitCode'),
                    key: 'unitCode',
                    width: 160,
                    fixed: 'left',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgframe.compFnameCnDis'),
                    width: 160,
                    //          width: 105,
                    key: 'compFnameCnDis',
                },
                //           {
                //             title: this.$t('lang_organization.orgframe.compSnameCnDis'),
                //             width: 140,
                // //          width: 105,
                //             key: 'compSnameCnDis',
                //           },
                //           {
                //             title: this.$t('lang_organization.orgframe.compFnameEnDis'),
                //             width: 140,
                // //          width: 105,
                //             key: 'compFnameEnDis',
                //           },
                //           {
                //             title: this.$t('lang_organization.orgframe.compSnameEnDis'),
                //             width: 140,
                // //          width: 105,
                //             key: 'compSnameEnDis',
                //           },
                {
                    title: this.$t('lang_organization.orgframe.unitTypeName'),
                    key: 'unitTypeName',
                    sortable: 'custom',
                    width: 160,
                    //          width: 105,
                },
                {
                    title: this.$t('lang_organization.orgframe.unitPname'),
                    key: 'unitPname',
                    sortable: 'custom',
                    width: 160,
                },
                {
                    title: '负责人',
                    key: 'unitChargerDis',
                    sortable: 'custom',
                    width: 160,
                },
                {
                    title: '分管领导',
                    key: 'unitChargeleaderDis',
                    sortable: 'custom',
                    width: 160,
                },
                {
                    title: '集团部门条线负责人',
                    key: 'unitGroupSeqchargerDis',
                    sortable: 'custom',
                    width: 160,
                },
                {
                    title: this.$t('lang_organization.orgframe.validdate'),
                    key: 'validdate',
                    sortable: 'custom',
                    width: 160,
                    //          width: 105,
                },
                {
                    title: this.$t('lang_organization.orgframe.invdate'),
                    key: 'invdate',
                    sortable: 'custom',
                    width: 160,
                    //          width: 105,
                },
                {
                    title: '状态',
                    key: 'unitStateDis',
                    sortable: 'custom',
                    width: 100
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 80,
                    fixed: 'right',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                style: {
                                    display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, params.row.unitsSname, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
                        ])
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
            unitCode: '',
            compFnameCnDis: '',
            treeid: '',
            UnitName: '',
            openPick: false,
            orgframeMergeShow: false,
            params: {
                _mt:  this.$global.mt+'OrgUnits.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: '组织架构查询',
                data: '{}',
                unitType: '01company,10area',
            },
            searchCloumns: [
                {
                    title: this.$t('lang_organization.orgframe.unitCode'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgframe.compCOrEName'),
                    key: 'unitsName',
                },
                {
                    title: this.$t('lang_organization.orgframe.unitTypeName'),
                    key: 'unitTypeName',
                },
            ],
            formValidate: {
                invalidDate: '',
                invalidReason: '',
                ids: '',
                validdate: '',
                isPost: '1',
                isSubUnits: '1',
            },
            ruleValidate: {
                invalidReason: [
                    { required: true, message: '请填写失效原因', trigger: 'blur' },
                ],
                invalidDate: [
                    { required: true, type: 'date', message: '请填写失效时间', trigger: 'change' },
                ],
                validdate: [
                    { required: true, type: 'date', message: '请填写失效时间', trigger: 'change' },
                ],
                isSubUnits: [
                    { required: true, message: '请填是否同时启用下属组织单元', trigger: 'change' },
                ],
                isPost: [
                    { required: true, message: '请填是否同时启用所属岗位', trigger: 'change' },
                ],
            },
            orgframeCopyShow: false,
            showAdvanced: false,
            AccessControl: [],
            spinShow: false,
            noDataImg:  '<div id="noData"></div>'
        }
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },

    destroyed () {
        window.onresize = null;
    },
    computed: {

    },
    components: {
        update,
        orgframeChart,
        searchOrgframe,
        orgframeCopy,
        orgframeMerge,
        advanced,
        importExcel,
        mainData,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.unitCode = ''
            t.compFnameCnDis = ''
            t.treeid = ''
            t.dutyStatus = '02valid'
            t.statusDis = '已生效'
            t.getData(1)
            t.getTree()
            t.getSelect()
        }
    },
    methods: {
        pickData () {
            const t = this
            t.$refs.searchOrgframe.getData(this.params)
            t.openPick = true
        },
        changeinput (name, id, costname, costid) {
            const t = this
            t.openPick = false
            t.$refs.orgframeChart.getData(id)
            t.openChart = true
        },
        closeFrame () {
            const t = this
            t.openPick = false
        },
        closeChart () {
            this.openChart = false
        },
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
            const data = {
                _mt:  this.$global.mt+'OrgUnits.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: '组织架构查询',
                unitCode: t.unitCode,
                funId: '1000',
                compFnameCnDis: t.compFnameCnDis,
                unitPid: t.treeid,
                status: t.dutyStatus,
                // unitType: t.unitType,
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            if (data.unitType === '01all') {
                data.unitType = ''
            }
            getDataLevelUserLoginNew(data).then((res) => {
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
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false
            })
        },
        getTree () {
            const t = this
            const data = {
                _mt:  this.$global.mt+'OrgUnits.getTree',
                rows: '100',
                page: '1',
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
            t.dataTree = []
            t.loading = true
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.loading = false
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
            }).finally(() => {
                t.loading = false
            })
        },
        /* 树点击事件 */
        selectChange (e) {
            this.unitType = e[0].unitType
            this.treeid = e[0].id
            this.page = 1
            this.getData()
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach((item) => {
                item.expand = false
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
            t.data.unshift(res)
            t.getTree()
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
            this.tableselected = newArr.toString()
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
                            _mt:  this.$global.mt+'OrgUnits.deleteByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected,
                        }).then((res) => {
                            if (isSuccess(res, t)) {
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
        openUp (id, unitsSname, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            if (logType === this.$t('status.copy')) {
                t.orgframeCopyShow = true
                return
            }
            if (logType === this.$t('status.merge')) {
                t.orgframeMergeShow = true
                return
            }
            t.openUpdate = true
            t.index = index
            if (t.dutyStatus === '0105draft' || t.dutyStatus === '0203tovalid' || t.dutyStatus === '') {
                t.disabledVaild = false
            } else {
                t.disabledVaild = true
            }
            // t.$refs.update.getSelect()
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getDataList(id, unitsSname)
            }
            if (logType === this.$t('button.add')) {
                t.$refs.update.resetFields()
            }
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.orgframeCopyShow = false
            t.orgframeMergeShow = false
            t.$refs.update.formValidate.unitCode = ''
            t.$refs.update.formValidate.unitType = ''
            t.$refs.update.formValidate.compFnameCnDis = ''
            t.$refs.update.formValidate.compFnameEnDis = ''
            t.$refs.update.formValidate.compSnameCnDis = ''
            t.$refs.update.formValidate.compSnameEnDis = ''
            t.$refs.update.formValidate.unitPid = ''
            t.$refs.update.unitPname = ''
            t.$refs.update.formValidate.unitDfcostcenter = ''
            t.$refs.update.unitDfcostcenterName = ''
            t.$refs.update.formValidate.unitDfhirecity = ''
            t.$refs.update.unitDfhirecityName = ''
            t.$refs.update.formValidate.unitDfworkcity = ''
            t.$refs.update.unitDfworkcityName = ''
            t.$refs.update.formValidate.validdate = new Date()
            t.$refs.update.formValidate.invalidDate = ''
            t.$refs.update.formValidate.invalidReason = ''
            t.$refs.update.formValidate.unitDeptadmin = ''
            t.$refs.update.formValidate.unitDeptadminDis = ''
            t.$refs.update.formValidate.unitChargeleader = ''
            t.$refs.update.formValidate.unitChargeleaderDis = ''
            t.$refs.update.formValidate.unitGroupSeqchargerDis = ''
            t.$refs.update.formValidate.unitGroupSeqcharger = ''
            t.$refs.update.unitChargerDis = ''
            t.$refs.update.formValidate.unitCharger = ''
            t.$refs.update.formValidate.unitOrder = ''
            t.$refs.update.formValidate.unitOaPwd = ''
            t.$refs.update.formValidate.comment = ''
            if (t.logType === '合并') {
                t.loading = true
                t.dataTree = []
                t.getTree()
            }
            if (t.logType === '复制') {
                t.loading = true
                t.dataTree = []
                t.getTree()
            }
        },
        selected (key, name) {
            this.select = name
            this.cityTypeName = key
            this.getData()
        },
        search () {
            this.treeid = ''
            this.page = 1
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
                    // on: {
                    //   click: () => { this.selectChange(data) },
                    // },
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
        // 获取下拉状态
        getSelect () {
            const t = this
            t.dropdownMenuList = []
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'pubstatus2,orgunittype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.dropdownMenuList = res.data.content[0].value[0].paramList
                    t.selectUnitType = res.data.content[0].value[1].paramList
                    t.selectUnitType.unshift(
                        {
                            paramCode: '01all',
                            paramInfoCn: '全部',
                        },
                    )
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
            if (paramCode === '0001all') {
                t.dutyStatus = ''
            } else {
                t.dutyStatus = paramCode
            }
            t.getData()
            t.statusDis = paramInfoName
        },
        // 更新数据的状态
        modifystatu (state) {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                switch (state) {
                    case '01valid': t.getPubVaild( this.$global.mt+'OrgUnits.updStateToValid', '生效', state)
                        break
                    case '02invalid': t.getPubVaild( this.$global.mt+'OrgUnits.checkIfUpdState', '失效前的数据校验', state)
                        break
                    case '03reboot':
                        this.modal = true
                        break
                }
            }
        },
        getPubVaild (mt, logType, type) {
            const t = this
            getDataLevelUserLogin({
                _mt: mt,
                logType: logType,
                ids: this.tableselected.toString(),
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if (type === '02invalid') {
                        if (res.data.content[0].value !== '') {
                            t.$Modal.warning({
                                title: this.$t('reminder.suc'),
                                content: '风神襄阳汽车有限公司,:当前组织有在职员工，请先转移员工，再执行处理。',
                                onOk: () => {
                                    t.getData()
                                },
                            })
                        } else {
                            this.modal = true
                        }
                        return
                    }
                    t.tableselected = []
                    t.getData(1)
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '操作完成',
                    })
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        isSubmit () {
            const t = this
            //  _mt:  this.$global.mt+'OrgPost.invildData',
            const data = deepCopy(t.formValidate)
            data._mt = this.dutyStatus === '0206valid' ?  this.$global.mt+'OrgUnits.updStateToInvalid' :  this.$global.mt+'OrgUnits.restartUnit'
            data.oldStatus = this.dutyStatus === '0206valid' ? '' : this.dutyStatus
            data.ids = this.tableselected.toString()
            if (data.invalidDate !== undefined) {
                data.invalidDate = data.invalidDate === '' ? '' : new Date(data.invalidDate).format('yyyy-MM-dd')
            }
            if (data.validdate !== undefined) {
                data.validdate = data.validdate === '' ? '' : new Date(data.validdate).format('yyyy-MM-dd')
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLogin(data).then((res) => {
                        if (isSuccess(res, t)) {
                            if (res.data.content[0].hasOwnProperty('value')) {
                                this.modal = false
                                t.getData()
                                if (t.dutyStatus === '0206valid') {
                                    t.$Modal.success({
                                        title: this.$t('reminder.suc'),
                                        content: '失效成功',
                                    })
                                } else {
                                    t.$Modal.success({
                                        title: this.$t('reminder.suc'),
                                        content: '重启成功',
                                    })
                                }
                                this.clear()
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        clear () {
            this.formValidate.invalidDate = ''
            this.formValidate.invalidReason = ''
            this.formValidate.ids = ''
            this.formValidate.validdate = ''
            this.formValidate.isPost = '1'
            this.formValidate.isSubUnits = '1'
            this.tableselected = []
        },
        handleReset () {
            this.getData()
            this.modal = false
            this.clear()
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
        // 推送主数据
        openPerson () {
            this.openUpPerson = true
        },
        closePerson () {
            const t = this
            t.openUpPerson = false
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
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
    padding-left: 6px;
    /*height: 750px;*/
    border-top: 2px solid rgba(9, 161, 252, 1);
    overflow: auto;
    position: relative;
}
.btn {
    margin-right: 5px;
}
/deep/ .ivu-tree-title {
    width: auto !important;
}
/deep/ .ivu-table-hidden {
    visibility: visible;
}
</style>
