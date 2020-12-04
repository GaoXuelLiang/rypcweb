<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="21"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <span @dblclick="dubClear">
                    <Input v-model="thisValue"
                           icon='ios-search'
                           @on-click="openModal"
                           readonly
                           :disabled="thisDis" 
                           class="ios-search"
                           :placeholder="'请选择'+itemLabel"></Input>
                </span>
            </FormItem>
        </i-col>
        <i-col span="10"
               offset="1"
               v-if="message">
            <div class="message">{{message}}</div>
        </i-col>
        <autoSearchtable v-if="showModal"
                         @closeUp="closeModal"
                         :modiaContent="modiaContent"
                         @changeinput="changeinput"
                         @setJLData='setJLData'
                         :sffFilter="sffFilter"
                         :sffCascadeget="sffCascadeget"
                         autoTableType="multi"
                         :dataKey="dataKey"
                         :form="form">
        </autoSearchtable>
    </div>
</template>
<script>
import autoSearchtable from '../searchTable/autoSearchtable'
import { deepCopy } from '../../../lib/util';

export default {
    data () {
        return {
            showModal: false,
            thisValue: this.value,
            thisId: this.id,
            isshow: this.ruleText in this.show,
            thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
            thisForm: this.form,
           
        }
    },
    props: {
        value: String,
        itemLabel: String,
        message: String,
        required: Boolean,
        ruleText: String,
        id: String,
        modiaContent: String,
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        sffFilter: String, // 过滤条件
        sffCascadeget: String, // 级联条件
        form: Object, // 表单数据
        dis: Object, // 是否可编辑plus
        dataKey: String, //弹出配置iD
    },
    components: {
        autoSearchtable,
    },
    methods: {
         formData(data) {
            let arr = [];
            if (data === undefined) {
                return false;
            } else {
                let a = data.split(";");
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== "") {
                        // 去除空格的影响, 对过滤的影响
                        // 判断过滤条件是否包含'//'为自身最高级卡自身条件
                        if (a[i].indexOf("//") !== -1) {
                        let b = a[i].split("//");
                        let obj = {};
                        for (let j = 0; j < b.length; j++) {
                            if (b[j].substring(0, 1) !== "$") {
                                obj["key"] = b[j];
                            } else {
                                obj["value"] = b[j].substring(1);
                            }
                        }
                            arr.push(obj);
                        } else {
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
                }
            }
            return arr;
        },
        change111 () {
            let t = this
            t.$emit('change', t)
        },
        change() {
            this.$emit("on-change", this.thisId, this.thisValue);
        },
        changeValue(data, type, obj, filterField) {
            let dataValue = null
            if(type === '2') {
                dataValue = [data]
            } else {
                dataValue = data
            }
            dataValue.forEach((item) => {
                let arrs = item.split("@");
                for (let k in obj) {
                    if (arrs[0].indexOf(k) > -1) {
                    filterField[arrs[1]] = obj[k];
                    }
                }
                });
        },
        openModal () {
            if (this.modiaContent === '' || this.modiaContent === undefined || this.thisDis === true) {
                return
            } 
                 console.log(this.sffFilter, '222111111111111')
                let morePop = {}
                if(this.sffFilter) {
                    if(this.sffFilter.indexOf('//') > -1 && this.sffFilter.indexOf('$') > -1) {
                           console.log(param, 'param') 
                           const param = this.sffFilter.split('//')
                           morePop[param[0]] = param[1].split('$')[1]
                           console.log(morePop, '222222poppp')
                    }
                }
            // 过滤条件不为空， 先判断过滤条件是否已经写入
            if (this.sffFilter) {
                let rule = this.formData(this.sffFilter)
                let obj = this.$store.state.flowClmkMap.localField;
                if (rule) {
                    let filterField = {};
                    const rules = rule[0].key;
                    console.log(rules, 'ruless')
                if(rules.indexOf("&&") > -1 && rules.indexOf("||") > -1) { // 过滤多个赋值
                    let arr = rules.split('&&')[0].split('||')
                    this.changeValue(arr, '1', obj, filterField)
                } else if(rules.indexOf("&&") > -1 && rules.indexOf("||") == -1) { // 过滤单个赋值
                    let arr = rules.split("&&")[0];
                    this.changeValue(arr, '2', obj, filterField)
                } else if(rules.indexOf("&&") == -1 && rules.indexOf("||") > 1) {  // 多个赋值
                    let arr = rules.split('||');
                    this.changeValue(arr, '3', obj, filterField)
                } else if(rules.indexOf("&&") == -1 && rules.indexOf("||") == -1) { // 单个赋值
                    let arrs = rules.split("@");
                    for (let k in obj) {
                        if (arrs[0].indexOf(k) > -1) {
                        filterField[arrs[1]] = obj[k];
                        }
                    }
                }
                this.$store.commit("flowClmkMap/setPopField", filterField);
                }

                let Nice = this.$store.state.flowClmkMap.popForm;
                console.log(Nice, "nicekkeeee");
                // if (rule) {
                //     debugger
                //     for (let i = 0; i < rule.length; i++) {
                //         if (!this.$store.state.flowClmkMap.popForm[rule[i].value]) {
                //             let dis = this.$store.state.flowClmkMap.clmkvMap[rule[i].value]
                //             this.$Modal.warning({
                //                 title: this.$t('reminder.remind'),
                //                 content: '请先选择' + dis,
                //             })
                //             return
                //         }
                //     }
                // }
            }
            this.showModal = true
        },
        closeModal () {
            this.showModal = false
        },
        dubClear () {
            if (!this.thisDis) {
                this.thisValue = ''
                this.thisId = ''
            }
        },
        changeinput (id, value,autoTableType) {
            if(autoTableType !== 'submit'){
                this.thisValue = id
                this.thisId = value
               
            }else{
                this.thisValue = value
                this.thisId = id
                 console.log(id,'121213131')
            }
            this.change()
        },
        setJLData (obj) {
            this.$emit('setJLData', obj)
        },
    },
    watch: {
        thisId (val) {
            if (val !== '') {
                this.thisId = this.$store.state.flowClmkMap.popForm[this.ruleText]
            }
            this.change()
        },
        value (val) {
            this.thisValue = val

        },
        thisValue (val) {
            this.change111()
        },
        show: {
            handler: function (val) {
                this.isshow = this.ruleText in this.show
            },
            deep: true,
        },
        dis: {
            handler: function (val) {
                this.thisDis = this.disabled ? this.disabled : !this.dis[this.ruleText]
            },
            deep: true,
        },
    },
}
</script>
<style lang="scss" scoped>
.message {
    width: 100%;
    // border: 2px solid #f2f7fd;
    min-height: 33px;
    padding: 4px 10px;
    line-height: 24px;
    margin-bottom: 24px;
    background-color: #f2f7fd;
}
.ios-search{
    cursor: pointer;
}
</style>
