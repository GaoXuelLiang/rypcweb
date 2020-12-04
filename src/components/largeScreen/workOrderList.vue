<template>
    <div class="left_block">
        <div class="wo_title">
            <b>当日工单</b>
        </div>
        <div class="wo_body">
            <!-- <div class="time_out_total"
                 @click="getOrderTableList(1)">
                超时工单:
                <span>{{overWork}}</span>
            </div> -->
            <div class='dataorder'>
                <div class="leftorder"
                    @click="getOrderTableList(2)">
                    <div>总工单</div>
                    <span>{{allWork}}</span>
                </div>
                <div class="rightorder"
                    @click="getOrderTableList(1)">
                    <div>超时工单</div>
                    <span>{{overWork}}</span>
                </div>
            </div>
            <div class="no_deal">
                <div class="item_title">未处理工单</div>
                <div class="item_body">
                    <div id="nodeal_pie"></div>
                    <div class="data_list">
                        <p class="plan_order"
                           @click="getOrderTableList(0,'work_state_write02','work_type_plan')">
                            <span class="p_icon red_icon"></span>
                            计划工单
                            <span @click="showTable('1','2')">{{unplan}}</span>
                        </p>
                        <p class="temp_order"
                           @click="getOrderTableList(0,'work_state_write02','work_type_temporary')">
                            <span class="p_icon blue_icon"></span>
                            临时工单
                            <span>{{untemporary}}</span>
                        </p>
                        <p class="poll_order"
                           @click="getOrderTableList(0,'work_state_write02','work_type_scheme')">
                            <span class="p_icon orange_icon"></span>
                            巡检工单
                            <span>{{unover}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="dealing">
                <div class="item_title">处理中工单</div>
                <div class="item_body">
                    <div id="dealing_pie"></div>
                    <div class="data_list">
                        <p class="plan_order"
                           @click="getOrderTableList(0,'work_state_write03','work_type_plan')">
                            <span class="p_icon pu_icon"></span>
                            计划工单
                            <span>{{dealplan}}</span>
                        </p>
                        <p class="temp_order"
                           @click="getOrderTableList(0,'work_state_write03','work_type_temporary')">
                            <span class="p_icon red_icon"></span>
                            临时工单
                            <span>{{dealtemporary}}</span>
                        </p>
                        <p class="poll_order"
                           @click="getOrderTableList(0,'work_state_write03','work_type_scheme')">
                            <span class="p_icon green_icon"></span>
                            巡检工单
                            <span>{{dealover}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="finished">
                <div class="item_title">已完成工单</div>
                <div class="item_body">
                    <div id="finish_pie"></div>
                    <div class="data_list">
                        <p class="plan_order"
                           @click="getOrderTableList(0,'work_state_write04','work_type_plan')">
                            <span class="p_icon red_icon"></span>
                            计划工单
                            <span>{{fiplan}}</span>
                        </p>
                        <p class="temp_order"
                           @click="getOrderTableList(0,'work_state_write04','work_type_temporary')">
                            <span class="p_icon pu_icon"></span>
                            临时工单
                            <span>{{fitemporary}}</span>
                        </p>
                        <p class="poll_order"
                           @click="getOrderTableList(0,'work_state_write04','work_type_scheme')">
                            <span class="p_icon blue_icon"></span>
                            巡检工单
                            <span>{{fiover}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <order-table @close="close"
                     @getData="getOrderTableList"
                     @getCurrentPage="getCurrentPage"
                     @getDataByKey="getDataByKey"
                     v-show="isShow"
                     :loading="loading"
                     :total="total"
                     :overSmall="overSmall"
                     :orderTableList="orderTableList"></order-table>
    </div>
</template>
<script>
import * as echarts from "echarts/lib/echarts";
import orderTable from "./orderTable"
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin
} from "@/axios/axios";
import { isSuccess, deepCopy } from "../../lib/util";
export default {
    name: 'workOrderList',
    components: {
        orderTable
    },
    data () {
        return {
            isShow: false,
            unplan: 0,
            untemporary: 0,
            unover: 0,
            dealplan: 0,
            dealtemporary: 0,
            dealover: 0,
            fiplan: 0,
            fitemporary: 0,
            fiover: 0,
            allWork:0,
            overWork: 0,
            orderTableList: [],
            loading : false,
            searchKey:'',
            pageNum:1,
            total:0,
            overSmall:false,
            isOver:'', state:'', type:'',
            option1: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                    position: 'center'
                },
                color: ["#e15d68", "#0a81ff", "#f29961"],
                toolbox: {
                    show: true,
                },
                series: [
                    {
                        name: '未处理工单',
                        type: 'pie',
                        radius: this.resetPieSize([25, 60]),
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                        ]
                    }
                ]
            },
            option2: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                    position: 'center'
                },
                color: ["#9f72ee", "#e15d68", "#29c4a4"],
                toolbox: {
                    show: true,
                },
                series: [
                    {
                        name: '处理中工单',
                        type: 'pie',
                        radius: this.resetPieSize([25, 60]),
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                        ]
                    }
                ]
            },
            option3: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                    position: 'center'
                },
                color: ["#d35863", "#9f72ee", "#0a81ff"],
                toolbox: {
                    show: true,
                },
                series: [
                    {
                        name: '已完成工单',
                        type: 'pie',
                        radius: this.resetPieSize([25, 60]),
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                        ]
                    }
                ]
            },
            companyId: this.$route.query.id,
            myChart1: {},
            myChart2: {},
            myChart3: {},
        }
    },
    mounted () {
         this.isOverSmall()
        // window.onresize = () => {
        //     alert(2)
        //     t.myChart1.resize();
        //     t.myChart2.resize();
        //     t.myChart3.resize();
        // }
    },
    methods: {
        getOrderList () {
            // const t = this;
            let data = {
                _mt: "Skwork.showPage",
                companyId: this.companyId
            };
            getDataLevelUserLogin(data).then(res => {
                if (isSuccess(res, this)) {
                    var result = res.data.content[0]
                    this.overWork = result.overWork
                     this.allWork = result.allWork
                    this.completeList = result['completeList']
                    this.undealList = result['undealList']
                    this.dealList = result['dealList']
                    this.unplan = parseInt(this.undealList[0].workCount),
                        this.untemporary = parseInt(this.undealList[1].workCount),
                        this.unover = parseInt(this.undealList[2].workCount),
                        this.dealplan = this.dealList[0].workCount,
                        this.dealtemporary = this.dealList[1].workCount,
                        this.dealover = this.dealList[2].workCount,
                        this.fiplan = this.completeList[0].workCount,
                        this.fitemporary = this.completeList[1].workCount,
                        this.fiover = this.completeList[2].workCount
                    console.log(this.unplan, this.untemporary, this.unover)
                    this.option1.series[0].data = [{ name: '计划工单', value: this.unplan }, { name: '临时工单', value: this.untemporary }, { name: '巡检工单', value: this.unover }]
                    this.option2.series[0].data = [{ name: '计划工单', value: this.dealplan }, { name: '临时工单', value: this.dealtemporary }, { name: '巡检工单', value: this.dealover }]
                    this.option3.series[0].data = [{ name: '计划工单', value: this.fiplan }, { name: '临时工单', value: this.fitemporary }, { name: '巡检工单', value: this.fiover }]

                    // fitemporar
                    //      console.log(this.undealList[0].workCount,'undealList')
                }
            }).catch(() => {
                this.$Modal.error({
                    title: '错误',
                    content: '网络错误',
                })
                window.setTimeout(() => {
                    this.$Modal.remove()
                }, 5000)
            })
            this.myChart1 = echarts.init(document.getElementById("nodeal_pie"));
            this.myChart2 = echarts.init(document.getElementById("dealing_pie"));
            this.myChart3 = echarts.init(document.getElementById("finish_pie"));
            setTimeout(() => {
                console.log(this.option1.series[0].data, 'data')
                this.myChart1.setOption(this.option1, true)
                this.myChart2.setOption(this.option2, true)
                this.myChart3.setOption(this.option3, true)
            }, 1200);
        },
        getOrderTableList (isOver, state, type) {
            this.isOver = isOver
            this.state = state
            this.type = type
            this.isShow = true
            this.loading = true
            this.orderTableList = []
            let data = {
                _mt: "Skwork.showPageList",
                rows:9,
                page:this.pageNum,
                sort: 'id',
                order: 'desc',
                companyId: this.companyId,
                type: isOver,
                flowStatus: state ? state : '',
                workType: type ? type : '',
                cusName:this.searchKey
            };
            getDataLevelUserLogin(data).then(res => {
                this.orderTableList = res.data.content[0].rows
                this.total = res.data.content[0].records
            }).catch(() => {
                this.$Modal.error({
                    title: '错误',
                    content: '网络错误',
                })
                window.setTimeout(() => {
                    this.$Modal.remove()
                }, 5000)
            }).finally(() => {
                    this.loading = false
                })
        },
        close () {
            this.isShow = false
            this.pageNum =1
            this.searchKey =''
        },
        showTable (type1, type2) {
            this.isShow = true
        },
        resetPieSize (num) {
            if (window.screen.width <= 1400) {
                return [20, 40];
            } else {
                return num;
            }
        },
        getCurrentPage(num){
            const t = this
            this.pageNum = num
            this.getOrderTableList(t.isOver,t.state,t.type)
        },
        getDataByKey(searchKey ){
            const t = this
            this.searchKey = searchKey
            this.pageNum = 1
            this.getOrderTableList(t.isOver,t.state,t.type)
        },
        initResize () {
            this.myChart1.resize();
            this.myChart2.resize();
            this.myChart3.resize()
        },
        isOverSmall(){
             if (window.screen.width <= 1400) {
                 this.overSmall = true
             }
        }
    }
}
</script>
<style lang="scss" scoped>
.left_block {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .wo_title {
        width: 100%;
        height: 2.3%;
        line-height: 0.2rem;
        background-image: url("../../../static/largeScreen/wo_title.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        b {
            margin-left: 80px;
            color: #e6e6e6;
            font-size: 16px;
        }
    }
    .wo_body {
        width: 100%;
        height: 96%;
        background-image: url("../../../static/largeScreen/wobg_img.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // .time_out_total {
        //     cursor: pointer;
        //     width: 80%;
        //     margin: 0 auto;
        //     margin-top: 10%;
        //     text-align: center;
        //     height: 41px;
        //     line-height: 41px;
        //     background-image: url("../../../static/largeScreen/wo_item.png");
        //     background-repeat: no-repeat;
        //     background-size: 100%;
        //     color: #e6e6e6;
        //     font-size: 18px;
        //     span {
        //         color: #dd3c3c;
        //         cursor: pointer;
        //     }
        // }
        .dataorder{
            margin-top: 10%;
            display: flex;
            justify-content: space-around;
            .leftorder{
                background-image: url("../../../static/homeImg/orderback.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                cursor: pointer;
                width: 90%;
                text-align: center;
                margin: 0 20px 0 20px;
                font-size: 16px;
                color: #fff;
                div{
                    margin:8px 0 0 0;
                }
                span{
                    display: block;
                    font-size: 22px;
                    color:#FFB400
                }
            }
            .rightorder{
                background-image: url("../../../static/homeImg/orderback.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                cursor: pointer;
                width: 90%;
                text-align: center;
                margin: 0 20px 0 0;
                font-size: 16px;
                color: #fff;
                div{
                    margin:8px 0 0 0;
                }
                span{
                    display: block;
                    font-size: 22px;
                    color:#DD3C3C
                }
            }
        }
        .no_deal,
        .dealing,
        .finished {
            height: 25%;
        }
        .item_title {
            width: 46%;
            background-image: url("../../../static/largeScreen/wo_item.png");
            background-repeat: no-repeat;
            background-size: 100%;
            color: #e6e6e6;
            margin: 0 auto;
            margin-bottom: 20px;
            text-align: center;
            font-size: 16px;
        }
        .item_body {
            width: 94%;
            height: 75%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            #nodeal_pie,
            #dealing_pie,
            #finish_pie {
                height: 100%;
                width: 50%;
            }
            .data_list {
                width: 50%;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                color: #e6e6e6;
                font-size: 16px;
                .plan_order,
                .poll_order,
                .temp_order {
                    cursor: pointer;
                    span {
                        color: #fdb300;
                        margin-left: 10px;
                    }
                }
                p {
                    display: flex;
                    align-items: center;
                    .p_icon {
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        margin-right: 5px;
                    }
                    .red_icon {
                        background: #e15d68;
                    }
                    .blue_icon {
                        background: #0a81ff;
                    }
                    .orange_icon {
                        background: #f29961;
                    }
                    .green_icon {
                        background: #29c4a4;
                    }
                    .pu_icon {
                        background: #9f72ee;
                    }
                }
            }
        }
    }
}
</style>