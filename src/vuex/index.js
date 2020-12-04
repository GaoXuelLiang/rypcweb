/**
 * Created by Aaron on 2017/12/15.
 */
import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import commonPage from "../components/commonPage/comPage";
import btnOperate from "../components/btnAuth/btnState";
import sysData from "../pages/PlatFormManager/systemForm/sysData";
import platRole from "../pages/PlatFormManager/platRolecontact/platRole";
import flowStepData from "../pages/PlatFormManager/platFlowStep/flowStepData";
import platFis from "../pages/platFormManager/platFiscalyear-manage/platFis";
import empPo from "../pages/empManage/empmaster-manage/empPo";
import atsk from "../pages/PlatFormManager/autoTask/atsk";
import platSysMailJS from "../pages/PlatFormManager/platSysmail/platSysMailJS";
import docTemp from "../pages/PlatFormManager/platDocTemplate/docTemp";
import platGetValDefine from "../pages/PlatFormManager/platGetValDefine/platGetValDefine";
import message from "../pages/manageInform/message/message";
import platApproval from "../pages/PlatFormManager/platApproval/platApproval";
import toDoCommon from "../pages/employeePage/toDoSchedule/toDoCommon";
import flowClmkMap from "../pages/common/entryFlow/flowClmkMap";
import huntData from "../pages/talentRecruitment/headhuntingSupplierManage/huntData";
import sysFunctionsJS from "../pages/authorization/sysFunctions/sysFunctionsJS";
import genConfigJS from "../pages/backendConfiguration/genConfiguration/genConfigJS";
import autoCommonPage from "@/components/autoCommonPage/autoCommonPage";
import flowList from "@/pages/common/commonFlowList/flowList";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {},
  modules: {
    app,
    user,
    sysData,
    platRole,
    flowStepData,
    platFis,
    empPo,
    atsk,
    platSysMailJS,
    docTemp,
    platGetValDefine,
    message,
    platApproval,
    toDoCommon,
    flowClmkMap,
    huntData,
    commonPage,
    btnOperate,
    sysFunctionsJS,
    genConfigJS,
    autoCommonPage,
    flowList
  }
});

export default store;
