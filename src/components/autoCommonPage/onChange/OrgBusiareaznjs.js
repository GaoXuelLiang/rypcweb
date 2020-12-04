/*
 * @Author: guwenjiang
 * @Date: 2020-10-27 16:13:09
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-18 14:03:59
 */
import { displayEvent, setValue } from './public'
const OrgBusiarea = {
    all_dis() {
        OrgBusiarea.init_required(this);
    },
    status (node) {
        const t = this;
        if (node.value == '03invalid') {
            t.$refs.busrEdate.$children[0].$children[0].isRequired = true;
            t.ruler.busrEdate.forEach(item => {
              t.$set(item, 'required', true) 
          });
        } else {
            t.$refs.busrEdate.$children[0].$children[0].isRequired = false;
            t.ruler.busrEdate.forEach(item => {
              t.$set(item, 'required', false) 
          });
        }
        t.$refs.busrEdate.$children[0].$children[0].resetField()
    },
    init_required(t) {
        setTimeout(() => {
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.status
            if (value == '03invalid') {
                dom.$refs.busrEdate.$children[0].$children[0].isRequired = true;
                dom.ruler.busrEdate.forEach(item => {
                  t.$set(item, 'required', true) 
              });
            } else {
                dom.$refs.busrEdate.$children[0].$children[0].isRequired = false;
                dom.ruler.busrEdate.forEach(item => {
                  t.$set(item, 'required', false) 
              });
            }
            dom.$refs.busrEdate.$children[0].$children[0].resetField()
        }, 20)
    },
}
export default OrgBusiarea