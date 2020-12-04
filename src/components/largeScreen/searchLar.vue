<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">选择公司</div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div class="searchInp">
        <i-input
          class="search_input"
          v-model="name"
          placeholder="请输入公司名称"
          size="small"
          style="width: 150px"
        ></i-input>
        <i-button
          class="search_btn"
          type="primary"
          icon="ios-search"
          size="small"
          @click="getData"
          >搜索</i-button
        >
      </div>

      <row class="table-form" ref="table-form">
        <Table
          :loading="loading"
          :no-data-text="noDataImg"
          height="100%"
          max-height=""
          width="90%"
          size="small"
          ref="selection"
          :columns="searchCloumns"
          :data="data"
          @on-row-dblclick="dbCkick"
        ></Table>
      </row>

      <div class="page_warp">
        <Row style="display: flex; padding-left: 1%">
          <Page
            :total="total"
            size="small"
            show-elevator
            show-sizer
            :page-size="params.AProws"
            :current="params.APpage"
            placement="top"
            @on-page-size-change="sizeChange"
            @on-change="pageChange"
            :page-size-opts="[10, 20, 50, 100]"
          ></Page>
          <span style="margin-left: 10px; margin-top: 2px">
            {{ $t("reminder.view") }}
            {{ (params.APpage - 1) * params.AProws + 1 }} -
            {{
              params.APpage * params.AProws > total
                ? total
                : params.APpage * params.AProws
            }}
            {{ $t("reminder.of") }} <span>{{ total }}</span></span
          >
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "../../lib/util";

export default {
  data() {
    return {
      loading: false,
      isSpin: false,
      data: [],
      total: NaN,
      name: "",
      searchText: "请输入授权人姓名",
      noDataImg: '<div id="noData"></div>',
      params: {
        _mt: this.$global.mt + "OrgUnits.getPage",
        APsort: "id",
        APorder: "asc",
        AProws: 10,
        APpage: 1,
        APffk: "gep1283",
        unitFnameCn: this.name,
        importFlag: "-9",
        unitType: "01company"
      },
      searchCloumns: [
        {
          title: "公司",
          key: "unitFnameCn",
        },
        {
          title: "公司类型",
          key: "unitTypeDis",
        },
      ],
    };
  },
  props: {
    searchTitle: String,
  },
  mounted() {},
  methods: {
    getData() {
      const t = this;
      t.loading = true;
      t.isSpin = true;

      const data = deepCopy(t.params);
      data.unitFnameCn = t.name;
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }

      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0]);
            t.data = res.data.content[0].rows;
            t.total = res.data.content[0].records;
          }
        })
        .catch((err) => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        })
        .finally(() => {
          t.loading = false;
          t.isSpin = false;
        });
    },
    close() {
      this.busrName = "";
      this.name = "";
      this.params.APpage = 1;
      this.params.AProws = 10;
      this.size = 10;
      this.$emit("closeUp");
    },
    dbCkick(row) {
      const t = this;
      //      console.log(row)
      this.close();
      t.params.AProws = 10;
      t.size = 10;
      t.$emit("changeinputZhil", row.unitFnameCn, row.id);
      t.$emit("closeUp");
    },
    sizeChange(size) {
      const t = this;
      t.params.AProws = size;
      t.getData(t.params);
    },
    pageChange(page) {
      const t = this;
      t.params.APpage = page;
      t.getData(t.params);
    },
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 600px) {
  /deep/ [data-v-05b44948] .background[data-v-3de5e7ed] .ivu-table{
    border-bottom:none;
  }
  
  .background /deep/ .ivu-table td{
    border-bottom: 1px solid #0280e3 !important;
  }

  /deep/ .ivu-table-body{
    border-bottom:1px solid transparent !important;
  }
  span{
    color:#fff !important;
  }

  .background /deep/ .ivu-page-item a{
    color:#fff;
  }

  .background /deep/ .ivu-page-item:hover>a{
    color:#0280e3;
  }

  .background /deep/ .ivu-page-item-active a{
    color: #0280e3 !important;
  }

  .background /deep/ .ivu-page-options-elevator{
    color:#fff !important;
  }
  .table-form {
    // margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 1%;
    overflow: auto;
    height: 75%;
    // border: 1px solid red;
  }
  .table {
    height: 30%;
    overflow: auto;
  }
  .background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1200;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
      position: relative;
      width: 55%;
      padding: 3% 1% 1%;
      border-radius: 10px;
      .title {
        display: flex;
        position: absolute;
        height: 10%;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        // padding-left: 20px;
        top: 0;
        // border-bottom: 1px solid #efefef;
        left: 0;
        .title-text {
          font-weight: bold;
          font-size: 14px;
          color: #000;
        }
        .search_warp {
          display: flex;
          align-items: flex-start;
          // border: 1px solid red;
          margin-top: 5%;
          margin-left: 5%;
          .search_input {
            margin-right: 5%;
          }
        }
        .search_warp2 {
          display: flex;
          align-items: flex-start;
          // border: 1px solid blue;
          margin-top: 5%;
          margin-left: 5%;
          .search_input {
            margin-right: 5%;
          }
        }
      }
      .page_warp {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
  }
  .background /deep/ .ivu-tooltip-inner {
    max-width: 12rem;
  }
  .title /deep/ .ivu-btn {
    // border:1px solid red;
    background-image: url("../../../static/largeScreen/close_btn.png");
    position: absolute;
    right: 2.5%;
    top: 60%;
    background-repeat: no-repeat;
    background-size: 110%;
  }
  .search_warp /deep/ .ivu-btn {
    background-image: none;
    background-size: 0%;
  }
  .search_warp2 /deep/ .ivu-btn {
    background-image: none;
    background-size: 0%;
  }
  .ivu-icon-close-round:before {
    content: "";
  }
  .background .backbox {
    background-image: url("../../../static/largeScreen/table_bg.png");
    // border: 1px solid red;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    height: 65%;
  }
  .background .backbox .title {
    padding-top: 0.8rem;
    padding-right: 0.5rem;
    border-bottom: 0px;
  }
  .background .backbox .title .title-text {
    display: block;
    margin-left: 5%;
    margin-top: 1%;
    height: 22px;
    line-height: 22px;
    // border:1px solid red;
    width: 25%;
    color: #fff;
    background-image: url("../../../static/largeScreen/headline.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-left: 7%;
  }
  .ivu-row {
    width: 95%;
    margin: 0 auto;
    margin-top: 2%;
  }
  .background /deep/ .ivu-table {
    color: #fff;
    background: transparent;
  }
  /deep/ .ivu-table-header table tr th {
    background: #1b263d !important;
    // border: none !important;
    border-bottom: 1px solid #0280e3 !important;
  }
  /deep/ .background .ivu-table-row td {
    border-bottom: 1px solid #0280e3 !important;
    background: none !important;
  }
  // /deep/ .background /deep/ .ivu-table th {
  //   background: #1b263d !important;
  // }
  /deep/ .table-form /deep/ .ivu-table-tip {
    height: 360px !important;
  }
  /deep/ .ivu-table-tbody .ivu-table-row-hover {
    background-color: #3ebafa !important;
  }
  /deep/ .background .ivu-table tr {
    border-bottom: 1px solid #0280e3 !important;
  }
  .background /deep/ .ivu-table-border th {
    border-right: 0px !important;
  }
  /deep/.background /deep/ .ivu-table td {
    // background-color: rgba(0, 0, 0, 0.5) !important;
    // background-color: rgba(255,255,255,0.2);
    background-color: transparent !important;
  }
  /deep/ .background /deep/ .ivu-table td {
    background-color: transparent !important;
    // border: none;
  }
  /deep/ .background .ivu-table th {
    background-color: transparent;
    // border: none !important;
    border-bottom: 1px solid #0280e3 !important;
  }
  .background /deep/ .ivu-table {
    width: inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: #f5f7fa;
    font-size: 0.24rem;
    box-sizing: border-box;
  }
  .background /deep/ .ivu-table:before {
    content: "";
    width: 100%;
    height: 0.02rem;
    position: absolute;
    left: 0;
    bottom: 0;
    /* background-color: #dddee1; */
    z-index: 1;
  }
  .background /deep/ .ivu-table:after {
    content: "";
    width: 100%;
    height: 0.02rem;
    position: absolute;
    left: 0;
    bottom: 0;
    /* background-color: #dddee1; */
    z-index: 1;
  }
  .background /deep/ .ivu-table:after {
    background-color: transparent !important;
  }
  .background /deep/ .ivu-table:before {
    background-color: transparent !important;
  }
  .background /deep/ .ivu-spin-fix {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: rgba(71, 94, 112, 0.1);
  }
  .background /deep/ .ivu-page-prev {
    background-color: transparent !important;
    color: #fff;
  }
  .background /deep/ .ivu-page-next {
    background-color: transparent !important;
    color: #fff;
  }
  .background /deep/ .ivu-page-item {
    background-color: transparent !important;
    color: #fff;
  }
  .background /deep/ .ivu-page-item-active {
    // background-color: #0090ff !important;
    border-radius: 50% !important;
    color: #fff;
  }
  .background /deep/ .ivu-input {
    background-color: #000 !important;
    color: #fff !important;
    border: 0.02rem solid #1c73be !important;
  }
  .background /deep/ .ivu-page-item-jump-next:after {
    color: #fff !important;
  }
  .background /deep/ .ivu-page-item-jump-prev:after {
    color: #fff !important;
  }
  .searchInp {
    padding: 15px 0 0 20px;
    // border:1px solid red;
  }
  .search_btn {
    margin-left: 20px;
  }
  .ivu-row[data-v-3de5e7ed] {
    margin-top: 10px;
  }
}
// 1920
@media (min-width: 1920px) {
  /deep/ [data-v-05b44948] .background[data-v-3de5e7ed] .ivu-table{
    border-bottom:none;
  }
  .table-form {
    // margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 1%;
    overflow: auto;
    height: 75%;
    // border: 1px solid red;
  }
  .table {
    height: 30%;
    overflow: auto;
  }
  .background {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1200;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox {
      position: relative;
      width: 50%;
      padding: 3% 1% 1%;
      border-radius: 10px;
      .title {
        display: flex;
        position: absolute;
        height: 10%;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        // padding-left: 20px;
        top: 0;
        // border-bottom: 1px solid #efefef;
        // background:red;
        left: 0;
        .title-text {
          font-weight: bold;
          font-size: 14px;
          color: #000;
        }
        .search_warp {
          display: flex;
          align-items: flex-start;
          // border: 1px solid red;
          margin-top: 5%;
          margin-left: 5%;
          .search_input {
            margin-right: 5%;
          }
        }
        .search_warp2 {
          display: flex;
          align-items: flex-start;
          // border: 1px solid blue;
          margin-top: 5%;
          margin-left: 5%;
          .search_input {
            margin-right: 5%;
          }
        }
      }
      .page_warp {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
    }
  }
  .background /deep/ .ivu-tooltip-inner {
    max-width: 12rem;
  }
  .title /deep/ .ivu-btn {
    // border:1px solid red;
    background-image: url("../../../static/largeScreen/close_btn.png");
    position: absolute;
    right: 2.5%;
    top: 60%;
    background-repeat: no-repeat;
    background-size: 110%;
  }
  .search_warp /deep/ .ivu-btn {
    background-image: none;
    background-size: 0%;
  }
  .search_warp2 /deep/ .ivu-btn {
    background-image: none;
    background-size: 0%;
  }
  .ivu-icon-close-round:before {
    content: "";
  }
  .background .backbox {
    background-image: url("../../../static/largeScreen/table_bg.png");
    // border: 1px solid red;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    height: 65%;
  }
  .background .backbox .title {
    padding-top: 0.8rem;
    padding-right: 0.5rem;
    // border-bottom: 0px;
  }
  .background .backbox .title .title-text {
    display: block;
    margin-left: 5%;
    margin-top: 3%;
    height: 22px;
    line-height: 22px;
    width: 50%;
    color: #fff;
    background-image: url("../../../static/largeScreen/headline.png");
    background-repeat: no-repeat;
    background-size: 100%;
    padding-left: 80px;
  }
  .ivu-row {
    width: 98%;
    margin: 0 auto;
    margin-top: 2%;
  }
  .background /deep/ .ivu-table {
    color: #fff;
    background: transparent;
  }
  /deep/ .background .ivu-table-row td {
    border-bottom: 1px solid #0280e3 !important;
    background: none !important;
  }
  .ivu-table-wrapper {
    // border: 0px;
  }
  // /deep/ .background /deep/ .ivu-table th {
  //   background: #1b263d !important;
  // }

  /deep/ .table-form /deep/ .ivu-table-tip {
    height: 360px !important;
  }
  /deep/ .ivu-table-tbody .ivu-table-row-hover {
    background-color: #3ebafa !important;
  }
  /deep/ .background .ivu-table tr {
    border-bottom: 1px solid #0280e3 !important;
  }
  /deep/ .background /deep/ .ivu-table-border th {
    border-right: 0px !important;
  }
  /deep/ .background /deep/ .ivu-table td {
    // background-color: rgba(0, 0, 0, 0.5) !important;
    // background-color: rgba(255,255,255,0.2);
    background-color: transparent !important;
  }
  /deep/ .background /deep/ .ivu-table td {
    background-color: transparent !important;
    // border: none;
  }
  /deep/ .background .ivu-table th {
    background-color: transparent !important;
    // border: none !important;
    border-bottom: 1px solid #0280e3 !important;
  }
  .background /deep/ .ivu-table {
    width: inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: #f5f7fa;
    font-size: 0.24rem;
    box-sizing: border-box;
  }
  .background /deep/ .ivu-table:before {
    content: "";
    width: 100%;
    height: 0.02rem;
    position: absolute;
    left: 0;
    bottom: 0;
    /* background-color: #dddee1; */
    z-index: 1;
  }
  .background /deep/ .ivu-table:after {
    content: "";
    width: 100%;
    height: 0.02rem;
    position: absolute;
    left: 0;
    bottom: 0;
    /* background-color: #dddee1; */
    z-index: 1;
  }
  .background /deep/ .ivu-table:after {
    background-color: transparent !important;
  }
  .background /deep/ .ivu-table:before {
    background-color: transparent !important;
  }
  .background /deep/ .ivu-spin-fix {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: rgba(71, 94, 112, 0.1);
    // border: none;
  }
  .background /deep/ .ivu-page-prev {
    background-color: transparent !important;
    color: #fff;
  }
  .background /deep/ .ivu-page-next {
    background-color: transparent !important;
    color: #fff;
  }
  .background /deep/ .ivu-page-item {
    background-color: transparent !important;
    color: #fff;
  }
  .background /deep/ .ivu-page-item-active {
    // background-color: #0090ff !important;
    border-radius: 50% !important;
    color: #fff;
  }
  .background /deep/ .ivu-input {
    background-color: #000 !important;
    color: #fff !important;
    border: 0.02rem solid #1c73be !important;
  }
  .background /deep/ .ivu-page-item-jump-next:after {
    color: #fff !important;
  }
  .background /deep/ .ivu-page-item-jump-prev:after {
    color: #fff !important;
  }
  .searchInp {
    padding: 15px 0 0 20px;
    // border:1px solid red;
  }
  .search_btn {
    margin-left: 20px;
  }
  .ivu-row[data-v-3de5e7ed] {
    margin-top: 10px;
  }
}
</style>