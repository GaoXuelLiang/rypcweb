<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{ $t("lang_employee.searchColumn.searchCompany") }}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input
          class="searchInput"
          placeholder="请输入公司名称"
          v-model="unitsName"
        />
        <span class="btnStyle">
          <Button
            type="info"
            style="width: 56px"
            :loading="isSpin"
            @click="search"
          >
            <span v-if="!isSpin">{{ $t("button.ser") }}</span>
          </Button>
        </span>
        <!--<span style="margin: 0;"><Button type="warning"   @click="clear">{{$t('button.cle')}}</Button></span>-->
      </Row>
      <row class="table-form" ref="table-form">
        <Spin v-show="isSpin" size="large" fix></Spin>
        <Table
          :no-data-text="noDataImg"
          height="320"
          size="small"
          stripe
          ref="selection"
          :columns="searchHCClo"
          @on-sort-change="sortable"
          :data="data"
          @on-row-dblclick="dbCkick"
        ></Table>
      </row>
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
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginData } from "../../axios/axios";
import { isSuccess, deepCopy } from "../../lib/util";

export default {
  data() {
    return {
      data: [],
      total: NaN,
      unitsName: "",
      isSpin: false,
      noDataImg: '<div id="noData"></div>',
    };
  },
  props: {
    searchHCClo: Array,
    params: Object,
  },
  mounted() {},
  methods: {
    search() {
      this.params.APpage = 1;
      this.getData(this.params);
    },
    getData(params) {
      const t = this;
      const data = deepCopy(params);
      data.unitFnameCn = t.unitsName;
      for (const dat in data) {
        if (data[dat] === "") {
          delete data[dat];
        }
      }
      t.isSpin = true;
      getDataLevelUserLoginData(data)
        .then((res) => {
          t.isSpin = false;
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows;
            t.total = res.data.content[0].records;
          }
        })
        .catch(() => {
          t.isSpin = false;
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage"),
          });
        })
        .finally(() => {
          t.isSpin = false;
        });
    },
    close() {
      const t = this;
      this.unitsName = "";
      t.data = [];
      t.total = NaN;
      this.params.APpage = 1;
      t.$emit("closeHCompany");
    },
    clear() {
      const t = this;
      this.unitsName = "";
      t.data = [];
      t.total = NaN;
      this.params.APpage = 1;
      t.$emit("closeHCompany");
    },
    dbCkick(row) {
      const t = this;
      this.close();
      t.$emit("inputHCompany", row.unitFnameCn, row.id, row.unitsSname, row);
      t.$emit("closeHCompany");
    },
    sortable(column) {
      this.params.APsort = column.key;
      this.params.APorder = column.order;
      if (column.order !== "normal") {
        this.getData(this.params);
      } else {
        this.params.APorder = "desc";
      }
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
</style>
