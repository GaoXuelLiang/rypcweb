<template>
  <div class="cover">
    <div class="box">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          内聘活动
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
            <FormItem label="活动类型" prop="acmType">
              <Select
                class="sInput"
                v-model="formValidate.acmType"
                style="width: 200px"
                :disabled="type === 2 ? true : false"
              >
                <Option value="双选">双选</Option>
                <Option value="竞聘">竞聘</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="活动名称" prop="acmName">
              <Input
                v-model="formValidate.acmName"
                :placeholder="'请输入活动名称'"
                :disabled="type === 2 ? true : false"
                style="width: 200px"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem label="开始时间" prop="acmSdate">
              <DatePicker
                v-model="formValidate.acmSdate"
                type="date"
                :placeholder="'请选择开始时间'"
                :editable="false"
                style="width: 200px"
                :disabled="type === 2 ? true : false"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="结束时间" prop="acmEdate">
              <DatePicker
                v-model="formValidate.acmEdate"
                type="date"
                :placeholder="'请选择结束时间'"
                :editable="false"
                style="width: 200px"
                :disabled="type === 2 ? true : false"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10" offset="1">
            <FormItem label="岗位发布截止日期" prop="acmReledeadline">
              <DatePicker
                v-model="formValidate.acmReledeadline"
                type="date"
                :placeholder="'请选择岗位发布截止日期'"
                :editable="false"
                style="width: 200px"
                :disabled="type === 2 ? true : false"
              ></DatePicker>
            </FormItem>
          </Col>

          <Col span="10" offset="1">
            <FormItem label="状态">
              <Select
                class="sInput"
                v-model="formValidate.acmStatus"
                style="width: 200px"
                :disabled="true"
              >
                <Option value="待生效">待生效</Option>
                <Option value="已生效">已生效</Option>
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
                  type !== 2 ? $t("button.cal") : "关闭"
                }}</Button>
                <Button
                  type="primary"
                  style="margin-left: 8px"
                  @click="handleSubmit"
                  v-show="type !== 2"
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
      } else if (rule.field === "acmReledeadline") {
        if (
          new Date(this.formValidate.acmReledeadline).getTime() >=
          new Date(this.formValidate.acmSdate).getTime()
        ) {
          callback(new Error("截止时间必须小于开始时间"));
        }
      } else {
        callback();
      }
    };

    return {
      spinShow: false,
      isSpin: false,
      updatedId: "",
      selectDateType: [],
      selectHolidayType: [],
      formValidate: {
        id: "",
        _mt: this.$global.mt + "OrgNpactmanage.addOrUpd",
        APfunId: 2,
        APlogType: "新增",
        acmType: "",
        acmName: "",
        acmSdate: "",
        acmEdate: "",
        acmReledeadline: "",
        acmStatus: "待生效",
        comment: "",
      },
      ruleValidate: {
        acmName: [
          {
            required: true,
            message: "活动名称不能为空",
            trigger: "change",
          },
        ],
        acmType: [
          {
            required: true,
            message: "活动类型不能为空",
            trigger: "change",
          },
        ],
        acmStatus: [
          {
            required: true,
            message: "状态不能为空",
            trigger: "change",
          },
        ],
        acmEdate: [
          {
            required: true,
            message: "结束时间不能为空",
            trigger: "change",
            type: "date",
          },
          {
            required: true,
            validator: validate,
            trigger: "blur",
          },
        ],
        acmSdate: [
          {
            required: true,
            message: "开始时间不能为空",
            trigger: "change",
            type: "date",
          },
          {
            required: true,
            validator: validate,
            trigger: "blur",
          },
        ],
        acmReledeadline: [
          {
            required: true,
            message: "岗位发布截止日期不能为空",
            trigger: "change",
            type: "date",
          },
          {
            required: true,
            validator: validate,
            trigger: "blur",
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
      t.spinShow = true;
      getDataLevelUserLoginData({
        _mt: this.$global.mt + "OrgNpactmanage.getById",
        APid: t.updateId,
        APffk: 0,
      })
        .then((res) => {
          if (isSuccess(res, t)) {
            if (JSON.stringify(res.data.content[0]) !== "{}") {
              t.formValidate.acmType = res.data.content[0].acmTypeDis;
              t.formValidate.acmName = res.data.content[0].acmName;
              t.formValidate.acmReledeadline =
                res.data.content[0].acmReledeadline;
              t.formValidate.acmSdate = res.data.content[0].acmSdate;
              t.formValidate.acmEdate = res.data.content[0].acmEdate;
              // t.formValidate.acmStatus = res.data.content[0].acmStatusDis;
              t.formValidate.comment = res.data.content[0].comment;
              t.formValidate.id = res.data.content[0].id;
            }
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
      data.acmStatus =
      data.acmStatus === "待生效" ? "takeType01" : "takeType02";
      data.acmType = data.acmType === "双选" ? "01twochoose" : "02making";
      data.acmSdate = new Date(data.acmSdate).format("yyyy-MM-dd");
      data.acmEdate = new Date(data.acmEdate).format("yyyy-MM-dd");
      data.acmReledeadline = new Date(data.acmReledeadline).format(
        "yyyy-MM-dd"
      );

      if (t.id) {
        data.id = t.id;
      }
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
                t.$refs.formValidate.resetFields();
                t.formValidate.acmStatus = "待生效";
                t.formValidate.id = "";
                t.id = "";
                t.$emit("closeUp");
                t.$emit("getData");
                if (t.type === 0) {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: this.$t("reminder.addsuccess"),
                  });
                } else {
                  t.$Modal.success({
                    title: this.$t("reminder.suc"),
                    content: "修改成功",
                  });
                }
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
      this.formValidate.acmStatus = "待生效";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
</style>
