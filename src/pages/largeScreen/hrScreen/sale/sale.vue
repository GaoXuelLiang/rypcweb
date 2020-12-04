<template>
    <div class="sales_bg">
        <!-- <div class="tit1">
      <p>
        <span :class='{ activeClass:showColor == 0}' @click="getStr(0)">销售额</span>
        <span :class='{ activeClass:showColor == 1}' @click="getStr(1)">利润</span>
      </p>
    </div> -->
        <Row class="pos">
            <i-col class="pos1">
                <Select v-model="periodType"
                        @on-change="typeChange"
                        placeholder="周期类型">
                    <Option :value="item.paramCode"
                            v-for="(item,index) in periodTypeList"
                            :key="index">{{item.paramInfoCn}}</Option>
                </Select>
            </i-col>
            <i-col class="pos2"
                   v-if="periodType !== ''">
                <Input v-model="period"
                       v-show="periodType === '04year'"
                       placeholder="周期"
                       icon="ios-search"
                       :readonly="true"
                       @on-click="pickYear"></Input>
                <Input v-model="period"
                       v-show="periodType === '03quarter'"
                       placeholder="周期"
                       icon="ios-search"
                       :readonly="true"
                       @on-click="pickYear1"></Input>
                <Input v-model="period"
                       v-show="periodType === '02month'"
                       placeholder="周期"
                       icon="ios-search"
                       :readonly="true"
                       @on-click="pickYear2"></Input>
            </i-col>
        </Row>
        <salePie ref="salePie"
                 class='pie-container pie1'></salePie>
        <img style="width: 100%;"
             src="../../../../../static/largeScreen/sale_border.png"
             alt="">
        <rankOrderPie ref="rankOrderPie"
                      class='pie-container pie2'></rankOrderPie>
        <img style="width: 100%;"
             src="../../../../../static/largeScreen/sale_border.png"
             alt="">
        <customOrderPie ref="customOrderPie"
                        class='pie-container pie3'></customOrderPie>
        <img style="width: 100%;"
             src="../../../../../static/largeScreen/sale_border.png"
             alt="">
        <efficiencyPie ref="efficiencyPie"
                       class='pie-container pie4'
                       @getResArr='getResArr'></efficiencyPie>
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
import { isSuccess, getUrlKey } from '../../../../lib/util'
import SearchYear from '../../components/searchYear'
import SearchYear1 from '../../components/searchYear1'
import SearchYear2 from '../../components/searchYear2'
import salePie from './component/salePie'
import rankOrderPie from './component/rankOrderPie'
import customOrderPie from './component/customOrderPie'
import efficiencyPie from './component/efficiencyPie'
import labelData from './component/labelData'
export default {
    name: 'sale',
    data () {
        return {
            rankheight: '',
            showModal: false,
            data: [],
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
            periodTypeList: [], // 周期类型
            performanceType: '0',  // 指标类型 0: 销售 1:利润
            periodType: '02month',  // 周期类型
            period: '',  // 周期
            selectCompid: '', // 公司id
            showColor: 0, // 点击颜色初始化
            showLabelMore: false, // 标签分析更多初始化
            isLabelData2: false,
        }
    },
    components: {
        SearchYear,
        SearchYear1,
        SearchYear2,
        labelData,
        salePie,
        rankOrderPie,
        customOrderPie,
        efficiencyPie,
    },
    mounted () {
        let yearr = new Date().getFullYear() + ''   // 年
        let monthh = ((new Date().getMonth() + 1) + '').length === 1 ? '0' + (new Date().getMonth() + 1) : '' + (new Date().getMonth() + 1)
        this.period = yearr + monthh
        this.getSelect()
    },
    computed: {
        inventoryEmpId () {
            return this.$store.state.inventoryPortaritSave.inventoryEmpId
        },
    },
    watch: {
    },
    methods: {
        getData () {
            this.selectCompid = this.inventoryEmpId
            this.showColor = 0
            this.periodType = '02month'
            let yearr = new Date().getFullYear() + ''   // 年
            let monthh = ((new Date().getMonth() + 1) + '').length === 1 ? '0' + (new Date().getMonth() + 1) : '' + (new Date().getMonth() + 1)
            this.period = yearr + monthh
            this.postAll()
        },
        postAll () {
            this.$refs.salePie.getData(this.selectCompid, this.periodType, this.period)  // 图一
            this.$refs.salePie.getData2(this.selectCompid, this.periodType, this.period)
            this.$refs.rankOrderPie.getData(this.selectCompid, this.periodType, this.period)   // 图二
            this.$refs.rankOrderPie.getData2(this.selectCompid, this.periodType, this.period)
            this.$refs.customOrderPie.getData(this.selectCompid, this.periodType, this.period)   // 图三
            this.$refs.efficiencyPie.getData(this.selectCompid, this.periodType, this.period)  // 图四
        },
        getStr (type) {
            this.showColor = type
            this.performanceType = type
            this.postAll()
        },
        // 更多弹窗
        getDataLabelMore () {
            this.isLabelData2 = true
            this.$nextTick(() => {
                this.$refs.labelData2.getData(this.selectCompid, this.performanceType, this.periodType, this.period)
            })
        },
        closeLabel () {
            this.isLabelData2 = false
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
        /**
         * 类型变了清空数据
         */
        typeChange () {
            this.period = ''
        },
        // 选择年度
        closeYear () {
            this.openYear = false
        },
        changeinputYear (name, id) {
            this.period = name.fyYear
            this.postAll()
        },
        pickYear () {
            this.$refs.searchYear.getData(this.paramsYear, this.page)
            this.openYear = true
        },
        // 选择季度
        closeYear1 () {
            this.openYear1 = false
        },
        changeinputYear1 (name, id) {
            this.period = name.fyqtCode
            this.postAll()
        },
        pickYear1 () {
            this.$refs.searchYear1.getData(this.paramsYear1, this.page)
            this.openYear1 = true
        },
        // 选择月
        closeYear2 () {
            this.openYear2 = false
        },
        changeinputYear2 (name, id) {
            this.period = name.fypdPeriod
            this.postAll()
        },
        pickYear2 () {
            this.$refs.searchYear2.getData(this.paramsYear2, this.page)
            this.openYear2 = true
        },
        getResArr (resArr) {
            if (resArr.length > 5) {
                this.showLabelMore = true
            } else {
                this.showLabelMore = false
            }
        },
    },
}

</script>
<style lang="scss" scoped>
.activeClass {
    color: rgba(128, 175, 248, 1) !important;
}
.sales_bg {
    background: url("../../../../../static/largeScreen/left_bg.png") no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
p {
    display: flex;
    margin-top: 10px;
    span {
        flex: 1;
        text-align: center;
        display: inline-block;
        height: 40px;
        width: 100%;
        line-height: 40px;
        color: rgba(254, 254, 254, 1);
        background: url("../../../../../static/largeScreen/sale_title.png")
            no-repeat;
        background-position: 50% 100%;
        background-size: 55% 100%;
    }
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
.pie-container {
    overflow: hidden;
}
.pie2 {
    padding: 5% 0 3% 0;
}
.pos {
    text-align: right;
    margin-top: 10px;
    padding-right: 10px;
}
.pos1 {
    width: 60px;
    height: 25px;
    display: inline-block;
}
.pos2 {
    width: 85px;
    display: inline-block;
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
/deep/ .ivu-select-item-focus,
.ivu-select-item:hover {
    background: unset;
}
</style>
