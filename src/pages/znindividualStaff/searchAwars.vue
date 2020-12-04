<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}职称证书
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="10"
                         offset="1">
                          <FormItem label="证书名称"
                              prop="">
                            <Input v-model="formValidate.etrzcCertname"
                               placeholder="请输入证书名称"></Input>
                        </FormItem>
                    </Col> 
                     <Col span="10"
                         offset="1">
                        <FormItem label="证书级别"
                                prop="">
                            <Select v-model="formValidate.etrzcCertlevel"
                                            :label-in-value="true"
                                            @on-change="changeLevel"
                                            placeholder="请选择证书级别">
                                            <Option v-for="item in techlevelList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}
                                            </Option>
                            </Select>
                        </FormItem>
                    </Col> 
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                          <FormItem label="证书专业"
                              prop="">
                            <Input v-model="formValidate.etrzcCertpro"
                               placeholder="请输入证书专业"></Input>
                        </FormItem>
                    </Col> 
                    <Col span="10"
                         offset="1">
                        <FormItem label="认证日期"
                                prop="">
                                <DatePicker type="date"
                                    placeholder="请选择认证日期"
                                    style="width: 100%"
                                    format="yyyy-MM-dd"
                                    v-model="formValidate.etrzcDatecert">
                                </DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="10"
                         offset="1">
                          <FormItem label="发证单位"
                              prop="">
                            <Input v-model="formValidate.etrzcLicenseunit"
                               placeholder="请输入发证单位"></Input>
                        </FormItem>
                    </Col> 
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button @click="handleReset"
                                    style="margin-left: 8px">{{$t('button.cal')}}</Button>
                            <Button type="primary"
                                    class="btnClass"
                                    @click="handleSubmit"
                                    style="margin-left: 8px">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    </div> 
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,getDataLevelUserLoginData  } from '../../axios/axios'
import { isSuccessNew, deepCopy } from '../../lib/util'
import searchTablefmAdmproid from './searchTableEmpnHproid' 
export default {
    data () {
        return {
            index:'',
            typeName:'',
            title:'',
            openfmAdmproid:false,
            techlevelList:[],
            spinShow: false,
            // fmAdmproid:'',
            // fmAdmcd:'',
            // fmAdmcouid:'',
            formValidate: {
                id:'',
                etrzcCertname:'',
                etrzcCertlevel:'',
                etrzcCertpro:'',
                etrzcDatecert:'',
                etrzcLicenseunit:'',
                etrzcCertlevelDis:'',
            },

            ruleValidate: {
                etrzcCertname:[
                     { required: true, message: '证书名称不能为空', trigger: 'change' },
                ],
                etrzcCertlevel:[
                     { required: true, message: '请选择证书级别', trigger: 'change' },
                ],
                fmCompany:[
                     { required: true, message: '工作单位不能为空', trigger: 'change' },
                ],
                fmPhone:[
                     { required: true, validator: this.validMobile, trigger: 'change' },
                ],
                fmJob:[
                     { required: true, message: '职业不能为空', trigger: 'change' },
                ],
                fmAdmproid: [
                    { required: true, message: '主要联系人地址所在省不能为空', trigger: 'change' },
                ],
                fmAdmcd: [
                    { required: true, message: '主要联系人地址所在市不能为空', trigger: 'change' },
                ],
                fmAdmcouid: [
                    { required: true, message: '主要联系人地址所在区不能为空', trigger: 'change' },
                ],
                fmAdmdid: [
                    { required: true, message: '主要联系人通讯地址不能为空', trigger: 'blur' },
                ],
            },
            params0: {
                _mt:  this.$global.mt+'BaseLang.getPage',
                sort: 'lanCode',
                order: 'desc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
        }
    },
    components: {
        searchTablefmAdmproid
    },
    props: {
        id: Number,
        logType: String,
        // index: Number
    },
    updated () {

    },
    mounted(){
        this.getSelect()
    },
    methods: {
        validMobile (rule, value, callback) {
            let reg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的手机号码"));
            } else {
                return callback();
            }
        },

        changeLevel(value){
           const t = this
           if(value){
               t.formValidate.etrzcCertlevelDis = value.label
           }
        },
         // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'techlevel',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.techlevelList = res.data.content[0].value[0].paramList
                   
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
       
        getData (data,logType,index) {
            const t = this
            t.index = index
            t.formValidate.id = data.id
            t.formValidate.etrzcCertname = data.etrzcCertname
            t.formValidate.etrzcCertlevel = data.etrzcCertlevel
            t.formValidate.etrzcCertpro = data.etrzcCertpro    
            t.formValidate.etrzcDatecert = data.etrzcDatecert 
            t.formValidate.etrzcLicenseunit = data.etrzcLicenseunit 
            t.formValidate.etrzcCertlevelDis = data.etrzcCertlevelDis 

        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
             for(let i in t.data){
                if(t.data[i]==''||t.data[i]==undefined){
                    delete t.data[i]
                }
            }
             if ("string" === typeof (t.formValidate.etrzcDatecert)) {

                        t.formValidate.etrzcDatecert = (t.formValidate.etrzcDatecert).format("yyyy-MM-dd");
                }

            this.$refs.formValidate.validate((valid) => {
                if (valid) {  
                     if ("object" === typeof (t.formValidate.etrzcDatecert)) {

                        t.formValidate.etrzcDatecert = (t.formValidate.etrzcDatecert).format("yyyy-MM-dd");
                    }
                    //  console.log(typeof (t.formValidate.etrzcDatecert),t.formValidate.etrzcDatecert,'222222222')
                    if(t.logType ==  t.$t("button.add")){
                        if(data.id){
                            data.id = ''
                        }
                        t.$emit('addNewArrayawars', data)
                    }else if(t.logType == t.$t("button.y.upd")){
                        t.$emit('updNewArrayawars', data,t.index)
                    }   
                    this.$refs.formValidate.resetFields()
                    t.formValidate.etrzcCertname = ''
                    t.formValidate.etrzcCertlevel = ''
                    t.formValidate.etrzcCertpro = ''   
                    t.formValidate.etrzcDatecert = ''
                    t.formValidate.etrzcLicenseunit = ''
                    t.formValidate.etrzcCertlevelDis = ''  
                    this.$emit('closeUp')
                }
            })
        },
      
        handleReset () {
            const t = this
            this.$refs.formValidate.resetFields()
            this.$emit('closeUp')
            t.formValidate.etrzcCertname = ''
            t.formValidate.etrzcCertlevel = ''
            t.formValidate.etrzcCertpro = ''   
            t.formValidate.etrzcDatecert = ''
            t.formValidate.etrzcLicenseunit = ''
            t.formValidate.etrzcCertlevelDis = '' 

        },
    },
    watch: {},
}
</script>
<style lang="scss" scoped>
@import "../../sass/updateAndAdd";
    .ivu-radio-group-small .ivu-radio-wrapper-checked {
        background: #be0008;
        color: #fff;
    }   
     .ivu-radio-group-button .ivu-radio-wrapper-checked {
        background: #be0008;
        border-color: #be0008;
        color: #fff;
        box-shadow: 1px 0 0 0 #be0008;
        z-index: 1;
    }
    .cover {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        /* align-items: center; */
        background-color: rgba(0, 0, 0, 0.5) !important;
        -webkit-overflow-scrolling: touch;
        outline: 0;
    }
    .btnClass{
        background-color:#be0008 ;
        border-color: #be0008;
    }
    .ivu-radio-group-button .ivu-radio-wrapper-checked.ivu-radio-focus:first-child{
        box-shadow: 0 0 0 0px rgba(45,140,240,.2);
    }
    .ivu-date-picker {
        display: inline-block;
        line-height: normal;
        cursor: pointer;
    }
    .ios-search {
    cursor: pointer;
    }
</style>
