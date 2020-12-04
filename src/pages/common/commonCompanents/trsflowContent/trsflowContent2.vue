<template>
  <div class="table">
    <Row>
      <i-Col span="24" style="background: #f9f9f9">
          <row class="table-form" ref="table-form">
            <CheckboxGroup v-model="thisValue" @on-change="change" class="row_group" >
              <Checkbox v-for="(item, index) in data" :key="index" :label="item.value" :disabled="!btnRole" size="large" class="row_Cgroup">{{item.value}}</Checkbox>
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
        thisDis: false,
        data: [
          {
            value: '归还所借备用金',
            id: '1',
          },
          {
            value: '预付款项票据追回',
            id: '1',
          },
          {
            value: '外部培训费用结算',
            id: '1',
          },
          {
            value: '各类应还款（购车补助，购房补助，自购电脑补贴款等）',
            id: '1',
          },
        ],
      }
    },
    components: {
    },
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
        let trsflowContent = []
        if (t.thisValue.length > 0) {
          t.thisValue.forEach((item1, index1) => {
            trsflowContent.push(item1)
          })
        }
        data._mt =  this.$global.mt+'InternaltransferHandcontent.addOrUpd'
        data.trsflowContent = trsflowContent.join()
        data.trsflowFlowid = t.flowInfo.flowId
        data.trsflowStepid = t.flowInfo.stepId
        data.trsflowDataid = t.flowInfo.pkValue
          getDataLevelUserLoginNew(data).then((res) => {
            if (isSuccess(res, t)) {
              console.log(res)
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
        data._mt =  this.$global.mt+'InternaltransferHandcontent.getList'
        data.trsflowFlowid = t.flowInfo.flowId
        data.trsflowStepid = t.flowInfo.stepId
        data.trsflowDataid = t.flowInfo.pkValue
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (JSON.stringify(res.data.content[0]) !== '{}') {
              if (res.data.content[0].value[0].trsflowContent.length > 0) {
                t.thisValue = res.data.content[0].value[0].trsflowContent.split(',')
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
          if (!obj[arr[i].trsflowContent]) {
            result.push(arr[i])
            obj[arr[i].trsflowContent] = true
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
