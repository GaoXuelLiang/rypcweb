<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          选择表单
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchName" style="width: 200px" v-model="tableName"/>
        <Input :placeholder="searchText" style="width: 200px;margin-left:10px" v-model="tableDesc"/>
        <span style="margin-left: 10px;"><Button type="info"  :loading='loading' style="width:56px" @click="getData(1)"><span v-if="!loading">{{$t('button.ser')}}</span></Button></span>
        <span style="margin-left: 10px;"><Button type="warning" @click="clear">清空</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320"   :no-data-text="noDataImg" size="small" :loading='loading'  ref="selection" :columns="searchCloumns" @on-sort-change="sortable" stripe :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" :current="params.page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
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
      data: [],
      total: NaN,
      tableName: '',
      tableDesc: '',
      searchName: '请输入表单名称',
      searchText: '请输入表单注释',
      params: {
        _mt:  this.$global.mt+'GenConfiguration.getPage',
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
      },
      searchCloumns: [
        {
          title: '表单名称',
          key: 'tableName',
          sortable: 'custom',
          align:'center'
        },
        {
          title: '表单注释',
          key: 'tableDesc',
          sortable: 'custom',
          align:'center'
        },
        {
          title: '表单类型',
          key: 'tableTypeDis',
          sortable: 'custom',
          align:'center'
        },
        {
          title:'外键属性',
          key:'extCloumn',
          sortable: 'custom',
          align:'center'
        }
      ],
    }
  },
  props: {
    funCategoryid:String
  },
  mounted() {

  },
  methods: {
    getData(page) {
      const t = this
      t.loading = true
      if (page) {
        t.params.page = page
      }
      const data = deepCopy(t.params)
      data['tableName'] = t.tableName
      data['tableDesc'] = t.tableDesc
    //   data['paramType'] = t.funCategoryid
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
        t.loading = false
      })
    },
    //  getData (page) {
    //         const t = this
    //         t.loading = true
    //         // t.isSpin = true
    //         if (page) {
    //             t.page = page
    //         }
    //         if (this.order === 'normal') {
    //             this.order = 'desc'
    //         }
    //         getDataLevelUserLogin({
    //             _mt:  this.$global.mt+'BaseParamInfo.getParamInfoByPage',
    //             sort: t.sort,
    //             order: t.order,
    //             rows: t.rows,
    //             page: t.page,
    //             paramCode: t.pmtypeCode,
    //             paramType: t.funCategoryid,
    //             paramInfoName: t.pmtypeName,
    //         }).then((res) => {
    //             if (isSuccess(res, t)) {
    //                 t.data = res.data.content[0].rows
    //                 t.total = res.data.content[0].records
    //             }
    //         }).catch(() => {
    //             t.$Modal.error({
    //                 title: this.$t('reminder.err'),
    //                 content: this.$t('reminder.errormessage'),
    //             })
    //         }).finally(() => {
    //             t.loading = false
    //             // t.isSpin = false
    //         })
    //     },
    close() {
      this.params.page = 1
      this.tableName = ''
      this.tableDesc = ''
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput',  row[t.searchCloumns[0].key],row[t.searchCloumns[1].key],row[t.searchCloumns[3].key])
      this.$emit('closeUp')
    },
    clear() {
      this.tableName = ''
      this.tableDesc = ''
    //   this.$emit('clear')
    //   this.$emit('closeUp')
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
        this.params.order = 'desc'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../sass/searchTable";
</style>
