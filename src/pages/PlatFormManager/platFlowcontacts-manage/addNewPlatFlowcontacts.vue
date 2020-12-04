<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"fix v-if="spinShow"></Spin>
            <div class="title">
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
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="135">
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_platform.platFlowcontacts.flcontFormtype')"
                              prop="flcontFormtype"
                              :label-width="135">
                        <Select v-model="formValidate.flcontFormtype"
                                :placeholder="$t('lang_platform.platFlowcontacts.flcontFormtypeIns')">
                            <Option :value="item.paramCode"
                                    v-for="(item,index) in selectFormType"
                                    :key="index">{{item.paramInfoCn}}</Option>
                        </Select>
                    </FormItem>
                </i-col>
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_platform.platFlowcontacts.flcontFlowName')"
                              prop="flcontFlow"
                              v-show="formValidate.flcontFormtype === '01system'"
                              :label-width="135">
                        <span @dblclick="clearFlcontFlow">
                            <Input v-model="flcontFlowName"
                                   icon="ios-search"
                                   :readonly="true"
                                   :placeholder="$t('lang_platform.platFlowcontacts.flcontFlowNameIns')"
                                   @on-click="pickData" />
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_platform.platFlowcontacts.flcontMark')"
                              prop="flcontMark"
                              :label-width="135">
                        <Input v-model="formValidate.flcontMark"
                               :placeholder="$t('lang_platform.platFlowcontacts.flcontMarkIns')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_platform.platFlowcontacts.flcontName')"
                              prop="flcontName"
                              :label-width="135">
                        <Input v-model="formValidate.flcontName"
                               :placeholder="$t('lang_platform.platFlowcontacts.flcontNameIns')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10" offset="1">
                    <FormItem :label="$t('lang_platform.platFlowcontacts.flcontValueName')"
                              prop="flcontValue"
                              :label-width="135">
                        <span @dblclick="clearPlatFlowvar">
                            <Input v-model="flcontValueName"
                                   icon="ios-search"
                                   :readonly="true"
                                   :placeholder="$t('lang_platform.platFlowcontacts.flcontValueNameIns')"
                                   @on-click="pickData1" />
                        </span>
                    </FormItem>
                </i-col>
                <i-col span="21" offset="1">
                    <FormItem :label="$t('lang_platform.platFlowcontacts.comment')"
                              prop="comment"
                              :label-width="135">
                        <Input v-model="formValidate.comment"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_platform.platFlowcontacts.commentIns')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="21" offset="1">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button @click="handleReset"
                                    style="margin-left: 8px">{{$t('button.cal')}}</Button>
                            <Button type="primary"
                                    style="margin-left: 8px"
                                    @click="handleSubmit">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                </i-col>
            </Form>
        </div>
        <transition name="fade">
            <searchFlcontFlow v-show="openPick"
                              :searchCloumns="searchCloumns"
                              :params="params"
                              @closeUp="close"
                              @changeinput="changeinput"
                              ref="searchFlcontFlow"></searchFlcontFlow>
        </transition>
        <transition name="fade">
            <searchPlatFlowvar v-show="openPick1"
                               :searchCloumns="searchCloumns1"
                               :params="params1"
                               @closeUp="close1"
                               @changeinput="changeinput1"
                               ref="searchPlatFlowvar"></searchPlatFlowvar>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchFlcontFlow from '../../../components/searchTable/searchPlatSysform'
import searchPlatFlowvar from '../../../components/searchTable/searchPlatFlowvar'

export default {
    data () {
        return {
            spinShow: false,
            updateImg: false,
            selectFormType: [],
            formValidate: {
                _mt:  this.$global.mt+'PlatFlowcontacts.addOrUpd',
                funId: '1',
                flcontFlow: '',
                flcontFormtype: '',
                flcontName: '',
                flcontValue: '',
                flcontMark: '',
                comment: '',
            },
            openPick: false,
            openPick1: false,
            flcontFlowName: '',
            flcontValueName: '',
            params: {
                _mt:  this.$global.mt+'PlatSysform.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                logType: this.$t('button.ser'),
                data: '{}',
            },
            params1: {
                _mt:  this.$global.mt+'PlatFlowVar.getPage',
                sort: 'id',
                order: 'desc',
                rows: 10,
                page: 1,
                logType: this.$t('button.ser'),
                data: '{}',
            },
            searchCloumns: [
                {
                    title: this.$t('lang_platform.platFlowcontacts.sformName'),
                    key: 'sformName',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: this.$t('lang_platform.platFlowcontacts.sformTbname'),
                    key: 'sformTbname',
                    sortable: 'custom',
                    width: 379,
                },
            ],
            searchCloumns1: [
                {
                    title: this.$t('lang_platform.platFlowcontacts.flvarName'),
                    key: 'flvarName',
                    sortable: 'custom',
                    width: 379,
                },
                {
                    title: this.$t('lang_platform.platFlowcontacts.flvarMark'),
                    key: 'flvarMark',
                    sortable: 'custom',
                    width: 380,
                },
            ],
            ruleValidate: {
                flcontFormtype: [
                    { required: true, message: this.$t('lang_platform.platFlowcontacts.flcontFormtypeIns'), trigger: 'blur' },
                ],
                flcontFlow: [
                    { required: true, message: this.$t('lang_platform.platFlowcontacts.flcontFlowNameIns'), trigger: 'blur' },
                ],
                flcontMark: [
                    { required: true, message: this.$t('lang_platform.platFlowcontacts.flcontMarkIns'), trigger: 'blur' },
                ],
                flcontName: [
                    { required: true, message: this.$t('lang_platform.platFlowcontacts.flcontNameIns'), trigger: 'blur' },
                ],
            },
        }
    },
    components: {
        searchFlcontFlow,
        searchPlatFlowvar,
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    updated () {

    },
    mounted () {
        this.getSelect()
    },
    methods: {
        getData (id) {
            const t = this;
            t.spinShow = true;
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatFlowcontacts.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.flcontFormtype = res.data.content[0].flcontFormtype
                    t.formValidate.flcontFlow = res.data.content[0].flcontFlow
                    t.flcontFlowName = res.data.content[0].flcontFlowName
                    t.formValidate.flcontName = res.data.content[0].flcontName
                    t.formValidate.flcontMark = res.data.content[0].flcontMark
                    t.formValidate.flcontValue = res.data.content[0].flcontValue
                    t.flcontValueName = res.data.content[0].flcontValueName
                    t.formValidate.comment = res.data.content[0].comment
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                t.spinShow = false;
            })
        },
        updateimg () {
            this.updateImg = true
        },
        closeImg () {
            const t = this
            t.updateImg = false
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginSenior(data).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$refs.formValidate.resetFields()
                                t.$emit('getData', res.data.content[0])
                            } else {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.updsuccess'),
                                })
                                t.$emit('update', res.data.content[0])
                            }
                        }
                    }).catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        close () {
            const t = this
            t.openPick = false
        },
        close1 () {
            const t = this
            t.openPick1 = false
        },
        changeinput (name, id) {
            const t = this
            t.flcontFlowName = name
            t.formValidate.flcontFlow = id
        },
        changeinput1 (name, id) {
            const t = this
            t.flcontValueName = name
            t.formValidate.flcontValue = id
        },
        pickData () {
            const t = this
            t.$refs.searchFlcontFlow.getData(this.params)
            t.openPick = true
        },
        pickData1 () {
            const t = this
            t.$refs.searchPlatFlowvar.getData(this.params1)
            t.openPick1 = true
        },
        clearFlcontFlow () {
            const t = this
            t.flcontFlowName = ''
            t.formValidate.flcontFlow = ''
        },
        clearPlatFlowvar () {
            const t = this
            t.flcontValueName = ''
            t.formValidate.flcontValue = ''
        },
        handleReset () {
            this.$emit('closeUp')
            this.$refs.formValidate.resetFields()
        },
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'formtype',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectFormType = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
