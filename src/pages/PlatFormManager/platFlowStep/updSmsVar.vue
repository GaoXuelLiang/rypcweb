<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="135">
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_flow.varList.flspvarMark')" prop="flspvarMark">
              <Input v-model="formValidate.flspvarMark" :placeholder="$t('lang_flow.varList.p_flspvarMark')"></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_flow.varList.flspvarName')" prop="flspvarName">
              <Input v-model="flspvarName" readonly :placeholder="$t('lang_flow.varList.p_flspvarName')"></Input>
            </FormItem>
          </i-col>
           <i-col span="21"
                           offset="1">
                        <row type="flex"
                             justify="end"
                             class="btn">
                             <FormItem>
                              <Button @click="close" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                              <Button 
                                type="primary"
                                style="margin-left: 8px"
                                @click="save">{{$t('button.sav')}}</Button>
                             </FormItem>
                        </row>
                    </i-col>
        </Form>
      </Row>
      <!-- <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button> -->
    </div>
  </div>
</template>
<script>
  // import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import {getDataLevelUserLoginData} from '@/axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow: false,
        id: '',
        flspvarName: '',
        flspvarBillid: '',
        flspvarSource: '',
        formValidate: {
          _mt:  this.$global.mt+'PlatFlstepVar.addOrUpd',
          flspvarMark: '',
          APfunId: '1',
          APlogType: '',
        },
        ruleValidate: {
          flspvarMark: [
            { required: true, message: this.$t('lang_flow.varList.p_flspvarName'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      logType: String,
    },
    components: {
    },
    mounted() {
    },
    methods: {
      close() {
        this.clear()
        this.$emit('hideMsg')
      },
      getFormData(id) {
        const t = this;
        t.spinShow = true;
        t.id = id
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'PlatFlstepVar.getById',
          APid: id,
          APflowId: t.$store.state.flowStepData.flowId,
          APlogType: this.$t('button.ser'),
          APfunId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.flspvarMark = res.data.content[0].flspvarMark
            t.flspvarName = res.data.content[0].flspvarName
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
        data.flspvarBillid = t.$store.state.flowStepData.childId4
        data.flspvarSource = 'flowsms'
        data.APlogType = t.logType
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        if (t.logType === this.$t('button.add')) {
          data.APflowId = t.$store.state.flowStepData.flowId
        }
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginData(data).then((res) => {
              if (isSuccess(res, t)) {
                if (!t.$store.state.flowStepData.childId4) {
                  //            更新主表数据（无需重新加载）
                  t.$store.commit('flowStepData/addNewArrayChildTable4', res.data.content[0])
//            更新vuex中的mainId
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('flowStepData/updateArrayChildTable4', res.data.content[0])
                  //            更新主表数据（无需重新加载）
                }
                t.clear()
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
      clear() {
        const t = this
//        t.logType = ''
        t.formValidate.flspvarMark = ''
        t.flspvarName = ''
        t.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  // .box{
  //   height: 560px;
  //   overflow:hidden;
  //   .content{
  //     left: 20px;
  //     right: 20px;
  //     overflow-y: auto;
  //     position: absolute;
  //     height: 420px;
  //   }
  // }
  // .btn{
  //   position: absolute;
  //   bottom: 20px;
  //   right: 36px;
  // }
</style>
