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
        <Form ref="formValidate" disabled :model="formValidate" label-position="right" :label-width="135">
          <i-col span="10"  offset="1">
            <FormItem :label="$t('lang_flow.weixinCon.flwxrContactDis')" prop="flwxrContactDis">
              <Input v-model="flwxrContactDis" readonly ></Input>
            </FormItem>
          </i-col>
          <i-col span="10" offset="1">
            <FormItem :label="$t('lang_flow.weixinCon.flwxrIsvalid')" prop="flwxrIsvalid">
              <RadioGroup  v-model="formValidate.flwxrIsvalid" type="button" size="small">
                <Radio :label="item.paramCode" v-for="(item,index) in yesno" :key="index">{{item.paramInfoCn}}</Radio>
              </RadioGroup>
            </FormItem>
          </i-col>
          <i-col span="21" offset="1">
            <FormItem :label="$t('lang_flow.weixinCon.flwxrConditionDis')"  prop="flwxrConditionDis">
              <span @dblclick="clearCondition">
                <Input v-model="formValidate.flwxrConditionDis" readonly="readonly" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_flow.weixinCon.p_flwxrConditionDis')" class="settlement"></Input>
              </span>
              <Button type="primary" @click="generConditionNow(NaN,'条件设置')">{{$t('lang_flow.flowcommon.plat_condition')}}</Button>
            </FormItem>
          </i-col>
        </Form>
        <i-col span="21"
                       offset="1">
                    <row type="flex"
                         justify="end"
                         class="treebtn"
                         style="margin-top:20px">
                        <Button @click="close">{{$t('button.cal')}}</Button>
                    </row>
                </i-col>
      </Row>
      <!-- <Button class="btn" type="primary" @click="save" disabled>{{$t('button.sav')}}</Button> -->
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
        id: '',
        openCondition: false,
        flwxrContactDis: '',
        flwxrIsvalidDis: '',
        yesno: [],
        flwxrMail: '',
        flwxrConttype: '',
        transmitName: '',
        transmitValue: '',
        formValidate: {
          _mt:  this.$global.mt+'PlatFlwxTo.addOrUpd',
          flwxrContact: '',
          flwxrCondition: '',
          flwxrConditionDis: '',
          flwxrIsvalid: '1',
          funId: '1',
        },
      }
    },
    props: {
      logType: String,
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
          _mt:  this.$global.mt+'PlatFlwxTo.getById',
          id: id,
          logType: this.$t('button.ser'),
          funId: '1',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.flwxrContact = res.data.content[0].flwxrContact
            t.flwxrContactDis = res.data.content[0].flwxrContactDis
            t.formValidate.flwxrCondition = res.data.content[0].flwxrCondition
            t.formValidate.flwxrConditionDis = res.data.content[0].flwxrConditionDis
            t.flwxrConttype = res.data.content[0].flwxrConttype
            t.flwxrMail = res.data.content[0].flwxrMail
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
        data.flwxrConttype = t.flwxrConttype
        data.id = t.$store.state.flowStepData.childId7
        data.flwxrMail = t.flwxrMail
//        for (const dat in data) {
//          if (data[dat] === '') {
//            delete data[dat]
//          }
//        }
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            getDataLevelUserLoginNew(data).then((res) => {
              if (isSuccess(res, t)) {
                  t.$Modal.success({
                    title: this.$t('reminder.suc'),
                    content: this.$t('reminder.updsuccess'),
                  })
                  t.$store.commit('flowStepData/updateArrayChildTable7', res.data.content[0])
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
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatFlwxTo.delByIds',
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
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.yesno = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
//          this.$Modal.error({
//            title: this.$t('reminder.err'),
//            content: this.$t('reminder.errormessage'),
//          })
        })
      },
      clear() {
        const t = this
        t.formValidate.flwxrCondition = ''
        t.formValidate.flwxrConditionDis = ''
        t.$refs.formValidate.resetFields()
      },
       generConditionNow(id) {
      	const t = this
      	if (t.formValidate.flwxrConditionDis && t.formValidate.flwxrCondition) {
      		t.transmitName = t.formValidate.flwxrConditionDis
	      	t.transmitValue = t.formValidate.flwxrCondition
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
      	t.formValidate.flwxrCondition = value
        t.formValidate.flwxrConditionDis = name
      },
      clearCondition() {
        const t = this
        t.formValidate.flwxrCondition = ''
        t.formValidate.flwxrConditionDis = ''
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
