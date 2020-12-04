<template>
  <div class="table">
    <commonMainTable
      ref="commonMainTable"
      @specialButton="btnEvents"
      :isSpecial="isSpecial"
    ></commonMainTable>

    <transition name="fade">
      <opening
        v-show="openFlag"
        @closeUp="closeUp"
        @getData="getData"
        ref="opening"
      ></opening>
    </transition>

    <transition name="fade">
      <undo
        v-show="undoFlag"
        :list="list"
        @closeUp="closeUp"
        @getData="getData"
        ref="undo"
      ></undo>
    </transition>
  </div>
</template>

<script>
import commonMainTable from "@/components/autoCommonPage/autoMainTable";
//请求方法
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import opening from "./searchOpening";
import undo from "./undo";

export default {
  data() {
    return {
      isSpecial: true,
      dom: "",
      openFlag: false,
      undoFlag: false,
      list: "",
    };
  },
  components: {
    commonMainTable,
    opening,
    undo,
  },
  mounted() {},
  destroyed() {},
  mouted() {},
  methods: {
    //特殊按钮事件
    getData() {
      const t = this;
      t.$nextTick(() => {
        this.$refs.commonMainTable.getData();
      });
    },
    closeUp() {
      this.openFlag = false;
      this.undoFlag = false;
      this.tableselected = [];
      // this.getData();
    },
    btnEvents(code, t, params) {
      const _t = this;
      console.log(code, t, params);

      if (code === "button_opening") {
        _t.openFlag = true;
        _t.$nextTick(() => {
          _t.$refs.opening.getData();
        });
      } else if (code === "button_issue") {
        //   发布
        if (t.tableselected.length === 0) {
          _t.$Modal.warning({
            title: _t.$t("reminder.remind"),
            content: _t.$t("reminder.leastone"),
          });
        } else {
          _t.$Modal.confirm({
            title: _t.$t("reminder.remind"),
            content: "是否发布",
            onOk: () => {
              getDataLevelUserLoginData({
                _mt: _t.$global.mt + "OrgPostrelease.updStatus",
                APlogType: "发布",
                APnpacid: t.tableselected.toString(),
                APupdstatus: "02statusType",
              })
                .then((res) => {
                  if (isSuccess(res, t)) {
                    if (res.data.content[0].value === 1) {
                      t.$Message.success({
                        title: t.$t("reminder.err"),
                        content: "发布成功",
                      });
                    }

                    t.tableselected = [];
                    t.getData();
                  }
                })
                .catch(() => {
                  _t.$Modal.error({
                    title: _t.$t("reminder.err"),
                    content: _.$t("reminder.errormessage"),
                  });
                });
            },
            onCancel: () => {},
          });
        }
      } else if (code === "button_revoke") {
        //   撤销
        if (t.tableselected.length === 0) {
          _t.$Modal.warning({
            title: _t.$t("reminder.remind"),
            content: _t.$t("reminder.leastone"),
          });
        } else {
          this.list = t.tableselected.toString();
          _t.undoFlag = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
