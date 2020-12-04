<template>
  <div class="cover">
    <div class="box">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          岗位发布编辑
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="135"
      >
        <Row>
          <Col span="10" offset="1">
            <FormItem label="招聘岗位">
              <Input
                v-model="porePostidDis"
                :placeholder="'请输入招聘岗位'"
                :disabled="true"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="公司">
              <Input
                v-model="poreUnitidDis"
                :placeholder="'请输入公司'"
                :disabled="true"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem label="部门">
              <Input
                v-model="poreDeptidDis"
                :placeholder="'请输入部门'"
                :disabled="true"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="编制人数">
              <Input
                v-model="formValidate.porePernum"
                :placeholder="'请输入编制人数'"
                :disabled="true"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem label="在编人数">
              <Input
                v-model="formValidate.poreCurpernum"
                :placeholder="'请输入在编人数'"
                :disabled="true"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem label="缺编人数">
              <Input
                v-model="formValidate.poreVacnum"
                :placeholder="'请输入缺编人数'"
                :disabled="true"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="招聘人数" prop="poreRecnum">
              <Input
                v-model="formValidate.poreRecnum"
                :placeholder="'请输入招聘人数'"
                :disabled="type === 2 ? true : false"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem label="任职条件" prop="poreServicenum">
              <Input
                v-model="formValidate.poreServicenum"
                type="textarea"
                :disabled="type === 2 ? true : false"
                :autosize="{ minRows: 2, maxRows: 5 }"
                :placeholder="$t('lang_platform.platCalendar.commentDis')"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem label="工作类容" prop="poreJobcontent">
              <Input
                v-model="formValidate.poreJobcontent"
                type="textarea"
                :disabled="type === 2 ? true : false"
                :autosize="{ minRows: 2, maxRows: 5 }"
                :placeholder="$t('lang_platform.platCalendar.commentDis')"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem label="双选活动">
              <Input
                v-model="formValidate.poreAcmid"
                :placeholder="'请输入双选活动'"
                :disabled="true"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="岗位发布截止日期">
              <DatePicker
                v-model="poreAcmidReledeadlineDis"
                type="date"
                :placeholder="'请选择岗位发布截止日期'"
                :editable="false"
                style="width: 200px"
                :disabled="true"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem label="开始日期">
              <DatePicker
                v-model="poreAcmidSdateDis"
                type="date"
                :placeholder="'请选择开始日期'"
                :editable="false"
                style="width: 200px"
                :disabled="true"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="结束日期">
              <DatePicker
                v-model="poreAcmidEdateDis"
                type="date"
                :placeholder="'请选择结束日期'"
                :editable="false"
                style="width: 200px"
                :disabled="true"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem label="状态">
              <Select
                class="sInput"
                v-model="poreStatusDis"
                style="width: 200px"
                :disabled="true"
              >
                <Option value="待发布">待发布</Option>
                <Option value="已发布">已发布</Option>
                <Option value="已撤销">已撤销</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <FormItem label="备注" prop="comment">
              <Input
                v-model="formValidate.comment"
                type="textarea"
                :disabled="type === 2 ? true : false"
                :autosize="{ minRows: 2, maxRows: 5 }"
                :placeholder="$t('lang_platform.platCalendar.commentDis')"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="21" offset="1">
            <Row type="flex" justify="end">
              <FormItem>
                <Button @click="handleReset" style="margin-left: 8px">{{
                  type === 2 ? "关闭" : $t("button.cal")
                }}</Button>
                <Button
                  v-show="type !== 2"
                  type="primary"
                  style="margin-left: 8px"
                  @click="handleSubmit"
                  >{{ $t("button.sav") }}</Button
                >
              </FormItem>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "../../../axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
  data() {
    // 时间校验
    const validate = (rule, value, callback) => {
      console.log(rule);
      if (
        new Date(this.formValidate.acmSdate).getTime() >=
        new Date(this.formValidate.acmEdate).getTime()
      ) {
        if (rule.field === "acmSdate") {
          callback(new Error("开始时间必须小于结束时间"));
        }
        if (rule.field === "acmEdate") {
          callback(new Error("结束时间必须大于开始时间"));
        }
      } else {
        callback();
      }
    };

    return {
      spinShow: false,
      id: "",
      isSpin: false,
      updatedId: "",
      selectDateType: [],
      selectHolidayType: [],
      porePostidDis: "",
      poreUnitidDis: "",
      poreDeptidDis: "",
      poreStatusDis: "",
      poreAcmidSdateDis: "",
      poreAcmidEdateDis: "",
      poreAcmidReledeadlineDis: "",
      formValidate: {
        id: "",
        _mt: this.$global.mt + "OrgPostrelease.addOrUpd",
        APfunId: 2,
        APlogType: "新增",
        porePostid: "",
        poreUnitid: "",
        poreDeptid: "",
        porePernum: "",
        poreCurpernum: "",
        poreVacnum: "",
        poreRecnum: "",
        poreServicenum: "",
        poreJobcontent: "",
        poreAcmid: "",
        poreStatus: "",
        comment: "",
      },
      ruleValidate: {
        poreRecnum: [
          {
            required: true,
            message: "招聘人数不能为空",
            trigger: "change",
          },
        ],
        poreServicenum: [
          {
            required: true,
            message: "任职条件不能为空",
            trigger: "change",
          },
        ],
        poreJobcontent: [
          {
            required: true,
            message: "工作内容不能为空",
            trigger: "change",
          },
        ],
      },
    };
  },
  props: {
    type: Number,
    updateId: String,
  },
  updated() {},
  mounted() {
    // this.getSelect();
    // this.getHolidaySelect();
    // if (this.type !== 0) {
    //   this.getData();
    // }
  },
  methods: {
    addNewArray(res) {
      const t = this;
      t.data.unshift(res);
    },
    getData() {
      const t = this;
      getDataLevelUserLoginData({
        _mt: this.$global.mt + "OrgPostrelease.getById",
        APid: t.updateId,
        APffk: 0,
      })
        .then((res) => {
          console.log(res.data, "进来了");

          if (isSuccess(res, t)) {
            // if (JSON.stringify(res.data.content[0]) !== "{}") {
            t.formValidate.porePostid = res.data.content[0].porePostid;
            t.formValidate.poreUnitid = res.data.content[0].poreUnitid;
            t.formValidate.poreDeptid = res.data.content[0].poreDeptid;
            t.formValidate.porePernum = res.data.content[0].porePernum;
            t.formValidate.poreCurpernum = res.data.content[0].poreCurpernum;
            t.formValidate.poreVacnum = res.data.content[0].poreVacnum;
            t.formValidate.poreRecnum = res.data.content[0].poreRecnum;
            t.formValidate.poreServicenum = res.data.content[0].poreServicenum;
            t.formValidate.poreJobcontent = res.data.content[0].poreJobcontent;
            t.formValidate.poreAcmid = res.data.content[0].poreAcmid;
            t.formValidate.poreStatus = res.data.content[0].poreStatus;
            t.formValidate.id = res.data.content[0].id;
            t.poreAcmidSdateDis = new Date(
              res.data.content[0].poreAcmidSdateDis
            ).format("yyyy-MM-dd");
            t.poreAcmidEdateDis = new Date(
              res.data.content[0].poreAcmidEdateDis
            ).format("yyyy-MM-dd");
            t.poreAcmidReledeadlineDis = new Date(
              res.data.content[0].poreAcmidReledeadlineDis
            ).format("yyyy-MM-dd");
            t.poreDeptidDis = res.data.content[0].poreDeptidDis;
            t.porePostidDis = res.data.content[0].porePostidDis;
            t.poreUnitidDis = res.data.content[0].poreUnitidDis;
            t.poreStatusDis = res.data.content[0].poreStatusDis;
        
            console.log(t.formValidate);
            // }
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        })
        .finally(() => {
          this.spinShow = false;
        });
    },
    handleSubmit() {
      const t = this;
      let data = deepCopy(t.formValidate);
      data.APlogType = t.type === 0 ? "新增" : "修改";

      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          getDataLevelUserLoginData(data)
            .then((res) => {
              //   t.isSpin = false;
              if (isSuccess(res, t)) {
                this.$refs.formValidate.resetFields();
                this.id = "";
                t.$emit("closeUp");
                t.$emit("getData");

                t.$Modal.success({
                  title: this.$t("reminder.suc"),
                  content: "修改成功",
                });
              }
            })
            .catch(() => {
              t.isSpin = false;
              this.$Modal.error({
                title: this.$t("reminder.err"),
                content: this.$t("reminder.errormessage"),
              });
            });
        }
      });
    },
    handleReset() {
      this.$emit("closeUp");
      this.$refs.formValidate.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.cover .box[data-v-2148daf7] {
  max-height: 100%;
}
</style>
