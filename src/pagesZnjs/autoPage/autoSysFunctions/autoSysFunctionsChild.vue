<template>
    <div>
        <autoChildTable @specialButton="specialButton"
                        :isSpecialAdd="isSpecialAdd"
                        ref="autoChildTable"></autoChildTable>
        <transition>
            <transfer v-show="openTransfer"
                      @closeTransfer="closeTransfer"
                      :listBtn="listBtn"
                      ref="transfer"
                      @getBtnData="getBtnData">
                      </transfer>
        </transition>
    </div>
</template>

<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
import autoChildTable from '@/components/autoCommonPage/autoChildTable'
import transfer from './transfer'
export default {
    data () {
        return {
            openTransfer: false,
            isSpecialAdd:true,//特殊新增事件
            listBtn:[]
        }
    },
    components: {
        autoChildTable,
        transfer
    },
    computed:{},
    mounted () {

    },
    destroyed () {

    },
    activated () {

    },
    methods: {
        specialButton (code, t) {
            // console.log(code, "code");
            switch(code){
                case 'button_add':
                    this.specialAdd(t);
                    break;
            }
        },
        getColumns () {
            this.$refs.autoChildTable.getColumns()
        },
        /**系统功能按钮新增 */
        specialAdd (t) {
            this.listBtn = []
            let data = {}
            data._mt = t.$global.mt + t.tbName + '.getPage';
            data.APsort = t.sort;
            data.APorder = t.order;
            data.AProws = 0;
            data.APpage = 1;
            data.APffk = 0;
            // data.logType = 'getPage';
            data[t.sformParentfield] = t.mainId;
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, this)) {
                    if(res.data.content[0].rows && res.data.content[0].rows.length>0){
                        res.data.content[0].rows.forEach( item => {
                            this.listBtn.unshift(item.btnLancode);
                        });
                    }
                    // console.log(this.listBtn,'this.listBtn')
                }
            }).catch(() => {
                this.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            }).finally(() => {

            })
            this.$nextTick(()=>{
                this.openTransfer = true
                this.$refs.transfer.getData()
            })
        },
        getBtnData () {
            this.$refs.autoChildTable.getData()
        },
        closeTransfer () {
            this.openTransfer = false
        },
    },
}
</script>

<style lang="scss" scoped>
</style>