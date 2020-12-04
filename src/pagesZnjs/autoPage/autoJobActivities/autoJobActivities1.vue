<template>
  <div class="table">
    <!-- 岗位发布管理 -->
    <Row>
      <Col span="24">
        <card>
          <!-- table表格 日历-->
          <p slot="title" style="height: 33px; line-height: 33px">
            <Icon type="ios-bookmark"></Icon>岗位发布管理
          </p>
          <div>
            <Row class="btnHeight">
              <i-col span="3" offset="0">
                <span @dblclick="clearDatazhil(0)">
                  <Input
                    v-model="list1"
                    icon="ios-search"
                    :readonly="true"
                    placeholder="选择内聘活动"
                    @on-click="selectzhil(0)"
                  />
                </span>
              </i-col>
              <i-col span="3" offset=".5" style="margin-left: 20px">
                <span @dblclick="clearDatazhil(1)">
                  <Input
                    v-model="list2"
                    icon="ios-search"
                    :readonly="true"
                    placeholder="选择招聘岗位"
                    @on-click="selectzhil(1)"
                  />
                </span>
              </i-col>
              <i-col span="10" offset=".5" style="margin-left: 20px">
                <Select
                  class="sInput"
                  v-model="name"
                  style="width: 200px"
                  @on-change="selectStatus"
                >
                  <Option value="全部">全部</Option>
                  <Option value="待发布">待发布</Option>
                  <Option value="已发布">已发布</Option>
                  <Option value="已撤销">已撤销</Option>
                </Select>

                <Button
                  class="btns"
                  v-for="(item, index2) in btns"
                  :key="index2"
                  :type="item.btnLancode === 'button_del' ? 'error' : 'primary'"
                  v-if="
                    item.btnLancode === 'button_query' ||
                    item.btnLancode === 'button_opening' && name === '待发布' ||
                    item.btnLancode === 'button_del' && name === '待发布' ||
                    item.btnLancode === 'button_issue' && name === '待发布' ||
                    item.btnLancode === 'button_revoke' && name === '已发布' 
                  "
                  @click="btnFunction(item.btnLancode)"
                  >{{ item.btnLanCn }}
                </Button>
              </i-col>
            </Row>
            <row class="table-form" ref="table-form">
              <Spin fix v-if="isSpin" size="large"></Spin>
              <Table
                @on-select="selectedtable"
                @on-select-cancel="selectedtable"
                @on-select-all="selectedtable"
                @on-select-all-cancel="selectedtable"
                @on-sort-change="sortable"
                size="small"
                :no-data-text="noDataImg"
                stripe
                ref="selection"
                :columns="columns"
                :data="data"
                :height="tableheight - 12"
              >
                <template slot-scope="{ row }" slot="poreStatus">
                  {{
                    row.poreStatus === "01statusType"
                      ? "待发布"
                      : row.poreStatus === "02statusType"
                      ? "已发布"
                      : "已撤销"
                  }}
                </template>
                <!-- 修改、查看 -->
                <template slot-scope="{ row, index }" slot="action">
                  <Button
                    v-for="(item, index2) in btns"
                    :key="index2"
                    size="small"
                    type="primary"
                    v-if="
                      item.btnLancode === 'button_y_upd' && row.poreStatus === '01statusType' && name === '待发布' ||

                      item.btnLancode === 'button_view'
                    "
                    @click="btnFunction(item.btnLancode, row)"
                    :style="{marginLeft:item.btnLancode === 'button_view' ? '10px' : ''}"
                    >{{ item.btnLanCn }}
                  </Button>
                </template>
              </Table>
            </row>
            <Row style="display: flex">
              <Page
                :total="total"
                size="small"
                show-elevator
                show-sizer
                placement="top"
                :current="page"
                @on-page-size-change="sizeChange"
                @on-change="pageChange"
                :page-size-opts="[10, 20, 50, 100]"
              ></Page>
              <span style="margin-left: 10px; margin-top: 2px">
                {{ $t("reminder.view") }} {{ (page - 1) * rows + 1 }} -
                {{ page * rows > total ? total : page * rows }}
                {{ $t("reminder.of") }} <span>{{ total }}</span></span
              ><Button
                size="small"
                shape="circle"
                icon="md-refresh"
                style="margin-left: 20px; display: inline-block"
                @click="getData(1)"
              ></Button>
            </Row>
          </div>
        </card>
      </Col>
    </Row>

    <!-- 进行修改操作弹出的页面 start -->
    <!-- <transition name="fade">
            <update v-show="openUpdate"
                    :id="updateId"
                    :logType="logType"
                    :index="index"
                    @closeUp="closeUp"
                    @getData="addNewArray"
                    @update="updateArray"
                    ref="update"></update>
        </transition> -->
    <!-- 进行修改操作弹出的页面 end -->

    <!-- 内聘活动 -->
    <transition name="fade">
      <searchAct
        v-show="openzhil1"
        @closeUp="closeUp"
        :searchTitle="searchTitle1"
        @changeinputZhil="changeinputZhil"
        ref="searchAct"
      ></searchAct>
    </transition>

    <!-- 招聘岗位 -->
    <transition name="fade">
      <searchPost
        v-show="openzhil2"
        @closeUp="closeUp"
        :searchTitle="searchTitle2"
        @changeinputZhil="changeinputZhil"
        ref="searchPost"
      ></searchPost>
    </transition>

    <!-- 进行修改操作弹出的页面 start -->
    <transition name="fade">
      <update
        v-show="openUpdate"
        :updateId="updateId"
        :type="type"
        @closeUp="closeUp"
        @getData="getData"
        ref="update"
      ></update>
    </transition>
    <!-- 进行修改操作弹出的页面 end -->

    <!-- 查询空缺 -->
    <transition name="fade">
      <opening
        v-show="openFlag"
        @closeUp="closeUp"
        @getData="getData"
        ref="opening"
      ></opening>
    </transition>

    <!-- 撤销 -->
    <transition name="fade">
      <undo
        v-show="undoFlag"
        :type="type"
        @closeUp="closeUp"
        @getData="getData"
        ref="undo"
      ></undo>
    </transition>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "../../../axios/axios";
import { isSuccess, getUrlKey } from "../../../lib/util";
import searchAct from "./searchAct";
import searchPost from "./searchPost";
import update from "./addJobActivities";
import opening from "./searchOpening";
import undo from "./undo";

//导入
export default {
  name: "autoOrgPostrelease",
  data() {
    return {
      isSpin: false,
      type: -1,
      updateId: "-1",
      openUpdate: false,
      undoFlag: false,
      isTbtn: false,
      noDataImg: '<div id="noData"></div>',
      tableheight: document.body.offsetHeight - 255,
      poreStatus: "",
      value: "",
      btns: [],
      logType: "",
      openUpdate: false,
      openzhil1: false,
      openzhil2: false,
      openInit: false,
      selectYearType: [],
      tableselected: [],
      searchTitle1: "内聘活动",
      searchTitle2: "招聘岗位",
      porePostid: "",
      poreUnitid: "",
      poreDeptid: "",
      columns: [
        {
          type: "selection",
          width: 54,
          align: "center",
        },

        {
          title: "招聘岗位",
          key: "porePostidDis",
          sortable: "custom",
        },
        {
          title: "公司",
          key: "poreUnitidDis",
          sortable: "custom",
        },
        {
          title: "部门",
          key: "poreDeptidDis",
          sortable: "custom",
        },
        {
          title: "编制人数",
          key: "porePernum",
          sortable: "custom",
        },
        {
          title: "在编人数",
          key: "poreCurpernum",
          sortable: "custom",
        },
        {
          title: "缺编人数",
          key: "poreVacnum",
          sortable: "custom",
        },
        {
          title: "招聘人数",
          key: "poreRecnum",
          sortable: "custom",
        },
        {
          title: "活动名称",
          key: "poreReledeadlineDis",
          sortable: "custom",
        },
        {
          title: "开始日期",
          key: "poreAcmidSdateDis",
          sortable: "custom",
        },
        {
          title: "结束日期",
          key: "poreAcmidEdateDis",
          sortable: "custom",
        },
        {
          title: "岗位发布截止日期",
          key: "poreAcmidReledeadlineDis",
          sortable: "custom",
        },
        {
          title: "状态",
          slot: "poreStatus",
          sortable: "custom",
        },
        {
          title: this.$t("button.opr"),
          slot: "action",
          fixed: "right",
          width: 120,
          align: "center",
        },
      ],
      data: [],
      undoList: "",
      total: 0,
      index: 0,
      calendar_index: 0,
      sort: "calendarDate",
      order: "asc",
      rows: 16,
      page: 1,
      name: "",
      funId: "1000",
      year: "",
      list1: "",
      list2: "",
      ischecked1: true,
      ischecked2: false,
      getBlur1: false,
      getBlur2: false,
      showAdvanced: false,
      AccessControl: [],
      btnArr: [],
      // 导入
      openImport: false,
      //导入mt
      imp_mt: "",
      openFlag: false,
      poreAcmid: "",
      porePostid: ""
    };
  },
  computed: {},
  components: {
    opening,
    update,
    searchAct,
    searchPost,
    undo,
    // btnList,
  },
  mounted() {
    this.getData(1);
    this.getBtnList();
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    btnFunction(btnId, item) {
      const t = this;
      // 查询
      if (btnId === "button_query") {
        t.getData();
      }
      // 查询空缺岗位
      else if (btnId === "button_opening") {
        console.log(t.$refs);
        t.openFlag = true;
        t.$nextTick(() => {
          t.$refs.opening.getData();
        });
      }
      // 删除
      else if (btnId === "button_del") {
        t.deletemsg();
      }
      // 发布
      else if (btnId === "button_issue") {
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t("reminder.remind"),
            content: this.$t("reminder.leastone"),
          });
        } else {
          t.$Modal.confirm({
            title: this.$t("reminder.remind"),
            content: "是否发布",
            onOk: () => {
              getDataLevelUserLoginData({
                _mt: this.$global.mt + "OrgPostrelease.updStatus",
                APlogType: "发布",
                APids: t.tableselected.toString(),
                APupdstatus: "02statusType"
              })
                .then((res) => {
                  if (isSuccess(res, t)) {
                    t.tableselected = [];
                    t.getData();
                    t.getSelect();
                  }
                })
                .catch(() => {
                  t.$Modal.error({
                    title: this.$t("reminder.err"),
                    content: this.$t("reminder.errormessage"),
                  });
                });
            },
            onCancel: () => {},
          });
        }
      }
      // 撤销
      else if (btnId === "button_revoke") {
        t.undoFlag = true;
        t.undoList = t.tableselected.toString();
      }
      // 修改
      else if (btnId === "button_y_upd") {
        t.type = 1;
        t.updateId = String(item.id);
        t.openUpdate = true;
        t.$nextTick(() => {
          t.$refs.update.getData();
        });
      }
      // 查看
      else if (btnId === "button_view") {
        t.type = 2;
        t.updateId = item.id;
        t.openUpdate = true;
        t.$nextTick(() => {
          t.$refs.update.getData();
        });
      }
    },
    getBtnList() {
      const t = this;
      const data = {
        _mt: this.$global.mt + "AuthRolePower.getFunBtnByRole",
        AProleType: localStorage.roleType,
        APlogType: "权限按钮的控制",
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginData(data)
        .then((res) => {
          console.log(res.data, "---------------btn---------------");
          if (isSuccess(res, t)) {
            t.btns = res.data.content[0].value;
          }
        })
        .catch((err) => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    selectStatus() {
      this.getData(1);
    },
    selectzhil(e) {
      const t = this;

      if (e === 0) {
        t.openzhil1 = true;
        this.$nextTick(() => {
          t.$refs.searchAct.getData();
        });
      } else if (e) {
        t.openzhil2 = true;
        this.$nextTick(() => {
          t.$refs.searchPost.getData();
        });
      }
    },
    changeinputZhil(name, id, e) {
      console.log(name, id, e);
      const t = this;
      if (e === 0) {
        t.list1 = name;
        t.poreAcmid = id;
        // t.formValidate.bstdahAuthuserid = id;
      } else {
        t.list2 = name;
        t.porePostid = id;
      }
    },
    clearDatazhil(e) {
      const t = this;
      if (e === 0) {
        t.list1 = "";
        t.poreAcmid = "";
      } else {
        t.list2 = "";
        t.porePostid = "";
      }
    },
    closeUp() {
      const t = this;
      t.openzhil1 = false;
      t.openzhil2 = false;
      t.openUpdate = false;
      t.openFlag = false;
      t.undoFlag = false;
      console.log("获取数据了");
      t.getData();
    },
    advSearch() {
      this.showAdvanced = true;
      this.$nextTick(() => {
        this.$refs.advanced.getData();
      });
    },
    getData(page, value) {
      const t = this;
      // console.log(typeof(t.year))
      t.isSpin = true;
      if (page) {
        t.page = page;
      }
      let data = {
        _mt: this.$global.mt + "OrgPostrelease.getPage",
        AProws: t.rows,
        APpage: t.page,
        APsort: t.sort,
        APffk: 0,
        APorder: t.order,
        poreStatus:
          t.name === "待发布"
            ? "01statusType"
            : t.name === "已发布"
            ? "02statusType"
            : t.name === "已撤销"
            ? "03statusType"
            : "",
        poreAcmid: t.poreAcmid,
        porePostid: t.porePostid,
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginData(data)
        .then((res) => {
          t.isSpin = false;
          if (isSuccess(res, t)) {
            console.log(res);
            t.data = res.data.content[0].rows;
            if (t.data.poreAcmidStatus) {
              t.data.poreAcmidStatus = new Date(t.data.poreAcmidStatus).format(
                "yyyy-MM-dd"
              );
            }
            if (t.data.poreAcmidEtatus) {
              t.data.poreAcmidEtatus = new Date(t.data.poreAcmidEtatus).format(
                "yyyy-MM-dd"
              );
            }
            if (t.data.poreAcmidReledeadline) {
              t.data.poreAcmidReledeadline = new Date(
                t.data.poreAcmidReledeadline
              ).format("yyyy-MM-dd");
            }

            console.log(t.data);
            t.total = res.data.content[0].records;
          }
        })
        .catch(() => {
          t.isSpin = false;
          t.$refs.btnList.loading = false;
        });
    },
    addNewArray(res) {
      const t = this;
      t.data.unshift(res);
    },
    generaBtn(h, params) {
      let arr = [];
    },
    operatorBtn(btnList) {
      btnList.map((item) => {
        item.name = this.$t(`${item.btnLancode.split("_").join(".")}`);
      });
      this.btnArr = btnList;
      // console.log(btnList, '0000000')
    },
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
        this.getSelect();
      } else {
        this.order = "desc";
      }
    },
    sizeChange(size) {
      const t = this;
      t.rows = size;
      t.getData();
    },
    pageChange(page) {
      const t = this;
      t.page = page;
      t.getData();
    },
    getSelect() {
      const t = this;
      getDataLevelUserLoginData({
        _mt: this.$global.mt + "PlatCalendar.getList",
      })
        .then((res) => {
          if (isSuccess(res, t)) {
            t.selectYearType = res.data.content[0].value;
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id);
      }
      this.tableselected = newArr;
    },
    deletemsg() {
      const t = this;
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone"),
        });
      } else {
        t.$Modal.confirm({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.confirmdelete"),
          onOk: () => {
            getDataLevelUserLoginData({
              _mt: this.$global.mt + "OrgPostrelease.delByIds",
              APlogType: this.$t("button.del"),
              APids: t.tableselected.toString(),
            })
              .then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  t.getData();
                  t.getSelect();
                }
              })
              .catch(() => {
                t.$Modal.error({
                  title: this.$t("reminder.err"),
                  content: this.$t("reminder.errormessage"),
                });
              });
          },
          onCancel: () => {},
        });
      }
    },
    // open() {
    //   const t = this;
    //   t.opendialog = true;
    // },
    // openUp(id, logType, index) {
    //   const t = this;
    //   t.updateId = parseInt(id, 10);
    //   t.logType = logType;
    //   t.openUpdate = true;
    //   t.index = index;
    //   t.calendar_index = index;
    //   if (logType === this.$t("button.y.upd")) {
    //     t.$refs.update.getData(id);
    //   }
    // },
    // openIn(logType) {
    //   const t = this;
    //   t.logType = logType;
    //   t.openInit = true;
    // },
    // closeUp() {
    //   const t = this;
    //   t.openUpdate = false;
    // },
    closeInit() {
      const t = this;
      t.openInit = false;
      t.$refs.init.formValidate.sYear = "";
      t.$refs.init.formValidate.eYear = "";
      // t.getData()
      // t.getSelect()
      t.getCaldearData();
    },
    toNum() {
      const t = this;
      t.calendar_data.forEach((item, index) => {
        if (item.calendarDate && item.calendarDate.length === 10) {
          let dayNum = item.calendarDate;
          if (dayNum) {
            dayNum = dayNum.slice(8);
            let newDayNum = parseInt(dayNum, 10);
            item.calendarDate = newDayNum;
          }
        }
      });
    },
    // 工作日历管理 样式转换  end-----------------------------------------
  },
};
</script>
<style lang="scss" scoped>
.btns {
  margin-right: 10px;
}
.table-form {
  margin: 10px 0;
}
.margin-right-10 {
  margin-right: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.table_header_box,
.table_body_box {
  width: 100%;
}
.table_header,
.table_body {
  width: 14.28%;
}
.area {
  // padding: 5px;
  font-size: 12px;
}
.table_header_box {
  margin-top: 10px;
  border-radius: 5px 5px 0 0;
}
.table_header {
  background-color: #2d8cf0;
  color: #ffffff;
  line-height: 40px;
  height: 40px;
  text-align: center;
  font-size: 14px;
  // border-right: 1px solid #dddddd;
}
.table_body_box {
  border-left: 1px solid #dddddd;
  max-height: 665px;
  overflow-y: auto;
}
.table_body {
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  background-color: #ffff;
  padding: 6px 10px 10px;
}
.table_body p {
  text-align: center;
  height: 20px;
  line-height: 20px;
  margin-bottom: 6px;
  font-size: 14px;
  width: 144px;
}
.conbox {
  position: relative;
  height: 116px;
  text-align: -webkit-center;
  // padding-top: 25px;
}
.edit {
  // position: absolute;
  // right: 6px;
  // bottom: 0px;
  // color: #2d8cf0;
  // cursor: pointer;
  width: 58px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  border: 1px solid rgba(45, 140, 240, 1);
  border-radius: 4px;
  cursor: pointer;
  color: #2d8cf0;
  position: absolute;
  right: 0;
}
// .bgWhite {
//     background-color: #ffffff;
// }
.bgFeedd3 {
  background-color: #feedd3;
}
.btnHeight {
  font-size: 0;
  .sInput {
    margin-right: 10px;
    font-size: 12px;
    vertical-align: middle;
  }
}
.lbtn {
  margin-left: 10px;
  background-color: #2d8cf0;
  color: #fff;
  border: none;
  float: right;
}
/deep/ .ivu-card-head .lbtn:hover {
  color: #fff !important;
}
.lbtn i {
  font-size: 14px;
  margin-right: 5px;
}
.checked {
  background-color: #18be6a;
}
.Legalholiday,
.Legalrest,
.comholiday,
.comrest {
  color: #fff;
  border-radius: 4px;
}
.Legalholiday {
  background-color: #49cc8a;
}
.day {
  // position: absolute;
  // right: 0;
  // top: 0;
  // padding-right: 10px;
  font-size: 28px;
  // font-weight: bold;
  text-align: center;
}
.tableNote {
  width: 100px;
  padding-top: 9px;
  margin-left: 20px;
  margin-top: 40px;
}
.noteTitle {
  margin: 5px 0;
}
.noteTitle col {
  font-weight: bold;
}
.lawicon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  vertical-align: middle;
  margin-top: -5px;
}
.colorOne,
.colorTwo,
.colorThree,
.colorFour {
  width: 100px;
  margin-bottom: 10px;
}
.colorOnel,
.colorTwol,
.colorThreel,
.colorFourl {
  background-color: #49cc8a;
  width: 15px;
  height: 15px;
}
.colorOner,
.colorTwor,
.colorThreer,
.colorFourr {
  width: 85px;
  text-align: left;
  font-size: 14px;
  padding-left: 12px;
  line-height: 15px;
  color: #49cc8a;
}
.colorTwol,
.comrest {
  background-color: #b58cde;
}
.colorThreel,
.comholiday {
  background-color: #ffae00;
}
.colorFourl,
.Legalrest {
  background-color: #699efd;
}
.colorTwor {
  color: #b58cde;
}
.colorThreer {
  color: #ffae00;
}
.colorFourr {
  color: #699efd;
}
.LegalDay {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}
.brn-mar {
  font-size: 12px;
  vertical-align: middle;
  margin-right: 10px;
}
.calendar_table {
  height: 749px;
}
@media screen and (min-height: 1000px) {
  .conbox {
    position: relative;
    height: 145px;
    text-align: -webkit-center;
    // padding-top: 25px;
  }
  .table_body p {
    text-align: center;
    height: 20px;
    line-height: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    width: 144px;
  }
  .calendar_table {
    height: auto;
  }
  .table_body_box {
    border-left: 1px solid #dddddd;
    max-height: 810px;
    overflow-y: auto;
  }
}
@media screen and (max-width: 1367px) {
  .table_body div {
    height: 76px;
  }
  .conbox {
    padding-top: 19px;
  }
  .table_body p {
    line-height: 20px;
    margin-bottom: 2px;
  }
  .day {
    font-size: 14px;
  }
  .edit {
    bottom: -1px;
  }
}
// .ivu-select {
//     margin-right: 5px;
// }
</style>
