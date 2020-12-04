<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="ios-bookmark"></Icon>
          &nbsp;结余失效管理
        </p>
        <Row>
          <span>
            <Select style="width: 200px" v-model="appAnbrkYear" @on-change="getData(1)"  placeholder="请输入年度" clearable>
            <Option :value="item.fyYear" v-for="(item,index) in selectFyear" :key="index">{{item.fyYear}}</Option>
          </Select>
          </span>
          <span style="margin: 0;">
            <Button type="primary" :loading="isSpin"  @click="getData(1)">{{$t('button.ser')}}</Button>
             <Button type="primary" @click="openUp(null,$t('button.add'))">{{$t('button.add')}}</Button>
            <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
            <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
          </span>
        </Row>
        <!--<Row>-->
          <!--<RadioGroup v-model="appAnbrkStatus" v-for="(item,index) in AppAnbrkStatus" :key="index" style="margin-top: 5px"  @on-change="getPageByState">-->
            <!--<Radio :label="item.paramCode">{{item.paramInfoCn}}</Radio>-->
          <!--</RadioGroup>-->
        <!--</Row>-->
        <row class="table-form" ref="table-form">
          <Spin fix v-if="isSpin" size="large"></Spin>
          <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable" @on-sort-change="sortable" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="data"></Table>
        </row>
        <Row style="display: flex">          <Page :total="total" size="small" :current="page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType"  ref="update" @close="close" @getData="addNewArray" @update="updateArray"></update>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
  import { isSuccess, deepCopy,getUrlKey } from '../../../lib/util'
  import advanced from '@/components/searchTable/searchAdvanced'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import update from './update'
  export default{
    name: 'balanceFailure',
    data() {
      return {
        isSpin: false,
        tableheight: document.body.offsetHeight - 300,
        logType: '',
        updateId: NaN,
        btnControl: false,
        showAdvanced: false,
        showMsg: false,
        select: this.$t('button.all'),
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '年度',
            key: 'applyplusYear',
            width: 140,
          },
          {
            title: '结转年假失效日期',
            key: 'applyplusAninvdate',
          },
          {
            title: '结转剩余年假处理规则',
            key: 'applyplusAnregudDis',
          },
          {
            title: '结转调休失效日期',
            key: 'applyplusBkinvdate',
          },
          {
            title: '结转剩余调休处理规则',
            key: 'applyplusBkregudDis',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            fixed: 'right',
            width: 120,
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
                      this.openUp(params.row.id, '修改', params.index)
                    },
                  },
                }, '修改'),
              ])
            },
          },
        ],
        data: [],
        selectFyear: [],
        AppAnbrkStatus: [], // 数据状态
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
        appAnbrkYear: '',
        appAnbrkEmp: '',
        appAnbrkStatus: '02noconfirm',
        openUpdate: false,
      }
    },
    computed: {
    },
    components: {
      update,
      advanced,
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.appAnbrkYear = ''
        t.getData(1)
        t.getFiscalYearSelect()
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
          _mt:  this.$global.mt+'ApplyPlusinvdate.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: this.$t('button.ser'),
          applyplusYear: t.appAnbrkYear, // 年度
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
      // 根据状态 获取值
      getPageByState(value) {
        this.appAnbrkStatus = value
        this.getData(1)
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
                _mt:  this.$global.mt+'ApplyPlusinvdate.delByIds',
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
      addNewArray(res) {
        const t = this
        t.data.unshift(res)
      },
      updateArray(res) {
        const t = this
        t.data.splice(t.index, 1, res)
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
      close() {
        let t = this
        t.openUpdate = false
      },
      openUp(id, logType, index) {
        const t = this
        t.logType = logType
        t.openUpdate = true
        t.index = index
        t.$refs.update.getYear()
        t.$refs.update.getSelect()
        if (logType === '修改') {
          t.$refs.update.getData(id)
        }
      },
      getFiscalYearSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'PlatFiscalyear.getSelectValue',
          data: '{}',
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectFyear = (res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
          })
        })
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
