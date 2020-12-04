
export default [
  {
    path: 'EmpRoster',
    name: 'EmpRoster',
    component:resolve => require(['@/pages/reportManagement/employeeReport/roster'], resolve),
  },
  {
    path: 'NewhireRpt',
    name: 'NewhireRpt',
    component:resolve => require(['@/pages/reportManagement/employeeReport/NewhireRpt'], resolve),
  },
  {
    path: 'ProbationRpt',
    name: 'ProbationRpt',
    component:resolve => require(['@/pages/reportManagement/employeeReport/ProbationRpt'], resolve),
  },
  {
    path: 'ContractRpt',
    name: 'ContractRpt',
    component:resolve => require(['@/pages/reportManagement/employeeReport/ContractRpt'], resolve),
  },
  {
    path: 'ExtensionRpt',
    name: 'ExtensionRpt',
    component:resolve => require(['@/pages/reportManagement/employeeReport/ExtensionRpt'], resolve),
  },
  {
    path: 'TransferRpt',
    name: 'TransferRpt',
    component:resolve => require(['@/pages/reportManagement/employeeReport/TransferRpt'], resolve),
  },
  {
    path: 'SeprationRpt',
    name: 'SeprationRpt',
    component:resolve => require(['@/pages/reportManagement/employeeReport/SeprationRpt'], resolve),
  },
  {
    path: 'TransactionDetail',
    name: 'TransactionDetail',
    component:resolve => require(['@/pages/reportManagement/employeeReport/TransactionDetail'], resolve),
  },
  {
    path: 'TransactionStatistics',
    name: 'TransactionStatistics',
    component:resolve => require(['@/pages/reportManagement/employeeReport/TransactionStatistics'], resolve),
  },
  {
    path: 'empSexAnal',
    name: 'empSexAnal',
    component:resolve => require(['@/pages/reportManagement/employeeReport/empSexAnal'], resolve),
  },
  {
    path: 'staffTypeAnal',
    name: 'staffTypeAnal',
    component:resolve => require(['@/pages/reportManagement/employeeReport/staffTypeAnal'], resolve),
  },
  {
    path:'empSeniorAnaly',
    name:'empSeniorAnaly',
    component:resolve => require(['@/pages/reportManagement/employeeReport/empSeniorAnaly'],resolve),
  },
  {
    path:'empEducaAnaly',
    name:'empEducaAnaly',
    component:resolve => require(['@/pages/reportManagement/employeeReport/empEducaAnaly'],resolve),
  }
]
