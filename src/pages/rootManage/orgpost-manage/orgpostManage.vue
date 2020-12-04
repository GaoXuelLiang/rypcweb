<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_organization.orgpost.title')}}
                </p>
                <Row>
                    <!-- <Col span="5" class="colTree"> -->
                    <!-- :loading="isloding" -->
                    <!-- <div class="divtree" :style="{height:treeheight + 'px'}">
            <Tree v-if="dataTree != ''" :data="dataTree" @on-select-change="selectChange" :render="renderContent"></Tree>
            <Spin v-if="loading" size="large" :style="{height:treeheight + 'px'}"></Spin>
          </div> -->
                    <!-- <div class="refresh" style="margin-top: 10px;">
            <Button size="small" shape="circle" icon="md-refresh" @click="getTree()"></Button>
          </div> -->
                    <!-- </Col> -->
                    <Col span="24">
                    <Row>
                        <Input class="btn"
                               :placeholder="$t('lang_organization.orgpost.postCodeInp')"
                               style="width: 200px"
                               v-model="postCode" />
                        <Input class="btn"
                               :placeholder="$t('lang_organization.orgpost.postFCOrENameInp')"
                               style="width: 200px"
                               v-model="postFnameDis" />
                        <!--<span style="margin: 0;"><Button type="primary"  @click="search()">{{$t('button.ser')}}</Button></span>-->
                        <!--<Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>-->
                        <!--  查询 -->
                        <Button class="btn"
                                style="width:56px"
                                type="info"
                                :loading="isSpin"
                                @click="search()">
                            <span v-if="!isSpin">{{$t('button.ser')}}</span>
                        </Button>
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
                                v-show="dutyStatus === '0001all' || dutyStatus === '0105draft'"
                                @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                        <!--  生效 -->
                        <span v-if="AccessControl.toString().includes('button_valid')">
                            <Button class="btn"
                                    type="success"
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
                        <Button class="btn"
                                type="primary"
                                v-if="AccessControl.toString().includes('button_import')"
                                @click="importExcel">{{$t('button.imp')}}</Button>
                        <Button class="btn"
                                type="primary"
                                v-if="AccessControl.toString().includes('button_master')"
                                @click="openPerson">推送主数据</Button>
                        <!--  重启 -->
                        <!--            <Button type="primary" v-show="dutyStatus === '0303toinvalid' || dutyStatus === '0306invalid'"  @click="modifystatu('03reboot')">{{$t('status.reboot')}}</Button>-->
                        <!--  复制 -->
                        <!--            <Button type="primary"  @click="openUp(NaN,$t('status.copy'))">{{$t('status.copy')}}</Button>-->
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
                              :current="page"
                              size="small"
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
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition>
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
                                      prop="invdate">
                                <DatePicker type="date"
                                            placeholder="失效时间"
                                            :editable="false"
                                            v-model="formValidate.invdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="11"
                               v-if="dutyStatus === '0303toinvalid' || dutyStatus === '0306invalid'">
                            <FormItem label="重新生效时间"
                                      prop="validdate">
                                <DatePicker type="date"
                                            placeholder="重新生效时间"
                                            :editable="false"
                                            v-model="formValidate.validdate"
                                            style="width: 100%"></DatePicker>
                            </FormItem>
                        </i-col>
                        <i-col span="23"
                               v-if="dutyStatus === '0206valid'">
                            <FormItem label="失效原因"
                                      prop="invreason">
                                <Input v-model="formValidate.invreason"
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
        <advanced v-show="showAdvanced"
                  @closeAdvanced="closeAdvanced"
                  ref="advanced"
                  @getData="getData"></advanced>
        <!-- 梯队详情-->
        <echelonUpdate v-show="isEchelonUpdate"
                       @closeEchelon="closeEchelon"
                       @getData="getData"
                       :userId="echelonId"
                       :mainData="echelonData"
                       ref="echelonUpdate"></echelonUpdate>
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
import update from './orgpostmid'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import advanced from '../../../components/searchTable/searchAdvanced'
import echelonUpdate from '../../talentPlan/echelonBoard/echelonUpdate'
import importExcel from '../../../components/importModel/importParam'
import mainData from '../orgframe-manage/components/mainData'

export default {
    name: 'orgPostList',
    data () {
        return {
            openUpPerson: false, // 推送主数据
            mainType: 'orgPost', // 推送主数据
            priValue:  this.$global.mt+'r_post_', // 推送主数据
            isSpin: false,
            imp_mt:  this.$global.mt+'OrgPost.importData',
            openImport: false,
            loading: true,
            loading1: true,
            modal: false,
            dataTree: [],
            treeheight: document.body.offsetHeight - 200,
            tableheight: document.body.offsetHeight - 250,
            value: '',
            logType: '',
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            /* 生效失效 */
            dutyStatus: '02valid',
            statusDis: '已生效',
            dropdownMenuList: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    fixed: 'left',
                    align: 'center',
                },
                {
                    title: this.$t('lang_organization.orgpost.postCode'),
                    key: 'postCode',
                    width: 190,
                    //          width: 105,
                    fixed: 'left',
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_organization.orgpost.postFnameCnDis'),
                    width: 190,
                    //          width: 105,
                    key: 'postFnameCnDis',
                },
                {
                    title: this.$t('lang_organization.orgpost.postSnameCnDis'),
                    width: 190,
                    //          width: 105,
                    key: 'postSnameCnDis',
                },
                //          {
                //            title: this.$t('lang_organization.orgpost.postFnameEnDis'),
                //            width: 180,
                //          width: 105,
                //            key: 'postFnameEnDis',
                //          },
                //          {
                //            title: this.$t('lang_organization.orgpost.postSnameEnDis'),
                //            width: 180,
                //          width: 105,
                //            key: 'postSnameEnDis',
                //          },
                {
                    title: '所属公司',
                    key: 'postUnitcompDis',
                    width: 200,
                    //          width: 105,
                },
                {
                    title: '所属部门',
                    key: 'postUnitName',
                    width: 190,
                    //          width: 105,
                },
                {
                    title: this.$t('lang_organization.orgpost.validdate'),
                    key: 'validdate',
                    sortable: 'custom',
                    width: 190,
                    //          width: 105,
                },
                {
                    title: this.$t('lang_organization.orgpost.invdate '),
                    key: 'invdate',
                    sortable: 'custom',
                    width: 190,
                    //          width: 105,
                },
                {
                    title: '状态',
                    key: 'postStatusDis',
                    width: 190
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    width: 80,
                    fixed: 'right',
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
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
                            //                h('Button', {
                            //                  props: {
                            //                    type: 'success',
                            //                    size: 'small',
                            //                  },
                            //                  style: {
                            //                    marginLeft: '10px',
                            //                    display: params.row.postStatus == '0206valid' ? 'inline-block' : 'none'
                            //                  },
                            //                  on: {
                            //                    click: () => {
                            //                      this.goEchelon(params)
                            //                    },
                            //                  },
                            //                }, '梯队详情'),
                        ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            sort: 'postCode',
            order: 'asc',
            rows: 10,
            page: 1,
            funId: '1000',
            postCode: '',
            postFnameDis: '',
            treeid: '',
            formValidate: {
                invdate: '',
                invreason: '',
                ids: '',
                validdate: '',
            },
            ruleValidate: {
                invreason: [
                    { required: true, message: '请填写失效原因', trigger: 'blur' },
                ],
                invdate: [
                    { required: true, type: 'date', message: '请填写失效时间', trigger: 'change' },
                ],
                validdate: [
                    { required: true, type: 'date', message: '请填写失效时间', trigger: 'change' },
                ],
            },
            showAdvanced: false,
            isEchelonUpdate: false, // 梯队详情
            echelonData: {},
            echelonId: '',
            AccessControl: [],
            noDataImg:  '<div id="noData"></div>'
        }
    },
    computed: {

    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    components: {
        update,
        advanced,
        echelonUpdate,
        importExcel,
        mainData,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.postCode = ''
            t.postFnameDis = ''
            t.treeid = ''
            t.dutyStatus = '02valid'
            t.statusDis = '已生效'
            t.getData(1)
            t.getTree()
            t.getSelect()
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
            const data = {
                _mt:  this.$global.mt+'OrgPost.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: '岗位查询',
                postCode: t.postCode,
                funId: '1000',
                postFnameDis: t.postFnameDis,
                postUnit: t.treeid,
                status: t.dutyStatus,
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
                            _mt:  this.$global.mt+'OrgPost.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected.toString(),
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
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            if (logType === this.$t('status.copy')) {
                if (t.tableselected.length > 2) {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: '只能复制一条数据',
                    })
                    return
                }
                if (t.tableselected.length === 0) {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: '请选择一条数据',
                    })
                    return
                }
                t.$refs.update.getDataList(t.tableselected.toString())
            }
            t.openUpdate = true
            t.index = index
            // t.$refs.update.getSelect()
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getDataList(id)
                t.$refs.update.getJobList(id)
            }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            t.$refs.update.clearData()
            t.tableselected = []
        },
        search () {
            this.treeid = ''
            this.page = 1
            this.getData()
        },
        // 获取下拉状态
        getSelect () {
            const t = this
            t.dropdownMenuList = []
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'pubstatus2',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.dropdownMenuList = res.data.content[0].value[0].paramList
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
            t.dutyStatus = paramCode
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
                    case '01valid': t.getPubVaild( this.$global.mt+'OrgPost.effectData', '生效', state)
                        break
                    case '02invalid': t.getPubVaild( this.$global.mt+'OrgPost.failureCheck', '失效前的数据校验', state)
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
                                content: '1.集团CEO:岗位有在职员工，请先转移员工，再执行处理。</br> 2.集团CEO:岗位是其他岗位的发展岗位，请先调整岗位通道，再执行处理。',
                            })
                        } else {
                            this.modal = true
                        }
                        return
                    }
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
            data._mt = this.dutyStatus === '0206valid' ?  this.$global.mt+'OrgPost.invildData' :  this.$global.mt+'OrgPost.renewEffectData'
            data.oldStatus = this.dutyStatus === '0206valid' ? '' : this.dutyStatus
            data.ids = this.tableselected.toString()
            if (data.invdate !== undefined) {
                data.invdate = data.invdate === '' ? '' : new Date(data.invdate).format('yyyy-MM-dd')
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
        handleReset () {
            this.getData()
            this.modal = false
            this.clear()
        },
        clear () {
            this.formValidate.invdate = ''
            this.formValidate.invreason = ''
            this.formValidate.ids = ''
            this.formValidate.validdate = ''
            this.tableselected = []
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
        // 梯队详情
        closeEchelon () {
            this.isEchelonUpdate = false
        },
        goEchelon (params) {
            this.echelonData = params.row
            this.isEchelonUpdate = true
            this.$refs.echelonUpdate.getData(params.row.id)
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
