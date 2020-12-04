/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-22 10:47:26
 * @LastEditTime: 2020-11-09 18:06:04
 * @LastEditors: Sok
 */
import { displayEvent, setValue ,initDisplayEvent,disabledEvent} from './public'
const BaseCompbankmapping = {
    all_dis() {
        // BaseCompbankmapping.addup_dis(this)
    },	
    cpbkCoutid(node){
        const t = this;
        let cpbkCoutid = t.formDataSubmit[node.ruleText];
        let arr = ['cpbkCityid']
        if(cpbkCoutid==1127){
            displayEvent(t, 1, arr)
        }else{
            displayEvent(t, 0, arr)
        }
    },
    empbaseFworkdate(node){
        
        let nowDate = new Date()
        let senDate = new Date(node.value);
        let workDates = (nowDate.getTime()-senDate.getTime())/(24*60*60*1000*365)
        let workDate = (Math.ceil(workDates*10)/10).toString()
        if(workDate){
            setValue(this,{'empbaseWorkyear':workDate})
           
        }
    },
    empName (node) {
        let pinyin = require('js-pinyin');
        pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
        let re = /[^\u4e00-\u9fa5]/;
        const isChinese = str => !re.test(str);
        if (!isChinese(node.value)) {
            return false;
        } else {
            let entEmppny = pinyin.getFullChars(node.value)
            setValue(this, { 'empPiny': entEmppny })
        }
    }
};

export default BaseCompbankmapping;