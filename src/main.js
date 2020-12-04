/*
 * @Author: chneY
 * @Date: 2020-07-27 10:44:20
 * @Last Modified by: chenY
 * @Last Modified time: 2020-09-29 13:31:26
 */

import Vue from "vue";
import router from "./router";
import iView from "view-design";
import App from "./App";
import store from "./vuex";
import "@/local/index";
import "babel-polyfill";
import "view-design/dist/styles/iview.css";
import "@/assets/iconfont/iconfont.css";
import useElement from "@/uiComponents";
import MyPlugin from "@/plugins/plugins.js";
import echarts from 'echarts';
import "@/lib/common";
import "@/lib/layui";
import pinyin from 'js-pinyin'
Vue.config.productionTip = false;
// Vue.prototype.$echarts = echarts;
Vue.use(iView);
Vue.use(MyPlugin);
useElement(Vue);
new Vue({
    el: "#app",
    router,
    store: store,
    template: "<App/>",
    components: { App }
});

