<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_evaluation.evaluation.searchPubEmp')}}
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input class="searchInput" :placeholder="searchText" style="width: 200px" v-model="pmtypeCode"/>
        <span><Button class="btnStyle" type="info" :loading="isSpin" style="width:56px" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        <span><Button class="btnStyle" type="warning" @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table stripe :loading="loading" :no-data-text="noDataImg" height="320" size="small" ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="params.page" size="small" show-elevator show-sizer placement="top"  @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
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
      noDataImg: '<div id="noData"></div>',
      data: [],
      total: NaN,
      pmtypeCode: '',
      searchText: this.$t('lang_evaluation.evaluation.searchPubEmpIns'),
      params: {
        _mt:  this.$global.mt+'ViewEmpMaster.getPage',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        logType: '员工查询',
      },
      searchCloumns: [
        {//员工姓名
          title: this.$t('lang_employee.employeeView.empName'),
          key: 'empName',
          sortable: 'custom',
        },
        // {
        //   title: this.$t('lang_evaluation.evaluation.empGid'),
        //   key: 'empGid',
        //   sortable: 'custom',
        // },
        {//公司
          title: this.$t('lang_employee.employeeView.empcompHirecompanyDis'),
          key:'empcompHirecompanyDis',
          sortable:'custom'
        },
        {//部门
          title: this.$t('lang_employee.employeeView.empcompDeptDis'),
          key:'empcompDeptDis',
          sortable:'custom'
        },
        {//员工号
          title: this.$t('lang_employee.employeeView.empkiWorkno'),
          key:'empkiWorkno',
          sortable:'custom'
        }
      ],
    }
  },
  props: {
  },
  mounted() {

  },
  methods: {
    getData(page) {
      const t = this;
      t.loading = true;
      t.isSpin = true;
      t.data = []
      if (page) {
          t.params.page = page
      }
      const data = deepCopy(t.params)
      data['empCname'] = t.pmtypeCode
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
      this.params.page = 1
      this.$emit('closeUp')
      this.pmtypeCode = ''
    },
    dbCkick(row) {
      const t = this
      this.$emit('changeinput', row[t.searchCloumns[0].key], row.id)
      this.$emit('closeUp')
      this.close()
      this.pmtypeCode = ''
    },
    clear() {
//      this.getData(1)
//      this.pmtypeCode = ''
      this.close()
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
      if (column.order !== 'normal') {
        this.params.order = column.order
        this.getData()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../sass/searchTable.scss";
</style>
