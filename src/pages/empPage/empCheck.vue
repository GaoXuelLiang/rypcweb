<template>
  <i-col class="col" span="8" style="padding-bottom: 10px">
    <card :bordered="false">
      <p slot="title" class="title">
        <span class="title-tip"></span>
        <span style="margin-left: 5px;">{{$t('lang_homePage.attendanceData.title')}}</span>
      </p>
      <div class="block" :class="height">
        <div class="fast_block">
          <div class="fast_item" v-for="(item, index) in empCheckList" @click="openFun1(item.title , item.id , item.funCode, item.funAction)">
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
        empCheckList: [
          {
            title: this.$t('lang_homePage.attendanceData.clock'),
            imgUrl: 'flow_10.png',
            funAction: 'stafAttendanceRecord',
            funCode: '9300100',
            id: '1768',
          },
          {
            title: this.$t('lang_homePage.attendanceData.replacement'),
            imgUrl: 'flow_11.png',
            funAction: 'commonFlowList',
            funCode: '9300200',
            id: '1769',
          },
          {
            title: '',
            imgUrl: '',
          },
          {
            title: '',
            imgUrl: '',
          },
          {
            title: '',
            imgUrl: '',
          },
          {
            title: '',
            imgUrl: '',
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
  .title{
  display:flex;
  justify-content: start;
  align-items: center;
}
</style>
