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
            t.$refs.postEdate.$children[0].$children[0].isRequired = true;
            t.ruler.postEdate.forEach(item => {
              t.$set(item, 'required', true) 
          });
        } else {
            t.$refs.postEdate.$children[0].$children[0].isRequired = false;
            t.ruler.postEdate.forEach(item => {
              t.$set(item, 'required', false) 
          });
        }
        t.$refs.postEdate.$children[0].$children[0].resetField()
    },
    init_required(t) {
        setTimeout(() => {
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.status
            if (value == '03invalid') {
                dom.$refs.postEdate.$children[0].$children[0].isRequired = true;
                dom.ruler.postEdate.forEach(item => {
                  t.$set(item, 'required', true) 
              });
            } else {
                dom.$refs.postEdate.$children[0].$children[0].isRequired = false;
                dom.ruler.postEdate.forEach(item => {
                  t.$set(item, 'required', false) 
              });
            }
            dom.$refs.postEdate.$children[0].$children[0].resetField()
        }, 20)
    },
}
export default OrgPost