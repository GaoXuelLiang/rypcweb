/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-24 16:54:57
 * @LastEditTime: 2020-11-24 17:26:28
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by Aaron on 2017/12/15.
 */
import { GetQueryString } from "../../lib/util";

const user = {
  state: {
    name: localStorage.name,
    roleType: localStorage.roleType,
    companyId: localStorage.companyId,
    funId: "",
    funCode: "",
    childFunId: "",
    childFunCode: '',
    childsChildFunId:'',
    sysUseRoleGroup: "",
    userId: localStorage.userId,
    // setId: '',
    sysUsempid: localStorage.sysUsempid,
    tk: "",
    status: true,
    commonFlag: false,
    masterPublicId: "", // 主子表页面调用
    masterPublicList: false, // 主子表列表的显示隐藏
    userThemes: localStorage.userThemes,
    userColor:localStorage.myColors,
    // 新员工入职路由
    entryLoginUrl:'',
    //empid
    empId:'',
    empName: '',
  },
  mutations: {
    setUserEmpId(state,param){
      state.empId = param
    },
    setUserEmpName(state,param) {
      state.empName = param
    },
    setMyColor(state,param){
      state.userColor = param;
      localStorage.myColors = state.userColor;
    },
    setMasterPublicId(state, param) {
      state.masterPublicId = param;
    },
    setMasterPublicListShow(state) {
      state.masterPublicList = true;
    },
    setMasterPublicListHide(state) {
      state.masterPublicList = false;
    },
    setEmpIdd(state, param) {
      state.sysUsempid = param;
      localStorage.sysUsempid = state.sysUsempid;
    },
    setUserId(state, param) {
      state.userId = param;
      localStorage.userId = state.userId;
    },
    setuserThemes(state, param) {
      state.userThemes = param;
      localStorage.userThemes = state.userThemes;
    },
    // setId(state, param) {
    //   state.setId = param
    //   localStorage.setId = state.setId
    // },
    setCompanyId(state, param) {
      state.companyId = param;
      localStorage.companyId = state.companyId;
    },
    setName(state, param) {
      state.name = param;
      localStorage.name = state.name;
    },
    setFunId(state, param) {
      state.funId = param;
    },
    // 设置保存新员工路由
    setEntryLoginUrl(state, param) {
      state.entryLoginUrl = param;
      localStorage.entryLoginUrl = state.entryLoginUrl;
    },
    setFunCode(state, param) {
      state.funCode = param;
    },
    setRoleType(state, param) {
      state.roleType = param;
      localStorage.roleType = state.roleType;
    },
    setSysUseRoleGroup(state, param) {
      state.sysUseRoleGroup = param;
    },
    setChildFunId(state, param) {
      state.childFunId = param;
    },
    // 子表的funcode
    setChildFunCode (state, param) {
      state.childFunCode = param
    },
    // 子表的子表
    setChildsChildFunId(state, param) {
      state.childsChildFunId = param;
    },
    setTk(value) {
      state.tk = value;
    },
    setStatus(value) {
      state.status = value;
    },
    setCommonFlag(value) {
      state.commonFlag = value;
    }
  }
};

export default user;
