<template>
    <div class="table">
        <Row>
            <i-col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        反查关联引用
                    </p>
                    <Row class="btnHeight">
                        <Input class="searchInput" v-model="extModel" placeholder="外部字段对象" style="width:200px"/>
                        <span style="margin: 0;"><Button type="info" style="width:56px" :loading="isSpin" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
                        <Button type="warning" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
                        <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
                        <Button type="primary"  @click="expData">{{$t('button.exp')}}</Button>
                        <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>
                    </Row>
                    <Row class="table-form" ref="table-form">
                        <Table stripe :no-data-text="noDataImg" :columns="columns" :data="data" :loading="isSpin" :height="tableheight" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" size="small" ref="selection"></Table>
                    </Row>
                    <Row style="display:flex">
                        <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]"></Page>
                        <span style="margin-left: 10px;margin-top: 2px">{{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}<span>{{total}}</span></span>
                        <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
                    </Row>
                </Card>
            </i-col>
        </Row>
        <transition>
            <update ref="update" v-show="openUpdate" @getData="addNewArray" @update="updateArray" @closeUp="closeUp" :logType="logType" :id="updateId"></update>
        </transition>
        <transition >
            <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
        </transition>
        <transition >
            <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
        </transition>
        <transition name="fade">
            <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt" @getData="getData" @closeImport="closeImport" ref="importExcel"></importExcel>
        </transition>
    </div>
</template>

<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess,getUrlKey } from '../../../lib/util'
import update from './update'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
export default {
    data(){
        return {
            isSpin:false,
            /**表格 */
            extModel:'',
            tableheight:document.body.offsetHeight - 250,
            noDataImg:'<div id="noData"></div>',
            columns:[
                {
                    type:'selection',
                    width:54,
                    align:'center'
                },
                {
                    title:'外键属性',
                    key:'extKey',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'外部字段对象',
                    key:'extModel',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'外部服务名称',
                    key:'extPackage',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:this.$t('button.opr'),
                    key: 'action',
                    width: 80,
                    fixed: 'right',
                    align: 'center',
                    render:(h,params)=>{
                        return h('div',[
                            h('Button',{
                                props: {
                                    type: 'success',
                                    size: 'small',
                                },
                                style: {
                                    // marginRight: '10px',
                                },
                                on: {
                                    click: () => {
                                        this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                                    },
                                },
                            },this.$t('button.y.upd'))
                        ])
                    }
                }
            ],
            data:[],
            tableselected:[],
            sort:'id',
            order:'desc',
            /**
             * 新增修改
             */
            openUpdate:false,
            logType:'',
            updateId:NaN,
            /**
             * 导出
             */
            openExp:false,
            openExpDow:false,
            expDataTital: [
                { code: 'extKey', name: '外键属性' }, 
                { code: 'extModel', name: '外部字段对象' },
                { code: 'extPackage', name: '外部服务名称' }
            ],
            filekey: '',
            filename: '',
            /**
             * 导入
             */
            openImport:false,
            imp_mt: this.$global.mt+'GenExt.importData',
            /**分页 */
            page:1,
            total:0,
            index:0,
            rows:10,
        }
    },
    components:{
        update,
        expwindow,
        expdow,
        importExcel
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.serviceNames = ''
        t.getData(1)
      }
    },
    methods:{
        /**
         * 表格
         */
        getData(page){
            const t = this;
            t.isSpin = true;
            if(page){
                t.page  = page;
            }
            const data = {
                _mt: this.$global.mt+'GenExt.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                funId: '1000',
                extModel: t.extModel
            }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLoginNew(data).then(res=>{
                if(isSuccess(res,t)){
                    t.data = res.data.content[0].rows
                    t.total = res.data.content[0].records
                }
            }).catch(()=>{
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(()=>{
                t.isSpin = false;
            })
        },
        selectedtable(selection) {
            const newArr = []
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id)
            }
            this.tableselected = newArr
        },
        sortable(column) {
            this.sort = column.key
            this.order = column.order
            if (this.order !== 'normal') {
                this.getData()
            } else {
                this.order = 'desc'
            }
        },
        /**
         * 新增
         */
        openUp(id,logType,index){
            const t = this;
            t.updateId = parseInt(id, 10);
            t.logType = logType;
            t.index = index;
            t.openUpdate = true;
            if (logType === this.$t('button.y.upd')) {
                t.$refs.update.getData(id)
            }
        },
        addNewArray(res) {
            const t = this
            t.data.unshift(res)
        },
        updateArray(res) {
            const t = this
            t.data.splice(t.index, 1, res)
        },
        closeUp(){
            const t = this;
            t.openUpdate = false;
        },
        /**
         * 删除 
         */
        deletemsg(){
            const t = this
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.leastone'),
                })
            } else {
                t.$Modal.confirm({
                    title: this.$t('reminder.remind'),
                    content: this.$t('lang_user.rootrole.delTips'),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt:  this.$global.mt+'GenExt.delByIds',
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
                    onCancel: () => {
                    },
                })
            }
        },
        /**
         * 导出
         */
        expData() {
            const  t = this;
            const data = {
                // lanTypeCode: this.lanTypeCode,
                // lanTypeName: this.lanTypeName,
                // comment: this.comment,
                extModel: t. extModel,
            }
            t.$refs.expwindow.getData(t.expDataTital,  this.$global.mt+'GenExt.export', data)
            t.openExp = true
        },
        closeExp() {
            const t = this
            t.openExp = false
        },
        setFileKey(filekey, filename, openExpDow) {
            const t = this
            t.filekey = filekey
            t.filename = filename
            t.openExpDow = openExpDow
            t.$refs.expdow.getPriToken(t.filekey)
        },
        closeExpDowMain() {
            const t = this
            t.openExpDow = false
        },
        /**
         * 导入
         */
        importExcel() {
            const t = this
            t.openImport = true
            // t.$refs.importExcel.getDowModelFile()
        },
        closeImport() {
            const t = this
            t.openImport = false
        },
        /**
         * 分页
         */
        pageChange(page) {
            const t = this
            t.page = page
            t.getData()
        },
        sizeChange(size) {
            const t = this
            t.rows = size
            t.getData()
        },
    }
}
</script>

<style lang="scss" scoped>
.btnHeight{
    font-size:0;
    .searchInput{
        margin-right:10px;
    }
    .ivu-btn{
        margin-right:10px;
    }
}
.table-form{
    margin:10px 0;
}
</style>