<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-11-19 13:31:53
 * @LastEditTime: 2020-11-19 13:39:13
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         :isSpecial="isSpecial"
                         @openUpdate='openUpdate'
                         @specialButton="btnEvents"></commonMainTable>
        <!-- 花名册 -->
        <!-- <transition name="fade">
            <employeEdetails  v-if="openEmploye"
                         :logType="logType"
                         @closeEmploye="closeEmploye"
                         :accountId = 'accountId'
                         ref="employeEdetails"></employeEdetails>
        </transition> -->
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoSpecileTable/autoMainTablePaysSalaryDetail'
// import employeEdetails from './employeEdetails'
export default {
    data () {
        return {
            isSpecial: true,
            openEmploye: false,
            logType: '',
            selectionAlldata:[],
            accountId:''
		}
    },
    components: {
        commonMainTable,
        // employeEdetails
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        // 
        openUpdate(){
            const t = this
            t.openEmploye =  true 
        },
        closeEmploye(){
            const t = this 
            t.openEmploye = false
        },
        //特殊按钮事件
        btnEvents (code, t ,params) {
            if (code === "button_y_particulars") {
               this.openEmploye =  true
               this.logType = '员工明细'
               this.selectionAlldata = t.selectionAlldata
                // const ids = []
                // for(let i = 0; i <  t.selectionAlldata.length; i++){
                //     // 添加到
                //     ids.push(t.selectionAlldata[i].busiRollid)
                // }
                this.accountId= params.row.busiRollid
                 t.$store.commit('autoCommonPage/setMainId', params.row.id);
            }else{
                
            }
        },
    }
}
</script>

<style lang="scss" scoped>
</style>