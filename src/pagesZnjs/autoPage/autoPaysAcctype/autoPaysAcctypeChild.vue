<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-13 10:46:53
 * @LastEditTime: 2020-11-10 14:59:58
 * @LastEditors: Please set LastEditors
-->
<template>
    <div>
        <autoChildTable 
       @specialButton="specialButton"
      :isSpecial="isSpecial"
                        ref="autoChildTable"></autoChildTable>
       
        <formula v-show="showMsg1" @hideMsg="hideMsg" :id="id" ref="formula" ></formula>
        <transition>
            <setOrder v-show="openOrder" 
                      ref="setOrder"
                      :showName="'proSalidDis'"
                      @getData="getData" 
                      @closeOrder="closeOrder"></setOrder>
        </transition>            
    </div>
</template>

<script>
import autoChildTable from '@/components/autoCommonPage/autoChildTable'
//薪资公式
import formula from './formulaView'
import { btnEvent} from '@/components/specialButton/index'
import setOrder from './myOrder'
export default {
    data () {
        return {
            openOrder:false,
            isSpecial:true,
            showMsg1:false,
            id:'',
            // mainId:''
        }
    },
    components: {
        autoChildTable,
        formula,
        setOrder
    },
    mounted () {
        console.log(1111)
    },
    destroyed () {

    },
    computed:{
        mainId () {
            return this.$store.state.autoCommonPage.mainId;
        },
    },
    mouted () {

    },
    methods: {
        specialButton(code, t,params) {    
            if(code == 'btn_y_formula'){
                this.showMsg1 = true
                this.id = params.row.id
                this.$refs.formula.getData(params.row.id,t.mainId,params.row)
                
                console.log(code,'33333222111')
            }
            if(code == 'btn_AdjustmentOrder'){
                console.log(code,'code',t,params)
                this.orderEvent(t)
            }
        },
        hideMsg() {
            this.showMsg1 = false
        },

        getColumns () {
            this.$refs.autoChildTable.getColumns()
        },
          // 排序
    orderEvent(t){
      this.openOrder = true;
      this.$refs.setOrder.getData(t);
    },
    getData(){
      this.$refs.autoChildTable.getData();
    },
    closeOrder(){
      this.openOrder = false;
    },
    },
}
</script>

<style lang="scss" scoped>
</style>