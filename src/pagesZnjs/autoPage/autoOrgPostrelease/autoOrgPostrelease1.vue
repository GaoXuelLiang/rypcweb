<template>
  <div class="table">
    <!-- 岗位应聘管理 -->
    <div class="table">
      <commonMainTable
        ref="commonMainTable"
        @specialButton="btnEvents"
        :isSpecial="isSpecial"
      ></commonMainTable>
    </div>

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
    <!-- <transition name="fade">
      <searchAct
        v-show="openzhil1"
        @closeUp="closeUp"
        :searchTitle="searchTitle1"
        @changeinputZhil="changeinputZhil"
        ref="searchAct"
      ></searchAct>
    </transition> -->

    <!-- 招聘岗位 -->
    <!-- <transition name="fade">
      <searchPost
        v-show="openzhil2"
        @closeUp="closeUp"
        :searchTitle="searchTitle2"
        @changeinputZhil="changeinputZhil"
        ref="searchPost"
      ></searchPost>
    </transition> -->

    <!-- 投递员工列表 -->
    <transition name="fade">
      <opening
        v-show="openFlag"
        @closeUp="closeUp"
        @getData="getData"
        ref="opening"
      ></opening>
    </transition>
  </div>
</template>
<script>
import update from "./searchPeople";
import { getDataLevelUserLoginData } from "../../../axios/axios";
import { isSuccess, getUrlKey } from "../../../lib/util";
import btnList from "@/components/commonBtn/commonBtn";
// import searchAct from "./searchAct";
// import searchPost from "./searchPost";
//导入
export default {
  name: "autoOrgPostrelease",
  data() {
    return {
      isSpecial: true,
      dom: "",
      isSpin: false,
      isTbtn: false,
      openFlag: false,
      noDataImg: '<div id="noData"></div>',
      tableheight: document.body.offsetHeight - 255,
      value: "",
      logType: "",
      openUpdate: false,
      openzhil1: false,
      openzhil2: false,
      openInit: false,
      updateId: NaN,
      selectYearType: [],
      tableselected: [],
      searchTitle1: "内聘活动",
      searchTitle2: "招聘岗位",
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
          title: "缺编人数",
          key: "poreVacnum",
          sortable: "custom",
        },
        {
          title: "招聘人数",
          key: "poreRecnum ",
          sortable: "custom",
        },
        {
          title: "投递人数",
          key: "poreSendnum",
          sortable: "custom",
        },
        {
          title: "录用人数",
          key: "poreHirenum",
          sortable: "custom",
        },
        {
          title: "活动名称",
          key: "poreAcmid",
          sortable: "custom",
        },
        {
          title: "开始日期",
          key: "poreAcmidSdate ",
          sortable: "custom",
        },
        {
          title: "结束日期",
          key: "poreAcmidEdate ",
          sortable: "custom",
        },
        {
          title: this.$t("button.opr"),
          slot: "action",
          fixed: "right",
          width: 80,
          align: "center",
        },
      ],
      data: [],
      total: 0,
      index: 0,
      calendar_index: 0,
      sort: "calendarDate",
      order: "asc",
      rows: 10,
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
    };
  },
  computed: {},
  components: {
    update,
    // searchAct,
    // searchPost,
    btnList,
  },
  mounted() {
    // window.onresize = func;
    // func()
    // this.getData(1)
    // this.getSelect()
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    //特殊按钮事件
    btnEvents(code, t, params) {
      const _t = this;
    },
    selectzhil(e) {
      const t = this;

      if (e === 0) {
        t.openzhil1 = true;
        console.log(t.refs);
        this.$nextTick(() => {
          t.$refs.searchAct.getData();
        });
      } else {
        t.openzhil2 = true;
        this.$nextTick(() => {
          t.$refs.searchPost.getData();
        });
      }
    },
    changeinputZhil(name, id, e) {
      const t = this;
      if (e === 0) {
        t.list1 = name;
        // t.formValidate.bstdahAuthuserid = id;
      } else {
        t.list2 = name;
      }
    },
    clearDatazhil(e) {
      const t = this;
      if (e === 0) {
        t.list1 = "";
        // t.formValidate.bstdahAuthuserid = "";
      } else {
        t.list2 = "";
        // t.formValidate.bstdahAuthuserid = "";
      }
    },
    closeUp() {
      const t = this;
      console.log("closeUp");
      t.openzhil1 = false;
      t.openzhil2 = false;
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
      t.$refs.btnList.loading = true;
      if (page) {
        t.page = page;
      }
      if (typeof t.year === "object") {
        t.year = t.year.format("yyyy");
      }
      const data = {
        _mt: this.$global.mt + "PlatCalendar.getPage",
        AProws: t.rows,
        APpage: t.page,
        APsort: t.sort,
        APffk: 0,
        APorder: t.order,
        calendarDate: t.year + "-" + t.month,
      };
      if (value) {
        data.searchData = JSON.stringify(value);
      }
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginData(data)
        .then((res) => {
          t.isSpin = false;
          t.$refs.btnList.loading = false;
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows;
            // console.log(t.data)
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
    operatorBtn(btnList) {
      btnList.map((item) => {
        item.name = this.$t(`${item.btnLancode.split("_").join(".")}`);
      });
      this.btnArr = btnList;
      // console.log(btnList, '0000000')
    },
    btnEvent(code) {
      switch (code) {
        case "button_add":
          this.openUp(NaN, this.$t("button.add"));
          break;
        case "button_del":
          this.deletemsg();
          break;
        case "button_export":
          this.expData();
          break;
        case "button_import":
          this.importExcel();
          break;
        case "button_pinyin":
          this.send();
          break;
        case "button_init":
          this.openIn(this.$t("button.ini"));
          break;
        case "button_query":
          this.getData(1);
          break;
      }
    },
    //导入
    importExcel() {
      const t = this;
      t.openImport = true;
      // console.log("PlatCalendar.getPage->导入接口");
      t.imp_mt = this.$global.mt + "PlatCalendar.importData";
    },
    //关闭导入
    closeImport() {
      const t = this;
      t.openImport = false;
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
              _mt: this.$global.mt + "PlatCalendar.delByIds",
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
    open() {
      const t = this;
      t.opendialog = true;
    },
    openUp(id, logType, index) {
      const t = this;
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.openUpdate = true;
      t.index = index;
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

</style>
