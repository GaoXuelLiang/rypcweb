﻿<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          &nbsp;{{$t('lang_baseManage.baseTaxrate.title')}}
        </p>
        <Row>
          <Input :placeholder="$t('lang_baseManage.baseTaxrate.taxYearDis')" style="width: 200px" v-model="taxYear"/>
          <Input :placeholder="$t('lang_baseManage.baseTaxrate.taxCodeDis')" style="width: 200px" v-model="taxCode"/>
          <!--<DatePicker type="date" :placeholder="$t('lang_baseManage.baseTaxrate.taxSdateDis')" :editable="false" v-model="taxSdate" style="width: 200px"></DatePicker>-->
          <!--<DatePicker type="date" :placeholder="$t('lang_baseManage.baseTaxrate.taxEdateDis')" :editable="false" v-model="taxEdate" style="width: 200px"></DatePicker>-->
          <span style="margin: 0;"><Button type="primary" :loading="isSpin"  @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" v-if="AccessControl.toString().includes('button_add')"  @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" v-if="AccessControl.toString().includes('button_del')"  @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary" v-if="AccessControl.toString().includes('button_exp')"  @click="expData">{{$t('button.exp')}}</Button>
          <Button type="primary" v-if="AccessControl.toString().includes('button_imp')"  @click="importExcel">{{$t('button.imp')}}</Button>
          <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
        </Row>
        <row class="table-form" ref="table-form">
          <Spin fix v-if="isSpin" size="large"></Spin>
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
                <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <transition >
      <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
    <transition name="fade">
      <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt" @getData="getData"  @closeImport="closeImport"ref="importExcel"></importExcel>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
  import update from './addNewTaxrate'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess,getUrlKey  } from '../../../lib/util'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'
  import advanced from '../../../components/searchTable/searchAdvanced'


  export default{
    name: 'taxTaxrateManage',
    data() {
      return {
        isSpin: false,
        imp_mt:  this.$global.mt+'BaseTaxrate.importData',
        openImport: false,
        expDataTital: [{ code: 'taxCode', name: this.$t('lang_baseManage.baseTaxrate.taxCode') }, { code: 'taxMin', name: this.$t('lang_baseManage.baseTaxrate.taxMin') },
          { code: 'taxMax', name: this.$t('lang_baseManage.baseTaxrate.taxMax') }, { code: 'taxTaxrate', name: this.$t('lang_baseManage.baseTaxrate.taxTaxrate') },
          { code: 'taxQkdeuction', name: this.$t('lang_baseManage.baseTaxrate.taxQkdeuction') }, { code: 'taxAmountmin', name: this.$t('lang_baseManage.baseTaxrate.taxAmountmin') },
          { code: 'taxAmountmax', name: this.$t('lang_baseManage.baseTaxrate.taxAmountmax') }, { code: 'taxPosttaxmin', name: this.$t('lang_baseManage.baseTaxrate.taxPosttaxmin') },
          { code: 'taxPosttaxmax', name: this.$t('lang_baseManage.baseTaxrate.taxPosttaxmax') }, { code: 'taxYear', name: this.$t('lang_baseManage.baseTaxrate.taxYear') },
          { code: 'comment', name: this.$t('lang_baseManage.baseTaxrate.comment') }],
//        { code: 'taxSdate', name: this.$t('lang_baseManage.baseTaxrate.taxSdate') },
//      { code: 'taxEdate', name: this.$t('lang_baseManage.baseTaxrate.taxEdate') }
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        tableheight: document.body.offsetHeight - 250,
        value: '',
        logType: '',
        select: '全部',
        openUpdate: false,
        updateId: NaN,
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            fixed: 'left',
            align: 'center',
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxYear'),
            key: 'taxYear',
            sortable: 'custom',
            fixed: 'left',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxCode'),
            key: 'taxCode',
            sortable: 'custom',
            fixed: 'left',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxMin'),
            key: 'taxMin',
            sortable: 'custom',
            fixed: 'left',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxMax'),
            key: 'taxMax',
            sortable: 'custom',
            fixed: 'left',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxTaxrate'),
            key: 'taxTaxrate',
            sortable: 'custom',
            fixed: 'left',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxQkdeuction'),
            key: 'taxQkdeuction',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxAmountmin'),
            key: 'taxAmountmin',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxAmountmax'),
            key: 'taxAmountmax',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxPosttaxmin'),
            key: 'taxPosttaxmin',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('lang_baseManage.baseTaxrate.taxPosttaxmax'),
            key: 'taxPosttaxmax',
            sortable: 'custom',
            width: 150,
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 64,
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
        data: [],
        total: 0,
        index: 0,
        sort: 'taxCode',
        order: 'asc',
        rows: 10,
        page: 1,
        taxCode: '',
        taxYear: '',
        //        taxSdate: '',
        //        taxEdate: '',
        AccessControl: [],
        showAdvanced: false,
      }
    },
    computed: {

    },
    components: {
      update,
      expwindow,
      expdow,
      importExcel,
      advanced
    },
//    mounted() {
//      this.getData(1)
//    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.taxYear = ''
        t.taxCode = ''
        t.getData(1)
      }
    },
    methods: {
      advSearch() {
        this.showAdvanced = true
        this.$nextTick(()=>{
          this.$refs.advanced.getData()
        })
      },
      closeAdvanced() {
        this.showAdvanced = false
      },
      getData(page,value) {
        const t = this
        t.isSpin = true
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'BaseTaxrate.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          taxCode: t.taxCode,
          taxYear: t.taxYear,
          //          taxSdate: t.taxSdate,
          //          taxEdate: t.taxEdate,
        }
        //        if (data.taxSdate !== undefined) {
        //          data.taxSdate = data.taxSdate === '' ? '' : new Date(data.taxSdate).format('yyyy-MM-dd')
        //        }
        //        if (data.taxEdate !== undefined) {
        //          data.taxEdate = data.taxEdate === '' ? '' : new Date(data.taxEdate).format('yyyy-MM-dd')
        //        }
        if (value) {
          data.searchData = JSON.stringify(value)
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
            this.btnControl(this).then((res1) => {
              if (isSuccess(res1, t)) {
                res1.data.content[0].value.forEach((item) => {
                  t.AccessControl.push(item.btnLancode)
                })
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
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
      expData() {
        const t = this
        const data = {
          taxCode: t.taxCode,
//          taxSdate: t.taxSdate,
//          taxEdate: t.taxEdate,
          taxYear: t.taxYear,
        }
//        if (data.taxSdate !== undefined) {
//          data.taxSdate = data.taxSdate === '' ? '' : new Date(data.taxSdate).format('yyyy-MM-dd')
//        }
//        if (data.taxEdate !== undefined) {
//          data.taxEdate = data.taxEdate === '' ? '' : new Date(data.taxEdate).format('yyyy-MM-dd')
//        }
        this.$refs.expwindow.getData(this.expDataTital, 'baseTaxrate.export', data)
        this.openExp = true
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
          _mt:  this.$global.mt+'BaseTaxrate.delByIds',
          funId: '1',
          logType: this.$t('button.del'),
          ids: t.tableselected.toString(),
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
        		onCancel: () => {},
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
        t.logType = logType
        t.openUpdate = true
        t.index = index
//        t.$refs.update.getSelect()
        if (logType === this.$t('button.y.upd')) {
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
        t.$refs.update.formValidate.taxCode = ''
        t.$refs.update.formValidate.taxMin = ''
        t.$refs.update.formValidate.taxMax = ''
        t.$refs.update.formValidate.taxTaxrate = ''
        t.$refs.update.formValidate.taxQkdeuction = ''
        t.$refs.update.formValidate.taxAmountmin = ''
        t.$refs.update.formValidate.taxAmountmax = ''
        t.$refs.update.formValidate.taxPosttaxmin = ''
        t.$refs.update.formValidate.taxPosttaxmax = ''
        t.$refs.update.formValidate.taxYear = ''
//        t.$refs.update.formValidate.taxSdate = ''
//        t.$refs.update.formValidate.taxEdate = ''
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
</style>
