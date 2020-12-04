<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;查询选项
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <!-- <Input :placeholder="searchText" style="width: 200px" v-model="flvarName"/>
        <span style="margin: 0;"><Button type="primary"  @click="getData(params, 1)">{{$t('button.ser')}}</Button></span>
        <span style="margin: 0;"><Button type="warning"   @click="clear">清空</Button></span> -->
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" :no-data-text="noData" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="searchData" @on-row-dblclick="dbCkick"></Table>
      </row>
      <!-- <Page :total="total" size="small" show-elevator show-sizer :current="page" placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span> -->
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../axios/axios'
  import { isSuccess, deepCopy } from '../../lib/util'

  export default{
    data() {
      return {
        total: NaN,
        noData: '<div id="noData"></div>',
        searchCloumns: [
          {
            title: '查询名称',
            key: 'clmDname',
            sortable: 'custom',
          },
        ],
      }
    },
    props: {
      searchData: Array,
    },
    mounted() {

    },
    methods: {
      close() {
        this.$emit('closeUp')
      },
      dbCkick(row) {
        const t = this
        t.$emit('selectInput', row)
        t.$emit('closeUp')
      },
      sizeChange(size) {
        const t = this
        t.rows = size
      },
      pageChange(page) {
        const t = this
        t.page = page
      },
      clear() {
        this.$emit('clear')
        this.$emit('closeUp')
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
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
      padding: 60px 20px 30px 20px;
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
