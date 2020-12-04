<!--饼状图-->
<template>
    <div style="width: 100%;height:100%">
        <div id="pieEcharts"
             ref="pieEcharts"
             style="width: 100%;height: 100%;background: white"></div>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
import { isSuccess } from '../../../../lib/util'
export default {
    data () {
        return {}
    },
    methods: {
        getEcharts (data, names) {
            //      let echats = this.$echarts.init(document.getElementById('pieEcharts'))
            let echats = this.$echarts.init(this.$refs.pieEcharts)
            const echatsHeight = this.$refs.pieEcharts.offsetHeight
            //      console.log(names,'names')
            echats.clear()
            echats.setOption({
                tooltip: {
                    trigger: 'item',
                    position: 'top',
                },
                formatter: function (params, ticket, callback) {
                    return names === 'sex' ? params.name + ':' + params.value + '人' : params.name + ':' + params.data.column
                },
                color: names === 'sex'
                    ? ['#a5daa2', '#e17ca4']
                    : ['#C32BAC', '#2376DD', '#F067B4', '#1904E5', '#00EAFF'],
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                graphic: [{ // 环形图中间添加文字
                    type: 'text', // 通过不同top值可以设置上下显示
                    style: {
                        // text: trptPlanauthNum + '\n' + trptPlanauthText,
                        textAlign: 'center',
                        fill: 'black', // 文字的颜色
                        width: 30,
                        height: 30,
                        fontSize: echatsHeight > 200 ? 14 : 12,
                        fontFamily: 'Microsoft YaHei',
                    },
                }],
                series: [
                    {
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(30, 144, 255，0.5)',
                            },
                        },
                        labelLine: {
                            normal: {
                                show: true,
                            },
                        },
                    },
                ],
            })
        },
    },
}
</script>
