<template>
  <div class="cover">
    <div class="box">
       <Spin size="large" fix v-if="spinShow"></Spin>
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
          <div ref="scrollBox" style="max-height: 420px;overflow-y: auto;">
            <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="135">
              <Row>
                <Col span="10" offset="1">
                  <FormItem label="序列编号" prop="seqCode">
                    <Input v-model="formValidate.seqCode" disabled ></Input>
                  </FormItem>
                </Col>
                <Col span="10" offset="1">
                  <FormItem label="序列名称" prop="seqName">
                    <Input v-model="formValidate.seqName" placeholder="请输入序列名称"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="21" offset="1">
                  <FormItem label="说明" prop="seqDesc">
                    <Input v-model="formValidate.seqDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.platEmpno.commentDis')"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="21" offset="1">
                  <FormItem :label="$t('lang_platform.platEmpno.comment')" prop="seqRemark" class="last-item">
                    <Input v-model="formValidate.seqRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.platEmpno.commentDis')"></Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            </div>
        </Row>
      </div>
      <Row class="row">
        <i-col span="21" offset="1" style="text-align:right;">
          <Button @click="handleReset" style="margin-right: 8px">{{$t('button.cal')}}</Button>
          <Button type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import valid from "../../../lib/pub_valid";

export default {
  data() {
    return {
      isSpin: false,
      selectType: [],
      id: Number,
      formValidate: {
        _mt:  this.$global.mt+'OrgPostseq.addOrUpd',
        funId: "1",
        seqCode: this.seqCode,
        seqName: "",
        seqDesc: "",
        seqRemark: "",
      },
      upFormData: {
        _mt:  this.$global.mt+'BaseDutygroup.getCode'
      },
      ruleValidate: {
        // seqCode: [
        //   { required: true, message: '请输入编号', trigger: 'blur' },
        // ],
        seqName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
      spinShow:false
    };
  },
  props: {
    logType: String
  },
  updated() {},
  mounted() {},
  methods: {
    getCode() {
      const t = this;
      getDataLevelUserLoginNew({
        _mt:  this.$global.mt+'OrgPostseq.getCode',
        logType: "编号"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.formValidate.seqCode = res.data.content[0].value;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          })
        });
    },
    getData(id) {
      const t = this;
      t.spinShow = true
      if (id) {
        t.id = id;
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'OrgPostseq.getById',
          logType: this.$t("button.y.upd"),
          id: id
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.formValidate.seqCode = res.data.content[0].seqCode;
              t.formValidate.seqName = res.data.content[0].seqName;
              t.formValidate.seqDesc = res.data.content[0].seqDesc;
              t.formValidate.seqRemark = res.data.content[0].seqRemark;
            }
          })
          .catch(() => {
            this.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage")
            });
          }).finally(()=>{
            t.spinShow = false
          });
      }
    },
    handleSubmit() {
      const t = this;
      const data = deepCopy(t.formValidate);
      data.logType = t.logType;
      if (t.logType === this.$t("button.y.upd")) {
        data.id = t.id;
      }
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          t.isSpin = true
          if (t.logType === "修改") {
            data.id = t.id;
          } else {
            delete data.id;
          }
          getDataLevelUserLoginNew(data)
            .then(res => {
              t.isSpin = false
              if (isSuccess(res, t)) {
                t.$emit('closeUpd')
                if (t.logType === this.$t("button.add")) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                  t.$refs.formValidate.resetFields();
                  t.$emit('addNewArray', res.data.content[0]);
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$emit('update', res.data.content[0]);
                }
              }
            })
            .catch(() => {
              t.isSpin = false
              this.$Modal.error({
                title: this.$t("reminder.err"),
                content: this.$t("reminder.errormessage")
              });
            });
        }else {
          t.$nextTick(() => {
            let tt = document.querySelectorAll('.ivu-form-item-error')
            tt[0].querySelector('.ivu-input').focus() // 无滚动的聚焦
            // t.$refs.scrollBox.scrollTop = tt[0].parentNode.parentNode.offsetTop - 100 // 有滚动的滚动到未填项
          })
        }
      });
    },
    handleReset() {
      this.$emit("closeUpd");
      this.$refs.formValidate.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
    @import "../../../sass/updateAndAdd";
    .last-item{
      margin-bottom: 0 !important;
    }
    .row{
        margin: 20px 0;
    }
</style>
