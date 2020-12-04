<template>
    <div class="card_box">
        <Spin size="large"
              v-if="isSpin"
              fix></Spin>
        <Card :bordered="false"
              class="card">
            <p slot="title"
               class="title">
                <span class="title-tip"></span>
                <span>员工总数</span>
            </p>
            <div class="block">
                <!-- <Spin fix
                      v-if="isSpin"></Spin>
                <Table size="small"
                       ref="selection"
                       :columns="columns"
                       stripe
                       :data="data"></Table> -->
                <div class="empSum_block">
                    <div class="empSum_item">
                        <img src="../../../static/home/emp_total.png"
                             alt="">
                        <div class="people">
                            <!-- <span class="sum">102</span> -->
                            <span class="sum">{{sumData.sumNum}}</span>
                            <div class="fonts">员工总人数</div>
                        </div>
                    </div>
                    <div class="empSum_item">
                        <img src="../../../static/home/syq_total.png"
                             alt="">
                        <div class="people">
                            <!-- <span class="sum">52</span> -->
                            <span class="sum">{{sumData.shiNum}}</span>
                            <!-- 员工离职（人） -->
                            <div class="fonts">试用期人数</div>
                        </div>
                    </div>
                    <div class="empSum_item">
                        <img src="../../../static/home/zz_total.png"
                             alt="">
                        <div class="people">
                            <!-- <span class="sum">50</span> -->
                            <span class="sum">{{sumData.zhuanNum}}</span>
                            <!-- 带教培训（人） -->
                            <div class="fonts">转正人数</div>
                        </div>
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
            isSpin: false,
            sumData: [],
        }
    },
    computed: {
        // roleType () {
        //     return this.$store.state.user.roleType
        // },
    },
    components: {
    },
    mounted () {
        this.getData();
    },
    methods: {
        getData () {
            const t = this
            t.isSpin = true
            const data = {
                _mt: this.$global.mt + 'EmpInfo.numEmpstatus'
            }
            getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    t.sumData = res.data.content[0]
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
        .empSum_block {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            .empSum_item {
                width: 100%;
                height: 25%;
                // margin: 2.5% 1.66%;
                margin: 2.5% 0;
                padding: 2% 8%;
                display: flex;
                align-items: center;
                // justify-content: center;
                justify-content: space-around;
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
