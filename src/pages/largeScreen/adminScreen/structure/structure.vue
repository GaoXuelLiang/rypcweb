<template>
  <div class="str_bg">
    <div class="content color-white">
      <div class="cname"><span>职称分析</span></div>
      <rankCircle ref="rankCircle"></rankCircle>
    </div>
    <div class="content color-white">
      <div class="cname"><span>职务簇</span></div>
      <barEcharts2 v-show="dataSeven" ref="barEcharts2"></barEcharts2>
    </div>
    <div class="content color-white">
      <div class="cname"><span>岗位序列</span></div>
      <barEcharts1 v-show="dataJob" ref="barEcharts1"></barEcharts1>
    </div>
    <div class="content color-white">
      <div class="cname"><span>标签分析</span></div>
      <barEcharts3 v-show="dataLabel" ref="barEcharts3"></barEcharts3>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../../lib/util'
  import rankCircle from './rankCircle'
  import barEcharts1 from './barEcharts'
  import barEcharts2 from './barEcharts2'
  import barEcharts3 from './barEcharts3'

  export default{
    name: 'structure',
    data() {
      return {
        dataTitle: [], //职称分析数据初始化
        dataJob: {}, //岗位序列数据初始化
        dataSeven: {}, //职务簇分析数据初始化
        dataLabel: {}, //标签分析数据初始化
      }
    },
    components: {
      rankCircle,
      barEcharts1,
      barEcharts2,
      barEcharts3
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
      }
    },
    mounted() {
    },
    computed: {
      compId() {
        return this.$store.state.pubBoardSave.selectComid
      },
    },
    methods: {
      getData() {
        const t = this
        t.getDataTitle()
        t.getDataEight()
        t.getDataSeven()
        t.getDataLabel()
      },
      getDataTitle() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptStructure.getPosttitle',
          logType: '职称分析'
        }
        if(!t.compId){
          return
        }
        data.compId = t.compId // 公司ID
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let dataName = []
              let Value = JSON.parse(res.data.content[0].value)
              Value.forEach((item) => {
                if (item.trptChief) {
                  let Obj = {}
                  Obj["name"] = '总工职称'
                  Obj["value"] = item.trptChief
                  Obj["column"] = item.trptProportion1
                  dataName.push(Obj)
                }
                if (item.trptAdvanced) {
                  let Obj = {}
                  Obj["name"] = '高级职称'
                  Obj["value"] = item.trptAdvanced
                  Obj["column"] = item.trptProportion2
                  dataName.push(Obj)
                }
                if (item.trptMiddle) {
                  let Obj = {}
                  Obj["name"] = '中级职称'
                  Obj["value"] = item.trptMiddle
                  Obj["column"] = item.trptProportion3
                  dataName.push(Obj)
                }
                if (item.trptLow) {
                  let Obj = {}
                  Obj["name"] = '低级职称'
                  Obj["value"] = item.trptLow
                  Obj["column"] = item.trptProportion4
                  dataName.push(Obj)
                }
                if (item.trptCommon) {
                  let Obj = {}
                  Obj["name"] = '员级职称'
                  Obj["value"] = item.trptCommon
                  Obj["column"] = item.trptProportion5
                  dataName.push(Obj)
                }
              })
              t.dataTitle = dataName
              t.$refs.rankCircle.getEcharts(t.dataTitle)
            } else {
              let dataName = []
              t.dataTitle = []
              t.$refs.rankCircle.getEcharts(t.dataTitle)
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getDataEight() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptStructure.getPostmatch',
          logType: '岗位序列分析',
        }
        if (!t.compId) {
          return
        }
        data.compId = t.compId // 公司ID
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let echartsData = JSON.parse(res.data.content[0].value)
              if(echartsData.length > 7){
                t.showLabelMore = true
                echartsData = echartsData.slice(0,7)
              }
              let dataName = []
              let dataValue = []
              echartsData.forEach((item) => {
                let Obj = {}
                Obj["name"] = item.trptPostseqDis.slice(0,4)
                Obj["value"] = item.trptHeadcount
                dataName.push(Obj["name"])
                dataValue.push(Obj["value"])
              })
              t.dataJob.name = dataName
              t.dataJob.value = dataValue
              t.$refs.barEcharts1.getEcharts(t.dataJob, 'dept')
            } else {
              let dataName = []
              let dataValue = []
              t.dataJob = {}
              t.$refs.barEcharts1.getEcharts(t.dataJob, 'dept')
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getDataSeven() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptStructure.getPostcluster',
          logType: '职务簇分析'
        }
        if (!t.compId) {
          return
        }
        data.compId = t.compId // 公司ID
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let echartsData = JSON.parse(res.data.content[0].value)
              if(echartsData.length > 7){
                t.showLabelMore = true
                echartsData = echartsData.slice(0,7)
              }
              let dataName = []
              let dataValue = []
              echartsData.forEach((item) => {
                let Obj = {}
                Obj["name"] = item.trptClusterDis
                Obj["value"] = item.trptHeadcount
                dataName.push(Obj["name"])
                dataValue.push(Obj["value"])
              })
              t.dataSeven.name = dataName
              t.dataSeven.value = dataValue
              t.$refs.barEcharts2.getEcharts(t.dataSeven, 'cluster')
            } else {
              let dataName = []
              let dataValue = []
              t.dataSeven = {}
              t.$refs.barEcharts2.getEcharts(t.dataSeven, 'cluster')
            }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getDataLabel() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptStructure.getEmplabel',
          logType: '标签分析'
        }
        if(!t.compId){
          return
        }
        data.compId = t.compId // 公司ID
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let echartsData = JSON.parse(res.data.content[0].value)
              if(echartsData.length > 7){
                t.showLabelMore = true
                echartsData = echartsData.slice(0,7)
              }
              let dataName = []
              let dataValue = []
              echartsData.forEach((item) => {
                let Obj = {}
                Obj["name"] = item.trptLabelname
                Obj["value"] = item.trptLabelheadcount
                dataName.push(Obj["name"])
                dataValue.push(Obj["value"])
              })
              t.dataLabel.name = dataName
              t.dataLabel.value = dataValue
              t.$refs.barEcharts3.getEcharts(t.dataLabel, 'label')
            } else {
              let dataName = []
              let dataValue = []
              t.dataLabel = {}
              t.$refs.barEcharts3.getEcharts(t.dataLabel, 'label')
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
  .str_bg {
    margin-bottom: 2.5%;
  }
}

.str_bg {
  width: 100%;
  height: 64%;
  background: url('../../../../../static/largeScreen/str_border.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  margin-bottom: 3%;
  padding: 1%;
  overflow: hidden;
}
.content {
  width: 49%;
  height: 50%;
  display: inline-block;
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
