<template>
  <div class="option-main">
    <Spin size="large"
          fix
          v-if="spinShow"></Spin>
      <div class="form_box"
             ref="scrollBox">
      <Form :model="form" label-position="right" :rules="ruleValidate" ref="form" :label-width="120">
        <Row>
        <i-col span="10">
          <FormItem :label="$t('lang_platdoc.platSyssms.syssmsNo')" prop="syssmsNo">
            <Input v-model="form.syssmsNo" :placeholder="$t('lang_platdoc.platSyssms.syssmsNoDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="10" offset="1">
          <FormItem :label="$t('lang_platdoc.platSyssms.syssmsTitle')" prop="syssmsTitle">
            <Input v-model="form.syssmsTitle" :placeholder="$t('lang_platdoc.platSyssms.syssmsTitleDis')"></Input>
          </FormItem>
        </i-col>
        </Row>
        <i-col span="21">
          <FormItem :label="$t('lang_platdoc.platSyssms.syssmsTo')" prop="syssmsTo">
            <Input v-model="form.syssmsTo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platSyssms.syssmsToDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="21">
          <FormItem :label="$t('lang_platdoc.platSyssms.syssmsContent')" prop="syssmsContent">
            <Input v-model="form.syssmsContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platSyssms.syssmsContentDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="21">
          <FormItem :label="$t('lang_platdoc.platSyssms.syssmsSendcondition')" prop="syssmsSendcondition">
            <Input v-model="form.syssmsSendcondition" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platSyssms.syssmsSendconditionDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="10">
          <FormItem :label="$t('lang_platdoc.platSyssms.syssmsIsvalid')" prop="syssmsIsvalid">
            <RadioGroup v-model="form.syssmsIsvalid" type="button" size="small" :placeholder="$t('lang_platdoc.platSyssms.syssmsIsvalidDis')">
              <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoCn}}</Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
        <i-col span="21">
          <FormItem :label="$t('lang_platdoc.platSyssms.syssmsInvreason')" prop="syssmsInvreason">
            <Input v-model="form.syssmsInvreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platSyssms.syssmsInvreasonDis')"></Input>
          </FormItem>
        </i-col>
        <i-col span="21">
          <FormItem :label="$t('lang_platdoc.platSyssms.syssmsComment')" prop="syssmsComment" class="last-item">
            <Input v-model="form.syssmsComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platdoc.platSyssms.syssmsCommentDis')"></Input>
          </FormItem>
        </i-col>
      </Form>
      <Row>
          <i-col span="21"
                class="btn">
                <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
                <Button type="primary" @click="save" style="margin-left: 8px">{{$t('button.sav')}}</Button>
          </i-col>
      </Row>
    <!-- <Row type="flex">
      <i-col span="21">
        <Row type="flex" justify="end" style="margin: 20px 0 0 0;padding-right: 8px">
            <Button class="btn" type="" @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
            <Button class="btn" type="primary" @click="save" style="margin-left: 8px">{{$t('button.sav')}}</Button>
        </Row>
      </i-col>
    </Row> -->
   </div>
    <!-- <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button> -->
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import validChenck from '../../../lib/pub_valid'

  export default {
    data() {
      const syssmsNocheck = (rule, value, callbackFun) => {
        if (validChenck.val_number106(value)) {
          return callbackFun()
        }
        return callbackFun(new Error(rule.message))
      }
      return {
        spinShow: false,
        form: {
          _mt:  this.$global.mt+'PlatSyssms.addOrUpd',
          funId: '1',
          syssmsNo: '',
          syssmsTo: '',
          syssmsSendcondition: '',
          syssmsSendconditiondis: '',
          syssmsTitle: '',
          syssmsContent: '',
          syssmsIsvalid: '',
          syssmsInvreason: '',
          syssmsComment: '',
        },
        radioYesOrNo: [],
        ruleValidate: {
          syssmsNo: [
            { required: true, message: this.$t('lang_platdoc.platSyssms.syssmsNoDis'), trigger: 'blur' },
            { validator: syssmsNocheck, message: this.$t('lang_platdoc.platSyssms.syssmsNocheck'), trigger: 'change' },
          ],
          syssmsContent: [
            { required: true, message: this.$t('lang_platdoc.platSyssms.syssmsContentDis'), trigger: 'blur' },
          ],
          syssmsTitle: [
            { required: true, message: this.$t('lang_platdoc.platSyssms.syssmsTitleDis'), trigger: 'blur' },
          ],
          syssmsIsvalid: [
            { required: true, message: this.$t('lang_platdoc.platSyssms.syssmsIsvalidDis'), trigger: 'blur' },
          ],
          syssmsTo: [
            { required: true, message: this.$t('lang_platdoc.platSyssms.syssmsToDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getdata(params) {
        const t = this;
        t.spinShow = true;
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.form.syssmsNo = res.data.content[0].syssmsNo
            this.form.syssmsTo = res.data.content[0].syssmsTo
            this.form.syssmsSendcondition = res.data.content[0].syssmsSendcondition
            this.form.syssmsSendconditiondis = res.data.content[0].syssmsSendconditiondis
            this.form.syssmsIsvalid = res.data.content[0].syssmsIsvalid
            this.form.syssmsInvreason = res.data.content[0].syssmsInvreason
            this.form.syssmsTitle = res.data.content[0].syssmsTitle
            this.form.syssmsContent = res.data.content[0].syssmsContent
            this.form.syssmsComment = res.data.content[0].syssmsComment
            t.$emit('getid', res.data.content[0].id, res.data.content[0].syssmsContent,
              res.data.content[0].syssmsTo, res.data.content[0].syssmsSendcondition)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.spinShow = false;
        })
      },
      handleReset () {
        this.$emit("close");
      },
      save() {
        const t = this
        const data = deepCopy(t.form)
        data.logType = t.logType
        data.id = t.id
        this.$refs.form.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('getid', res.data.content[0].id, res.data.content[0].syssmsContent,
                  res.data.content[0].syssmsTo, res.data.content[0].syssmsSendcondition)
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$emit('newdata', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
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
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.radioYesOrNo = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        this.form.syssmsNo = ''
        this.form.syssmsTo = ''
        this.form.syssmsSendcondition = ''
        this.form.syssmsSendconditiondis = ''
        this.form.syssmsTitle = ''
        this.form.syssmsContent = ''
        this.form.syssmsIsvalid = ''
        this.form.syssmsInvreason = ''
        this.form.syssmsComment = ''
        this.$refs.form.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
//   @import "../../../sass/updateAndAdd";
//   .option-main{
//     position: relative;
//     box-sizing: border-box;
//     max-height: 600px;
//     padding: 10px;
//     // height: 500px;
//     // .btn{
//     //   position: absolute;
//     //   bottom: 20px;
//     //   right: 36px;
//     // }
//   }
//   .last-item{
//     margin-bottom: 0 !important;
// }
@import "../../../sass/mainChildUpdate.scss";
</style>

