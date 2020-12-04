<template>
  <div class="cover">
    <div class="box">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          确定撤销原因
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
          <Col span="21" offset="1">
            <FormItem label="撤销原因">
              <Input
                v-model="formValidate.comment"
                type="textarea"
                :disabled="type === 2 ? true : false"
                :autosize="{ minRows: 2, maxRows: 5 }"
                :placeholder="'请输入撤销原因'"
              ></Input>
              <div style="font-weight: bold">
                撤销后不可回复！请根据实际业务处理。
              </div>
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
                  type="primary"
                  style="margin-left: 8px"
                  @click="handleSubmit"
                  >{{ "确定" }}</Button
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
        APlogType: "撤销",
        comment: "",
      },
      ruleValidate: {
        comment: [
          {
            required: true,
            message: "招聘人数不能为空",
            trigger: "change",
          },
        ],
      },
    };
  },
  props: {
    list: String,
    type: String
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
    getData() {},
    handleSubmit() {
      const t = this;
      console.log(t.list);

      t.$Modal.confirm({
        title: t.$t("reminder.remind"),
        content: "是否撤销",
        onOk: () => {
          getDataLevelUserLoginData({
            _mt: t.$global.mt + "OrgPostrelease.updStatus",
            APlogType: "撤销",
            APnpacid: t.list,
            APupdstatus: "03statusType",
            poreRevocation: t.formValidate.comment
          })
            .then((res) => {
              if (isSuccess(res, t)) {
                if (res.data.content[0].value === 1) {
                  t.$Message.success({
                    title: t.$t("reminder.err"),
                    content: "撤销成功",
                  });
                }

                t.formValidate.comment = "";
                t.$emit("closeUp");
                t.$emit("getData");
              }
            })
            .catch(() => {
              t.$Modal.error({
                title: t.$t("reminder.err"),
                content: t.$t("reminder.errormessage"),
              });
            });
        },
        onCancel: () => {},
      });
    },
    handleReset() {
      this.formValidate.comment = "";
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
