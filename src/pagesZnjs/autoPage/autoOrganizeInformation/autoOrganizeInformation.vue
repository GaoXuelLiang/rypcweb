<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-06 14:20:06
 * @LastEditTime: 2020-08-20 14:53:19
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable" 
                         @specialButton="btnEvents" 
                         :isSpecialViewTree='isSpecialViewTree'></commonMainTable>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    ref="update"></update>
        </transition>
        <!-- 生效、失效 -->
        <transition name="fade">
            <validModel  v-if="openValid"
                         :logType="logType"
                         :dom="dom"
                         :ruleValidate="ruleValidate"
                         @closeValid="closeValid"
                         ref="validModel"></validModel>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import update from './updaOrganizeInformation'
import validModel from '@/components/validModel/validModel'
export default {
    data () {
        return {
            openUpdate: false,
            updateId: NaN,
            logType: '',
            index: 0,
            // isSpecialUpd:true,
            // isSpecialAdd:true,
            // isSpecialView:true,
            // isSpecial:true
            isSpecialViewTree:true,
            openValid: false,
            isSpecial: false,
            dom:''
        }
    },
    components: {
        commonMainTable,
        update,
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
        btnEvents(code,t,params){
            if(code ==='button_viewOrgTree'){
                t.logType = "查看组织树"
                this.openUp(t.updateId, t.logType, t.index)
            }else if(code === "button_valid" || code === "button_invalid") {
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
            }
        },
        // 生效，失效
        closeValid () {
            const t = this
            t.openValid = false;
        },
         openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getData()
            // if (id !== '') {
            //     t.$refs.update.getData(id)
            // }
        },
        closeUp () {
            const t = this
            t.openUpdate = false;
        },
    }
}
</script>

<style lang="scss" scoped>
</style>