<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         :isSpecial="isSpecial"
                         @specialButton="btnEvents"></commonMainTable>
        <!-- 推送主数据 -->
        <transition name="fade">
            <pushUpdate v-if="openPushUpdate"
                        :dom="dom"
                        :mtype="mtype"
                        :title="pushTitle"
                        @closePushUpdate="closePushUpdate"
                        ref="pushUpdate"></pushUpdate>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import pushUpdate from '@/components/pushUpdate/pushUpdate'
export default {
    data () {
        return {
            openPushUpdate: false,
            isSpecial: true,
            dom:"",
            pushTitle: "推送职等数据更新",
            mtype: 'orgLevel',
		}
    },
    components: {
        commonMainTable,
        pushUpdate
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
            if (code === "button_pushUpdate") {
                this.openPushUpdate = true;
                this.dom = t
            }
        },
        //关闭推送主数据
        closePushUpdate () {
            this.openPushUpdate = false;
        },
    }
}
</script>

<style lang="scss" scoped>
</style>