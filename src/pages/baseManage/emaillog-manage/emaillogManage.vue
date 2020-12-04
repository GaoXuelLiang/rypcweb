<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_baseManage.emaillog.emaillog')}}
        </p>
        <Row class="btnHeight">
          <DatePicker class="searchInput" type="date" :placeholder="$t('lang_baseManage.emaillog.sdateIns')" :transfer="true" :editable="false" v-model="mailTime" style="width: 200px"></DatePicker>
          <DatePicker class="searchInput" type="date" :placeholder="$t('lang_baseManage.emaillog.edateIns')"  :transfer="true" :editable="false" v-model="mailEtime" style="width: 200px"></DatePicker>
          <Input class="searchInput" :placeholder="$t('lang_baseManage.emaillog.mailObjectIns')" style="width: 200px" v-model="mailObject"/>
          <Input class="searchInput" :placeholder="$t('lang_baseManage.emaillog.mailToIns')" style="width: 200px" v-model="mailTo" />
          <Input class="searchInput" :placeholder="$t('lang_baseManage.emaillog.mailCcIns')" style="width: 200px" v-model="mailCc" />
          <Input class="searchInput" :placeholder="$t('lang_baseManage.emaillog.mailContentIns')" style="width: 200px" v-model="mailContent"/>
          <Input class="searchInput" :placeholder="$t('lang_baseManage.emaillog.mailStatusIns')" style="width: 200px" v-model="mailStatus"/>
          <span><Button style="width:56px" type="info" :loading="isSpin" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
        </Row>
        <row class="table-form" ref="table-form">
          <Table stripe :loading="loading" :height="tableheight" :no-data-text="noDataImg" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" size="small" ref="selection" :columns="columns" :data="data"></Table>
        </row>
                <Row style="display: flex">          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :ty="0" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
  </div>
</template>
<script>
  import update from './emaillogView'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import { getDataLevelUserLoginNew,getDataLevelUserLoginData } from '../../../axios/axios'

  export default{
    name: 'emaillogManage',
    data() {
      return {
        loading: false,
        isSpin: false,
        tableheight:document.body.offsetHeight - 250,
        noDataImg: '<div id="noData"></div>',
        value: '',
        logType: '',
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
            title: this.$t('lang_baseManage.emaillog.mailTime'),
            key: 'mailTime',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.emaillog.mailObject'),
            key: 'mailObject',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.emaillog.mailTo'),
            key: 'mailTo',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.emaillog.mailCc'),
            key: 'mailCc',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.emaillog.mailStatus'),
            key: 'mailStatus',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.emaillog.mailError'),
            key: 'mailError',
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
                    type: 'info',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.view'), params.index)
                    },
                  },
                },  this.$t('button.view')),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        mailTime: '',
        mailEtime: '',
        mailObject: '',
        mailTo: '',
        mailCc: '',
        mailContent: '',
        mailStatus: '',
      }
    },
    computed: {

    },
    components: {
      update,
    },
    mounted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.mailTime = ''
        t.mailEtime = ''
        t.mailObject = ''
        t.mailTo = ''
        t.mailCc = ''
        t.mailContent = ''
        t.mailStatus = ''
        t.getData(1)
      }
    },
    // mounted () {
    //     let func = this.$resize.call(this);
    //     window.onresize = func;
    //     func();
    // },
    // destroyed () {
    //     window.onresize = null;
    // },
    methods: {
      getData(page) {
        const t = this;
        t.loading = true;
        t.isSpin = true;
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'BaseEmaillog.getPage',
          AProws: t.rows,
          APpage: t.page,
          APsort: t.sort,
          APorder: t.order,
          APfunId: t.funId,
          APlogType: this.$t('button.ser'),
          mailTime: t.mailTime,
          mailEtime: t.mailEtime,
          mailObject: t.mailObject,
          mailTo: t.mailTo,
          mailCc: t.mailCc,
          mailContent: t.mailContent,
          mailStatus: t.mailStatus,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
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
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
      },
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
        } else {
          this.order = 'desc'
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
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },
      open() {
        const t = this
        t.opendialog = true
      },
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.view')) {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table-form{
    margin: 10px 0;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  // 
  @import "../../../sass/table.scss";
  .btnHeight {
    font-size: 0;
  }
  .searchInput{
    margin-right: 10px;
  }
  .ivu-btn{
    margin-right: 10px;
  }
  /deep/ .ivu-table-cell {
    padding: 0 10px;
  }
</style>
