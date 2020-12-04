<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          选择直接上级
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="$t('lang_employee.searchColumn.inputDis')" class="searchInput" v-model="empName"/>
        <span style="margin: 0;"><Button type="info" style="width:56px" class="btnStyle" :loading="isSpin" @click="search">
         <span v-if="!isSpin">{{$t('button.ser')}}</span> 
        </Button></span>
        <span style="margin: 0;"><Button type="warning" class="btnStyle"   @click="clear">{{$t('button.cle')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Spin v-show="isSpin" size="large" fix></Spin>
        <Table height="320" size="small" stripe ref="selection"  :no-data-text="noDataImg" :columns="searchMangerClo" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="params.APpage" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
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
        data: [],
        noDataImg: '<div id="noData"></div>',
        total: NaN,
        empName: '',
        isSpin: false,
      }
    },
    props: {
    	params: Object,
    	searchMangerClo: Array,
    	logType: String,
    },
    mounted() {

    },
    methods: {
      search() {
        const t = this
        t.params.APpage = 1
        t.getData(t.params)
      },
      getData(params) {
        const t = this
        const data = deepCopy(params)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
         data.empName = t.empName
        t.isSpin = true
        getDataLevelUserLoginData(data).then((res) => {
          t.isSpin = false

          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      close() {
        this.empName = ''
        this.params.APpage = 1
        this.$emit('closeManger')
      },
      dbCkick(row) {
        const t = this
        if (t.logType === '直接上级') {
          this.$emit('inputManger', row.empName, row.id)
        }
        if (t.logType === t.$t('lang_employee.searchTableTitle.gManger')) {
        	this.$emit('inputGManger', row[t.searchMangerClo[0].key], row.id)
        }
        if (t.logType === t.$t('lang_employee.searchTableTitle.compHR')) {
        	this.$emit('inputCompHR', row[t.searchMangerClo[0].key], row.id)
        }
        this.close()
        this.$emit('closeManger')
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
        this.$emit('clear')
        this.$emit('closeManger')
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
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
  @import '../../sass/searchTable.scss';
</style>
