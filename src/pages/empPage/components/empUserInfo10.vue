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
      <i-col span="6" class="col1">地址类型：</i-col>
      <i-col span="6" class="col2"><span>{{item.empaddrTypeDis || ''}}</span></i-col>

      <i-col span="6" class="col1">国家：</i-col>
      <i-col span="6" class="col2"><span>{{item.empaddrCuntryDis || ''}}</span></i-col>

      <i-col span="6" class="col1">省份：</i-col>
      <i-col span="6" class="col2"><span>{{item.empaddrProvinceDis || ''}}</span></i-col>

      <i-col span="6" class="col1">城市：</i-col>
      <i-col span="6" class="col2"><span>{{item.empaddrCityDis || ''}}</span></i-col>

      <i-col span="6" class="col1">详细地址：</i-col>
      <i-col span="6" class="col2"><span>{{item.empaddrStreet || ''}}</span></i-col>

      <i-col span="6" class="col1" v-show="item.empaddrType !== '01reside'">户口性质：</i-col>
      <i-col span="6" class="col2" v-show="item.empaddrType !== '01reside'"><span>{{item.empaddrRegisterpropertyDis || ''}}</span></i-col>
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
  import update from '../update/update10'
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
