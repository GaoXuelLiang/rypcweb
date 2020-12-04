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
                    {{logType}}工作履历
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
                  <Row class="table_form">
                    <Row>
                    <Col span="10"
                            offset="1">
                        <FormItem label="开始日期"
                                prop="etrwkBeginyear">
                                <DatePicker type="date"
                                    placeholder="请选择开始日期"
                                    style="width: 100%"
                                    :editable='false'
                                    format="yyyy-MM-dd"
                                    v-model="formValidate.etrwkBeginyear">
                                </DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="10"
                            offset="1">
                        <FormItem label="结束日期"
                                prop="etrwkEndyear">
                                <DatePicker type="date"
                                    placeholder="请选择结束日期"
                                    style="width: 100%"
                                    :editable='false'
                                    format="yyyy-MM-dd"
                                    v-model="formValidate.etrwkEndyear">
                                </DatePicker>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                                offset="1">
                            <FormItem label="是否任职中南"
                                
                                        prop="etrwkCentral">
                                <RadioGroup v-model="formValidate.etrwkCentral"
                                            type="button"
                                            size="small">
                                    <Radio v-for="(item, index) in yesOrNo"
                                            :key="index"
                                            :label="item.paramCode"
                                            >{{item.paramInfoCn}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="10"
                                offset="1">
                            <FormItem label="工作单位"
                                        prop="etrwkWorkunit">
                                    <Input v-model="formValidate.etrwkWorkunit"
                                        placeholder="请输入工作单位"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                                offset="1">
                            <FormItem label="工作部门"
                                        prop="etrwkWorksector">
                                    <Input v-model="formValidate.etrwkWorksector"
                                        placeholder="请输入工作部门"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10"
                                offset="1">
                            <FormItem label="工作岗位"
                                        prop="etrwkJobposition">
                                    <Input v-model="formValidate.etrwkJobposition"
                                        placeholder="请输入工作岗位"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                                offset="1">
                            <FormItem label="工作地点"
                                        prop="etrwkDutystation">
                                    <Input v-model="formValidate.etrwkDutystation"
                                        placeholder="请输入工作地点"></Input>
                            </FormItem>
                        </Col>
                        <!-- <Col span="21" offset="1">
                            <FormItem label="主要职责">
                                <Input v-model="formValidate.empwkeMainres" type="textarea" placeholder="请输入既往病史" />
                            </FormItem>                                
                        </Col> -->
                    </Row>
                    <!-- <Row>
                        <Col span="21" offset="1">
                            <FormItem label="主要业绩/成果">
                                <Input v-model="formValidate.empwkeMainach" type="textarea" placeholder="请输入既往病史" />
                            </FormItem>                                
                        </Col>
                    </Row> -->
                    <!-- <Row>
                        <Col span="10"
                            offset="1">
                            <FormItem label="证明人"
                                    prop="etrwkReference">
                                <Input v-model="formValidate.etrwkReference"
                                    placeholder="请输入证明人"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10"
                            offset="1">
                            <FormItem label="证明人电话"
                                    prop="etrwkTelephone">
                                <Input v-model="formValidate.etrwkTelephone"
                                    placeholder="请输入证明人电话"></Input>
                            </FormItem>
                        </Col>
                    </Row> -->
                    <Row>
                        <Col span="10"
                            offset="1">
                            <FormItem label="离职状态"
                                    prop="etrwkEmplstatus">
                                <Select v-model="formValidate.etrwkEmplstatus"
                                                :label-in-value="true"                                    
                                                placeholder="请选择离职状态">
                                                <Option v-for="item in terminatestateList"
                                                    :value="item.paramCode"
                                                    :key="item.id">{{ item.paramInfoCn }}
                                                </Option>
                                </Select>
                            </FormItem>
                        </Col> 
                        <Col span="10"
                            offset="1">
                            <FormItem label="离职原因"
                                    prop="etrwkReasons">
                                <Select v-model="formValidate.etrwkReasons"
                                                :label-in-value="true"
                                                placeholder="请选择离职原因">
                                        <Option v-for="item in terminatereasonList"
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
                            <FormItem label="薪资信息"
                                    prop="etrwkSalary">
                                <Input v-model="formValidate.etrwkSalary"
                                    placeholder="请输入薪资信息"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10"
                            offset="1">
                            <FormItem label="上级领导姓名"
                                    prop="etrwkNamesup">
                                <Input v-model="formValidate.etrwkNamesup"
                                    placeholder="请输入上级领导姓名"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                            offset="1">
                            <FormItem label="上级领导职位"
                                    prop="etrwkLeadpos">
                                <Input v-model="formValidate.etrwkLeadpos"
                                    placeholder="请输上级领导职位"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10"
                            offset="1">
                            <FormItem label="上级领导联系电话"
                                    prop="etrwkContactsup">
                                <Input v-model="formValidate.etrwkContactsup"
                                    placeholder="请输入上级领导联系电话"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                            offset="1">
                            <FormItem label="同事姓名"
                                    prop="etrwkNamecol">
                                <Input v-model="formValidate.etrwkNamecol"
                                    placeholder="请输入同事姓名"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10"
                            offset="1">
                            <FormItem label="同事职位"
                                    prop="etrwkCworker">
                                <Input v-model="formValidate.etrwkCworker"
                                    placeholder="请输入同事职位"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                            offset="1">
                            <FormItem label="同事联系电话"
                                    prop="etrwkTelecont">
                                <Input v-model="formValidate.etrwkTelecont"
                                    placeholder="请输入同事联系电话"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10"
                            offset="1">
                            <FormItem label="人事姓名"
                                    prop="etrwkPersname">
                                <Input v-model="formValidate.etrwkPersname"
                                    placeholder="请输入人事姓名"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10"
                            offset="1">
                            <FormItem label="人事职位"
                                    prop="etrwkPersnamepos">
                                <Input v-model="formValidate.etrwkPersnamepos"
                                    placeholder="请输入人事职位"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10"
                            offset="1">
                            <FormItem label="人事联系电话"
                                    prop="etrwkPersptelep">
                                <Input v-model="formValidate.etrwkPersptelep"
                                    placeholder="请输入人事联系电话"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <Row type="flex"
                         justify="end" class="btnMar">
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

export default {
    data () {
        const compareTime = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择开始日期"));
            } else {
                //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
                let startTimeNum = (new Date(this.formValidate.etrwkBeginyear)).getTime();
                let endTimeNum = (new Date(this.formValidate.etrwkEndyear)).getTime();
                if (startTimeNum > endTimeNum) {
                    callback(new Error('开始日期不能大于结束日期'))
                }
                callback()
            }
        };
        return {
            index:'',
            employerTypeList:[],
            businessTypeList:[],
            administrativeLevelList:[],
            yesOrNo: [],
            terminatestateList:[],
            terminatereasonList:[],
            spinShow: false,
            formValidate: {
                id:'',
                etrwkWorkunit:'',
                // workEmpycate:'',
                // workComcate:'',
                // workDepart:'',
                etrwkBeginyear:'',
                etrwkEndyear:'',
                // workMajor:'',
                // workAdmin:'',
                // workAdmsdate:'',
                // etrwkReference:'',
                // etrwkTelephone:'',
                // workCertperstwo:'',
                // workCertmobtwo:'',
                // workComcateDis:'',

                //是否公司内部履历
                etrwkCentral:'0',
                etrwkWorksector:'',
                etrwkJobposition:'',
                etrwkDutystation:'',
                // empwkeMainres:'',
                // empwkeMainach:'',
                etrwkReasons:'',
                etrwkEmplstatus:'',
                etrwkSalary:'',
                etrwkNamesup:'',
                etrwkLeadpos:'',
                etrwkContactsup:'',
                etrwkNamecol:'',
                etrwkCworker:'',
                etrwkTelecont:'',
                etrwkPersname:'',
                etrwkPersnamepos:'',
                etrwkPersptelep:'',

            },
            paramTypeDis: '',
            ruleValidate: {
                workDepart:[
                    { required: true, message: '任职部门不能为空', trigger: 'blur' },
                ],
                etrwkWorkunit: [
                    { required: true, message: '工作单位不能为空', trigger: 'blur' },
                ],
                etrwkWorksector: [
                    { required: true, message: '工作部门不能为空', trigger: 'blur' },
                ],
                etrwkJobposition: [
                    { required: true, message: '工作岗位不能为空', trigger: 'blur' },
                ],
                etrwkDutystation: [
                    { required: true, message: '工作地点不能为空', trigger: 'blur' },
                ],
                workEmpycate: [
                    { required: true, message: '雇主类别不能为空', trigger: 'change' },
                ],
                workComcate: [
                    { required: true, message: '企业所属行业类别不能为空', trigger: 'change' },
                ],
                etrwkReference: [
                    { required: true, message: '证明人不能为空', trigger: 'blur' },
                ],
                etrwkTelephone: [
                    { required: true,validator: this.validMobile, trigger: 'blur' },
                ],
                workCertperstwo: [
                    { required: true, message: '证明人2不能为空', trigger: 'blur' },
                ],
                workCertmobtwo: [
                    { required: true, validator: this.validMobile, trigger: 'blur' },
                ],
                etrwkCentral: [
                    { required: true, message:'请选择是否公司内部履历', trigger: 'blur' },
                ],
                 etrwkBeginyear: [
                    { required: true, pattern: /.+/,validator: compareTime,trigger: 'blur' },
                ],
                etrwkEndyear: [
                    { required: true,pattern: /.+/,message: '请选择结束日期', trigger: 'blur' },
                ],
                etrwkEmplstatus: [
                    { required: true,message: '请选择离职状态', trigger: 'blur,change' },
                ],
                etrwkReasons: [
                    { required: true,message: '请选择离职原因', trigger: 'blur,change' },
                ],
                etrwkSalary: [
                    { required: true,message: '请输入薪资信息', trigger: 'blur,change' },
                ],
                etrwkNamesup: [
                    { required: true,message: '请输入上级领导姓名', trigger: 'blur,change' },
                ],
                etrwkLeadpos: [
                    { required: true,message: '请输入上级领导职位', trigger: 'blur,change' },
                ],
                etrwkContactsup: [
                    { required: true,validator: this.validMobile, trigger: 'blur,change' },
                ],
                etrwkNamecol: [
                    { required: true,message: '请输入同事姓名', trigger: 'blur,change' },
                ],
                etrwkCworker: [
                    { required: true,message: '请输入同事职位', trigger: 'blur,change' },
                ],
                etrwkTelecont: [
                    { required: true,validator: this.validMobile, trigger: 'blur,change' },
                ],
                etrwkPersname: [
                    { required: true,message: '请输入人事姓名', trigger: 'blur,change' },
                ],
                etrwkPersnamepos: [
                    { required: true,message: '请输入人事职位', trigger: 'blur,change' },
                ],
                etrwkPersptelep: [
                    { required: true,validator:this.validMobile, trigger: 'blur,change' },
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

    },
    props: {
        id: Number,
        logType: String,
        // index: Number,
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
                return callback(new Error("联系方式不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的手机号码"));
            } else {
                return callback();
            }
        },
        // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'employerType,businessType,administrativeLevel,yesno,terminatestate,separatereasonznjs',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.employerTypeList = res.data.content[0].value[0].paramList
                    t.businessTypeList = res.data.content[0].value[1].paramList
                    t.administrativeLevelList =  res.data.content[0].value[2].paramList
                    t.yesOrNo = res.data.content[0].value[3].paramList
                    t.terminatestateList = res.data.content[0].value[4].paramList
                    t.terminatereasonList = res.data.content[0].value[5].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        getData (data,logType,index) {
            //debugger
            const t = this
            t.index = index
            t.formValidate.id = data.id
            t.formValidate.etrwkWorkunit = data.etrwkWorkunit
            // t.formValidate.workEmpycate = data.workEmpycate
            // t.formValidate.workComcate = data.workComcate    
            // t.formValidate.workDepart = data.workDepart 
            t.formValidate.etrwkBeginyear = data.etrwkBeginyear  === '' ? '' : new Date(data.etrwkBeginyear).format('yyyy-MM-dd'),
            t.formValidate.etrwkEndyear = data.etrwkEndyear === '' ? '' : new Date(data.etrwkEndyear).format('yyyy-MM-dd')
            // t.formValidate.workMajor = data.workMajor 
            // t.formValidate.workAdmin = data.workAdmin 
            // t.formValidate.workAdmsdate = data.workAdmsdate 
            //证明人
            // t.formValidate.etrwkReference = data.etrwkReference 
            //证明人电话
            // t.formValidate.etrwkTelephone = data.etrwkTelephone 

            // t.formValidate.workCertperstwo = data.workCertperstwo 
            // t.formValidate.workCertmobtwo = data.workCertmobtwo 
            // t.formValidate.workComcateDis = data.workComcateDis 

            t.formValidate.etrwkWorksector = data.etrwkWorksector 
            t.formValidate.etrwkJobposition = data.etrwkJobposition 
            t.formValidate.etrwkDutystation = data.etrwkDutystation 
            t.formValidate.empwkeMainres = data.empwkeMainres 
            // t.formValidate.empwkeMainach = data.empwkeMainach 
            t.formValidate.etrwkReasons = data.etrwkReasons 
            t.formValidate.etrwkEmplstatus = data.etrwkEmplstatus 
            t.formValidate.etrwkSalary = data.etrwkSalary 
            t.formValidate.etrwkNamesup = data.etrwkNamesup 
            t.formValidate.etrwkLeadpos = data.etrwkLeadpos
            t.formValidate.etrwkContactsup = data.etrwkContactsup
            t.formValidate.etrwkNamecol = data.etrwkNamecol
            t.formValidate.etrwkCworker = data.etrwkCworker
            t.formValidate.etrwkTelecont = data.etrwkTelecont
            t.formValidate.etrwkPersname = data.etrwkPersname
            t.formValidate.etrwkPersnamepos = data.etrwkPersnamepos
            t.formValidate.etrwkPersptelep = data.etrwkPersptelep


        },
        handleSubmit () {
            const t = this
            if ("string" == typeof (t.formValidate.etrwkBeginyear) && t.formValidate.etrwkBeginyear !== "") {
                t.formValidate.etrwkBeginyear = new Date(t.formValidate.etrwkBeginyear);
            }
            if ("string" == typeof (t.formValidate.etrwkEndyear) && t.formValidate.etrwkEndyear !== "") {
                t.formValidate.etrwkEndyear = new Date(t.formValidate.etrwkEndyear);
            }
            // if (t.logType === this.$t('button.y.upd')) {
            //     data.id = t.id
            // }
            const data = deepCopy(t.formValidate)
            for(let i in t.data){
                if(t.data[i]==''||t.data[i]==undefined){
                    delete t.data[i]
                }
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    if ("object" == typeof (t.formValidate.etrwkBeginyear)) {
                        t.formValidate.etrwkBeginyear = (t.formValidate.etrwkBeginyear).format("yyyy-MM-dd");
                    }
                    if ("object" == typeof (t.formValidate.etrwkEndyear)) {
                        t.formValidate.etrwkEndyear = (t.formValidate.etrwkEndyear).format("yyyy-MM-dd");
                    }
                    // if ("object" == typeof (t.formValidate.workAdmsdate)) {
                    //     t.formValidate.workAdmsdate = (t.formValidate.workAdmsdate).format("yyyy-MM-dd");
                    // }
                     if(t.logType ==  t.$t("button.add")){
                        if(data.id){
                            data.id = ''
                        }
                        t.$emit('addNewArrayworkexp', data)
                    }else if(t.logType == t.$t("button.y.upd")){
                        t.$emit('updNewArrayworkexp', data,t.index)
                    }   
                    this.$refs.formValidate.resetFields()
                    this.$emit('closeUp')
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
            t.$refs.searchTable.pmtypeCode = ''
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
//     .cover {
//         position: fixed;
//         top: 0;
//         right: 0;
//         bottom: 0;
//         left: 0;
//         z-index: 1000;
//         display: -webkit-box;
//         display: -ms-flexbox;
//         display: flex;
//         -webkit-box-pack: center;
//         -ms-flex-pack: center;
//         justify-content: center;
//         -webkit-box-align: center;
//         -ms-flex-align: center;
//         /* align-items: center; */
//         background-color: rgba(0, 0, 0, 0.5) !important;
//         -webkit-overflow-scrolling: touch;
//         outline: 0;
//     }
//     .cover .box{
//         padding: 60px 20px 20px 20px;
//     }
//    .ivu-form{
//         max-height: 470px;
//         overflow-y: scroll;
//     }
    .btnClass{
        background-color:#be0008 ;
        border-color: #be0008;
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
