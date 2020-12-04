
export default [
  {
    path: 'baseParamInfo',
    name: 'baseParamInfo',
    component:resolve => require(['@/pages/baseManage/baseparaminfo/baseParamInfo'], resolve)
  },
  {
    path: 'baseParamType',
    name: 'baseParamType',
    component:resolve => require(['@/pages/baseManage/baseparamtype/baseParamType'], resolve)
  },
  {
    path: 'countryManage',
    name: 'countryManage',
    component:resolve => require(['@/pages/baseManage/country-manage/countryManage'], resolve)
  },
  {
    path: 'cityManage',
    name: 'cityManage',
    component:resolve => require(['@/pages/baseManage/city-manage/cityManage'], resolve)
  },
  {
    path: 'baseWxmsgrecord',
    name: 'baseWxmsgrecord',
    component:resolve => require(['@/pages/baseManage/baseWxmsgrecord/baseWxmsgrecord'], resolve)
  },
  {
    path: 'OALog',
    name: 'OALog',
    component:resolve => require(['@/pages/baseManage/OALog/OALog'], resolve)
  },
  {
    path: 'taxTaxrateManage',
    name: 'taxTaxrateManage',
    component:resolve => require(['@/pages/baseManage/taxrate-manage/taxrateManage'], resolve)
  },
  {
    path: 'currencyManage',
    name: 'currencyManage',
    component:resolve => require(['@/pages/baseManage/currency-manage/currencyManage'], resolve)
  },
  {
    path: 'exrateManage',
    name: 'exrateManage',
    component:resolve => require(['@/pages/baseManage/exrate-manage/exrateManage'], resolve)
  },
  {
    path: 'bankinfoManage',
    name: 'bankinfoManage',
    component:resolve => require(['@/pages/baseManage/bankinfo-manage/bankinfoManage'], resolve)
  },
  {
    path: 'taxexemptionManage',
    name: 'taxexemptionManage',
    component:resolve => require(['@/pages/baseManage/taxexemption-manage/taxexemptionManage'], resolve)
  },
  {
    path: 'levadfamountManage',
    name: 'levadfamountManage',
    component:resolve => require(['@/pages/baseManage/levadfamount-manage/levadfamountManage'], resolve)
  },
  {
    path: 'levareasonManage',
    name: 'levareasonManage',
    component:resolve => require(['@/pages/baseManage/levareason-manage/levareasonManage'], resolve)
  },
  {
    path: 'nereasonManage',
    name: 'nereasonManage',
    component:resolve => require(['@/pages/baseManage/nereason-manage/nereasonManage'], resolve)
  },
  {
    path: 'sscoverageManage',
    name: 'sscoverageManage',
    component:resolve => require(['@/pages/baseManage/sscoverage-manage/sscoverageManage'], resolve)
  },
  {
    path: 'testForm01Manager',
    name: 'testForm01Manager',
    component:resolve => require(['@/pages/baseManage/testForm01/commonList/commonSinglePageList'], resolve)
  },
  {
    path: 'emaillogManage',
    name: 'emaillogManage',
    component:resolve => require(['@/pages/baseManage/emaillog-manage/emaillogManage'], resolve)
  },
  {
    path: 'autocodeManage',
    name: 'autocodeManage',
    component:resolve => require(['@/pages/baseManage/autocode-manage/autocodeManage'], resolve)
  },
  {
    path: 'cmutRemind',
    name: 'cmutRemind',
    component:resolve => require(['@/pages/baseManage/cmutRemind/cmutRemind'], resolve)
  },
  {
    path: 'baseHousinglease',
    name: 'baseHousinglease',
    component:resolve => require(['@/pages/baseManage/baseHousinglease/baseHousinglease'], resolve)
  },
  {
    path: 'jobCluster',
    name: 'jobCluster',
    component:resolve => require(['@/pages/baseManage/jobCluster/jobCluster'], resolve)
  },
  {
    path: 'baseEsdataset_Atgv',
    name: 'baseEsdataset_Atgv',
    component:resolve => require(['@/pages/baseManage/baseEsdataset/baseEsdatasetList'], resolve)
  },
  {
    path: 'baseDesensitisefmtList',
    name: 'baseDesensitisefmtList',
    component:resolve => require(['@/pages/rootManage/dataSecurity/desensitization'], resolve)
  },
  {
    path: 'baseTransencryptList_Atgv',
    name: 'baseTransencryptList_Atgv',
    component:resolve => require(['@/pages/rootManage/dataSecurity/baseTransencryptList'], resolve)
  },
  {
    path: 'baseStoragencryptList_Atgv',
    name: 'baseStoragencryptList_Atgv',
    component:resolve => require(['@/pages/rootManage/dataSecurity/baseStoragencryptList'], resolve)
  },
  {
    path: 'smsrecordManage',
    name: 'smsrecordManage',
    component:resolve => require(['@/pages/baseManage/smsrecord-manage/smsrecordManage'], resolve)
  },
  {
    path: 'bankManage',
    name: 'bankManage',
    component:resolve => require(['@/pages/baseManage/bank-manage/bankManage'], resolve)
  }
]
