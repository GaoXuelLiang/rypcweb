<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-06 14:20:06
 * @LastEditTime: 2020-08-18 13:45:40
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable" @specialButton="btnEvents"  ></commonMainTable>
        <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    ref="update"></update>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import update from './updateRoleMange'
export default {
    data () {
        return {
            openUpdate: false,
            updateId: NaN,
            logType: '',
            index: 0,
            isSpecialUpd:true,
            isSpecialAdd:true,
            isSpecialView:true
        }
    },
    components: {
        commonMainTable,
        update,
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
            if(code ==='button_y_allocation'){
                t.logType = "分配权限"
                this.openUp(t.updateId, t.logType, t.index,params.row.companyId,params.row.rolegrpType)
            }
        },
         openUp (id, logType, index,companyId, roleType) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getData(id,companyId,roleType)
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