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
            require(["@/pagesZnjs/autoPage/autoGenConfiguration/autoGenConfiguration"], resolve)
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
            require(["@/pagesZnjs/autoPage/autoPlatSysform/autoPlatSysform"], resolve)
    },
    {
        path: "autoMainTable",
        name: "autoMainTable",
        component: resolve =>
            require(["@/components/autoCommonPage/autoMainTable"], resolve)
    },
    {
        path: "autoOrgPost",
        name: "autoOrgPost",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoOrgPost/autoOrgPost"], resolve)
    },
    {
        path: "autoOrgUnits",
        name: "autoOrgUnits",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoOrgUnits/autoOrgUnits"], resolve)
    },
    {
        path: "autoEmpBaseinfo",
        name: "autoEmpBaseinfo",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoEmpBaseinfo/autoEmpBaseinfo"], resolve)
    },
    {
        path: "autoBaseLang",
        name: "autoBaseLang",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoBaseLang/autoBaseLang"], resolve)
    },
    {
        path: "autoBaseParamInfo",
        name: "autoBaseParamInfo",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoBaseParamInfo/autoBaseParamInfo"], resolve)
    },
    {
        path: "autoBaseParamType",
        name: "autoBaseParamType",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoBaseParamType/autoBaseParamType"], resolve)
    },
    {
        path: "autoBaseCompbankmapping",
        name: "autoBaseCompbankmapping",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoBaseCompbankmapping/autoBaseCompbankmapping"], resolve)
    }, {
        path: "autoBaseLanproptype",
        name: "autoBaseLanproptype",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoBaseLanproptype/autoBaseLanproptype"], resolve)
    },
    {
        path: "autoBaseLevareason",
        name: "autoBaseLevareason",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoBaseLevareason/autoBaseLevareason"], resolve)
    },
    {
        path: "autoPlatFileexcel",
        name: "autoPlatFileexcel",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoPlatFileexcel/autoPlatFileexcel"], resolve)
    },
    {
        path: "autoUserInfo",
        name: "autoUserInfo",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoUserInfo/autoUserInfo"], resolve)
    },
    {
        path: "autoPlatDoctemplate",
        name: "autoPlatDoctemplate",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoPlatDoctemplate/autoPlatDoctemplate"], resolve)
    },
    {
        path: "autoPlatSysmail",
        name: "autoPlatSysmail",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoPlatSysmail/autoPlatSysmail"], resolve)
    },
    {
        path: "autoPlatSyssms",
        name: "autoPlatSyssms",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoPlatSyssms/autoPlatSyssms"], resolve)
    },
    {
        path: "autoPlatSyswx",
        name: "autoPlatSyswx",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoPlatSyswx/autoPlatSyswx"], resolve)
    }, {
        path: "autoRoleMange",
        name: "autoRoleMange",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoRoleMange/autoRoleMange"], resolve)//角色管理
    }, {
        path: "autoRoleGroupMange",
        name: "autoRoleGroupMange",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoRoleGroupMange/autoRoleGroupMange"], resolve)//角色组管理
    }, {
        path: "autoUserMange",
        name: "autoUserMange",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoUserMange/autoUserMange"], resolve)//用户管理
    },
    {
        path: "autoSysUserinfo",
        name: "autoSysUserinfo",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoSysUserinfo/autoSysUserinfo"
            ], resolve)
    },
    {
        path: "autoRoleConfig",
        name: "autoRoleConfig",
        component: resolve =>
            require([
                "@/pages/autoPage/essAuthRole/index.vue"
            ], resolve)
    },
    {
        path: "autoRoleGroupConfig",
        name: "autoRoleGroupConfig",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/selfAutoRoleGroup/index.vue"
            ], resolve)
    },
    {
        path: "autoSelfUser",
        name: "autoSelfUser",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/selfAutoUser/index.vue"
            ], resolve)
    },
    {
        path: "autoSysFunctions",
        name: "autoSysFunctions",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoSysFunctions/autoSysFunctions"
            ], resolve)
    }, {
        path: "autoBusinessMange",
        name: "autoBusinessMange",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoBusinessMange/autoBusinessMange"
            ], resolve)
    }, {
        path: "autoBusinessUserMange",
        name: "autoBusinessUserMange",
        component: resolve =>
            require([
                "@/pages/autoPage/autoBusinessUserMange/autoBusinessUserMange"
            ], resolve)
    }, {
        path: "autoBusinessGroupMange",
        name: "autoBusinessGroupMange",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoBusinessGroupMange/autoBusinessGroupMange"
            ], resolve)
    }, {

        path: "autoPlatFlowListNew",
        name: "autoPlatFlowListNew",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoPlatFlowListNew/autoPlatFlowListNew"], resolve)
    }, {

        path: "autoPlatApprovalListNew",
        name: "autoPlatApprovalListNew",
        component: resolve =>
            require(["@/pagesZnjs/autoPage/autoPlatApprovalListNew/autoPlatApprovalListNew"], resolve)
    },
    {
        path: "autoOrgBusiarea",
        name: "autoOrgBusiarea",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoOrgBusiarea/autoOrgBusiarea"
            ], resolve)
    },
    {
        path: "autoOrgRankinfo",
        name: "autoOrgRankinfo",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoOrgRankinfo/autoOrgRankinfo"
            ], resolve)
    },
    {
        path: "autoOrgPostspe",
        name: "autoOrgPostspe",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoOrgPostspe/autoOrgPostspe"
            ], resolve)
    },
    {
        path: "autoOrgLegalety",
        name: "autoOrgLegalety",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoOrgLegalety/autoOrgLegalety"
            ], resolve)
    },
    {
        path: "autoOrgUnitshistory",
        name: "autoOrgUnitshistory",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoOrgUnitshistory/autoOrgUnitshistory"
            ], resolve)
    },
    //组织信息管理 
    {
        path: "autoOrganizeInformation",
        name: "autoOrganizeInformation",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoOrganizeInformation/autoOrganizeInformation"
            ], resolve)
    },
    // 业务模块
    {
        path: "autoOrgBusimod",
        name: "autoOrgBusimod",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoOrgBusimod/autoOrgBusimod"
            ], resolve)

    },
    //  岗位序列
    {
        path: "autoOrgPostord",
        name: "autoOrgPostord",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoOrgPostord/autoOrgPostord"
            ], resolve)
    },
    {
        path: "autoMyOrgUnits",
        name: "autoMyOrgUnits",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoMyOrgUnits/autoOrgUnits"
            ], resolve)
    },
    {
        path: "autoMyOrgCostcen",
        name: "autoMyOrgCostcen",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoMyOrgCostcen/autoOrgCostcen"
            ], resolve)
    },
    {
        path: "autoMyOrgPost",
        name: "autoMyOrgPost",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoMyOrgPost/autoOrgPost"
            ], resolve)
    },
    {
        path: "autoAddJobSeq",
        name: "autoAddJobSeq",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoAddJobSeq/index.vue"], resolve)
    },
    {
        path: "autoMyOrgBusiarea",
        name: "autoMyOrgBusiarea",
        component: resolve =>
            require([
                "@/pages/autoPage/autoMyOrgBusiarea/autoOrgBusiarea"
            ], resolve)
    },
    {
        path: "autoMyEmpBaseinfo",
        name: "autoMyEmpBaseinfo",
        component: resolve =>
            require([
                "@/pagesZnjs/autoPage/autoMyEmpBaseinfo/autoEmpBaseinfo"
            ], resolve)
    },
    {
        path: "autopayrollProcessing",
        name: "autopayrollProcessing",
        component: resolve =>
            require([
                "@/pages/autoPage/autopayrollProcessing/autopayrollProcessing"
            ], resolve)
    },
    {
        path: "autoEmploymentStation",
        name: "autoEmploymentStation",
        component: resolve =>
            require([
                "@/pages/autoPage/autoEmploymentStation/autoEmploymentStation"
            ], resolve)
    },
    {
        path: "autoStaffMange",
        name: "autoStaffMange",
        component: resolve =>
            require([
                "@/pages/autoPage/autoStaffMange/autoStaffMange"
            ], resolve)
    },
];
