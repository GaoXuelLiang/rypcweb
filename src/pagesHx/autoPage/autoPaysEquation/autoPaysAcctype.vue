<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-26 10:12:52
 * @LastEditTime: 2020-10-26 13:15:48
 * @LastEditors: Sok
-->
<template>
    <div class="table_box">
        <commonMainTable @specialButton="specialButton"
                         @openUpdate="openUpd"
                         :isSpecial="isSpecial"
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
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import autoChildBase from '@/pagesHx/autoPage/autoPaysEquation/autoPaysAcctypeBase'
export default {
    data () {
        return {
            titleName: '',
            logType: '',
            openUpdate: '',
            updateId: NaN,
            isSpecial:true
        }
    },
    components: {
        commonMainTable,
        autoChildBase
    },
    mounted () {
    },
    destroyed () {

    },
    methods: {
        specialButton (code, t) {

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