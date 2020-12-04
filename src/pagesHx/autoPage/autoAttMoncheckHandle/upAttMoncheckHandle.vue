<template>
    <div class="cover">
        <div class="box">
            <div class="title"
                 v-drag="`dragMainBox`">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    考勤数据生成
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
                        <FormItem label="期间" prop="APperId">
                            <DatePicker v-model="formValidate.APperId" 
                                        type="month" 
                                        placeholder="请选择期间" 
                                        :transfer='true'></DatePicker>
                        </FormItem>
                    </i-col>
                    <i-col span="10" offset="1">
                        <span @dblclick="dblclick">
                        <FormItem label="业务单位" prop="APunIt">
                            <Input  v-model="unItDis"
                                    icon="ios-search"
                                    :readonly="true"
                                    placeholder="请选择业务单位"
                                    @on-click="pickData" />
                        </FormItem>
                        </span>
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
                            @click="save">
                                <span v-show="!btnLoading">生成</span>
                            </Button>
                </Row>
                </Col>
            </Row>
        </div>
        <transition name="fade">
            <searchTable v-show="openPick"
                         @closeUp="closeUp"
                         @changeinput="changeinput"
                         ref="searchTable"></searchTable>
        </transition>
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
            openPick:false,
            unItDis:'',
            formValidate :{
                _mt:this.$global.mt+'AttMoncheckHandle.inItData',
                APperId:'',
                APunIt:'',
                APattType:'hah'
            },
            ruleValidate: {
                APperId: [
                    { required: true, type: 'date', message: '期间不能为空', trigger: 'change' },
                ],
                APunIt: [
                   { required: true,  message: '业务单位不能为空', trigger: 'change' }, 
                ]
            },
        }
    },
    components:{
        searchTable
    },
    methods: {
        handleReset () {
            const t = this;
            t.clear();
            t.$emit('closeAttMon','0');
        },

        pickData () {
            const t = this;
            t.openPick = true;
            t.$refs.searchTable.getData();
        },
        changeinput (name, id) {
            console.log(name,id)
            const t = this;
            t.unItDis = name;
            t.formValidate.APunIt = id;
        },
        closeUp () {
            const t = this;
            t.openPick = false;
        },
        clear () {
            const t = this
            t.unItDis = '';
            t.formValidate.APperId = '';
            t.formValidate.APunIt = '';
            t.$refs.formValidate.resetFields()
        },
        dblclick(){
            const t = this;
            t.unItDis = '';
            t.formValidate.APunIt = '';
        },
        save () {
            const t = this;
            let data = deepCopy(t.formValidate);
            if (data.APperId !== undefined && data.APperId !== '') {
                data.APperId = new Date(data.APperId).format('yyyy-MM')
            }
            t.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.btnLoading = true;
                    getDataLevelUserLoginData(data).then(res => {
                        if(isSuccess(res, t)) {
                            console.log(res,"ressss");
                            if(res.data.content[0].value == '1') {
                                t.$Modal.success({
                                    title: t.$t('reminder.suc'),
                                    content: '处理成功',
                                })
                                t.$emit('closeAttMon','1');
                            }else {
                                t.$Modal.error({
                                    title: t.$t('reminder.err'),
                                    content: '处理失败',
                                })
                            }
                        }
                        setTimeout(() => {
                            t.btnLoading = false;
                        }, 500)
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