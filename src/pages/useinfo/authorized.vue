<template>
  <div class="useInfoMain">
    <Form
      ref="formValidate"
      class="form"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="135"
    >
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;待办授权设置
        </div>
        <Button type="text" @click="back">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row style="margin-top: 20px">
        <i-col span="10" offset="1">
          <FormItem label="我的用户" prop="">
            <Input
              v-model="bstdahUseridDis"
              placeholder="登录名"
              disabled
            ></Input>
          </FormItem>
        </i-col>
        <i-col span="10" offset="1">
          <FormItem label="授权用户" prop="bstdahAuthuserid">
            <span @dblclick="clearDatazhil">
              <Input
                v-model="bstdahAuthuseridDis"
                icon="ios-search"
                :readonly="true"
                placeholder="请选择授权用户"
                @on-click="selectzhil"
              />
            </span>
          </FormItem>
        </i-col>
      </Row>
      <!-- 授权员工 -->
      <transition name="fade">
        <searchAuth
          v-show="openzhil"
          @closeUp="closeUp"
          :searchTitle="searchTitle"
          @changeinputZhil="changeinputZhil"
          ref="searchAuth"
        ></searchAuth>
      </transition>
      <Row>
        <i-col span="10" offset="1">
          <FormItem label="生效时间" prop="bstdahSdate">
            <DatePicker
              type="date"
              placeholder="选择生效时间"
              :editable="false"
              v-model="formValidate.bstdahSdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
        <i-col span="10" offset="1">
          <FormItem label="失效时间" prop="bstdahEdate">
            <DatePicker
              type="date"
              placeholder="选择失效时间"
              :editable="false"
              v-model="formValidate.bstdahEdate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </i-col>
      </Row>

      <Row>
        <i-col span="21" offset="1">
          <FormItem label="授权原因" prop="bstdahReason">
            <Input
              v-model="formValidate.bstdahReason"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请输入授权原因..."
            ></Input>
          </FormItem>
        </i-col>
      </Row>

      <Row>
        <i-col span="21" offset="1">
          <FormItem label="备注" prop="">
            <Input
              v-model="formValidate.comment"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请输入备注..."
            ></Input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="21" offset="1">
          <Row type="flex" justify="end">
            <FormItem style="margin: 0px">
              <!--              <Button type="primary" @click="changePhone">更换手机号</Button>-->
              <Button type="primary" @click="back">取消</Button>
              <Button type="primary" @click="save" style="margin-left: 10px">{{
                $t("button.sav")
              }}</Button>
            </FormItem>
          </Row>
        </i-col>
      </Row>
    </Form>
  </div>
</template>
<script>
import { getDataLevelUserLoginData, uploadimage } from "../../axios/axios";
import { isSuccess, deepCopy, getCookie } from "../../lib/util";
import valid from "../../lib/pub_valid";
import searchAuth from "./searchAuth";

export default {
  components: {
    searchAuth,
  },
  computed() {},
  data() {
    // 时间校验
    const validate = (rule, value, callback) => {
      if (value) {
        if (
          new Date(this.formValidate.bstdahSdate).getTime() >=
          new Date(this.formValidate.bstdahEdate).getTime()
        ) {
          if (rule.field === "bstdahSdate") {
            callback(new Error("生效时间必须小于失效时间"));
          }
          if (rule.field === "bstdahEdate") {
            callback(new Error("失效时间必须大于生效时间"));
          }
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    return {
      searchTitle: "请选择授权用户",
      bstdahAuthuseridDis: "",
      openzhil: false,
      bstdahUseridDis: this.$store.state.user.name,
      formValidate: {
        id: "",
        // 用户Id
        bstdahUserid: this.$store.state.user.userId,
        // 授权用户
        bstdahAuthuserid: "",
        // 生效时间
        bstdahSdate: "",
        // 失效时间
        bstdahEdate: "",
        // 授权原因
        bstdahReason: "",
        // 备注
        comment: "",
      },
      ruleValidate: {
        loginName: [
          { required: true, message: "请填写登录名", trigger: "blur" },
        ],
        bstdahReason: [
          {
            required: true,
            message: "请填写授权原因",
            trigger: "change",
          },
        ],
        bstdahSdate: [
          {
            required: true,
            pattern: /.+/,
            message: "请填写生效时间",
            trigger: "change",
          },
          {
            required: true,
            validator: validate,
            trigger: "blur",
          },
        ],
        bstdahEdate: [
          {
            required: true,
            pattern: /.+/,
            message: "请填写失效时间",
            trigger: "change",
          },
          {
            required: true,
            validator: validate,
            trigger: "blur",
          },
        ],
        bstdahAuthuserid: [
          {
            required: true,
            message: "请选择授权用户",
            trigger: "change",
          },
        ],
      },
    };
  },
  props: {
   
  },
  mounted() {},
  created() {},
  methods: {
    getAuthId() {
      const t = this;
      const data = {
        _mt: this.$global.mt + "BaseTodoauth.selectId",
        APid: getCookie("useId"),
      };
      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            if (JSON.stringify(res.data.content[0]) !== "{}") {
              t.formValidate.bstdahAuthuserid =
                res.data.content[0].bstdahAuthuserid;
              t.formValidate.bstdahEdate = res.data.content[0].bstdahEdate;
              t.formValidate.bstdahReason = res.data.content[0].bstdahReason;
              t.formValidate.bstdahSdate = res.data.content[0].bstdahSdate;
              t.formValidate.id = res.data.content[0].id;
              t.formValidate.comment = res.data.content[0].comment;
              t.bstdahAuthuseridDis = res.data.content[0].bstdahAuthuseridDis;
            }
          }
        })
        .catch((err) => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        })
        .finally(() => {
          t.loading = false;
          t.isSpin = false;
        });
    },
    // 选择授权人员
    selectzhil() {
      const t = this;
      t.$refs.searchAuth.getData();
      t.openzhil = true;
    },
    changeinputZhil(name, id) {
      const t = this;
      t.bstdahAuthuseridDis = name;
      t.formValidate.bstdahAuthuserid = id;
    },
    clearDatazhil() {
      const t = this;
      t.bstdahAuthuseridDis = "";
      t.formValidate.bstdahAuthuserid = "";
    },
    closeUp() {
      const t = this;
      t.openzhil = false;
    },
    back() {
      const t = this;
      // 清空表单内容
      t.bstdahAuthuseridDis = "";
      for (const e in t.formValidate) {
        t.formValidate[e] = "";
      }
      this.$emit("authclose");
      this.$refs.formValidate.resetFields();
    },
    save() {
      const t = this;
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          t.$Modal.confirm({
            title: this.$t("reminder.remind"),
            content:
              "授权后，在生效时间和失效时间内，您的待办系统将同时推送授权用户处理？",
            onOk: () => {
              t.saveAuth();
            },
            onCancel: () => {},
          });
        }
      });
    },
    saveAuth() {
      const t = this;
      const data = deepCopy(t.formValidate);
      data["_mt"] = this.$global.mt + "BaseTodoauth.addOrUpd";
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }

      if (data.id) {
        data["APlogType"] = "新增授权";
      } else {
        data["APlogType"] = "修改授权";
      }
      data.bstdahEdate = data.bstdahEdate === "" ? "" : new Date(data.bstdahEdate).format("yyyy-MM-dd");
      data.bstdahSdate = data.bstdahSdate === "" ? "" : new Date(data.bstdahSdate).format("yyyy-MM-dd");

      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            this.$Message.success({
              content: "保存成功",
            });
            t.back();
          }
        })
        .catch(() => {
          this.$Message.error({
            content: this.$t("reminder.errormessage"),
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
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
.useInfoMain {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  .userInfo_head {
    height: 140px;
    background: url(../../../static/img/userinfo_img.png) no-repeat center
      center;
    background-size: cover;
  }
  .form {
    position: relative;
    // border: 1px solid #efefef;
    background-color: #fff;
    border-radius: 6px;
    width: 835px;
    margin-left: auto;
    margin-right: auto;
    padding: 0px 0px 20px 0px;
    .userImg {
      width: 100%;
    }
    .header-box {
      position: absolute;
      display: flex;
      top: 50%;
      left: 50%;
      margin-top: -50px;
      margin-left: -50px;
      .header {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        overflow: hidden;
      }
      .header-cover {
        display: none;
        top: 0;
        right: 0;
        color: #fff;
        border-radius: 50%;
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
    .header-box:hover .header-cover {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .header-box:hover {
      cursor: pointer;
    }
  }
}
.backBtn {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #fff;
  font-size: 14px;
}
</style>
