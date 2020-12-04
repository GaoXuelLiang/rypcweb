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
            value: '书面文件和档案的交接，电脑资料备份留存',
            id: '1',
          },
          {
            value: '对外工作关系和客户的交接',
            id: '1',
          },
          {
            value: '待办工作重点',
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
        let empdimContent = []
        if (t.thisValue.length > 0) {
          t.thisValue.forEach((item1, index1) => {
            empdimContent.push(item1)
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
                t.thisValue = res.data.content[0].value[0].empdimContent.split(',')
              } else {
                t.thisValue = []
              }
            } else {
              t.thisValue = []
            }
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
