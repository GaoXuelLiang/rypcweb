 <template>
    <div class="board"
         style="width: 100%">
        <div class="home"
             style="margin:-10px">
            <grid-layout :layout="layoutData"
                         :col-num="12"
                         :row-height="layoutConfig.height"
                         :is-draggable="layoutConfig.dialogVisible"
                         :is-resizable="layoutConfig.dialogVisible"
                         :is-mirrored="false"
                         :vertical-compact="true"
                         :margin="[10, 10]"
                         :use-css-transforms="true"
                         @layout-updated="layoutUpdatedEvent">
                <grid-item v-for="(item,index) in layoutData"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                           :is-draggable="item.draggable"
                           :is-resizable="item.resizable"
                           :key="item.i">
                    <component :is="item.component"></component>
                </grid-item>
            </grid-layout>
            <div class="layout-tools">
                <span class="tools-item"
                      v-show="operBtn"
                      @click="cancelLayout">取消</span>
                <!-- <span class="tools-item"
                      v-show="operBtn"
                      @click="saveLayout">保存</span> -->
                <span class="tools-item"
                      v-show="operBtn"
                      @click="saveLayout1">保存</span>
                <span class="tools-item custom"
                      @click="editLayout">
                    <img src="../../../static/img/home/tools-edit.png">
                    自定义
                </span>
            </div>
            <!-- <toDoList v-if="roleType==='3user' || roleType==='3user-hrbp' || roleType==='4coe'"></toDoList>
            <emailCount v-if="roleType==='1admin'"></emailCount>
            <quickMove :roleType="roleType"
                       height="short"
                       v-if="roleType==='3user'||roleType==='1admin' || roleType==='3user-hrbp' || roleType==='4coe'"></quickMove>
            <quickMove :roleType="roleType"
                       height="height"
                       v-if="roleType==='0root'"></quickMove>
            <calendarList :roleType="roleType"></calendarList>
            <message v-if="roleType==='1admin'"></message>
            <employeeId v-if="roleType==='1admin'"></employeeId>
            <mailMsg :roleType="roleType"
                     v-if="roleType==='3user'||roleType==='1admin' || roleType==='3user-hrbp' || roleType==='4coe'"></mailMsg>
            <question v-if="roleType==='3user' || roleType==='3user-hrbp' || roleType==='4coe'"></question>
            <employee v-if="roleType==='3user' || roleType==='3user-hrbp' || roleType==='4coe'"></employee>
            <bookstore v-if="roleType==='3user' || roleType==='3user-hrbp' || roleType==='4coe'"></bookstore>
            <tools v-if="roleType==='3user' || roleType==='3user-hrbp' || roleType==='4coe'"></tools>
            <userManage v-if="roleType==='0root'"></userManage>
            <autoCount v-if="roleType==='1admin'"></autoCount>
            <autoZxCount v-if="roleType==='1admin'"></autoZxCount> -->
        </div>
    </div>
</template>
 <script>
import layoutData from "./layoutData.json";
import VueGridLayout from "vue-grid-layout";
import calendarList from "./calendarList";
import toDoList from "./toDoList";
import quickMove from "./quickMove"; // 快捷操作
import mailMsg from "./mailMsg";
import employee from "./employee";
import tools from "./tools";
import userManage from "./userManage";
import emailCount from "./emailCount";
import employeeId from "./employeeId";
import message from "./message";
import autoCount from "./autoCount";
import autoZxCount from "./autoZxCount";
import {
    getDataLevelUserLogin,
    getDataLevelUserLogin2,
    getDataLevelUserLoginNew,
    getDataLevelUserLogin3,
    getDataLevelUserLoginData,
} from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
//grid-layout
//  作用        数据类型          必填        备注
//===================================================
// 网格初始化布局  数组       必填  每一项都必须具有i、x、y、w和h属性 属性用作什么 见下方
//:layout.sync="layout"
// 表示网格有多少列 数字           非必填    默认为12
//:col-num="12"
// 表示一行的高度(以像素为单位) 数字     非必填     默认值为150
//:row-height="30"
// 表示网格中最大行数 数字          非必填     默认为无穷大
//:maxRows="20"
// 表示网格项数是否可以拖动 Boolean        非必填     默认为true
//:is-draggable="true"
// 表示网格是否可以改变带大小 Boolean      非必填     默认为true
//:is-resizable="true"
// RTL/LTR 的转换 Boolean      非必填 默认为false
//:is-mirrored="false"
// 容器是否适应内部变化 Boolean  非必填 默认为 true
//:autoSize="ture"
// 垂直方向上 是否应该紧凑布局 Boolean 非必填 默认为true
//:vertical-compact="true"
// 网格之间的边距 两个数字组成的数组 第一个数字为水品距离 第二个为垂直距离 非必填 默认值为 [10,10]
//:margin="[10, 10]"
// 是否使用css的transforms来排版 非必填 为false时 使用后采用定位方式来布局 默认为true
//:use-css-transforms="true"
// 布局是否应响应窗口宽度 非必填 默认false 为true时 会出现一些布局错乱的问题
//:responsive="false"
//布局是否应响应为响应布局定义的窗口宽度断点 对象类型 非必填 默认值
// { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
//:breakpoints=" { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }"
// 定义每个断点的列数
//:cols="{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }"
// 生命周期
//    @layout-created="layoutCreatedEvent"  // 布局创建事件
//     @layout-before-mount="layoutBeforeMountEvent" // 布局安装以前事件
//     @layout-mounted="layoutMountedEvent"    // 布局安装事件
//     @layout-ready="layoutReadyEvent"    // 布局准备活动
//     @layout-updated="layoutUpdatedEvent" // 格子位置 大小更新

//grid-item
//   :x="layoutData[0].x" // 横向距离
//   :y="layoutData[0].y" // 纵向距离
//   :w="layoutData[0].w" // 宽度
//   :h="layoutData[0].h" // 高度
//   :i="layoutData[0].i" // 唯一值 （重复时设置会导致一块放大或缩小）string类型
//   @resize="resizeEvent" // 当该元素 被放大缩小触发的事件
//   @move="moveEvent" // 该元素移动时 触发的事件
//   @resized="resizedEvent" // 放大缩小结束 触发事件 注意:必须当大小相对上一次发生改变结束时才会触发
//   @moved="movedEvent" // 移动结束触发 注意:只有当位置相对上一次发生改变才会触发
// i: "0", // 索引值 必填
// h: 4,   // 高度   必填
// w: 7,   // 宽度   必填
// x: 2,   // x 轴距离 必填
// y: 0,   // y轴距离 必填
// minW:5  // 最小宽度 当 w的值小于minW时 采用minW的值
// minH:3  // 同上
// maxW:8  // 的最大宽度。如果w大于maxW，那么w将被设置为maxW。
// maxH:6  // 同上
// isDraggable:true // 单独控制这一个盒子是否可以拖动 未填写 继承父元素的 非必填
// isResizable:true // 单独控制这一个盒子是否可以调整大小 未填写 继承父元素的 非必填
// static:false // 这个盒子是静态的  不能被其他元素改变位置 会被覆盖在底部
// dragIgnoreFrom: '' // 属性这值为css 选择器 项的哪些元素不应触发项的拖动事件// 具体不知道干嘛的 没有用到
// dragAllowFrom:'' // 属性这值为css 选择器 项的哪些元素应触发项的拖动事件 // 文档这样写的
// resizeIgnoreFrom:''//属性这值为css 选择器 表示项的哪些元素不应触发项的调整大小事件。//来自文档翻译
export default {
    data () {
        return {
            // 布局数据
            layoutData: [],
            //布局配置
            layoutConfig: {
                height: 50, // 默认高度
                dialogVisible: false, // 是否可拖拽或改变大小
            },
            //操作按钮显示
            operBtn: false,
            //自定义布局数据
        };
    },
    components: {
        GridLayout,
        GridItem,
        calendarList,
        toDoList,
        quickMove,
        mailMsg,
        employee,
        tools,
        userManage,
        emailCount,
        employeeId,
        autoCount,
        message,
        autoZxCount,
    },
    computed: {
        //角色权限
        roleType () {
            return this.$store.state.user.roleType;
        },
    },
    methods: {
        //初始化
        init () {

            const t = this;
            let data = {
                _mt: this.$global.mt + "BaseUsermod.getList",
                APlogType: "获取列表",
                userId: localStorage.getItem("userId") || "",
                APterraceType: this.roleType
                // companyId: localStorage.getItem("companyId") || "",
            };
            getDataLevelUserLoginData(data)
                .then((res) => {
                    if (isSuccess(res, t)) {
                        let data = res.data.content[0].value;
                        if (data.length) {
                            this.layoutData = data.map((item, index) => {
                                return {
                                    i: String(index),
                                    component: item.modIdDis,
                                    h: Number(item.usermodHeight),
                                    w: Number(item.usermodWidth),
                                    x: Number(item.usermodXdistance),
                                    y: Number(item.usermodYdistance),
                                    userId: item.userId,
                                    modId: item.modId,
                                    id: item.id,
                                    companyId: item.companyId,
                                };
                            });
                        }
                    }
                })
                .catch(() => { });

            // this.layoutData = layoutData.mainData
        },
        //格子位置更新
        layoutUpdatedEvent (val) {
            console.log(val, "val");
        },
        //自定义布局
        editLayout () {
            this.operBtn = true;
            this.layoutConfig.dialogVisible = true;
        },
        //取消自定义布局
        cancelLayout () {
            this.operBtn = false;
            this.layoutConfig.dialogVisible = false;
        },
        //保存自定义布局
        saveLayout1 () {
            const t = this;
            const data = t.layoutData.map((item) => {
                return {
                    usermodWidth: String(item.w),
                    usermodHeight: String(item.h),
                    usermodXdistance: String(item.x),
                    usermodYdistance: String(item.y),
                    modId: item.modId,
                    userId: item.userId,
                    companyId: item.companyId,
                    id: item.id,
                };
            });
            let params = {
                _mt: this.$global.mt + "BaseUsermod.addOrUpd",
                APlogType: "保存",
                APdata: JSON.stringify(data),
            };

            getDataLevelUserLoginData(params)
                .then((res) => {
                    try {
                        if (isSuccess(res, t)) {
                            // if (res.data.content[0].value == "1") {
                            this.operBtn = false;
                            this.layoutConfig.dialogVisible = false;
                            t.$Modal.success({
                                title: this.$t("reminder.suc"),
                                content: this.$t("reminder.savsuccess"),
                            });
                            // }
                        }
                    } catch (err) {
                        t.$Modal.error({
                            title: this.$t("reminder.err"),
                            content: this.$t("reminder.errormessage"),
                        });
                    }
                })
                .catch(() => {
                    t.$Modal.error({
                        title: this.$t("reminder.err"),
                        content: this.$t("reminder.errormessage"),
                    });
                });
        },
    },
    mounted () {
        setTimeout(() => {
            this.init();
        }, 800)
    },

};
</script>
 <style lang="scss" scoped>
.layout-tools {
    position: fixed;
    right: 2%;
    bottom: 15%;
    display: flex;
    flex-direction: column;
    .tools-item {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        text-align: center;
        color: #000;
        line-height: 50px;
        margin-bottom: 8px;
        box-shadow: 0 0 5px #ccc;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.6);
        transition: 0.3s;
        &:hover {
            background: rgba(255, 255, 255, 1);
        }
    }
    .custom {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 1;
        background: rgba(81, 163, 255, 1);
        color: #fff;
        img {
            width: 14px;
            height: 14px;
            margin-bottom: 3px;
        }
        &:hover {
            background: rgba(81, 163, 255, 1);
        }
    }
}
</style>
