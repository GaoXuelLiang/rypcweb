
<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="10"
               class="col-box"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <DatePicker :value="thisValue" 
                            @on-change="change"
                            type="daterange"
                            style="width:100%"
                            :placeholder="'请选择' + itemLabel"
                            :disabled="thisDis"
                            :editable='false'
                            :transfer='true'></DatePicker>
            </FormItem>
        </i-col>
        <i-col span="10"
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
        itemLabel: String,
        message: String,
        required: Boolean,
        ruleText: String,
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
    },
    methods: {
        change (value) {
            if(value ==undefined){
                this.$emit('on-change', '')
            }else{
                this.$emit('on-change', value)
            }
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
// .col-box {
//     position: static;
//     /deep/ .ivu-form-item-content {
//         position: static;
//     }
// }
</style>
