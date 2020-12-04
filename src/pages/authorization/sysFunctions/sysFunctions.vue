<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_role.adminfun.title')}}
                </p>
                <Row class="btnHeight">
                    <span @dblclick="clearDub">
                        <Input class="searchInput"
                               v-model="funPidDis"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="$t('lang_role.adminfun.pfunPidDis')"
                               style="width: 200px"
                               @on-click="pickData" />
                    </span>
                    <Input class="searchInput"
                           :placeholder="$t('lang_role.adminfun.pfunCode')"
                           style="width: 200px"
                           v-model="funCode" />
                    <Input class="searchInput"
                           :placeholder="$t('lang_role.adminfun.pfunLancodeDis')"
                           style="width: 200px"
                           v-model="funLancodeDis" />
                    <span style="margin: 0;"><Button type="info" style="width:56px"
                                :loading="isSpin"
                                @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
                    <Button type="warning"
                            @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                    <Button type="error"
                            @click="deletemsg">{{$t('button.del')}}</Button>
                </Row>
                <row class="table-form"
                     ref="table-form">
                    <Table stripe
                           :loading="loading"
                           :height="tableheight"
                           @on-selection-change="selectedtable"
                           @on-sort-change="sortable"
                           size="small"
                           ref="selection"
                           :no-data-text="noDataImg"
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
                    <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span>
                    <Button size="small"
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
                    ref="update"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"></update>
        </transition>
        <transition name="fade">
            <searchTable v-show="openPick"
                         @closeUp="closeUp"
                         @changeinput="changeinput"
                         @clear="clear"
                         ref="searchTable"></searchTable>
        </transition>
    </div>
</template>
<script>
import update from './editSysFunctions'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import searchTable from '../../../components/searchTable/searchPubFun'

export default {
    name: 'sysFunctions',
    data () {
        return {
            loading: false,
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            loading: false,
            value: '',
            logType: '',
            openUpdate: false,
            openPick: false,
            updateId: NaN,
            noDataImg:'<div id="noData"></div>',
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_role.adminfun.funCode'),
                    key: 'funCode',
                    sortable: 'custom',
                    width: 200,
                },
                {
                    title: this.$t('lang_role.adminfun.funLancodeDis'),
                    key: 'funLancodeDis',
                    sortable: 'custom',
                    width: 200,
                    //          width: 150,
                },
                {
                    title: this.$t('lang_role.adminfun.funPidDis'),
                    key: 'funPidDis',
                    sortable: 'custom',
                    width: 170,
                    //          width: 150,
                },
                {
                    title: this.$t('lang_role.adminfun.funTypeDis'),
                    key: 'funTypeDis',
                    sortable: 'custom',
                    width: 170,
                    //          width: 130,
                },
                {
                    title: this.$t('lang_role.adminfun.funStyleDis'),
                    key: 'funStyleDis',
                    sortable: 'custom',
                    width: 170,
                    //          width: 130,
                },
                {
                    title: this.$t('lang_role.adminfun.funAction'),
                    key: 'funAction',
                    sortable: 'custom',
                    width: 170,
                    //          width: 130,
                },
                {
                    title: this.$t('lang_role.adminfun.funIsctrlbtnDis'),
                    key: 'funIsctrlbtnDis',
                    sortable: 'custom',
                    width: 160,
                },
                {
                    title: this.$t('lang_role.adminfun.funIsrptDis'),
                    key: 'funIsrptDis',
                    sortable: 'custom',
                    width: 160,
                },
                {
                    title: this.$t('lang_role.adminfun.validDis'),
                    key: 'validDis',
                    sortable: 'custom',
                    width: 170,
                    //          width: 130,
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
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
                        ])
                    },
                },
            ],
            data: [],
            total: NaN, // 总页数
            index: 0,
            sort: 'funCode',
            order: 'asc',
            rows: 10,
            page: 1,
            funCode: '',
            funPid: '',
            funPidDis: '',
            funLancodeDis: '',
            funType: '',
        }
    },
    computed: {},
    components: {
        update,
        searchTable,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.funCode = ''
            t.funPid = ''
            t.funPidDis = ''
            t.funLancodeDis = ''
            t.funType = ''
            t.getData(1)
        }
    },
    methods: {
        getData (page) {
            const t = this;
            t.loading = true;
            t.isSpin = true;
            if (page) {
                t.page = page
            }
            if (this.order === 'normal') {
                this.order = 'desc'
            }
            const data = {
                _mt:  this.$global.mt+'SysFunctions.getSysFunctionsByPage',
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                funCode: t.funCode,
                funPid: t.funPid,
                funLancodeDis: t.funLancodeDis,
                funType: t.funType,
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
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
                t.isSpin = false;
            })

        },
        pickData () {
            this.$refs.searchTable.getData(this.params)
            this.openPick = true
        },
        clear () {
            const t = this
            t.funLancode = ''
            t.funPidDis = ''
            t.funPid = ''
        },
        clearDub () {
            const t = this
            t.funPidDis = ''
            t.funPid = ''
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
        changeinput (name, id) {
            const t = this
            t.funPidDis = name
            t.funPid = id
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
                            _mt:  this.$global.mt+'SysFunctions.delByIds',
                            funId: '1',
                            companyId: '1',
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
        openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getSelect()
            t.$refs.update.tabsSure(t.updateId)
            t.$store.commit('sysFunctionsJS/setMainId',id)
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(t.updateId)
            }
        },
        close () {
            const t = this
            t.opendialog = false
        },
        closeUp () {
            const t = this
            t.$refs.update.formValidate.funCode = ''
            t.$refs.update.formValidate.funType = ''
            t.$refs.update.formValidate.funPid = ''
            t.$refs.update.funPidDis = ''
            t.$refs.update.funLancodeDis = ''
            t.$refs.update.formValidate.funLancode = ''
            t.$refs.update.formValidate.funAction = ''
            t.$refs.update.formValidate.funStyle = ''
            t.$refs.update.formValidate.funIsctrlbtn = '1'
            t.$refs.update.formValidate.funIsrpt = '1'
            t.$refs.update.formValidate.funIsprocess = '1'
            t.$refs.update.formValidate.valid = '1'
            t.$refs.update.formValidate.funProcesid = ''
            t.$refs.update.formValidate.invdate = ''
            t.$refs.update.formValidate.invreason = ''
            t.$refs.update.formValidate.comment = ''
            t.$refs.update.formValidate.funImg = ''
            t.$refs.update.formValidate.funFormtype = ''
            t.$refs.update.formValidate.funForm = ''
            t.$refs.update.funFormDis = ''
            t.$refs.update.funProcesidDis = ''
            t.$refs.update.formValidate.funImg = ''
            t.$refs.update.tabsDisable = true
            t.openUpdate = false
            t.openPick = false
            t.updateId = NaN
            t.$refs.update.name = 'sys1'
            t.$refs.update.tabsDisable = true
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
//
@import "../../../sass/table.scss";
.searchInput {
    margin-right: 5px;
}
.ivu-btn {
    margin-right: 5px;
}
/deep/ .ivu-table-cell {
    padding: 0 10px;
}
/deep/ .ivu-btn>.ivu-icon {
    width: 100%;
}
</style>
