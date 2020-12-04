<template>
    <div class="content-main pageHeight">
        <Row class="btnHeight">
            <Button type="warning"
                    @click="showMsgBtn(NaN,$t('button.add'))">{{$t('button.add')}} </Button>
            <Button type="error"
                    @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form"
             ref="table-form">
            <Table @on-selection-change="selectedtable"
                   @on-sort-change="sortable"
                   :height="childTableHeight"
                   size="small"
                   stripe
                   :loading="loading" 
                    :no-data-text="noDataImg"
                   ref="selection"
                   :columns="columns"
                   :data="data"></Table>
        </row>
        <Row style="display: flex">
            <Page :current="params.page"
                  :total="total"
                  size="small"
                  show-elevator
                  show-sizer
                  placement="top"
                  @on-page-size-change="sizeChange"
                  @on-change="pageChange"
                  :page-size-opts="[10, 20, 50, 100]"></Page>
            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}} {{$t('reminder.of')}} <span>{{total}}</span></span><Button size="small"
                    shape="circle"
                    icon="md-refresh"
                    style="margin-left: 20px;display: inline-block;"
                    @click="getdata(1)"></Button>
        </Row>
        <contentMsg v-show="showMsg"
                    @hideMsg="hideMsg"
                    :logType="logType"
                    :id="id"
                    :unitsSname="unitsSname"
                    :idname="idname"
                    ref="contentMsg"
                    @getdata="addNewArray"
                    @update="updateArray"></contentMsg>
    </div>
</template>
<script>
 import contentMsg from './orgpostChildEdit'
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
import { isSuccess, deepCopy } from '../../../../lib/util'

export default {
    data () {
        return {
            logType: '',
            loading: false,
            noDataImg: '<div id="noData"></div>',
            total: NaN,
            showMsg: false,
            nameOrMobile: '',
            childTableHeight: 0,
            pageHeight:'pageHeight',
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: this.$t('lang_organization.popUp.dept'),
                    key: 'unitIdDis',
                    sortable: 'custom',
                    width: 270,
                },
                //          {
                //            title: this.$t('lang_authorization.platRole.platRolechildEmpid'),
                //            key: 'platRolechildEmpidDis',
                //            sortable: 'custom',
                //            width: 160,
                //          },
                {
                    title: this.$t('lang_organization.popUp.post'),
                    key: 'postIdDis',
                    sortable: 'custom',
                    width: 270,
                },
                //          {
                //            title: this.$t('lang_authorization.platRole.platRolechildEnname'),
                //            key: 'platRolechildEnname',
                //            sortable: 'custom',
                //            width: 160,
                //          },
                // {
                //     title: this.$t('lang_authorization.platRole.platRolechildMail'),
                //     key: 'platRolechildMail',
                //     sortable: 'custom',
                //     width: 160,
                // },
                // {
                //     title: this.$t('lang_authorization.platRole.platRolechildTel'),
                //     key: 'platRolechildTel',
                //     sortable: 'custom',
                //     width: 160,
                // },
                // {
                //     title: this.$t('lang_authorization.platRole.platRolechildPhone'),
                //     key: 'platRolechildPhone',
                //     sortable: 'custom',
                //     width: 160,
                // },
                // {
                //     title: this.$t('lang_authorization.platRole.platRolechildVailddate'),
                //     key: 'platRolechildVailddate',
                //     sortable: 'custom',
                //     width: 160,
                // },
                // {
                //     title: this.$t('lang_authorization.platRole.platRolechildInvailddate'),
                //     key: 'platRolechildInvailddate',
                //     sortable: 'custom',
                //     width: 160,
                // },
                {
                    title: this.$t('button.opr'),
                    key: 'action',
                    width: 64,
                    fixed: 'right',
                    align:'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.showMsgBtn(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            }, this.$t('button.y.upd')),
                        ])
                    },
                },
            ],
            data: [],
            params: {
                _mt: 'orgUnitPostService.getPage',
                funId: '1',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
                logType: '',
                unitId:''
            },
            index: '',
            tableselected: '',
        }
    },
    props: {
        id: Number,
        idname: String,
        unitsSname:String
    },
    components: {
        contentMsg,
    },
    mounted(){
        
    },
    watch:{
       id(val){
           this.params.unitId = val
       } 
    },
    methods: {
        getdata (page) {
            const t = this
            t.loading =true
            if (page) {
                t.params.page = page
            }
            //console.log(this.unitsSname)
            t.params.logType = '查询List信息'
            //t.params.platRolecontactId = t.$store.state.platRole.mainId
            const data = deepCopy(t.params)
            getDataLevelUserLoginNew(data).then((res) => {
                t.loading =false
                if (isSuccess(res, t)) {
                    t.total = res.data.content[0].records
                    t.data = res.data.content[0].rows
                    console.log(res)
                }
            }).catch(() => {
                t.loading =false
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        pageChange (page) {
            const t = this
            t.params.page = page
            t.getdata()
        },
        sortable (column) {
            this.params.sort = column.key
            this.params.order = column.order
            if (this.params.order !== 'normal') {
                this.getdata()
            } else {
                this.params.order = 'desc'
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
                            _mt: 'orgUnitPostService.deleteByIds',
                            funId: '1',
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
        sizeChange (size) {
            const t = this
            t.params.rows = size
            t.getdata()
        },
        showMsgBtn (id, logType, index) {
            const t = this
            t.showMsg = true
            t.index = index
            t.logType = logType
            console.log(this.unitsSname)
            //t.$refs.contentMsg.setIdname(t.idname)
            if(logType === "新增"){
                t.$refs.contentMsg.clear()
            }
            if (logType === this.$t('button.y.upd')) {
                t.$refs.contentMsg.setRowId(id)

            }
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
        hideMsg () {
            this.showMsg = false
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
@import "../../../../sass/childTable.scss";
</style>
