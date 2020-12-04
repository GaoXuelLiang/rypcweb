<template>
  <div class="option-main">
    <Row class="form_box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16" style="margin-right: 10px;"></Icon
          >{{ logType }}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form
        class="form"
        ref="upFormData"
        :model="upFormData"
        :rules="ruleValidate"
        :label-width="135"
      >
        <Row>
          <Col span="10" offset="1" v-if="logType===$t('button.eft')">
          <!-- <Col span="10" offset="1"> -->
            <FormItem label="生效日期" prop="validTime">
              <DatePicker
                v-model="upFormData.validTime"
                :editable="false"
                :transfer="true"
                type="date"
                placeholder="请选择生效日期"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="失效日期" prop="invalidTime" >
              <DatePicker
                v-model="upFormData.invalidTime"
                :editable="false"
                :transfer="true"
                type="date"
                placeholder="请选择失效日期"
                style="width: 100%;"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <!-- logType!==$t('button.eft') -->
        <Row v-if="logType!==$t('button.eft') && isReason">
          <Col span="21" offset="1">
            <FormItem label="失效原因" prop="memo">
              <Input
                v-model="upFormData.memo"
                type="textarea"
                placeholder="请输入失效原因"
                :autosize="{minRows:2,maxRows:4}"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <Row type="flex" justify="end">
              <FormItem>
                <Button @click="handleReset">{{$t('button.cal')}}</Button>
                <Button
                  type="primary"
                  @click="handleSubmit"
                  style="margin-left: 5px"
                  >{{$t('button.sav')}}</Button
                >
              </FormItem>
            </Row>
          </Col>
        </Row>
      </Form>
    </Row>
  </div>
</template>
<script>
import { isSuccess, deepCopy } from "@/lib/util";
import { getDataLevelUserLoginData } from "@/axios/axios";
export default {
  data() {
    return {
      isValid: "",
      btnStatic: "",
      setStatus: ".setStatus",
      validId: "",
      tbName: "",
      upFormData: {
        id: "",
        validTime: "",
        invalidTime: "",
        memo: ""
      },
    };
  },
  components: {},
  props: {
    dom:Object,
    logType: String,
    ruleValidate:Object,
    isReason:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
  },
  computed: {},
  methods: {
    handleSubmit() {
      const t = this;
      // debugger
      // 生效时间
      let validTime;
      let invalidTime;
      t.validId = t.dom.tableselected.toString();
      if(this.upFormData.validTime){
        validTime = (new Date(this.upFormData.validTime)).getTime();
      }
      // 失效时间
      if(this.upFormData.invalidTime){
        invalidTime = (new Date(this.upFormData.invalidTime)).getTime();
      }
      if (validTime && invalidTime) {
        if(validTime > invalidTime){
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: "失效日期不能小于生效日期！"
          });
          return;
        }
      }
      // 生效
      if (t.logType === this.$t('button.eft')) {
        t.btnStatic = "02valid";
      }
      if (t.logType === this.$t('button.fai')) {
        t.btnStatic = "03invalid";
      }
      t.$refs.upFormData.validate((valid) => {
        let time1;
        let time2;
        if(this.upFormData.validTime){
          time1 = (this.upFormData.validTime).format('yyyy-MM-dd');
        }
        if(this.upFormData.invalidTime){
          time2 = (this.upFormData.invalidTime).format('yyyy-MM-dd');
        }
        if (valid) {
          let data = {
            _mt: this.$global.mt + t.dom.tbName + '.setStatus',
            APfunId: "1",
            APlogType: t.logType,
            APstatus: t.btnStatic,
            APids: t.validId,
            APsdate: time1,
            APedate: time2,
            APinvreason: t.upFormData.memo
          };
          for(let v in data){
            if(data[v]===undefined||data[v]===''){
              delete data[v]
            }
          }
          getDataLevelUserLoginData(data)
            .then(res => {
              if (isSuccess(res, t)) {
                this.clear();
                this.close();
                t.dom.getData();
                t.dom.getTree();
              }
            })
            .catch(() => {
              t.$Modal.error({
                title: this.$t("reminder.err"),
                content: this.$t("reminder.errormessage")
              });
            });

        }
      })
    },
    handleReset() {
      this.close();
    },
    close() {
      this.$emit("closeValid");
      this.$refs.upFormData.resetFields();
      this.clear()
    },
    clear() {
      this.upFormData.id = "";
      this.upFormData.validTime = "";
      this.upFormData.invalidTime = "";
      this.upFormData.memo = "";
      this.$refs.upFormData.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "~@/sass/mainChildUpdate.scss";
.option-main {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-overflow-scrolling: touch;
  outline: 0;
  min-width: 1000px;
  overflow: auto;
  .form_box {
    position: relative;
    width: 900px;
    background-color: #fff;
    padding: 60px 20px 0px 20px;
    border-radius: 10px;
    .form {
      max-height: 500px;
      overflow-y: auto;
    }
    .title {
      display: flex;
      position: absolute;
      height: 40px;
      width: 100%;
      line-height: 40px;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      top: 0;
      border-bottom: 1px solid #efefef;
      left: 0;
      .title-text {
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}
</style>
