<template>
  <div class="largeScreen">
    <div class="mainScreen">
      <div class="main_header">组织管理看板</div>
      <div class="main_content">
        <Row class="head">
          <Select
            v-model="selectId"
            placeholder="请选择"
            class="pickData"
            @on-change="selData"
            style="width: 148px"
          >
                            
            <Option
              v-for="(item, index) in downList"
              :value="item.id"
              :key="index"
              >{{ item.name }}</Option
            >
                    
          </Select>

          <div class="downBtn downBtn2" @click="selectzhil">
            <a href="javascript:void(0)">
              {{ unit || "请选择公司" }}
              <Icon
                type="ios-search"
                style="float: right; margin-top: 3%"
              ></Icon>
            </a>
          </div>

          <!-- 公司 -->
          <transition name="fade">
            <searchLar
              v-show="openzhil"
              @closeUp="closeUp"
              @changeinputZhil="changeinputZhil"
              ref="searchLar"
            ></searchLar>
          </transition>
        </Row>

        <Row class="content_box">
          <Col span="7" class="left block_spaceBetween">
            <div class="top">
              <div class="left-top">
                <peopleWork
                  ref="peopleWork"
                  :peopleWorkList="Object(peopleWorkList)"
                ></peopleWork>
                <!-- <div class="block peoplework">
                                <div class="block-title">
                                    <img src="../../../static/img/largeScreen/title-1.png"
                                         alt="">
                                    <span>人效类</span>
                                </div>
                                <div class="block-box">
                                    <div class="block-item item-f">
                                        <span><b>64</b>万元</span>
                                        <span>人均净利润</span>
                                    </div>
                                    <div class="block-item item-s">
                                        <span><b>64</b>万元</span>
                                        <span>人均签约额</span>
                                    </div>
                                    <div class="block-item item-t">
                                        <span><b>64</b>万元</span>
                                        <span>人均在建面积</span>
                                    </div>
                                </div>
                            </div> -->
              </div>
              <div class="left-bottom">
                <managDeviation
                  ref="managDeviation"
                  :managDeviationList="
                    selectId === '01develop'
                      ? Object(managDeviationList)
                      : Object(managDeviationList1)
                  "
                  :selectId="selectId"
                ></managDeviation>
              </div>
            </div>
            <div class="bottom">
              <brcMethod
                ref="brcMehod"
                :brcMethodList="
                  selectId === '01develop'
                    ? Object(brcMethodList)
                    : Object(brcMethodList1)
                "
                :selectId="selectId"
              ></brcMethod>
            </div>
          </Col>
          <Col span="10" class="center block_spaceBetween">
            <div class="top center-top">
              <perStructure
                ref="perStructure"
                :unitId="unitId"
                :selectId="selectId"
              ></perStructure>
            </div>
            <div class="bottom center-bootom">
              <!-- <mapModel></mapModel> -->
              <peopleWorkRate
                ref="peopleWorkRate"
                :selectId="selectId"
              ></peopleWorkRate>
            </div>
          </Col>
          <Col span="7" class="right block_spaceBetween">
            <div class="top right-top">
              <perforRanking
                ref="perforRanking"
                :unitId="unitId"
              ></perforRanking>
            </div>
            <div class="bottom right-bootom">
              <!-- <engagement></engagement> -->
              <radar ref="radar" :unitId="unitId"></radar>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import peopleWork from "@/components/largeScreen/peopleWorkC";
import brcMethod from "@/components/largeScreen/brcMethod";
import managDeviation from "@/components/largeScreen/managDeviation";
import perStructure from "@/components/largeScreen/perStructure";
// import mapModel from '@/components/largeScreen/mapModel'
import peopleWorkRate from "@/components/largeScreen/peopleWorkRate";
import perforRanking from "@/components/largeScreen/perforRanking";
import engagement from "@/components/largeScreen/engagement";
import searchLar from "@/components/largeScreen/searchLar";
import { getDataLevelUserLoginData, uploadimage } from "@/axios/axios";
import { isSuccess, deepCopy, getCookie } from "@/lib/util";
import valid from "@/lib/pub_valid";
import radar from "@/components/largeScreen/radar";

export default {
  data() {
    return {
      params: {
        _mt: this.$global.mt + "OrgKbrpt01.getByCompId",
        APset: "",
        APcompId: "",
        APdate: "",
        // APstatus: "01all",
      },
      downList: [
        {
          name: "开发体系",
          id: "01develop",
        },
        {
          name: "营销体系",
          id: "02market",
        },
      ],
      //   bstdahAuthuseridDis: "",
      openzhil: false,
      unitId: "2717",
      unit: "中南锦时",
      selectName: "开发体系",
      selectId: "01develop",
      peopleWorkList: {
        // 人均净利润
        orgkb1NetprofitsByP: "",
        // 人均签约额-全口径
        orgkb1QkjqyamountByP: "",
        // 人均在建面积
        orgkb1BuildareaByP: "",
        // 人均签约额-权益口径
        orgkb1QykjqyamountByP: "",
        // 人均签约额-操盘口径
        orgkb1CpqyamountByP: "",
      },
      // 开发
      managDeviationList: {
        // 教育培训与人才发展
        orgkb1Jyandrcamount: "",
        orgkb1Jyandrcamounts: "",
        // 招聘费用
        orgkb1Cpamount: "",
        orgkb1Cpamounts: "",
        // 薪酬成本
        orgkb1Payrollamountdev: "",
        orgkb1Payrollamountdevs: "",
        // 行政费用
        orgkb1Xzamount: "",
        orgkb1Xzamounts: "",
        // 其他
        orgkb1Otheramount: "",
        orgkb1Otheramounts: "",
      },
      // 营销
      managDeviationList1: {
        // 薪酬成本
        orgkb1Payrollamountsale: "",
        orgkb1Payrollamountsales: "",
        // 渠道推广费
        unitkbChtgamount: "",
        unitkbChtgamounts: "",
        // 销售设施费
        unitkbXsssamount: "",
        unitkbXsssamounts: "",
        // 案场运维费
        unitkbAcywamount: "",
        unitkbAcywamounts: "",
      },
      brcMethodList: {
        // 管理费用总额
        unitkbMgttamount: "",
        // 实际管理费用-权益
        unitkbMgtacamount: "",
        // 管理费用偏差率
        unitkbMgtdeviation: "",
      },
      brcMethodList1: {
        // 营销费用总额
        unitkbSaleamount: "",
        // 实际营销费率-全口径
        unitkbSaleacamount: "",
        // 营销费用偏差率
        unitkbSaledeviation: "",
      },
    };
  },
  components: {
    peopleWork,
    managDeviation,
    peopleWorkRate,
    perforRanking,
    engagement,
    perStructure,
    brcMethod,
    searchLar,
    radar,
    // mapModel
  },
  mounted() {
    const t = this;

    window.onload = () => {
      this.$refs.peopleWorkRate.oprRateHeight();
      this.$refs.perforRanking.oprRankHeight();
    };
    window.onresize = () => {
      this.$refs.peopleWorkRate.oprRateHeight();
      this.$refs.perforRanking.oprRankHeight();
    };

    document.addEventListener("keydown", (e) => {
      // console.log(e.keyCode, "e.keyCode");
      if (e.keyCode == 122) {
        t.initResize();
        window.onresize = function temp() {
          t.initResize();
        };
      }
    });

    this.getData();
    this.getData2();
  },
  computed: {},
  methods: {
    getData2() {
      const t = this;

      const data = deepCopy(t.params);
      data.APset = t.selectId;
      data.APcompId = t.unitId;
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }

      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data);
            console.log(Object.keys(res.data.content[0]).length, "数据长度");

            if (res.data.content[0].length !== 0) {
              t.peopleWorkList.orgkb1NetprofitsByP =
                res.data.content[0].orgkb1NetprofitsByP;
              t.peopleWorkList.orgkb1QkjqyamountByP =
                res.data.content[0].orgkb1QkjqyamountByP;
              t.peopleWorkList.orgkb1BuildareaByP =
                res.data.content[0].orgkb1BuildareaByP;
              t.peopleWorkList.orgkb1QykjqyamountByP =
                res.data.content[0].orgkb1QykjqyamountByP;
              t.peopleWorkList.orgkb1CpqyamountByP =
                res.data.content[0].orgkb1CpqyamountByP;

              if (t.selectId === "01develop") {
                t.managDeviationList.orgkb1Jyandrcamount =
                  (
                    res.data.content[0].orgkb1Jyandrcamount /
                    res.data.content[0].unitkbMgttamount
                  ).toFixed(2) * 100;
                t.managDeviationList.orgkb1Cpamount =
                  (
                    res.data.content[0].orgkb1Cpamount /
                    res.data.content[0].unitkbMgttamount
                  ).toFixed(2) * 100;
                t.managDeviationList.orgkb1Payrollamountdev =
                  (
                    res.data.content[0].orgkb1Payrollamountdev /
                    res.data.content[0].unitkbMgttamount
                  ).toFixed(2) * 100;
                t.managDeviationList.orgkb1Xzamount =
                  (
                    res.data.content[0].orgkb1Xzamount /
                    res.data.content[0].unitkbMgttamount
                  ).toFixed(2) * 100;
                t.managDeviationList.orgkb1Otheramount =
                  (
                    res.data.content[0].orgkb1Otheramount /
                    res.data.content[0].unitkbMgttamount
                  ).toFixed(2) * 100;
                t.managDeviationList.orgkb1Jyandrcamounts =
                  res.data.content[0].orgkb1Jyandrcamount;
                t.managDeviationList.orgkb1Cpamounts =
                  res.data.content[0].orgkb1Cpamount;
                t.managDeviationList.orgkb1Payrollamountdevs =
                  res.data.content[0].orgkb1Payrollamountdev;
                t.managDeviationList.orgkb1Xzamounts =
                  res.data.content[0].orgkb1Xzamount;
                t.managDeviationList.orgkb1Otheramounts =
                  res.data.content[0].orgkb1Otheramount;

                t.brcMethodList.unitkbMgttamount =
                  res.data.content[0].unitkbMgttamount;
                t.brcMethodList.unitkbMgtacamount =
                  res.data.content[0].unitkbMgtacamount;
                t.brcMethodList.unitkbMgtdeviation =
                  res.data.content[0].unitkbMgtdeviation;
              } else if (t.selectId === "02market") {
                t.managDeviationList1.orgkb1Payrollamountsale =
                  (
                    res.data.content[0].orgkb1Payrollamountsale /
                    res.data.content[0].unitkbSaleamount
                  ).toFixed(2) * 100;
                t.managDeviationList1.unitkbChtgamount =
                  (
                    res.data.content[0].unitkbChtgamount /
                    res.data.content[0].unitkbSaleamount
                  ).toFixed(2) * 100;
                t.managDeviationList1.unitkbXsssamount =
                  (
                    res.data.content[0].unitkbXsssamount /
                    res.data.content[0].unitkbSaleamount
                  ).toFixed(2) * 100;
                t.managDeviationList1.unitkbAcywamount =
                  (
                    res.data.content[0].unitkbAcywamount /
                    res.data.content[0].unitkbSaleamount
                  ).toFixed(2) * 100;
                t.managDeviationList1.orgkb1Payrollamountsales =
                  res.data.content[0].orgkb1Payrollamountsale;
                t.managDeviationList1.unitkbChtgamounts =
                  res.data.content[0].unitkbChtgamount;
                t.managDeviationList1.unitkbXsssamounts =
                  res.data.content[0].unitkbXsssamount;
                t.managDeviationList1.unitkbAcywamounts =
                  res.data.content[0].unitkbAcywamount;

                t.brcMethodList1.unitkbSaleamount =
                  res.data.content[0].unitkbSaleamount;
                t.brcMethodList1.unitkbSaleacamount =
                  res.data.content[0].unitkbSaleacamount;
                t.brcMethodList1.unitkbSaledeviation =
                  res.data.content[0].unitkbSaledeviation;
              }

              t.$refs.managDeviation.getData();

              console.log(
                t.peopleWorkList,
                t.managDeviationList,
                t.brcMethodList
              );
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
    selData(id) {
      this.selectId = id;
      this.getData();
      this.getData2();
    },
    initResize() {
      let t = this;

      t.$refs.radar.myChart1.resize();
      t.$refs.managDeviation.myChart1.resize();
      t.$refs.perStructure.myChart.resize();
    },
    getData() {
      this.$nextTick(() => {
        this.$refs.radar.getData();
        this.$refs.perforRanking.getData();
        this.$refs.perStructure.getData();
        this.$refs.peopleWorkRate.getData();
      });
    },
    closeUp() {
      const t = this;
      t.openzhil = false;
    },
    selectzhil() {
      const t = this;
      console.log(t.$refs);
      t.openzhil = true;

      this.$nextTick(() => {
        t.$refs.searchLar.getData();
      });
    },
    changeinputZhil(name, id) {
      const t = this;
      t.unit = name;
      t.unitId = id;
      t.getData();
      t.getData2();
    },
  },
  created() {},
  watch: {},
  destroyed() {},
};
</script>
<style lang="scss" scoped>
@media (min-width: 600px) {
  .largeScreen /deep/ .ivu-select-selection{
    background-color:transparent !important;
  }
  .largeScreen {
    width: 100%;
    height: 100%;
    background: url("../../../static/img/largeScreen/screen-bg.png") center
      center no-repeat;
    background-size: cover;
    span {
      line-height: 1;
    }
    .mainScreen {
      height: 100%;
      width: 100%;
      .main_header {
        width: 100%;
        height: 6.5%;
        background: url("../../../static/img/largeScreen/header.png") center
          center no-repeat;
        font-size: 1.5rem;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
      }
      .main_content {
        height: 95.5%;
        //   background:#fff;
        padding: 30px 20px 20px;
        .content_box {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .left {
            height: 100%;
            width: 28.2%;
            margin-right: 15px;
          }
          .center {
            height: 100%;
            width: 41.55%;
          }

          .right {
            height: 100%;
            width: 28.2%;
            margin-left: 15px;
          }
          .block_spaceBetween {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .top {
            width: 100%;
            height: 77.9%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .left-top {
              width: 100%;
              height: 38.9%;
            }
            .left-bottom {
              width: 100%;
              height: 58.3%;
            }
          }
          .bottom {
            width: 100%;
            height: 20%;
            // background: #cc0;
          }
          .center-top {
            height: 56%;
          }
          .center-bootom {
            height: 42%;
          }
          .right-top {
            height: 56%;
          }
          .right-bootom {
            height: 42%;
          }
        }
      }
    }
  }

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
      font-size: 16px;
      margin-left: 6px;
    }
  }
  .downBtn {
    display: inline-block;
    height: 32px;
    padding: 5px 10px;
    border: 1px solid #3ebafa;
    box-sizing: border-box;
    color: #3ebafa;
    border-radius: 4px;
    margin-left: 20px;
  }
  .downBtn2 {
    min-width: 148px;
  }

  .head {
    position: absolute;
    right: 20px;
    top: 4.8%;
  }

  /deep/ .background[data-v-3de5e7ed] .ivu-table-row td {
    // border-bottom: 1px solid #0280e3 !important;
    background: none !important;
  }
  /deep/ .background[data-v-3de5e7ed] .ivu-table-row-hover td {
    // border-bottom:2px solid #0280e3 !important;
    background: #3ebafa !important;
  }

  /deep/ .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
  /deep/ .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
    border-top: none !important;
  }

  // /deep/ .background[data-v-3de5e7ed] .ivu-table th {
  //   border-bottom: 2px double #0280e3 !important;
  // }

  /deep/ .background[data-v-3de5e7ed] .ivu-page-item-active {
    background-color: #0c1127 !important;
  }

  /deep/ .ivu-select-selection {
    border: 1px solid #0280e3;
  }

  /deep/ .background[data-v-3de5e7ed] .ivu-table:after {
    background-color: transparent;
  }

  /deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    background: #0c1127;
    border: 1px solid transparent;
  }

  /deep/ .ivu-page-options-elevator input {
    background: #0c1127;
    border: 1px solid #0280e3;
    color: #0280e3;
  }

  /deep/ .background[data-v-3de5e7ed] .ivu-table {
    // border: 2px solid #0280e3;
    border-top: 1px solid transparent !important;
    border-right: 1px solid transparent !important;
    border-left: 1px solid transparent !important;
  }

  /deep/ .ivu-select-selected-value {
    color: #0280e3 !important;
  }

  /deep/ .ivu-row[data-v-3de5e7ed] {
    width: 99.5%;
  }
  /deep/ .ivu-select-selection {
    border: 1px solid #0280e3;
    border-radius: 4px;
    overflow: hidden;
  }
}

@media (min-width: 1920px) {
  .largeScreen {
    width: 100%;
    height: 100%;
    background: url("../../../static/img/largeScreen/screen-bg.png") center
      center no-repeat;
    background-size: cover;
    span {
      line-height: 1;
    }
    .mainScreen {
      height: 100%;
      width: 100%;
      .main_header {
        width: 100%;
        height: 6.5%;
        background: url("../../../static/img/largeScreen/header.png") center
          center no-repeat;
        font-size: 2.5rem;
        color: #ffffff;
        text-align: center;
        line-height: 55px;
      }
      .main_content {
        height: 94.5%;
        //   background:#fff;
        padding: 40px 20px 20px;
        .content_box {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .left {
            height: 100%;
            width: 28.2%;
            margin-right: 15px;
          }
          .center {
            height: 100%;
            width: 41.55%;
          }

          .right {
            height: 100%;
            width: 28.2%;
            margin-left: 15px;
          }
          .block_spaceBetween {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .top {
            width: 100%;
            height: 77.9%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .left-top {
              width: 100%;
              height: 38.9%;
            }
            .left-bottom {
              width: 100%;
              height: 58.3%;
            }
          }
          .bottom {
            width: 100%;
            height: 20%;
            // background: #cc0;
          }
          .center-top {
            height: 56%;
          }
          .center-bootom {
            height: 42%;
          }
          .right-top {
            height: 56%;
          }
          .right-bootom {
            height: 42%;
          }
        }
      }
    }
  }

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
      font-size: 16px;
      margin-left: 6px;
    }
  }
  .downBtn {
    display: inline-block;
    height: 32px;
    padding: 5px 10px;
    border: 1px solid #0280e3;
    box-sizing: border-box;
    color: #3ebafa;
    border-radius: 4px;
    margin-left: 20px;
  }
  .downBtn2 {
    min-width: 148px;
  }

  .head {
    position: absolute;
    right: 20px;
    top: calc(0% + 48px);
  }

  /deep/ .background[data-v-3de5e7ed] .ivu-table-row td {
    // border-bottom: 1px solid #0280e3 !important;
    background: none !important;
  }
  /deep/ .background[data-v-3de5e7ed] .ivu-table-row-hover td {
    // border-bottom:2px solid #0280e3 !important;
    background: #3ebafa !important;
  }

  /deep/ .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
  /deep/ .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
    border-top: none !important;
  }

  /deep/ .background[data-v-3de5e7ed] .ivu-table th {
    border-bottom: 1px double #0280e3 !important;
  }

  /deep/ .background[data-v-3de5e7ed] .ivu-page-item-active {
    background-color: #0c1127 !important;
  }

  /deep/ .ivu-select-selection {
    border: 1px solid #0280e3;
    overflow: hidden;
  }

  /deep/ .background[data-v-3de5e7ed] .ivu-table:after {
    background-color: transparent !important;
  }

  /deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    background: #0c1127;
    border: 1px solid transparent;
  }

  /deep/ .ivu-page-options-elevator input {
    background: #0c1127;
    border: 1px solid #0280e3;
    color: #0280e3;
  }

  /deep/ .background[data-v-3de5e7ed] .ivu-table {
    border: 2px solid transparent;
    border-top: 1px solid transparent !important;
    border-right: 1px solid transparent !important;
    border-left: 1px solid transparent !important;
  }

  /deep/ .ivu-select-selected-value {
    color: #0280e3 !important;
  }

  /deep/ .ivu-row[data-v-3de5e7ed] {
    width: 99.5%;
  }
  /deep/ .ivu-select-selection {
    // border: 1px solid #0280e3;
    border-radius: 4px;
  }
}
</style>
