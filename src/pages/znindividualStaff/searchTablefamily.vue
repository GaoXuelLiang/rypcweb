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
                    {{logType}}家庭成员
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
                    <FormItem label="与员工关系"
                              prop="etrfmRelationship">
                        <Select v-model="formValidate.etrfmRelationship"
                                        @on-change="fmerelatchange"
                                        :label-in-value="true"
                                        placeholder="请选择员工关系">
                                        <Option v-for="item in relationshipList"
                                            :value="item.paramCode"
                                            :key="item.id">{{ item.paramInfoCn }}
                                        </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="姓名"
                              prop="etrfmMembername">
                         <Input v-model="formValidate.etrfmMembername"
                               placeholder="请输入姓名"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="工作单位"
                              prop="etrfmWorkunits">
                         <Input v-model="formValidate.etrfmWorkunits"
                               placeholder="请输入工作单位"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                        <FormItem label="身份证号码"
                                prop="etrfmIdcard">
                            <Input v-model="formValidate.etrfmIdcard"
                                placeholder="请输入身份证号码"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <!-- <Col span="10"
                         offset="1">
                        <FormItem label="职业"
                                prop="empfmJob">
                            <Input v-model="formValidate.empfmJob"
                                placeholder="请输入职业"></Input>
                        </FormItem>
                    </Col> -->
                   <Col span="10"
                         offset="1">
                    <FormItem label="联系电话"
                              prop="etrfmTelephone">
                         <Input v-model="formValidate.etrfmTelephone"
                               placeholder="请输入联系电话"></Input>
                    </FormItem>
                    </Col>
                     <Col span="10"
                         offset="1">
                        <FormItem label="是否为紧急联系人"
                                    prop="etrfmIsemergency">
                            <RadioGroup v-model="formValidate.etrfmIsemergency"
                                        type="button"
                                        size="small">
                                <Radio v-for="(item, index) in yesOrNo"
                                        :key="index"
                                        :label="item.paramCode"
                                        >{{item.paramInfoCn}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>  
                </Row>
                <Row>
                    <!-- <Col span="10"
                         offset="1">
                        <FormItem label="是否投商业保险"
                                    prop="etrfmCommercial">
                            <RadioGroup v-model="formValidate.etrfmCommercial"
                                        type="button"
                                        size="small">
                                <Radio v-for="(item, index) in yesOrNo"
                                        :key="index"
                                        :label="item.paramCode"
                                        >{{item.paramInfoCn}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col> -->
                    <Col span="10"
                         offset="1">
                        <FormItem label="是否在中南任职"
                                    prop="etrfmIscentral">
                            <RadioGroup v-model="formValidate.etrfmIscentral"
                                        type="button"
                                        size="small">
                                <Radio v-for="(item, index) in yesOrNo"
                                        :key="index"
                                        :label="item.paramCode"
                                        >{{item.paramInfoCn}}</Radio>
                            </RadioGroup>
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
        <!-- 城市信息
         <transition name="fade">
            <searchTablefmAdmproid v-show="openfmAdmproid"
                         @closeUp="close"
                         :logType='logType'
                         :typeName='typeName'
                         :title="title"
                         @changeinputfmAdmproid="changeinputfmAdmproid"
                         @changeinputfmAdmcd='changeinputfmAdmcd'
                         @changeinputfmAdmcouid='changeinputfmAdmcouid'
                         ref="searchTablefmAdmproid"></searchTablefmAdmproid>
        </transition> -->
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,getDataLevelUserLoginData  } from '../../axios/axios'
import { isSuccess,isSuccessNew, deepCopy } from '../../lib/util'
import searchTablefmAdmproid from './searchTableEmpnHproid' 
export default {
    data () {
        const validateIdTypeCheck = (rule, value, callback) => {
            let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
            const t = this
            if(value ===''){
                 callback()
            }else if (!reg.test(value)) {
                callback(new Error('请输入正确的身份证号'))
            } else {
                callback()
            }
        }
        return {
            index:'',
            typeName:'',
            title:'',
            openfmAdmproid:false,
            yesOrNo:[],
            dataId: JSON.parse(localStorage.getItem('params')).dataId,
            //dataId:'1027',
            GenderList:[],
            relationshipList:[],
            spinShow: false,
            // fmAdmproid:'',
            // fmAdmcd:'',
            // fmAdmcouid:'',
            // etrfmRelationshipDis:'',
            formValidate: {
                id:'',
               etrfmRelationship:'',
                etrfmMembername:'',
                // empfmGenderDis:'',
                // empfmBirthdate:'',
                etrfmWorkunits:'',
                etrfmIdcard:'',
                // empfmJob:'',
                etrfmTelephone:'',
                //etrfmCommercial:'1',
                //fmAdmproid:'',
                // fmAdmcd:'',
                // fmAdmcouid:'',
                // fmAdmdid:'',
                etrfmRelationshipDis:'',
                // fmAdmproidDis:'',
                // fmAdmcdDis:'',
                // fmAdmcouidDis:'',
                etrfmIscentral:'1',
                etrfmIsemergency:'1'
            },
            paramTypeDis: '',
            ruleValidate: {
                etrfmRelationship:[
                     { required: true, message: '员工关系不能为空', trigger: 'change' },
                ],
                etrfmWorkunits:[
                     { required: true, message: '工作单位不能为空', trigger: 'change' },
                ],
                etrfmIdcard:[
                     { validator:validateIdTypeCheck, trigger: 'change,blur' },
                ],
                etrfmTelephone:[
                     { required: true, validator: this.validMobile, trigger: 'change' },
                ],
                empfmJob:[
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
        fmerelatchange(value){
           const t = this
           if(value){

               t.formValidate.etrfmRelationshipDis = value.label
           }
        },
         // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,gender,contactrelation',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.yesOrNo = res.data.content[0].value[0].paramList
                    t.GenderList = res.data.content[0].value[1].paramList
                    t.relationshipList =res.data.content[0].value[2].paramList
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
            t.formValidate.etrfmRelationship = data.etrfmRelationship
            t.formValidate.etrfmMembername = data.etrfmMembername
            // t.formValidate.empfmGenderDis = data.empfmGenderDis    
            // t.formValidate.empfmBirthdate = data.empfmBirthdate 
            t.formValidate.etrfmWorkunits = data.etrfmWorkunits 
            // t.formValidate.empfmJob = data.empfmJob 
            t.formValidate.etrfmIdcard = data.etrfmIdcard 
            //t.formValidate.etrfmCommercial = data.etrfmCommercial || '1'
            t.formValidate.etrfmIscentral = data.etrfmIscentral || '1' 
            // t.formValidate.fmAdmproid = data.fmAdmproid 
            // t.formValidate.fmAdmcd = data.fmAdmcd 
            // t.formValidate.fmAdmcouid = data.fmAdmcouid 
            // t.formValidate.fmAdmdid = data.fmAdmdid 
            t.formValidate.etrfmRelationshipDis = data.etrfmRelationshipDis 
            // t.formValidate.fmAdmproidDis = data.fmAdmproidDis 
            // t.formValidate.fmAdmcdDis = data.fmAdmcdDis 
            // t.formValidate.fmAdmcouidDis = data.fmAdmcouidDis 
            t.formValidate.etrfmTelephone = data.etrfmTelephone 
            t.formValidate.etrfmIsemergency = data.etrfmIsemergency || '1'
        },
        cheackData(){
            const t = this
            const data = deepCopy(t.formValidate)
            getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntrFm.checkInform',
            // APetrfmEmpfid: '1005',
            // APetrfmRelationship:'201',
            APetrfmEmpfid: t.dataId,
            APetrfmRelationship:t.formValidate.etrfmRelationship
            }).then((res) => {
                if (isSuccess(res,t)) {
                    
                    // if(res.stat.stateList[0].code!==0){
                    //         this.spinShow =true
                    // }
                    if(res.data.content[0].value=='1'){
                        
                        if(this.logType ==  this.$t("button.add")){
                            if(data.id){

                                data.id = ''
                            }
                            this.$emit('addNewArrayfamily', data)
                        }else if(this.logType == this.$t("button.y.upd")){
                            this.$emit('updNewArrayfamily', data,this.index)
                        }  
                        this.$emit('closeUp')
                        this.$refs.formValidate.resetFields()
                    }
                }else{
                   
                }
            }).catch((err) => {
                console.log(err)
            }).finally(()=>{
               
            })
        },
        handleSubmit () {
            const t = this
            // if ("object" == typeof (t.formValidate.empfmBirthdate)) {
            //     t.formValidate.empfmBirthdate = (t.formValidate.empfmBirthdate).format("yyyy-MM-dd");
            // }
            const data = deepCopy(t.formValidate)
             for(let i in t.data){
                    if(t.data[i]==''||t.data[i]==undefined){
                        delete t.data[i]
                    }
                }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {  
                    t.cheackData()
                }
            })
        },
        dubClear () {
            const t = this
            if (t.logType !== this.$t('button.y.upd')) {
                t.paramTypeDis = ''
                t.formValidate.paramTypeDis = ''
            }
        },
        close () {
            const t = this
            t.openPick = false
            t.openfmAdmproid = false
        },
        closeTable(){
            const t = this
            t.openPick0 = false
        },
        changeinput0(row){
            const t = this
            t.formValidate.paramCode = row.lanCode
            t.formValidate.paramInfoCn = row.lanCn
            t.formValidate.paramInfoEn =  row.lanEn
        },
        changeinput (name, id) {
            const t = this
            t.paramTypeDis = name
            t.formValidate.paramType = id
        },
        pickData (param) {
            const t = this
            if(param==='paramCode'){
                if (t.logType !== this.$t('button.y.upd')) {
                    t.$refs.searchZHAndEn.getData(this.params0)
                    t.openPick0 = true
                }
            } else {
                if (t.logType !== this.$t('button.y.upd')) {
                    t.$refs.searchTable.getData()
                    t.openPick = true
                }
            }
        },
        clearParamCode(){
            const t = this
            if (t.logType !== this.$t('button.y.upd')) {
                t.formValidate.paramCode = ''
                t.formValidate.paramInfoCn = ''
                t.formValidate.paramInfoEn = ''
            }
        },
        handleReset () {
            this.$refs.formValidate.resetFields()
            this.$emit('closeUp')
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
