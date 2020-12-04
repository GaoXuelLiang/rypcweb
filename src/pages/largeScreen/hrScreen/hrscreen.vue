<template>
  <div class="bg">
    <div class="tit color-white">
        领导决策人力资源看板
    </div>
    <div class="inner clearfix" >
      <div class="left float_left h98 left_table">
        <div class="in_tit color-white">效能分析</div>
        <sale ref="sale"></sale>
      </div>
      <div class="center h100">
        <midPeople style="height:20%;"  ref="midPeople"></midPeople>
        <midMap style="height:80%;" ref="midMap"></midMap>
      </div>
      <div class="right float_right h98">
        <div class="in_tit color-white">人力成本</div>
        <div class="right_table mab">
          <rightTop ref="rightTop"></rightTop>
        </div>
        <p class='tittle-p color-white'>九宫格分析</p>
        <div class="right_table">
          <sudoku ref="sudoku" ></sudoku>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import sale from './sale/sale'
  import rightTop from './rightTop/rightTop'
  import sudoku from './sudoku/sudoku'
  import midMap from './map/map'
  import midPeople from './midPeople/midPeople'
  export default{
    name: 'hrscreen',
    data() {
      return {
        nowTime: new Date().format('yyyy-MM-dd hh:mm:ss'),
      }
    },
    components: {
      sale,
      rightTop,
      sudoku,
      midMap,
      midPeople
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
      }
    },
    mounted() {
      const t = this;
      document.addEventListener('keydown', (e) => {
        if (e.keyCode == 122) {
          t.initResize();
          window.onresize = function temp () {
            t.initResize()
          }
        }
      });
    },
    computed: {
      inventoryEmpId() {
        return this.$store.state.inventoryPortaritSave.inventoryEmpId
      },
    },
    watch: {
      inventoryEmpId(val) {
        if (val === '') {
          return
        }
        // 人力成本
         this.$refs.rightTop.getData()
          // 九宫格分析
         this.$refs.sudoku.getNowDate()
          // 员工总人数
         this.$refs.midPeople.getData()
          //
         this.$refs.sale.getData()
      },
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptEmpChg.getDefaultComp',
          logType: '获取公司id',
          tempValue: '0',
        }
        getDataLevelUserLogin(data).then((res) => {
          if (res.data.content[0].hasOwnProperty('value')) {
            let mapData = JSON.parse(res.data.content[0].value)
            t.$store.commit('inventoryPortaritSave/setInventoryEmpId', mapData.id)
            this.$refs.rightTop.getData()
            this.$refs.sudoku.getNowDate()
            this.$refs.midPeople.getData()
            this.$refs.sale.getData()
          }
        }).catch((err) => {
          console.log('hr决策')
        })
      },
      initResize() {
        this.$refs.rightTop.getData()
        this.$refs.sudoku.getNowDate()
        this.$refs.midPeople.getData()
        this.$refs.sale.getData()
      }
    },
  }

</script>
<style lang="scss" scoped>
@media screen and (min-width:1400px){
  .word16 {
    font-size: 16px;
  }
}
.word_num {
  font-size: 1.25rem
}
.color-white {
  color:rgba(254,254,254,1);
}

// .clearfix:after,.clearfix:before{
//   content: "";
//   display: table;
// }
// .clearfix:after{
//   clear: both;
// }
// .clearfix{
//   *zoom: 1;
// }
.clearfix {
  *zoom: 1;
  &:before, &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
}
.left{
  width: 19%;
}
.inner {
  display: flex;
  height: 89%;
  padding: 0 1%;
  padding-bottom: 10px;
}
.center{
  width: 60%;
  padding: 0 1%;
  flex: 1;
}
.right{
  width: 19%;
}
.float_right {
  float: right;
}
.float_left {
  float: left;
}
.h100 {
  height: 101%;
}
.h98 {
  height: 98%;
}
.bg {
  background: url('../../../../static/largeScreen/screen_bg.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"微软雅黑",Arial,sans-serif
}

.in_tit {
  background: url('../../../../static/largeScreen/all_title.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  width: 230px;
  height: 20px;
  line-height: 17px;
  font-weight: bold;
  font-size: 16px;
  padding-left: 60px;
  margin-bottom: 3%;
  display: inline-block;
}
.tit {
  background: url('../../../../static/largeScreen/screen_title.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  width: 100%;
  height: 9%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  // font-weight: bold;
}
.tit1 {
  width: 19%;
  height: 20px;
  line-height: 17px;
  background: url('../../../../static/largeScreen/all_title.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  position: absolute;
  top: 7%;
  span {
    padding-left: 22%;
    font-size: 14px;
    font-weight: bold;
  }
}
.tit2 {
  width: 100%;
  text-align: center;
  .tit2_name {
    display: inline-block;
    width: 100%;
    font-size: 1.5rem;
  }
}
.activeClass {
  color:rgba(128,175,248,1) !important;
}
.left_table {

  p {
    display: flex;
    margin-top: 10px;
    span{
      flex: 1;
      text-align: center;
      display: inline-block;
      height: 40px;
      width: 100%;
      line-height: 40px;
      color:rgba(254,254,254,1);
      background: url('../../../../static/largeScreen/sale_title.png') no-repeat;
      background-position: 50% 100%;
      background-size: 55% 100%;
    }
  }
}
.tittle-p {
  width: 230px;
  height: 20px;
  background: url('../../../../static/largeScreen/all_title.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  padding-left: 60px;
  font-size: 14px;
  font-weight: bold;
  line-height: 18px;
  margin: 0;
}
.right_table {
  background: url('../../../../static/largeScreen/right_bg.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  width: 100%;
  height: 47%;
  padding: 2%;
  padding-top: 0;
}
/deep/ .ivu-input {
  background-color: rgba(21,32,49,0.5);
  color:rgba(254,254,254,1) !important;
  border:1px solid;
  border-image:linear-gradient(-90deg, rgba(64,127,255,1), rgba(79,230,228,1)) 10 10;
}
.mab {
  margin-bottom: 7.5%;
}
@media screen and (max-width:1366px){
  .in_tit {
    margin-bottom: 0 !important;
    font-size: 14px !important;
  }
}
@media screen and (min-width:1400px){
  .mab {
    margin-bottom: 0;
  }
  .tittle-p {
    width: 230px;
    height: 20px;
    background: url('../../../../static/largeScreen/all_title.png') no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    padding-left: 60px;
    font-size: 16px;
    font-weight: bold;
    line-height: 17px;
    margin: 5.8% 0 3% 0;
  }
  .tit1 {
    span {
      font-size: 16px !important;
    }
  }

}

</style>
