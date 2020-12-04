import { initDisplayEvent, displayEvent, setValue } from './public'
const PaysEmpZqsalary = {
    all_dis() {

    },
    // 金额
    zqxzMoney (node) {
        const t = this;
        PaysEmpZqsalary.count_zqxzZkmon(t);
    },
    // 项目折扣（%）
    zqxzProzk (node) {
        const t = this;
        PaysEmpZqsalary.count_zqxzZkmon(t);
    },
    // 计算折扣金额
    count_zqxzZkmon (t) {
        let count = t.formDataSubmit.zqxzMoney ? t.formDataSubmit.zqxzMoney : 0;
        let discount = t.formDataSubmit.zqxzProzk ? t.formDataSubmit.zqxzProzk : 0;
        let sum = 0;
        if(!isNaN(count) && !isNaN(discount)) {
            sum = (Number(count) * Number(discount) / 100).toFixed(2);
        }else {
            sum = '0.00'
        }
        setValue(t, {'zqxzZkmon': sum})
    }
}
export default PaysEmpZqsalary