<template>
    <div class="block peoplework">
        <div class="block-title">
            <img src="../../../static/img/largeScreen/title-1.png"
                 alt="">
            <span>人效类(人均)</span>
        </div>
        <div class="block-box">
            <div class="block-item item-f">
                <span><b>{{ Number(peopleWorkList.orgkb1NetprofitsByP) || 0 }}</b>万元</span>
                <span>净利润</span>
            </div>
            <div class="block-item item-s">
                <span><b>{{ Number(peopleWorkList.orgkb1QkjqyamountByP) || 0 }}</b>万元</span>
                <span>签约额-全口径</span>
            </div>
            <div class="block-item item-t">
                <span><b>{{ Number(peopleWorkList.orgkb1BuildareaByP) || 0 }}</b>平米</span>
                <span>在建面积</span>
            </div>
             <div class="block-item item-q">
                <span><b>{{ Number(peopleWorkList.orgkb1QykjqyamountByP) || 0 }}</b>万元</span>
                <span>签约额-权益口径</span>
            </div>
             <div class="block-item item-w">
                <span><b>{{ Number(peopleWorkList.orgkb1CpqyamountByP) || 0 }}</b>万元</span>
                <span>签约额-操盘口径</span>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getDataLevelUserLoginData
} from "@/axios/axios";

export default {
    props: {
        peopleWorkList: Object
    },
    data () {
        return {

        };
    },
    methods: {

    },
    mounted () {

    }
};
</script>
<style lang="scss" scoped>
@media(min-width: 600px){
.peoplework {
    background: #0e1a57;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .block-title {
        height: 50px;
        margin-left: 10px;
        display: flex;
        // flex-wrap: wrap;
        align-items: center;
        img {
            width: 1.5rem;
            height: 1.5rem;
        }
        span {
            color: #fff;
            font-size: .9rem;
            margin-left: 6px;
        }
    }
    .block-box>.block-item:nth-of-type(3n - 1){
        margin:1% 3% 0;
    }

    .block-box {
        display: flex;
        flex: 1;
        padding: 0 1% 1% 1%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .block-item {
            width: 31%;
            height: 42%;
            background: #1692d7;
            border-radius: 10px;
            display: flex;
            margin-top:1%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &.item-f {
                background: #f373a5;
            }
            &.item-s {
                background: #46BF53;
            }
            &.item-t {
                background: #8D8FFF;
            }
            &.item-q {
                background: #169DFB;
            }
            &.item-w {
                background: #EEAE48;
            }
            span {
                color: #fff;
                font-size: .5%;
                b {
                    font-size: 3%;
                }
            }
        }
    }
}
}

@media(min-width: 1920px){
    .peoplework {
    background: #0e1a57;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .block-title {
        height: 50px;
        margin-left: 10px;
        display: flex;
        // flex-wrap: wrap;
        align-items: center;
        img {
            width: 28px;
            height: 28px;
        }
        span {
            color: #fff;
            font-size: 18px;
            margin-left: 6px;
        }
    }
    .block-box>.block-item:nth-of-type(3n - 1){
        margin:1% 3% 0;
    }

    .block-box {
        display: flex;
        flex: 1;
        padding: 0 1% 1% 1%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .block-item {
            width: 31%;
            height: 42%;
            background: #1692d7;
            border-radius: 10px;
            display: flex;
            margin-top:1%;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            &.item-f {
                background: #f373a5;
            }
            &.item-s {
                background: #46BF53;
            }
            &.item-t {
                background: #8D8FFF;
            }
            &.item-q {
                background: #169DFB;
            }
            &.item-w {
                background: #EEAE48;
            }
            span {
                color: #fff;
                font-size: 16px;
                b {
                    font-size: 24px;
                }
            }
        }
    }
}
}
</style>