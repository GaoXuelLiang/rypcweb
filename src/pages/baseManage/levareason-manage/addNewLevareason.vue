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
          <FormItem :label="$t('lang_baseManage.baseLevareason.levaCode')" prop="levaCode">
            <Input v-model="formValidate.levaCode" :placeholder="$t('lang_baseManage.baseLevareason.levaCodeDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseLevareason.levaReatypeName')" prop="levaReatype">
            <Select v-model="formValidate.levaReatype" :placeholder="$t('lang_baseManage.baseLevareason.levaReatypeNameDis')">
              <Option :value="item.paramCode" v-for="(item,index) in selectlevaType" :key="index">{{item.paramInfoCn}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseLevareason.levaCname')" prop="levaCname">
            <Input v-model="formValidate.levaCname" :placeholder="$t('lang_baseManage.baseLevareason.levaCnameDis')"></Input>
          </FormItem>
          </Col>
<!--          <Col span="10" offset="1">-->
<!--          <FormItem :label="$t('lang_baseManage.baseLevareason.levaEname')" prop="levaEname">-->
<!--            <Input v-model="formValidate.levaEname" :placeholder="$t('lang_baseManage.baseLevareason.levaEnameDis')"></Input>-->
<!--          </FormItem>-->
<!--          </Col>-->
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseLevareason.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseLevareason.commentDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button @click="handleReset" style="margin-left: 8px">取消</Button>
              <Button type="primary" style="margin-left: 8px" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
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
        spinShow:false,
        isSpin: false,
        selectlevaType: [],
        formValidate: {
          _mt:  this.$global.mt+'BaseLevareason.addOrUpd',
          funId: '1',
          levaCode: '',
          levaReatype: '',
          levaCname: '',
          levaEname: '',
          comment: '',
        },
        ruleValidate: {
          levaCode: [
            { required: true, message: this.$t('lang_baseManage.baseLevareason.levaCodeDis'), trigger: 'blur' },
          ],
          levaReatype: [
            { required: true, message: this.$t('lang_baseManage.baseLevareason.levaReatypeNameDis'), trigger: 'blur' },
          ],
          levaCname: [
            { required: true, message: this.$t('lang_baseManage.baseLevareason.levaCnameDis'), trigger: 'blur' },
          ],
          levaEname: [
            { required: true, message: this.$t('lang_baseManage.baseLevareason.levaEnameDis'), trigger: 'blur' },
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
        t.spinShow = true
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseLevareason.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.levaCode = res.data.content[0].levaCode
            t.formValidate.levaReatype = res.data.content[0].levaReatype
            t.formValidate.levaCname = res.data.content[0].levaCname
            t.formValidate.levaEname = res.data.content[0].levaEname
            t.formValidate.comment = res.data.content[0].comment
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          this.spinShow = false
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
          } else {
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
          typeCode: 'separatereason',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectlevaType = res.data.content[0].value[0].paramList
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
