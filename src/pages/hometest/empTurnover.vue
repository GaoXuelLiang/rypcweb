<template>
    <div class="card_box">
        <Card :bordered="false"
              class="card">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span>异动统计</span>
            </p>
            <div class="block">
                <div class="tj_block">
                    <div class="tj_item item_r">
                        <img src="../../../static/home/hr_tj1.png"
                             alt="">
                        <div class="people">
                            <span class="sum">{{data.flowRuzhi}}</span>
                            <!-- 录用入职（人） -->
                            <div class="fonts">录用入职</div>
                        </div>
                    </div>
                    <div class="tj_item item_z">
                        <img src="../../../static/home/hr_tj2.png"
                             alt="">
                        <div class="people">
                            <span class="sum">{{data.flowZhuan}}</span>
                            <!-- 员工转正（人） -->
                            <div class="fonts">员工转正</div>
                        </div>
                    </div>
                    <div class="tj_item item_x">
                        <img src="../../../static/home/hr_tj3.png"
                             alt="">
                        <div class="people">
                            <span class="sum">{{data.flowXuqian}}</span>
                            <!-- 合同续签（人） -->
                            <div class="fonts">合同续签</div>
                        </div>
                    </div>
                    <div class="tj_item item_d">
                        <img src="../../../static/home/hr_tj4.png"
                             alt="">
                        <div class="people">
                            <span class="sum">{{data.flowYiD}}</span>
                            <!-- 员工调动（人） -->
                            <div class="fonts">员工调动</div>
                        </div>
                    </div>
                    <div class="tj_item item_l">
                        <img src="../../../static/home/hr_tj5.png"
                             alt="">
                        <div class="people">
                            <span class="sum">{{data.flowTermin}}</span>
                            <!-- 员工离职（人） -->
                            <div class="fonts">员工离职</div>
                        </div>
                    </div>
                    <div class="tj_item item_p">
                        <img src="../../../static/home/hr_tj6.png"
                             alt="">
                        <div class="people">
                            <span class="sum">{{data.flowDai}}</span>
                            <!-- 带教培训（人） -->
                            <div class="fonts">带教培训</div>
                        </div>
                    </div>
                    <!-- for -->
                    <!-- <div class="tj_item" v-for="(item,index) in Data" :key="index + 'c'">
                        <img :src="'../../../static/home/hr_tj'+ index +'.png'"
                             alt="">
                        <div class="people">
                            <span class="sum">{{item.sum}}</span>
                            <div>带教培训（人）</div>
                        </div>
                    </div> -->
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
            data: []
        }
    },
    computed: {
    },
    components: {
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            const t = this
            t.isSpin = true
            const data = {
                _mt: this.$global.mt + 'EmpInfo.numCount',
                APsort: 'id',
                APorder: 'asc',
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.data = res.data.content[0]
                    t.isSpin = false
                }
            }).catch(() => {
                t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: this.$t('reminder.errormessage'),
                })
                t.isSpin = false
            })
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
        // overflow-y: auto;
        // overflow-x: hidden;
        padding: 10px;
        .tj_block {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            .tj_item {
                // width: 33.33%;
                width: 31%;
                height: 40%;
                // margin: 2.5% 1.66%;
                margin: 2.5% 0;
                padding: 2% 1%;
                display: flex;
                align-items: center;
                // justify-content: center;
                justify-content: space-around;
                // img {
                //     width: 50%;
                // }
                .people {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .sum {
                        text-align: center;
                        font-weight: 400;
                        font-size: 18px;
                    }
                    .fonts {
                        font-size: 14px
                    }
                }
            }
            .item_r {
                background: rgba(248, 207, 86, 0.14);
                border-radius: 8px;
            }
            .item_z {
                background: rgba(136, 206, 128, 0.14);
                border-radius: 8px;
            }
            .item_x {
                background: rgba(227, 123, 164, 0.14);
                border-radius: 8px;
            }
            .item_d {
                background: rgba(176, 124, 245, 0.14);
                border-radius: 8px;
            }
            .item_l {
                background: rgba(70, 157, 244, 0.14);
                border-radius: 8px;
            }
            .item_p {
                background: #eef0f3;
                border-radius: 8px;
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
