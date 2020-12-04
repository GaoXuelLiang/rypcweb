<template>
    <div class="option-main">
        <Row class="form_box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"
                          style="margin-right: 10px;"></Icon>{{title}}
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
                    <Col span="11"
                         offset="1">
                    <FormItem label="更新系统标识"
                              prop="sysmark">
                        <Input v-model="upFormData.sysmark"
                               placeholder="请输入更新系统标识"></Input>
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
                sysmark: [
                    { required: true, message: "请输入更新系统标识", trigger: 'blur' },
                ],
            },
            upFormData: {
                sysmark: "",
            },
        };
    },
    components: {},
    props: {
        dom: Object,
        title: String,
        mtype: String
    },
    mounted () {
    },
    computed: {},
    methods: {
        isSubmit () {
            const t = this;
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: `请确定是否${t.title}`,
                onOk: () => {
                    t.handleSubmit()
                },
                onCancel: () => {
                },
            })
        },
        handleSubmit () {
            const t = this;
            t.$refs.upFormData.validate((valid) => {
                if (valid) {
                    let data = {
                        _mt: this.$global.mt + 'MasterDataPush.pushAll',
                        // APmtype: "orgUnit",
                        APmtype: t.mtype,
                        APsysmark: t.upFormData.sysmark
                    };
                    for (let v in data) {
                        if (data[v] === undefined || data[v] === '') {
                            delete data[v]
                        }
                    }
                    getDataLevelUserLoginData(data)
                        .then(res => {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value) {
                                    this.clear();
                                    this.close();
                                    t.dom.getData();
                                    t.dom.getTree();
                                    t.$Message.success({
                                        title: "成功",
                                        content: "推送主数据成功"
                                    });
                                } else {
                                    t.$Modal.error({
                                        title: this.$t("reminder.err"),
                                        content: "推送主数据失败"
                                    });
                                }

                            }
                        })
                        .catch(() => {
                            t.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage")
                            });
                        });

                }
            })
        },
        handleReset () {
            this.close();
        },
        close () {
            this.$emit("closePushUpdate");
            this.$refs.upFormData.resetFields();
            this.clear()
        },
        clear () {
            this.upFormData.sysmark = "";
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
    min-width: 1000px;
    overflow: auto;
    .form_box {
        position: relative;
        width: 1000px;
        background-color: #fff;
        padding: 60px 20px 0px 20px;
        border-radius: 10px;
        .form {
            max-height: 500px;
            overflow-y: auto;
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
