<template>
    <div :class="['main', skin]">
        <Spin fix
              v-if="isSpinMain"
              size="large"></Spin>
        <div class="left"
             :style="{ width: shrink ? '64px' : '200px' }">
            <div class="logo"
                 v-if="!shrink">
                <img src="../../static/img/zn22logo.png"
                     v-if="this.$global.mt === 'znjs'"
                     width="150" />
                <img src="../../static/img/hx2logo.png"
                     v-if="this.$global.mt === 'xian'"
                     width="110" />
            </div>
            <div class="logo_s"
                 v-else>
                <img src="../../static/img/zn1logo.png"
                     v-if="this.$global.mt === 'znjs'"
                     width="30" />
                <img src="../../static/img/hx1logo.png"
                     v-if="this.$global.mt === 'xian'"
                     width="20" />
            </div>
            <hrmenu class="left"
                    @toggleClick="toggleClick"
                    ref="menu"></hrmenu>
        </div>
        <div class="right"
             :style="{ width: shrink ? '98%' : '85%' }">
            <div class="header">
                <row>
                    <div class="navicon-con">
                        {{ $t("title") }}
                    </div>
                    <div class="header-avator-con">
                        <div class="user-dropdown-menu-con">
                            <Row type="flex"
                                 justify="end"
                                 align="middle">
                                <Poptip class="mainPop"
                                        placement="bottom"
                                        width="300"
                                        style="display: none">
                                    <div class="button-item"></div>
                                    <contact slot="content"
                                             ref="contact"
                                             v-if="isFinish">
                                    </contact>
                                </Poptip>
                                <div class="button-item"
                                     v-show="roleTypes.length > 1">
                                    <Dropdown transfer
                                              trigger="hover"
                                              @on-click="changeRole">
                                        <a href="javascript:void(0)"
                                           class="dropdown_box"
                                           style="">
                                            <i class="el-icon-s-platform icon"></i>
                                            <span class="main-user-name">{{ cur_roleTypeName }}</span>
                                            <Icon type="md-arrow-dropdown"
                                                  size="18"></Icon>
                                        </a>
                                        <DropdownMenu slot="list">
                                            <DropdownItem :name="item.roleTypeCode + ',' + item.roleTypeName"
                                                          v-for="(item, index) in roleTypes"
                                                          :key="index">{{ item.roleTypeName }}
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <span class="line lines"
                                      v-show="companyies.length > 1"></span>
                                <div class="button-item"
                                     v-show="companyies.length > 1">
                                    <Dropdown transfer
                                              trigger="hover"
                                              @on-click="changeCompany">
                                        <a href="javascript:void(0)"
                                           class="dropdown_box"
                                           style="">
                                            <i class="el-icon-menu icon"></i>
                                            <span class="main-user-name">{{ cur_companyName }}</span>
                                            <Icon type="md-arrow-dropdown"
                                                  size="18"></Icon>
                                        </a>
                                        <DropdownMenu slot="list">
                                            <DropdownItem :name="item.companyId + ',' + item.companyName"
                                                          v-for="(item, index) in companyies"
                                                          :key="index">{{ item.companyName }}
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <span class="line"></span>
                                <Avatar icon="person"
                                        :src="userImg"></Avatar>
                                <div class="button-item">
                                    <Dropdown trigger="hover"
                                              @on-click="handleClickUserDropdown"
                                              placement="bottom-end">
                                        <a href="javascript:void(0)"
                                           class="dropdown_box"
                                           style="">
                                            <span class="main-user-name">{{ userName }}</span>
                                            <Icon type="md-arrow-dropdown"
                                                  size="18"></Icon>
                                        </a>
                                        <DropdownMenu slot="list">
                                            <DropdownItem name="userinfo">{{
                                            $t("user.userCenter")
                                        }}</DropdownItem>
                                            <DropdownItem v-show="cur_roleType === '6essmss' || cur_roleType === '3user'"
                                                    name="authorized">{{
                                                    $t("user.authorized")
                                            }}</DropdownItem>
                                            <DropdownItem v-show="cur_roleType === '6essmss'"
                                                          name="salaryPass">{{
                                                    $t("user.salaryPass")
                                            }}</DropdownItem>
                                            <DropdownItem name="skinpeeler">{{
                                                    $t("lang_homePage.menuItem.skinpeeler")
                                            }}</DropdownItem>
                                            <!-- <DropdownItem name="setBusiness">{{$t('lang_homePage.menuItem.businessupport')}}</DropdownItem>
                                            <DropdownItem name="setApproval"
                                                          v-show="cur_roleType === '3user' || cur_roleType === '3user-hrbp'">
                                                {{$t('lang_homePage.menuItem.platsetting')}}
                                            </DropdownItem> -->
                                            <DropdownItem name="loginout">{{
                        $t("user.quit")
                      }}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </Row>
                        </div>
                    </div>
                </row>
                <row style="background: #f0f0f0; padding: 10px 0"
                     v-if="cur_roleType === '3call'">
                    <i-col span="24">
                        <Button type="primary"
                                :disabled="disType">接听电话</Button>
                        <Button type="primary"
                                :disabled="disType">呼出</Button>
                        <Button type="primary"
                                :disabled="disType">保持/取回</Button>
                        <Button type="primary"
                                :disabled="disType">电话转移</Button>
                        <Button type="primary"
                                :disabled="disType">三方通话/会议</Button>
                        <Button type="primary"
                                :disabled="disType">置忙置闲</Button>
                        <Button type="primary"
                                :disabled="disType">自动/人工接听</Button>
                        <Button type="primary"
                                :disabled="disType">咖啡杯</Button>
                        <Button type="primary"
                                @click="checkIn">签入/签出</Button>
                    </i-col>
                </row>
            </div>
            <div class="content">
                <pagetab class="pagetab"
                         :pageTagsList="pageTagsList"
                         :skinColor="skinColor"></pagetab>
                <div class="single-page">
                    <router-view></router-view>
                </div>
                <div id="#hxmarkworddiv"
                     class="hxmarkwordcss">
                    <div v-for="item in 18"
                         class="hxmarkwordcssChild">
                        <div class="hxmarkwordtopcss">{{ userName }}</div>
                        <div class="hxmarkwordtimecss">{{ backDesc }}</div>
                    </div>
                </div>
            </div>
        </div>
        <userinfo v-show="showUserInfo"
                  :isEmpty="isEmpty"
                  ref="userinfo"
                  @close="close"></userinfo>
        <authorized v-show="showAuthorized"
                    ref="authorized"
                    @authclose="authclose"></authorized>
        <salaryPass v-show="showSalaryPass"
                    ref="salaryPass"
                    @salaryclose="salaryclose"></salaryPass>
        <transition name="fade">
            <loginim v-show="showIM"
                     ref="loginim"
                     @closeIM="closeIM"></loginim>
        </transition>
        <el-dialog :title="$t('lang_homePage.platSetting.title')"
                   style="margin: 0 auto !important"
                   width="1000px"
                   :visible.sync="openUpdate"
                   @close="closeAppro">
            <Form ref="form"
                  :model="form"
                  :rules="ruleValidate"
                  :label-width="135"
                  style="border-radius: 10px !important">
                <Row style="display: flex; align-items: flex-start">
                    <i-col span="11">
                        <FormItem :label="$t('lang_homePage.platSetting.platApvset')"
                                  prop="platApvset">
                            <Select v-model="form.platApvset"
                                    style="width: 300px">
                                <Option v-for="(item, index) in Repeattype"
                                        :key="index"
                                        :value="item.paramCode">{{ item.paramInfoCn }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="10"
                           offset="1"
                           style="padding-top: 5px">
                        <span style="font-size: 12px">{{
              $t("lang_homePage.platSetting.apMethod")
            }}</span>
                    </i-col>
                </Row>
                <Row style="display: flex; align-items: flex-start">
                    <i-col span="11">
                        <FormItem :label="$t('lang_homePage.platSetting.grid')"
                                  prop="statusDis">
                            <Select v-model="statusCode"
                                    style="width: 300px">
                                <Option v-for="(item, index) in gridList"
                                        :key="index"
                                        :value="item.paramCode">{{ item.paramInfoName }}
                                </Option>
                            </Select>
                        </FormItem>
                    </i-col>
                </Row>
                <Row style="text-align: right">
                    <Button @click="closeAppro">{{ $t("button.cal") }}</Button>
                    <Button type="primary"
                            @click="savePlatApvset">{{
            $t("button.sav")
          }}</Button>
                </Row>
            </Form>
        </el-dialog>
        <div class="mask"
             v-show="mask"></div>
        <transition>
            <skinpeeler ref="skinpeeler"
                        v-show="skinpeeler"
                        @close="closeSkin"
                        @changeBgSkin="changeBgSkin"></skinpeeler>
        </transition>
        <!-- 审批 -->
        <transition name="fade">
            <commonFlowUpdate v-if="openTestUpd"
                              @close="closeTest"
                              @getAllDataMain="getAllDataMain"
                              ref="commonFlowUpdate"
                              :pkValue="pkValue"
                              :flowId="flowId"
                              :stepId="stepId"
                              :funId="funid"
                              :aprvrelaRecordidAll="aprvrelaRecordidAll"
                              :aprdApprover="aprdApprover"
                              :aprvrelTitle="aprvrelTitle"
                              :aprvrelaApproverid="aprvrelaApproverid"
                              :aprdBillid="aprdBillid"
                              :aprvStepid="aprvStepid"
                              :displayHide="true"
                              :disabledForm="disabled"
                              isType="toDoList">
            </commonFlowUpdate>
        </transition>
    </div>
</template>
<script>
import userinfo from "./useinfo/useinfo";
import authorized from "./useinfo/authorized";
import salaryPass from "./useinfo/salaryPass";
import skinpeeler from "../pages/homePage/skinpeeler";
import hrmenu from "../components/menu/menu";
import pagetab from "../components/pagetab/pagetab";
import message from "../pages/homePage/messageList";
import contact from "../pages/homePage/contentList";
import loginim from "../pages/homePage/loginIM";
import commonFlowUpdate from "@/pages/ansrptManage/toDoListManage/commonFlowUpdate";
import { getDataLevelUserLoginData } from "../axios/axios";

import {
    getDataLevelUserLogin2,
    getDataLevelUserLogin,
    getDataLevelUserLoginNew,
} from "../axios/axios";
import {
    setCookie,
    isSuccess,
    deepCopy,
    bigDecimal,
    getCookie,
} from "../lib/util";
import Bus from "../lib/bus";

export default {
    data () {
        return {
            skinpeeler: false,
            showIM: false,
            showFlag: true,
            isFinish: false,
            isEmpty: false,
            showUserInfo: false,
            showAuthorized: false,
            showSalaryPass: false,
            openUpdate: false,
            shrink: false,
            disType: true,
            userName: this.$store.state.user.name,
            backDesc: "",
            userImg: "",
            cur_company: "",
            cur_roleType: "",
            cur_language: "",
            cur_companyName: "",
            cur_roleTypeName: "",
            cur_languageName: "",
            form: {},
            roleTypes: [],
            companyies: [],
            languages: [
                {
                    lanCode: "CN",
                    lanName: "中文",
                },
                {
                    lanCode: "EN",
                    lanName: "English",
                },
            ],
            userFuns: [],
            Repeattype: [],
            ruleValidate: {
                platApvset: [
                    {
                        required: true,
                        message: this.$t("lang_homePage.platSetting.apMethodDis"),
                        trigger: "blur",
                    },
                ],
            },
            gridList: [],
            statusDis: "",
            statusCode: "",
            isSpinMain: false,
            mask: false,
            skin: "",
            skinColor: "",
            /**
             * 审批
             */
            openTestUpd: false,
            pkValue: "",
            flowId: "",
            stepId: "",
            funid: "",
            aprvrelaRecordidAll: "",
            aprdApprover: "",
            aprvrelTitle: "",
            aprvrelaApproverid: "",
            aprdBillid: "",
            aprvStepid: "",
            dbcdType: "",
        };
    },
    components: {
        hrmenu,
        pagetab,
        userinfo,
        authorized,
        salaryPass,
        skinpeeler,
        message,
        contact,
        loginim,
        commonFlowUpdate,
    },
    created () { },
    mounted () {
        const t = this;
        // this.initWebSocket();
        window.onbeforeunload = function () {
            t.$store.commit("clearAllTags");
        };
        this.getUser();
        this.getBackDesc();
        // this.skin = localStorage.getItem('userThemes') == null ? 'black' : localStorage.getItem('userThemes');
        switch (pubsource.param_mt) {
            case "xian":
                this.skin =
                    localStorage.getItem("userThemes") == null
                        ? "red"
                        : localStorage.getItem("userThemes");
                break;
            case "znjs":
                this.skin =
                    localStorage.getItem("userThemes") == null
                        ? "greenBlack"
                        : localStorage.getItem("userThemes");
                break;
        }
        document.body.className = this.skin + "0";
        t.textColor();
        this.$Notice.config({
            top: 100, //距离顶端高度
            duration: 60,
        });
        console.log(getCookie("_tk"), "_tk");
    },
    computed: {
        funId () {
            return this.$store.state.user.funId;
        },
        disabled () {
            let rtn = false;
            if (this.dbcdType === "02approval") rtn = true;
            return rtn;
        },
    },
    methods: {
        //初始化weosocket
        initWebSocket () {
            let tk = localStorage.getItem("_tk");
            console.log(tk, "_tk");
            const wsuri = `${pubsource.ws}:21729/ws?userId=${localStorage.userId}&tk=${tk}`;
            this.websock = new WebSocket(wsuri);
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;
        },
        //连接建立之后执行send方法发送数据
        websocketonopen () {
            console.log("socket连接成功");
        },
        //连接建立失败重连
        websocketonerror () {
            console.log("socket断开连接");
            this.initWebSocket();
        },
        //数据接收
        websocketonmessage (e) {
            const t = this;
            const redata = JSON.parse(e.data);
            console.log(redata, "redata");
            t.flowId = redata.flowId;
            t.pkValue = redata.dataId;
            t.aprdBillid = redata.dataId;
            t.aprvrelaRecordidAll = redata.recdId;
            t.stepId = redata.stepId;
            t.funId = redata.funId;
            t.aprvStepid = redata.aprvStepid;
            t.aprvrelaApproverid = redata.recUserId;
            t.aprvrelTitle = redata.dbcdTitle;
            t.dbcdType = redatas.dbcdType;
            this.$Notice.open({
                title: `<div style="display:flex;align-items:center"><img style="width:20xp;height:20px;margin-right:5px" src='../../static/img/message.png' alt /><span style="display:inline-block">${redata.dbcdTbname}</span></div>`,
                desc: redata.dbcdTitle,
                render: (h) => {
                    return h(
                        "a",
                        {
                            on: {
                                click: () => {
                                    t.openFlow(redata);
                                },
                            },
                            style: {
                                color: "#666",
                                "line-height": 1.5,
                                "white-space": "normal",
                                "word-break": "break-all",
                                "word-wrap": "break-word",
                                display: "-webkit-box",
                                "-webkit-line-clamp": 2,
                                "text-overflow": "ellipsis",
                                "text-overflow": "-o-ellipsis-lastline",
                                overflow: "hidden",
                                "-webkit-box-orient": "vertical",
                                height: "38px",
                                "overflow-wrap": "break-word",
                            },
                        },
                        redata.dbcdTitle
                    );
                },
                name: redata.id,
                // duration: 5000,
                // top:100
            });
        },
        websocketsend (Data) {
            //数据发送
            this.websock.send(Data);
        },
        websocketclose (e) {
            //关闭
            console.log("断开连接", e);
        },
        checkIn () {
            const t = this;
            const data = {
                _mt: this.$global.mt + "CmutCall.clientOnline",
                userName: "admin",
                pwd: "Aa123456",
                seed: "111",
                status: "1",
                bindTel: "18656595053",
                type: "1",
                funId: "1",
                cno: "5000",
                logType: "签入",
            };
            getDataLevelUserLoginNew(data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        clearIM () {
            closeSocket();
            layer.closeAll(); // 关闭即时通讯
        },
        getAllDataMain () { },
        openFlow (redata) {
            const t = this;
            t.openTestUpd = true;
        },
        closeTest () {
            const t = this;
            Bus.$emit("getAllDataMain");
            t.openTestUpd = false;
        },
        getUser () {
            const t = this;
            t.isSpinMain = true;
            getDataLevelUserLogin2({
                _mt: this.$global.mt + "AuthUserPerm.getSysUserPerm",
                APlanguage: "CN",
                AProleType: "0root",
                APcompanyId: t.companyId,
                APstyle: "0",
            })
                .then((res) => {
                    t.isSpinMain = false;
                    if (isSuccess(res, t)) {
                        if (Object.keys(res.data.content[0]).length !== 0) {
                            setCookie("wtk", res.data.content[0].webToken);
                            t.cur_roleType = res.data.content[0].cur_roleType.roleTypeCode;
                            // t.cur_roleType = '04emp'
                            t.cur_company = res.data.content[0].cur_company.companyId;
                            t.cur_language = res.data.content[0].cur_language.lanCode;
                            t.cur_roleTypeName =
                                res.data.content[0].cur_roleType.roleTypeName;
                            t.cur_companyName = res.data.content[0].cur_company.companyName;
                            t.cur_languageName = res.data.content[0].cur_language.lanName;
                            t.roleTypes = res.data.content[0].roleTypes;
                            //t.languages = res.data.content[0].cur_roleType.languages
                            t.companyies = res.data.content[0].cur_roleType.companyies;
                            t.userFuns = res.data.content[0].userFuns;
                            t.userName = res.data.content[0].usreName;
                            if (res.data.content[0].hasOwnProperty("userImgMin")) {
                                t.userImg =
                                    pubsource.pub_pubf_downlink + res.data.content[0].userImgMin;
                            } else {
                                t.userImg = "../../static/img/header2.png";
                            }
                            t.$refs.menu.subdata(res.data.content[0].userFuns);
                            // t.$store.commit('setLang', t.cur_language === 'CN' ? 'zh-CN' : 'en-US')
                            //              t.$store.commit('setId', res.data.content[0].userId)
                            t.$store.commit(
                                "setCompanyId",
                                res.data.content[0].cur_company.companyId
                            );
                            t.$store.commit(
                                "setSysUseRoleGroup",
                                res.data.content[0].sysUseRoleGroup
                            );
                            t.$store.commit(
                                "setRoleType",
                                res.data.content[0].cur_roleType.roleTypeCode
                            );
                            // t.$store.commit('setRoleType', '04emp')
                            t.$store.commit("clearAllTags");
                            Bus.$emit("setCommonFlag", true);
                            setTimeout(() => {
                                t.$router.push({
                                    path: 'home',
                                    params: {
                                        state: true,
                                    }
                                })
                            }, 1000);
                            t.isFinish = true;
                        } else {
                            t.isEmpty = true;
                            t.showUserInfo = true;
                            t.$refs.userinfo.getInfo();
                            t.$refs.userinfo.getSelect();
                        }
                    }
                })
                .catch(() => {
                    t.isSpinMain = false;
                    //          t.$Modal.error({
                    //            title: this.$t('reminder.err'),
                    //            content: this.$t('reminder.errormessage'),
                    //          })
                });
        },
        getUser2 () {
            const t = this;
            t.isSpinMain = true;
            getDataLevelUserLogin2({
                _mt: this.$global.mt + "AuthUserPerm.getSysUserPerm",
                APlanguage: t.cur_language,
                APcompanyId: t.cur_company,
                AProleType: t.cur_roleType,
                APstyle: "1",
            })
                .then((res) => {
                    t.isSpinMain = false;
                    if (isSuccess(res, t)) {
                        if (Object.keys(res.data.content[0]).length !== 0) {
                            setCookie("wtk", res.data.content[0].webToken);
                            t.cur_roleType = res.data.content[0].cur_roleType.roleTypeCode;
                            t.cur_company = res.data.content[0].cur_company.companyId;
                            //t.cur_language = res.data.content[0].cur_language.lanCode
                            t.cur_roleTypeName =
                                res.data.content[0].cur_roleType.roleTypeName;
                            t.cur_companyName = res.data.content[0].cur_company.companyName;
                            //t.cur_languageName = res.data.content[0].cur_language.lanName
                            t.roleTypes = res.data.content[0].roleTypes;
                            //t.languages = res.data.content[0].cur_roleType.languages
                            t.companyies = res.data.content[0].cur_roleType.companyies;
                            t.userFuns = res.data.content[0].userFuns;
                            t.$refs.menu.subdata(res.data.content[0].userFuns);
                            //t.$store.commit('setId', res.data.content[0].userId)
                            t.$store.commit(
                                "setCompanyId",
                                res.data.content[0].cur_company.companyId
                            );
                            t.$store.commit(
                                "setRoleType",
                                res.data.content[0].cur_roleType.roleTypeCode
                            );
                            t.$store.commit(
                                "setSysUseRoleGroup",
                                res.data.content[0].sysUseRoleGroup
                            );
                            t.$store.commit("clearAllTags");
                            Bus.$emit("setCommonFlag", true);
                            Bus.$emit("getAllDataMain");
                            t.$router.push("/home");
                            t.isFinish = true;
                        } else {
                            t.isEmpty = true;
                            t.showUserInfo = true;
                            t.$refs.userinfo.getInfo();
                            t.$refs.userinfo.getSelect();
                        }
                    }
                })
                .catch(() => {
                    t.isSpinMain = false;
                    //          t.$Modal.error({
                    //            title: this.$t('reminder.err'),
                    //            content: this.$t('reminder.errormessage'),
                    //          })
                });
        },
        closeAppro () {
            this.openUpdate = false;
        },
        /*
         * 改变角色
         * */
        changeRole (name) {
            const arr = name.split(",");
            if (arr[1] != "3user") {
                layer.closeAll();
                //          this.clearIM();
                if (this.lineChatPageShow) {
                    this.$refs.lineChatLayOut.close();
                    this.showFlag = true;
                    this.lineChatPageShow = false;
                }
            }
            this.cur_roleTypeName = arr[1];
            this.cur_roleType = arr[0];
            for (let i = 0; i < this.roleTypes.length; i++) {
                if (this.roleTypes[i].roleTypeCode === arr[0]) {
                    this.cur_company = this.roleTypes[i].companyies[0].companyId;
                }
            }
            Bus.$emit("stopRequest", false);
            this.getUser2();
            //        this.cur_roleType = name
        },
        /*
         * 改变公司
         * */
        changeCompany (name) {
            const arr = name.split(",");
            this.cur_companyName = arr[1];
            this.cur_company = arr[0];
            this.getUser2();
        },
        toggleClick (t) {
            this.shrink = t;
        },
        handleClickUserDropdown (name) {
            if (name === "userinfo") {
                this.showUserInfo = true;
                this.mask = true;
                this.$refs.userinfo.getInfo();
                this.$refs.userinfo.getSelect();
            } else if (name === "skinpeeler") {
                this.skinpeeler = true;
            } else if (name === "setApproval") {
                this.getSelect();
                this.getPlatApvset();
            } else if (name === "setBusiness") {
                //          console.log(this.$refs.contact)
                this.$refs.contact.modal2 = true;
                this.$refs.contact.getListData();
            } else if (name === "authorized") {
                this.showAuthorized = true;
                this.mask = true;
                this.$refs.authorized.getAuthId();
            } else if (name === "salaryPass") {
                this.showSalaryPass = true;
                this.mask = true;
                this.$refs.salaryPass.getSalaryPass();
            } else if (name === "loginout") {
                const t = this;
                Bus.$emit("stopRequest", false);
                getDataLevelUserLogin2({ _mt: this.$global.mt + "UserInfo.logout" })
                    .then((res) => {
                        this.clearIM();
                        localStorage.removeItem("soket_state");
                        localStorage.removeItem("layim");
                        this.$store.commit("setStatus", false);
                        window.location.reload();
                        this.$router.push("loginmain/login");
                        socket.onclose();
                        console.log(socket);
                    })
                    .catch(() => {
                        this.clearIM();
                        t.$router.push("loginmain/login");
                    });
            }
        },
        // 换肤
        changeBgSkin (skin, skinColor, name) {
            const t = this;
            t.skin = skin;
            t.skinColor = skinColor;
            document.body.className = name + "0";
            localStorage.setItem("userThemes", name);
        },
        // 关闭换肤
        closeSkin () {
            const t = this;
            t.skinpeeler = false;
        },
        // Text color
        textColor () {
            let color = localStorage.getItem("userThemes");
            switch (color) {
                case "blue":
                    this.skinColor = "#3394FF";
                    break;
                case "green":
                    this.skinColor = "#2FAF98";
                    break;
                case "navyBlue":
                    this.skinColor = "#3B5999";
                    break;
                case "red":
                    this.skinColor = "#CC4649";
                    break;
                case "purple":
                    this.skinColor = "#37385C";
                    break;
                case "greenBlack":
                    this.skinColor = "#358559";
                    break;
                default:
                    this.skinColor = "#2d8cf0";
                    break;
            }
        },
        // changeSkin (name) {
        //     if (!name) {
        //         return
        //     } else {
        //         switch (name) {
        //             case 'blue':
        //                 this.skin = 'blue'
        //                 this.skinColor = '#3394FF'
        //                 break;
        //             case 'green':
        //                 this.skin = 'green'
        //                 this.skinColor = '#2FAF98'
        //                 break;
        //             case 'navyBlue':
        //                 this.skin = 'navyBlue'
        //                 this.skinColor = '#3B5999'
        //                 break;
        //             case 'purple':
        //                 this.skin = 'purple'
        //                 this.skinColor = '#37385C'
        //                 break;
        //             default:
        //                 this.skin = ''
        //                 this.skinColor = '#2d8cf0'
        //                 break;
        //         }
        //         document.body.className = name + '0'
        //         localStorage.setItem('userThemes', name)
        //         let params = {
        //             _mt:  this.$global.mt+'UserInfo.updThemes',
        //             funId: localStorage.userId,
        //             logType: '主题颜色',
        //             themes: name
        //         }
        //         getDataLevelUserLogin2(params).then((res) => {
        //             console.log(res)
        //         }).catch(() => {

        //         }).finally(() => {

        //         })
        //     }
        // },
        /**
         * 获取审批设置
         * */
        getPlatApvset () {
            const t = this;
            const data = {
                _mt: this.$global.mt + "PlatPersonalset.getByUserEmp",
            };
            getDataLevelUserLogin(data)
                .then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].platEmpid) {
                            this.form = res.data.content[0];
                            if (!this.form.platApvset) {
                                this.form.platApvset = "01stepbystep";
                            }
                            this.openUpdate = true;
                        } else {
                            t.$Modal.warning({
                                title: this.$t("reminder.remind"),
                                content: this.$t("lang_homePage.platSetting.noEmpleeRemind"),
                            });
                        }
                    }
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage"),
                    });
                });
        },
        savePlatApvset () {
            const t = this;
            const data = deepCopy(t.form);
            data._mt = this.$global.mt + "PlatPersonalset.addOrUpd";
            data.APfunId = "1";
            data.APlogType = "保存审批设置数据";
            data.APplatSudokuset = t.statusCode;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getDataLevelUserLoginNew(data)
                        .then((res) => {
                            if (isSuccess(res, t)) {
                                this.closeAppro();
                                Bus.$emit("savePlatApvset");
                                t.$Modal.success({
                                    title: this.$t("reminder.suc"),
                                    content: this.$t("lang_homePage.platSetting.setSuccess"),
                                });
                            }
                        })
                        .catch(() => {
                            t.$Modal.error({
                                title: this.$t("reminder.err"),
                                content: this.$t("reminder.errormessage"),
                            });
                        });
                }
            });
        },
        close () {
            this.showUserInfo = false;
            this.mask = false;
        },
        authclose () {
            this.showAuthorized = false;
            this.mask = false;
        },
        salaryclose () {
            this.showSalaryPass = false;
            this.mask = false;
        },
        closeChat () {
            const t = this;
            t.showChat = false;
            t.lineChatPageShow = true;
            //        this.$refs.lineChatLayOut.close()
        },
        setCurrentsession (currentsessionId) {
            const t = this;
            //        alert(currentsessionId + '111111')
            t.$refs.lineChatLayOut.currentsession = currentsessionId;
        },
        changeMainRefer () {
            const t = this;
            t.showChat = true;
            t.lineChatPageShow = false;
        },
        changeTakeMsg () {
            const t = this;
            t.chatMsgPopShow = true;
        },
        changeChatOut () {
            const t = this;
            t.lineChatLayOutShow = true;
        },
        closeMsgPop () {
            const t = this;
            t.chatMsgPopShow = false;
            t.lineChatLayOutShow = true;
        },
        chatOutClose () {
            const t = this;
            t.showChat = true;
            t.lineChatPageShow = false;
            t.lineChatLayOutShow = false;
            t.chatMsgPopShow = false;
            t.showChat = false;
            t.showFlag = true;
        },
        changeUser () {
            const t = this;
            t.lineChatLayOutShow = true;
            t.$refs.lineChatLayOut.chatScrollTop();
        },
        closeLayOut () {
            const t = this;
            t.lineChatLayOutShow = false;
        },
        checkTag (name) {
            const openpageHasTag = this.pageTagsList.some((item) => {
                if (item.name === name) {
                    return true;
                }
                return false;
            });
            if (!openpageHasTag) {
                //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                //          util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {})
            }
        },
        upLayIM () {
            //打开IM登录
            const t = this;
            //改为直接打开面板
            t.$refs.loginim.loginIM();
            //				this.showIM = true
        },
        closeIM () {
            //关闭IM登录
            this.showIM = false;
        },
        /**
         * 下拉参数 personalapvset
         */
        getSelect () {
            const t = this;
            getDataLevelUserLogin({
                _mt: this.$global.mt + "BaseParamInfo.getSelectValue",
                APtypeCode: "personalapvset,ninePalaceType",
            })
                .then((res) => {
                    if (isSuccess(res, t)) {
                        t.Repeattype = res.data.content[0].value[0].paramList;
                        t.gridList = res.data.content[0].value[1].paramList;
                        t.statusDis = t.gridList[1].paramInfoName;
                        t.statusCode = t.gridList[1].paramCode;
                    }
                })
                .catch(() => {
                    this.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage"),
                    });
                });
        },
        getBackDesc () {
            const t = this;
            getDataLevelUserLogin2({
                _mt: this.$global.mt + "BaseCompany.getById",
                APid: "1000",
                APffk: `gec1`,
            })
                .then((res) => {
                    if (isSuccess(res, t)) {
                        t.backDesc = res.data.content[0].compBkdesc;
                        //console.log(res)chume
                    }
                })
                .catch(() => {
                    //          t.$Modal.error({
                    //            title: this.$t('reminder.err'),
                    //            content: this.$t('reminder.errormessage'),
                    //          })
                });
        },
    },
    computed: {
        pageTagsList () {
            return this.$store.state.app.pageOpenedList;
        },
        companyId () {
            return this.$store.state.user.companyId;
        },
    },
    created () {
        // 显示打开的页面的列表
        this.$store.commit("setOpenedList");
    },
    watch: {
        $route () {
            //        console.log(to,from)
        },
    },
    destroyed () {
        // this.websock.onclose() //离开路由之后断开websocket连接
        // this.$Notice.destroy()
    },
};
</script>
<style>
.mainPop .ivu-poptip-inner .ivu-poptip-body {
    padding: 0;
}
</style>
<style lang="scss" scoped>
@import "~@/sass/skin.scss";
$headerH: 47px;
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.main {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    .left {
        background: #070e1c;
        display: flex;
        flex-direction: column;
        .logo {
            padding: 5px 0;
            font-size: 32px;
            width: 200px;
            height: 47px;
            text-align: center;
            color: #fff;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #032b50;
        }
        .logo_s {
            height: 47px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .logo:hover {
            cursor: pointer;
            transition: all 0.3s;
            background-color: rgba(255, 255, 255, 0.1);
        }
        .button-item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 47px;
            padding: 0 20px 0 10px;
            min-width: 50px;
            color: #fff;
        }

        .button-item:hover {
            cursor: pointer;
            transition: all 0.3s;
            // background-color: rgba(255, 255, 255, 0.1);
        }
    }
    .right {
        flex-grow: 1;
        height: 100%;
        // transition: 0.2s;
        .header {
            width: 100%;
            position: relative;
            box-shadow: 0px -1px 0px 0px rgba(230, 230, 230, 1);
            .navicon-con {
                font-size: 20px;
                color: #002548;
                line-height: 47px;
                height: 47px;
                font-weight: 900;
                margin-left: 20px;
                box-shadow: 0px -1px 0px 0px rgba(230, 230, 230, 1);
            }
            .line {
                width: 1px;
                height: 32px;
                background: #ccc;
                margin-right: 20px;
            }
            .lines {
                margin-right: 4px;
            }
            .header-avator-con {
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                line-height: 100%;
                .user-dropdown-menu-con {
                    height: 100%;
                }
            }

            .main-user-name {
                color: #525252;
                font-size: 14px;
            }
        }
        .content {
            height: calc(100% - 47px);
            overflow-x: hidden;
            background-color: #f5f6f8;

            .pagetab {
                height: 46px;
                border-bottom: #e5e5e5 1px solid;
            }

            .single-page {
                margin: 10px;
                height: calc(100% - 66px);
                overflow: auto;
            }

            .hxmarkwordcss {
                opacity: 0.25;
                /*font-weight: bold;*/
                text-align: center;
                z-index: 2147483647;
                pointer-events: none;
                /*display: block;*/
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0%;
                left: 0%;
                padding-left: 10%;
                padding-top: 5%;
                display: flex;
                flex-wrap: wrap;

                .hxmarkwordcssChild {
                    transform: rotate(-40deg);
                    -ms-transform: rotate(-40deg);
                    -webkit-transform: rotate(-40deg);
                    width: 200px;
                    height: 40px;
                }
            }

            .hxmarkwordtopcss {
                font-size: 12px;
                color: #e2e2e2;
                color: rgba(0, 0, 0, 0.21);
            }

            .hxmarkwordtimecss {
                font-size: 12px;
                color: #e2e2e2;
                color: rgba(0, 0, 0, 0.21);
            }

            .hxmarkwordbottomcss {
                font-size: 12px;
                /*color: #8d8d8d;*/
                /*color: #e2e2e2;*/
                color: rgba(0, 0, 0, 0.21);
            }
        }
    }
}

.button-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 47px;
    padding: 0 10px 0 10px;
    min-width: 50px;
    color: #fff;
    .dropdown_box {
        // display: block;width: 100%;height: 47px;line-height: 47px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 47px;
        line-height: 47px;
        .icon {
            // height: 47px;
            // line-height: 47px;
            font-size: 16px;
            margin-right: 5px;
        }
    }
}

.button-item:hover {
    cursor: pointer;
    transition: all 0.3s;
    background-color: rgba(255, 255, 255, 0.1);
}

.ivu-poptip-body {
    padding: 0;
}

.ivu-select-item {
    font-size: 12px !important;
    /*color: #495060 !important;*/
}

/deep/ .ivu-select-item {
    font-size: 12px !important;
    /*color: #495060 !important;*/
}

.ivu-dropdown-item {
    font-size: 12px !important;
}

/deep/ .ivu-dropdown-item {
    font-size: 12px !important;
}
/deep/ .ivu-dropdown .ivu-select-dropdown {
    top: 43px;
}
.header /deep/ .ivu-icon-md-arrow-dropdown {
    color: #999999;
}
.mainPop .ivu-poptip-inner .ivu-poptip-body {
    padding: 0;
}
/deep/ .ivu-radio-group-small .ivu-radio-wrapper-checked {
    background: rgba(45, 140, 240, 1);
    color: #fff;
}
/deep/
    .ivu-radio-group-small
    .ivu-radio-group-button
    .ivu-radio-wrapper-checked:hover {
    color: #fff;
}
.v-enter {
    opacity: 0;
}
.v-enter-active {
    transition: all 0.3s ease;
}
.v-leave-to {
    opacity: 0;
    transform: scale(0);
}
.v-leave-active {
    transition: all 0.5s ease;
}
// 暂无数据
/deep/ .ivu-table-wrapper {
    /deep/ .ivu-table-tip {
        span {
            display: inline-block;
            width: 100%;
            #noData {
                background: url(/static/background/noData_black.png) no-repeat
                    center center;
                width: 100%;
                height: 250px;
            }
        }
    }
}
/deep/ .el-menu-item:focus {
    background: none !important;
}
/deep/ .ivu-tag .ivu-icon-md-home {
    color: rgba(45, 140, 240, 1);
}
</style>
