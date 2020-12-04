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
      </Transfer>
      <Button class="upmoveBtn" type="primary" :disabled="disabled" size="small" @click="upMove">
        <Icon type="ios-arrow-up" />
      </Button>
      <Button class="downmoveBtn" type="primary" :disabled="disabled" size="small" @click="downMove">
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
  // import { getDataLevelUserLogin } from '../../../axios/axios'
  import { getDataLevelUserLoginData } from '@/axios/axios'
  import { isSuccess } from '../../../lib/util'

export default {
  data() {
    return {
      data: [],
      targetKeys: [],
      selected: [],
      disabled: false
    }
  },
  watch: {
    listBtn(val) {
      this.targetKeys = val
    },
    targetKeys(val){
      if (val.length) this.disabled = false;
      else this.disabled = true;
    }
  },
  props: {
    // id: Number,
    listBtn: Array, // 已有的按钮list
  },
  methods: {
    getData() {
      const t = this
      // console.log(t.listBtn,'this.listBtn')
      getDataLevelUserLoginData({
        _mt:  this.$global.mt+'SysFunbutton.getSysFunbuttonBybtnFunid',
        APbtnFunid: t.$store.state.autoCommonPage.mainId,
      }).then((res) => {
        if (isSuccess(res, t)) {
          if(res.data.content[0].value){
            t.data = t.getMockData(res.data.content[0].value)
          }
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
      if(t.targetKeys.length === 0){
        t.$Modal.warning({
          title: this.$t('reminder.remind'),
          content: this.$t('reminder.leastone'),
        })
      }else{
        const data = {
          _mt:  this.$global.mt+'SysFunbutton.addOrUpdSysFunbutton',
          APlogType: '按钮新增',
          APbtnFunid: t.$store.state.autoCommonPage.mainId,
          APcompanyId: '1',
          APfunId: '1',
          APbtnLancode: t.targetKeys.toString(),
        }
        getDataLevelUserLoginData(data).then((res) => {
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
      }
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
