import { displayEvent, setValue } from './public'
const SsecInsur = {
    all_dis() {},
    /**
     * @description 个人基数上限
     * @param {*} node
     */
    insPerbasup (node) {
        const t = this;
        let thisValue = node.thisValue;
        let rateValue = t.formDataSubmit.insPeratio;
        SsecInsur.limit([thisValue], rateValue, t, ['insPerpayup']);
    },
    /**
     * @description 个人基数下限
     * @param {*} node
     */
    insPerbasdw (node) {
        const t = this;
        let thisValue = node.thisValue;
        let rateValue = t.formDataSubmit.insPeratio;
        SsecInsur.limit([thisValue], rateValue, t, ['insPerpaydw']);
    },
    /**
     * @description 个人缴纳比例（%）
     * @param {*} node
     */
    insPeratio (node) {
        const t = this;
        let rateValue = node.thisValue;
        let insPerbasup = t.formDataSubmit.insPerbasup;
        let insPerbasdw = t.formDataSubmit.insPerbasdw;
        SsecInsur.limit([insPerbasup, insPerbasdw], rateValue, t, ['insPerpayup', 'insPerpaydw']);
    },
    /**
     * @description 公司基数上限
     * @param {*} node
     */
    insCobasup (node) {
        const t = this;
        let thisValue = node.thisValue;
        let rateValue = t.formDataSubmit.insCoratio;
        SsecInsur.limit([thisValue], rateValue, t, ['insCopayup']);
    },
    /**
     * @description 公司基数下限
     * @param {*} node
     */
    insCobasdw (node) {
        const t = this;
        let thisValue = node.thisValue;
        let rateValue = t.formDataSubmit.insCoratio;
        // let str = 'GuWenJiang';
        // let num = 0;
        // let upperCase = '';
        // for(let i = 0; i < str.length; i++) {
        //     console.log(str[i].charCodeAt(0),"code")
        //     if(str[i].charCodeAt(0) > 64 && str[i].charCodeAt(0) < 91) {
        //         if(num === 1) {
        //             upperCase = str[i];
        //             break;
        //         }
        //         num ++;
        //     }
        // }
        // console.log(upperCase,"upperCase")
        // let lastName = str.substr(str.indexOf(upperCase),str.length);
        // let firstName = str.substr(0, str.indexOf(upperCase));
        // console.log(firstName,"firstName")
        // console.log(lastName,"lastName")
        SsecInsur.limit([thisValue], rateValue, t, ['insCopaydw']);
    },
    /**
     * @description 公司缴纳比例（%）
     * @param {*} node
     */
    insCoratio (node) {
        const t = this;
        let rateValue = node.thisValue;
        let insCobasup = t.formDataSubmit.insCobasup;
        let insCobasdw = t.formDataSubmit.insCobasdw;
        SsecInsur.limit([insCobasup, insCobasdw], rateValue, t, ['insCopayup', 'insCopaydw']);
    },
    /**
     * @description 上限下限（个人&公司）
     * @param {*} 
     * thisValueArr/rateValue/this/setDom
     */
    limit (thisValueArr, rateValue, t, setDom) {
        for(let i=0; i<thisValueArr.length; i++) {
            let value = '';
            let obj  = {}
            if(thisValueArr[i] && rateValue) {
                value = (thisValueArr[i] * rateValue / 100).toFixed(2);
            }
            obj[setDom[i]] = value;
            setValue(t, obj);
        }
    }
}
export default SsecInsur