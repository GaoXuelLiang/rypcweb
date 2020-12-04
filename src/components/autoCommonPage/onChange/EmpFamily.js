/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-11-09 20:47:15
 * @LastEditTime: 2020-12-03 11:15:00
 * @LastEditors: Sok
 */
import { displayEvent, setValue } from './public'
const EmpFamily = {
    all_dis() {
        EmpFamily.init_required(this);
    },
    fmErelat (node) {
        const t = this;
        return
        // if(t.$global.mt !== 'xian') {
        //     return;
        // }
        let labels = ['fmCompany', 'fmJob', 'fmPhone']
        for(let v of labels) {
            let label = t.$refs[v].$children[0].$el.firstChild.firstElementChild
            if(node.thisValue === '06son') {
                t.ruler[v].forEach(item => {
                    item.required = true;
                });
                label.classList.add('required')
                document.styleSheets[0].addRule('.required:before','content: "*";display:inline-block;margin-right:4px;line-height:1;font-family:SimSun;font-size:14px;color:#ed4014')
            }else {
                t.ruler[v].forEach(item => {
                    item.required = false;
                });
                label.classList.remove('required')
            }
        }
    },
    init_required(t) {
        return
        // if(t.$global.mt !== 'xian') {
        //     return;
        // }
        setTimeout(()=>{
            let labels = ['fmCompany', 'fmJob', 'fmPhone'];
            for(let v of labels) {
                let label = t.$refs.commonSingleForm.$refs[v].$children[0].$el.firstChild.firstElementChild
                if(t.$refs.commonSingleForm.formDataSubmit.fmErelat === '06son') {
                    t.$refs.commonSingleForm.ruler[v].forEach(item => {
                        item.required = true;
                    })
                    label.classList.add('required')
                    document.styleSheets[0].addRule('.required:before','content: "*";display:inline-block;margin-right:4px;line-height:1;font-family:SimSun;font-size:14px;color:#ed4014')
                }else {
                    t.$refs.commonSingleForm.ruler[v].forEach(item => {
                        item.required = false;
                    })
                    label.classList.remove('required')
                }
            }
        },50)
    }
}
export default EmpFamily