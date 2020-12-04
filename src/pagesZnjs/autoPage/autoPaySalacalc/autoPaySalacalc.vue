<template>
    <div class="table_box">
        <commonMainTable @specialButton="specialButton"
                         :isSpecial="isSpecial"
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
        <!-- 公司明细 -->
        <transition name="fade">
            <companySubsidiary v-show="openComSub"
                               @closeSub="closeSub"
                               :sublogType="sublogType"
                               ref="companySubsidiary"></companySubsidiary>
        </transition>
        <!-- 公司明细 -->
        <transition name="fade">
            <employeeSubsidiary v-show="openEmpSub"
                                @closeSub="closeSub"
                                :sublogType="sublogType"
                                ref="employeeSubsidiary"></employeeSubsidiary>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import autoChildBase from '@/pagesZnjs/autoPage/autoPaySalacalc/autoPaySalacalcBase'
// 公司明细
import companySubsidiary from '@/pagesZnjs/autoPage/autoPaySalacalc/companySubsidiary'
// 员工明细
import employeeSubsidiary from '@/pagesZnjs/autoPage/autoPaySalacalc/employeeSubsidiary'

import flowPaySureErrorListVue from '../../../pages/common/applyLeaveorder/flowPaySureErrorList.vue'
export default {
    data () {
        return {
            titleName: '',
            logType: '',
            sublogType: "",
            isSpecial: true,
            openUpdate: '',
            updateId: NaN,
            // 公司明细
            openComSub: false,
            // 员工明细
            openEmpSub: false,
        }
    },
    components: {
        commonMainTable,
        autoChildBase,
        // 公司明细
        companySubsidiary,
        // 员工明细
        employeeSubsidiary,
    },
    mounted () {

    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        specialButton (code, t, params) {
        //   console.log(code,t,"特殊按钮");   

          if (code === "button_y_company") {
            // 公司明细
            // debugger
            this.openComSub = true;
            this.sublogType = "薪资公司明细";
            this.$refs.companySubsidiary.getTitle(params);
            // t.$refs.companySubsidiary.getData();
          } else if (code === "button_y_employee"){
            // 员工明细
            // this.openEmpSub = true;
            // this.sublogType = "薪资员工明细";
            // t.$refs.employeeSubsidiary.getData();
          } else {}
        },
        title (val) {
            this.titleName = val
        },
        openUpd (val) {
            this.updateId = val.updateId;
            this.openUpdate = val.openUpdate
            this.logType = val.logType
        },
        // 关闭公司明细
        closeSub(val){
          const t = this;
          if (val === "button_y_company") {
            t.openComSub = false;
          } else if (val === "button_y_employee") {
            t.openEmpSub = false; 
          }
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