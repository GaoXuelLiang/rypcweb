/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-09 17:38:11
 * @LastEditTime: 2020-11-03 11:25:45
 * @LastEditors: Sok
 */
/*
 * @Author: chneY
 * @Date: 2020-08-06 15:53:18
 * @Last Modified by: chenY
 * @Last Modified time: 2020-08-06 15:56:22
 */

import GenColumn from "./GenColumn";
import PlatSysform from "./PlatSysform";
import BaseCity from "./BaseCity";
import EmpMaemp from "./EmpMaemp";
import PlatAprvrecord from "./PlatAprvrecord"
import AttMoncheckHandle from "./AttMoncheckHandle"
import SsecAddAdmit from "./SsecAddAdmit"
import SsecMinusAdmit from "./SsecMinusAdmit"
import InsPdapprove from "./InsPdapprove"
// 华夏核算
import PaysSalaryBusi from "./PaysSalaryBusi"
// 中南核算
import PaySalacalc from './PaySalacalc'
import PayCphsdetail from './PayCphsdetail'
// 销假
import AttFlowVacate from "./AttFlowVacate"
// 华夏非周期性提报
import PaysMaperiodicTib from "./PaysMaperiodicTib"
// 华夏非周期性管理
import PaysMaperiodicPro from "./PaysMaperiodicPro"
import OrgNpactmanage from './OrgNpactmanage'

export const btnEvent = {
  GenColumn: GenColumn,
  PlatSysform: PlatSysform,
  BaseCity: BaseCity,
  EmpMaemp: EmpMaemp,
  PlatAprvrecord: PlatAprvrecord,
  AttMoncheckHandle:AttMoncheckHandle,
  SsecAddAdmit: SsecAddAdmit,
  SsecMinusAdmit: SsecMinusAdmit,
  InsPdapprove: InsPdapprove,
  PaysSalaryBusi:PaysSalaryBusi,
  AttFlowVacate:AttFlowVacate,
  PaySalacalc:PaySalacalc,
  PaysMaperiodicTib:PaysMaperiodicTib,
  PaysMaperiodicPro:PaysMaperiodicPro,
  PayCphsdetail:PayCphsdetail,
  OrgNpactmanage:OrgNpactmanage
};
