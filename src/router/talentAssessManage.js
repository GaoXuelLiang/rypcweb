
export default[{
		path: 'assessNomalManage',
	    name: 'assessNomalManage',
      component:resolve => require(['@/pages/talentAssessManage/assessNomalManage/assessNomalManage'], resolve),
	},{
		path: 'assessPlanManage',
	    name: 'assessPlanManage',
      component:resolve => require(['@/pages/talentAssessManage/assessPlanManage/assessPlanManage'], resolve),
	},{
		path: 'assessResultManage',
	    name: 'assessResultManage',
      component:resolve => require(['@/pages/talentAssessManage/assessResultManage/assessResultManage'], resolve),
	},{
		path: 'assessAnalysisReport',
	    name: 'assessAnalysisReport',
      component:resolve => require(['@/pages/talentAssessManage/assessAnalysisReport/assessAnalysisReport'], resolve),
	},
  {
		path: 'headhuntingSupplier',
	    name: 'headhuntingSupplier',
      component:resolve => require(['@/pages/talentRecruitment/headhuntingSupplierManage/headhuntingSupplier'], resolve),
	}
	]
