<template>
  <div class="content-main">
    <Row class="mainBox rank">
      <p class="title rankTitle">
        <img src="static/img/largeScreen/title-2.png" />
        绩效流失排名
      </p>
      <Row class="table-form">
        <Table
          size="small"
          ref="selection"
          :height="tableHeight"
          :row-class-name="rowClassName"
          :columns="columns"
          :data="data"
          :no-data-text="noData"
        ></Table>
      </Row>
    </Row>
  </div>
</template>

<script>
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";

export default {
  props: {
    unitId: String,
  },
  data() {
    return {
      tableHeight: 200,
      noData: '<div id="noDataKb"></div><div>暂无数据</div>',
      params: {
        _mt: this.$global.mt + "PerDataloss.getPage",
        APsort: "id",
        APorder: "desc",
        AProws: 50,
        APpage: 1,
        APffk: "glc2110",
        APfunId: "2110",
        perUnitid: "",
        // APstatus: "01all",
      },
      columns: [
        {
          title: "序号",
          key: "serialNum",
          width: "12%",
          render: (h, params) => {
            let order = params.row.perRank;
            let dom = "";
            let src = "";
            if (order === "1" || order === "2" || order === "3") {
              dom = "img";
              switch (order) {
                case "1":
                  src = "static/img/largeScreen/gold.png";
                  break;
                case "2":
                  src = "static/img/largeScreen/silver.png";
                  break;
                case "3":
                  src = "static/img/largeScreen/bronze.png";
                  break;
              }
            } else {
              dom = "span";
            }
            return h(
              `${dom}`,
              {
                attrs: {
                  src: src ? src : "",
                },
                style: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "18px",
                  height: "28px",
                },
              },
              src ? "" : order
            );
          },
        },
        {
            title: '项目公司',
            key: 'perUnitidDis',
            width: "35%",
            align: "center"
        },
        {
          title: "高绩效离职人数",
          key: "perHpertover",
          width: "25%",
          align: "center"
        },
        {
          title: "高绩效总人数",
          key: "perHpertotal",
          width: "25%",
          align: "center"
        },
      ],
      data: [],
    };
  },
  mounted() {
    // window.onload = () => {
    //     this.oprRankHeight()
    // }
    // window.onresize = () => {
    //     this.oprRankHeight()
    // }
    // this.getData();
  },
  destroyed() {},
  methods: {
    rowClassName(row, index) {
      if (index % 2 !== 0) {
        return "table-opacity-row";
      } else {
        return "table-none-row";
      }
    },
    oprRankHeight() {
      let mainHeight = document.getElementsByClassName("rank")[0].offsetHeight;
      let titleHeight = document.getElementsByClassName("rankTitle")[0]
        .offsetHeight;
      this.tableHeight = mainHeight - titleHeight - 10;
    },
    getData() {
      const t = this;

      const data = deepCopy(t.params);
      data.perUnitid = t.unitId;
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }

      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0].rows, "公司");
            t.data = res.data.content[0].rows;
            // t.tows = res.data.content[0].tows;
            // t.total = res.data.content[0].records;
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
  },
};
</script>

<style lang="scss" scoped>
@media(min-width: 600px){
  .content-main {
  height: 100%;
  .mainBox {
    height: 100%;
    background: rgba(14, 26, 87, 0.5);
    display: flex;
    flex-direction: column;
    .title {
      font-size: .9rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      height: 50px;
      img {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 5px;
      }
    }
    .table-form {
      font-size:.7rem;
      padding: 0 .5% .5%;
      flex: 1;
      //   background: rgba(9, 15, 58, 1);
    }

    /deep/ .ivu-table-header thead tr th {
      background: rgba(0, 38, 110, 1);
      color: rgba(0, 220, 253, 1);
    }
    /deep/ .ivu-table-tip table td {
      background: none;
      color: #fff;
    }
    /deep/ .ivu-table .table-opacity-row td {
      background: rgba(9, 15, 58, 1);
      color: #fff;
    }
    /deep/ .ivu-table .table-none-row td {
      background: rgba(14, 26, 87, 0.5);
      opacity: 1;
      color: #fff;
    }
    /deep/ .ivu-table-tip {
      border-bottom: 1px solid transparent !important;
    }
    /deep/ .ivu-table {
      background: none !important;
    }
    /deep/ .ivu-table-body {
      border-bottom: none !important;
    }
  }
}
}

@media(min-width: 1920px){
  .content-main {
  height: 100%;
  .mainBox {
    height: 100%;
    background: rgba(14, 26, 87, 0.5);
    display: flex;
    flex-direction: column;
    .title {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      height: 50px;
      img {
        width: 28px;
        height: 28px;
        margin-right: 5px;
      }
    }
    .table-form {
      font-size:.7rem;
      padding: 0 .5% .5%;
      flex: 1;
      //   background: rgba(9, 15, 58, 1);
    }

    /deep/ .ivu-table-header thead tr th {
      background: rgba(0, 38, 110, 1);
      color: rgba(0, 220, 253, 1);
    }
    /deep/ .ivu-table-tip table td {
      background: none;
      color: #fff;
    }
    /deep/ .ivu-table .table-opacity-row td {
      background: rgba(9, 15, 58, 1);
      color: #fff;
    }
    /deep/ .ivu-table .table-none-row td {
      background: rgba(14, 26, 87, 0.5);
      opacity: 1;
      color: #fff;
    }
    /deep/ .ivu-table-tip {
      border-bottom: 1px solid transparent !important;
    }
    /deep/ .ivu-table {
      background: none !important;
    }
    /deep/ .ivu-table-body {
      border-bottom: none !important;
    }
  }
}
}
</style>