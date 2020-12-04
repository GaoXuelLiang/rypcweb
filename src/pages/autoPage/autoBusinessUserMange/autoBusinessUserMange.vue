<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-06 14:20:06
 * @LastEditTime: 2020-08-28 15:15:57
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable" @specialButton="btnEvents"  ></commonMainTable>
        <transition name="fade">
            <update v-show="openUpdate"
                    :updateId="updateId"
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
                this.openUp(t.updateId, t.logType, t.index,params.row.userId,params.row.companyId,params.row.poroIsper)
            }
        },
         openUp (id, logType, index,userId,companyId,poroIsper) {
            const t = this
            if(poroIsper=='1'){
            t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: this.$t('reminder.allJurisdiction'),
                })
                return
            }
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.orangize_getData(id,userId,companyId,poroIsper)
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