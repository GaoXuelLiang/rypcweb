<template>
    <div class="cover">
        <div class="box">
             <Spin size="large" fix
                               v-if="spinShow"></Spin>
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
            <div class="option-main">
                <Row style="max-height: 420px;overflow-y: auto;">
                    <div ref="scrollBox" style="max-height: 420px;overflow-y: auto;">
                        <Form ref="formValidate"
                            :rules="ruleValidate"
                            :model="formValidate"
                            :label-width="135">
                            <Row>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="合同公司编码"
                                        prop="concompCode">
                                    <Input v-model="formValidate.concompCode"
                                        placeholder="合同公司编码"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                    offset="1">
                                <FormItem label="合同公司名称"
                                        prop="concompName">
                                    <Input v-model="formValidate.concompName"
                                        placeholder="请输入合同公司名称"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <i-col span="10"
                                    offset="1">
                                    <FormItem label="所属组织"
                                            prop="concompUnit" class="last-item">
                                        <!--               <span @dblclick="clearPid">-->
                                        <span @dblclick="clearUnit">
                                            <Input v-model="formValidate.concompUnitDis"
                                                icon="ios-search"
                                                :readonly="true"
                                                placeholder="所属组织"
                                                @on-click="selectComp" />
                                        </span>
                                    </FormItem>
                                </i-col>
                            </Row>
                        </Form>
                    </div>
                </Row>
            </div>
            <Row class="row">
                <i-col span="22" style="text-align:right;">
                    <Button @click="handleReset" style="margin-right: 8px">{{$t('button.cal')}}</Button>
                    <Button type="primary" :loading="isSpin"  @click="handleSubmit">{{$t('button.sav')}}</Button>
                </i-col>
            </Row>
        </div>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent=modiaContent
                         :dataParame=dataParame
                         dataType="row"
                         @changeinput="changeinput1"
                         urlType="loginNew">
        </autoSearchtable>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            showModal: false,
            modiaContent: 'org-org-std',
            dataParame: {},
            isSpin: false,
            selectType: [],
            id: Number,
            formValidate: {
                _mt:  this.$global.mt+'OrgContractcompany.addOrUpd',
                funId: '1',
                concompCode: '',
                concompName: '',
                concompUnit: '',
                concompUnitDis: '',
            },
            ruleValidate: {
                concompCode: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                ],
                concompName: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                concompUnit: [
                    { required: true, message: '请选择组织', trigger: 'change' },
                ],
            },
            spinShow: false
        }
    },
    props: {
        logType: String,
    },
    updated () { },
    mounted () { },
    methods: {
        getData (id) {
            const t = this
            t.spinShow = true
            if (id) {
                t.id = id
                getDataLevelUserLogin({
                    _mt:  this.$global.mt+'OrgContractcompany.getById',
                    logType: this.$t('button.y.upd'),
                    id: id,
                })
                    .then(res => {
                        if (isSuccess(res, t)) {
                            t.formValidate.concompCode = res.data.content[0].concompCode
                            t.formValidate.concompName = res.data.content[0].concompName
                            t.formValidate.concompUnitDis = res.data.content[0].concompUnitDis
                            t.formValidate.concompUnit = res.data.content[0].concompUnit
                        }
                    })
                    .catch(() => {
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    }).finally(() => {
                        t.spinShow = false
                    })
            }
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            this.$refs.formValidate.validate(valid => {
                if (valid) {
                    t.isSpin = true
                    if (t.logType === '修改') {
                        data.id = t.id
                    } else {
                        delete data.id
                    }
                    delete data.concompUnitDis
                    getDataLevelUserLoginNew(data)
                        .then(res => {
                            t.isSpin = false
                            if (isSuccess(res, t)) {
                                t.$emit('closeUpd')
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
                                t.clearDate()
                            }
                        })
                        .catch(() => {
                            t.isSpin = false
                            this.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
                    })
                }
            })
        },
        clearDate () {
            const t = this
            t.formValidate.concompUnitDis = ''
            t.formValidate.concompUnit = ''
        },
        handleReset () {
            const t = this
            t.clearDate()
            t.$emit('closeUpd')
            t.$refs.formValidate.resetFields()
        },
        selectComp () {
            const t = this
            // t.dataParame = {
            //   unitPid: 0,
            // }
            t.showModal = true
        },
        clearUnit () {
            const t = this
            t.formValidate.concompUnitDis = ''
            t.formValidate.concompUnit = ''
        },
        closeModal () {
            const t = this
            t.showModal = false
        },
        changeinput1 (row, type) {
            const t = this
            t.formValidate.concompUnitDis = row.unitsName
            t.formValidate.concompUnit = row.id
        },
    },
}
</script>
<style lang="scss" scoped>
 @import "../../../sass/updateAndAdd";
 .option-main {
    position: relative;
}
.last-item{
    margin-bottom: 0 !important;
}
.row{
    margin: 20px 0;
}
</style>
