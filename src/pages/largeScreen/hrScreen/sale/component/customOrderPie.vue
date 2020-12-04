<!---->
<template>
  <div style="width: 100%;height:25%;position: relative;display: flex;align-items: center;justify-content: center;">
    <!-- <p class='p-tit'>人均{{{0: '销售', 1: '利润'}[performanceType]}}趋势图</p> -->
    <div id="effTwo" ref="echartPie1" style="width: 100%;height: 92%;"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../../axios/axios'
  import { isSuccess } from '../../../../../lib/util'
  export default {
    name: 'responsibleTask',
    data() {
      return {
        data: {},
        cmutKntypeDesc: [],
        cmutKntypeName: [],
        cmutKntypeNameNumSubString: [],
        Object: [],
        performanceType: '',
        dataX: [],
        dataY: [],
        dataY2: [],

      }
    },
    methods: {
      getData(selectCompid,  periodType, period) {
        const t = this
        const data = {}
        data._mt =  this.$global.mt+'AnsrptPerformance.getPerCapitaTrend'
        data.logType = '效能分析图三'
        data.selectCompid = selectCompid
        data.performanceType = '0'
        data.periodType = periodType
        data.period = period
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let data1 = res.data.content[0].value
              let dataX = []
              let dataY = []
              data1.forEach((item, index) => {
                dataX.push(item.period)
                dataY.push(item.perCapitaAmount)
              })
              this.getData2(selectCompid, periodType, period, dataY)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getData2(selectCompid, periodType, period, dataY) {
        const t = this
        const data = {}
        data._mt =  this.$global.mt+'AnsrptPerformance.getPerCapitaTrend'
        data.logType = '效能分析图三'
        data.selectCompid = selectCompid
        data.performanceType = '1'
        data.periodType = periodType
        data.period = period
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let data1 = res.data.content[0].value
              let dataX = []
              data1.forEach((item, index) => {
                dataX.push(item.period)
               t.dataY2.push(item.perCapitaAmount)
              })
              this.getEchatsPies(dataX, dataY, t.dataY2)
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getEchatsPies(dataX, dataY, dataY2) {
        let echats2 = this.$echarts.init(document.getElementById('effTwo'))
        const echatsHeight = this.$refs.echartPie1.offsetHeight
        echats2.setOption({
          legend: {
            // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
            orient: 'horizontal',
            type: 'plain',
            // left: 20,
            // top: 0,
            x: 'center',
            y: 'top',
            data: [
              {
                name: '人均销售趋势',
                icon: 'diamond'
              },
              {
                name: '人均利润趋势',
                icon:'diamond'
              }
            ],
            textStyle: {
              color: '#fff',
              fontSize: echatsHeight > 160 ?  14 : 12,
            }
          },
          color: ['#105fcd', '#753bd6'],
          grid: {
            top: echatsHeight > 130 ? '30%': '20%',
            left: '10%',
            right: '10%',
            bottom: '0',
            containLabel: true,
          },
          // 提示框
          tooltip: {
            trigger: 'axis',
            position: ['50%', '50%']
          },
          xAxis: {
          //            name: '区间',
            type: 'category',
            // axisLine: {
            //   lineStyle: {
            //     color: '#5B6F93',
            //   },
            // },
            // 设置X轴数据旋转倾斜
            axisLabel: {
              rotate: 30,
              interval: 0,
              textStyle:{
                color:'#CAEDF5',  //坐标的字体颜色
              },
            },
            boundaryGap: false,
            data: dataX,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              textStyle:{
                color:'#fff',  //坐标的字体颜色
              },
            },
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              name: '人均销售趋势',
              data: dataY,
              type: 'line',
              // 设置小圆点消失
              // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
              symbol: 'none',
              // 设置折线弧度，取值：0-1之间
              smooth: 0.5,
              lineStyle: {
                color: "#02bbc7",
                width: 1
              },
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#0042c1'
                    }, {
                      offset: 1, color: 'rgba(0,0,0,0)'
                    }],
                    global: false
                  }
                }
              }
            },
            {
              name: '人均利润趋势',
              data: dataY2,
              type: 'line',
              symbol: 'none',
              smooth: 0.5,
              lineStyle: {
                color: "#5d85e2",
                width: 1
              },
              areaStyle: {
                normal: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#8336e6'
                    }, {
                      offset: 1, color: 'rgba(0,0,0,0)'
                    }],
                    global: false
                  }
                }
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
</style>

