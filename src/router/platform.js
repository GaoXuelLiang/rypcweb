
export default [{
		path: 'platSelectDefine',
		name: 'platSelectDefine',
  component:resolve => require(['@/pages/platformmanager/platSelectDefine/platSelectDefine'], resolve),
	},
	{
		path: 'platFormVar', //浏览器访问路劲中会加上这一名称
		name: 'platFormVar', //可加可不加
    component:resolve => require(['@/pages/platformmanager/platFormVar/platFormVar'], resolve),
	},
	{
		path: 'systemForm',
		name: 'systemForm',
    component:resolve => require(['@/pages/platformmanager/systemForm/systemForm'], resolve),
	},
	{
		path: 'platFlowList',
		name: 'platFlowList',
    component:resolve => require(['@/pages/platformmanager/platFlow/platFlowList'], resolve),
	},
  {
    path:'platFlowListNew',
    name:'platFlowListNew',
    component:resolve => require(['@/pages/platformmanager/platFlowNew/platFlowList'], resolve),
  },
	{
		path: 'platRolecontact',
		name: 'platRolecontact',
    component:resolve => require(['@/pages/platformmanager/platRolecontact/platRolecontact'], resolve),
	},
	{
		path: 'platEmpno',
		name: 'platEmpno',
    component:resolve => require(['@/pages/PlatFormManager/platEmpno-manage/platEmpnoManage'], resolve),
	},
	{
		path: 'platPostno',
		name: 'platPostno',
    component:resolve => require(['@/pages/PlatFormManager/platPostno-manage/platPostnoManage'], resolve),
	},
	{
		path: 'platGetValDefineList',
		name: 'platGetValDefineList',
    component:resolve => require(['@/pages/PlatFormManager/platGetValDefine/platGetValDefineList'], resolve),
	},
	{
		path: 'platFiscalyear',
		name: 'platFiscalyear',
    component:resolve => require(['@/pages/PlatFormManager/platFiscalyear-manage/platFiscalyearManage'], resolve),
	},
	{
		path: 'platCalendar',
		name: 'platCalendar',
    component:resolve => require(['@/pages/PlatFormManager/platCalendar-manage/platCalendarManage'], resolve),
  },
  {
		path: 'platZnCalendar',
		name: 'platZnCalendar',
    component:resolve => require(['@/pages/PlatFormManager/platCalendar-manage-zn/platCalendarManage'], resolve),
  },
	{
		path: 'platFlowcontacts',
		name: 'platFlowcontacts',
    component:resolve => require(['@/pages/PlatFormManager/platFlowcontacts-manage/platFlowcontactsManage'], resolve),
	},
	{
		path: 'platFlowVar',
		name: 'platFlowVar',
    component:resolve => require(['@/pages/PlatFormManager/platFlowVar-manage/platFlowVarManage'], resolve),
	},
	{
		path: 'platFileexcel',
		name: 'platFileexcel',
    component:resolve => require(['@/pages/PlatFormManager/platFileexcel/platFileexcel'], resolve),
	},
	{
		path: 'autoTask',
		name: 'autoTask',
    component:resolve => require(['@/pages/PlatFormManager/autoTask/autoTaskManage'], resolve),
	},
	{
    path: 'platSysMail',
    name: 'platSysMail',
    component:resolve => require(['@/pages/PlatFormManager/platSysmail/platsysMail'], resolve),
  },
  {
    path: 'autoTasklog',
    name: 'autoTasklog',
    component:resolve => require(['@/pages/PlatFormManager/platAutotasklog-manage/platAutotasklogManage'], resolve),
  },
  {
    path: 'platSyssms',
    name: 'platSyssms',
    component:resolve => require(['@/pages/PlatFormManager/platSyssms/platSyssms'], resolve),
  },
  {
    path: 'platSyswx',
    name: 'platSyswx',
    component:resolve => require(['@/pages/PlatFormManager/platSyswx/platSyswx'], resolve),
  },
  {
    path: 'platDocTemplate',
    name: 'platDocTemplate',
    component:resolve => require(['@/pages/PlatFormManager/platDocTemplate/platDocTemplate'], resolve),
  },
  {
    path: 'platKnowledgeList',
    name: 'platKnowledgeList',
    component:resolve => require(['@/pages/PlatFormManager/platKnowledge/platKnowledgeList'], resolve),
  },
  {
    path: 'platKnowledgeType',
    name: 'platKnowledgeType',
    component:resolve => require(['@/pages/PlatFormManager/platKnowledgeType/platKnowledgeType'], resolve),
  },
  {
    path: 'platBusirelManage',
    name: 'platBusirelManage',
    component:resolve => require(['@/pages/PlatFormManager/platBusirel/platBusirelManage'], resolve),
  },
  {
  	path: 'openBusiCon',
  	name: 'openBusiCon',
    component:resolve => require(['@/pages/PlatFormManager/platBusirel/homePage/openBusiCon'], resolve),
  },
  {
  	path: 'platApprovalList',
  	name: 'platApprovalList',
    component:resolve => require(['@/pages/PlatFormManager/platApproval/platApprovalList'], resolve),
  },
  {
    path: 'platApprovalListNew',
    name: 'platApprovalListNew',
    component:resolve => require(['@/pages/PlatFormManager/approvalflow/platApprovalListNew'], resolve),
  },
  {
  	path: 'platAprvbill',
  	name: 'platAprvbill',
    component:resolve => require(['@/pages/PlatFormManager/platAprvbill/platAprvbill'], resolve),
  },
]
