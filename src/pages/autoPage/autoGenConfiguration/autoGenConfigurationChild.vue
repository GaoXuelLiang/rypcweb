<template>
  <div>
    <autoChildTable
      @specialButton="specialButton"
      :isSpecial="isSpecial"
      ref="autoChildTable"
    ></autoChildTable>
    <transition>
            <setOrder v-show="openOrder" 
                      ref="setOrder"
                      :showName="'columnRemarks'"
                      @getData="getData" 
                      @closeOrder="closeOrder"></setOrder>
    </transition>
  </div>
</template>

<script>
import autoChildTable from "@/components/autoCommonPage/autoChildTable";
//import { getDataLevelUserLogin } from "@/axios/axios";
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from "@/lib/util";
// import updNull from './updNull'
import {btnEvent} from '@/components/specialButton/index'
// 排序
import setOrder from '@/components/order/order'
export default {
  data() {
    return {
      // 排序
      openOrder:false,
      openUpdNull: false,
      isSpecial:true,
    };
  },
  components: {
    autoChildTable,
    setOrder,
    // updNull
  },
  mounted() {},
  destroyed() {},
  mouted() {},
  methods: {
    //特殊按钮事件
    specialButton(code, t) {
      if (code == "button_initColumnDis") {
        this.initColumn(t);
      } else if (code == "button_updImp") {
        this.updImp(t);
      } else if (code == "button_updNull") {
        this.updNull(t);
      } else if(code == 'button_order') {
        this.orderEvent(t)
      }
    },
    //获取子表配置
    getColumns() {
      this.$refs.autoChildTable.getColumns();
    },
    //生成虚拟字段
    initColumn(t) {
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone"),
        });
      } else {
        console.log('xuni1')
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content:t.$t("reminder.generated"),
          onOk: () => {
            const data = {
              _mt: this.$global.mt + "GenColumn.initColumnDis",
              APpid: t.mainId,
              APfunId: "1",
              APlogType: "生成虚拟字段",
              APids: t.tableselected.toString(),
            };
            t.isSpinTable = true;
            getDataLevelUserLoginData(data)
              .then((res) => {
                try {
                  if (isSuccess(res, t)) {
                    if (res.data.content[0].value == "1") {
                      t.tableselected = [];
                      t.isSpinTable = false;
                      t.getData();
                    }
                  }
                } catch (res) {
                  t.$Modal.error({
                    title: this.$t("reminder.err"),
                    content: this.$t("reminder.errormessage"),
                  });
                }
              })
              .catch(() => {
                t.isSpinTable = false;
                t.$Modal.error({
                  title: this.$t("reminder.err"),
                  content: this.$t("reminder.errormessage"),
                });
              });
          },
          onCancel: () => {},
        });
      }
    },
    //导入必填
    updImp(t) {
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone"),
        });
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: t.$t("reminder.primaryKey"),
          onOk: () => {
            t.isSpinTable = true;
            getDataLevelUserLoginData({
              _mt: t.mt + t.tbName + ".UpdOrimport",
              APfunId: "1",
              APlogType: "导入必填",
              APids: t.tableselected.toString(),
              APstatusbutton: 0,
            })
              .then((res) => {
                try {
                  if (isSuccess(res, t)) {
                    if (res.data.content[0].value == "1") {
                      t.tableselected = [];
                      t.isSpinTable = false;
                      t.getData();
                    }
                  } else {
                    t.isSpinTable = false;
                  }
                } catch (res) {
                  t.$Modal.error({
                    title: this.$t("reminder.err"),
                    content: this.$t("reminder.errormessage"),
                  });
                }
              })
              .catch(() => {
                t.$Modal.error({
                  title: this.$t("reminder.err"),
                  content: this.$t("reminder.errormessage"),
                });
              });
          },
          onCancel: () => {},
        });
      }
    },
    //字段必填
    updNull(t) {
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone"),
        });
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: t.$t("reminder.required"),
          onOk: () => {
            t.isSpinTable = true;
            getDataLevelUserLoginData({
              _mt: t.mt + t.tbName + ".UpdOrimport",
              APfunId: "1",
              APlogType: "导入必填",
              APids: t.tableselected.toString(),
              APstatusbutton: 1,
            })
              .then((res) => {
                try {
                  if (isSuccess(res, t)) {
                    if (res.data.content[0].value == "1") {
                      t.tableselected = [];
                      t.isSpinTable = false;
                      t.getData();
                    }
                  } else {
                    t.isSpinTable = false;
                  }
                } catch (res) {
                  t.$Modal.error({
                    title: this.$t("reminder.err"),
                    content: this.$t("reminder.errormessage"),
                  });
                }
              })
              .catch(() => {
                t.$Modal.error({
                  title: this.$t("reminder.err"),
                  content: this.$t("reminder.errormessage"),
                });
              });
          },
          onCancel: () => {},
        });
      }
    },
     // 排序
    orderEvent(t){
      this.openOrder = true;
      this.$refs.setOrder.getData(t);
    },
    getData(){
      this.$refs.autoChildTable.getData();
    },
    closeOrder(){
      this.openOrder = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>