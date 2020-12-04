<template>
    <div class="cover">
        <div class="box"
             id="dragMainBox">
            <Spin size="large"
                  v-if="loading"
                  fix></Spin>
            <div class="title"
                 v-drag="`dragMainBox`">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    {{logType}}
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="table_form"
                 ref="scrollBox"
                 @scroll="formScroll">
                <keep-alive>
                    <commonSingleForm v-if="content"
                                      :formData1="formData"
                                      :tbName="tbName"
                                      :formlist="formlist"
                                      :logType="logType"
                                      :colseUpd='colseUpd'
                                      :disabled="disabled"
                                      @validateError="validateError"
                                      ref="commonSingleForm"></commonSingleForm>
                </keep-alive>
            </div>
            <Row>
                <Col span="21"
                     offset="1">
                <Row type="flex"
                     justify="end"
                     :class="[isScorllY?'btnSize1':'btnSize']">
                    <Button @click="handleReset">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            v-if="!disabled"
                            @click="save">{{$t('button.sav')}}</Button>
                </Row>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import commonSingleForm from "./commonSingleForm";
import { isSuccess, deepCopy } from "@/lib/util";
import { getDataLevelUserLoginData } from "@/axios/axios";
import { autoUpd } from "@/mixins/autoUpd";
import { onChange } from './onChange/index'
export default {
    mixins: [autoUpd],
    data () {
        return {
            isScorllY: null,
            pid: "",
            pidVal: "",
        };
    },
    components: {
        commonSingleForm,
    },
    props: {
        logType: String,
        index: Number,
    },
    mounted () { },
    computed: {
        logType1 () {
            return this.$store.state.autoCommonPage.logType;
        },
        disabled () {
            if (this.logType1 === this.$t("button.view")) {
                return true;
            }
            if (this.logType === this.$t("button.view")) {
                return true;
            }
            return false;
        },
        funId () {
            if (this.$store.state.user.childFunId !== "") {
                return this.$store.state.user.childFunId;
            } else {
                return this.$store.state.user.funId;
            }
        },
        localField () {
            return  this.$store.state.flowClmkMap.localField;
        }

    },
    methods: {
        // 接收公共form表单关闭弹窗样式等同handleReset
        colseUpd (data) {
            const t = this;
            if (t.logType == t.$t("button.add")) {
                t.$emit("getUpData", data);
            } else if (t.logType == t.$t("button.y.upd")) {
                t.$emit("updataTable", data);
            }
            this.$emit("closeUpd");
            this.content = false;
        },
        // 关闭
        handleReset () {
            this.$emit("closeUpd");
            this.content = false;
        },
        // 获取配置项
        getColumn (id, pid, pidVal) {
            const t = this;
            t.loading = true;
            getDataLevelUserLoginData({
                _mt: this.$global.mt + "PlatAutoLayoutGetEdit.getEditColumn",
                APpkValue: id,
            })
                .then((res) => {
                    let localField = {};
                    t.pid = pid;
                    t.pidVal = pidVal;
                    t.formData = res.data.content[0];
                    t.tbName = res.data.content[0].tbName;
                    if (t.logType == t.$t("button.add")) {
                        this.content = true;
                        t.formlist = t.getFormDataSubmit(res.data.content[0].columns);
                        var formName = t.tbName + t.$global.mt
                        if (onChange.hasOwnProperty(formName)) {
                            onChange[formName].all_dis.call(t)
                        }
                        t.isScorll();
                    } else {
                        t.getData(id, res.data.content[0].columns);
                    }
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage"),
                    });
                })
                .finally(() => {
                    t.loading = false;
                });
        },
        // 获取form数据
        getData (id, columns) {
            const t = this;
            getDataLevelUserLoginData({
                _mt: this.$global.mt + t.tbName + ".getById",
                APid: id,
                APffk: `gec${t.funId}`
            })
                .then((res) => {
                    t.formlist = t.getFormDataSubmit(columns, res.data.content[0]);
                    var formName = t.tbName + t.$global.mt
                    if (onChange.hasOwnProperty(formName)) {
                        onChange[formName].all_dis.call(t)
                    }
                    this.content = true;
                    t.isScorll();
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage"),
                    });
                })
                .finally(() => {
                    t.loading = false;
                });
        },
        // 是否超出滚动
        isScorll () {
            this.$nextTick(() => {
                const scroll = document.getElementsByClassName("table_form");
                scroll[0].scrollHeight > scroll[0].clientHeight ||
                    scroll[0].offsetHeight > scroll[0].clientHeight
                    ? (this.isScorllY = true)
                    : (this.isScorllY = false);
            })
        },
        //保存验证错误
        validateError () {
            this.$nextTick(() => {
                let tt = document.querySelectorAll(".ivu-form-item-error");
                this.$refs.scrollBox.scrollTop = tt[0].parentNode.offsetTop;
            });
        },
        //form滚动事件
        formScroll () {
            let selectDom = document.getElementsByClassName("ivu-select-visible");
            let datePickerDom = document.getElementsByClassName(
                "ivu-date-picker-focused"
            );
            if (selectDom.length > 0 || datePickerDom.length > 0) {
                let modal = document.getElementsByClassName("cover")[0];
                modal.click();
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import "~@/sass/updateAndAdd.scss";
</style>
