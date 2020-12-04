<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_approval.smsvar.updTitle')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="135">
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_approval.smsvar.aprvarMark')" prop="aprvarMark">
              <Input v-model="formValidate.aprvarMark" :placeholder="$t('lang_approval.smsvar.aprvarMarkDis')"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_approval.smsvar.aprvarName')" prop="aprvarName">
              <Input v-model="aprvarName" :disabled="true" placeholder=""></Input>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow: false,
        id: '',
        aprvarName: '',
        aprvarBillid: '',
        aprvarSource: '',
        formValidate: {
          _mt:  this.$global.mt+'PlatAprvar.addOrUpd',
          aprvarMark: '',
          funId: '1',
          logType: '',
        },
        ruleValidate: {
          aprvarMark: [
            { required: true, message: this.$t('lang_approval.smsvar.aprvarMark'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      logType: '',
    },
    components: {
    },
    mounted() {
    },
    methods: {
      getFormData(id) {
        const t = this;
        t.spinShow = true;
        t.id = id
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatAprvar.getById',
          id: id,
          flowId: t.$store.state.platApproval.mainId,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.aprvarMark = res.data.content[0].aprvarMark
            t.aprvarName = res.data.content[0].aprvarName
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false;
        })
      },
      save() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.aprvarBillid = t.$store.state.platApproval.mainId
        data.aprvarSource = 'aprvsms'
        data.logType = t.logType
        data.aprvId = t.$store.state.platApproval.mainId // 流程id
        data.aprvarBillid = t.$store.state.platApproval.childId4// 邮件id
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!data.id) {
                  t.$store.commit('platApproval/addNewArrayChildTable8', res.data.content[0])
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('platApproval/updateArrayChildTable8', res.data.content[0])
                }
                t.close()
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      clear() {
        const t = this
        t.formValidate.aprvarMark = ''
        t.aprvarName = ''
        t.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .box{
    height: 560px;
    overflow:hidden;
    .content{
      left: 20px;
      right: 20px;
      overflow-y: auto;
      position: absolute;
      height: 420px;
    }
  }
  .btn{
    position: absolute;
    bottom: 20px;
    right: 36px;
  }
</style>
