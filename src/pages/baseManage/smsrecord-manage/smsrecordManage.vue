<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          {{$t('lang_baseManage.smsrecord.smsrecord')}}
        </p>
        <Row class="btnHeight">
          <DatePicker class="searchInput" type="date" :placeholder="$t('lang_baseManage.smsrecord.sdateIns')" :transfer="true" :editable="false" v-model="smsTime" style="width: 200px"></DatePicker>
          <DatePicker class="searchInput" type="date" :placeholder="$t('lang_baseManage.smsrecord.edateIns')" :transfer="true" :editable="false" v-model="smsEtime" style="width: 200px"></DatePicker>
          <Input class="searchInput" :placeholder="$t('lang_baseManage.smsrecord.smsPhonesIns')" style="width: 200px" v-model="smsPhones"/>
          <Input class="searchInput" :placeholder="$t('lang_baseManage.smsrecord.smsContentIns')" style="width: 200px" v-model="smsContent"/>
          <Input class="searchInput" :placeholder="$t('lang_baseManage.smsrecord.smsStatusIns')" style="width: 200px" v-model="smsStatus"/>
          <span style="margin: 0;"><Button style="width:56px" type="info" :loading="isSpin" @click="getData(1)"><span v-if="!isSpin">{{$t('button.ser')}}</span></Button></span>
          <!--<Button type="primary" @click="importExcel">导入</Button>-->
          <!-- <Button type="primary"  @click="expData">{{$t('button.exp')}}</Button> -->
        </Row>
        <row class="table-form" ref="table-form">
          <Table stripe :loading="loading" :height="tableheight" :no-data-text="noDataImg" @on-selection-change="selectedtable" @on-sort-change="sortable" size="small" ref="selection" :columns="columns" :data="data"></Table>
        </row>
                <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer :current="page" placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition >
      <expwindow v-show="openExp" :id="expId" @setFileKey="setFileKey" :smsStatus="smsStatus" :smsEtime="smsEtime" :smsTime="smsTime" :smsPhones="smsPhones" :smsContent="smsContent" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
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
  import update from './smsrecordView'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import { getDataLevelUserLoginNew,getDataLevelUserLoginData } from '../../../axios/axios'


  export default{
    name: 'smsrecordManage',
    data() {
      return {
        loading: false,
        isSpin: false,
        tableheight:document.body.offsetHeight - 250,
        noDataImg: '<div id="noData"></div>',
        imp_mt:  this.$global.mt+'BaseSmsrecord.importData',
        openImport: false,
        expDataTital: [{ code: 'smsPhones', name: this.$t('lang_baseManage.smsrecord.smsPhones') }, { code: 'smsTime', name: this.$t('lang_baseManage.smsrecord.smsTime') },
          { code: 'smsContent', name: this.$t('lang_baseManage.smsrecord.smsContent') }, { code: 'smsStatus', name: this.$t('lang_baseManage.smsrecord.smsStatus') },
          { code: 'smsError', name: this.$t('lang_baseManage.smsrecord.smsError') }, { code: 'smsDatasource', name: this.$t('lang_baseManage.smsrecord.smsDatasource') },
          { code: 'comment', name: this.$t('lang_baseManage.smsrecord.comment') },
          { code: 'smsEtime', name: this.$t('lang_baseManage.smsrecord.smsEtime') }],
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
            title: this.$t('lang_baseManage.smsrecord.smsTime'),
            key: 'smsTime',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.smsrecord.smsPhones'),
            key: 'smsPhones',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.smsrecord.smsContent'),
            key: 'smsContent',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.smsrecord.smsStatus'),
            key: 'smsStatus',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_baseManage.smsrecord.smsError'),
            key: 'smsError',
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
                }, this.$t('button.view')),
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
        funId: '1000',
        smsTime: '',
        smsEtime: '',
        smsPhones: '',
        smsContent: '',
        smsStatus: '',
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
        t.smsTime = ''
        t.smsEtime = ''
        t.smsPhones = ''
        t.smsContent = ''
        t.smsStatus = ''
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
        if("object"==typeof(t.smsTime)){
         t.smsTime = new Date(t.smsTime).format("yyyy-MM-dd")
        }
        if("object"==typeof(t.smsEtime)){
         t.smsEtime = new Date(t.smsEtime).format("yyyy-MM-dd")
        }
        const data = {
          _mt:  this.$global.mt+'BaseSmsrecord.queryByWhere',
          AProws: t.rows,
          APpage: t.page,
          APsort: t.sort,
          APorder: t.order,
          APfunId: t.funId,
          APlogType: this.$t('button.ser'),
          smsTime: t.smsTime,
          smsEtime: t.smsEtime,
          smsPhones: t.smsPhones,
          smsContent: t.smsContent,
          smsStatus: t.smsStatus,
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
          smsTime: this.smsTime,
          smsEtime: this.smsEtime,
          smsPhones: this.smsPhones,
          smsContent: this.smsContent,
          smsStatus: this.smsStatus,
        }
        this.$refs.expwindow.getData(this.expDataTital,  this.$global.mt+'BaseSmsrecord.exportSMS', data)
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
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.view')) {
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
        t.$refs.update.formValidate.countryEname = ''
        t.$refs.update.formValidate.countryCname = ''
        t.$refs.update.formValidate.countryCode1 = ''
        t.$refs.update.formValidate.countryCode2 = ''
        t.$refs.update.formValidate.countryCode3 = ''
        t.$refs.update.formValidate.comment = ''
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
