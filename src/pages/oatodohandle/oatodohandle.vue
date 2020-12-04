<template>
  <div class="table">
    <Row>
      <i-Col span="24">
          <Row v-show="todoType === 'flowStep'">
            <common-flow-update
            :flowId="flowId"
            :pkValue="flowDataId"
            :stepId="flowStepId"
            :oaTodoParam="oaTodoParam"
            :oaStepState="oaStepState"
            ref="flowUpdate"
            ></common-flow-update>
          </Row>
        <Row v-show="todoType === 'approve'">
          <common-approval-update ref="approveUpdate" :oaTodoParam="oaTodoParam"></common-approval-update>
        </Row>
      </i-Col>
    </Row>
  </div>
</template>
<script>
  import {isSuccess, getUrlKey, setCookie, deepCopy} from '../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelNone } from '../../axios/axios'
  import commonFlowUpdate from './oatodoFlowList/commonFlowUpdate'
  import commonApprovalUpdate from './oatodoApprovalList/commonFlowUpdate'
  export default{
    name: 'oatodohandle',
    data() {
      return {
        oaTodoParam: {},
        flowId: '',
        flowDataId: '',
        flowStepId: '',
        todoType: '',
        oaStepState: {},
      }
    },
    components: {
      commonFlowUpdate,
      commonApprovalUpdate,
    },
    mounted() {
      // 流程 http://localhost.hrocloud.com:8080/#/oatodohandle?param=0qLK8d0pFDKDOyPvuR0lZ1qDb6PnkFGyfCej4N77CvTr9qnAUlFhjPUFsijsjDK9dWnhTe18OzcWXV5c%2FHidwNbx%2B393e%2FUUAcvG8HInYtzFfQBLnir%2Bb8I3iUCbLbXgYNPMpoVFyMZVg5LhVKrrXg%3D%3D
      // 审批 http://localhost.hrocloud.com:8080/#/oatodohandle?param=n06D42IlT8RTh2Q38I3giC9bYeuWKr0J2dIJ%2F5KRP1y2iKhWZbkp6dzO7nX5whvT1%2FL0faJPri7xZb8%2BAqwvivFkVoBi6QXAuDaRF2WLmek7qyIXl7%2FgQw1Q3oKa2bqCOdLT7fjY8NihrFQJ4gwptC2phbvpptKO
      console.log(getUrlKey('param'))
      this.getValidate(getUrlKey('param'))
    },
    methods: {
      getValidate(param) {
          const t = this
          getDataLevelNone({
            _mt:  this.$global.mt+'UserInfo.todologin',
            param: param,
            v5ticket: '验证',
          }).then((res) => {
            if (isSuccess(res, t)) {
              setCookie('wtk', res.data.content[0].webToken)
              setCookie('useId', res.data.content[0].uid)
              setCookie('useName', res.data.content[0].username)
              t.$store.commit('setName', res.data.content[0].username)
              t.$store.commit('setUserId', res.data.content[0].uid)
              t.$store.commit('setFunId', '0')
              t.todoType = res.data.content[0].oaTodoParam.todoType
              if (t.todoType === 'flowStep') {
                t.oaTodoParam = res.data.content[0].oaTodoParam
                t.flowId = res.data.content[0].oaTodoParam.flowId
                t.flowDataId = res.data.content[0].oaTodoParam.flowDataId
                t.flowStepId = res.data.content[0].oaTodoParam.flowStepId
                t.$refs.flowUpdate.getDataBlock(t.oaTodoParam)
                t.getState()
              } else {
                t.oaTodoParam = res.data.content[0].oaTodoParam
                // t.oaTodoParam.thisPkValue = '1010'
                // t.oaTodoParam.aprvrelaStepidAll = '2250'
                // t.oaTodoParam.aprdBillid = '1426'
                t.$refs.approveUpdate.getApvRecordInfo(t.oaTodoParam)
              }
            }
          }).catch(() => {
            t.$Modal.warning({
              title: t.$t('reminder.err'),
              content: t.$t('reminder.errormessage'),
            })
          })
        },
      getState() {
        const t = this
        let data = {
          _mt:  this.$global.mt+'PlatAutoLayoutGetFlowEdit.getFlowStepState',
          flowId: t.oaTodoParam.flowId,
          stepId: t.oaTodoParam.flowStepId,
          pkValue: t.oaTodoParam.flowDataId,
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.oaStepState = res.data.content[0]
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table{
    width: 1200px;
    margin: auto;
  }
  .table-form{
    margin: 10px 0;
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
