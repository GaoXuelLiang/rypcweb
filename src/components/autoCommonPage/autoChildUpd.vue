<template>
    <div class="option-main">
        <Row class="form_box">
            <Spin size="large"
                  fix
                  v-if="loading"></Spin>
            <keep-alive>
                <commonSingleForm v-if="content"
                                  :formData1="formData"
                                  :tbName="tbName"
                                  :formlist="formlist"
                                  :logType="logType"
                                  :disabled="logType==$t('button.view')?true:false"
                                  :colseUpd='colseUpd'
                                  :isScorllY="isScorllY"
                                  @validateError="validateError"
                                  ref="commonSingleForm"></commonSingleForm>
            </keep-alive>
            <i-col span="21"
                   offset="1"
                   v-show="content">
                <Row type="flex"
                     justify="end"
                     :class="[isScorllY?'btnSize1':'btnSize']">
                    <Button @click="handleReset">{{$t('button.cal')}}</Button>
                    <Button type="primary"
                            @click="save"
                            v-if="logType !== $t('button.view')"
                            class="marginL-10">{{$t('button.sav')}}</Button>

                </Row>
            </i-col>
        </Row>
    </div>
</template>
<script>
import commonSingleForm from "./commonSingleForm";
import { isSuccess, deepCopy } from "@/lib/util";
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
    getDataLevelUserLogin3,
} from "@/axios/axios";
import { getDataLevelUserLoginData } from "@/axios/axios";
import validCode from "@/pages/common/commonCompanents/validCode";
import { autoUpd } from "@/mixins/autoUpd";
import { onChange } from './onChange/index'
export default {
    mixins: [autoUpd],
    data () {
        return {
            isScorllY: null,
            mainFileter: "",
        };
    },
    components: {
        commonSingleForm,
    },
    props: {
        index: Number,
    },
    mounted () { },
    computed: {
        logType () {
            return this.$store.state.autoCommonPage.logType;
        },
        mainId () {
            return this.$store.state.autoCommonPage.mainId;
        },
        funId () {
            return this.$store.state.user.funId
        }
    },
    methods: {
        // 接收公共form表单关闭弹窗样式等同handleReset
        colseUpd (data) {
            const t = this;
            if (t.logType == t.$t("button.add")) {
                t.$store.commit("autoCommonPage/setLogType", t.$t("button.y.upd"));
                t.$store.commit("autoCommonPage/setMainId", Number(data.id));
                t.$refs.commonSingleForm.getMaid(t.mainId);
                // 华夏员工新增特殊处理
                // if(t.tbName=='EmpBaseinfo'&&this.$global.mt=='xian'){
                //     this.$emit("closeUpd");
                //     this.$emit('hxEmpbaseinfo',data)
                // }else{
                //     t.$emit("getUpData", data, this.logType);
                // }
                 t.$emit("getUpData", data, this.logType);
            } else if (t.logType == t.$t("button.y.upd")) {
                t.$emit("updataTable", data);
            }
            t.setLocalField(data)
        },
        handleReset () {
            this.$emit("closeUpd");
        },
        //获取列
        getColumn (id) {
            console.log('主表主表')
            const t = this;
            t.loading = true;
            getDataLevelUserLoginData({
                _mt: this.$global.mt + "PlatAutoLayoutGetEdit.getEditColumn",
                APlogType: "修改",
            })
                .then((res) => {
                    t.localField = {}
                    t.formData = res.data.content[0];
                    t.tbName = res.data.content[0].tbName;
                    const allColumns = res.data.content[0].columns;
                    allColumns.forEach((item) => {
                        if (item.clmisqjvar == "1") {
                            t.localField[item.clmName] = ''
                        }
                    });
                    if (t.logType == t.$t("button.add")) {
                        this.content = true;
                        t.formlist = t.getFormDataSubmit(res.data.content[0].columns);
                        var formName = t.tbName + t.$global.mt
                        if (onChange.hasOwnProperty(formName)) {
                            setTimeout(()=>{
                                onChange[formName].all_dis.call(t)
                            },500)
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
        isEmpay (obj) {
            if (typeof obj == "undefined" || obj == null || obj == "") {
                return true;
            } else {
                return false;
            }
        },
        //获取数据
        getData (id, columns) {
            const t = this;
            getDataLevelUserLoginData({
                _mt: this.$global.mt + t.tbName + ".getById",
                APid: id,
                APffk: `gec${t.funId}`
            })
                .then((res) => {
                    const formData = res.data.content[0]
                    t.formlist = t.getFormDataSubmit(columns, res.data.content[0]);
                    t.setLocalField(formData)
                    var formName = t.tbName + t.$global.mt
                    if (onChange.hasOwnProperty(formName)) {
                        t.$nextTick(()=>{
                            onChange[formName].all_dis.call(t)
                        })
                    }
                    this.content = true;
                    t.isScorll();
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage") + '123',
                    });
                })
                .finally(() => {
                    t.loading = false;
                });
        },
        //设置全局变量
        setLocalField (formData) {
            for (let k in this.localField) {
                for (let i in formData) {
                    if (k === i) {
                        this.localField[k] = formData[i]
                    }
                }
            }
            // 存取全局变量
            this.$store.commit("flowClmkMap/setLocalField", this.localField);
        },
        // 是否超出滚动
        isScorll () {
            this.$nextTick(() => {
                const scroll = document.getElementsByClassName("form_list");
                scroll[0].scrollHeight > scroll[0].clientHeight ||
                    scroll[0].offsetHeight > scroll[0].clientHeight
                    ? (this.isScorllY = true)
                    : (this.isScorllY = false);
            });
        },
        //保存验证错误
        validateError () {
            this.$nextTick(function () {
                let tt = document.querySelectorAll(".ivu-form-item-error");
                this.$refs.commonSingleForm.$refs.scrollBox.scrollTop =
                    tt[0].parentNode.offsetTop;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import "~@/sass/mainChildUpdate.scss";
</style>
