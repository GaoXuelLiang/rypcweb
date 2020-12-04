<template>
    <div class="table_box">
        <commonMainTable @specialButton="specialButton"
                         @openUpdate="openUpd"
                         ref="commonMainTable"
                         @title="title"></commonMainTable>
        <transition name="fade">
            <autoChildBase v-if="openUpdate"
                           :logType="logType"
                           :mainTitle="titleName"
                           @closeUp="closeUpd"
                           :id="updateId"
                           @changeLogtype="changeLogtype"
                           @addNewArray="addNewArray"
                           @updateArray="updateArray"
                           ref="update"></autoChildBase>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import autoChildBase from '@/pages/autoPage/autoEmpBaseinfo/autoEmpBaseinfoBase'
export default {
    data () {
        return {
            titleName: '',
            logType: '',
            openUpdate: '',
            updateId: NaN,
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
    mouted () {

    },
    methods: {
        specialButton (code) {
            console.log(code, 'code')
        },
        title (val) {
            console.log(val, 'vallll')
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
        },
        addNewArray (res) {
            const t = this
            t.$refs.commonMainTable.data.unshift(res)
        },
        updateArray (res) {
            const t = this
            t.$refs.commonMainTable.data.splice(t.index, 1, res)
        },
        // 改变logType--主子表新增成功后变为修改
        changeLogtype(logType){
            const t = this;
            t.logType = logType;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>