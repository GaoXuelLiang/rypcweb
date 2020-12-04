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
      <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="135">
        <Row>
          <Col span="10" offset="1">
            <FormItem label="职务簇编号" prop="dutygrpCode">
              <Input v-model="formValidate.dutygrpCode" disabled placeholder="请输入职务簇编号"></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="职务簇名称" prop="dutygrpName">
              <Input v-model="formValidate.dutygrpName" placeholder="请输入职务簇名称"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem label="说明" prop="dutygrpDesc">
              <Input v-model="formValidate.dutygrpDesc" placeholder="请输入职务簇说明"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem :label="$t('lang_platform.platEmpno.comment')" prop="comment">
              <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('lang_platform.platEmpno.commentDis')"></Input>
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
        _mt:  this.$global.mt+'BaseDutygroup.addOrUpd',
        funId: "1",
        dutygrpCode: this.dutygrpCode,
        dutygrpName: "",
        dutygrpDesc: "",
        comment: "",
      },
      upFormData: {
        _mt:  this.$global.mt+'BaseDutygroup.getCode'
      },
      ruleValidate: {
        dutygrpCode: [
          { required: true, message: '请输入职务簇编号', trigger: 'blur' },
        ],
        dutygrpName: [
          { required: true, message: '请输入职务簇名称', trigger: 'blur' },
        ],
      },
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
        _mt:  this.$global.mt+'BaseDutygroup.getCode',
        logType: "编号"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.formValidate.dutygrpCode = res.data.content[0].value;
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
      if (id) {
        t.id = id;
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseDutygroup.getById',
          logType: this.$t("button.y.upd"),
          id: id
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.formValidate.dutygrpCode = res.data.content[0].dutygrpCode;
              t.formValidate.dutygrpName = res.data.content[0].dutygrpName;
              t.formValidate.dutygrpDesc = res.data.content[0].dutygrpDesc;
              t.formValidate.comment = res.data.content[0].comment;
            }
          })
          .catch(() => {
            this.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage")
            });
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
                t.$emit("closeUpd");
                if (t.logType === this.$t("button.add")) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess")
                  });
                  t.$refs.formValidate.resetFields();
                  t.$emit("getData", 1);
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$emit("update", res.data.content[0]);
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
	.cover{
	  position: fixed;
	  overflow: auto;
	  top: 0;
	  right: 0;
	  bottom: 0;
	  left: 0;
	  z-index: 1000;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background-color: rgba(0,0,0,.5);
	  -webkit-overflow-scrolling: touch;
	  outline: 0;
	  .box{
	    position:relative;
	    width: 900px;
	    background-color: #fff;
	    padding: 60px 20px 30px 20px;
	    border-radius: 10px;
	    .form{
	      max-height: 800px;
	      overflow-y: auto;
	    }
	    .title{
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
	      .title-text{
	        font-weight: bold;
	        font-size: 14px;
	      }
	    }
        .content{
            max-height: 400px;
            overflow:auto;
        }
	  }
	}
</style>
