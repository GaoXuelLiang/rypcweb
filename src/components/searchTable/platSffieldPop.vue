<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{title}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" :placeholder=searchText1 style="width: 200px" v-model="pmtypeCode"/>
        <Input class="searchInput" :placeholder=searchText2 style="width: 200px" v-model="pmtypeName"/>
        <span style="margin: 0;"><Button type="info" style="width:56px" :loading="isSpin" @click="getData(params, 1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe :loading="loading" height="320" size="small" ref="selection" :no-data-text="noDataImg" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.APpage" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../axios/axios'
  import {getDataLevelUserLoginData} from '@/axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

export default{
  data() {
    return {
      loading: false,
      isSpin: false,
      noDataImg: '<div id="noData"></div>',
      data: [],
      total: NaN,
      pmtypeCode: '',
      pmtypeName: '',
    }
  },
  props: {
    searchCloumns: Array,
    params: Object,
    searchText1: String,
    searchText2: String,
    title: String,
  },
  mounted() {

  },
  methods: {
    getData(params, page) {
      const t = this;
      t.loading = true;
      t.isSpin = true;
      if (page) {
        params.APpage = page
      }
      const data = deepCopy(params)
      data.sffPhyfield = t.pmtypeCode
      data.sffFieldNameCnDis = t.pmtypeName
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      getDataLevelUserLoginData(data).then((res) => {
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
      this.pmtypeCode = ''
      this.pmtypeName = ''
      this.params.APpage = 1
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row[t.searchCloumns[1].key], row[t.searchCloumns[0].key])
      this.$emit('closeUp')
    },
    clear() {
      this.close()
      this.pmtypeCode = ''
      this.pmtypeName = ''
      this.$emit('clear')
      this.$emit('closeUp')
    },
    sizeChange(size) {
      const t = this
      t.params.AProws = size
      t.getData(t.params)
    },
    pageChange(page) {
      const t = this
      t.params.APpage = page
      t.getData(t.params)
    },
    sortable(column) {
      this.params.APsort = column.key
      this.params.APorder = column.order
      if (column.order !== 'normal') {
        this.getData(this.params)
      } else {
        this.params.APorder = 'desc'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../sass/searchTable.scss";
</style>
