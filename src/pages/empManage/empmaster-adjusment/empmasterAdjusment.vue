<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          &nbsp;员工批量调整
        </p>
        <Row>
          <span>
            	<Input placeholder="请输入员工中文名" style="width: 200px" v-model="staffName"/>
           </span>
          <span style="margin: 0;">
            <Button type="primary" :loading="isSpin"  @click="getData(1)">{{$t('button.ser')}}</Button>
          </span>
          <Dropdown>
            <Button type="primary">
              {{statusDis}}
              <Icon type="md-arrow-dropdown" size="18"></Icon>
            </Button>
            <DropdownMenu slot="list" >
								<span v-for="(item,index) in dropdownMenuList" :key="index" @click="getPageByState(item.paramCode,item.paramInfoCn)">
										<DropdownItem>{{item.paramInfoCn}}</DropdownItem>
									</span>
            </DropdownMenu>
          </Dropdown>
           <Button type="primary" v-if="dutyStatus == '0105draft' || dutyStatus == '0001all'"  @click="selectStaff">选择员工</Button>
          <Button type="error" @click="deletemsg" v-if="dutyStatus=='0105draft'">{{$t('button.del')}}</Button>
          <Button type="success"  @click="modifystatu" v-if="dutyStatus=='0105draft'">{{$t('status.valid')}}</Button>
          <Button type="primary" @click="batchAdjust" v-if="dutyStatus=='0105draft'">批量调整</Button>
          <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
        </Row>
        <row class="table-form" ref="table-form">
          <Spin fix v-if="isSpin" size="large"></Spin>
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">
          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <!-- 选择员工 -->
    <transition name="fade">
      <staffPage v-show="showMsg" :logType="logType"  ref="staffPage" @hideMsg="hideMsg" @changeinput="changeinput" @getData='getData'></staffPage>
    </transition>
    <!-- 单个修改 -->
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType"  ref="update" @close="close" @getData='getData'></update>
    </transition>
    <!-- 批量修改 -->
    <transition name="fade">
      <batchUpdate v-show="openBatchUpdate" :logType="logType" :batchIds='batchIds' ref="batchUpdate" @close="closeBatch" @getData='getData'></batchUpdate>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
  import { isSuccess, deepCopy,getUrlKey } from '../../../lib/util'
  import advanced from '@/components/searchTable/searchAdvanced'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import staffPage from './staffPage'
  import update from './update'
  import batchUpdate from './batchUpdate'

  export default{
    name: 'empmasterAdjusment',
    data() {
      return {
        isSpin: false,
        showAdvanced: false,
        openUpdate: false,
        openBatchUpdate: false,
        batchIds: '',
        staffName: '',
        tableheight: document.body.offsetHeight - 250,
        dutyStatus: '',
        dropdownMenuList: [],
        statusDis: '全部',
        logType: '',
        updateId: NaN,
        btnControl: false,
        showMsg: false,
        select: this.$t('button.all'),
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
            fixed: 'left',
          },
          {
            title: '员工工号',
            key: 'empadjWorkno',
            width: 140,
          },
          {
            title: '姓名',
            key: 'empadjCname',
            width: 140,
          },
          {
            title: '(原)公司',
            key: 'empadjOldCompDis',
            width: 200,
          },
          {
            title: '(原)部门',
            key: 'empadjOldDeptDis',
            width: 200,
          },
          {
            title: '(原)岗位',
            key: 'empadjOldPostDis',
            width: 200,
          },
          {
            title: '(新)公司',
            key: 'empadjNewCompDis',
            width: 200,
          },
          {
            title: '(新)部门',
            key: 'empadjNewDeptDis',
            width: 200,
          },
          {
            title: '(新)岗位',
            key: 'empadjNewPostDis',
            width: 200,
          },
          {
            title: '生效日期',
            key: 'empadjEffectdate',
            width: 140,
            fixed: 'right',
          },
          {
            title: '状态',
            key: 'empadjStatusDis',
            width: 120,
            fixed: 'right',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 120,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                    display: params.row.empadjStatus !== '0105draft' ? 'none' : 'inline',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.y.upd'))
                    },
                  },
                }, this.$t('button.y.upd')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                    display: params.row.empadjStatus === '0105draft' ? 'none' : 'inline',
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
        selectFyear: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        pladCompanyDisTwo: '',
        positionCompDis: '',
        positionDeptDis: '',
        positionComp: '',
        positionDept: '',
        appAnbrkYear: '2019',
        appAnbrkEmp: '',
      }
    },
    computed: {
    },
    components: {
      staffPage,
      update,
      batchUpdate,
      advanced,
    },
//    mounted() {
//      this.getSelect()
////      this.getFiscalYearSelect()
//      this.getData(1)
//    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.staffName = ''
        t.statusDis = '全部'
        t.dutyStatus = ''
        t.getData(1)
        t.getSelect()
      }
    },
    methods: {
      advSearch() {
        this.showAdvanced = true
        this.$nextTick(() => {
          this.$refs.advanced.getData()
        })
      },
      closeAdvanced() {
        this.showAdvanced = false
      },
      getData(page, value) {
        const t = this
        t.isSpin = true
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'EmpBatchadjust.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          empadjCname: t.staffName, // 中文名
          empadjStatus: t.dutyStatus,
        }
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
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      *  选择员工
      * */
      selectStaff() {
        this.showMsg = true
        this.$refs.staffPage.getData()
      },
      /**
       * 状态的更改
       * @param paramCode
       * @param paramInfoName
       */
      getPageByState(paramCode, paramInfoName) {
        const t = this
        if (paramCode === '0001all') {
          t.dutyStatus = ''
        } else {
          t.dutyStatus = paramCode
        }
        t.getData()
        t.statusDis = paramInfoName
      },
      // 更新数据的状态
      modifystatu() {
        const t = this
        let logType = '生效'
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'EmpBatchadjust.effectDatas',
            logType: logType,
            ids: t.tableselected.toString(),
          }).then((res) => {
            if (isSuccess(res, t)) {
              t.getData(1)
              t.tableselected = []
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
      // 公用基础方法
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
                _mt:  this.$global.mt+'EmpBatchadjust.delByIds',
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
      // 选择员工
      dbHCompanyTwo() {
        const t = this
        t.pladCompanyDisTwo = ''
        t.appAnbrkEmp = ''
      },
      changeinput(name, id) {
        const t = this
        t.pladCompanyDisTwo = name
        t.appAnbrkEmp = id
        t.showMsg = false
      },
      hideMsg() {
        let t = this
        t.showMsg = false
      },
      // 修改
      close() {
        let t = this
        t.openUpdate = false
      },
      openUp(id, logType, index) {
        const t = this
        t.logType = logType
        t.openUpdate = true
        t.index = index
//        if (logType === '修改') {
          t.$refs.update.getData(id)
          t.$refs.update.getSelect()
          t.$refs.update.getPaySelect()
//        }
      },
      // 批量修改
      closeBatch() {
        let t = this
        t.openBatchUpdate = false
        t.tableselected = []
        t.getData(1)
      },
      batchAdjust() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: this.$t('reminder.leastone'),
          })
        } else {
          t.logType = '批量调整'
          t.batchIds = t.tableselected.toString()
          t.openBatchUpdate = true
        }
      },
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'annualevalHandlstatus,pubstatus2',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.AppAnbrkStatus = res.data.content[0].value[0].paramList.splice(1)
            t.dropdownMenuList = res.data.content[0].value[1].paramList
            if (t.dropdownMenuList.length) t.dropdownMenuList = t.dropdownMenuList.slice(0, 4)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
//      getFiscalYearSelect() {
//        const t = this
//        getDataLevelUserLogin({
//          _mt:  this.$global.mt+'PlatFiscalyear.getSelectValue',
//          data: '{}',
//          logType: this.$t('button.ser'),
//        }).then((res) => {
//          if (isSuccess(res, t)) {
//            t.selectFyear = (res.data.content[0].value)
//          }
//        }).catch(() => {
//          t.$Modal.error({
//            title: t.$t('reminder.err'),
//            content: t.$t('reminder.errormessage'),
//          })
//        })
//      },
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
