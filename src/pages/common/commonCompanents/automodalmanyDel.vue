<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="21"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <span @dblclick="dubClear">
                    <Input v-model="thisValue"
                           @on-click="openModal"
                           readonly
                           :disabled="thisDis"
                           icon='ios-search'
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
        <auto-searchtable-del v-if="showModal"
                              @closeUp="closeModal"
                              :modiaContent="modiaContent"
                              @changeinput="changeinput"
                              @setJLData='setJLData'
                              :sffFilter="sffFilter"
                              :sffCascadeget="sffCascadeget"
                              autoTableType="multi"
                              ref="autoSearchtableDel"
                              :tagForm="{
        thisId:thisId,
        thisValue:thisValue,
      }"
                              :form="form">
        </auto-searchtable-del>
    </div>
</template>
<script>
import autoSearchtableDel from '../searchTable/autoSearchtableDel'
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
    },
    components: {
        autoSearchtableDel,
    },
    methods: {
        formData (data) {
            let arr = []
            if (data === undefined) {
                return false
            } else {
                let a = data.split(';')
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== '') { // 去除空格的影响, 对过滤的影响
                        let b = a[i].split('=')
                        let obj = {}
                        for (let j = 0; j < b.length; j++) {
                            if (b[j].substring(0, 1) !== '$') {
                                obj['key'] = b[j]
                            } else {
                                obj['value'] = b[j].substring(1)
                            }
                        }
                        arr.push(obj)
                    }
                }
            }
            return arr
        },
        change111 () {
            let t = this
            t.$emit('change', t)
        },
        change () {
            this.$emit('on-change', this.thisId)
        },
        openModal () {
            if (this.modiaContent === '' || this.modiaContent === undefined || this.thisDis === true) {
                return
            }
            // 过滤条件不为空， 先判断过滤条件是否已经写入
            if (this.sffFilter) {
                let rule = this.formData(this.sffFilter)
                if (rule) {
                    for (let i = 0; i < rule.length; i++) {
                        if (!this.$store.state.flowClmkMap.popForm[rule[i].value]) {
                            let dis = this.$store.state.flowClmkMap.clmkvMap[rule[i].value]
                            this.$Modal.warning({
                                title: this.$t('reminder.remind'),
                                content: '请先选择' + dis,
                            })
                            return
                        }
                    }
                }
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
        changeinput (id, value) {
            this.thisValue = value
            this.thisId = id
            this.change()
            // console.log(id)
            // console.log(value)
        },
        setJLData (obj) {
            this.$emit('setJLData', obj)
        },
    },
    watch: {
        thisId (val) {
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
