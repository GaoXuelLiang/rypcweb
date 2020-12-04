<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_approval.smscontract.upsmsitle')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="content form_box">
        <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="135">
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_approval.smscontract.apsmstoContact')" prop="apsmstoContactDis">
              <Input v-model="apsmstoContactDis" readonly placeholder=""></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_approval.smscontract.apsmstoIsvalid')" prop="apsmstoIsvalid">
              <Select  v-model="formValidate.apsmstoIsvalid">
                <Option :value="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="21" offset="1">
            <FormItem :label="$t('lang_approval.smscontract.apsmstoCondition')" prop="apsmstoConditiondis">
              <span @dblclick="clearCondition">
                <Input v-model="formValidate.apsmstoConditiondis" readonly="readonly" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.smscontract.apsmstoConditionDis')" class="settlement"></Input>
              </span>
           		<Button type="primary" @click="generConditionNow(NaN, $t('lang_approval.smscontract.conditionSetting'))">{{$t('lang_approval.smscontract.conditionSetting')}}</Button>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <!-- <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button> -->
      <Row>
        <Col span="21"
              offset="1">
        <Row type="flex"
              justify="end" class="btnSize2">
            <Button type="primary"
                    @click="save">{{$t('button.sav')}}</Button>
        </Row>
        </Col>
      </Row>
    </div>
    <transition name="fade">
      <genrCondition v-show="openCondition"  @inputCondition="inputCondition"  @closeCondition="closeCondition"  ref="genrCondition"></genrCondition>
    </transition>
  </div>
</template>
<script>
  //import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { getDataLevelUserLoginData } from '@/axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import genrCondition from './genrCondition'

  export default {
    data() {
      return {
        spinShow: false,
        id: '',
        openCondition: false,
        apsmstoContactDis: '',
        yesno: [],
        apsmstoSms: '',
        apsmstoConttype: '',
        transmitName: '',
        transmitValue: '',
        formValidate: {
          _mt:  this.$global.mt+'PlatAprvsmsto.addOrUpd',
          apsmstoContact: '',
          apsmstoCondition: '',
          apsmstoConditiondis: '',
          apsmstoIsvalid: '1',
          APfunId: '1',
        },
      }
    },
    props: {
      logType: '',
    },
    components: {
    	genrCondition,
    },
    mounted() {
      this.getSelect()
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
          _mt:  this.$global.mt+'PlatAprvsmsto.getById',
          APid: id,
          APfunId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.apsmstoContact = res.data.content[0].apsmstoContact
            t.formValidate.apsmstoIsvalid = res.data.content[0].apsmstoIsvalid
            t.apsmstoContactDis = res.data.content[0].apsmstoContactDis
            t.formValidate.apsmstoCondition = res.data.content[0].apsmstoCondition
            t.formValidate.apsmstoConditiondis = res.data.content[0].apsmstoConditiondis
            t.apsmstoConttype = res.data.content[0].apsmstoConttype
            t.apsmstoSms = res.data.content[0].apsmstoSms
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
        data.APlogType = '修改'
        data.APid = t.$store.state.platApproval.childId5
        data.APapsmstoSms = t.apsmstoSms
        data.APapsmstoConttype = t.apsmstoConttype
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginData(data).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('platApproval/updateArrayChildTable5', res.data.content[0])
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
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      deletemsg() {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'PlatAprvsmsto.delByIds',
          funId: '1',
          companyId: '1',
          logType: this.$t('button.del'),
          delIds: t.tableselected,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getdata()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelect() {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          APtypeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesno = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      clear() {
        const t = this
        t.formValidate.apsmstoContact = ''
        t.formValidate.apsmstoCondition = ''
        t.formValidate.apsmstoConditiondis = ''
        t.$refs.formValidate.resetFields()
      },
       generConditionNow(id) {
      	const t = this
      	if (t.formValidate.apsmstoConditiondis && t.formValidate.apsmstoCondition) {
      		t.transmitName = t.formValidate.apsmstoConditiondis
	      	t.transmitValue = t.formValidate.apsmstoCondition
	      	t.$refs.genrCondition.getData(t.transmitName, t.transmitValue)
      	}
      	t.openCondition = true
      },
      closeCondition() {
      	const t = this
      	t.openCondition = false
      },
      inputCondition(name, value) {
      	const t = this
      	t.formValidate.apsmstoCondition = value
        t.formValidate.apsmstoConditiondis = name
      },
      clearCondition() {
        const t = this
        t.formValidate.apsmstoCondition = ''
        t.formValidate.apsmstoConditiondis = ''
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
</style>
