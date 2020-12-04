<template>
  <div class="block peoplework">
    <div class="block-title">
      <img src="../../../static/img/largeScreen/title-1.png" alt="" />
      <span>费效类</span>
    </div>
    <div class="block-box">
      <div class="block-item item-f">
        <span
          ><b>{{
            selectId === "01develop"
              ? Number(brcMethodList.unitkbMgttamount) || 0
              : Number(brcMethodList.unitkbSaleamount) || 0
          }}</b
          >万元</span
        >
        <span>管理费用总额</span>
      </div>
      <div class="block-item item-s">
        <span
          ><b>{{
            selectId === "01develop"
              ? Number(brcMethodList.unitkbMgtacamount) || 0
              : Number(brcMethodList.unitkbSaleacamount) || 0
          }}</b
          >%</span
        >
        <span>实际管理费率-权益</span>
      </div>
      <div class="block-item item-t">
        <span
          ><b>{{
            selectId === "01develop"
              ? Number(brcMethodList.unitkbMgtdeviation) || 0
              : Number(brcMethodList.unitkbSaledeviation) || 0
          }}</b
          >%</span
        >
        <span>管理费用偏差率</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";

export default {
  props: {
    brcMethodList: Object,
    selectId: String,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log("体系", this.selectId);
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 600px) {
  .peoplework {
    background: #0e1a57;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .block-title {
      height: 50px;
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
      display: flex;
      flex: 1;
      padding: 0 1% 1% 1%;
      display: flex;
      justify-content: space-between;
      .block-item {
        width: 31%;
        height: 90%;
        background: #1692d7;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &.item-f {
          background: #1692d7;
        }
        &.item-s {
          background: #15c1b0;
        }
        &.item-t {
          background: #e28c31;
        }
        span {
          color: #fff;
          font-size: 0.7rem;
          margin-top: 2%;
          b {
            font-size: 1rem;
          }
        }
      }
    }
  }
}

@media (min-width: 1920px) {
  .peoplework {
    background: #0e1a57;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .block-title {
      height: 50px;
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
      display: flex;
      flex: 1;
      padding: 0 1% 1% 1%;
      display: flex;
      justify-content: space-between;
      .block-item {
        width: 31%;
        height: 80%;
        background: #1692d7;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &.item-f {
          background: #1692d7;
        }
        &.item-s {
          background: #15c1b0;
        }
        &.item-t {
          background: #e28c31;
        }
        span {
          color: #fff;
          font-size: 16px;
          margin-top: 2%;
          b {
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>