<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;选择员工
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <!--<Row class="table-form">-->
      <!--<span @dblclick="clearDepart">-->
      <!--<Input placeholder="请选择部门" style="width: 200px" v-model="empcompDeptDis" :readonly="true"  icon="ios-search" @on-click="pickDepart"/>-->
      <!--</span>-->
      <!--<span @dblclick="dbPeriod">-->
      <!--<Input placeholder="请选择岗位" style="width: 200px" v-model="post" :readonly="true"  icon="ios-search" @on-click="selectPerid"/>-->
      <!--</span>-->
      <Row class="table-form">
        <Input
          placeholder="请输入员工姓名"
          class="searchInput"
          style="width: 200px"
          v-model="empName"
        />
        <span style="margin: 0"
          ><Button
            type="primary"
            class="btnStyle"
            style="width: 56px"
            @click="search"
            >{{ $t("button.ser") }}</Button
          ></span
        >
        <!--<span style="margin: 0;"><Button type="primary" @click="save">{{$t('button.sav')}}</Button></span>-->
        <!--</Row>-->
      </Row>
      <Row class="table-form" ref="table-form">
        <Table
          height="320"
          size="small"
          stripe
          :no-data-text="noDataImg"
          ref="selection"
          :columns="searchCloumns"
          @on-sort-change="sortable"
          @on-select="selectedtable"
          @on-select-cancel="selectedtable"
          @on-select-all="selectedtable"
          @on-select-all-cancel="selectedtable"
          :data="data"
        ></Table>
        <!-- @on-row-dblclick="dbCkick" -->
      </Row>
      <Row style="display: flex">
        <Page
          :total="total"
          :current="params.APpage"
          size="small"
          show-elevator
          show-sizer
          placement="top"
          @on-page-size-change="sizeChange"
          @on-change="pageChange"
          :page-size-opts="[10, 20, 50, 100]"
        ></Page>
        <span style="margin-left: 10px; margin-top: 2px">
          {{ $t("reminder.view") }}
          {{ (params.APpage - 1) * params.AProws + 1 }} -
          {{
            params.APpage * params.AProws > total
              ? total
              : params.APpage * params.AProws
          }}
          {{ $t("reminder.of") }} <span>{{ total }}</span></span
        >
      </Row>
      <Row style="text-align: right; margin-top: 10px">
        <Button type="primary" @click="submit">选择员工</Button>
      </Row>
    </div>
    <transition name="fade">
      <searchDept
        v-show="openDept"
        @closeDept="closeDept"
        :searchDeptClo="searchDeptClo"
        @inputDept="inputDept"
        :params="paramsDept"
        ref="searchDept"
      ></searchDept>
    </transition>
  </div>
</template>
<script>
import searchDept from "../../../components/searchTable/searchDept";
import { getDataLevelUserLoginData, uploadimage } from "@/axios/axios";
import { isSuccess, deepCopy, getCookie } from "@/lib/util";

export default {
  components: {
    searchDept,
  },
  data() {
    return {
      sort: "id",
      order: "desc",
      rows: 10,
      page: 1,
      funId: "1000",
      title: "选择考核对象",
      data: [],
      noDataImg: '<div id="noData"></div>',
      total: NaN,
      post: "",
      postId: "",
      showSearchPost: false,
      newArr: [],
      tableselected: [],
      current: 1,
      empName: "",
      searchCloumns: [
        {
          type: "selection",
          width: 100,
          align: "center",
        },
        {
          title: this.$t("lang_performance.fileClass.checkStaff"),
          key: "empName",
        },
        {
          title: this.$t("lang_performance.fileClass.checkCompany"),
          key: "empUnitidDis",
        },
        {
          title: this.$t("lang_performance.fileClass.checkSection"),
          key: "empPostordIdDis",
        },
        {
          title: this.$t("lang_performance.fileClass.checkStation"),
          key: "empPostidDis",
        },
      ],
      params: {
        _mt: this.$global.mt + "EmpInfo.getPage",
        APfunId: "1000",
        AProws: 10,
        APpage: 1,
        APsort: "id",
        APorder: "asc",
        APffk: "glc1947",
        empName: "",
      },
      //      部门
      empcompDept: "",
      empcompDeptDis: "",
      openDept: false,
      searchDeptClo: [
        {
          title: this.$t("lang_employee.searchColumn.departCnFullName"),
          key: "compFnameCnDis",
        },
        {
          title: this.$t("lang_employee.searchColumn.departEnFullName"),
          key: "compFnameEnDis",
        },
      ],
      paramsDept: {
        _mt: "orgUnits.getByOrgFramePageList",
        rows: 10,
        page: 1,
        sort: "id",
        order: "desc",
        funId: "1106",
        logType: "部门",
        unitType: "02dept",
      },
    };
  },
  props: {
    logType: String,
    id: Number,
  },
  mounted() {},
  methods: {
    search() {
      this.params.APpage = 1;
      this.getData();
    },
    getData() {
      const t = this;
      let data = deepCopy(t.params);
      //   data.APpage = 1;
      //   data.APsort = "id";
      //   data.APorder = "desc";
      data.empName = t.empName;
      //   data.empcompPost = t.postId;
      //   data.empcompDept = t.empcompDept;

      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows;
            t.total = res.data.content[0].records;
            t.current = res.data.content[0].page;
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    close() {
      this.empName = "";
      this.params.APpage = 1;
      this.params.AProws = 10;
      this.empName = "";
      this.tableselected = [];
      this.$emit("hideMsg");
    },
    // 保存选择的员工
    save() {
      let t = this;
      let params2 = {
        _mt: "evaluationTargetemp.addList",
        funId: "1",
        logType: "新增考核对象",
        evateEmpid: t.newArr.toString(),
        evateActionid: this.id,
      };
      getDataLevelUserLoginData(params2)
        .then((res) => {
          t.newArr = [];
          if (isSuccess(res, t)) {
            t.close();
          }
        })
        .catch(() => {
          t.newArr = [];
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    sizeChange(size) {
      const t = this;
      t.params.AProws = size;
      t.getData();
    },
    pageChange(page) {
      const t = this;
      t.params.APpage = page;
      t.getData();
    },
    // 点击弹出岗位弹窗
    selectPerid() {
      let t = this;
      t.showSearchPost = true;
    },
    // 双击清除选中岗位
    dbPeriod() {
      let t = this;
      t.post = "";
      t.postId = "";
    },
    // 关闭岗位弹窗
    closeUpP() {
      let t = this;
      t.showSearchPost = false;
    },
    // 双击选中岗位
    changeinputP(row, id) {
      let t = this;
      t.showSearchPost = false;
      t.post = row.postFnameCnDis;
      t.postId = id;
    },
    // 多选触发函数
    selectChange(row) {
      let t = this;
      for (let i = 0; i <= row.length - 1; i++) {
        if (t.newArr.indexOf(row[i].id) == -1) {
          t.newArr.push(row[i].id);
        }
      }
    },
    // 取消选中时触发
    selectCancel(selection, row) {
      let t = this;
      for (let i = 0; i <= t.newArr.length - 1; i++) {
        if (t.newArr[i] == row.id) {
          t.newArr.splice(i, 1);
        }
      }
    },
    // 修改列表排序
    sortable(column) {
      this.params.sort = column.key;
      this.params.order = column.order;
      if (column.order !== "normal") {
        this.getData();
      } else {
        this.params.order = "desc";
      }
    },
    // 选择部门
    pickDepart() {
      const t = this;
      const paramsDept = deepCopy(t.paramsDept);
      t.$refs.searchDept.getData(paramsDept, "");
      t.openDept = true;
    },
    inputDept(name, id) {
      const t = this;
      t.empcompDeptDis = name;
      t.empcompDept = id;
    },
    clearDepart() {
      const t = this;
      t.empcompDeptDis = "";
      t.empcompDept = "";
    },
    closeDept() {
      const t = this;
      t.$refs.searchDept.unitCode = "";
      t.openDept = false;
    },
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        let obj = {};
        obj["empName"] = selection[i].empName;
        obj["empUnitidDis"] = selection[i].empUnitidDis;
        obj["id"] = selection[i].id;
        obj["empTagList"] = [];
        // obj["tagNum"] = random(1, 7);
        newArr.push(obj);
      }
      this.tableselected = newArr;
    //   console.log(this.tableselected);
    },
    submit() {
      this.params.AProws = 10;
      this.params.APpage = 1;
      this.$emit("hideMsg");
      this.$emit("satffList", this.tableselected);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/sass/searchTable.scss";
</style>
