/**
 * Created by Aaron on 2018/3/14.
 */
// import params from '@/lib/global_variable'
const params = pubsource.param_mt;
const searchTable = {
  /*
   * 服务
   * */
  "base-serviceId-std": {
    title: "选择服务",
    searchText: "请输入服务名称",
    valueText: "serviceName",
    searchCloumns: [
      {
        title: "服务名称",
        key: "serviceName"
        // sortable: 'custom',
      },
      {
        title: "包名",
        key: "packageName"
        // sortable: 'custom',
      }
    ],
    param: {
      _mt:   params+"GenService.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 国家
   * */
  "base-cuntry-std": {
    title: "选择国家",
    searchText: "请输入国家中文",
    valueText: "countryCname",
    searchCloumns: [
      {
        title: "国家中文",
        key: "countryCname"
        // sortable: 'custom',
      },
      {
        title: "国家英文",
        key: "countryEname"
        // sortable: 'custom',
      }
    ],
    param: {
      _mt:   params+"BaseCountry.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 省份
   * */
  "base-province-std": {
    title: "选择省份",
    searchText: "请输入省份",
    valueText: "cityName",
    searchCloumns: [
      {
        title: "省份名称",
        key: "cityName"
      }
    ],
    param: {
      _mt:   params+"BaseCity.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询",
      cityType: "01prov",
      cityIsvalid: "1"
    }
  },
  /*
   * 用于TMCC选择城市
   * */
  "base-basemccity-std": {
    title: "选择城市",
    searchText: "请输入城市",
    valueText: "tmccityName",
    searchCloumns: [
      {
        title: "城市名称",
        key: "tmccityName"
      }
    ],
    param: {
      _mt:   params+"BaseTmccity.getPage",
      sort: "tmccityCode",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 城市
   * */
  "base-city-std": {
    title: "选择城市",
    searchText: "请输入城市",
    valueText: "cityName",
    searchCloumns: [
      {
        title: "城市名称",
        key: "cityName"
      }
    ],
    param: {
      _mt:   params+"BaseCity.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询",
      cityType: "02city",
      cityIsvalid: "1"
    }
  },
  /*
   * 选择币种
   * */
  "base-currency-std": {
    title: "选择币种",
    searchText: "请输入币种",
    valueText: "currCurrency",
    searchCloumns: [
      {
        title: "币种名称",
        key: "currCurrency"
      }
    ],
    param: {
      _mt:   params+"BaseCurrency.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择银行
   * */
  "base-bankdetail-std": {
    title: "选择银行",
    searchText: "请输入银行名称",
    valueText: "bankCname",
    searchCloumns: [
      {
        title: "银行代码/行号",
        key: "bankCode"
      },
      {
        title: "银行中文名",
        key: "bankCname"
      }
    ],
    param: {
      _mt:   params+"BaseBankinfo.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择离职原因
   * */
  "base-leaveReason-std": {
    title: "选择离职",
    searchText: "请输入离职原因",
    valueText: "levaName",
    searchCloumns: [
      {
        title: "离职原因",
        key: "levaCname"
      }
    ],
    param: {
      _mt:   params+"BaseLevareason.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择未入职原因
   * */
  "base-noEntryReason-std": {
    title: "选择未入职原因",
    searchText: "请输入未入职原因",
    valueText: "nerName",
    searchCloumns: [
      {
        title: "未入职原因中文",
        key: "nerCname"
      },
      {
        title: "未入职原因英文",
        key: "nerEname"
      }
    ],
    param: {
      _mt:   params+"BaseNereason.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择社保险种信息
   * */
  "base-socialIns-std": {
    title: "选择社保险种",
    searchText: "请输入社保险种信息",
    valueText: "sscName",
    searchCloumns: [
      {
        title: "社保险种名称",
        key: "sscName"
      },
      {
        title: "社保险种类别",
        key: "sscTypeName"
      }
    ],
    param: {
      _mt:   params+"BaseSscoverage.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择社保险种信息2
   * */
  "base-socialIns-std2": {
    title: "选择社保险种",
    searchText: "请输入社保险种信息",
    valueText: "sscName",
    searchCloumns: [
      {
        title: "险种编号",
        key: "sihfpcyinsOrder"
      },
      {
        title: "险种名称",
        key: "sihfpcyinsInsName"
      }
    ],
    param: {
      _mt:   params+"SihfPlcyinsurance.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },

  /*
   * 选择公司
   * */
  "org-company-std": {
    title: "选择公司",
    searchText: "请输入公司",
    valueText: "unitsName",
    searchCloumns: [
      {
        title: "公司编码",
        key: "unitCode"
      },
      {
        title: "公司名称",
        key: "unitsName"
      }
    ],
    param: {
      _mt:   params+"OrgUnits.getByOrgFramePageList",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询",
      unitType: "01company,10area"
    }
  },
  /*
   * 选择组织
   * */
  "org-org-std": {
    title: "选择公司",
    searchText: "请输入公司",
    valueText: "unitsName",
    searchCloumns: [
      {
        title: "公司编码",
        key: "unitCode"
      },
      {
        title: "公司名称",
        key: "unitsName"
      }
    ],
    param: {
      _mt:   params+"OrgUnits.getByOrgFramePageList",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询",
      unitType: "01company,10area"
    }
  },
  /*
   * 选择部门
   * */
  "org-department-std": {
    title: "选择部门",
    searchText: "请输入部门名称",
    valueText: "unitsName",
    searchCloumns: [
      {
        title: "部门编码",
        key: "unitCode"
      },
      {
        title: "部门名称",
        key: "unitsName"
      }
    ],
    param: {
      _mt:   params+"OrgUnits.getByOrgFramePageList",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询",
      unitType: "70dept,20city,30busi"
    }
  },
  /*
   * 选择岗位
   * */
  "org-post-std": {
    title: "选择岗位",
    searchText: "请输入岗位名称",
    valueText: "postFnameDis",
    searchCloumns: [
      {
        title: "岗位编码",
        key: "postCode"
      },
      {
        title: "岗位名称",
        key: "postFnameDis"
      }
    ],
    param: {
      _mt:   params+"OrgPost.getPopupPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择岗位，增加职级校验-check level
   * */
  "org-post-std-cl": {
    title: "选择岗位",
    searchText: "请输入岗位名称",
    valueText: "postFnameDis",
    searchCloumns: [
      {
        title: "岗位编码",
        key: "postCode"
      },
      {
        title: "岗位名称",
        key: "postFnameDis"
      }
    ],
    param: {
      _mt:   params+"OrgPost.getPopupPageCheckLevel",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /* 职务管理  orgDuty.getPage */
  "org-duty": {
    title: "选择职务",
    searchText: "请输入职务名称",
    valueText: "dutyName",
    searchCloumns: [
      {
        title: "职务名称",
        key: "dutyName"
      },
      {
        title: "职务级别",
        key: "dutyLevel"
      }
    ],
    param: {
      _mt:   params+"OrgDuty.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择成本中心
   * */
  "org-costcenter-std": {
    title: "选择费用中心",
    searchText: "请输入成本中心名称",
    valueText: "name",
    searchCloumns: [
      {
        title: "成本中心编码",
        key: "costCode"
      },
      {
        title: "成本中心名称",
        key: "name"
      }
    ],
    param: {
      _mt:   params+"OrgCostcenter.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择员工   查询试用期 在职的员工   特殊处理
   * */
  "emp-base-std": {
    title: "选择员工",
    searchText: "请输入员工姓名",
    valueText: "empCname",
    searchCloumns: [
      {
        title: "员工工号",
        key: "empkiWorkno"
      },
      {
        title: "中文名",
        key: "empCname"
      },
      // {
      //   title: '英文名',
      //   key: 'empEname',
      // },
      {
        title: "公司",
        key: "empcompHirecompanyDis"
      },
      {
        title: "部门",
        key: "empcompDeptDis"
      },
      {
        title: "岗位",
        key: "empcompPostDis"
      }
    ],
    param: {
      _mt:   params+"ViewEmpMaster.getPage",
      APsort: "id",
      APorder: "asc",
      AProws: 10,
      APpage: 1,
      empkiStatus: "'00probation','01active'",
      APlogType: "查询"
    }
  },
  /*
   * 选择员工   通用
   * */
  "emp-base-std-name": {
    title: "选择员工",
    searchText: "请输入员工姓名",
    valueText: "empCname",
    searchCloumns: [
      {
        title: "员工工号",
        key: "empGid"
      },
      {
        title: "中文名",
        key: "empName"
      },
      {
        title: "公司",
        key: "empUnitidDis"
      },
      {
        title: "部门",
        key: "empDeptidDis"
      },
      {
        title: "岗位",
        key: "empPostidDis"
      }
      // {
      //   title: "公司",
      //   key: params === 'xian'?"unitIdDis":"empUnitidDis"
      // },
      // {
      //   title: "部门",
      //   key: params === 'xian'?"deptIdDis":"empDeptidDis"
      // },
      // {
      //   title: "岗位",
      //   key: params === 'xian'?"postIdDis":"empPostidDis"
      // }
    ],
    param: {
      // _mt: params === 'xian'? params + 'EmpBaseinfo.getPage': params+'EmpInfo.getPage',
      _mt: params+'EmpInfo.getPage',
      APsort: "id",
      APorder: "asc",
      AProws: 10,
      APpage: 1,
      APffk:'0'
    }
  },
  /*
   * 选择民族
   * */
  "param-nationtype": {
    title: "选择民族",
    searchText: "请输入名称",
    valueText: "paramInfoName",
    code: "paramCode",
    searchCloumns: [
      {
        title: "名称",
        key: "paramInfoCn",
        width: 380
      }
      // {
      //   title: '英文名称',
      //   key: 'paramInfoEn',
      //   width: 379,
      // },
    ],
    param: {
      _mt:   params+"BaseParamInfo.getParamInfoByPage",
      sort: "paramCode",
      order: "asc",
      rows: 10,
      page: 1,
      paramTypeDis: "nationtype",
      logType: "查询"
    }
  },
  /*
   * 薪资项目
   * */
  "pay-salitem-std": {
    title: "选择薪资项目",
    searchText: "请输入项目名称",
    valueText: "paysiCN",
    searchCloumns: [
      {
        title: "项目编码",
        key: "paysiCode"
        // sortable: 'custom',
      },
      {
        title: "项目名称",
        key: "paysiCN"
        // sortable: 'custom',
      }
    ],
    param: {
      _mt:   params+"PaySalItem.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择员工号
   * */
  "emp-workno-std": {
    title: "选择员工工号",
    searchText: "请输入员工工号",
    valueText: "empkiWorkno",
    code: "empkiWorkno",
    searchCloumns: [
      {
        title: "中文名",
        key: "empCname"
      },
      // {
      //   title: '英文名',
      //   key: 'empEname',
      // },
      {
        title: "员工号",
        key: "empkiWorkno"
      }
    ],
    param: {
      _mt:   params+"ViewEmpMaster.getPage",
      empkiStatus: "'00probation','01active'",
      APsort: "id",
      APorder: "asc",
      AProws: 10,
      APpage: 1,
      APlogType: "查询"
    }
  },
  /*
   * 选择社保政策
   * */
  "sihf-policy-std": {
    title: "选择社保政策",
    searchText: "请输入社保中文名称",
    valueText: "sihfpcyCn",
    searchCloumns: [
      {
        title: "社保中文名",
        key: "sihfpcyCn"
      },
      {
        title: "社保英文名",
        key: "sihfpcyEn"
      },
      {
        title: "社保地区",
        key: "sihfpcyAreaName"
      }
    ],
    param: {
      _mt:   params+"SihfPolicy.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      sihfpcyType: "01social",
      logType: "查询"
    }
  },
  /*
   * 选择公积金政策
   * */
  "sihf-HFpolicy-std": {
    title: "选择公积金",
    searchText: "请输入公积金中文名称",
    valueText: "sihfpcyCn",
    searchCloumns: [
      {
        title: "公积金中文名",
        key: "sihfpcyCn"
      },
      {
        title: "公积金英文名",
        key: "sihfpcyEn"
      },
      {
        title: "公积金地区",
        key: "sihfpcyAreaName"
      }
    ],
    param: {
      _mt:   params+"SihfPolicy.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      sihfpcyType: "02hfund",
      logType: "查询"
    }
  },
  /*
   * 选择在职员工信息
   * */
  "ansp-emp": {
    title: "选择员工工号",
    searchText: "请输入员工工号",
    valueText: "empkiWorkno",
    // code: 'empkiWorkno',
    searchCloumns: [
      {
        title: "中文名",
        key: "empCname"
      },
      // {
      //   title: '英文名',
      //   key: 'empEname',
      // },
      {
        title: "员工工号",
        key: "empkiWorkno"
      }
    ],
    param: {
      _mt:   params+"AnsrptEmpMaster.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },

  /*
   * 选择档案分类
   * */
  "archives-classification-std": {
    title: "选择档案",
    searchText: "请输入档案名称",
    valueText: "claName",
    // code: 'claName',
    searchCloumns: [
      {
        title: "档案分类名称",
        key: "claName"
      },
      {
        title: "编码",
        key: "claNo"
      },
      {
        title: "上级分类",
        key: "claPidDis"
      }
    ],
    param: {
      _mt:   params+"ArchivesClassification.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },

  /*
   * 选择档案室
   * */
  "archives-center-std": {
    title: "选择档案室",
    searchText: "请输入档案室名称",
    valueText: "cenName",
    // code: 'claName',
    searchCloumns: [
      {
        title: "档案室名称",
        key: "cenName"
      },
      {
        title: "档案室编码",
        key: "cenNo"
      }
    ],
    param: {
      _mt:   params+"ArchivesCenter.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },

  /*
   * 选择档案柜
   * */
  "archives-cabinet-std": {
    title: "选择档案柜",
    searchText: "请输入档案柜名称",
    valueText: "cabNo",
    // code: 'claName',
    searchCloumns: [
      {
        title: "档案柜编码",
        key: "cabNo"
      },
      {
        title: "档案室名称",
        key: "cabCenidDis"
      }
    ],
    param: {
      _mt:   params+"ArchivesCabinet.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择用户
   * */
  "user-info-std": {
    title: "选择用户",
    searchText: "请输入用户姓名",
    valueText: "name",
    searchCloumns: [
      {
        title: "姓名",
        key: "name"
      },
      {
        title: "证件号码",
        key: "idNo"
      }
    ],
    param: {
      _mt:   params+"UserInfo.userpage",
      status: "02valid",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择用户
   * */
  "employee-visaArea-std": {
    title: "签证领区",
    searchText: "请选择受理区域范围",
    valueText: "areaScope",
    searchCloumns: [
      {
        title: "领区",
        key: "areaDistrictDis"
      },
      {
        title: "受理区域范围",
        key: "areaScope"
      }
    ],
    param: {
      _mt:   params+"VisaArea.getPage",
      isValid: "1",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 供应商公司
   * */
  "base-huntrevendor-std": {
    title: "供应商公司",
    searchText: "公司名称",
    valueText: "hvCompname",
    searchCloumns: [
      {
        title: "公司名称",
        key: "hvCompname"
      },
      {
        title: "供应商类别",
        key: "hvTypeDis"
      }
    ],
    param: {
      _mt:   params+"BaseHuntervendor.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  "emp-newhire-std": {
    title: "入职员工",
    searchText: "员工姓名",
    valueText: "empnhCname",
    searchCloumns: [
      {
        title: "员工姓名",
        key: "empnhCname"
      },
      {
        title: "Last Name",
        key: "empnhLname"
      },
      {
        title: "First Name",
        key: "empnhFname"
      }
    ],
    param: {
      _mt:   params+"EmpFlowNewHire.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  "eval-action-std": {
    title: "选择考核活动",
    searchText: "活动名称",
    valueText: "evaacName",
    searchCloumns: [
      {
        title: "活动名称",
        key: "evaacName"
      },
      {
        title: "考核模板",
        key: "evaacMoudleDis"
      },
      {
        title: "被考核员工",
        key: "evaacEmpidsDis"
      }
    ],
    param: {
      _mt:   params+"EvaluationAction.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询已经发布的考核活动",
      evaacStatus: "02released"
    }
  },
  "eval-assor-std": {
    title: "选择考核人",
    searchText: "请输入考核人",
    valueText: "evaasEmpidDis",
    searchCloumns: [
      {
        title: "考核人",
        key: "evaasEmpidDis"
      },
      {
        title: "考核人类型",
        key: "evaasTypeDis"
      }
    ],
    param: {
      _mt:   params+"EvaluationAssessor.getPageForFlow",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询考核人"
    }
  },
  "eval-assorall-std": {
    title: "选择考核人",
    searchText: "请输入考核人姓名",
    valueText: "evaasEmpidDis",
    searchCloumns: [
      {
        title: "考核人",
        key: "evaasEmpidDis"
      },
      {
        title: "考核人类型",
        key: "evaasTypeDis"
      }
    ],
    param: {
      _mt:   params+"EvaluationAssessor.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询考核人"
    }
  },
  "eval-normmapping-std": {
    title: "选择考核指标",
    searchText: "请输入指标名称",
    valueText: "mappingNormidDis",
    searchCloumns: [
      {
        title: "指标名称",
        key: "mappingNormidDis"
      },
      {
        title: "权重",
        key: "mappingWeight"
      },
      {
        title: "目标值",
        key: "mappingTarget"
      }
    ],
    param: {
      _mt:   params+"EvaluationNormempmapping.getPageForFlow",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "根据考核人查询考核指标信息"
    }
  },
  "eval-recruit-reqposition": {
    title: "选择需求岗位",
    searchText: "请输入岗位名称",
    valueText: "positionNameDis",
    searchCloumns: [
      {
        title: "需求岗位",
        key: "positionNameDis"
      },
      {
        title: "需求公司",
        key: "positionCompDis"
      },
      {
        title: "需求部门",
        key: "positionDeptDis"
      }
    ],
    param: {
      _mt:   params+"RecruitePosition.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查找招聘需求中的需求岗位",
      positionIfpass: "1",
      positionIfplan: "0" // 查询未计划的数据
    }
  },
  "eval-recruit-channel": {
    title: "选择招聘渠道",
    searchText: "请输入渠道名称",
    valueText: "channelName",
    searchCloumns: [
      {
        title: "招聘渠道名称",
        key: "channelName"
      }
    ],
    param: {
      _mt:   params+"RecruiteChannel.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查找招聘渠道名称"
    }
  },
  /*  胜任指标类型  */
  "competence-type": {
    title: "选择胜任指标类型",
    searchText: "请输入胜任指标类型名称",
    valueText: "competName", // 需要得到的名称
    searchCloumns: [
      {
        title: "编号",
        key: "competNo"
      },
      {
        title: "胜任类型",
        key: "competName"
      }
    ],
    param: {
      _mt:   params+"CompetenceType.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查找胜任指标类型"
    }
  },
  /*  选择上级指标  胜任能力指标 */
  "competence-Index": {
    title: "选择上级指标",
    searchText: "请输入上级指标",
    valueText: "competName", // 需要得到的名称
    searchCloumns: [
      {
        title: "编号",
        key: "competNo",
        width: 140,
        sortable: "custom"
      },
      {
        title: "胜任指标名称",
        width: 140,
        key: "competName"
      },
      {
        title: "胜任指标类型",
        width: 140,
        key: "competTypeDis"
      }
    ],
    param: {
      _mt:   params+"CompetenceIndex.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查找上级指标"
    }
  },
  /*  直接上级岗位  */
  "base-choose-job": {
    title: "选择上级岗位",
    searchText: "请输入上级岗位",
    valueText: "postFnameCnDis",
    searchCloumns: [
      {
        title: "编码",
        key: "postCode",
        sortable: "custom"
      },
      {
        title: "岗位名称",
        key: "postFnameCnDis"
      }
    ],
    param: {
      _mt:   params+"OrgPost.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*  岗位序列  */
  "org-Postseq-std": {
    title: "选择岗位条线",
    searchText: "请输入岗位条线",
    valueText: "seqName",
    searchCloumns: [
      {
        title: "编号",
        key: "seqCode"
      },
      {
        title: "岗位条线名称",
        key: "seqName"
      }
    ],
    param: {
      _mt:   params+"OrgPostseq.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*  集团  */
  "base-group": {
    title: "集团公司",
    searchText: "请输入中英文名字",
    valueText: "unitsName",
    searchCloumns: [
      {
        title: "编码",
        key: "unitCode"
      },
      {
        title: "中英文名称",
        key: "unitsName"
      },
      {
        title: "类型",
        key: "unitTypeName"
      }
    ],
    param: {
      _mt:   params+"OrgUnits.getByParentId",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询",
      pIds: 0
    }
  },
  /*  年月  */
  "plat-month": {
    title: "选择期间",
    searchText: "选择年月",
    valueText: "fypdPeriod",
    searchCloumns: [
      {
        title: "年份",
        key: "fypdYear"
      },
      {
        title: "期间",
        key: "fypdPeriod"
      }
    ],
    param: {
      _mt:   params+"PlatFyperiod.getPageNew",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "年月"
    }
  },

  /*  财年  */
  "plat-fyYear": {
    title: "选择财年",
    searchText: "选择财年",
    valueText: "fyYear",
    searchCloumns: [
      {
        title: "财年信息",
        key: "fyYear"
      },
      {
        title: "财年标识",
        key: "fyMark1"
      }
    ],
    param: {
      _mt:   params+"PlatFiscalyear.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "财年列表"
    }
  },
  /*  机构类型  */
  "training-channel-type": {
    title: "机构类型",
    searchText: "请输入机构类型",
    valueText: "ctypeName",
    searchCloumns: [
      {
        title: "类型编号",
        key: "ctypeNo"
      },
      {
        title: "类型名称",
        key: "ctypeName"
      }
    ],
    param: {
      _mt:   params+"TrainChanneltype.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "机构类型"
    }
  },
  /*  课程类型  */
  "training-course-type": {
    title: "课程类型",
    searchText: "请输入课程类型",
    valueText: "ctypeName",
    searchCloumns: [
      {
        title: "类型编号",
        key: "ctypeNo"
      },
      {
        title: "类型名称",
        key: "ctypeName"
      }
    ],
    param: {
      _mt:   params+"TrainCoursetype.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "课程类型"
    }
  },
  /*  培训机构  */
  "training-ways": {
    title: "培训机构",
    searchText: "请输入培训机构名称",
    valueText: "channelName",
    searchCloumns: [
      {
        title: "机构编号",
        key: "channelNo"
      },
      {
        title: "机构名称",
        key: "channelName"
      }
    ],
    param: {
      _mt:   params+"TrainChannel.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训机构"
    }
  },
  /*  培训讲师  */
  "training-instructors": {
    title: "培训讲师",
    searchText: "请输入培训讲师姓名",
    valueText: "lectName",
    searchCloumns: [
      {
        title: "讲师编号",
        key: "lectNo"
      },
      {
        title: "讲师姓名",
        key: "lectName"
      },
      {
        title: "擅长领域",
        key: "lectAdeptscope"
      },
      {
        title: "收费标准",
        key: "lectExpense"
      }
    ],
    param: {
      _mt:   params+"TrainLecturer.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训讲师"
    }
  },
  /*  培训课件  */
  "training-courseware": {
    title: "培训课件",
    searchText: "请输入课件名称",
    valueText: "cwareName",
    searchCloumns: [
      {
        title: "课件编号",
        key: "cwareNo"
      },
      {
        title: "课件类别",
        key: "cwareTypeDis"
      },
      {
        title: "课件名称",
        key: "cwareName"
      },
      {
        title: "课件作者",
        key: "cwareAuth"
      }
    ],
    param: {
      _mt:   params+"TrainCourseware.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训课件"
    }
  },
  /*  员工数据  */
  "training-enroll-actr": {
    title: "员工数据",
    searchText: "请输入员工姓名",
    valueText: "empCname",
    searchCloumns: [
      {
        title: "员工姓名",
        key: "empCname"
      },
      {
        title: "员工GID",
        key: "empGid"
      },
      {
        title: "员工工号",
        key: "empkiWorkno"
      },
      {
        title: "员工公司",
        key: "empcompHirecompanyDis"
      },
      {
        title: "员工部门",
        key: "empcompDeptDis"
      },
      {
        title: "员工岗位",
        key: "empcompPostDis"
      }
    ],
    param: {
      _mt:   params+"ViewEmpMaster.getLitePage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "员工数据"
    }
  },
  /*  培训课程  */
  "training-imp-courseware": {
    title: "培训课程",
    searchText: "请输入课程名称",
    valueText: "courseName",
    searchCloumns: [
      {
        title: "课程编号",
        key: "courseNo"
      },
      {
        title: "课程名称",
        key: "courseName"
      }
    ],
    param: {
      _mt:   params+"TrainCourse.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训课程"
    }
  },
  /*  新增时培训课程  */
  "training-active-courseware": {
    title: "培训课程",
    searchText: "请输入课程名称",
    valueText: "tplanName",
    searchCloumns: [
      {
        title: "课程编号",
        key: "tplanNo"
      },
      {
        title: "课程名称",
        key: "tplanName"
      },
      {
        title: "培训计划编号",
        key: "tplanBillidDis"
      },
      {
        title: "培训讲师",
        key: "tplanLecturerDis"
      }
    ],
    param: {
      _mt:   params+"TrainplanCourse.getPageBySdate",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训课程"
    }
  },
  /*  需求发起人  */
  "training-needs-person": {
    title: "需求发起人",
    searchText: "请输入需求发起人名字",
    valueText: "empCname",
    searchCloumns: [
      {
        title: "名字",
        key: "empCname"
      }
    ],
    param: {
      _mt:   params+"ViewEmpMaster.getPage",
      APsort: "id",
      APorder: "asc",
      AProws: 10,
      APpage: 1,
      APlogType: "需求发起人"
    }
  },
  /*  需求发起人公司  */
  "training-needs-company": {
    title: "公司",
    searchText: "请输入公司名称",
    valueText: "unitsName",
    searchCloumns: [
      {
        title: "公司编码",
        key: "unitCode",
        width: 120
      },
      {
        title: "公司中文名称",
        key: "unitsName"
      },
      {
        title: "公司英文名称",
        key: "unitsSname"
      }
    ],
    param: {
      _mt:   params+"OrgUnits.getByOrgFramePageList",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "公司"
    }
  },
  /*  需求发起人部门  */
  "training-needs-depart": {
    title: "部门",
    searchText: "请输入部门名称",
    valueText: "name",
    searchCloumns: [
      {
        title: "部门编码",
        key: "unitCode"
      },
      {
        title: "部门中文名称",
        key: "unitsName"
      },
      {
        title: "部门英文名称",
        key: "unitsSname"
      }
    ],
    param: {
      _mt:   params+"OrgUnits.getByOrgFramePageList",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "部门"
    }
  },

  /*  搜索功能编号接口  */
  "search-syFunction-code": {
    title: "搜索功能编号",
    searchText: "功能节点名称描述",
    valueText: "funLancodeDis",
    searchCloumns: [
      {
        title: "功能节点编号",
        key: "funCode"
      },
      {
        title: "功能节点名称描述",
        key: "funLancodeDis"
      },
      {
        title: "父功能节点描述",
        key: "funPidDis"
      }
    ],
    param: {
      _mt:   params+"SysFunctions.getSysFunctionsByPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "搜索功能编号"
    }
  },
  /*  流程意图  */
  "cmut-psintent-want": {
    title: "流程意图",
    searchText: "请输入意图名称",
    valueText: "cmutPsintName",
    searchCloumns: [
      {
        title: "意图名称",
        key: "cmutPsintName"
      }
    ],
    param: {
      _mt:   params+"CmutPsintent.getPage",
      sort: "cmutCorpOrder",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "流程意图"
    }
  },
  /*  词槽  */
  "cmut-Word-slot": {
    title: "选择词槽",
    searchText: "请输入词槽名称",
    valueText: "cmutWdslotName",
    searchCloumns: [
      {
        title: "词槽名称",
        key: "cmutWdslotName"
      }
    ],
    param: {
      _mt:   params+"CmutWordslot.getPage",
      sort: "cmutCorpOrder",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "词槽"
    }
  },
  /*  班组  */
  "time-attendteam-std": {
    title: "选择班组",
    searchText: "请输入班组名称",
    valueText: "attTeamName",
    searchCloumns: [
      {
        title: "班组名称",
        key: "attTeamName"
      },
      {
        title: "公司",
        key: "attTeamHircompanyDis"
      }
    ],
    param: {
      _mt:   params+"AttendTeam.getPage",
      sort: "attTeamCode",
      order: "desc",
      rows: 10,
      page: 1,
      logType: "班组"
    }
  },
  /*  班组  */
  "base-attendRoundshift-std": {
    title: "选择排班轮次",
    searchText: "请输入轮次名称",
    valueText: "attRdsfName",
    searchCloumns: [
      {
        title: "轮次名称",
        key: "attRdsfName"
      }
    ],
    param: {
      _mt:   params+"AttendRoundshift.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "排班轮次"
    }
  },
  /*  班次  */
  "time-attendshift-std": {
    title: "选择班次",
    searchText: "请输入班次名称",
    valueText: "attShifName",
    searchCloumns: [
      {
        title: "班次名称",
        key: "attShifName"
      }
    ],
    param: {
      _mt:   params+"AttendShift.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "班次"
    }
  },
  /*  社保区域  */
  "plat-platbenefitarea-std": {
    title: "选择社保区域",
    searchText: "请输入区域名称",
    valueText: "bfareaCname",
    searchCloumns: [
      {
        title: "区域名称",
        key: "bfareaCname"
      }
    ],
    param: {
      _mt:   params+"PlatBenefitarea.getPage",
      sort: "bfareaCode",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "社保区域"
    }
  },
  /*  绩效方案（组织）  */
  "eval-performdeptcase-std": {
    title: "选择组织绩效方案",
    searchText: "请输入方案名称",
    valueText: "perDcName",
    searchCloumns: [
      {
        title: "方案名称",
        key: "perDcName"
      }
    ],
    param: {
      _mt:   params+"PerformDeptcase.getPage",
      sort: "perDcCode",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "绩效方案"
    }
  },
  /*  绩效方案（员工）  */
  "evaluation-performCase-std": {
    title: "选择个人绩效方案",
    searchText: "请输入方案名称",
    valueText: "percaseName",
    searchCloumns: [
      {
        title: "方案名称",
        key: "percaseName"
      }
    ],
    param: {
      _mt:   params+"PerformCase.getPage",
      sort: "percaseCode",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "绩效方案"
    }
  },
  /*  绩效方案（员工）  */
  "train-channeltype-std": {
    title: "选择培训机构类型",
    searchText: "请输入机构类型名称",
    valueText: "ctypeName",
    searchCloumns: [
      {
        title: "机构类型名称",
        key: "ctypeName"
      }
    ],
    param: {
      _mt:   params+"TrainChanneltype.getPage",
      sort: "ctypeNo",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "机构类型名称"
    }
  },
  /*  培训机构  */
  "recruit-tchannel-std": {
    title: "培训机构",
    searchText: "请输入培训机构名称",
    valueText: "channelName",
    searchCloumns: [
      {
        title: "机构编号",
        key: "channelNo"
      },
      {
        title: "机构名称",
        key: "channelName"
      }
    ],
    param: {
      _mt:   params+"TrainChannel.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训机构"
    }
  },
  /*  培训活动  */
  "recruit-trainActivity-std": {
    title: "培训活动",
    searchText: "请输入活动机构名称",
    valueText: "activityName",
    searchCloumns: [
      {
        title: "活动编号",
        key: "activityNo"
      },
      {
        title: "活动名称",
        key: "activityName"
      }
    ],
    param: {
      _mt:   params+"TrainActivity.getPage",
      sort: "activityNo",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训活动"
    }
  },
  /*  薪资账套  */
  "pay-salset-std": {
    title: "薪资账套",
    searchText: "请输入薪资账套名称",
    valueText: "payssCN",
    searchCloumns: [
      {
        title: "账套编码",
        key: "payssCode"
      },
      {
        title: "账套名称",
        key: "payssCN"
      }
    ],
    param: {
      _mt:   params+"PaySalSet.getPage",
      sort: "payssCode",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "薪资账套"
    }
  },
  /* 员工工号 - 社保用的 */
  "staff-num-std": {
    title: "员工工号",
    searchText: "请输入员工姓名",
    valueText: "empCname",
    searchCloumns: [
      {
        title: "员工姓名",
        key: "empCname"
      },
      {
        title: "员工工号",
        key: "empkiWorkno"
      }
    ],
    param: {
      _mt:   params+"AnsrptEmpSihfBenefit.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "员工工号"
    }
  },
  /* 员工工号 - 公积金用的 */
  "staff-pro-std": {
    title: "员工工号",
    searchText: "请输入员工姓名",
    valueText: "empCname",
    searchCloumns: [
      {
        title: "员工姓名",
        key: "empCname"
      },
      {
        title: "员工工号",
        key: "empkiWorkno"
      }
    ],
    param: {
      _mt:   params+"AnsrptEmpSihfHfund.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "员工工号"
    }
  },
  /* 员工社保公积金险种 */
  "staff-soc-std": {
    title: "员工险种",
    searchText: "请输入险种名称",
    valueText: "empinsInsuranceDis",
    searchCloumns: [
      {
        title: "险种名称",
        key: "empinsInsuranceDis"
      }
    ],
    param: {
      _mt:   params+"AnsrptEmpSihfInsurance.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "员工社保险种"
    }
  },
  /*
   * 选择盘点模板   通用
   * */
  "talent-pub-temp": {
    title: "选择盘点模板",
    searchText: "请输入模板名称",
    valueText: "tempName",
    searchCloumns: [
      {
        title: "模板名称",
        key: "tempName"
      },
      {
        title: "盘点年度",
        key: "tempYear",
        align: "center"
      },
      {
        title: "创建人",
        key: "createByDis"
      }
    ],
    param: {
      _mt:   params+"EvaltalentPubtemp.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*
   * 选择员工   查询试用期 在职的员工   特殊处理
   * */
  "eval-emp-std": {
    title: "选择被考核对象",
    searchText: "请输入被考核员工姓名",
    valueText: "evateEmpidDis",
    searchCloumns: [
      {
        title: "中文名",
        key: "evateEmpidDis"
      },
      {
        title: "公司",
        key: "evateCompanyDis"
      },
      {
        title: "部门",
        key: "evateDeptDis"
      },
      {
        title: "岗位",
        key: "empcompPostDis"
      }
    ],
    param: {
      _mt:   params+"EvaluationTargetemp.getPage",
      sort: "id",
      order: "desc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*  梯队岗位  */
  "talent-post-std": {
    title: "选择岗位",
    searchText: "请输入岗位名称",
    valueText: "talentPostDis",
    searchCloumns: [
      {
        title: "岗位名称",
        key: "talentPostDis"
      },
      {
        title: "所属组织",
        key: "talentOrgDis"
      }
    ],
    param: {
      _mt:   params+"TalentEchelon.getPostPage",
      sort: "activityNo",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训活动"
    }
  },
  /*  职务 */
  "org-duty-std": {
    title: "选择职务",
    searchText: "请输入职务名称",
    valueText: "dutyName",
    searchCloumns: [
      {
        title: "职务编码",
        key: "dutyCode"
      },
      {
        title: "职务名称",
        key: "dutyName"
      }
    ],
    param: {
      _mt:   params+"OrgDuty.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "职务查询"
    }
  } /*  职务 */,
  "base-dutygroup-std": {
    title: "选择职务簇",
    searchText: "请输入职务簇名称",
    valueText: "dutygrpName",
    searchCloumns: [
      {
        title: "职务簇编码",
        key: "dutygrpCode"
      },
      {
        title: "职务簇名称",
        key: "dutygrpName"
      }
    ],
    param: {
      _mt:   params+"BaseDutygroup.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "职务簇查询"
    }
  },
  "org-conComp-std": {
    title: "选择合同公司",
    searchText: "请输公司名称",
    valueText: "concompName",
    searchCloumns: [
      {
        title: "合同公司名称",
        key: "concompName"
      },
      {
        title: "合同公司编码",
        key: "concompCode"
      }
    ],
    param: {
      _mt:   params+"OrgContractcompany.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  "org-benchpost-std": {
    title: "选择基准岗位",
    searchText: "请输岗位名称",
    valueText: "postbsName",
    searchCloumns: [
      {
        title: "岗位名称",
        key: "postbsName"
      },
      {
        title: "岗位代码",
        key: "postbsCode"
      }
    ],
    param: {
      _mt:   params+"OrgBenchmarkpost.getPage",
      APsort: "id",
      APorder: "desc",
      AProws: 10,
      APpage: 1,
      APlogType: "查询"
    }
  },
  "org-postlevel-std": {
    title: "职位级别",
    searchText: "职位级别",
    valueText: "positionLevel",
    searchCloumns: [
      {
        title: "职位级别",
        key: "positionLevel"
      }
    ],
    param: {
      _mt:   params+"OrgPostlevelmapping.getSelectValue"
    }
  },
  "base-leave-rea": {
    title: "选择离职原因",
    searchText: "请输入离职原因",
    valueText: "levaCname",
    searchCloumns: [
      {
        title: "离职类型",
        key: "levaReatypeName"
      },
      {
        title: "离职原因",
        key: "levaCname"
      }
    ],
    param: {
      _mt:   params+"BaseLevareason.getPage",
      sort: "id",
      order: "desc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  "base-bankinfo-std": {
    title: "选择银行信息",
    searchText: "请输入银行名称",
    valueText: "cpbkName",
    searchCloumns: [
      {
        title: "编码",
        key: "cpbkCode"
      },
      {
        title: "银行名称",
        key: "cpbkName"
      },
      {
        title: "公司范围",
        key: "cpbkAreacompDis"
      }
    ],
    param: {
      _mt:   params+"BaseCompbankmapping.getPage",
      sort: "id",
      order: "desc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  }
};
export default searchTable;
