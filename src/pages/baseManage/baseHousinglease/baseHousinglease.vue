﻿<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          &nbsp;{{$t('lang_baseManage.baseHousinglease.title')}}
        </p>
        <Row>
          扣除年度：<Input placeholder="扣除年度" v-model="leaseYear" style="width: 120px;" />
          扣除金额：<Input placeholder="扣除金额"  v-model="leaseAmout" style="width: 120px;" />
          <span style="margin: 0;"><Button type="primary" :loading="isSpin"  @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Button type="primary" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary" @click="expData">{{$t('button.exp')}}</Button>
          <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
        </Row>
        <row class="table-form" ref="table-form">
          <Spin fix v-if="isSpin" size="large"></Spin>
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
                <Row style="display: flex"><Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" :current="page" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update"></update>
    </transition>
    <!--<transition name="fade">-->
      <!--<searchCity v-show="openPick" :searchCloumns="searchCloumns" :params="params" @closeUp="close1" @changeinput="changeinput" ref="searchCity"></searchCity>-->
    <!--</transition>-->
    <transition >
      <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
  import update from './addBaseHousinglease'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
 // import searchCity from '../../../components/searchTable/searchCity'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import advanced from '../../../components/searchTable/searchAdvanced'

  export default{
    name: 'baseHousinglease',
    data() {
      return {
        isSpin: false,
        expDataTital: [{ code: 'leaseYear', name: this.$t('lang_baseManage.baseHousinglease.leaseYear') }, { code: 'leaseAmout', name: this.$t('lang_baseManage.baseHousinglease.leaseAmout') }, { code: 'leaseCitysDis', name: this.$t('lang_baseManage.baseHousinglease.leaseCitysDis') },
          { code: 'leaseSdate', name: this.$t('lang_baseManage.baseHousinglease.leaseSdate') }, { code: 'leaseEdate', name: this.$t('lang_baseManage.baseHousinglease.leaseEdate') }, { code: 'comment', name: this.$t('lang_baseManage.baseHousinglease.comment') }],
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        tableheight: document.body.offsetHeight - 250,
        leaseYear: '',
        leaseAmout: '',
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
            title: this.$t('lang_baseManage.baseHousinglease.leaseYear'),
            key: 'leaseYear',
            sortable: 'custom',
//          width: 130,
          },
          {
            title: this.$t('lang_baseManage.baseHousinglease.leaseAmout'),
            key: 'leaseAmout',
            sortable: 'custom',
//          width: 130,
          },
          {
            title: this.$t('lang_baseManage.baseHousinglease.leaseCitysDis'),
            key: 'leaseCitysDis',
            sortable: 'custom',
            render: (h, params) => {
              return h('Tooltip', {
                props: { placement: 'top-start', color: 'white' },
              }, [
                params.row.leaseCitysDis,
                h('span', {
                  slot: 'content',
                  style: {
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                    color: 'white',
                  },
                }, params.row.leaseCitysDis),
              ])
            },
//          width: 130,
          },
          {
            title: this.$t('lang_baseManage.baseHousinglease.leaseSdate'),
            key: 'leaseSdate',
            sortable: 'custom',
//          width: 130,
          },
          {
            title: this.$t('lang_baseManage.baseHousinglease.leaseEdate'),
            key: 'leaseEdate',
            sortable: 'custom',
//          width: 130,
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
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        levdfCityid: '',
        openPick: false,
        levdfCityName: '',
        showAdvanced: false,
/*        params: {
          _mt:  this.$global.mt+'BaseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: '10',
          page: '1',
          funId: '1',
          logType: this.$t('button.ser'),
          data: '{"cityIsvalid" : "1"}',
        }, */
/*        searchCloumns: [
          {
            title: this.$t('lang_baseManage.baseCity.cityName'),
            key: 'cityName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityTypeName'),
            key: 'cityTypeName',
            sortable: 'custom',
            width: 379,
          },
        ], */
      }
    },
    computed: {

    },
    components: {
   //   searchCity,
      update,
      expwindow,
      expdow,
      advanced,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.leaseAmout = ''
        t.leaseYear = ''
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
          _mt:  this.$global.mt+'BaseHousinglease.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          leaseAmout: this.leaseAmout,
          leaseYear: this.leaseYear,
        }
        if(value){
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
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      expData() {
        const data = {
          leaseYear: this.leaseYear,
          leaseAmout: this.leaseAmout,
        }
        this.$refs.expwindow.getData(this.expDataTital, 'baseHousinglease.export', data)
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
      updateimg() {
        this.updateImg = true
      },
      closeImg() {
        const t = this
        t.updateImg = false
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
//      close1() {
//        const t = this
//        t.openPick = false
//      },
//      changeinput(name, id) {
//        const t = this
//        t.levdfCityName = name
//        t.levdfCityid = id
//      },
//      pickData() {
//        const t = this
//        t.$refs.searchCity.getData(this.params, '02city\',\'03county')
//        t.openPick = true
//      },
//      clearCityid() {
//        const t = this
//        t.levdfCityName = ''
//        t.levdfCityid = ''
//      },
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
          _mt:  this.$global.mt+'BaseHousinglease.delByIds',
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
        t.$refs.update.getSelect()
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
        t.$refs.update.formValidate.leaseYear = ''
        t.$refs.update.leaseCitysDis = ''
        t.$refs.update.formValidate.leaseCitys = ''
        t.$refs.update.formValidate.leaseCitysDis = ''
        t.$refs.update.formValidate.leaseAmout = ''
        t.$refs.update.formValidate.leaseSdate = ''
        t.$refs.update.formValidate.leaseEdate = ''
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
