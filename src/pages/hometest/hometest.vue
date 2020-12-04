 <template>
    <div class="board">
        <div class="home">
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
                           :is-draggable="layoutConfig.dialogVisible?item.draggable:false"
                           :is-resizable="layoutConfig.dialogVisible?item.resizable:false"
                           :key="item.i">
                    <component :is="item.component"></component>
                </grid-item>
            </grid-layout>
            <div class="layout-tools">
                <span class="tools-item"
                      v-show="operBtn"
                      @click="cancelLayout">取消</span>
                <span class="tools-item"
                      v-show="operBtn"
                      @click="saveLayout1">保存</span>
                <span class="tools-item custom"
                      @click="editLayout">
                    <img src="../../../static/img/home/tools-edit.png">
                    自定义
                </span>
            </div>
        </div>
    </div>
</template>
 <script>
import VueGridLayout from "vue-grid-layout";
import toDoList from "./toDoList";
import quickMove from "./quickMove"; // 快捷操作
import dbchoose from "./dbchoose"; // 竞选平台
import empTurnover from "./empTurnover"; // 异动统计
import empTotal from "./empTotal"; // 员工总数
import {
    getDataLevelUserLoginData,
} from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
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
        toDoList,
        quickMove,
        dbchoose,
        empTurnover,
        empTotal
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
                APterraceType: this.roleType,
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
                                    draggable: item.draggable === 'true' ? false : true,
                                    resizable: item.resizable === 'true' ? false : true,
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
.board {
    width: 100%;
    overflow: hidden;
    .home {
        margin: -10px;
    }
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
}
</style>
