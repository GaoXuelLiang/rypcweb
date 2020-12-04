<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{logType}}薪资密码
                </div>
                <Button type="text"
                        @click="close">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Form ref="form"
                  class="form"
                  :model="form"
                  :rules="ruleValidate"
                  :width="135">
                <Row>
                    <Col span="22"
                         offset="1">
                        <FormItem prop="APpassword" v-if="showOldAPpassword">
                            <Input type="password"
                                v-model="form.APpassword"
                                placeholder="请输入原始密码">
                            <span slot="prepend">
                                <Icon :size="14"
                                    type="md-lock"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22"
                         offset="1">
                        <FormItem prop="APnewpwd1">
                            <Input type="password"
                                v-model="form.APnewpwd1"
                                placeholder="请输入新密码">
                            <span slot="prepend">
                                <Icon :size="14"
                                    type="md-lock"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22"
                         offset="1">
                        <FormItem prop="APnewpwd2">
                            <Input type="password"
                                v-model="form.APnewpwd2"
                                placeholder="请确认新密码">
                            <span slot="prepend">
                                <Icon :size="14"
                                    type="md-lock"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="22"
                         offset="1">
                        <FormItem class="no-margin">
                            <Row type="flex"
                                justify="end">
                                <Button @click="submit"
                                        type="primary">{{$t('button.sav')}}</Button>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData,getNoteCode, getDataLevelNone, getDataLevelUserLogin2 } from '../../axios/axios'
import { isSuccess, deepCopy, getCookie } from "../../lib/util";
import valid from "../../lib/pub_valid";

export default {
    data () {
        return {
            showOldAPpassword: true,
            logType: "",
            id: "",
            form: {
                APpassword: '',
                APnewpwd1: '',
                APnewpwd2: ''
            },
            ruleValidate: {
                APpassword: [
                    { required: true, message: '原始密码不能为空', trigger: 'blur' },
                ],
                APnewpwd1: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    { type: 'string', min: 6, message: '必须包含数字和字母,密码长度不能小于6', trigger: 'blur' },
                ],
                APnewpwd2: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    // { type: 'string', min: 6, message: '必须包含数字和字母,密码长度不能小于6', trigger: 'blur' },
                ],
            },
        }
    },
    props: {
        
    },
    methods: {
      getSalaryPass() {
        const t = this;
        const data = {
          _mt: this.$global.mt + "BasePayrollpwd.checkUser",
          APuserEmpId: t.userId,
        };
        getDataLevelUserLoginData(data)
          .then((res) => {
            if (isSuccess(res, t)) {
              if (res.data.content[0].value === -1) {
                t.showOldAPpassword = false;
                t.logType = "新增";
              } else {
                t.showOldAPpassword = true;
                t.logType = "修改";
                t.id = res.data.content[0].value;
              }
            }
          })
          .catch((err) => {
            t.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage"),
            });
          })
          .finally(() => {
            t.loading = false;
            t.isSpin = false;
          });
        },
        submit () {
            const t = this;
            let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z!@#$%^&*.\d]{6,20}$/
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (regx.test(t.form.APnewpwd1) && regx.test(t.form.APnewpwd2)) {
                            if (t.form.APnewpwd1 === t.form.APnewpwd2) {
                                t.save(t.logType);
                            } else {
                                this.$Modal.warning({
                                    title: this.$t('reminder.remind'),
                                    content: '确认新密码与新密码不一致',
                                })  
                            }
                        } else {
                            this.$Modal.warning({
                                title: this.$t('reminder.remind'),
                                content: '密码必须包含数字和字母',
                            })
                        }
                    }
                });
        },
        save (val) {
            const t = this;
            if (val === "新增") {
                let data = {
                    _mt: this.$global.mt + "BasePayrollpwd.addOrUpd",
                    APlogType: t.logType,
                    APfunId: t.userId,
                }
                data.paypwdEmpid = t.userId
                data.paypwdAuthuserid = md5(t.form.APnewpwd2)
                getDataLevelUserLoginData(data)
                    .then((res) => {
                        if (isSuccess(res, t)) {
                            t.close()
                            t.$Modal.success({
                                title: this.$t("reminder.suc"),
                                content: this.$t("reminder.savsuccess"),
                            });
                        }
                    })
                    .catch(() => {
                            t.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage"),
                            });
                    });
            } else {
                let data = {
                    _mt: this.$global.mt + "BasePayrollpwd.checkPwd",
                    APlogType: t.logType,
                    APfunId: t.userId,
                    APuserId: t.userId,
                    APid: t.id,
                }
                data.APbeforePwd = md5(t.form.APpassword);
                data.APnowPwd = md5(t.form.APnewpwd2)
                getDataLevelUserLoginData(data)
                    .then((res) => {
                        if (isSuccess(res, t)) {
                            if (res.data.content[0].value === 1) {
                                t.close()
                                t.$Modal.success({
                                    title: this.$t("reminder.suc"),
                                    content: this.$t("reminder.savsuccess"),
                                });
                            } else {
                                t.$Modal.warning({
                                    title: this.$t("reminder.remind"),
                                    content: '密码错误',
                                });
                            }
                        }
                    })
                    .catch(() => {
                        t.$Modal.error({
                            title: this.$t("reminder.err"),
                            content: this.$t("reminder.errormessage"),
                        });
                    });
            }
        },
        close () {
            this.$emit('salaryclose')
            this.clear()
        },
        clear () {
            const t = this;
            t.form.APpassword = "";
            t.form.APnewpwd1 = "";
            t.form.APnewpwd2 = "";
            this.$refs.form.resetFields()
        },
    },
    computed: {
        //角色
        userId () {
            return this.$store.state.user.empId;
        },
    },
}
</script>
<style lang="scss" scoped>
@import "../../sass/updateAndAdd.scss";
.cover .box {
    width: 500px;
}
.form {
    .captchaCode {
        width: 100%;
        height: 32px;
    }
    .captchaCode :hover {
        cursor: pointer;
    }
}
</style>
