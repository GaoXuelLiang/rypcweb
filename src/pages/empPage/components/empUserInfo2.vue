<!--
 * @Descripttion: 
 * @Author: dj
 * @Date: 2020-05-20 14:05:50
--> 
<template>
  <Row>
   <Row>
     <i-col span="6" class="col1">生效日期：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empcompSdate }}</i-col>

     <i-col span="6" class="col1">失效日期：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empcompEdate }}</i-col>
   </Row>

    <Row>
      <i-col span="6" class="col1">雇佣公司：</i-col>
      <i-col span="6" class="col2">{{ empUserInfoAllList.empcompHirecompanyDis }}</i-col>

      <i-col span="6" class="col1">部门：</i-col>
      <i-col span="6" class="col2">{{ empUserInfoAllList.empcompDeptDis }}</i-col>
    </Row>

    <Row>
      <i-col span="6" class="col1">岗位：</i-col>
      <i-col span="6" class="col2">{{ empUserInfoAllList.empcompPostDis }}</i-col>

      <i-col span="6" class="col1">基准岗位：</i-col>
      <i-col span="6" class="col2">{{ empUserInfoAllList.empcompBnchpostDis }}</i-col>
    </Row>
    <Row>
      <i-col span="6" class="col1">职位级别：</i-col>
      <i-col span="6" class="col2">{{ empUserInfoAllList.empcompPostlevel }}</i-col>
      <i-col span="6" class="col1">条线：</i-col>
      <i-col span="6" class="col2">{{ empUserInfoAllList.empcompPostDis }}</i-col>
    </Row>

   <!-- <i-col span="6" class="col1">雇佣地点：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empcompHirelocationDis }}</i-col>

    <i-col span="6" class="col1">工作地点：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empcompWorklocationDis }}</i-col>

    <i-col span="6" class="col1">成本中心：</i-col>
    <i-col span="6" class="col2">{{ empUserInfoAllList.empcompCostcenterDis }}</i-col>-->

   <Row>
     <i-col span="6" class="col1">汇报人：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empcompBuspmpDis }}</i-col>

     <i-col span="6" class="col1">入职日期：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empcompEntrydate }}</i-col>
   </Row>

   <Row>
     <i-col span="6" class="col1">是否享受异地派遣福利：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empcompTravelawardDis }}</i-col>

     <i-col span="6" class="col1">是否享受异地引进福利：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empcompImportawardDis }}</i-col>
   </Row>

   <Row>
     <i-col span="6" class="col1">司龄：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empcompCompage }}</i-col>


   </Row>
  </Row>

</template>
<script>
  export default {
    data() {
      return {}
    },
    props: {
      empUserInfoAllList: '',
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
