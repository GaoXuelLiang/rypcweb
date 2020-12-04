<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_approval.contract.upsTitle')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="content">
        <Form ref="formValidate" :model="formValidate" label-position="right" :label-width="135">
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_approval.contract.apmltoContact')" prop="apmltoContact">
              <Input v-model="apmltoContactDis" readonly placeholder=""></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_approval.contract.apmltoIsvalid')" prop="apmltoIsvalid">
              <RadioGroup  v-model="formValidate.apmltoIsvalid" type="button" size="small">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="21" offset="1">
            <FormItem :label="$t('lang_approval.contract.apmltoCondition')" prop="apmltoConditiondis">
              <span @dblclick="clearCondition">
               <Input v-model="formValidate.apmltoConditiondis" type="textarea" readonly="readonly" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_approval.contract.apmltoConditionDis')" class="settlement"></Input>
              </span>
            	<Button type="primary" @click="generConditionNow(NaN,$t('lang_approval.contract.conditionSetting'))">{{$t('lang_approval.contract.conditionSetting')}}</Button>
            </FormItem>
          </i-col>
        </Form>
      </Row>
      <Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>
    </div>
    <transition name="fade">
      <genrCondition v-show="openCondition"  @inputCondition="inputCondition"  @closeCondition="closeCondition"  ref="genrCondition"></genrCondition>
    </transition>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import genrCondition from './genrCondition'

  export default {
    data() {
      return {
        spinShow: false,
      	openCondition: false,
        id: '',
        apmltoContactDis: '',
        yesno: [],
        apmltoConttype: '',
        apmltoMail: '',
        transmitName: '',
        transmitValue: '',
        formValidate: {
          _mt:  this.$global.mt+'PlatAprvmailto.addOrUpd',
          apmltoContact: '',
          apmltoCondition: '',
          apmltoConditiondis: '',
          apmltoIsvalid: '1',
          funId: '1',
        },
      }
    },
    props: {
      logType: '',
      conttype: '',
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
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatAprvmailto.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.apmltoContact = res.data.content[0].apmltoContact
            t.apmltoContactDis = res.data.content[0].apmltoContactDis
            t.formValidate.apmltoCondition = res.data.content[0].apmltoCondition
            t.formValidate.apmltoConditiondis = res.data.content[0].apmltoConditiondis
            t.apmltoConttype = res.data.content[0].apmltoConttype
            t.apmltoMail = res.data.content[0].apmltoMail
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
        data.logType = '修改'
        data.id = t.$store.state.platApproval.childId3
        data.apmltoType = t.conttype
        data.apmltoConttype = t.apmltoConttype
        data.apmltoMail = t.apmltoMail
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('platApproval/updateArrayChildTable3', res.data.content[0])
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
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatAprvmailto.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getData()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {},
          })
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'yesno',
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
        t.formValidate.apmltoContact = ''
        t.apmltoContactDis = ''
        t.formValidate.apmltoCondition = ''
        t.formValidate.apmltoConditiondis = ''
        t.$refs.formValidate.resetFields()
      },
       generConditionNow(id) {
      	const t = this
      	if (t.formValidate.apmltoConditiondis && t.formValidate.apmltoCondition) {
      		t.transmitName = t.formValidate.apmltoConditiondis
	      	t.transmitValue = t.formValidate.apmltoCondition
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
      	t.formValidate.apmltoCondition = value
        t.formValidate.apmltoConditiondis = name
      },
      clearCondition() {
        const t = this
        t.formValidate.apmltoCondition = ''
        t.formValidate.apmltoConditiondis = ''
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
