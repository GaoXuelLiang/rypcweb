<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          短信变量维护
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
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="$store.state.platApproval.childTable8"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updSmsVar v-show="showMsg" @hideMsg="hideMsg" ref="updMailVar" :logType="logType"></updSmsVar>
  </div>
    </div>
  </div>
</template>
<script>
  import updSmsVar from './updSmsVar'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
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
        rows: 10,
        page: 1,
        showMsg: false,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_approval.smsvar.aprvarMark'),
            key: 'aprvarMark',
            align: 'left',
          },
          {
            title: this.$t('lang_approval.smsvar.aprvarName'),
            key: 'aprvarName',
            align: 'left',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 80,
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
      updSmsVar,
    },
    methods: {
      getdata() {
        const t = this;
        t.loading = true;
        const data = {
          _mt:  this.$global.mt+'PlatAprvar.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          aprvarMark: t.aprvarMark,
          aprvarSource: 'aprvsms',
          aprvId: t.$store.state.platApproval.mainId,
          aprvarBillid: t.$store.state.platApproval.childId4, // 没有步骤
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            this.$store.commit('platApproval/setChildTable8', res.data.content[0].rows)
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
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'PlatAprvar.delByIds',
            funId: '1',
            companyId: '1',
            logType: this.$t('button.del'),
            delIds: t.tableselected.toString(),
          }).then((res) => {
            t.$Modal.confirm({
              onOk: () => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
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
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        }
      },
      initVar() {
        const t = this
        getDataLevelUserLoginNew({
          _mt:  this.$global.mt+'PlatAprvar.initVar',
          funId: '1',
          logType: '初始化',
          aprvarMark: t.aprvarMark,
          aprvarSource: 'aprvsms',
          aprvId: t.$store.state.platApproval.mainId,
          aprvarBillid: t.$store.state.platApproval.childId4, // 没有步骤
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
        this.$store.commit('platApproval/setIndex', index)
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
  @import "../../../sass/searchTable.scss";
</style>
