/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-17 19:08:18
 * @LastEditTime: 2020-11-21 15:34:46
 * @LastEditors: Sok
 */
import { displayEvent, setValue } from './public'
const EmpCertinfo = {
    all_dis() {
        EmpCertinfo.all_certType(this)
    },
    	
    certType(node){
        const t = this;
        console.log(t)
        let certType = t.formDataSubmit[node.ruleText];
        let num = '0';
        if(certType === '01id') {
            num = '1';
            t.$set(t.$parent.$refs.commonSingleForm.ruler.certNumber[1],"required",true)
        }else{ 
            t.$set(t.$parent.$refs.commonSingleForm.ruler.certNumber[1],"required",false)
        }
        t.$refs.certNumber.$children[0].$children[0].resetField()
        setValue(t, {'certIsadmid': num});
    },
    all_certType(t){
        // const t = this

    }
};

export default EmpCertinfo;