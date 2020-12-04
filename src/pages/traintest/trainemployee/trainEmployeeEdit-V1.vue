<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;{{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempWorkno" prop="trempWorkno">
            <Input v-model="formValidate.trempWorkno" :placeholder="placeHolderDesc.trempWorkno"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempName" prop="trempName">
            <Input v-model="formValidate.trempName" :placeholder="placeHolderDesc.trempName"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_train.trainEmployee.trempGender')" prop="trempGender">
            <Input v-model="formValidate.trempGender"
                   :placeholder="$t('lang_train.trainEmployee.p_trempGender')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_train.trainEmployee.trempAddress')" prop="trempAddress">
            <Input v-model="formValidate.trempAddress"
                   :placeholder="$t('lang_train.trainEmployee.p_trempAddress')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem>
              <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button>
              <Button :disabled="disabled" type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
            </FormItem>
          </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginSenior, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, deepCopy} from '@/lib/util'


  export default {
    data() {
      return {
        disabled: false,
        formValidate: {
          _mt:  this.$global.mt+'TrainEmployee.addOrUpd',
          trempWorkno: '',
          trempName: '',
          trempGender: '',
          trempAddress: '',
        },
        ruleValidate: {
          trempWorkno: [
            {required: true, message: '', trigger: 'blur'},
          ],
          trempName: [
            {required: true, message: '', trigger: 'blur'},
          ],
        },
      }
    },
    components: {},
    props: {
      id: Number,
      logType: String,
      index: Number,
      labelDesc: Object,
      placeHolderDesc: Object,
    },
    updated() {

    },
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'TrainEmployee.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.trempWorkno = res.data.content[0].trempWorkno
            t.formValidate.trempName = res.data.content[0].trempName
            t.formValidate.trempGender = res.data.content[0].trempGender
            t.formValidate.trempAddress = res.data.content[0].trempAddress
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
            getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeUp')
                if (t.logType === this.$t('button.add')) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.addsuccess'),
                  })
                  t.$refs.formValidate.resetFields()
                  t.$emit('newData', res.data.content[0])
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
        this.$refs.formValidate.resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
