/*
 * @Author: guwenjiang
 * @Date: 2020-11-02 17:58:32
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-18 14:25:41
 */
import { displayEvent, setValue } from './public'
const EmpRecruit = {
    all_dis() {
        EmpRecruit.init_required(this);
    },
    recChannel (node) {
        const t = this;
        if(node.thisValue === '猎头招聘') {
            t.$refs.recCoolevel.$children[0].$children[0].isRequired = true;
            t.$set(t.ruler.recCoolevel[0], 'required', true)
            t.$refs.recRefid.$children[0].$children[0].isRequired = false;
            t.$set(t.ruler.recRefid[0], 'required', false)
        }else if (node.thisValue === '内部推荐') {
            t.$refs.recCoolevel.$children[0].$children[0].isRequired = false;
            t.$set(t.ruler.recCoolevel[0], 'required', false)
            t.$refs.recRefid.$children[0].$children[0].isRequired = true;
            t.$set(t.ruler.recRefid[0], 'required', true)
        }else {
            t.$refs.recCoolevel.$children[0].$children[0].isRequired = false;
            t.$set(t.ruler.recCoolevel[0], 'required', false)
            t.$refs.recRefid.$children[0].$children[0].isRequired = false;
            t.$set(t.ruler.recRefid[0], 'required', false)
        }
        t.$refs.recCoolevel.$children[0].$children[0].resetField()
        t.$refs.recRefid.$children[0].$children[0].resetField()
    },
    init_required(t) {
        setTimeout(()=>{
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.recChannelDis
            if(value === '猎头招聘') {
                dom.$refs.recCoolevel.$children[0].$children[0].isRequired = true;
                t.$set(dom.ruler.recCoolevel[0], 'required', true)
                dom.$refs.recRefid.$children[0].$children[0].isRequired = false;
                t.$set(dom.ruler.recRefid[0], 'required', false)
            }else if (value === '内部推荐') {
                dom.$refs.recCoolevel.$children[0].$children[0].isRequired = false;
                t.$set(dom.ruler.recCoolevel[0], 'required', false)
                dom.$refs.recRefid.$children[0].$children[0].isRequired = true;
                t.$set(dom.ruler.recRefid[0], 'required', true)
            }else {
                dom.$refs.recCoolevel.$children[0].$children[0].isRequired = false;
                t.$set(dom.ruler.recCoolevel[0], 'required', false)
                dom.$refs.recRefid.$children[0].$children[0].isRequired = false;
                t.$set(dom.ruler.recRefid[0], 'required', false)
            }
            dom.$refs.recCoolevel.$children[0].$children[0].resetField()
            dom.$refs.recRefid.$children[0].$children[0].resetField()
        }, 20)
    }
}
export default EmpRecruit