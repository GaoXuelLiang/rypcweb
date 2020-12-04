<!--
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-09-27 20:02:33
 * @LastEditTime: 2020-11-03 22:15:13
 * @LastEditors: Sok
-->
<template>
    <div class="table">
        <commonMainTable ref="commonMainTable"
                         :isSpecial="isSpecial"
                         @openUpdate='openUpdate'
                         @specialButton="btnEvents"></commonMainTable>
        <!-- 公司明细 -->
        <transition name="fade">
            <employeEdetails v-if="openEmploye"
                             :logType="logType"
                             @closeEmploye="closeEmploye"
                             :accountId='accountId'
                             ref="employeEdetails"></employeEdetails>
        </transition>
        <!-- 员工明细 -->
        <transition name="fade">
            <compensationdetials v-if="openCompensation"
                                 :logType="logType"
                                 @closeCompensation="closeCompensation"
                                 :accountId='accountId'
                                 :relationship='relationship'
                                 :paycphCompany='paycphCompany'
                                 ref="compensationdetials"></compensationdetials>
        </transition>
        <!-- 确认页面 -->
        <transition name="fade">
            <payRollPosition v-if="openPayOpinion"
                             :title="logType"
                             @closePayOpinion="closePayOpinion"
                             :dom="dom"
                             :ids=" ids"
                             ref="payRollPosition"></payRollPosition>
        </transition>
        <!-- 账套选人 -->
        <transition name="fade">
            <paySelectEmp v-if="openPaySelectEmp"
                             :logType="logType"
                             @closePaySelectEmp="closePaySelectEmp"
                             :selectionAlldata="selectionAlldata"
                             ref="paySelectEmp"></paySelectEmp>
        </transition>
    </div>
</template>

<script>
import { isSuccess, deepCopy } from "@/lib/util";
import { getDataLevelUserLoginData } from "@/axios/axios";
import commonMainTable from '@/components/autoCommonPage/autoSpecileTable/autoMainTableSpecile'
import employeEdetails from './employeEdetails'
import compensationdetials from './compensationdetials'
// 确认意见
import payRollPosition from '@/components/payRollPosition/payRollPosition'
// 账套选人
import paySelectEmp from './paySelectEmp'
export default {
    data () {
        return {
            isSpecial: true,
            openEmploye: false,
            openCompensation: false,
            logType: '',
            selectionAlldata: [],
            accountId: '',
            relationship: '',
            paycphCompany: '',
            // 确认意见
            openPayOpinion: false,
            dom: '',
            ids: [],
            // 账套选人
            openPaySelectEmp: false,
        }
    },
    components: {
        commonMainTable,
        employeEdetails,
        compensationdetials,
        // 确认意见
        payRollPosition,
        // 账套选人
        paySelectEmp
    },
    mounted () {
    },
    destroyed () {

    },
    mouted () {

    },
    methods: {
        // 
        openUpdate () {
            const t = this
            t.openEmploye = true
        },
        closeEmploye () {
            const t = this
            t.openEmploye = false
        },
        closeCompensation () {
            const t = this
            t.openCompensation = false
        },
        // 确认意见
        closePayOpinion () {
            const t = this
            t.openPayOpinion = false
        },
        // 账套选人
        closePaySelectEmp () {
            const t = this
            t.openPaySelectEmp = false
            // t.$refs.commonMainTable.tableselected = []
            t.$refs.commonMainTable.$refs.selection.selectAll(false)
        },
        //特殊按钮事件
        btnEvents (code, t, params) {
            if (code === "button_y_employee") {
                if (t.tbName == 'PaySalacalc') {
                    this.logType = params.row.payhrcSalcycleDis + ' ' + params.row.payhrcAtyidDis + ' ' + params.row.payhrcRoundDis + ' ' + '薪资员工明细'
                    this.selectionAlldata = t.selectionAlldata
                    this.accountId = params.row.payhrcAtyid
                    this.relationship = 'dad'
                } else {
                    this.logType = params.row.paycphSalcycleDis + ' ' + params.row.paycphCompanyDis + ' ' + params.row.paycphRoundDis + ' ' + '薪资员工明细'
                    this.selectionAlldata = t.selectionAlldata
                    this.accountId = params.row.paycphAtyid
                    this.relationship = 'son'
                    this.paycphCompany = params.row.paycphCompany
                }
                this.openCompensation = true
                t.$store.commit('autoCommonPage/setMainId', params.row.id);
            } else if (code === "button_y_company") {
                this.openEmploye = true
                this.logType = params.row.payhrcSalcycleDis + ' ' + params.row.payhrcAtyidDis + ' ' + params.row.payhrcRoundDis + ' ' + '薪资公司明细'
                this.selectionAlldata = t.selectionAlldata
                this.accountId = params.row.payhrcAtyid
                t.$store.commit('autoCommonPage/setMainId', params.row.id);
            } else if (code === "button_confirm") {
                if (t.tableselected.length === 0) {
                    t.$Modal.warning({
                        title: t.$t("reminder.remind"),
                        content: t.$t("reminder.leastone"),
                    });
                } else {
                    this.ids = [];
                    for (let v of t.selectionAlldata) {
                        if (t.homePageFiltering.indexOf('02salaryUnconfirmed') !== -1 && v.stutas === '02salaryUnconfirmed') {
                            this.ids.push(v.id)
                        } else if (t.homePageFiltering.indexOf('01BPunconfirmed') !== -1 && v.stutas === '01BPunconfirmed') {
                            this.ids.push(v.id)
                        } else if (t.homePageFiltering.indexOf('06BPyesprincipalNo') !== -1 && v.stutas === '06BPyesprincipalNo') {
                            this.ids.push(v.id)
                        }
                    }
                    if (this.ids.length < 1) {
                        t.$Modal.warning({
                            title: t.$t('reminder.err'),
                            content: '请选择符合条件的数据！',
                        })
                        return
                    }
                    this.openPayOpinion = true
                    if (t.tbName === "PayCphsdetail") {
                        let sta = ""
                        if (t.titleName === "薪资应发确认") {
                            sta = "薪资应发确认"
                        } else if (t.薪资结果核查 === "薪资结果核查") {
                            sta = "薪资结果核查"
                        } else if (t.titleName === "薪资结果确认") {
                            sta = "薪资结果确认"
                        } else { }
                        this.logType = sta;
                    } else { }
                    this.dom = t;
                }
            } else if (code === "button_paySelect"){
                if (t.tableselected.length === 0) {
                    t.$Modal.warning({
                        title: t.$t("reminder.remind"),
                        content: t.$t("reminder.leastone"),
                    });
                } else if (t.tableselected.length > 1) {
                    t.$Modal.warning({
                        title: t.$t("reminder.remind"),
                        content: '请选择一条数据',
                    });
                } else {
                    // 薪资应发核算-----账套选人
                    this.openPaySelectEmp = true
                    this.selectionAlldata = t.selectionAlldata
                    // this.logType = params.row.payhrcSalcycleDis + ' ' + params.row.payhrcAtyidDis + ' ' + params.row.payhrcRoundDis + ' ' + '薪资公司明细'
                    this.logType = "算薪人员名单"
                    // this.accountId = t.selectionAlldata[0].payhrcAtyid
                    t.$store.commit('autoCommonPage/setMainId', t.selectionAlldata[0].id);

                }
            }
            
        },
    }
}
</script>

<style lang="scss" scoped>
</style>