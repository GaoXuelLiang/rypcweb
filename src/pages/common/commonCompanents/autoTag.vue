<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="21"
               class="col-box"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                    <Tag v-show="!tags.length" type="dot" size="medium">暂无数据</Tag>    
                    <Tag type="dot" 
                         size="medium" 
                         v-show="tags.length"
                         v-for="(item, index) in tags" 
                         :key="index"
                         :color="item.split(':')[0] == 'Ⅲ档' ? 'warning' : ''">{{item}}</Tag>
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
            // tags: this.value?this.value.split(',').slice(1,this.value.length):[]
        }
    },
    props: {
        value: String,
        data: Array,
        itemLabel: String,
        message: String,
        ruleText: String,
        required: Boolean,
        disabled: Boolean,  // 是否可编辑
        show: Object,  // 是否显示
        dis: Object, // 是否可编辑plus
    },
    computed: {
        tags: {
            get () {
                // console.log(this.value,"value")
                if(this.value) {
                    let arr = []
                    if(this.value.indexOf('id') !== -1) {
                        arr = this.value.split(',').slice(1,this.value.length);
                    }else {
                        arr = this.value.split(',');
                    }
                    return arr;
                }else {
                    return []
                }
            },
            set (val) {

            }
        },
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
</style>
