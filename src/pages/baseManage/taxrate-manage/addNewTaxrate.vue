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
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxYear')" prop="taxYear">
            <Input v-model="formValidate.taxYear" :placeholder="$t('lang_baseManage.baseTaxrate.taxYearDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxCode')" prop="taxCode">
            <Input v-model="formValidate.taxCode" :placeholder="$t('lang_baseManage.baseTaxrate.taxCodeDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxMin')" prop="taxMin">
            <Input v-model="formValidate.taxMin" :placeholder="$t('lang_baseManage.baseTaxrate.taxMinDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxMax')" prop="taxMax">
            <Input v-model="formValidate.taxMax" :placeholder="$t('lang_baseManage.baseTaxrate.taxMaxDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxTaxrate')" prop="taxTaxrate">
            <Input v-model="formValidate.taxTaxrate" :placeholder="$t('lang_baseManage.baseTaxrate.taxTaxrateDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxQkdeuction')" prop="taxQkdeuction">
            <Input v-model="formValidate.taxQkdeuction" :placeholder="$t('lang_baseManage.baseTaxrate.taxQkdeuctionDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxAmountmin')" prop="taxAmountmin">
            <Input v-model="formValidate.taxAmountmin" :placeholder="$t('lang_baseManage.baseTaxrate.taxAmountminDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxAmountmax')" prop="taxAmountmax">
            <Input v-model="formValidate.taxAmountmax" :placeholder="$t('lang_baseManage.baseTaxrate.taxAmountmaxDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxPosttaxmin')" prop="taxPosttaxmin">
            <Input v-model="formValidate.taxPosttaxmin" :placeholder="$t('lang_baseManage.baseTaxrate.taxPosttaxminDis')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxPosttaxmax')" prop="taxPosttaxmax">
            <Input v-model="formValidate.taxPosttaxmax" :placeholder="$t('lang_baseManage.baseTaxrate.taxPosttaxmaxDis')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.taxPostMonth')" prop="taxCummonth">
            <InputNumber :max="12" :min="1" :step="1" :precision="0" v-model="formValidate.taxCummonth" :placeholder="$t('lang_baseManage.baseTaxrate.taxPostMonthDis')" style="width: 100%;"></InputNumber>
          </FormItem>
          </Col>
        </Row>
        <!--<Row>-->
          <!--<Col span="10" offset="1">-->
          <!--<FormItem :label="$t('lang_baseManage.baseTaxrate.taxSdate')" prop="taxSdate">-->
            <!--<DatePicker type="date" :placeholder="$t('lang_baseManage.baseTaxrate.taxSdateDis')" :editable="false" v-model="formValidate.taxSdate" style="width: 100%"></DatePicker>-->
          <!--</FormItem>-->
          <!--</Col>-->
          <!--<Col span="10" offset="1">-->
          <!--<FormItem :label="$t('lang_baseManage.baseTaxrate.taxEdate')" prop="taxEdate">-->
            <!--<DatePicker type="date" :placeholder="$t('lang_baseManage.baseTaxrate.taxEdateDis')" :editable="false" v-model="formValidate.taxEdate" style="width: 100%"></DatePicker>-->
          <!--</FormItem>-->
          <!--</Col>-->
        <!--</Row>-->
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.baseTaxrate.comment')" prop="comment">
            <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_baseManage.baseTaxrate.commentDis')"></Input>
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
        formValidate: {
          _mt:  this.$global.mt+'BaseTaxrate.addOrUpd',
          funId: '1',
          taxCode: '',
          taxMin: '',
          taxMax: '',
          taxTaxrate: '',
          taxQkdeuction: '',
          taxAmountmin: '',
          taxAmountmax: '',
          taxPosttaxmin: '',
          taxPosttaxmax: '',
          taxCummonth: '',
          taxYear: '',
//          taxSdate: '',
//          taxEdate: '',
          comment: '',
        },
        ruleValidate: {
          taxCode: [
            { required: true, message: this.$t('lang_baseManage.baseTaxrate.taxCodeDis'), trigger: 'blur' },
          ],
          taxMin: [
            { required: true, message: this.$t('lang_baseManage.baseTaxrate.taxMinDis'), trigger: 'blur' },
          ],
          taxMax: [
            { required: true, message: this.$t('lang_baseManage.baseTaxrate.taxMaxDis'), trigger: 'blur' },
          ],
          taxTaxrate: [
            { required: true, message: this.$t('lang_baseManage.baseTaxrate.taxTaxrateDis'), trigger: 'blur' },
          ],
          taxQkdeuction: [
            { required: true, message: this.$t('lang_baseManage.baseTaxrate.taxQkdeuctionDis'), trigger: 'blur' },
          ],
          taxYear: [
            { required: true, message: this.$t('lang_baseManage.baseTaxrate.taxYearDis'), trigger: 'blur' },
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
    methods: {
      getData(id) {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseTaxrate.getById',
          id: id,
          logType: '根据id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.taxCode = res.data.content[0].taxCode
            t.formValidate.taxMin = res.data.content[0].taxMin
            t.formValidate.taxMax = res.data.content[0].taxMax
            t.formValidate.taxTaxrate = res.data.content[0].taxTaxrate
            t.formValidate.taxQkdeuction = res.data.content[0].taxQkdeuction
            t.formValidate.taxAmountmin = res.data.content[0].taxAmountmin
            t.formValidate.taxAmountmax = res.data.content[0].taxAmountmax
            t.formValidate.taxPosttaxmin = res.data.content[0].taxPosttaxmin
            t.formValidate.taxPosttaxmax = res.data.content[0].taxPosttaxmax
            t.formValidate.taxCummonth = res.data.content[0].taxCummonth || ''
            t.formValidate.taxYear = res.data.content[0].taxYear
//            t.formValidate.taxSdate = res.data.content[0].taxSdate
//            t.formValidate.taxEdate = res.data.content[0].taxEdate
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
//        if (data.taxSdate !== undefined) {
//          data.taxSdate = new Date(data.taxSdate).format('yyyy-MM-dd')
//        }
//        if (data.taxEdate !== undefined) {
//          data.taxEdate = data.taxEdate === '' ? '' : new Date(data.taxEdate).format('yyyy-MM-dd')
//        }
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
      handleReset() {
        this.$refs.formValidate.resetFields()
        this.$emit('closeUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
</style>
