<template>
  <div class="content-main blockHeight">
    <Row class="btnHeight">
      <Button type="warning" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="primary" @click="initVar">{{$t('button.ini')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" @on-selection-change="selectedtable" :no-data-text="noDataImg" @on-sort-change="sortable" :height="childTableHeight" size="small" ref="selection" :columns="columns" :data="$store.state.docTemp.childTable1"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updDocTempVar v-show="showMsg" @hideMsg="hideMsg" ref="updDocTempVar" :logType="logType"></updDocTempVar>
  </div>
</template>
<script>
  import updDocTempVar from './updDocTempVar'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        childTableHeight: 0,
        pageHeight: "blockHeight",
        noDataImg: '<div id="noData"></div>',
        logType: '',
        total: NaN,
        sort: 'platDcvarCode',
        order: 'asc',
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
            title: this.$t('lang_platdoc.docVar.platDcvarCode'),
            key: 'platDcvarCode',
            align: 'left',
          },
          {
            title: this.$t('lang_platdoc.docVar.platDcvarEname'),
            key: 'platDcvarEname',
            align: 'left',
          },
          {
            title: this.$t('lang_platdoc.docVar.platDcvarCname'),
            key: 'platDcvarCname',
            align: 'left',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            fixed: 'right',
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
      updDocTempVar,
    },
    methods: {
      getdata() {
        const t = this;
        t.loading = true;
        const data = {
          _mt:  this.$global.mt+'PlatDocVar.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          platDcvarDcptid: t.$store.state.docTemp.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('docTemp/setChildTable1', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('docTemp/setChildTable1', [])
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
      /*
     * 删除方法
     * */
      // TODO: 增加删除提示
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
                _mt:  this.$global.mt+'PlatDocVar.delByIds',
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
      initVar() {
        const t = this
        getDataLevelUserLoginNew({
          _mt:  this.$global.mt+'PlatDocVar.initVar',
          funId: '1',
          logType: '初始化',
          platDcvarDcptid: t.$store.state.docTemp.mainId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.getdata()
          }
          this.$Message.success('初始化完成')
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
        this.$store.commit('docTemp/setIndex', index)
        if (id) {
          this.$store.commit('docTemp/setChildId1', id)
          t.$refs.updDocTempVar.getFormData()
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
  @import "../../../sass/childTable.scss";
</style>

