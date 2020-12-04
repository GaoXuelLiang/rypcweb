/*
 * @Author: guwenjiang
 * @Date: 2020-10-27 16:01:45
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-17 18:56:04
 */
import { displayEvent, setValue } from './public'
const OrgBusimod = {
    all_dis() {
        OrgBusimod.init_required(this);
    },
    status (node) {
        // console.log(this,"this")
        let dom = this.$refs.bumdEdate.$children[0].$children[0].isRequired;
        if (node.value == '03invalid') {
            this.$refs.bumdEdate.$children[0].$children[0].isRequired = true;
            // this.$set(this.ruler.bumdEdate[1], 'required', true)
            this.ruler.bumdEdate.forEach(item => {
                this.$set(item, 'required', true) 
            });

        } else {
            this.$refs.bumdEdate.$children[0].$children[0].isRequired = false;
            // this.$set(this.ruler.bumdEdate[1], 'required', false)
            this.ruler.bumdEdate.forEach(item => {
                this.$set(item, 'required', false) 
            });
        }
        this.$refs.bumdEdate.$children[0].$children[0].resetField()
    },
    init_required(t) {
        setTimeout(() => {
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.status
            if (value == '03invalid') {
                dom.$refs.bumdEdate.$children[0].$children[0].isRequired = true;
                // t.$set(dom.ruler.bumdEdate[0], 'required', true)
                dom.ruler.bumdEdate.forEach(item => {
                    t.$set(item, 'required', true) 
                });
            } else {
                dom.$refs.bumdEdate.$children[0].$children[0].isRequired = false;
                // t.$set(dom.ruler.bumdEdate[0], 'required', false)
                dom.ruler.bumdEdate.forEach(item => {
                    t.$set(item, 'required', false) 
                });
            }
            dom.$refs.bumdEdate.$children[0].$children[0].resetField()
        }, 20)
    },
}
export default OrgBusimod