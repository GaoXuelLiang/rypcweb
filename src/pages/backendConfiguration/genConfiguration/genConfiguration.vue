<template>
    <div class="table">
        <Row>
            <i-col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-bookmark"></Icon>
                        代码生成管理
                    </p>
                    <Row class="btnHeight">
                        <Input v-model="tableName" class="searchInput" placeholder="请输入表名"/>
                        <span @dblclick="clearService"><Input v-model="serviceNames" class="searchInput" :readonly="true" icon="ios-search" @on-click="openService" placeholder="请选择服务名"/></span>
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
        <transition name="fade">
            <searchTable   v-show="openPick"
                          :searchText="searchText"
                          :searchCloumns="searchCloumns"
                          :params="params"
                          :title="title"
                          @closeUp="closeService"
                          @changeinput="changeinput"
                          ref="searchTable"></searchTable>
        </transition>
    </div>
</template>

<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess,getUrlKey } from '../../../lib/util'
import update from './genConfigBase'
import expwindow from '../../../components/fileOperations/expSms'
import expdow from '../../../components/fileOperations/expdow'
import importExcel from '../../../components/importModel/importParam'
import searchTable from '../../../components/searchTable/searchService'
export default {
    data(){
        return {
            isSpin:false,
            /**表格 */
            serviceNames:'',
            tableName:'',
            serviceId:'',
            tableheight:document.body.offsetHeight - 250,
            noDataImg:'<div id="noData"></div>',
            columns:[
                {
                    type:'selection',
                    width:54,
                    align:'center'
                },
                {
                    title:'表名',
                    key:'tableName',
                    width:120,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'表注释',
                    key:'tableDesc',
                    width:120,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'服务名',
                    key:'serviceName',
                    width:150,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'作者',
                    key:'authorName',
                    width:120,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'表单类型',
                    key:'tableTypeDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'缓存注解',
                    key:'isCacheableDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'流程变更方法',
                    key:'isSetStateDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成api文件',
                    key:'isApiDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成apiagw文件',
                    key:'isApiagwDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成serviceagw文件',
                    key:'isServiceagwDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成service文件',
                    key:'isServiceDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成dataimport文件',
                    key:'isDataimportDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成export文件',
                    key:'isExportDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成dao文件',
                    key:'isDaoDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成model文件',
                    key:'isModelDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成mapper文件',
                    key:'isMapperDis',
                    width:80,
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'生成dto文件',
                    key:'isDtoDis',
                    width:80,
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
             * 查询
             */
            openPick:false,
            title:'选择服务名称',
            searchText:"请输入服务名称",
            searchCloumns:[ 
                {
                    title:'服务名',
                    key:'serviceName',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'包名',
                    key:'packageName',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'服务最小错误码',
                    key:'minCode',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'服务最大错误码',
                    key:'maxCode',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'异常类前缀',
                    key:'exceptionName',
                    sortable: 'custom',
                    align:'center'
                },],
            params:{ 
                _mt: this.$global.mt+'GenService.getPage',
                page:1,
                rows:10,
                sort:'id',
                order:'desc',
                logType: this.$t('button.ser'),
                funId: '1000',
            },
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
                { code: 'tableName', name: '表名' }, 
                { code: 'tableDesc', name: '表注释' },
                { code: 'serviceName', name: '服务名' },
                { code: 'authorName', name: '作者' }, 
                { code: 'isCacheableDis', name: '缓存注解' },
                { code: 'isSetStateDis', name: '流程变更方法' },
                { code: 'tableTypeDis', name: '表单类型' }, 
                { code: 'isApiDis', name: '生成api文件' },
                { code: 'isApiagwDis', name: '生成apiagw文件' },
                { code: 'isServiceagwDis', name: '生成serviceagw文件' }, 
                { code: 'isServiceDis', name: '生成service文件' },
                { code: 'isDataimportDis', name: '生成dataimport文件' },
                { code: 'isExportDis', name: '生成export文件' }, 
                { code: 'isDaoDis', name: '生成dao文件' },
                { code: 'isModelDis', name: '生成model文件' },
                { code: 'isMapperDis', name: '生成mapper文件' }, 
                { code: 'isDtoDis', name: '生成dto文件' }
            ],
            filekey: '',
            filename: '',
            /**
             * 导入
             */
            openImport:false,
            imp_mt: this.$global.mt+'GenConfiguration.importData',
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
        importExcel,
        searchTable
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
        t.serviceId = ''
        t.tableName = ''
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
                _mt: this.$global.mt+'GenConfiguration.getPage',
                rows: t.rows,
                page: t.page,
                sort: t.sort,
                order: t.order,
                logType: this.$t('button.ser'),
                funId: '1000',
                tableName: t.tableName,
                serviceId: t.serviceId
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
         * 弹出框
         */
        openService(){
            const t = this
            t.openPick = true
            t.$refs.searchTable.getData(t.params, 1) 
        },
        changeinput(name,id){
            const t = this 
            t.serviceNames = name
            t.serviceId = id
        },
        closeService(){
            const t = this 
            t.openPick = false
        },
        clearService(){
            const t = this 
            t.serviceNames = ''
            t.serviceId = ''
        },
        /**
         * 新增
         */
        openUp(id,logType,index){
            const t = this;
            t.logType = logType;
            t.index = index;
            t.openUpdate = true;
            this.$store.commit('genConfigJS/setMainId', id)
            this.$store.commit('genConfigJS/setIndex', index)
            if (logType === this.$t('button.y.upd')) {
                t.updateId = parseInt(id, 10);
                t.$refs.update.getOptionData()
            }
        },
        addNewArray(res) {
            const t = this
            // t.data.unshift(res)
            t.getData()
        },
        updateArray(res) {
            const t = this
            // t.data.splice(t.index, 1, res)
            t.getData()
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
                            _mt:  this.$global.mt+'GenConfiguration.delByIds',
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
                tableName: t. tableName,
                serviceId:t.serviceId
            }
            t.$refs.expwindow.getData(t.expDataTital,  this.$global.mt+'GenConfiguration.export', data)
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
        width:200px;
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