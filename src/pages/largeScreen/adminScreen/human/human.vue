<!---->
<template>
    <div class='career-container'>
        <Row class="pos">
            <Select v-model="periodType"
                    @on-change="typeChange"
                    placeholder="周期类型"
                    style="width: 60px;">
                <Option :value="item.paramCode"
                        v-for="(item,index) in periodTypeList"
                        :key="index">{{item.paramInfoCn}}</Option>
            </Select>
            <Input v-model="period"
                   v-show="periodType === '04year'"
                   placeholder="周期"
                   icon="ios-search"
                   :readonly="true"
                   style="width: 100px;"
                   @on-click="pickYear"></Input>
            <Input v-model="period"
                   v-show="periodType === '03quarter'"
                   placeholder="周期"
                   icon="ios-search"
                   :readonly="true"
                   style="width: 100px;"
                   @on-click="pickYear1"></Input>
            <Input v-model="period"
                   v-show="periodType === '02month'"
                   placeholder="周期"
                   icon="ios-search"
                   :readonly="true"
                   style="width: 100px;"
                   @on-click="pickYear2"></Input>
        </Row>
        <humanEcharts ref="humanEcharts"></humanEcharts>
        <!--选择周期-->
        <transition name="fade">
            <searchYear v-show="openYear"
                        :searchCloumns="searchCloumnsYear"
                        :params="paramsYear"
                        @closeUpA="closeYear"
                        @changeinput="changeinputYear"
                        ref="searchYear"></searchYear>
        </transition>
        <transition name="fade">
            <searchYear1 v-show="openYear1"
                         :searchCloumns="searchCloumnsYear1"
                         :params="paramsYear1"
                         @closeUpA="closeYear1"
                         @changeinput="changeinputYear1"
                         ref="searchYear1"></searchYear1>
        </transition>
        <transition name="fade">
            <searchYear2 v-show="openYear2"
                         :searchCloumns="searchCloumnsYear2"
                         :params="paramsYear2"
                         @closeUpA="closeYear2"
                         @changeinput="changeinputYear2"
                         ref="searchYear2"></searchYear2>
        </transition>
    </div>
</template>
<script>
import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
import { isSuccess, deepCopy } from '../../../../lib/util'
import SearchYear from '../../components/searchYear'
import SearchYear1 from '../../components/searchYear1'
import SearchYear2 from '../../components/searchYear2'
import humanEcharts from './humanEcharts.vue'
export default {
    name: 'responsibleTask',
    data () {
        return {
            tableheight: document.body.offsetHeight - 130,
            resData: [],
            isShowCareer: false,
            nameInfo: '',
            period: '',
            periodTypeList: [], // 周期类型
            performanceType: '0',  // 指标类型 0: 销售 1:利润
            periodType: '02month',  // 周期类型
            openYear: false,
            // 点击给考核模板弹窗传参调接口
            paramsYear: {
                _mt:  this.$global.mt+'PlatFiscalyear.getSelectValue',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
            // 双击弹窗名称和key值
            searchCloumnsYear: [
                {
                    title: '年度',
                    key: 'fyYear',
                },
            ],
            // 季度
            openYear1: false,
            // 点击给考核模板弹窗传参调接口
            paramsYear1: {
                _mt:  this.$global.mt+'PlatFyquarter.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
            // 双击弹窗名称和key值
            searchCloumnsYear1: [
                {
                    title: '季度',
                    key: 'fyqtCode',
                },
            ],
            // 月
            openYear2: false,
            // 点击给考核模板弹窗传参调接口
            paramsYear2: {
                _mt:  this.$global.mt+'PlatFyperiod.getPage',
                sort: 'id',
                order: 'asc',
                rows: 10,
                page: 1,
                funId: '1',
                logType: this.$t('button.ser'),
            },
            // 双击弹窗名称和key值
            searchCloumnsYear2: [
                {
                    title: '月度',
                    key: 'fypdPeriod',
                },
            ],
        }
    },
    components: {
        SearchYear,
        SearchYear1,
        SearchYear2,
        humanEcharts,
    },
    mounted () {
        this.getSelect()
        let yearr = new Date().getFullYear() + ''   // 年
        let monthh = ((new Date().getMonth() + 1) + '').length === 1 ? '0' + (new Date().getMonth() + 1) : '' + (new Date().getMonth() + 1)
        this.period = yearr + monthh
        //  this.$refs.humanEcharts.getData(this.period, '02month')
    },
    methods: {
        getData () {
            this.periodType = '02month'
            let yearr = new Date().getFullYear() + ''   // 年
            let monthh = ((new Date().getMonth() + 1) + '').length === 1 ? '0' + (new Date().getMonth() + 1) : '' + (new Date().getMonth() + 1)
            this.period = yearr + monthh
            this.$refs.humanEcharts.getData(this.period, this.periodType)
        },
        // 选择年度
        closeYear () {
            this.openYear = false
        },
        pickYear () {
            this.$refs.searchYear.getData(this.paramsYear, this.page)
            this.openYear = true
        },
        changeinputYear (name, id) {
            this.period = name.fyYear
            this.$refs.humanEcharts.getData(this.period, this.periodType)
        },
        // 选择季度
        closeYear1 () {
            this.openYear1 = false
        },
        /**
         * 类型变了清空数据
         */
        typeChange () {
            this.period = ''
        },
        pickYear1 () {
            this.$refs.searchYear1.getData(this.paramsYear1, this.page)
            this.openYear1 = true
        },
        changeinputYear1 (name, id) {
            this.period = name.fyqtCode
            this.$refs.humanEcharts.getData(this.period, this.periodType)
        },
        // 选择月
        closeYear2 () {
            this.openYear2 = false
        },
        changeinputYear2 (name, id) {
            this.period = name.fypdPeriod
            this.$refs.humanEcharts.getData(this.period, this.periodType)
        },
        pickYear2 () {
            this.$refs.searchYear2.getData(this.paramsYear2, this.page)
            this.openYear2 = true
        },

        // 获取周期类型
        getSelect () {
            const t = this
            getDataLevelUserLogin({
                _mt:  this.$global.mt+'BaseParamInfo.getSelectValue',
                typeCode: 'assessperiod',
            }).then((res) => {
                if (isSuccess(res, t)) {
                    t.periodTypeList = res.data.content[0].value[0].paramList.splice(1)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
    },
}
</script>
<style lang='scss' scoped>
@media screen and (max-width: 1366px) {
    .career-container {
        height: 28.5% !important;
    }
    .pos {
        height: 25% !important;
    }
}
.career-container {
    display: inline-block;
    width: 48%;
    height: 27%;
    background: url("../../../../../static/largeScreen/compile_border.png")
        no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    overflow: hidden;
}
/deep/ .ivu-select-selection {
    background-color: rgba(21, 32, 49, 0.5);
    border: 1px solid rgba(67, 85, 121, 1);
}
/deep/ .ivu-select {
    color: rgba(254, 254, 254, 1);
}
/deep/ .ivu-input {
    background-color: rgba(21, 32, 49, 0.5);
    border: 1px solid rgba(67, 85, 121, 1);
    color: rgba(254, 254, 254, 1) !important;
}
/deep/ .ivu-select-item-focus {
    background-color: none;
}
/deep/ .ivu-select-item {
    background-color: #11162f;
    color: #fff;
}
/deep/ .ivu-select-dropdown {
    background-color: #11162f;
}
.pos {
    text-align: right;
    padding-top: 10px;
    padding-right: 10px;
    height: 20%;
}

/deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    height: 25px;
    line-height: 25px;
}
/deep/ .ivu-select-single .ivu-select-selection {
    height: 25px;
}
/deep/ .ivu-input {
    height: 25px;
    line-height: 25px;
}
/deep/ .ivu-input-icon {
    height: 25px;
    width: 25px;
    line-height: 25px;
}
</style>

