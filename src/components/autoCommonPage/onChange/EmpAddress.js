/*
 * @Author: guwenjiang
 * @Date: 2020-11-26 10:53:36
 * @LastEditors: guwenjiang
 * @LastEditTime: 2020-12-02 15:53:47
 */
import { displayEvent, setValue } from './public'
const EmpAddress = {
    all_dis () {
        EmpAddress.addrNatid_dis(this)
        EmpAddress.initValuation(this)
    },
    addrNatid (node) {
        let arr = ['addrPcityid', 'addrCityid', 'addrCcityid']
        if (this.formDataSubmit[node.ruleText] == '1127') {
            displayEvent(this, 1, arr)
        } else {
            displayEvent(this, 0, arr)
        }

    },
    empaddNatid (node) {
       
        let arr = ['empaddPcityid', 'empaddCityid']
        if (this.formDataSubmit[node.ruleText] == '1002') {
            displayEvent(this, 1, arr)
        } else {
            displayEvent(this, 0, arr)
        }

    },
    addrNatid_dis (t) {

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
};

export default EmpAddress;