<template>
  <div class="modal">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{ titleName }}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-box">
        <!-- <span v-for="(item, index) in searchInp" :key="index + 'c'">
          <Input
            v-model="item.name"
            :placeholder="'请输入' + item.clmDname"
            type="text"
            class="searchInput"
          />
        </span> -->
        <span class="" @dblclick="clearSer">
          <Input
            v-model="searchName"
            @on-click="pickData"
            icon="ios-search"
            :readonly="true"
            placeholder="请选择公司名称"
            class="table_search_int pickData"
          />
        </span>
        <Button
          class="btns"
          type="info"
          :loading="isSpin"
          :style="{ width: '56px' }"
          @click="search()"
        >
          <span v-if="!isSpin">
            查询
          </span>
        </Button>
      </Row>
      <row class="table-form" ref="table-form">
        <Table
          height="468"
          size="small"
          :loading="isSpin"
          :no-data-text="noDataImg"
          stripe
          ref="selection"
          :columns="searchCloumns"
          @on-sort-change="sortable"
          :data="data"
          @on-selection-change="selectedtable"
        ></Table>
      </row>
      <Row type="flex">
        <Page
          :total="total"
          size="small"
          show-elevator
          show-sizer
          :current="param.APpage"
          placement="top"
          @on-page-size-change="sizeChange"
          @on-change="pageChange"
          :page-size-opts="[10, 20, 50, 100]"
        ></Page>
        <span style="margin-left: 10px;margin-top: 2px">
          {{ $t("reminder.view") }}
          {{ (param.APpage - 1) * param.AProws + 1 }} -
          {{
            param.APpage * param.AProws > total
              ? total
              : param.APpage * param.AProws
          }}
          {{ $t("reminder.of") }} <span>{{ total }}</span></span
        ><Button
          size="small"
          shape="circle"
          icon="md-refresh"
          style="margin-left: 20px;display: inline-block;"
          @click="search"
        ></Button>
      </Row>
    </div>
    <!-- 公司明细 -->
    <transition name="fade">
      <searchComSub v-show="openCom"
                    @closeCom="closeCom"
                    @inputCom="inputCom"
                    ref="searchComSub"></searchComSub>
    </transition>
  </div>
</template>

<script>
// 选择公司
import searchComSub from "@/components/searchTable/searchComSub.vue"
// import searchBnchCopm from "@/components/searchTable/searchBnchCopm.vue"
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
export default {
  data() {
    return {
      // titleName: "薪资账套01 最后一轮 薪资公司明细 （应发已确认）",
      titleName: "",
      searchName: "",
      companyId: "",
      openCom: false,
      searchInp: [],
      isSpin: false,
      noDataImg: '<div id="noData"></div>',
      searchCloumns: [{
                type: "selection",
                width: 60,
                fixed: "left",
                align: "center",
            },
            {
                title: "公司",
                key: "optName",
                sortable: "custom",
                render: (h, params) => {
                    return h("div", [
                        h("Tooltip", {
                            props: {
                                content: params.row.optName,
                            },
                        }, params.row.optName),
                    ]);
                },
            },
            {
                title: "状态",
                key: "uniqueNumber",
                sortable: "custom",
                render: (h, params) => {
                    return h("div", [
                        h("Tooltip", {
                            props: {
                                content: params.row.uniqueNumber,
                            },
                        }, params.row.uniqueNumber),
                    ]);
                },
            },
            {
                title: "应发总额",
                key: "optCabName",
                sortable: "custom",
                render: (h, params) => {
                    return h("div", [
                        h("Tooltip", {
                            props: {
                                content: params.row.optCabName,
                            },
                        }, params.row.optCabName),
                    ]);
                },
            },
            {
                title: "薪资确认意见",
                key: "startTime",
                sortable: "custom",
                render: (h, params) => {
                    return h("div", [
                        h("Tooltip", {
                            props: {
                                content: params.row.startTime,
                            },
                        }, params.row.startTime),
                    ]);
                },
            },
            {
                title: "公司负责人确认意见",
                key: "endTime",
                sortable: "custom",
                render: (h, params) => {
                    return h("div", [
                        h("Tooltip", {
                            props: {
                                content: params.row.endTime,
                            },
                        }, params.row.endTime),
                    ]);
                },
            },
            {
                title: "操作",
                key: "action",
                width: 140,
                fixed: "right",
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h("Button", {
                            props: {
                                type: "success",
                                size: "small",
                            },
                            /* attrs: {
                              disabled: this.disable ? true : false,
                            }, */
                            on: {
                                click: () => {
                                    this.lookUpModel(params.row.id, "查看");
                                },
                            },
                        }, "查看"),
                        h("Button", {
                            props: {
                                type: "success",
                                size: "small",
                            },
                            // attrs: {
                            //     disabled: this.disable ? true : false,
                            // },
                            style: {
                                "margin-left": "8px",
                            },
                            on: {
                                click: () => {
                                    this.indexs = params.index
                                    this.openAddOrUpModel(params.row.id, "员工明细");
                                },
                            },
                        }, "员工明细"),
                    ]);
                },
            },
            ],
      data: [],
      tableselected: [],
      total: "",
      param: {
        APpage: ""
      }
    };
  },
  props: {
    sublogType: String,
  },
  mounted () {
    // console.log(this.titleName);
  },
  components: {
    searchComSub,
    // searchBnchCopm
  },
  methods: {
    close() {
      this.$emit("closeSub", "button_y_company");
    },
    getTitle (val) {
      // debugger
      console.log(val,"行数据");
      console.log(t.sublogType,"表头数据");
      const t = this;
      // t.titleName = val+ "+t.sublogType+";
      t.titleName = t.sublogType;
    },  
    // 选择公司
    pickData () {
      const t = this;
      t.openCom = true;
      t.$refs.searchComSub.getData();

    },
    clearSer () {
      this.searchName = "";
    },
    inputCom (name,row) {
        // debugger
      const t = this;
      t.searchName = name;
      // t.companyId = row;

    },
    closeCom () {
      const t = this;
      t.openCom = false;
    },
    search() {},
    sizeChange(size) {
      // const t = this
      // t.param.AProws = size
      // t.getData()
    },
    pageChange(page) {
      // const t = this
      // t.param.APpage = page
      // t.getData()
    },
    sortable(column) {
      // this.param.APsort = column.key
      // this.param.APorder = column.order
      // if (column.order !== 'normal') {
      //     this.getData()
      // } else {
      //     this.param.APorder = 'desc'
      // }
    },
    // 选择的数据
    selectedtable(selection) {
      // 定义一个空数组
      const newArr = [];
      // 遍历
      for (let i = 0; i < selection.length; i++) {
        // 添加到
        newArr.push(selection[i].id);
      }
      // 选中
      this.tableselected = newArr;
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "~@/sass/searchTable.scss";
.modal {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-overflow-scrolling: touch;
  outline: 0;

  .box {
    // position: absolute;
    position: relative;
    width: 1100px;
    height: 600px;
    background-color: #fff;
    padding: 50px 20px 10px 20px;
    border-radius: 10px;

    .title {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 40px;
      width: 100%;
      line-height: 40px;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      border-bottom: 1px solid #efefef;
      // position: static;

      .title-text {
        font-weight: bold;
        font-size: 14px;
      }
    }

    /deep/ .ivu-table-overflowY{
      scrollbar-width: thin;
    }
    .table-box {
  
      .table_search_int {
        width: 200px;
        margin-right: 10px;
        margin-bottom: 10px;
      }

      .pickData {
        cursor: pointer;
      }

      .btns {
        margin-right: 10px;
        vertical-align: middle;
        margin-bottom: 10px;
      }
    }
    .table-form {
      margin-bottom: 10px;
      font-size: 0;
      // max-height: 458px;
      // height: 100%;
  
      .searchInput {
        margin-right: 10px;
        width: 200px;
      }
  
      .btnStyle {
        margin-right: 10px;
      }
      // form {
      //     flex: 1;
      //     overflow: auto;
      //     scrollbar-width: thin;
      //     // max-height: 468px;
      // }
    }
        
  }
}
</style>
