<template>
    <div class="content-main pageHeight">
        <Row>
            <Col span="24">
            <Row>
                <Button class="btnHeight btns"
                        v-for="(item, index) in btns"
                        :key="index"
                        :type="item.btn_id === 'button_del' ? 'error' :'button_add'? 'warning': 'primary'"
                        @click="btnFunction(item.btn_id)">{{item.btn_title}}</Button>
                <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
            </Row>
            <row class="table-form"
                 ref="table-form">
                <Table @on-selection-change="selectedtable"
                       :no-data-text="noDataImg"
                       :loading="loading"
                       @on-sort-change="sortable"
                       :height="childTableHeight"
                       size="small"
                       stripe
                       ref="selection"
                       :columns="columns"
                       :data="data"></Table>
            </row>
            <row style="display: flex;">
                <Page :total="total"
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
                        style="margin-left: 20px;"
                        @click="refresh"></Button>
            </row>
            </Col>
            <transition name="fade">
                <selCountry v-show="openSelCountry"
                            selSort="id"
                            selOrder="asc"
                            @selOk="countrySelOk"
                            @close="closeSelCountry"
                            ref="selCountry"></selCountry>
            </transition>
            <testUpdPage v-if="openTestUpd"
                         :disabled="disabled"
                         @close="closeTest"
                         ref="testUpdPage"
                         :logType="logType"
                         @getData="getData"
                         :tbName="tbName"
                         :id="formNo"
                         :pklv="pklv"
                         :formParentfield="formParentfield"></testUpdPage>
            <advanced v-show="showAdvanced"
                      @closeAdvanced="closeAdvanced"
                      ref="advanced"
                      @getData="getData"></advanced>
        </Row>
    </div>
</template>
<script>
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, getUrlKey } from '../../../lib/util'
import selCountry from '../../../components/commonsel/selCountry'
import testUpdPage from './commonSinglePageUpdate1'
import advanced from '@/components/searchTable/searchAdvanced'
export default {
    data () {
        return {
            value: '',
            childTableHeight: 0,
            pageHeight:'pageHeight',
            noDataImg: '<div id="noData"></div>',
            disabled: null,
            formParentfield: '', // 主表字段名
            logType: '',
            openUpdate: false,
            openTestUpd: false,
            showAdvanced: false,
            loading: true,
            updateId: NaN,
            tableselected: [],
            columns: [],
            tbName: '',
            btns: [],
            data: [],
            total: 0,
            index: 0,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            countryId: '',
            countryCn: '',
            openSelCountry: false,
            formNo: '',
            revise_view: {
                width: 65,
                title: this.$t('button.opr'),
                key: 'action',
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                            },
                            on: {
                                click: () => {
                                    this.openUp(params.row.id, '查看', params.index)
                                },
                            },
                        }, this.$t('button.view')),
                    ])
                },
            },
            revise_upd: {
                width: 65,
                title: this.$t('button.opr'),
                key: 'action',
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
                                    this.openUp(params.row.id, '修改', params.index)
                                },
                            },
                        }, this.$t('button.y.upd')),
                    ])
                },
            },
            revise: {
                width: 120,
                title: this.$t('button.opr'),
                key: 'action',
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
                                marginRight: '10px',
                            },
                            on: {
                                click: () => {
                                    this.openUp(params.row.id, '修改', params.index)
                                },
                            },
                        }, this.$t('button.y.upd')),
                        h('Button', {
                            props: {
                                type: 'success',
                                size: 'small',
                            },
                            on: {
                                click: () => {
                                    this.openUp(params.row.id, '查看', params.index)
                                },
                            },
                        }, this.$t('button.view')),
                    ])
                },
            },
        }
    },
    props: {
        pklv: String, // 主表id
        tableheight: Number,
    },
    computed: {
 
    },
    components: {
        selCountry,
        testUpdPage,
        advanced,
    },
    //    created() {
    //      this.getColumns()
    //    },
    mounted () {
    },
    mouted () {
        if (eval(getUrlKey('state').toLowerCase())) {
            const t = this
            this.getColumns()
            this.getData()
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
        refresh () {
            this.getColumns()
        },
        getColumns () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatAutoLayoutGetList.getListColumn',
                logType: 'getListColumn',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$emit('changetitle', res.data.content[0].formName)
                    let aa = []
                    t.formParentfield = res.data.content[0].formParentfield
                    t.btns = res.data.content[0].btns
                    if (t.btns.length > 1) {
                        t.thisHeight = document.body.clientHeight - 320
                    } else {
                        t.thisHeight = document.body.clientHeight - 270
                    }
                    console.log(t.btns)
                    console.log(res.data.content[0].columns)
                    t.tbName = res.data.content[0].tbName
                    aa = res.data.content[0].columns
                    for (let i = 0; i < aa.length; i++) {
                        if (!aa[i].width) {
                            aa[i].width = 140
                        } else {
                            aa[i].width = 60
                        }
                    }
                    t.columns = aa
                    for (let i = 0; i < t.btns.length; i++) {
                        if (t.btns[i].btn_id === 'button_view' && t.btns[i].btn_id === 'button_y_upd') {
                            t.columns.push(t.revise)
                            break
                        }
                        if (t.btns[i].btn_id === 'button_view') {
                            t.btns.splice(i, 1)
                            t.columns.push(t.revise_view)
                            break
                        }
                        if (t.btns[i].btn_id === 'button_y_upd') {
                            t.btns.splice(i, 1)
                            t.columns.push(t.revise_upd)
                            break
                        }
                    }
                    if (this.$store.state.user.funId) {
                        // this.getData()
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        btnFunction (btnId) {
            if (btnId === 'button_add') {
                this.formNo = '0'
                this.logType = '新增'
                this.openTestUpd = true
            } else if (btnId === 'button_del') {
                this.isDelete()
            }
        },
        openUp (id, logType, index) {
            this.formNo = id
            this.logType = logType
            this.index = index
            this.openTestUpd = true
            if (logType === '查看') {
                this.disabled = true
            }
            if (logType === '修改') {
                this.disabled = false
            }
        },
        closeTest () {
            this.openTestUpd = false
        },
        getData () {
            const t = this
            t.loading = true
            const data = {
                _mt:  this.$global.mt+'PlatAutoLayoutGetList.getPage',
                sort: t.sort,
                order: t.order,
                rows: t.rows,
                page: t.page,
                logType: 'getPage1',
                data: '',
            }
            if (t.pklv !== '') {
                data.data = JSON.stringify({
                    pklv: t.pklv,
                })
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = JSON.parse(res.data.content[0].rows)
                    t.total = res.data.content[0].records
                    this.loading = false
                }
            }).catch(() => {
                this.loading = false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
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
            if (column.order !== 'normal') {
                this.order = column.order
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
        isDelete () {
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择要删除的数据',
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: '是否确认删除？',
                    onOk: () => {
                        t.deletemsg()
                    },
                })
            }
        },
        deletemsg () {
            const t = this
            console.log(t.tableselected)
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择要删除的数据',
                })
                return
            }
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatAutoLayoutDel.delByIds',
                logType: this.$t('button.del'),
                tbName: t.tbName,
                delIds: t.tableselected,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.$Modal.success({
                        title: this.$t('reminder.suc'),
                        content: '删除成功',
                    })
                    t.getData()
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        pickCountrySel () {
            this.$refs.selCountry.getData()
            this.openSelCountry = true
        },
        countrySelOk (countryId, countryCn) {
            //        alert(countryId + ' ' + countryCn)
            this.countryId = countryId
            this.countryCn = countryCn
        },
        closeSelCountry () {
            this.openSelCountry = false
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
// .content-main {
//     padding-top: 0 !important;
// }
//   .table-form{
//     margin: 10px 0;
//   }
.btns {
    margin-right: 10px;
}
// .margin-right-10{
//     margin-right: 10px;
//   }
//   .fade-enter-active, .fade-leave-active {
//     transition: opacity .2s
//   }
//   .fade-enter, .fade-leave-to {
//     opacity: 0
//   }
</style>
