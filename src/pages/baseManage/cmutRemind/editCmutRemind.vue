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
      <div class="option-main">
        <Row style="max-height: 420px;overflow-y: auto;">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135">
              <i-col span="10" offset="1">
                <FormItem label="发送时间" prop="msgTime"  >
                  <Input disabled readonly v-model="formValidate.msgTime" ></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="1">
                <FormItem label="业务类型" prop="msgBustype">
                  <Input disabled readonly v-model="formValidate.msgBustype" ></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="1">
                <FormItem label="单据" prop="msgDataid" >
                  <Input disabled readonly v-model="formValidate.msgDataid" ></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="1">
                <FormItem label="接收人" prop="msgSendee" >
                  <Input disabled readonly v-model="formValidate.msgSendee" ></Input>
                </FormItem>
              </i-col>
              <i-col span="21" offset="1">
                <FormItem label="消息标题" prop="msgTitle"  >
                  <Input disabled v-model="formValidate.msgTitle" ></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="1">
                <FormItem label="是否阅读" prop="msgReadflag" >
                  <RadioGroup v-model="formValidate.msgReadflag" placeholder="选择是否有效" type="button" size="small">
                    <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoName}}</Radio>
                  </RadioGroup>
                </FormItem>
              </i-col>
              <i-col span="10" offset="1">
                <FormItem label="是否极光推送" prop="msgJpush" >
                  <RadioGroup v-model="formValidate.msgJpush" placeholder="选择是否极光推送" type="button" size="small">
                    <Radio :label="item.paramCode" v-for="(item,index) in radioYesOrNo" :key="index">{{item.paramInfoName}}</Radio>
                  </RadioGroup>
                </FormItem>
              </i-col>
            <i-col span="21" offset="1">
              <FormItem label="消息数据来源" prop="msgDatasource" >
                <Input disabled readonly v-model="formValidate.msgDatasource" ></Input>
              </FormItem>
            </i-col>
              <i-col span="10" offset="1">
                <FormItem label="推送平台" prop="msgJpushplatform" >
                  <Input disabled readonly v-model="formValidate.msgJpushplatform" ></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="1">
                <FormItem label="推送类型" prop="msgJpushtype" >
                  <Input disabled readonly v-model="formValidate.msgJpushtype" ></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="1">
                <FormItem label="推送状态" prop="msgJpushstatus">
                  <Input disabled readonly v-model="formValidate.msgJpushstatus" ></Input>
                </FormItem>
              </i-col>
              <i-col span="21" offset="1">
                <FormItem label="推送错误信息" prop="msgJpusherror">
                  <Input disabled readonly v-model="formValidate.msgJpusherror" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                </FormItem>
              </i-col>
              <i-col span="21" offset="1">
                <FormItem label="备注" prop="msgComment">
                  <Input disabled readonly v-model="formValidate.msgComment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                </FormItem>
              </i-col>
          </Form>
          <Row>
            <Col span="21" offset="1">
            <Row type="flex" justify="end">
                <!-- <Button @click="handleReset" style="margin-left: 8px">{{$t('button.cal')}}</Button> -->
                <Button @click="handleReset" style="margin-left: 8px">取消</Button>
            </Row>
            </Col>
          </Row>
        </Row>
        <!-- <Button @click="handleReset" class="btn">取消</Button> -->
      </div>
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
        radioYesOrNo: [],
        formValidate: {
          msgBustype: '',
          msgDataid: '',
          msgSendee: '',
          msgTitle: '',
          msgContent: '',
          msgDatasource: '',
          msgJpushplatform: '',
          msgJpushtype: '',
          msgJpusherror: '',
          msgJpushstatus: '',
          msgComment: '',
          msgJpush: '1',
          msgReadflag: '1',
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
          _mt:  this.$global.mt+'BaseMsgrecord.getById',
          APid: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.msgTime = res.data.content[0].msgTime
            t.formValidate.msgBustype = res.data.content[0].msgBustype
            t.formValidate.msgDataid = res.data.content[0].msgDataid
            t.formValidate.msgSendee = res.data.content[0].msgSendee
            t.formValidate.msgTitle = res.data.content[0].msgTitle
            t.formValidate.msgContent = res.data.content[0].msgContent
            t.formValidate.msgDatasource = res.data.content[0].msgDatasource
            t.formValidate.msgJpush = res.data.content[0].msgJpush
            t.formValidate.msgJpushplatform = res.data.content[0].msgJpushplatform
            t.formValidate.msgJpushtype = res.data.content[0].msgJpushtype
            t.formValidate.msgJpushstatus = res.data.content[0].msgJpushstatus
            t.formValidate.msgJpusherror = res.data.content[0].msgJpusherror
            t.formValidate.msgComment = res.data.content[0].msgComment
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
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        }).finally(()=>{
          t.spinShow = false;
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  // .option-main{
  //   position: relative;
  //   height: 500px;
  //   .btn{
  //     position: absolute;
  //     bottom: 20px;
  //     right: 20px;
  //   }
  // }
</style>
