<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Row>
                <Form :model="form"
                      ref="form"
                      label-position="right"
                      :rules="ruleValidate"
                      :label-width="135">
                    <i-col span="10" offset="1">
                        <FormItem label="列名"
                                  prop="columnName">
                            <Input v-model="form.columnName" placeholder="请输入列名" />
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="列注释"
                                  prop="columnRemarks">
                            <Input v-model="form.columnRemarks" placeholder="请输入列注释" />
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="字段类别"
                                  prop="columnCategories ">
                            <Select v-model="form.columnCategories" placeholder="请选择字段类别">
                                <Option v-for="(item,index) in dropdownMenuList" :key="index" :value="item.paramCode">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="关联实体字段"
                                  prop="relationColumn">
                            <Input v-model="form.relationColumn" placeholder="请输入关联实体字段" />
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="字段类型"
                                  prop="columnType">
                            <Input v-model="form.columnType" placeholder="请输入字段类型" />
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="属性名"
                                  prop="propertyName">
                            <Input v-model="form.propertyName" placeholder="请输入属性名" />
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="反差关联引用ID"
                                  prop="extId">
                            <Input v-model="form.extId" placeholder="请选择反差关联引用ID" @on-click="openService" :readonly="true" icon="ios-search"/>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="模糊字段类型"
                                  prop="extId">
                            <Select v-model="form.columnPage" placeholder="请选择模糊字段类型">
                                <Option v-for="(item,index) in dropdownMenuList1" :key="index" :value="item.paramCode">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="是否主键"
                                  prop="isPrimaryKey">
                            <Checkbox v-model="form.isPrimaryKey"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="导入主键"
                                  prop="isImpPk">
                            <Checkbox style="line-height:1" v-model="form.isImpPk"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="导入不能为null"
                                  prop="isImpNotNull">
                            <Checkbox style="line-height:1" v-model="form.isImpNotNull"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                    <i-col span="21" offset="1">
                        <row type="flex"
                             justify="end">
                            <FormItem prop="comment" style="font-size:0">
                                <Button @click="close" style="margin-right: 8px">{{$t('button.cal')}}</Button>
                                <Button type="primary"
                                        @click="save">{{$t('button.sav')}}</Button>
                            </FormItem>
                        </row>
                    </i-col>
                </Form>
            </Row>
        </div>
        <transition name="fade">
            <searchTable   v-show="openPick"
                          :searchText="searchText"
                          :searchCloumns="searchCloumns"
                          :params="params"
                          :title="title"
                          @closeUp="closePick"
                          @changeinput="changeinput"
                          ref="searchTable"></searchTable>
        </transition>
    </div>
</template>

<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin,getDataLevelUserLoginSenior } from '../../../axios/axios'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import searchTable from '../../../components/searchTable/searchService'
export default {
    data(){
        return {
            dropdownMenuList:[],
            dropdownMenuList1:[],
            form:{
                _mt: this.$global.mt+'GenColumn.addOrUpd',
                funId:'1',
                columnName:'',
                columnRemarks:'',
                columnCategories:'',
                columnPage:'',
                relationColumn:'',
                columnType:'',
                propertyName:'',
                isPrimaryKey:'0',
                isImpPk:'0',
                isImpNotNull:'0',
                extId:''
            },
            ruleValidate:{
                columnName:[
                    {required:true,message:'请输入列名',trigger:'blur'}
                ],
                columnRemarks:[
                    {required:true,message:'请输入列注释',trigger:'blur'}  
                ],
                columnType:[
                    {required:true,message:'请输入字段类型',trigger:'blur'}  
                ],
                propertyName:[
                    {required:true,message:'请输入属性名',trigger:'blur'}  
                ],
            },
             /**
             * 弹出框
             */
            openPick:false,
            title:'选择反查关联引用',
            searchText:"请输外部字段对象名称",
            searchCloumns:[ 
                {
                    title:'外部字段对象',
                    key:'extModel',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'外键属性',
                    key:'extKey',
                    sortable: 'custom',
                    align:'center'
                },
                {
                    title:'外部服务名称',
                    key:'extPackage',
                    sortable: 'custom',
                    align:'center'
                },],
            params:{ 
                _mt: this.$global.mt+'GenExt.getPage',
                page:1,
                rows:10,
                sort:'id',
                order:'desc',
                logType: this.$t('button.ser'),
                funId: '1000',
                // serviceName: t.serviceName
            }
        }
    },
    props:{
        id:Number,
        logType:String 
    },
    components:{
        searchTable
    },
    mouted(){
        if (eval(getUrlKey('state').toLowerCase())) {
          
        }
    },
    mounted(){
        const t = this;
        t.getSelect()
    },
    methods:{
        getData(id){
            const t = this
            t.spinShow = true
            // console.log(id)
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'GenColumn.getById',
                id: id,
                logType: this.$t('button.ser'),
                funId: '1',
                companyId: '0',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.form.columnName = res.data.content[0].columnName
                    t.form.columnRemarks = res.data.content[0].columnRemarks
                    t.form.columnCategories = res.data.content[0].columnCategories
                    t.form.relationColumn = res.data.content[0].relationColumn
                    t.form.columnType = res.data.content[0].columnType
                    t.form.propertyName = res.data.content[0].propertyName
                    t.form.isPrimaryKey = res.data.content[0].isPrimaryKey
                    t.form.isImpPk = res.data.content[0].isImpPk
                    t.form.isImpNotNull = res.data.content[0].isImpNotNull
                    t.form.extId = res.data.content[0].extId
                    t.form.columnPage = res.data.content[0].columnPage
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(()=>{
                t.spinShow = false
            })
        },
        // 获取下拉状态
        getSelect() {
            const t = this
            t.dropdownMenuList = []
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'columnCategories,columnPage',
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.dropdownMenuList = res.data.content[0].value[0].paramList;
                        t.dropdownMenuList1 = res.data.content[0].value[1].paramList;
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
        },
        checkEvent(){

        },
        save(){
            const t = this;
            const data = deepCopy(t.form)
            data.logType = t.logType;
            data.pid = t.$store.state.genConfigJS.mainId
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            this.$refs.form.validate((valid) => {
                if(valid){
                    getDataLevelUserLoginSenior(data).then(res=>{
                        if(isSuccess(res,t)){
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$emit('getData')
                            }else{
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update')
                            }
                            t.close();
                        }
                    })
                }
            })
        },
        close(){
            const t = this;
            t.$emit('hideMsg');
            t.$refs.form.resetFields();
            t.form.columnName = '';
            t.form.columnRemarks = '';
            t.form.columnCategories = '';
            t.form.relationColumn = '';
            t.form.columnPage = '';
            t.form.columnType = '';
            t.form.propertyName = '';
            t.form.isPrimaryKey = '0';
            t.form.isImpPk = '0';
            t.form.isImpNotNull = '0';
            t.form.extId = '';
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
            // t.serviceNames = name
            t.form.extId = id
        },
        closePick(){
            const t = this 
            t.openPick = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
/deep/ .ivu-form-item-content{
    height:32px;
}
</style>