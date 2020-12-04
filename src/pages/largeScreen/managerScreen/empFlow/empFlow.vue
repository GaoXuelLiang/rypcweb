<template>
    <div class="flow_bg">
        <Row class="flow_top">
            <span>开始时间：</span>
            <Input v-model="startPeriod"
                   style="width: 100px;"
                   placeholder="周期"
                   icon="ios-search"
                   :readonly="true"
                   @on-click="pickYear2"></Input>
            <span>结束时间：</span>
            <Input v-model="endPeriod"
                   style="width: 100px;"
                   placeholder="周期"
                   icon="ios-search"
                   :readonly="true"
                   @on-click="pickYear3"></Input>
        </Row>
        <div style="width: 100%;height:80%">
            <div id="staffFlow"
                 ref="staffFlow"
                 style="width: 100%;height: 95%;"></div>
        </div>
        <transition name="fade">
            <searchYear2 v-show="openYear2"
                         :searchCloumns="searchCloumnsYear2"
                         :params="paramsYear2"
                         @closeUpA="closeYear2"
                         @changeinput="changeinputYear2"
                         ref="searchYear2"></searchYear2>
        </transition>
        <transition name="fade">
            <searchYear3 v-show="openYear3"
                         :searchCloumns="searchCloumnsYear2"
                         :params="paramsYear2"
                         @closeUpA="closeYear3"
                         @changeinput="changeinputYear3"
                         ref="searchYear3"></searchYear3>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
import { isSuccess } from '../../../../lib/util'
import SearchYear2 from '../../components/searchYear2'
import SearchYear3 from '../../components/searchYear2'
export default {
    data () {
        return {
            allLabelData: {}, // 标签分析数据初始化
            // 月
            openYear2: false,
            openYear3: false,
            // 点击给考核模板弹窗传参调接口
            paramsYear2: {
                _mt:  this.$global.mt+'PlatFyperiod.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
            // 双击弹窗名称和key值
            searchCloumnsYear2: [
                {
                    title: '月度',
                    key: 'fypdPeriod',
                },
            ],
            startPeriod: '',
            endPeriod: '',
            page: 1,
            selectCompid: '',
        }
    },
    mounted () {
    },
    computed: {
        selectComid () {
            return this.$store.state.pubBoardSave.selectDept
        },
    },
    methods: {
        getData (startPeriod, endPeriod) {
            const t = this
            if (!t.selectComid) {
                return
            }
            const data = {}
            data._mt =  this.$global.mt+'AnsrptEmpDimrate.getDimrate'
            data.funId = '1'
            data.logType = '员工流动率 - 公司'
            data.selectCompid = t.selectComid
            data.startPeriod = startPeriod
            data.endPeriod = endPeriod
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let data1 = res.data.content[0].value
                        let dataX = []
                        let dataY = []
                        data1.forEach((item, index) => {
                            dataX.push(item.empPeriod)
                            dataY.push(item.empDimCount)
                        })
                        this.getEchatsPies(dataX, dataY)
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        },
        getEchatsPies (dataX, dataY) {
            let echats2 = this.$echarts.init(document.getElementById('staffFlow'))
            echats2.setOption({
                legend: {
                    // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                    orient: 'horizontal',
                    type: 'plain',
                    right: 30,
                    top: 0,
                    // data: ['绩效分析'],
                },
                color: ['#489BDF'],
                grid: {
                    top: '20%',
                    left: '10%',
                    right: '10%',
                    bottom: 0,
                    containLabel: true,
                },
                // 提示框
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    // axisLine: {
                    //   lineStyle: {
                    //     color: '#fff',
                    //   },
                    // },
                    // 设置X轴数据旋转倾斜
                    axisLabel: {
                        rotate: 30,
                        interval: 0,
                        textStyle: {
                            color: '#fff',  //坐标的字体颜色
                        },
                    },
                    boundaryGap: false,
                    data: dataX,
                },

                yAxis: {
                    type: 'value',
                    minInterval: 1,
                    //            min: 0,
                    //            max: 1000,
                    //            splitNumber: 6,
                    splitLine: {
                        show: false,
                    },
                    // axisLine: {
                    //   lineStyle: {
                    //     color: '#fff',
                    //   },
                    // },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',  //坐标的字体颜色
                        },
                    },
                },
                series: [
                    {
                        name: '员工流动率',
                        data: dataY,
                        type: 'line',
                        // 设置小圆点消失
                        // 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
                        symbol: 'none',
                        // 设置折线弧度，取值：0-1之间
                        smooth: 0.5,
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#34A8DA'
                                    }, {
                                        offset: 1, color: 'rgba(0,0,0,0)'
                                    }],
                                    global: false
                                }
                            }
                        }
                    },
                ],
            })
        },
        handleReset () {
            this.$emit('closeStaff')
            this.startPeriod = ''
            this.endPeriod = ''
        },
        // 选择月
        closeYear2 () {
            this.openYear2 = false
        },
        changeinputYear2 (name, id) {
            const t = this
            this.startPeriod = name.fypdPeriod
            let Number = t.endPeriod - t.startPeriod
            if (t.endPeriod !== '') {
                if (Number < 0) {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: '结束日期不能小于开始日期',
                    })
                    return
                }
                if (Number < 100 && Number > 0) {
                    t.getData(t.selectCompid, t.startPeriod, t.endPeriod)
                } else {
                    t.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: '选择的日期不能大于十二个月',
                    })
                }
            }
        },
        pickYear2 () {
            this.$refs.searchYear2.getData(this.paramsYear2, this.page)
            this.openYear2 = true
        },

        // 选择月
        closeYear3 () {
            this.openYear3 = false
        },
        changeinputYear3 (name, id) {
            const t = this
            this.endPeriod = name.fypdPeriod
            let Number = t.endPeriod - t.startPeriod
            if (t.startPeriod === '') {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '请选择开始时间',
                })
                return
            }
            if (Number < 0) {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '结束日期不能小于开始日期',
                })
                return
            }
            if (Number < 100 && Number > 0) {
                t.getData(t.startPeriod, t.endPeriod)
            } else {
                t.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: '选择的日期不能大于十二个月',
                })
            }
        },
        pickYear3 () {
            this.$refs.searchYear3.getData(this.paramsYear2, this.page)
            this.openYear3 = true
        },
    },
    components: {
        SearchYear2,
        SearchYear3,
    },
}
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1366px) {
    .flow_bg {
        height: 28% !important;
    }
}
.flow_bg {
    width: 100%;
    height: 26%;
    background: url("../../../../../static/largeScreen/rank_border.png")
        no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    overflow: hidden;
}
.flow_top {
    width: 100%;
    color: #e6e6e6;
    text-align: right;
    padding-top: 10px;
    padding-right: 10px;
    span {
        margin: 0 5px;
    }
}
</style>
