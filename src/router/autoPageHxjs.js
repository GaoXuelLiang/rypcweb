export default [
    {
        path: "autoCommonPage",
        name: "autoCommonPage",
        component: resolve =>
            require(["@/components/autoCommonPage/autoMainTable"], resolve)
    },
    {
        path: "autoCommonPage",
        name: "autoCommonPage",
        component: resolve =>
            require(["@/components/autoCommonPage/autoMainTable"], resolve)
    },
    {
        path: "autoGenConfiguration",
        name: "autoGenConfiguration",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoGenConfiguration/autoGenConfiguration"], resolve)
    },
    {
        path: "autoMainTable",
        name: "autoMainTable",
        component: resolve =>
            require([
                "@/components/autoCommonPage/autoMainTable"
            ], resolve)
    },
    {
        path: "autoPlatSysform",
        name: "autoPlatSysform",
        component: resolve =>
            // require(["@/components/autoCommonPage/autoMainTable"], resolve)
            require(["@/pagesHx/autoPage/autoPlatSysform/autoPlatSysform"], resolve)
    },
    {
        path: "autoMainTable",
        name: "autoMainTable",
        component: resolve =>
            require(["@/components/autoCommonPage/autoMainTable"], resolve)
    },
    {
        path: "autoOrgPostHX",
        name: "autoOrgPostHX",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoOrgPost/autoOrgPost"], resolve)
    },
    {
        path: "autoOrgUnits",
        name: "autoOrgUnits",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoOrgUnits/autoOrgUnits"], resolve)
    },
    {
        path: "autoEmpBaseinfo",
        name: "autoEmpBaseinfo",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoEmpBaseinfo/autoEmpBaseinfo"], resolve)
    },
    {
        path: "autoBaseLang",
        name: "autoBaseLang",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoBaseLang/autoBaseLang"], resolve)
    },
    {
        path: "autoBaseParamInfo",
        name: "autoBaseParamInfo",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoBaseParamInfo/autoBaseParamInfo"], resolve)
    },
    {
        path: "autoBaseParamType",
        name: "autoBaseParamType",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoBaseParamType/autoBaseParamType"], resolve)
    },
    {
        path: "autoBaseCompbankmapping",
        name: "autoBaseCompbankmapping",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoBaseCompbankmapping/autoBaseCompbankmapping"], resolve)
    }, {
        path: "autoBaseLanproptype",
        name: "autoBaseLanproptype",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoBaseLanproptype/autoBaseLanproptype"], resolve)
    },
    {
        path: "autoBaseLevareason",
        name: "autoBaseLevareason",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoBaseLevareason/autoBaseLevareason"], resolve)
    },
    {
        path: "autoPlatFileexcel",
        name: "autoPlatFileexcel",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoPlatFileexcel/autoPlatFileexcel"], resolve)
    },
    {
        path: "autoUserInfo",
        name: "autoUserInfo",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoUserInfo/autoUserInfo"], resolve)
    },
    {
        path: "autoPlatDoctemplate",
        name: "autoPlatDoctemplate",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoPlatDoctemplate/autoPlatDoctemplate"], resolve)
    },
    {
        path: "autoPlatSysmail",
        name: "autoPlatSysmail",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoPlatSysmail/autoPlatSysmail"], resolve)
    },
    {
        path: "autoPlatSyssms",
        name: "autoPlatSyssms",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoPlatSyssms/autoPlatSyssms"], resolve)
    },
    {
        path: "autoPlatSyswx",
        name: "autoPlatSyswx",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoPlatSyswx/autoPlatSyswx"], resolve)
    }, {
        path: "autoRoleMange",
        name: "autoRoleMange",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoRoleMange/autoRoleMange"], resolve)//角色管理
    }, {
        path: "autoRoleGroupMange",
        name: "autoRoleGroupMange",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoRoleGroupMange/autoRoleGroupMange"], resolve)//角色组管理
    }, {
        path: "autoUserMange",
        name: "autoUserMange",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoUserMange/autoUserMange"], resolve)//用户管理
    },
    {
        path: "autoSysUserinfo",
        name: "autoSysUserinfo",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoSysUserinfo/autoSysUserinfo"
            ], resolve)
    },
    {
        path: "autoRoleConfig",
        name: "autoRoleConfig",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/essAuthRole/index.vue"
            ], resolve)
    },
    {
        path: "autoRoleGroupConfig",
        name: "autoRoleGroupConfig",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/selfAutoRoleGroup/index.vue"
            ], resolve)
    },
    {
        path: "autoSelfUser",
        name: "autoSelfUser",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/selfAutoUser/index.vue"
            ], resolve)
    },
    {
        path: "autoSysFunctions",
        name: "autoSysFunctions",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoSysFunctions/autoSysFunctions"
            ], resolve)
    }, {
        path: "autoBusinessMange",
        name: "autoBusinessMange",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoBusinessMange/autoBusinessMange"
            ], resolve)
    }, {
        path: "autoBusinessUserMange",
        name: "autoBusinessUserMange",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoBusinessUserMange/autoBusinessUserMange"
            ], resolve)
    }, {
        path: "autoBusinessGroupMangeHX",
        name: "autoBusinessGroupMangeHX",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoBusinessGroupMange/autoBusinessGroupMange"
            ], resolve)
    }, {

        path: "autoPlatFlowListNew",
        name: "autoPlatFlowListNew",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoPlatFlowListNew/autoPlatFlowListNew"], resolve)
    }, {

        path: "autoPlatApprovalListNewHX",
        name: "autoPlatApprovalListNewHX",
        component: resolve =>
            require(["@/pagesHx/autoPage/autoPlatApprovalListNew/autoPlatApprovalListNew"], resolve)
    },
    {
        path: "autoOrgBusiarea",
        name: "autoOrgBusiarea",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoOrgBusiarea/autoOrgBusiarea"
            ], resolve)
    },
    {
        path: "autoOrgRankinfo",
        name: "autoOrgRankinfo",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoOrgRankinfo/autoOrgRankinfo"
            ], resolve)
    },
    {
        path: "autoOrgPostspe",
        name: "autoOrgPostspe",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoOrgPostspe/autoOrgPostspe"
            ], resolve)
    },
    {
        path: "autoOrgLegalety",
        name: "autoOrgLegalety",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoOrgLegalety/autoOrgLegalety"
            ], resolve)
    },
    {
        path: "autoOrgUnitshistory",
        name: "autoOrgUnitshistory",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoOrgUnitshistory/autoOrgUnitshistory"
            ], resolve)
    },
    //组织信息管理 
    {
        path: "autoOrganizeInformationHX",
        name: "autoOrganizeInformationHX",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoOrganizeInformation/autoOrganizeInformation"
            ], resolve)
    },
    // 业务模块
    {
        path: "autoOrgBusimod",
        name: "autoOrgBusimod",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoOrgBusimod/autoOrgBusimod"
            ], resolve)

    },
    //  岗位序列
    {
        path: "autoOrgPostordHx",
        name: "autoOrgPostordHx",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoOrgPostord/autoOrgPostord"
            ], resolve)
    },
    {
        path: "autoMyOrgUnits",
        name: "autoMyOrgUnits",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoMyOrgUnits/autoOrgUnits"
            ], resolve)
    },
    {
        path: "autoMyOrgCostcen",
        name: "autoMyOrgCostcen",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoMyOrgCostcen/autoOrgCostcen"
            ], resolve)
    },
    {
        path: "autoMyOrgPost",
        name: "autoMyOrgPost",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoMyOrgPost/autoOrgPost"
            ], resolve)
    },
    {
        path: "autoAddJobSeq",
        name: "autoAddJobSeq",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoAddJobSeq/index.vue"], resolve)
    },
    {
        path: "autoMyOrgBusiarea",
        name: "autoMyOrgBusiarea",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoMyOrgBusiarea/autoOrgBusiarea"
            ], resolve)
    },
    {
        path: "autoMyEmpBaseinfo",
        name: "autoMyEmpBaseinfo",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoMyEmpBaseinfo/autoEmpBaseinfo"
            ], resolve)
    },
    {
        path: "autoAttMoncheckHandle",
        name: "autoAttMoncheckHandle",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoAttMoncheckHandle/autoAttMoncheckHandle"
            ], resolve)
    },
    {
        path: "autoPaysEquation",
        name: "autoPaysEquation",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoPaysEquation/autoPaysAcctype"
            ], resolve)
    },
    {
        path: "autoPrimarydataHX",
        name: "autoPrimarydataHX",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoPrimarydataHX/autoPrimarydataHX"
            ], resolve)
    },
    {
        path: "autoEmproster",
        name: "autoEmproster",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoEmproster/autoEmproster"
            ], resolve)
    },{
        path: "autoPaysSalaryDetail",
        name: "autoPaysSalaryDetail",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoPaysSalaryDetail/autoPaysSalaryDetail"
            ], resolve)
    },
    {
        path: "autoPaysMaperiodicPro",
        name: "autoPaysMaperiodicPro",
        component: resolve =>
            require([
                "@/pagesHx/autoPage/autoPaysMaperiodicPro/autoPaysMaperiodicPro"
            ], resolve)
    },
    {
        path: 'autoEmpFlowEntr',
        name: 'autoEmpFlowEntr',
        component:resolve => require(['@/pagesHx/autoPage/autoEmpFlowEntr/autoEmpFlowEntr'], resolve)
    },
    {
        path: "autoEmpFlowQuit",
        name: "autoEmpFlowQuit",
        component: resolve => require(["@/pagesHx/autoPage/autoEmpFlowQuit/commonFlowList"], resolve)
    }
];
