<template>
    <div>
        <autoChildTable @specialButton="specialButton"
                        ref="autoChildTable"></autoChildTable>
    </div>
</template>

<script>
import autoChildTable from '@/components/autoCommonPage/autoChildTable'
import { btnEvent } from '@/components/specialButton/index'
export default {
    data () {
        return {
        }
    },
    components: {
        autoChildTable,
    },
    mounted () {

    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        specialButton (code, t) {
        },
        getColumns () {
            this.$refs.autoChildTable.getColumns()
        },
    },
}
</script>

<style lang="scss" scoped>
</style>