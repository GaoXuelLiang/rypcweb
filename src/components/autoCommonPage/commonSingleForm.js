import automodalAccept from "@/pages/common/commonCompanents/automodalAccept"; // HRBP对接人
import autoyear from "@/pages/common/commonCompanents/autoyear"; // 日期年季度
import autoyearQuarter from "@/pages/common/commonCompanents/autoyearQuarter"; // 日期年季度
import monthYear from "@/pages/common/commonCompanents/monthYear"; // 日期年月
import autodaterange from "@/pages/common/commonCompanents/autodaterange"; // 日期时间框  只能选择年
import autoinput from "@/pages/common/commonCompanents/autoinput"; // 普通input
import autopsdInput from "@/pages/common/commonCompanents/autopsdInput"; // 密码框
import autonumber from "@/pages/common/commonCompanents/autonumber"; // 数字输入框
import autodatepicker from "@/pages/common/commonCompanents/autodatepicker"; // 日期选择框
import autodatetime from "@/pages/common/commonCompanents/autodatetime"; // 日期时间选择框
import autodateyear from "@/pages/common/commonCompanents/autodateyear"; // 日期时间框  只能选择年
import autodisc from "@/pages/common/commonCompanents/autodisc"; // 描述信息
import autoeditor from "@/pages/common/commonCompanents/autoeditor"; // 富文本编辑器
import autolonginput from "@/pages/common/commonCompanents/autolonginput"; // 长文本框
import automodal from "@/pages/common/commonCompanents/automodal"; // 弹出选择（不可手填）
import automodaledit from "@/pages/common/commonCompanents/automodaledit"; // 弹出选择（可以手写）
import automodalmany from "@/pages/common/commonCompanents/automodalmany"; // 弹出选择多选
import automodalmanyDel from "@/pages/common/commonCompanents/automodalmanyDel"; // 弹出选择多选加删除  目前用于基准岗位
import autoradio from "@/pages/common/commonCompanents/autoradio"; // 单选框
import autocheckbox from "@/pages/common/commonCompanents/autocheckbox"; // 单个多选框
import autoselect from "@/pages/common/commonCompanents/autoselect"; // 下拉选择框
import autotextarea from "@/pages/common/commonCompanents/autotextarea"; // 文本域
import autoSingleUpload from "@/pages/common/commonCompanents/autoSingleUpload";
import autoupload from "@/pages/common/commonCompanents/autoupload"; // 上传文件
import autophotoupload from "@/pages/common/commonCompanents/autophotoupload"; // 上传照片
import autophotouploader from "@/pages/common/commonCompanents/autophotouploader"; // 上传照片
import autophotograph from "@/pages/common/commonCompanents/autophotograph"; // 上传照片
import autocheckgroup from "@/pages/common/commonCompanents/autocheckgroup"; // 多选框group
import autocheckgroupG from "@/pages/common/commonCompanents/autocheckgroupG"; // 数据维护多选框group
import autocheckcol1 from "@/pages/common/commonCompanents/autocheckcol1"; //多选框group 1列
import autocheckcol3 from "@/pages/common/commonCompanents/autocheckcol3"; //多选框group 3列
import validCode from "@/pages/common/commonCompanents/validCode";
import autoMap from "@/pages/common/commonCompanents/autoMap"; // 选择地图
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLoginData
} from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import { onChange } from "./onChange/index";
import Bus from "./bus";
// import { delete } from "vue/types/umd";
/**
 * 挂载特殊处理组件
 */
/**
 * payroll 组件
 */
export default {
    data () {
        return {
            formDataSubmit: deepCopy(this.formlist.form),
            formshow: deepCopy(this.formlist.form),
            dis: deepCopy(this.formlist.dis),
            clmMap: this.formlist.clmmap,
            ruler: this.formlist.ruler,
            formData: this.formData1,
            show: this.formlist.showEvents,
            setVal: this.formlist.setValEvents
        };
    },
    props: {
        // 接收父组件colseUpd(父组件autoMainUpd)
        colseUpd: {
            type: Function,
            default: null
        },
        formData1: Object,
        formlist: Object,
        lebWidth: {
            type: Number,
            default: 135
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tbName: String,
        pklv: String, // 主表id
        formParentfield: String, // 主表字段名
        customRouter: String, // 特殊布局组件路由
        isScorllY: {//是否超出滚动
            type: Boolean,
            default: false
        }
    },
    created () { },
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
        autoSingleUpload,
        autophotoupload,
        autophotouploader,
        autophotograph,
        autocheckgroup,
        autocheckgroupG,
        autocheckcol1,
        autocheckcol3,
        monthYear,
        autoyearQuarter,
        autoyear,
        automodalAccept,
        autoMap,
        autodaterange
    },
    methods: {
        /**
         *  获取主键ID
         *
         * @param {*} mainId 主键Id
         */
        getMaid (mainId) {
            if (!this.formDataSubmit.id) {
                this.formDataSubmit.id = mainId;
            }
        },
        /**
         * 元素change事件
         *
         * @param {*} node 节点dom
         */
        change (node) {
            const formName = this.formData.tbName + pubsource.param_mt
            if (onChange.hasOwnProperty(formName)) {
                if (onChange[formName].hasOwnProperty(node.ruleText)) {
                    onChange[formName][node.ruleText].call(this, node);
                }
            }
            //console.log(node,'555555555')
            this.popEmpty(node.thisValue, node.thisId, node.ruleText)
        },
        /**
         *  国家省市区弹出选择清空
         *  @param {*} id  当前对象id
         *  @param {*} ruleText  当前对象的字段
         */
        popEmpty (val, id, ruleText) {
            if (val == '') {
                const t = this
                //职务信息
                if (ruleText == 'dutyPtodid') {
                    this.$refs.dutyBusrid.thisValue = ""
                    this.$refs.dutyBusrid.thisId = ""
                    this.$refs.dutyBumdid.thisValue = ""
                    this.$refs.dutyBumdid.thisId = ""
                    this.formDataSubmit.dutyBumdid = ""
                    this.formDataSubmit.dutyBumdidDis = ""
                    this.formDataSubmit.dutyBusrid = ""
                    this.formDataSubmit.dutyBusridDis = ""
                    this.formDataSubmit.dutyPtodid = ""
                    this.formDataSubmit.dutyPtodidDis = ""
                }
                if (ruleText == 'dutyBusrid') {
                    this.$refs.dutyBumdid.thisValue = ""
                    this.formDataSubmit.dutyBumdid = ""
                    this.formDataSubmit.dutyBumdidDis = ""
                    this.formDataSubmit.dutyBusrid = ""
                    this.formDataSubmit.dutyBusridDis = ""
                }
                //编制信息
                if (ruleText == 'etabUnitid') {
                    this.$refs.etabDeptid.thisValue = ""
                    this.$refs.etabPostid.thisValue = ""
                    this.formDataSubmit.etabPostid = ""
                    this.formDataSubmit.etabPostidDis = ""
                    this.formDataSubmit.etabDeptid = ""
                    this.formDataSubmit.etabDeptidDis = ""
                }
                if (ruleText == 'etabDeptid') {
                    this.$refs.etabPostid.thisValue = ""
                    this.formDataSubmit.etabPostid = ""
                    this.formDataSubmit.etabPostidDis = ""
                }
                //岗位信息
                if (ruleText == 'postPtodid') {
                    t.$refs.postBusrid.thisValue = ""
                    t.$refs.postBusrid.thisId = ""
                    t.$refs.postBumdid.thisValue = ""
                    t.$refs.postDutyid.thisValue = ""
                    t.$refs.postBumdid.thisId = ""
                    t.formDataSubmit.postBumdid = ""
                    t.formDataSubmit.postBumdidDis = ""
                    t.formDataSubmit.postBusrid = ""
                    t.formDataSubmit.postBusridDis = ""
                    t.formDataSubmit.postPtodid = ""
                    t.formDataSubmit.postPtodidDis = ""
                    t.formDataSubmit.postDutyid = ""
                    t.formDataSubmit.postDutyidDis = ""
                }
                if (ruleText == 'postBusrid') {
                    this.$refs.postBumdid.thisValue = ""
                    this.$refs.postDutyid.thisValue = ""
                    this.formDataSubmit.postBumdid = ""
                    this.formDataSubmit.postBumdidDis = ""
                    this.formDataSubmit.postBusrid = ""
                    this.formDataSubmit.postBusridDis = ""
                    t.formDataSubmit.postDutyid = ""
                    t.formDataSubmit.postDutyidDis = ""
                }
                if (ruleText == 'postBumdid') {
                    this.$refs.postDutyid.thisValue = ""
                    t.formDataSubmit.postDutyid = ""
                    t.formDataSubmit.postDutyidDis = ""
                }

            }
            if (id == '') {
                if (ruleText == 'addrCityid') {
                    this.$refs.addrCcityid.thisId = ""
                    this.$refs.addrCcityid.thisValue = ""
                } else if (ruleText == 'addrPcityid') {
                    this.$refs.addrCityid.thisId = ""
                    this.$refs.addrCcityid.thisId = ""
                    this.$refs.addrCityid.thisValue = ""
                    this.$refs.addrCcityid.thisValue = ""
                } else if (ruleText == 'addrNatid') {
                    this.$refs.addrPcityid.thisId = ""
                    this.$refs.addrCityid.thisId = ""
                    this.$refs.addrCcityid.thisId = ""
                    this.$refs.addrCityid.thisValue = ""
                    this.$refs.addrCcityid.thisValue = ""
                    this.$refs.addrPcityid.thisValue = ""
                } else if (ruleText == 'empaddNatid') {
                    this.$refs.empaddPcityid.thisId = ""
                    this.$refs.empaddCityid.thisId = ""

                    this.$refs.empaddPcityid.thisValue = ""
                    this.$refs.empaddCityid.thisValue = ""

                } else if (ruleText == 'empaddPcityid') {

                    this.$refs.empaddCityid.thisId = ""

                    this.$refs.empaddCityid.thisValue = ""

                } else if (ruleText == 'empaddPcityid') {

                    this.$refs.empaddCityid.thisId = ""

                    this.$refs.empaddCityid.thisValue = ""

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
                        this.$set(this.formshow, v, "");
                        if (this.formDataSubmit[v] && this.formDataSubmit[v] !== "") {
                            this.$set(this.formDataSubmit, v, this.formDataSubmit[v]);
                        } else {
                            this.$set(this.formDataSubmit, v, "");
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
                }
            }
        },
        /**
         *  赋值事件
         *
         * @param {*} val   赋值逻辑
         * @param {*} value   当前元素对象值
         */
        setValue (val, domValue) {
            let condition = val.split(";");
            for (let j of condition) {
                let arr = j.split("@");
                let showDom = arr[1].split("#");
                for (let v of showDom) {
                    let value = v.split("=");
                    if (domValue == arr[0]) {
                        this.$set(this.formDataSubmit, value[0], value[1]);
                    }
                }
            }
        },
        /**
         *  弹出框赋值
         *
         * @param {*} obj
         */
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
                for (let item2 in this.formDataSubmit) {
                    if (item === item2) {
                        this.$set(this.formDataSubmit, item2, obj[item]);
                        this.$store.state.flowClmkMap.popForm[
                            item2
                        ] = obj[item];
                        let objMap = {}
                        objMap[item2] = obj[item]
                        this.$store.commit("flowClmkMap/setPopFormValue", objMap);
                    }
                }
            }
        },
        /**
         *  保存
         *
         */
        saveForm (ts) {
            const t = this;
            t.$refs.formList.validate().then(v => {
                if (v) {
                    ts.loading = true
                    if (t.pklv) {
                        t.formDataSubmit[t.formParentfield] = t.pklv;
                    }
                    if (t.formDataSubmit._mt === undefined) {
                        t.formDataSubmit._mt = this.$global.mt + t.tbName + ".addOrUpd";
                        t.formDataSubmit.APlogType = this.$t("button.sav");
                    }
                    if (t.formDataSubmit.password) {
                        t.formDataSubmit.password = md5(t.formDataSubmit.password)
                    }
                    for (let k in t.formDataSubmit) {
                        if (Array.isArray(t.formDataSubmit[k])) {
                            t.formDataSubmit[k] = t.formDataSubmit[k].toString()
                        }
                    }
                    getDataLevelUserLoginData(t.formDataSubmit)
                        .then(res => {
                            ts.loading = false
                            if (isSuccess(res, t)) {
                                const newData = res.data.content[0];
                                t.$Modal.success({
                                    title: this.$t("reminder.suc"),
                                    content: this.$t("reminder.savsuccess"),
                                    onOK: () => {
                                        this.$store.commit("autoCommonPage/setMainId", newData.id);
                                    }
                                });
                                // 保存成功后关闭弹窗触发autoMainUpd方法
                                if (this.colseUpd) {
                                    this.colseUpd(newData);
                                }
                            }
                        })
                        .catch(res => {
                            t.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: res
                            });
                        });
                } else {
                    t.$emit("validateError");
                }
            });
        },
        /**
         *   验证form 表单
         *
         * @returns
         */
        validForm () {
            return this.$refs.formList.validate();
        },
        /**
         *  初始化显示隐藏
         *
         */
        initShowHide () {
            for (let v of this.formData1.columns) {
                if (v.clmChgjs_dis && v.clmChgjs_dis !== "") {
                    this.showHide(v.clmChgjs_dis, v.clmValue);
                }
            }
        },
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
                                        formDom.formDataSubmit[
                                            formDom.formData.columns[i].clmName
                                        ] = value;
                                        // 身份证号带出出生日期和性别
                                        if (formDom.formData.columns[i].clmName === 'empfmIdnumber') {
                                            let birth = onChange.ByIdGetSexDay.getBirth(value)
                                            let sex = onChange.ByIdGetSexDay.getSex(value)
                                            this.formDataSubmit.empfmGender = sex
                                            this.formDataSubmit.empfmBirthdate = birth
                                        }
                                        if (formDom.formData.columns[i].clmName === 'empbasePopcode') {
                                            let birth = onChange.ByIdGetSexDay.getBirth(value)
                                            let sex = onChange.ByIdGetSexDay.getSex(value)
                                            this.formDataSubmit.empbaseGender = sex
                                            this.formDataSubmit.empbaseBirthdate = birth
                                        }
                                        // if (formDom.formData.columns[i].clmName === 'empPopcode') {
                                        //     let birth = onChange.ByIdGetSexDay.getBirth(value)
                                        //     let sex = onChange.ByIdGetSexDay.getSex(value)
                                        //     this.formDataSubmit.empGender = sex
                                        //     this.formDataSubmit.empBirthdate = birth
                                        // }
                                        if (formDom.formData.columns[i].clmName === 'sofrSolid') {
                                            if (value !== '') {
                                                if (Number(value) <= 10 && Number(value) >= 0) {
                                                    this.formDataSubmit.sofrFloat = (10 - Number(value)).toFixed(1);
                                                } else {
                                                    this.formDataSubmit.sofrFloat = '';
                                                }
                                            } else {
                                                this.formDataSubmit.sofrFloat = '';
                                            }
                                        }

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
                   * 文档照片上传
                   * */
                    case 8:
                        child.push(
                            createElement("autophotouploader", {
                                props: {
                                    value: this.formData.columns[i].clmValue,
                                    id: this.formData.columns[i].clmValue,
                                    fileKey: this.formData.columns[i].clmValue.split(":")[1],
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
                                let newArr = this.formData.columnOptions[j].clmOptionList
                                newArr.forEach((item, index) => {
                                    if (item.key == '01all' || item.key == '10all') {
                                        newArr.splice(index, 1)
                                    }
                                })
                                childSelect = newArr
                                // childSelect = this.formData.columnOptions[j].clmOptionList;
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
                                        let objMap = {}
                                        objMap[this.formData.columns[i].clmName] = value
                                        this.$store.commit("flowClmkMap/setPopFormValue", objMap);
                                    },
                                    change: value => {
                                        if (this.setVal[this.formData.columns[i].clmName]) {
                                            this.setValue(
                                                this.setVal[this.formData.columns[i].clmName],
                                                value.thisValue
                                            );
                                        }
                                        this.change(value);
                                        if (this.show[this.formData.columns[i].clmName]) {
                                            this.showHide(
                                                this.show[this.formData.columns[i].clmName],
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
                        let obj = this.$store.state.flowClmkMap.localField
                        //  有&赋值
                        if (this.formData.columns[i].clmfilter && this.formData.columns[i].clmfilter.indexOf('&&') > -1) {
                            const str = this.formData.columns[i].clmfilter.split('&&')[1]
                            for (let k in obj) {
                                if (k == str) {
                                    this.formData.columns[i].clmDisValue = obj[k]
                                }
                            }
                        }
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
                                    dataKey: this.formData.columns[i].clmSelOpt.toString(),
                                    form: this.formDataSubmit
                                },
                                on: {
                                    "on-change": (value, name) => {
                                        this.oldValue = this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ];
                                        this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        this.$store.state.flowClmkMap.popForm[
                                            this.formData.columns[i].clmName
                                        ] = value;
                                        if (this.formData1.columns[i].clmChgjs_dis && this.formData1.columns[i].clmChgjs_dis !== "") {
                                            this.showHide(this.formData1.columns[i].clmChgjs_dis, value);
                                        }
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
                                    value: this.formData.columns[i].clmValue,
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
                    * CheckboxGroupG
                    * */
                    case 19: {
                        child.push(
                            createElement("autocheckgroupG", {
                                props: {
                                    value: this.formDataSubmit[this.formData.columns[i].clmName] ? this.formDataSubmit[this.formData.columns[i].clmName].split(",") : [],
                                    show: this.formshow,
                                    itemLabel: this.formData.columns[i].clmDname,
                                    ruleText: this.formData.columns[i].clmName,
                                    disabled: this.disabled,
                                    dis: this.dis,
                                    message: this.formData.columns[i].clmDescribe,
                                    required: this.formData.columns[i].columnValid !== undefined,
                                    dataKey: this.formData.columns[i].clmSelOpt.toString(),
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
                        child.push(
                            createElement("autocheckgroup", {
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
                                        // let str = value.toString()
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
                        child.push(
                            createElement("autocheckcol1", {
                                props: {
                                    value: Array.isArray(this.formDataSubmit[this.formData.columns[i].clmName]) ?
                                        this.formDataSubmit[this.formData.columns[i].clmName] :
                                        this.formDataSubmit[this.formData.columns[i].clmName].split(','),
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
                        child.push(
                            createElement("autocheckcol3", {
                                props: {
                                    value: Array.isArray(this.formDataSubmit[this.formData.columns[i].clmName]) ?
                                        this.formDataSubmit[this.formData.columns[i].clmName] :
                                        this.formDataSubmit[this.formData.columns[i].clmName].split(','),
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
                                    oldValue: 0, // fd,
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
                                        this.oldValue = this.formDataSubmit[
                                            this.formData.columns[i].clmName
                                        ];
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
                    /*
                      * 日期年
                      * */
                    case 82:
                        child.push(
                            createElement("autoyear", {
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
                     * 文件上传
                     * */
                    // case 71:
                    //     let uploadValue = this.formData.columns[i].clmValue;
                    //     child.push(
                    //         createElement("autoupload", {
                    //             props: {
                    //                 value:
                    //                     uploadValue !== undefined && uploadValue !== ""
                    //                         ? uploadValue.split(":")
                    //                         : "",
                    //                 id: uploadValue,
                    //                 fileKey:
                    //                     uploadValue !== undefined && uploadValue !== ""
                    //                         ? uploadValue.split(":")
                    //                         : "",
                    //                 itemLabel: this.formData.columns[i].clmDname,
                    //                 show: this.formshow,
                    //                 ruleText: this.formData.columns[i].clmName,
                    //                 message: this.formData.columns[i].clmDescribe,
                    //                 disabled: this.disabled,
                    //                 dis: this.dis,
                    //                 required: this.formData.columns[i].columnValid !== undefined
                    //             },
                    //             on: {
                    //                 "on-change": value => {
                    //                     this.formDataSubmit[
                    //                         this.formData.columns[i].clmName
                    //                     ] = value;
                    //                 },
                    //                 change: value => {
                    //                     this.change(value);
                    //                     if (this.show[this.formData.columns[i].clmName]) {
                    //                         this.showHide(
                    //                             this.show[this.formData.columns[i].clmName],
                    //                             value.thisValue
                    //                         );
                    //                     }
                    //                     if (this.setVal[this.formData.columns[i].clmName]) {
                    //                         this.setValue(
                    //                             this.setVal[this.formData.columns[i].clmName],
                    //                             value.thisValue
                    //                         );
                    //                     }
                    //                 }
                    //             },
                    //             ref: this.formData.columns[i].clmName
                    //         })
                    //     );
                    //     break;
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
                     * 照片上传
                     * */
                    case 72:
                        child.push(
                            createElement("autophotoupload", {
                                props: {
                                    value: this.formData.columns[i].clmValue,
                                    id: this.formData.columns[i].clmValue,
                                    fileKey: this.formData.columns[i].clmValue.split(":")[1],
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
                   * 图片上传
                   * */
                    case 74:
                        child.push(
                            createElement("autophotograph", {
                                props: {
                                    value: this.formData.columns[i].clmValue,
                                    id: this.formData.columns[i].clmValue,
                                    fileKey: this.formData.columns[i].clmValue.split(":")[1],
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
                                        if (this.formDataSubmit.emprecName) {

                                            this.formDataSubmit.emprecName = value.name
                                        }

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
                        let value = {};
                        if (this.formDataSubmit[this.formData.columns[i].clmName] !== '') {
                            value = JSON.parse(this.formDataSubmit[this.formData.columns[i].clmName]);
                        }
                        console.log(value, "value")
                        child.push(
                            createElement("autoMap", {
                                props: {
                                    value: value.name ? value.name : '',
                                    initPosition: value,
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
        return createElement(
            "div",
            {
                class: this.isScorllY ? 'form_list_y' : 'form_list',
                ref: "scrollBox",
                on: {
                    scroll: () => {
                        let selectDom = document.getElementsByClassName('ivu-select-visible');
                        let datePickerDom = document.getElementsByClassName('ivu-date-picker-focused');
                        if (selectDom.length > 0 || datePickerDom.length > 0) {
                            let modal = document.getElementsByClassName("modal")[0];
                            modal.click();
                        }
                    }
                }
            },
            [
                createElement(
                    "Form",
                    {
                        props: {
                            "label-width": this.lebWidth,
                            rules: this.ruler,
                            model: this.formDataSubmit
                        },
                        ref: "formList"
                    },
                    [createElement("Row",
                        {
                            class: 'Row-box',
                            style: {
                                position: 'static'
                            }
                        },
                        [childTable.length > 0 ? childTable : nodes]
                    )]
                )
            ]
        );
    }
};