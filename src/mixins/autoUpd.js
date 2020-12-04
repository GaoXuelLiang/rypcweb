/*
 * @Author: chneY
 * @Date: 2020-07-27 11:04:24
 * @Last Modified by: chenY
 * @Last Modified time: 2020-11-26 19:36:51
 */
import validCode from "@/pages/common/commonCompanents/validCode";
export const autoUpd = {
    data () {
        return {
            loading: false, //loading
            formData: {}, //原始自动布局配置数据
            formlist: {}, //过滤删选后的数据
            clmkvMap: {}, //所有弹出框的名称
            popForm: {}, //所有弹出框的值
            tbName: "", //当前表单
            id: "", //数据Id
            content: false //form组件显示状态
        };
    },
    computed: {
        popFormNice () {
            return this.$store.state.flowClmkMap.popForm;
        }
    },
    methods: {
        /*
         * 格式化数据
         * */
        getFormDataSubmit (data, res) {
            const t = this
            let columns = data; // 字段
            let formData = {};
            let form = {}; // 表单
            let ruler = {}; // 校验规则
            let dis = {};
            let clmmap = {};
            let setValEvents = {}; //设值逻辑事件
            let showEvents = {}; //显示隐藏事件
            for (let c of columns) {
                if (c.clmValue == undefined) {
                    c.clmValue = ''
                }
            }
            const companyId = Number(localStorage.getItem('companyId'))
            if (companyId) {
                columns = columns.filter(item => {
                    if (item.clmName == 'companyIdDis' || item.clmName == 'companyId') {
                        return false
                    } else {
                        return true
                    }
                })
            }
            let obj = this.$store.state.flowClmkMap.localField
            for (let i = 0; i < columns.length; i++) {

                // 获取getByid数据重新给赋值
                if (res != undefined) {
                    for (let j in res) {
                        if (j == columns[i].clmName) {
                            columns[i].clmValue = res[j];
                        } else if (j == columns[i].clmName + "Dis") {
                            columns[i].clmDisValue = res[j];
                        }
                    }
                } else {
                    // 判断是否有默认值
                    if (columns[i].sffDefault) {
                        if (columns[i].clmLayout === 13) { //弹出框
                            if (columns[i].sffDefault.indexOf('&') !== -1) {
                                let value = columns[i].sffDefault.split('&');
                                columns[i].clmValue = value[0];
                                columns[i].clmDisValue = value[1];
                            } else if (columns[i].sffDefault.indexOf('@user') !== -1) {
                                columns[i].clmValue = localStorage.getItem('userId');
                                columns[i].clmDisValue = localStorage.getItem('name');;
                            }

                        } else {
                            columns[i].clmValue = columns[i].sffDefault;
                        }
                    } else {
                        columns[i].clmValue = "";
                        columns[i].clmDisValue = "";
                    }
                }
                // 当数据类型为checkBox group时，需要数据类型为数组
                if (columns[i].clmLayout === 20) {
                    if (columns[i].clmValue && columns[i].clmValue !== "") {
                        form[columns[i].clmName] = columns[i].clmValue.split(",");
                    } else {
                        form[columns[i].clmName] = [];
                    }
                } else {
                    // 判断传过来的主表id和子表的配置的主表健值是否相同
                    if (columns[i].clmName == this.pid) {
                        columns[i].clmValue = this.pidVal;
                    }
                    // 判断表单是否有值 有值取clmValue字段值 无值取默认字段
                    if (columns[i].clmValue && columns[i].clmValue !== "") {
                        form[columns[i].clmName] = columns[i].clmValue;
                    } else {
                        if (columns[i].sffDefault && columns[i].sffDefault !== "") {
                            form[columns[i].clmName] = columns[i].sffDefault;
                        } else {
                            form[columns[i].clmName] = columns[i].clmValue;
                        }
                    }
                }
                if (columns[i].clmName !== "companyId") {
                    clmmap[columns[i].clmName] = columns[i].clmDbName;
                }
                //添加校验

                if (columns[i].columnValid) {
                    ruler[columns[i].clmName] = [];
                    for (let j = 0; j < columns[i].columnValid.length; j++) {
                        ruler[columns[i].clmName].push({
                            validator: (rule, value, callback) => {
                                if (columns[i].clmfilter && (columns[i].columnValid[j].clmvValue == '' || columns[i].columnValid[j].clmvValue == undefined)) {
                                    let arr = [];
                                    let results = false
                                    let data = columns[i].clmfilter
                                    let a = data.split(";");
                                    if (data.indexOf('//') > -1 || data.indexOf('@@') > -1) {
                                        results = true
                                    }
                                    for (let i = 0; i < a.length; i++) {
                                        if (a[i] !== "") {
                                            // 去除空格的影响, 对过滤的影响
                                            let b = a[i].split("=");
                                            let obj = {};
                                            for (let j = 0; j < b.length; j++) {
                                                if (b[j].substring(0, 1) !== "$") {
                                                    obj["key"] = b[j];
                                                } else {
                                                    obj["value"] = b[j].substring(1);
                                                }
                                            }
                                            arr.push(obj);
                                        }
                                    }
                                    arr.forEach((item, index) => {
                                        for (let k in t.popFormNice) {
                                            if (item.key == k && item.value == t.popFormNice[k]) {
                                                results = true
                                            }
                                            if (t.popFormNice[columns[i].clmName] == '') {
                                                results = true
                                            }
                                        }
                                    })
                                    if (!rule.required) {
                                        results = false
                                    }
                                    if ((value === "" && !rule.required)) {
                                        callback();
                                    } else {
                                        if (!validCode[rule.valid](value) && results) {
                                            callback(new Error(rule.message));
                                        } else {
                                            callback();
                                        }
                                    }
                                } else {
                                    let newVal = '';
                                    let isTime = '';
                                    let clmvValue = columns[i].columnValid[j].clmvValue
                                    if (clmvValue) {
                                        if (clmvValue.indexOf('@') > -1) {
                                            newVal = clmvValue.split('@')[0]
                                            isTime = clmvValue.split('@')[1]
                                        } else {
                                            newVal = columns[i].columnValid[j].clmvValue
                                        }
                                    }
                                    if ((value === "" && !rule.required)) {
                                        callback();
                                    } else {
                                        if (!validCode[rule.valid](value, t.popFormNice[newVal], isTime)) {
                                            columns.find(item => {
                                                if (item.clmName === newVal) {
                                                    this.newName = item.clmDname ? item.clmDname : ''
                                                    rule.message = rule.message + this.newName
                                                    callback(new Error())
                                                }
                                            })
                                            callback(new Error(rule.message));
                                        } else {
                                            callback();
                                        }
                                    }
                                }

                            },
                            trigger: "change",
                            required: columns[i].columnValid[j].clmvIsmust,
                            message:
                                columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
                            valid: columns[i].columnValid[j].clmvMod
                        });
                    }
                }
                // 赋值
                if (columns[i].clmfilter && columns[i].clmfilter.indexOf('@@') > -1) {
                    let arr = [];
                    if (columns[i].clmfilter.indexOf(';') > -1) {
                        for (let v of columns[i].clmfilter.split(';')) {
                            if (v.indexOf('@@') > -1) {
                                arr = v.split('@@');
                            }
                        }
                    } else {
                        arr = columns[i].clmfilter.split('@@')
                    }
                    for (let k in obj) {
                        if (k == arr[1]) {
                            if (form[columns[i].clmName] == '') {
                                if (columns[i].clmName.indexOf("Dis") !== -1) {
                                    let name = columns[i].clmName.split('Dis')[0];
                                    for (let v of columns) {
                                        if (v.clmName === name) {
                                            v.clmDisValue = obj[arr[1]]
                                        }
                                    }
                                }
                                columns[i].clmValue = obj[arr[1]]
                                form[columns[i].clmName] = obj[arr[1]]
                            }
                        }
                    }
                }
                //储存弹出框
                if (columns[i].clmLayout == 13 || columns[i].clmLayout == 12 || columns[i].clmLayout == 11 || columns[i].clmLayout == 1 || columns[i].clmLayout == 3 || columns[i].clmLayout == 80) {
                    this.popForm[columns[i].clmName] = columns[i].clmValue;
                    this.clmkvMap[columns[i].clmName] = columns[i].clmDname;
                }
                //添加显示隐藏事件
                if (columns[i].clmChgjs_dis && columns[i].clmChgjs_dis !== "") {
                    showEvents[columns[i].clmName] = columns[i].clmChgjs_dis;
                }
                //添加设置值事件
                if (columns[i].clmChgjs && columns[i].clmChgjs !== "") {
                    setValEvents[columns[i].clmName] = columns[i].clmChgjs;
                }
                // 默认是否显示
                if (columns[i].clmDefDis === false) {
                    delete form[columns[i].clmName];
                }
                if (columns[i].clmIsupdate === true) {
                    dis[columns[i].clmName] = true;
                } else {
                    dis[columns[i].clmName] = false;
                }

            }
            this.$store.commit("flowClmkMap/setClmkvMap", this.clmkvMap);
            this.clmkvMap = {}; // 清空
            this.$store.commit("flowClmkMap/setPopForm", this.popForm);
            this.popForm = {}; // 清空
            if (form.id == "") {
                delete form.id;
            }
            if (form.hasOwnProperty('unitScope')) {
                const oldvalue = form.unitScope
                console.log(oldvalue, 'oldvlueee')
                localStorage.setItem('oldvalue', oldvalue)
            }
            formData.column = columns
            formData.form = form;
            formData.ruler = ruler;
            formData.clmmap = clmmap;
            formData.dis = dis;
            formData.showEvents = showEvents;
            formData.setValEvents = setValEvents;
            return formData;
        },
        /**
         * 保存
         *
         */
        save () {
            this.$refs.commonSingleForm.saveForm(this);
        }
    }
};