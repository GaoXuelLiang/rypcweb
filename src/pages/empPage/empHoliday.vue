<template>
  <i-col class="col" span="8" style="padding-bottom: 10px">
    <card :bordered="false">
      <p slot="title" class="title">
        <span class="title-tip"></span>
        <span style="margin-left: 5px;">{{$t('lang_homePage.Holiday.title')}}</span>
      </p>
      <div class="block" :class="height">
        <div class="fast_block">
          <div class="fast_item" v-for="(item, index) in empHolidayList" @click="openFun1(item.title , item.id , item.funCode, item.funAction)">
            <div class="item_admin" :style="'background-image: url(../../../static/empPage/' + item.imgUrl + ')'"></div>
            <div class="item_title" :title="item.title">
              {{item.title}}
            </div>
          </div>
        </div>
      </div>
    </card>
  </i-col>
</template>
<script>
  export default{
    data() {
      return {
        height: 'height',
        empHolidayList: [
          {
            title: this.$t('lang_homePage.Holiday.Leave'),
            imgUrl: 'flow_5.png',
            funAction: 'commonFlowList',
            funCode: '9200100',
            id: '1762',
          },
          {
            title: this.$t('lang_homePage.Holiday.business'),
            imgUrl: 'flow_6.png',
            funAction: 'commonFlowList',
            funCode: '9200300',
            id: '1763',
          },
          {
            title: this.$t('lang_homePage.Holiday.cancellation'),
            imgUrl: 'flow_7.png',
            funAction: 'commonFlowList',
            funCode: '9200200',
            id: '1764',
          },
          {
            title: this.$t('lang_homePage.Holiday.trip'),
            imgUrl: 'flow_8.png',
            funAction: 'commonFlowList',
            funCode: '9200400',
            id: '1765',
          },
          {
            title: this.$t('lang_homePage.Holiday.revoke'),
            imgUrl: 'flow_9.png',
            funAction: 'commonFlowList',
            funCode: '9200500',
            id: '1766',
          },
        ],
      }
    },
    components: {
    },
    methods: {
      openFun1(name, id, code, funAction) {
        const t = this
        const tag = {
          title: name,
          path: '/' + funAction,
          name: funAction,
          query: { id: id, code: code },
        }
        this.$store.commit('increateTag', tag)
        t.$router.push({ path: funAction, query: {
            id: id,
            code: code,
          }})
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
 @import './css/flowPublic';
 .col{
  padding-right:0;
 }
 .title{
  display:flex;
  justify-content: start;
  align-items: center;
}
</style>
