<!--
 * @Author: your name
 * @Date: 2020-10-09 11:23:45
 * @LastEditTime: 2020-11-06 22:07:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\pages\autoPage\autoAddJobSeq\autoPlatSysformChild.vue
-->
<template>
  <div>
    <autoChildTable
      @specialButton="specialButton"
      :isSpecial="isSpecial"
      ref="autoChildTable"
    ></autoChildTable>
    <transition>
      <moreAdd ref="moreAdd" @refrsh="refrsh"></moreAdd>
    </transition>
  </div>
</template>

<script>
import { isSuccess, deepCopy, getUrlKey } from "@/lib/util";
import { getDataLevelUserLoginData } from "@/axios/axios";
import moreAdd from "@/components/autoCommonPage/moreAdd";
import autoChildTable from "@/components/autoCommonPage/autoChildTable";
import { btnEvent } from "@/components/specialButton/index";
// 排序
export default {
  data() {
    return {
      titleName: "",
      mainId: "",
      openOrder: false,
      isSpecial: true,
      moreAddPop: false,
      columns: [
        { align: "left", type: "selection", title: "序号", width: 60 },
        { align: "center", key: "busrCode", title: "领域编码" },
        { align: "center", key: "busrName", title: "领域描述" },
        { align: "center", key: "statusDis", title: "状态" },
      ],
      searchInp: [{ clmDname: "领域编码", clmName: "busrCode", clmLayout: 1 ,name:''}],
      columns1: [
        { align: "left", type: "selection", title: "序号", width: 60 },
        { align: "center", key: "rankName", title: "职等" },
        { align: "center", key: "rankDesc", title: "职等描述" },
      ],
      searchInp1: [{ clmDname: "职等", clmName: "rankName", clmLayout: 1 }],
    };
  },
  components: {
    autoChildTable,
    moreAdd,
  },
  methods: {
      refrsh() {
          console.log('here')
         this.$refs.autoChildTable.getData()
         
      },
    specialButton(code, t) {
      console.log('COMMON')
      this.mainId = t.mainId;
      this.titleName = t.titleName;
      let columns = [];
      let searchInp = [];
      let obj = { tableName: "", id: "" };
      let paramObj = {}
      if (code === "button_moreAdd") {
        if (t.tbName === "OrgPtodsrinfo") {
          obj.tableName = "OrgBusiarea";
          obj.id = "1977";
          columns = this.columns;
          searchInp = this.searchInp;
          paramObj['pdinPtodid'] = ''
          paramObj['pdinBusrid'] = ''
          paramObj['mt'] = 'OrgPtodsrinfo'
        } else if (t.tbName === "OrgOrdrank") {
          obj.tableName = "OrgRankinfo";
          obj.id = "1988";
          columns = this.columns1;
          searchInp = this.searchInp1;
          paramObj['odrkRankid'] = ''
          paramObj['odrkPtodid'] = ''
          paramObj['mt'] = 'OrgOrdrank'
        }
      }
      this.$refs.moreAdd.initData(obj, columns, searchInp, this.mainId, paramObj);
    },
    getColumns() {
      this.$refs.autoChildTable.getColumns();
    },
    getData() {
      this.$refs.autoChildTable.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>