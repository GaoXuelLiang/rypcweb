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
          <FormItem :label="labelDesc.trempGenderDis" prop="trempGenderDis">
            <Input v-model="formValidate.trempGenderDis" :placeholder="placeHolderDesc.trempGenderDis"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempEntrydate" prop="trempEntrydate">
            <Input v-model="formValidate.trempEntrydate" :placeholder="placeHolderDesc.trempEntrydate"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempAddress" prop="trempAddress">
            <Input v-model="formValidate.trempAddress" :placeholder="placeHolderDesc.trempAddress"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempVipDis" prop="trempVipDis">
            <Input v-model="formValidate.trempVipDis" :placeholder="placeHolderDesc.trempVipDis"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempHistoryDis" prop="trempHistoryDis">
            <Input v-model="formValidate.trempHistoryDis" :placeholder="placeHolderDesc.trempHistoryDis"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempMarriage" prop="trempMarriage">
            <Input v-model="formValidate.trempMarriage" :placeholder="placeHolderDesc.trempMarriage"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempReason" prop="trempReason">
            <Input v-model="formValidate.trempReason" :placeholder="placeHolderDesc.trempReason"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempSfiscalyearDis" prop="trempSfiscalyearDis">
            <Input v-model="formValidate.trempSfiscalyearDis"
                   :placeholder="placeHolderDesc.trempSfiscalyearDis"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempSfiscalyearDisMark1" prop="trempSfiscalyearDisMark1">
            <Input v-model="formValidate.trempSfiscalyearDisMark1"
                   :placeholder="placeHolderDesc.trempSfiscalyearDisMark1"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempEfiscalyearDis" prop="trempEfiscalyearDis">
            <Input v-model="formValidate.trempEfiscalyearDis"
                   :placeholder="placeHolderDesc.trempEfiscalyearDis"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempEfiscalyearDisMark1" prop="trempEfiscalyearDisMark1">
            <Input v-model="formValidate.trempEfiscalyearDisMark1"
                   :placeholder="placeHolderDesc.trempEfiscalyearDisMark1"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.trempBasesal" prop="trempBasesal">
            <Input v-model="formValidate.trempBasesal" :placeholder="placeHolderDesc.trempBasesal"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="labelDesc.comment" prop="comment">
            <Input v-model="formValidate.comment" :placeholder="placeHolderDesc.comment"></Input>
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
          trempGenderDis: '',
          trempEntrydate: '',
          trempAddress: '',
          trempVipDis: '',
          trempHistoryDis: '',
          trempMarriage: '',
          trempReason: '',
          trempSfiscalyearDis: '',
          trempSfiscalyearDisMark1: '',
          trempEfiscalyearDis: '',
          trempEfiscalyearDisMark1: '',
          trempBasesal: '',
          comment: '',

        },
        ruleValidate: {
          sampleClm: [
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
            t.formValidate.trempGenderDis = res.data.content[0].trempGenderDis
            t.formValidate.trempEntrydate = res.data.content[0].trempEntrydate
            t.formValidate.trempAddress = res.data.content[0].trempAddress
            t.formValidate.trempVipDis = res.data.content[0].trempVipDis
            t.formValidate.trempHistoryDis = res.data.content[0].trempHistoryDis
            t.formValidate.trempMarriage = res.data.content[0].trempMarriage
            t.formValidate.trempReason = res.data.content[0].trempReason
            t.formValidate.trempSfiscalyearDis = res.data.content[0].trempSfiscalyearDis
            t.formValidate.trempSfiscalyearDisMark1 = res.data.content[0].trempSfiscalyearDisMark1
            t.formValidate.trempEfiscalyearDis = res.data.content[0].trempEfiscalyearDis
            t.formValidate.trempEfiscalyearDisMark1 = res.data.content[0].trempEfiscalyearDisMark1
            t.formValidate.trempBasesal = res.data.content[0].trempBasesal
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
        t.$refs.formValidate.validate((valid) => {
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
