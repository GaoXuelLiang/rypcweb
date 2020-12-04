/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-22 10:47:26
 * @LastEditTime: 2020-11-06 13:38:31
 * @LastEditors: Sok
 */
import { displayEvent, setValue ,initDisplayEvent,disabledEvent} from './public'
const EmpBaseinfo = {
    all_dis() {
        EmpBaseinfo.addup_dis(this)
    },
    addup_dis(t){
        if(t.logType==t.$t("button.add")){
            let arr = ['ptxlId','unitId','deptId','postId','empPid','empWcityid','empLpid',"empZsls",'empQzjz','empYddate','empYdtype','empRanktype','empType','empPartype','empEntry','empQuitdate','empQuitrea','empQuitadrs','empIscj','empCzgrade','empPaptype','empPopcode','empContid','empPopsdate','empPopedate','empContype','empConsdate','empConyedate','empConedate','empPersdate','empPeredate','empAcctype','empBankid','empKhbank','empBankcade','empAccname','empQualicats','empDegree','empSchool','empSchtype','empSpetype','empSpecialty','empLearntype','empIssecspe','empIshighest','empIsfirstqua','empEdsdate','empEdedate','empAdrstype','empXiadrs','empMobile','empPersmail','empCompmail','empEmcrelation','empEmcontact','empEmcphone','empEmcaddr','empAcctype','ptxlIdDis']
            initDisplayEvent(t, 0, arr)
            let disabledArr=['empName','empPiny','empAlias','empGender','empBirthdate','empNation','empJiguan','empFworkdate','empCompzdate','empBcityid','empBircontry','empMarriage','empHoutype','empHcityid','keyIscxemp',	"fileTkey",'comment',"sdate",'edate','empTechnic','empIsjoinh','empIsdzin','empDacityid','status','empPolitical','empPolsdate']
            disabledEvent(t,1,disabledArr)
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

export default EmpBaseinfo;