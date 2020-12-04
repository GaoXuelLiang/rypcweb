<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          &nbsp;猎头供应商管理
        </p>
        <Row>
          <Input placeholder="请输入公司名称" style="width: 200px" v-model="flowName"/>
          <span style="margin: 0;"><Button type="primary" :loading="isSpin"  @click="getData(1)">{{$t('button.ser')}}</Button></span>
          <Dropdown>
            <Button type="primary">
              {{hvStatus}}
              <Icon type="md-arrow-dropdown" size="18"></Icon>
            </Button>
            <DropdownMenu slot="list" >
              <span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
                  <DropdownItem>{{item.paramInfoCn}}</DropdownItem>
                </span>
            </DropdownMenu>
          </Dropdown>
          <Button type="primary" v-show="flowStatus === '' || flowStatus === '01draft'" @click="openUp(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
          <Button type="primary" v-show="flowStatus === '02valid'"  @click="modifystatu('01draft')">{{$t('status.draft')}}</Button>
          <Button type="success" v-show="flowStatus === '01draft' || flowStatus === '03invalid'" @click="modifystatu('02valid')">{{$t('status.valid')}}</Button>
          <Button type="error" v-show="flowStatus === '02valid'" @click="modifystatu('03invalid')">{{$t('status.invalid')}}</Button>
          <Button type="error" v-show="flowStatus === '01draft'"  @click="deletemsg">{{$t('button.del')}}</Button>
          <Button type="primary" @click="expData">{{$t('button.exp')}}</Button>
          <Button type="primary" @click="importExcel">{{$t('button.imp')}}</Button>
          <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
        </Row>
        <row class="table-form" ref="table-form">
          <Spin fix v-if="isSpin" size="large"></Spin>
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable"@on-sort-change="sortable"   @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer :current="page" placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <addUpdate v-show="openUpdate" :id="updateId" ref="update" :logType="logType" :index="index" @closeUp="closeUp" @getData="getData" @update="updateArray"></addUpdate>
    </transition>
    <transition >
    <expwindow v-show="openExp" :id="tableselected" @setFileKey="setFileKey" :logType="logType"  :index="index" @closeExp="closeExp" ref="expwindow"></expwindow>
    </transition>
    <transition >
      <expdow v-show="openExpDow" :filekey="filekey" :filename="filename"  @closeExpDowMain="closeExpDowMain" ref="expdow"></expdow>
    </transition>
    <transition name="fade">
      <importExcel v-show="openImport" :impid="updateId" :imp_mt="imp_mt"  @closeImport="closeImport" ref="importExcel"></importExcel>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import addUpdate from './addUpdate.vue'
  import expwindow from '../../../components/fileOperations/expSms'
  import expdow from '../../../components/fileOperations/expdow'
  import importExcel from '../../../components/importModel/importParam'
  import advanced from '../../../components/searchTable/searchAdvanced'

  export default{
    name: 'headhuntingSupplier',
    data() {
      return {
        isSpin: false,
        imp_mt:  this.$global.mt+'BaseHuntervendor.importData',
        openImport: false,
        expDataTital: [{ code: 'hvTypeDis', name: '供应商类别' }, { code: 'hvCode', name: '供应商编号' }, { code: 'hvCompname', name: '公司名称' },
          { code: 'hvCompsname', name: '公司简称' }, { code: 'hvContrcact', name: '联系人' }, { code: 'hvTel', name: '联系电话' },
          { code: 'hvMail', name: '邮箱' }, { code: 'hvStatusDis', name: '状态' }, { code: 'comment', name: '备注' }],
        openExpDow: false,
        openExp: false,
        filekey: '',
        filename: '',
        tableheight: document.body.offsetHeight - 250,
        value: '',
        hvStatus: '生效',
        logType: '',
        openUpdate: false,
        flowchart: false,
        updateId: NaN,
        dropdownMenuList: [],
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '供应商类别',
            key: 'hvTypeDis',
            sortable: 'custom',
          },
          {
            title: '供应商编号',
            key: 'hvCode',
            sortable: 'custom',
          },
          {
            title: '公司名称',
            key: 'hvCompname',
          },
          {
            title: '公司简称',
            key: 'hvCompsname',
          },
          {
            title: '联系人',
            key: 'hvContrcact',
          },
          {
            title: '联系电话',
            key: 'hvTel',
          },
          {
            title: '邮箱',
            key: 'hvMail',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
//                h('Button', {
//                  props: {
//                    type: 'success',
//                    size: 'small',
//                  },
//                  style: {
//                    marginRight: '5px',
//                  },
//                  on: {
//                    click: () => {
//                      this.openUp(params.row.id, this.$t('button.view'))
//                    },
//                  },
//                }, this.$t('button.view')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.y.upd'))
                    },
                  },
                }, this.$t('button.y.upd')),
//                h('Button', {
//                  props: {
//                    type: 'info',
//                    size: 'small',
//                  },
//                  on: {
//                    click: () => {
//                      this.open(params.row.id)
//                    },
//                  },
//                }, this.$t('lang_flow.flow.flowSetting')),
              ])
            },
          },
        ],
        data: [],
        total: NaN, // 总页数
        index: 0,
        companyId: 1,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        select: '已生效',
        name: '',
        flowStatus: '02valid',
        flowName: '',
        showAdvanced: false,
      }
    },
    computed: {

    },
    components: {
      addUpdate,
      expwindow,
      expdow,
      importExcel,
      advanced
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.flowName = ''
        t.hvStatus = '生效'
        t.flowStatus = '02valid'
        t.getData(1)
        t.getSelect()
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
          _mt:  this.$global.mt+'BaseHuntervendor.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          funId: '1',
          logType: '查询List',
          hvStatus: t.flowStatus,
          hvCompname: t.flowName,
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
        const data = {
          hvStatus: this.flowStatus,
          hvCompname: this.flowName,
        }
        this.$refs.expwindow.getData(this.expDataTital, 'baseHuntervendor.export', data)
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
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getData()
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
          _mt:  this.$global.mt+'BaseHuntervendor.delByIds',
          funId: '1',
          companyId: '1',
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
      openUp(id, logType, index) {
        const t = this
        t.updateId = parseInt(id, 10)
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getSelectTem(logType)
        if (logType === this.$t('button.y.upd') || logType === this.$t('button.view')) {
          t.$refs.update.getData(t.updateId)
          this.$store.commit('huntData/setHuntInfoShow')
        }
        if (logType === this.$t('button.y.upd')) {
          this.$store.state.huntData.huntDisShow = false
        }
        if (logType === this.$t('button.view')) {
          this.$store.state.huntData.huntDisShow = true
        }
      },
      open(id) {
        const t = this
        t.$refs.flowchart.flstepFlow = id
        t.$refs.flowchart.open(id)
        t.flowchart = true
      },
      close() {
        const t = this
        t.flowchart = false
      },
      closeUp() {
        const t = this
        t.$refs.update.flowFormDis = ''
        t.$refs.update.flowFormtypeDis = ''
        t.$refs.update.flowStatusDis = ''
        t.$refs.update.formValidate.flowCode = ''
        t.$refs.update.formValidate.flowName = ''
        t.$refs.update.formValidate.flowFormtype = ''
        t.$refs.update.formValidate.flowForm = ''
        t.$refs.update.formValidate.flowStatus = ''
        t.$refs.update.formValidate.comment = ''
        t.$refs.update.formValidate.flowVersion = ''
        t.openUpdate = false
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
      // 获取下拉状态
      getSelect() {
        const t = this
        t.dropdownMenuList = []
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'pubuserstatus',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.dropdownMenuList = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /**
       * 状态的更改
       * @param paramCode
       * @param paramInfoName
       */
      getPageByState(paramCode, paramInfoName) {
        const t = this
        if (paramCode === '00all') {
          t.flowStatus = ''
        } else {
          t.flowStatus = paramCode
        }
        t.getData(1)
        t.hvStatus = paramInfoName
      },
      // 更新数据的状态
      modifystatu(state) {
        const t = this
        let logType = ''
        if (state === '02valid') {
          logType = '生效'
        } else if (state === '03invalid') {
          logType = '失效'
        } else if (state === '01draft') {
          logType = '编辑中'
        }
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'BaseHuntervendor.updState',
            logType: logType,
            status: state,
            ids: t.tableselected.toString(),
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.getData(1)
              t.$Modal.success({
                title: this.$t('reminder.suc'),
                content: '操作完成',
              })
            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
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

</style>
