<template>
  <div class="background">
    <div class="backbox">
      <Spin size="large" fix v-if="spinShow">
      </Spin>
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          选择公司
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>

      </div>
      <Row class="table-form">
        <Input placeholder="请输入公司名称" style="width: 200px; margin-right:5px;" v-model="cityName"/>
        <span style="margin: 0;">
          <Button type="info" class="btnMar" :loading="isSping" @click="getData(params, '', '1')">
              <span v-if="!isSping">{{$t('button.ser')}}</span>
          </Button>
          <Button class="btnMar" type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button> 
        </span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320"  :no-data-text="noDataImg" size="small" stripe ref="selection" :columns="searchBnchClo"  @on-select="selectedtable"  @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :data="data"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="current" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
        <!-- <Button style="position: absolute;right: 0;" type="primary" :loading="isSpin" @click="handleSubmit">{{$t('button.sav')}}</Button> -->
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
        spinShow:false,
        noDataImg: '<div id="noData"></div>',
        data: [],
        total: NaN,
        current: NaN,
        cityName: '',
        theCityType: '',
        tableselected: [],
        tableselected1: [],
        isSpin: false,
        isSping:false,
      }
    },
    props: {
      searchText: String,
      searchBnchClo: Array,
      params: Object,
      searchText1: String,
      searchText2: String,
    },
    mounted() {

    },
    methods: {
      getData(params, cityType, page) {
        const t = this
        t.spinShow =true
        const data = deepCopy(params)
//        if (t.theCityType === '') {
//          t.theCityType = cityType
//        }
        if (page) {
          data.page = page
        }
//        data.cityType = t.theCityType
        data.unitsName = t.cityName
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isSping =true
        getDataLevelUserLoginNew(data).then((res) => {
          t.isSping = false
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
            t.current = res.data.content[0].page
          }
        }).catch(() => {
          t.isSping = false

          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
           t.spinShow = false
        })
      },
      close() {
        this.cityName = ''
        this.theCityType = ''
        this.params.page = 1
        this.$emit('closeUpBn')
      },
      dbCkick(row) {
        const t = this
        this.$emit('changeinput', row[t.searchBnchClo[0].key], row.id, row['cityType'])
        t.close()
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
      clear() {
        this.$emit('clear')
        this.$emit('closeUp')
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
      selectedtable(selection) {
        const newArr = []
        const newArr1 = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
          newArr1.push(selection[i].unitsName)
        }
        this.tableselected = newArr
        this.tableselected1 = newArr1
      },
      handleSubmit() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          this.$emit('inputBnchClo', t.tableselected, t.tableselected1)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
 @import '../../sass/searchTable.scss';
 .btnMar{
   margin-left:10px;
  }
  .btnMar:nth-child(1){
    margin-left:6px;
  }
</style>
