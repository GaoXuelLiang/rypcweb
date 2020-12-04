<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         :isSpecial="isSpecial"
                         :isSpecialvalid='isSpecialvalid'
                         @specialButton="btnEvents"></commonMainTable>
                <!-- 生效、失效 -->
        <transition name="fade">
            <validModel  v-if="openValid"
                         :logType="logType"
                         :dom="dom"
                         :ruleValidate="ruleValidate"
                         :isReason="true"
                         @closeValid="closeValid"
                         ref="validModel"></validModel>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import validModel from '@/components/validModel/validModel'
export default {
    data () {
        return {
            isSpecial: false,
            isSpecialvalid:true,
            openValid: false,
            logType: '',
            dom:''
		}
    },
    components: {
        commonMainTable,
        validModel
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        //特殊按钮事件
        btnEvents (code, t ,params) {
            this.dom = t
            if (t.tableselected.length === 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: this.$t('reminder.leastone'),
                })
                return 
            }
            if (code === "button_valid") {
                this.logType = this.$t('button.eft')
                if(t.tableselected.length > 1){
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: this.$t('reminder.onlyone'),
                    })
                    return
                }
                this.ruleValidate = {
                    validTime: [
                        {
                            required: true,
                            type: "date",
                            message: "生效日期不能为空",
                            trigger: "change"
                        }
                    ],
                }
            }else if (code === "button_invalid") {
                this.logType = this.$t('button.fai')
                 this.ruleValidate = {
                    invalidTime: [
                        {
                            required: true,
                            type: "date",
                            message: "失效日期不能为空",
                            trigger: "change"
                        }
                    ],
                    memo: [
                        {
                            required: true,
                            message: "失效原因不能为空",
                            trigger: "change"
                        }
                    ]
                }
            }

            this.openValid = true;
            
        },
        // 生效，失效
        closeValid () {
            const t = this
            t.openValid = false;
        },
    }
}
</script>

<style lang="scss" scoped>
</style>