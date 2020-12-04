/*
 * @Author: guwenjiang
 * @Date: 2020-12-02 15:29:56
 * @LastEditors: guwenjiang
 * @LastEditTime: 2020-12-02 15:53:37
 */
import { displayEvent, setValue } from './public'
const EmpWorkexp = {
    all_dis() {
        EmpWorkexp.initValuation(this)
    },
    /**
     * @description: 初始化自助员工
     * @param {*} t
     * @return {*}
     */
    initValuation (t) {
        let roleType = t.$store.state.user.roleType;
        let empId = t.$store.state.user.empId;
        let empName = t.$store.state.user.empName;
        if(roleType === '6essmss' && t.logType === '新增') {
            let form = t.formlist.form;
            t.$set(form, 'empId', empId)
            t.$set(form, 'empIdDis', empName)
        }
    }
}
export default EmpWorkexp