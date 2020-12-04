<template>
  <div class="block perStructure">
    <div class="block-title">
      <img src="../../../static/img/largeScreen/title-1.png" alt="" />
      <span>人员结构</span>
    </div>
    <div class="block-box">
      <div class="tab-box">
        <span
          class="tab-item"
          :class="active == item.key ? 'active' : ''"
          v-for="(item, i) in tabData"
          :key="i"
          @click="changeType(item.key)"
          >{{ item.name }}</span
        >
      </div>
      <div id="ps-echart"></div>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData, uploadimage } from "@/axios/axios";
import { isSuccess, deepCopy, getCookie } from "@/lib/util";
import echarts from "echarts";

export default {
  props: {
    unitId: String,
    selectId: String,
  },
  data() {
    return {
      tabData: [
        {
          name: "平台/板块",
          key: "bussector",
        },
        {
          name: "员工分类",
          key: "empType",
        },
        {
          name: "学校类型",
          key: "school",
        },
        {
          name: "学历分析",
          key: "educ",
        },
        {
          name: "年龄分析",
          key: "age",
        },
      ],
      active: "bussector",
      // option: {
      //   color: ["#407FFF", "#E15D68", "#00CCCD", "#E7A63F"],
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{a} <br/>{b} : {c} ({d}%)",
      //     position: "left",
      //     confine: true,
      //   },
      //   toolbox: {
      //     show: true,
      //   },
      //   series: [
      //     {
      //       name: "面积模式",
      //       type: "pie",
      //       radius: [30, 120],
      //       roseType: "area",
      //       data: [
      //         { value: 30.6, name: "大专" },
      //         { value: 30, name: "硕士" },
      //         { value: 20, name: "本科" },
      //         { value: 10, name: "中专" },
      //       ],
      //     },
      //   ],
      // },
      params: {
        _mt: this.$global.mt + "OrgKbrpt02.getPage",
        APsort: "id",
        APorder: "desc",
        AProws: 50,
        APpage: 1,
        APffk: "glc2110",
        APfunId: "2160",
        // 当前公司
        orgkb2Comp: "",
        // btn种类
        orgkb2Type: "",
        // 体系
        orgkb2System: "",
      },
      option: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "8%",
          containLabel: true,
        },
        xAxis: [
          {
            offset: 2,
            type: "category",
            data: ["暂无数据", "暂无数据", "暂无数据", "暂无数据", "暂无数据"],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              left: 20,
              margin: 5,
              fontSize: 10,
              shadowOffsetX: 12,
              textStyle: {
                color: "#fff",
              },
              axisLabel: {
                align: "right",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: "20",
            data: [0, 0, 0, 0, 0],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#02BBC7",
                  },
                  {
                    offset: 1,
                    color: "#B94FFE",
                  },
                ]),
              },
            },
          },
        ],
      },
      myChart: {},
    };
  },
  methods: {
    getData() {
      const t = this;
      // t.option.series[0].data[0].value = [];
      // t.option.series[0].data[1].value = [];
      // t.option.radar.indicator = [];
      t.option.xAxis[0].data = [];
      t.option.series[0].data = [];

      const data = deepCopy(t.params);
      data.orgkb2Comp = t.unitId;
      data.orgkb2System = t.selectId;
      data.orgkb2Type = t.active;
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }

      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0].rows, "长度");
            if (Object.keys(res.data.content[0]).length != 0) {
              console.log("有数据");

              let arr = res.data.content[0].rows;

              arr.forEach((item) => {
                t.option.xAxis[0].data.push(item.orgkb2Numtype);
                t.option.series[0].data.push(item.orgkb2Empnums);
              });
            } else {
              for (let i = 0; i < 5; i++) {
                t.option.xAxis[0].data.push("暂无数据");
                t.option.series[0].data.push(0);
              }
              console.log("没数据");
            }

            t.initEchart1();
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
    initEchart1() {
      this.myChart = this.$echarts.init(document.getElementById("ps-echart"));
      this.myChart.setOption(this.option, true);

      //   const t = this;
      //   let data = {
      //     _mt: this.$global.mt + "OrgKbdata.board",
      //     APempUnitid: ""
      //   };

      //   if(e){
      //       data.APempUnitid = e;
      //   }

      //   getDataLevelUserLoginData(data)
      //     .then((res) => {
      //       console.log(res.data);
      //       let obj = res.data.content[0].parseJSON();
      //       console.log(obj);

      //       if (isSuccess(res, t)) {

      //       }
      //     })
      //     .catch((err) => {
      //       t.$Modal.error({
      //         title: this.$t("reminder.err"),
      //         content: this.$t("reminder.errormessage"),
      //       });
      //     })
      //     .finally(() => {

      //     });
    },
    changeType(value) {
      this.active = value;
      this.getData();
      this.initEchart1();
    },
  },
  mounted() {
    this.initEchart1();
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 600px) {
  .perStructure {
    background: url("../../../static/largeScreen/lar-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .block-title {
      height: 50px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
      span {
        color: #fff;
        font-size: 0.9rem;
        margin-left: 2%;
      }
    }
    .block-box {
      width: 100%;
      // border:1px solid red;
      flex: 1;
      display: flex;
      flex-direction: column;
      .tab-box {
        width: 80%;
        margin: auto;
        // border:1px solid red;
        display: flex;
        padding: 0 2%;
        justify-content: space-between;
        height: 12%;
        align-items: flex-end;
        .tab-item {
          font-size: 0.7rem;
          width: 17%;
          height: 100%;
          background: url("../../../static/img/largeScreen/people-norbg.png")
            no-repeat;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
        }
        .active {
          background: url("../../../static/img/largeScreen/people-bg.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      #ps-echart {
        width: 100%;
        flex: 1;
        padding: 0 1% 1%;
        // border:1px solid red;
      }
    }
  }
}

@media (min-width: 1920px) {
  .perStructure {
    background: url("../../../static/largeScreen/lar-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .block-title {
      height: 50px;
      margin-left: 10px;
      display: flex;
      align-items: center;
      img {
        width: 28px;
        height: 28px;
      }
      span {
        color: #fff;
        font-size: 18px;
        margin-left: 2%;
      }
    }
    .block-box {
      width: 100%;
      // border:1px solid red;
      flex: 1;
      display: flex;
      flex-direction: column;
      .tab-box {
        width: 90%;
        margin: auto;
        // border:1px solid red;
        display: flex;
        padding: 0;
        justify-content: space-between;
        height: 12%;
        align-items: flex-end;
        .tab-item {
          font-size: 0.7rem;
          width: 18%;
          height: 100%;
          background: url("../../../static/img/largeScreen/people-norbg.png")
            no-repeat;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
        }
        .active {
          background: url("../../../static/img/largeScreen/people-bg.png")
            no-repeat;
          background-size: 100% 100%;
        }
      }
      #ps-echart {
        width: 100%;
        flex: 1;
        padding: 0 1% 1%;
      }
    }
  }
}
</style>