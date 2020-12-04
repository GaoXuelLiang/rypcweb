<!---->
<template>
  <div style="width: 100%;position: relative;" >
    <div style="display:flex;align-items: center;text-align: center;color:#fff;">
      <div style="flex:1;padding-left:5px" class="sale_img">
        <img src="../../../../../../static/largeScreen/sale.png" alt="">
        <div class="word">
          <span class="dot dot1"></span>
          <span class="mag">人均销售额（元）</span>
          <div style="color:#F5A71E" class="word_num">{{saleNum}}</div>
        </div>
      </div>
      <div style="flex:1" class="sale_img">
        <img src="../../../../../../static/largeScreen/profit.png" alt="">
        <div class="word">
          <span class="dot dot2"></span>
          <span class="mag">人均利润（元）</span>
          <div style="color:#F5A71E" class="word_num">{{profitNum}}</div>
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
        resMoney: '',
        rankoutwidth: 0,
        performanceType: '',
        saleNum: '',
        profitNum: '',
      }
    },
    methods: {
      getData(selectCompid, periodType, period) {
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
        data.order = 'desc'
        data.logType = '效能分析图二'
        data.selectCompid = selectCompid
        data.performanceType ='0'
        data.periodType = periodType
        data.period = period
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t) && res.data.content[0]) {
            if (JSON.stringify(res.data.content[0]) === '{}') {
              t.saleNum = ''
            } else {
              let data1 = res.data.content[0]
              t.saleNum = data1.perCapitaAmount
            }
          }
            if (isSuccess(res, t) && res.data.content[0]) {
              t.resMoney = res.data.content[0].perCapitaAmount || ''
            }
        }).catch(err => {
          console.log(err)
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
        data.order = 'desc'
        data.logType = '效能分析图二'
        data.selectCompid = selectCompid
        data.performanceType ='1'
        data.periodType = periodType
        data.period = period
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t) && res.data.content[0]) {
            if (JSON.stringify(res.data.content[0]) === '{}') {
              t.profitNum = ''
            } else {
              let data1 = res.data.content[0]
              t.profitNum = data1.perCapitaAmount
            }
          }
            if (isSuccess(res, t) && res.data.content[0]) {
              t.resMoney = res.data.content[0].perCapitaAmount || ''
            }
        }).catch(err => {
          console.log(err)
        })
      },

    },
  }
</script>
<style lang='scss' scoped>
.p-tit{
  color: rgba(128,175,248,1);
  background: linear-gradient(90deg,rgba(13,33,83,1),rgba(8,15,26,1));
  width: 44%;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  text-align: left;
  display: inline-block;
}
.dot1 {
  background:linear-gradient(90deg,rgba(241,102,71,1),rgba(241,147,46,1));
}
.dot2 {
  background:linear-gradient(90deg,rgba(67,161,241,1),rgba(42,254,217,1));
}
.word {
  // height: 20px;
  line-height: 20px;
  margin-top: 10px;
  font-size: 12px;
  .dot {
    width: 8px;
    height: 8px;
    display: inline-block;
    vertical-align: middle;
  }
}
.word_num {
  font-size: 1.25rem
}
.sale_img {
  img {
    width: 30%;
  }
}
  .mag {
    margin-left: 0;
  }
@media screen and (min-width:1400px) {
  .mag {
    margin-left: 10px;
  }
  .word {
    font-size: 14px !important;
  }
}
</style>

