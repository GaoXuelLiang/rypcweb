<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          &nbsp;授权用户
        </div>
        <Button type="text" @click="close" style="margin-left: 10px">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>’
      <Row class="table-form">
        <Input
          class="searchInput"
          :placeholder="searchText"
          style="width: 200px"
          v-model="name"
        />
        <span style="margin: 0"
          ><Button
            type="info"
            style="width: 56px"
            :loading="isSpin"
            @click="getData()"
            ><span v-if="!isSpin">{{ $t("button.ser") }}</span></Button
          ></span
        >
      </Row>
      <row class="table-form" ref="table-form">
        <Table
          stripe
          :loading="loading"
          :no-data-text="noDataImg"
          height="320"
          size="small"
          ref="selection"
          :columns="searchCloumns"
          :data="data"
          @on-row-dblclick="dbCkick"
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
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "../../lib/util";

export default {
  data() {
    return {
      loading: false,
      isSpin: false,
      data: [],
      total: NaN,
      name: "",
      searchText: "请输入授权人姓名",
      noDataImg: '<div id="noData"></div>',
      params: {
        _mt: this.$global.mt + "UserInfo.getPage",
        APsort: "id",
        APorder: "asc",
        AProws: 10,
        APpage: 1,
        APffk: "glc1860",
        status: "02valid",
        name: this.name,
      },
      searchCloumns: [
        {
          title: "授权人姓名",
          key: "name",
        },
        {
          title: "授权人邮箱",
          key: "email",
        },
      ],
    };
  },
  props: {
    searchTitle: String,
  },
  mounted() {},
  methods: {
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
      data.name = t.name;

      getDataLevelUserLoginData(data)
        .then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows;
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
      this.name = "";
      this.params.APpage = 1;
      this.$emit("closeUp");
    },
    dbCkick(row) {
      const t = this;
      //      console.log(row)
      this.close();
      t.$emit("changeinputZhil", row.name, row.id);
      t.$emit("closeUp");
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
  },
};
</script>
<style lang="scss" scoped>
@import "../../sass/searchTable";
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