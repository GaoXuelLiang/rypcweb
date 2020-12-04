<template>
  <div class="content-main">
    <Row>
      <!--<Input placeholder="请输入用户名/手机号搜索..." style="width: 200px" v-model="nameOrMobile"/>
      <span style="margin: 0;"><Button type="primary"  @click="getdata">{{$t('button.ser')}}</Button></span>-->
      <Button type="primary" @click="showIni(NaN,$t('button.ini'))">{{$t('button.ini')}}</Button>
      <!--<Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
    </Row>
    <row class="table-form" ref="table-form">
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="420" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="params.page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
    <contentMsg v-show="showMsg":logType="logType" @hideMsg="hideMsg" :id="id" :idname="idname" ref="contentMsg" @getData="addNewArray" @update="updateArray" ></contentMsg>
  </div>
</template>
<script>
  import contentMsg from './platQuarterView'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        total: NaN,
        logType: '',
        showMsg: false,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_platform.PlatQuarter.fypdYear'),
            key: 'fyqtYear',
            sortable: 'custom',
            width: 90,
          },
          {
            title: this.$t('lang_platform.PlatQuarter.fypdPeriod'),
            key: 'fyqtCode',
            sortable: 'custom',
            width: 90,
          },
          {
            title: this.$t('lang_platform.PlatQuarter.fypdMark1'),
            key: 'fyqtMark1',
            sortable: 'custom',
            width: 120,
          },
          {
            title: this.$t('lang_platform.PlatQuarter.fypdMark2'),
            key: 'fyqtMark2',
            sortable: 'custom',
            width: 120,
          },
          {
            title: this.$t('lang_platform.PlatQuarter.fypdStartdate'),
            key: 'fyqtStartdate',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('lang_platform.PlatQuarter.fypdEnddate'),
            key: 'fyqtEnddate',
            sortable: 'custom',
            width: 130,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
            fixed: 'right',
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
          _mt:  this.$global.mt+'PlatFyquarter.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'desc',
          fyqtCode: this.$store.state.platFis.childId2,
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
      contentMsg,
    },
    methods: {
      getdata(page) {
        const t = this
        if (page) {
          t.params.page = page
        }
        t.params.logType = '查询List信息'
        t.params.fyqtCode = t.$store.state.platFis.childId2
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
        })
      },
      // 初始化
      showIni() {
        const t = this
        const params = {
          _mt:  this.$global.mt+'PlatFyquarter.InitQuarter',
          logType: '初始化财年季度',
          year: t.$store.state.platFis.childId1
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            t.getdata()
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.initSuccess'),
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
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
        this.tableselected = newArr.toString()
      },
//      deletemsg() {
//        const t = this
//        if (t.tableselected.length === 0) {
//          t.$Modal.warning({
//            title: this.$t('reminder.remind'),
//            content: this.$t('reminder.leastone'),
//          })
//        } else {
//          t.$Modal.confirm({
//            title: this.$t('reminder.remind'),
//            content: this.$t('reminder.confirmdelete'),
//            onOk: () => {
//              getDataLevelUserLogin({
//                _mt:  this.$global.mt+'PlatFyquarter.delByIds',
//                funId: '1',
//                companyId: '1',
//                logType: this.$t('button.del'),
//                ids: t.tableselected,
//              }).then((res) => {
//                if (isSuccess(res, t)) {
//                  t.getdata()
//                }
//              }).catch(() => {
//                t.$Modal.error({
//                  title: this.$t('reminder.err'),
//                  content: this.$t('reminder.errormessage'),
//                })
//              })
//            },
//            onCancel: () => {},
//          })
//        }
//      },
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.index = index
        t.logType = logType
        t.$refs.contentMsg.setIdname(t.idname)
        if (logType === this.$t('button.y.upd')) {
          t.$refs.contentMsg.setRowId(id)
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
        this.showMsg = false
      },
    },
  }
</script>
<style lang="scss" scoped>
.content-main{
  height: 500px;
  .table-form{
    margin: 10px 0;
  }
}
</style>
