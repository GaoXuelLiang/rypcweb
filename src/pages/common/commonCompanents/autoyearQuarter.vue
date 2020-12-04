
<template>
  <div
    style="width: 100%"
    v-if="isshow"
  >
    <i-col
      span="10"
      class="col-box"
      offset="1"
    >
      <FormItem
        :label="itemLabel"
        :prop="ruleText"
      >
        <mark
          class="_mark"
          v-show="showSeason"
          @click.stop="showSeason=false"
        ></mark>
         <Input :placeholder="'请选择' +  itemLabel" v-model="thisValue" style="width:100%;" @on-focus="showSeason=true" :disabled="thisDis">
        <i slot="prefix" class="el-input__icon el-icon-date"></i>
      </Input>
      <el-card
        class="box-card"
        v-show="showSeason"
      >
      <div class="ivu-picker-panel-body-wrapper">
          <div class="ivu-picker-panel-body">
            <div class="ivu-date-picker-header">
              <span class="ivu-picker-panel-icon-btn ivu-date-picker-prev-btn ivu-date-picker-prev-btn-arrow-double" @click="prev">
                <i class="ivu-icon ivu-icon-ios-arrow-back"></i>
              </span>
              <span>
                <span  class="ivu-date-picker-header-label">{{year}}年</span>
              </span>
              <span class="ivu-picker-panel-icon-btn ivu-date-picker-next-btn ivu-date-picker-next-btn-arrow-double"  @click="next">
                <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
              </span>
            </div>

            <div class="ivu-picker-panel-content">

                <div class="text item">
                  <el-button
                    type="text"
                    size="medium"
                    class="_left"
                    @click="selectSeason(0)"
                  >一季度</el-button>
                  <el-button
                    type="text"
                    size="medium"
                    class="_right"
                    @click="selectSeason(1)"
                  >二季度</el-button>
                </div>
                <div class="text item">
                  <el-button
                    type="text"
                    size="medium"
                    class="_left"
                    @click="selectSeason(2)"
                  >三季度</el-button>
                  <el-button
                    type="text"
                    size="medium"
                    class="_right"
                    @click="selectSeason(3)"
                  >四季度</el-button>
                </div>
            </div>
          </div>
      </div>
      </el-card>

        <!-- <DatePicker v-model="thisValue"
                            @on-change="change"
                            type="quarterrange"
                            style="width:100%"
                            :placeholder="'请选择' + itemLabel"
                            :disabled="thisDis"></DatePicker> -->
      </FormItem>
    </i-col>
    <i-col
      span="10"
      offset="1"
      v-if="message"
    >
      <div class="message">{{message}}</div>
    </i-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      valueArr: ['一季度', '二季度', '三季度', '四季度'],
      showSeason: false,
      season: "",
      thisValue: this.value,
      isshow: this.ruleText in this.show,
      thisDis: this.disabled ? this.disabled : !this.dis[this.ruleText],
       year: new Date().getFullYear(),
      //  thisValue: ''

    };
  },
  props: {
    value: String,
    itemLabel: String,
    message: String,
    required: Boolean,
    ruleText: String,
    disabled: Boolean, // 是否可编辑
    show: Object, // 是否显示
    dis: Object, // 是否可编辑plus
  },
  methods: {
    change(value) {
      this.$emit("on-change", value);
    },
    change111() {
      let t = this;
      t.$emit("change", t);
    },
    prev() {
      this.year = this.year * 1 - 1
    },
    next() {
      this.year = this.year * 1 + 1
    },
    selectSeason(i) {
      console.log(i, 'iiiii')
      let that = this
      that.season = i + 1
      // let arr = that.valueArr[i].split('-')
      let arr = that.valueArr;
      that.getValue(that.year + '年' + arr[i]);
      that.showSeason = false
      // this.thisValue = `${this.year}年${this.season}季度`
    },
    getValue(val) {
      console.log(val, 'vallll')
      this.$emit('on-change', val)
    }
  },
  watch: {
    value: function (val) {
      this.thisValue = val;
    },
    thisValue(val) {
      this.change111();
    },
    show: {
      handler: function (val) {
        this.isshow = this.ruleText in this.show;
      },
      deep: true,
    },
    dis: {
      handler: function (val) {
        this.thisDis = this.disabled ? this.disabled : !this.dis[this.ruleText];
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.message {
  width: 100%;
  // border: 2px solid #f2f7fd;
  min-height: 33px;
  padding: 4px 10px;
  line-height: 24px;
  margin-bottom: 24px;
  background-color: #f2f7fd;
}
// .col-box {
//     position: static;
//     /deep/ .ivu-form-item-content {
//         position: static;
//     }
// }
._mark {
  position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;
}
.yearBtn {
  text-align:center;padding:0
}
.box-card {
  
  padding: 0 3px 20px;margin-top:10px;position:absolute;z-index:9999
}
.text.item {
  text-align: center;
}
.text.item >>> .el-button{
  width:40%;color: #606266;
}
.text.item ._left {
  float: left;
}
.text.item ._right {
  float: right;
}
</style>