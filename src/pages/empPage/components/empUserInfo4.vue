<!--
 * @Descripttion: 
 * @Author: dj
 * @Date: 2020-05-19 18:59:13
--> 
<template>
  <Row>
    <i-col span="6" class="col1">公司：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctHirecompanyDis }}</i-col>

    <i-col span="6" class="col1">部门：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctDeptDis }}</i-col>

    <i-col span="6" class="col1">合同主体公司：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctMaincompDis }}</i-col>

    <i-col span="6" class="col1">合同签订类型：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctSigntypeDis }}</i-col>

    <i-col span="6" class="col1">合同类型：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctCategoryDis }}</i-col>

    <i-col span="6" class="col1">合同期限类型：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctContracttypeDis }}</i-col>

    <i-col span="6" class="col1">合同期限：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctContractperiodDis }}</i-col>

    <i-col span="6" class="col1">是否退休返聘：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctIsrehireDis }}</i-col>

    <i-col span="6" class="col1">合同开始日：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctContractsdate }}</i-col>

    <i-col span="6" class="col1">合同到期日：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctContractedate }}</i-col>

    <i-col span="6" class="col1">合同工作时间：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctContractworktimeDis }}</i-col>

    <i-col span="6" class="col1">合同到期通知天数：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctContractpromDis }}</i-col>

    <i-col span="6" class="col1">试用期期限：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctProbationDis }}</i-col>

    <i-col span="6" class="col1">试用期到期通知天数：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctProbationpromDis }}</i-col>

    <i-col span="6" class="col1">试用期开始日期：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctProbationSdate }}</i-col>

    <i-col span="6" class="col1">试用期结束日期：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctProbationdate }}</i-col>

    <i-col span="6" class="col1">转正日期：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empctProbationTranferdate }}</i-col>


  </Row>

</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      empUserInfoAllList: Object,
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
      height: 21px;
    }
  }

</style>
