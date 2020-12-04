<template>
    <div>
        <autoChildTable @specialButton="specialButton"
                        ref="autoChildTable"></autoChildTable>
    </div>
</template>

<script>
import autoChildTable from '@/components/autoCommonPage/autoChildTable'
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
            console.log(code, "code");
        },
        getColumns () {
            this.$refs.autoChildTable.getColumns()
        }
    },
}
</script>

<style lang="scss" scoped>
</style>