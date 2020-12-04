<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-19 09:37:20
 * @LastEditTime: 2020-10-12 10:05:31
 * @LastEditors: Sok
-->
<template>
    <div style="width: 100%"
         v-if="isshow">
        <i-col span="21"
               offset="1">
            <FormItem :label="itemLabel"
                      :prop="ruleText">
                <div id="editor"></div>
                <Input type="text" v-show="false" v-model="thisValue" :placeholder="'请输入' + itemLabel" />
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
import E from 'wangeditor'

let editor = new E('#editor')
export default {
    data () {
        return {
            thisValue: this.value,
            isshow: this.ruleText in this.show,
        }
    },
    props: {
        value: String,
        itemLabel: String,
        message: String,
        required: Boolean,
        ruleText: String,
        show: Object,
    },
    mounted () {
        //降低富文本编辑器的z-index
        editor.customConfig.zIndex = 100
        editor.customConfig.onchange = (html) => {
        //   this.thisValue = editor.txt.text() // 绑定当前逐渐地值
          this.thisValue = html // 绑定当前逐渐地值
        }
        editor.create()
        editor.txt.html(this.thisValue)
    },
    methods: {
        // change () {
        //     this.$emit('on-change', this.thisValue)
        // },
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
            if(editor.txt.text()===''){
                this.$emit('on-change', '')
            }else{
                this.$emit('on-change', this.thisValue)
            }
            
            this.change111()
        },
        show: {
            handler: function (val) {
                this.isshow = this.ruleText in this.show
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
