<template>
  <div class="content-main">
    <Row style='margin-bottom: 10px;'>
      <!-- <DatePicker type="date" placeholder="排班日期" :editable="false" format="yyyy-MM-dd"  v-model="attRddlDate" ></DatePicker> -->
      <DatePicker type="date" placeholder="开始日期" :editable="false" format="yyyy-MM-dd"  v-model="startTime" ></DatePicker>
      <DatePicker type="date" placeholder="结束日期" :editable="false" format="yyyy-MM-dd"  v-model="endTime" ></DatePicker>
      <Button type="primary"  @click="getdata(1)">{{$t('button.ser')}}</Button>
      <Button type="error" @click="deletemsg">{{$t('button.del')}}</Button>
      <Button type="primary" @click="showDate">生成排班明细</Button>
    </Row>
    <!-- <Row v-show='showStartDate'>
      <Button type="primary" @click="addGeneration">生成</Button>
      <Button type="primary" @click="closeDate">取消</Button>
    </Row> -->
    <row class="table-form" ref="table-form">
      <Spin fix v-if="isSpin" size="large"></Spin>
      <Table @on-selection-change="selectedtable" @on-sort-change="sortable" :height="410" size="small" border ref="selection" :columns="columns" :data="data"></Table>
    </row>
    <Row style="display: flex">          <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" :current="params.page" @on-change="pageChange":page-size-opts = "[10, 20, 50, 100]" ></Page>
      <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span><Button size="small" shape="circle" icon="md-refresh" style="margin-left: 20px;display: inline-block;" @click="getdata(1)"></Button></Row>
    <!-- 修改收费标准 -->
    <transition name="fade">
      <changeCharge v-show="showChangeCharge" ref="changeCharge" :comId="comId" :tinterviewertTeamid='id'  @getData="getdata" @hideChangeCharge="hideChangeCharge"></changeCharge>
    </transition>
  </div>
</template>
<script>
  import changeCharge from './changeITVTable'
  import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        isSpin: false,
        attRddlDate: '', // 排班日期
        startTime: '', // 开始日期
        endTime: '', // 结束日期
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
            title: '排班日期',
            key: 'attRddlDate',
          },
          {
            title: '轮次名称',
            key: 'attRddlRoundidDis',
          },
          {
            title: '班次名称',
            key: 'attRddlShiftnameDis',
          },
          {
            title: '日期类型',
            key: 'attRddlDatetypeDis',
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
                      this.showGoalBtn(params.row.id, this.$t('button.y.upd'),)
                    },
                  },
                }, this.$t('button.y.upd')),
              ])
            },
          },
        ],
        data: [],
        params: {
          _mt:  this.$global.mt+'AttendRounddetail.getPage',
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
      }
    },
    props: {
      id: Number,
      comId:String,//公司id
      idname: String,
      evaacStatus: String,
    },
    components: {
      changeCharge,
    },
    mounted() {

    },
    methods: {
      showDate() {
        const t = this
        if(!this.startTime || !this.endTime) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请选择开始日期和结束日期',
          })
          return
        }
        if(new Date(this.startTime).getTime() > new Date(this.endTime).getTime()) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '开始日期不大于结束日期',
          })
          return
        }
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: '确认生成排班明细?',
          onOk: () => {
            t.addGeneration()
          },
          onCancel: () => {
          },
        })
      },
      getdata(page) {
        if (this.startTime !== undefined) {
          this.startTime = this.startTime === '' ? '' : new Date(this.startTime).format('yyyy-MM-dd')
        }
        if(this.endTime !== undefined){
          this.endTime = this.endTime === '' ? '' : new Date(this.endTime).format('yyyy-MM-dd')
        }
        if(new Date(this.startTime).getTime() > new Date(this.endTime).getTime()) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '开始日期不大于结束日期',
          })
          return
        }
        const t = this
        if (page) {
          t.params.page = page
        }
        t.params.logType = '排班明细表';
        t.params.attRddlRoundid = t.id;
        t.params.startTime = t.startTime;
        t.params.endTime = t.endTime;
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
                _mt:  this.$global.mt+'AttendRounddetail.delByIds',
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
      showGoalBtn(id, button) {
        let t = this
        t.showChangeCharge = true
        this.$refs.changeCharge.getData(id);
      },
      hideChangeCharge() {
        let t = this
        t.showChangeCharge = false
      },
      /*
      *  打开关闭开始日期 结束日期搜索
      * */
      // showDate() {
      //   this.showStartDate = true
      // },
      closeDate() {
        this.showStartDate = false
        this.startTime = ''
        this.endTime = ''
      },
      // 生成
      addGeneration() {
        const t = this
        const data = {}
        data._mt =  this.$global.mt+'AttendRounddetail.generationData'
        data.logType = t.logType
        data.attRddlRoundid = t.id
        if (this.startTime !== undefined) {
          this.startTime = this.startTime === '' ? '' : new Date(this.startTime).format('yyyy-MM-dd')
          data.startTime = this.startTime
        }
        if (this.endTime !== undefined) {
          this.endTime = this.endTime === '' ? '' : new Date(this.endTime).format('yyyy-MM-dd')
          data.endTime = this.endTime
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '生成成功',
            })
            t.getdata()
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 关model 请数据
      clear() {
        let t = this
        t.attRddlDate = ''
        t.showStartDate = false
        t.startTime = ''
        t.endTime = ''
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
