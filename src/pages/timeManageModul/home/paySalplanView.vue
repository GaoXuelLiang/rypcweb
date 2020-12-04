<template>
  <div class="cover">
    <div class="box">
      <!--style="width: 90%;height: 70%"-->
      <div class="title">
        <div class="title-text">
          <Icon type="ios-bookmark"></Icon>&nbsp;排班明细
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="md-close" size="20"></Icon>
        </Button>
      </div>
      <i-col span="24">
        <Spin fix v-if="isSpin" size="large"></Spin>
        <p v-show="logType=='排班明细'" style='text-align: center;font-size: 14px;color: #495060;'>{{resData.attEmpsfEmpno + '---' +resData.attEmpsfEmpDis + '---' + (resData.attEmpsfPeriod || '') + '---' + (resData.attEmpsfTeamidDis || '')}}</p>
        <!--<p v-show="logType=='批量排班'" style='text-align: center;font-size: 14px;color: #495060;'>{{qijian}}</p>-->

        <div v-show="calendarModel2" class="calendar_table">
          <Row style="min-width: 1200px;">
            <!--<i-col span='5' v-show="logType=='批量排班'">-->
              <!--<span>-->
              	<!--<Input placeholder="请输入班组名称" style="width: 160px" v-model="attTeamName"/>-->
              <!--</span>-->
              <!--<span style="margin: 0;"><Button type="primary"  @click="search">{{$t('button.ser')}}</Button></span>-->
              <!--<row class="table-form" ref="table-form" style='height: 310px;'>-->
                <!--<Table @on-select="selectedtable" @on-select-cancel="selectedtable" @on-select-all="selectedtable" @on-select-all-cancel="selectedtable"-->
                       <!--@on-sort-change="sortable" :height="tableheight" size="small" border ref="selection"-->
                       <!--:columns="columns" :data="data"></Table>-->
              <!--</row>-->
              <!--<Row style="display: flex">-->
                <!--<Row style="display: flex">-->
                  <!--<Page :total="total" size="small" show-elevator show-sizer placement="top" :current="page"-->
                        <!--@on-page-size-change="sizeChange" @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]">-->
                  <!--</Page>-->
                <!--</Row>-->
                <!--<Button size="small" shape="circle" icon="md-refresh"-->
                        <!--style="margin-left: 10px;display: inline-block;margin-top: 24px;" @click="refresh"></Button>-->
              <!--</Row>-->
            <!--</i-col>-->
            <!--<i-col span='5' v-show="logType=='排班明细'">-->
              <!--<p style='margin: 5px 0;font-size: 18px;'>员工姓名: {{resData.attEmpsfEmpDis || ''}}</p>-->
            <!--</i-col>-->

            <!-- 日历 -->
            <!--<i-col span="16" offset='1' v-show="logType=='批量排班'">-->
             <!-- <Row class="table_header_box">
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.sun')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.mon')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.tues')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.wed')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.thurs')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.fri')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.sat')}}</i-col>
              </Row>
              <Row class="table_body_box">
                <i-col span="3" class="table_body" v-for="(days,index1) in calendar_data" :key="index1">
                  <div v-if="days.isKey === '2'" class="conbox area bgWhite" style="background-color: rgb(255,226,226)">
                    <div class="day" >{{days.calendarDate1}}</div>
                    <Select v-model="days.roundid" style='height: 34px;'  placeholder="班次">
                      <Option :value="item.id" :key="index" v-for="(item,index) in selectAttShifName">{{item.attShifName}}
                      </Option>
                    </Select>
                    <Select v-model="days.datetype" style='height: 34px;' placeholder="日期类型">
                      <Option :value="item.paramCode" :key="index" v-for="(item,index) in selectDate">{{item.paramInfoName}}
                      </Option>
                    </Select>
                  </div>
                  <div v-else-if="days.isKey === '1'" class="conbox area bgWhite"
                       > &lt;!&ndash;style="background-color: rgba(36,187,239,0.29)"&ndash;&gt;
                    <div class="day" >{{days.calendarDate1}}</div>
                    <Select v-model="days.roundid" style='height: 34px;'  placeholder="班次">
                      <Option :value="item.id" :key="index" v-for="(item,index) in selectAttShifName">{{item.attShifName}}
                      </Option>
                    </Select>
                    <Select v-model="days.datetype" style='height: 34px;' placeholder="日期类型">
                      <Option :value="item.paramCode" :key="index" v-for="(item,index) in selectDate">{{item.paramInfoName}}
                      </Option>
                    </Select>
                  </div>
                  <div v-else-if="days.calendarComptype === '01workday' || days.calendarLegaltype === '01workday'"
                       class="conbox area bgWhite" >
                    <div class="day" >{{days.calendarDate1}}</div>
                    <Select v-model="days.roundid" style='height: 34px;'  placeholder="班次">
                      <Option :value="item.id" :key="index" v-for="(item,index) in selectAttShifName">{{item.attShifName}}
                      </Option>
                    </Select>
                    <Select v-model="days.datetype" style='height: 34px;' placeholder="日期类型">
                      <Option :value="item.paramCode" :key="index" v-for="(item,index) in selectDate">{{item.paramInfoName}}
                      </Option>
                    </Select>
                  </div>
                  &lt;!&ndash; 休息日、节假日样式 &ndash;&gt;
                  <div v-else-if="days.calendarComptype === '02weekend'
                                 || days.calendarComptype === '03holiday'
                                 || days.calendarLegaltype === '02weekend'
                                 || days.calendarLegaltype === '03holiday'"
                       class="conbox area" style="background-color: rgba(151,255,152,0.34)">
                    <div class="day">{{days.calendarDate1}}</div>
                    <Select v-model="days.roundid" style='height: 34px;'  placeholder="班次">
                      <Option :value="item.id" :key="index" v-for="(item,index) in selectAttShifName">{{item.attShifName}}
                      </Option>
                    </Select>
                    <Select v-model="days.datetype" style='height: 34px;' placeholder="日期类型">
                      <Option :value="item.paramCode" :key="index" v-for="(item,index) in selectDate">{{item.paramInfoName}}
                      </Option>
                    </Select>
                  </div>
                  &lt;!&ndash; 没有日期的样式 &ndash;&gt;
                  <div v-else="days.calendarComptypeName" class="conbox area"></div>
                </i-col>
              </Row>-->
            <!--</i-col>-->
            <i-col span="22" v-show="logType=='排班明细'">
              <Row class="table_header_box">
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.sun')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.mon')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.tues')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.wed')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.thurs')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.fri')}}</i-col>
                <i-col span='3' class="table_header">{{$t('lang_platform.platCalendar.sat')}}</i-col>
              </Row>
              <Row class="table_body_box">
                <i-col span="3" class="table_body" v-for="(days,index1) in calendar_data" :key="index1">
                  <div v-if="days.isKey === '2'" class="conbox area bgWhite" style="background-color: rgb(255,226,226)">
                    <div class="day">{{days.calendarDate1}}</div>
                    <Select v-model="days.roundid" style='height: 34px;'  placeholder="班次" clearable>
                      <Option :value="item.id" :key="index" v-for="(item,index) in selectAttShifName">{{item.attShifName}}
                      </Option>
                    </Select>
                    <Select v-model="days.datetype" style='height: 34px;' placeholder="日期类型" clearable>
                      <Option :value="item.paramCode" :key="index" v-for="(item,index) in selectDate">{{item.paramInfoName}}
                      </Option>
                    </Select>
                  </div>
                  <div v-else-if="days.isKey === '1'" class="conbox area bgWhite"
                       > <!--style="background-color: rgba(36,187,239,0.29)" -->
                    <div class="day">{{days.calendarDate1}}</div>
                    <Select v-model="days.roundid" style='height: 34px;'  placeholder="班次" clearable>
                      <Option :value="item.id" :key="index" v-for="(item,index) in selectAttShifName">{{item.attShifName}}
                      </Option>
                    </Select>
                    <Select v-model="days.datetype" style='height: 34px;' placeholder="日期类型" clearable>
                      <Option :value="item.paramCode" :key="index" v-for="(item,index) in selectDate">{{item.paramInfoName}}
                      </Option>
                    </Select>
                  </div>
                  <div v-else-if="days.calendarComptype === '01workday' || days.calendarLegaltype === '01workday'"
                       class="conbox area bgWhite">
                    <div class="day">{{days.calendarDate1}}</div>
                    <Select v-model="days.roundid" style='height: 34px;'  placeholder="班次" clearable>
                      <Option :value="item.id" :key="index" v-for="(item,index) in selectAttShifName">{{item.attShifName}}
                      </Option>
                    </Select>
                    <Select v-model="days.datetype" style='height: 34px;' placeholder="日期类型" clearable>
                      <Option :value="item.paramCode" :key="index" v-for="(item,index) in selectDate">{{item.paramInfoName}}
                      </Option>
                    </Select>
                  </div>
                  <!-- 休息日、节假日样式 -->
                  <div v-else-if="days.calendarComptype === '02weekend'
                                 || days.calendarComptype === '03holiday'
                                 || days.calendarLegaltype === '02weekend'
                                 || days.calendarLegaltype === '03holiday'"
                       class="conbox area" style="background-color: rgba(151,255,152,0.34)">
                    <div class="day">{{days.calendarDate1}}</div>
                    <Select v-model="days.roundid" style='height: 34px;'  placeholder="班次" clearable>
                      <Option :value="item.id" :key="index" v-for="(item,index) in selectAttShifName">{{item.attShifName}}
                      </Option>
                    </Select>
                    <Select v-model="days.datetype" style='height: 34px;' placeholder="日期类型" clearable>
                      <Option :value="item.paramCode" :key="index" v-for="(item,index) in selectDate">{{item.paramInfoName}}
                      </Option>
                    </Select>
                  </div>
                  <!-- 没有日期的样式 -->
                  <div v-else="days.calendarComptypeName" class="conbox area"></div>
                </i-col>
              </Row>
            </i-col>
          </Row>
        </div>
      </i-col>
      <div class="btn-save">
        <Button type="primary" :loading="isSpin" style="margin-right: 30px;margin-top: 2px; " @click="save">{{$t('button.sav')}}</Button>
      </div>

    </div>
    <!-- 进行修改操作弹出的页面 start -->
    <transition name="fade">
      <update v-show="openUpdate" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="getData"
              ref="update"></update>
    </transition>
    <!-- 进行修改操作弹出的页面 end -->

    <transition name="fade">
      <update2 v-show="openUpdate2" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp2"
               @getData="addNewArray" @update="updateArray" ref="update2"></update2>
    </transition>
    <transition name="fade">
      <person v-show="openPersondate" @closePerson="closePerson" @getData="getData" ref="person"></person>
    </transition>

  </div>
</template>
<script>
  import update from "./paySalplantask/paySalplantaskManage";
  import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
  } from "../../../axios/axios";
  import {isSuccess, deepCopy} from "../../../lib/util";
  import update2 from "./paySalplantask/paySalplantaskView";
  import person from "./paySalplantaskperson/paySalplantaskpersonManage";
  import Bus from "../../.././lib/bus";

  export default {
    props: {
      logType: '',
      attEmpsfPeriod: '', // 期间id
      qijian: '', // 期间
    },
    data() {
      return {
        isSpin: false,
        selectAttShifName: [],
        selectDate: [],
        loading: true,
        tableheight: document.body.offsetHeight - 440,
        value: "",
        openUpdate: false,
        openUpdate2: false,
        openPersondate: false,
        updateId: NaN,
        selectYearType: [],
        tableselected: [],
        columns: [
          {
            type: 'selection',
            width: 54,
            align: 'center',
          },
          {
            title: '班组名称',
            key: 'attTeamName',
            sortable: 'custom',
          },
        ],
        data1: [], // 任务数据
        total1: 0, // 任务数据
        data2: [], // 任务数据日历模式
        planId: "", // 主表ID
        calendar_index: 0,
        year: "",
        month: "",
        day: "",
        calendarModel1: false, //  表格日历
        ischecked1: false,
        ischecked2: true,
        calendarModel2: true, //  月份日历
        calendar_data: [], // 日历日期数组
        getBlur1: false,
        getBlur2: false,
        taskMap: [],
        // 点击给考核模板弹窗传参调接口
        params: {
          _mt:  this.$global.mt+'AttendRoundshift.getPage',
          sort: 'id',
          order: 'asc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: this.$t('button.ser'),
        },
        data: [],
        total: 0,
        index: 0,
        sort: 'id',
        order: 'desc',
        rows: 10,
        page: 1,
        funId: '1000',
        attTeamName: '',
        sicalcPeriodDis: '', // 期间值
        resData: {},  // 获取详情数据
        listdetail: [],  // 获取详情数组
        teamidd: '', // 班组id
      };
    },
    computed: {},
    components: {
      update,
      person,
      update2
    },
    mounted() {
      // Bus.$on('onChange', (id) => {
      //   this.planId = id
      //   this.getCaldearData()
      // })
    },
    methods: {
      getDetail(id) {
        const t = this
        if (id) {
          t.isSpin = true
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'AttendEmpshift.getById',
            logType: '排班详情',
            id: id,
          }).then((res) => {
            t.isSpin = false
            if (isSuccess(res, t)) {
              t.resData = res.data.content[0];
              t.listdetail = res.data.content[0].listdetail;
              t.teamidd = res.data.content[0].attEmpsfTeamid;
              let temArr = []  // 临时数组
              let indexArr = []  // 索引
              t.calendar_data.forEach((item, index) => {
                if(item.id) {
                  indexArr.push(index)
                }
              })
//              console.log('t.calendar_data', t.calendar_data);
//              console.log('t.listdetail', t.listdetail);
              t.calendar_data.forEach((item, index) => {
                if(indexArr.length) temArr.push(Object.assign(item,t.listdetail[index - indexArr[0]]))
              })
              temArr.forEach((item, index) => {
                if(item.attEmpsfdlRoundid) item.roundid = item.attEmpsfdlRoundid
                if(item.attEmpsfdlDatetype) item.datetype = item.attEmpsfdlDatetype
                if(item.attEmpsfdlMonthdate) item.date = item.attEmpsfdlMonthdate
              })
//              console.log('temArr', temArr);
              t.calendar_data = temArr
            }
          }).catch(() => {
            t.isSpin = false
            this.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })
        }
      },
      save() {
//        this.logType === '批量排班' ? this.saveAdd() : this.saveEdit()
        this.saveEdit()
      },
      saveEdit() {
        const t = this
        t.isSpin = true
        let dataArr = []
        t.calendar_data.forEach((item, index) => {
          if(item.date) {
            dataArr.push(item)
          }
        })
//        console.log('dataArr--', dataArr);
        dataArr.forEach((item, index) => {
          if(item.calendarComptype) delete item.calendarComptype
          if(item.calendarComptypeName) delete item.calendarComptypeName
          if(item.calendarDate) delete item.calendarDate
          if(item.calendarDate1) delete item.calendarDate1
          if(item.calendarLegaltype) delete item.calendarLegaltype
          if(item.calendarLegaltypeName) delete item.calendarLegaltypeName
          if(item.calendarWeek) delete item.calendarWeek
          if(item.companyId) delete item.companyId
          if(item.createBy) delete item.createBy
          if(item.createTime) delete item.createTime
          if(item.calendarDesc) delete item.calendarDesc
          if(item.isKey) delete item.isKey
          if(item.taskName) delete item.taskName
          if(item.attEmpsfdlShiftid) delete item.attEmpsfdlShiftid
          if(item.attEmpsfdlTeamid) delete item.attEmpsfdlTeamid
          if(item.attEmpsfdlMonthdate) delete item.attEmpsfdlMonthdate
          if(item.attEmpsfdlDatetypeDis) delete item.attEmpsfdlDatetypeDis
          if(item.attEmpsfdlRoundid) delete item.attEmpsfdlRoundid
          if(item.attEmpsfdlDatetype) delete item.attEmpsfdlDatetype
          if(item.attEmpsfdlRoundidDis) delete item.attEmpsfdlRoundidDis
          if(item.id) delete item.id
          if(!item.roundid) item.roundid = ''
          if(!item.datetype) item.datetype = ''
          if(!item.date) item.date = ''
        })
        const data = deepCopy(dataArr)
        getDataLevelUserLoginNew({
          _mt : 'attendEmpshift.updSchedulingDetails',
          logType : '排班明细',
          empshiftid : t.planId, // 主表id
          teamid : t.teamidd, // 班组id
          staffArr : data,
        }).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.updsuccess'),
            })
            t.handleReset();
            t.$emit('getData')
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      saveAdd() {
        const t = this
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t('reminder.remind'),
            content: '请选择班组',
          })
          return
        }
        t.isSpin = true
        let dataArr = []
        t.calendar_data.forEach((item) => {
          if(typeof item == 'object') {
            dataArr.push(item)
          }
        })
        dataArr.forEach((item, index) => {
         if(item.calendarComptype) delete item.calendarComptype
         if(item.calendarComptypeName) delete item.calendarComptypeName
         if(item.calendarDate) delete item.calendarDate
         if(item.calendarDate1) delete item.calendarDate1
         if(item.calendarLegaltype) delete item.calendarLegaltype
         if(item.calendarLegaltypeName) delete item.calendarLegaltypeName
         if(item.calendarWeek) delete item.calendarWeek
         if(item.companyId) delete item.companyId
         if(item.createBy) delete item.createBy
         if(item.createTime) delete item.createTime
         if(item.calendarDesc) delete item.calendarDesc
         if(item.isKey) delete item.isKey
         if(item.taskName) delete item.taskName
         if(t.logType === '批量排班' && item.id) delete item.id
         if(!item.roundid) item.roundid = ''
         if(!item.datetype) item.datetype = ''
         if(index<9){
           item.date = t.sicalcPeriodDis.substr(0,4) + '-' + t.sicalcPeriodDis.substr(4) + '-' + '0' + (index+1)
         } else {
           item.date = t.sicalcPeriodDis.substr(0,4) + '-' + t.sicalcPeriodDis.substr(4) + '-' + (index+1)
         }
        })
        const data = deepCopy(dataArr)
        getDataLevelUserLoginNew({
          _mt :  this.$global.mt+'AttendEmpshift.batchScheduling',
          logType : '批量排班',
          staffArr : data,
          attEmpsfPeriod : t.sicalcPeriodDis, // 期间值
          teamIds : t.tableselected.join(','),
        }).then((res) => {
          t.isSpin = false
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '保存成功',
            })
            t.handleReset();
            t.$emit('getData')
          }
        }).catch(() => {
          t.isSpin = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 获取日期类型
      getSelectDate() {
        const t = this
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
          typeCode: 'datetype',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectDate = res.data.content[0].value[0].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 获取班次名称
      getBanName() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AttendShift.getPage',
          rows: 1000,
          page: 1,
          sort: 'id',
          order: 'desc',
          logType: t.$t('button.ser'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.selectAttShifName = res.data.content[0].rows || []
//            if(t.selectAttShifName.length) {
//              t.selectAttShifName.unshift({id: '', attShifName: '取消'})
//            }
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      search() {
        this.page = 1
        this.getTable()
      },
      refresh() {
        this.getTable()
      },
      getTable() {
        const t = this
        const data = {
          _mt:  this.$global.mt+'AttendTeam.getPage',
          rows: t.rows,
          page: t.page,
          sort: t.sort,
          order: t.order,
          attTeamName: t.attTeamName,
          logType: this.$t('button.ser'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        t.data = [];
        t.total = 0;
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
      *  table 表格
      * */
      sortable(column) {
        this.sort = column.key
        this.order = column.order
        if (this.order !== 'normal') {
          this.getTable()
        } else {
          this.order = 'desc'
        }
      },
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getTable()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getTable()
      },
      selectedtable(selection) {
        const newArr = []
        for (let i = 0; i < selection.length; i++) {
          newArr.push(selection[i].id)
        }
        this.tableselected = newArr
      },

      // 获取当前时间
      getTime(planId, sicalcPeriodDis) {
        const t = this;
        if (t.planId === "") {
          t.planId = planId;
        }
        t.sicalcPeriodDis = sicalcPeriodDis;
        let date = new Date();
        t.year = date.format("yyyy");
        t.month = date.format("MM");
        t.day = date.format("dd");
      },
      getData(flag, page) {
        const t = this;
        t.getCaldearData();

//        if (!flag) {
//          t.getCaldearData();
//        } else {
//          t.getPageMenthod();
//        }

      },
//      getPageMenthod() {
//        const t = this
//        const data1 = {
//          _mt: 'paySalplantask.getPage',
//          rows: t.rows,
//          page: t.page,
//          sort: t.sort,
//          order: t.order,
//          logType: this.$t('button.ser'),
//          salpltkPlanid: t.planId,
//        }
//        for (const dat in data1) {
//          if (data1[dat] === '') {
//            delete data1[dat]
//          }
//        }
//        getDataLevelUserLoginNew(data1)
//          .then(res => {
//            if (isSuccess(res, t)) {
//              t.data1 = res.data.content[0].rows;
//              // console.log(t.data)
//              t.total1 = res.data.content[0].records;
//
//            }
//          })
//          .catch(() => {
//            t.$Modal.error({
//              title: this.$t('reminder.err'),
//              content: this.$t('reminder.errormessage'),
//            })
//          })
//      },
      openUp2(id, logType, index, date) {
        const t = this;
        t.updateId = parseInt(id, 10);
        t.logType = logType;
        t.openUpdate2 = true;
        t.index = index;
        t.$refs.update2.getPlanid(t.planId, date);
        //        t.$refs.update.getSelect()
        if (logType === this.$t("button.y.upd")) {
          t.$refs.update2.getData(id);
        }
      },
      closeUp2() {
        const t = this;
        t.openUpdate2 = false;
      },
      openPerson(id) {
        const t = this;
        t.openPersondate = true;
        //        t.$refs.update.getSelect()
        t.$refs.person.getData(id);
      },
      closePerson() {
        const t = this;
        t.openPersondate = false;
      },
      addNewArray(res) {
        const t = this;
        t.data1.unshift(res);
      },
      // 更新
      updateArray(res) {
        const t = this;
        t.data1.splice(t.index, 1, res);
      },
      getSelect() {
        const t = this;
        getDataLevelUserLogin({
          _mt:  this.$global.mt+"PlatCalendar.getList"
        })
          .then(res => {
            // debugger
            if (isSuccess(res, t)) {
              t.selectYearType = res.data.content[0].value;
            }
          })
          .catch(() => {
            this.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage")
            });
          });
      },
      deletemsg() {
        const t = this;
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t("reminder.remind"),
            content: this.$t("reminder.leastone")
          });
        } else {
          t.$Modal.confirm({
            title: this.$t("reminder.remind"),
            content: this.$t("reminder.confirmdelete"),
            onOk: () => {
              getDataLevelUserLogin({
                _mt:  this.$global.mt+"PaySalplantask.delByIds",
                logType: "删除",
                delIds: t.tableselected
              })
                .then(res => {
                  if (isSuccess(res, t)) {
                    t.getData(true);
                  }
                })
                .catch(() => {
                  t.$Modal.error({
                    title: this.$t("reminder.err"),
                    content: this.$t("reminder.errormessage")
                  });
                });
            },
            onCancel: () => {
            }
          });
        }
      },
      copy() {
        const t = this;
        if (t.tableselected.length === 0) {
          t.$Modal.warning({
            title: this.$t("reminder.remind"),
            content: this.$t("reminder.leastone")
          });
        } else {
          t.$Modal.confirm({
            title: this.$t("reminder.remind"),
            content: this.$t("lang_payroll.paySalplan.iscopay"),
            onOk: () => {
              getDataLevelUserLogin({
                _mt:  this.$global.mt+"PaySalplantask.copyByIds",
                logType: "复制",
                ids: t.tableselected.toString()
              })
                .then(res => {
                  if (isSuccess(res, t)) {
                    t.getData(true);
                  }
                })
                .catch(() => {
                  t.$Modal.error({
                    title: this.$t("reminder.err"),
                    content: this.$t("reminder.errormessage")
                  });
                });
            },
            onCancel: () => {
            }
          });
        }
      },
      open() {
        const t = this;
        t.opendialog = true;
      },
      openUp(id, logType, index) {
        const t = this;
        t.updateId = parseInt(id, 10);
        t.logType = logType;
        t.openUpdate = true;
        t.index = index;
        t.calendar_index = index;
        t.$refs.update.getPlanid(t.planId);
        if (logType === this.$t("button.y.upd")) {
          t.$refs.update.getData(id);
        }
      },
      closeUp() {
        const t = this;
        t.getData(true);
        t.getCaldearData();
        t.openUpdate = false;
      },
      // 工作日历管理 样式转换  start
      TransformationMode(num) {
        const t = this;
        if (num === 1) {
          t.ischecked1 = true;
          t.ischecked2 = false;
          t.calendarModel1 = true;
          t.calendarModel2 = false;
          t.getData(true);
        } else if (num === 2) {
          t.ischecked2 = true;
          t.ischecked1 = false;
          t.calendarModel2 = true;
          t.calendarModel1 = false;
          t.getData(false);
        }
      },
      // 生成日历
      getCaldearData(preNum) {
        const t = this;
        if (preNum !== null && preNum !== undefined && preNum !== "") {
          if (t.month !== "" && t.year !== "") {
            let getNum = preNum;
            let changeMonth = Number(t.month);
            let changeYear = t.year;
            if (getNum === 1) {
              //  上个月
              if (changeMonth <= 1) {
                changeMonth = 12;
                for (let i = 0; i < t.selectYearType.length; i++) {
                  if (changeYear === t.selectYearType[i]) {
                    if (i - 1 >= 0) {
                      changeYear = t.selectYearType[i - 1];
                    } else {
                      changeYear = t.selectYearType[t.selectYearType.length - 1];
                      break;
                    }
                  }
                }
              } else {
                changeMonth--;
              }
            } else if (getNum === 2) {
              //  下个月
              if (changeMonth >= 12) {
                changeMonth = "1";
                for (let i = 0; i < t.selectYearType.length; i++) {
                  if (changeYear === t.selectYearType[i]) {
                    if (i + 1 <= t.selectYearType.length - 1) {
                      changeYear = t.selectYearType[i + 1];
                      break;
                    } else {
                      changeYear = t.selectYearType[0];
                    }
                  }
                }
              } else {
                changeMonth++;
              }
            }
            if (changeMonth < 10) {
              changeMonth = "0" + changeMonth.toString();
            }
            t.month = changeMonth.toString();
            t.year = changeYear;
          } else {
            t.$Modal.warning({
              title: this.$t("reminder.remind"),
              content: this.$t("lang_platform.platCalendar.errReminder")
            });
          }
        }
        t.getdataMethod1();
      },
      getdataMethod1() {
        let t = this
        const data1 = {
//          _mt:  this.$global.mt+"PaySalplantask.getSelectValue",
//          logType: "查询",
//          salpltkPlanid: t.planId,
//          salpltkIskey: "1"
          _mt:  this.$global.mt+'PlatCalendar.getPage',
          rows: '31',
          page: '1',
          sort: 'calendarDate',
          order: 'asc',
          logType: this.$t('button.ser'),
          calendarDate: '2020-04',
        }
        getDataLevelUserLoginNew(data1)
          .then(res => {
            if (isSuccess(res, t)) {
              t.data2 = res.data.content[0].value;
              t.getdataMethod2();
            }
          })
          .catch(() => {
            t.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage")
            });
          });
      },
      getdataMethod2() {
        let t = this
        let newstr = ''
        if(t.sicalcPeriodDis) {
          newstr = t.sicalcPeriodDis.substr(0,4) + '-' + t.sicalcPeriodDis.substr(4)
        }
        const data = {
          _mt:  this.$global.mt+'PlatCalendar.getPage',
          rows: 31,
          page: 1,
          sort: 'calendarDate',
          order: 'asc',
          logType: '查询',
          calendarDate: newstr
        };
        for (const dat in data) {
          if (data[dat] === "") {
            delete data[dat];
          }
        }
        getDataLevelUserLoginNew(data)
          .then(res1 => {
            if (isSuccess(res1, t)) {
              // debugger
              t.calendar_data = res1.data.content[0].rows;
              // console.log(t.calendar_data)
              let firstWeek = t.calendar_data[0].calendarWeek; //  得到第一天是星期几
              // t.calendar_data.calendarDate = newDayNum           //  处理后的日期
              // 删掉数组中的空值
              for (let dat in t.calendar_data) {
                if (data[dat] === "") {
                  delete data[dat];
                }
              }
              // 向前边追加空值
              for (let i = firstWeek; i > 1; i--) {
                t.calendar_data.unshift("");
              }
              // 向后边追加空值，显示整个日历
              let leng = Math.ceil(t.calendar_data.length / 7) * 7;
              for (let j = t.calendar_data.length; j < leng; j++) {
                t.calendar_data.push("");
              }
              // 工作日和节假日添加不同的颜色
              for (let k = 0; k < t.calendar_data.length; k++) {
                if (t.calendar_data[k] !== "") {
                  t.getBlur1 = false;
                  if (
                    t.calendar_data[k].calendarDate ===
                    t.year + "-" + t.month + "-" + t.day
                  ) {
                    t.calendar_data[k]["isKey"] = "1";
                  }
                  if (t.data2) {
                    let j = 0
                    for (let l = 0; l < t.data2.length; l++) {
                      if (
                        t.calendar_data[k].calendarDate ===
                        t.data2[l].salpltkDate
                      ) {
                        if (t.calendar_data[k]["taskName"] && j < 2) {
                          t.calendar_data[k]["taskName"] +=
                            "● " + t.data2[l].salpltkTaskshort + "<br />";
                          j++
                        } else if (j < 2) {
                          t.calendar_data[k]["taskName"] =
                            "● " + t.data2[l].salpltkTaskshort + "<br />";
                          j++
                        }
                        if (t.data2[l].salpltkIskey === "1") {
                          t.calendar_data[k]["isKey"] = "2";
                        }
                      }
                    }
                  }
                }
              }
              t.toNum();
              t.loading = false;
            }
          })
          .catch(() => {
            t.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage")
            });
          });
      },
      // 生成日历-----------------------------------------------------------
      //  循环修改日期
      toNum() {
        const t = this;
        t.calendar_data.forEach((item, index) => {
          if (item.calendarDate && item.calendarDate.length === 10) {
            let dayNum = item.calendarDate;
            if (dayNum) {
              dayNum = dayNum.slice(8);
              let newDayNum = parseInt(dayNum, 10);
              item["calendarDate1"] = newDayNum;
            }
          }
        });
      },
      // 工作日历管理 样式转换  end-----------------------------------------
      handleReset() {
        this.$emit("closeUp");
        // this.$refs.formValidate.resetFields()
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd";
  /*******/
  .table-form {
    margin: 10px 0;
    /*overflow-y: scroll;*/
  }

  /deep/ .ivu-table-body{
    height: 280px !important;
  }
  .margin-right-10 {
    margin-right: 10px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .table_header_box,
  .table_body_box {
    width: 100%;
  }

  .table_header,
  .table_body {
    width: 14.28%;
  }

  .area {
    padding: 5px;
    font-size: 12px;
  }

  .table_header_box {
    margin-top: 10px;
    border-radius: 5px 5px 0 0;
  }

  .table_header {
    background-color: #2d8cf0;
    color: #ffffff;
    line-height: 30px;
    text-align: center;
    border-right: 1px solid #dddddd;
  }

  .cover .box {
    width: 1130px;
    padding: 50px 20px 2px 20px;
  }

  .ivu-table-tip table {
    height: 296px !important;
    /*text-align: center;*/
  }

  .ivu-table-tip table td {
    height: 296px !important;
  }

  .ivu-table:before {
    display: none !important;
  }

  .ivu-table-small td {
    text-align: center;
  }

  .ivu-table-wrapper {
    height: 330px !important;
  }

  .table_body_box {
    border-left: 1px solid #dddddd;
  }

  .table_body {
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    background-color: #f2f2f2;
  }

  .table_body p {
    text-align: center;
    line-height: 25px;
    margin-bottom: 5px;
  }

  .conbox {
    position: relative;
    height: 71px;
    padding-top: 2px;
    padding-left: 20px;
  }

  .edit {
    position: absolute;
    right: 6px;
    bottom: 0px;
    color: #2d8cf0;
    cursor: pointer;
  }

  .bgWhite {
    background-color: #ffffff;
  }

  .bgFeedd3 {
    background-color: #feedd3;
  }

  .lbtn1 {
    margin-left: 20px;
    float: right;
  }

  .lbtn {
    margin-left: 20px;
    background-color: #2d8cf0;
    color: #fff;
    border: none;
    float: right;
  }

  .lbtn:hover {
    border: none !important;
  }

  .lbtn i {
    font-size: 14px;
    margin-right: 5px;
  }

  .checked {
    background-color: #18be6a;
  }

  .Legalholiday,
  .Legalrest,
  .comholiday,
  .comrest {
    color: #fff;
    border-radius: 4px;
  }

  .Legalholiday {
    background-color: #70ad46;
  }

  .day {
    position: absolute;
    left: 2px;
    top: 22px;
    padding-right: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  .tableNote {
    width: 100px;
    padding-top: 5px;
    margin-left: 20px;
  }

  .noteTitle {
    margin: 5px 0;
  }

  .noteTitle col {
    font-weight: bold;
  }

  .lawicon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 10px;
    vertical-align: middle;
    margin-top: -5px;
  }

  .colorOne,
  .colorTwo,
  .colorThree,
  .colorFour {
    width: 100px;
    margin: 10px 0;
  }

  .colorOnel,
  .colorTwol,
  .colorThreel,
  .colorFourl {
    background-color: rgb(255, 226, 226);
    width: 15px;
    height: 15px;
  }

  .colorOner,
  .colorTwor,
  .colorThreer,
  .colorFourr {
    width: 73px;
    text-align: left;
    padding-left: 12px;
    line-height: 15px;
    color: rgb(214, 188, 188);
  }

  .colorTwol,
  .comrest {
    background-color: rgba(151, 255, 152, 0.46);
  }

  .colorThreel,
  .comholiday {
    background-color: rgba(36, 187, 239, 0.35);
  }

  .colorFourl,
  .Legalrest {
    background-color: rgba(151, 255, 152, 0.46);
  }

  .colorTwor {
    color: rgba(151, 255, 152, 0.46);
  }

  .colorThreer {
    color: rgba(34, 183, 230, 0.64);
  }

  .colorFourr {
    color: rgb(133, 212, 133);
  }

  .LegalDay {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
  }

  @media screen and (max-width: 2000px) {
    .table_body div {
      height: 75px;
    }
    .conbox {
      padding-top: 2px;
    }
    .table_body p {
      line-height: 20px;
      margin-bottom: 2px;
    }
    .day {
      font-size: 14px;
    }
    .edit {
      bottom: -1px;
    }
  }
  .ivu-page.mini .ivu-page-options {
    margin-left: 8px;
    margin-top: 4px;
  }
  .btn-save{
    text-align: right;
    margin-top: 10px;
  }


</style>
