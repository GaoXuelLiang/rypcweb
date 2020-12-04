<template>
    <div class="table_box">
        <commonMainTable @specialButton="btnEvents" 
                         :isSpecial="isSpecial"
                         @openUpdate="openUpd"
                         ref="commonMainTable"
                         @title="title"></commonMainTable>
        <transition name="fade">
            <autoChildBase v-if="openUpdate"
                           :logType="logType"
                           :mainTitle="titleName"
                           @closeUp="closeUpd"
                           :id="updateId"
                           @addNewArray="addNewArray"
                           @updateArray="updateArray"
                           ref="update"></autoChildBase>
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
import autoChildBase from './autoOrgBusiareaBase'
import validModel from '@/components/validModel/validModel'
export default {
    data () {
        return {
            titleName: '',
            logType: '',
            openUpdate: '',
            updateId: NaN,
            openValid: false,
            isSpecial: true,
            dom:''
        }
    },
    components: {
        commonMainTable,
        autoChildBase,
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
        btnEvents (code, t) {
            console.log(code, 'code2222')
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
            }
        },
        // 生效，失效
        closeValid () {
            const t = this
            t.openValid = false;
        },
        title (val) {
            this.titleName = val
        },
        openUpd (val) {
            this.updateId = val.updateId;
            this.openUpdate = val.openUpdate
            this.logType = val.logType
        },
        //关闭新增修改弹窗
        closeUpd () {
            const t = this
            t.openUpdate = false
            // 关闭主子表弹窗把主表id置空
            const mainId = ''
            t.$store.commit('autoCommonPage/setMainId', mainId);
        },
        addNewArray (res) {
            const t = this
            t.$refs.commonMainTable.getUpData(res)
        },
        updateArray (res) {
            const t = this
            t.$refs.commonMainTable.updataTable(res)
        },
        // 改变logType--主子表新增成功后变为修改
        changeLogtype (logType) {
            const t = this;
            t.logType = logType;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
