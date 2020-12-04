
export default [
  {
    path: 'empBreakfaith_Atgv',
    name: 'empBreakfaith_Atgv',
    component:resolve => require(['@/pages/empManage/empBreakfaith-manage/empBreakfaithList'], resolve)
  },
  {
    path: 'empBonuspenalty_Atgv',
    name: 'empBonuspenalty_Atgv',
    component:resolve => require(['@/pages/empManage/empBonuspenalty-manage/empBonuspenaltyList'], resolve)
  },
  {
    path: 'empMaster',
    name: 'empMaster',
    component:resolve => require(['@/pages/empManage/empmaster-manage/empMasterManage'], resolve)
  },
  {
    path: 'empMasterSse',
    name: 'empMasterSse',
    component:resolve => require(['@/pages/empManage/empmasterSse-manage/empMasterManage'], resolve)
  },
  {
    path: 'empContractList',
    name: 'empContractList',
    component:resolve => require(['@/pages/empManage/empcontract-manage/empContractList'], resolve)
  },
  {
    path: 'empmasterAdjusment',
    name: 'empmasterAdjusment',
    component:resolve => require(['@/pages/empManage/empmaster-adjusment/empmasterAdjusment'], resolve)
  },
  {
    path: 'empNewhireEducation',
    name: 'empNewhireEducation',
    component:resolve => require(['@/pages/empManage/empNewhireEducation/empNewhireEducation'], resolve)
  },
]
