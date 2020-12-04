<!---->
<template>
    <div class="attend_bg"
         :style="isFullScreen ? 'height: 25%' : 'height: 24.5%'">
        <div class="time_inp">
            <Input class="inp"
                   v-model="period"
                   placeholder="周期"
                   icon="ios-search"
                   :readonly="true"
                   @on-click="pickYear2"></Input>
        </div>
        <div class="h80">
            <div id="checkOnWork"
                 ref="checkOnWork"
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
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
import { isSuccess } from '../../../../lib/util'
import SearchYear2 from '../../components/searchYear2'
export default {
    data () {
        return {
            data: {},
            cmutKntypeDesc: [],
            cmutKntypeName: [],
            cmutKntypeNameNumSubString: [],
            Object: [],
            startPeriod: '',
            endPeriod: '',
            showLabelMore: false,
            pubMoreShow: false,
            period: '',
            // 月
            openYear2: false,
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
            checkData: [],
            color0: ['#EA6D94', '#F8745F'],
            color1: ['#F18B32', '#ECC45F'],
            color2: ['#3488DB', '#44EFFF'],
            color3: ['#399D58', '#63CE6B'],
        }
    },
    components: {
        SearchYear2,
    },
    props: {
        isFullScreen: Boolean,
    },
    mounted () {
        let yearr = new Date().getFullYear() + ''   // 年
        let monthh = ((new Date().getMonth() + 1) + '').length === 1 ? '0' + (new Date().getMonth() + 1) : '' + (new Date().getMonth() + 1)
        this.period = yearr + monthh
    },
    computed: {
        selectComid () {
            return this.$store.state.pubBoardSave.selectComid
        },
    },
    methods: {
        getData () {
            const t = this
            const data = {}
            data._mt =  this.$global.mt+'AShiftRecordAnsrpt.getShiftMonthAnsrpt'
            data.funId = '1'
            data.logType = '考勤 - 公司'
            data.unitId = t.selectComid
            data.period = t.period
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        t.checkData = JSON.parse(res.data.content[0].value)
                        let dataX = []
                        let dataY = []
                        t.checkData.forEach((item, index) => {
                            dataX.push(item.shiftType)
                            dataY.push(item.shiftCount)
                            item.shiftCount = 50
                            // item.percent = Number((item.shiftCount/200)*100)
                        })
                        t.$nextTick(() => {
                            this.getEchatsPies(dataX, dataY)
                        });
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getEchatsPies (dataX, dataY) {
            let checkOnWork = this.$echarts.init(this.$refs.checkOnWork)
            window.addEventListener("resize", () => { checkOnWork.resize(); });
            checkOnWork.setOption({
                legend: {
                    // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                    orient: 'horizontal',
                    type: 'plain',
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '10%',
                    bottom: '3%',
                    containLabel: true,
                },
                // 提示框
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: [
                    {
                        type: 'value',
                        minInterval: 1,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#fff',  //坐标的字体颜色
                            },
                        },
                        splitLine: {
                            show: false
                        }
                    },
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: dataX,
                        axisLabel: {
                            textStyle: {
                                color: '#fff',  //坐标的字体颜色
                            },
                        },
                        splitLine: {
                            show: false
                        }
                    },
                ],
                series: [
                    {
                        name: '员工考勤',
                        type: 'bar',
                        barWidth: '15',
                        data: dataY,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#e15d68' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#407fff ' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            },
                        },
                    },
                ],
            })
        },
        closeStaff () {
            this.pubMoreShow = false
        },
        pickYear2 () {
            this.openYear2 = true
            this.$refs.searchYear2.getData(this.paramsYear2, '')
        },
        closeYear2 () {
            this.openYear2 = false
        },
        changeinputYear2 (name, id) {
            this.period = name.fypdPeriod
            this.getData()
        },
    },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1366px) {
    .time_inp {
        margin-bottom: 0px !important;
    }
    .h80 {
        height: 85%;
    }
    .attend_bg {
        height: 25.5% !important;
    }
}
.word_color {
    color: #fff;
}
.h80 {
    height: 80%;
}

.attend_bg {
    width: 100%;
    height: 24.5%;
    background: url("../../../../../static/largeScreen/attend_border.png")
        no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    overflow: hidden;
}
.time_inp {
    width: 100%;
    text-align: right;
    padding-right: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    .inp {
        width: 100px;
    }
}
.inner {
    height: 20%;
    color: #fff;
    padding: 0 2%;
    .name {
        width: 14%;
        margin-right: 1%;
        text-align: right;
        display: inline-block;
    }
}
.ivu-progress {
    width: 84%;
}

/deep/ .ivu-progress-inner {
    background-color: #0b1939 !important;
    border-radius: 0px !important;
}
/deep/ .ivu-progress-bg {
    border-radius: 0px !important;
}
</style>


