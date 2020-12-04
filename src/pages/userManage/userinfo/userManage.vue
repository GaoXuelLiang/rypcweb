<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_user.rootuser.title')}}
                </p>
                <Row class="btnHeight">
                    <Input :placeholder="$t('lang_user.rootuser.placeholdername')"
                           style="width: 200px"
                           v-model="name" />
                    <Dropdown style="margin-left: 5px;">
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
                    <span style="margin-left: 5px;"><Button type="info"
                                :loading="isSpin"
                                @click="getData(1)"
                                style="width:56px"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
                    <Button style="margin-left: 5px;"
                            type="warning"
                            @click="openUp('',$t('button.add'))"
                            v-show="status ==='00all' || status ==='01draft' ? true : false">{{$t('lang_user.rootuser.add')}}</Button>
                    <span style="margin-left: 5px;"
                          v-show="status ==='01draft' ? true : false">
                        <Button type="primary"
                                @click="modifystatu('02valid')">{{$t('lang_user.rootuser.valid')}}</Button>
                    </span>
                    <span style="margin-left: 5px;"
                          v-show="status ==='02valid' ? true : false">
                        <Button type="success"
                                @click="modifystatu('01draft')">{{$t('lang_user.rootuser.draft')}}</Button>
                    </span>
                    <span style="margin-left: 5px;"
                          v-show="status ==='02valid' ? true : false || status ==='01draft' ? true : false">
                        <Button type="error"
                                @click="modifystatu('03invalid')">{{$t('lang_user.rootuser.invalid')}}</Button>
                    </span>
                    <span style="margin-left: 5px;"
                          v-show="status ==='03invalid' ? true : false">
                        <Button type="primary"
                                @click="modifystatu('02valid')">{{$t('lang_user.rootuser.valid')}}</Button>
                    </span>
                    <Button style="margin-left: 5px;"
                            type="primary"
                            @click="importExcel"
                            v-show="status ==='01draft' ? true : false">{{$t('lang_user.rootuser.import')}}</Button>
                    <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
                </Row>
                <!--<Row>-->
                <!--<RadioGroup v-model="status" v-for="(item,index) in dropdownMenuList" :key="index" style="margin-top: 5px"  @on-change="getPageByState(item.paramCode,item.paramInfoName)">-->
                <!--<Radio :label="item.paramCode">{{item.paramInfoName}}</Radio>-->
                <!--</RadioGroup>-->
                <!--</Row>-->
                <row class="table-form"
                     ref="table-form">
                    <Table @on-select="selectedtable"
                           :no-data-text="noDataImg"
                           :loading='loading'
                           @on-select-cancel="selectedtable"
                           stripe
                           :height='tableheight'
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           @on-sort-change="sortable"
                           size="small"
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :current="page"
                          :total="total"
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
                            @click="getData(1)"></Button>
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
import update from './updateUserInfo'
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import importExcel from '../../../components/importModel/importParam'

export default {
    name: 'userManage',
    data () {
        return {
            noDataImg: '<div id="noData"></div>',
            isSpin: false,
            loading: false,
            tableheight: document.body.offsetHeight - 240,
            value: '',
            statusDis: this.$t('lang_user.rootuser.valid'),
            openImport: false,
            logType: '',
            openUpdate: false,
            eakeEffect: 0,
            eakeinvalid: 1,
            updateId: NaN,
            imp_mt: this.$global.mt + 'SysUserinfo.importData',
            tableselected: [],
            dropdownMenuList: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_user.rootuser.name'),
                    key: 'name',
                    sortable: 'custom',
                    // width: 120,
                },
                {
                    title: this.$t('lang_user.rootuser.mobileNo'),
                    key: 'loginName',
                    sortable: 'custom',
                    // width: 120,
                },
                {
                    title: this.$t('lang_user.rootuser.idNo'),
                    key: 'idNo',
                    sortable: 'custom',
                    // width: 180,
                },
                {
                    title: this.$t('lang_user.rootuser.genderDesc'),
                    key: 'genderDesc',
                    sortable: 'custom',
                    // width: 100,
                },
                {
                    title: this.$t('lang_user.rootuser.birthDate'),
                    key: 'birthDate',
                    sortable: 'custom',
                    // width: 120,
                },
                {
                    title: '手机号',
                    key: 'mobileNo',
                    sortable: 'custom',
                    // width: 120,
                },
                {
                    title: this.$t('lang_user.rootuser.email'),
                    key: 'email',
                    sortable: 'custom',
                    // width: 150,
                },
                {
                    title: this.$t('lang_user.rootuser.statusDesc'),
                    key: 'statusDesc',
                    sortable: 'custom',
                    // width: 120,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 150,
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
                                    display: this.status === '01draft' ? 'inline' : 'none',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                },
                                style: {
                                    display: this.status !== '01draft' ? 'inline' : 'none',
                                    marginRight: this.status !== '01draft' ? '10px' : '0px',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.view'), params.index)
                                    },
                                },
                            }, this.$t('button.view')),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                style: {
                                    marginLeft: this.status == '01draft' ? '10px' : '0px',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, '修改密码', params.index)
                                    },
                                },
                            }, '修改密码'),
                        ])
                    },
                },
            ],
            data: [],
            total: 0,
            index: 0,
            select: '已生效',
            sort: 'id',
            order: 'desc',
            rows: '10',
            page: 1,
            status: '02valid',
            name: '',
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
        importExcel,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.status = '02valid'
            t.name = ''
            t.statusDis = this.$t('lang_user.rootuser.valid')
            t.getData(1)
            t.getSelect()
        }
    },
    methods: {
        getData (page) {
            const t = this
            t.loading = true
            t.isSpin = true
            if (page) {
                t.page = page
            }
            if (this.order === 'normal') {
                this.order = 'desc'
            }
            getDataLevelUserLogin({
                _mt: this.$global.mt + 'UserInfo.userpage',
                status: t.status,
                name: t.name,
                sort: t.sort,
                order: t.order,
                rows: this.rows,
                page: this.page,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false
                t.isSpin = false
            })
        },
        addNewArray (res) {
            const t = this
            if (t.data.length === 0) {
                t.data.push(res)
            } else {
                t.data.unshift(res)
            }
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
                            _mt: this.$global.mt + 'UserInfo.deleteuser',
                            funId: '1',
                            companyId: '1',
                            logType: this.$t('button.del'),
                            ids: t.tableselected,
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.getData(1)
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
        modifystatu (state) {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
                return
            }
            let logType = ''
            if (state === '03invalid') {
                logType = '失效'
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.confirminvalid'),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: this.$global.mt + 'UserInfo.modifystatus',
                            logType: logType,
                            status: state,
                            ids: t.tableselected.toString(),
                        }).then((res) => {
                            if (res.data.stat.code === 0 && res.data.stat.stateList[0].code === 0) {
                                t.getData(1)
                                setTimeout(function () {
                                    t.$Modal.success({
                                        title: t.$t('reminder.suc'),
                                        content: '失效成功',
                                    })
                                }, 300)
                                t.tableselected = []
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
            } else if (state === '02valid') {
                logType = '生效'
                getDataLevelUserLogin({
                    _mt: this.$global.mt + 'UserInfo.modifystatus',
                    logType: logType,
                    status: state,
                    ids: t.tableselected.toString(),
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.getData(1)
                        t.$Modal.success({
                            title: t.$t('reminder.suc'),
                            content: '生效完成',
                        })
                        t.tableselected = []
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            } else {
                getDataLevelUserLogin({
                    _mt: this.$global.mt + 'UserInfo.modifystatus',
                    logType: logType,
                    status: state,
                    ids: t.tableselected.toString(),
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.getData(1)
                        t.$Modal.success({
                            title: t.$t('reminder.suc'),
                            content: '操作完成',
                        })
                        t.tableselected = []
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
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
            t.openUpdate = true
            t.index = index
            t.$refs.update.getSelect()
            if (id !== '') {
                t.$refs.update.getData(id)
            }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.openUpdate = false
            // t.$refs.update.formValidate.mobileNo = ''
            // t.$refs.update.formValidate.name = ''
            // t.$refs.update.formValidate.email = ''
            // t.$refs.update.formValidate.idNo = ''
            // t.$refs.update.formValidate.gender = ''
            t.$refs.update.formValidate.status = '01draft'
            // t.$refs.update.formValidate.birthDate = ''
            // t.$refs.update.formValidate.memo = ''
            // t.$refs.update.formValidate.idType = ''
            // t.$refs.update.cropedImg = ''
        },
        getSelect () {
            const t = this
            t.dropdownMenuList = []
            getDataLevelUserLogin({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                typeCode: 'pubuserstatus',
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
        getPageByState (paramCode, paramInfoCn) {
            const t = this
            t.status = paramCode
            //        if (t.status === '02valid') {
            //          t.sysRootvalid = '1'
            //        } else if (t.status === '03invalid') {
            //          t.sysRootvalid = '0'
            //        } else {
            //          t.sysRootvalid = ''
            //        }
            t.getData(1)
            t.statusDis = paramInfoCn
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
/deep/ .ivu-table-header thead tr th {
    background-color: #ededed;
}
/deep/ .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
.ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
    border-top: 1px solid #ededed;
}
/deep/ .ivu-table-body {
    border-bottom: 1px solid #e5e5e5 !important;
}
</style>
