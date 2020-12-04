
import { displayEvent, setValue } from './public'
const EmpAppinfo = {
    all_dis() {},
    empappUnitid (node) {
        const t = this;
        if(node.thisId !== t.formDataSubmit[node.ruleText] || !node.thisValue) {
            let obj = {
                'empappDeptid': '',
                'empappDeptidDis': ''
            }
            setValue(t, obj);
            t.$refs.empappDeptid.thisValue = '';
            t.$refs.empappDeptid.thisId = '';
        }
    },
    empappDeptid (node) {
        const t = this;
        if(node.thisId !== t.formDataSubmit[node.ruleText] || !node.thisValue) {
            let obj = {
                'empappPostid': '',
                'empappPostidDis': '',
                'empappUnitscope': ''
            }
            setValue(t, obj);
            t.$refs.empappPostid.thisValue = '';
            t.$refs.empappPostid.thisId = '';
            t.$refs.empappUnitscope.thisValue = '';
        }
        console.log(t.formDataSubmit,"formDataSubmit")
        console.log(node,'node')
    },
    empappPostid (node) {
        const t = this;
        if(node.thisId !== t.formDataSubmit[node.ruleText] || !node.thisValue) {
            let obj = {
                'postPtodidDis': '',
                'postBusridDis': '',
                'postBumdidDis': '',
                'postDutyidDis': '',
                'postRankidDis': '',
                'postRankinfoDis': '',
            }
            setValue(t, obj);
            t.$refs.postPtodidDis.thisValue = '';
            t.$refs.postBusridDis.thisValue = '';
            t.$refs.postBumdidDis.thisValue = '';
            t.$refs.postDutyidDis.thisValue = '';
            t.$refs.postRankidDis.thisValue = '';
            t.$refs.postRankinfoDis.thisValue = '';
        }
    }
}
export default EmpAppinfo