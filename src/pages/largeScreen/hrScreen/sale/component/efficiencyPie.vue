<!---->
<template>
  <div class="eff">
    <div id="echats44" ref="echats44" style="width: 100%;height: 94%;"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../../../lib/util'
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
        dataNum2: {},
        resArr: [],
        performanceType: '',
        num2: [],
        num1: [],
      }
    },
    methods: {
      getData(selectCompid,  periodType, period) {
        const t = this
        const data = {}
        data._mt =  this.$global.mt+'AnsrptPerformance.getInstitutionalRadio'
        data.order = 'desc'
        data.logType = '效能分析图四'
        data.selectCompid = selectCompid
        data.performanceType = '0'
        data.periodType = periodType
        data.period = period
        t.companyName = []
        t.longName = []
        t.flowTotal = []
        t.flowDealCount = []
        t.dataNum = {}
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              t.resArr = res.data.content[0].value
              Value = deepCopy(t.resArr)
              t.$emit('getResArr', t.resArr)
              if (t.resArr.length > 5) {
                Value = Value.splice(0, 5)
              }
            }
            Value.forEach((item) => {
              this.companyName.push(item.unitsName.substring(0, 4))
              this.longName.push(item.unitsName)
              this.flowTotal.push(item.totalAmount)
              this.flowDealCount.push(item.finishAmount)
              if(item.totalAmount == 0){
                this.num2.push(0)
              }else {
                let num = item.finishAmount / item.totalAmount
                if(num == 0){
                  this.num2.push(0)
                }else {
                  this.num2.push(Math.floor(num * 100) / 100)
                }
              }
            })
            t.dataNum.companyName = this.companyName
            t.dataNum.longName = this.longName
            t.dataNum.flowTotal = this.flowTotal
            t.dataNum.flowDealCount = this.flowDealCount
            t.dataNum.scale = this.num2
            // this.getEchatsColumnNum(t.dataNum)
            this.getData2(selectCompid,  periodType, period,t.dataNum)

          }
        }).catch(err => {
          console.log(err)
        })
      },
      getData2(selectCompid,  periodType, period,dataNum) {
        const t = this
        const data = {}
        data._mt =  this.$global.mt+'AnsrptPerformance.getInstitutionalRadio'
        data.order = 'desc'
        data.logType = '效能分析图四'
        data.selectCompid = selectCompid
        data.performanceType = '1'
        data.periodType = periodType
        data.period = period
        t.companyName = []
        t.longName = []
        t.flowTotal = []
        t.flowDealCount = []
        t.dataNum = {}
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              t.resArr = res.data.content[0].value
              Value = deepCopy(t.resArr)
              t.$emit('getResArr', t.resArr)
              if (t.resArr.length > 5) {
                Value = Value.splice(0, 5)
              }
            }
            Value.forEach((item) => {
              this.companyName.push(item.unitsName.substring(0, 4))
              this.longName.push(item.unitsName)
              this.flowTotal.push(item.totalAmount)
              this.flowDealCount.push(item.finishAmount)
              if(item.totalAmount == 0){
                this.num1.push(0)
              }else {
                let num = item.finishAmount / item.totalAmount
                if(num == 0){
                  this.num1.push(0)
                }else {
                  this.num1.push(Math.floor(num * 100) / 100)
                }
              }
            })
            t.dataNum2.companyName = this.companyName
            t.dataNum2.longName = this.longName
            t.dataNum2.flowTotal = this.flowTotal
            t.dataNum2.flowDealCount = this.flowDealCount
            t.dataNum2.scale = this.num1
            this.getEchatsColumnNum(dataNum,t.dataNum2)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getEchatsColumnNum(data,data2) {
        let echats44 = this.$echarts.init(document.getElementById('echats44'))
        const echatsHeight = this.$refs.echats44.offsetHeight
        echats44.setOption({
          title: {
            textStyle: {
              color: '#436EEE',
              fontSize: 14,
            },
          },
          legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: 'horizontal',
            type: 'plain',
            x: 'center',
            y: 'top',
            data: [
              {
                name: '机构销售比',
                icon: 'diamond'
              },
              {
                name: '机构利润比',
                icon:'diamond'
              }
            ],
            textStyle: {
              color: '#fff',
              fontSize: echatsHeight > 220 ? 14 : 12,
            }
          },
          tooltip: {
            trigger: 'axis',
            position: ['50%', '50%']
            // formatter: function (params, ticket, callback) {
            //   return data.longName[params.dataIndex] + '<br/>' + params.seriesName +  ':' + params.value
            // },
          },
          grid: {
            top: echatsHeight > 220 ? '30%': '10%',   // 等价于 y: '16%'
            left: '10%',
            right: '10%',
            bottom: '0',
            containLabel: true,
          },
          xAxis: {
            data: data.companyName,
            splitLine: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              rotate: 40,
              textStyle:{
                color:'#CAEDF5',  //坐标的字体颜色
              },
            },
          },
          yAxis: {
            type: 'value',
            //   min: 0, // 设置y轴刻度的最小值
            //            max: 80000,  // 设置y轴刻度的最大值
            //            splitNumber:2,  // 设置y轴刻度间隔个数
            splitLine: {
              show: false,
            },
            axisLabel: {
              textStyle:{
                color:'#CAEDF5',  //坐标的字体颜色
              },
            },
            // splitArea: { show: true },
          },
          series: [
            {
              name: '机构销售比',
              type: 'bar',
              data: data.scale,
              stack: '销售额',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#B13AFF' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#02BBC7' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                },
              },
            },
            {
              name: '机构利润比',
              type: 'bar',
              data: data2.scale,
              stack: '利润',
              barWidth: '40%',
              itemStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#E15D68' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#407FFF' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                },
              },
            },
          ],
        })
      },
    },
  }

</script>
<style lang='scss' scoped>
  .p-tit{
    color: rgba(128,175,248,1);
    background: linear-gradient(90deg,rgba(13,33,83,1),rgba(8,15,26,1));
    width: 44%;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    text-align: left;
    display: inline-block;
  }
  .eff {
    margin-top:-10px;
    width: 100%;
    height:25%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (min-width:1400px) {
    .eff {
      margin-top: 0;
    }
  }
</style>

