/*
 * @Author: chneY
 * @Date: 2020-07-27 10:36:21
 * @Last Modified by: chenY
 * @Last Modified time: 2020-10-22 15:15:27
 */

import jsp from "jsplumb"; //流程
import echarts from "echarts"; //图表
import isIE from "@/lib/isIE"; //Ie
import btnControl from "@/lib/btnControl"; //按钮权限
// import autoSearchtable from "@/components/searchTableComponents/autoSearchtable.vue"; //弹出搜索框
import { resize } from "@/lib/tableResize"; // 表格自适应
import directives from "@/directives/index"; //自定义指令
export default {
    install (Vue, options) {
        Vue.prototype.$global = {
            mt: pubsource.param_mt, //项目请求接口的BaseUrl
            paramsName: pubsource.paramsName
        };
        Vue.prototype.$jsplumb = jsp.jsPlumb;
        Vue.prototype.$util = jsp.jsPlumbUtil;
        Vue.prototype.$echarts = echarts;
        Vue.prototype.$resize = resize;
        Vue.prototype.isIE = isIE;
        Vue.prototype.btnControl = btnControl;
        //Vue.component("autoSearchtable", autoSearchtable); //全局自动弹出组件
        Vue.directive("drag", directives["draggable"]); //拖拽
    }
};
