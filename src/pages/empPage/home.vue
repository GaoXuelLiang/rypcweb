<template>
  <div style="padding-bottom: 10px;">
    <Row class="emp_main" v-if="sysUseRoleGroup === 'essrgcandidate'">
      <img src="../../../static/empPage/emp_welcmBg.png" alt="">
<!--      <div class="emp_text">欢迎加入三盛集团，请点击左边菜单进入入职流程，点击提交资料进行提交！</div>-->
<!--      <div class="emp_wel"></div>-->
    </Row>
    <Row v-else>
      <emp-check></emp-check>
      <entry-flow></entry-flow>
      <emp-holiday></emp-holiday>
      <emp-userInfo></emp-userInfo>
    </Row>
  </div>
</template>
<script>
  import empUserInfo from './empUserInfo'
  import entryFlow from './entryFlow'
  import empHoliday from './empHoliday'
  import empCheck from './empCheck'
  export default {
    data() {
      return {
      }
    },
    components: {
      empUserInfo,
      entryFlow,
      empHoliday,
      empCheck,
    },
    computed: {
      roleType() {
        return this.$store.state.user.roleType
      },
      sysUseRoleGroup() {
        return this.$store.state.user.sysUseRoleGroup
      },
    },
  }
</script>
<style lang="scss" scoped>
  .col{
    padding: 0 10px 10px 0;
  }
  .emp_main{
    background: white;
    width: 100%;
    height: 560px;
    img{
      width: 100%;
      height: 100%;
    }
    .emp_wel{
      width: 650px;
      height: 400px;
      background-image: url('../../../static/empPage/emp_welcome.png');
      background-repeat: no-repeat;
      margin: auto;
      margin-top: 50px;
    }
    .emp_text{
      position: relative;
      left: 0;
      top: 0;
      color: #0089dd;
      padding: 10px;
      font-size: 16px;
    }
  }
</style>
