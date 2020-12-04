<!--
 * @Author: your name
 * @Date: 2020-09-10 17:11:02
 * @LastEditTime: 2020-11-06 22:08:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\pagesZnjs\autoPage\autoMyOrgBusiarea\autoOrgBusiareaChild.vue
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
import moreAdd from "@/components/autoCommonPage/moreAdd";
import autoChildTable from "@/components/autoCommonPage/autoChildTable";
import { btnEvent } from "@/components/specialButton/index";
export default {
  data() {
    return {
      isSpecial: true,
      mainId: "",
      titleName: "",
      columns: [
        { align: "left", type: "selection", title: "序号", width: 60 },
        { align: "center", key: "bumdCode", title: "模块编码" },
        { align: "center", key: "bumdName", title: "模块描述" },
      ],
      searchInp: [{ clmDname: "模块编码", clmName: "bumdCode", clmLayout: 1 ,name:''}],
    };
  },
  components: {
    autoChildTable,
    moreAdd
  },
  mounted() {},
  destroyed() {},
  mouted() {},
  methods: {
      refrsh() {
         this.$refs.autoChildTable.getData()
      },
    specialButton(code, t) {
      this.mainId = t.mainId;
      this.titleName = t.titleName;
      let obj = { tableName: "", id: "" };
      let columns = [];
      let searchInp = [];
      let paramObj = {}
      if (code === "button_moreAdd") {
        if (t.titleName === "领域模块明细（新）") {
          obj.tableName = "OrgBusimod";
          obj.id = "1989";
          columns = this.columns;
          searchInp = this.searchInp;
          paramObj['busmBusrid'] = ''
          paramObj['busmMdcode'] = ''
          paramObj['mt'] = 'OrgBusminfo'
        }
      }
       console.log(obj, 'objjjj')
       this.$refs.moreAdd.initData(obj, columns, searchInp, this.mainId, paramObj);
    },
    getColumns() {
      this.$refs.autoChildTable.getColumns();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>