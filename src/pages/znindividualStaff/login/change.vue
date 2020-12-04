<template>
    <div class="login-con"
         @keydown.enter="login">
        <div class="login_font">
            <span>{{$t('title')}}</span>
        </div>
        <Card :bordered="false">
            <p slot="title">
                <Icon type="md-log-in"></Icon>
                &nbsp;{{$t('lang_login.button.resetPassword')}}
            </p>
            <div class="form-con">
                <Form ref="loginForm"
                      :model="form"
                      :rules="rules">
                    <FormItem prop="userName"
                              class="form-item-border">
                        <Input v-model="form.userName"
                               class="inputStyle1"
                               :placeholder="$t('lang_login.enter.enterUName')">
                        <span slot="prepend">
                            <!-- <Icon :size="16" type="md-person"></Icon> -->
                            <img src="../../../static/img/icon-yong1.png"
                                 alt="">
                        </span>
                        </Input>
                    </FormItem>
                    <FormItem prop="noteCode"
                              class="form-item-border">
                        <Row class="form_code">
                            <Col span="13">
                            <Input v-model="form.noteCode"
                                   class="inputStyle1"
                                   :placeholder="$t('lang_login.enter.enterNCode')"
                                   @on-blur="captchaCheck()">
                            <span slot="prepend">
                                <!-- <Icon :size="16" type="ios-checkmark-circle"></Icon> -->
                                <img src="../../../static/img/icon-ypssd1.png"
                                     alt="">
                            </span>
                            </Input>
                            </Col>
                            <Col span="9"
                                 offset="2">
                            <div class="noteCode"
                                 @click="getNoteCode">
                                <img :src="noteCodeUrl" />
                            </div>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem prop="phoneCode"
                              class="form-item-border">
                        <Row>
                            <Col span="13">
                            <Input v-model="form.phoneCode"
                                   class="inputStyle1"
                                   :placeholder="$t('lang_login.enter.enterPCode')">
                            <span slot="prepend">
                                <!-- <Icon :size="16" type="ios-checkmark-circle"></Icon> -->
                                <img src="../../../static/img/icon-ypssd1.png"
                                     alt="">
                            </span>
                            </Input>
                            </Col>
                            <Col span="9"
                                 offset="2">
                            <Button style="padding:0"
                                    type="primary"
                                    long
                                    :disabled="time>0"
                                    @click="getPhoneCode">{{time>0?time+'s':$t('lang_login.button.getCode')}}</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem prop="password"
                              class="form-item-border">
                        <Input type="password"
                               class="inputStyle1"
                               v-model="form.password"
                               :placeholder="$t('lang_login.enter.enterNWord')">
                        <span slot="prepend">
                            <!-- <Icon :size="16" type="md-lock"></Icon> -->
                            <img src="../../../static/img/icon-pssd1.png"
                                 alt="">
                        </span>
                        </Input>
                    </FormItem>
                    <!--<FormItem prop="password2">-->
                    <!--<Input type="password" v-model="form.password2" placeholder="请确认新密码">-->
                    <!--<span slot="prepend">-->
                    <!--<Icon :size="14" type="locked"></Icon>-->
                    <!--</span>-->
                    <!--</Input>-->
                    <!--</FormItem>-->

                    <FormItem class="no-margin">
                        <Button class="btnClass"
                                @click="changepassword"
                                type="primary"
                                long>{{$t('lang_login.button.retrievePassword')}}</Button>
                    </FormItem>
                    <FormItem class="no-margin no-lineH">
                        <Row>
                            <!--              <Col span="12">-->
                            <!--              <router-link to="register">注册账号</router-link>-->
                            <!--              </Col>-->
                            <Col span="24"
                                 class="align-right">
                            <router-link to="login">{{$t('lang_login.button.returnLogon')}}</router-link>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>
</template>
<script>
import { getNoteCode, getDataLevelNone } from '../../axios/axios'
import { setCookie, isSuccess } from '../../lib/util'

export default {
    data () {
        return {
            time: 0,
            noteCodeUrl: '',
            noteCodeKey: '',
            deliveryId: '',
            form: {
                userName: '',
                password: '',
                password2: '',
                noteCode: '',
                phoneCode: '',
            },
            rules: {
                userName: [
                    { required: true, message: this.$t('lang_login.rules.rulesUName'), trigger: 'change' },
                ],
                password: [
                    { required: true, message: this.$t('lang_login.rules.rulesPWord'), trigger: 'change' },
                    { type: 'string', min: 6, message: this.$t('lang_login.rules.rulesFWord'), trigger: 'change' },
                ],
                noteCode: [
                    { required: true, message: this.$t('lang_login.rules.rulesECode'), trigger: 'change' },
                ],
                phoneCode: [
                    { required: true, message: this.$t('lang_login.rules.rulesECode'), trigger: 'change' },
                ],
            },
        }
    },
    computed: {

    },
    mounted () {
        this.getNoteCode()
    },
    methods: {
        getNoteCode () {
            const t = this
            getNoteCode().then((res) => {
                t.noteCodeUrl = res.data.content[0].imgUrl
                t.noteCodeKey = res.data.content[0].key
            }).catch(() => {

            })
        },
        getPhoneCode () {
            const t = this
            let userName
            let noteCode
            this.$refs.loginForm.validateField('userName', (valid) => {
                userName = valid === ''
            })
            this.$refs.loginForm.validateField('noteCode', (valid) => {
                noteCode = valid === ''
            })
            if (userName === true && noteCode === true) {
                this.timer(60, t)
                getDataLevelNone({
                    _mt: this.$global.mt + 'UserVericode.getvericode',
                    APcaptchaCode: t.form.noteCode,
                    APcaptid: t.noteCodeKey,
                    APchannelId: t.form.userName,
                    APflag: '2',
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.deliveryId = res.data.content[0].deliveryId
                        t.$Modal.success({
                            title: this.$t('reminder.suc'),
                            content: '验证码已发送',
                        })
                    }
                    //            t.getNoteCode()
                }).catch(() => {
                    //            t.getNoteCode()
                    t.$Modal.error({
                        title: this.$t('reminder.err'),
                        content: this.$t('reminder.errormessage'),
                    })
                })
            }
        },
        changepassword () {
            const t = this
            this.$refs.loginForm.validate(() => {
                let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z!@#$%^&*.\d]{6,20}$/
                if (regx.test(t.form.password)) {
                    getDataLevelNone({
                        _mt: this.$global.mt + 'UserInfo.getbackpwd',
                        APloginCode: t.form.userName,
                        APverifyCode: t.form.phoneCode,
                        APverifyid: t.deliveryId,
                        APcaptchaCode: t.form.noteCode,
                        APcaptid: t.noteCodeKey,
                        APnewpwd1: md5(t.form.password),
                    }).then((res) => {
                        if (isSuccess(res, t)) {
                            t.$Modal.success({
                                title: this.$t('reminder.suc'),
                                content: this.$t('reminder.updsuccess'),
                            })
                            this.$router.push('login')
                            t.getNoteCode()
                        }
                    }).catch(() => {
                        t.getNoteCode()
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                } else {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: this.$t('lang_login.rules.rulesFWord'),
                    })
                }
            })
        },

        captchaCheck () {
            const t = this
            getDataLevelNone({
                _mt: this.$global.mt + 'UserInfo.checkChangeCaptcha',
                APcaptchaCode: t.form.noteCode,
                APcaptid: t.noteCodeKey,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if ("success" !== res.data.content[0].value) {
                        this.form.noteCode = ''
                    }
                }
            }).catch(() => {
                //          t.$Modal.error({
                //            title: this.$t('reminder.err'),
                //            content: this.$t('reminder.errormessage'),
                //          })
            })
        },

        timer (wait, t) {
            if (wait === 0) {
                t.time = wait
            } else {
                t.time = wait
                wait--
                setTimeout(() => {
                    t.timer(wait, t)
                }, 1000)
            }
        },
    },
}
</script>
<style lang="">
.inputStyle1 input {
    background-color: transparent;
    border: none;
    color: white !important;
    font-size: 14px !important;
    letter-spacing: 1px;
    outline: none;
    box-shadow: none;
    border-radius: 0;
    padding-left: 8px;
}
.inputStyle1 input:active {
    outline: none;
    box-shadow: none;
    background-color: transparent;
    border: none;
}
.inputStyle1 input:hover {
    outline: none;
    box-shadow: none;
    outline-color: transparent;
    border: none;
    border-color: 0;
}
.inputStyle1 input:active {
    outline: none;
    box-shadow: none;
    background-color: transparent;
    outline-color: transparent;
    border: none;
}
.inputStyle1 input:focus {
    outline: none;
    box-shadow: none;
    background-color: transparent;
    outline-color: transparent;
    border: none;
}
.inputStyle1 input:after {
    outline: none;
    box-shadow: none;
    background-color: transparent;
    outline-color: transparent;
    border: none;
}
</style>
<style lang="scss" scoped>
.login-con {
    // position: absolute;
    // right: 140px;
    // top: 55.5%;
    // transform: translateY(-60%);
    // width: 300px;
    // height: 355px;
    // overflow: hidden;
    // border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -36%); /*向左向上分别平移自身的一半*/
    // -webkit-transform: translate(-50%, -36%);
    // -moz-transform: translate(-50%, -36%);
    transform: translate(-50%, -50%); /*向左向上分别平移自身的一半*/
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;//22.5
    border-radius: 5px;
    z-index: 1;
    .login_font {
        color: white;
        font-size: 2.375rem;
        text-align: center;
        line-height: 2.375rem;
        font-weight: bold;
        letter-spacing: 5px;
    }
    .ivu-card {
        width: 19.5%;//100 22.5
        height: 100%;
        margin:0 auto;//
        margin-top: 5%;//
        background-color: rgba(0, 12, 62, 0.6);
        text-align: center;
        border-radius: 4px;
        /deep/ .ivu-card-head {
            text-align: left;
            padding: 6% 8%;
            border-bottom-color: #00c0ff;
            p {
                color: #fff !important;
            }
        }
        /deep/ .ivu-card-body {
            padding: 12px 8% !important;//20px
        }
        .no-margin {
            margin: 0;
        }
        .no-lineH {
            margin-top: 20px;
            /deep/ .ivu-form-item-content {
                line-height: 1 !important;
            }
        }
    }
    .login-tip {
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
    }
}
.form_code {
    display: flex;
    align-items: flex-end;
}
.noteCode {
    text-align: end;
    img {
        width: 100%;
    }
}
.btnClass {
    height: 40px;
    font-size: 16px !important;
}
.noteCode :hover {
    cursor: pointer;
}
.form-item-border {
    border-bottom: 1px solid #00c0ff;
    padding-bottom: 3px;
}
/deep/ .ivu-input:focus {
    border: 0;
    box-shadow: none;
}

/deep/ .ivu-input-group-prepend {
    background-color: transparent !important ;
    border: none !important;
}
input:focus {
    background: transparent !important;
}

/deep/ input:-internal-autofill-selected {
    background-color: transparent !important;
}
/deep/ .ivu-form-item-error .ivu-input {
    border: none !important;
}
/deep/ .ivu-form-item-error .ivu-input:focus {
    // border-color: #ed4014;
    // outline: 0;
    box-shadow: none;
}
/deep/ .ivu-form-item {
    margin-bottom: 11%;
}
</style>
