<!--
 * @Author: your name
 * @Date: 2020-11-08 11:33:23
 * @LastEditTime: 2020-11-26 18:15:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\pages\empzz\autoMyResum\autoMyresume.vue
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable" @specialButton="btnEvents"  :isSpecial="isSpecial"></commonMainTable>
        <transition name="fade">
            <update v-show="openResume"
                    @closeEmpInfo="closeUp"
                    :empId="empId"
                    ref="update"></update>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import update from '@/pages/empzz/myResume'
export default {
    data () {
        return {
            openResume: false,
            updateId: NaN,
            logType: '',
            index: 0,
            isSpecial:true,
            empId:''
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
            const tt =this
            if(code ==='btn_y_resume'){
                tt.openResume = true;
                tt.empId = t.updateId.toString()
                 this.$nextTick(()=>{
                    this.$refs.update.getData()
                })
            }
        },
        //  openUp (id, logType, index) {
        //     const t = this
        //     t.updateId = parseInt(id, 10)
        //     t.logType = logType
        //     t.openResume = true
        //     t.index = index
        //     t.$refs.update.getSelect()
        //     if (id !== '') {
        //         t.$refs.update.getData(id)
        //     }
        // },
        closeUp () {
            const t = this
            t.openResume = false;
        },
    }
}
</script>

<style lang="scss" scoped>
</style>