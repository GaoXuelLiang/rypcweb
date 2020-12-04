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
                        <FormItem label="外键属性" prop="extKey">
                            <Input v-model="formValidate.extKey" placeholder="请输入服务名"/>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <FormItem label="外部字段对象" prop="extModel">
                            <Input v-model="formValidate.extModel" placeholder="请输入外部字段对象"/>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10" offset="1">
                        <FormItem label="外部服务名称" prop="extPackage">
                            <Input v-model="formValidate.extPackage" placeholder="请输入外部服务名称"/>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="21" offset="1">,
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
        return {
            spinShow:false,
            formValidate:{
                _mt: this.$global.mt+'GenExt.addOrUpd',
                funId:'1',
                extKey:'',
                extModel:'',
                extPackage:''
            },
            ruleValidate:{
                extKey:[
                    {required:true,message:'请输入外键属性',trigger:'blur'}
                ],
                extModel:[
                    {required:true,message:'请输入外部字段对象',trigger:'blur'}
                ],
                extPackage:[
                    {required:true,message:'请输入外部服务名称',trigger:'blur'}
                ], 
            }
        }
    },
    props:{
        logType:String
    },
    methods:{
        getData (id) {
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'GenExt.getById',
                id:  id,
                logType:t.logType
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.extKey = res.data.content[0].extKey
                    t.formValidate.extModel = res.data.content[0].extModel
                    t.formValidate.extPackage = res.data.content[0].extPackage
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
            t.$refs.formValidate.extKey = '';
            t.$refs.formValidate.extModel = '';
            t.$refs.formValidate.extPackage = '';
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>