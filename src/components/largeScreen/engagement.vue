<template>
    <div class="content-main">
        <Row class="mainBox rate">
                <p class="title rateTitle">
                    <img src="static/img/largeScreen/title-4.png"/>
                    敬业度
                </p>
                <Row class="table-form">
                    <div class="cell" v-for="(item,index) in data" :key="index">
                        <p :class="'cell-circle'+index">{{item.rate}}</p>
                        <span>{{item.desc}}</span>
                    </div>
                </Row>
        </Row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    rate: '30%',
                    desc: '文化感知度'
                },
                {
                    rate: '60%',
                    desc: '员工敬业度'
                },
                {
                    rate: '78%',
                    desc: '组织健康度'
                },
                {
                    rate: '80%',
                    desc: '决策敏捷度'
                },
            ]
        }
    },
    mounted () {

    },
    destroyed () {
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .content-main {
        height: 100%;
        .mainBox {
            display: flex;
            flex-direction: column;
            height: 100%;
            background: rgba(14, 26, 87, .5);
            .title {
                font-size: 16px;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #FFFFFF;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px;
                height: 50px;
                img {
                    width: 29px;
                    height: 29px;
                    margin-right:5px;
                }
            }
            .table-form {
                flex: 1;
                padding: 0 10px 10px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-wrap: wrap;

                .cell {
                    width: 50%;
                    height: 89px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    p{
                        font-size: 20px;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        width: 89px;
                        height: 100%;
                    }
                    span{
                        font-size: 14px;
                        color: rgba(255, 255, 255, 1);
                        margin-left: 5px;
                    }
                    .cell-circle0 {
                        color: rgba(243, 115, 165, 1);
                        background-image: url('../../../static/img/largeScreen/circle-1.png');
                    }
                    .cell-circle1 {
                        color: rgba(112, 209, 119, 1);
                        background-image: url('../../../static/img/largeScreen/circle-2.png');
                    }
                    .cell-circle2 {
                        color: rgba(22, 157, 251, 1);
                        background-image: url('../../../static/img/largeScreen/circle-3.png');
                    }
                    .cell-circle3 {
                        color: rgba(186, 117, 253, 1);
                        background-image: url('../../../static/img/largeScreen/circle-4.png');
                    }
                }
            }
        }
    }
</style>