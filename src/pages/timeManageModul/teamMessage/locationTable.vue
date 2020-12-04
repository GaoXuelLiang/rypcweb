<template>
  <div class="content-main">
    <Row style='margin-bottom: 10px;'>
      <Button type="primary" @click="showGoalBtn(null,$t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Spin fix v-if="isSpin" size="large"></Spin>
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border
             ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">
      <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
            @on-change="pageChange" :current="params.page" :page-size-opts="[10, 20, 50, 100]"></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      <Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;"
              @click="getdata(1)"></Button>
    </Row>
    <!-- 修改考勤地点 -->
    <transition name="fade">
      <changeCharge v-show="showChangeCharge" ref="changeCharge" :tinterviewertTeamid='id' @getData="getdata"
                    @hideChangeCharge="hideChangeCharge" :logType="logType"></changeCharge>
    </transition>
  </div>
</template>
<script>
  import changeCharge from './changeITVTable'
  import {getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        showStartDate: false,
        selectPcyinsIns: [],
        select: this.$t('button.all'),
        total: NaN,
        logType: '',
        sihfpcy: '',
        showChangeCharge: false,
        sihfpcyinsIns: '',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '考勤地点',
            key: 'attTmlcLocation',
            sortable: 'custom',
          },
          {
            title: '经度',
            key: 'attTmlcLong',
            width: 100,
            sortable: 'custom',
          },
          {
            title: '纬度',
            key: 'attTmlcLati',
            width: 100,
            sortable: 'custom',
          },
          {
            title: '最大范围',
            key: 'attTmlcMaxsize',
            width: 100,
            sortable: 'custom',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 100,
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
                      this.showGoalBtn(params.row.id, this.$t('button.y.upd'))
                    },
                  },
                }, this.$t('button.y.upd')),
              ])
            },
          },
        ],
        data: [],
        params: {
          _mt:  this.$global.mt+'AttendTeamlocation.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          logType: '',
          attTmlcTeamid: Number,
        },
        index: '',
        tableselected: '',
        name: '',
      }
    },
    props: {
      id: Number,
      idname: String,
      evaacStatus: String,
    },
    components: {
      changeCharge,
    },
    mounted() {

    },
    methods: {
      getdata(page) {
        const t = this
        if (page) {
          t.params.page = page
        }
        t.params.logType = '考勤地点列表';
        t.params.attTmlcTeamid = t.id;
        let data = deepCopy(t.params)
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.isSpin = true
        getDataLevelUserLoginNew(data).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.total = res.data.content[0].records
            t.data = res.data.content[0].rows
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      search() {
        let t = this
        t.getdata();
      },
      pageChange(page) {
        const t = this
        t.params.page = page
        t.getdata()
      },
      sortable(column) {
        this.params.sort = column.key
        this.params.order = column.order
        if (this.params.order !== 'normal') {
          this.getdata()
        } else {
          this.params.order = 'desc'
        }
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr.toString()
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
                _mt:  this.$global.mt+'AttendTeamlocation.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
                tinterviewertTeamid: t.id,
              }).then((res) => {
                if (isSuccess(res, t)) {
                  t.tableselected = [] // 记得将选项数组清空
                  t.getdata()
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
      sizeChange(size) {
        const t = this
        t.params.rows = size
        t.getdata()
      },
      // 点击新增或删除
      showGoalBtn(id, logType) {
        const t = this
        t.showChangeCharge = true
        t.logType = logType
        if (logType === this.$t('button.y.upd')) {
          t.$refs.changeCharge.getData(id)
        }
      },
      hideChangeCharge() {
        this.showChangeCharge = false
      },
      // 关model 请数据
      clear() {
        let t = this
      },
      showStf() {
      },
    },
  }
</script>
<style lang="scss" scoped>
  .content-main {
    /*height: 550px;*/
    .table-form {
      margin: 10px 0;
    }
  }
</style>
