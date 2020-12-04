<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{searchTitle}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" :placeholder=searchText style="width: 200px" v-model="pmtypeCode"/>
        <Button type="info" :loading="isSpin" style="width:56px" @click="getData(params, 1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button>
        <Button type="warning" style="margin-left:10px" @click="clear">{{$t('button.cle')}}</Button>
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe :loading="loading" height="320" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.APpage" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'

export default{
  data() {
    return {
      loading: false,
      isSpin: false,
      data: [],
      total: NaN,
      pmtypeCode: '',
    }
  },
  props: {
    searchCloumns: Array,
    params: Object,
    searchTitle: String,
    searchText: String,
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
      data[t.searchCloumns[0].key] = t.pmtypeCode
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
      this.params.APpage = 1
      this.pmtypeCode = ''
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row[t.searchCloumns[1].key], row.id)
      this.$emit('closeUp')
    },
    clear() {
      this.pmtypeCode = ''
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
        this.params.APorder = ''
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../sass/searchTable.scss';
  // .table-form{
  //   margin-bottom: 10px;
  // }
  // .background{
  //   position: fixed;
  //   overflow: auto;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   left: 0;
  //   z-index: 1000;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   background-color: rgba(0,0,0,.5);
  //   -webkit-overflow-scrolling: touch;
  //   outline: 0;
  // .backbox{
  //   position:relative;
  //   width: 800px;
  //   background-color: #fff;
  //   padding: 60px 20px 30px 20px;
  //   border-radius: 10px;
  // .title{
  //   display: flex;
  //   position: absolute;
  //   height: 40px;
  //   width: 100%;
  //   line-height: 40px;
  //   justify-content: space-between;
  //   align-items: center;
  //   padding-left: 20px;
  //   top: 0;
  //   border-bottom: 1px solid #efefef;
  //   left: 0;

  // .title-text{
  //   font-weight: bold;
  //   font-size: 14px;
  // }
  // }
  // }
  // }
</style>
