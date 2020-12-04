<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         :isSpecial="isSpecial"
                         @specialButton="btnEvents"></commonMainTable>
    </div>
</template>

<script>
import commonMainTable from '@/components/autoCommonPage/autoMainTable'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from "@/lib/util";
export default {
    data () {
        return {
            isSpecial: true,
		}
    },
    components: {
        commonMainTable,
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
          if (code === "btn_getmoncon") {
             this.getDat();
          }
        },
        getDat () {
          const t = this;
          getDataLevelUserLoginData({
                _mt: this.$global.mt + 'PayMoncon.getErpData',
            }).then(res => {
                if (isSuccess(res, t)) {
                    // console.log(res, "res")
                    // 获取数据待优化
                    if ( res.data.content[0].success) {
                        t.$Modal.success({
                          title: this.$t("reminder.suc"),
                          content: this.$t("reminder.opesuccess"),
                          content:""
                        });
                    } else  {
                        t.$Modal.warning({
                          title: this.$t("reminder.remind"),
                          content: res.data.content[0].message,
                        });
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>