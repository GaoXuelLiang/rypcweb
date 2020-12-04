<!---->
<template>
  <div style="width: 100%;height: 73%;">
    <div id="authorized1" ref="echartPie1" style="width: 100%;height: 95%;"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'
  export default {
    data() {
      return {
        data: {},
        cmutKntypeDesc: [],
        cmutKntypeName: [],
        cmutKntypeNameNumSubString: [],
        Object: [],
        dataAll: {}
      }
    },
    computed: {
      selectComid() {
        return this.$store.state.pubBoardSave.selectComid
      },
    },
    methods: {
      getData(period, periodType) {
        const t = this
        const data = {}
        data._mt =  this.$global.mt+'AnsrptHumanCost.getHumanCostByUnit'
        data.funId = '1'
        data.logType = '人力成本'
        data.unitType = '01company'
        data.unitId = t.selectComid
        data.periodType = periodType
        data.period = period
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            let data1 = res.data.content[0]
            t.dataAll = res.data.content[0]
            let type = '1'
            let obj2 = {}
            let obj1 = {}
            let obj3 = {}
            let obj4 = {}
            let trptPlanauthNum = '' // 总人数
            let trptPlanauthText = '总成本' // 文字
            const data2 = []
            if (JSON.stringify(res.data.content[0]) === '{}') {
              this.getEchatsPies(data2, trptPlanauthNum, '', '1')
            } else {
              switch (type) { // 在编
                case '1' :
                  obj1['name'] = '工资' + '(' + data1.salary +  ')' + '\n' + data1.salaryProportion
                  obj1['value'] = parseInt(data1.salary)
                  obj2['name'] = '社保' + '(' + data1.socialSecuriyt +  ')' + '\n' + data1.socialSecuriytProportion
                  obj2['value'] = parseInt(data1.socialSecuriyt)
                  obj3['name'] = '公积金' + '(' + data1.providFund +  ')' + '\n' + data1.providFundProportion
                  obj3['value'] = parseInt(data1.providFund)
                  obj4['name'] = '福利' + '(' + data1.welfare +  ')' + '\n' + data1.welfareProportion
                  obj4['value'] = parseInt(data1.welfare)
                  trptPlanauthNum = data1.totalCount
                  data2.push(obj1)
                  data2.push(obj2)
                  data2.push(obj3)
                  data2.push(obj4)
                  this.getEchatsPies(data2, trptPlanauthNum, trptPlanauthText, '1')
                  break
              }
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getEchatsPies(data2, trptPlanauthNum, trptPlanauthText, num) {
        let echats2 = this.$echarts.init(document.getElementById('authorized1'))
        const echatsHeight = this.$refs.echartPie1.offsetHeight
        echats2.clear()
        echats2.setOption({
          tooltip: {
            trigger: 'item',
          },
          formatter: function (params, ticket, callback) {
            return params.name
          },
          color: ['#407FFF', '#E15D68', '#00CCCD', '#E7A63F'] ,
          legend: {
            orient: 'vertical',
            left: 'center',
          },
          graphic: [{ // 环形图中间添加文字
            type: 'text', // 通过不同top值可以设置上下显示
            left: 'center',
            top:  'middle',
            style: {
              text: trptPlanauthNum + '\n' + trptPlanauthText,
              textAlign: 'center',
              fill: '#3DF497', // 文字的颜色
              width: 30,
              height: 30,
              fontSize: echatsHeight > 200 ? 14 : 12,
              fontFamily: 'Microsoft YaHei',
            },
          }],
          series: [
            {
              type: 'pie',
              top: 'middle',
              radius: echatsHeight > 150 ? [40, 80] :  [30, 50],
              center: ['50%', '50%'],
              roseType: 'radius',
              data: data2,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(30, 144, 255，0.5)',
                },
              },
              label: {
                normal: {
                  show: true,
                  length: echatsHeight > 150 ? 3 : 1,
                },
              },
            },
          ],
        })
      },
    },
  }
</script>
<style lang="scss" scoped>


</style>
