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
          <Col span="21" offset="1">
            <FormItem :label="$t('lang_organization.orgpost.pvfCode')" prop="pvfCode">
              <Input v-model="formValidate.pvfCode" :placeholder="$t('lang_organization.orgpost.pvfCodeInp')"></Input>
            </FormItem>
          </Col>
          <Col span="21" offset="1">
            <FormItem :label="$t('lang_organization.orgpost.pvfDuty')" prop="pvfDuty">
              <Input v-model="formValidate.pvfDuty"
                type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_organization.orgpost.pvfDutyInp')"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem :label="$t('lang_organization.orgpost.pvfWorkstandard')"  prop="pvfWorkstandard">
              <Input v-model="formValidate.pvfWorkstandard"
                type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_organization.orgpost.pvfWorkstandardInp')"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem :label="$t('lang_organization.orgpost.pvfAchievement')" prop="pvfAchievement">
              <Input v-model="formValidate.pvfAchievement"
                type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_organization.orgpost.pvfAchievementInp')"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem :label="$t('lang_organization.orgpost.pvfPerfstandard')" prop="pvfPerfstandard">
              <Input v-model="formValidate.pvfPerfstandard"
                type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_organization.orgpost.pvfPerfstandardInp')"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem :label="$t('lang_platform.platEmpno.comment')" prop="pvfRemark">
              <Input v-model="formValidate.pvfRemark"
                type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('lang_platform.platEmpno.commentDis')"></Input>
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
        _mt:  this.$global.mt+'OrgPostvaluefield.addOrUpd',
        funId: '',
        pvfCode: '', //价值领域类别
        pvfDuty: '', //主要工作职责
        pvfWorkstandard:'', // 岗位工作标准
        pvfAchievement: '', // 主要产出成果
        pvfPerfstandard: '', //绩效评价标准
        pvfRemark: '', // 备注
      },
      ruleValidate: {
        pvfCode: [
          { required: true, message: this.$t('lang_organization.orgpost.pvfCodeInp'), trigger: 'blur' },
        ],
        pvfDuty: [
          { required: true, message: this.$t('lang_organization.orgpost.pvfDutyInp'), trigger: 'blur' },
        ],
        pvfWorkstandard: [
          { required: true, message: this.$t('lang_organization.orgpost.pvfWorkstandardInp'), trigger: 'blur' },
        ],
        pvfAchievement: [
          { required: true, message: this.$t('lang_organization.orgpost.pvfAchievementInp'), trigger: 'blur' },
        ],
        pvfPerfstandard: [
          { required: true, message: this.$t('lang_organization.orgpost.pvfPerfstandardInp'), trigger: 'blur' },
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
    getData(id) {
      const t = this;
      if (id) {
        t.id = id;
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'OrgPostvaluefield.getById',
          logType: this.$t("button.y.upd"),
          id: id
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.formValidate.pvfCode = res.data.content[0].pvfCode;
              t.formValidate.pvfDuty = res.data.content[0].pvfDuty;
              t.formValidate.pvfWorkstandard = res.data.content[0].pvfWorkstandard;
              t.formValidate.pvfAchievement = res.data.content[0].pvfAchievement;
              t.formValidate.pvfPerfstandard = res.data.content[0].pvfPerfstandard;
              t.formValidate.pvfRemark =  res.data.content[0].pvfRemark;
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
      data.pvfBillid = this.$store.state.user.masterPublicId
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
                  t.$emit("getData", res.data.content[0]);
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.updsuccess")
                  });
                  t.$emit("update", res.data.content[0]);
                }
                t.$refs.formValidate.resetFields();
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
