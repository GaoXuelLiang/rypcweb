<template>
  <div class="content-main smsList2">
    <Row>
<!--      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>-->
<!--      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
    </Row>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" :height="childTableHeight" @on-selection-change="selectedtable" @on-sort-change="sortable" size="small" ref="selection" :columns="columns" :data="$store.state.platApproval.childTable4"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updSmsDetail v-show="showMsg" @hideMsg="hideMsg" ref="updSmsDetail" :logType="logType"></updSmsDetail>
    <smsToList v-show="showConMsg" @hideMsg="hideConMsg" ref="smsToList" :logType="logType"></smsToList>
    <smsVar v-show="showVarMsg" @hideMsg="hideVarMsg" ref="smsVar"></smsVar>
  </div>
</template>
<script>

  import updSmsDetail from './updSmsDetail'
  import smsToList from './smsToList'
  import smsVar from './smsVar'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        childTableHeight: 0,
        pageHeight:'smsList2',
        noDataImg: '<div id="noData"></div>',
        logType: '',
        total: NaN,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        tableselected: [],
        showMsg: false,
        showVarMsg: false,
        showConMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.smsList.aprvsmsOrder'),
            key: 'aprvsmsOrder',
            width: 80,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.smsList.aprvsmsContent'),
            key: 'aprvsmsContent',
  //          sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.smsList.aprvsmsSendstyle'),
            key: 'aprvsmsSendstyleDis',
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.smsList.aprvsmsReciever'),
            key: 'aprvsmsReciever',
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.smsList.aprvsmsIsvalid'),
            key: 'aprvsmsIsvalidDis',
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.smsList.action'),
            key: 'action',
            width: 150,
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showContact(params.row.id, params.index)
                    },
                  },
                }, this.$t('lang_approval.smsList.aprvsmsReciever')),
              ])
            },
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 128,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  // style: {
                  //   marginRight: '3px',
                  // },
                  on: {
                    click: () => {
                      this.vindicateVar(params.row.id, params.index)
                    },
                  },
                }, this.$t('lang_approval.smsList.variab')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updSmsDetail,
      smsToList,
      smsVar,
    },
    methods: {
      getdata(page) {
        const t = this;
        t.loading = true;
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'PlatAprvsms.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          aprvsmsAprvid: t.$store.state.platApproval.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              t.$store.commit('platApproval/setChildTable4', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              t.$store.commit('platApproval/setChildTable4', [])
            }
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
      getTableHeight () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
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
        } else {
          this.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      deletemsg() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              // 添加请求模块
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatAprvsms.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getdata()
                }
              }).catch(() => {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.errormessage'),
                })
              })
            },
            onCancel: () => {},
          })
        }
      },
      showMsgBtn() {
        this.showMsg = true
      },
      openUp(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        if (id) {
          t.$refs.updSmsDetail.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      showContact(id, index) {
        const t = this
        t.showConMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        t.$refs.smsToList.getdata(id)
      },
      hideConMsg() {
        this.getdata()
        this.showConMsg = false
      },
      hideVarMsg() {
        this.showVarMsg = false
      },
      vindicateVar(id, index) {
        const t = this
        t.showVarMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId4', id)
        if (id) {
          t.$refs.smsVar.getdata()
        }
      },
      hideVarMsg() {
        this.showVarMsg = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/childTable.scss";
</style>
