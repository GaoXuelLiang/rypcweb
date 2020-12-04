<template>
  <div class="com_bg">
    <img class="earth" :style="isFullScreen ? 'bottom:28%' : 'top: 33%'" src="../../../../../static/largeScreen/0.png" alt="">
    <img class="cl1 cl" :style="isFullScreen ? 'bottom:23%' : 'top: 21%'" src="../../../../../static/largeScreen/1.png" alt="">
    <img class="cl2 cl" :style="isFullScreen ? 'bottom:21%' : 'top: 20%'" src="../../../../../static/largeScreen/2.png" alt="">
    <img class="cl3 cl" :style="isFullScreen ? 'bottom:14%' : 'top: 14%'" src="../../../../../static/largeScreen/3.png" alt="">
    <img class="cl4 cl" :style="isFullScreen ? 'bottom:12%' : 'top: 11%'" src="../../../../../static/largeScreen/4.png" alt="">
    <img class="cl5 cl" :style="isFullScreen ? 'bottom:10%' : 'top: 8%'" src="../../../../../static/largeScreen/5.png" alt="">
    <div class="box box1" >
      <div class="fon1">{{form.empNewhireCount}}</div>
      <div>本月入职</div>
      <p>（人）</p>
    </div>
    <div class="box box2" >
      <div  class="fon1">{{form.empProCount}}</div>
      <div>本月转正</div>
      <p>（人）</p>
    </div>
    <div class="box box3" >
      <div  class="fon1">{{form.empExtCount}}</div>
      <div>本月续签</div>
      <p>（人）</p>
    </div>
    <div class="box box4" :style="isFullScreen ? 'left: 8%' : 'left: 10%'" >
      <div  class="fon1">{{form.empTrsCount}}</div>
      <div>本月调动</div>
      <p>（人）</p>
    </div>
    <div class="box box5">
      <div class="fon1">{{form.empDisCount}}</div>
      <div>本月离职</div>
      <p>（人）</p>
    </div>
    <div class="box box6">
      <div class="fon1">{{form2.signNums}}</div>
      <div>当日签到</div>
      <p>（人）</p>
    </div>
    <div class="box box7">
      <div class="fon1">{{form2.leaveNums}}</div>
      <div>当日请假</div>
      <p>（人）</p>
    </div>
    <div class="box box8" :style="isFullScreen ? 'top: 78%' : 'top: 79%'">
      <div class="fon1">{{form2.overtimeNums}}</div>
      <div>当日加班</div>
      <p>（人）</p>
    </div>
    <div class="box box9" :style="isFullScreen ? 'top: 78%' : 'top: 79%'">
      <div class="fon1">{{form2.travelNums}}</div>
      <div>当日出差</div>
      <p>（人）</p>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'
  export default {
    data() {
      return {
        form: {
          empNewhireCount: '', // 入
          empProCount: '', // 转
          empTrsCount: '', // 调
          empExtCount: '', // 续
          empDisCount: '', // 离
        },
        form2: {
          signNums: '', // 入
          leaveNums: '', // 转
          overtimeNums: '', // 调
          travelNums: '', // 续
        },
      }
    },
    mounted() {
    },
    props: {
      isFullScreen: Boolean,
    },
    watch: {
      isFullScreen: {
        deep:true,
        immediate: true,
        handler (value) {
          this.isFullScreen = value
        }
      }
    },
    computed: {
      selectComid() {
        return this.$store.state.pubBoardSave.selectComid
      },
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptEmpChg.rtnEveryStateEmp',
          logType: '入离调转',
          selectCompid: t.selectComid,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            this.form = res.data.content[0]
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getData2() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptTimeManage.getObjByWhere',
          logType: '签到人数',
          unitId: t.selectComid,
          unitType: '01company',
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            this.form2 = res.data.content[0]
          }
        }).catch((err) => {
          console.log(err)
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
.com_bg {
  width: 100%;
  height: 100%;
  background: url('../../../../../static/largeScreen/com_border.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
}
.fon1 {
  font-size: 20px;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes rotation1 {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
  }
}
.cl2,.cl4 {
  -webkit-transform: rotate(360deg);
  animation: rotation1 13s linear infinite;
  -moz-animation: rotation1 13s linear infinite;
  -webkit-animation: rotation1 13s linear infinite;
  -o-animation: rotation1 13s linear infinite;
}
.cl1,.cl3,.cl5 {
  -webkit-transform: rotate(360deg);
  animation: rotation 13s linear infinite;
  -moz-animation: rotation 13s linear infinite;
  -webkit-animation: rotation 13s linear infinite;
  -o-animation: rotation 13s linear infinite;
}
.earth {
  width: 34%;
  height: auto;
  position: absolute;
  // top: 33%;
  left: 32%;
  z-index: 99;
}
.cl {
  position: absolute;
}
.cl1 {
  width: 42%;
  height: auto;
  // top: 22%;
  left: 28%;
}
.cl2 {
  width: 46%;
  height: auto;
  // top: 20%;
  left: 26%;
}
.cl3 {
  width: 56%;
  height: auto;
  // top: 12%;
  left: 21%;
}
.cl4 {
  width: 60%;
  height: auto;
  // top: 10%;
  left: 19%;
}
.cl5 {
  width: 64%;
  height: auto;
  // top: 7%;
  left: 17%;
}
.box {
  width: 17%;
  height: 20%;
  padding: 20px 0;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: url('../../../../../static/largeScreen/number8.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
}
.box1 {
  position: absolute;
  top: 1%;
  left: 41.5%;
}
.box2 {
  position: absolute;
  top: 11%;
  left: 19%;
}
.box3 {
  position: absolute;
  top: 11%;
  right: 21%;
}
.box4 {
  position: absolute;
  top: 35%;
  left: 8%;
}
.box5 {
  position: absolute;
  top: 35%;
  right: 11%;
}
.box6 {
  position: absolute;
  top: 60%;
  left: 13%;
}
.box7 {
  position: absolute;
  top: 60%;
  right: 14%;
}
.box8 {
  position: absolute;
  top: 79%;
  left: 30%;
}
.box9 {
  position: absolute;
  top: 79%;
  right: 31%;
}
</style>
