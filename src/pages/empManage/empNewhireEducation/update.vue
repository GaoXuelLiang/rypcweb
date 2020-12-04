<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="option-main">
                <Row style="max-height: 420px;overflow-y: auto;">
                    <div ref="scrollBox"
                         style="max-height: 420px;overflow-y: auto;">
                        <Form ref="formValidate"
                              :model="formValidate"
                              :label-width="135">
                            <Row v-if="logType === '汇报人调整'">
                                <Col span="10"
                                     offset="1">
                                <FormItem label="汇报人">
                                    <Input placeholder="汇报人"
                                           v-model="formValidate.empcompBuspmpDis"
                                           @on-click="selectComp()" />
                                </FormItem>
                                </Col>
                            </Row>
                            <Row v-if="logType === '编制调整'">
                                <Col span="10"
                                     offset="1">
                                <FormItem label="编制类别">
                                    <span>
                                        <Select v-model="formValidate.empkiEstablishmentDis"
                                                placeholder="编制类别"
                                                @on-change="onChange">
                                            <Option :value="item.paramInfoName"
                                                    v-for="(item,index) in selectList1"
                                                    :key="index">{{item.paramInfoName}}</Option>
                                        </Select>
                                    </span>
                                </FormItem>
                                </Col>
                                <Col span="10"
                                     offset="1">
                                <FormItem label="管培生届数">
                                    <span>
                                        <Select v-model="formValidate.empkiTraineeounds"
                                                placeholder="请输入年度"
                                                disabled>
                                            <Option :value="item.fyYear"
                                                    v-for="(item,index) in selectFyear"
                                                    :key="index">{{item.fyYear}}</Option>
                                        </Select>
                                    </span>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <i-col span="10"
                                       offset="1">
                                    <FormItem label="生效时间">
                                        <DatePicker type="date"
                                                    placeholder="生效时间"
                                                    v-model="formValidate.eSdate"></DatePicker>
                                    </FormItem>
                                </i-col>
                                <i-col span="10"
                                       offset="1">
                                    <FormItem label="失效时间">
                                        <DatePicker type="date"
                                                    placeholder="失效时间"
                                                    v-model="formValidate.eEdate"></DatePicker>
                                    </FormItem>
                                </i-col>
                            </Row>
                            <row>
                                <Col span="21"
                                     offset="1">
                                <FormItem :label="labelDesc.ebpComment"
                                          prop="ebpComment"
                                          class="last-item">
                                    <Input v-model="formValidate.ebpComment"
                                           type="textarea"
                                           :autosize="{minRows: 2,maxRows: 5}"
                                           :placeholder="placeHolderDesc.ebpComment"></Input>
                                </FormItem>
                                </Col>
                            </row>
                        </Form>
                    </div>
                </Row>
            </div>
            <Row class="row">
                <i-col span="21"
                       offset="1"
                       style="text-align:right;">
                    <Button @click="handleReset">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            style="margin-left: 8px"
                            :loading="isSpin"
                            @click="handleSubmit">{{$t('button.sav')}}</Button>
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
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            labelDesc: {
                brkfCname: '',
                brkfAlias: '',
                brkfFirstname: '',
                brkfLastname: '',
                brkfIdtype: '',
                brkfIdno: '',
                brkfCompany: '',
                brkfDept: '',
                brkfPosition: '',
                brkfBusiarea: '',
                brkfBreaktype: '',
                brkfPunishtype: '',
                brkfPunishdate: '',
                brkfBreaklink: '',
                brkfRelieve: '',
                brkfRelievedate: '',
                brkfRelievelink: '',
                brkfStatus: '',
                brkfEbpid: '',
                ebpComment: '',
            },
            placeHolderDesc: {
                brkfCname: '',
                brkfAlias: '',
                brkfFirstname: '',
                brkfLastname: '',
                brkfIdtype: '',
                brkfIdno: '',
                brkfCompany: '',
                brkfDept: '',
                brkfPosition: '',
                brkfBusiarea: '',
                brkfBreaktype: '',
                brkfPunishtype: '',
                brkfPunishdate: '',
                brkfBreaklink: '',
                brkfRelieve: '',
                brkfRelievedate: '',
                brkfRelievelink: '',
                brkfStatus: '',
                brkfEbpid: '',
                ebpComment: '',
            },
            ruleDesc: {
                brkfCname: '',
                brkfAlias: '',
                brkfFirstname: '',
                brkfLastname: '',
                brkfIdtype: '',
                brkfIdno: '',
                brkfCompany: '',
                brkfDept: '',
                brkfPosition: '',
                brkfBusiarea: '',
                brkfBreaktype: '',
                brkfPunishtype: '',
                brkfPunishdate: '',
                brkfBreaklink: '',
                brkfRelieve: '',
                brkfRelievedate: '',
                brkfRelievelink: '',
                brkfStatus: '',
                brkfEbpid: '',
                ebpComment: '',
            },
            showModal: false,
            modiaContent: 'org-org-std',
            dataParame: {},
            isSpin: false,
            selectType: [],
            selectList1: [],
            id: Number,
            selectFyear: [],
            empkiEstablis: [],
            formValidate: {
                _mt: '',
                funId: '1',
                // 名字
                empName: '',
                // 汇报人
                empcompBuspmp: '',
                // 汇报人
                empcompBuspmpDis: '',
                // 编制类别
                empkiEstablishment: '',
                // 编制类别
                empkiEstablishmentDis: '',
                // 管培生界数
                empkiTraineeounds: '',
                // 开始时间
                eSdate: '',
                // 结束时间
                eEdate: '',
                // 备注
                ebpComment: '',
            },
        }
    },
    props: {
        logType: String,
    },
    updated () {
    },
    mounted () {
    },
    mouted () {
        //      this.getSelect()
        //      this.getFiscalYearSelect()
    },
    methods: {
        getData (id) {
            const t = this
            t.getSelect()
            t.getFiscalYearSelect()
            if (id) {
                t.id = id
                getDataLevelUserLoginData({
                    _mt: this.$global.mt + 'EmpAdjustAfterSS.getById',
                    APlogType: t.logType,
                    APid: id,
                }).then(res => {
                    //            console.log(res.data.content[0])
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].empkiEstablishment === '01occupy') {
                            t.formValidate.empkiEstablishmentDis = '占编'
                        } else if (res.data.content[0].empkiEstablishment === '02trainee') {
                            t.formValidate.empkiEstablishmentDis = '管培生'
                        } else if (res.data.content[0].empkiEstablishment === '03driver') {
                            t.formValidate.empkiEstablishmentDis = '司机'
                        } else if (res.data.content[0].empkiEstablishment === '04salor') {
                            t.formValidate.empkiEstablishmentDis = '项目销售/渠道岗'
                        } else if (res.data.content[0].empkiEstablishment === '05notocc') {
                            t.formValidate.empkiEstablishmentDis = '其他不占编'
                        }
                        console.log(res.data.content[0])
                        // 名字
                        t.formValidate.empName = res.data.content[0].empCname
                        // 汇报人
                        t.formValidate.empcompBuspmpDis = res.data.content[0].empcompBuspmpDis
                        // 编制类别
                        //              t.formValidate.empkiEstablishmentDis = res.data.content[0].paramInfoName
                        // 管培生界数
                        t.formValidate.empkiTraineeounds = res.data.content[0].empkiTraineeounds
                        // 开始时间
                        t.formValidate.eSdate = res.data.content[0].empctContractsdate
                        // 结束时间
                        t.formValidate.eEdate = res.data.content[0].empctContractedate
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        handleSubmit () {
            const t = this
            const data = deepCopy(t.formValidate)
            // 开始时间
            data.eSdate = new Date(t.formValidate.eSdate).format('yyyy-MM-dd')
            // 结束时间
            data.eEdate = new Date(t.formValidate.eEdate).format('yyyy-MM-dd')
            data.APlogType = t.logType
            if (t.logType === '汇报人调整') {
                data._mt = this.$global.mt + 'EmpAdjustAfterSS.updReport'
            }
            if (t.logType === '编制调整') {
                data._mt = this.$global.mt + 'EmpAdjustAfterSS.updCompile'
            }
            console.log(data)
            data.id = t.id
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginData(data).then((res) => {
                        console.log(res)
                        if (isSuccess(res, t)) {
                            t.$emit('closeUp')
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: this.$t('reminder.updsuccess'),
                            })
                            t.$emit('update', res.data.content[0])
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
            const t = this
            t.formValidate.empName = ''
            t.formValidate.empcompBuspmp = ''
            t.formValidate.empcompBuspmpDis = ''
            t.formValidate.empkiEstablishment = ''
            t.formValidate.empkiEstablishmentDis = ''
            t.formValidate.empkiTraineeounds = ''
            t.formValidate.eSdate = ''
            t.formValidate.eEdate = ''
            this.$refs.formValidate.resetFields()
            t.$emit('closeUpd')
        },
        selectComp () {
            const t = this
            t.modiaContent = 'emp-base-std'
            t.showModal = true
        },
        clearUnit () {
            const t = this
            t.formValidate.empName = ''
            t.formValidate.empcompBuspmp = ''
            t.formValidate.empcompBuspmpDis = ''
            t.formValidate.empkiEstablishment = ''
            t.formValidate.empkiEstablishmentDis = ''
            t.formValidate.empkiTraineeounds = ''
            t.formValidate.eSdate = ''
            t.formValidate.eEdate = ''
        },
        closeModal () {
            const t = this
            t.showModal = false
        },
        changeinput1 (row, type) {
            console.log(row)
            const t = this
            t.formValidate.empcompBuspmpDis = row.empName
            t.formValidate.empcompBuspmp = row.empcompBuspmp
        },
        onChange (inde) {
            const t = this
            if (inde === '占编') {
                t.formValidate.empkiEstablishment = t.empkiEstablis.empkiEstablis1
            } else if (inde === '管培生') {
                t.formValidate.empkiEstablishment = t.empkiEstablis.empkiEstablis2
            } else if (inde === '司机') {
                t.formValidate.empkiEstablishment = t.empkiEstablis.empkiEstablis3
            } else if (inde === '项目销售/渠道岗') {
                t.formValidate.empkiEstablishment = t.empkiEstablis.empkiEstablis4
            } else if (inde === '其他不占编') {
                t.formValidate.empkiEstablishment = t.empkiEstablis.empkiEstablis5
            }
        },
        // 获取年份
        getFiscalYearSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PlatFiscalyear.getSelectValue',
            }).then((res) => {
                t.selectFyear = res.data.content[0].value
            }).catch(() => {
                t.$Modal.error({
                    title: t.$t('reminder.err'),
                    content: t.$t('reminder.errormessage'),
                })
            })
        },
        // 获取编制类别
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'establishmenttype',
            }).then((res) => {
                console.log(res.data.content[0].value[0].paramList[0])
                t.empkiEstablis.empkiEstablis1 = res.data.content[0].value[0].paramList[0].paramCode
                t.empkiEstablis.empkiEstablis2 = res.data.content[0].value[0].paramList[1].paramCode
                t.empkiEstablis.empkiEstablis3 = res.data.content[0].value[0].paramList[2].paramCode
                t.empkiEstablis.empkiEstablis4 = res.data.content[0].value[0].paramList[3].paramCode
                t.empkiEstablis.empkiEstablis5 = res.data.content[0].value[0].paramList[4].paramCode
                console.log(t.empkiEstablis)
                if (isSuccess(res, t)) {
                    t.selectList1 = res.data.content[0].value[0].paramList
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
.option-main {
    position: relative;
}
.last-item {
    margin-bottom: 0 !important;
}
.row {
    margin: 20px 0;
}
.ivu-form {
    min-height: 220px;
}
</style>
