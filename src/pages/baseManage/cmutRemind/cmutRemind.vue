﻿<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          系统消息日志
        </p>
        <Row class="btnHeight">
          <DatePicker class="searchInput" type="date" placeholder="选择发送时间" :transfer=true :editable="false" v-model="msgTime" style="width: 200px"></DatePicker>
          <Input class="searchInput" placeholder="请输入业务类型" style="width: 200px" v-model="msgBustype"/>
          <span style="margin: 0;"><Button style="width:56px" type="info" :loading="isSpin" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <!--<Button type="primary"  @click="expData">导出</Button>-->
        </Row>
        <row class="table-form" ref="table-form">
          <Table stripe :loading="loading" :height="tableheight" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" size="small" ref="selection" :columns="columns" :data="data"></Table>
        </row>
                <Row style="display: flex">          <Page :current="page" :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition >
      <expwindow v-show="openExp" :id="expId" @setFileKey="setFileKey" :smsStatus="smsStatus" :msgTime="msgTime" :msgBustype="msgBustype" :smsContent="smsContent" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
    <transition name="fade">
      <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport"ref="importExcel"></importExcel>
    </transition>
  </div>
</template>
<script>
  import update from './editCmutRemind'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import { getDataLevelUserLoginNew,getDataLevelUserLoginData } from '../../../axios/axios'


  export default{
    name: 'cmutRemind',
    data() {
      let title = '消息标题';
      return {
        smsStatus:'',
        smsContent:"",
        loading:false,
        isSpin: false,
        tableheight:document.body.offsetHeight - 250,
        noDataImg:'<div id="noData"></div>',
        imp_mt:  this.$global.mt+'BaseSmsrecord.importData',
        openImport: false,
        expDataTital: [{ code: 'msgBustype', name: '手机号码' }, { code: 'msgTime', name: '发送时间' },
          { code: 'smsContent', name: '短信内容' }, { code: 'smsStatus', name: '状态' },
          { code: 'smsError', name: '错误消息' }, { code: 'smsDatasource', name: '数据来源' },
          { code: 'comment', name: '备注' }],
        value: '',
        logType: '',
        openUpdate: false,
        openExpDow: false,
        openExp: false,
        updateId: NaN,
        expId: [],
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '发送时间',
            key: 'msgTime',
            sortable: 'custom',
          },
          {
            title: '业务类型',
            key: 'msgBustype',
            sortable: 'custom',
          },
          {
            title: '单据信息',
            key: 'msgDataid',
            sortable: 'custom',
          },
          {
            title: '接收人',
            key: 'msgSendee',
            sortable: 'custom',
          },
          {
            title: '消息标题',
            key: 'msgTitle',
            sortable: 'custom',
          },
          {
            title: '消息数据来源',
            key: 'msgDatasource',
            sortable: 'custom',
          },
          {
            title: '是否极光推送',
            key: 'msgJpush',
            sortable: 'custom',
          },
          {
            title: '推送平台',
            key: 'msgJpushplatform',
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
                      this.openUp(params.row.id, '查看', params.index)
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: '10',
        page: 1,
        funId: '1000',
        msgTime: '',
        msgBustype: '',
        filekey: '',
        filename: '',
      }
    },
    computed: {

    },
    components: {
      update,
      expwindow,
      expdow,
      importExcel,
    },
    mounted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.msgTime = ''
        t.msgBustype = ''
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
        if (t.msgTime !== '') {
          t.msgTime = t.msgTime.format('yyyy-MM-dd')  //  获取发布日期
        }
        const data = {
          _mt:  this.$global.mt+'BaseMsgrecord.getByPage',
          AProws: t.rows,
          APpage: t.page,
          APsort: t.sort,
          APorder: t.order,
          APlogType: this.$t('button.ser'),
          msgTime: t.msgTime,
          msgBustype: t.msgBustype,
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
      expData() {
        const data = {
          msgTime: this.msgTime,
          msgBustype: this.msgBustype,
          smsContent: this.smsContent,
          smsStatus: this.smsStatus,
        }
        this.$refs.expwindow.getData(this.expDataTital, 'baseSmsrecord.exportSMS', data)
        this.openExp = true
      },
      closeImport() {
        const t = this
        t.openImport = false
      },
      importExcel() {
        const t = this
        t.openImport = true
        // t.$refs.importExcel.getDowModelFile()
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
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
        this.expId = newArr
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
        t.$refs.update.getSelect()
        if (logType === '查看') {
          t.$refs.update.getData(id)
        }
      },
      close() {
        const t = this
        t.opendialog = false
      },
      closeExp() {
        const t = this
        t.openExp = false
      },
      closeExpDowMain() {
        const t = this
        t.openExpDow = false
      },
      setFileKey(filekey, filename, openExpDow) {
        const t = this
        t.filekey = filekey
        t.filename = filename
        t.openExpDow = openExpDow
        t.$refs.expdow.getPriToken(t.filekey)
      },
      closeUp() {
        const t = this
        t.openUpdate = false
        t.$refs.update.formValidate.msgTime = ''
        t.$refs.update.formValidate.msgBustype = ''
        t.$refs.update.formValidate.msgDataid = ''
        t.$refs.update.formValidate.msgSendee = ''
        t.$refs.update.formValidate.msgTitle = ''
        t.$refs.update.formValidate.msgContent = ''
        t.$refs.update.formValidate.msgDatasource = ''
        t.$refs.update.formValidate.msgJpush = '1'
        t.$refs.update.formValidate.msgJpushplatform = ''
        t.$refs.update.formValidate.msgJpushtype = ''
        t.$refs.update.formValidate.msgJpusherror = ''
        t.$refs.update.formValidate.msgJpushstatus = ''
        t.$refs.update.formValidate.msgComment = ''
        t.$refs.update.formValidate.msgReadflag = '1'
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
