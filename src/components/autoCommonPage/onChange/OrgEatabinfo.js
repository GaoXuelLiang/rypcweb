import { displayEvent, setValue } from './public'
const OrgEatabinfo = {
    all_dis () {
        OrgEatabinfo.init_required(this);
    },
    etabUnitid(node){
        const t = this 
        if(node.thisValue == ''){
            let obj = {
                etabDeptidDis:'',
                etabPostidDis:'',
                etabDeptid:'',
                etabPostid:'',
            }
            setValue(t,obj)
            t.formDataSubmit.etabUnitid = ""
            t.formDataSubmit.etabUnitidDis = ""
            t.formDataSubmit.etabDeptid = ""
            t.formDataSubmit.etabDeptidDis = ""
            t.formDataSubmit.etabPostid = ""
            t.formDataSubmit.etabPostidDis = ""
       }
    },
    status (node) {
        // console.log(this,"this")
        let dom = this.$refs.etabEdate.$children[0].$children[0].isRequired;
        if (node.value == '03invalid') {
            this.$refs.etabEdate.$children[0].$children[0].isRequired = true;
            // this.$set(this.ruler.etabEdate[0], 'required', true)
            this.ruler.etabEdate.forEach(item => {
                this.$set(item, 'required', true) 
            });
        } else {
            this.$refs.etabEdate.$children[0].$children[0].isRequired = false;
            // this.$set(this.ruler.etabEdate[0], 'required', false)
            this.ruler.etabEdate.forEach(item => {
                this.$set(item, 'required', false) 
            });
        }
        this.$refs.etabEdate.$children[0].$children[0].resetField()
    },
    init_required(t) {
        setTimeout(() => {
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.status
            if (value == '03invalid') {
                dom.$refs.etabEdate.$children[0].$children[0].isRequired = true;
                // t.$set(dom.ruler.etabEdate[0], 'required', true)
                dom.ruler.etabEdate.forEach(item => {
                    t.$set(item, 'required', true) 
                });
            } else {
                dom.$refs.etabEdate.$children[0].$children[0].isRequired = false;
                // t.$set(dom.ruler.etabEdate[0], 'required', false)
                dom.ruler.etabEdate.forEach(item => {
                    t.$set(item, 'required', false) 
                });
            }
            dom.$refs.etabEdate.$children[0].$children[0].resetField()
        }, 20)
    },
}
export default OrgEatabinfo;
