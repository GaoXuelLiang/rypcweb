<template>
    <div>
        <autoChildTable @specialButton="specialButton"
                        :isSpecial="isSpecial"
                        ref="autoChildTable"></autoChildTable>
        <transition>
            <setOrder v-show="openOrder" 
                      ref="setOrder"
                      :showName="'sffFieldNameCnDis'"
                      @getData="getData" 
                      @closeOrder="closeOrder"></setOrder>
        </transition>
    </div>
</template>

<script>
import autoChildTable from '@/components/autoCommonPage/autoChildTable'
import {btnEvent} from '@/components/specialButton/index'
// 排序
import setOrder from '@/components/order/order'
export default {
    data () {
        return {
            openOrder:false,
            isSpecial:true,
        }
    },
    components: {
        autoChildTable,
        setOrder,
    },
    mounted () {

    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        specialButton (code, t) {
            console.log(code, "code11");
            if(code == 'button_order') {
                this.orderEvent(t)
            }
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