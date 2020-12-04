<!---->
<template>
  <div  style="width: 100%;height: 24%;position: relative;overflow:hidden">
    <div style="height: 72%;display:flex;align-items: center;text-align: center;justify-content: center;">
      <div id="efffour" ref="echartPie1" style="flex: 1;height: 100%;"></div>
      <div id="echartPie2" ref="echartPie2" style="flex: 1;height:100%;"></div>
    </div>
    <div style="height:25%;display:flex;align-items: center;color:#fff;justify-content: center;">
      <!-- <p style="flex:1">{{{0: '未完成', 1: '全额完成',  2: '超额完成'}[finishType]}}</p>
      <p style="flex:1">{{{0: '未完成', 1: '全额完成',  2: '超额完成'}[finishType2]}}</p> -->
      <div style="flex: 1;padding-left: 10%">
        <div class="tips">
          <span class="dot" style="background-color:#9265F2"></span>
          <span class="mag">已完成</span>
          <span class="color_word word_num">{{saleData1.finishPropor}}</span>
        </div>
        <div class="tips">
          <span class="dot" style="background-color:#00CCCD"></span>
          <span class="mag">未完成</span>
          <span class="color_word word_num">{{saleData1.unfinishPropor}}</span>
        </div>
      </div>
      <div style="flex: 1" class="mags">
        <div class="tips">
          <span class="dot" style="background-color:#E15D68"></span>
          <span class="mag">已完成</span>
          <span class="color_word word_num">{{saleData2.finishPropor}}</span>
        </div>
        <div class="tips">
          <span class="dot" style="background-color:#407FFF"></span>
          <span class="mag">未完成</span>
          <span class="color_word word_num">{{saleData2.unfinishPropor}}</span>
        </div>
      </div>
    </div>
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
        finishPropor: '',
        performanceType: '',
        finishType: '',
        finishType2: '',
        saleData1:{},
        saleData2:{},
      }
    },
    mounted() {
    },
    methods: {
      getData(selectCompid,  periodType, period) {
        const t = this
        if (!selectCompid) {
          this.$Modal.warning({
            title: this.$t('reminder.err'),
            content: '请选择组织',
          })
          return
        }
        const data = {}
        data._mt =  this.$global.mt+'AnsrptPerformance.getEfficicalRate'
        data.funId = '1'
        data.order = 'desc'
        data.logType = '效能分析图一销售额'
        data.selectCompid = selectCompid
        data.performanceType = '0'
        data.periodType = periodType
        data.period = period
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t) && res.data.content[0]) {
            let data1 = res.data.content[0]
            t.saleData1 =  res.data.content[0]
            t.finishType = data1.finishType
            t.finishPropor = data1.finishPropor || ''
            let obj2 = {}
            let obj1 = {}
            const data2 = []
            if (JSON.stringify(res.data.content[0]) === '{}') {
              this.getEchatsPies(data2)
            } else {
              obj1['name'] = '已完成' + '\n' + data1.finishPropor + '\n' + '(' + data1.finishAmount +  ')'
              obj1['value'] = data1.finishAmount
              obj2['name'] = '未完成' + '\n'  + data1.unfinishPropor + '\n' + '(' + data1.unfinishAmount +  ')'
              obj2['value'] = data1.unfinishAmount
              data2.push(obj1)
              data2.push(obj2)
              this.getEchatsPies(data2,obj1['name'],obj2['name'])
            }
          } else {
            this.getEchatsPies([])
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getEchatsPies(data2,name1,name2) {
        let echats1 = this.$echarts.init(document.getElementById('efffour'))
        const echatsHeight = this.$refs.echartPie1.offsetHeight
        echats1.clear()
        echats1.setOption({
          tooltip: {
            trigger: 'item',
            position: ['50%', '50%']

          },
          formatter: function (params, ticket, callback) {
            return params.name
          },
          color: ['#9265F2', '#00CCCD'],
          // legend: {
          //   orient: 'vertical',
          //   right: '20',
          //   bottom: '30',
          //   data: [name1,name2],
          //   textStyle: {
          //     color: '#fff',
          //     fontSize: 14,
          //   }
          // },
          graphic: [{ // 环形图中间添加文字
            type: 'text', // 通过不同top值可以设置上下显示
            left: 'center',
            top:  'middle',
            style: {
              text: '销售额',
              textAlign: 'center',
              fill: '#37d387', // 文字的颜色
              width: 30,
              height: 30,
              fontSize: echatsHeight > 200 ? 14 : 12,
              fontFamily: 'Microsoft YaHei',
            },
          }],
          series: [
            {
              type: 'pie',
              radius:  ['50%', '70%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                    show: false,
                },
              },
              data: data2,
              labelLine: {
                normal: {
                  length: 2,
                },
              },
            },
          ],
        })
      },
      getData2(selectCompid, periodType, period) {
        const t = this
        if (!selectCompid) {
          this.$Modal.warning({
            title: this.$t('reminder.err'),
            content: '请选择组织',
          })
          return
        }
        const data = {}
        data._mt =  this.$global.mt+'AnsrptPerformance.getEfficicalRate'
        data.funId = '1'
        data.order = 'desc'
        data.logType = '效能分析图一利润'
        data.selectCompid = selectCompid
        data.performanceType = '1'
        data.periodType = periodType
        data.period = period
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t) && res.data.content[0]) {
            let data1 = res.data.content[0]
            t.saleData2 =  res.data.content[0]
            t.finishType2 = data1.finishType
            t.finishPropor = data1.finishPropor || ''
            let obj2 = {}
            let obj1 = {}
            const data2 = []
            if (JSON.stringify(res.data.content[0]) === '{}') {
              this.getEchatsPies2(data2)
            } else {
              // obj1['name'] = '已完成' + '\n' + data1.finishPropor + '\n' + '(' + data1.finishAmount +  ')'
              obj1['name'] = '已完成' + '\n' + data1.finishPropor
              obj1['value'] = data1.finishAmount
              // obj2['name'] = '未完成' + '\n'  + data1.unfinishPropor + '\n' + '(' + data1.unfinishAmount +  ')'
              obj2['name'] = '未完成' + '\n'  + data1.unfinishPropor
              obj2['value'] = data1.unfinishAmount
              data2.push(obj1)
              data2.push(obj2)
              this.getEchatsPies2(data2)
            }
          } else {
            this.getEchatsPies2([])
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getEchatsPies2(data2) {
        let echats2 = this.$echarts.init(document.getElementById('echartPie2'))
        const echatsHeight = this.$refs.echartPie2.offsetHeight
        echats2.clear()
        echats2.setOption({
          tooltip: {
            trigger: 'item',
            position: ['50%', '50%']
          },
          formatter: function (params, ticket, callback) {
            return params.name
          },
          color: ['#E15D68', '#407FFF'],
          graphic: [{ // 环形图中间添加文字
            type: 'text', // 通过不同top值可以设置上下显示
            left: 'center',
            top:  'middle',
            style: {
              text: '利润',
              textAlign: 'center',
              fill: '#37d387', // 文字的颜色
              width: 30,
              height: 30,
              fontSize: echatsHeight > 200 ? 14 : 12,
              fontFamily: 'Microsoft YaHei',
            },
          }],
          series: [
            {
              type: 'pie',
              radius:  ['50%', '70%'],
              center: ['50%', '50%'],
              label: {
                normal: {
                    show: false,
                },
              },
              data: data2,
              labelLine: {
                normal: {
                  length: 5,
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
  #efffour{
    // position: absolute;
    // bottom: 0;
  }
  .color_word {
    color: #F5A71E;
  }
  .word_num {
    font-size: 14px;
    vertical-align: middle
  }
  .p-tit{
    // position: absolute;
    // left: 0;
    // bottom: 2%;
    // font-size: 12px;
    color: rgba(128,175,248,1);
    background: linear-gradient(90deg,rgba(13,33,83,1),rgba(8,15,26,1));
    width: 44%;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    text-align: left;
    display: inline-block;
  }
  .tips {
    .dot {
      width: 8px;
      height: 8px;
      display: inline-block;
    }
    .mag {
      margin-left: 0;
      margin-right: 0;
    }
  }
  .mags {
    margin-left: 20px;
  }
@media screen and (min-width:1400px) {
  .tips {
    font-size: 14px;
    .mag {
      margin-left: 10px;
      margin-right: 15px;
    }
  }
  .word_num {
    font-size: 20px !important;
  }
  .mags {
    margin-left: 0 !important;
  }
}
</style>

