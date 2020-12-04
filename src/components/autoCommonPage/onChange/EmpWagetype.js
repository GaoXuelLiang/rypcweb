import { displayEvent, setValue } from './public'
const EmpWagetype = {
    all_dis () {},
    wgMoney (node) {
        const t = this;
        EmpWagetype.wgDiscountmoney_dis(t)
    },
    wgItem (node) {
        const t = this;
        EmpWagetype.wgDiscountmoney_dis(t)
    },
    wgDiscountmoney_dis(t) {
        let wgItem = t.formDataSubmit.wgItem;
        let wgMoney = t.formDataSubmit.wgMoney;
        if(!isNaN(wgItem) && !isNaN(wgMoney)) {
            let sum = (Number(wgItem) * Number(wgMoney) / 100).toFixed(2)
            setValue(t, {'wgDiscountmoney': sum.toString()})
        }
    }
}
export default EmpWagetype