<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_platdoc.platMailAttach.searchTitle')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" :placeholder="searchText" style="width: 200px" v-model="flsdcDoctempDis"/>
        <span style="margin: 0;"><Button type="info" :loading="isSpin" style="width:56px" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span style="margin: 0;"><Button type="warning" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe :loading="loading" :no-data-text="noDataImg" height="320" size="small" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">          <Page :total="total" :current="params.page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import treeVue from '../../authorization/plainAuthRole/tree.vue'

export default{
  data() {
    return {
      loading: false,
      isSpin: false,
      noDataImg: '<div id="noData"></div>',
      data: [],
      total: NaN,
      flsdcDoctempDis: '',
      params: {
        _mt:  this.$global.mt+'PlatFlsDoc.getPage',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        logType: '',
        flsdcStep: '0',
        flsdcType: '01fixed',
      },
      searchText: this.$t('lang_platdoc.platMailAttach.searchText'),
      searchCloumns: [
        {
          title: this.$t('lang_platdoc.platMailAttach.flsdcDoctemp'),
          key: 'flsdcDoctempDis',
          width: 250,
        },
        {
          title: this.$t('lang_platdoc.platMailAttach.flsdcStep'),
          key: 'flsdcStepDis',
          width: 250,
        },
      ],
    }
  },
  mounted() {

  },
  methods: {
    getData(page) {
      const t = this;
      t.loading = true;
      t.isSpin = true;
      if (page) {
        t.params.page = page
      }
      const data = deepCopy(this.params)
      data.logType = '查询'
      if (this.$store.state.platSysMailJS.flowstepId) {
        data.flsdcStep = this.$store.state.platSysMailJS.flowstepId
      }
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      getDataLevelUserLoginNew(data).then((res) => {
        if (isSuccess(res, t)) {
          t.data = res.data.content[0].rows
          t.total = res.data.content[0].records
        }
      }).catch(() => {
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      }).finally(()=>{
          t.loading = false;
          t.isSpin = false;
      })
    },
    close() {
      this.sffPhyfield = ''
      this.$emit('closeAttach')
    },
    dbCkick(row) {
      const t = this
      this.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
      this.$emit('closeAttach')
    },
    sizeChange(size) {
      const t = this
      t.params.rows = size
      t.getData()
    },
    pageChange(page) {
      const t = this
      t.params.page = page
      t.getData()
    },
    clear() {
      this.$emit('closeAttach')
    },
    sortable(column) {
      this.params.sort = column.key
      if (column.order !== 'normal') {
        this.params.order = column.order
        this.getData()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../../sass/searchTable.scss";
  @import "../../../sass/table.scss";

  .ivu-btn{
    margin-right: 10px;
  }
</style>
