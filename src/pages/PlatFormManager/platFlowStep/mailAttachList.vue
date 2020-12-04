<template>
    <div class="background">
        <div class="backbox">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{$t('lang_flow.mailAttach.title')}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="table-form">
                <Row>
                    <Button type="warning"
                            class="btnStyle"
                            @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
                    <Button type="error"
                            class="btnStyle"
                            @click="deletemsg">{{$t('button.del')}}</Button>
                </Row>
            </div>
            <row class="table-form"
                 ref="table-form">
                <Table stripe
                       :loading="loading"
                       @on-selection-change="selectedtable"
                       @on-sort-change="sortable"
                       height="320"
                       :no-data-text="noDataImg"
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
                      placement="top"
                      @on-page-size-change="sizeChange"
                      @on-change="pageChange"
                      :page-size-opts="[10, 20, 50, 100]"></Page>
                <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                        shape="circle"
                        icon="md-refresh"
                        style="margin-left: 20px;display: inline-block;"
                        @click="getdata(1)"></Button>
            </Row>
            <transition name="fade">
                <updMailAttach v-if="showMsg"
                               @hideMsg="hideMsg"
                               ref="updMailAttach"
                               :logType="logType"
                               :id="id"
                               @addNewArray="addNewArray"
                               @updMailAttach="updateArray"></updMailAttach>
            </transition>

        </div>
    </div>
</template>
<script>
import updMailAttach from './updMailAttach'
// import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import {getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess } from '../../../lib/util'

export default {
    data () {
        return {
            loading: false,
            noDataImg: '<div id="noData"></div>',
            id: '',
            logType: '',
            total: NaN,
            sort: 'id',
            order: 'desc',
            rows: 10,
            page: 1,
            showMsg: false,
            tableselected: '',
            data: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.$t('lang_flow.mailAttach.flsmlatOrder'),
                    key: 'flsmlatOrder',
                    //width: 80,
                    //            align: 'center',
                },
                {
                    title: this.$t('lang_flow.mailAttach.flsmlatSource'),
                    key: 'flsmlatSourceDis',
                    //            align: 'center',
                },
                // {
                //     title: this.$t('lang_flow.mailAttach.flsmlatNameDis'),
                //     key: 'flsmlatUpdfield',
                //     //            align: 'center',
                // },
                {
                    title: this.$t('lang_flow.mailAttach.flsmlatIsvalid'),
                    key: 'flsmlatIsvalidDis',
                    //            align: 'center',
                },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    align: 'center',
                    width: 80,
                    fixed: "right",
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
        }
    },
    components: {
        updMailAttach,
    },
    mounted () {
        //      this.getdata()
    },
    methods: {
        getdata () {
            const t = this;
            t.loading = true;
            const data = {
                _mt:  this.$global.mt+'PlatFlsmlAttach.getPage',
                APfunId: '1',
                APlogType: this.$t('button.ser'),
                APsort: t.sort,
                APorder: t.order,
                AProws: t.rows,
                APpage: t.page,
                flowId: t.$store.state.flowStepData.flowId,
                flsmlatMail: t.$store.state.flowStepData.childId3,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0].rows
                   // debugger
                    t.total = res.data.content[0].records
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
                        getDataLevelUserLoginData({
                            _mt:  this.$global.mt+'PlatFlsmlAttach.delByIds',
                            APfunId: '1',
                            // companyId: '1',
                            APlogType: this.$t('button.del'),
                            APdelIds: t.tableselected.toString(),
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
        openUp (id, logType, index) {
            const t = this
            t.showMsg = true
            t.id = id
            t.logType = logType
            //      将本条数据的id传入mainid（如果有的话）
            this.$store.commit('flowStepData/setIndex', index)
            if (logType=='修改') {
                t.$refs.updMailAttach.getFormData(id)
            } 
        },
        hideMsg () {
            this.showMsg = false
        },
        close () {
            this.$emit('hideMsg')
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
@import "../../../sass/searchTable.scss";
</style>
