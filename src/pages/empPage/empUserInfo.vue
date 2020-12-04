<template>
  <i-col class="col" span="24">
    <Card :bordered="false">
      <p slot="title" class="title">
        <span class="title-tip"></span>
        <span style="margin-left: 5px;">{{$t('lang_homePage.myMessage.title')}}</span>
      </p>
      <div class="block">
        <empUser-left style="flex: 3;"></empUser-left>
        <empUser-right style="flex: 1;"></empUser-right>
      </div>
    </Card>
  </i-col>
</template>
<script>
  import { isSuccess, deepCopy } from '../../lib/util'
  import { getDataLevelUserLogin } from '../../axios/axios'
  import empUserLeft from './empUserInfoChild/empUserLeft'
  import empUserRight from './empUserInfoChild/empUserRight'
export default{
  data() {
    return {
        data: [],
    }
  },
  components: {
    empUserLeft,
    empUserRight,
  },
  mounted() {
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
  .col{
    padding-right:0;
  }
  .block{
    font-size: 12px;
    /*height: 280px;*/
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    padding-bottom: 10px;
  .block_row{
    height: 36px;
    position: relative;
    cursor: pointer;
    transition: all .3s;
    line-height: 36px;
  .icon{
    line-height: 36px;
    position: absolute;
  }
  .div{
    padding-left: 20px;
    padding-right: 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  }
  /*.block_row:hover{*/
    /*color: #2d8cf0;*/
  /*}*/
  }
.title{
  display:flex;
  justify-content: start;
  align-items: center;
}
</style>
