<template>
  <div class="table">
    <Row>
      <Col span="24">
        <card>
          <p slot="title">
            <Icon type="ios-bookmark"></Icon>
            {{ "员工标签设置" }}
          </p>
          <Row>
            <Col>
              <Row class="btnHeight">
                <span @dblclick="dbHCompany">
                  <Input
                    v-model="empUnitidDis"
                    class="table_search_int pickData"
                    icon="ios-search"
                    :readonly="true"
                    placeholder="请选择公司"
                    @on-click="selectHCompany"
                  />
                </span>
                <span @dblclick="clearDepart">
                  <Input
                    v-model="empDeptidDis"
                    class="table_search_int pickData"
                    icon="ios-search"
                    :readonly="true"
                    placeholder="请选择部门"
                    @on-click="pickDepart"
                  />
                </span>
                <span>
                  <Input
                    placeholder="请输入员工工号"
                    class="table_search_int pickData"
                    v-model="empkiWorkno"
                  />
                </span>
                <span>
                  <Input
                    placeholder="请输入员工姓名"
                    class="table_search_int pickData"
                    v-model="empkiName"
                  />
                </span>
                <Button class="btns" type="primary" @click="search()">{{
                  $t("button.ser")
                }}</Button>
                <Button
                  type="primary"
                  class="btns"
                  @click="openUp(null, $t('button.add'))"
                  >批量设置</Button
                >
                <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
              </Row>
              <Row class="table-form" ref="table-form">
                <Spin fix v-if="isSpinTable" size="large"></Spin>
                <Col span="17">
                  <Table
                    :height="tableheight"
                    size="small"
                    stripe
                    ref="selection"
                    :columns="columns"
                    :data="data"
                    :no-data-text="noData"
                    @on-select="selectedtable"
                    @on-select-cancel="selectedtable"
                    @on-select-all="selectedtable"
                    @on-select-all-cancel="selectedtable"
                    @on-sort-change="sortable"
                    @on-row-click="dbCkick"
                  >
                  </Table>
                </Col>
                <Col span="7">
                  <div
                    ref="tag"
                    class="tag"
                    :style="'height:' + tableheight + 'px;'"
                  >
                    <h2 class="tagTil">已有标签({{ form.tagName }})</h2>
                    <div class="tagList">
                      <div
                        v-for="(item, index) in tagList"
                        :key="index"
                        class="tagBox"
                      >
                        <Tag
                          type="border"
                          style="margin: auto"
                          :name="item.id"
                          closable
                          :color="
                            tagColor[Math.floor(Math.random() * (4 - 0)) + 0]
                          "
                          @on-close="delTag"
                          >{{ item.tagName }}
                        </Tag>
                      </div>
                    </div>
                    <div v-if="tagList.length == 0" class="tagNoData">
                      暂无标签
                    </div>
                  </div>
                </Col>
              </Row>
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
                >
                </Page>
                <span style="margin-left: 10px; margin-top: 2px">
                  {{ $t("reminder.view") }} {{ (page - 1) * rows + 1 }} -
                  {{ page * rows > total ? total : page * rows }}
                  {{ $t("reminder.of") }} <span>{{ total }}</span></span
                >
                <Button
                  size="small"
                  shape="circle"
                  icon="md-refresh"
                  class="refresh"
                  @click="refresh"
                ></Button>
              </Row>
            </Col>
          </Row>
        </card>
      </Col>
    </Row>
    <transition name="fade">
      <update
        v-show="openUpdate"
        :logType="logType"
        :empkiEmpid="empkiEmpid"
        @closeUpd="closeUpd"
        @getData="getData"
        @getTag="getTag"
        @update="updateArray"
        ref="update"
      ></update>
    </transition>
    <!--选择公司-->
    <transition name="fade">
      <searchHCompany
        v-show="openHCompany"
        @closeHCompany="closeHCompany"
        :searchHCClo="searchHCClo"
        @inputHCompany="inputHCompany"
        :params="paramsHCompany"
        ref="searchHCompany"
      ></searchHCompany>
    </transition>
    <!--部门-->
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
import update from "./update.vue";
import { getDataLevelUserLoginData, uploadimage } from "@/axios/axios";
import { isSuccess, deepCopy, getCookie } from "@/lib/util";
import searchHCompany from "../../../components/searchTable/searchHCompany";
import searchDept from "../../../components/searchTable/searchDept";
//表格共有数据
import { mixinTable } from "@/mixins/table";

export default {
  mixins: [mixinTable],
  components: {
    update,
    searchHCompany,
    searchDept,
  },
  name: "labelStaff",
  data() {
    return {
      openUpdate: false,
      isSpinTable: false,
      tableselected: [],
      tagColor: ["primary", "success", "error", "warning", "cyan"],
      form: {
        id: "",
        competNo: "", //编号
        competName: "", //名称
        tagName: "0",
      },
      columns: [
        {
          title: "员工姓名",
          key: "empName",
        },
        {
          title: "员工工号",
          key: "empEmpno",
        },
        {
          title: "雇佣公司",
          key: "empUnitidDis",
        },
        {
          title: "员工部门",
          key: "empDeptidDis",
        },
        {
          title: "岗位",
          key: "empPostidDis",
        },
        {
          title: "员工类型",
          key: "empEmpmodeDis",
        },
        //				{
        //					title: this.$t('button.opr'),
        //					key: 'action',
        //					align: 'center',
        //					width: 120,
        //					render: (h, params) => {
        //						return h('div', [
        //							h('Button', {
        //								props: {
        //									type: 'info',
        //									size: 'small',
        //								},
        //								style: {
        //									marginLeft: '5px',
        //								},
        //								on: {
        //									click: () => {
        //										this.openUp(params.row.id, this.$t('button.upd'))
        //									},
        //								},
        //							}, this.$t('button.upd')),
        //						])
        //					},
        //				},
      ],
      //      雇佣公司
      openHCompany: false,
      searchHCClo: [
        {
          title: this.$t("lang_employee.searchColumn.compCnFullName"),
          key: "unitFnameCn",
        },
        {
          title: this.$t("lang_employee.searchColumn.unitCodeCompany"),
          key: "unitCode",
          sortable: "custom",
        },
        {
          title: "组织类型",
          key: "unitTypeDis",
        },
      ],
      paramsHCompany: {
        _mt: this.$global.mt + "OrgUnits.getPage",
        APsort: "id",
        APorder: "asc",
        AProws: "10",
        APpage: 1,
        APffk: "gep1283",
        APfunId: 2068,
        unitType: "01company",
        importFlag: "-9",
      },
      //      部门
      openDept: false,
      searchDeptClo: [
        {
          title: this.$t("lang_employee.searchColumn.unitCodeDepart"),
          key: "unitCode",
          sortable: "custom",
        },
        {
          title: this.$t("lang_employee.searchColumn.departCnFullName"),
          key: "unitSnameCn",
        },
        {
          title: "部门范围",
          key: "unitScope",
        },
      ],
      paramsDept: {
        _mt: this.$global.mt + "OrgUnits.getPage",
        APsort: "id",
        APorder: "asc",
        AProws: "10",
        APpage: 1,
        APffk: "gep1283",
        APfunId: 2068,
        importFlag: "-9",
        unitPid: "",
        unitType: "02dept",
      },
      empUnitidDis: "",
      empUnitid: "",
      empDeptidDis: "",
      empDeptid: "",
      empkiWorkno: "",
      empkiName: "",
      data: [],
      noData: '<div id="noData"></div>',
      logType: "",
      total: 0,
      index: 0,
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      funId: "1000",
      tagList: [],
      empkiEmpid: "",
    };
  },
  mounted() {
    const t = this;
    t.empUnitid = "";
    t.empUnitidDis = "";
    t.empDeptid = "";
    t.empDeptidDis = "";
    t.empkiWorkno = "";
    t.empkiName = "";
    t.getData(1);
  },
  methods: {
    getData(page) {
      const t = this;
      t.tagList = [];
      t.isSpinTable = true;
      if (page) {
        t.page = page;
      }
      const data = {
        _mt: this.$global.mt + "EmpInfo.getPage",
        APfunId: t.funId,
        APlogType: t.$t("button.ser"),
        AProws: t.rows,
        APpage: t.page,
        APsort: t.sort,
        APorder: t.order,
        APffk: "glc1947",
        empUnitid: t.empUnitid,
        empDeptid: t.empDeptid,
        empEmpno: t.empkiWorkno,
        empName: t.empkiName,
      };
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            t.isSpinTable = false;
            t.data = res.data.content[0].rows;
            t.total = res.data.content[0].records;
          }
        })
        .catch(() => {
          t.isSpinTable = false;
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    getTag(id) {
      const t = this;
    //   console.log("触发了", id);
      if (id) {
        t.id = id;
        getDataLevelUserLoginData({
          _mt: this.$global.mt + "EmpInfo.getById",
          //   logType: this.$t("button.upd"),
          APid: id,
          APffk: "gec1947",
          APfunId: "1947",
        })
          .then((res) => {
            if (isSuccess(res, t)) {
              if (res.data.content[0].empTagList) {
                t.tagList = res.data.content[0].empTagList;
                // console.log(t.tagList, "单人标签");
              } else {
                t.tagList = [];
              }
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
    // 新增修改后刷新页面
    updateArray() {
      const t = this;
      t.getData();
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
            getDataLevelUserLogin({
              _mt: "baseDutygroup.delByIds",
              funId: "1",
              logType: this.$t("button.del"),
              ids: t.tableselected.toString(),
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
    // 新增
    openUp(id, logType) {
      const t = this;
      t.openUpdate = true;
      t.logType = logType;
      if (logType === this.$t("button.upd")) {
        t.$refs.update.getData(id);
      } else {
      }
    },
    closeUpd() {
      const t = this;
      t.openUpdate = false;
    },
    search() {
      this.page = 1;
      this.getData();
    },
    sortable(column) {
      this.sort = column.key;
      this.order = column.order;
      if (this.order !== "normal") {
        this.getData();
      } else {
        this.order = "asc";
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
    refresh() {
      this.getData(1);
    },
    delTag(event, name) {
      this.$Modal.confirm({
        title: this.$t("reminder.remind"),
        content: "您确认删除此标签吗？",
        onOk: () => {
          this.delTagList(name);
        },
        onCancel: () => {},
      });
    },
    delTagList(name) {
      this.tagList.forEach((item, index) => {
        if (item.id.includes(name)) {
          this.tagList.splice(index, 1);
        }
      });
      this.submit();
    },
    submit() {
      const t = this;
      let empkiLabel = [];
      this.tagList.forEach((item, index) => {
        empkiLabel.push(item.id);
      });
      let obj = {};
      obj["id"] = this.empkiEmpid;
      obj["empTag"] = empkiLabel.join(",");

      let array = [];
      array.push(obj);
    //   console.log(array);
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
              content: "删除成功",
            });
            t.getTag(t.empkiEmpid);
          }
        })
        .catch(() => {
          this.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        });
    },
    dbCkick(row) {
      const t = this;
      t.empkiEmpid = row.id;
      t.form.tagName = row.empName;
      t.getTag(t.empkiEmpid);
    },
    //  	雇佣公司
    selectHCompany() {
      const t = this;
      t.$refs.searchHCompany.getData(this.paramsHCompany);
      t.openHCompany = true;
    },
    closeHCompany() {
      const t = this;
      t.$refs.searchHCompany.unitCode = "";
      t.openHCompany = false;
    },
    inputHCompany(name, id) {
      const t = this;
      t.empUnitidDis = name;
      t.empUnitid = id;
      t.paramsDept.unitPid = id;
    },
    dbHCompany() {
      const t = this;
      t.empUnitidDis = "";
      t.empUnitid = "";
      t.paramsDept.unitPid = "";
      t.clearDepart();
    },
    // 选择部门
    pickDepart() {
      const t = this;
      if (t.empUnitid) {
        t.$refs.searchDept.getData(this.paramsDept);
        t.openDept = true;
      } else {
        t.$Modal.error({
          title: this.$t("reminder.err"),
          content: "请先选择公司",
        });
      }
    },
    inputDept(name, id) {
      const t = this;
      t.empDeptidDis = name;
      t.empDeptid = id;
    },
    clearDepart() {
      const t = this;
      t.empDeptidDis = "";
      t.empDeptid = "";
      t.paramsDept.unitPid = "";
    },
    closeDept() {
      const t = this;
      t.openDept = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/sass/autoMainTable.scss";
// .margin-right-10 {
//     margin-right: 10px;
// }
.tagList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.tag {
  border-bottom: 1px solid #dddee1;
  margin-left: 20px;
  .tagTil {
    text-align: center;
    background: #ededed;
    color: #515a6e;
    font-size: 12px;
    font-weight: bold;
    line-height: 35px;
  }
  .tagNoData {
    text-align: center;
    margin: 65% auto;
  }
}

.tagBox{
    margin-right: 10px;
    padding:10px 0 0;
}

// @media (min-width: 600px) {
//   .tagBox {
//     padding: 10px 0;
//     width: 50%;
//   }
// }

// @media (min-width: 1600px) {
//   .tagBox {
//     padding: 10px 0;
//     width: 33%;
//   }
// }

// @media (min-width: 1920px) {
//   .tagBox {
//     padding: 10px 0;
//     width: 25%;
//   }
// }
</style>
