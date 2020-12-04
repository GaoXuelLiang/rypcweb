<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_role.adminlog.title')}}
        </p>
        <Row class="btnHeight">
          <DatePicker class="searchInput" type="date" :placeholder="$t('lang_role.adminlog.log_opttime')" :editable="false" v-model="log_opttime"
                      :transfer="true"></DatePicker>
          <span style="margin: 0;"><Button type="info" style="width:56px" :loading="isSpin"
                                           @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
        </Row>
        <row class="table-form" ref="table-form">
          <Table stripe :loading="loading" :height="tableheight" :no-data-text="noDataImg" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-sort-change="sortable"
                 @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" size="small" ref="selection"
                 :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top"
                @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
          <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
          <Button size="small" shape="circle" icon="md-refresh"
                  style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
        </Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp"
              @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './editSysLog'
  import {getDataLevelUserLogin, getDataLevelUserLoginNew,getDataLevelUserLoginData} from '../../../axios/axios'

  import {isSuccess,getUrlKey} from '../../../lib/util'

  export default {
    name: 'sysLog',
    data() {
      return {
        loading: false,
        isSpin: false,
        tableheight:document.body.offsetHeight - 250,
        noDataImg: '<div id="noData"></div>',
        value: '',
        opendialog: false,
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: this.$t('lang_role.adminlog.log_funname'),
            key: 'log_funname',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_role.adminlog.log_opttype'),
            key: 'log_opttype',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_role.adminlog.log_username'),
            key: 'log_username',
            sortable: 'custom',
//            width: 150,
          },
          {
            title: this.$t('lang_role.adminlog.plog_opttime'),
            key: 'log_opttime',
            sortable: 'custom',
//            width: 200,
          },
          {
            title: this.$t('lang_role.adminlog.log_ip'),
            key: 'log_ip',
            sortable: 'custom',
//            width: 200,
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
                    type: 'info',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'))
                    },
                  },
                }, this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        index: 0,
        log_opttime: '',
        likeName: '',
        pmtypeCode: '',
        mobileNo: '',
        logType: '',
      }
    },
    computed: {},
    components: {
      update,
    },
    mounted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.log_opttime = ''
        t.getData(1)
      }
    },
    methods: {
      getData(page) {
        const t = this;
        t.loading = true;
        t.isSpin = true;
        if (page) {
          t.page = page
        }
        if (this.order === 'normal') {
          this.order = 'desc'
        }
        const data = {
          //_mt:  this.$global.mt+'AuthSysLog.getPage',
          _mt:  'hrssc'+'SysLogs.getPage',
          APsort: t.sort,
          APorder: t.order,
          AProws: t.rows,
          APpage: t.page,
        }
        if(t.log_opttime) {
           data.log_opttime = new Date(t.log_opttime).format('yyyy-MM-dd')
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        if (data.log_opttime !== undefined && data.log_opttime !== '') {
          data.log_opttime = new Date(data.log_opttime).format('yyyy-MM-dd')
        }
        getDataLevelUserLoginData(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData(1)
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
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
            title: this.$t('reminder.err'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.$Modal.confirm({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.confirmdelete'),
            onOk: () => {
              getDataLevelUserLoginData({
               // _mt:  this.$global.mt+'AuthSysLog.delByIds',
               _mt:  'hrssc'+'SysLogs.delByIds',
                APfunId: '1',
                APlogType: this.$t('button.del'),
                APdelIds: t.tableselected.toString(),
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = []
                  t.getData()
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
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.openUpdate = true
        t.index = index
        t.logType = logType
        if (logType === this.$t('button.view')) {
          t.$refs.update.getData(t.updateId)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.pmtypeName = ''
        t.$refs.update.formValidate.pmtypeCode = ''
        t.$refs.update.formValidate.pmtypeIsupdate = '1'
        t.$refs.update.formValidate.comment = ''
      },
    },
        watch: {
        '$route' () {
            const path = this.$route.path
            if (path === '/sysLog') {
                this.initData()
            }
        }
    }
  }
</script>
<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }
  //
  @import "../../../sass/table.scss";
  .searchInput{
    margin-right: 5px;
  }
  .ivu-btn{
    margin-right: 5px;
  }
  /deep/ .ivu-table-cell {
    padding: 0 10px;
  }
</style>
