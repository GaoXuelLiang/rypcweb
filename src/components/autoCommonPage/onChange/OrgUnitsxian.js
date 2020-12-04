/*
 * @Author: guwenjiang
 * @Date: 2020-11-17 17:57:07
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-18 13:47:21
 */
import { displayEvent, setValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
const OrgUnits = {
    all_dis () {
        OrgUnits.init_required(this)
        OrgUnits.init_showHide(this)
    },
    status (node) {
        const t = this;
        if (node.value == '03invalid') {
            t.$refs.edate.$children[0].$children[0].isRequired = true;
            t.$set(t.ruler.edate[0], 'required', true)
        } else {
            t.$refs.edate.$children[0].$children[0].isRequired = false;
            t.$set(t.ruler.edate[0], 'required', false)
        }
        t.$refs.edate.$children[0].$children[0].resetField()
    },
    init_showHide (t) {
        t.$nextTick(() => {
            if(t.logType === '新增') {
                t.$delete(t.$refs.commonSingleForm.formshow, 'unitSavefor')
                t.$set(t.$refs.commonSingleForm.formDataSubmit, 'unitSavefor', '')
            }
        })
    },
    init_required(t) {
        setTimeout(() => {
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.status
            if (value === '03invalid') {
                dom.$refs.edate.$children[0].$children[0].isRequired = true;
                t.$set(dom.ruler.edate[0], 'required', true)
            } else {
                dom.$refs.edate.$children[0].$children[0].isRequired = false;
                t.$set(dom.ruler.edate[0], 'required', false)
            }
            dom.$refs.edate.$children[0].$children[0].resetField()
        },20)
    },
}
export default OrgUnits;
