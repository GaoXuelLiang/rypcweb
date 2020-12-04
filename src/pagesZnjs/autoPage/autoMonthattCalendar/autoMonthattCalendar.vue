<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-06 14:20:06
 * @LastEditTime: 2020-10-26 18:12:30
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable" @specialButton="btnEvents"  :isSpecial='true'></commonMainTable>
        <transition name="fade">
            <updateCalendar v-show="openCalendar"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    :selectionAlldata='selectionAlldata'
                    :tableselected='tableselected'
                    @closeUp="closeUp"
                    @setFileKey= 'setFileKey'
                    ref="updateCalendar"></updateCalendar>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import updateCalendar from './updateCalendar'
export default {
    data () {
        return {
            openCalendar: false,
            updateId: '',
            logType: '',
            index: 0,
            isSpecialUpd:true,
            isSpecialAdd:true,
            isSpecialView:true,
            tableselected:[],
            selectionAlldata:[]
        }
    },
    components: {
        commonMainTable,
        updateCalendar,
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        //特殊按钮事件
        btnEvents(code,t){
            if(code ==='export_calendar'){
                t.logType = "导出工作日历模板"
                this.selectionAlldata = t.selectionAlldata
                this.tableselected = t.tableselected
                this.openUp(t.updateId, t.logType, t.index)
            }
        },
         openUp (id, logType, index) {
            const t = this
            t.updateId = id
            t.logType = logType
            t.openCalendar = true
            t.index = index
            // t.$refs.updateCalendar.getData(id, localStorage.companyId)
            // if (id !== '') {
            //     t.$refs.update.getData(id)
            // }
        },
        closeUp () {
            const t = this
            t.openCalendar = false;
        },
        setFileKey(filekey, filename, openExpDow){
            const t = this
            t.closeUp()
            t.$refs.commonMainTable.setFileKey(filekey, filename, openExpDow)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>