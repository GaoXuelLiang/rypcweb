
export default [
  {
    path: 'empBreakfaith_Atgv_Edit',
    name: 'empBreakfaith_Atgv_Edit',
    component:resolve => require(['@/pages/empManage/empBreakfaith-manage/empBreakfaithEdit'], resolve)
  },
  {
    path: 'empBonuspenalty_Atgv_Edit',
    name: 'empBonuspenalty_Atgv_Edit',
    component:resolve => require(['@/pages/empManage/empBonuspenalty-manage/empBonuspenaltyEdit'], resolve)
  },
  {
    path: 'entryFlow_Edit',
    name: 'entryFlow_Edit',
    component:resolve => require(['@/pages/common/entryFlow/commonFlowUpdate'], resolve)
  },

]
