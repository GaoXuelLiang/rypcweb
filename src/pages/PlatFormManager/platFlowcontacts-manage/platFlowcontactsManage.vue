<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="ios-bookmark"></Icon>
                    {{$t('lang_platform.platFlowcontacts.platFlowcontacts')}}
                </p>
                <Row class="btnHeight">
                    <span @dblclick="clearPlatFlowcontactsid">
                        <Input class="searchInput"
                               v-model="flcontFlowName"
                               icon="ios-search"
                               :readonly="true"
                               :placeholder="$t('lang_platform.platFlowcontacts.flcontFlowNameIns')"
                               style="width: 200px"
                               @on-click="pickData" />
                    </span>
                    <Input class="searchInput"
                           :placeholder="$t('lang_platform.platFlowcontacts.flcontMarkIns2')"
                           style="width: 200px"
                           v-model="flcontMark" />
                    <span style="margin: 0;"><Button style="width: 56px;" type="info"
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
                           :no-data-text="noDataImg" 
                           @on-select="selectedtable"
                           @on-select-cancel="selectedtable"
                           @on-select-all="selectedtable"
                           @on-select-all-cancel="selectedtable"
                           @on-sort-change="sortable"
                           size="small"
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <Row style="display: flex">
                    <Page :total="total"
                          size="small"
                          show-elevator
                          show-sizer
                          :current="page"
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
            <searchPlatFlowcontacts v-show="openPick"
                                    :searchCloumns="searchCloumns"
                                    :params="params"
                                    @closeUp="close1"
                                    @changeinput="changeinput"
                                    ref="searchPlatFlowcontacts"></searchPlatFlowcontacts>
        </transition>
    </div>
</template>
<script>
import update from './addNewPlatFlowcontacts'
import { isSuccess, getUrlKey } from '../../../lib/util'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import searchPlatFlowcontacts from '../../../components/searchTable/searchPlatSysform'

export default {
    name: 'platFlowcontacts',
    data () {
        return {
            loading: false,
            isSpin: false,
            tableheight: document.body.offsetHeight - 250,
            noDataImg: '<div id="noData"></div>',
            value: '',
            logType: '',
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            columns: [
                {
                    type: 'selection',
                    width: 54,
                    align: 'center',
                },
                {
                    title: this.$t('lang_platform.platFlowcontacts.flcontFormtype'),
                    key: 'flcontFormtypeDis',
                    sortable: 'custom',
                    //          width: 130,
                },
                {
                    title: this.$t('lang_platform.platFlowcontacts.flcontFlowName'),
                    key: 'flcontFlowName',
                    sortable: 'custom',
                    //          width: 130,
                },
                {
                    title: this.$t('lang_platform.platFlowcontacts.flcontMark'),
                    key: 'flcontMark',
                    sortable: 'custom',
                    //          width: 130,
                },
                {
                    title: this.$t('lang_platform.platFlowcontacts.flcontName'),
                    key: 'flcontName',
                    sortable: 'custom',
                    //          width: 130,
                },
                {
                    title: this.$t('lang_platform.platFlowcontacts.flcontValueName'),
                    key: 'flcontValueName',
                    //          width: 140,
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    fixed: 'right',
                    width: 80,
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
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            funId: '1000',
            flcontFlow: '',
            flcontMark: '',
            openPick: false,
            flcontFlowName: '',
            params: {
                _mt:  this.$global.mt+'PlatSysform.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
                data: '{}',
            },
            searchCloumns: [
                {
                    title: this.$t('lang_platform.platFlowcontacts.sformName'),
                    key: 'sformName',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: this.$t('lang_platform.platFlowcontacts.sformTbname'),
                    key: 'sformTbname',
                    sortable: 'custom',
                    width: 379,
                },
            ],
        }
    },
    computed: {

    },
    components: {
        searchPlatFlowcontacts,
        update,
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            t.flcontFlow = ''
            t.flcontFlowName = ''
            t.flcontMark = ''
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
            const data = {
                _mt:  this.$global.mt+'PlatFlowcontacts.getPage',
                AProws: t.rows,
                APpage: t.page,
                APsort: t.sort,
                APorder: t.order,
                APlogType: this.$t('button.ser'),
                flcontFlow: t.flcontFlow,
                flcontMark: t.flcontMark,
                APffk: '0'
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
        updateimg () {
            this.updateImg = true
        },
        closeImg () {
            const t = this
            t.updateImg = false
        },
        render1 () {
            this.$Modal.confirm({
                ref: 'imgEdit',
                onOk: () => {
                    const formData = new FormData(document.getElementById('fileinput1'))
                    uploadimage(formData).then((res) => {
                        alert(res)
                    }).catch((res) => {
                        alert(res)
                    })
                },
                attrs: {
                    id: 'foo',
                },
                render: (h) => {
                    return h(imgEdit, {
                        props: {
                            value: this.value,
                        },
                        on: {
                            change: (val) => {
                                this.value = val
                            },
                        },

                    })
                },

            })
        },
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
        close1 () {
            const t = this
            t.openPick = false
        },
        changeinput (name, id) {
            const t = this
            t.flcontFlowName = name
            t.flcontFlow = id
        },
        pickData () {
            const t = this
            t.$refs.searchPlatFlowcontacts.getData(this.params)
            t.openPick = true
        },
        clearPlatFlowcontactsid () {
            const t = this
            t.flcontFlowName = ''
            t.flcontFlow = ''
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
                            _mt:  this.$global.mt+'PlatFlowcontacts.delByIds',
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
            //        t.$refs.update.getSelect()
            if (logType === this.$t('button.y.upd')) {
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
            t.$refs.update.formValidate.flcontFlow = ''
            t.$refs.update.flcontFlowName = ''
            t.$refs.update.formValidate.flcontMark = ''
            t.$refs.update.formValidate.flcontName = ''
            t.$refs.update.formValidate.flcontValue = ''
            t.$refs.update.flcontValueName = ''
            t.$refs.update.formValidate.comment = ''
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
</style>
