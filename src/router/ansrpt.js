
export default [
  {
    path: 'ansrptSysFunctions',
    name: 'ansrptSysFunctions',
    component:resolve => require(['@/pages/ansrptManage/ansrptSysFunctions/ansrptSysFunctions'], resolve)
  },
  {
    path: 'ansrptToDoList',
    name: 'ansrptToDoList',
    component:resolve => require(['@/pages/ansrptManage/toDoListManage/ansrptToDoList'], resolve)
  },
  {
  	path: 'functionStatistic',
    name: 'functionStatistic',
    component:resolve => require(['@/pages/ansrptManage/functionStatistic/functionStatistic'], resolve)
  },
]
