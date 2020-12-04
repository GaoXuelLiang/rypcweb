<template>
  <Row>
    <Row>
      <i-col span="22" style="display: flex;flex-direction: row-reverse;">
        <Button type="primary" @click="openUp(empUserInfoAllList,$t('button.y.upd'))">{{$t('button.y.upd')}}</Button>
      </i-col>
    </Row>

   <Row>
     <i-col span="6" class="col1">手机号码：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empctaMobile }}</i-col>

     <i-col span="6" class="col1">联系电话（固定）：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empctaPhone }}</i-col>
   </Row>

    <Row>
      <i-col span="6" class="col1">个人邮箱：</i-col>
      <i-col span="6" class="col2">{{ empUserInfoAllList.empctaPersmail }}</i-col>

      <i-col span="6" class="col1">公司邮箱：</i-col>
      <i-col span="6" class="col2">{{ empUserInfoAllList.empctaCompmail }}</i-col>
    </Row>

   <Row>
     <i-col span="6" class="col1">QQ：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empctaQq }}</i-col>

     <i-col span="6" class="col1">微信号：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empctaWechat }}</i-col>
   </Row>

   <Row>
     <i-col span="6" class="col1">紧急联系人：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empctaEmergcontact }}</i-col>

     <i-col span="6" class="col1">紧急联系人关系：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empctaEmcrelationDis }}</i-col>
   </Row>

   <Row>
     <i-col span="6" class="col1">紧急联系电话：</i-col>
     <i-col span="6" class="col2">{{ empUserInfoAllList.empctaEmcphone }}</i-col>
   </Row>

   <Row>
     <i-col span="6" class="col1">紧急联系地址：</i-col>
     <i-col span="12" class="col2">{{ empUserInfoAllList.empctaEmcaddr }}</i-col>
   </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUpd="closeUpd"  @refresh="refresh" ref="update"></update>
    </transition>
  </Row>

</template>
<script>
  import update from '../update/update9'
  import {deepCopy} from '../../../lib/util'
  export default {
    data() {
      return {
        logType: '',
        openUpdate: false,
        index: 0,
      }
    },
    props: {
      empUserInfoAllList: '',
    },
    components: {
      update,
    },
    methods: {
      openUp(item, logType, index) {
        const t = this
        t.openUpdate = true
        t.logType = logType
        t.index = index
        // 获取编号
        t.$refs.update.getSelect()
        if (logType === this.$t('button.add')) {
        }
        if (logType === this.$t('button.y.upd')) {
          t.$refs.update.getData(deepCopy(item))
        }
      },
      closeUpd() {
        const t = this
        t.openUpdate = false
      },
      refresh(num) {
        this.$emit('refresh', num)
      },
    }
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
