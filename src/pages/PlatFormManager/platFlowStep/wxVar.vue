<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_flow.varList.title2')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
    <div class="table-form">
      <Row>
        <Button type="warning" class="btnStyle" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
        <Button type="primary" class="btnStyle" @click="initVar">{{$t('button.ini')}}</Button>
        <Button type="error" class="btnStyle" @click="deletemsg">{{$t('button.del')}}</Button>
      </Row>
    </div>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" height="320" size="small" ref="selection" :columns="columns" :data="$store.state.flowStepData.childTable4"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getdata(1)"></Button></Row>
    <updWxVar v-show="showMsg" @hideMsg="hideMsg" ref="updMailVar" :logType="logType"></updWxVar>
    </div>
  </div>
</template>
<script>
  import updWxVar from './updWxVar'
  // import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import {getDataLevelUserLoginData} from '@/axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        noDataImg: '<div id="noData"></div>',
        logType: '',
        total: NaN,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: '1',
        showMsg: false,
        tableselected: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_flow.varList.flspvarMark'),
            key: 'flspvarMark',
            align: 'left',
          },
          {
            title: this.$t('lang_flow.varList.flspvarName'),
            key: 'flspvarName',
            align: 'left',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 80,
            fixed: "right",
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.y.upd'), params.index)
                    },
                  },
                }, this.$t('button.y.upd')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updWxVar,
    },
    methods: {
      getdata() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'PlatFlstepVar.getPage',
          APfunId: '1',
          APlogType: this.$t('button.ser'),
          APsort: t.sort,
          APorder: t.order,
          AProws: t.rows,
          APpage: t.page,
          flspvarMark: t.flspvarMark,
          flspvarSource: 'flowwx',
          APflowId: t.$store.state.flowStepData.flowId,
          flspvarBillid: t.$store.state.flowStepData.childId6,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            this.$store.commit('flowStepData/setChildTable4', res.data.content[0].rows)
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false;
        })
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getdata()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getdata()
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getdata()
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length > 0) {
          getDataLevelUserLoginData({
            _mt:  this.$global.mt+'PlatFlstepVar.delByIds',
            APfunId: '1',
            // companyId: '1',
            APlogType: this.$t('button.del'),
            APdelIds: t.tableselected,
          }).then((res) => {
            t.$Modal.confirm({
              onOk: () => {
                if (isSuccess(res, t)) {
                  t.getdata()
                }
              },
              title: this.$t('reminder.remind'),
              content: this.$t('reminder.confirmdelete'),
            })
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        } else {
          t.$Modal.success({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        }
      },
      initVar() {
        const t = this
        getDataLevelUserLoginData({
          _mt:  this.$global.mt+'PlatFlstepVar.initVar',
          APfunId: '1',
          APlogType: '初始化',
          flspvarMark: t.flspvarMark,
          flspvarSource: 'flowwx',
          APflowId: t.$store.state.flowStepData.flowId,
          flspvarBillid: t.$store.state.flowStepData.childId6,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getdata()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      showMsgBtn() {
        this.showMsg = true
      },
      openUp(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('flowStepData/setIndex', index)
        if (id) {
          t.$refs.updMailVar.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      close() {
        this.$emit('hideMsg')
      },
    },
  }
</script>
<style lang="scss" scoped>
  // @import "../../../sass/updateAndAdd.scss";
  // .content-main{
  //   height: 500px;
  //   .table-form{
  //     margin: 10px 0;
  //   }
  // }
  // // 
  // @import "../../../sass/table.scss";
  // .searchInput{
  //   margin-right: 5px;
  // }
  // .ivu-btn{
  //   margin-right: 5px;
  // }
  @import "../../../sass/searchTable.scss";
</style>
