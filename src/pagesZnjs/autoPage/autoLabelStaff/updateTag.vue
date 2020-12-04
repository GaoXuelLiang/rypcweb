<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;新增
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row style="margin-top: 10px">
        <Col :style="'height:' + tableheight + 'px;border: 1px solid #dddee1;'">
          <h2 style="text-align: center">标签库</h2>
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: space-around;
              height: 17px;
            "
          >
            <div style="height: 18px"></div>
          </div>
          <div
            class="selectTag"
            ref="selectTag"
            :style="'height:' + ulheight + 'px;'"
          >
            <p class="tagLine" ref="tagText">
              <span class="tagtext" v-for="(item, index) in data" :key="index">
                  <Tag
                    checkable
                    :checked="checkedTag"
                    color="blue"
                    :name="item"
                    @on-change="changeTag"
                    style="margin-right: 5px"
                    >{{ item.tagName }}</Tag
                  >
              </span>
            </p>
          </div>
        </Col>
      </Row>
      <Row style="text-align: right; margin-top: 10px">
        <Button type="primary" @click="addStaff('1')">添加当前员工</Button>
        <Button type="primary" @click="addStaff('2')">添加所有已选员工</Button>
      </Row>
    </div>
  </div>
</template>
<script>
import {
  getDataLevelUserLoginNew,
  getDataLevelUserLogin,
  getDataLevelUserLoginData,
} from "../../../axios/axios";
import {
  isSuccess,
  deepCopy,
  uniqArr,
  uniqObj,
  random,
} from "../../../lib/util";
import valid from "../../../lib/pub_valid";

export default {
  computed: {
    funId() {
      return this.$store.state.user.funId;
    },
  },
  data() {
    return {
      selectType: [],
      data: [],
      showModal: false,
      checkedTag: false,
      tableheight: document.body.offsetHeight - 280,
      ulheight: document.body.offsetHeight - 280 - 38,
      id: Number,
      formValidate: {
        _mt: "competenceType.addOrUpd",
        funId: "1",
        competNo: this.competNo,
        competName: "",
        competDesc: "",
        competRemark: "",
      },
      upFormData: {
        _mt: "baseDutygroup.getCode",
      },
      ruleValidate: {
        competNo: [{ required: true, message: "请输入编号", trigger: "blur" }],
        competName: [
          { required: true, message: "请输入胜任类型", trigger: "blur" },
        ],
        competDesc: [
          { required: true, message: "请输入类型描述", trigger: "blur" },
        ],
      },
      tagArr: [], // 存入当前的员工标签的ID
      total: 0,
      index: 0,
      sort: "id",
      order: "desc",
      rows: 10,
      page: 1,
      staffId: "",
    };
  },
  conputed: {
    funId() {
      return this.$store.state.user.funId;
    },
  },
  props: {
    logType: String,
  },
  updated() {},
  mounted() {},
  methods: {
    changeTag(checked, name) {
      //   console.log(name, "name", checked, "checked");
      if (checked) {
        this.tagArr.push(name);
      } else {
        this.tagArr.forEach((item, index) => {
          if (this.tagArr.includes(name) && item === name) {
            this.tagArr.splice(index, 1);
          }
        });
      }
    },
    openUp() {
      this.showModal = true;
    },
    getData(id) {
      const t = this;
      t.staffId = id;
    //   console.log(t.staffId, "11111");
      const data = {
        _mt: this.$global.mt + "TagManage.getPage",
        APffk: t.funId,
        // logType: t.$t("button.ser"),
        AProws: "9999",
        APpage: t.page,
        APsort: "id",
        APorder: "desc",
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows;
            // console.log(res.data.content[0]);
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    addStaff(type) {
      const t = this;
      if (t.tagArr.length === 0) {
        t.$Message.warning({
          content: "选择不能为空",
          duration: 2,
        });
        return;
      }
    //   console.log(t.tagArr, t.staffId, type);
      this.$emit("closeUpd");
      this.$emit("changeTag", t.tagArr, t.staffId, type);
      t.data = [];
      t.tagArr = [];
    },
    handleReset() {
      this.$emit("closeUpd");
    },
  },
};
</script>
<style lang="scss" scoped>
// /deep/ .ivu-table th{
//   border:1px solid #e8eaec !important;
// }
// /deep/ .ivu-table-header thead tr th{
//   background-color:transparent !important;
// }
// /deep/ .ivu-table-wrapper-with-border{
//   border:1px solid #e8eaec !important;
// }

.cover {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-overflow-scrolling: touch;
  outline: 0;
  .box {
    position: relative;
    width: 800px;
    background-color: #fff;
    padding: 60px 20px 30px 20px;
    border-radius: 10px;
    .form {
      max-height: 800px;
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
    .content {
      max-height: 400px;
      overflow: auto;
    }
    .selectStaff {
      width: 100%;
      li {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #dddee1;
        line-height: 30px;
        span {
          display: inline-block;
        }
      }
      li:hover {
        background: #ebf7ff;
      }
    }
    .selectTag {
      width: 100%;
      font-size: 14px;
      color: #a4a4a4;
      white-space: normal;
      text-overflow: ellipsis;
      .tagLine {
        /*font-size: 0;*/
        /* letter-spacing: -3px;*/
        /*width:100%;*/
        /*border-bottom: 1px solid #dddee1;*/
        line-height: 30px;
        /*border-bottom: 1px solid #dddee1;*/
      }
      .tagtext {
        display: inline-block;
        text-align: left;
        padding-left: 10px;
        line-height: 30px;
      }
    }
  }
}
</style>
