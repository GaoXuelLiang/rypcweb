<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-13 10:46:53
 * @LastEditTime: 2020-10-26 13:13:51
 * @LastEditors: Sok
-->
<template>
    <div>
        <autoChildTable 
       @specialButton="specialButton"
      :isSpecial="isSpecial"
                        ref="autoChildTable"></autoChildTable>
       
        <formula v-show="showMsg1" @hideMsg="hideMsg" :id="id" ref="formula" ></formula>            
    </div>
</template>

<script>
import autoChildTable from '@/components/autoCommonPage/autoChildTable'
//薪资公式
import formula from './formulaView'
import { btnEvent} from '@/components/specialButton/index'
export default {
    data () {
        return {
            isSpecial:true,
            showMsg1:false,
            id:'',
            // mainId:''
        }
    },
    components: {
        autoChildTable,
        formula
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
            if(code == 'btn_y_formulas'){
                this.showMsg1 = true
                this.id = params.row.id
                this.$refs.formula.getData(params.row.id,t.mainId,params.row)
                
                console.log(code,'33333222111')
            }
        },
        hideMsg() {
            this.showMsg1 = false
      },

        getColumns () {
            this.$refs.autoChildTable.getColumns()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>