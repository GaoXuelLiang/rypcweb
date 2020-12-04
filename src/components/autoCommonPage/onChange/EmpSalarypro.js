/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-22 10:47:26
 * @LastEditTime: 2020-11-13 18:10:15
 * @LastEditors: Sok
 */
import { displayEvent, setValue ,initDisplayEvent,disabledEvent} from './public'
const EmpSalarypro = {
    all_dis() {
        // EmpSalarypro.empspSalaryType_Dis(this)
    },
    empspSalaryTypeDis(node){
        let empspSalaryTypeDis = this.formDataSubmit[node.ruleText]
        let arr = ['empspSum']
        if(empspSalaryTypeDis=='小数'||empspSalaryTypeDis=='整数'){
            displayEvent(this, 1, arr)
        }else{
            displayEvent(this, 0, arr)
        }
    }
};

export default EmpSalarypro;