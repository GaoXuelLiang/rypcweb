<template>
    <div class="table">
        <!-- <commonMainTable ref="commonMainTable" :isSpecial='true' @specialButton="btnEvents"></commonMainTable> -->
        <commonMainTable @specialButton="btnEvents"
                         @openUpdate="openUpd"
                         :isSpecial='true'
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
      <flowchat @closeUp="close" v-show="flowchat" ref="flowchat" logType="流程图编辑"></flowchat>
      <!-- <flowchat-view @closeUp="closeView" v-show="flowchatView" ref="flowchatView" logType="流程图编辑"></flowchat-view> -->
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import autoChildBase from '@/pages/autoPage/autoPlatApprovalListNew/autoPlatApprovalBase'
// import flowchatView from './flowchatView'
 import flowchat from './flowchat.vue'
export default {
    data () {
        return {
            logType: '',
            statusDis: this.$t('status.valid'),
            openUpdate: false,
            openUpdateView: false,
            flowchat: false,
            flowchatView: false,
            flowchartId: NaN,
            index: 0,
            isSpecialUpd:true,
            isSpecialAdd:true,
            isSpecialView:true
        }
    },
    components: {
        commonMainTable,
        // flowchatView,
        autoChildBase,
        flowchat
    },
    
    mounted () {
    },
    destroyed () {

    },
    activated () {

    },
    methods: {
          //特殊按钮事件
        btnEvents(code,t){
            console.log(code)
            console.log(t, '111')
            if(code ==='button_y_proView'){
                t.logType = "流程查看"
                this.openView(t.updateId)
            }else if(code ==='button_y_proEdit'){
                t.logType = "流程编辑"
                this.open(t.updateId)
            }
        },
      open(id, aprvForm) {
          const t = this
          t.$store.commit('platApproval/setIndex')
  //        t.$refs.flowchat.flstepFlow = id
          t.$refs.flowchat.getListById(id)
          t.$store.commit('flowStepData/setAprvForm', aprvForm)
          t.$store.commit('platApproval/setMainId', id)
          t.flowchat = true
      },
      openView(id, aprvForm) {
        const t = this
        t.$store.commit('platApproval/setIndex')
//        t.$refs.flowchat.flstepFlow = id
        t.$refs.flowchatView.getListById(id)
        t.$store.commit('flowStepData/setAprvForm', aprvForm)
        t.$store.commit('platApproval/setMainId', id)
        t.flowchatView = true
      },
      close() {
        const t = this
        t.flowchat = false
      },
      closeView() {
        const t = this
        t.flowchatView = false
      },
      openUp(id, logType, index) {
        const t = this
        t.$store.state.platApproval.mainLogType = logType
        t.openUpdate = true
        t.logType = logType
        t.$store.commit('platApproval/setIndex', index)
        t.$refs.update.setMainId(id)
        t.index = index
      },
      openUpView(id, logType, index) {
        const t = this
        t.$store.state.platApproval.mainLogType = logType
        t.openUpdateView = true
        t.logType = logType
        t.$store.commit('platApproval/setIndex', index)
        t.$refs.updateView.setMainId(id)
        t.index = index
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      closeUpView() {
        const t = this
        t.openUpdateView = false
      },
//         open (id) {
//             const t = this
//             t.flowchart = true
//             t.$refs.flowchart.states = 'update'
//             t.$refs.flowchart.getListById(id)
//         },
//        openView(id, aprvForm) {
//         const t = this
//         t.$store.commit('platApproval/setIndex')
// //        t.$refs.flowchat.flstepFlow = id
//         t.$refs.flowchatView.getListById(id)
//         t.$store.commit('flowStepData/setAprvForm', aprvForm)
//         t.$store.commit('platApproval/setMainId', id)
//         t.flowchatView = true
//       },
//         close () {
//             const t = this
//             t.flowchart = false
//         },
//         closeView() {
//             const t = this
//             t.flowchatView = false
//         },
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
    }
}
</script>

<style lang="scss" scoped>
</style>
