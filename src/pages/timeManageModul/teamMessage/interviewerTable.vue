<template>
  <div class="content-main">
    <Row style='margin-bottom: 10px;'>
      <Input v-model="empName" :placeholder="$t('lang_employee.empmaster.empCnameDis')" style="width:200px"/>
      <Button @click="search" type="primary" >{{$t('button.ser')}}</Button>
      <Button type="primary" @click="showMsgBtn(NaN,$t('button.add'))">{{$t('button.add')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
    </Row>
    <row class="table-form" ref="table-form">
      <Spin fix v-if="isSpin" size="large"></Spin>
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" :current="params.page" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getdata(1)"></Button></Row>
    <!-- 选择员工 -->
    <transition name="fade">
      <staffPage v-show="showMsg" :logType="logType" :id="id" :positionComp="positionComp" ref="staffPage" @hideMsg="hideMsg"></staffPage>
    </transition>
  </div>
</template>
<script>
  import staffPage from './staffPage'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        empName:'',//员工姓名
        isSpin: false,
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
            title: '员工',
            key: 'attTmmemEmpidDis',
          },
          {
            title: '公司',
            key: 'attTmmemCompidDis',
          },
          {
            title: '部门',
            key: 'attTmmemDeptidDis',
          },
          {
            title: '员工工号',
            key: 'attTmmemEmpno',
          },
          {
            title: '排班开始日期',
            key: 'attTmmemSdate',
          },
          {
            title: '排班结束日期',
            key: 'attTmmemEdate',
          },
        ],
        data: [],
        params: {
          _mt:  this.$global.mt+'AttendTeammem.getPage',
          funId: '1',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          logType: '',
          evateActionid: Number,
        },
        index: '',
        tableselected: '',
        name: '',
        showMsg: false,
      }
    },
    props: {
      id: Number,
      positionComp: '',
      idname: String,
      evaacStatus: String,
    },
    components: {
      staffPage,
    },
    mounted() {

    },
    methods: {
      getdata(page) {
        const t = this
        if (page) {
          t.params.page = page
        }
        t.params.logType = '班组员工';
        t.params.attTmmemEmpidDis = t.empName ? t.empName : '';
        t.params.attTmmemTeamid = t.id;
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
      search(){
        let t = this
        this.params.page = 1;
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
                _mt:  this.$global.mt+'AttendTeammem.delByIds',
                funId: '1',
                logType: this.$t('button.del'),
                delIds: t.tableselected.toString(),
                attTmmemTeamid: t.id,
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
      showGoalBtn(row, button) {
        let t = this
        t.showChangeCharge = true
        this.$refs.changeCharge.getData(row);
      },
      hideChangeCharge() {
        let t = this
        t.showChangeCharge = false
      },
      // 关model 请数据
      clear() {
        let t = this
        t.showStartDate = false
        t.startTime = ''
        t.endTime = ''
        t.empName = ''
      },
      // 点击新增选择员工
      showMsgBtn(id, logType, index) {
        const t = this
        t.showMsg = true
        t.index = index
        t.logType = logType
        t.$refs.staffPage.getData()
      },
      hideMsg() {
        let t = this
        t.getdata()
        t.showMsg = false
      },
    },
  }
</script>
<style lang="scss" scoped>
.content-main{
  /*height: 550px;*/
  .table-form{
    margin: 10px 0;
  }
}
</style>
