<template>
  <div class="table">
    <Row>
      <i-col span="24">
        <card>
          <p slot="title">
            <Icon type="ios-bookmark"></Icon>
            日报月报项目
          </p>
          <Row>
            <i-col span="20" style="width:100% !important;">
              <Row class="btnHeight">
                <Select v-model="attRptitType" clearable style="width: 200px;">
                  <Option :value="item.paramCode"  :key="index" v-for="(item,index) in select">{{item.paramInfoName}}</Option>
                </Select>
                <Input v-model="attRptitName" style="width: 200px;margin-left:5px"  placeholder="请输入项目名称" />
                <span style="margin-left: 5px;"><Button type="info" :loading="isSpin"  @click="refresh">{{$t('button.ser')}}</Button></span>
<!--                <Button type="primary" @click="openUp(null,$t('button.add'))">新增</Button>-->
<!--                <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>-->
                <!--<Button type="primary" @click="advSearch()">高级查询</Button>-->
              </Row>
              <row class="table-form" ref="table-form">
                <Spin fix v-if="isSpin" size="large"></Spin>
                <Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"
                       @on-sort-change="sortable" :height="tableheight" size="small" stripe ref="selection"
                       :columns="columns" :data="data"></Table>
              </row>
              <Row style="display: flex">
                <Row style="display: flex">
                  <Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page"
                        @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]">
                  </Page>
                  <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((page - 1) * rows + 1)}} - {{page*rows > total ? total : page*rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
                </Row>
                <Button size="small" shape="circle" icon="md-refresh"
                        style="margin-left: 20px;display: inline-block;" @click="refresh"></Button>
              </Row>
            </i-col>
          </Row>
        </card>
      </i-col>
    </Row>
    <transition name="fade">
      <update v-show="openUpdate" :logType="logType" :select="select" @closeUp="closeUp" @getData="addNewArray" @update="updateArray"
              ref="update"></update>
    </transition>
    <advanced v-show="showAdvanced" @closeAdvanced ="closeAdvanced" ref="advanced" @getData="getData"></advanced>
  </div>
</template>
<script>
  import update from './update'
  import { isSuccess,getUrlKey } from '../../../lib/util'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import advanced from '@/components/searchTable/searchAdvanced'

  export default {
    name: 'dayAndMonReport',
    components: {
      update,
      advanced,
    },
    data() {
      return {
        isSpin: false,
        select: [
          {
            paramCode: 'day',
            paramInfoName: '日报',
          },
          {
            paramCode: 'month',
            paramInfoName: '月报',
          },
        ],
        attRptitType: '', // 请假类型
        attRptitName: '', // 请假类型
        tableheight: document.body.offsetHeight - 250,
        logType: '',
        openUpdate: false,
        showAdvanced: false,
        tableselected: [],
        columns: [
          // {
          //   type: 'selection',
          //   width: 60,
          //   align: 'center',
          // },
          {
            title: '项目类别',
            key: 'attRptitTypeDis',
          },
          {
            title: '项目编号',
            key: 'attRptitNo',
          },
          {
            title: '项目名称',
            key: 'attRptitName',
          },
          {
            title: '是否启用',
            key: 'attRptitStateDis',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                  },
                  on: {
                    click: () => {
                      this.openUp(params.row.id, this.$t('button.y.upd'), params.index, params.row.attRptitType)
                    },
                  },
                }, '修改'),
              ])
            },
          },
        ],
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        funId: '1000',
      }
    },
    mounted () {
        let func = this.$resize.call(this);
        window.onresize = func;
        func();
    },
    destroyed () {
        window.onresize = null;
    },
    mouted() {
      if (eval(getUrlKey('state').toLowerCase())) {
        const t = this
        t.attRptitType = ''
        t.attRptitName = ''
        t.getData(1)
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
      refresh() {
        this.page = 1
        this.getData()
      },
      getData(page, value) {
        const t = this
        t.isSpin = true
        if (page) {
          t.page = page
        }
        const data = {
          _mt:  this.$global.mt+'AttendRptitem.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          logType: '查询休假规则',
          attRptitType: t.attRptitType,
          attRptitName: t.attRptitName,
        }
        if (value) {
          data.searchData = JSON.stringify(value)
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.data = []
        t.total = 0
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
        }).finally(()=>{
          t.isSpin = false
        })
      },
      // 下拉查询
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'leaveType',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.select = res.data.content[0].value[0].paramList || []
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
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
                _mt:  this.$global.mt+'ApplyVacation.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
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
      openUp(id, logType, index, attRptitType) {
        const t = this
        t.openUpdate = true
        t.logType = logType
        t.index = index
        if (logType === this.$t('button.y.upd')) {
          t.$refs.update.getData(id, attRptitType)
        }
      },
      closeUp() {
        const t = this
        t.openUpdate = false
      },
      search() {
        this.page = 1
        this.getData()
      },

    },
  }
</script>
<style lang="scss" scoped>
  .table-form {
    margin: 10px 0;
  }

  .margin-right-10 {
    margin-right: 10px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .ivu-select,.ivu-input-wrapper,.ivu-btn{
    margin-right: 5px;
  }
</style>
