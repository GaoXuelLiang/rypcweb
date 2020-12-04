<template>
  <div class="content-main platMailVar">
    <Row class="btnHeight">
      <Button type="warning" @click="showMsgBtn(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="primary" @click="getInitialization()">{{$t('button.ini')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="childTableHeight" size="small" ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <editMailVar v-show="showMailVar" :logType="logType" @hideMsg="hideMsg" :id="id" :idname="idname" ref="editMailVar" @getData="addNewArray" @update="updateArray" ></editMailVar>
  </div>
</template>
<script>
  import editMailVar from './editSysMailVar'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        total: NaN,
        showMailVar: false,
        noDataImg:'<div id="noData"></div>',
        logType: '',
        childTableHeight:0,
        pageHeight: "platMailVar",
        nameOrMobile: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_platdoc.platMailVar.sysmlvarMark'),
            key: 'sysmlvarMark',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMailVar.sysmlvarName'),
            key: 'sysmlvarName',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_platdoc.platMailVar.sysmlvarValdesc'),
            key: 'sysmlvarValdesc',
            sortable: 'custom',
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
        data: [],
        params: {
          _mt:  this.$global.mt+'PlatSysmailVar.getPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          logType: '',
        },
        index: '',
        tableselected: '',
      }
    },
    props: {
      id: Number,
      idname: String,
    },
    components: {
      editMailVar,
    },
    methods: {
      getdata() {
        const t = this;
        t.loading = true;
        t.params.logType = '查询List信息'
        t.params.sysmlvarMailid = t.$store.state.platSysMailJS.mainId
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
                _mt:  this.$global.mt+'PlatSysmailVar.delByIds',
                funId: '1',
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
      getInitialization() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatSysmailVar.getInitialization',
          logType: '初始化变量',
          sysmlvarMailid: t.$store.state.platSysMailJS.mainId,
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
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.logType = logType
        t.showMailVar = true
        t.index = index
        t.$refs.editMailVar.setIdname(t.idname)
        if (logType === this.$t('button.y.upd')) {
          t.$refs.editMailVar.setRowId(id)
        }
      },
      addNewArray(res) {
        const t = this
        if (t.data.length === 0) {
          t.data.push(res)
        } else {
          t.data.unshift(res)
        }
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      hideMsg() {
        this.showMailVar = false
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
