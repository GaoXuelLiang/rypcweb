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
                  :label-width="120">
                <Row>
                   <Col span="10"
                                 offset="2">
                            <FormItem label="日期年月"
                                      prop="APcalendarDate">
                                <DatePicker 
                                            placeholder="请选择日期年月"
                                            style="width: 100%"
                                            :editable='false'
                                            format="yyyy-MM"
                                            type="month"
                                            v-model="formValidate.APcalendarDate">
                                </DatePicker>
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
                            @click="handleSubmit">导出</Button>
                </Row>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin,uploadFile ,getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'

export default {
    data () {
        return {
            filekey: '',
            filename: '',
            isSpinTable:false,
            isScorllY: null,
            formValidate: {
                APcalendarDate:new Date(),
            },
            // 基本信息验证
            ruleValidate: {
                APcalendarDate: [
                    { required: true,pattern: /.+/, message: '日期年月不能为空', trigger: 'change', },
                ],
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
        
    },
    updated () {

    },
    methods: {
        init(){
            const t = this
            console.log(t.selectionAlldata)
          
             for(let i = 0; i <  t.selectionAlldata.length; i++){
                // 添加到
            
            }
        },
        handleReset () {
            this.$emit('closeUp');
            this.$refs.formValidate.resetFields() 
        },
        handleSubmit () {
            const t = this
            if ("string" == typeof (t.formValidate.APcalendarDate)&& t.formValidate.APcalendarDate !== "") {
                t.formValidate.APcalendarDate = new Date(t.formValidate.APcalendarDate);
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    if ("object" == typeof (t.formValidate.APcalendarDate)) {
                        t.formValidate.APcalendarDate = (t.formValidate.APcalendarDate).format("yyyy-MM");
                    }
                    let data = deepCopy(t.formValidate)
                    data._mt= t.$global.mt + "PayMonthatt.exportCalendar",      
                    getDataLevelUserLoginData(data).then(res => {
                                t.isSpinTable = true;
                                    try {
                                        if (isSuccess(res, t)) {
                                            t.filekey = res.data.content[0].filekey
                                            t.filename = res.data.content[0].filename
                                            t.$emit('setFileKey', t.filekey, t.filename, true)
                                        }
                                    } catch (res) {
                                        t.$Modal.error({
                                            title: t.$t("reminder.err"),
                                            content: t.$t("reminder.errormessage")
                                        });
                                    }
                                }).catch(() => {
                                    t.$Modal.error({
                                        title: t.$t("reminder.err"),
                                        content: t.$t("reminder.errormessage")
                                    });
                                }).finally(() => {
                                    t.isSpinTable = false;
                                });               
                 }else {
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
.w-e-droplist{
    z-index: 10000;
}
#editor :first-child {
    :first-child{
        z-index: 2 !important;
    }
}
/deep/.cover .box .table_form {
    max-height: 470px;
    overflow-y: unset;
    /* min-height: 169px; */
    /* overflow-y: auto; */
    // scrollbar-width: thin;
}
</style>
