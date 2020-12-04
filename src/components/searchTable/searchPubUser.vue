<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_user.rootrole.information')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span style="margin-left: 10px;"><Button type="info" :loading="isSpin" style="width:56px" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span style="margin-left: 10px;"><Button type="warning"  @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table  height="320" size="small" :no-data-text="noDataImg" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" :loading='loading' stripe @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :current="params.APpage"  :total="total" size="small" show-elevator show-sizer placement="top"  @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
// import { getDataLevelUserLoginNew } from '../../axios/axios'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '../../lib/util'

export default{
  data() {
    return {
       noDataImg: '<div id="noData"></div>',
      isSpin:false,
      loading:false,
      data: [],
      total: NaN,
      pmtypeCode: '',
      searchText: this.$t('lang_user.rootrole.searchText'),
      params: {
        _mt:  this.$global.mt+'UserInfo.userpage',
        APsort: 'id',
        APorder: 'desc',
        AProws: '10',
        APpage: 1,
        APstatus: '02valid',
      },
      searchCloumns: [
        {
          title: this.$t('lang_user.rootuser.name'),
          key: 'name',
          sortable: 'custom',
          width: 180,
        },
        // {
        //   title: this.$t('lang_user.rootuser.mobileNo'),
        //   key: 'mobileNo',
        //   sortable: 'custom',
        //   width: 200,
        // },
        {
          title: this.$t('lang_user.rootuser.email'),
          key: 'email',
          sortable: 'custom',
          width: 200,
        },
        {
          title: this.$t('lang_user.rootrole.loginName'),
          key: 'loginName',
          sortable: 'custom',
          width: 200,
        },
      ],
    }
  },
  props: {
  },
  mounted() {
    // this.getData(1)
  },
  methods: {
    getData(page) {
      const t = this
      t.loading = true
      t.isSpin = true
      if (this.params.APorder === 'normal') {
          this.params.APorder = 'desc'
      }
      if (page) {
        t.params.APpage = page
      }
      const data = deepCopy(t.params)
      data['APname'] = t.pmtypeCode
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
        t.isSpin = false
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
      this.$emit('changeinput', row[t.searchCloumns[0].key], row[t.searchCloumns[1].key], row[t.searchCloumns[2].key], row.id)
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
      t.params.AProws = size
      t.getData()
    },
    pageChange(page) {
      const t = this
      t.params.APpage = page
      t.getData()
    },
    sortable(column) {
      this.params.APsort = column.key
      this.params.APorder = column.order
      if (column.order !== 'normal') {
        this.getData(1)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
 @import "../../sass/searchTable";
 .table-form {
   font-size: 0;
 }
</style>
