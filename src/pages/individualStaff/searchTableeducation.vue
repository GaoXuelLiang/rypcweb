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
                    {{logType}}教育信息
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
                    <FormItem label="学校"
                              prop="eduSchool">
                         <Input v-model="formValidate.eduSchool"
                               placeholder="请输入学校"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                                offset="1">
                                <FormItem label="国家地区"
                                        prop="eduCouid">
                                    <span @dblclick="dubCleareeduCouid">
                                            <Input
                                                v-model="formValidate.eduCouidDis"
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
                                <FormItem label="学历"
                                        prop="eduAcid">
                                    <Select v-model="formValidate.eduAcid"
                                        :label-in-value="true"
                                        @on-change='eduAcidchange'
                                        placeholder="请选择学历">
                                        <Option v-for="item in highestDegreeList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="学习方式"
                              prop="eduStutype">
                        <Select v-model="formValidate.eduStutype"
                                        placeholder="请选择学习方式">
                                        <Option v-for="item in learnstyleList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row v-show='isHighschool'>
                     <Col span="10"
                         offset="1">
                        <FormItem label="专业类别"
                                prop="eduMajtypeDis">
                                <span @dblclick="dubClearProCategory('eduMajtype')">
                                    <Input  v-model="formValidate.eduMajtypeDis"
                                            placeholder="请选择专业类别"
                                            @on-click="openModalProCategory('eduMajtype')"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'></Input>
                                </span>
                        </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="专业"
                              prop="eduMajorDis">
                         <!-- <Input v-model="formValidate.eduMajor"
                               placeholder="请输入专业"></Input> -->
                                <span @dblclick="dubClearProCategory('eduMajor')">
                                    <Input  v-model="formValidate.eduMajorDis"
                                            placeholder="请选择专业"
                                            @on-click="openModalProCategory('eduMajor')"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'></Input>
                                </span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="入学日期"
                              prop="eduEnttime">
                            <DatePicker type="date"
                                placeholder="请选择入学日期"
                                style="width: 100%"
                                :editable='false'
                                format="yyyy-MM-dd"
                                v-model="formValidate.eduEnttime">
                            </DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="毕业日期"
                              prop="eduGrtime">
                            <DatePicker type="date"
                                placeholder="请选择毕业日期"
                                style="width: 100%"
                                :editable='false'
                                format="yyyy-MM-dd"
                                v-model="formValidate.eduGrtime">
                            </DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row v-show='isHighschool'>
                    <Col span="10"
                         offset="1">
                        <FormItem label="第二专业类别"
                                prop="eduSecmatypeDis">
                                <!-- <span @dblclick="dubClearProCategory">
                                    <Input v-model="formValidate.eduSecmatype"
                                        placeholder="请输入第二专业类别"></Input>
                                </span> -->
                                <span @dblclick="dubClearProCategory('eduSecmatype')">
                                    <Input  v-model="formValidate.eduSecmatypeDis"
                                            placeholder="请选择第二专业类别"
                                            @on-click="openModalProCategory('eduSecmatype')"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'></Input>
                                </span>
                        </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                        <FormItem label="第二专业"
                                prop="eduSecmajorDis">
                            <!-- <Input v-model="formValidate.eduSecmajor"
                                placeholder="请输入第二专业"></Input> -->
                                <span @dblclick="dubClearProCategory('eduSecmajor')">
                                    <Input  v-model="formValidate.eduSecmajorDis"
                                            placeholder="请选择第二专业"
                                            @on-click="openModalProCategory('eduSecmajor')"
                                            readonly
                                            class="ios-search"
                                            icon='ios-search'></Input>
                                </span>
                        </FormItem>
                    </Col>
                 </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                        <FormItem label="学历证书编号"
                                prop="eduAcanum">
                            <Input v-model="formValidate.eduAcanum"
                                placeholder="请输入学历证书编号"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                        <FormItem label="学位证书编号"
                                prop="eduDegrenum">
                            <Input v-model="formValidate.eduDegrenum"
                                placeholder="请输入学位证书编号"></Input>
                        </FormItem>
                    </Col>
                 </Row>
                <Row>
                    <Col span="10"
                                offset="1">
                                <FormItem label="学位"
                                        prop="eduDegree">
                                    <Select v-model="formValidate.eduDegree"
                                        :label-in-value="true"
                                        @on-change='eduDegreechange'
                                        placeholder="请选择学位">
                                        <Option v-for="item in eduDegreeList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                                </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="学校类型"
                              prop="eduSchooltype">
                        <Select v-model="formValidate.eduSchooltype"
                                        placeholder="请选择学校类型">
                                        <Option v-for="item in eduSchooltypeList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                     <FormItem label="最高学历"
                                prop="eduHigdeg">
                        <RadioGroup v-model="formValidate.eduHigdeg"
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
                     <FormItem label="最高全日制学历"
                                prop="eduHigdaeg">
                        <RadioGroup v-model="formValidate.eduHigdaeg"
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
                   <Col span="10"
                         offset="1">
                     <FormItem label="是否第一学历"
                                prop="eduFirsdeg">
                        <RadioGroup v-model="formValidate.eduFirsdeg"
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
        <!-- 专业类别 -->
         <transition name="fade">
            <searchProCategory v-show="openProCategory"
                         :title="title"
                         @closeUp="close"
                         @changeinputProCategory="changeinputProCategory"
                         ref="searchProCategory"></searchProCategory>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccessNew, deepCopy } from '../../lib/util'
import searchTableCountryEducation from './searchCountry'
import searchProCategory from './searchProCategory'
export default {
    data () {
        const compareTime = (rule, value, callback) => {
            if (value === "" || !value) {
                callback(new Error("请选择入学日期"));
            } else {
                //开始时间不能大于结束时间   this.formValidate.unitValdate和this.formValidate.unitInvdate  这两个值是根据你当前页面 日期时间绑定的变量
                let startTimeNum = (new Date(this.formValidate.eduEnttime)).getTime();
                let endTimeNum = (new Date(this.formValidate.eduGrtime)).getTime();
                if (startTimeNum > endTimeNum) {
                    callback(new Error('入学日期不能大于毕业日期'))
                }
                callback()
            }
        };
        return {
            isHighschool:true,
            index:'',
            typeName:'',
            openCountryEducation:false,
            openProCategory:false,
            title:'',
            mainKey:'',
            yesOrNo:[],
            highestDegreeList:[],
            learnstyleList:[],
            eduDegreeList:[],
            eduSchooltypeList:[],
            spinShow: false,  
            formValidate: {
                eduSchool:'',
                eduCouid:'',
                eduMajtype:'',
                eduMajor:'',
                eduAcid:'',
                eduStutype:'',
                eduEnttime:'',
                eduGrtime:'',
                eduSecmatype:'',
                eduSecmajor:'',
                eduAcanum:'',
                eduDegrenum:'',
                eduHigdeg:'1',
                eduHigdaeg:'1',
                eduFirsdeg:'1',
                eduAcidDis:'',
                eduCouidDis:'',
                eduMajtypeDis:'',
                eduMajorDis:'',
                eduSecmatypeDis:'',
                eduSecmajorDis:'',
                eduDegree:'',
                eduSchooltype:'',
            },
            paramTypeDis: '',
            ruleValidate: {
                eduMajtypeDis: [
                     { required: true, message: '专业类别不能为空', trigger: 'change' },
                ],
                eduMajorDis:[
                     { required: true, message: '专业不能为空', trigger: 'blur' },
                ],
                eduSchool: [
                    { required: true, message: '学校不能为空', trigger: 'blur' },
                ],
                eduCouid: [
                    { required: true, message: '国家/地区不能为空', trigger: 'change' },
                ],
                eduAcid: [
                    { required: true, message: '学历不能为空', trigger: 'change' },
                ],
                eduStutype: [
                    { required: true, message: '学习方式不能为空', trigger: 'change' },
                ],
                 eduEnttime: [
                    { required: true, type: 'date',validator: compareTime,trigger: 'change' },
                ],
                 eduGrtime: [
                    { required: true, type: 'date',message: '毕业日期不能为空', trigger: 'change' },
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
        searchTableCountryEducation,
        searchProCategory
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
               t.formValidate.eduAcidDis = value.label
           }
           if(value.value=='04highschool'||value.value=='02sectechschool'||value.value=='01Primary'||value.value=='03vocational' ){
                console.log(this)
                this.isHighschool = false
                this.$refs.formValidate.$children[2].$children[1].$children[0].isRequired = false
                this.$set(this.ruleValidate.eduMajorDis[0],"required",false)
                this.$refs.formValidate.$children[2].$children[1].$children[0].resetField()
                this.$refs.formValidate.$children[2].$children[0].$children[0].isRequired = false
                this.$set(this.ruleValidate.eduMajtypeDis[0],"required",false)
                this.$refs.formValidate.$children[2].$children[0].$children[0].resetField()
           }else{
                this.isHighschool = true
                this.$refs.formValidate.$children[2].$children[1].$children[0].isRequired = true
                this.$set(this.ruleValidate.eduMajorDis[0],"required",true)
                this.$refs.formValidate.$children[2].$children[1].$children[0].resetField()
                this.$refs.formValidate.$children[2].$children[0].$children[0].isRequired = true
                this.$set(this.ruleValidate.eduMajtypeDis[0],"required",true)
                this.$refs.formValidate.$children[2].$children[0].$children[0].resetField()
           }
        },
        eduDegreechange(value){
            const t = this
        //    if(value){
        //        t.formValidate.eduAcidDis = value.label
        //    }
        },
         // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,highestDegree,learnstyle,degreelevel,schooltype',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.yesOrNo = res.data.content[0].value[0].paramList
                    t.highestDegreeList = res.data.content[0].value[1].paramList
                    t.learnstyleList =  res.data.content[0].value[2].paramList
                    t.eduDegreeList = res.data.content[0].value[3].paramList
                    t.eduSchooltypeList = res.data.content[0].value[4].paramList
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
            t.formValidate.eduCouidDis = name 
            t.formValidate.eduCouid = id
        },
        dubCleareeduCouid(){
            const t = this
            t.formValidate.eduCouidDis = '' 
            t.formValidate.eduCouid = ''
        },
        // 学历
        openModaleduAcid(){

        },
        dubCleareeduAcid(){

        },
        // 专业类别
        openModalProCategory(type){
            const t = this;
            t.mainKey = type
            if(type === 'eduMajtype' ||type === 'eduSecmatype') {
                t.firstType()
            }else if(type === 'eduSecmajor' || type === 'eduMajor'){
                t.secondType(type)
            }
        },
        changeinputProCategory(name,id){
            const t = this;
            t.formValidate[t.mainKey+'Dis'] = name;
            t.formValidate[t.mainKey] = id;
        },
        dubClearProCategory(type){
            const t = this;
            t.formValidate[type+'Dis'] = '';
            t.formValidate[type] = '';
            if(type === 'eduMajtype') {
                t.formValidate.eduMajor = '';
                t.formValidate.eduMajorDis = '';
            }else if(type === 'eduSecmatype') {
                t.formValidate.eduSecmajor = '';
                t.formValidate.eduSecmajor = '';
            }
        },
        firstType(){
            const t = this;
            let mt = 'BaseMajortype.getPage'
            t.title = '专业类别';
            t.openProCategory = true;
            t.$refs.searchProCategory.getData(mt)
        },
        secondType(type){
            const t = this;
            let mt = 'BaseMajortypet.getPage'
            switch(type) {
                case 'eduMajor':
                    if(!t.formValidate.eduMajtype) {
                        t.$Modal.warning({
                            title:'提示',
                            content: '请先选择专业类别'
                        })
                    }else {
                        t.title = '专业';
                        t.openProCategory = true;
                        t.$refs.searchProCategory.getData(mt, t.formValidate.eduMajtype)
                    }
                    break;
                case 'eduSecmajor':
                    if(!t.formValidate.eduSecmatype) {
                        t.$Modal.warning({
                            title:'提示',
                            content: '请先选择第二专业类别'
                        })
                    }else {
                        t.title = '第二专业';
                        t.openProCategory = true;
                        t.$refs.searchProCategory.getData(mt, t.formValidate.eduSecmatype)
                    }
                    break;
            }
        },
        getData (data,logType,index) {
            //debugger
            const t = this
            t.index = index
            t.formValidate.eduMajtypeDis = data.eduMajtypeDis
            t.formValidate.eduMajorDis = data.eduMajorDis
            t.formValidate.eduSecmatypeDis = data.eduSecmatypeDis
            t.formValidate.eduSecmajorDis = data.eduSecmajorDis
            t.formValidate.eduSchool = data.eduSchool
            t.formValidate.eduCouid = data.eduCouid
            t.formValidate.eduMajtype = data.eduMajtype    
            t.formValidate.eduMajor = data.eduMajor 
            t.formValidate.eduAcid = data.eduAcid 
            // if(data.eduAcid=='04highschool'||data.eduAcid=='02sectechschool'||data.eduAcid=='01Primary'||data.eduAcid=='03vocational'){
            //     this.isHighschool = false
            // }
            if(data.eduAcid=='04highschool'||data.eduAcid=='02sectechschool'||data.eduAcid=='01Primary'||data.eduAcid=='03vocational'){
                console.log(this)
                this.isHighschool = false
                this.$refs.formValidate.$children[2].$children[1].$children[0].isRequired = false
                this.$set(this.ruleValidate.eduMajorDis[0],"required",false)
                this.$refs.formValidate.$children[2].$children[1].$children[0].resetField()
                this.$refs.formValidate.$children[2].$children[0].$children[0].isRequired = false
                this.$set(this.ruleValidate.eduMajtypeDis[0],"required",false)
                this.$refs.formValidate.$children[2].$children[0].$children[0].resetField()
           }else{
                this.isHighschool = true
                this.$refs.formValidate.$children[2].$children[1].$children[0].isRequired = true
                this.$set(this.ruleValidate.eduMajorDis[0],"required",true)
                this.$refs.formValidate.$children[2].$children[1].$children[0].resetField()
                this.$refs.formValidate.$children[2].$children[0].$children[0].isRequired = true
                this.$set(this.ruleValidate.eduMajtypeDis[0],"required",true)
                this.$refs.formValidate.$children[2].$children[0].$children[0].resetField()
           }
            t.formValidate.eduStutype = data.eduStutype 
            t.formValidate.eduEnttime = data.eduEnttime 
            t.formValidate.eduGrtime = data.eduGrtime 
            t.formValidate.eduSecmatype = data.eduSecmatype 
            t.formValidate.eduSecmajor = data.eduSecmajor 
            t.formValidate.eduAcanum = data.eduAcanum 
            t.formValidate.eduDegrenum = data.eduDegrenum 
            t.formValidate.eduHigdeg = data.eduHigdeg 
            t.formValidate.eduHigdaeg = data.eduHigdaeg 
            t.formValidate.eduFirsdeg = data.eduFirsdeg 
            t.formValidate.eduAcidDis = data.eduAcidDis 
            t.formValidate.eduCouidDis = data.eduCouidDis 
            t.formValidate.eduDegree = data.eduDegree
            t.formValidate.eduSchooltype = data.eduSchooltype
        },
        handleSubmit () {
            const t = this
            if ("string" == typeof (t.formValidate.eduEnttime) && t.formValidate.eduEnttime !== "") {
                t.formValidate.eduEnttime = new Date(t.formValidate.eduEnttime);
            }
            if ("string" == typeof (t.formValidate.eduGrtime) && t.formValidate.eduGrtime !== "") {
                t.formValidate.eduGrtime = new Date(t.formValidate.eduGrtime);
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    if ("object" == typeof (t.formValidate.eduEnttime)) {
                        t.formValidate.eduEnttime = (t.formValidate.eduEnttime).format("yyyy-MM-dd");
                    }
                    if ("object" == typeof (t.formValidate.eduGrtime)) {
                        t.formValidate.eduGrtime = (t.formValidate.eduGrtime).format("yyyy-MM-dd");
                    }
                    const data = deepCopy(t.formValidate)
                    if(t.logType ==  t.$t("button.add")){
                        t.$emit('addNewArrayeducation', data)
                    }else if(t.logType == t.$t("button.y.upd")){
                        t.$emit('updNewArrayeducation', data,t.index)
                    }   
                    this.$refs.formValidate.resetFields()
                    this.formValidate.eduCouidDis = '' 
                    this.formValidate.eduMajtypeDis = ''
                    this.formValidate.eduMajorDis = ''
                    this.formValidate.eduSecmatypeDis = ''
                    this.formValidate.eduSecmajorDis = ''
                    this.isHighschool = true
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
            t.openProCategory = false
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
            this.formValidate.eduCouidDis = ''
            // this.formValidate.eduMajtype = ''
            // this.formValidate.eduSecmatype = ''
            // this.formValidate.eduSecmajor = ''
            // this.formValidate.eduMajor = ''
            this.formValidate.eduMajtypeDis = ''
            this.formValidate.eduMajorDis = ''
            this.formValidate.eduSecmatypeDis = ''
            this.formValidate.eduSecmajorDis = ''
            this.isHighschool = true
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
