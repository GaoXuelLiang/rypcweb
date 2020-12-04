/*
 * @Author: guwenjiang
 * @Date: 2020-11-26 10:53:36
 * @LastEditors: guwenjiang
 * @LastEditTime: 2020-12-02 15:53:08
 */
import { displayEvent, setValue } from './public'
const EmpEducation = {
    all_dis () {
        EmpEducation.initValuation(this)
    },
    educBackgd (node) {
        let value = this.formDataSubmit[node.ruleText]
        let arr = ['educSchooltype', 'educSpecialtype', 'educSpecial', 'educLearntype', 'educIssecond']
        if (value === '00other' || value === '20elementary' || value === '30juniorschool' || value === '40highschool') {
            displayEvent(this, 0, arr)
        } else {
            displayEvent(this, 1, arr)
        }

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
            t.$set(form, 'empName', empName)
        }
    }
};

export default EmpEducation;