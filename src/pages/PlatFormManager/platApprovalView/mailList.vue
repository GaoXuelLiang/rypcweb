<template>
  <div class="content-main mailList2">
    <Row class="btnHeight">
<!--      <Button type="primary" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>-->
<!--      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
    </Row>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :height="childTableHeight" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" size="small" ref="selection" :columns="columns" :data="$store.state.platApproval.childTable2"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updMailDetail v-show="showMsg" @hideMsg="hideMsg" ref="updMailDetail" :logType="logType"></updMailDetail>
    <chosedContact v-show="showConMsg" @hideMsg="hideConMsg" ref="chosedContact" :logType="logType"></chosedContact>
    <mailVar v-show="showVarMsg" @hideMsg="hideVarMsg" ref="mailVar"></mailVar>
  </div>
</template>
<script>

  import updMailDetail from './updMailDetail'
  import chosedContact from './chosedContact'
  import mailVar from './mailVar'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        childTableHeight: 0,
        pageHeight:'mailList2',
        noDataImg: '<div id="noData"></div>',
        logType: '',
        conttype: '',
        total: NaN,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        showMsg: false,
        showConMsg: false,
        showVarMsg: false,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.mailList.aprvmlOrder'),
            key: 'aprvmlOrder',
            width: 80,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_approval.mailList.aprvmlObject'),
            key: 'aprvmlObject',
//            width: 220,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.mailList.aprvmlSendstyle'),
            key: 'aprvmlSendstyleDis',
//            width: 150,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.mailList.aprvmlIsvalid'),
            key: 'aprvmlIsvalidDis',
//            width: 80,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.mailList.aprvmlReciever'),
            key: 'aprvmlReciever',
//            width: 80,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.mailList.aprvmlCC'),
            key: 'aprvmlCC',
//            width: 80,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.mailList.action'),
            key: 'action',
            width: 150,
//            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '10px',
                  },
                  on: {
                    click: () => {
                      this.showContact(params.row.id, '01to', params.index)
                    },
                  },
                }, this.$t('lang_approval.mailList.aprvmlReciever')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showContact(params.row.id, '02cc', params.index)
                    },
                  },
                }, this.$t('lang_approval.mailList.aprvmlCC')),
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
                  //   marginRight: '10px',
                  // },
                  on: {
                    click: () => {
                      this.vindicateVar(params.row.id, params.index)
                    },
                  },
                }, this.$t('lang_approval.mailList.variab')),
              ])
            },
          },
        ],
      }
    },
    components: {
      updMailDetail,
      chosedContact,
      mailVar,
    },
    methods: {
      getdata(page) {
        const t = this;
        t.loading = true;
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'PlatAprvmail.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          aprvmlAprvid: t.$store.state.platApproval.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('platApproval/setChildTable2', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('platApproval/setChildTable2', [])
             }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(() => {
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
                _mt:  this.$global.mt+'PlatAprvmail.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.getdata()
                  t.tableselected = []
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
//      将本条数据的id传入mainid（如果有的话）
        this.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId2', id)
        if (id) {
          t.$refs.updMailDetail.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      showContact(id, conttype, index) {
        const t = this
        t.showConMsg = true
        this.$store.commit('platApproval/setIndex', index)
        t.$refs.chosedContact.getData(id, conttype)
        t.$store.commit('platApproval/setChildId2', id)
      },
      hideConMsg() {
        this.getdata()
        this.showConMsg = false
      },
      vindicateVar(id, index) {
        const t = this
        // 将邮件的id存入路由中
        this.$store.commit('platApproval/setIndex', index)
        this.$store.commit('platApproval/setChildId2', id)
        t.showVarMsg = true
        if (id) {
          t.$refs.mailVar.getdata()
        }
      },
      hideVarMsg() {
        this.showVarMsg = false
      },
      getTableHeight () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
      }
    },
    destroyed () {
      window.onresize = null;
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/childTable.scss";
</style>
