<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;空缺岗位
        </div>
        <Button type="text" @click="close" style="margin-left: 10px">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row style="margin-bottom: 10px">
        <Select
          v-model="selStatus"
          placeholder="请选择录用状态"
          class="pickData"
          @on-change="selData"
          clearable
          style="width:200px;"
        >
                          
          <Option
            v-for="(item, index) in selList"
            :value="item.code"
            :key="index"
            >{{ item.name }}</Option
          >
                  
        </Select>
        <Button type="primary" style="margin-left:8px;" @click="handleSubmit(0)">{{
          "录用"
        }}</Button>
        <Button
          type="primary"
          style="margin-left: 8px"
          @click="handleSubmit(1)"
          >{{ "不录用" }}</Button
        >
      </Row>
      <row class="table-form" ref="table-form">
        <Table
          @on-select="selectedtable"
          @on-select-cancel="selectedtable"
          @on-select-all="selectedtable"
          @on-select-all-cancel="selectedtable"
          stripe
          :loading="loading"
          :no-data-text="noDataImg"
          height="320"
          size="small"
          ref="selection"
          :columns="searchCloumns"
          :data="data"
        ></Table>
      </row>
      <Row style="display: flex">
        <Page
          :total="total"
          size="small"
          show-elevator
          show-sizer
          :current="params.APpage"
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

      <!-- <Row type="flex" justify="end">
        <Button @click="handleReset" style="margin-left: 8px">{{
          "关闭"
        }}</Button>
      </Row> -->
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";

export default {
  data() {
    return {
      loading: false,
      isSpin: false,
      selList: [
        {
          code: "01all",
          name: "全部",
        },
        {
          code: "02statusLY",
          name: "未录用",
        },
        {
          code: "01statusLY",
          name: "已录用",
        },
      ],
      selStatus: "01all",
      tows: [],
      data: [],
      total: 0,
      tableselected: [],
      name: "",
      searchText: "请输入空缺岗位",
      noDataImg: '<div id="noData"></div>',
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
        obj: "",
      },
      ruleValidate: {
        obj: [
          {
            required: true,
            message: "内聘活动不能为空",
            trigger: "change",
          },
        ],
      },
      searchCloumns: [
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
      ],
    };
  },
  props: {
    type: Number,
  },
  mounted() {},
  methods: {
    selData(val) {
      const t = this;
      t.selStatus = val;
      t.getData();
    },
    selectObj(value) {
      const t = this;
      console.log(value);
      t.type = value;
    },
    save() {},
    selectedtable(selection) {
      const newArr = [];
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i]);
      }
      this.tableselected = newArr;
    },
    getData() {
      const t = this;
      t.loading = true;
      t.isSpin = true;

      const data = deepCopy(t.params);
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      data.APstatus = t.selStatus;

      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data);
            t.data = res.data.content[0].rows;
            // t.tows = res.data.content[0].tows;
            t.total = res.data.content[0].records;
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
    // 选择公司
    selectzhil() {
      const t = this;
      t.$refs.searchAuth.getData();
      t.openzhil = true;
    },
    close() {
      this.busrName = "";
      this.params.APpage = 1;
      this.$emit("closeUp");
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
    handleReset() {
      this.$emit("closeUp");
    },
    handleSubmit() {
      const t = this;
      console.log(JSON.stringify(t.tableselected), t.type);
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          if (t.tableselected.length === 0) {
            t.$Modal.warning({
              title: this.$t("reminder.remind"),
              content: this.$t("reminder.leastone"),
            });
          } else {
            t.$Modal.confirm({
              title: this.$t("reminder.remind"),
              content: "是否保存",
              onOk: () => {
                getDataLevelUserLoginData({
                  _mt: this.$global.mt + "OrgPostrelease.save",
                  APlogType: this.$t("button.del"),
                  APjsonData: JSON.stringify(t.tableselected),
                  APnpacId: t.type,
                })
                  .then((res) => {
                    if (isSuccess(res, t)) {
                      console.log(res, "进判断后");
                      t.tableselected = [];
                      t.$emit("closeUp");
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
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../sass/searchTable";

// .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
//   background: #19be6b;
// }
//  .pickData {
//    width: 200px !important;
//    color: #ffffff;
// }
// .table-form{
//     margin-bottom: 10px;
//   }
//   .background{
//     position: fixed;
//     overflow: auto;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     z-index: 1000;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: rgba(0,0,0,.5);
//     -webkit-overflow-scrolling: touch;
//     outline: 0;
//     .backbox{
//       position:relative;
//       width: 800px;
//       background-color: #fff;
//       padding: 60px 20px 10px 20px;
//       border-radius: 10px;
//       .title{
//         display: flex;
//         position: absolute;
//         height: 40px;
//         width: 100%;
//         line-height: 40px;
//         justify-content: space-between;
//         align-items: center;
//         padding-left: 20px;
//         top: 0;
//         border-bottom: 1px solid #efefef;
//         left: 0;

//         .title-text{
//           font-weight: bold;
//           font-size: 14px;
//         }
//       }
//     }
//   }
</style>