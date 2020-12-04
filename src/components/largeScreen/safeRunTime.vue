<template>
    <div class="safeRunTime">
        <div class="runTime_box">
            <span>安全运行</span>
            <ul>
                <li>
                    {{firstNumber}}
                </li>
                <li>
                    {{secondNumber}}
                </li>
                <li>
                    {{thirdNumber}}
                </li>
                <li>
                    {{fourthNumber}}
                </li>
                <li>
                    天
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    data () {
        return {
            firstNumber: 0,
            secondNumber: 0,
            thirdNumber: 0,
            fourthNumber: 0,
        };
    },
    methods: {
        prefixIntrger (num, length) {
            return (Array(length).join('0') + num).slice(-length);
        }
    },
    computed: {
        safeDays (val) {
            return this.$store.state.echart.safeDays;
        },
    },
    mounted () {

    },
    watch: {
        safeDays (val) {
            if (val) {
                val = this.prefixIntrger(Number(val), 4);
                val = val.toString().split('');
                this.firstNumber = val[0];
                this.secondNumber = val[1];
                this.thirdNumber = val[2];
                this.fourthNumber = val[3];
                console.log(val, "val");
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.safeRunTime {
    // width: 100%;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    bottom: 22px;
    right: 30px;
    width: 100%;
    .runTime_box {
        display: flex;
        align-items: center;
        padding: 7px 16px 7px 10px;
        background: url("../../../static/largeScreen/safeRunBg.png") no-repeat;
        background-size: 100% 100%;
        width: 24.5%;
        span {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.9);
            margin-left: 3%;
        }
        ul {
            display: flex;
            list-style: none;
            margin-left: 5.5%;
            li {
                font-family: "MFBanHei_Noncommercial-Regular";
                font-size: 20px;
                padding: 6px;
                color: #fff;
                background: url("../../../static/largeScreen/runTimeBg.png")
                    no-repeat;
                background-size: cover;
                line-height: 1;
                margin-left: 3px;
            }
        }
    }
}
</style>