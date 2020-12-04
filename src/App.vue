<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-07-27 18:20:58
 * @LastEditTime: 2020-11-25 19:27:12
 * @LastEditors: Sok
-->
<template>
    <div id="app"
         class="app-main"
         ref="Main">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'app',
    provide () {
        return {
            reload: this.reload,

        }
    },
    data () {
        return {
            isRouterAlive: true,
        }
    },
    computed: {
        funId () {
            return this.$store.state.user.funId
        },
    },

    mounted () {
        if (window.location.hash.replace("#/", "") === 'employeeHomeNew' || window.location.hash.replace("#/", "") === 'employeeHome' || window.location.hash.replace("#/", "") === 'individualStaff') {
            this.$refs.Main.style.overflow = 'auto'
        }
        if (this.funId !== '2') {
            this.$router.push('/')
        }
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => {
                this.isRouterAlive = true
            })
        },
    },
    destroyed () {
        window.removeEventListener('beforeunload', e => this.listenPage())
    },
}
</script>

<style lang='scss'>
@import "sass/base.scss";
@import "sass/table.scss";
@import "sass/content.scss";
</style>