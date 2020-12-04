<template>
  <div class="content-main contentHeight">
    <Row class="btnHeight">
      <Input class="searchInput" :placeholder="$t('lang_sysform.formField.p_sffPhyfield')" style="width: 200px" v-model="sffPhyfield"/>
      <Input class="searchInput" :placeholder="$t('lang_sysform.formField.p_cnen')" style="width: 200px" v-model="sffFieldNameCnDis"/>
      <span style="margin: 0;"><Button style="width: 56px;" type="info" :loading="isSpin" @click="getdata(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
      <Button type="primary" @click="init()">初始化</Button>
      <Button type="warning" @click="openUp(NaN, $t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg" style="margin-top: 10px">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="childTableHeight" size="small" ref="selection" :columns="columns" :data="$store.state.sysData.childTable1"></Table>
    </row>
    <Row style="display: flex">
      <Page :total="total" size="small" show-elevator show-sizer placement="top"
        :current="page" @on-page-size-change="sizeChange" @on-change="pageChange"
        :page-size-opts = "[10, 20, 50, 100]" >
      </Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      <Button size="small" shape="circle" icon="md-refresh"
      style="margin:0 0 0 20px;display: inline-block;" @click="refresh()"></Button>
    </Row>
    <contentMsg v-show="showMsg" :logType="logType"  @hideMsg="hideMsg" ref="contentMsg"></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './contentMsg'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        isSpin: false,
        childTableHeight: 0,
        pageHeight: "contentHeight",
        noDataImg: '<div id="noData"></div>',
        logType: '',
        total: NaN,
        sort: 'sffOrder',
        order: 'asc',
        tableselected: [],
        rows: 10,
        page: 1,
        showMsg: false,
        sffPhyfield: '',
        sffFieldNameCnDis: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_sysform.formField.sffOrder'),
            key: 'sffOrder',
            width: 110,
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sysform.formField.sffPhyfield'),
            key: 'sffPhyfield',
          },
          {
            title: this.$t('lang_sysform.formField.sffFieldNameCnDis'),
            key: 'sffFieldNameCnDis',
          },
          {
            title: this.$t('lang_sysform.formField.sffFieldNameEnDis'),
            key: 'sffFieldNameEnDis',
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
      contentMsg,
    },
    methods: {
      getdata(page) {
        const t = this;
        t.loading = true;
        t.isSpin = true;
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'PlatSformfield.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          sffFieldNameCnDis: t.sffFieldNameCnDis,
          sffPhyfield: t.sffPhyfield,
          sffForm: t.$store.state.sysData.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
//          获取到表格数据存入vuex中
            if (Object.keys(res.data.content[0]).length !== 0) {
              this.$store.commit('sysData/setChildTable1', res.data.content[0].rows)
              t.total = res.data.content[0].records
            } else {
              t.total = 0
              this.$store.commit('sysData/setChildTable1', [])
            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        }).finally(()=>{
          t.loading = false;
          t.isSpin = false;
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
      refresh() {
        const t = this
        t.getdata(t.page)
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
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatSformfield.delByIds',
                funId: '1',
                companyId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
                parentId: t.$store.state.sysData.mainId,
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
            onCancel: () => {
            },
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
        this.$store.commit('sysData/setChildId1', id)
        this.$store.commit('sysData/setIndex', index)
        if (id) {
          t.$refs.contentMsg.getFormData()
        }
      },
      hideMsg() {
        this.showMsg = false
      },
      clear() {
        const t = this
        t.sffPhyfield = ''
        t.sffFieldNameCnDis = ''
        t.page = 1
        // t.rows = 10
      },
      init() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'PlatSformfield.initData',
          logType: '初始化',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          id: t.$store.state.sysData.mainId
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content:'确定初始化',
          onOk:()=>{
            getDataLevelUserLogin(data).then((res) => {
              if (isSuccess(res, t)) {
                if (Object.keys(res.data.content[0]).length !== 0) {
                  this.$store.commit('sysData/setChildTable1', res.data.content[0].rows)
                  t.total = res.data.content[0].records
                } else {
                  t.total = 0
                  this.$store.commit('sysData/setChildTable1', [])
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          },
          onCancel:()=>{}
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
@import "../../../sass/childTable.scss";
.searchInput {
  margin-right: 10px;
}
</style>
