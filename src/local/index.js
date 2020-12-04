/*
 * @Author: chneY
 * @Date: 2020-07-27 10:35:58
 * @Last Modified by:   chenY
 * @Last Modified time: 2020-07-27 10:35:58
 */
import Vue from "vue";
import iView from "view-design";
import Locales from "./lang";
import zhLocale from "view-design/src/locale/lang/zh-CN";
import enLocale from "view-design/src/locale/lang/en-US";
import VueI18n from "vue-i18n";
// 自动设置语言
const navLang = navigator.language;
const localLang = navLang === "zh-CN" || navLang === "en-US" ? navLang : false;
const lang = window.localStorage.lang || localLang || "zh-CN";
Vue.use(VueI18n);
Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales["zh-CN"]);
const mergeEN = Object.assign(enLocale, locales["en-US"]);
Vue.locale("zh-CN", mergeZH);
Vue.locale("en-US", mergeEN);
