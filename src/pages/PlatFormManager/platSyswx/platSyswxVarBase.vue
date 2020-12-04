<template>
  <div class="content-main platSyswxVarBase">
    <Row class="btnHeight">
      <Button type="warning" @click="showMsgBtn(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="primary" @click="init">{{$t('button.ini')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="childTableHeight" size="small" ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg" @hideMsg="hideMsg" :id="id" ref="contentMsg" @getData="addNewArray" @update="updateArray" ></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './editPlatSyswxVar'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        total: NaN,
        showMsg: false,
        noDataImg:'<div id="noData"></div>',
        nameOrMobile: '',
        childTableHeight:0,
        pageHeight: "platSyswxVarBase",
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_platform.syswx.syswxvarMark'),
            key: 'syswxvarMark',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platform.syswx.syswxvarName'),
            key: 'syswxvarName',
          },
          {
            title: this.$t('lang_platform.syswx.syswxvarValdesc'),
            key: 'syswxvarValdesc',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showMsgBtn(params.row.id, this.$t('button.y.upd'), params.index)
                    },
                  },
                }, this.$t('button.y.upd')),
              ])
            },
          },
        ],
        // 用于初始化变量
        syswxContent: '',
        syswxTo: '',
        syswxSendcondition: '',
        data: [],
        params: {
          _mt:  this.$global.mt+'PlatSyswxVar.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          syswxvarWxid: NaN,
          logType: '',
        },
        index: '',
        tableselected: '',
      }
    },
    props: {
      id: Number,
    },
    components: {
      contentMsg,
    },
    methods: {
      get(id, content, syswxTo, condition) {
        this.params.syswxvarWxid = id + ''
        this.params.logType = '查询List信息'
        this.syswxContent = content
        this.syswxTo = syswxTo
        this.syswxSendcondition = condition
        this.getdata()
      },
      getdata() {
        const t = this;
        t.loading = true;
        const data = deepCopy(t.params)
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.total = res.data.content[0].records
            t.data = res.data.content[0].rows
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
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getdata()
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (this.params.order !== 'normal') {
          this.getdata()
        } else {
          this.params.order = 'desc'
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
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatSyswxVar.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                ids: t.tableselected.toString(),
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
      init() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'PlatSyswxVar.initVar',
          funId: '1',
          logType: '初始化微信变量',
          id: this.params.syswxvarWxid,
          syswxContent: this.syswxContent,
          syswxTo: this.syswxTo,
          syswxSendcondition: this.syswxSendcondition,
        }
        getDataLevelUserLoginNew(data).then((res) => {
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
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.index = index
//        t.$refs.contentMsg.setIdname(t.idname)
        if (logType === this.$t('button.y.upd')) {
          t.$refs.contentMsg.setRowId(id)
        }
      },
      addNewArray(res) {
        const t = this
        t.getdata(1)
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.getdata(1)
//        t.data.splice(t.index, 1, res)
      },
      hideMsg() {
        this.showMsg = false
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
