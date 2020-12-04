<!--结构分析-->
<template>
    <i-col class="col"
           span="8"
           style="height: 360px">
        <card :bordered="false"
              style="height: 100%">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span style="margin-left: 5px;">{{$t('lang_homePage.Employee.title')}}</span>
            </p>
            <div class="structure">
                <div class="structure_tit">
                    <div class="tit1">
                        <span :class='{color_active:showColor ==1}'
                              @click="getStr(1)">{{$t('lang_homePage.Employee.Gender')}}</span>
                        <span :class='{color_active:showColor ==2}'
                              @click="getStr(2)">{{$t('lang_homePage.Employee.Compilation')}}</span>
                        <span :class='{color_active:showColor ==8}'
                              @click="getStr(8)">{{$t('lang_homePage.Employee.Age')}}</span>
                        <span :class='{color_active:showColor ==4}'
                              @click="getStr(4)">{{$t('lang_homePage.Employee.Education')}}</span>
                    </div>
                    <!--          <div class="tit1">-->
                    <!--            <span :class='{color_active:showColor ==5}' @click="getStr(5)">经验分析</span>-->
                    <!--            <span :class='{color_active:showColor ==6}' @click="getStr(6)">标签分析</span>-->
                    <!--            <span :class='{color_active:showColor ==7}' @click="getStr(7)">职务簇</span>-->
                    <!--          </div>-->
                    <div class="label_more"
                         @click="getDataLabelMore"
                         v-show="showLabelMore">更多>></div>
                </div>
                <div style="height:255px">
                    <!-- 饼状图 -->
                    <pieEcharts v-show="showColor == 1 || showColor == 4 || showColor == 2 || showColor == 8"
                                ref="pieEcharts"></pieEcharts>
                    <!-- 立体饼状图 -->
                    <circleEcharts v-show="showColor == 3"
                                   ref="circleEcharts"></circleEcharts>
                    <!-- 柱状图 -->
                    <barEcharts v-show="showColor == 5 || showColor == 6 || showColor == 7"
                                ref="barEcharts"></barEcharts>
                </div>
                <labelData ref="labelData"
                           v-if="isLabelData"
                           @closeLabel="closeLabel"></labelData>
            </div>
        </card>
    </i-col>
</template>
<script>
import { getDataLevelUserLoginData } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'
import labelData from './labelData.vue'
import circleEcharts from './component/circleEcharts'
import pieEcharts from './component/pieEcharts'
import barEcharts from './component/barEcharts'
export default {
    data () {
        return {
            showColor: 1, // 点击颜色初始化
            dataAge: {},  //年龄分析数据初始化
            dataTitle: [], //职称分析数据初始化
            dataEdu: [], //学历分析数据初始化
            dataExP: {}, //经验分析数据初始化
            dataLabel: {}, //标签分析数据初始化
            showLabelMore: false, //标签分析更多初始化
            isLabelData: false, //更多弹窗初始化
            compId: '',
        }
    },
    watch: {
        selectComid () {
            this.showColor = 1
        },
        showColor () {
            this.showLabelMore = false
        }
    },
    computed: {
        selectComid () {
            // return this.$store.state.pubBoardSave.selectComid
            return '1000'
        },
    },
    components: {
        labelData,
        circleEcharts,
        pieEcharts,
        barEcharts,
    },
    mounted () {
        // this.getData('sexAnal','性别分析')
    },
    methods: {
        getData (type, name) {
            const t = this;
            const data = {
                _mt: this.$global.mt + 'AnsrptEmpAnal.getAnal',
                APlogType: name,
                APanalType: type,
            }
            // t.compId = t.selectComid
            // data.compId = t.selectComid // 公司ID
            // if (!t.compId) {
            //   return
            // }
            for (const dat in data) {
                if (data[dat] === '') {
                    delete data[dat]
                }
            }

            getDataLevelUserLoginData(data).then(res => {
                if (isSuccess(res, t)) {
                    let echartsData = res.data.content[0]
                    let data1 = [];

                    /**
                     * 性别
                     */
                    if (type == 'sexAnal') {
                        let obj1 = {};
                        let obj2 = {};
                        obj1['name'] = '男(' + echartsData.empsaManrate + ')';
                        obj1['value'] = echartsData.empsaMannum;
                        obj2['name'] = '女(' + echartsData.empsaWomanrate + ')';
                        obj2['value'] = echartsData.empsaWomannum;
                        data1.push(obj1);
                        data1.push(obj2);
                        t.$nextTick(() => {
                            t.$refs.pieEcharts.getEcharts(data1, 'sex')
                        })
                    }

                    /**
                     * 编制
                     */
                    if (type == 'stafftypeAnal') {
                        let obj1 = {};
                        let obj2 = {};
                        let obj3 = {};
                        let obj4 = {};
                        let obj5 = {};
                        obj1['name'] = '占编(' + echartsData.empsaoccupyRate + ')';
                        obj1['value'] = echartsData.empsaoccupyNum;
                        obj2['name'] = '近三届管培生(' + echartsData.empsatraineeRate + ')';
                        obj2['value'] = echartsData.empsatraineeNum;
                        obj3['name'] = '司机(' + echartsData.empsadriverRate + ')';
                        obj3['value'] = echartsData.empsadriverNum;
                        obj4['name'] = '项目销售/渠道岗人数(' + echartsData.empsasalorRate + ')';
                        obj4['value'] = echartsData.empsasalorNum;
                        obj5['name'] = '其他不占编(' + echartsData.empsanotoccRate + ')';
                        obj5['value'] = echartsData.empsanotoccNum;
                        data1.push(obj1);
                        data1.push(obj2);
                        data1.push(obj3);
                        data1.push(obj4);
                        data1.push(obj5);
                        t.$nextTick(() => {
                            t.$refs.pieEcharts.getEcharts(data1, 'sex')
                        })
                    }

                    /**
                     * 司龄
                     */
                    if (type == 'compageAnal') {
                        let obj1 = {};
                        let obj2 = {};
                        let obj3 = {};
                        let obj4 = {};
                        let obj5 = {};
                        obj1['name'] = '<1年(' + echartsData.empcaCompagerate1 + ')';
                        obj1['value'] = echartsData.empcaCompagenum1;
                        obj2['name'] = '1年≤Y<3年(' + echartsData.empcaCompagerate2 + ')';
                        obj2['value'] = echartsData.empcaCompagenum2;
                        obj3['name'] = '3年≤Y<5年(' + echartsData.empcaCompagerate3 + ')';
                        obj3['value'] = echartsData.empcaCompagenum3;
                        obj4['name'] = '5年≤Y<10年(' + echartsData.empcaCompagerate4 + ')';
                        obj4['value'] = echartsData.empcaCompagenum4;
                        obj5['name'] = 'Y≥10年(' + echartsData.empcaCompagerate5 + ')';
                        obj5['value'] = echartsData.empcaCompagenum5;
                        data1.push(obj1);
                        data1.push(obj2);
                        data1.push(obj3);
                        data1.push(obj4);
                        data1.push(obj5);
                        t.$nextTick(() => {
                            t.$refs.pieEcharts.getEcharts(data1, 'sex')
                        })
                    }

                    /**
                     * 学历
                     */
                    if (type == 'eduAnal') {
                        let obj1 = {};
                        let obj2 = {};
                        let obj3 = {};
                        let obj4 = {};
                        obj1['name'] = '中专/高中及以下(' + echartsData.empeaHighunderrate + ')';
                        obj1['value'] = echartsData.empeaHighundernum;
                        obj2['name'] = '大专(' + echartsData.empeaCollegerate + ')';
                        obj2['value'] = echartsData.empeaCollegenum;
                        obj3['name'] = '本科(' + echartsData.empeaAbachelorate + ')';
                        obj3['value'] = echartsData.empeaAbachelornum;
                        obj4['name'] = '硕士及以上(' + echartsData.empeaMasteaboverate + ')';
                        obj4['value'] = echartsData.empeaMasterabovenum;
                        data1.push(obj1);
                        data1.push(obj2);
                        data1.push(obj3);
                        data1.push(obj4);
                        t.$nextTick(() => {
                            t.$refs.pieEcharts.getEcharts(data1, 'sex')
                        })
                    }
                }
            })
        },
        getStr (num) {
            return
            const t = this;
            t.showColor = num;
            t.$refs.barEcharts.name = num;
            if (num === 1) {
                t.getData('sexAnal', '性别分析');
            } else if (num === 2) {
                t.getData('stafftypeAnal', '编制分析');
            } else if (num === 8) {
                t.getData('compageAnal', '司龄分析');
            } else if (num === 4) {
                t.getData('eduAnal', '学历分析');
            }
        },
        // getData() {
        //   const t = this
        //   const data = {
        //     _mt:  this.$global.mt+'AnsrptStructure.getEmpsex',
        //     logType: '性别分析',
        //   }
        //   t.compId = t.selectComid
        //   data.compId = t.selectComid // 公司ID
        //   if (!t.compId) {
        //     return
        //   }
        //   getDataLevelUserLogin(data).then((res) => {
        //     if (isSuccess(res, t)) {
        //       if (res.data.content[0].hasOwnProperty('value')) {
        //         let echartsData = JSON.parse(res.data.content[0].value)[0]
        //         console.log(echartsData)
        //         let obj1 = {}
        //         let obj2 = {}
        //         let data1 = []
        //         obj1['name'] = '男(' + echartsData.trptProportion1 + ')'
        //         obj1['value'] = echartsData.trptMale
        //         obj2['name'] = '女(' + echartsData.trptProportion2 + ')'
        //         obj2['value'] = echartsData.trptFemale
        //         data1.push(obj1)
        //         data1.push(obj2)
        //         t.$nextTick(() => {
        //           t.$refs.pieEcharts.getEcharts(data1,'sex')
        //         })
        //       }else {
        //         let data1 = []
        //         t.$nextTick(() => {
        //           t.$refs.pieEcharts.getEcharts(data1,'sex')
        //         })
        //       }
        //     }
        //   }).catch((err) => {
        //     console.log('HR管理看板2_6')
        //     this.$Modal.error({
        //       title: this.$t('reminder.err'),
        //       content: this.$t('reminder.errormessage'),
        //     })
        //   })
        // },
        getDataAge () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'AnsrptStructure.getEmpage',
            }
            if (!t.compId) {
                return
            }
            data.APcompId = t.compId // 公司ID
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let echartsData = JSON.parse(res.data.content[0].value)
                        let dataName = []
                        let dataValue = []
                        echartsData.forEach((item) => {
                            let Obj = {}
                            Obj["name"] = item.trptStagename + '岁'
                            Obj["value"] = item.trptAmount
                            dataName.push(Obj["name"])
                            dataValue.push(Obj["value"])
                        })
                        t.dataAge.name = dataName
                        t.dataAge.value = dataValue
                        t.$refs.barEcharts.getEcharts(t.dataAge, 'age')
                    } else {
                        let dataName = []
                        let dataValue = []
                        t.dataAge = {}
                        t.$refs.barEcharts.getEcharts(t.dataAge, 'age')
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getDataTitle () {
            const t = this
            const data = {
                _mt: 'ansrptStructure.getPosttitle',
            }
            if (!t.compId) {
                return
            }
            data.APcompId = t.compId // 公司ID
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let dataName = []
                        let Value = JSON.parse(res.data.content[0].value)
                        Value.forEach((item) => {
                            if (item.trptChief) {
                                let Obj = {}
                                Obj["name"] = '总工职称'
                                Obj["value"] = item.trptChief
                                Obj["column"] = item.trptProportion1
                                dataName.push(Obj)
                            }
                            if (item.trptAdvanced) {
                                let Obj = {}
                                Obj["name"] = '高级职称'
                                Obj["value"] = item.trptAdvanced
                                Obj["column"] = item.trptProportion2
                                dataName.push(Obj)
                            }
                            if (item.trptMiddle) {
                                let Obj = {}
                                Obj["name"] = '中级职称'
                                Obj["value"] = item.trptMiddle
                                Obj["column"] = item.trptProportion3
                                dataName.push(Obj)
                            }
                            if (item.trptLow) {
                                let Obj = {}
                                Obj["name"] = '低级职称'
                                Obj["value"] = item.trptLow
                                Obj["column"] = item.trptProportion4
                                dataName.push(Obj)
                            }
                            if (item.trptCommon) {
                                let Obj = {}
                                Obj["name"] = '员级职称'
                                Obj["value"] = item.trptCommon
                                Obj["column"] = item.trptProportion5
                                dataName.push(Obj)
                            }
                        })
                        t.dataTitle = dataName
                        t.$refs.circleEcharts.getEcharts(t.dataTitle)
                    } else {
                        let dataName = []
                        t.dataTitle = []
                        t.$refs.circleEcharts.getEcharts(t.dataTitle)
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getDataEdu () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'AnsrptStructure.getEmpedu',
            }
            if (!t.compId) {
                return
            }
            data.APcompId = t.compId // 公司ID
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let dataName = []
                        let Value = JSON.parse(res.data.content[0].value)
                        Value.forEach((item) => {
                            if (item.trptDoctor) {
                                let Obj = {}
                                Obj["name"] = '博士'
                                Obj["value"] = item.trptDoctor
                                Obj["column"] = item.trptProportion1
                                dataName.push(Obj)
                            }
                            if (item.trptMaster) {
                                let Obj = {}
                                Obj["name"] = '硕士'
                                Obj["value"] = item.trptMaster
                                Obj["column"] = item.trptProportion2
                                dataName.push(Obj)
                            }
                            if (item.trptRegcolleage) {
                                let Obj = {}
                                Obj["name"] = '本科'
                                Obj["value"] = item.trptRegcolleage
                                Obj["column"] = item.trptProportion3
                                dataName.push(Obj)
                            }
                            if (item.trptSpecialty) {
                                let Obj = {}
                                Obj["name"] = '专科'
                                Obj["value"] = item.trptSpecialty
                                Obj["column"] = item.trptProportion4
                                dataName.push(Obj)
                            }
                            if (item.trptHighsch) {
                                let Obj = {}
                                Obj["name"] = '高中及以下'
                                Obj["value"] = item.trptHighsch
                                Obj["column"] = item.trptProportion5
                                dataName.push(Obj)
                            }
                        })
                        t.dataEdu = dataName
                        t.$refs.pieEcharts.getEcharts(t.dataEdu, 'edu')
                    } else {
                        let dataName = []
                        t.dataEdu = []
                        t.$refs.pieEcharts.getEcharts(t.dataEdu, 'edu')
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getDataExP () {
            const t = this
            const data = {
                _mt: 'ansrptStructure.getWorkexperience',
            }
            if (!t.compId) {
                return
            }
            data.APcompId = t.compId // 公司ID
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let echartsData = JSON.parse(res.data.content[0].value)
                        let dataName = []
                        let dataValue = []
                        echartsData.forEach((item) => {
                            let Obj = {}
                            Obj["name"] = item.trptStagename
                            Obj["value"] = item.trptAmount
                            dataName.push(Obj["name"])
                            dataValue.push(Obj["value"])
                        })
                        t.dataExP.name = dataName
                        t.dataExP.value = dataValue
                        t.$refs.barEcharts.getEcharts(t.dataExP, 'exp')
                    } else {
                        let dataName = []
                        let dataValue = []
                        t.dataExP = {}
                        t.$refs.barEcharts.getEcharts(t.dataExP, 'exp')
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getDataLabel () {
            const t = this
            const data = {
                _mt: 'ansrptStructure.getEmplabel',
            }
            if (!t.compId) {
                return
            }
            data.APcompId = t.compId // 公司ID
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let echartsData = JSON.parse(res.data.content[0].value)
                        if (echartsData.length > 7) {
                            t.showLabelMore = true
                            echartsData = echartsData.slice(0, 7)
                        }
                        let dataName = []
                        let dataValue = []
                        echartsData.forEach((item) => {
                            let Obj = {}
                            Obj["name"] = item.trptLabelname
                            Obj["value"] = item.trptLabelheadcount
                            dataName.push(Obj["name"])
                            dataValue.push(Obj["value"])
                        })
                        t.dataLabel.name = dataName
                        t.dataLabel.value = dataValue
                        t.$refs.barEcharts.getEcharts(t.dataLabel, 'label')
                    } else {
                        let dataName = []
                        let dataValue = []
                        t.dataLabel = {}
                        t.$refs.barEcharts.getEcharts(t.dataLabel, 'label')
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getDataEight () {
            const t = this
            const data = {
                _mt: this.$global.mt + 'AnsrptStructure.getEmpage',
            }
            if (!t.compId) {
                return
            }
            data.APcompId = t.compId // 公司ID
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let echartsData = JSON.parse(res.data.content[0].value)
                        console.log(echartsData)
                        if (echartsData.length > 7) {
                            t.showLabelMore = true
                            echartsData = echartsData.slice(0, 7)
                        }
                        let dataName = []
                        let dataValue = []
                        echartsData.forEach((item) => {
                            let Obj = {}
                            Obj["name"] = item.trptPostseqDis.slice(0, 4)
                            Obj["value"] = item.trptHeadcount
                            dataName.push(Obj["name"])
                            dataValue.push(Obj["value"])
                        })
                        console.log(dataName, 'dataName')
                        t.dataLabel.name = dataName
                        t.dataLabel.value = dataValue
                        t.$refs.barEcharts.getEcharts(t.dataLabel, 'dept')
                    } else {
                        let dataName = []
                        let dataValue = []
                        t.dataLabel = {}
                        t.$refs.barEcharts.getEcharts(t.dataLabel, 'dept')
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        getDataSeven () {
            const t = this
            const data = {
                _mt: 'ansrptStructure.getPostcluster',
            }
            if (!t.compId) {
                return
            }
            data.APcompId = t.compId // 公司ID
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (res.data.content[0].hasOwnProperty('value')) {
                        let echartsData = JSON.parse(res.data.content[0].value)
                        if (echartsData.length > 7) {
                            t.showLabelMore = true
                            echartsData = echartsData.slice(0, 7)
                        }
                        let dataName = []
                        let dataValue = []
                        echartsData.forEach((item) => {
                            let Obj = {}
                            Obj["name"] = item.trptClusterDis
                            Obj["value"] = item.trptHeadcount
                            dataName.push(Obj["name"])
                            dataValue.push(Obj["value"])
                        })
                        t.dataLabel.name = dataName
                        t.dataLabel.value = dataValue
                        t.$refs.barEcharts.getEcharts(t.dataLabel, 'cluster')
                    } else {
                        let dataName = []
                        let dataValue = []
                        t.dataLabel = {}
                        t.$refs.barEcharts.getEcharts(t.dataLabel, 'cluster')
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        /**更多弹窗 */
        getDataLabelMore () {
            this.isLabelData = true
            this.$nextTick(() => {
                this.$refs.labelData.getMoreData(this.compId)
            })
        },
        closeLabel () {
            this.isLabelData = false
        },
        // getStr(type) {
        //   if (type === 1) {
        //     this.showColor = 1
        //     this.getData(this.compId)
        //   } else if (type === 2) {
        //     this.showColor = 2
        //     this.getDataAge()
        //     this.$refs.barEcharts.name = type
        //   } else if (type === 3) {
        //     this.showColor = 3
        //     this.getDataTitle()
        //     this.$refs.pieEcharts.name = type
        //   } else if (type === 4) {
        //     this.showColor = 4
        //     this.getDataEdu()
        //     this.$refs.pieEcharts.name = type
        //   } else if (type === 5) {
        //     this.showColor = 5
        //     this.getDataExP()
        //     this.$refs.barEcharts.name = type
        //   } else if (type === 6) {
        //     this.showColor = 6
        //     this.getDataLabel()
        //     this.$refs.barEcharts.name = type
        //   } else if (type === 7) {
        //     this.showColor = 7
        //     this.getDataSeven()
        //     this.$refs.barEcharts.name = type
        //   } else if (type === 8) {
        //     this.showColor = 8
        //     this.getDataEight()
        //     this.$refs.barEcharts.name = type
        //   }
        // }
    },
}
</script>
<style lang="scss" scoped>
.col {
    padding-right: 0;
}
.structure {
    width: 100%;
    .structure_tit {
        .tit1 {
            font-size: 12px;
            display: flex;
            span {
                flex: 1;
                height: 30%;
                text-align: center;
                border: 1px solid #3989d7;
                border-radius: 3px;
                margin: 1% 2%;
                cursor: pointer;
            }
            .color_active {
                color: #fff;
                background-color: #3989d7;
            }
        }
    }
    .label_more {
        position: absolute;
        right: 15px;
        color: #3989d7;
        cursor: pointer;
        z-index: 10;
        bottom: 0;
    }
}
.title {
    display: flex;
    justify-content: start;
    align-items: center;
}
</style>
