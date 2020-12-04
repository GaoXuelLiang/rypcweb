<template>
    <div class="option-main">
        <Row class="form_box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"
                          style="margin-right: 10px;"></Icon>{{'安全验证'}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Form class="form"
                  ref="upFormData"
                  :model="upFormData"
                  :rules="ruleValidate"
                  :label-width="135">
                <Row>
                    <Col span="22">
                    <FormItem label="薪资查询密码"
                              prop="salaryPass">
                        <Input v-model="upFormData.salaryPass"
                               type="password"
                               placeholder="请输入薪资查询密码"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21"
                         offset="1">
                    <Row type="flex"
                         justify="end">
                        <FormItem>
                            <Button @click="handleReset">{{$t('button.cal')}}</Button>
                            <Button type="primary"
                                    @click="isSubmit"
                                    style="margin-left: 5px">{{$t('button.confirm')}}</Button>
                        </FormItem>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </Row>
    </div>
</template>
<script>
import { isSuccess, deepCopy } from "@/lib/util";
import { getDataLevelUserLoginData } from "@/axios/axios";
export default {
    data () {
        return {
            ruleValidate: {
                salaryPass: [
                    { required: true, message: "请输入薪资查询密码", trigger: 'blur' },
                ],
            },
            upFormData: {
                salaryPass: "",
            },
            closeStatus: "",
            openSalaryModel: false,
        };
    },
    components: {
    },
    props: {
        dataId: String,
        salaryId: String
    },
    mounted () {
    },
    computed: {
        empId () {
            return this.$store.state.user.empId;
        },
    },
    methods: {
        isSubmit () {
            const t = this;
            t.$refs.upFormData.validate((valid) => {
                if (valid) {
                    let data = {
                        _mt: this.$global.mt + 'BasePayrollpwd.checkPayroll',
                        APuserEmpId: t.empId
                    };
                    if (t.upFormData.salaryPass && t.upFormData.salaryPass !== "") {
                        data.APpwd = md5(t.upFormData.salaryPass)
                    }
                    for (let v in data) {
                        if (data[v] === undefined || data[v] === '') {
                            delete data[v]
                        }
                    }
                    getDataLevelUserLoginData(data)
                        .then(res => {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value === 1) {
                                    t.closeStatus = "ok"
                                    t.close();
                                } else {
                                    t.closeStatus = "err"
                                    t.clear()
                                    t.$Modal.error({
                                        title: this.$t("reminder.err"),
                                        content: "密码错误"
                                    });
                                }
                            }
                        })
                        .catch(() => {
                            t.close()
                            t.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage")
                            });
                        });

                }
            })
        },
        openSalary () {
            const t = this;
            t.openSalaryModel = true;
            t.$refs.autoSalary.lookSalary(t.salaryId, t.dataId);
        },
        closeSalaryModel () {
            const t = this;
            t.openSalaryModel = false;
        },
        handleReset () {
            this.close();
        },
        close () {
            this.$emit("closeSalaryPassUpd",this.closeStatus);
            this.closeStatus = "";
            this.clear()
        },
        clear () {
            this.closeStatus = "";
            this.upFormData.salaryPass = "";
            this.$refs.upFormData.resetFields();
        }
    }
};
</script>
<style lang="scss" scoped>
// @import "~@/sass/mainChildUpdate.scss";
.option-main {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    min-width: 500px;
    overflow: auto;
    .form_box {
        position: relative;
        width: 500px;
        background-color: #fff;
        padding: 60px 20px 0px 20px;
        border-radius: 10px;
        .form {
            max-height: 500px;
            overflow-y: auto;
            .speTip {
                background: #f5f5f5;
                margin: 10px 0;
                line-height: 30px;
            }
        }
        .title {
            display: flex;
            position: absolute;
            height: 40px;
            width: 100%;
            line-height: 40px;
            justify-content: space-between;
            align-items: center;
            padding-left: 20px;
            top: 0;
            border-bottom: 1px solid #efefef;
            left: 0;
            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
}
</style>
