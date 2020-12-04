<!--柱状图-->
<template>
  <div style="width: 100%;height:80%">
    <div id="barEcharts3" ref="barEcharts3" style="width: 100%;height: 95%;"></div>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
import { isSuccess } from '../../../../lib/util'
export default {
  data() {
    return {}
  },
  methods: {
    getEcharts(data,names) {
      let echats = this.$echarts.init(document.getElementById('barEcharts3'))
      echats.clear()
      echats.setOption({
        tooltip: {
          trigger: 'item',
          position: 'top',
        },
        formatter: function (params, ticket, callback) {
          return params.value + '人'
        },
        color: names === 'age' ? ['#449fe4'] : names === 'exp' ? ['#28C76F'] : names === 'dept' ? ['#d1a7f9'] : ['#90e0cf'],
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '0%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: [
          {
            type:  'category',
            data: data.name,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: 0,
              rotate: 40,
              textStyle:{
                color:'#fff',  //坐标的字体颜色
              },
            },
            axisLine: {
              lineStyle: {
                opacity: data.name ? 1 : 0,
              }
            }
          },
        ],
        yAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle:{
              color:'#fff',  //坐标的字体颜色
            },
          },
          axisLine: {
            lineStyle: {
              opacity: data.name ? 1 : 0,
            }
          }
        },
        series: [
          {
            name: '分析',
            type: 'bar',
            barWidth: '10',
            data: data.value,
            itemStyle: {
              normal: { 
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#A55BF7' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#00CCCD' // 100% 处的颜色
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
