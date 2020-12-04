/*
 * @Author: guwenjiang
 * @Date: 2020-10-27 16:32:19
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-18 14:10:28
 */
import { displayEvent, setValue } from './public'
const OrgPost = {
    all_dis() {
        OrgPost.init_required(this);
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
    init_required(t) {
        setTimeout(() => {
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.status
            if (value == '03invalid') {
                dom.$refs.edate.$children[0].$children[0].isRequired = true;
                t.$set(dom.ruler.edate[0], 'required', true)
            } else {
                dom.$refs.edate.$children[0].$children[0].isRequired = false;
                t.$set(dom.ruler.edate[0], 'required', false)
            }
            dom.$refs.edate.$children[0].$children[0].resetField()
        }, 20)
    },
}
export default OrgPost