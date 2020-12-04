<template>
  <div>
    <autoChildTable
      @specialButton="specialButton"
      :isSpecial="isSpecial"
      ref="autoChildTable"
    ></autoChildTable>
  </div>
</template>

<script>
import autoChildTable from "@/components/autoCommonPage/autoChildTable";
//import { getDataLevelUserLogin } from "@/axios/axios";
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from "@/lib/util";
// import updNull from './updNull'
import {btnEvent} from '@/components/specialButton/index'
export default {
  data() {
    return {
      isSpecial:true,
    };
  },
  components: {
    autoChildTable,
    // updNull
  },
  mounted() {},
  destroyed() {},
  mouted() {},
  methods: {
    //特殊按钮事件
    specialButton(code, t) {
      if (code == "button_bpInit") {
        this.initgetDat(t);
      }
    },
    //获取子表配置
    getColumns() {
      this.$refs.autoChildTable.getColumns();
    },
    initgetDat (t) {
            t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: '确定初始化',
                onOk: () => {
                    const data = {
                        _mt: this.$global.mt + 'PayBankoffinfo.Init',
                        id: t.mainId,
                        // APlogType: '初始化',
                    }
                    t.isSpinTable = true;
                    getDataLevelUserLoginData(data).then(res => {
                        try {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value === 0) {
                                    t.tableselected = []
                                    t.isSpinTable = false;
                                    t.getData()
                                }
                            }
                        } catch (res) {
                            t.$Modal.error({
                                title: this.$t('reminder.err'),
                                content: this.$t('reminder.errormessage'),
                            })
                        }
                    }).catch(() => {
                        t.$Modal.error({
                            title: this.$t('reminder.err'),
                            content: this.$t('reminder.errormessage'),
                        })
                    }).finally(() => {
                        t.isSpinTable = false;
                    })
                },
                onCancel: () => { },
            })
        }
  },
};
</script>

<style lang="scss" scoped>
</style>