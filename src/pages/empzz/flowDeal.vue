<!--
 * @Author: your name
 * @Date: 2020-11-05 11:45:09
 * @LastEditTime: 2020-12-01 21:25:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\pages\empzz\flowDeal.vue
-->
<template>
    <div class="card_box">
        <Card :bordered="false"
              class="card">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span>流程办理</span>
            </p>
            <div class="block">
                <div class="imgBlocks">

                    <div class="imgs" v-for="(item, index) in flowImgList" :key="index" @click="openFun1(item.name , item.id , item.funCode, item.funAction)">
                        <div>

                            <img :src="'../../../static/zizhuImg/'+item.img" alt="">
                        </div>
                        <span class="img_name">{{item.name}}</span>
                    </div>

                </div>
                
            </div>
        </Card>
    </div>
</template>
<script>
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, getCookie, } from '@/lib/util'
import Bus from '@/lib/bus'
export default {
    data () {
        return {
            flowImgList:[
                {
                    'name':'在职证明申请',
                    'img':'hr_tj4.png',
                    funAction: 'commonFlowList',
                    funCode: '925100',
                    id: '2149',
                },
                {
                    'name':'收入证明申请',
                    'img':'hr_tj5.png',
                    funAction: 'commonFlowList',
                    funCode: '925200',
                    id: '2150',
                },
                // {
                //     'name':'离职发起',
                //     'img':'hr_tj3.png',
                //     funAction: 'commonFlowList',
                //     funCode: '9200400',
                //     id: '1765',
                // },
            ]
        }
    },
    computed: {
        roleType () {
            return this.$store.state.user.roleType
        },
    },
    components: {
    },
    mounted () {

    },
    methods: {
        openFun1(name, id, code, funAction) {
            const t = this
            const tag = {
                title: name,
                path: '/' + funAction,
                name: funAction,
                query: { id: id, code: code,state:true },
            }
            this.$store.commit('increateTag', tag)
            t.$router.push({ path: funAction, query: {
                id: id,
                code: code,
                state:true
            }})
        },
    },
    watch: {
    },
}

</script>

<style lang="scss" scoped>
.card_box {
    width: 100%;
    height: 100%;
    .card {
        width: 100%;
        height: 100%;
    }
    /deep/ .ivu-table-header thead tr th {
        background-color: #fff !important;
    }
    /deep/ .ivu-card-body {
        height: calc(100% - 37px);
    }
    .block {
        font-size: 12px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .imgBlocks{
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 9% 7%;
            .imgs{
                width: 57px;
                height: 57px;
                img{
                    width: 100%;
                    cursor: pointer;
                }
                .img_name{
                        position: relative;
                        left: -14px;
                        /* margin-right: 97px; */
                        margin-top: 50%;
                        display: block;
                        width: 120px;
                        font-size: 13px;
                }
            }
        }
    }
    .title {
        display: flex;
        justify-content: start;
        align-items: center;
    }
}

/deep/ .ivu-card-extra {
    top: 8px;
}
</style>
