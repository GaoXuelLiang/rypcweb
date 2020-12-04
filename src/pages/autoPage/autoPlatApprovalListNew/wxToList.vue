<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>
          {{$t('lang_approval.wxcontract.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
  <div class="content-main">
    <Row>
      <Button type="primary" class="btnStyle" @click="addwxCon">{{$t('button.add')}}</Button>
      <Button type="error" class="btnStyle" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
  </div>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" height="320" size="small" ref="selection" :columns="columns" :data="$store.state.platApproval.childTable5"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <updWxTo v-show="showMsg" @hideMsg="hideMsg" ref="updWxTo"></updWxTo>
    <addwxCon v-show="showAddMsg" @hideMsg="hideAddMsg" ref="addwxCon"></addwxCon>
    </div>
  </div>
</template>
<script>
  // 修改联系人
  import updWxTo from './updWxTo'
  // 增加联系人
  import addwxCon from './addwxCon'
  //import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { getDataLevelUserLoginData } from '@/axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        noDataImg: '<div id="noData"></div>',
        id: '',
        conttype: '',
        sort: 'id',
        total: NaN,
        order: 'desc',
        rows: '10',
        page: '1',
        tableselected: [],
        showMsg: false,
        showAddMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.wxcontract.apwxtoContact'),
            key: 'apwxtoContactDis',
//            align: 'center',
          },
          {
            title: this.$t('lang_approval.wxcontract.apwxtoIsvalid'),
            key: 'apwxtoIsvalidDis',
//            align: 'center',
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
                      this.openUp(params.row.id, params.index)
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
      updWxTo,
      addwxCon,
    },
    methods: {
      getdata(id) {
        const t = this;
        t.loading = true;
        t.id = id // 当前数据id
        const data = {
          _mt:  this.$global.mt+'PlatAprvwxto.getPage',
          APapwxtoWx: t.$store.state.platApproval.childId4, // 微信id
          APfunId: '1',
          APsort: t.sort,
          APorder: t.order,
          AProws: t.rows,
          APpage: t.page,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('platApproval/setChildTable5', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              this.$store.commit('platApproval/setChildTable5', [])
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
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getdata(t.id)
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getdata(t.id)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getdata(t.id)
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
              getDataLevelUserLoginData({
                _mt:  this.$global.mt+'PlatAprvwxto.delByIds',
                APfunId: '1',
                APcompanyId: '1',
                APlogType: this.$t('button.del'),
                APdelIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getdata(t.id)
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
      openUp(id, index) {
        const t = this
        t.showMsg = true
        t.$store.commit('platApproval/setIndex', index)
        t.$store.commit('platApproval/setChildId5', id)
        if (id) {
          t.$refs.updWxTo.getFormData(id)
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      close() {
        this.$emit('hideMsg')
      },
      addwxCon() {
        const t = this
        t.showAddMsg = true
          t.$refs.addwxCon.getdata()
      },
      hideAddMsg() {
        this.showAddMsg = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/searchTable.scss";
  .btnStyle{
    margin: 0 10px 10px 0;
  }
</style>
