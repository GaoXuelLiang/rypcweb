<template>
    <div class="login-con"
         @keydown.enter="login">
        <div class="login-box">
            <!-- <div class="login-left">
          <img src="../../../static/img/back.png" alt="">
      </div> -->
            <div class="login_font">
                <span>{{$t('title')}}</span>
            </div>
            <div class="login-right">
                <div class="title"
                     v-if="this.$global.mt === 'znjs'">
                    <img class='znlogo'
                         src="../../../static/img/zn22logo.png"
                         alt="">
                </div>
                <div class="title"
                     v-if="this.$global.mt === 'xian'">
                    <img class='xalogo'
                         src="../../../static/img/hxlogo.png"
                         alt="">
                </div>
                <div class="changeLanguage" v-if="showLanguage">
                    <Dropdown trigger="hover"
                              @on-click="handleClickLangDropdown">
                        <a href="javascript:void(0)">
                            {{language}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="zh-CN">简体中文</DropdownItem>
                            <DropdownItem name="en-US">English</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div :class="[showLanguage ? 'login-form' : 'login-form-xian']">
                    <Form ref="loginForm"
                          :model="form"
                          :rules="rules">
                        <FormItem class="form-item-border"
                                  prop="userName">
                            <!-- <span><img src="../../../static/img/icon-yong.png" alt=""></span> -->
                            <Input class="inputStyle1"
                                   v-model="form.userName"
                                   :placeholder="$t('lang_login.enter.enterUName')">
                            <span slot="prepend">
                                <img src="../../../static/img/icon-yong1.png"
                                     alt="">
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password"
                                  class="form-item-border">
                            <Input type="password"
                                   class="inputStyle1"
                                   autocomplete="new-password"
                                   v-model="form.password"
                                   :placeholder="$t('lang_login.enter.enterPWord')">
                            <span slot="prepend">
                                <img src="../../../static/img/icon-pssd1.png"
                                     alt="">
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="noteCode"
                                  class="form-item-border">
                            <Row class="form_code">
                                <Col span="15">
                                <Input style="position: relative"
                                       class="inputStyle1"
                                       v-model="form.noteCode"
                                       :placeholder="$t('lang_login.enter.enterNCode')"
                                       @on-focus="captchaCheckfocus()"
                                       @on-blur="captchaCheck()">
                                <span slot="prepend">
                                    <img src="../../../static/img/icon-ypssd1.png"
                                         alt="">
                                </span>
                                </Input>
                                </Col>
                                <Col span="8"
                                     offset="1">
                                <div class="noteCode"
                                     @click="getNoteCode">
                                    <img :src="noteCodeUrl" />
                                </div>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem class="forgetPass">
                            <Row type="flex"
                                 justify="end">
                                <Col span="24">
                                <router-link to="change">{{$t('lang_login.button.forgetPassword')}}</router-link>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem class="loginBtn">
                            <Button class="btnClass"
                                    @click="login"
                                    long>{{$t('lang_login.button.login')}}</Button>
                        </FormItem>
                    </Form>
                </div>
                <!-- <Card :bordered="false">
          <p slot="title">
            <Icon type="md-log-in"></Icon>
            &nbsp;欢迎登录
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="userName">
                <Input v-model="form.userName" placeholder="请输入用户名">
                  <span slot="prepend">
                    <Icon :size="16" type="md-person"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
                  <span slot="prepend">
                    <Icon :size="16" type="md-lock"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="noteCode" style="margin-bottom: 20px">
                <Row>
                  <Col span="13">
                  <Input style="position: relative" v-model="form.noteCode" placeholder="请输入验证码" @on-focus="captchaCheckfocus()" @on-blur="captchaCheck()">
                    <span slot="prepend">
                      <Icon :size="16" type="ios-checkmark-circle"></Icon>
                    </span>
                  </Input>
                  <span v-show="noteCodeFlag" style="position: absolute;top: 28px;left: 0;color:#ed3f14;">验证码输入有误</span>
                  </Col>
                  <Col span="9" offset="2">
                  <div class="noteCode" @click="getNoteCode">
                    <img :src="noteCodeUrl" />
                  </div>
                  </Col>
                </Row>
              </FormItem>
              <FormItem class="no-margin" style="margin-bottom: 10px">
                <Button @click="login" type="primary" long>登录</Button>
              </FormItem>
              <FormItem class="no-margin">
                <Row> -->
                <!--              <Col span="12">-->
                <!--                <router-link to="register">注册账号</router-link>-->
                <!--              </Col>-->
                <!--              <Col span="12" class="align-right">-->
                <!--                <router-link to="change">忘记密码</router-link>-->
                <!--              </Col>-->
                <!-- </Row>
              </FormItem>
            </Form>
          </div>
        </Card> -->
            </div>
        </div>
    </div>
</template>
<script>
import { getNoteCode, getDataLevelNone } from '../../axios/axios'
import { setCookie, isSuccess, getCookie } from '../../lib/util'

export default {
    data () {
        return {
            entryLoginUrl: '',
            language: '',
            noteCodeUrl: '',
            noteCodeKey: '',
            noteCodeFlag: false,
            form: {
                userName: '',
                password: '',
                noteCode: '',
            },
            rules: {
                userName: [
                    { required: true, message: this.$t('lang_login.rules.rulesUName'), trigger: 'change' },
                ],
                password: [
                    { required: true, message: this.$t('lang_login.rules.rulesPWord'), trigger: 'change' },
                ],
                noteCode: [
                    { required: true, message: this.$t('lang_login.rules.rulesNCode'), trigger: 'change' },
                ],
            },
        }
    },
    mounted () {
        this.getNoteCode()
        if (getCookie('useName') && getCookie('useName') != 'undefined') {
            this.form.userName = getCookie('useName')
        }
        this.language = this.$store.state.app.lang == null ? '简体中文' : (this.$store.state.app.lang === 'en-US' ? 'English' : '简体中文');
        // console.log(this.$store.state.app)
    },
    computed: {
        showLanguage () {//华夏不显示多语言
            if(this.$global.mt === 'xian') {
                return false
            }
            if(this.$global.mt === 'znjs') {
                return true
            }
        }
    },
    watch: {
        //监听语言切换
        language: function (valN, valO) {
            if (valO === '') {
                return
            }
            this.setFormRules();
        },
    },
    methods: {
        getNoteCode () {
            this.form.noteCode = ''
            const t = this
            getNoteCode().then((res) => {
                t.noteCodeUrl = res.data.content[0].imgUrl
                t.noteCodeKey = res.data.content[0].key
            }).catch(() => {

            })
        },
        login () {
            const t = this
            this.$refs.loginForm.validate((valid) => {
                t.$global.paramsName
                if (valid) {
                    let obj = {
                        _mt: 'hrssc' + 'UserInfo.login',
                        APloginCode: t.form.userName,
                        APpassword: md5(t.form.password),
                        APcaptchaCode: t.form.noteCode,
                        APcaptid: t.noteCodeKey,
                    }
                    getDataLevelNone(obj).then((res) => {
                        t.form.noteCode = ''
                        if (isSuccess(res, t)) {
                            t.$store.commit('setChildFunId', '')
                            setCookie('wtk', res.data.content[0].webToken)
                            localStorage.setItem('_tk', res.data.content[0].token)
                            setCookie('useId', res.data.content[0].uid)
                            setCookie('useName', t.form.userName)
                            t.$store.commit('setName', res.data.content[0].username)
                            t.$store.commit('setUserId', res.data.content[0].uid)
                            let userTheme = ''
                            if(t.$global.mt === 'xian') {
                                userTheme = 'red'
                            }else {
                                userTheme = 'greenBlack'
                            }
                            t.$store.commit('setuserThemes', (res.data.content[0].userThemes ? res.data.content[0].userThemes : userTheme))
                            if (res.data.content[0].hasOwnProperty('userFinalCompny')) {
                                t.$store.commit('setCompanyId', res.data.content[0].userFinalCompny)
                            } else {
                                t.$store.commit('setCompanyId', '1000')
                            }
                            if (res.data.content[0].hasOwnProperty("userFinalroletype")) {
                                t.$store.commit('setRoleType', res.data.content[0].userFinalroletype)
                            }
                            if (localStorage.getItem('roleType') === null) {
                                // t.$store.commit('setRoleType', '3user')
                            } else {
                                t.$store.commit('setRoleType', localStorage.getItem('roleType'))
                            }
                            // 保存新员工入职url链接
                            if (res.data.content[0].lastLoginUrl) {
                                this.$Modal.error({
                                    title: this.$t('reminder.err'),
                                    content: '员工还未入职成功',
                                })
                                // t.$router.push('/individualStaffMange')
                                // t.$store.commit('setEntryLoginUrl', t.entryLoginUrl.split('#')[1])
                            } else {
                                t.$router.push('/')
                            }
                        }
                        t.getNoteCode()
                    }).catch(() => {
                        t.getNoteCode()
                        this.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    })
                }
            })
        },
        captchaCheck () {
            const t = this
            getDataLevelNone({
                _mt: 'hrssc' + 'UserInfo.checkChangeCaptcha',
                APcaptchaCode: t.form.noteCode,
                APcaptid: t.noteCodeKey,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    if ("success" !== res.data.content[0].value) {
                        this.form.noteCode = ''
                        this.noteCodeFlag = true
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        },
        captchaCheckfocus () {
            this.noteCodeFlag = false
        },
        // // 中英文切换
        handleClickLangDropdown (name) {
            if (name === 'zh-CN') {
                localStorage.setItem('lang', 'zh-CN');
                this.language = '简体中文';
            } else if (name === 'en-US') {
                localStorage.setItem('lang', 'en-US');
                this.language = 'English';
            }
            this.$store.commit('setLang', name)
        },
        // 中英文切换更新表单验证
        setFormRules () {
            this.rules = {
                userName: [
                    { required: true, message: this.$t('lang_login.rules.rulesUName'), trigger: 'change' },
                ],
                password: [
                    { required: true, message: this.$t('lang_login.rules.rulesPWord'), trigger: 'change' },
                ],
                noteCode: [
                    { required: true, message: this.$t('lang_login.rules.rulesNCode'), trigger: 'change' },
                ],
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

.inputStyle1 input:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    background-color: transparent;
    background-image: none;
    color: #fff;
    transition: background-color 50000s ease-in-out 0s;
}
</style>
<style lang="scss" scoped>
.login-box {
    //display: flex;
    //box-shadow: 0 0 10px #408DD4;
    // .login-left{
    //   border-radius: 5px 0 0 5px;
    // }
    .login_font {
        color: white;
        font-size: 2.375rem;
        text-align: center;
        line-height: 2.375rem;
        font-weight: bold;
        letter-spacing: 5px;
    }
    .login-right {
        // padding: 10% 8% 8% 8%;
        padding: 2%;
        margin: 0 auto; //
        margin-top: 5%; //
        width: 19.5%; //100 22.5
        height: 100%;
        background-color: rgba(0, 12, 62, 0.6);
        text-align: center;
        border-radius: 4px;
        .title {
            margin-bottom: 8%; //10
            .xalogo {
                width: 55%;
            }
            .znlogo {
                width: 75%;
            }
        }
        .changeLanguage .ivu-dropdown {
            font-size: 14px !important;
            color: #fff !important;

            a {
                color: #fff;
            }
        }
        .login-form {
            margin-top: -13px; //35
            .forgetPass {
                text-align: right;
                margin-top: 8%;
                a {
                    color: #16d4db;
                }
            }
            .loginBtn {
                margin-top: 2%;
            }
        }
        .login-form-xian {
            .forgetPass {
                text-align: right;
                margin-top: 8%;
                a {
                    color: #16d4db;
                }
            }
            .loginBtn {
                margin-top: 2%;
            }
        }
        .form_code {
            display: flex;
            align-items: flex-end;
        }
    }
}
/deep/ .ivu-dropdown {
    position: relative;

    .ivu-select-dropdown {
        width: 100%;
        ul {
            min-width: 100%;
            .ivu-dropdown-item {
                padding: 7px 0;
            }
        }
    }
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
    margin-top: 11%;
    margin-bottom: 0;
}
.btnClass {
    font-size: 16px !important;
    height: 40px;
    color: white;
    outline: none;
    border: none;
    background-color: #037cd9;
}
.btnClass:hover {
    background: #2d8cf0;
}
.form-item-border {
    border-bottom: 1px solid #00c0ff;
    padding-bottom: 3px;
}
.login-con {
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
    width: 100%; //22.5
    border-radius: 5px;
    z-index: 1;
    // .login-tip{
    //   font-size: 10px;
    //   text-align: center;
    //   color: #c3c3c3;
    // }
}
.noteCode {
    text-align: end;
    img {
        width: 100%;
    }
}
/deep/ .ivu-input-group-prepend {
    padding: 0;
}
.noteCode :hover {
    cursor: pointer;
}
</style>
