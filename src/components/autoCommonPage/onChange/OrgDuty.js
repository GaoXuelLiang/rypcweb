import { displayEvent, setValue } from './public'
const OrgDuty = {
    all_dis () {
    },
    dutyPtodid(node){
        const t = this
        console.log(node,22222222222)
        if(node.thisValue == ''){
            console.log(22222222222)
            t.formDataSubmit.dutyBusrid = ""
            // t.formDataSubmit.etabUnitidDis = ""
            // t.formDataSubmit.etabDeptid = ""
            // t.formDataSubmit.etabDeptidDis = ""
            // t.formDataSubmit.etabPostid = ""
            // t.formDataSubmit.etabPostidDis = ""
        }
    }
}
export default OrgDuty;
