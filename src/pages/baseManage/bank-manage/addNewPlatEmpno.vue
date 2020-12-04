<template>
    <div class="cover">
        <div class="box">
            <Spin size="large"                   fix
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
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem label="编码"
                              prop="cpbkCode">
                        <Input v-model="formValidate.cpbkCode"
                               placeholder="编码"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem label="银行名称"
                              prop="cpbkName">
                        <Input v-model="formValidate.cpbkName"
                               placeholder="银行名称"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Col span="21"
                     offset="1">
                <FormItem label="公司范围"
                          prop="cpbkAreacomp">
                    <span @dblclick="clearData('cpbkAreacomp')">
                        <Input placeholder="公司范围"
                               icon="ios-search"
                               :readonly="true"
                               v-model="formValidate.cpbkAreacompDis"
                               @on-click="searchBncs" />
                    </span>
                </FormItem>
                </Col>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem label="备注"
                              prop="cpbkComment">
                        <Input v-model="formValidate.cpbkComment"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="备注"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button @click="handleReset"
                                    style="margin-left: 8px">{{$t('button.cal')}}</Button>
                            <Button type="primary"
                                    style="margin-left: 8px"
                                    :loading="isSpin"
                                    @click="handleSubmit">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <!--基准岗位-->
        <transition name="fade">
            <searchBnchCopm v-show="searchBnc"
                            :logType="logType"
                            @closeUpBn="closeUpBn"
                            :searchBnchClo="searchBnchClo"
                            @inputBnchClo="inputBnchClo"
                            :params="paramsBnchClo"
                            ref="searchBnchClo"></searchBnchCopm>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchBnchCopm from '../../../components/searchTable/searchBnchCopm'

export default {
    data () {
        return {
            spinShow: false,
            isSpin: false,
            searchBnc: false,
            selectType: [],
            formValidate: {
                _mt:  this.$global.mt+'BaseCompbankmapping.addOrUpd',
                funId: '1',
                cpbkCode: '',
                cpbkName: '',
                cpbkAreacomp: '',
                cpbkComment: '',
            },
            ruleValidate: {
                cpbkCode: [
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
                cpbkName: [
                    { required: true, message: '请输入银行名称', trigger: 'blur' },
                ],
                cpbkAreacomp: [
                    { required: true, message: '请输入公司范围', trigger: 'blur' },
                ],
            },
            paramsBnchClo: {
                _mt:  this.$global.mt+'OrgUnits.getByOrgFramePageList',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                logType: '查询',
                unitType: '01company,10area',
            },
            //     多选公司
            searchBnchClo: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '公司编码',
                    key: 'unitCode',
                },
                {
                    title: '公司名称',
                    key: 'unitsName',
                },
            ],
        }
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
    components: {
        searchBnchCopm,
    },
    methods: {
        //  	基准岗位
        searchBncs () {
            const t = this
            t.$refs.searchBnchClo.getData(this.paramsBnchClo)
            t.searchBnc = true
        },
        closeUpBn () {
            const t = this
            t.searchBnc = false
        },
        clearData () {

        },
        inputBnchClo (arr, arr1) {
            const t = this
            t.formValidate.cpbkAreacompDis = arr1.join()
            t.formValidate.cpbkAreacomp = arr.join()
            t.searchBnc = false
        },
        getData (id) {
            const t = this
            t.spinShow = true
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseCompbankmapping.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.cpbkCode = res.data.content[0].cpbkCode
                    t.formValidate.cpbkName = res.data.content[0].cpbkName
                    t.formValidate.cpbkAreacomp = res.data.content[0].cpbkAreacomp
                    t.formValidate.cpbkAreacompDis = res.data.content[0].cpbkAreacompDis
                    t.formValidate.cpbkComment = res.data.content[0].cpbkComment
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                this.spinShow = false
            })
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            data.logType = t.logType
            if (t.logType === this.$t('button.y.upd')) {
                data.id = t.id
            }
            for (let i in data) {
                if (data[i] === '') {
                    delete data[i]
                }
            }
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginSenior(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            t.handleReset()
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
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'yesno',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.selectType = res.data.content[0].value[0].paramList
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        handleReset () {
            this.$emit('closeUp')
            this.formValidate.cpbkAreacomp = ''
            this.formValidate.cpbkAreacompDis = ''
            this.$refs.formValidate.resetFields()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
