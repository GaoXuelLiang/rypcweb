<template>
  <i-col class="col" span="8" style="padding-bottom: 10px">
    <card :bordered="false">
      <p slot="title" class="title">
        <span class="title-tip"></span>
        <span style="margin-left: 5px;">{{$t('lang_homePage.Personnel.title')}}</span>
      </p>
      <div class="block" :class="height">
        <div class="fast_block">
          <div class="fast_item" v-for="(item, index) in entryFlowList" @click="openFun1(item.title , item.id , item.funCode, item.funAction)">
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
        entryFlowList: [
          // {
          //   title: '员工入职流程',
          //   imgUrl: 'flow_0.png',
          // },
          {
            title: this.$t('lang_homePage.Personnel.self'),
            imgUrl: 'flow_1.png',
            funAction: 'commonFlowList',
            funCode: '999120',
            id: '1756',
          },
          {
            title: this.$t('lang_homePage.Personnel.information'),
            imgUrl: 'flow_2.png',
            funAction: 'commonFlowList',
            funCode: '999130',
            id: '1757',
          },
          {
            title: this.$t('lang_homePage.Personnel.Renewal'),
            imgUrl: 'flow_3.png',
            funAction: 'commonFlowList',
            funCode: '999140',
            id: '1758',
          },
          {
            title: this.$t('lang_homePage.Personnel.resignation'),
            imgUrl: 'flow_4.png',
            funAction: 'commonFlowList',
            funCode: '999150',
            id: '1759',
          },
        ],
        img: 'recr-img-120.png',
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
.title{
  display:flex;
  justify-content: start;
  align-items: center;
}
</style>
