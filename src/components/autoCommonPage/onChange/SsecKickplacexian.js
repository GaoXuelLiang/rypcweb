/*
 * @Author: guwenjiang
 * @Date: 2020-11-17 20:39:34
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-17 20:53:56
 */
import { displayEvent, setValue } from './public'
const SsecKickplace = {
    all_dis () {
        SsecKickplace.initRequired(this)
    },
    placValidState (node) {
        const t = this;
        if (node.value == '03invalid') {
            t.$refs.placInvalidTime.$children[0].$children[0].isRequired = true;
            t.$set(t.ruler.placInvalidTime[0], 'required', true)
        } else {
            t.$refs.placInvalidTime.$children[0].$children[0].isRequired = false;
            t.$set(t.ruler.placInvalidTime[0], 'required', false)
        }
        t.$refs.placInvalidTime.$children[0].$children[0].resetField()
    },
    initRequired (t) {
        t.$nextTick(() => {
            let value = t.$refs.commonSingleForm.formDataSubmit.placValidState
            if (value == '03invalid') {
                t.$refs.commonSingleForm.$refs.placInvalidTime.$children[0].$children[0].isRequired = true;
                t.$set(t.$refs.commonSingleForm.ruler.placInvalidTime[0], 'required', true)
            } else {
                t.$refs.commonSingleForm.$refs.placInvalidTime.$children[0].$children[0].isRequired = false;
                t.$set(t.$refs.commonSingleForm.ruler.placInvalidTime[0], 'required', false)
            }
            t.$refs.commonSingleForm.$refs.placInvalidTime.$children[0].$children[0].resetField()
        })
    }
};

export default SsecKickplace;