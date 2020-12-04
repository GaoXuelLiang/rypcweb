<template>
    <div class="option-main">
        <Spin size="large"                   fix
                                             v-if="spinShow"></Spin>
        <div class="form_box">
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  label-position="right"
                  :label-width="120">
                <Row>
                    <i-col span="10" offset="1">
                        <FormItem :label="$t('lang_flow.step.flstepDisorder')"
                                  prop="flstepDisorder">
                            <Input v-model="formValidate.flstepDisorder"
                                   :placeholder="$t('lang_flow.step.p_flstepDisorder')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem :label="$t('lang_flow.step.flstepFlow')"
                                  prop="flstepFlow">
                            <Input v-model="flstepFlowDis"
                                   readonly></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_flow.step.flstepCode')"
                              prop="flstepCode">
                        <span @dblclick="clearFlstepCode">
                            <Input v-model="formValidate.flstepCode"
                                :placeholder="$t('lang_flow.step.p_flstepCode')"
                            ></Input>
                        </span>
                    </FormItem>
                </i-col>
                <!-- <i-col span="21"></i-col> -->
                <i-col span="10"
                       offset="1">
                    <FormItem :label="$t('lang_flow.step.flstepCnName')"
                              prop="flstepCnName">
                        <Input v-model="formValidate.flstepCnName"
                               :placeholder="$t('lang_flow.step.p_flstepCnName')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_flow.step.flstepEnName')"
                              prop="flstepEnName">
                        <Input v-model="formValidate.flstepEnName"
                               :placeholder="$t('lang_flow.step.p_flstepEnName')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10"
                       offset="1">
                    <FormItem :label="$t('lang_flow.step.flstepStddealtime')"
                              prop="flstepStddealtime">
                        <Input v-model="formValidate.flstepStddealtime"
                               :placeholder="$t('lang_flow.step.p_flstepStddealtime')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_flow.step.flstepCaudealtime')"
                              prop="flstepCaudealtime">
                        <Input v-model="formValidate.flstepCaudealtime"
                               :placeholder="$t('lang_flow.step.p_flstepCaudealtime')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10"
                       offset="1"
                       prop="flstepIsapprove">
                    <!-- 是否审批节点  -->
                    <FormItem :label="$t('lang_flow.step.flstepIsapprove')" v-if="isApprove">
                        <RadioGroup v-model="formValidate.flstepIsapprove" type="button" size="small">
                            <Radio :label="item.paramCode"
                                   :disabled="true"
                                   v-for="(item,index) in yerOrNoOption"
                                   :key="index">{{item.paramInfoCn}}</Radio>
                        </RadioGroup>
                    </FormItem>
                </i-col>
                <i-col span="10" offset="1">
                    <!-- 审批定义 -->
                    <FormItem :label="$t('lang_flow.step.flstepApprove')"
                              prop="flstepApprove"
                              v-if="isApprove">
                        <span @dblclick="cleardb">
                            <Input v-model="flstepApproveDis"
                                   :placeholder="$t('lang_flow.step.p_flstepApprove')"
                                   icon="ios-search"
                                   :readonly="true"
                                   @on-click="pickData" />
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="21" offset="1">
                    <FormItem :label="$t('lang_flow.step.comment')"
                              prop="comment">
                        <Input v-model="formValidate.comment"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_flow.step.p_comment')"></Input>
                    </FormItem>
                </i-col>
            </Form>
            <Row>
                <i-col span="21" offset="1"
                       class="btn">
                    <Button @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                    <Button 
                            type="primary"
                            style="margin-left: 8px"
                            @click="save">{{$t('button.sav')}}</Button>
                </i-col>
            </Row>
        </div>
        <transition name="fade">
            <searchZHAndEn v-show="openPick0"
                            :searchText1="searchText01"
                            :searchText2="searchText02"
                            :searchTitle="searchTitle0"
                            :searchCloumns="searchCloumns0"
                            :params="params0"
                            @closeUp="closeTable"
                            @changeinput="changeinput0"
                            ref="searchZHAndEn"></searchZHAndEn>
        </transition>
        <transition name="fade">
            <searchTable v-show="openPick"
                         :searchTitle="searchTitle"
                         :searchText="searchText"
                         :searchCloumns="searchCloumns"
                         :params="params"
                         @closeUp="closeTable"
                         @changeinput="changeinput"
                         ref="searchTable"></searchTable>
        </transition>
    </div>
</template>
<script>
// import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import {getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchZHAndEn from '../../../components/searchTable/searchZHAndEn'
import searchTable from '../../../components/searchTable/searchAppTable'
import Bus from '../../../lib/bus'
export default {
    data () {
        return {
            spinShow: false,
            openPick0: false,
            openPick: false,
            yerOrNoOption: [],
            flstepFlowDis: '',
            flstepApproveDis: '',
            flstepIsapproveDis: '',
            isApprove: true,
            formValidate: {
                _mt:  this.$global.mt+'PlatFlowstep.addOrUpd',
                // funId: '1',
                flstepCode: '',
                flstepDisorder: '',
                flstepIsapprove: '',
                flstepCnName: '',
                flstepEnName: '',
                comment: '',
                nodeClass: '',
                flstepStddealtime: '',
                flstepCaudealtime: '',
            },
            ruleValidate: {
                flstepCode: [
                    { required: true, message: this.$t('lang_flow.step.rule_flstepCode'), trigger: 'blur' },
                ],
                flstepDisorder: [
                    { required: true, message: this.$t('lang_flow.step.rule_flstepDisorder'), trigger: 'blur' },
                ],
                flstepCnName: [
                    { required: true, message: this.$t('lang_flow.step.rule_flstepCnName'), trigger: 'blur' },
                ],
                flstepEnName: [
                    { required: true, message: this.$t('lang_flow.step.rule_flstepEnName'), trigger: 'blur' },
                ],
                flstepStddealtime: [
                    { required: true, message: this.$t('lang_flow.step.rule_flstepStddealtime'), trigger: 'blur' },
                ],
                flstepCaudealtime: [
                    { required: true, message: this.$t('lang_flow.step.rule_flstepCaudealtime'), trigger: 'blur' },
                ],
            },
            searchCloumns0: [
                {
                    title: this.$t('lang_sysform.promCloumns.lanCode'),
                    key: 'lanCode',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.promCloumns.lanCn'),
                    key: 'lanCn',
                    sortable: 'custom',
                    width: 253,
                },
                {
                    title: this.$t('lang_sysform.promCloumns.lanEn'),
                    key: 'lanEn',
                    sortable: 'custom',
                    width: 253,
                },
            ],
            searchCloumns: [
                {
                    title: this.$t('lang_flow.step.aprvCode'),
                    key: 'aprvCode',
                    width: 253,
                },
                {
                    title: this.$t('lang_flow.step.aprvName'),
                    key: 'aprvName',
                    width: 253,
                },
            ],
            searchTitle0: this.$t('lang_sysform.promCloumns.title'),
            searchText01: this.$t('lang_sysform.promCloumns.searchText2'),
            searchText02: this.$t('lang_sysform.promCloumns.searchText3'),
            searchTitle: this.$t('lang_flow.step.searchTitle'),
            searchText: this.$t('lang_flow.step.searchText'),
            params0: {
                _mt:  this.$global.mt+'BaseLang.getPage',
                APsort: 'lanCode',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
            },
            params: {
                _mt:  this.$global.mt+'PlatApproval.getPage',
                APsort: 'aprvCode',
                APorder: 'asc',
                AProws: 10,
                APpage: 1,
                APffk:'0',
                aprvStatus: '02valid',
            },
        }
    },
    components: {
        searchTable,
        searchZHAndEn
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        /*
        * 修改时初始数据
        * */
        getdata () {
            const t = this;
            t.spinShow = true;
            const data = {
                _mt:  this.$global.mt+'PlatFlowstep.getById',
                APid: t.$store.state.flowStepData.mainId,      //  步骤id
                // APfunId: '1',
                APlogType: this.$t('button.ser'),
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.flstepCode = res.data.content[0].flstepCode
                    t.formValidate.flstepDisorder = res.data.content[0].flstepDisorder
                    t.$store.commit('flowStepData/setflstepDisorder', res.data.content[0].flstepDisorder)
                    t.flstepFlowDis = res.data.content[0].flstepFlowDis
                    t.formValidate.flstepCnName = res.data.content[0].flstepCnName
                    t.formValidate.flstepEnName = res.data.content[0].flstepEnName
                    t.formValidate.flstepStddealtime = res.data.content[0].flstepStddealtime
                    t.formValidate.flstepCaudealtime = res.data.content[0].flstepCaudealtime
                    // t.formValidate.flstepIsapprove = res.data.content[0].flstepIsapprove
                    t.formValidate.flstepIsapprove = '1'
                    t.flstepIsapproveDis = res.data.content[0].flstepIsapproveDis
                    t.flstepApproveDis = res.data.content[0].flstepApproveDis
                    t.formValidate.comment = res.data.content[0].comment
                    t.formValidate.nodeClass = res.data.content[0].nodeClass
                    if (t.formValidate.nodeClass === 'approval') {
                        t.isApprove = true
                    } else {
                        t.isApprove = false
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false;
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.yerOrNoOption = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        pickData (param) {
            const t = this
            if(param==='flstepCode'){
                t.$refs.searchZHAndEn.getData(this.params0)
                t.openPick0 = true
            } else {
                t.openPick = true
                t.$refs.searchTable.getData(t.params)
            }
        },
        closeTable () {
            const t = this
            t.openPick = false
            t.openPick0 = false
        },
        changeinput0(row){
            const t = this
            t.formValidate.flstepCode = row.lanCode
            t.formValidate.flstepCnName = row.lanCn
            t.formValidate.flstepEnName =  row.lanEn
        },
        changeinput (name, id) {
            const t = this
            t.flstepApproveDis = name
            t.formValidate.flstepApprove = id
        },
        cleardb () {
            const t = this
            t.flstepApproveDis = ''
            t.formValidate.flstepApprove = ''
        },
        clearFlstepCode(){
            const t = this
            t.formValidate.flstepCode = ''
            t.formValidate.flstepCnName = ''
            t.formValidate.flstepEnName = ''
        },
        /*
        * 新增或者修改
        * */
       close (){
           this.$emit("close");
       },
        save () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.APlogType = '修改'
            data.id = t.$store.state.flowStepData.mainId
            data.flstepFlow = t.$store.state.flowStepData.flowId

            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginData(data).then((res) => {
                        if (isSuccess(res, t)) {
                            this.$store.commit('flowStepData/setflstepDisorder', res.data.content[0].flstepDisorder)
                            Bus.$emit('editText', res.data.content[0].flstepFlow) // 原来的流程 不动
                            this.$emit('editNodeFlowChart', res.data.content[0]) // 新加的流程
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: this.$t('reminder.updsuccess'),
                            })
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        clear () {
            this.formValidate.flstepCode = ''
            this.formValidate.flstepDisorder = ''
            this.flstepFlowDis = ''
            this.flstepCnName = ''
            this.flstepEnName = ''
            this.formValidate.flstepStddealtime = ''
            this.formValidate.flstepCaudealtime = ''
            this.formValidate.flstepIsapprove = ''
            this.flstepApproveDis = ''
            this.formValidate.comment = ''
            this.formValidate.nodeClass = ''
            this.$refs.formValidate.resetFields()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/mainChildUpdate.scss";
</style>
