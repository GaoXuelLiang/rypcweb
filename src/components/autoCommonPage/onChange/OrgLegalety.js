/*
 * @Author: guwenjiang
 * @Date: 2020-10-26 11:08:15
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-18 13:51:07
 */
import { displayEvent, setValue } from './public'
const OrgLegalety = {
    all_dis() {
        OrgLegalety.init_required(this);
    },
    status (node) {
        const t = this;
        if (node.value == '03invalid') {
            t.$refs.legtEdate.$children[0].$children[0].isRequired = true;
            t.$set(t.ruler.legtEdate[0], 'required', true)
        } else {
            t.$refs.legtEdate.$children[0].$children[0].isRequired = false;
            t.$set(t.ruler.legtEdate[0], 'required', false)
        }
        t.$refs.legtEdate.$children[0].$children[0].resetField()
    },
    init_required(t) {
        setTimeout(() => {
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.status
            if (value == '03invalid') {
                dom.$refs.legtEdate.$children[0].$children[0].isRequired = true;
                t.$set(dom.ruler.legtEdate[0], 'required', true)
            } else {
                dom.$refs.legtEdate.$children[0].$children[0].isRequired = false;
                t.$set(dom.ruler.legtEdate[0], 'required', false)
            }
            dom.$refs.legtEdate.$children[0].$children[0].resetField()
        }, 20)
    }
}
export default OrgLegalety