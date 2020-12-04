
export default [
    {
        path: 'manageInform',
        name: 'manageInform',
      component:resolve => require(['@/pages/manageInform/manageIndex'], resolve),
    },
    {
    	path: '/messageNoticeManage',
    	name: 'messageNoticeManage',
      component:resolve => require(['@/pages/manageInform/message/messageNoticeManage'], resolve),
    },
]
