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
                    {{logType}}学历信息
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
                    <FormItem label="入学年月"
                              prop="etreduEnrolment">
                            <DatePicker type="month"
                                placeholder="请选择入学年月"
                                style="width: 100%"
                                :editable='false'
                                format="yyyy-MM"
                                v-model="formValidate.etreduEnrolment">
                            </DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="毕业年月"
                              prop="etreduGraduation">
                            <DatePicker type="month"
                                placeholder="请选择毕业年月"
                                style="width: 100%"
                                :editable='false'
                                format="yyyy-MM"
                                v-model="formValidate.etreduGraduation">
                            </DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="10"
                                offset="1">
                                <FormItem label="学历"
                                        prop="etreduEducation">
                                    <Select v-model="formValidate.etreduEducation"
                                        :label-in-value="true"
                                        @on-change="eduAcidchange"
                                        placeholder="请选择学历">
                                        <Option v-for="item in highestDegreeList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="学位"
                              prop="etreduEdegree">
                        <Select v-model="formValidate.etreduEdegree"
                                        placeholder="请选择学位">
                                        <Option v-for="item in edudegreeList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="学校"
                              prop="etreduSchools">
                         <Input v-model="formValidate.etreduSchools"
                               placeholder="请输入学校"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                                offset="1">
                                <FormItem label="国家地区"
                                        prop="etreduCountry">
                                    <span @dblclick="dubCleareeduCouid">
                                            <Input
                                                v-model="formValidate.etreduCountryDis"
                                                placeholder="请选择国家地区"
                                                @on-click="openModaleduCouid"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                    </span>
                                </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="10"
                         offset="1">
                        <FormItem label='证书编号'
                                prop="etreduNumber">
                            <Input v-model="formValidate.etreduNumber"
                                placeholder="请输入证书编号"></Input>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="10"
                                offset="1">
                                <FormItem label="学校类型"
                                        prop="etreduSchooltype">
                                    <Select v-model="formValidate.etreduSchooltype"
                                        :label-in-value="true"
                                     
                                        placeholder="请选择学校类型">
                                        <Option v-for="item in schooltypeList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="学习方式"
                              prop="etreduLearnstyles">
                        <Select v-model="formValidate.etreduLearnstyles"
                                        placeholder="请选择学习方式">
                                        <Option v-for="item in learnstyleList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
               
                <Row>
                    <Col span="10"
                         offset="1">
                        <FormItem label="第一专业"
                                prop="etreduFstmajor">
                            <Input v-model="formValidate.etreduFstmajor"
                                placeholder="请输入第一专业"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                        <FormItem label="第二专业"
                                prop="etreduSedmajor">
                            <Input v-model="formValidate.etreduSedmajor"
                                placeholder="请输入第二专业"></Input>
                        </FormItem>
                    </Col>
                 </Row>
               <Row>
                   <Col span="10"
                         offset="1">
                     <FormItem label="是否最高学历"
                                prop="etreduHigheredu">
                        <RadioGroup v-model="formValidate.etreduHigheredu"
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
                     <FormItem label="是否第一学历"
                                prop="etreduFstdegree">
                        <RadioGroup v-model="formValidate.etreduFstdegree"
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
          <!-- 国籍 -->
         <transition name="fade">
            <searchTableCountryEducation v-show="openCountryEducation"
                         @closeUp="close"
                         :logType='logType'
                         :typeName='typeName'
                         @changeinputCountryEducation="changeinputCountryEducation"
                         ref="searchTableCountryEducation"></searchTableCountryEducation>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccessNew, deepCopy } from '../../lib/util'
import searchTableCountryEducation from './searchCountry'
export default {
    data () {
        const compareTime = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择入学日期"));
            } else {
                //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
                let startTimeNum = (new Date(this.formValidate.etreduEnrolment)).getTime();
                let endTimeNum = (new Date(this.formValidate.etreduGraduation)).getTime();
                if (startTimeNum > endTimeNum) {
                    callback(new Error('入学日期不能大于毕业日期'))
                }
                callback()
            }
        };
        return {
            index:'',
            typeName:'',
            openCountryEducation:false,
            yesOrNo:[],
            highestDegreeList:[],
            learnstyleList:[],
            edudegreeList:[],
            schooltypeList:[],
            spinShow: false,
            formValidate: {
                id:'',
                etreduSchools:'',
                etreduCountry:'',
                // eduMajtype:'',
                // eduMajor:'',
                etreduNumber:'',
                etreduEducation:'',
                etreduEdegree:'',
                etreduEnrolment:'',
                etreduGraduation:'',
                etreduFstmajor:'',
                etreduSedmajor:'',
                // eduAcanum:'',
                // eduDegrenum:'',
                etreduHigheredu:'1',
                // eduHigdaeg:'1',
                etreduFstdegree:'1',
                etreduSchooltypeDis:'',
                etreduCountryDis:'',
                etreduEducationDis:'',

                // etreduEducation:'',
                // etreduEdegree:'',
                etreduSchooltype:'',
                // etreduLearnstyles:'',

                // etreduHigheredu:'',
                // etreduFstdegree:'',
            },
            paramTypeDis: '',
            ruleValidate: {
                eduMajor:[
                     { required: true, message: '专业不能为空', trigger: 'blur' },
                ],
                etreduSchools: [
                    { required: true, message: '学校不能为空', trigger: 'blur' },
                ],
                etreduCountry: [
                    { required: true, message: '国家/地区不能为空', trigger: 'change' },
                ],
                etreduEducation: [
                    { required: true, message: '学历不能为空', trigger: 'change' },
                ],
                etreduEdegree: [
                    { required: true, message: '学习方式不能为空', trigger: 'change' },
                ],
                etreduNumber: [
                    { required: true, message: '请输入证书编号', trigger: 'change' },
                ],
                 etreduEnrolment: [
                    { required: true, pattern: /.+/,validator: compareTime,trigger: 'change' },
                ],
                etreduGraduation: [
                    { required: true, pattern: /.+/,message: '毕业日期不能为空', trigger: 'change' },
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
        searchTableCountryEducation
    },
    props: {
        id: Number,
        logType: String,
    },
    updated () {

    },
    mounted(){
        this.getSelect()
    },
    methods: {
        eduAcidchange(value){
           const t = this
           if(value){
               t.formValidate.etreduEducationDis = value.label
           }
        },
         // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,education,learnstyle,edudegree,schooltype',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.yesOrNo = res.data.content[0].value[0].paramList
                    t.highestDegreeList = res.data.content[0].value[1].paramList
                    t.learnstyleList =  res.data.content[0].value[2].paramList
                    t.edudegreeList =  res.data.content[0].value[3].paramList
                    t.schooltypeList =  res.data.content[0].value[4].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        // 国家
        openModaleduCouid(){
            const t = this
            t.openCountryEducation = true
            t.$refs.searchTableCountryEducation.getData()
            t.typeName = '教育信息'
        },
        changeinputCountryEducation(name,id){
            const t = this
            t.formValidate.etreduCountryDis = name 
            t.formValidate.etreduCountry = id
        },
        dubCleareeduCouid(){
            const t = this
            t.formValidate.etreduCountryDis = '' 
            t.formValidate.etreduCountry = ''
        },
        // 学历
        openModaleduAcid(){

        },
        dubCleareeduAcid(){

        },
        getData (data,logType,index) {
            //debugger
            const t = this
            t.index = index

            t.formValidate.id = data.id
            t.formValidate.etreduSchools = data.etreduSchools
            t.formValidate.etreduCountry = data.etreduCountry
            // t.formValidate.eduMajtype = data.eduMajtype    
            // t.formValidate.eduMajor = data.eduMajor 
            t.formValidate.etreduEducation = data.etreduEducation 
            t.formValidate.etreduEdegree = data.etreduEdegree 
            t.formValidate.etreduEnrolment = data.etreduEnrolment === '' ? '' : new Date(data.etreduEnrolment).format('yyyy-MM'),
            t.formValidate.etreduGraduation = data.etreduGraduation === '' ? '' : new Date(data.etreduGraduation).format('yyyy-MM'),
            t.formValidate.etreduFstmajor = data.etreduFstmajor 
            t.formValidate.etreduSedmajor = data.etreduSedmajor 
            // t.formValidate.eduAcanum = data.eduAcanum 
            // t.formValidate.eduDegrenum = data.eduDegrenum 
            t.formValidate.etreduHigheredu = data.etreduHigheredu 
            // t.formValidate.eduHigdaeg = data.eduHigdaeg 
            t.formValidate.etreduFstdegree = data.etreduFstdegree 
            t.formValidate.etreduSchooltypeDis = data.etreduSchooltypeDis 
            t.formValidate.etreduCountryDis = data.etreduCountryDis 
            t.formValidate.etreduSchooltype = data.etreduSchooltype 
            t.formValidate.etreduLearnstyles = data.etreduLearnstyles 
            t.formValidate.etreduEducationDis = data.etreduEducationDis 
            t.formValidate.etreduNumber = data.etreduNumber 
        },
        handleSubmit () {
            const t = this
            if ("string" == typeof (t.formValidate.etreduEnrolment) && t.formValidate.etreduEnrolment !== "") {
                t.formValidate.etreduEnrolment = new Date(t.formValidate.etreduEnrolment);
            }
            if ("string" == typeof (t.formValidate.etreduGraduation) && t.formValidate.etreduGraduation !== "") {
                t.formValidate.etreduGraduation = new Date(t.formValidate.etreduGraduation);
            }
            const data = deepCopy(t.formValidate)
            for(let i in t.data){
                if(t.data[i]==''||t.data[i]==undefined){
                    delete t.data[i]
                }
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    if ("object" == typeof (t.formValidate.etreduEnrolment)) {
                        t.formValidate.etreduEnrolment = (t.formValidate.etreduEnrolment).format("yyyy-MM");
                    }
                    if ("object" == typeof (t.formValidate.etreduGraduation)) {
                        t.formValidate.etreduGraduation = (t.formValidate.etreduGraduation).format("yyyy-MM");
                    }
                    if(t.logType ==  t.$t("button.add")){
                        if(data.id){
                            data.id = ''
                        }
                        t.$emit('addNewArrayeducation', data)
                    }else if(t.logType == t.$t("button.y.upd")){
                        t.$emit('updNewArrayeducation', data,t.index)
                    }   
                    this.$refs.formValidate.resetFields()
                    this.formValidate.etreduCountryDis = '' 
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
            t.openCountryEducation = false
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
            this.formValidate.etreduCountryDis = ''
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
