<!--编制分析-->
<template>
  <div class="compile_bg">
    <div id="performanceTrends" ref="performanceTrends" style="width: 100%;height: 100%;"></div>
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
      }
    },
    mounted() {
    },
    computed: {
      selectComid() {
        return this.$store.state.pubBoardSave.selectDept
      },
    },
    methods: {
      getData() {
        const t = this
        const data = {}
        data._mt =  this.$global.mt+'TalrtpAuth.getByObject'
        data.funId = '1'
        data.order = 'desc'
        data.sort = 'trptTime'
        data.logType = '数量分析-编制分析'
        data.trptOrg = t.selectComid
        data.trptOrgtype = '70dept'
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t) && res.data.content[0] && res.data.content[0].value && res.data.content[0].value[0]) {
            let data1 = res.data.content[0].value[0]
            let type = res.data.content[0].value[0].trptType
            let obj2 = {}
            let obj1 = {}
            let trptPlanauthNum = '' // 总人数
            const trptPlanauthText = '总人数' // 文字
            const data2 = []
            if (JSON.stringify(res.data.content[0].value[0]) === '{}') {
              this.getEchatsPies(data2, trptPlanauthNum, '', '1')
            } else {
              switch (type) { // 在编
                case '1' :
                  obj1['name'] = '在编' + '(' + data1.trptCurauth +  ')' + '\n' + data1.trptCurproportion
                  obj1['value'] = parseInt(data1.trptCurauth)
                  obj2['name'] = '缺编'  + '(' + data1.trptLackauth +  ')' + '\n' + data1.trptLackproportion
                  obj2['value'] = data1.trptLackauth
                  trptPlanauthNum = data1.trptPlanauth
                  data2.push(obj1)
                  data2.push(obj2)
                  t.$nextTick(() => {
                    this.getEchatsPies(data2, trptPlanauthNum, trptPlanauthText, '1')
                  })
                  break
                case '2' :  // 满编
                  obj1['name'] = '满编' + '(' + data1.trptPlanauth +  ')' + '\n' + data1.trptCurproportion
                  obj1['value'] = parseInt(data1.trptPlanauth)
                  data2.push(obj1)
                  trptPlanauthNum = data1.trptPlanauth
                  t.$nextTick(() => {
                    this.getEchatsPies(data2, trptPlanauthNum, trptPlanauthText, '1')
                  })
                  break
                case '3' :  // 超编
                  obj1['name'] = '计划编制' + '(' + data1.trptPlanauth +  ')' + '\n' + data1.trptCurproportion
                  obj1['value'] = parseInt(data1.trptPlanauth)
                  obj2['name'] = '超编'  + '(' + data1.trptLackauth +  ')' + '\n' + data1.trptLackproportion
                  obj2['value'] = data1.trptLackauth
                  trptPlanauthNum = data1.trptCurauth
                  data2.push(obj1)
                  data2.push(obj2)
                  t.$nextTick(() => {
                    this.getEchatsPies(data2, trptPlanauthNum, trptPlanauthText, '2')
                  })
                  break
                case '4' :  // 缺编  黄色
                  obj1['name'] = '缺编' + '(' + data1.trptPlanauth +  ')' + '\n' + data1.trptCurproportion
                  obj1['value'] = parseInt(data1.trptPlanauth)
                  data2.push(obj1)
                  trptPlanauthNum = data1.trptPlanauth
                  t.$nextTick(() => {
                    this.getEchatsPies(data2, trptPlanauthNum, trptPlanauthText, '3')
                  })
                  break
              }
            }
          } else {
            this.getEchatsPies([], '', '')
          }
        }).catch((err) => {
          console.log('HR管理看板2_10')
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsPies(data2, trptPlanauthNum, trptPlanauthText, num) {
        let echats2 = this.$echarts.init(this.$refs.performanceTrends)
        const echatsHeight = this.$refs.performanceTrends.offsetHeight
        echats2.clear()
        echats2.setOption({
          tooltip: {
            trigger: 'item',
            position: 'top',
          },
          formatter: function (params, ticket, callback) {
            return params.name
          },
          color: num === '1' ? ['#42A75C', '#f7d85b'] : num === '2' ? ['#42A75C', '#ef818c'] : ['#f7d85b'],
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          graphic: [{ // 环形图中间添加文字
            type: 'text', // 通过不同top值可以设置上下显示
            left: 'center',
            top:  echatsHeight > 180 ? '50%' : '45%',
            style: {
              text: trptPlanauthNum + '\n' + trptPlanauthText,
              textAlign: 'center',
              fill: '#00CCCD', // 文字的颜色
              fontSize: echatsHeight > 200 ? 14 : 12,
              fontFamily: 'Microsoft YaHei',
            },
          }],
          series: [
            {
              type: 'pie',
              radius: echatsHeight > 180 ? [50, 70] :  [30, 40],
              center: ['50%', '55%'],
              data: data2,
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
<style lang="scss" scoped>
.compile_bg {
  display: inline-block;
  width: 100%;
  height: 25%;
  background: url('../../../../../static/largeScreen/team_border2.png') no-repeat;
  background-position: 100% 100%;
  background-size: 100% 100%;
  overflow: hidden;
  margin-bottom: 3.5%;
}
@media screen and (max-width:1366px){
  .compile_bg {
    height: 26% !important;
    margin-bottom: 3%;
  }

}
</style>
