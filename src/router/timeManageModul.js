/*
*  时间管理模块
* */

//  班次时间管理
const attendanceSet = resolve => require(['@/pages/timeManageModul/attendanceSet/attendanceSet.vue'], resolve)
// 员工排版查询
const attendanceStasffss = resolve => require(['@/pages/timeManageModul/home/attendanceSet.vue'], resolve)
// 排班轮次管理
const attendanceRota = resolve => require(['@/pages/timeManageModul/attendanceRota/attendanceRota.vue'], resolve)
// 班组信息管理
const teamMessage = resolve => require(['@/pages/timeManageModul/teamMessage/teamMessage.vue'], resolve)
// 非标排版管理
const nonStandardShift = resolve => require(['@/pages/timeManageModul/nonStandardShift/nonStandardShift.vue'],resolve)
// 员工排班管理
const attendanceStasff = resolve => require(['@/pages/timeManageModul/attendanceStasff/attendanceStasff.vue'], resolve)

// 考勤基础项目
const basicAttItems = resolve => require(['@/pages/timeManageModul/basicAttItems/basicAttItems.vue'], resolve)
// 原始记录维护
const attendanceRecord = resolve => require(['@/pages/timeManageModul/attendanceRecord/attendanceRecord.vue'], resolve)
// 单日考勤记录
const attendanceSingleRecord = resolve => require(['@/pages/timeManageModul/attendanceSingleRecord/attendanceSingleRecord.vue'], resolve)
// 单日数据修改
const attendanceSingleEdit = resolve => require(['@/pages/timeManageModul/attendanceSingleEdit/attendanceSingleEdit.vue'], resolve)
// 期间考勤记录
const attendancePeriodRecord = resolve => require(['@/pages/timeManageModul/attendancePeriodRecord/attendancePeriodRecord.vue'], resolve)
// 期间数据修改
const attendancePeriodEdit = resolve => require(['@/pages/timeManageModul/attendancePeriodEdit/attendancePeriodEdit.vue'], resolve)
// 考勤异常管理
const attendanceError = resolve => require(['@/pages/timeManageModul/attendanceError/attendanceError.vue'], resolve)
// 月度考勤汇总
const attendanceMonth = resolve => require(['@/pages/timeManageModul/attendanceMonth/attendanceMonth.vue'], resolve)

// 加班记录
const overtimeRecord = resolve => require(['@/pages/timeManageModul/overtimeRecord/overtimeRecord.vue'], resolve)
// 出差记录
const travelRecord = resolve => require(['@/pages/timeManageModul/travelRecord/travelRecord.vue'], resolve)
// 请假记录
const leaveRecord = resolve => require(['@/pages/timeManageModul/leaveRecord/leaveRecord.vue'], resolve)
// 外出记录
const goOutRecord = resolve => require(['@/pages/timeManageModul/goOutRecord/goOutRecord.vue'], resolve)

// 日报月报项目
const dayAndMonReport = resolve => require(['@/pages/timeManageModul/vacationRule/vacationRule.vue'], resolve)

// 年度调休管理
const annualRule = resolve => require(['@/pages/timeManageModul/annualRule/annualRule.vue'], resolve)
// 结余失效管理
const balanceFailure = resolve => require(['@/pages/timeManageModul/balanceFailure/balanceFailure.vue'], resolve)

// 非年假信息管理
const apply_otherleveal = resolve => require(['@/pages/timeManageModul/apply_otherleveal/apply_otherleveal.vue'], resolve)
// 考勤打卡记录（员工自主端）
const stafAttendanceRecord = resolve => require(['@/pages/timeManageModul/stafAttendanceRecord/stafAttendanceRecord'], resolve)
// TMC城市信息
const baseTmccity = resolve => require(['@/pages/timeManageModul/baseTmccity/platEmpnoManage'], resolve)
// 考勤基础配置
const attendBasCfg = resolve => require(['@/pages/timeManageModul/attendBasCfg/attendBasCfg'], resolve)


export default [
  {
    path: 'attendanceSet',
    name: 'attendanceSet',
    component: attendanceSet
  },
  {
    path: 'attendanceStasffss',
    name: 'attendanceStasffss',
    component: attendanceStasffss
  },
  {
    path: 'attendanceRota',
    name: 'attendanceRota',
    component: attendanceRota
  },
  {
    path: 'teamMessage',
    name: 'teamMessage',
    component: teamMessage
  },
  {
    path:'nonStandardShift',
    name:'nonStandardShift',
    component:nonStandardShift
  },
  {
    path: 'attendanceStasff',
    name: 'attendanceStasff',
    component: attendanceStasff
  },
  {
    path: 'basicAttItems',
    name: 'basicAttItems',
    component: basicAttItems
  },
  {
    path: 'attendanceRecord',
    name: 'attendanceRecord',
    component: attendanceRecord
  },
  {
    path: 'attendanceSingleRecord',
    name: 'attendanceSingleRecord',
    component: attendanceSingleRecord
  },
  {
    path: 'attendanceSingleEdit',
    name: 'attendanceSingleEdit',
    component: attendanceSingleEdit
  },
  {
    path: 'attendancePeriodRecord',
    name: 'attendancePeriodRecord',
    component: attendancePeriodRecord
  },
  {
    path: 'attendanceError',
    name: 'attendanceError',
    component: attendanceError
  },
  {
    path: 'attendancePeriodEdit',
    name: 'attendancePeriodEdit',
    component: attendancePeriodEdit
  },
  {
    path: 'attendanceMonth',
    name: 'attendanceMonth',
    component: attendanceMonth
  },
  {
    path: 'overtimeRecord',
    name: 'overtimeRecord',
    component: overtimeRecord
  },
  {
    path: 'travelRecord',
    name: 'travelRecord',
    component: travelRecord
  },
  {
    path: 'leaveRecord',
    name: 'leaveRecord',
    component: leaveRecord
  },
  {
    path: 'goOutRecord',
    name: 'goOutRecord',
    component: goOutRecord
  },
  {
    path: 'dayAndMonReport',
    name: 'dayAndMonReport',
    component: dayAndMonReport
  },
  {
    path: 'annualRule',
    name: 'annualRule',
    component: annualRule
  },
  {
    path: 'balanceFailure',
    name: 'balanceFailure',
    component: balanceFailure
  },
  {
    path: 'apply_otherleveal',
    name: 'apply_otherleveal',
    component: apply_otherleveal
  },
  {
    path: 'stafAttendanceRecord',
    name: 'stafAttendanceRecord',
    component: stafAttendanceRecord
  },
  {
    path: 'baseTmccity',
    name: 'baseTmccity',
    component: baseTmccity
  },
  {
    path: 'attendBasCfg',
    name: 'attendBasCfg',
    component: attendBasCfg
  },
]

