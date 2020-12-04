<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;审批角色定义
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <Input :placeholder="searchText" style="width: 200px" v-model="countryCname"/>
        <span style="margin-left: 10px;"><Button type="info"  @click="search" :loading='isSpinTable'><span v-if='!isSpinTable'>{{$t('button.ser')}}</span></Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small"   ref="selection" stripe :columns="searchCloumns" :loading='loading' @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="current" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.APpage - 1) * params.AProws + 1)}} - {{params.APpage*params.AProws > total ? total : params.APpage*params.AProws}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLoginData } from '../../axios/axios'
  import { isSuccessNew, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
        isSpinTable:false,
        loading:false,
        isSpin:false,
        data: [],
        total: NaN,
        current: NaN,
        countryCname: '',
        searchText: '请输入审批角色',
        searchCloumns: [
          {
            title: '审批角色',
            key: 'aproName',
          },
          {
            title: '角色类型',
            key: 'aproTypeDis',
          },
        ],
        params: {
          _mt:  this.$global.mt+'BaseAprvrole.getPage',
          APsort: 'id',
          APorder: 'asc',
          AProws: 10,
          APpage: 1,
          APffk:0
        },
      }
    },
    props: {
      typeName:String
    },
    mounted() {

    },
    methods: {
      search() {
        this.params.APpage = 1
        this.getData()
      },
      getData() {
        const t = this
        t.isSpinTable = true
        t.loading = true
        const data = deepCopy(t.params)
        data.countryCname = t.countryCname
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccessNew(res, t)) {
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
          t.loading = false
          t.isSpinTable = false
        })
      },
      close() {
        this.countryCname = ''
        this.params.APpage = 1
        this.$emit('closeUp')
        // this.$emit('closeCountry')
      },
      dbCkick(row) {
        const t = this
        this.$emit('changeinputAprvrole', row.aproName, row.id)
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
  .table-form{
    margin-bottom: 10px;
  }
  .background{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
    .backbox{
      position:relative;
      width: 800px;
      background-color: #fff;
      padding: 60px 20px 10px 20px;
      border-radius: 10px;
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;

        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
</style>
