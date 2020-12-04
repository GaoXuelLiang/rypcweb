<template>
    <div class="mainHeader">
        <div class="main_header">
            <div class="hedaer_left header_box">
                <div class="header_item">
                    <div class="item_content">
                        <span class="content_name">客户总量</span>
                        <span class="content_number">{{data.cusCount}}<b></b></span>
                    </div>
                </div>
                <div class="header_item">
                    <div class="item_content ">
                        <span class="content_name"
                              style="margin-left:15%">装见容量({{volumeUnit}})</span>
                        <span class="content_number red">{{data.loadCapacity}}</span>
                    </div>
                </div>
                <div class="header_item ">
                    <div class="item_content ">
                        <span class="content_name">配电室总数</span>
                        <span class="content_number green">{{data.switcCount}}<b></b></span>
                    </div>
                </div>
            </div>
            <div class="header_center">
                <h3>老电工智能运维调度平台</h3>
                <span class="time">{{nowDate}}</span>
            </div>
            <div class="header_right header_box">
                <div class="header_item">
                    <!-- <div class="item_content">
                        <span class="content_name">总工单</span>
                        <span class="content_number orange">{{data.workCount}}<b></b></span>
                    </div> -->
                     <div class="item_content">
                        <span class="content_name">总电量({{electricUnit}})</span>
                        <span class="content_number orange">{{electricQuantity}}<b></b></span>
                    </div>
                </div>
                <div class="header_item">
                    <div class="item_content ">
                        <span class="content_name">总告警</span>
                        <span class="content_number purpose">{{data.alarmCount}}<b></b></span>
                    </div>
                </div>
                <div class="header_item ">
                    <div class="item_content ">
                        <span class="content_name">总设备</span>
                        <span class="content_number blue">{{data.equipmentCount}}<b></b></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDataLevelUserLogin } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
export default {
    name: '',
    props: {

    },
    data () {
        return {
            electricUnit:"kWh",
            // 装见容量单位
            volumeUnit:"kVA",
            electricQuantity:0,
            nowDate: '',
            data: {
                cusCount: 0,
                loadCapacity: 0,
                switcCount: 0,
                workCount: 0,
                alarmCount: 0,
                equipmentCount: 0
            },
            companyId: this.$route.query.id
        }
    },
    computed: {
    },
    methods: {
        getElectric () {
            const t = this
            let data = {
                _mt: 'skRepRuntimedate.selectOperElec',
                companyId: localStorage.companyId,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (JSON.stringify(t.data) !== "{}") {
                        t.electricQuantity = res.data.content[0].value;
                        if(t.electricQuantity>1000){
                            t.electricQuantity = (t.electricQuantity/1000).toFixed(2)
                            t.electricUnit = "MWH"
                        }
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: '错误',
                    content: '网络错误',
                })
                window.setTimeout(() => {
                    t.$Modal.remove()
                }, 5000)
            })
        },
        //获取当前时间
        getNewDate () {
            setInterval(() => {
                let Time = new Date();
                let year = Time.getFullYear();
                let month = Time.getMonth() + 1;
                let days = Time.getDate();
                let hours = Time.getHours();
                let minutes = Time.getMinutes();
                let seconds = Time.getSeconds();
                hours = check(hours);
                minutes = check(minutes);
                seconds = check(seconds);
                this.nowDate = year + "年" + month + "月" + days + "日  " + hours + ":" + minutes + ":" + seconds
                function check (i) {
                    var num
                    i < 10 ? num = "0" + i : num = i
                    return num
                }
            }, 1000);
        },
        //获取总数
        getAll () {
            const t = this
            let data = {
                _mt: 'skRepCabient.selectShowList',
                companyId: t.companyId,
            }
            getDataLevelUserLogin(data).then((res) => {
                if (isSuccess(res, t)) {
                    if (JSON.stringify(t.data) !== "{}") {
                        t.data = res.data.content[0];
                        if (t.data.safeDays) {
                            t.$store.commit('setSafeDays', t.data.safeDays)
                        }
                        if(t.data.loadCapacity>1000){
                            t.data.loadCapacity = (t.data.loadCapacity/1000).toFixed(2);
                            t.volumeUnit = 'MVA';
                        }
                    }
                }
            }).catch(() => {
                t.$Modal.error({
                    title: '错误',
                    content: '网络错误',
                })
                window.setTimeout(() => {
                    t.$Modal.remove()
                }, 5000)
            })
        }
    },
    mounted () {
        this.getNewDate();

    },

}
</script>

<style lang="scss" scoped>
.mainHeader {
    width: 100%;
    .main_header {
        width: 100%;
        height: 103px;
        background: url(../../../static/largeScreen/main_header.png) no-repeat;
        background-size: cover;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .header_box {
            display: flex;
            width: 31.5%;
            .header_item {
                width: 100%;
                height: 72px;
                box-sizing: border-box;
                .item_content {
                    width: 100%;
                    height: 100%;
                    padding: 11px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    .content_name {
                        font-size: 15px;
                        color: #fff;
                    }
                    .content_number {
                        font-size: 26px;
                        color: #99eff4;
                        font-weight: 600;
                        b {
                            font-weight: normal;
                            font-size: 18px;
                            margin-left: 2px;
                        }
                        &.red {
                            color: #e85b64;
                        }
                        &.green {
                            color: #51d671;
                        }
                        &.orange {
                            color: #f29961;
                        }
                        &.purpose {
                            color: #9f72ee;
                        }
                        &.blue {
                            color: #06a4fd;
                        }
                    }
                }
            }
        }
        .hedaer_left {
            .header_item {
                background: url(../../../static/largeScreen/header_item_left.png)
                    no-repeat;
                background-size: cover;
                margin-right: 8.4%;
            }
        }
        .header_right {
            .header_item {
                background: url(../../../static/largeScreen/header_item_right.png)
                    no-repeat;
                background-size: cover;
                margin-left: 8.4%;
            }
        }
        .header_center {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 16px;
            height: 100%;
            h3 {
                font-size: 38px;
                color: #fff;
                line-height: 1;
                letter-spacing: 2px;
            }
            span {
                margin-top: 4px;
                font-size: 18px;
                color: #fff;
            }
        }
    }
}
</style>
