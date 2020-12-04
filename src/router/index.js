import Vue from "vue";
import main from "@/pages/main";
import store from "@/vuex/index";
import home from "@/pages/homeAll/homeAll";
import authorization from "./authorization";
import platform from "./platform";
import Router from "vue-router";
import root from "./root";
import login from "./login";
import base from "./base";
import userinfo from "./userinfo";
import manageInform from "./manageInform";
import employee from "./employee";
import common from "./common";
import emp from "./emp";
import ansrpt from "./ansrpt";
import talentAssessManage from "./talentAssessManage";
import timeManageModul from "./timeManageModul";
import traintest from "./traintest";
import editPage from "./editPage";
// import hometest from '@/pages/homePage/home'
import reportManagement from "./reportManagement";
import oatodohandle from "./oatodohandle";
import backendConfiguration from "./backendConfiguration";
import autoPage from "./autoPage";
import autoPageZnjs from "./autoPageZnjs";
import autoPageHxjs from "./autoPageHxjs";
import individualStaff from './individualStaff'
import individualStaffs from './individualStaffs'
import largeScreen from './largeScreen'
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess } from "@/lib/util";
Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err);
};
const router = new Router({
    // base: '/tshrssc3/',
    routes: [
        {
            path: "/",
            name: "main",
            component: main,
            children: [
                {
                    path: "home",
                    name: "home",
                    component: home
                },

                ...root,
                ...authorization,
                ...backendConfiguration,
                ...platform,
                ...base,
                ...userinfo,
                ...manageInform,
                ...employee,
                ...common,
                ...ansrpt,
                ...talentAssessManage,
                ...timeManageModul,
                ...traintest,
                // ...hometest
                ...editPage,
                ...reportManagement,
                ...autoPage,
                ...autoPageZnjs,
                ...autoPageHxjs,
                // ...individualStaff
            ]
        },
        ...emp,
        ...login,
        ...largeScreen,
        ...oatodohandle,
        ...individualStaff,
        ...individualStaffs,
    ]
});
router.beforeEach((to, from, next) => {
    to.meta.keepAlive = true;
    if (to.query.id === undefined) {
        store.commit("setFunId", "2");
    } else {
        store.commit("setFunId", to.query.id);
    }
    // 新开页面title修改
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
router.afterEach((to, from) => {
    if (to.query.id === undefined) {
        store.commit("setFunId", "2");
    } else {
        store.commit("setFunId", to.query.id);
    }
    store.commit("setFunCode", to.query.code);
});
export default router;
