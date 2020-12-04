<template>
    <div class="option-main">
        <Row class="form_box">
            <Spin size="large" fix v-if="spinShow"></Spin>
            <Form :model="form"
                  label-position="right"
                  :rules="ruleValidate"
                  ref="form"
                  :label-width="120">
                <row>
                    <i-col span="10">
                        <FormItem label="表名" prop="tableName">
                            <Input  v-model="form.tableName" placeholder="请输入表名" />
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="表注释" prop="tableDesc">
                            <Input  v-model="form.tableDesc" placeholder="请输入表注释" />
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="10">
                        <FormItem label="服务名" prop="serviceId">
                            <Input v-model="serviceNames" :readonly="true" icon="ios-search" @on-click="openService" placeholder="请选择服务名称"/>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="作者" prop="authorName">
                            <Input  v-model="form.authorName" placeholder="请输入作者" />
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="10">
                        <FormItem label="表单类型" prop="tableType">
                            <Select v-model="form.tableType" placeholder="请选择服务名">
                                <Option v-for="(item,index) in dropdownMenuList" :key="index" :value="item.paramCode">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="流程变更方法" prop="isSetState">
                            <Checkbox v-model="form.isSetState"   @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="10">
                       <FormItem label="缓存注解" prop="isCacheable">
                            <Checkbox v-model="form.isCacheable"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="生成api文件" prop="isApi">
                            <Checkbox v-model="form.isApi"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="10">
                        <FormItem label="生成apiagw文件" prop="isApiagw">
                            <Checkbox v-model="form.isApiagw"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="生成serviceagw文件" prop="isServiceagw">
                            <Checkbox v-model="form.isServiceagw"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="10">
                        <FormItem label="生成service文件" prop="isService">
                            <Checkbox v-model="form.isService"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="生成dataimport文件" prop="isDataimport">
                            <Checkbox v-model="form.isDataimport"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="10">
                        <FormItem label="生成export文件" prop="isExport">
                           <Checkbox v-model="form.isExport"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="生成dao文件" prop="isDao">
                            <Checkbox v-model="form.isDao"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                </row>
                <row>
                    <i-col span="10">
                        <FormItem label="生成model文件" prop="isModel">
                            <Checkbox v-model="form.isModel"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="生成mapper文件" prop="isMapper">
                            <Checkbox v-model="form.isMapper"  @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                </row>
                 <row>
                    <i-col span="10">
                        <FormItem label="生成dto文件" prop="isDto">
                            <Checkbox v-model="form.isDto" @on-change="checkEvent" true-value="1" false-value="0"></Checkbox>
                        </FormItem>
                    </i-col>
                </row>
            </Form>
            <Row>
                <i-col span="21"
                       class="btn">
                    <Button @click="handleReset">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            @click="save"
                            style="margin-left:10px">{{$t('button.sav')}}</Button>
                </i-col>
            </Row>
        </Row>
        <transition name="fade">
            <searchTable   v-show="openPick"
                          :searchText="searchText"
                          :searchCloumns="searchCloumns"
                          :params="params"
                          :title="title"
                          @closeUp="close"
                          @changeinput="changeinput"
                          ref="searchTable"></searchTable>
        </transition>
    </div>
</template>

<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy, getUrlKey } from '../../../lib/util'
import searchTable from '../../../components/searchTable/searchService'
export default {
    data(){
        return {
            spinShow:false,
            dropdownMenuList:[],
            serviceNames:'',
            form:{
                _mt: this.$global.mt+'GenConfiguration.addOrUpd',
                tableName:'',
                tableDesc:'',
                serviceId:'',
                authorName:'',
                tableType:'',
                isCacheable:'0',
                isSetState:'0',
                isApi:'0',
                isApiagw:'0',
                isServiceagw:'0',
                isService:'0',
                isDataimport:'0',
                isExport:'0',
                isDao:'0',
                isModel:'0',
                isMapper:'0',
                isDto:'0'
            },
            ruleValidate:{
                tableName:[
                    {required:true,message:'请输入表名',trigger:'blur'}
                ],
                tableDesc:[
                    {required:true,message:'请输入表注释',trigger:'blur'}
                ],
                serviceId:[
                    {required:true,message:'请选择服务名',trigger:'blur'}
                ],
                authorName:[
                    {required:true,message:'请输入作者',trigger:'blur'}
                ],
                tableType:[
                    {required:true,message:'请选择表单类型',trigger:'blur'}
                ]
            },
            /**
             * 弹出框
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
    // mouted(){
    //     if (eval(getUrlKey('state').toLowerCase())) {
    //         const t = this;
    //         t.getSelect()
    //     }
    // },
    mounted(){
        const t = this;
        t.getSelect()
    },
    methods:{
        checkEvent(){
            console.log(this.form)
        },
        getData(){
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'GenConfiguration.getById',
                funId: 1000,
                id: t.$store.state.genConfigJS.mainId,
                logType: '根据id获取数据',
            }).then((res) => {
                // console.log(res)
                if (isSuccess(res, t)) {
                    t.serviceNames = res.data.content[0].serviceName
                    t.form.tableName = res.data.content[0].tableName
                    t.form.tableDesc = res.data.content[0].tableDesc
                    t.form.serviceId = res.data.content[0].serviceId
                    t.form.authorName = res.data.content[0].authorName
                    t.form.isCacheable = res.data.content[0].isCacheable
                    t.form.isSetState = res.data.content[0].isSetState
                    t.form.tableType = res.data.content[0].tableType
                    t.form.isApi = res.data.content[0].isApi
                    t.form.isApiagw = res.data.content[0].isApiagw
                    t.form.isServiceagw = res.data.content[0].isServiceagw
                    t.form.isService = res.data.content[0].isService
                    t.form.isDataimport = res.data.content[0].isDataimport
                    t.form.isExport = res.data.content[0].isExport
                    t.form.isDao = res.data.content[0].isDao
                    t.form.isModel = res.data.content[0].isModel
                    t.form.isMapper = res.data.content[0].isMapper
                    t.form.isDto = res.data.content[0].isDto
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
                typeCode: 'tableType',
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.dropdownMenuList = res.data.content[0].value[0].paramList;
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
        },
        save(){
            const t = this
            const data = deepCopy(t.form)
            data.logType = t.logType;
            if(t.id){
                data.id = t.id
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    for(let i in data){
                        if(data[i] === ''){
                            data[i] = '0';
                        }
                    }
                    getDataLevelUserLoginNew(data).then((res) => {
                        if (isSuccess(res, t)) {
                            // 更新vuex中的mainId
                            t.$store.commit('genConfigJS/setMainId', res.data.content[0].id)
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$emit('newdata', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        handleReset(){
            const t = this;
            t.$emit('close')
            t.clear();
        },
        clear(){
            const t = this;
            t.$refs.form.resetFields();
            t.serviceNames = ''
            t.form.tableName = ''
            t.form.tableDesc = ''
            t.form.serviceId = ''
            t.form.authorName = ''
            t.form.tableType = ''
            t.form.isCacheable = '0'
            t.form.isSetState = '0'
            t.form.isApi = '0'
            t.form.isApiagw = '0'
            t.form.isServiceagw = '0'
            t.form.isService = '0'
            t.form.isDataimport = '0'
            t.form.isExport = '0'
            t.form.isDao = '0'
            t.form.isModel = '0'
            t.form.isMapper = '0'
            t.form.isDto = '0'
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
            t.form.serviceId = id
        },
        close(){
            const t = this 
            t.openPick = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/mainChildUpdate.scss";
</style>