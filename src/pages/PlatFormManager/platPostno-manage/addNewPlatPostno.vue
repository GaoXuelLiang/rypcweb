<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.platPostno.postno')" prop="postno">
            <Input v-model="formValidate.postno" :placeholder="$t('lang_platform.platPostno.postnoDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.platPostno.companys')" prop="companys">
            <Input v-model="formValidate.companys" :placeholder="$t('lang_platform.platPostno.companysDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.platPostno.validName')" prop="valid">
            <Select v-model="formValidate.valid" :placeholder="$t('lang_platform.platPostno.validNameDis')">
              <Option :value="item.paramCode" v-for="(item,index) in selectType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_platform.platPostno.commentDis')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.platPostno.commentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        selectType: [],
        formValidate: {
          _mt:  this.$global.mt+'PlatPostno.addOrUpd',
          funId: '1',
          postno: '',
          companys: '',
          valid: '',
          comment: '',
        },
        ruleValidate: {
          postno: [
            { required: true, message: this.$t('lang_platform.platPostno.postnoDis'), trigger: 'blur' },
          ],
          companys: [
            { required: true, message: this.$t('lang_platform.platPostno.companysDis'), trigger: 'blur' },
          ],
          valid: [
            { required: true, message: this.$t('lang_platform.platPostno.validNameDis'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
      id: Number,
      logType: String,
      index: Number,
    },
    updated() {

    },
    mounted() {
      this.getSelect()
    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatPostno.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.postno = res.data.content[0].postno
            t.formValidate.companys = res.data.content[0].companys
            t.formValidate.valid = res.data.content[0].valid
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.logType = t.logType
        if (t.logType === this.$t('button.y.upd')) {
          data.id = t.id
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            t.isSpin = true
            getDataLevelUserLoginSenior(data).then((res) => {
              t.isSpin = false
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('getData', res.data.content[0])
                } else {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$emit('update', res.data.content[0])
                }
              }
            }).catch(() => {
              t.isSpin = false
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }else {
            t.$nextTick(() => {
              let tt = document.querySelectorAll('.ivu-form-item-error')
							tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
              // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
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
            t.selectType = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.$emit('closeUp')
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
