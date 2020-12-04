<template>
  <div class="cover">
    <div class="box">
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
        <p style='text-align: center;font-size: 14px;color: #495060;'>{{resData.attTmmemEmpno + '---' +resData.attTmmemEmpidDis + '---' + (resData.attRddlPeriod || '') + '---' + (resData.attTeamName || '')}}</p>

        <div v-show="calendarModel2" class="calendar_table">
          <Row style="min-width: 1200px;">
            <i-col span="22">
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
                    <div class="right">
                      <p class="p_top1" v-show="days.attShifName==='休息班'">{{days.attShifName}}</p>
                      <p class="p_top2" v-show="days.attShifName!=='休息班'">{{days.attShifName}}</p>
                      <p class="p_bottom">{{days.attRddlDatetypeDis}}</p>
                    </div>
                  </div>
                  <div v-else-if="days.isKey === '1'" class="conbox area bgWhite">
                    <div class="day">{{days.calendarDate1}}</div>
                    <div class="right">
                      <p class="p_top1" v-show="days.attShifName==='休息班'">{{days.attShifName}}</p>
                      <p class="p_top2" v-show="days.attShifName!=='休息班'">{{days.attShifName}}</p>
                      <p class="p_bottom">{{days.attRddlDatetypeDis}}</p>
                    </div>
                  </div>
                  <div v-else-if="days.calendarComptype === '01workday' || days.calendarLegaltype === '01workday'"
                       class="conbox area bgWhite">
                    <div class="day">{{days.calendarDate1}}</div>
                    <div class="right">
                      <p class="p_top1" v-show="days.attShifName==='休息班'">{{days.attShifName}}</p>
                      <p class="p_top2" v-show="days.attShifName!=='休息班'">{{days.attShifName}}</p>
                      <p class="p_bottom">{{days.attRddlDatetypeDis}}</p>
                    </div>
                  </div>
                  <!-- 休息日、节假日样式 -->
                  <div v-else-if="days.calendarComptype === '02weekend'
                                 || days.calendarComptype === '03holiday'
                                 || days.calendarLegaltype === '02weekend'
                                 || days.calendarLegaltype === '03holiday'"
                       class="conbox area" style="background-color: rgba(151,255,152,0.34)">
                    <div class="day">{{days.calendarDate1}}</div>
                    <div class="right">
                      <p class="p_top1" v-show="days.attShifName==='休息班'">{{days.attShifName}}</p>
                      <p class="p_top2" v-show="days.attShifName!=='休息班'">{{days.attShifName}}</p>
                      <p class="p_bottom">{{days.attRddlDatetypeDis}}</p>
                    </div>
                  </div>
                  <!-- 没有日期的样式 -->
                  <div v-else="days.calendarComptypeName" class="conbox area"></div>
                </i-col>
              </Row>
            </i-col>
          </Row>
        </div>
      </i-col>

    </div>
   
  </div>
</template>
<script>
  import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
  } from "../../../axios/axios";
  import {isSuccess, deepCopy} from "../../../lib/util";
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
        attTmmemEmpid: '', // 员工id
        resData: {},  // 获取详情数据
        listdetail: [],  // 获取详情数组
      };
    },
    computed: {},
    components: {
    },
    mounted() {
      // Bus.$on('onChange', (id) => {
      //   this.planId = id
      //   this.getCaldearData()
      // })
    },
    methods: {
      // 获取当前时间
      getTime(planId, sicalcPeriodDis, attTmmemEmpid) {
        const t = this;
        t.isSpin = true
        if (t.planId === "") {
          t.planId = planId;
        }
        t.sicalcPeriodDis = sicalcPeriodDis;
        t.attTmmemEmpid = attTmmemEmpid;
        let date = new Date();
        t.year = date.format("yyyy");
        t.month = date.format("MM");
        t.day = date.format("dd");
        t.getSelect()
      },
      getSelect() {
        const t = this;
        getDataLevelUserLogin({
          _mt:  this.$global.mt+"PlatCalendar.getList"
        })
          .then(res => {
            if (isSuccess(res, t)) {
              t.selectYearType = res.data.content[0].value;
              t.getCaldearData()
            }
          })
          .catch(() => {
            this.$Modal.error({
              title: this.$t("reminder.err"),
              content: this.$t("reminder.errormessage")
            });
          });
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
              t.calendar_data = res1.data.content[0].rows;
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
        t.getDetail(t.attTmmemEmpid, t.sicalcPeriodDis) // 获取详情
      },
      getDetail(attTmmemEmpid, attRddlPeriod) {
        const t = this
        if (attTmmemEmpid) {
          getDataLevelUserLogin({
            // _mt:  this.$global.mt+'AttendEmpshift.getById',
            _mt:  this.$global.mt+'ViewEmpshifts.getEmpShiftByPeriod',
            logType: '排班详情',
            // id: id,
            empId: attTmmemEmpid,
            Period: attRddlPeriod,
          }).then((res) => {
            t.isSpin = false
            if (isSuccess(res, t)) {
              t.listdetail = [...res.data.content[0].value] // attRddlDate
              // 临时加的处理排班不是从1号开始，例如从8号开始，1-8号为空
              if (res.data.content[0].value.length) {
                t.resData = res.data.content[0].value[0];
                let tenDate = res.data.content[0].value[0].attRddlDate
                let num = tenDate.substr(tenDate.length - 2) - 0
                for (let i = 1; i < num; i++) {
                  t.listdetail.unshift({})
                }
              }
              let temArr = []  // 临时数组
              let indexArr = []  // 索引
              t.calendar_data.forEach((item, index) => {
                if(item.id) {
                  indexArr.push(index)
                }
              })
              t.calendar_data.forEach((item, index) => {
                if(indexArr.length) temArr.push(Object.assign(item,t.listdetail[index - indexArr[0]]))
              })
              temArr.forEach((item, index) => {
                if(item.attEmpsfdlRoundid) item.roundid = item.attEmpsfdlRoundid
                if(item.attEmpsfdlDatetype) item.datetype = item.attEmpsfdlDatetype
                if(item.attEmpsfdlMonthdate) item.date = item.attEmpsfdlMonthdate
              })
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
    padding: 50px 20px 20px 20px;
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
    // margin-bottom: 5px;
  }

  .conbox {
    position: relative;
    height: 71px;
    padding-top: 2px;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
      .day {
        font-size: 14px;
        flex: 1;
      }
      .right{
        flex: 2;
        .p_top1{
          color: red;
        }
        .p_top2{
          color: green;
        }
      }
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
    // .table_body div {
    //   height: 75px;
    // }
    .conbox {
      padding-top: 2px;
      .day {
        font-size: 14px;
        flex: 1;
      }
      .right{
        flex: 2;
        .p_top1{
          color: red;
        }
        .p_top2{
          color: green;
        }
      }
    }
    // .table_body p {
    //   line-height: 20px;
    //   margin-bottom: 2px;
    // }
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
