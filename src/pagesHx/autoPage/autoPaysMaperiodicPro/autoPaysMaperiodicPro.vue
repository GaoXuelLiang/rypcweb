<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         :isSpecial="true"
                         @specialButton="btnEvents"></commonMainTable>
        <transition name="fade">
            <oddnumTable ref="oddnumTable"
                         v-if="numModal"
                         :upType="upType"
                         :upTypeDis="upTypeDis"
                         :searchInp="searchInp"
                         @closeUp="closeProOddnum">
                </oddnumTable>
        </transition>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import oddnumTable from './oddnumTable'
export default {
    data () {
        return {
            numModal: false,
            upType: '',
            upTypeDis: '',
            searchInp: [],
            dom: null
		}
    },
    components: {
        commonMainTable,
        oddnumTable
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
            console.log(code, "code")
            console.log(t, "this")
            this.searchInp = t.searchInp;
            this.dom = t;
            switch(code) {
                case 'button_reject':
                    this.openProOddnum('back', '驳回');
                    break;
                case 'button_verify':
                    this.openProOddnum('confirm', '确认');
                    break;
            }
        },
        // 打开提报单号弹框
        openProOddnum (type, typeDis) {
            const t = this;
            t.numModal = true;
            t.upType = type
            t.upTypeDis = typeDis
            t.$nextTick(() => {
                t.$refs.oddnumTable.getData()
            })
        },
        closeProOddnum (n) {
            const t = this;
            t.numModal = false;
            if(n) {
                t.dom.getData()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>