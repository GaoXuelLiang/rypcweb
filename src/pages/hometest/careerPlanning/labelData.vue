<template>
    <div class="cover">
        <div class="box">
            <div class="title">
                <div class="title-text">
                    <Icon type="ios-bookmark"
                          size="16"></Icon>
                    &nbsp;标签分析
                </div>
                <Button type="text"
                        @click="handleReset">
                    <Icon type="md-close"
                          size="20"></Icon>
                </Button>
            </div>
            <div class="content">
                <div style="width: 100%;height:100%">
                    <div id="LabelEcharts"
                         ref="LabelEcharts"
                         style="width: 100%;height: 100%;background: white"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'
export default {
    data () {
        return {
            allLabelData: {}, //标签分析数据初始化
        }
    },
    mounted () {
    },
    methods: {
        getMoreData (id) {
            const t = this
            const data = {
                _mt: 'ansrptStructure.getEmplabel',
                APlogType: '标签分析'
            }
            data.APcompId = id // 公司ID
            getDataLevelUserLoginData(data).then((res) => {
                if (res.data.content[0].hasOwnProperty('value')) {
                    let echartsData = JSON.parse(res.data.content[0].value)
                    let dataName = []
                    let dataValue = []
                    echartsData.forEach((item) => {
                        let Obj = {}
                        Obj["name"] = item.trptLabelname
                        Obj["value"] = item.trptLabelheadcount
                        dataName.push(Obj["name"])
                        dataValue.push(Obj["value"])
                    })
                    t.allLabelData.name = dataName
                    t.allLabelData.value = dataValue
                    t.getEcharts(t.allLabelData)
                } else {
                    let dataName = []
                    let dataValue = []
                    t.allLabelData = {}
                    t.getEcharts(t.allLabelData)
                }
            })
        },
        handleReset () {
            this.$emit('closeLabel')
        },
        getEcharts (data) {
            let echats = this.$echarts.init(document.getElementById('LabelEcharts'))
            const echatsHeight = this.$refs.LabelEcharts.offsetHeight
            echats.clear()
            echats.setOption({
                tooltip: {
                    trigger: 'item',
                    position: 'top',
                },
                formatter: function (params, ticket, callback) {
                    return params.value + '人'
                },
                color: ['#F067B4'],
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                grid: {
                    top: '10%',
                    left: '0%',
                    right: '0%',
                    bottom: '5%',
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data.name,
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
                        type: 'value',
                    },
                ],
                series: [
                    {
                        name: '分析',
                        type: 'bar',
                        barWidth: '60%',
                        data: data.value,
                    },
                ],
            })
        },
    },
};
</script>
<style lang="scss" scoped>
.cover {
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
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .box {
        position: relative;
        width: 900px;
        background-color: #fff;
        padding: 60px 20px 30px 20px;
        border-radius: 10px;
        .title {
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
            .title-text {
                font-weight: bold;
                font-size: 14px;
            }
        }
        .content {
            height: 400px;
            max-height: 400px;
            overflow: auto;
        }
    }
}
</style>
