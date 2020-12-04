<template>
    <div class="table_box">
        <commonMainTable @specialButton="specialButton" 
                         :isSpecialAdd="isSpecial"
                         @openUpdate="openUpd"
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
        <transition name="fade">
            <empUpd
                        v-if="openAddEmp"
                         @closeEmp="closeEmp"
                         :id="updateId"
                         @getData="addNewArray"
                         @update="updateArray"
                         :logType="logType"
                         ref="addemployee"
            ></empUpd>
        </transition>
    </div>
</template>
<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import autoChildBase from '@/pages/autoPage/autoMyEmpBaseinfo/autoEmpBaseinfoBase'
import empUpd from './addNewEmployee'
export default {
    data () {
        return {
            titleName: '',
            logType: '',
            openUpdate: '',
            updateId: NaN,
            isSpecial: true,
            openAddEmp:false,
        }
    },
    components: {
        commonMainTable,
        autoChildBase,
        empUpd
    },
    mounted () {
    },
    destroyed () {
    },
    mouted () {
    },
    methods: {
        specialButton (code, t) {
            if(code=="button_add"){
                console.log(2222222222222)
               this.openAddEmp = true
            }
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
        },
        closeEmp () {
            const t = this
            t.openAddEmp = false
        },
    }
}
</script>
<style lang="scss" scoped>
</style>