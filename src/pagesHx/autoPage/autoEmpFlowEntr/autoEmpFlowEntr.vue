<!--
 * @Author: guwenjiang
 * @Date: 2020-10-14 14:36:19
 * @LastEditors: guwenjiang
 * @LastEditTime: 2020-11-24 11:10:17
-->
<template>
    <div class="table">
        <commonMainFlow ref="commonMainFlow" :isSpecial="true" @specialButton="specialButton"></commonMainFlow>
        <transition>
            <upReject v-show="openReject" :ids="ids" :curDate="curDate" @closeUp="closeUp"></upReject>
        </transition>
    </div>
</template>

<script>
import commonMainFlow from '@/pages/common/commonFlowList/commonFlowList'
import upReject from './upReject'
export default {
    data () {
        return {
            openReject: false,
            ids:'',
            curDate: new Date()
        }
    },
    components: {
        commonMainFlow,
        upReject
    },
    mounted () {
    },
    destroyed () {

    },
    methods: {
        specialButton (code, t) {
            console.log(code,"code")
            // console.log(t,"t")
            switch(code) {
                case 'button_reject':
                    this.openUp(t);
                    break;
            }
        },
        openUp (t) {
            if(t.tableselected.length) {
                this.ids = t.tableselected.join(',');
                this.openReject = true;
                this.curDate = new Date();
            }else {
                this.$Modal.warning({
                    title: t.$t("reminder.remind"),
                    content: t.$t("reminder.leastone"),
                });
            }
        },
        closeUp (val) {
            const t = this;
            t.openReject = false;
            if(val) {
                t.$refs.commonMainFlow.tableselected = [];
                t.$refs.commonMainFlow.getData();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
