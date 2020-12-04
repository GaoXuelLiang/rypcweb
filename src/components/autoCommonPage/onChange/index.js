/*
 * @Author: chneY
 * @Date: 2020-07-14 17:23:46
 * @Last Modified by: chenY
 * @Last Modified time: 2020-11-21 14:20:51
 */
/**
 * Created by Aaron on 2018/4/19.
 */
import GenColumn from "./GenColumn";
import ByIdGetSexDay from "./ByIdGetSexDay";
/**
 * znjs
 */
import EmpAddressznjs from "./EmpAddress";
import EmpEducationznjs from "./EmpEducation";
import EmpKeyinfoznjs from "./EmpKeyinfo"
import EmpContractznjs from "./EmpContract"
import EmpRecordznjs from "./EmpRecord"
import OrgEatabinfoznjs from "./OrgEatabinfo"
import OrgDutyznjs from "./OrgDuty"
import EmpInfoznjs from "./EmpInfo"
import EmpAppinfoznjs from "./EmpAppinfo"
import BaseCityznjs from "./BaseCity"
// 薪资账套项目
import PaysProjectznjs from "./PaysProject"
// 档案/类型
import BaseAttchmentznjs from "./BaseAttchment"
// 中南固定薪资项目
import EmpSalaryproznjs from './EmpSalarypro'
// 组织信息部门岗位管理子表
import OrgUnitpostznjs from './OrgUnitpost'
import OrgUnitsznjs from "./OrgUnits"
import OrgBusimodznjs from "./OrgBusimod"
import OrgBusiareaznjs from "./OrgBusiareaznjs"
import OrgPostznjs from "./OrgPostznjs"
// 内聘活动
import OrgNpactmanage from "./OrgNpactmanage"
// 银行信息管理（自助）
import EmpBankznjs from "./EmpBankznjs"
// 联系信息管理（自助）
import EmpContactznjs from "./EmpContactznjs"
// 职称证书管理（自助）
import EmpZccertznjs from "./EmpZccertznjs"
// 履历信息管理（自助）
import EmpWorkexpznjs from "./EmpWorkexpznjs"
// 家庭成员管理（自助）
import EmpFamilyznjs from "./EmpFamilyznjs"

/**
 * xian
 */
import EmpBaseinfoxian from "./EmpBaseinfo"
import PaysSalymanxian from "./PaysSalyman"
import PaysThawingTimexian from "./PaysThawingTime"
import SsecAddAdmitxian from "./SsecAddAdmit"
import EmpCertinfoxian from "./EmpCertinfo"
import EmpWagetypexian from "./EmpWagetype"
import EmpWageinfoxian from "./EmpWageinfo"
import BaseSofratxian from "./BaseSofrat"
import SsecInsurxian from "./SsecInsur"
import OrgLegaletyxian from "./OrgLegalety"
import OrgCostcenxian from "./OrgCostcen"
import OrgBusiareaxian from "./OrgBusiarea"
import OrgPostordxian from "./OrgPostord"
import OrgPostxian from "./OrgPost"
import EmpYcompayrxian from "./EmpYcompayr"
import EmpRecruitxian from "./EmpRecruit"
import EmpFamilyxian from "./EmpFamily"
import PaysEmpZqsalaryxian from "./PaysEmpZqsalary"
import PlatAprvrecordxian from "./PlatAprvrecord"
// 银行信息
import BaseCompbankmappingxian from './BaseCompbankmapping'
import OrgUnitsxian from './OrgUnitsxian'
import OrgBusimodxian from './OrgBusimodxian'
import InsChildinfoxian from "./InsChildinfoxian"
// 社保缴纳地
import SsecKickplacexian from "./SsecKickplacexian"
// 社保账单管理
import SsecBillmanxian from "./SsecBillmanxian"

import PaysQuitMse from "./PaysQuitMse"
import PaysHanedMse from "./PaysHanedMse"
export const onChange = {
    GenColumn: GenColumn,
    EmpAddressznjs: EmpAddressznjs,
    EmpEducationznjs: EmpEducationznjs,
    ByIdGetSexDay: ByIdGetSexDay,
    EmpKeyinfoznjs: EmpKeyinfoznjs,
    EmpContractznjs: EmpContractznjs,
    EmpBaseinfoxian: EmpBaseinfoxian,
    EmpRecordznjs: EmpRecordznjs,
    PaysSalymanxian: PaysSalymanxian,
    PaysThawingTimexian: PaysThawingTimexian,
    OrgUnitsznjs: OrgUnitsznjs,
    OrgEatabinfoznjs: OrgEatabinfoznjs,
    OrgDutyznjs: OrgDutyznjs,
    EmpInfoznjs: EmpInfoznjs,
    SsecAddAdmitxian: SsecAddAdmitxian,
    EmpCertinfoxian: EmpCertinfoxian,
    EmpWagetypexian: EmpWagetypexian,
    EmpWageinfoxian: EmpWageinfoxian,
    BaseSofratxian: BaseSofratxian,
    SsecInsurxian: SsecInsurxian,
    EmpAppinfoznjs: EmpAppinfoznjs,
    OrgLegaletyxian: OrgLegaletyxian,
    OrgCostcenxian: OrgCostcenxian,
    OrgBusimodznjs: OrgBusimodznjs,
    OrgBusiareaxian: OrgBusiareaxian,
    OrgPostordxian: OrgPostordxian,
    OrgPostxian: OrgPostxian,
    EmpYcompayrxian: EmpYcompayrxian,
    EmpRecruitxian: EmpRecruitxian,
    PaysProjectznjs: PaysProjectznjs,
    PlatAprvrecordxian: PlatAprvrecordxian,
    BaseAttchmentznjs: BaseAttchmentznjs,
    BaseCompbankmappingxian: BaseCompbankmappingxian,
    EmpFamilyxian: EmpFamilyxian,
    PaysQuitMse: PaysQuitMse,
    PaysEmpZqsalaryxian: PaysEmpZqsalaryxian,
    PaysHanedMse: PaysHanedMse,
    EmpSalaryproznjs: EmpSalaryproznjs,
    BaseCityznjs: BaseCityznjs,
    OrgUnitpostznjs: OrgUnitpostznjs,
    OrgUnitsxian: OrgUnitsxian,
    OrgBusimodxian: OrgBusimodxian,
    InsChildinfoxian: InsChildinfoxian,
    SsecKickplacexian: SsecKickplacexian,
    OrgBusiareaznjs: OrgBusiareaznjs,
    OrgPostznjs: OrgPostznjs,
    OrgNpactmanage: OrgNpactmanage,
    SsecBillmanxian: SsecBillmanxian,
    EmpBankznjs: EmpBankznjs,
    EmpContactznjs: EmpContactznjs,
    EmpZccertznjs: EmpZccertznjs,
    EmpWorkexpznjs: EmpWorkexpznjs,
    EmpFamilyznjs: EmpFamilyznjs
};
