<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;机构{{{0: '销售', 1: '利润'}[performanceType]}}比
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <div class="content">
        <div style="width: 90%;height:100%">
          <div id="LabelEcharts4More" ref="LabelEcharts4More" style="width: 100%;height: 100%;background: white"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../../axios/axios'
 import { isSuccess } from '../../../../../lib/util'
 export default {
   name: 'responsibleTask',
   data() {
     return {
       companyName: [],
       longName: [],
       flowTotal: [], // 流程总数量
       flowDealCount: [], // 处理中数量
       flowClosedCount: [], // 已完成数量
       dataNum: {},
       resArr: [],
       performanceType: '',
     }
   },
   methods: {
     handleReset() {
       this.$emit('closeLabel')
     },
     getData(selectCompid, performanceType, periodType, period) {
       const t = this
       t.performanceType = performanceType
       const data = {}
       data._mt =  this.$global.mt+'AnsrptPerformance.getInstitutionalRadio'
       data.funId = '1'
       data.order = 'desc'
       data.logType = '效能分析图四'
       data.selectCompid = selectCompid
       data.performanceType = performanceType
       data.periodType = periodType
       data.period = period
       t.companyName = []
       t.longName = []
       t.flowTotal = []
       t.flowDealCount = []
//        t.flowClosedCount = []
       t.dataNum = {}
       getDataLevelUserLogin(data).then((res) => {
         if (isSuccess(res, t)) {
           let Value = []
           if (res.data.content[0].value) {
             Value = res.data.content[0].value
           }
           Value.forEach((item) => {
             this.companyName.push(item.unitsName.substring(0, 4))
             this.longName.push(item.unitsName)
             this.flowTotal.push(item.totalAmount)
             this.flowDealCount.push(item.finishAmount)
//              this.flowClosedCount.push(item.flowClosedCount)
           })
           t.dataNum.companyName = this.companyName
           t.dataNum.longName = this.longName
           t.dataNum.flowTotal = this.flowTotal
           t.dataNum.flowDealCount = this.flowDealCount
//            t.dataNum.flowClosedCount = this.flowClosedCount
           this.getEchatsColumnNum(t.dataNum)
         }
       }).catch(err => {
         console.log(err)
       })
     },
     getEchatsColumnNum(data) {
       let LabelEcharts4More = this.$echarts.init(document.getElementById('LabelEcharts4More'))
       LabelEcharts4More.setOption({
         title: {
//            text: "知识分类统计",
           textStyle: {
             color: '#436EEE',
             fontSize: 17,
           },
         },
         tooltip: {
           trigger: 'item',
           formatter: function (params, ticket, callback) {
             return data.longName[params.dataIndex] + '<br/>' + params.seriesName +  ':' + params.value
           },
         },
         legend: {
           data: [
             '总数',
             '完成数',
//              this.$t('lang_operatmonitor.monitorBoard.legend5')
           ],
         },
         xAxis: {
           data: data.companyName,
           splitLine: {
             show: false,
           },
           axisLabel: {
             interval: 0,
             rotate: 40,
           },
         },
         yAxis: {
           splitLine: {
             show: false,
           },
           splitArea: { show: true },
         },
         series: [
           {
             name: '总数',
             type: 'bar',
             data: data.flowTotal,
             barWidth: '40%',
             itemStyle: {
               normal: { color: '#13c2c2' },
             },
           },
           {
             name: '已完成',
             type: 'bar',
             stack: '业务',
             data: data.flowDealCount,
             barWidth: '40%',
             itemStyle: {
               normal: { color: '#ff7676' },
             },
           },
//            {
//              name: this.$t('lang_operatmonitor.monitorBoard.legend5'),
//              type: 'bar',
//              stack: '业务',
//              data: data.flowClosedCount,
//              barWidth: '40%',
//              itemStyle: {
//                normal: { color: '#ffc36d' },
//              },
//            },
         ],
       })
     },
   },
 }

</script>
<style lang="scss" scoped>
  .cover{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box{
      position:relative;
      width: 900px;
      background-color: #fff;
      padding: 60px 20px 30px 20px;
      border-radius: 10px;
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;
        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
      .content{
        height: 400px;
        max-height: 400px;
        overflow:auto;
        display: flex;
        justify-content: center;

      }
    }
  }
</style>
