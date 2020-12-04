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
                              prop="fmErelat">
                        <Select v-model="formValidate.fmErelat"
                                        @on-change='fmerelatchange'
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
                              prop="fmName">
                         <Input v-model="formValidate.fmName"
                               placeholder="请输入姓名"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="性别"
                              prop="fmGender">
                        <Select v-model="formValidate.fmGender"
                                        placeholder="请选择性别">
                                        <Option v-for="item in GenderList"
                                        :value="item.paramCode"
                                        :key="item.id">{{ item.paramInfoCn }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="出生日期"
                              prop="fmBirthdate">
                            <DatePicker type="date"
                                placeholder="请选择出生日期"
                                style="width: 100%"
                                format="yyyy-MM-dd"
                                v-model="formValidate.fmBirthdate">
                            </DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="工作单位"
                              prop="fmCompany">
                         <Input v-model="formValidate.fmCompany"
                               placeholder="请输入工作单位"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="职业"
                              prop="fmJob">
                         <Input v-model="formValidate.fmJob"
                               placeholder="请输入职业"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="联系电话"
                              prop="fmPhone">
                         <Input v-model="formValidate.fmPhone"
                               placeholder="请输入联系电话"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                     <FormItem label="是否主要联系人"
                                prop="fmIsadm">
                        <Col span="9">
                            <RadioGroup v-model="formValidate.fmIsadm"
                                        type="button"
                                        size="small">
                                <Radio v-for="(item, index) in yesOrNo"
                                        :key="index"
                                        :label="item.paramCode"
                                        >{{item.paramInfoCn}}</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span="15">
                            <div class="message">仅需设置一名成员</div>
                        </Col>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                        <Col span="10"
                                    offset="1">
                                <FormItem label="联系人地址所在省"
                                        prop="fmAdmproid">
                                    <span @dblclick="dubClearefmAdmproid">
                                            <Input
                                                v-model="formValidate.fmAdmproidDis"
                                                placeholder="请选择联系人地址所在省"
                                                @on-click="openModalfmAdmproid"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                    </span>
                                </FormItem>
                        </Col>
                         <Col span="10"
                                    offset="1">
                                <FormItem label="联系人地址所在市"
                                        prop="fmAdmcd">
                                    <span @dblclick="dubClearefmAdmcd">
                                            <Input
                                                v-model="formValidate.fmAdmcdDis"
                                                placeholder="请选择联系人地址所在市"
                                                @on-click="openModalfmAdmcd"
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
                                <FormItem label="联系人地址所在区县"
                                        prop="fmAdmcouid">
                                    <span @dblclick="dubClearefmAdmcouid">
                                            <Input
                                                v-model="formValidate.fmAdmcouidDis"
                                                placeholder="请选择联系人地址所在区县"
                                                @on-click="openModalfmAdmcouid"
                                                readonly
                                                class="ios-search"
                                                icon='ios-search'
                                            ></Input>
                                    </span>
                                </FormItem>
                        </Col>
                         <Col span="10"
                                    offset="1">
                                <FormItem label="联系人通信地址"
                                        prop="fmAdmdid">
                                            <Input
                                                v-model="formValidate.fmAdmdid"
                                                placeholder="请选择联系人通信地址"
                                            ></Input>
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
        <!-- 城市信息 -->
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
        </transition>
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
            yesOrNo:[],
            GenderList:[],
            relationshipList:[],
            spinShow: false,
            // fmAdmproid:'',
            // fmAdmcd:'',
            // fmAdmcouid:'',
            formValidate: {
               fmErelat:'',
                fmName:'',
                fmGender:'',
                fmBirthdate:'',
                fmCompany:'',
                fmJob:'',
                fmPhone:'',
                fmIsadm:'1',
                fmAdmproid:'',
                fmAdmcd:'',
                fmAdmcouid:'',
                fmAdmdid:'',
                fmErelatDis:'',
                fmAdmproidDis:'',
                fmAdmcdDis:'',
                fmAdmcouidDis:'',
            },
            paramTypeDis: '',
            ruleValidate: {
                fmErelat:[
                     { required: true, message: '员工关系不能为空', trigger: 'change' },
                ],
                fmName: [
                    { required: true, message: '姓名不能为空', trigger: 'change' },
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
            let reg = new RegExp("^[1][3,4,5,6,7,8,9][0-9]{9}$");
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
               t.formValidate.fmErelatDis = value.label
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
        // 所在省
        openModalfmAdmproid(){
            const t = this
            const name = '省份'
            const type = '类型'
            const cityType = '01prov'
            const cityPid = '0'
            t.openfmAdmproid = true
            t.$refs.searchTablefmAdmproid.getData(name,type,cityType,cityPid)
            t.title = '主要联系人地址所在省'
            t.typeName = '家庭成员'
        },
        changeinputfmAdmproid(row){
            const t = this
            t.formValidate.fmAdmproidDis = row.cityName
            t.formValidate.fmAdmproid = row.id
            t.formValidate.fmAdmcdDis = ''
            t.formValidate.fmAdmcd = ''
            t.formValidate.fmAdmcouidDis = ''
            t.formValidate.fmAdmcouid =''
        },
        dubClearefmAdmproid(){
            const t = this
            t.formValidate.fmAdmproidDis = ''
            t.formValidate.fmAdmproid = ''
            t.formValidate.fmAdmcdDis = ''
            t.formValidate.fmAdmcd = ''
            t.formValidate.fmAdmcouidDis = ''
            t.formValidate.fmAdmcouid =''
        },
        // 所在市
        openModalfmAdmcd(){
            const t = this
            if(t.formValidate.fmAdmproid==''){
                t.$Modal.warning({
                    title: '提示',
                    content: '请先选择省份',
                })
                return
            }
            const name = '城市'
            const type = '类型'
            const cityType = '02city'
            t.openfmAdmproid = true
            t.$refs.searchTablefmAdmproid.getData(name,type,cityType,t.formValidate.fmAdmproid)
            t.title = '主要联系人地址所在市'
            t.typeName = '家庭成员'
        },
        changeinputfmAdmcd(row){
            const t = this
            t.formValidate.fmAdmcdDis = row.cityName
            t.formValidate.fmAdmcd = row.id
        },
        dubClearefmAdmcd(){
            const t = this
            t.formValidate.fmAdmcdDis = ''
            t.formValidate.fmAdmcd = ''
        },
        // 所在区县
        openModalfmAdmcouid(){
            const t = this
            if(t.formValidate.fmAdmcd==''){
                t.$Modal.warning({
                    title: '提示',
                    content: '请先选择城市',
                })
                return
            }
            const name = '区县'
            const type = '类型'
            const cityType = '03county'
            t.openfmAdmproid = true
            t.$refs.searchTablefmAdmproid.getData(name,type,cityType,t.formValidate.fmAdmcd)
            t.title = '主要联系人地址所在区县'
            t.typeName = '家庭成员'
        },
        changeinputfmAdmcouid(row){
            const t = this
            t.formValidate.fmAdmcouidDis = row.cityName
            t.formValidate.fmAdmcouid = row.id
        },
        dubClearefmAdmcouid(){
            const t = this
            t.formValidate.fmAdmcouidDis = ''
            t.formValidate.fmAdmcouid = ''
        },
        getData (data,logType,index) {
            const t = this
            t.index = index
            t.formValidate.fmErelat = data.fmErelat
            t.formValidate.fmName = data.fmName
            t.formValidate.fmGender = data.fmGender
            t.formValidate.fmBirthdate = data.fmBirthdate
            t.formValidate.fmCompany = data.fmCompany
            t.formValidate.fmJob = data.fmJob
            t.formValidate.fmIsadm = data.fmIsadm
            t.formValidate.fmAdmproid = data.fmAdmproid
            t.formValidate.fmAdmcd = data.fmAdmcd
            t.formValidate.fmAdmcouid = data.fmAdmcouid
            t.formValidate.fmAdmdid = data.fmAdmdid
            t.formValidate.fmErelatDis = data.fmErelatDis
            t.formValidate.fmAdmproidDis = data.fmAdmproidDis
            t.formValidate.fmAdmcdDis = data.fmAdmcdDis
            t.formValidate.fmAdmcouidDis = data.fmAdmcouidDis
            t.formValidate.fmPhone = data.fmPhone
        },
        handleSubmit () {
            const t = this
            if ("object" == typeof (t.formValidate.fmBirthdate)) {
                t.formValidate.fmBirthdate = (t.formValidate.fmBirthdate).format("yyyy-MM-dd");
            }
            const data = deepCopy(t.formValidate)
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    if(t.logType ==  t.$t("button.add")){
                        t.$emit('addNewArrayfamily', data)
                    }else if(t.logType == t.$t("button.y.upd")){
                        t.$emit('updNewArrayfamily', data,t.index)
                    }
                    this.$refs.formValidate.resetFields()
                    this.formValidate.fmAdmproidDis = ''
                    this.formValidate.fmAdmcdDis = ''
                    this.formValidate.fmAdmcouidDis = ''
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
            this.formValidate.fmAdmproidDis = ''
            this.formValidate.fmAdmcdDis = ''
            this.formValidate.fmAdmcouidDis = ''
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
    .message {
        background-color: #f7e2e4;
        padding: 0 10px;
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
