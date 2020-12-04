import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
const PaysFlowPayrollsp = {
    all_dis () {
        PaysFlowPayrollsp.createby(this)
    },
    createby(t){
        let name = localStorage.name;
        initSetValue(t, {'payrCreateby': name})
    }
}
export default PaysFlowPayrollsp