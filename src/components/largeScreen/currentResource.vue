<template>
    <div class='box'>
        <div class="headresource">
            <b>当前资源</b>
        </div>
        <div class="content_box">
            <div class='resourcemessage'>
                <div class="flex">
                    <div class='nice'>
                        <img src="../../../static/largeScreen/dutyfigure.png"
                             alt="">
                    </div>
                    <div class="imgduty">
                        <div>运维人数(人)</div>
                        <span @click='checkDuty(1)'>{{dutyPersonCount}}</span>
                    </div>
                    </Row>
                </div>
                <div class="flex">
                    <div class='nices'>
                        <img src="../../../static/largeScreen/automobile.png"
                             alt="">
                    </div>
                    <div class="imgduty">
                        <div>车辆数量(辆)</div>
                        <span @click='checkDuty(2)'>{{carCount}}</span>
                    </div>
                    </Row>
                </div>
                <div class="flex">
                    <div class='nice'>
                        <img src="../../../static/largeScreen/communicationnormal.gif"
                             alt="">
                    </div>
                    <div class="imgduty">
                        <div>通讯正常</div>
                        <span @click='checkDuty(3)'>{{passOkCount}}</span>
                    </div>
                    </Row>
                </div>
                <!-- <div class="flex">
                    <div class='nice'>
                        <img src="../../../static/largeScreen/communicationsuspend.gif"
                             alt="">
                    </div>
                    <div class="imgduty">
                        <div>通讯中断</div>
                        <span @click='checkDuty(4)'>{{passNoCount}}</span>
                    </div>
                    </Row>
                </div> -->
            </div>
            <alarm-list ref="alarmList"></alarm-list>
        </div>
        <dutyNumber @closeup="closeup"
                    v-show="openDuty"
                    ref="dutyNumber"></dutyNumber>
    </div>
</template>
<script>
import dutyNumber from './dutyNumber'
import alarmList from '@/components/largeScreen/alarmList'
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from "../../axios/axios";
export default {
    data () {
        return {
            openDuty: false,
            dutyPersonCount: '0',
            carCount: '0',
            passOkCount: '0',
            passNoCount: '0',
            companyId: this.$route.query.id
        }
    },
    mounted () {
        // this.getData()
    },
    components: {
        dutyNumber,
        alarmList,
    },
    methods: {
        initData () {
            this.$refs.alarmList.getData();
            this.getData();
        },
        getData () {
            const t = this
            let data = {
                _mt: "baseCarInfor.selectCount",
                companyId: t.companyId
            };
            getDataLevelUserLogin(data).then((res) => {
                let result = res.data.content[0];
                this.carCount = result.carCount;
                this.dutyPersonCount = result.dutyPersonCount;
                this.passOkCount = result.passOkCount;
                this.passNoCount = result.passNoCount
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
        checkDuty (id) {
            this.openDuty = true
            this.$refs.dutyNumber.getData(id)
        },
        closeup () {
            this.openDuty = false
        },
        initResize () {
            this.$refs.alarmList.initResize();
        }
    }
}
</script>
<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.imgduty {
    background: url(../../../static/largeScreen/backduty.png) no-repeat;
    flex: 1;
    height: 100%;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    div {
        color: #0ad0d6;
        padding-top: 5px;
        padding-left: 10px;
    }
    span {
        margin-top: -5px;
        display: block;
        color: #ffb400;
        font-size: 28px;
        font-weight: 600;
        width: 100%;
        text-align: center;
        cursor: pointer;
        line-height: 1;
    }
}
.flex {
    display: flex;
    justify-content: space-between;
    height: 19%;
    width: 100%;
    align-items: center;
    .nice {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 38%;
        img {
            width: 36%;
        }
    }
    .nices {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 38%;
        img {
            width: 45%;
        }
    }
}
.headresource {
    height: 2.3%;
    line-height: 0.2rem;
    background-image: url("../../../static/largeScreen/headline.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    b {
        margin-left: 80px;
        color: #e6e6e6;
        font-size: 16px;
    }
}
.character {
    color: white;
    position: absolute;
    left: 30%;
    top: -5px;
    font-size: 16px;
    font-weight: 600;
}

.content_box {
    width: 100%;
    height: 96%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .resourcemessage {
        width: 100%;
        height: 53%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: url(../../../static/largeScreen/backresource.png) no-repeat;
        background-size: 100% 100%;
        padding: 20px 20px 20px 0;
    }
}
@media only screen and (max-width: 1366px) {
    .nices img {
        width: 80%;
    }
    .nice img {
        width: 80%;
    }
}
</style>