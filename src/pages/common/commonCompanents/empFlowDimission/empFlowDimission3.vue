<template>
  <div class="table">
    <Row>
      <i-Col span="24" style="background: #f9f9f9">
          <row class="table-form" ref="table-form">
            <CheckboxGroup v-model="thisValue" @on-change="change" class="row_group" >
              <Checkbox v-for="(item, index) in data" :key="index" :label="item.value" :disabled="!btnRole" size="large" class="row_Cgroup">
                {{item.value}}
                <InputNumber :max="100000" :min="1" v-model="price1" :disabled="!btnRole" size="small" v-if="item.id === '4'"></InputNumber><span v-if="item.id === '4'">元</span>
                <InputNumber :max="100000" :min="1" v-model="price2" :disabled="!btnRole" size="small" v-if="item.id === '5'"></InputNumber><span v-if="item.id === '5'">元</span>
              </Checkbox>
            </CheckboxGroup>
            <row style="padding-left: 600px">提交前,请勾选交接内容</row>
          </row>
      </i-Col>
    </Row>
  </div>
</template>
<script>
  import {isSuccess, getUrlKey, deepCopy, uniqObj} from '../../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  export default{
    name: 'countryManage',
    data() {
      return {
        fruit: [''],
        thisValue: [],
        price1: 0,
        price2: 0,
        thisDis: false,
        data: [
          {
            value: '归还办公用品、门禁卡、钥匙、所借书籍、停车卡、制服（如有）及其他公物',
            id: '1',
          },
          {
            value: '归还电脑及相关设备',
            id: '2',
          },
          {
            value: '检查办公桌椅，文件柜等使用情况',
            id: '3',
          },
          {
            value: '自购电脑补贴款结算差额应返还',
            id: '4',
          },
          {
            value: '宿舍退住需归还金额',
            id: '5',
          },
        ],
      }
    },
    components: {},
    props: {
      chlcolumns: Array,
      clmCustomrouter: String,
      flowInfo: Object,
      roleContrl: Object,
    },
    computed: {
      btnRole() {
        if (this.roleContrl.stepAuthLimits === '03submit' && this.roleContrl.flsdbOptauth === '02update' && this.roleContrl.thisStepState !== 'p_flowst_3' && this.roleContrl.thisStepState !== 'p_flowst_0') {
          return true
        } else {
          return false
        }
      },
    },
    mounted() {
      this.getList()
    },
    methods: {
      change(res) {
        const t = this
        let data = {}
        let empdimContent = []
        if (t.thisValue.length > 0) {
          t.thisValue.forEach((item1, index1) => {
            if (item1 === '自购电脑补贴款结算差额应返还') {
              empdimContent.push(item1 + '_' + t.price1)
            } else if (item1 === '宿舍退住需归还金额') {
              empdimContent.push(item1 + '_' + t.price2)
            } else {
              empdimContent.push(item1)
            }
          })
        }
          data._mt =  this.$global.mt+'DimflowHandcontent.addOrUpd'
          data.empdimContent = empdimContent.join()
          data.dimflowFlowid = t.flowInfo.flowId
          data.dimflowStepid = t.flowInfo.stepId
          data.dimflowDataid = t.flowInfo.pkValue
        getDataLevelUserLoginNew(data).then((res) => {
            if (isSuccess(res, t)) {
            }
          }).catch(() => {
            t.isSpin = false
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
      },
      getList() {
        const t = this
        let data = {}
        data._mt =  this.$global.mt+'DimflowHandcontent.getList'
        data.dimflowFlowid = t.flowInfo.flowId
        data.dimflowStepid = t.flowInfo.stepId
        data.dimflowDataid = t.flowInfo.pkValue
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (JSON.stringify(res.data.content[0]) !== '{}') {
              if (res.data.content[0].value[0].empdimContent.length > 0) {
                let val = res.data.content[0].value[0].empdimContent.split(',')
                val.forEach((item1, index1) => {
                  if (item1.includes('自购电脑补贴款结算差额应返还')) {
                    t.thisValue.push(item1.split('_')[0])
                    t.price1 = item1.split('_')[1]
                  } else if (item1.includes('宿舍退住需归还金额')) {
                    t.thisValue.push(item1.split('_')[0])
                    t.price1 = item1.split('_')[1]
                  } else {
                    t.thisValue.push(item1)
                  }
                })
              } else {
                t.thisValue = []
              }
            }
          } else {
            t.thisValue = []
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      uniqObj(arr, key1) {
        let result = []
        let obj = {}
        for (let i = 0; i < arr.length; i++) {
          if (!obj[arr[i].empdimContent]) {
            result.push(arr[i])
            obj[arr[i].empdimContent] = true
          }
        }
        return result
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
    .row_group{
      display: flex;
      flex-wrap: wrap;
      padding-left: 100px;
      .row_Cgroup{
        width: 100%;
        .ivu-checkbox{
          margin-right: 20px !important;
        }
      }
    }
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
