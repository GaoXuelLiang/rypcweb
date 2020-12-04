<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{$t('lang_flow.mailCon.title1')}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="content-main">
                <row class="table-form"
                     ref="table-form">
                    <Table stripe
                           :loading="loading"
                           :no-data-text="noDataImg"
                           @on-selection-change="selectedtable"
                           @on-sort-change="sortable"
                           height="320"
                           size="small"
                           ref="selection"
                           :columns="columns"
                           :data="data"></Table>
                </row>
                <!-- <Button class="btn"
                        type="primary"
                        @click="save">{{$t('button.sav')}}</Button> -->
                        <row type="flex"
                             justify="end" class="btn">
                                <Button @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                                <Button type="primary"
                                        style="margin-left: 8px"
                                        @click="save">{{$t('button.sav')}}</Button>
                        </row>
            </div>
        </div>
    </div>
</template>
<script>

// import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import {getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess } from '../../../lib/util'

export default {
    data () {
        return {
            loading: false,
            noDataImg: '<div id="noData"></div>',
            tableselected: '',
            logType: '',
            total: NaN,
            sort: 'id',
            order: 'desc',
            rows: '10',
            page: '1',
            showMsg: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.$t('lang_flow.mailCon.contactMark'),
                    key: 'contactMark',
                    align: 'left',
                },
                {
                    title: this.$t('lang_flow.mailCon.contactName'),
                    key: 'contactName',
                    align: 'left',
                },
            ],
            data: [],
        }
    },
    props: {
        conttype: String,
    },
    components: {
    },
    methods: {
        getdata () {
            const t = this;
            t.loading = true;
            const data = {
                _mt:  this.$global.mt+'VMailContact.getPage',
                APfunId: '1',
                APlogType: this.$t('button.ser'),
                APsort: t.sort,
                APorder: t.order,
                AProws: t.rows,
                APpage: t.page,
                contactMark: t.contactMark,
                contactName: t.contactName,
                contactflowType: 'businessFlow',
                contactFlowid: t.$store.state.flowStepData.flowId,
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.total = res.data.content[0].records
                    t.data = res.data.content[0].rows
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
            this.tableselected = newArr.toString()
        },
        showMsgBtn () {
            this.showMsg = true
        },
        close () {
            this.tableselected = ''
            this.$emit('hideMsg')
        },
        save () {
            const t = this
            const data = {
                _mt:  this.$global.mt+'VMailContact.add',
                APfunId: '1',
                APlogType: this.$t('button.ser'),
                id: t.tableselected,
                receiveType: t.conttype,
                stepMailId: t.$store.state.flowStepData.childId3,
            }

            if (!data.id) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请至少选择一条记录',
                })
                return
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].value) {
                        t.$store.commit('flowStepData/addNewArrayChildTable5', res.data.content[0].value)
                        t.close()
                        t.$Modal.success({
                            title: this.$t('reminder.suc'),
                            content: this.$t('reminder.addsuccess'),
                        })
                    } else {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: '信息已经存在，请修改',
                        })
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
@import "../../../sass/searchTable.scss";
// .content-main {
//     height: 500px;
//     .table-form {
//         margin: 10px 0;
//     }
// }
// .btn {
//     position: absolute;
//     bottom: 20px;
//     right: 40px;
// }
// //
// @import "../../../sass/table.scss";
// .searchInput {
//     margin-right: 5px;
// }
// .ivu-btn {
//     margin-right: 5px;
// }
.btn {
    margin: 20px 0;
}
</style>
