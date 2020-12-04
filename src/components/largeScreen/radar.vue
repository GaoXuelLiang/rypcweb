<template>
  <div class="block managDeviation">
    <div class="block-title">
      <img src="../../../static/largeScreen/people_pass2.png" alt="" />
      <span>团队360</span>
    </div>
    <div class="block-box">
      <div ref="ppEcharts" id="pp-echart"></div>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";

export default {
  props: {
    unitId: String,
  },
  computed: {
    funId() {
      return this.$store.state.user.funId;
    },
  },
  data() {
    return {
      params: {
        _mt: this.$global.mt + "OrgPermaintain.getPage",
        APsort: "id",
        APorder: "desc",
        AProws: 50,
        APpage: 1,
        APffk: this.funId,
        orgperUnitid: "",
        // APstatus: "01all",
      },
      option: {
        tooltip: {},
        legend: {
          icon: "circle",
          orient: "vertical",
          top: "75%",
          right: "4%",
          y: "center",
          data: [
            {
              name: "他评均分",
              textStyle: {
                // 图例项的文本样式。
                color: "#fff",
                fontWeight: "lighter", // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
                fontSize: 10,
              },
            },
            {
              name: "自评均分",
              textStyle: {
                // 图例项的文本样式。
                color: "#fff",
                fontWeight: "lighter", // 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
                fontSize: 10,
              },
            },
          ],
          itemWidth: 10,
          itemHeight: 10,
          inactiveColor: "#ccc",
        },
        radar: {
          // backgroundColor: "red",
          // shape: 'circle',
          splitNumber: 3,
          name: {
            textStyle: {
              color: "#fff",
              borderRadius: 3,
              padding: [0, 0, 0, 0],
              // margin: [0, 0, -2, 0],
              fontSize: 14,
            },
          },
          center: ["50%", "52%"],
          indicator: [
            { name: "暂无数据", max: "0" },
            { name: "暂无数据", max: "0" },
            { name: "暂无数据", max: "0" },
            { name: "暂无数据", max: "0" },
            { name: "暂无数据", max: "0" },
          ],
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [],
                name: "他评均分",
                itemStyle: {
                  normal: {
                    color: "#E15D68",
                    lineStyle: {
                      color: "#E15D68",
                    },
                  },
                },
                label: {
                  // 单个拐点文本的样式设置
                  normal: {
                    show: true,
                    // 单个拐点文本的样式设置。[ default: false ]
                    position: "top",
                    // 标签的位置。[ default: top ]
                    distance: 10,
                    // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                    color: "#e15d68",
                    // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                    fontSize: 10,
                    // 文字的字体大小
                    formatter: function (params) {
                      return params.value;
                    },
                  },
                },
              },
              {
                value: [],
                name: "自评均分",
                itemStyle: {
                  normal: {
                    color: "#00CCCD",
                    lineStyle: {
                      color: "#00CCCD",
                    },
                  },
                },
                label: {
                  // 单个拐点文本的样式设置
                  normal: {
                    show: true,
                    // 单个拐点文本的样式设置。[ default: false ]
                    position: "top",
                    // 标签的位置。[ default: top ]
                    distance: 10,
                    // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效。[ default: 5 ]
                    color: "#00CCCD",
                    // 文字的颜色。如果设置为 'auto'，则为视觉映射得到的颜色，如系列色。[ default: "#fff" ]
                    fontSize: 10,
                    // 文字的字体大小
                    formatter: function (params) {
                      return params.value;
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      myChart1: {},
    };
  },
  mounted() {
    const t = this;
    window.addEventListener = function () {
      console.log(screen.width, "当前分辨率");
      if (screen.width >= 1920) {
        t.option.legend.top = "80%";
        t.option.legend.data[0].textStyle.fontSize = 14;
        t.option.legend.data[1].textStyle.fontSize = 14;
        t.option.legend.data[0].textStyle.fontWeight = "bold";
        t.option.legend.data[1].textStyle.fontWeight = "bold";
        t.option.radar.radius = 100;
      } else if (screen.width < 1600) {
        t.option.radar.name.textStyle.fontSize = 8;
        t.option.radar.radius = 60;
      }
    };

    this.initEchart1();
  },
  methods: {
    initEchart1() {
      const t = this;
      t.myChart1 = t.$echarts.init(document.getElementById("pp-echart"));
      t.myChart1.setOption(t.option, true);
    },
    getData() {
      const t = this;

      t.option.series[0].data[0].value = [];
      t.option.series[0].data[1].value = [];
      t.option.radar.indicator = [];

      const data = deepCopy(t.params);
      data.orgperUnitid = t.unitId;
      data.APffk = t.funId;
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }

      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0].rows, "长度");
            if (res.data.content[0].rows.length !== 0) {
              let arr = res.data.content[0].rows;
              arr.forEach((item, i) => {
                t.option.radar.indicator.push({
                  name: item.orgperDimen,
                  max: "100",
                });
                t.option.series[0].data[0].value.push(item.orgperTpaverage);
                t.option.series[0].data[1].value.push(item.orgperZpaverage);
              });
            } else {
              t.option.radar.indicator = [
                { name: "暂无数据", max: "0" },
                { name: "暂无数据", max: "0" },
                { name: "暂无数据", max: "0" },
                { name: "暂无数据", max: "0" },
                { name: "暂无数据", max: "0" },
              ];
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
  },
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
      height: 40px;
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
      // border:1px solid red;
      margin: auto;
      width: 100%;
      padding-top: 0;
      // flex: 1;
      height: 88%;
      #pp-echart {
        width: 100%;
        height: 100%;
      }
    }
  }
  .bottom {
    color: #fff;
    text-align: center;
    .d {
      display: inline-block;
      margin: 0 40px;
      .q {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
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
      // border:1px solid red;
      margin: auto;
      width: 100%;
      padding-top: 0;
      // flex: 1;
      height: 88%;
      #pp-echart {
        width: 100%;
        height: 100%;
      }
    }
  }
  .bottom {
    color: #fff;
    text-align: center;
    .d {
      display: inline-block;
      margin: 0 40px;
      .q {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>