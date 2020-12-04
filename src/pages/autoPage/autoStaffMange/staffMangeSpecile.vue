<template>
    <div class="cover">
        <div class="box">
             <Spin size="large" fix  v-if="isSpinTable"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="table_form"
                 ref="scrollBox"
                 >
            <Form ref="formValidate"
                  :model="formValidate"
                    :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="候选人姓名"
                              prop="emphIdDis">
                         <Input v-model="formValidate.emphIdDis"
                                        placeholder="请输入候选人姓名"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                     <Col span="10"
                         offset="1">
                    <FormItem label="业务单位"
                              prop="unitIdDis">
                         <Input v-model="formValidate.unitIdDis"
                                        placeholder="请输入业务单位"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="候选人部门"
                              prop="deptIdDis">
                         <Input v-model="formValidate.deptIdDis"
                                        placeholder="请输入部门"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                     <Col span="10"
                         offset="1">
                    <FormItem label="岗位"
                              prop="postIdDis">
                         <Input v-model="formValidate.postIdDis"
                                        placeholder="请输入岗位"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="岗位分类"
                              prop="postTypeDis">
                         <Input v-model="formValidate.postTypeDis"
                                        placeholder="请输入岗位分类"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                     <Col span="10"
                         offset="1">
                    <FormItem label="职级"
                              prop="rankIdDis">
                         <Input v-model="formValidate.rankIdDis"
                                        placeholder="请输入职级"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="序列"
                              prop="bacOrder">
                         <Input v-model="formValidate.bacOrder"
                                        placeholder="请输入序列"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                     <Col span="10"
                         offset="1">
                    <FormItem label="计划入职日期"
                              prop="bacJhentdate">
                                    <!-- <DatePicker type="date"
                                                placeholder="请选择计划入职日期"
                                                style="width: 100%"
                                                :editable='false'
                                                disabled
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.bacJhentdate">
                                    </DatePicker> -->
                                    <Input v-model="formValidate.bacJhentdate"
                                    placeholder="请选择计划入职日期"
                                    disabled
                                    ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="实际入职日期"
                              prop="bacSjentdate">
                                    <!-- <DatePicker type="date"
                                                placeholder="请选择实际入职日期"
                                                style="width: 100%"
                                                :editable='false'
                                                disabled
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.bacSjentdate">
                                    </DatePicker> -->
                                        <Input v-model="formValidate.bacSjentdate"
                                        placeholder="请选择实际入职日期"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                     <Col span="10"
                         offset="1">
                    <FormItem label="最终毕业院校"
                              prop="bacFinschool">
                         <Input v-model="formValidate.bacFinschool"
                                        placeholder="请输入最终毕业院校"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="最终学历"
                              prop="bacFincareer">
                         <Input v-model="formValidate.bacFincareer"
                                        placeholder="请输入最终学历"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                     <Col span="10"
                         offset="1">
                    <FormItem label="第一毕业院校"
                              prop="bacOneschool">
                         <Input v-model="formValidate.bacOneschool"
                                        placeholder="请输入第一毕业院校"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="第一学历"
                              prop="bacOnecareer">
                         <Input v-model="formValidate.bacOnecareer"
                                        placeholder="请输入第一学历"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                     <Col span="10"
                         offset="1">
                    <FormItem label="供应商"
                              prop="bacAgent">
                         <Select v-model="formValidate.bacAgent"
                                            placeholder="请选择供应商" @change='bacAgentchange'>
                                        <Option v-for="item in AgentList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="10"
                         offset="1">
                    <FormItem label="套餐"
                              prop="bacCambo">
                         <Select v-model="formValidate.bacCambo"
                                            placeholder="请选择套餐" @change='bacCambochange'>
                                        <Option v-for="item in CamboList"
                                                :value="item.paramCode"
                                                :key="item.id">{{ item.paramInfoCn }}</Option>
                                    </Select>
                    </FormItem>
                    </Col>
                    <Col span="10"
                                offset="1">
                                <FormItem label="是否加急"
                                            prop="secSocsec">
                                    <RadioGroup v-model="formValidate.bacHurry"
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
                    <FormItem label="背调结果1"
                              prop="bacConsone">
                         <!-- <Input v-model="formValidate.bacConsone"
                                        placeholder="请输入背调结果1"
                                        ></Input> -->
                              <Select v-model="formValidate.bacConsone"
                                      placeholder="请选择背调结果" @change='bacBdresultchange'>
                                                       <Option v-for="item in bdresultList"
                                                               :value="item.paramCode"
                                                               :key="item.id">{{ item.paramInfoCn }}</Option>
                                                   </Select>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="背调结果反馈时间1"
                              prop="bacConsonetime">
                                    <DatePicker type="date"
                                                placeholder="请选择背调结果反馈时间1"
                                                style="width: 100%"
                                                :editable='false'
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.bacConsonetime">
                                    </DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="背调结果2"
                              prop="bacConstwo">
                         <!-- <Input v-model="formValidate.bacConstwo"
                                        placeholder="请输入背调结果2"
                                        ></Input> -->
                                        <Select v-model="formValidate.bacConstwo"
                                                placeholder="请选择背调结果" @change='bacBdresult2change'>
                                                                 <Option v-for="item in bdresultList"
                                                                         :value="item.paramCode"
                                                                         :key="item.id">{{ item.paramInfoCn }}</Option>
                                                             </Select>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="背调结果反馈时间2"
                              prop="bacConstwotime">
                                    <DatePicker type="date"
                                                placeholder="请选择背调结果反馈时间2"
                                                style="width: 100%"
                                                :editable='false'
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.bacConstwotime">
                                    </DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="10"
                         offset="1">
                    <FormItem label="背调操作人"
                              prop="bacOpeuserDis">
                         <Input v-model="formValidate.bacOpeuserDis"
                                        placeholder="请输入背调操作人"
                                        disabled
                                        ></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="背调操作时间"
                              prop="bacOpetime">
                                    <DatePicker type="date"
                                                placeholder="请选择背调操作时间"
                                                style="width: 100%"
                                                :editable='false'
                                                format="yyyy-MM-dd"
                                                v-model="formValidate.bacOpetime"
                                                disabled>
                                    </DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="备注"
                              prop="comment">
                         <Input v-model="formValidate.comment"
                                        placeholder="请输入备注"
                                         type="textarea" :rows="4"
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="订单留言"
                              prop="bacLeavmess">
                         <Input v-model="formValidate.bacLeavmess"
                                        placeholder="请输入订单留言"
                                         type="textarea" :rows="4"
                                        ></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
             </div>
             <Row>
                <Col span="21"
                     offset="1">
                <Row type="flex"
                     justify="end"
                     :class="[isScorllY?'btnSize1':'btnSize']">
                    <Button @click="handleReset">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            @click="handleSubmit">{{$t('button.sav')}}</Button>
                </Row>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile ,getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy ,isSuccessNew} from '@/lib/util'

export default {
    data () {
        return {
            AgentList:[],
            CamboList:[],
            bdresultList:[],
            yesOrNo:[],
            isSpinTable:false,
            loading: [],
            isScorllY: null,
            spinShow: false,
            filekey:[],
            formValidate: {
                id: '',
                emphIdDis:'',
                unitIdDis:'',
                deptIdDis:'',
                postIdDis:'',
                postTypeDis:'',
                rankIdDis:'',
                bacOrder:'',
                bacJhentdate:'',
                bacSjentdate:'',
                bacFinschool:'',
                bacFincareer:'',
                bacOneschool:'',
                bacOnecareer:'',
                bacAgent:'01eighty',
                bacAgentDis:'八方锦程',
                bacCambo:'',
                bacCamboDis:'',
                bacHurry:'0',
                comment:'',
                bacLeavmess:'',
                bacConsone:'',
                bacConsonetime:'',
                bacConstwo:'',
                bacConstwotime:'',
                bacOpeuser:'',
                bacOpeuserDis:'',
                bacOpetime:''
            },
            // 基本信息验证
            ruleValidate: {
                bacCambo:[
                     { required: true, message: '套餐不能为空', trigger: 'change' },
                ]
            },
        }
    },
    props: {
        ids: String,
        logType: String,
        selectionAlldata : Array,
        tableselected:Array
    },
    components: {
    },
    mounted () {
        this.getSelect()
    },
    updated () {

    },
    methods: {
        bacAgentchange(value){
            const t = this
             if(value){
               t.formValidate.bacAgentDis = value.label
           }
        },
        bacCambochange(value){
             const t = this
             if(value){
               t.formValidate.bacCamboDis = value.label
           }
        },
        bacBdresultchange(value){
             const t = this
             if(value){
               t.formValidate.bacConsoneDis = value.label
           }
        },
        bacBdresult2change(value){
             const t = this
             if(value){
               t.formValidate.bacConstwoDis = value.label
           }
        },
       // 下拉数据
        getSelect() {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,baseagent,setmeal,bdresult',
            }).then((res) => {
                if (isSuccessNew(res, t)) {
                    t.yesOrNo = res.data.content[0].value[0].paramList
                    t.AgentList = res.data.content[0].value[1].paramList
                    t.CamboList = res.data.content[0].value[2].paramList
                    t.bdresultList = res.data.content[0].value[3].paramList

                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleReset () {
            this.$emit('closeUp');
            this.$refs.formValidate.resetFields()

        },
       getByid(id){
           const t = this
           t.isSpinTable =true
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'EmpMaemp.getById',
                APid: id,
                APlogType:'根据id获取信息',
                APffk:'1'
            }).then((res) => {
            if (isSuccess(res, t)) {
                t.formValidate.empmaId = res.data.content[0].id
                t.formValidate.emphIdDis = res.data.content[0].emphIdDis
                t.formValidate.unitIdDis = res.data.content[0].unitIdDis
                t.formValidate.deptIdDis = res.data.content[0].deptIdDis
                t.formValidate.postIdDis = res.data.content[0].postIdDis
                t.formValidate.postTypeDis = res.data.content[0].empPostTypeDis
                t.formValidate.bacHurry = res.data.content[0].bacHurryDis ? res.data.content[0].bacHurryDis:"0"
                t.formValidate.rankIdDis = res.data.content[0].empRankDis
                t.formValidate.bacOrder = res.data.content[0].emphXulidDis
                t.formValidate.bacJhentdate = res.data.content[0].maemJhentdate
                t.formValidate.bacSjentdate = res.data.content[0].maemSjentdate
                t.formValidate.bacFinschool = res.data.content[0].empEshool
                t.formValidate.bacFincareer = res.data.content[0].emphExuelDis
                t.formValidate.bacOneschool = res.data.content[0].emphFshool
                t.formValidate.bacOnecareer = res.data.content[0].emphFxuelDis
                if(res.data.content[0].emphAgent==''){
                    t.formValidate.bacAgent = '01eighty'
                    t.formValidate.bacAgentDIs = '八方锦程'
                }else{
                    t.formValidate.bacAgent = res.data.content[0].emphAgent
                }
                t.formValidate.bacCambo = res.data.content[0].emphMeal
                t.formValidate.bacConsone = res.data.content[0].maemBdresultDis
                t.formValidate.bacConsonetime = res.data.content[0].maemBdjgfktimeDis
                t.formValidate.bacConstwo = res.data.content[0].maemBdresult2Dis
                t.formValidate.bacConstwotime = res.data.content[0].maemBdjgfktime2Dis
                t.formValidate.comment = res.data.content[0].comment
                t.formValidate.bacLeavmess = res.data.content[0].bacLeavmess
                t.formValidate.id = res.data.content[0].backId
                t.formValidate.bacOpetime = res.data.content[0].bacOpetimeDis
                t.formValidate.bacOpeuser = res.data.content[0].bacOpeuserDis
                t.formValidate.bacOpeuserDis = res.data.content[0].bacOpeuserDisDis

            }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(()=>{
                t.isSpinTable = false;
            })
       },
        handleSubmit () {
            const t = this
            t.isSpinTable = true;
            let data = deepCopy(t.formValidate)
            for(let  dat in data) {
                if (data[dat] === '' || data[dat] === undefined ||   data[dat].length === 0) {
                delete data[dat]
                }
                if(typeof (data[dat]) == 'object'){
                    data[dat] = data[dat].toString()
                }
            }
            if (data.bacConsonetime !== undefined && data.bacConsonetime !== '') {
                data.bacConsonetime = new Date(data.bacConsonetime).format('yyyy-MM-dd')
            }
            if (data.bacConstwotime !== undefined && data.bacConstwotime !== '') {
                data.bacConstwotime = new Date(data.bacConstwotime).format('yyyy-MM-dd')
            }
            if (data.bacOpetime !== undefined && data.bacOpetime !== '') {
                data.bacOpetime = new Date(data.bacOpetime).format('yyyy-MM-dd')
            }
            if (data.bacJhentdate !== undefined && data.bacJhentdate !== '') {
                data.bacJhentdate = new Date(data.bacJhentdate).format('yyyy-MM-dd')
            }
            data._mt= t.$global.mt + "EmpMaback.addOrUpd"
            data.APlogType= '背调信息'
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    // const data = {
                    //     _mt: t.$global.mt + "EmpMaemp.sendOffer",
                    //     APlogType: t.$t("button.sponsor"),
                    //     APids: t.tableselected.toString(),
                    //     url:pubsource.pub_prvf_cur+'/NewemployeeLoginmain/NewemployeeLogin',
                    //     APdata:datas
                    // };
                    getDataLevelUserLoginData(data).then(res => {
                                // t.isSpinTable = true;
                                    try {
                                        if (isSuccess(res, t)) {
                                            // if (res.data.content[0].value == "1") {
                                                // t.tableselected = [];
                                   //             t.getData();
                                                t.isSpinTable = false;
                                                t.$Modal.success({
                                                    title: t.$t("reminder.suc"),
                                                    // content: t.$t("reminder.sponsorSucess"),
                                                    content: t.$t("reminder.savsuccess"),
                                                });
                                            // }else{
                                            //     t.$Modal.success({
                                            //         title: t.$t("reminder.err"),
                                            //         content: t.$t("reminder.sponsorError"),
                                            //     });
                                            // }
                                        }
                                    } catch (res) {
                                        t.isSpinTable = false;
                                        t.$Modal.error({
                                            title: t.$t("reminder.err"),
                                            content: t.$t("reminder.errormessage")
                                        });
                                    }
                                }).catch(() => {
                                    t.isSpinTable = false;
                                    t.$Modal.error({
                                        title: t.$t("reminder.err"),
                                        content: t.$t("reminder.errormessage")
                                    });
                                }).finally(() => {
                                    t.isSpinTable = false;
                                });
                }else {
                        t.isSpinTable = false;
                        this.$nextTick(function () {
                            let tt = document.querySelectorAll('.ivu-form-item-error');
                            this.$refs.formValidate.$el.scrollTop = tt[0].parentNode.offsetTop
                    })
                }
            })
        }
    },
    watch: {
    },
     //form滚动事件
     formScroll () {
        let selectDom = document.getElementsByClassName("ivu-select-visible");
        let datePickerDom = document.getElementsByClassName(
            "ivu-date-picker-focused"
        );
        if (selectDom.length > 0 || datePickerDom.length > 0) {
            let modal = document.getElementsByClassName("cover")[0];
            modal.click();
        }
    },
}
</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd";
.cover .box {
    position: absolute;
    width: 900px;
    background-color: #fff;
    padding: 60px 20px 0px 20px;
    border-radius: 10px;
     max-height: 730px;
    /* overflow-y: auto; */
}
.flex {
    display: flex;
}
.flex-1 {
    flex: 1;
}
.width-100 {
    width: 100%;
}

</style>
