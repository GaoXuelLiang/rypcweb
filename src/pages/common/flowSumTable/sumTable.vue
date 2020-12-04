<template>
    <div class="table">
        <card>
            <Row class="table-form"
                ref="table-form">
                <Table  :height="118"
                        :no-data-text="`暂无数据`"
                        size="small"
                        ref="selection"
                        :columns="sumColumns"
                        stripe
                        :show-summary="true"
                        :summary-method="handleSummary"
                        :data="sumData"></Table>
            </Row>
        </card>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props:{
        sumData:Array,
        sumColumns: Array,
        dataBlocks:Array,
        dom:Object
    },
    methods: {
        handleSummary ({ columns, data }) {
            const sums = {};
            columns.forEach((column, index) => {
                const key = column.key;
                if (index === 0) {
                    sums[key] = {
                        key,
                        value: '类别合计'
                    };
                    return;
                }
                const values = data.map(item => Number(item[key]));
                if (!values.every(value => isNaN(value))) {
                    const v = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[key] = {
                        key,
                        value: v.toFixed(2)
                    };
                    if(index === 1) {
                        let emphIspftc = '';
                        let emphIsylqy = '';
                        let emphComptype = '';
                        let emphYzcost = '';
                        let rate1 = '';
                        let rate2 = '';
                        let rate = '';
                        let valueMap = this.dom.valueMap;
                        let threeGears = this.$store.state.flowList.threeGears
                        let totalGrowth = 0;//年度总收入增幅
                        // console.log(v,"vvvvvvvvv")
                        // console.log(this.dom,"this.dom")
                        if(valueMap.emphIspftc && this.dom.$refs[valueMap.emphIspftc][0]) {
                            emphIspftc = this.dom.$refs[valueMap.emphIspftc][0].formDataSubmit.emphIspftc;
                        }
                        if(valueMap.emphIsylqy && this.dom.$refs[valueMap.emphIsylqy][0]) {
                            emphIsylqy = this.dom.$refs[valueMap.emphIsylqy][0].formDataSubmit.emphIsylqy;
                        }
                        if(valueMap.emphComptype && this.dom.$refs[valueMap.emphComptype][0]) {
                            emphComptype = this.dom.$refs[valueMap.emphComptype][0].formDataSubmit.emphComptype;
                        }
                        if( valueMap.emphYzcost && 
                            this.dom.$refs[valueMap.emphYzcost][0] && 
                            this.dom.$refs[valueMap.emphYzcost][0].formshow.hasOwnProperty('emphYzcost')) {
                            emphYzcost = this.dom.$refs[valueMap.emphYzcost][0].formDataSubmit.emphYzcost;
                             /**
                             * 年总收入增幅
                             */
                            if(!isNaN(emphYzcost) && Number(emphYzcost) !== 0 && v !== 0) {
                                totalGrowth = (Number(emphYzcost) - v) / Number(emphYzcost) * 100;
                                this.dom.$refs[valueMap.emphYzcz][0].formDataSubmit.emphYzcz = totalGrowth.toFixed(2);
                            }else {
                                this.dom.$refs[valueMap.emphYzcz][0].formDataSubmit.emphYzcz = '0.00';
                            }
                            /**
                             * 薪酬超规
                             */
                            if(threeGears && !isNaN(emphYzcost)) {
                                rate = Number(emphYzcost) / Number(threeGears);
                                if(rate > 1) {
                                    this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                                    return
                                }else {
                                    this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '0';
                                }
                            }
                            if(!isNaN(emphYzcost) && !isNaN(v) && v !== 0 && Number(emphYzcost) !== 0) {
                                rate1 = (Number(emphYzcost) - v) / Number(emphYzcost);
                                rate2 = (Number(emphYzcost) / v);
                                if(emphIspftc === '1') {
                                    if(rate1 > 0.05) {
                                        this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                                    }else {
                                        this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '0';
                                    }
                                }else {
                                    if(emphComptype === '1') {
                                        if(rate2 > 0.75) {
                                            this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                                        }else {
                                            this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '0';
                                        }
                                    }else {
                                        if(emphIsylqy === '1') {
                                            if(rate1 > 0.5) {
                                                this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                                            }else {
                                                this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '0';
                                            }
                                        }else {
                                            if(rate1 > 0.25) {
                                                this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                                            }else {
                                                this.dom.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '0';
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    sums[key] = {
                        key,
                        value: 'N/A'
                    };
                }
            });
            // console.log(sums,"sums")
            this.$store.commit('flowList/setOriginIncome',sums.ycprYtaxf.value);
            return sums;
        },
    }
}
</script>

<style lang="scss" scoped>
@import "~@/sass/autoMainTable.scss";
</style>