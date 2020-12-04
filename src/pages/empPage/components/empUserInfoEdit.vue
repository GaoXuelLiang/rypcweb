<template>
  <div class="cover">
    <div class="box" style="padding-top: 50px">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row>
        <Spin fix v-if="isShowSpin" size="large"></Spin>
        <Row class="row" v-if="logType === '任职信息'">
          <emp-user-info2 :empUserInfoAllList="empUserInfoAllList"></emp-user-info2>
        </Row>
        <Row class="row" v-if="logType === '合同信息'">
          <emp-user-info4 :empUserInfoAllList="empUserInfoAllList"></emp-user-info4>
        </Row>
        <Row class="row" v-if="logType === '银行信息'">
          <emp-user-info6 :empUserInfoAllList="empUserInfoAllList"  @refresh="refresh"></emp-user-info6>
        </Row>
        <Row class="row" v-if="logType === '学历信息'">
          <emp-user-info7 :empUserInfoAllList="empUserInfoAllList"  @refresh="refresh"></emp-user-info7>
        </Row>
        <Row class="row" v-if="logType === '工作履历'">
          <emp-user-info8 :empUserInfoAllList="empUserInfoAllList"  @refresh="refresh"></emp-user-info8>
        </Row>
        <Row class="row" v-if="logType === '联系信息'">
          <emp-user-info9 :empUserInfoAllList="empUserInfoAllList"  @refresh="refresh"></emp-user-info9>
        </Row>
        <Row class="row" v-if="logType === '地址信息'">
          <emp-user-info10 :empUserInfoAllList="empUserInfoAllList"  @refresh="refresh"></emp-user-info10>
        </Row>
        <Row class="row" v-if="logType === '家庭信息'">
          <emp-user-info11 :empUserInfoAllList="empUserInfoAllList"  @refresh="refresh"></emp-user-info11>
        </Row>
      </Row>
    </div>
  </div>
</template>
<script>
  import empUserInfo2 from './empUserInfo2'
  import empUserInfo4 from './empUserInfo4'
  import empUserInfo6 from './empUserInfo6'
  import empUserInfo7 from './empUserInfo7'
  import empUserInfo8 from './empUserInfo8'
  import empUserInfo9 from './empUserInfo9'
  import empUserInfo10 from './empUserInfo10'
  import empUserInfo11 from './empUserInfo11'
  export default {
    data() {
      return {
        isSpin: false,
        userImg: '',
      }
    },
    components: {
      empUserInfo2,
      empUserInfo4,
      empUserInfo6,
      empUserInfo7,
      empUserInfo8,
      empUserInfo9,
      empUserInfo10,
      empUserInfo11,
    },
    props: {
      logType: String,
      empUserInfoAllList: '',
      isShowSpin: Boolean,
    },
    methods: {
      handleReset() {
        this.$emit('closeUp')
      },
      refresh(num) {
        this.$emit('refresh', num)
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  .row{
    .col1{
      font-size:14px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin-top: 20px;
      text-align: right;
    }
    .col2{
      font-size:14px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:rgba(153,153,153,1);
      margin-top: 20px;
    }
  }

</style>
