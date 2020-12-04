<template>
    <div class="cover">
        <div class="box">
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
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="10">
                    <FormItem :label="labelDesc.baseStgeptNo"
                              prop="baseStgeptNo">
                        <Input v-model="formValidate.baseStgeptNo"
                               :disabled="logType == '查看'"
                               :placeholder="placeHolderDesc.baseStgeptNo"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="labelDesc.baseStgeptProperty"
                              prop="baseStgeptProperty">
                        <Input v-model="formValidate.baseStgeptProperty"
                               :disabled="logType == '查看'"
                               :placeholder="placeHolderDesc.baseStgeptProperty"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21">
                    <FormItem :label="labelDesc.baseStgeptDesc"
                              prop="baseStgeptDesc">
                        <Input v-model="formValidate.baseStgeptDesc"
                               type="textarea"
                               :disabled="logType == '查看'"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="placeHolderDesc.baseStgeptDesc"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem :label="labelDesc.baseStgeptLogdesfrmtDis"
                              prop="baseStgeptLogdesfrmt">
                        <span @dblclick="dblist">
                            <Input v-model="baseStgeptLogdesfrmtDis"
                                   :disabled="logType == '查看'"
                                   @on-click="selectlist"
                                   placeholder="请选择日志脱敏格式"
                                   icon="ios-search"
                                   :readonly="true" />
                        </span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                    <FormItem :label="labelDesc.baseStgeptStatusDis"
                              prop="baseStgeptStatusDis">
                        <Input v-model="formValidate.baseStgeptStatusDis"
                               disabled
                               :placeholder="placeHolderDesc.baseStgeptStatusDis"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="labelDesc.baseStgeptVdate"
                              prop="baseStgeptVdate">
                        <DatePicker v-model="formValidate.baseStgeptVdate"
                                    disabled
                                    readonly
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="生效时间"
                                    style="width: 100%"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21">
                    <FormItem :label="labelDesc.comment"
                              prop="comment">
                        <Input v-model="formValidate.comment"
                               type="textarea"
                               :disabled="logType == '查看'"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="placeHolderDesc.comment"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button @click="handleReset"
                                    style="margin-left: 8px">{{$t('button.cal')}}</Button>
                            <Button :disabled="disabled"
                                    type="primary"
                                    @click="handleSubmit">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <updateStorage ref="updateStorage"
                       v-show="showUpdate"
                       @changeinput="changeinput"
                       @closelist="closelist"></updateStorage>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '@/axios/axios'
import validChenck from '@/lib/pub_valid'
import { isSuccess, deepCopy } from '@/lib/util'
import updateStorage from './updateStorage'
export default {
    data () {
        const syssmsNocheck = (rule, value, callbackFun) => {
            if (validChenck.val_number101(value)) {
                return callbackFun()
            }
            return callbackFun(new Error(rule.message))
        }
        return {
            disabled: false,
            formValidate: {
                _mt:  this.$global.mt+'BaseStoragencrypt.addOrUpd',
                baseStgeptNo: '',
                baseStgeptProperty: '',
                baseStgeptDesc: '',
                baseStgeptLogdesfrmt: '',
                baseStgeptStatusDis: '编辑中',
                baseStgeptVdate: '',
                comment: '',
                baseStgeptStatus: '01draft',
            },
            baseStgeptLogdesfrmtDis: '',
            ruleValidate: {
                baseStgeptProperty: [
                    { required: true, message: '请输入字段属性', trigger: 'blur' },
                ],
                baseStgeptNo: [
                    { required: true, message: '请输入序号', trigger: 'blur' },
                    { validator: syssmsNocheck, message: '请输入正整数', trigger: 'blur' },
                ],
                baseStgeptDesc: [
                    { required: true, message: '请输入安全说明', trigger: 'blur' },
                ],
                baseStgeptLogdesfrmt: [
                    { required: true, message: '请选择日志脱敏格式', trigger: 'change' },
                ]
            },
            list: [],
            showUpdate: false,
        }
    },
    components: {
        updateStorage
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
        labelDesc: Object,
        placeHolderDesc: Object,
    },
    methods: {
        getData (id) {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseStoragencrypt.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.baseStgeptNo = res.data.content[0].baseStgeptNo
                    t.formValidate.baseStgeptProperty = res.data.content[0].baseStgeptProperty
                    t.formValidate.baseStgeptDesc = res.data.content[0].baseStgeptDesc
                    t.formValidate.baseStgeptLogdesfrmt = res.data.content[0].baseStgeptLogdesfrmt
                    t.formValidate.baseStgeptStatusDis = res.data.content[0].baseStgeptStatusDis
                    t.formValidate.baseStgeptVdate = res.data.content[0].baseStgeptVdate
                    t.formValidate.comment = res.data.content[0].comment
                    t.baseStgeptLogdesfrmtDis = res.data.content[0].baseStgeptLogdesfrmtDis
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            if (data.baseStgeptVdate) {
                data.baseStgeptVdate = new Date(data.baseStgeptVdate).format('yyyy-MM-dd hh:mm')
            }
            t.$refs.formValidate.validate((valid) => {
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
                                t.$emit('newData', res.data.content[0])
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
        handleReset () {
            this.$emit('closeUp')
            this.baseStgeptLogdesfrmtDis = ''
            this.$refs.formValidate.resetFields()
        },
        // 弹出
        selectlist () {
            const t = this
            if (t.logType == '查看') {
                return
            }
            t.showUpdate = true
            t.$refs.updateStorage.getData()
        },
        dblist () {
            const t = this
            if (t.logType == '查看') {
                return
            }
            t.baseStgeptLogdesfrmtDis = ''
            t.formValidate.baseStgeptLogdesfrmt = ''
        },
        changeinput (row) {
            const t = this
            t.baseStgeptLogdesfrmtDis = row.baseDesfmtName
            t.formValidate.baseStgeptLogdesfrmt = row.id
        },
        closelist () {
            this.showUpdate = false
        }
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
