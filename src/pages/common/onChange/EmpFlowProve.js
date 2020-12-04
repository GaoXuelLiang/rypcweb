
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
const EmpFlowProve = {
    all_dis () {
        EmpFlowProve.setInitData(this)
    },
    /**
   * @description: 初始化
   * @param {*}
   * @return {*}
   */
    setInitData (t) {
        console.log(t, "t")
        if (t.formDataSubmit.empId && t.formDataSubmit.empId !== '') {
            return
        }
        let empId = t.$store.state.user.empId
        if (empId && empId !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpInfo.getById',
                APid: empId,
                APffk: `gep${t.funId}`,
            }).then(res => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    let obj = {
                        'empId': data.id,
                        'empIdDis': data.empName,
                        'eproEmpno': data.empEmpno,
                        'eproUnitid': data.empUnitid,
                        'eproUnitidDis': data.empUnitidDis,
                        'eproDeptid': data.empDeptid,
                        'eproDeptidDis': data.empDeptidDis,
                        'eproPostid': data.empPostid,
                        'eproPostidDis': data.empPostidDis,
                        'eproBusridDis': data.empBusridDis,
                        'eproDutyidDis': data.empDutyIdDis,
                        'eproRankidDis': data.empRankinfoIdDis,
                        'eproEntryDate': data.empEdate,
                    }
                    initSetValue(t, obj)
                }
            })
        }
    },
}
export default EmpFlowProve