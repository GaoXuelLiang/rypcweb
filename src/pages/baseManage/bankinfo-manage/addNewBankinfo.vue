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
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseBankinfo.bankCode')"
                              prop="bankCode">
                        <Input v-model="formValidate.bankCode"
                               :placeholder="$t('lang_baseManage.baseBankinfo.bankCodeDis')"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseBankinfo.bankCityName')"
                              prop="bankCityid">
                        <span @dblclick="clearCityid">
                            <Input v-model="bankCityName"
                                   icon="ios-search"
                                   :readonly="true"
                                   :placeholder="$t('lang_baseManage.baseBankinfo.bankCityNameDis')"
                                   @on-click="pickData" />
                        </span>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseBankinfo.bankCname')"
                              prop="bankCname">
                        <Input v-model="formValidate.bankCname"
                               :placeholder="$t('lang_baseManage.baseBankinfo.bankCnameDis')"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseBankinfo.bankEname')"
                              prop="bankEname">
                        <Input v-model="formValidate.bankEname"
                               :placeholder="$t('lang_baseManage.baseBankinfo.bankEnameDis')"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseBankinfo.bankCadd')"
                              prop="bankCadd">
                        <Input v-model="formValidate.bankCadd"
                               :placeholder="$t('lang_baseManage.baseBankinfo.bankCaddDis')"></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseBankinfo.bankEadd')"
                              prop="bankEadd">
                        <Input v-model="formValidate.bankEadd"
                               :placeholder="$t('lang_baseManage.baseBankinfo.bankEaddDis')"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseBankinfo.bankSwiftcode')"
                              prop="bankSwiftcode">
                        <Input v-model="formValidate.bankSwiftcode"
                               :placeholder="$t('lang_baseManage.baseBankinfo.bankSwiftcodeDis')"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <FormItem :label="$t('lang_baseManage.baseBankinfo.comment')"
                              prop="comment">
                        <Input v-model="formValidate.comment"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_baseManage.baseBankinfo.commentDis')"></Input>
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
                                    :loading="isSpin"
                                    @click="handleSubmit">{{$t('button.sav')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </div>
        <transition name="fade">
            <searchCity v-show="openPick"
                        :searchCloumns="searchCloumns"
                        :params="params"
                        @closeUp="close"
                        @changeinput="changeinput"
                        ref="searchCity"></searchCity>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchCity from '../../../components/searchTable/searchCity'

export default {
    data () {
        return {
            isSpin: false,
            updateImg: false,
            formValidate: {
                _mt:  this.$global.mt+'BaseBankinfo.addOrUpd',
                funId: '1',
                bankCode: '',
                bankCityid: '',
                bankCname: '',
                bankEname: '',
                bankCadd: '',
                bankEadd: '',
                bankSwiftcode: '',
                comment: '',
            },
            openPick: false,
            bankCityName: '',
            params: {
                _mt:  this.$global.mt+'BaseCity.getPage',
                sort: 'id',
                order: 'desc',
                rows: '10',
                page: '1',
                funId: '1',
                logType: this.$t('button.ser'),
                data: '{"cityType":"02city", "cityIsvalid" : "1"}',
            },
            searchCloumns: [
                {
                    title: this.$t('lang_baseManage.baseCity.cityName'),
                    key: 'cityName',
                    sortable: 'custom',
                    width: 380,
                },
                {
                    title: this.$t('lang_baseManage.baseCity.cityTypeName'),
                    key: 'cityTypeName',
                    sortable: 'custom',
                    width: 379,
                },
            ],
            ruleValidate: {
                bankCode: [
                    { required: true, message: this.$t('lang_baseManage.baseBankinfo.bankCodeDis'), trigger: 'blur' },
                ],
                bankCityid: [
                    { required: true, message: this.$t('lang_baseManage.baseBankinfo.bankCityNameDis'), trigger: 'blur' },
                ],
                bankCname: [
                    { required: true, message: this.$t('lang_baseManage.baseBankinfo.bankCnameDis'), trigger: 'blur' },
                ],
            },
        }
    },
    components: {
        searchCity,
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    updated () {

    },
    methods: {
        getData (id) {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseBankinfo.getById',
                id: id,
                logType: '根据id获取数据',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.formValidate.bankCode = res.data.content[0].bankCode
                    t.formValidate.bankCityid = res.data.content[0].bankCityid
                    t.bankCityName = res.data.content[0].bankCityName
                    t.formValidate.bankCname = res.data.content[0].bankCname
                    t.formValidate.bankEname = res.data.content[0].bankEname
                    t.formValidate.bankCadd = res.data.content[0].bankCadd
                    t.formValidate.bankEadd = res.data.content[0].bankEadd
                    t.formValidate.bankSwiftcode = res.data.content[0].bankSwiftcode
                    t.formValidate.comment = res.data.content[0].comment
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        updateimg () {
            this.updateImg = true
        },
        closeImg () {
            const t = this
            t.updateImg = false
        },
        render1 () {
            this.$Modal.confirm({
                ref: 'imgEdit',
                onOk: () => {
                    const formData = new FormData(document.getElementById('fileinput1'))
                    uploadimage(formData).then((res) => {
                        alert(res)
                    }).catch((res) => {
                        alert(res)
                    })
                },
                attrs: {
                    id: 'foo',
                },
                render: (h) => {
                    return h(imgEdit, {
                        props: {
                            value: this.value,
                        },
                        on: {
                            change: (val) => {
                                this.value = val
                            },
                        },

                    })
                },

            })
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
                    t.isSpin = true
                    getDataLevelUserLoginSenior(data).then((res) => {
                        t.isSpin = false
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
        close () {
            const t = this
            t.openPick = false
        },
        changeinput (name, id) {
            const t = this
            t.bankCityName = name
            t.formValidate.bankCityid = id
        },
        pickData () {
            const t = this
            t.$refs.searchCity.getData(this.params, '02city\',\'03county')
            t.openPick = true
        },
        clearCityid () {
            const t = this
            t.bankCityName = ''
            t.formValidate.bankCityid = ''
        },
        handleReset () {
            this.$emit('closeUp')
            this.$refs.formValidate.resetFields()
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
