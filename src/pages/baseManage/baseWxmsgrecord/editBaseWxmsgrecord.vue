<template>
  <div class="cover">
    <div class="box">
      <Spin size="large"
                  fix
                  v-if="spinShow"></Spin>
      <div  class="Box1">
        <!--:style="{height:tableheight + 'px'}"-->
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{logType}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form ref="formValidate" :model="formValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgTime')" prop="wxmsgTime">
            <Input v-model="formValidate.wxmsgTime" disabled></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgBustype')" prop="wxmsgBustype">
            <Input v-model="formValidate.wxmsgBustype"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgMsgtypeDis')" prop="wxmsgMsgtypeDis">
            <Input v-model="formValidate.wxmsgMsgtypeDis" disabled></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgDataid')" prop="wxmsgDataid">
            <Input v-model="formValidate.wxmsgDataid" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgSendee')" prop="wxmsgSendee">
            <Input v-model="formValidate.wxmsgSendee"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgTitle')" prop="wxmsgTitle">
            <Input v-model="formValidate.wxmsgTitle"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row style="position:relative;z-index: 0;">
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgContent')" prop="wxmsgContent">
            <Input v-model="formValidate.wxmsgContent" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgUrl')" prop="wxmsgUrl">
            <Input v-model="formValidate.wxmsgUrl"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.wxmsgDatasource')" prop="wxmsgDatasource">
            <Input v-model="formValidate.wxmsgDatasource"disabled ></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
          <FormItem :label="$t('lang_baseManage.wxMsgRecord.comment')" prop="wxmsgComment">
            <Input v-model="formValidate.wxmsgComment" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
  </div>
</template>
<script>
  import E from 'wangeditor'
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  let editor = new E('#editor')
  export default {
    data() {
      return {
        spinShow: false,
        formValidate: { },
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
      editor.customConfig.onchange = function (html) {
        document.getElementById('txt').innerHTML = html
      }
      editor.create()
    },
    methods: {
      getData(id) {
        const t = this;
        t.spinShow = true;
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseWxmsgrecord.getById',
          id: id,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate = res.data.content[0]
//            editor.txt.append(t.formValidate.wxmsgContent)
//            document.getElementById('txt').innerHTML = t.formValidate.wxmsgContent
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
      handleReset() {
        editor.txt.clear()
        this.$emit('closeUp')
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  // .Box1{
  //   overflow-y: scroll;
  // }
  // /deep/ .ivu-form{
  //   overflow-y: hidden;
  // }
  // /deep/ .ivu-form-label-right{
  //   overflow-y: hidden;
  // }
</style>
