<template>
    <div class="table">
        <Row>
            <Col span="20"
                 style="width:100% !important;">
            <Card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    非标排班管理
                </p>
                <Row>
                    <Row class="btnHeight">
                        <span @dblclick="clearComp"><Input v-model="positionCompDis"
                                   style="width: 180px"
                                   icon="ios-search"
                                   :readonly="true"
                                   placeholder="请选择公司"
                                   @on-click="selectHCompany" /></span>
                        <span @dblclick="clearTeam"><Input v-model="attNostdTeamDis"
                                   placeholder="请选择班组"
                                   style="width:180px"
                                   icon="ios-search"
                                   :readonly="true"
                                   @on-click="pickDataTeam" /></span>
                        <Input v-model="attNostdEmpName"
                               placeholder="请输入员工姓名"
                               style="width:180px" />
                        <span style="margin: 0;"><Button type="info"
                                    :loading="isSpin"
                                    @click="search()">{{$t('button.ser')}}</Button></span>
                        <Button type="warning"
                                v-if="AccessControl.toString().includes('button_add')"
                                @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
                        <Button type="error"
                                v-if="AccessControl.toString().includes('button_del')"
                                @click="deletemsg">{{$t('button.del')}}</Button>
                        <Button type="primary"
                                v-if="AccessControl.toString().includes('button_export')"
                                @click="expData">{{$t('button.exp')}}</Button>
                        <Button type="primary"
                                v-if="AccessControl.toString().includes('button_import')"
                                @click="importExcel">{{$t('button.imp')}}</Button>
                    </Row>
                    <Row class="table-form">
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
                    </Row>
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
                                  :page-size-opts="[10, 20, 50, 100]"></Page>
                            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                        </Row>
                        <Button size="small"
                                shape="circle"
                                icon="md-refresh"
                                style="margin-left: 20px;display: inline-block;"
                                @click="refresh"></Button>
                    </Row>
                </Row>
            </Card>
            </Col>
        </Row>
        <!-- 导出组件 -->
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
        <!-- 导入组件 -->
        <transition name="fade">
            <importExcel v-show="openImport"
                         :impid="updateId"
                         :imp_mt="imp_mt"
                         @closeImport="closeImport"
                         ref="importExcel"></importExcel>
        </transition>
        <transition>
            <update v-show="openUpdate"
                    :logType="logType"
                    @close="closeUp"
                    @getData="getData"
                    ref="update"></update>
        </transition>
        <!--雇佣公司-->
        <transition name="fade">
            <searchHCompany v-show="openHCompany"
                            @closeHCompany="closeHCompany"
                            :searchHCClo="searchHCClo"
                            @inputHCompany="inputHCompany"
                            :params="paramsHCompany"
                            ref="searchHCompany"></searchHCompany>
        </transition>
        <!--选择班组-->
        <transition name="fade">
            <searchTeam v-show="openPickTeam"
                        :comId="comId"
                        @closeTeam="closeTeam"
                        @inputEmp="inputEmp"
                        ref="searchTeam"></searchTeam>
        </transition>
    </div>
</template>

<script>
import expwindow from '../../../components/fileOperations/expSms'//导出组件1
import expdow from '../../../components/fileOperations/expdow'//导出组件2
import importExcel from '../../../components/importModel/importParam'//导入组件
import update from './update'//新增修改
import searchTeam from './searchTeam' //班组
import searchHCompany from '../../../components/searchTable/searchHCompany'//公司
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
export default {
    name: 'nonStandardShift',
    components: {
        expwindow,
        expdow,
        importExcel,
        update,
        searchTeam,
        searchHCompany
    },
    data () {
        return {
            openHCompany: false,//公司弹框
            positionCompDis: '',//公司名称
            comId: '',//公司id
            searchHCClo: [//公司表头
                {
                    title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
                    key: 'unitCode',
                    sortable: 'custom',
                },
                {
                    title: '公司名称',
                    key: 'compFnameCnDis',
                }
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
            openPickTeam: false,//班组
            attNostdTeamDis: '',//班组名称
            attNostdTeam: '',//班组id
            attNostdEmpName: '',//员工名称
            tableheight: document.body.offsetHeight - 250,//表格高度
            isSpin: false,//表格加载
            data: [],//表格数据
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left'
                },
                {
                    title: '公司',
                    key: 'attNostdCompanyName',
                    sortable: 'custom',
                },
                {
                    title: '员工编号',
                    key: 'attNostdEmpNo',//attNostdEmpNo
                    sortable: 'custom',
                },
                {
                    title: '员工',
                    key: 'attNostdEmpName',//attNostdEmpName
                    sortable: 'custom',
                },
                {
                    title: '班组',
                    key: 'attNostdTeamDis',
                    sortable: 'custom',
                },
                {
                    title: '班次',
                    key: 'attNostdShiftDis',
                    sortable: 'custom',
                },
                {
                    title: '排班日期',
                    key: 'attNostdShiftdate',
                    sortable: 'custom',
                },
                {
                    title: '备注',
                    key: 'comment',
                    sortable: 'custom',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    fixed: 'right',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '5px',
                                    display: this.AccessControl.toString().includes('button_y_upd') === true ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'))
                                    }
                                }
                            }, this.$t('button.y.upd')),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '5px',
                                    display: this.AccessControl.toString().includes('button_view') === true ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.view'))
                                    }
                                }
                            }, this.$t('button.view')),
                        ])
                    }
                }
            ],
            tableselected: [],//选择列表
            total: 0,//总条数
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            AccessControl: [],//按钮列表
            logType: '',//按钮类型
            openExp: false,//导出组件1
            openExpDow: false,//导出组件2
            expDataTital: [//导出列表
                { code: 'attNostdCompanyName', name: '公司' },
                { code: 'attNostdEmpNo', name: '员工编号' },
                { code: 'attNostdEmpName', name: '员工' },
                { code: 'attNostdTeamDis', name: '班组' },
                { code: 'attNostdShiftDis', name: '班次' },
                { code: 'attNostdShiftdate', name: '排班日期' },
                { code: 'comment', name: '备注' },
            ],
            filekey: '',
            filename: '',
            openImport: false,//导入组件
            updateId: NaN,
            imp_mt:  this.$global.mt+'AttendNostdshift.importData',//导入接口
            openUpdate: false,//新增修改
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
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.getData(1)
        }
    },
    methods: {
        getData (page, value) {
            const t = this
            t.isSpin = true
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'AttendNostdshift.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: t.$t('button.ser'),
                attNostdCompany: t.comId,//公司id
                attNostdTeamid: t.attNostdTeam,//班组id
                attNostdEmpName: t.attNostdEmpName//员工姓名
            }
            if (value) {
                data.searchData = JSON.stringify(value)
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            t.data = [];
            t.total = 0;
            getDataLevelUserLoginNew(data).then((res) => {
                t.isSpin = false
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                    t.comId = '';
                    t.positionCompDis = ''
                    t.attNostdTeam = '';
                    t.attNostdTeamDis = '';
                    t.attNostdEmpName = '';
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
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 选择公司
        selectHCompany () {
            const t = this
            t.$refs.searchHCompany.getData(this.paramsHCompany)
            t.openHCompany = true
        },
        inputHCompany (name, id) {
            const t = this
            t.positionCompDis = name
            t.comId = id
            console.log(name, id)
        },
        clearComp () {
            const t = this;
            t.positionCompDis = '';
            t.comId = '';
            t.clearTeam();
        },
        closeHCompany () {
            const t = this
            t.$refs.searchHCompany.unitCode = ''
            t.openHCompany = false
        },
        // 选择班组
        pickDataTeam () {
            const t = this
            if (!t.comId) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请先选择公司',
                })
            } else {
                this.$refs.searchTeam.getData()
                this.openPickTeam = true
            }
        },
        inputEmp (row) {
            const t = this;
            t.attNostdTeam = row.id;
            t.attNostdTeamDis = row.attTeamName;
        },
        clearTeam () {
            const t = this;
            t.attNostdTeamDis = '';
            t.attNostdTeam = '';
        },
        closeTeam () {
            const t = this
            t.openPickTeam = false
        },
        // 查询
        search () {
            this.page = 1;
            this.getData();
        },
        // 新增\修改
        openUp (id, logType, index) {
            this.logType = logType;
            this.openUpdate = true;
            if (logType !== this.$t('button.add')) {
                this.$refs.update.getData(id)
            }
        },
        closeUp () {
            this.openUpdate = false;
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
                            _mt:  this.$global.mt+'AttendNostdshift.delByIds',
                            funId: '1',
                            logType: this.$t('button.del'),
                            ids: t.tableselected.toString(),
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
                    onCancel: () => { },
                })
            }
        },
        // 导出
        expData () {
            let data = {
                attNostdCompany: this.comId,//公司id
                attNostdTeamid: this.attNostdTeam,//班组id
                attNostdEmpName: this.attNostdEmpName//员工姓名
            }
            this.logType = this.$t('button.exp')
            this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'AttendNostdshift.export', data)
            this.openExp = true
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
        // 导入
        importExcel () {
            const t = this
            t.openImport = true
            // t.$refs.importExcel.getDowModelFile()
        },
        closeImport () {
            const t = this
            t.openImport = false
        },
        // 排序
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },
        // 列表选择
        selectedtable (selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        // 刷新
        refresh () {
            this.page = 1;
            this.getData();
        },
        //换页
        pageChange (page) {
            this.page = page;
            this.getData();
        },
        // 换条数
        sizeChange (size) {
            this.rows = size;
            this.getData();
        }
    }
}
</script>

<style lang="scss" scoped>
.table-form {
    margin: 10px 0;
}
.ivu-input-wrapper,
.ivu-btn {
    margin-right: 5px;
}
</style>