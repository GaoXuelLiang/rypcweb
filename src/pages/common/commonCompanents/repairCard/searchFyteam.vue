<template>
  <div class="background">
    <div class="backbox">
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark" size="16"></Icon>&nbsp;选择异常考勤
        </div>
        <Button type="text"  @click="close">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <Row class="table-form">
        <!--<Input :placeholder="searchText" style="width: 200px" v-model="fypdYear"/>-->
        <DatePicker type="date" placeholder="开始日期" :editable="false" format="yyyy-MM-dd"  v-model="startTime" ></DatePicker>
        <DatePicker type="date" placeholder="结束日期" :editable="false" format="yyyy-MM-dd"  v-model="endTime" ></DatePicker>
        <span style="margin: 0;"><Button type="primary"  @click="getData(1)" :loading="isSpin">{{$t('button.ser')}}</Button></span>
        <!--<span style="margin: 0;"><Button type="warning"   @click="clear">{{$t('button.cle')}}</Button></span>-->
      </Row>
      <row class="table-form" ref="table-form">
        <Spin fix v-if="isSpin" size="large"></Spin>
        <Table height="320" size="small" border ref="selection" @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"
               :columns="searchCloumns" @on-sort-change="sortable" :data="data" ></Table>
      </row>
      <Row style="display: flex">
        <Page :total="total" size="small" :current="params.page" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts = "[10, 20, 50, 100]" ></Page>
        <span style="margin-left: 10px;margin-top: 2px"> {{$t('reminder.view')}} {{((params.page - 1) * params.rows + 1)}} - {{params.page*params.rows > total ? total : params.page*params.rows}}  {{$t('reminder.of')}}  <span>{{total}}</span></span>
      </Row>
      <div class="btn-save">
        <Button type="primary" style="margin-right: 30px " @click="save">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../../axios/axios'
import { isSuccess, deepCopy } from '../../../../lib/util'

export default{
  data() {
    return {
      startTime: '', // 开始日期
      endTime: '', // 结束日期
      isSpin: false,
      data: [],
      total: NaN,
      fypdYear: '',
//      searchText: '请输入班组',
      params: {
        _mt:  this.$global.mt+'ApplyAdditionaldetail.getPage',
        sort: 'id',
        order: 'asc',
        rows: 10,
        page: 1,
        logType: '异常考勤',
      },
      searchCloumns: [
        {
          type: 'selection',
          width: 54,
          align: 'center',
        },
        {
          title: '考勤日期',
          key: 'addiAttendance',
          sortable: 'custom',
        },
        {
          title: '进出标志',
          key: 'addiRemarkDis',
          sortable: 'custom',
        },
        {
          title: '实际打卡时间',
          key: 'addiChecktime',
          sortable: 'custom',
        }
      ],
      tableselected: [],
      tableselectedDis: [],
      addiEmpid: '',
    }
  },
  props: {
    flowInfo: Object,
  },
  methods: {
    getData(page, empId) {
      const t = this
      if (this.startTime !== undefined && this.endTime !== undefined) {
        if (new Date(this.startTime).getTime() > new Date(this.endTime).getTime()) {
          t.$Message.error({
            content: '开始日期不大于结束日期',
            duration: '3',
          })
          return
        }
      }
      if (page) {
        t.params.page = page
      }
      const data = deepCopy(t.params)
      this.addiEmpid = empId || this.addiEmpid
      data.addiEmpid = this.addiEmpid
//      data['fypdYear'] = t.fypdYear
      if (this.startTime !== undefined) {
        this.startTime = this.startTime === '' ? '' : new Date(this.startTime).format('yyyy-MM-dd')
        data.addiStart = this.startTime
      }
      if (this.endTime !== undefined) {
        this.endTime = this.endTime === '' ? '' : new Date(this.endTime).format('yyyy-MM-dd')
        data.addiEnd = this.endTime
      }
      for (const dat in data) {
        if (data[dat] === '') {
          delete data[dat]
        }
      }
      t.isSpin = true
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
      })
    },
    close() {
      this.sort = 'id'
      this.order = 'desc'
      this.params.page = 1
      this.fypdYear = ''
      this.$emit('closeUp')
    },
    dbCkick(row) {
      const t = this
      this.close()
      this.$emit('changeinput', row)
      this.$emit('closeUp')
    },
    clear() {
      this.sort = 'id'
      this.order = 'desc'
      this.params.page = 1
      this.fypdYear = ''
      this.$emit('clear')
      this.$emit('closeUp')
    },
    sizeChange(size) {
      const t = this
      t.params.rows = size
      t.getData()
    },
    pageChange(page) {
      const t = this
      t.params.page = page
      t.getData()
    },
    sortable(column) {
      this.params.sort = column.key
      this.params.order = column.order
      if (column.order !== 'normal') {
        this.getData()
      } else {
        this.params.order = 'desc'
      }
    },
    selectedtable(selection) {
      const newArr = []
      const newArrDis = []
      for (let i = 0; i < selection.length; i++) {
        newArr.push(selection[i].id)
        newArrDis.push(selection[i].attTeamName)
      }
      this.tableselected = newArr
      this.tableselectedDis = newArrDis
    },
    save() {
      const t = this
      if (t.tableselected.length === 0) {
        t.$Modal.warning({
          title: this.$t('reminder.remind'),
          content: this.$t('reminder.leastone'),
        })
      } else {
        t.close()
//        t.$emit('changeinput', t.tableselectedDis, t.tableselected)
//        t.$emit('closeUp')
        const data = {
          _mt:  this.$global.mt+'ApplyAdditionaldetail.addOrUpd',
          logType: '保存补卡',
          addiDataid: t.addiEmpid,
          addiids: t.tableselected.toString(),
        }
        getDataLevelUserLogin(data).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$emit('closeUp')
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '保存成功',
            })
            t.$emit('getData')
//            if (t.logType === this.$t('button.add')) {
//              t.$refs.formValidate.resetFields()
//              t.$emit('getData', res.data.content[0])
//            } else {
//              t.$Modal.success({
//                title: this.$t('reminder.suc'),
//                content: this.$t('reminder.updsuccess'),
//              })
//              t.$emit('update', res.data.content[0])
//            }
          }
        }).catch(() => {
          t.isSpin = false
//              this.$Modal.error({
//                title: this.$t('reminder.err'),
//                content: this.$t('reminder.errormessage'),
//              })
        })
      }
    },

  },
}
</script>
<style lang="scss" scoped>
  .table-form{
    margin-bottom: 10px;
  }
  .background{
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    -webkit-overflow-scrolling: touch;
    outline: 0;
  .backbox{
    position:relative;
    width: 800px;
    background-color: #fff;
    padding: 60px 20px 30px 20px;
    border-radius: 10px;
  .title{
    display: flex;
    position: absolute;
    height: 40px;
    width: 100%;
    line-height: 40px;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    top: 0;
    border-bottom: 1px solid #efefef;
    left: 0;

  .title-text{
    font-weight: bold;
    font-size: 14px;
  }
  }
  }
  }
  .btn-save{
    text-align: right;
    margin-top: 10px;
  }
</style>
