<template>
  <div class="block managDeviation">
    <div class="block-title">
      <img src="../../../static/img/largeScreen/title-2.png" alt="" />
      <span>管理费率(万元)</span>
    </div>
    <div class="block-box">
      <div id="md-echart"></div>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";

export default {
  props: {
    managDeviationList: Object,
    selectId: String,
  },
  data() {
    return {
      option: {
        color: ["#407FFF", "#E15D68", "#00CCCD", "#E7A63F", "#8e30ff"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          position: "left",
          confine: true,
        },
        toolbox: {
          show: true,
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: "55%",
            roseType: "area",
            label: {
              normal: {
                formatter(v) {
                  let text = v.name;

                  for(let i = 0; i < text.length; i++){
                    if(text[i] === "("){
                      return `${text.slice(0, i)}\n${text.slice(i)}`
                    }
                  }
                },
              },
            },
            data: [
              { value: 0, name: "薪酬成本(40%)" },
              { value: 0, name: "招聘费用(30%)" },
              { value: 0, name: "行政费用(20%)" },
              { value: 0, name: "其他(10%)" },
              { value: 0, name: "教育培训与人才发展(40%)" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
          },
        ],
      },
      myChart1: {},
    };
  },
  methods: {
    initEchart1() {
      this.myChart1 = this.$echarts.init(document.getElementById("md-echart"));
      console.log(this.myChart1, "扇形图");
      this.myChart1.setOption(this.option, true);
    },
    getData() {
      const t = this;
      t.option.series[0].data = [];
      if (t.selectId === "01develop") {
        t.option.series[0].data.push({
          value: t.managDeviationList.orgkb1Payrollamountdev || 0,
          name:
            "薪酬成本" +
            "(" +
            (t.managDeviationList.orgkb1Payrollamountdevs || 0) +
            ")",
        });
        t.option.series[0].data.push({
          value: t.managDeviationList.orgkb1Cpamount || 0,
          name: "招聘费用" + "(" + (t.managDeviationList.orgkb1Cpamounts || 0) + ")",
        });
        t.option.series[0].data.push({
          value: t.managDeviationList.orgkb1Cpamount || 0,
          name: "行政费用" + "(" + (t.managDeviationList.orgkb1Xzamounts || 0) + ")",
        });
        t.option.series[0].data.push({
          value: t.managDeviationList.orgkb1Otheramount || 0,
          name: "其他" + "(" + (t.managDeviationList.orgkb1Otheramounts || 0) + ")",
        });
        t.option.series[0].data.push({
          value: t.managDeviationList.orgkb1Jyandrcamount || 0,
          name:
            "教育培训与人才发展" +
            "(" +
            (t.managDeviationList.orgkb1Jyandrcamounts || 0) +
            ")",
        });
      } else {
        t.option.series[0].data.push({
          value: t.managDeviationList.orgkb1Payrollamountsale || 0,
          name:
            "薪酬成本" +
            "(" +
            (t.managDeviationList.orgkb1Payrollamountsales || 0) +
            ")",
        });
        t.option.series[0].data.push({
          value: t.managDeviationList.unitkbChtgamount || 0,
          name:
            "渠道推广费" + "(" + (t.managDeviationList.unitkbChtgamounts || 0) + ")",
        });
        t.option.series[0].data.push({
          value: t.managDeviationList.unitkbXsssamount || 0,
          name:
            "销售设施费" + "(" + (t.managDeviationList.unitkbXsssamounts || 0) + ")",
        });
        t.option.series[0].data.push({
          value: t.managDeviationList.unitkbAcywamount || 0,
          name:
            "案场运维费" + "(" + (t.managDeviationList.unitkbAcywamounts || 0) + ")",
        });
      }

      t.initEchart1();
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@media (min-width: 600px) {
  .managDeviation {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(14, 26, 87, 0.8);
    .block-title {
      height: 10%;
      margin-left: 2%;
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
      // border:1px solid red;
      margin: auto;
      width: 100%;
      // padding-top:1%;
      flex: 1;
      #md-echart {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media (min-width: 1920px) {
  .managDeviation {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: rgba(14, 26, 87, 0.8);
    .block-title {
      height: 10%;
      margin-left: 2%;
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
      // border:1px solid red;
      margin: auto;
      width: 100%;
      // padding-top:1%;
      flex: 1;
      #md-echart {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>