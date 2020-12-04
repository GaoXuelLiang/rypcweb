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
                    {{logType}}工作经历
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
                    <FormItem label="公司名称"
                              prop="workUnitname">
                         <Input v-model="formValidate.workUnitname"
                               placeholder="请输入公司名称"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                                offset="1">
                                <FormItem label="雇主类别"
                                        prop="workEmpycate">
                                    <Select v-model="formValidate.workEmpycate"
                                        placeholder="请选择雇主类别">
                                        <Option v-for="item in employerTypeList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="10"
                                offset="1">
                                <FormItem label="企业所属行业类别"
                                        prop="workComcate">
                                    <Select v-model="formValidate.workComcate"
                                        @on-change='workComcatechange'
                                        :label-in-value="true"
                                        placeholder="请选择企业所属行业类别">
                                        <Option v-for="item in businessTypeList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="任职部门"
                              prop="workDepart">
                         <Input v-model="formValidate.workDepart"
                               placeholder="请输入任职部门"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="开始日期"
                              prop="workSdate">
                            <DatePicker type="date"
                                placeholder="请选择开始日期"
                                style="width: 100%"
                                :editable='false'
                                format="yyyy-MM-dd"
                                v-model="formValidate.workSdate">
                            </DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="结束日期"
                              prop="workEdate">
                            <DatePicker type="date"
                                placeholder="请选择结束日期"
                                style="width: 100%"
                                :editable='false'
                                format="yyyy-MM-dd"
                                v-model="formValidate.workEdate">
                            </DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                        <FormItem label="最后职位"
                                prop="workMajor">
                            <Input v-model="formValidate.workMajor"
                                placeholder="请输入最后职位"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="最后行政级别"
                              prop="workAdmin">
                        <Select v-model="formValidate.workAdmin"
                                        placeholder="请选择最后行政级别">
                                        <Option v-for="item in administrativeLevelList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="最后行政级别开始日期"
                              prop="workAdmsdate">
                            <DatePicker type="date"
                                placeholder="请选择最后行政级别开始日期"
                                style="width: 100%"
                                :editable='false'
                                format="yyyy-MM-dd"
                                v-model="formValidate.workAdmsdate">
                            </DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                        <FormItem label="证明人1"
                                prop="workCertpersone">
                            <Input v-model="formValidate.workCertpersone"
                                placeholder="请输入证明人1"></Input>
                        </FormItem>
                    </Col>
                 </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                        <FormItem label="证明人1电话"
                                prop="workCertmobone">
                            <Input v-model="formValidate.workCertmobone"
                                placeholder="请输入证明人1电话"></Input>
                        </FormItem>
                    </Col>
                   <Col span="10"
                         offset="1">
                        <FormItem label="证明人2"
                                prop="workCertperstwo">
                            <Input v-model="formValidate.workCertperstwo"
                                placeholder="请输入证明人2"></Input>
                        </FormItem>
                    </Col>
                 </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                        <FormItem label="证明人2电话"
                                prop="workCertmobtwo">
                            <Input v-model="formValidate.workCertmobtwo"
                                placeholder="请输入证明人2电话"></Input>
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

export default {
    data () {
        const compareTime = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择开始日期"));
            } else {
                //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
                let startTimeNum = (new Date(this.formValidate.workSdate)).getTime();
                let endTimeNum = (new Date(this.formValidate.workEdate)).getTime();
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
            spinShow: false,
            formValidate: {
                workUnitname:'',
                workEmpycate:'',
                workComcate:'',
                workDepart:'',
                workSdate:'',
                workEdate:'',
                workMajor:'',
                workAdmin:'',
                workAdmsdate:'',
                workCertpersone:'',
                workCertmobone:'',
                workCertperstwo:'',
                workCertmobtwo:'',
                workComcateDis:''
            },
            paramTypeDis: '',
            ruleValidate: {
                workDepart:[
                    { required: true, message: '任职部门不能为空', trigger: 'blur' },
                ],
                workUnitname: [
                    { required: true, message: '公司名称不能为空', trigger: 'blur' },
                ],
                workEmpycate: [
                    { required: true, message: '雇主类别不能为空', trigger: 'change' },
                ],
                workComcate: [
                    { required: true, message: '企业所属行业类别不能为空', trigger: 'change' },
                ],
                workCertpersone: [
                    { required: true, message: '证明人1不能为空', trigger: 'blur' },
                ],
                workCertmobone: [
                    { required: true,validator: this.validMobile, trigger: 'blur' },
                ],
                workCertperstwo: [
                    { required: true, message: '证明人2不能为空', trigger: 'blur' },
                ],
                workCertmobtwo: [
                    { required: true, validator: this.validMobile, trigger: 'blur' },
                ],
                 workSdate: [
                    { required: true, type: 'date',validator: compareTime,trigger: 'blur' },
                ],
                 workEdate: [
                    { required: true, type: 'date',message: '请选择结束日期', trigger: 'blur' },
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
        basicInformationDate:String,
        // index: Number,
    },
    updated () {

    },
    mounted(){
        this.getSelect()
    },
    methods: {
         validMobile (rule, value, callback) {
            let reg = new RegExp("^[1][3,4,5,6,7,8,9][0-9]{9}$");
            if (!value) {
                return callback(new Error("手机号不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("不是有效的手机号码"));
            } else {
                return callback();
            }
        },
        workComcatechange(value){
            const t = this
           if(value){
               t.formValidate.workComcateDis = value.label
           }
        },
        // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'employerType,businessType,administrativeLevel',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.employerTypeList = res.data.content[0].value[0].paramList
                    t.businessTypeList = res.data.content[0].value[1].paramList
                    t.administrativeLevelList =  res.data.content[0].value[2].paramList
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
            t.formValidate.workUnitname = data.workUnitname
            t.formValidate.workEmpycate = data.workEmpycate
            t.formValidate.workComcate = data.workComcate    
            t.formValidate.workDepart = data.workDepart 
            t.formValidate.workSdate = data.workSdate 
            t.formValidate.workEdate = data.workEdate 
            t.formValidate.workMajor = data.workMajor 
            t.formValidate.workAdmin = data.workAdmin 
            t.formValidate.workAdmsdate = data.workAdmsdate 
            t.formValidate.workCertpersone = data.workCertpersone 
            t.formValidate.workCertmobone = data.workCertmobone 
            t.formValidate.workCertperstwo = data.workCertperstwo 
            t.formValidate.workCertmobtwo = data.workCertmobtwo 
            t.formValidate.workComcateDis = data.workComcateDis 
        },
        handleSubmit () {
            const t = this
            // let startTimeNum = (new Date(this.formValidate.workSdate)).getTime();
            
            // let endTimeNum = (new Date(t.basicInformationDate)).getTime();
            // if (startTimeNum <= endTimeNum) {
            //    this.$Modal.warning({
            //         title: '提示',
            //         content: '开始工作日期不能小于基本信息参加工作日期'
            //     });
            //     return
            // }
            if ("string" == typeof (t.formValidate.workSdate) && t.formValidate.workSdate !== "") {
                t.formValidate.workSdate = new Date(t.formValidate.workSdate);
            }
            if ("string" == typeof (t.formValidate.workEdate) && t.formValidate.workEdate !== "") {
                t.formValidate.workEdate = new Date(t.formValidate.workEdate);
            }
            // if (t.logType === this.$t('button.y.upd')) {
            //     data.id = t.id
            // }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    if ("object" == typeof (t.formValidate.workSdate)) {
                        t.formValidate.workSdate = (t.formValidate.workSdate).format("yyyy-MM-dd");
                    }
                    if ("object" == typeof (t.formValidate.workEdate)) {
                        t.formValidate.workEdate = (t.formValidate.workEdate).format("yyyy-MM-dd");
                    }
                    if ("object" == typeof (t.formValidate.workAdmsdate)) {
                        t.formValidate.workAdmsdate = (t.formValidate.workAdmsdate).format("yyyy-MM-dd");
                    }
                    const data = deepCopy(t.formValidate)
                     if(t.logType ==  t.$t("button.add")){
                        t.$emit('addNewArrayworkexp', data)
                    }else if(t.logType == t.$t("button.y.upd")){
                        t.$emit('updNewArrayworkexp', data,t.index)
                    }   
                    this.$refs.formValidate.resetFields()
                    this.formValidate.workComcateDis = ''  
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
    .ivu-date-picker {
        display: inline-block;
        line-height: normal;
        cursor: pointer;
    }
    .ios-search {
    cursor: pointer;
    }
</style>
