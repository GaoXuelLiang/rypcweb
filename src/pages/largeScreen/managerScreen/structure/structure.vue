<template>
  <div class="str_bg">
    <div class="content color-white">
      <div class="cname"><span>性别分析</span></div>
      <sexPic ref="sexPic" :echartsData="echartsData"></sexPic>
    </div>
    <div class="content color-white">
      <div class="cname"><span>学历分析</span></div>
      <rankCircle ref="rankCircle"></rankCircle>
    </div>
    <div class="content color-white">
      <div class="cname"><span>经验分析</span></div>
      <barEcharts2  ref="barEcharts2"></barEcharts2>
    </div>
    <div class="content color-white">
      <div class="cname"><span>年龄分析</span></div>
      <barEcharts3  ref="barEcharts3"></barEcharts3>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../../lib/util'
  import sexPic from './sexPic'
  import rankCircle from './rankCircle'
  import barEcharts2 from './barEcharts2'
  import barEcharts3 from './barEcharts3'

  export default{
    name: 'structure',
    data() {
      return {
        echartsData: {}, //性别分析数据初始化
        dataEdu: [], //学历分析数据初始化
        dataExP: {}, //经验分析数据初始化
        dataAge: {},  //年龄分析数据初始化
      }
    },
    components: {
      rankCircle,
      barEcharts2,
      barEcharts3,
      sexPic
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
      }
    },
    mounted() {
    },
    computed: {
      deptId() {
        return this.$store.state.pubBoardSave.selectDept
      },
    },
    methods: {
      getData() {
        const t = this
        t.getDataSex()
        t.getDataEdu()
        t.getDataExP()
        t.getDataAge()
      },
      getDataSex() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptStructure.getEmpsexDept',
          logType: '性别分析',
        }
        if (!t.deptId) {
          return
        }
        data.deptId = t.deptId // 公司ID
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              t.echartsData = JSON.parse(res.data.content[0].value)[0]
              // obj1['name'] = '男(' + echartsData.trptProportion1 + ')'
              // obj1['value'] = echartsData.trptMale
              // obj2['name'] = '女(' + echartsData.trptProportion2 + ')'
              // obj2['value'] = echartsData.trptFemale
            }

          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getDataEdu() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptStructure.getEmpeduDept',
          logType: '学历分析'
        }
        if(!t.deptId){
          return
        }
        data.deptId = t.deptId // 公司ID
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let dataName = []
              let Value = JSON.parse(res.data.content[0].value)
              Value.forEach((item) => {
                if (item.trptDoctor) {
                  let Obj = {}
                  Obj["name"] = '博士'
                  Obj["value"] = item.trptDoctor
                  Obj["column"] = item.trptProportion1
                  dataName.push(Obj)
                }
                if (item.trptMaster) {
                  let Obj = {}
                  Obj["name"] = '硕士'
                  Obj["value"] = item.trptMaster
                  Obj["column"] = item.trptProportion2
                  dataName.push(Obj)
                }
                if (item.trptRegcolleage) {
                  let Obj = {}
                  Obj["name"] = '本科'
                  Obj["value"] = item.trptRegcolleage
                  Obj["column"] = item.trptProportion3
                  dataName.push(Obj)
                }
                if (item.trptSpecialty) {
                  let Obj = {}
                  Obj["name"] = '专科'
                  Obj["value"] = item.trptSpecialty
                  Obj["column"] = item.trptProportion4
                  dataName.push(Obj)
                }
                if (item.trptHighsch) {
                  let Obj = {}
                  Obj["name"] = '高中及以下'
                  Obj["value"] = item.trptHighsch
                  Obj["column"] = item.trptProportion5
                  dataName.push(Obj)
                }
              })
              t.dataEdu = dataName
              t.$refs.rankCircle.getEcharts(t.dataEdu)
            } else {
              let dataName = []
              t.dataEdu = []
              t.$refs.rankCircle.getEcharts(t.dataEdu)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getDataExP() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptStructure.getWorkexperienceDept',
          logType: '经验分析'
        }
        if(!t.deptId){
          return
        }
        data.deptId = t.deptId // 公司ID
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let echartsData = JSON.parse(res.data.content[0].value)
              let dataName = []
              let dataValue = []
              echartsData.forEach((item) => {
                let Obj = {}
                Obj["name"] = item.trptStagename
                Obj["value"] = item.trptAmount
                dataName.push(Obj["name"])
                dataValue.push(Obj["value"])
              })
              t.dataExP.name = dataName
              t.dataExP.value = dataValue
              t.$refs.barEcharts2.getEcharts(t.dataExP, 'exp')
            } else {
              let dataName = []
              let dataValue = []
              t.dataExP = {}
              t.$refs.barEcharts2.getEcharts(t.dataExP, 'exp')
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getDataAge() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptStructure.getEmpageDept',
          logType: '年龄分析',
        }
        if(!t.deptId){
          return
        }
        data.deptId = t.deptId // 公司ID
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let echartsData = JSON.parse(res.data.content[0].value)
              let dataName = []
              let dataValue = []
              echartsData.forEach((item) => {
                let Obj = {}
                Obj["name"] = item.trptStagename + '岁'
                Obj["value"] = item.trptAmount
                dataName.push(Obj["name"])
                dataValue.push(Obj["value"])
              })
              t.dataAge.name = dataName
              t.dataAge.value = dataValue
              t.$refs.barEcharts3.getEcharts(t.dataAge,'age')
            } else {
              let dataName = []
              let dataValue = []
              t.dataAge = {}
              t.$refs.barEcharts3.getEcharts(t.dataAge,'age')
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },

    },
  }

</script>
<style lang="scss" scoped>

.color-white {
  color:rgba(254,254,254,1);
}
@media screen and (max-width:1366px) {
  .cname {
    span {
      font-size: 12px !important;
      display: inline-block;
      width: 70px !important;
      height: 30px !important;
      line-height: 30px !important;
    }
  }
}

.str_bg {
  width: 100%;
  height: 64%;
  background: url('../../../../../static/largeScreen/str_border.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  padding: 1%;
  overflow: hidden;
  margin-bottom: 3.5%;
}
.content {
  width: 49%;
  height: 50%;
  display: inline-block;
  overflow: hidden;
  .cname {
    text-align: center;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      background: url('../../../../../static/largeScreen/tit2.png') no-repeat;
      background-size: 100% 100%;
      background-position: 100% 100%;
      font-size: 14px;
      display: inline-block;
      width: 120px;
      height: 35px;
      line-height: 35px;
    }
  }
}

</style>
