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
      <Row class="table-form">
        <Col span="15">
          <span @dblclick="clearDatazhil(1)">
            <Input
              style="width: 187px"
              v-model="list2"
              icon="ios-search"
              :readonly="true"
              placeholder="选择招聘岗位"
              @on-click="selectzhil(1)"
            />
          </span>
          <span style="margin: 0"
            ><Button
              type="info"
              style="width: 56px; margin-left: 10px"
              :loading="isSpin"
              @click="getData()"
              ><span v-if="!isSpin">{{ $t("button.ser") }}</span></Button
            ></span
          >
        </Col>

        <Col span="9">
          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="135"
          >
            <FormItem label="保存请选择内聘活动" prop="list1">
              <span @dblclick="clearDatazhil(0)" style="float: right">
                <Input
                  v-model="formValidate.list1"
                  icon="ios-search"
                  :readonly="true"
                  placeholder="选择内聘活动"
                  @on-click="selectzhil(0)"
                />
              </span>
            </FormItem>
          </Form>
        </Col>
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
          :page-size="params.AProws"
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

      <Row type="flex" justify="end">
        <Button @click="handleReset" style="margin-left: 8px">{{
          $t("button.cal")
        }}</Button>
        <Button type="primary" style="margin-left: 8px" @click="handleSubmit">{{
          $t("button.sav")
        }}</Button>
      </Row>
      <transition name="fade">
        <searchPost
          v-show="openzhil2"
          @closeUp="closeUp"
          :searchTitle="searchTitle1"
          @changeinputZhil="changeinputZhil"
          ref="searchPost"
        ></searchPost>
      </transition>

      <!-- 内聘活动 -->
      <transition name="fade">
        <searchAct
          v-show="openzhil"
          @closeUp="closeUp"
          :searchTitle="searchTitle1"
          @changeinputZhil="changeinputZhil"
          ref="searchAct"
        ></searchAct>
      </transition>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "../../../lib/util";
import searchAct from "./searchAct";
import searchPost from "./searchPost";

export default {
  data() {
    return {
      openzhil: false,
      openzhil2: false,
      loading: false,
      isSpin: false,
      searchTitle1: "",
      list1: "",
      list2: "",
      type: "",
      type2: "",
      tows: [],
      data: [],
      total: NaN,
      tableselected: [],
      formValidate: {
        list1: "",
      },
      searchText: "请输入空缺岗位",
      noDataImg: '<div id="noData"></div>',
      params: {
        _mt: this.$global.mt + "OrgPostrelease.availablePost",
        APsort: "id",
        APorder: "asc",
        AProws: 10,
        APpage: 1,
        APffk: "glc1860",
        APkey: "",
        importFlag: "-9"
      },
      ruleValidate: {
        list1: [
          {
            required: true,
            message: " ",
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
          title: "占编人数",
          key: "poreOccupynum",
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
    searchTitle: String,
  },
  mounted() {},
  components: {
    searchAct,
    searchPost,
  },
  methods: {
    changeinputZhil(name, id, e) {
      const t = this;
      if (e === 0) {
        t.formValidate.list1 = name;
        t.type = id;
        // console.log(t.formValidate.list1, t.type, "赋值上了");
      } else if (e === 1) {
        t.list2 = name;
        t.type2 = id;
        // console.log(t.list2, t.type2, "赋值上了");
      }
    },
    selectObj(value) {
      const t = this;
      // console.log(value);
      t.type = value;
    },
    save() {},
    clearDatazhil(e) {
      const t = this;
      if (e === 0) {
        t.list1 = "";
        t.poreAcmid = "";
      } else if (e === 1) {
        t.list2 = "";
        t.type2 = "";
      }
    },
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
      data.APkey = t.type2;
      // data.AProws = t.rows;
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

            // console.log(res.data);
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
    selectzhil(e) {
      const t = this;
      if (e === 0) {
        t.$refs.searchAct.getData();
        t.openzhil = true;
      } else if (e === 1) {
        t.$refs.searchPost.getData();
        t.openzhil2 = true;
      }
    },
    searchClean() {
      this.type = "";
      this.list2 = "";
      this.type2 = "";
      this.formValidate.list1 = "";
      this.tableselected = [];
      this.$refs.formValidate.resetFields();
    },
    close() {
      this.busrName = "";
      this.params.APpage = 1;
      this.params.AProws = 10;
      this.searchClean();
      this.$emit("closeUp");
    },
    closeUp() {
      this.openzhil = false;
      this.openzhil2 = false;
    },
    sizeChange(size) {
      // console.log(size);
      const t = this;
      t.params.AProws = size;
      t.getData();
    },
    pageChange(page) {
      const t = this;
      t.params.APpage = page;
      t.getData(t.params);
    },
    handleReset() {
      this.rows = 10;
      this.$emit("closeUp");
      this.tableselected = [];
      this.$refs.formValidate.resetFields();
    },
    handleSubmit() {
      const t = this;

      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          if (t.tableselected.length === 0) {
            t.$Modal.warning({
              title: this.$t("reminder.remind"),
              content: this.$t("reminder.leastone"),
            });
          } else if (!t.type) {
            t.$Modal.warning({
              title: this.$t("reminder.remind"),
              content: "请选择内聘活动",
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
                      // console.log(res, "进判断后");
                      t.params.AProws = 10;
                      t.close();
                      t.$emit("closeUp");
                      t.$emit("getData");
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
.ivu-col {
  height: 30px;
}
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