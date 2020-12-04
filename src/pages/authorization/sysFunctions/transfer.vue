<template>
  <div class="cover">
    <div class="box" style="width: 460px">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('button.sav')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Transfer
        :data="data"
        :target-keys="targetKeys"
        :render-format="render1"
        @on-change="handleChange"
        @on-selected-change="selectedChange"
        :list-style="{height:'300px'}">
        <!-- <div :style="{float: 'right', margin: '5px'}">
          <Button size="small" @click="upMove">{{$t('lang_role.adminfun.upMove')}}</Button>
          <Button size="small" @click="downMove">{{$t('lang_role.adminfun.downMove')}}</Button>
        </div> -->
      </Transfer>
      <Button class="upmoveBtn" type="primary" size="small" @click="upMove">
        <Icon type="ios-arrow-up" />
      </Button>
      <Button class="downmoveBtn" type="primary" size="small" @click="downMove">
        <Icon type="ios-arrow-down" />
      </Button>
      <div :style="{float: 'right', marginTop: '20px', marginBottom: '20px',fontSize:'0'}">
        <Button @click="close" style="margin-right: 10px">{{$t('button.cal')}}</Button>
        <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

export default {
  data() {
    return {
      data: [],
      targetKeys: [],
      selected: [],
    }
  },
  watch: {
    listBtn(val) {
      this.targetKeys = val
    }
  },
  props: {
    id: Number,
    listBtn: Array, // 已有的按钮list
  },
  methods: {
    getData() {
      const t = this
      getDataLevelUserLogin({
        _mt:  this.$global.mt+'SysFunbutton.getSysFunbuttonBybtnFunid',
        btnFunid: t.$store.state.sysFunctionsJS.mainId,
      }).then((res) => {
        if (isSuccess(res, t)) {
          t.data = t.getMockData(res.data.content[0].value)
        }
      }).catch(() => {
        this.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    getMockData(data) {
      const mockData = []
      for (let i = 0; i < data.length; i++) {
        mockData.push({
          key: data[i].btnLancode,
          label: data[i].btnLanCn,
        })
      }
      return mockData
    },
    render1(item) {
      return item.label
    },
    selectedChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selected = targetSelectedKeys
    },
    handleChange(newTargetKeys) {
      this.targetKeys = newTargetKeys
    },
    upMove() {
      const t = this
      const keys = []
      for (let i = 0; i < t.targetKeys.length; i++) {
        keys.push(t.targetKeys[i])
      }
      for (let i = 0; i < keys.length; i++) {
        if (t.selected.contains(keys[i]) && !t.selected.contains(keys[i - 1]) && i > 0) {
          keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
        }
      }
      t.targetKeys = keys
    },
    downMove() {
      const t = this
      const keys = []
      for (let i = 0; i < t.targetKeys.length; i++) {
        keys.push(t.targetKeys[i])
      }
      for (let i = keys.length - 2; i > -1; i--) {
        if (t.selected.contains(keys[i]) && !t.selected.contains(keys[i + 1]) && i > -1) {
          keys.splice(i, 1, ...keys.splice(i + 1, 1, keys[i]))
        }
      }
      t.targetKeys = keys
    },
    save() {
      const t = this
      const data = {
        _mt:  this.$global.mt+'SysFunbutton.addOrUpdSysFunbutton',
        logType: '按钮新增',
        btnFunid: t.$store.state.sysFunctionsJS.mainId,
        companyId: '1',
        funId: '1',
        btnLancode: t.targetKeys.toString(),
      }
      getDataLevelUserLogin(data).then((res) => {
        if (isSuccess(res, t)) {
          this.$Modal.success({
            title: this.$t('reminder.suc'),
            content: this.$t('reminder.savsuccess'),
          })
          t.close()
          t.$emit('getBtnData')
        }
      }).catch(() => {
        this.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
    close() {
      this.data = []
      this.selected = []
      this.$emit('closeTransfer')
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  /deep/ .ivu-transfer-list-with-footer{
    padding-bottom:0;
  }
  .upmoveBtn{
    position:absolute;
    left:calc(50% - 14px);
    top:145px;
  }
  .downmoveBtn{
    position:absolute;
    left:calc(50% - 14px);
    bottom:158px;
  }
</style>
