<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-06 14:20:06
 * @LastEditTime: 2020-08-09 15:07:31
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
import update from './updateUserInfo'
export default {
    data () {
        return {
            openUpdate: false,
            updateId: '',
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
        btnEvents(code,t){
            if(code ==='button_y_allocation'){
                t.logType = "分配权限"
                this.openUp(t.updateId, t.logType, t.index)
            }
        },
         openUp (id, logType, index) {
            const t = this
            t.updateId = id
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getData(id, localStorage.companyId)
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