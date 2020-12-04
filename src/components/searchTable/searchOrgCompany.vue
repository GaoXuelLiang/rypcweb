<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_organization.searchOrgCompany.title')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_organization.searchOrgCompany.pmtypeCodeDis')" style="width: 200px" v-model="pmtypeCode"/>
        <span style="margin-left: 10px;"><Button type="info" style="width:56px" :loading='isSpin' @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span style="margin-left: 10px;"><Button type="warning"  @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small"  ref="selection" :no-data-text="noDataImg" :loading='loading'  :columns="searchCloumns" @on-sort-change="sortable" :data="data" stripe @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
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
      noDataImg: '<div id="noData"></div>',
      loading:false,
      isSpin:false,
      data: [],
      total: NaN,
      pmtypeCode: '',
      params: {
        _mt:  this.$global.mt+'OrgUnits.getPage',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        logType: this.$t('lang_organization.searchOrgCompany.logType'),
      },
      searchCloumns: [
        {
          title: this.$t('lang_organization.searchOrgCompany.compFnameCnDis'),
          key: 'compFnameCnDis',
          sortable: 'custom',
          width: 379,
        },
        {
          title: this.$t('lang_organization.searchOrgCompany.compFnameEnDis'),
          key: 'compFnameEnDis',
          sortable: 'custom',
          width: 380,
        },
      ],
    }
  },
  props: {
  },
  mounted() {

  },
  methods: {
    getData(page) {
      const t = this
      t.loading = true
      t.isSpin = true
      if (page) {
        t.page = page
      }
      const data = deepCopy(t.params)
      data['compFnameCnDis'] = t.pmtypeCode
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
          title: this.$('reminder.err'),
          content: this.$('reminder.errormessage'),
        })
      }).finally(()=>{
        t.loading = false
        t.isSpin = false
      })
    },
    close() {
      this.pmtypeCode = ''
      this.params.page = 1
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
      this.$emit('closeUp')
    },
    clear() {
      this.$emit('clear')
      this.$emit('closeUp')
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
        this.getData()
      } else {
        this.order = 'desc'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../../sass/searchTable";
</style>
