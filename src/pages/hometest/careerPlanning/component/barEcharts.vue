<!--柱状图-->
<template>
    <div style="width: 100%;height:100%">
        <div id="barEcharts"
             ref="barEcharts"
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
            let echats = this.$echarts.init(document.getElementById('barEcharts'))
            console.log(names, 'names')
            const echatsHeight = this.$refs.barEcharts.offsetHeight
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
                    top: '3%',
                    left: '3%',
                    right: '0%',
                    bottom: '5%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: names === 'exp' ? 'value' : 'category',
                        data: names === 'exp' ? '' : data.name,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: 40,
                        },
                    },
                ],
                yAxis: [
                    {
                        type: names === 'exp' ? 'category' : 'value',
                        data: names === 'exp' ? data.name : '',
                    },
                ],
                series: [
                    {
                        name: '分析',
                        type: 'bar',
                        barWidth: '20',
                        data: data.value,
                    },
                ],
            })
        },
    },
}
</script>
