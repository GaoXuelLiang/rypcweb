/**
 * Created by Aaron on 2018/3/14.
 */
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
      _mt:  this.$global.mt+"GenService.getPage",
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
      _mt:  this.$global.mt+"BaseCountry.getPage",
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
      _mt:  this.$global.mt+"BaseCity.getPage",
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
      _mt:  this.$global.mt+"BaseCity.getPage",
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
      _mt:  this.$global.mt+"BaseCurrency.getPage",
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
      _mt:  this.$global.mt+"BaseBankinfo.getPage",
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
        title: "离职原因中文",
        key: "levaCname"
      },
      {
        title: "离职原因英文",
        key: "levaEname"
      }
    ],
    param: {
      _mt:  this.$global.mt+"BaseLevareason.getPage",
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
      _mt:  this.$global.mt+"BaseNereason.getPage",
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
      _mt:  this.$global.mt+"BaseSscoverage.getPage",
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
      _mt:  this.$global.mt+"OrgUnits.getByOrgFramePageList",
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
      _mt:  this.$global.mt+"OrgUnits.getByOrgFramePageList",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询",
      unitType: "70dept"
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
      _mt:  this.$global.mt+"OrgPost.getPopupPage",
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
      _mt:  this.$global.mt+"OrgPost.getPopupPageCheckLevel",
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
      _mt:  this.$global.mt+"OrgDuty.getPage",
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
      _mt:  this.$global.mt+"OrgCostcenter.getPage",
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
      {
        title: "英文名",
        key: "empEname"
      },
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
      _mt:  this.$global.mt+"ViewEmpMaster.getPage",
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
        title: "英文名",
        key: "empEname"
      },
      {
        title: "公司",
        key: "unitIdDis"
      },
      {
        title: "部门",
        key: "deptIdDis"
      },
      {
        title: "岗位",
        key: "postIdDis"
      }
    ],
    param: {
      _mt:  this.$global.mt+"EmpBaseinfo.getPage",
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
    searchText: "请输入姓名",
    valueText: "paramInfoName",
    code: "paramCode",
    searchCloumns: [
      {
        title: "中文名称",
        key: "paramInfoCn",
        width: 380
      },
      {
        title: "英文名称",
        key: "paramInfoEn",
        width: 379
      }
    ],
    param: {
      _mt:  this.$global.mt+"BaseParamInfo.getParamInfoByPage",
      sort: "id",
      order: "desc",
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
      _mt:  this.$global.mt+"PaySalItem.getPage",
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
      {
        title: "英文名",
        key: "empEname"
      },
      {
        title: "员工号",
        key: "empkiWorkno"
      }
    ],
    param: {
      _mt:  this.$global.mt+"ViewEmpMaster.getPage",
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
      _mt: "sihfPolicy.getPage",
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
      _mt: "sihfPolicy.getPage",
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
    code: "empkiWorkno",
    searchCloumns: [
      {
        title: "中文名",
        key: "empCname"
      },
      {
        title: "英文名",
        key: "empEname"
      },
      {
        title: "员工工号",
        key: "empkiWorkno"
      }
    ],
    param: {
      _mt:  this.$global.mt+"AnsrptEmpMaster.getPage",
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
      _mt:  this.$global.mt+"ArchivesClassification.getPage",
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
      _mt:  this.$global.mt+"ArchivesCenter.getPage",
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
      _mt:  this.$global.mt+"ArchivesCabinet.getPage",
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
      _mt:  this.$global.mt+"UserInfo.userpage",
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
      _mt:  this.$global.mt+"VisaArea.getPage",
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
      _mt:  this.$global.mt+"BaseHuntervendor.getPage",
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
      _mt:  this.$global.mt+"EmpFlowNewHire.getPage",
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
      _mt:  this.$global.mt+"EvaluationAction.getPage",
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
      _mt:  this.$global.mt+"EvaluationAssessor.getPageForFlow",
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
      _mt:  this.$global.mt+"EvaluationAssessor.getPage",
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
      _mt:  this.$global.mt+"EvaluationNormempmapping.getPageForFlow",
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
      _mt:  this.$global.mt+"RecruitePosition.getPage",
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
      _mt:  this.$global.mt+"RecruiteChannel.getPage",
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
      _mt:  this.$global.mt+"CompetenceType.getPage",
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
      _mt:  this.$global.mt+"CompetenceIndex.getPage",
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
      _mt:  this.$global.mt+"OrgPost.getPage",
      sort: "id",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "查询"
    }
  },
  /*  岗位序列  */
  "org-Postseq": {
    title: "选择岗位序列",
    searchText: "请输入岗位序列",
    valueText: "seqName",
    searchCloumns: [
      {
        title: "编号",
        key: "seqCode"
      },
      {
        title: "序列名称",
        key: "seqName"
      }
    ],
    param: {
      _mt:  this.$global.mt+"OrgPostseq.getPage",
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
      _mt:  this.$global.mt+"OrgUnits.getByParentId",
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
      _mt:  this.$global.mt+"PlatFyperiod.getPage",
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
      _mt:  this.$global.mt+"PlatFiscalyear.getPage",
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
      _mt:  this.$global.mt+"TrainChanneltype.getPage",
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
      _mt:  this.$global.mt+"TrainCoursetype.getPage",
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
      _mt:  this.$global.mt+"TrainChannel.getPage",
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
      _mt:  this.$global.mt+"TrainLecturer.getPage",
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
      _mt:  this.$global.mt+"TrainCourseware.getPage",
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
      _mt:  this.$global.mt+"ViewEmpMaster.getLitePage",
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
      _mt:  this.$global.mt+"TrainCourse.getPage",
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
      _mt:  this.$global.mt+"TrainplanCourse.getPageBySdate",
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
      _mt:  this.$global.mt+"ViewEmpMaster.getPage",
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
      _mt:  this.$global.mt+"OrgUnits.getByOrgFramePageList",
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
      _mt:  this.$global.mt+"OrgUnits.getByOrgFramePageList",
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
      _mt:  this.$global.mt+"SysFunctions.getSysFunctionsByPage",
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
      _mt:  this.$global.mt+"CmutPsintent.getPage",
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
      _mt:  this.$global.mt+"CmutWordslot.getPage",
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
      }
    ],
    param: {
      _mt:  this.$global.mt+"AttendTeam.getPage",
      sort: "attTeamCode",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "班组"
    }
  } /*  班组  */,
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
      _mt:  this.$global.mt+"AttendRoundshift.getPage",
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
      _mt:  this.$global.mt+"AttendShift.getPage",
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
      _mt:  this.$global.mt+"PlatBenefitarea.getPage",
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
      _mt:  this.$global.mt+"PerformDeptcase.getPage",
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
      _mt:  this.$global.mt+"PerformCase.getPage",
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
      _mt:  this.$global.mt+"TrainChanneltype.getPage",
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
      _mt:  this.$global.mt+"TrainChannel.getPage",
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
      _mt:  this.$global.mt+"TrainActivity.getPage",
      sort: "activityNo",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训活动"
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
      _mt:  this.$global.mt+"TalentEchelon.getPostPage",
      sort: "activityNo",
      order: "asc",
      rows: 10,
      page: 1,
      logType: "培训活动"
    }
  }
};
export default searchTable;
