<template>
    <div class="option-main">
        <Spin size="large"                   fix
                                             v-if="spinShow"></Spin>
        <div class="form_box"
             ref="scrollBox">
            <Form :model="form"
                  label-position="right"
                  :rules="ruleValidate"
                  ref="form"
                  :label-width="120">
                <Row>
                    <i-col span="10">
                        <FormItem :label="$t('lang_authorization.platRolecont.platRolecontCode')"
                                  prop="platRolecontCode">
                            <Input v-model="form.platRolecontCode"
                                   :placeholder="$t('lang_authorization.platRolecont.platRolecontCodeDis')"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1">
                        <FormItem label="角色名称"
                                  prop="platRolecontCnname">
                            <Input v-model="form.platRolecontCnname"
                                   placeholder="请输入角色名称"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <!--        <i-col span="11">-->
                    <!--          <FormItem :label="$t('lang_authorization.platRolecont.platRolecontEnname')" prop="platRolecontEnname">-->
                    <!--            <Input v-model="form.platRolecontEnname" :placeholder="$t('lang_authorization.platRolecont.platRolecontEnnameDis')" ></Input>-->
                    <!--            &lt;!&ndash;<Input v-model="form.platRolecontCnname" :placeholder="$t('lang_authorization.platRolecont.platRolecontCnnameDis')" ></Input>&ndash;&gt;-->
                    <!--          </FormItem>-->
                    <!--        </i-col>-->
                    <i-col span="21">
                        <FormItem :label="$t('lang_authorization.platRolecont.platRolecontDesc')"
                                  prop="platRolecontDesc">
                            <Input v-model="form.platRolecontDesc"
                                   type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}"
                                   :placeholder="$t('lang_authorization.platRolecont.platRolecontDescDis')"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row>
                    <i-col span="10">
                        <FormItem :label="$t('lang_authorization.platRolecont.platRolecontNotice')"
                                  prop="platRolecontNotice">
                            <Select v-model="form.platRolecontNotice"
                                    @on-change="selChangeNotice"
                                    :placeholder="$t('lang_authorization.platRolecont.platRolecontNoticeDis')"
                                    :transfer="true">
                                <Option :value="item.paramCode"
                                        v-for="(item,index) in tifymode"
                                        :key="index">{{item.paramInfoCn}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           v-show="this.form.platRolecontNotice === '02all' ?false : true">
                        <FormItem :label="$t('lang_authorization.platRolecont.platRolecontPhone')">
                            <Input v-model="form.platRolecontPhone"
                                   :placeholder="$t('lang_authorization.platRolecont.platRolecontPhoneDis')"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <i-col span="10"
                       v-show="this.form.platRolecontNotice === '02all' ?false : true">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontSms')">
                        <Input v-model="form.platRolecontSms"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontSmsDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10"
                       offset="1"
                       v-show="this.form.platRolecontNotice === '02all' ?false : true">
                    <FormItem label="统一联系人">
                        <Input v-model="form.platRolecontUnifiedcn"
                               placeholder="请输入统一联系人"></Input>
                    </FormItem>
                </i-col>
                <!--        <i-col span="11" v-show="this.form.platRolecontNotice === '02all' ?false : true">-->
                <!--          <FormItem :label="$t('lang_authorization.platRolecont.platRolecontCnname')">-->
                <!--            <Input v-model="form.platRolecontUnifieden" :placeholder="$t('lang_authorization.platRolecont.platRolecontCnnameDis')" ></Input>-->
                <!--          </FormItem>-->
                <!--        </i-col>-->
                <i-col span="10"
                       v-show="this.form.platRolecontNotice === '02all' ?false : true">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontMail')">
                        <Input v-model="form.platRolecontMail"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontMailDis')"></Input>
                    </FormItem>
                </i-col>
                <i-col span="10"
                       :offset="offsetVal">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontVaild')">
                        <RadioGroup v-model="form.platRolecontVaild"
                                    type="button"
                                    size="small"
                                    :placeholder="$t('lang_authorization.platRolecont.platRolecontVaildDis')">
                            <Radio :label="item.paramCode"
                                   v-for="(item,index) in radioYesOrNo"
                                   :key="index">{{item.paramInfoCn}}</Radio>
                        </RadioGroup>
                    </FormItem>
                </i-col>
                <i-col span="21">
                    <FormItem :label="$t('lang_authorization.platRolecont.platRolecontNote')"
                              prop="platRolecontNote">
                        <Input v-model="form.platRolecontNote"
                               type="textarea"
                               :autosize="{minRows: 2,maxRows: 5}"
                               :placeholder="$t('lang_authorization.platRolecont.platRolecontNoteDis')"></Input>
                    </FormItem>
                </i-col>
            </Form>
            <Row>
                <i-col span="21"
                       class="btn">
                    <Button @click="close">{{$t('button.cal')}}</Button>
                    <Button :loading="isSpin"
                            type="primary"
                            @click="save">{{$t('button.sav')}}</Button>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'

export default {
    data () {
        return {
            spinShow: false,
            childTableHeight: 0,
            isSpin: false,
            form: {
                _mt: this.$global.mt + 'PlatRolecontact.addOrUpd',
                funId: '1',
                platRolecontCode: '',
                platRolecontCnname: '',
                platRolecontEnname: '',
                platRolecontDesc: '',
                platRolecontNotice: '',
                platRolecontPhone: '',
                platRolecontSms: '',
                platRolecontUnifiedcn: '',
                platRolecontUnifieden: '',
                platRolecontMail: '',
                platRolecontVaild: '1',
                platRolecontNote: '',
            },
            radioYesOrNo: [],
            tifymode: [],
            offsetVal: 1,
            ruleValidate: {
                platRolecontCode: [
                    { required: true, message: this.$t('lang_authorization.platRolecont.platRolecontCodeDis'), trigger: 'blur' },
                ],
                platRolecontCnname: [
                    { required: true, message: this.$t('lang_authorization.platRolecont.platRolecontCnnameDis'), trigger: 'blur' },
                ],
                platRolecontEnname: [
                    { required: true, message: this.$t('lang_authorization.platRolecont.platRolecontEnnameDis'), trigger: 'blur' },
                ],
                platRolecontNotice: [
                    { required: true, message: this.$t('lang_authorization.platRolecont.platRolecontNoticeDis'), trigger: 'blur' },
                ],
            },
        }
    },
    props: {
        id: Number,
        logType: String,
        index: Number,
    },
    mounted () {
        this.getSelect()
    },
    methods: {
        close () {
            this.$emit('closeUp')
            //this.clear()
            this.clear()
        },
        getdata () {
            const t = this
            t.spinShow = true
            const params = {
                _mt: this.$global.mt + 'PlatRolecontact.getById',
                APid: t.$store.state.platRole.mainId,
            }
            getDataLevelUserLoginData(params).then((res) => {
                if (isSuccess(res, t)) {
                    this.form.platRolecontCode = res.data.content[0].platRolecontCode
                    this.form.platRolecontCnname = res.data.content[0].platRolecontCnname
                    this.form.platRolecontEnname = res.data.content[0].platRolecontEnname
                    this.form.platRolecontDesc = res.data.content[0].platRolecontDesc
                    this.form.platRolecontNotice = res.data.content[0].platRolecontNotice
                    this.form.platRolecontPhone = res.data.content[0].platRolecontPhone
                    this.form.platRolecontSms = res.data.content[0].platRolecontSms
                    this.form.platRolecontUnifiedcn = res.data.content[0].platRolecontUnifiedcn
                    this.form.platRolecontUnifieden = res.data.content[0].platRolecontUnifieden
                    this.form.platRolecontMail = res.data.content[0].platRolecontMail
                    this.form.platRolecontVaild = res.data.content[0].platRolecontVaild
                    this.form.platRolecontNote = res.data.content[0].platRolecontNote
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {
                this.spinShow = false
            })
        },
        save () {
            const t = this
            const data = deepCopy(t.form)
            if (t.$store.state.platRole.mainId) {
                data.id = t.$store.state.platRole.mainId
            }
            data.APlogType = t.logType
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                    t.isSpin = true
                    getDataLevelUserLoginData(data).then((res) => {
                        t.isSpin = false
                        if (isSuccess(res, t)) {
                            // 更新vuex中的mainId
                            t.$store.commit('platRole/setMainId', res.data.content[0].id)
                            //            alert(t.$store.state.platRole.mainId)
                            if (t.logType === this.$t('button.add')) {
                                t.$Modal.success({
                                    title: this.$t('reminder.suc'),
                                    content: this.$t('reminder.addsuccess'),
                                })
                                t.$emit('newdata', res.data.content[0])
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
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                } else {
                    t.$nextTick(() => {
                        let tt = document.querySelectorAll('.ivu-form-item-error')
                        // tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
                        t.$refs.scrollBox.scrollTop = tt[0].parentNode.offsetTop // 有滚动的滚动到未填项
                    })
                }
            })
        },
        getSelect () {
            const t = this
            getDataLevelUserLoginData({
                _mt: this.$global.mt + 'BaseParamInfo.getSelectValue',
                APtypeCode: 'yesno,contnotifymode',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.radioYesOrNo = res.data.content[0].value[0].paramList
                    t.tifymode = res.data.content[0].value[1].paramList
                }
            }).catch(() => {
                //          this.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },
        clear () {
            this.form.platRolecontCode = ''
            this.form.platRolecontCnname = ''
            this.form.platRolecontEnname = ''
            this.form.platRolecontDesc = ''
            this.form.platRolecontNotice = ''
            this.form.platRolecontPhone = ''
            this.form.platRolecontSms = ''
            this.form.platRolecontUnifiedcn = ''
            this.form.platRolecontUnifieden = ''
            this.form.platRolecontMail = ''
            this.form.platRolecontVaild = '1'
            this.form.platRolecontNote = ''
            this.offsetVal = 0
            this.$store.commit('platRole/setMainId', '')
            this.$refs.form.resetFields()
        },
        selChangeNotice () {
            const t = this
            if (t.form.platRolecontNotice === '02all') {
                t.offsetVal = 0
            } else {
                t.offsetVal = 1
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../../sass/mainChildUpdate.scss";
.btn {
    button {
        margin-left: 8px;
    }
}
/deep/ .ivu-radio-wrapper-checked {
    background: rgba(45, 140, 240, 1);
    color: #fff;
}
/deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
    color: #fff;
}
</style>
