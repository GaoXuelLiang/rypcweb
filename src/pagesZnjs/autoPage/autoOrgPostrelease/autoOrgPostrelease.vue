<template>
  <div class="table">
    <commonMainTable
      ref="commonMainTable"
      @specialButton="btnEvents"
      :isSpecial="isSpecial"
    ></commonMainTable>

    <transition name="fade">
      <popList
        v-show="popFlag"
        @closeEmpMailList="closeEmpMailList"
        ref="popList"
        :type="type"
      >
      </popList>
    </transition>
  </div>
</template>

<script>
import commonMainTable from "@/components/autoCommonPage/autoMainTable";
//请求方法
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import popList from "@/components/empMailingList/empMailingList";

export default {
  data() {
    return {
      isSpecial: true,
      dom: "",
      type: 0,
      popFlag: false,
    };
  },
  components: {
    commonMainTable,
    popList,
  },
  mounted() {},
  destroyed() {},
  mouted() {},
  methods: {
    getData() {
      const t = this;

      t.$refs.commonMainTable.getData();
    },
    closeEmpMailList() {},
    //特殊按钮事件
    btnEvents(code, t, params) {
      const _t = this;
      console.log(code, t, params);
      if (code === "poreSendnum") {
        _t.type = 0;
        _t.$refs.popList.getData(params.id, params.porePostid);
        _t.popFlag = true;
      } else if (code === "poreHirenum") {
        _t.type = 1;
        _t.$refs.popList.getData(params.id, params.porePostid);
        _t.popFlag = true;
      }
    },
    closeEmpMailList() {
      const t = this;
      // t.modal1 = false;
      t.popFlag = false;
      t.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
