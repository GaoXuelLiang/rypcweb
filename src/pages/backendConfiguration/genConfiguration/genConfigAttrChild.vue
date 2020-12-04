<template>
    <div class="content-main genConfigAttrChild">
        <Row class="btnHeight">
            <Button type="warning" @click="showMsgBtn(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <Button type="primary" @click="init">初始化</Button>
            <Button type="primary" @click="initColumn">生成虚拟字段</Button>
        </Row>
        <row class="table-form" ref="table-form">
            <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="childTableHeight" size="small" ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          
            <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
            <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
            <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
        <contentMsg v-show="showMsg" @hideMsg="hideMsg" @getData="getData" @update="getData" :logType="logType" :id="updateId" ref="contentMsg" ></contentMsg>
    </div>
</template>

<script>
import contentMsg from './editConfigAttr'
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
export default {
    data(){
        return {
            showMsg:false,
            loading:false,
            total: NaN,
            logType:'',
            updateId:NaN,
            noDataImg:'<div id="noData"></div>',
            childTableHeight:0,
            pageHeight: "genConfigAttrChild",
            tableselected:[],
            data:[],
            columns:[
                {
                    type:'selection',
                    width:60,
                    align:'center'
                },
                {
                    title:'列名',
                    key:'columnName',
                    sortable:'custom',
                    width:120,
                    align:'center'
                },
                {
                    title:'列注释',
                    key:'columnRemarks',
                    sortable:'custom',
                    width:120,
                    align:'center'
                },
                {
                    title:'字段类别',
                    key:'columnCategoriesDis',
                    sortable:'custom',
                    width:120,
                    align:'center'
                },
                {
                    title:'关联实体字段',
                    key:'relationColumn',
                    sortable:'custom',
                    width:120,
                    align:'center'
                },
                {
                    title:'字段类型',
                    key:'columnType',
                    sortable:'custom',
                    width:120,
                    align:'center'
                },
                {
                    title:'属性名',
                    key:'propertyName',
                    sortable:'custom',
                    width:120,
                    align:'center'
                },
                {
                    title:'模糊字段类型',
                    key:'columnPage',
                    sortable:'custom',
                    width:120,
                    align:'center'
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
                                this.showMsgBtn(params.row.id, this.$t('button.y.upd'), params.index)
                            },
                        },
                        }, this.$t('button.y.upd')),
                    ])
                    },
                },
            ],
            params: {
                _mt:  this.$global.mt+'GenColumn.getPage',
                rows: 10,
                page: 1,
                sort: 'id',
                order: 'desc',
            },
        }
    },
    components:{
        contentMsg
    },
    props:{
    },
    methods:{
        /**
         * 表格
         */
        getData(){
            const t = this;
            t.loading = true;
            t.data = [];
            t.params.pid = t.$store.state.genConfigJS.mainId
            const data = deepCopy(t.params)
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.total = res.data.content[0].records
                    t.data = res.data.content[0].rows
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(()=>{
                t.loading = false;
            })
        },
        sortable(column) {
            this.params.sort = column.key
            this.params.order = column.order
            if (this.params.order !== 'normal') {
                this.getdata()
            } else {
                this.params.order = 'desc'
            }
        },
        selectedtable(selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        /**
         * 新增
         */
        showMsgBtn(id,logType,index){
            const t = this
            t.showMsg = true
            t.logType = logType
            t.updateId = parseInt(id, 10);
            // console.log(id)
            if (id) {
                t.$refs.contentMsg.getData(id)
            }
        },
        hideMsg() {
            this.showMsg = false
        },
        /**
         * 初始化
         */
        init(){
            const t = this;
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '确定初始化',
                onOk: () => {
                    const data = {
                        _mt: this.$global.mt+'GenColumn.initData',
                        pid:t.$store.state.genConfigJS.mainId,
                        funId:'1',
                        logType:'初始化',
                    }
                    getDataLevelUserLogin(data).then(res=>{
                        console.log(res.data)
                    }).catch(()=>{
        
                    })
                },
                onCancel: () => {},
            })
        },
        initColumn(){
            const t = this;
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                 t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: '确定生成虚拟字段',
                onOk: () => {
                    const data = {
                        _mt: this.$global.mt+'GenColumn.initColumnDis',
                        pid:t.$store.state.genConfigJS.mainId,
                        funId:'1',
                        logType:'生成虚拟字段',
                        ids: t.tableselected.toString(),
                    }
                    getDataLevelUserLogin(data).then(res=>{
                        console.log(res.data)
                    }).catch(()=>{
        
                    })
                },
                onCancel: () => {},
            })
            }
        },
        /**
         * 删除
         */
        deletemsg(){
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
                            _mt:  this.$global.mt+'GenColumn.delByIds',
                            funId: '1',
                            companyId: '1',
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
                    onCancel: () => {},
                })
            }
        },
        /**
         * 分页
         */
        pageChange(page) {
            const t = this
            t.params.page = page
            t.getData()
        },
        sizeChange(size) {
            const t = this
            t.params.rows = size
            t.getData()
        },
        /**
         * 计算表格高度
         */
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