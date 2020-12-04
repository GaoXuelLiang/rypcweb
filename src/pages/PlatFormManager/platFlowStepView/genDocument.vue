<template>
    <div class="content-main genDocument"
         ref="genDocument">
        <row class="table-form"
             ref="table-form">
            <Table stripe
                   :loading="loading"
                   @on-selection-change="selectedtable"
                   @on-sort-change="sortable"
                   :height="childTableHeight"
                   :no-data-text="noDataImg"
                   size="small"
                   ref="selection"
                   :columns="columns"
                   :data="$store.state.flowStepData.childTable2"></Table>
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
                    @click="getData(1)"></Button>
        </Row>
        <updGenDocument v-if="showMsg"
                        @hideMsg="hideMsg"
                        ref="updGenDocument"
                        :logType="logType"
                        :id="id"></updGenDocument>
        <docVar v-show="showVarMsg"
                @hideMsg="hideVarMsg"
                ref="docVar"></docVar>
    </div>
</template>
<script>
import docVar from './docVar'
import updGenDocument from './updGenDocument'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

export default {
    data () {
        return {
            loading: false,
            logType: '',
            id: '',
            total: NaN,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            tableselected: [],
            showMsg: false,
            showVarMsg: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.$t('lang_flow.docTemplate.flsdcOrder'),
                    key: 'flsdcOrder',
                    width: 80,
                    sortable: 'custom',
                },
                {
                    title: this.$t('lang_flow.docTemplate.flsdcTempname'),
                    key: 'flsdcTempname',
                    //            align: 'center',
                },
                {
                    title: this.$t('lang_flow.docTemplate.flsdcType'),
                    key: 'flsdcTypeDis',
                    //            align: 'center',
                },
                {
                    title: this.$t('lang_flow.docTemplate.flsdcIsvalid'),
                    key: 'flsdcIsvalidDis',
                    //            align: 'center',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    width: 150,
                    fixed: "right",
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                },
                                style: {
                                    marginRight: '10px',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.view'), params.index)
                                    },
                                },
                            }, this.$t('button.view')),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.vindicateVar(params.row.id, params.index)
                                    },
                                },
                            }, this.$t('lang_flow.flowcommon.var_setting')),
                        ])
                    },
                },
            ],
            childTableHeight: 0,
            pageHeight: "genDocument",
            isBtn: true,
            noDataImg: '<div id="noData"></div>',
        }
    },
    components: {
        updGenDocument,
        docVar,
    },
    methods: {
        getdata (page) {
            const t = this;
            t.loading = true;
            if (page) {
                t.page = page
            }
            const data = {
                _mt:  this.$global.mt+'PlatFlsDoc.getPage',
                funId: '1',
                logType: this.$t('button.ser'),
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                flsdcStep: t.$store.state.flowStepData.mainId,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (Object.keys(res.data.content[0]).length !== 0) {
                        this.$store.commit('flowStepData/setChildTable2', res.data.content[0].rows)
                        t.total = res.data.content[0].records
                    } else {
                        this.$store.commit('flowStepData/setChildTable2', [])
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.loading = false;
            })

        },
        sizeChange (size) {
            const t = this
            t.rows = size
            t.getdata()
        },
        pageChange (page) {
            const t = this
            t.page = page
            t.getdata()
        },
        sortable (column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getdata()
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
                        // 添加请求模块
                        getDataLevelUserLogin({
                            _mt:  this.$global.mt+'PlatFlsDoc.delByIds',
                            funId: '1',
                            companyId: '1',
                            logType: this.$t('button.del'),
                            delIds: t.tableselected.toString(),
                        }).then((res) => {
                            if (isSuccess(res, t)) {
                                t.tableselected = []
                                t.getdata()
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
        showMsgBtn () {
            this.showMsg = true
        },
        vindicateVar (id, index) {
            const t = this
            t.showVarMsg = true
            //      将本条数据的id传入mainid（如果有的话）
            this.$store.commit('flowStepData/setIndex', index)
            this.$store.commit('flowStepData/setChildId4', id)
            if (id) {
                t.$refs.docVar.getdata()
            }
        },
        openUp (id, logType, index) {
            const t = this
            t.showMsg = true
            t.logType = logType
            //      将本条数据的id传入mainid（如果有的话）
            t.id = id
            this.$store.commit('flowStepData/setIndex', index)
            /* if (id) {
               t.$refs.updGenDocument.getFormData(id)
             } */
        },
        hideMsg () {
            this.showMsg = false
        },
        hideVarMsg () {
            this.showVarMsg = false
        },
        getTableHeight () {
            let func = this.$resize.call(this);
            window.onresize = func;
            func();
        }
    },
    destroyed () {
        window.onresize = null;
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/childTable.scss";
</style>
