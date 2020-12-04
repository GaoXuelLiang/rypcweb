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
        <Input :placeholder= searchText1 style="width: 200px" v-model="pmtypeName"/>
        <Input :placeholder=searchText2 style="width: 200px;margin-left:10px" v-model="pmtypeCode"/>
        <span style="margin-left: 10px;"><Button type="info" :loading='loading' style="width:56px" @click="getData(params, 1)"><span v-if="!loading">{{$t('button.ser')}}</span></Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320"     :no-data-text="noDataImg" size="small" :loading='loading'  ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" stripe @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer :current="params.page" placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
// import { getDataLevelUserLoginNew } from '../../axios/axios'
import {getDataLevelUserLoginData} from '@/axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'

export default{
  data() {
    return {
      noDataImg: '<div id="noData"></div>',
      loading:false,
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
      const t = this
      t.loading = true
      if (page) {
        params.APpage = page
      }
      const data = deepCopy(params)
      if(t.pmtypeCode && t.pmtypeCode !== ''){
        data.lanTypeCode = t.pmtypeCode
      }
      if(t.pmtypeName && t.pmtypeName !== ''){
        data.lanTypeName = t.pmtypeName
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
        t.loading = false
      })
    },
    close() {
      this.pmtypeName = ''
      this.params.APpage = 1
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      t.close()
      this.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[1].key])
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
    clear() {
      this.close()
      this.$emit('clear')
      this.$emit('closeUp')
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
  @import "../../sass/searchTable";
</style>
