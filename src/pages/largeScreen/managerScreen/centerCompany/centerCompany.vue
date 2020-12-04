<template>
  <div class="com_bg">
    <img class="earth"  src="../../../../../static/largeScreen/team_center.png" alt="">
    <div class="box box1">
      <div class="fon1">{{form.empNewhireCount}}</div>
      <div>本月入职</div>
      <p>（人）</p>
    </div>
    <div class="box box2">
      <div  class="fon1">{{form.empProCount}}</div>
      <div>本月转正</div>
      <p>（人）</p>
    </div>
    <div class="box box3">
      <div  class="fon1">{{form.empExtCount}}</div>
      <div>本月续签</div>
      <p>（人）</p>
    </div>
    <div class="box box4">
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
    <div class="box box8">
      <div class="fon1">{{form2.overtimeNums}}</div>
      <div>当日加班</div>
      <p>（人）</p>
    </div>
    <div class="box box9">
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
      selectDept() {
        return this.$store.state.pubBoardSave.selectDept
      },
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptEmpChg.rtnEveryStateEmp',
          logType: '入离调转',
          selectCompid: t.selectDept,
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
          unitId: t.selectDept,
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
  @media screen and (max-width:1366px){
    .earth{
      width: 65% !important;
    }
  }
.com_bg {
  width: 100%;
  height: 100%;
  background: url('../../../../../static/largeScreen/com_border.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
// @-webkit-keyframes rotation1 {
//   from {
//     -webkit-transform: rotate(0deg);
//   }
//   to {
//     -webkit-transform: rotate(-360deg);
//   }
// }
// .cl2,.cl4 {
//   -webkit-transform: rotate(360deg);
//   animation: rotation1 13s linear infinite;
//   -moz-animation: rotation1 13s linear infinite;
//   -webkit-animation: rotation1 13s linear infinite;
//   -o-animation: rotation1 13s linear infinite;
// }
.cl1{
  -webkit-transform: rotate(360deg);
  animation: rotation 13s linear infinite;
  -moz-animation: rotation 13s linear infinite;
  -webkit-animation: rotation 13s linear infinite;
  -o-animation: rotation 13s linear infinite;
}
.earth {
  width: auto;
  height: auto;
  // position: absolute;
  // top: 9%;
  // left: 17%;
  z-index: 99;
}
.cl {
  position: absolute;
}
.cl1 {
  width: 34%;
  height: auto;
  top: 27%;
  left: 32%;
}
.cl2 {
  width: 46%;
  height: auto;
  // top: 20%;
  left: 26%;
}
.cl3 {
  width: 60%;
  height: auto;
  // top: 12%;
  left: 19%;
}
.cl4 {
  width: 64%;
  height: auto;
  // top: 10%;
  left: 17%;
}
.cl5 {
  width: 68%;
  height: auto;
  // top: 7%;
  left: 15%;
}
.box {
  width: 16%;
  height: 19%;
  padding: 20px 0;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: url('../../../../../static/largeScreen/team_number.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  z-index: 99;
}
.box1 {
  position: absolute;
  top: 1%;
  left: 41.5%;
}
.box2 {
  position: absolute;
  top: 11%;
  left: 17%;
}
.box3 {
  position: absolute;
  top: 11%;
  right: 17%;
}
.box4 {
  position: absolute;
  top: 35%;
  left: 8%;
}
.box5 {
  position: absolute;
  top: 35%;
  right: 8%;
}
.box6 {
  position: absolute;
  top: 60%;
  left: 11%;
}
.box7 {
  position: absolute;
  top: 61%;
  right: 13%;
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
