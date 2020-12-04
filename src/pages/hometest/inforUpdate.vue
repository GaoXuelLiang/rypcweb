<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;{{$t('lang_homePage.msg.det')}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <Form ref="formValidate"
                  :model="formValidate"
                  :label-width="135">
                <Row>
                    <Col span="12">
                    <FormItem :label="$t('lang_homePage.messageList.noticbaseSource')">
                        <Input v-model="formValidate.type"
                               disabled></Input>
                    </FormItem>
                    </Col>
                    <Col span="10"
                         offset="1">
                    <FormItem :label="$t('lang_homePage.msg.date')">
                        <Input v-model="formValidate.date"
                               disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="23">
                    <FormItem :label="$t('lang_homePage.messageList.noticbaseTitle')">
                        <Input v-model="formValidate.tit"
                               disabled></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="23">
                    <FormItem :label="$t('lang_homePage.msg.inner')">
                        <div id="editor"
                             style="z-index: 0;"></div>
                        <div id="txt"
                             v-show="false"></div>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    </div>
</template>
<script>
import E from 'wangeditor'
import { getDataLevelUserLoginData } from "../../axios/axios";
import { isSuccess, deepCopy } from "../../lib/util";
let editor = new E('#editor')
export default {
    data () {
        return {
            id: Number,
            formValidate: {
                type: '',
                date: '',
                tit: '',
            },
        };
    },
    props: {
        logType: String
    },
    mounted () {
        editor.customConfig.onchange = function (html) {
            document.getElementById('txt').innerHTML = html
        }
        editor.create()
    },
    methods: {
        getData (id, type) {
            const t = this
            if (id) {
                t.id = id
                const data = {
                    APlogType: '详情',
                    APid: id
                }
                type == 1 ? data._mt = this.$global.mt + 'CmutNotic.getById' : data._mt = this.$global.mt + 'CmutKnowledge.getById'
                getDataLevelUserLoginData(data).then(res => {
                    if (isSuccess(res, t)) {
                        if (type == 1) {
                            t.formValidate.type = res.data.content[0].cmutNoticeTypeDis
                            t.formValidate.date = res.data.content[0].cmutNoticePublish
                            t.formValidate.tit = res.data.content[0].cmutNoticeTitle
                            editor.txt.append(res.data.content[0].cmutNoticeContent)
                        } else {
                            t.formValidate.type = res.data.content[0].cmutKldTypeDis
                            t.formValidate.date = res.data.content[0].cmutKldPublish
                            t.formValidate.tit = res.data.content[0].cmutKldTitle
                            editor.txt.append(res.data.content[0].cmutKldContent)
                        }
                    }
                }).catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage")
                    });
                });
            }
        },
        handleReset () {
            editor.txt.clear()
            this.$emit("close")
            this.$refs.formValidate.resetFields()
        }
    }
};
</script>
<style lang="scss" scoped>
.cover {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
        .form {
            max-height: 800px;
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
        .content {
            max-height: 400px;
            overflow: auto;
        }
    }
}
</style>
