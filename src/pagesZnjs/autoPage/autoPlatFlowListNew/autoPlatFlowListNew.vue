<template>
    <div class="table">
        <commonMainTable ref="commonMainTable" :isSpecial='true' @specialButton="btnEvents"></commonMainTable>
        <flowchat   @closeUp="close"
                    v-show="flowchart"
                    ref="flowchart"
                    logType="流程图编辑"></flowchat>
        <!-- <flowchat-view @closeUp="closeView"
                       v-show="flowchartView"
                       ref="flowchartView"
                       logType="流程图编辑"></flowchat-view> -->
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
// import flowchatView from "./flowchat/flowchatView"
import flowchat from "./flowchat/flowchat"
export default {
    data () {
        return {
            logType: '',
            // openUpdate: false,
            flowchart: false,
            // flowchartView: false,
            // flowchartId: NaN,
            // index: 0,
            // isSpecialUpd:true,
            // isSpecialAdd:true,
            // isSpecialView:true
        }
    },
    components: {
        commonMainTable,
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
            // if(code ==='button_y_proView'){
            //     t.logType = "流程查看"
                // this.openView(t.updateId)
            // }
            switch(code){
                case 'button_y_proEdit':
                    // this.logType = '流程图编辑';
                    this.open(t);
                    break;
            }
        },
        // openUp (id, logType, index) {
        //     const t = this
        //     t.updateId = parseInt(id, 10)
        //     t.logType = logType
        //     t.openUpdate = true
        //     t.index = index
        //     if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
        //         t.$refs.update.getData(t.updateId)
        //     }
        // },
        title (val) {
            this.titleName = val
        },
        open (t) {
            this.flowchart = true
            this.$refs.flowchart.states = 'update'
            this.$refs.flowchart.getListById(t.updateId)
        },
        // openView (id) {
        //     const t = this
        //     t.flowchartView = true
        //     t.$refs.flowchartView.states = 'update'
        //     t.$refs.flowchartView.getListById(id)
        // },
        close () {
            const t = this
            t.flowchart = false
        },
        // closeView () {
        //     const t = this
        //     t.flowchartView = false
        // },
        // closeUp () {
        //     const t = this
        //     t.openUpdate = false
        //     t.$refs.update.clear()
        // },
        // addNewArray (res) {
        //     const t = this
        //     if (t.data.length === 0) {
        //         t.data.push(res)
        //     } else {
        //         t.data.unshift(res)
        //     }
        // },
        // updateArray (res) {
        //     const t = this
        //     t.data.splice(t.index, 1, res)
        // },
    }
}
</script>

<style lang="scss" scoped>
</style>
