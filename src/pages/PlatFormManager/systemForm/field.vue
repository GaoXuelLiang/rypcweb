<template>
  <div class="content-main fieldHeight">
    <Row class="btnHeight">
      <Button type="warning" @click="showMsgBtn(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Table stripe :loading="loading" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" :height="childTableHeight" size="small" ref="selection" :columns="columns" :data="$store.state.sysData.childTable2"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getdata(1)"></Button></Row>
    <newField v-show="showMsg"  :logType="logType" @hideMsg="hideMsg" ref="contentMsg"></newField>
  </div>
</template>
<script>
  import newField from './newField'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    data() {
      return {
        loading: false,
        childTableHeight: 0,
        pageHeight: "fieldHeight",
        noDataImg: '<div id="noData"></div>',
        total: NaN,
        showMsg: false,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_sysform.Sffvalid.sffvFieldname'),
            key: 'sffvFieldnameDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sysform.Sffvalid.sffvStyle'),
            key: 'sffvStyleDis',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_sysform.Sffvalid.sffvIsmust'),
            key: 'sffvIsmustDis',
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
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        logType: '',
      }
    },
    components: {
      newField,
    },
    methods: {
      getdata(page) {
        const t = this;
        t.loading = true;
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'PlatSffvalid.getPage',
          funId: '1',
          logType: this.$t('button.ser'),
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          //  sffFieldNameCnDis: t.nameOrMobile,
          sffvForm: t.$store.state.sysData.mainId,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
          //  t.data = res.data.content[0].rows
            if(JSON.stringify(res.data.content[0]) == "{}"){
              console.log(res.data.content[0])
              t.$store.commit('sysData/setChildTable2', [])
            }else{
              if (Object.keys(res.data.content[0]).length !== 0) {
                t.$store.commit('sysData/setChildTable2', res.data.content[0].rows)
              }
            }
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
              getDataLevelUserLogin({
                _mt:  this.$global.mt+'PlatSffvalid.delByIds',
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
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.logType = logType
        this.$store.commit('sysData/setChildId2', id)
        this.$store.commit('sysData/setIndex', index)
        if (id) {
          t.$refs.contentMsg.getFormData()
        }
      },
      hideMsg() {
        this.showMsg = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/childTable.scss";
</style>
