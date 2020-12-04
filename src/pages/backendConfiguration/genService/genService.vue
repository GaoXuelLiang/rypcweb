<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"></commonMainTable>
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
        commonMainTable
    },
    mounted () {
        // this.$refs.commonMainTable.getColumns()
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
</style>