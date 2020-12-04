<template>
    <div>
        <div v-if="roleType==='3user' || roleType==='3user-hrbp' || roleType==='4coe'">
            <hometest></hometest>
        </div>
        <div v-else-if="roleType === '0root' || roleType === '1admin'">
            <home></home>
        </div>
        <div v-else>
            <emp-page></emp-page>
        </div>
    </div>
</template>
<script>
import hometest from '../hometest/hometest'
import home from '../homePage/home'
import empPage from '../empzz/home'

export default {
    data () {
        return {
            tableheight: document.body.offsetHeight - 122,
        }
    },
    components: {
        hometest,
        home,
        empPage,
    },
    computed: {
        roleType () {
            return this.$store.state.user.roleType
        },
    },
}
</script>
<style lang="scss">
.title-tip {
    margin-right: 10px;
    width: 4px;
    height: 16px;
    background: rgba(0, 162, 255, 1);
}
</style>
