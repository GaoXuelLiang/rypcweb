import autoinput from "./autoinput"; // 普通input
import autopsdInput from "./autopsdInput"; // 密码框
import autonumber from "./autonumber"; // 数字输入框
import autodatepicker from "./autodatepicker"; // 日期选择框
import monthYear from "@/pages/common/commonCompanents/monthYear"; // 日期年月
import autoyearQuarter from "@/pages/common/commonCompanents/autoyearQuarter"; // 日期年季度
import autodatetime from "./autodatetime"; // 日期时间选择框
import autodateyear from "./autodateyear"; // 日期时间框  只能选择年
import autodaterange from "./autodaterange"; // 日期时间框  只能选择年
import autodisc from "./autodisc"; // 描述信息
import autoeditor from "./autoeditor"; // 富文本编辑器
import autolonginput from "./autolonginput"; // 长文本框
import automodal from "./automodal"; // 弹出选择（不可手填）
import automodaledit from "./automodaledit"; // 弹出选择（可以手写）
import automodalmany from "./automodalmany"; // 弹出选择多选
import automodalmanyDel from "./automodalmanyDel"; // 弹出选择多选加删除  目前用于基准岗位
import autoradio from "./autoradio"; // 单选框
import autocheckbox from "./autocheckbox"; // 单个多选框
import autoselect from "./autoselect"; // 下拉选择框
import autotextarea from "./autotextarea"; // 文本域
import autoupload from "./autoupload"; // 上传文件
import autoSingleUpload from "./autoSingleUpload";
import autophotoupload from "./autophotoupload"; // 上传照片
import autocheckgroup from "./autocheckgroup"; // 多选框group
import autocheckcol1 from "./autocheckcol1"; //多选框group 1列
import autocheckcol3 from "./autocheckcol3"; //多选框group 3列
import autoMap from "./autoMap"; // 选择地图
import automodalAccept from "@/pages/common/commonCompanents/automodalAccept"; // HRBP对接人
import autouploadqys from "@/pages/common/commonCompanents/autouploadqys"; // 契约锁
import autoTag from "./autoTag"; // tag
import validCode from "./validCode";
import { getDataLevelUserLoginNew } from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import { onChange } from "../onChange/index";
import Bus from "../bus";
/**
 * 挂载特殊处理组件
 */
/**
 * payroll 组件
 */

import empWorkExperience from "./empWorkExperience/empWorkExperience";
import educationInfo from "./empEducationInfos/educationInfo";
import familyInfo from "./familyInfo/familyInfo";

import handldinfo from "./empFlowDimission/empFlowDimission";
import handoverContent2 from "./empFlowDimission/empFlowDimission2";
import handoverContent3 from "./empFlowDimission/empFlowDimission3";
import handoverContent4 from "./empFlowDimission/empFlowDimission4";
import trsflowContent from "./trsflowContent/trsflowContent";
import trsflowContent2 from "./trsflowContent/trsflowContent2";

import empReport from "./empReport/empReport";

import empEvaluation from "./empEvaluation/empEvaluation";

import empEvaluation1 from "./empEvaluation1/empEvaluation";
import empEvaluation2 from "./empEvaluation2/empEvaluation";

import historyContract from "./historyContract/historyContract";
import approvalRecord from "./approvalSteps/approvalSteps"; // 员工转正流程（审批步骤-审批步骤）

import travelInformation from "./travelInformation/travelInformation";
import additional from "./repairCard/repairCard"; // 补卡流程--补卡信息

export default {
    data () {
        return {
            formDataSubmit: this.formlist.form,
            formshow: deepCopy(this.formlist.form),
            dis: deepCopy(this.formlist.dis),
            clmMap: this.formlist.clmmap,
            ruler: this.formlist.ruler,
            show: this.formlist.showEvents,
            setVal: this.formlist.setValEvents,
            formData: this.formData1
        };
    },
    props: {
        formData1: Object,
        formlist: Object,
        lebWidth: {
            type: Number,
            default: 130
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tbName: String,
        pklv: String, // 主表id
        formParentfield: String, // 主表字段名
        customRouter: String, // 特殊布局组件路由
        flowInfo: Object, // 流程信息，包括流程id、数据id、步骤id、步骤名称等，可根据业务增加
        dataBlockName: String, //数据块名称
        roleContrl: Object // table表格按钮的控制
    },
    created () {
        // this.getFormDataSubmit();
    },
    mounted () {
        /*
         * 解决富文本编辑器zindex问题
         * */
        let nodes = document.getElementsByClassName("ivu-select-dropdown");
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.zIndex = 10002;
        }
        Bus.setData(this.formDataSubmit);
        this.initShowHide();
    },
    components: {
        autoinput,
        autopsdInput,
        autonumber,
        autodatepicker,
        autodatetime,
        autodateyear,
        autodisc,
        autoeditor,
        autolonginput,
        automodal,
        automodaledit,
        automodalmany,
        automodalmanyDel,
        autoradio,
        autocheckbox,
        autoselect,
        autotextarea,
        autoupload,
        autophotoupload,
        autocheckgroup,
        autocheckcol1,
        autocheckcol3,
        empWorkExperience,
        educationInfo,
        familyInfo,
        handldinfo,
        handoverContent2,
        handoverContent3,
        handoverContent4,
        trsflowContent,
        trsflowContent2,
        empReport,
        empEvaluation,
        empEvaluation1,
        empEvaluation2,
        historyContract,
        approvalRecord,
        travelInformation,
        additional,
        autoSingleUpload,
        monthYear,
        automodalAccept,
        autoTag,
        autoyearQuarter,
        autouploadqys,
        autoMap,
        autodaterange
    },
    methods: {
        /*
         * 格式化数据
         * */
        // getFormDataSubmit () {
        //     let columns = this.formData.columns; // 字段
        //     let formData = {};
        //     let form = {}; // 表单
        //     let ruler = {}; // 校验规则
        //     let clmmap = {};
        //     for (let i = 0; i < columns.length; i++) {
        //         if (columns[i].clmLayout === 20) {
        //             // 当数据类型为checkBox group时，需要数据类型为数组
        //             if (columns[i].clmValue !== "") {
        //                 form[columns[i].clmName] = columns[i].clmValue.split(",");
        //             } else {
        //                 form[columns[i].clmName] = [];
        //             }
        //         } else {
        //             form[columns[i].clmName] = columns[i].clmValue;
        //         }
        //         if (columns[i].clmName !== "companyId") {
        //             clmmap[columns[i].clmName] = columns[i].clmDbName;
        //         }
        //         if (columns[i].columnValid) {
        //             ruler[columns[i].clmName] = [];
        //             for (let j = 0; j < columns[i].columnValid.length; j++) {
        //                 ruler[columns[i].clmName].push({
        //                     validator: (rule, value, callback) => {
        //                         if (!validCode[rule.valid](form[rule.field])) {
        //                             callback(new Error(rule.message));
        //                         } else {
        //                             callback();
        //                         }
        //                     },
        //                     trigger: "change",
        //                     message:
        //                         columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
        //                     valid: columns[i].columnValid[j].clmvMod
        //                 });
        //             }
        //         }
        //     }
        //     form._mt = this.$global.mt + "PlatAutoLayoutSave.addOrUpd";
        //     form.logType = this.$t("button.sav");
        //     formData.form = form;
        //     formData.ruler = ruler;
        //     formData.clmmap = clmmap;
        //     return formData;
        // },

        /*
         * 校验页面表单
         * */
        validor (rule, value, callback) {
            if (!validCode[rule.valid](this.formDataSubmit[rule.field])) {
                callback(new Error(rule.message));
            } else {
                callback();
            }
        },
        /**
         * change事件
         */
        change (node) {
            const formName = this.formData.tbName + pubsource.param_mt
            if (onChange.hasOwnProperty(formName)) {
                if (onChange[formName].hasOwnProperty(node.ruleText)) {
                    onChange[formName][node.ruleText].call(this, node);
                }

            }
            this.empEmpenty(node)
        },
        //级联清空
        empEmpenty (node) {
            const t = this
            if (node.thisValue == '') {
                if (node.ruleText == "entEmpunitid") {
                    t.$refs.entEmppoid.thisValue = ''
                    t.$refs.entEmppoid.thisId = ''
                    t.$refs.entEmpdepid.thisValue = ''
                    t.$refs.entEmpdepid.thisId = ''
                }
                if (node.ruleText == 'entEmpdepid') {
                    t.$refs.entEmppoid.thisValue = ''
                    t.$refs.entEmppoid.thisId = ''

                }
                if (node.ruleText == 'entEmppoid') {
                    t.$refs.entDutyIdDis.thisValue = ''
                    t.$refs.entRankinfoIdDis.thisValue = ''
                    t.$refs.entBusiareaIdDis.thisValue = ''
                    t.$refs.entBusimodIdDis.thisValue = ''

                }
            }
        },
        /**
         *  显示隐藏事件
         *
         * @param {*} logic  显示隐藏逻辑
         * @param {*} value  当前元素对象值
         */
        showHide (logic, value) {
            let condition = logic.split(";");
            for (let j of condition) {
                let arr = j.split("@");
                let showDom = arr[1].split("$")[0].split("#");
                let hideDom = arr[1].split("$")[1].split("#");
                for (let v of showDom) {
                    if (value == arr[0] && v !== "") {
                        if (this.formDataSubmit.hasOwnProperty(v)) {
                            this.$set(this.formshow, v, "");
                            if (this.formDataSubmit[v] && this.formDataSubmit[v] !== "") {
                                this.$set(this.formDataSubmit, v, this.formDataSubmit[v]);
                            } else {
                                this.$set(this.formDataSubmit, v, "");
                            }
                        }
                    }
                }
                for (let k of hideDom) {
                    if (value == arr[0] && k !== "") {
                        if (this.formshow.hasOwnProperty(k)) {
                            this.$delete(this.formshow, k);
                            this.$set(this.formDataSubmit, k, "");
                        }
                    }
                    if (value === '' && k !== '') {
                        if (this.formshow.hasOwnProperty(k)) {
                            this.$delete(this.formshow, k);
                            this.$set(this.formDataSubmit, k, "");
                        }
                    }
                }
            }
        },
        /**
        *  初始化显示隐藏
        *
        */
        initShowHide () {
            for (let v of this.formData1.columns) {
                if (v.clmChgjs_dis && v.clmChgjs_dis !== "") {
                    if (v.clmValue && v.clmValue !== '') {
                        this.showHide(v.clmChgjs_dis, v.clmValue);
                    } else if (v.sffDefault && v.sffDefault !== '') {
                        this.showHide(v.clmChgjs_dis, v.sffDefault);
                    } else {
                        this.showHide(v.clmChgjs_dis, v.clmValue);
                    }
                }
            }
        },
        setJLData (obj) {
            for (let item in obj) {
                if (item.toString().indexOf("Dis") !== -1) {
                    for (let i = 0; i < this.formData.columns.length; i++) {
                        let str = item.toString().replace("Dis", "");
                        if (this.formData.columns[i].clmName === str) {
                            this.formData.columns[i].clmDisValue = obj[item];
                        }
                    }
                }
                let tt = this.$parent;
                if (tt.valueMap[item]) {
                    let dom = tt.$refs[tt.valueMap[item]][0]
                    for (let item2 in dom.formDataSubmit) {
                        if (item === item2) {
                            dom.$set(dom.formDataSubmit, item2, obj[item]);
                            this.$store.state.flowClmkMap.popForm[
                                item2
                            ] = obj[item];
                            let objMap = {}
                            objMap[item2] = obj[item]
                            this.$store.commit("flowClmkMap/setPopFormValue", objMap);
                        }
                    }
                }

            }
        },
        /*
         * 单表保存页面
         * */
        saveForm () {
            const t = this;
            t.$refs.formList.validate().then(v => {
                if (v) {
                    t.formDataSubmit.tbName = t.tbName;
                    t.formDataSubmit.clmMap = JSON.stringify(t.clmMap);
                    if (t.pklv) {
                        t.formDataSubmit[t.formParentfield] = t.pklv;
                    }
                    if (t.formDataSubmit._mt === undefined) {
                        t.formDataSubmit._mt =
                            this.$global.mt + "PlatAutoLayoutSave.addOrUpd";
                        t.formDataSubmit.logType = this.$t("button.sav");
                    }
                    getDataLevelUserLoginNew(t.formDataSubmit)
                        .then(res => {
                            if (isSuccess(res, t)) {
                                t.$Modal.success({
                                    title: this.$t("reminder.suc"),
                                    content: this.$t("reminder.savsuccess")
                                });
                                t.$emit("close");
                                Bus.$emit("getDataBlock");
                            }
                        })
                        .catch(res => {
                            t.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: res
                            });
                        });
                }
            });
        },
        validForm () {


            return this.$refs.formList.validate();
        }
    },
    watch: {
        formDataSubmit: {
            handler (val) {
                this.$emit('formDataSubmit', val);
            },
            deep: true,
        }
    },
    render: function (createElement) {
        let nodes = [];
        let childTable = [];
        const formDom = this;
        if (this.formData.columns[0].clmLayout === 9999) {
            // 特殊布局 自动加入表格
            let chlcolumn = this.formData.columns.map((item, index) => {
                return {
                    key: item.clmName,
                    title: item.clmDname
                };
            });
            chlcolumn.unshift({
                type: "selection",
                width: 60,
                align: "center"
            });
            childTable.push(
                createElement(this.formData.columns[0].clmCustomrouter, {
                    props: {
                        chlcolumns: chlcolumn,
                        clmCustomrouter: this.formData.columns[0].clmCustomrouter,
                        flowInfo: this.flowInfo,
                        roleContrl: this.roleContrl
                    }
                })
            );
        } else {
            for (let i = 0; i < this.formData.columns.length; i++) {
                let child = [];
                switch (this.formData.columns[i].clmLayout) {
                    case 1:
                        child.push(
                            createElement("autoinput", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    message: this.formData.columns[i].clmDescribe,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                /*
                                 * 实现双向绑定
                                 * */
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 数字文本框
                     * */
                    case 2:
                        child.push(
                            createElement("autonumber", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                /*
                                 * 实现双向绑定
                                 * */
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 密码框
                     * */
                    case 32:
                        child.push(
                            createElement("autopsdInput", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                /*
                                 * 实现双向绑定
                                 * */
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 日期选择框
                     * */
                    case 3:
                        child.push(
                            createElement("autodatepicker", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 日期时间选择框
                     * */
                    case 4:
                        child.push(
                            createElement("autodatetime", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 日期时间选择框
                     * */
                    case 30:
                        child.push(
                            createElement("autodateyear", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 长文本框
                     * */
                    case 5:
                        child.push(
                            createElement("autolonginput", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                /*
                                 * 实现双向绑定
                                 * */
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 文本域
                     * */
                    case 6:
                        child.push(
                            createElement("autotextarea", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                /*
                                 * 实现双向绑定
                                 * */
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 富文本编辑器
                     * */
                    case 7:
                        child.push(
                            createElement("autoeditor", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                }
                            })
                        );
                        break;
                    /*
                     * 单个多选框
                     * */
                    case 10:
                        child.push(
                            createElement("autocheckbox", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        if (value) {
                                            this.formDataSubmit[this.formData.columns[i].clmName] =
                                                "1";
                                        } else {
                                            this.formDataSubmit[this.formData.columns[i].clmName] =
                                                "0";
                                        }
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        // this.formDataSubmit[this.formData.columns[i].clmName] = value.toString()
                                        // alert(22)
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 单选框
                     * */
                    case 11: {
                        let childSelect = [];
                        for (let j = 0; j < this.formData.columnOptions.length; j++) {
                            if (
                                this.formData.columnOptions[j].clmName ===
                                this.formData.columns[i].clmName
                            ) {
                                childSelect = this.formData.columnOptions[j].clmOptionList;
                                break;
                            }
                        }
                        child.push(
                            createElement("autoradio", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    data: childSelect,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                /*
                                 * 实现双向绑定
                                 * */
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    }
                    /*
                     * 下拉选择
                     * */
                    case 12: {
                        let childSelect = [];
                        for (let j = 0; j < this.formData.columnOptions.length; j++) {
                            if (
                                this.formData.columnOptions[j].clmName ===
                                this.formData.columns[i].clmName
                            ) {
                                childSelect = this.formData.columnOptions[j].clmOptionList;
                                break;
                            }
                        }
                        child.push(
                            createElement("autoselect", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    data: childSelect,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    }
                    /*
                     * 弹出选择
                     * */
                    case 13:
                        child.push(
                            createElement("automodal", {
                                props: {
                                    value: this.formData.columns[i].clmDisValue,
                                    oldValue: 0, // fd
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    message: this.formData.columns[i].clmDescribe,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    id: this.formData.columns[i].clmValue,
                                    required: this.formData.columns[i].columnValid !== undefined,
                                    modiaContent:
                                        this.formData.columns[i].clmSelOptMark !== undefined
                                            ? this.formData.columns[i].clmSelOptMark
                                            : "",
                                    sffFilter: this.formData.columns[i].clmfilter,
                                    sffCascadeget: this.formData.columns[i].clmcascadeget,
                                    form: this.formDataSubmit,
                                    dataKey: this.formData.columns[i].clmSelOpt.toString(),
                                },
                                on: {
                                    "on-change": value => {
                                        this.oldValue = this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ];
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    },
                                    setJLData: obj => {
                                        this.setJLData(obj);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                    * 弹出选择
                    * */
                    case 14:
                        child.push(
                            createElement("automodaledit", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    message: this.formData.columns[i].clmDescribe,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    required: this.formData.columns[i].columnValid !== undefined,
                                    modiaContent:
                                        this.formData.columns[i].clmSelOptMark !== undefined
                                            ? this.formData.columns[i].clmSelOptMark
                                            : "",
                                    sffFilter: this.formData.columns[i].clmfilter,
                                    sffCascadeget: this.formData.columns[i].clmcascadeget,
                                    form: this.formDataSubmit,
                                    dataKey: this.formData.columns[i].clmSelOpt,
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    },
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * CheckboxGroup
                     * */
                    case 20: {
                        let childSelect = [];
                        for (let j = 0; j < this.formData.columnOptions.length; j++) {
                            if (
                                this.formData.columnOptions[j].clmName ===
                                this.formData.columns[i].clmName
                            ) {
                                childSelect = this.formData.columnOptions[j].clmOptionList;
                                break;
                            }
                        }
                        let value;
                        if (this.formDataSubmit[this.formData.columns[i].clmName] && this.formDataSubmit[this.formData.columns[i].clmName] !== undefined) {
                            value = Array.isArray(this.formDataSubmit[this.formData.columns[i].clmName]) ?
                                this.formDataSubmit[this.formData.columns[i].clmName] :
                                this.formDataSubmit[this.formData.columns[i].clmName].split(',')
                        }
                        child.push(
                            createElement("autocheckgroup", {
                                props: {
                                    value: value,
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    data: childSelect,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        let str = value.toString()
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = str;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    }
                    /**
                    * 多选框 1列
                    */
                    case 23: {
                        let childSelect = [];
                        for (let j = 0; j < this.formData.columnOptions.length; j++) {
                            if (
                                this.formData.columnOptions[j].clmName ===
                                this.formData.columns[i].clmName
                            ) {
                                childSelect = this.formData.columnOptions[j].clmOptionList;
                                break;
                            }
                        }
                        let value;
                        if (this.formDataSubmit[this.formData.columns[i].clmName] && this.formDataSubmit[this.formData.columns[i].clmName] !== undefined) {
                            value = Array.isArray(this.formDataSubmit[this.formData.columns[i].clmName]) ?
                                this.formDataSubmit[this.formData.columns[i].clmName] :
                                this.formDataSubmit[this.formData.columns[i].clmName].split(',')
                        }
                        child.push(
                            createElement("autocheckcol1", {
                                props: {
                                    value: value,
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    data: childSelect,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        let str = value.toString()
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = str;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    }
                    /**
                     * 多选框 3列
                     */
                    case 24: {
                        let childSelect = [];
                        for (let j = 0; j < this.formData.columnOptions.length; j++) {
                            if (
                                this.formData.columnOptions[j].clmName ===
                                this.formData.columns[i].clmName
                            ) {
                                childSelect = this.formData.columnOptions[j].clmOptionList;
                                break;
                            }
                        }
                        let value;
                        if (this.formDataSubmit[this.formData.columns[i].clmName] && this.formDataSubmit[this.formData.columns[i].clmName] !== undefined) {
                            value = Array.isArray(this.formDataSubmit[this.formData.columns[i].clmName]) ?
                                this.formDataSubmit[this.formData.columns[i].clmName] :
                                this.formDataSubmit[this.formData.columns[i].clmName].split(',')
                        }
                        child.push(
                            createElement("autocheckcol3", {
                                props: {
                                    value: value,
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    data: childSelect,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        let str = value.toString()
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = str;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    }
                    /*
                     * 多选框弹出选择
                     * */
                    case 21:
                        let obj1 = this.$store.state.flowClmkMap.localField
                        //  有&赋值
                        if (this.formData.columns[i].clmfilter && this.formData.columns[i].clmfilter.indexOf('&&') > -1) {
                            const str = this.formData.columns[i].clmfilter.split('&&')[1]
                            for (let k in obj1) {
                                if (k == str) {
                                    this.formData.columns[i].clmDisValue = obj1[k]
                                }
                            }
                        }

                        if (this.formData.columns[i].clmfilter && this.formData.columns[i].clmfilter.indexOf('@@') > -1) {
                            const str = this.formData.columns[i].clmfilter.split('@@')[1]
                            for (let k in obj1) {
                                if (k == str) {
                                    this.formData.columns[i].clmDisValue = obj1[k]
                                }
                            }
                        }
                        let dataKey1 = "";
                        for (let j = 0; j < this.formData.columnOptions.length; j++) {
                            if (
                                this.formData.columnOptions[j].clmName ===
                                this.formData.columns[i].clmName
                            ) {
                                dataKey1 = this.formData.columnOptions[j].clmOptionList[0].value;
                                break;
                            }
                        }
                        child.push(
                            createElement("automodalmany", {
                                props: {
                                    value: this.formData.columns[i].clmDisValue,
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    id: this.formData.columns[i].clmValue,
                                    required: this.formData.columns[i].columnValid !== undefined,
                                    modiaContent:
                                        this.formData.columns[i].clmSelOptMark !== undefined
                                            ? this.formData.columns[i].clmSelOptMark
                                            : "",
                                    sffFilter: this.formData.columns[i].clmfilter,
                                    sffCascadeget: this.formData.columns[i].clmcascadeget,
                                    form: this.formDataSubmit,
                                    dataKey: dataKey1,
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    },
                                    setJLData: obj => {
                                        this.setJLData(obj);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 多选框弹出选择
                     * */
                    case 22:
                        child.push(
                            createElement("automodalmanyDel", {
                                props: {
                                    value: this.formData.columns[i].clmDisValue,
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    id: this.formData.columns[i].clmValue,
                                    required: this.formData.columns[i].columnValid !== undefined,
                                    modiaContent:
                                        this.formData.columns[i].clmSelOptMark !== undefined
                                            ? this.formData.columns[i].clmSelOptMark
                                            : "",
                                    sffFilter: this.formData.columns[i].clmfilter,
                                    sffCascadeget: this.formData.columns[i].clmcascadeget,
                                    form: this.formDataSubmit
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    },
                                    setJLData: obj => {
                                        this.setJLData(obj);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /**
                * tag
                */
                    case 25:
                        // let data = this.formDataSubmit[this.formData.columns[i].clmName];
                        // let tags = [];
                        // let value = '';
                        // // // console.log(data,"Data")
                        // if(data !== '' && data !== undefined) {
                        //     value = data.split(',')[0].split(':')[1];
                        //     tags = data.split(',').slice(1, data.length);
                        // }
                        // console.log(value,"id")
                        // console.log(tags,"tags")
                        child.push(
                            createElement("autoTag", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    // data: tags,
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                /*
                                    * 实现双向绑定
                                    * */
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 页面描述说明
                     * */
                    case 70:
                        child.push(
                            createElement("autodisc", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                }
                            })
                        );
                        break;
                    /*
                     * 文件上传
                     * */
                    case 71:
                        // console.log(this.formData.columns[i], "71")
                        child.push(
                            createElement("autoupload", {
                                props: {
                                    value: this.formData.columns[i].clmValue && this.formData.columns[i].clmValue !== '' ? this.formData.columns[i].clmValue
                                        .split("|")
                                        .filter(item => item !== "") : [],
                                    id: this.formData.columns[i].clmValue,
                                    fileKey: this.formData.columns[i].clmValue && this.formData.columns[i].clmValue !== '' ? this.formData.columns[i].clmValue
                                        .split("|")
                                        .filter(item => item !== "") : [],
                                    itemLabel: this.formData.columns[i].clmDname,
                                    show: this.formshow,
                                    ruleText: this.formData.columns[i].clmName,
                                    message: this.formData.columns[i].clmDescribe,
                                    sffFilter: this.formData.columns[i].clmfilter,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                     * 照片上传
                     * */
                    case 72:
                        let autophotoupload = this.formDataSubmit[this.formData.columns[i].clmName];
                        child.push(
                            createElement("autophotoupload", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    id: autophotoupload,
                                    fileKey: autophotoupload !== undefined && autophotoupload !== ""
                                        ? autophotoupload.split(":")[1]
                                        : "",
                                    itemLabel: this.formData.columns[i].clmDname,
                                    show: this.formshow,
                                    ruleText: this.formData.columns[i].clmName,
                                    message: this.formData.columns[i].clmDescribe,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                 HRBP对接人**/
                    case 90:
                        child.push(
                            createElement("automodalAccept", {
                                props: {
                                    isSpecial: this.formData.columns[i].clmLayout,
                                    value: this.formData.columns[i].clmDisValue,
                                    oldValue: 0, // fd
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    message: this.formData.columns[i].clmDescribe,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    id: this.formData.columns[i].clmValue,
                                    required: this.formData.columns[i].columnValid !== undefined,
                                    modiaContent:
                                        this.formData.columns[i].clmSelOptMark !== undefined
                                            ? this.formData.columns[i].clmSelOptMark
                                            : "",
                                    sffFilter: this.formData.columns[i].clmfilter,
                                    sffCascadeget: this.formData.columns[i].clmcascadeget,

                                    form: this.formDataSubmit
                                },
                                on: {
                                    "on-change": (value, name) => {
                                        if (this.formDataSubmit) {

                                        }
                                        this.oldValue = this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ];
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;

                                    },
                                    change: value => {

                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }

                                    },
                                    setJLData: obj => {
                                        this.setJLData(obj);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    case 91:

                        child.push(
                            createElement("automodalAccept", {
                                props: {
                                    isSpecial: this.formData.columns[i].clmLayout,
                                    value: this.formData.columns[i].clmDisValue,
                                    oldValue: 0, // fd
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    message: this.formData.columns[i].clmDescribe,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    id: this.formData.columns[i].clmValue,
                                    required: this.formData.columns[i].columnValid !== undefined,
                                    modiaContent:
                                        this.formData.columns[i].clmSelOptMark !== undefined
                                            ? this.formData.columns[i].clmSelOptMark
                                            : "",
                                    sffFilter: this.formData.columns[i].clmfilter,
                                    sffCascadeget: this.formData.columns[i].clmcascadeget,

                                    form: this.formDataSubmit
                                },
                                on: {
                                    "on-change": (value, name) => {
                                        if (this.formDataSubmit) {

                                        }
                                        this.oldValue = this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ];
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    },
                                    setJLData: obj => {
                                        this.setJLData(obj);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    case 92:

                        child.push(
                            createElement("automodalAccept", {
                                props: {
                                    isSpecial: this.formData.columns[i].clmLayout,
                                    value: this.formData.columns[i].clmDisValue,
                                    oldValue: 0, // fd
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    message: this.formData.columns[i].clmDescribe,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    id: this.formData.columns[i].clmValue,
                                    required: this.formData.columns[i].columnValid !== undefined,
                                    modiaContent:
                                        this.formData.columns[i].clmSelOptMark !== undefined
                                            ? this.formData.columns[i].clmSelOptMark
                                            : "",
                                    sffFilter: this.formData.columns[i].clmfilter,
                                    sffCascadeget: this.formData.columns[i].clmcascadeget,

                                    form: this.formDataSubmit
                                },
                                on: {
                                    "on-change": (value, name) => {
                                        if (this.formDataSubmit) {

                                        }
                                        this.oldValue = this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ];
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;

                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }

                                    },
                                    setJLData: obj => {

                                        this.setJLData(obj);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                    * 单文件上传
                    * */
                    case 73:
                        let autoSingleUpload = this.formData.columns[i].clmValue;
                        child.push(
                            createElement("autoSingleUpload", {
                                props: {
                                    value:
                                        autoSingleUpload !== undefined && autoSingleUpload !== ""
                                            ? autoSingleUpload.split(":")[1]
                                            : "",
                                    id: autoSingleUpload,
                                    fileKey:
                                        autoSingleUpload !== undefined && autoSingleUpload !== ""
                                            ? autoSingleUpload.split(":")[1]
                                            : "",
                                    fileName:
                                        autoSingleUpload !== undefined && autoSingleUpload !== ""
                                            ? autoSingleUpload.split(":")[0]
                                            : "",
                                    itemLabel: this.formData.columns[i].clmDname,
                                    show: this.formshow,
                                    ruleText: this.formData.columns[i].clmName,
                                    message: this.formData.columns[i].clmDescribe,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                * 契约锁附件查看
                * */
                    case 74:
                        let fileKey = formDom.formData.columns[i].clmValue;
                        let fileName = fileKey !== undefined && fileKey !== "" ? fileKey.split(":")[0] : ""
                        fileKey = fileKey !== undefined && fileKey !== "" ? fileKey.split(":")[1] : ""
                        child.push(
                            createElement("autouploadqys", {
                                props: {
                                    value: fileName,
                                    id: fileKey,
                                    fileKey: fileKey,
                                    fileName: fileName,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    show: this.formshow,
                                    ruleText: this.formData.columns[i].clmName,
                                    message: this.formData.columns[i].clmDescribe,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
                 年月
                **/
                    case 80:
                        child.push(
                            createElement("monthYear", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    /*
               日期年季度
               **/
                    case 81:
                        child.push(
                            createElement("autoyearQuarter", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                    case 75:
                        child.push(
                            createElement("autoMap", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    message: this.formData.columns[i].clmDescribe,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    required: this.formData.columns[i].columnValid !== undefined
                                },
                                /*
                                 * 实现双向绑定
                                 * */
                                on: {
                                    "on-change": value => {
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                    },
                                    change: value => {
                                        this.change(value);
                                    }
                                },
                                ref: this.formData.columns[i].clmName
                            })
                        );
                        break;
                        case 76:
                            child.push(
                                createElement("autodaterange", {
                                    props: {
                                        value: this.formDataSubmit[this.formData.columns[i].clmName],
                                        show: this.formshow,
                                        itemLabel: this.formData.columns[i].clmDname,
                                        ruleText: this.formData.columns[i].clmName,
                                        disabled: this.disabled,
                                        dis: this.dis,
                                        message: this.formData.columns[i].clmDescribe,
                                        required: this.formData.columns[i].columnValid !== undefined
                                    },
                                    on: {
                                        "on-change": value => {
                                            this.formDataSubmit[
                                                this.formData.columns[i].clmName
                                            ] = value;
                                        },
                                        change: value => {
                                            this.change(value);
                                            if (this.show[this.formData.columns[i].clmName]) {
                                                this.showHide(
                                                    this.show[this.formData.columns[i].clmName],
                                                    value.thisValue
                                                );
                                            }
                                            if (this.setVal[this.formData.columns[i].clmName]) {
                                                this.setValue(
                                                    this.setVal[this.formData.columns[i].clmName],
                                                    value.thisValue
                                                );
                                            }
                                        }
                                    },
                                    ref: this.formData.columns[i].clmName
                                })
                            );
                            break;
                }
                nodes.push(child);
            }
        }
        return createElement("div", [
            createElement(
                "Form",
                {
                    props: {
                        "label-width": this.lebWidth,
                        // 'label-position': 'top',
                        rules: this.ruler,
                        model: this.formDataSubmit
                    },
                    ref: "formList"
                },
                [createElement("Row", [childTable.length > 0 ? childTable : nodes])]
            )
        ]);
    }
};
