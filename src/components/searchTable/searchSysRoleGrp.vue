<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          管理员角色组信息
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span style="margin-left: 10px;"><Button type="info" :loading='isSpin' style="width:56px" @click="getData(params)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span style="margin-left: 10px;"><Button type="warning"   @click="clear">清空</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" :no-data-text="noDataImg" stripe :loading='loading' ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data"  @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" show-elevator show-sizer placement="top"  @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
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
      searchText: '请输入角色组名称',
      params: {
        _mt:  this.$global.mt+'AuthRoleGroup.getAuthRoleGroupByPage',
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        rolegrpType: '1admin',
        valid: '1',
        rolegrpCompId: '999',
      },
      searchCloumns: [
        {
          title: '角色组名称中文',
          key: 'rolegrpCname',
          sortable: 'custom',
//        width: 250,
        },
      ],
    }
  },
  props: {
  },
  mounted() {

  },
  methods: {
    getData(id) {
      const t = this
      t.loading = true
      t.isSpin = true
      t.params.rolegrpTiCompId = id
      const data = deepCopy(t.params)
      data['rolegrpCname'] = t.pmtypeCode
      getDataLevelUserLoginNew(data).then((res) => {
        if (isSuccess(res, t)) {
          t.data = res.data.content[0].rows
          t.total = res.data.content[0].records
        }
      }).catch(() => {
        t.loading = false
        t.isSpin = false
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
      t.getData(t.params)
    },
    pageChange(page) {
      const t = this
      t.params.page = page
      t.getData(t.params)
    },
    sortable(column) {
      this.params.sort = column.key
      this.params.order = column.order
      if (column.order !== 'normal') {
        this.getData(this.params)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../../sass/searchTable";
</style>
