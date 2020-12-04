<!--环形图-->
<template>
  <div style="width: 100%;height:80%">
    <div id="circleEcharts" ref="circleEcharts" style="width: 100%;height: 95%;"></div>
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
    getEcharts(data) {
      let echats = this.$echarts.init(document.getElementById('circleEcharts'))
      const echatsHeight = this.$refs.circleEcharts.offsetHeight
      echats.clear()
      echats.setOption({
        tooltip: {
          trigger: 'item',
          position: 'top',
        },
        formatter: function (params, ticket, callback) {
          return params.name + ':' + params.data.column
        },
        color:['#EAB54A','#A55BF7','#407FFF','#E15D68','#00CCCD'],
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        // graphic: [{ // 环形图中间添加文字
        //   type: 'text', // 通过不同top值可以设置上下显示
        //   style: {
        //     // text: trptPlanauthNum + '\n' + trptPlanauthText,
        //     textAlign: 'center',
        //     fill: 'black', // 文字的颜色
        //     width: 30,
        //     height: 30,
        //     fontSize: echatsHeight > 200 ? 14 : 12,
        //     fontFamily: 'Microsoft YaHei',
        //   },
        // }],
        series: [
          {
            type: 'pie',
            // radius: ['35%', '45%'], //环形图
            radius: echatsHeight > 170 ? '55%' : '45%', //饼图
            center: ['50%', '50%'],
            data: data,
            label: {
              normal: {
                textStyle: {
                  fontSize: 12,
                  color: '#fff'
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 3,
                // length2: 2,
                // lineStyle: {
                //     color: '#235894'
                // }
              },
            },
          },
        ],
      })
    },
  },
}
</script>
