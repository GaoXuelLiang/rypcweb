import { displayEvent, setValue } from './public'
const EmpInfo = {
    all_dis() {},  
    empName (node) {
        let pinyin = require('js-pinyin');
        pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
        let re = /[^\u4e00-\u9fa5]/;
        const isChinese = str => !re.test(str);
        if (!isChinese(node.value)) {
            return false;
        } else {
            let empPiny = pinyin.getFullChars(node.value)
            // let entEnname = pinyin.getCamelChars(node.value)
            setValue(this, { 'empPiny': empPiny })
        }
    }, 	
    empPopcode(node){
        const t = this
        let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i; 
        let value = node.value
        if(value.length === 18) {
            if(reg.test(value)){
                let birth = value.substring(6, 10) + "-" + value.substring(10, 12) + "-" + value.substring(12, 14)
                setValue(t,{'empBirthdatereal':birth})
                if (parseInt(value.substr(16, 1)) % 2 == 1) {
                    setValue(t, { 'empGender': '01male' })
                } else {
                    setValue(t, { 'empGender': '02female' })
                }
            }else{
                setValue(t,{'empBirthdatereal':''})
            }
        }
    }
};

export default EmpInfo;