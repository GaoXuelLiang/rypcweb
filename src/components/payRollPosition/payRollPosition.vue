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
                    <Col span="21"
                         offset="1">
                    <FormItem label="确认意见"
                              prop="opinion">
                        <Input v-model="upFormData.opinion"
                               type="textarea"
                               placeholder="请输入确认意见，如果没问题，可不输"></Input>
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
                                    @click="handleSubmit"
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
                // opinion: [
                //     { required: true, message: "请输入确认意见", trigger: 'blur' },
                // ],
            },
            upFormData: {
                opinion: "",
            },
        };
    },
    components: {},
    props: {
        dom: Object,
        title: String,
        ids: Array
    },
    mounted () {
    },
    computed: {},
    methods: {
        handleSubmit () {
            const t = this;
            t.$refs.upFormData.validate((valid) => {
                if (valid) {
                    let status = "";
                    if (t.dom.homePageFiltering.indexOf('02salaryUnconfirmed') !== -1) {
                        status = "03salaryConfirmed"

                    } else if (t.dom.homePageFiltering.indexOf('01BPunconfirmed') !== -1) {
                        status = "06BPyesprincipalNo"
                    } else if (t.dom.homePageFiltering.indexOf('06BPyesprincipalNo') !== -1) {
                        status = "07companyHeadconfirmed"
                    }
                    let data = {
                        _mt: this.$global.mt + 'PayCphsdetail.setState',
                        APids: t.ids.toString(),
                        APlogType: '确认',
                        APopinion: t.upFormData.opinion,
                        APstatus: status
                    };
                    getDataLevelUserLoginData(
                        data
                    ).then((res) => {
                        if (isSuccess(res, t)) {
                            setTimeout(() => {
                                t.$Modal.success({
                                    title: t.$t('reminder.suc'),
                                    content: '成功',
                                })
                            }, 1200)
                            this.close();
                            t.dom.getData()
                        }
                    }).catch(() => {
                        setTimeout(() => {
                            t.$Modal.error({
                                title: t.$t('reminder.err'),
                                content: t.$t('reminder.errormessage'),
                            })
                        }, 1200)
                        this.close();

                    })
                }
            })
        },
        handleReset () {
            this.close();
        },
        close () {
            this.$emit("closePayOpinion");
            this.$refs.upFormData.resetFields();
            this.clear()
        },
        clear () {
            this.upFormData.opinion = "";
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
