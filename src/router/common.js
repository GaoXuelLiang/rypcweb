/*
 * @Author: guwenjiang
 * @Date: 2020-09-10 17:33:28
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-20 15:36:33
 */

export default [
  {
    path: 'commonFlowList',
    name: 'commonFlowList',
    component:resolve => require(['@/pages/common/commonFlowList/commonFlowList'], resolve)
  },
  {
    path: 'commonList',
    name: 'commonList',
    component:resolve => require(['@/pages/common/commonList/commonSinglePageList'], resolve)
  },
  {
    path: 'entryFlow',
    name: 'entryFlow',
    component:resolve => require(['@/pages/common/entryFlow/entryFlow'], resolve)
  },
  {
    path: 'interFlow',
    name: 'interFlow',
    component:resolve => require(['@/pages/common/interFlow/interFlow'], resolve)
  },
  {
    path: 'dimFlow',
    name: 'dimFlow',
    component:resolve => require(['@/pages/common/dimFlow/dimFlow'], resolve)
  },
  {
    path: 'proFlow',
    name: 'proFlow',
    component:resolve => require(['@/pages/common/proFlow/proFlow'], resolve)
  },
  {
    path: 'conextFlow',
    name: 'conextFlow',
    component:resolve => require(['@/pages/common/conextFlow/conextFlow'], resolve)
  },
  // 休假申请
  {
    path: 'applyLeaveorder',
    name: 'applyLeaveorder',
    component:resolve => require(['@/pages/common/applyLeaveorder/commonFlowList'], resolve)
  },
  // 员工加班
  {
    path: 'workOTimeFlow',
    name: 'workOTimeFlow',
    component:resolve => require(['@/pages/common/workOTime/commonFlowList'], resolve)
  },
  // 出差申请
  {
    path: 'applyTravelFlow',
    name: 'applyTravelFlow',
    component:resolve => require(['@/pages/common/applyTravel/commonFlowList'], resolve)
  },
  // 员工外出
  {
    path: 'goOutFlow',
    name: 'goOutFlow',
    component:resolve => require(['@/pages/common/goOutOrder/commonFlowList'], resolve)
  },
  // 出差申请
  {
    path: 'flowApplyTravel',
    name: 'flowApplyTravel',
    component:resolve => require(['@/pages/common/flowApplyTravel/commonFlowList'], resolve)
  },
]
