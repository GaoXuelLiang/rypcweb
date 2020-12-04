/*
 * @Author: your name
 * @Date: 2020-11-12 23:23:18
 * @LastEditTime: 2020-11-20 20:57:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\pages\common\onChange\OrgFlowAdjust.js
 */
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
const OrgFlowAdjust = {
    all_dis() {

    },
    // 原编制
    adjOstaff () {
        const t = this;
        OrgFlowAdjust.count_adjAddnstaff(t);
    },
    // 新编制
    adjNstaff (node) {
        const t = this;
        OrgFlowAdjust.count_adjAddnstaff(t);
    },
    // 增编岗位原编制
    adjAddostaff () {
        const t = this;
        OrgFlowAdjust.count_adjAddnstaff(t);
    },
    // 增编岗位新编制
    count_adjAddnstaff (t) {
        let adjNstaff = t.formDataSubmit.adjNstaff;
        let adjAddostaff = t.formDataSubmit.adjAddostaff;
        let adjOstaff = t.formDataSubmit.adjOstaff;
        let count = '';
        if(adjAddostaff && adjOstaff) {
            if(!isNaN(adjNstaff) && !isNaN(adjAddostaff) && !isNaN(adjOstaff)) {
                if(Number(adjNstaff) <= Number(adjOstaff)) {
                    count = (Number(adjOstaff) - Number(adjNstaff) + Number(adjAddostaff)).toFixed(1);
                }else {
                    count = '';
                }
            }
        }
        setValue(t, {'adjAddnstaff': count})
    }
}
export default OrgFlowAdjust;