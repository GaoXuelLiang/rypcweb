<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"                   fix
                                                 v-if="spinShow"></Spin>
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    步骤关系设置
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Row>
                    <Form ref="formValidate"
                          disabled
                          :model="formValidate"
                          label-position="right"
                          :label-width="135">
                        <i-col span="21"
                               offset="1">
                            <FormItem label="条件标题">
                                <Input v-model="formValidate.flsrelConditiontitle"
                                       placeholder="请输入条件标题..."></Input>
                            </FormItem>
                        </i-col>
                        <i-col span="21"
                               offset="1">
                            <FormItem label="条件">
                                <Input v-model="formValidate.flsrelConditionDis"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请设置生成条件..."
                                       class="settlement"></Input>
                                <Button type="primary"
                                        @click="generConditionNow(NaN,'条件设置')">条件设置</Button>
                            </FormItem>
                        </i-col>
                        <i-col span="21"
                               offset="1">
                            <FormItem label="流程步骤指向">
                                <Select clearable
                                        v-model="formValidate.flsrelRelatype"
                                        placeholder="请选择连线关系">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in select"
                                            :key="index">{{item.paramInfoName}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="21"
                               offset="1">
                            <FormItem label="同级步骤关系">
                                <Select clearable
                                        v-model="formValidate.flsrelRelatypetype"
                                        placeholder="请选择连线关系间的关系">
                                    <Option :value="item.paramCode"
                                            v-for="(item,index) in select1"
                                            :key="index">{{item.paramInfoName}}</Option>
                                </Select>
                            </FormItem>
                        </i-col>
                        <i-col span="21"
                               offset="1">
                            <FormItem label="备注">
                                <Input v-model="formValidate.comment"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注..."></Input>
                            </FormItem>
                        </i-col>
                        <!-- <i-col span="21"
                               offset="1">
                            <Row type="flex"
                                 justify="end">
                                <FormItem>
                                    <Button class="btn"
                                            type="primary"
                                            @click="save"
                                            disabled>{{$t('button.sav')}}</Button>
                                </FormItem>
                            </Row>
                        </i-col> -->
                    </Form>
                    <i-col span="21" offset="1">
                        <Row type="flex" justify="end" class="treebtn">
                            <Button @click="handleReset">{{$t('button.cal')}}</Button>
                        </Row>
                    </i-col>
                </Row>

            </div>
        </div>
        <transition name="fade">
            <genrCondition v-show="openCondition"
                           @inputCondition="inputCondition"
                           @closeCondition="closeCondition"
                           ref="genrCondition"></genrCondition>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import genrCondition from './genrCondition'
import Bus from '../../.././lib/bus'
export default {
    data () {
        return {
            spinShow: false,
            id: '', // 线的id
            transmitName: '',
            transmitValue: '',
            openCondition: false,
            select: [],
            select1: [],
            flsrelRelatypeDis: '',
            flsrelRelatypetypeDis: '',
            formValidate: {
                _mt:  this.$global.mt+'PlatFlsRelation.addOrUpd',
                funId: '1',
                flsrelConditiontitle: '',
                flsrelCondition: '',
                flsrelConditionDis: '',
                flsrelRelatype: '01forward',
                flsrelRelatypetype: '01and',
                comment: '',
            },
        }
    },
    components: {
        genrCondition,
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
                _mt:  this.$global.mt+'PlatFlsRelation.getById',
                id: t.id,      //  步骤id
                funId: '1',
                logType: this.$t('button.ser'),
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    this.formValidate.flsrelConditiontitle = res.data.content[0].flsrelConditiontitle
                    this.formValidate.flsrelCondition = res.data.content[0].flsrelCondition
                    this.formValidate.flsrelConditionDis = res.data.content[0].flsrelConditionDis
                    this.formValidate.flsrelRelatype = res.data.content[0].flsrelRelatype
                    this.formValidate.flsrelConditionDis = res.data.content[0].flsrelCondition
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
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'FlowStepType,FlowStepTypeType',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.select = res.data.content[0].value[0].paramList
                    t.select1 = res.data.content[0].value[1].paramList
                }
            }).catch(() => {
                //          this.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        /*
        * 新增或者修改
        * */
        save () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = '修改'
            data.id = t.id
            if (data.flsrelConditionDis === '') {
                data.flsrelCondition = ''
            }
            getDataLevelUserLoginNew(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.$emit('editLineFlowChart', data)
                    t.$emit('closeUp')
                    if (!t.id) {
                        t.$Modal.success({
                            title: this.$t('reminder.suc'),
                            content: this.$t('reminder.addsuccess'),
                        })
                    } else {
                        t.$Modal.success({
                            title: this.$t('reminder.suc'),
                            content: this.$t('reminder.updsuccess'),
                        })
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        setLineId (id) {
            this.id = id
            this.getdata()
        },
        handleReset () {
            this.$emit('closeUp')
        },
        clear () {
            this.formValidate.flsrelConditiontitle = ''
            this.formValidate.flstepCode = ''
            this.formValidate.flstepDisorder = ''
            this.formValidate.flsrelCondition = ''
            this.formValidate.flsrelConditionDis = ''
            this.flstepFlowDis = ''
            this.flstepCnName = ''
            this.flstepEnName = ''
            this.flstepIsapprove = ''
            this.flstepApproveDis = ''
            this.formValidate.comment = ''
            this.$refs.formValidate.resetFields()
        },
        generConditionNow (id) {
            const t = this
            if (t.formValidate.flsrelConditionDis && t.formValidate.flsrelCondition) {
                t.transmitName = t.formValidate.flsrelConditionDis
                t.transmitValue = t.formValidate.flsrelCondition
                t.$refs.genrCondition.getData(t.transmitName, t.transmitValue)
            }
            t.openCondition = true
        },
        closeCondition () {
            const t = this
            t.openCondition = false
        },
        inputCondition (name, value) {
            const t = this
            t.formValidate.flsrelCondition = value
            t.formValidate.flsrelConditionDis = name
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
</style>
