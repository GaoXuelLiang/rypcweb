<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_role.adminfun.searchTitle')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span style="margin: 0;"><Button type="info" :loading="isSpin" @click="getData(1)" style="width:56px"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <!--<span style="margin: 0;"><Button type="warning"   @click="clear">{{$t('button.cle')}}</Button></span>-->
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe :loading="loading" :no-data-text="noDataImg" height="320" size="small" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :current="params.page"  :total="total" size="small" show-elevator show-sizer placement="top"  @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLoginNew } from '../../axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'

export default{
  data() {
    return {
      loading: false,
      isSpin: false,
      data: [],
      total: NaN,
      pmtypeCode: '',
      noDataImg: '<div id="noData"></div>',
      searchText: this.$t('lang_role.adminfun.searchText'),
      params: {
        _mt:  this.$global.mt+'SysFunctions.getSysFunctionsByPage',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
      },
      searchCloumns: [
        {
          title: this.$t('lang_role.adminfun.funLancode'),
          key: 'funLancodeDis',
          width: 180,
          sortable: 'custom',
        },
        {
          title: this.$t('lang_role.adminfun.funCode'),
          key: 'funCode',
          width: 180,
          sortable: 'custom',
        },
      ],
    }
  },
  props: {
  },
  mounted() {
    this.getData(1)
  },
  methods: {
    getData(page) {
      const t = this;
      t.loading = true;
      t.isSpin = true;
      if (this.params.order === 'normal') {
          this.params.order = 'desc'
      }
      if (page) {
        t.params.page = page
      }
      const data = deepCopy(t.params)
      data['funLancodeDis'] = t.pmtypeCode
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
      this.params.page = 1
      this.pmtypeCode = ''
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row[t.searchCloumns[0].key], row.id, row.funCode)
      this.$emit('closeUp')
      this.pmtypeCode = ''
    },
    clear() {
      this.pmtypeCode = ''
      this.getData(1)
//      this.$emit('clear')
//      this.$emit('closeUp')
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
    sortable(column) {
      this.params.sort = column.key
      this.params.order = column.order
      if (column.order !== 'normal') {
        this.getData(1)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../../sass/table.scss";
@import "../../sass/searchTable.scss";
/deep/ .ivu-btn>.ivu-icon {
  width: 100%;
}
</style>
