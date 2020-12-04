/*
 * @Author: guwenjiang
 * @Date: 2020-11-26 11:30:45
 * @LastEditors: guwenjiang
 * @LastEditTime: 2020-11-27 15:44:59
 */
import { displayEvent, setValue } from './public'
const SsecBillman = {
    all_dis () {

    },
    billCopenbase (node) { //公司养老基数
        const t = this;
        let rate = t.formDataSubmit.billCopenrat;
        SsecBillman.setSingleSum(t, 'billCopenmount', node.thisValue, rate)
    },
    billCopenrat (node) { //公司养老比例
        const t = this;
        let num = t.formDataSubmit.billCopenbase;
        SsecBillman.setSingleSum(t, 'billCopenmount', num, node.thisValue)
    },
    billCoumpbase (node) { //公司失业基数
        const t = this;
        let rate = t.formDataSubmit.billCoumpratio;
        SsecBillman.setSingleSum(t, 'billCoumpmount', node.thisValue, rate)
    },
    billCoumpratio (node) { //公司失业比例
        const t = this;
        let num = t.formDataSubmit.billCoumpbase;
        SsecBillman.setSingleSum(t, 'billCoumpmount', num, node.thisValue)
    },
    billComedbase (node) { //公司医疗基数
        const t = this;
        let rate = t.formDataSubmit.billComedratio;
        SsecBillman.setSingleSum(t, 'billComedmount', node.thisValue, rate)
    },
    billComedratio (node) { //公司医疗比例
        const t = this;
        let num = t.formDataSubmit.billComedbase;
        SsecBillman.setSingleSum(t, 'billComedmount', num, node.thisValue)
    },
    billCoinjbase (node) { //公司工伤基数
        const t = this;
        let rate = t.formDataSubmit.billCoinjratio;
        SsecBillman.setSingleSum(t, 'billCoinjmount', node.thisValue, rate)
    },
    billCoinjratio (node) { //公司工伤比例
        const t = this;
        let num = t.formDataSubmit.billCoinjbase;
        SsecBillman.setSingleSum(t, 'billCoinjmount', num, node.thisValue)
    },
    billCobitbase (node) { //公司生育基数
        const t = this;
        let rate = t.formDataSubmit.billCobitratio;
        SsecBillman.setSingleSum(t, 'billCobitmount', node.thisValue, rate)
    },
    billCobitratio (node) { //公司生育比例
        const t = this;
        let num = t.formDataSubmit.billCobitbase;
        SsecBillman.setSingleSum(t, 'billCobitmount', num, node.thisValue)
    },
    billCofundbas (node) { //公司公积金基数
        const t = this;
        let rate = t.formDataSubmit.billCofundratio;
        SsecBillman.setSingleSum(t, 'billCofundmount', node.thisValue, rate)
    },
    billCofundratio (node) { //公司公积金比例
        const t = this;
        let num = t.formDataSubmit.billCofundbas;
        SsecBillman.setSingleSum(t, 'billCofundmount', num, node.thisValue)
    },

    billPerpenbase (node) { //个人养老基数
        const t = this;
        let rate = t.formDataSubmit.billPerpenrat;
        SsecBillman.setSingleSum(t, 'billPerpenmount', node.thisValue, rate)
    },
    billPerpenrat (node) { //个人养老比例
        const t = this;
        let num = t.formDataSubmit.billPerpenbase;
        SsecBillman.setSingleSum(t, 'billPerpenmount', num, node.thisValue)
    },
    billPerumpbase (node) { //个人失业基数
        const t = this;
        let rate = t.formDataSubmit.billPerumpratio;
        SsecBillman.setSingleSum(t, 'billPerumpmount', node.thisValue, rate)
    },
    billPerumpratio (node) { //个人失业比例
        const t = this;
        let num = t.formDataSubmit.billPerumpbase;
        SsecBillman.setSingleSum(t, 'billPerumpmount', num, node.thisValue)
    },
    billPermedbase (node) { //个人医疗基数
        const t = this;
        let rate = t.formDataSubmit.billPermedratio;
        SsecBillman.setSingleSum(t, 'billPermedmount', node.thisValue, rate)
    },
    billPermedratio (node) { //个人医疗比例
        const t = this;
        let num = t.formDataSubmit.billPermedbase;
        SsecBillman.setSingleSum(t, 'billPermedmount', num, node.thisValue)
    },
    billPerfundbas (node) { //个人公积金基数
        const t = this;
        let rate = t.formDataSubmit.billPerfundratio;
        SsecBillman.setSingleSum(t, 'billPerfundmount', node.thisValue, rate)
    },
    billPerfundratio (node) { //个人公积金比例
        const t = this;
        let num = t.formDataSubmit.billPerfundbas;
        SsecBillman.setSingleSum(t, 'billPerfundmount', num, node.thisValue)
    },
    
    /**
     * @description: 计算单个金额（基数 * 比例）
     * @param {*} t
     * @param {*} dom
     * @param {*} num
     * @param {*} rate
     * @return {*}
     */
    setSingleSum (t, dom, num, rate, node) {
        let sum = 0;
        let obj = {}
        if(!isNaN(num) && !isNaN(rate)) {
            sum = Number(num) * Number(rate)
        }
        obj[dom] = sum.toFixed(2)
        setValue(t, obj)
        // let obj = {
        //     billCopenmount: 'billCopenbase*billCopenrat',
        //     billCoumpmount: 'billCoumpbase*billCoumpratio'
        // }
        // for(let key in obj) {
        //     if(node === key) {
        //         let formula = obj[key].split('*');
        //         let valK = {};
        //         let num = t.formDataSubmit[formula[0]];
        //         let rate = t.formDataSubmit[formula[1]];
        //         if(!isNaN(num) && !isNaN(rate)) {
        //             sum = num * rate;
        //         }
        //         valK[key] = sum.toFixed(2)
        //         setValue(t, valK)
        //     }
        // }
    },

    billCopenmount (node) { // 公司养老金额
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billCoumpmount (node) { // 公司失业金额
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billComedmount (node) { // 公司医疗金额
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billCoinjmount (node) { // 公司工伤金额
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billCobitmount (node) { // 公司生育金额
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billCotreat (node) { // 公司大病医疗金额
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billCother (node) { // 公司其它金额
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billRes (node) { // 残保金
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billCofundmount (node) { // 公司公积金金额
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billCoheat (node) { // 采暖费公司缴纳
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    billCoheatsupply (node) { // 采暖费公司补缴
        const t = this;
        SsecBillman.setCompSum(t, node.thisValue)
    },
    /**
     * @description: 计算公司合计金额
     * @param {*} t
     * @return {*}
     */
    setCompSum (t, value) {
        // 公司养老金额 billCopenmount
        // 公司失业金额 billCoumpmount
        // 公司医疗金额 billComedmount
        // 公司工伤金额 billCoinjmount
        // 公司生育金额 billCobitmount
        // 公司大病医疗金额 billCotreat
        // 公司其它金额 billCother
        // 残保金 billRes
        // 公司公积金金额 billCofundmount
        // 采暖费公司缴纳 billCoheat
        // 采暖费公司补缴 billCoheatsupply
        let arr = ['billCopenmount', 'billCoumpmount', 'billComedmount', 'billCoinjmount', 'billCobitmount',
                   'billCotreat','billCother', 'billRes', 'billCofundmount', 'billCoheat', 'billCoheatsupply']
        let sum = 0;
        for(let v of arr) {
            let value = t.formDataSubmit[v]
            if(!isNaN(value)) {
                sum += Number(value)
            }
        }
        setValue(t, {'billCototal': sum.toFixed(2)})
    },
    
    billPerpenmount (node) { // 个人养老金额
        const t = this;
        SsecBillman.setPersSum(t, node.thisValue)
    },
    billPerumpmount (node) { // 个人失业金额
        const t = this;
        SsecBillman.setPersSum(t, node.thisValue)
    },
    billPermedmount (node) { // 个人医疗金额
        const t = this;
        SsecBillman.setPersSum(t, node.thisValue)
    },
    billPertreat (node) { // 个人大病医疗金额
        const t = this;
        SsecBillman.setPersSum(t, node.thisValue)
    },
    billPeroher (node) { // 个人其它金额
        const t = this;
        SsecBillman.setPersSum(t, node.thisValue)
    },
    billPerfundmount (node) { // 个人公积金金额
        const t = this;
        SsecBillman.setPersSum(t, node.thisValue)
    },
    /**
     * @description: 计算个人合计金额
     * @param {*} t
     * @return {*}
     */
    setPersSum (t) {
        // 个人养老金额 billPerpenmount
        // 个人失业金额 billPerumpmount
        // 个人医疗金额 billPermedmount
        // 个人大病医疗金额 billPertreat
        // 个人其它金额 billPeroher
        // 个人公积金金额 billPerfundmount
        let arr = ['billPerpenmount', 'billPerumpmount', 'billPermedmount', 'billPertreat', 'billPeroher', 'billPerfundmount']
        let sum = 0;
        for(let v of arr) {
            let value = t.formDataSubmit[v]
            if(!isNaN(value)) {
                sum += Number(value)
            }
        }
        setValue(t, {'billPertotal': sum.toFixed(2)})
    },

    billCototal (node) { //公司总计金额
        const t = this;
        SsecBillman.setTotalSum(t, node.thisValue)
    },
    billPertotal (node) { //个人总计金额
        const t = this;
        SsecBillman.setTotalSum(t, node.thisValue)
    },
    /**
     * @description: 计算总计金额
     * @param {*} t
     * @return {*}
     */
    setTotalSum (t) {
        let arr = ['billCototal', 'billPertotal']
        let sum = 0;
        for(let v of arr) {
            let value = t.formDataSubmit[v]
            if(!isNaN(value)) {
                sum += Number(value)
            }
        }
        setValue(t, {'billTotal': sum.toFixed(2)})
    }
}
export default SsecBillman