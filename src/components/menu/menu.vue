<template>
    <div class="menu"
         :style="{width: shrink?'64px':'200px',overflowX: shrink?'visible':'hidden',overflowY:  shrink?'visible':'auto'}">
        <div class="btn"
             @click="toggleClick">
            <img v-if="shrink"
                 src="../../../static/employee/222.png"
                 alt="">
            <img v-if="!shrink"
                 src="../../../static/employee/111.png"
                 alt="">
        </div>
        <el-menu class="el-menu"
                 :unique-opened="true"
                 :collapse="shrink"
                 :default-active="$route.query.id"
                 :router="true"
                 @select="changeMenu"
                 text-color="#fff"
                 :collapse-transition="true">
            <template v-for="(item,index) in menu">
                <el-submenu v-if="item.children"
                            :index="item.id"
                            :key="index">
                    <template slot="title">
                        <Icon :type="item.funImg"
                              size="20"
                              color="#fff"
                              class="iconStyle"></Icon>
                        <span>{{item.funLancodeDis}}</span>
                    </template>
                    <template v-for="(item2,index2) in item.children">
                        <el-submenu v-if="item2.children"
                                    :index="item2.id"
                                    :key="index2"
                                    class="sub_menu">
                            <template slot="title">
                                <span>{{item2.funLancodeDis}}</span>
                            </template>
                            <template v-for="(item3,index3) in item2.children">
                                <el-submenu v-if="item3.children"
                                            :index="item3.id"
                                            :key="index3">
                                    <template slot="title">
                                        <span>{{item3.funLancodeDis}}</span>
                                    </template>
                                    <el-menu-item :index="item4.id"
                                                  :route="{path:item4.funAction,query:{id:item4.id,code:item4.funCode,state:true}}"
                                                  v-for="(item4,index4) in item3.children"
                                                  :key="index4">{{item4.funLancodeDis}}</el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else
                                              :index="item3.id"
                                              :route="{path:item3.funAction,query:{id:item3.id,code:item3.funCode,state:true}}">{{item3.funLancodeDis}}</el-menu-item>
                            </template>
                            <!--<el-menu-item index="userManage" v-for="(item2,index) in item.children" :key="index">{{item2.id}}</el-menu-item>-->
                        </el-submenu>
                        <el-menu-item v-else-if="item2.funAction=='largeScreen'"><a :href="url_f"
                               target="largeScreen"
                               style="color:#fff">{{item2.funLancodeDis}}</a>
                        </el-menu-item>
                        <el-menu-item v-else
                                      :index="item2.id"
                                      :route="{path:item2.funAction,query:{id:item2.id,code:item2.funCode,state:true}}">{{item2.funLancodeDis}}</el-menu-item>
                    </template>
                    <!--<el-menu-item index="userManage" v-for="(item2,index) in item.children" :key="index">{{item2.funLancodeDis}}</el-menu-item>-->
                </el-submenu>
                <el-menu-item v-else
                              :index="item.id"
                              :route="{path:item.funAction,query:{id:item.id,code:item.funCode,state:true}}"
                              :key="index">
                    <!--<el-menu-item v-else :index="item.funAction+'?id='+item.id" :key="index">-->
                    <template slot="title"
                              v-if="!shrink">
                        <Icon :type="item.funImg"
                              size="20"
                              color="#fff"
                              class="iconStyle"></Icon>
                        <span>{{item.funLancodeDis}}</span>
                    </template>
                    <Icon v-else
                          :type="item.funImg"
                          size="20"
                          color="#fff"
                          class="iconStyle"></Icon>
                </el-menu-item>
            </template>

        </el-menu>
        <div class="btn1">
        </div>
    </div>
</template>
<style  lang="scss" scoped>
.menu {
    scrollbar-width: thin;
    scrollbar-color: #dbdbdb #f5f6f8;
    .iconStyle {
        margin-right: 15px;
        width: 15px;
        text-align: center;
    }
    .btn {
        height: 40px;
        width: 100%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        line-height: 40px;
        text-align: center;
    }

    .btn1 {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn:hover {
        cursor: pointer;
        background-color: RGBA(92, 173, 255, 0.2);
    }
}
/deep/ .el-menu {
    background-color: #070e1c !important;
}
/deep/ .el-submenu__title {
    display: flex;
    align-items: center;
}

// /deep/ .el-menu .el-submenu__title {
//     padding-left: 50px !important;
// }
.menuitem .el-submenu__title {
    padding-left: 50px !important;
}
/deep/ .el-menu-item:hover {
    span {
        color: #fff !important;
    }
}
// /deep/.el-menu--collapse {
//     .el-submenu.is-active {
//         background: linear-gradient(0deg, #1788fd, #41c2ff) !important;
//         .el-submenu__title {
//             background: linear-gradient(0deg, #1788fd, #41c2ff) !important;
//         }
//     }
// }
// /deep/ .el-menu--vertical .menuitem:hover {
//     color: rgba(255, 2555, 255, 0.8) !important;
// }

/deep/ .el-menu-item {
    display: flex;
    align-items: center;
    // height: 48px;
    // line-height: 48px;
    margin-bottom: 10px;
}
/deep/ .el-submenu .el-menu-item {
    padding-left: 50px !important;
}
/deep/ .el-submenu__title {
    margin-bottom: 10px;
}
/deep/ .el-menu--inline .sub_menu .el-submenu__title {
    padding-left: 50px !important;
}
/deep/ .el-menu--popup .el-submenu__title {
    padding-left: 20px !important;
}
/deep/ .el-menu-item.is-active {
    background: linear-gradient(0deg, #1788fd, #41c2ff) !important;
    color: #fff !important;
}
/deep/ .el-submenu .el-menu-item:hover {
    background-color: #070e1c !important;
}
/deep/ .el-menu-item:hover {
    background-color: #070e1c !important;
}
/deep/ .el-menu-item:hover span {
    color: rgba(255, 2555, 255, 0.8) !important;
}
.el-menu-item:hover {
    color: rgba(255, 2555, 255, 0.8) !important;
}
// /deep/ .el-submenu:hover span {
//     color: rgba(255, 2555, 255, 0.8) !important;
// }
/deep/ .el-submenu__title:hover {
    background-color: #070e1c !important;
}
/deep/ .el-submenu .el-menu-item:hover {
    color: rgba(255, 2555, 255, 0.8) !important;
}

//三级导航缩进
.sub_menu .el-menu-item {
    text-indent: 1.5em;
}
</style>
<script>
export default {
    data () {
        return {
            menu: [],
            data: [],
            shrink: false,
            url_f: pubsource.pub_prvf_cur + '/#/largeScreen',
        }
    },
    props: {
        userFuns: Array,
    },
    mounted () {

    },
    methods: {
        changeMenu (id) {
            /* 通过name查询funid和显示字段 */
            if (!id) {
                return;
            }
            let funId = ''
            let name = ''
            let funCode = ''
            let title = ''
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].id === id) {
                    funId = this.data[i].id
                    name = this.data[i].funAction
                    title = this.data[i].funLancodeDis
                    funCode = this.data[i].funCode
                    break
                }
            }
            const tag = {
                title: title,
                path: '/' + name,
                name: name,
                query: { id: funId, code: funCode, state: true },
            }
            this.$store.commit('increateTag', tag)
            this.$store.commit('increateTitle', tag)
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach((item) => {
                delete item.children
            })
            const map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            const val = []
            data.forEach((item) => {
                const parent = map[item.funPid]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    val.push(item)
                }
            })
            return val
        },
        subdata (data) {
            this.menu = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].funCode === '100' || data[i].funCode === '200' || data[i].funCode === '300') {
                    data.splice(i, 1)
                    break
                }
            }
            this.data = data
            this.menu = this.toTree(data)
        },
        toggleClick () {
            this.shrink = !this.shrink
            this.$emit('toggleClick', this.shrink)
        },
    },
    watch: {
        /*
        * 监听路由的变化为funid赋值
        * */
        //    $route(newValue, oldValue) {
        //      let funId = ''
        //      console.log(newValue)
        //      this.changeMenu(newValue.query.id)
        //      for (let i = 0; i < this.data.length; i++) {
        //        if (this.data[i].funAction === newValue.name) {
        //          funId = this.data[i].id
        //          break
        //        }
        //      }
        //      this.$store.commit('setFunId', funId)
        //    },
    },
}
</script>
