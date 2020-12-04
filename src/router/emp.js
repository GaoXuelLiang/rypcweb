
export default [
  {
    path: '/employeeHome',
    name: 'employeeHome',
    component:resolve => require(['@/pages/employeePage/employeeHome/employeeHome'], resolve)
  },
  {
    path: '/employeeHomeNew',
    name: 'employeeHomeNew',
    component:resolve => require(['@/pages/employeePage/employeeHome/employeeHomeNew'], resolve)
  },
  {
    path: '/main',
    name: 'empMain',
    component:resolve => require(['@/pages/employeePage/main/main'], resolve),
    children: [
      {
        path: 'essAdminInfo',
        name: 'essAdminInfo',
        component:resolve => require(['@/pages/employeePage/essAdminInfo/essAdminInfo'], resolve)
      },
      {
        path: 'subordinatesManage',
        name: 'subordinatesManage',
        component:resolve => require(['@/pages/employeePage/subordinatesPage/subordinatesManage'], resolve)
      },
      {
        path: 'remindCalendar',
        name: 'remindCalendar',
        component:resolve => require(['@/pages/employeePage/remind/remindCalendar'], resolve)
      },
      {
      	path: 'mySchedule',
      	name: 'mySchedule',
        component:resolve => require(['@/pages/employeePage/toDoSchedule/mySchedule'], resolve)
      },
      {
      	path: 'ruleSearch',
      	name: 'ruleSearch',
        component:resolve => require(['@/pages/employeePage/ruleInstitution/ruleSearch'], resolve)
      },
      {
      	path: 'commonFlowUpdate',
      	name: 'commonFlowUpdate',
        component:resolve => require(['@/pages/employeePage/toDoSchedule/commonFlowUpdate'], resolve)
      },
    ],
  },
]
