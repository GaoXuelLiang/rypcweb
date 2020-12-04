<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         @specialButton="btnEvents"></commonMainTable>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
export default {
    data () {
        return {
		}
    },
    components: {
        commonMainTable,
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        //特殊按钮事件
        btnEvents (code, t) {

        },
    }
}
</script>

<style lang="scss" scoped>
</style>


,{
    path: "autoOrgLegalety",
    name: "autoOrgLegalety",
    component: resolve =>
      require([
        "@/pages/autoPage/autoOrgLegalety/autoOrgLegalety"
      ], resolve)
  }