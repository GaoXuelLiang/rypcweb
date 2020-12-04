<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;选择国家
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px"  class="searchInput" v-model="countryCname"/>
        <span style="margin: 0;"><Button type="primary" class="btnStyle" @click="search">{{$t('button.ser')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Spin v-show="isSpin" size="large" fix></Spin>
        <Table height="320" size="small" stripe ref="selection" :no-data-text="noDataImg" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="current" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
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
        total: NaN,
        current: NaN,
        countryCname: '',
        searchText: '请输入国家中文名称',
        noDataImg: '<div id="noData"></div>',
         isSpin: false,
        searchCloumns: [
          {
            title: '国家中文',
            key: 'coutCname',
          },
          {
            title: '国家英文',
            key: 'coutEname',
          },
        ],
        params: {
          _mt:  this.$global.mt+'BaseCountry.getPage',
          APsort: 'id',
          APorder: 'asc',
          AProws: 10,
          APpage: 1,
          APffk:0,
          APlogType: '查询',
          APfunId: 1126,
        },
      }
    },
    props: {
      countryName:String
    },
    mounted() {
      this.getData()
    },
    methods: {
      search() {
        this.params.APpage = 1
        this.getData()
      },
      getData() {
        const t = this
        const data = deepCopy(t.params)
        data.coutCname = t.countryCname
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
            t.current = res.data.content[0].page
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
        this.countryCname = ''
        this.params.APpage = 1
        this.$emit('closeCountry')
      },
      dbCkick(row) {
        const t = this
        if(t.countryName == "guojia"){

          this.$emit('inputCountry', row.coutCname, row.id)
        }else if(t.countryName == "guoji"){
          this.$emit('inputCountry1', row.coutCname, row.id)
        }else if(t.countryName == "guojif"){
          this.$emit('inputCountry2', row.coutCname, row.id)
        }
        t.close()
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
          this.getData()
        } else {
          this.params.APorder = 'desc'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
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
  //   .backbox{
  //     position:relative;
  //     width: 800px;
  //     background-color: #fff;
  //     padding: 60px 20px 30px 20px;
  //     border-radius: 10px;
  //     .title{
  //       display: flex;
  //       position: absolute;
  //       height: 40px;
  //       width: 100%;
  //       line-height: 40px;
  //       justify-content: space-between;
  //       align-items: center;
  //       padding-left: 20px;
  //       top: 0;
  //       border-bottom: 1px solid #efefef;
  //       left: 0;

  //       .title-text{
  //         font-weight: bold;
  //         font-size: 14px;
  //       }
  //     }
  //   }
  // }
     @import "../../sass/searchTable";
</style>
