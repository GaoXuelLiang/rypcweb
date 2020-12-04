<template>
    <div class="cover">
        <div class="box">
            <Spin size="large" v-if="spinShow" fix></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark" size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text" @click="handleReset">
                    <Icon type="md-close" size="20"></Icon>
                </Button>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
                <Row>
                    <i-col span="10" offset="1">
                        <FormItem label="服务名" prop="serviceName">
                            <Input v-model="formValidate.serviceName" placeholder="请输入服务名"/>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="包名" prop="packageName">
                            <Input v-model="formValidate.packageName" placeholder="请输入包名"/>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10" offset="1">
                        <FormItem label="服务最小错误码" prop="minCode">
                            <Input v-model="formValidate.minCode" placeholder="请输入服务最小错误码"/>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="服务最大错误码" prop="maxCode">
                            <Input v-model="formValidate.maxCode" placeholder="请输入服务最大错误码"/>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10" offset="1">
                        <FormItem label="异常类前缀" prop="exceptionName">
                            <Input v-model="formValidate.exceptionName" placeholder="请输入异常类前缀"/>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21" offset="1">
                        <Row type="flex" justify="end">
                            <FormItem>
                                <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                                <Button type="primary" style="margin-left: 8px" @click="handleSubmit">{{$t('button.sav')}}</Button>
                            </FormItem>
                        </Row>
                    </i-col>
                </Row>
            </Form>
        </div>
    </div>
</template>

<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
export default {
    data(){
        const numberCode = (rule,value,callbackFun)=>{
            let  reg = /^\d+$/g;
            if(reg.test(value)){
                return callbackFun()
            }
            return callbackFun(new Error(rule.message))
        }
        return {
            spinShow:false,
            formValidate:{
                _mt: this.$global.mt+'GenService.addOrUpd',
                funId:'1',
                serviceName:'',
                packageName:'',
                minCode:'',
                maxCode:'',
                exceptionName:''
            },
            ruleValidate:{
                serviceName:[
                    { required:true,message:'请输入服务名称',trigger:'blur' }
                ],
                packageName:[
                    { required:true,message:'请输入包名',trigger:'blur' }
                ],
                minCode:[
                    { required:true,message:'请输入服务最小错误码',trigger:'blur' },
                    { validator: numberCode, message: '请输入数字', trigger: 'blur' }
                ],
                maxCode:[
                    { required:true,message:'请输入服务最大错误码',trigger:'blur' },
                    { validator: numberCode, message: '请输入数字', trigger: 'blur' }
                ],
                exceptionName:[
                    { required:true,message:'请输入异常类前缀',trigger:'blur' }
                ]
            }
        }
    },
    props:{
        id:Number,
        logType:String
    },
    methods:{
        getData (id) {
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'GenService.getById',
                id:  id,
                logType:t.logType
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.serviceName = res.data.content[0].serviceName
                    t.formValidate.packageName = res.data.content[0].packageName
                    t.formValidate.minCode = res.data.content[0].minCode
                    t.formValidate.maxCode = res.data.content[0].maxCode
                    t.formValidate.exceptionName = res.data.content[0].exceptionName
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false
            })
        },
        handleSubmit(){
            const t = this;
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            this.$refs.formValidate.validate((valid) => {
                if(valid){
                    getDataLevelUserLoginSenior(data).then(res=>{
                        if(isSuccess(res,t)){
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$emit('getData', res.data.content[0])
                            }else{
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    })
                }
            })
        },
        handleReset(){
            const t = this;
            t.clear();
            t.$emit('closeUp');
            t.$refs.formValidate.resetFields();
        },
        clear(){
            const t = this;
            t.$refs.formValidate.ServiceName = '';
            t.$refs.formValidate.packageName = '';
            t.$refs.formValidate.minCode = '';
            t.$refs.formValidate.maxCode = '';
            t.$refs.formValidate.exceptionName = '';
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>