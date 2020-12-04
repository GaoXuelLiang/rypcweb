<template>
    <div class="table">
        <commonMainTable ref="commonMainTable" :isSpecial="true" @specialButton="btnEvents"></commonMainTable>
        <transition>
            <upAttMoncheck v-show="openAttMon" @closeAttMon="closeAttMon"></upAttMoncheck>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import upAttMoncheck from './upAttMoncheckHandle'
export default {
    data () {
        return {
            openAttMon:false,
        }
    },
    components: {
        commonMainTable,
        upAttMoncheck
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        btnEvents(code,t,params){
            console.log(code,"code")
            if(code ==='button_attgenerate'){
                this.openUp();
                // this.openUp(t.updateId, t.logType, t.index,params.row.userId,params.row.companyId,params.row.poroIsper)
            }
        },
        openUp() {
            const t = this;
            t.openAttMon = true;
        },
        closeAttMon(val) {
            const t = this;
            t.openAttMon = false;
            if(val === '1') {
                t.$refs.commonMainTable.getData();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>