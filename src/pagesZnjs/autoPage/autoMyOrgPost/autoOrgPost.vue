<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                        :isSpecial="isSpecial"
                         @specialButton="btnEvents"></commonMainTable>
          <!-- 生效、失效 -->
        <transition name="fade">
            <validModel  v-if="openValid"
                        :logType="logType"
                        :dom="dom"
                        :isReason="true"
                        :ruleValidate="ruleValidate"
                        @closeValid="closeValid"
                        ref="validModel"></validModel>
        </transition>
        <!-- 推送主数据 -->
        <transition name="fade">
            <pushUpdate v-if="openPushUpdate"
                        :dom="dom"
                        :mtype="mtype"
                        :title="pushTitle"
                        @closePushUpdate="closePushUpdate"
                        ref="pushUpdate"></pushUpdate>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import validModel from '@/components/validModel/validModel'
import pushUpdate from '@/components/pushUpdate/pushUpdate'
export default {
    data () {
        return {
            openValid: false,
            isSpecial: true,
            dom:'',
            openPushUpdate: false,
            pushTitle: "推送岗位数据更新",
            mtype: 'orgPost',
		}
    },
    components: {
        commonMainTable,
        validModel,
        pushUpdate
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        //特殊按钮事件
        btnEvents (code, t) {
            if(code === "button_valid" || code === "button_invalid") {
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
                    }
                }

                this.openValid = true;
            } else if (code === "button_pushUpdate") {
                this.openPushUpdate = true;
                this.dom = t
            }
        },
        // 生效，失效
        closeValid () {
            const t = this
            t.openValid = false;
            this.openPushUpdate = false;
        },
         //关闭推送主数据
        closePushUpdate () {
            this.openPushUpdate = false;
        },
    }
}
</script>

<style lang="scss" scoped>
</style>