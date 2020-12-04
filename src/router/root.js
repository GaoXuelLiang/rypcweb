
export default [
  {
    path: 'orgUnitsList',
    name: 'orgUnitsList',
    component:resolve => require(['@/pages/rootManage/orgunits/orgUnitsList'], resolve),
  },
  {
    path: 'baseLangTypeList',
    name: 'baseLangTypeList',
    component:resolve => require(['@/pages/rootManage/baselangtype/baseLangTypeList'], resolve),
  },
  {
    path: 'orgFrameList',
    name: 'orgFrameList',
    component:resolve => require(['@/pages/rootManage/orgframe-manage/orgframeManage'], resolve),
  },
  {
    path: 'orgPostList',
    name: 'orgPostList',
    component:resolve => require(['@/pages/rootManage/orgpost-manage/orgpostManage'], resolve),
  },
  {
    path: 'jobinformation',
    name: 'jobinformation',
    component:resolve => require(['@/pages/rootManage/orgduty/jobinformation'], resolve),
  },
  {
    path: 'orgPostseqList',
    name: 'orgPostseqList',
    component:resolve => require(['@/pages/rootManage/orgsequence/orgPostseqList'], resolve),
  },
  {
    path: 'baseLangList',
    name: 'baseLangList',
    component:resolve => require(['@/pages/rootManage/baselang/baseLangList'], resolve),
  },
  {
    path: 'contractCompany',
    name: 'contractCompany',
    component:resolve => require(['@/pages/rootManage/contractCompany/contractCompany'], resolve),
  },
  {
    path: 'orgCtrPostList',
    name: 'orgCtrPostList',
    component:resolve => require(['@/pages/rootManage/orgCtrPostList/orgCtrPostList'], resolve),
  },
]
