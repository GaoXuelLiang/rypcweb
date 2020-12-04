<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_organization.orgcostcenter.costcenterList')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_organization.orgcostcenter.cOrENameDis')" class="searchInput"  v-model="name"/>
        <span style="margin: 0;"><Button type="info" :loading="isSpin" style="width:56px" class="btnStyle"  @click="getData(params, 1)">
          <span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span style="margin: 0;"><Button type="warning"  class="btnStyle"   @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" stripe :no-data-text="noDataImg" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="params.APpage" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
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
        isSpin:false,
        noDataImg: '<div id="noData"></div>',
        data: [],
        total: NaN,
        name: '',
      }
    },
    props: {
      searchText: String,
      searchCloumns: Array,
      params: Object,
      searchText1: String,
    },
    mounted() {

    },
    methods: {
      getData(params, page) {
        const t = this
        if (page) {
          params.APpage = page
        }
        const data = deepCopy(params)
        data.name = t.name
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isSpin = true
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
           t.isSpin = false
        })
      },
      close() {
        this.name = ''
        this.params.APpage = 1
        this.$emit('closeUp')
        this.$emit('closeOrgcostcenter')
      },
      dbCkick(row) {
        const t = this
        t.$emit('changeinput', row.cotcCname, row.id)
        t.$emit('closeUp')
        this.close()
        t.$emit('closeOrgcostcenter')
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
        this.name = ''
        this.$emit('clear')
        this.$emit('closeUp')
        this.$emit('closeOrgcostcenter')
      },
      sortable(column) {
        this.params.APsort = column.key
        this.params.APorder = column.order
        if (column.order !== 'normal') {
          this.getData(this.params)
        } else {
          this.params.order = 'desc'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/searchTable";
</style>
