<template>
  <div class="table">
    <!-- 内聘活动管理 -->
    <Row>
      <Col span="24">
        <card>
          <!-- table表格 日历-->
          <p slot="title" style="height: 33px; line-height: 33px">
            <Icon type="ios-bookmark"></Icon>内聘活动管理
          </p>
          <div>
            <Row class="btnHeight">
              <Select
                class="sInput"
                v-model="list1"
                style="width: 200px"
                @on-change="selectList"
              >
                <Option value="全部">全部</Option>
                <Option value="双选">双选</Option>
                <Option value="竞聘">竞聘</Option>
              </Select>

              <Input
                class="sInput"
                v-model="name"
                placeholder="请输入活动名称"
                style="width: 200px"
              ></Input>

              <Select
                class="sInput"
                v-model="list2"
                style="width: 200px"
                @on-change="selectList"
              >
                <Option value="全部">全部</Option>
                <Option value="待生效">待生效</Option>
                <Option value="已生效">已生效</Option>
              </Select>

              <Button
                class="btns"
                v-for="(item, index2) in btns"
                :key="index2"
                :type="item.btnLancode === 'button_del' ? 'error' : 'primary'"
                v-if="
                  item.btnLancode === 'button_query' ||
                  item.btnLancode === 'button_add' && list2 === '待生效' ||
                  item.btnLancode === 'button_del' && list2 === '待生效' ||
                  (item.btnLancode === 'button_valid' && list2 === '待生效') ||
                  (item.btnLancode === 'button_invalid' && list2 === '已生效')
                "
                @click="btnFunction(item.btnLancode)"
                >{{ item.btnLanCn }}</Button
              >
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
              <template slot-scope="{ row }" slot="acmType">
                  {{ row.acmType === "01twochoose" ? "双选" : "竞聘" }}
                </template>
                <template slot-scope="{ row }" slot="acmStatus">
                  {{ row.acmStatus === "takeType02" ? "已生效" : "待生效" }}
                </template>
                <template slot-scope="{ row, index }" slot="action">
                  <Button
                    v-for="(item, index2) in btns"
                    :key="index2"
                    size="small"
                    type="primary"
                    v-if="
                      item.btnLancode === 'button_view'  ||
                      item.btnLancode === 'button_y_upd' &&
                      row.acmStatus === 'takeType01' && list2 === '待生效'
                    "
                    @click="btnFunction(item.btnLancode, row)"
                    :style="{marginLeft: item.btnLancode === 'button_view' ? '10px' : '',}"
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
    <transition name="fade">
      <update
        v-show="openUpdate"
        :updateId="updateId"
        :type="type"
        :index="index"
        @closeUp="closeUp"
        @getData="getData"
        ref="update"
      ></update>
    </transition>
    <!-- 进行修改操作弹出的页面 end -->
  </div>
</template>
<script>
import update from "./addNewNpactmanage";
import { getDataLevelUserLoginData } from "../../../axios/axios";
import { isSuccess, getUrlKey } from "../../../lib/util";
// import btnList from "@/components/commonBtn/commonBtn";
//导入
export default {
  name: "platZnCalendar",
  data() {
    return {
      isSpin: false,
      isTbtn: false,
      noDataImg: '<div id="noData"></div>',
      tableheight: document.body.offsetHeight - 255,
      type: 2,
      value: "",
      logType: "",
      btns: [],
      openUpdate: false,
      openInit: false,
      updateId: "",
      selectYearType: [],
      tableselected: [],
      columns: [
        {
          type: "selection",
          width: 54,
          align: "center",
        },

        {
          title: "活动类型",
          slot: "acmType",
          sortable: "custom",
        },
        {
          title: "活动名称",
          key: "acmName",
          sortable: "custom",
        },
          {
            title: "开始日期",
            key: "acmSdate",
            sortable: "custom",
          },
          {
            title: "结束日期",
            key: "acmEdate",
            sortable: "custom",
          },
          {
            title: "岗位发布截止日期",
            key: "acmReledeadline",
            sortable: "custom",
          },
        {
          title: "状态",
          slot: "acmStatus",
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
      total: 0,
      index: 0,
      calendar_index: 0,
      sort: "calendarDate",
      order: "asc",
      rows: 16,
      page: 1,
      name: "",
      funId: "1000",
      list1: "",
      list2: "",
      showAdvanced: false,
      AccessControl: [],
      btnArr: [],
    };
  },
  computed: {},
  components: {
    update,
    // btnList,
  },
  mounted() {
    this.getData();
    this.getBtnList();
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    btnFunction(btnId, item) {
      //   console.log(item);
      const t = this;
      if (btnId === "button_query") {
        t.getData();
      } else if (btnId === "button_add") {
        t.type = Number(0);
        t.updateId = "";
        // 新增
        t.openUpdate = true;
      } else if (btnId === "button_y_upd") {
        //   修改
        t.type = Number(1);
        t.updateId = String(item.id);
        this.$nextTick(() => {
            t.$refs.update.getData();
        })
        t.openUpdate = true;
      } else if (btnId === "button_view") {
        //   查看
        t.type = Number(2);
        t.updateId = String(item.id);
        this.$nextTick(() => {
            t.$refs.update.getData();
        })
        t.openUpdate = true;
      } else if (btnId == "button_del") {
        //   删除
        t.deletemsg();
      } else {
          t.statusOr();
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
          if (isSuccess(res, t)) {
            // console.log(res.data, "-----------------btn-----------------");
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
    updateArray(res) {
      const t = this;
      t.data.splice(t.index, 1, res);
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
        _mt: this.$global.mt + "OrgNpactmanage.getPage",
        AProws: t.rows,
        APpage: t.page,
        APsort: t.sort,
        APffk: 0,
        APorder: t.order,
        acmType: t.list1 === "双选" ? "01twochoose" : t.list1 === "竞聘" ?  "02making" : "",
        acmStatus:
          t.list2 === "已生效"
            ? "takeType02"
            : t.list2 === "待生效"
            ? "takeType01 "
            : "",
        acmName: t.name,
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
    //   console.log(data);
      getDataLevelUserLoginData(data)
        .then((res) => {
          t.isSpin = false;
        //   console.log(res.data, "data");
          if (isSuccess(res, t)) {
            // console.log(res);
            t.data = res.data.content[0].rows;
            console.log(t.data)
            t.total = res.data.content[0].records;
            this.btnControl(this)
              .then((res1) => {
                if (isSuccess(res1, t)) {
                  res1.data.content[0].value.forEach((item) => {
                    t.AccessControl.push(item.btnLancode);
                  });
                }
              })
              .catch((err) => {
                // console.log(err)
              });
          }
        })
        .catch(() => {
          t.isSpin = false;
          t.$refs.btnList.loading = false;
          // t.$Modal.error({
          //   title: this.$t('reminder.err'),
          //   content: this.$t('reminder.errormessage'),
          // })
        });
    },
    addNewArray(res) {
      const t = this;
      t.data.unshift(res);
    },
    statusOr() {
      const t = this;
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t("reminder.remind"),
          content: this.$t("reminder.leastone"),
        });
      } else {
        getDataLevelUserLoginData({
          _mt: this.$global.mt + "OrgNpactmanage.updStatus",
          APlogType: "状态切换",
          APupdstatus: t.list2 === "已生效" ? "takeType01" : "takeType02 ",
          APnpacid: t.tableselected.toString(),
        })
          .then((res) => {
            if (isSuccess(res, t)) {
              t.tableselected = [];
              t.getData();
            }
          })
          .catch(() => {
            t.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage"),
            });
          });
      }
    },
    operatorBtn(btnList) {
      btnList.map((item) => {
        item.name = this.$t(`${item.btnLancode.split("_").join(".")}`);
      });
      this.btnArr = btnList;
      // console.log(btnList, '0000000')
    },
    //导入
    importExcel() {
      const t = this;
      t.openImport = true;
      // console.log("PlatCalendar.getPage->导入接口");
      t.imp_mt = this.$global.mt + "PlatCalendar.importData";
    },
    selectList(value) {
      this.getData();
    },
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
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
    selectedtable(selection) {
      //   console.log(selection, "多选");
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
              _mt: this.$global.mt + "OrgNpactmanage.delByIds",
              APlogType: this.$t("button.del"),
              APids: t.tableselected.toString(),
            })
              .then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = [];
                  t.getData();
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
    open() {
      const t = this;
      t.opendialog = true;
    },
    openUp(id, logType, index) {
      const t = this;
      t.updateId = parseInt(id, 10);
      t.openUpdate = true;
      t.calendar_index = index;
      if (logType === this.$t("button.y.upd")) {
        t.$refs.update.getData(id);
      }
    },
    openIn(logType) {
      const t = this;
      t.logType = logType;
      t.openInit = true;
    },
    closeUp() {
      const t = this;
      t.openUpdate = false;
      this.updateId = "";
    },
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
