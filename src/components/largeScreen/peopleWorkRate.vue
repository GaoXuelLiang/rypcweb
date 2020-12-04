<template>
  <div class="content-main">
    <Row class="mainBox rate">
      <p class="title rateTitle">
        <img src="static/img/largeScreen/title-4.png" />
        管费偏差率
      </p>
      <Row class="table-form">
        <Table
          size="small"
          ref="selection"
          :height="tableHeight"
          :row-class-name="rowClassName"
          :columns="columns"
          :data="data"
        ></Table>
      </Row>
    </Row>
  </div>
</template>

<script>
import { getDataLevelUserLoginData, uploadimage } from "@/axios/axios";
import { isSuccess, deepCopy, getCookie } from "@/lib/util";

export default {
  props: {
    selectId: String,
  },
  data() {
    return {
      params: {
        _mt: this.$global.mt + "OrgKbrpt01.getOrderBySet",
        APset: "",
        APcompId: "",
        APdate: "",
        // APstatus: "01all",
      },
      tableHeight: 200,
      columns: [
        {
          title: "序号",
          key: "serialNum",
          width: "10%",
          render: (h, params) => {
            // debugger
            let order = params.row.serialNum;
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
          title: "项目公司",
          key: "orgkb1CompDis",
          width: "14%",
        },
        {
          title: "管理费用总额",
          key: "unitkbMgttamount",
          width: "19%",
        },
        {
          title: "管理费用偏差率",
          key: "unitkbMgtdeviation",
          width: "19%",
        },
        {
          title: "营销费用总额",
          key: "unitkbSaleamount",
          width: "19%",
        },
        {
          title: "营销费用偏差率",
          key: "unitkbSaledeviation",
          width: "19%",
        },
      ],
      data: [],
    };
  },
  mounted() {
    // window.onload = () => {
    //     this.oprRateHeight()
    // }
    // window.onresize = () => {
    //     this.oprRateHeight()
    // }
  },
  destroyed() {},
  methods: {
    getData() {
      const t = this;

      const data = deepCopy(t.params);
      data.APset = t.selectId;
      data.APdate = new Date().getTime();
      //   console.log(data, "管理费用参数");
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }

      getDataLevelUserLoginData(data)
        .then((res) => {
          console.log(Object.keys(res.data.content[0]), "对象为空")
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length != 0) {
              //   console.log(res.data, "管理费用率")
              res.data.content[0].value.forEach((item, i) => {
                item.serialNum = String(i + 1);
                item.unitkbMgttamount = Number(item.unitkbMgttamount) == 0 ? item.unitkbMgttamount : item.unitkbMgttamount + "万";
                item.unitkbMgtdeviation = item.unitkbMgtdeviation + "%";
                item.unitkbSaleamount = Number(item.unitkbSaleamount) == 0 ? item.unitkbSaleamount :  + "万";
                item.unitkbSaledeviation = item.unitkbSaledeviation + "%";
              });
              t.data = res.data.content[0].value;
            }
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
    rowClassName(row, index) {
      if (index % 2 !== 0) {
        return "table-opacity-row";
      } else {
        return "table-none-row";
      }
    },
    oprRateHeight() {
      let mainHeight = document.getElementsByClassName("rate")[0].offsetHeight;
      let titleHeight = document.getElementsByClassName("rateTitle")[0]
        .offsetHeight;
      this.tableHeight = mainHeight - titleHeight - 10;
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 600px) {
  .content-main {
    height: 100%;
    .mainBox {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: rgba(14, 26, 87, 0.5);
      .title {
        font-size: 0.9rem;
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
          margin-right: 2%;
        }
      }
      .table-form {
        padding: 0 2% 2%;
        flex: 1;
      }
      /deep/ .ivu-table-header thead tr th {
        background: rgba(0, 38, 110, 1);
        color: rgba(0, 220, 253, 1);
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
      /deep/ .ivu-table {
        background: none !important;
      }
      /deep/ .ivu-table-body {
        border-bottom: none !important;
      }
      /deep/ .ivu-table-tip {
        border-bottom: 1px solid transparent !important;
        td {
          background: none !important;
          color: #ffffff !important;
        }
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

@media (min-width: 1920px) {
  .content-main {
    height: 100%;
    .mainBox {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: rgba(14, 26, 87, 0.5);
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
          margin-right: 2%;
        }
      }
      .table-form {
        padding: 0 2% 2%;
        flex: 1;
      }
      /deep/ .ivu-table-header thead tr th {
        background: rgba(0, 38, 110, 1);
        color: rgba(0, 220, 253, 1);
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