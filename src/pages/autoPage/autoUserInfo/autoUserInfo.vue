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
        btnEvents(code,t){
            if(code ==='button_y_updpaw'){
                t.logType = "修改密码"
                this.openUp(t.updateId, t.logType, t.index)
            }
        },
         openUp (id, logType, index) {
            const t = this
            t.updateId = parseInt(id, 10)
            t.logType = logType
            t.openUpdate = true
            t.index = index
            t.$refs.update.getSelect()
            if (id !== '') {
                t.$refs.update.getData(id)
            }
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