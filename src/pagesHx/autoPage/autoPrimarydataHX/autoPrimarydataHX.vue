<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-11-07 18:02:43
 * @LastEditTime: 2020-11-09 13:33:35
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         :isSpecial="isSpecial"
                         :isSpecialvalid='isSpecialvalid'
                         @specialButton="btnEvents"></commonMainTable>
                <!-- 主数据子表特殊导入 -->
        <transition name="fade">
            <importModelPrimarydata  v-if="openPrimarydata"
                         :logType="logType"
                         :dom="dom"
                         :imp_mt='imp_mt'
                         @closePrimarydata="closePrimarydata"
                         ref="importModelPrimarydata"></importModelPrimarydata>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import importModelPrimarydata from '@/components/importModelPrimarydata/importParam'
export default {
    data () {
        return {
            isSpecial: false,
            isSpecialvalid:true,
            openPrimarydata: false,
            logType: '',
            dom:'',
            imp_mt:this.$global.mt+'EmpBaseinfo.importSubData'
		}
    },
    components: {
        commonMainTable,
        importModelPrimarydata
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
            // if (t.tableselected.length === 0) {
            //     t.$Modal.warning({
            //         title: this.$t('reminder.remind'),
            //         content: this.$t('reminder.leastone'),
            //     })
            //     return 
            // }
            if (code === "button_childImport") {
                this.logType = '子表导入'
            }

            this.openPrimarydata = true;
            
        },
        // 子表导入
        closePrimarydata () {
            const t = this
            t.openPrimarydata = false;
        },
    }
}
</script>

<style lang="scss" scoped>
</style>