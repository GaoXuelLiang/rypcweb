<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;{{title}}
        </div>
          <img @click="close" class="btn_img" src="../../../../static/largeScreen/popup_close.png" alt="">
      </div>
      <Row class="table-form">
        <Input placeholder="请输入周期" style="width: 200px" v-model="normName"/>
        <span style="margin: 0;"><Button type="primary"  @click="getData(params, 1)">{{$t('button.ser')}}</Button></span>
      </Row>
      <row class="table-form" ref="table-form">
        <Table height="320" size="small" border ref="selection" :columns="searchCloumns" @on-sort-change="sortable" :data="data" @on-row-dblclick="dbCkick"></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" :current="params.page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px;color:#fff"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default{
    data() {
      return {
        title: '选择周期',
        data: [],
        total: NaN,
        current: 1,
        normName: '',
      }
    },
    props: {
      searchCloumns: Array,
      params: Object,
      isSingle: Boolean
    },
    mounted() {
    },
    methods: {
      getData(params, page) {
        const t = this
        if (page) {
          params.page = page
        }
        const data = deepCopy(params)
//        if(this.isSingle) {
//          data.evaalName = t.normName
//        }else {
//          data.evadptalName = t.normName
//        }
        data.fyYear = t.normName
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].value
            t.total = res.data.content[0].records
            t.current = res.data.content[0].page
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      close() {
        this.normName = ''
        this.params.page = 1
        this.$emit('closeUpA')
      },
      dbCkick(row) {
        const t = this
        this.$emit('changeinput', row, row.id)
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
/deep/ .ivu-table-border:after {
  width: 0;
}
/deep/ .ivu-table-wrapper-with-border {
  border: none;
}
/deep/ .ivu-table-border th {
  border-right: none;
}
/deep/ .ivu-table-border td {
  border-right: none;
}
/deep/ .ivu-table th {
  border-bottom:1px solid rgba(0,144,255,1);
  background-color:#11162f;
  color: #fff;
}
/deep/ .ivu-table-body {
  border-bottom: none !important;
  background-color: #11162f !important;
}
/deep/ .ivu-table td {
  background-color:#11162f;
  color: #fff;
  border-bottom:1px solid rgba(0,144,255,1);
}
/deep/ .ivu-page-prev {
  background-color:rgba(0,0,0,0.1);
  color: #fff;
}
/deep/  .ivu-page-next {
   background-color:rgba(0,0,0,0.1);
  color: #fff;
}
/deep/ .ivu-select {
   background-color:rgba(0,0,0,0.1);
  color: #fff;
}
/deep/ .ivu-select-selection {
  background-color:#11162f;
  color: #fff;
  border: 1px solid rgba(0,144,255,1) !important;
}
/deep/ .ivu-select-item {
  background-color:#11162f;
  color: #fff;
}
/deep/ .ivu-select-dropdown {
  background-color:#11162f;
}
/deep/ .ivu-page-item {
  background-color:rgba(0,0,0,0.1);
  color: #fff;
}
/deep/  .ivu-page-options-elevator {
  color: #fff;
}
/deep/  .ivu-page-options-elevator input {
  background-color:rgba(0,0,0,0.1);
  border: 1px solid rgba(0,144,255,1);
  color: #fff;
}
/deep/ .ivu-table-body {
  background-color:#11162f;
}
/deep/ .ivu-input {
  border:1px solid rgba(0,144,255,1) !important;
  height: 30px !important;
  line-height: 30px !important;
}
/deep/ .ivu-select-item-focus, .ivu-select-item:hover{
  background: unset;
}
.btn_img{
  width: 36px;
  height: 36px;
  margin: 10px 20px 0 0;
  cursor: pointer;
}
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
      background: url('../../../../static/largeScreen/popup_bg.png') no-repeat;
      background-size: 100% 100%;
      background-position: 100% 100%;
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
        top: 12px;
        // border-bottom: 1px solid #efefef;
        left: 0;
        color: #fff;
        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
</style>
