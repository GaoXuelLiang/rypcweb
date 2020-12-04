<!--排行榜-->
<template>
  <div class="rank_bg">
    <Row class="rank_tit color1">
      <Col span="8" style="text-align: left;"><span>排名</span></Col>
      <Col span="8" style="text-align: center;"><span>姓名</span></Col>
      <Col span="8" style="text-align: right;"><span>成绩</span></Col>
    </Row>
    <div class="rank_box" @mouseenter="enter()" @mouseleave="leave()">
      <Row class="rank_peo" style="width: 100%;" v-for="(item, index) in data" :key='index' :class="{anim:animate==true}" >
        <Col span="7" offset="1" style="text-align: left;">
          <span :class="item.num == 1 ? 'span1' : item.num == 2 ? 'span2' : item.num == 3 ? 'span3': 'span4' ">{{item.num}}</span>
        </Col>
        <Col span="8" style="text-align: center;"><span>{{item.evareIdDis}}</span></Col>
        <Col span="8" style="text-align: right;"><span class="span_pos">{{item.evareScore}}</span></Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'
  import autoSearchtable from '@/components/searchTableComponents/autoSearchtable'
  export default {
    data() {
      return {
        showModal: false,
        openHCompany: false,
        data: [],
        rankingName: '',
        total: '',
        searchHCClo: [
          {
            title: '姓名',
            key: 'evareIdDis',
          },
          {
            title: '分数',
            key: 'evareScore',
            sortable: 'custom',
          },
        ],
        paramsHCompany: {
          _mt:  this.$global.mt+'AnsrptEvaluationRecord.getPageByWhere',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          unitType: '01company',
          logType: '雇佣公司',
        },
        animate: false
      }
    },
    components: {
    },
    mounted() {
    },
    created(){
      this.timer1 = setInterval(this.scroll,1000)
    },
    computed: {
      selectComid() {
        return this.$store.state.pubBoardSave.selectComid
      },
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AnsrptEvaluationRecord.getPageByWhere',
          funId: t.funId,
          logType: t.$t('button.ser'),
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          unitType: '01company',
          unitId: t.selectComid,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].hasOwnProperty('value')) {
              let result = JSON.parse(res.data.content[0].value).rows
              t.total = JSON.parse(res.data.content[0].value).total
              t.data = result
              t.data.forEach((item,index)=> {
                item.num = index + 1
              })
              console.log(t.data)
            }
          }
        }).catch((err) => {
          console.log('HR管理看板2_4')
        })
      },
      scroll(){
        const t = this
        t.animate = true
        setTimeout(()=>{
          t.data.push(t.data[0])
          t.data.shift()
          t.animate = false
        },500)
      },
      enter(){
        clearInterval(this.timer1)
      },
      leave() {
        this.timer1= setInterval(this.scroll,1000)
      },
      pickData() {
        this.showModal = true
      },
      clear() {
        this.rankingName = ''
      },
      getDataLabelMore() {
        this.openHCompany = true
        this.$refs.rankgetPage.getData(this.paramsHCompany, this.selectComid)
      },
      closeHCompany() {
        this.openHCompany = false
      },
        /*
      弹出选择
      */
      closeModal() {
        this.showModal = false
      },
      changeinput1(row, type) {
        this.rankingName = row.empName
        this.getData(row.id)
      },
    },
  }
</script>
<style lang="scss" scoped>
@media screen and (max-width:1366px){
  .rank_tit {
    margin-bottom: 2% !important;
  }
  .rank_peo {
    margin-bottom: 2% !important;
  }
  .rank_bg {
    height: 28.5% !important;
  }
  .rank_bg {
    padding-bottom: 0 !important;
  }
}
.color1 {
  color: #B1ECFF;
}
.rank_box {
  height: calc(97% - 40px);
  width: 100%;
  overflow: hidden;

}
.anim{
  transition: all 0.5s;
}
.rank_bg {
  width: 100%;
  height: 27%;
  background: url('../../../../../static/largeScreen/rank_border.png') no-repeat ;
  background-position: 100% 100%;
  background-size: 100% 99%;
  padding: 2% 10%;
  overflow: hidden;
}
.rank_tit {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-bottom: 2.7%;
  span {
    display: inline-block;
    text-align: center;
    width: 60px;
    height: 27px;
    background: url('../../../../../static/largeScreen/ranking_name.png') no-repeat;
    background-size: 100% 100%;
    background-position: 100% 100%;
  }
}
.rank_peo {
  color: #B0DEFF;
  background:linear-gradient(90deg,rgba(8,15,26,1) 0%,rgba(14,37,59,1) 52%,rgba(8,15,26,1) 100%);
  width: 80%;
  margin-bottom: 3%;
  height: 20px;
  line-height: 20px;
  span {
    text-align: center;
  }
}
.span_pos {
  min-width: 70px;
  display: inline-block;
}
.span4 {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #349AE5;
  border-radius: 10px;
  margin-left: 2px;
}
.span1 {
  display: inline-block;
  width: 22px;
  height: 22px;
  line-height: 15px;
  background: url('../../../../../static/largeScreen/rank1.png') no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
}
.span2 {
  display: inline-block;
  width: 22px;
  height: 22px;
  line-height: 15px;
  background: url('../../../../../static/largeScreen/rank2.png') no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
}
.span3 {
  display: inline-block;
  width: 22px;
  height: 22px;
  line-height: 15px;
  background: url('../../../../../static/largeScreen/rank3.png') no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;

}


</style>
