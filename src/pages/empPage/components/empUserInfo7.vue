<template>
  <Row style="max-height: 400px;overflow-y: scroll;">
    <Row>
      <i-col span="22" style="margin: 10px 0;">
        <Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
      </i-col>
    </Row>
    <Row class="sing"  v-for="(item, index) in empUserInfoAllList" :key="index">
      <Row>
        <i-col span="22" style="display: flex;flex-direction: row-reverse;margin-top: 10px;">
          <Button type="primary" @click="openUp(item,$t('button.y.upd'))">{{$t('button.y.upd')}}</Button>
        </i-col>
      </Row>
      <Row>
        <i-col span="6" class="col1">开始时间：</i-col>
        <i-col span="6" class="col2"><span>{{item.empedSdate || ''}}</span></i-col>

        <i-col span="6" class="col1">结束时间：</i-col>
        <i-col span="6" class="col2"><span>{{item.empedEdate || ''}}</span></i-col>
      </Row>
     <Row>
       <i-col span="6" class="col1">学历：</i-col>
       <i-col span="6" class="col2"><span>{{item.empedEducationlevelDis || ''}}</span></i-col>

       <i-col span="6" class="col1">学位：</i-col>
       <i-col span="6" class="col2"><span>{{item.empedDegreeDis || ''}}</span></i-col>
     </Row>

     <Row>
       <i-col span="6" class="col1">国家：</i-col>
       <i-col span="6" class="col2"><span>{{item.empedCuntryDis || ''}}</span></i-col>

       <i-col span="6" class="col1">学校：</i-col>
       <i-col span="6" class="col2"><span>{{item.empedSchool || ''}}</span></i-col>
     </Row>

      <Row>
        <i-col span="6" class="col1">院校类型：</i-col>
        <i-col span="6" class="col2"><span>{{item.empedSchooltypeDis || ''}}</span></i-col>

        <i-col span="6" class="col1">学习方式：</i-col>
        <i-col span="6" class="col2"><span>{{item.empedLearntypeDis || ''}}</span></i-col>
      </Row>

      <Row>
        <i-col span="6" class="col1">专业：</i-col>
        <i-col span="6" class="col2"><span>{{item.empedSpecialty || ''}}</span></i-col>
      </Row>

      <Row>
        <i-col span="6" class="col1">是否最高学位：</i-col>
        <i-col span="6" class="col2"><span>{{item.empedIshighestDis || ''}}</span></i-col>

        <i-col span="6" class="col1">是否第一学历：</i-col>
        <i-col span="6" class="col2"><span>{{item.empedIsfirstquaDis || ''}}</span></i-col>
      </Row>
    </Row>
    <Row v-if="!empUserInfoAllList.length" style="text-align: center;padding: 0 20px;">
      <img :src="emptyImg" alt="" style="width: 30%;">
      <p style="margin-top: 20px;color: #666;font-size: 14px;">暂无数据</p>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" @closeUpd="closeUpd" @refresh="refresh" ref="update"></update>
    </transition>
  </Row>

</template>
<script>
  import update from '../update/update7'
  import {deepCopy} from '../../../lib/util'
  export default {
    data() {
      return {
        emptyImg: require('../../../../static/img/empty_1.png'),
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
        t.$refs.update.getCountry()
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
