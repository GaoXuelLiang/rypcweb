<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="21"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <CheckboxGroup v-model="thisValue"
                               @on-change="change">
                    <Checkbox v-for="(item, index) in data"
                              :key="index"
                              :label="item.key"
                              :disabled="thisDis">{{item.value}}</Checkbox>
                </CheckboxGroup>
            </FormItem>
        </i-col>
        <i-col span="21"
               offset="1"
               v-if="message">
            <div class="message">{{message}}</div>
        </i-col>
    </div>
</template>
<script>
export default {
    data () {
        return {
            thisValue: this.value,
            isshow: this.ruleText in this.show,
            thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
        }
    },
    props: {
        value: Array,
        data: Array,
        itemLabel: String,
        message: String,
        ruleText: String,
        required: Boolean,
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
    },
    methods: {
        change (value) {
            this.$emit('on-change', value)
        },
        change111 () {
            let t = this
            t.$emit('change', t)
        },
    },
    watch: {
        value: function (val) {
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
/deep/ .ivu-checkbox-group {
    border: 1px solid #dcdee2;
    border-radius:5px;
    padding: 10px 20px;
}
/deep/ .ivu-checkbox-group-item {
    vertical-align: top
} 
/deep/ .ivu-checkbox {
    margin-right: 5px;
}
/deep/ .ivu-checkbox-wrapper{
    width:33%;
    margin-right:0;
}
</style>
