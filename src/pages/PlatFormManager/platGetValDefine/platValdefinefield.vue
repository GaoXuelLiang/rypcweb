<template>
  <div class="content-main pageHeight">
    <Row class="btnHeight">
      <Button type="warning" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" :no-data-text="noDataImg" :loading='loading' @on-sort-change="sortable" stripe :height="childTableHeight" size="small"  ref="selection" :columns="columns" :data="$store.state.platGetValDefine.childTable1"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getDatas()"></Button></Row>
    <updPlatValdefinefield v-show="showMsg" @hideMsg="hideMsg" ref="updPlatValdefinefield" :logType="logType"></updPlatValdefinefield>
  </div>
</template>
<script>
  import updPlatValdefinefield from './updPlatValdefinefield'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
           pageHeight:'pageHeight',
        childTableHeight: 0,
        noDataImg: '<div id="noData"></div>',
        loading:false,
        logType: '',
        total: NaN,
        sort: 'vffProperty',
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
            title: this.$t('lang_root.getDefine.vffProperty'),
            key: 'vffProperty',
            align: 'left',
          },
          {
            title: this.$t('lang_root.getDefine.vffPropname'),
            key: 'vffPropname',
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
      updPlatValdefinefield,
    },
    mounted(){
      this.getTableHeight()
    },
    methods: {
     getTableHeight () {
            let func = this.$resize.call(this);
            window.onresize = func;
            func();
            console.log(this.childTableHeight)
        },
      getDatas(){
        this.getdata()
      },
      getdata() {
        const t = this
        t.loading = true
        const data = {
          _mt:  this.$global.mt+'PlatValdefinefield.getPage',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          vffMainid: t.$store.state.platGetValDefine.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('platGetValDefine/setChildTable1', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('platGetValDefine/setChildTable1', [])
              t.total = res.data.content[0].records
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false
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
                _mt:  this.$global.mt+'PlatValdefinefield.delByIds',
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
        this.$store.commit('platGetValDefine/setIndex', index)
        if (id) {
          this.$store.commit('platGetValDefine/setChildId1', id)
          t.$refs.updPlatValdefinefield.getFormData()
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      close() {
        this.$emit('hideMsg')
      },
    },
     destroyed () {
        window.onresize = null;
    },
  }
</script>
<style lang="scss" scoped>
  // .content-main{
  //   height: 388px;
  //   .table-form{
  //     margin: 10px 0;
  //   }
  // }
   @import "../../../sass/childTable.scss";
</style>

