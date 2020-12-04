<template>
    <div class="cover">
        <div class="box"
             id="dragMainBox">
            <Spin size="large"
                  v-if="isSpin"
                  fix></Spin>
            <div class="title"
                 v-drag="`dragMainBox`">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="table_form"
                 ref="scrollBox"
                 @scroll="formScroll">
                <Form   ref="formValidate"
                        :model="formValidate"
                        :rules="ruleValidate"
                        :label-width="120">
                    <!-- <Row>
                        <i-col  span="10"
                                offset="1">
                            <FormItem label="候选人ID">
                                <Input v-model="formValidate.empName" placeholder="请输入员工ID" disabled />
                            </FormItem>
                        </i-col>
                        <i-col  span="10"
                                offset="1">
                            <FormItem label="姓名">
                                <Input v-model="formValidate.empName" placeholder="请输入姓名" disabled />
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col  span="10"
                                offset="1">
                            <FormItem label="业务单位">
                                <Input v-model="formValidate.entEmpsalunidDis" 
                                        placeholder="请选择业务单位"
                                        disabled 
                                        icon='ios-search'
                                        class="ios-search"
                                        readonly/>
                            </FormItem>
                        </i-col>
                        <i-col  span="10"
                                offset="1">
                            <FormItem label="部门">
                                <Input v-model="formValidate.deptIdDis" 
                                        placeholder="请选择部门"
                                        disabled 
                                        icon='ios-search'
                                        class="ios-search"
                                        readonly/>
                            </FormItem>
                        </i-col>
                    </Row> -->
                    <Row>
                        <!-- <i-col  span="10"
                                offset="1">
                            <FormItem label="岗位">
                                <Input v-model="formValidate.entEmppoidDis" 
                                        placeholder="请选择岗位"
                                        disabled 
                                        icon='ios-search'
                                        class="ios-search"
                                        readonly/>
                            </FormItem>
                        </i-col> -->
                        <i-col  span="10"
                                offset="1">
                            <FormItem label="社保缴纳地"
                                      prop="entSocial">
                                <span @dblclick="dubClearSec">
                                <Input v-model="entSocialDis" 
                                        @on-click="openModalSec"
                                        placeholder="请选择社保缴纳地"
                                        icon='ios-search'
                                        class="ios-search"
                                        readonly/>
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col  span="10"
                                offset="1">
                            <FormItem label="入职日期"
                                      prop="entEmpentime">
                                <DatePicker v-model="formValidate.entEmpentime"
                                            placeholder="请选择入职时间"
                                            type="date"
                                            style="width:100%"
                                            :transfer='true'
                                            :editable='false'></DatePicker>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <!-- <i-col  span="10"
                                offset="1">
                            <FormItem label="入职日期"
                                      prop="entEmpentime">
                                <DatePicker v-model="formValidate.entEmpentime"
                                            placeholder="请选择入职时间"
                                            type="date"
                                            style="width:100%"
                                            :transfer='true'
                                            :editable='false'></DatePicker>
                            </FormItem>
                        </i-col> -->
                        <i-col  span="10"
                                offset="1">
                            <FormItem label="报税地"
                                      prop="entEmptplacid">
                                <span @dblclick="dubClearTax">
                                <Input v-model="entEmptplacidDis" 
                                        placeholder="请选择社报税地" 
                                        @on-click="openModalTax"
                                        icon='ios-search'
                                        class="ios-search"
                                        readonly/>
                                </span>
                            </FormItem>
                        </i-col>
                        <i-col  span="10"
                                offset="1">
                            <FormItem label="工作地"
                                      prop="entEmpplaid">
                                <span @dblclick="dubClearWork">
                                <Input v-model="entEmpplaidDis" 
                                        placeholder="请选择工作地" 
                                        @on-click="openModalWork"
                                        icon='ios-search'
                                        class="ios-search"
                                        readonly/>
                                </span>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row>
                        <!-- <i-col  span="10"
                                offset="1">
                            <FormItem label="工作地"
                                      prop="entEmpplaid">
                                <span @dblclick="dubClearWork">
                                <Input v-model="entEmpplaidDis" 
                                        placeholder="请选择工作地" 
                                        @on-click="openModalWork"
                                        icon='ios-search'
                                        class="ios-search"
                                        readonly/>
                                </span>
                            </FormItem>
                        </i-col> -->
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
                            style="width:56px"
                            :loading="loading"
                            @click="save"><span v-if="!loading">{{$t('button.sav')}}</span></Button>
                </Row>
                </Col>
            </Row>
        </div>
        <transition name="fade">
            <searchCity v-show="openModal"
                        :title="title" 
                        @closeUp="closeUp"
                        @changeinputSec="changeinputSec" 
                        @changeinputTax="changeinputTax"
                        @changeinputWork="changeinputWork"
                        ref="searchCity"></searchCity>
        </transition>
    </div>
</template>

<script>
import searchCity from "@/components/searchTable/searchCityHx"
import { isSuccess, deepCopy } from "@/lib/util";
import { getDataLevelUserLoginData } from "@/axios/axios";
export default {
    data(){
        return {
            logType: '信息变更',
            isSpin: false,
            loading: false,
            openModal: false,
            updateId: null,
            isScorllY: null,
            title: '',
            entSocialDis: '',
            entEmptplacidDis: '',
            entEmpplaidDis: '',
            formValidate: {
                // empName: '',
                // entEmpsalunidDis: '',
                // deptIdDis: '',
                // entEmppoidDis: '',
                entEmpentime: '',
                entSocial: '',
                entEmptplacid: '',
                entEmpplaid: ''
            },
            ruleValidate: {
                entEmpentime: [
                    {required: true, type: 'date', message: '入职日期不能为空', trigger: 'change'}
                ],
                entSocial: [
                    {required: true, message: '社保缴纳地不能为空', trigger: 'change'}
                ],
                entEmptplacid: [
                    {required: true, message: '报税地不能为空', trigger: 'change'}
                ],
                entEmpplaid: [
                    {required: true, message: '工作地不能为空', trigger: 'change'}
                ],
            }
        }
    },
    props: {},
    components: {
        searchCity
    },
    methods: {
        getData (id) {
            const t = this;
            t.updateId = id;
            t.isSpin = true;
            t.loading = true;
            const data = {}
            data._mt = t.$global.mt + 'EmpFlowEntr.selMaemIds';
            data.APlogType = "修改";
            data.APid = id;
            getDataLevelUserLoginData(data).then(res => {
                if(isSuccess(res, t)) {
                    if(res.data.content[0].value) {
                        let data = res.data.content[0].value[0]
                        // console.log(data, "Data")
                        // t.formValidate.empName = data.empName
                        // t.formValidate.entEmpsalunidDis = data.entEmpsalunidDis
                        // t.formValidate.deptIdDis = data.deptIdDis
                        // t.formValidate.entEmppoidDis = data.entEmppoidDis
                        t.entSocialDis = data.entSocialDis
                        t.formValidate.entSocial = data.entSocial
                        t.entEmptplacidDis = data.entEmptplacidDis
                        t.formValidate.entEmptplacid = data.entEmptplacid
                        t.entEmpplaidDis = data.entEmpplaidDis
                        t.formValidate.entEmpplaid = data.entEmpplaid
                        t.formValidate.entEmpentime = data.entEmpentime
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.isSpin = false;
                t.loading = false;
            })
        },
        // 社保缴纳地
        openModalSec() {
            const t = this;
            t.title = '社保缴纳地';
            t.openModal = true;
            t.$nextTick(() => {
                t.$refs.searchCity.getData()
            })
        },
        changeinputSec(row) {
            const t = this;
            console.log(row, "row")
            t.entSocialDis = row.cityName;
            t.formValidate.entSocial = row.id;
        },
        dubClearSec() {
            const t = this;
            t.entSocialDis = '';
            t.formValidate.entSocial = '';
        },
        // 报税地
        openModalTax() {
            const t = this;
            t.title = '报税地';
            t.openModal = true;
            t.$nextTick(() => {
                t.$refs.searchCity.getData()
            })
        },
        changeinputTax(row) {
            const t = this;
            t.entEmptplacidDis = row.cityName;
            t.formValidate.entEmptplacid = row.id;
        },
        dubClearTax() {
            const t = this;
            t.entEmptplacidDis = '';
            t.formValidate.entEmptplacid = '';
        },
        // 工作地
        openModalWork() {
            const t = this;
            t.title = '工作地';
            t.openModal = true;
            t.$nextTick(() => {
                t.$refs.searchCity.getData()
            })
        },
        changeinputWork(row) {
            const t = this;
            t.entEmpplaidDis = row.cityName;
            t.formValidate.entEmpplaid = row.id;
        },
        dubClearWork() {
            const t = this;
            t.entEmpplaidDis = '';
            t.formValidate.entEmpplaid = '';
        },
        
        closeUp() {
            const t = this;
            t.openModal = false;
        },
        save () {
            const t = this;
            const data = deepCopy(t.formValidate);
            data._mt = t.$global.mt + 'EmpFlowEntr.updHire';
            data.APlogType = '保存';
            data.id = t.updateId;
            if(data.entEmpentime) {
                data.entEmpentime = new Date(data.entEmpentime).format('yyyy-MM-dd')
            }
            for(let dat in data) {
                if(!data[dat]) {
                    delete data[dat]
                }
            }
            t.$refs.formValidate.validate(valid => {
                if(valid) {
                    t.loading = true;
                    getDataLevelUserLoginData(data).then(res => {
                        if(isSuccess(res, t)) {
                            t.$Modal.success({
                                title: t.$t("reminder.suc"),
                                content: '保存成功'
                            })
                            this.$emit("closeUp");
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: t.$t("reminder.err"),
                            content: t.$t("reminder.errormessage")
                        });
                    }).finally(() => {
                        t.loading = false;
                    })  
                }
            })
        },
        handleReset () {
            this.$emit("closeUp");
        },
        clear () {
            t.updateId = ''
            // t.formValidate.empName = ''
            // t.formValidate.entEmpsalunidDis = ''
            // t.formValidate.deptIdDis = ''
            // t.formValidate.entEmppoidDis = ''
            t.entSocialDis = ''
            t.formValidate.entSocial = ''
            t.entEmptplacidDis = ''
            t.formValidate.entEmptplacid = ''
            t.entEmpplaidDis = ''
            t.formValidate.entEmpplaid = ''
            t.formValidate.entEmpentime = ''
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
}
</script>

<style lang="scss" scoped>
@import "~@/sass/updateAndAdd.scss";
.ios-search {
    cursor: pointer;
}
</style>