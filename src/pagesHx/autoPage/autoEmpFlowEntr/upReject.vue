<template>
    <div class="cover">
        <div class="box" id="dragUpReject">
            <div class="title"
                 v-drag="`dragUpReject`">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    驳回
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="table_form"
                 ref="scrollBox">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
                    <i-col span="10" offset="1">
                        <FormItem label="驳回时间" prop="APrejectDate">
                            <DatePicker v-model="formValidate.APrejectDate"
                                        type="datetime"
                                        :disabled="true" 
                                        placeholder="请选择驳回时间" 
                                        :transfer='true'></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="21" offset="1">
                        <FormItem label="驳回原因" prop="APinvreason">
                            <Input  v-model="formValidate.APinvreason"
                                    type="textarea"
                                    :autosize="{minRows: 2,maxRows: 5}"
                                    placeholder="请输入驳回原因"/>
                        </FormItem>
                    </i-col>
                </Form>
            </div>
            <Row>
                <Col span="21"
                     offset="1">
                <Row type="flex"
                     justify="end"
                     class="btnSize">
                    <Button @click="handleReset">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            style="width:56px"
                            :loading="btnLoading"
                            @click="save"><span v-show="!btnLoading">驳回</span></Button>
                </Row>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import searchTable from "@/components/searchTable/searchOrgUnit"
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
export default {
    data () {
        return {
            btnLoading: false,
            formValidate: {
                APrejectDate: '',
                APinvreason: 'HRBP到岗未确认'
            },
            ruleValidate: {
                APrejectDate: [
                    { required: true, type: 'date', message: '驳回时间不能为空', trigger: 'blur' },
                ],
                APinvreason: [
                    { required: true, message: '驳回原因不能为空', trigger: 'blur' },
                ]
            }
        }
    },
    props: {
        ids:String,
        curDate: Date
    },
    components:{
        searchTable
    },
    watch: {
        curDate (newVal, oldVal) {
            const value = new Date(newVal).format('yyyy-MM-dd hh:mm:ss');
            this.formValidate.APrejectDate = value
        }
    },
    methods: {
        handleReset () {
            const t = this;
            t.clear();
            t.$emit('closeUp');
        },
        clear () {
            const t = this
            t.formValidate.APrejectDate = '';
            t.formValidate.APinvreason = '';
            t.$refs.formValidate.resetFields()
        },
        save () {
            const t = this;
            let data = deepCopy(t.formValidate);
            data._mt = t.$global.mt + 'EmpFlowEntr.setStatus';
            data.APlogType = '驳回';
            data.APids = t.ids;
            data.APflowState = 'reject02';
            if (data.APrejectDate !== undefined && data.APrejectDate !== '') {
                data.APrejectDate = new Date(data.APrejectDate).format('yyyy-MM-dd hh:mm:ss')
            }
            // console.log(data,"data");
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.btnLoading = true;
                    getDataLevelUserLoginData(data).then(res => {
                        if(isSuccess(res, t)) {
                            // console.log(res,"ressss");
                            if(res.data.content[0].value == '1') {
                                t.$Modal.success({
                                    title: t.$t('reminder.suc'),
                                    content: '处理成功',
                                })
                                t.clear();
                                t.$emit('closeUp',1);
                            }else {
                                t.$Modal.error({
                                    title: t.$t('reminder.err'),
                                    content: '处理失败',
                                })
                            }
                        }
                        t.btnLoading = false;
                    }).catch(() => {
                        t.btnLoading = false;
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/sass/updateAndAdd.scss";
// .cover .ivu-form-item {
//     margin-bottom: 0 !important;
// }
</style>