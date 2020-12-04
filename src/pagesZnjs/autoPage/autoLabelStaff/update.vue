<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;{{ logType }}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row>
        <Button type="primary" @click="openUp('选择员工')">选择员工</Button>
      </Row>
      <Row style="margin-top: 10px" class="table">
        <Table
          stripe
          @on-select="selectedtable"
          @on-select-cancel="selectedtable"
          @on-select-all="selectedtable"
          @on-select-all-cancel="selectedtable"
          border
          :loading="loading"
          :no-data-text="noDataImg"
          height="320"
          size="small"
          ref="selection"
          :columns="searchCloumns"
          :data="staffTag"
        >
          <template
            slot-scope="{ row, index }"
            slot="action"
            style="height: 100%"
          >
            <div style="overflow-x: auto; width: 100%; height: 100%">
              <Spin fix v-if="isSpinTable" size="large"></Spin>
              <Tag
                type="dot"
                :name="item.id"
                closable
                color="blue"
                @on-close="delTag(item.id, row.empTagList, index)"
                v-for="(item, i) in row.empTagList"
                :key="i"
                >{{ item.tagName }}</Tag
              >
            </div>
          </template>
          <template slot-scope="{ row, index }" slot="action1">
            <Button size="small" type="primary" @click="btnFunction(row)"
              >添加标签
            </Button>
          </template>
        </Table>
      </Row>
      <Row style="text-align: right; margin-top: 10px">
        <Button type="primary" @click="submitTag">保存</Button>
      </Row>
    </div>
    <!--<transition name="fade">-->
    <!--<autoSearchtable-->
    <!--v-if="showModal"-->
    <!--@closeUp="closeModal"-->
    <!--modiaContent="emp-base-std"-->
    <!--@changeinput="changeinput1"-->
    <!--&gt;-->
    <!--</autoSearchtable>-->
    <!--</transition>-->
    <transition name="fade">
      <staffPage
        v-show="showModal"
        @satffList="satffChange"
        :logType="logType"
        ref="staffPage"
        @hideMsg="hideMsg"
        @changeinput="changeinput"
      ></staffPage>
    </transition>
    <transition name="fade">
      <updateTag
        v-show="updateTag"
        ref="tagList"
        @changeTag="changeTag"
        @closeUpd="closeTag"
      ></updateTag>
    </transition>

    <div class="mask" v-show="maskFlag"></div>
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
import updateTag from "./updateTag.vue";
import staffPage from "./staffPage.vue";
export default {
  data() {
    return {
      maskFlag: false,
      isSpinTable: false,
      data: [],
      showModal: false,
      noDataImg: '<div id="noData"></div>',
      updateTag: false,
      tableheight: document.body.offsetHeight - 592,
      ulheight: document.body.offsetHeight - 280 - 38,
      tableselected: [],
      id: Number,
      total: 0,
      loading: false,
      params: {
        _mt: this.$global.mt + "EmpAcceptrec.getPage",
        APid: "",
        APsort: "id",
        APorder: "desc",
        AProws: 10,
        APpage: 1,
        APffk: "glc1860",
        APfunId: 1860,
        APsign: "",
        APstatus: "01all",
      },
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
      staffTag: [],
      tagArray1: [],
      tagArray2: [],
      tagColor: [
        "blue",
        "green",
        "orange",
        "red",
        "yellow",
        "purple",
        "pink",
        "Cyan",
      ],
      searchCloumns: [
        {
          type: "selection",
          width: 100,
          align: "center",
        },
        {
          title: "已选员工",
          align: "center",
          children: [
            {
              title: "公司",
              key: "empUnitidDis",
              align: "center",
              width: 100,
            },
            {
              title: "姓名",
              key: "empName",
              align: "center",
              width: 100,
            },
          ],
        },
        {
          title: "标签库",
          slot: "action",
          align: "center",
        },
        {
          title: "添加标签",
          slot: "action1",
          align: "center",
          width: 100,
        },
      ],
      // tagNum: 0,
    };
  },
  props: {
    logType: String,
    empkiEmpid: String
  },
  computed: {
    funId() {
      return this.$store.state.user.funId;
    },
  },
  updated() {},
  mounted() {
    // this.getHeight();
  },
  methods: {
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        let obj = {};
        obj["id"] = selection[i].id;
        obj["empTag"] = selection[i].empTagList;
        // obj["tagNum"] = random(1, 7);
        newArr.push(obj);
      }
      this.tableselected = newArr;
      // console.log(this.tableselected);
    },
    btnFunction(row) {
      const t = this;
      t.updateTag = true;
      if(this.tableselected.length == 0){
        this.tableselected = [];
      }
      t.$refs.tagList.getData(row.id);
    },
    sizeChange(size) {
      const t = this;
      t.params.AProws = size;
      t.getData(t.params);
    },
    pageChange(page) {
      const t = this;
      t.params.APpage = page;
      t.getData(t.params);
    },
    // getHeight() {
    //   const tagTextHeight = this.$refs.tagText;
    //   const tagColChildHeight = this.$refs.tagColChild;
    //   if (this.$refs.tagText.length === 0) {
    //     return;
    //   }
    //   for (let i = 0; i < tagTextHeight.length; i++) {
    //     tagTextHeight[i].style.width = this.$refs.selectTag.scrollWidth + "px";
    //   }
    //   for (let i = 0; i < tagColChildHeight.length; i++) {
    //     tagColChildHeight[i].style.width =
    //       this.$refs.tagCol.scrollHeight + "px";
    //   }
    // },
    enter(index) {
      this.$refs.tagStaff[index].style.backgroundColor = "#ebf7ff";
      this.$refs.tagText[index].style.backgroundColor = "#ebf7ff";
      this.$refs.tagEmp[index].style.backgroundColor = "#ebf7ff";
      let ref = this.$refs.tagText;
      for (let i = 0; i < ref.length; i++) {
        ref[i].style.width = this.$refs.selectTag.scrollWidth + "px"; // 有一个线条得Bug 因此要让他的子元素等于父元素得滚动距离
      }
    },
    leave(index) {
      this.$refs.tagStaff[index].style.backgroundColor = "";
      this.$refs.tagText[index].style.backgroundColor = "";
      this.$refs.tagEmp[index].style.backgroundColor = "";
    },
    openUp(logType) {
      const t = this;
      this.showModal = true;
      t.$refs.staffPage.getData();
    },
    getCode() {
      const t = this;
      getDataLevelUserLoginData({
        _mt: "competenceType.getCode",
        logType: "编号",
      })
        .then((res) => {
          if (isSuccess(res, t)) {
            t.formValidate.competNo = res.data.content[0].value;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    getData(id) {
      const t = this;
      t.loading = true;
      if (id) {
        t.id = id;
        getDataLevelUserLoginData({
          _mt: "competenceType.getById",
          logType: this.$t("button.upd"),
          id: id,
        })
          .then((res) => {
            if (isSuccess(res, t)) {
              t.formValidate.competNo = res.data.content[0].competNo;
              t.formValidate.competName = res.data.content[0].competName;
              t.formValidate.competDesc = res.data.content[0].competDesc;
              t.formValidate.competRemark = res.data.content[0].competRemark;
            }
          })
          .catch(() => {
            this.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage"),
            });
          });
      }
    },
    submitTag() {
      const t = this;
      // console.log(this.tableselected, "选择判断");

      if (this.tableselected.length == 0) {
        this.$Modal.error({
          title: this.$t("reminder.err"),
          content: "请至少选择一名员工",
        });
      } else {
        const msg = this.$Message.loading({
          content: "正在添加...",
          duration: 0,
        });
        t.isSpinTable = true;
        t.maskFlag = true;

        const array = [];
        for (let i = 0; i < this.tableselected.length; i++) {
          let obj = {};
          obj["id"] = this.tableselected[i].id;
          const arr = [];
          if (t.tableselected[i].empTag) {
            t.tableselected[i].empTag.forEach((item) => {
              arr.push(item.id);
            });
          }
          obj["empTag"] = arr.join(",");
          array.push(obj);
        }
        const data = {};
        data._mt = this.$global.mt + "EmpInfo.tagAdd";
        data.APffk = t.funId;
        data.APlogType = "添加员工标签";
        data.tag = array;
        getDataLevelUserLoginData(data)
          .then((res) => {
            if (isSuccess(res, t)) {
              t.$Modal.success({
                title: this.$t("reminder.suc"),
                content: this.$t("reminder.addsuccess"),
              });
              t.isSpinTable = false;
              setTimeout(msg, 300);
              t.maskFlag = false;
              this.$emit("closeUpd");
              this.$emit("getTag", t.empkiEmpid);
              this.staffTag = [];
              this.tagArray = [];
              this.tableselected = [];
            }
          })
          .catch(() => {
            t.isSpinTable = false;
            this.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage"),
            });
            setTimeout(msg, 300);
          });
      }
    },
    handleReset() {
      this.$emit("closeUpd");
      this.staffTag = [];
      this.tableselected = [];
      this.tagArray = [];
    },
    hideMsg() {
      let t = this;
      t.showModal = false;
      // t.tagNum = random(1, 7);
    },
    satffChange(res) {
      const t = this;
      t.staffTag.push.apply(this.staffTag, res);
      t.staffTag = uniqObj(this.staffTag);
      let arrId = [];
      res.forEach((item) => {
        arrId.push(item.id);
      });
      t.getTag(arrId.toString());
    },
    getTag(id) {
      const t = this;
      if (id) {
        // console.log(id, "标签Id");
        t.id = id;
        getDataLevelUserLoginData({
          _mt: this.$global.mt + "EmpInfo.getByIds",
          APffk: t.funId,
          // APorder: "asc",
          APid: id,
        })
          .then((res) => {
            if (isSuccess(res, t)) {
              let arr = res.data.content[0].value;
              arr.forEach((item) => {
                if (item.empTagList) {
                } else {
                  item.empTagList = [];
                }
              });
              t.staffTag = arr;
            }
          })
          .catch(() => {
            this.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage"),
            });
          });
      }
    },
    /*
           弹出选择
        */
    closeModal() {
      this.showModal = false;
    },
    changeinput(value, id, type) {
      this.form.competTypeDis = value;
      this.form.competType = id;
    },
    opencompetType() {
      this.showModal = true;
    },
    opencompet() {
      this.form.competType = "";
      this.form.competTypeDis = "";
    },
    selectTag(id) {
      this.updateTag = true;
      this.$refs.tagList.getData(id);
    },
    closeTag() {
      this.updateTag = false;
      //        console.log(this.tagColor[random(1, 7)])
    },
    /*
     * 解析数据格式 例：1002_性格开朗_20  拿到第二个_后的数字
     * */
    // find(str, cha, num) {
    //   let x = str.indexOf(cha);
    //   for (let i = 0; i < num; i++) {
    //     x = str.indexOf(cha, x + 1);
    //   }
    //   return x;
    // },
    // delTag(e, name) {
    //   const t = this;
    //   const tabName = name.split("_")[0] + "_" + name.split("_")[1];
    //   for (let i = 0; i < t.staffTag.length; i++) {
    //     if (t.staffTag[i].id === name.substring(this.find(name, "_", 1) + 1)) {
    //       for (let j = 0; j < t.staffTag[i].empkiLabel.length; j++) {
    //         if (t.staffTag[i].empkiLabel[j].includes(tabName)) {
    //           t.staffTag[i].empkiLabel.splice(j, 1);
    //         }
    //       }
    //     }
    //   }
    // },
    delTag(id, tagList, index) {
      const t = this;

      // console.log(id, tagList, "删除标签");
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i].id === id) {
          tagList.splice(i, 1);
          t.staffTag[index].empTagList.splice(i, 1);
        }
      }
    },
    uniqArr(arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].id == arr[j].id) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
    changeTag(array, staffId, type) {
      // console.log(array, "标签", staffId, "ID", type, "type");
      if (type === "1") {
        // 添加到当前
        // console.log(this.staffTag, "1111111111111");
        for (let i = 0; i < this.staffTag.length; i++) {
          // 判断是否和数组中的员工id相等 如果相等添加
          if (this.staffTag[i].id === staffId) {
            if (this.staffTag[i].empTagList) {
              array.forEach((item) => {
                this.staffTag[i].empTagList.push(item);
              });
            } else {
              this.staffTag[i].empTagList = array;
            }
            // console.log(this.staffTag[i].empTagList, "去重前");
            this.staffTag[i].empTagList = this.uniqArr(
              this.staffTag[i].empTagList
            );
            // console.log(this.staffTag[i].empTagList, "去重后");
          }
        }
      }
      if (type === "2") {
        // 添加所有   否则不用考虑  直接添加
        for (let i = 0; i < this.staffTag.length; i++) {
          if (this.staffTag[i].empTagList) {
            array.forEach((item) => {
              this.staffTag[i].empTagList.push(item);
            });
          } else {
            this.staffTag[i].empTagList = array;
          }
          this.staffTag[i].empTagList = this.uniqArr(
            this.staffTag[i].empTagList
          );
        }
      }
    },
  },
  components: {
    updateTag,
    staffPage,
  },
};
</script>
<style lang="scss" scoped>
.mask {
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: 0.5;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
}
.table /deep/ .ivu-table th {
  border-bottom: 1px solid #dddddd !important;
  border-right: 1px solid #dddddd !important;
}
.table /deep/ .ivu-table-header thead tr th {
  background-color: #f5f5f5 !important;
}

.table /deep/ .ivu-table td {
  border-right: 1px solid #ddddee !important;
}

.table /deep/ .ivu-table-wrapper-with-border {
  border: 1px solid transparent !important;
  border-left: 1px solid #ddd !important;
  border-top: 1px solid #ddd !important;
}
// @import "~@/sass/undateAndAdd.scss";
// @import "~@/sass/updateAndAdd.scss"
.cover {
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
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-overflow-scrolling: touch;
  outline: 0;
  .box {
    position: relative;
    width: 1050px;
    background-color: #fff;
    padding: 50px 20px 10px 20px;
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
    .tagCol {
      overflow-y: auto;
      .tagColChild {
        border-right: 1px solid #dddee1;
        .selectStaff {
          width: 100%;
          height: 100%;
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
      }
    }

    .selectTag {
      width: 100%;
      font-size: 14px;
      color: #a4a4a4;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: auto;
      height: 100%;
      .tagLine {
        /*font-size: 0;*/
        /* letter-spacing: -3px;*/
        /*width:100%;*/
        border-bottom: 1px solid #dddee1;
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
