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
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.autotasklog.atlogAtskidName')" prop="atlogAtskidName">
            <Input disabled readonly v-model="formValidate.atlogAtskidName" ></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.autotasklog.atlogRuntime')" prop="atlogRuntime">
            <Input disabled readonly v-model="formValidate.atlogRuntime" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_platform.autotasklog.atlogStatusName')" prop="atlogStatusName">
            <Input disabled readonly v-model="formValidate.atlogStatusName" ></Input>
          </FormItem>
          </Col>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_platform.autotasklog.atlogError')" prop="atlogError">
            <Input disabled readonly v-model="formValidate.atlogError" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_platform.autotasklog.comment')" prop="atlogComment">
            <Input disabled readonly v-model="formValidate.atlogComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin,getDataLevelUserLoginData } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        spinShow: false,
        formValidate: {
          atlogAtskidName: '',
          atlogRuntime: '',
          atlogStatusName: '',
          atlogError: '',
          atlogComment: '',
        },
        ruleValidate: {
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
    methods: {
      getData(id) {
        const t = this;
        t.spinShow = true;
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'PlatAutotasklog.getById',
          APid: id,
          APlogType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.atlogAtskidName = res.data.content[0].atlogAtskidName
            t.formValidate.atlogRuntime = res.data.content[0].atlogRuntime
            t.formValidate.atlogStatusName = res.data.content[0].atlogStatusName
            t.formValidate.atlogError = res.data.content[0].atlogError
            t.formValidate.atlogComment = res.data.content[0].atlogComment
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
      handleSubmit() {
        const t = this
        const data = deepCopy(t.formValidate)
        data.APlogType = t.logType
        if (t.logType === this.$t('button.y.upd')) {
          data.APid = t.id
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginData(data).then((res) => {
              if (isSuccess(res, t)) {
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
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
      handleReset() {
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
