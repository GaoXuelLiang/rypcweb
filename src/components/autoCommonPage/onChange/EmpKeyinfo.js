import { displayEvent, setValue } from './public'
const EmpKeyinfo = {
    all_dis() {},
    	
    empkeySendate(node){
        let nowDate = new Date()
        let senDate = new Date(node.thisValue);
        let workDates = (nowDate.getTime()-senDate.getTime())/(24*60*60*1000*365)
        let workDate = (Math.ceil(workDates*10)/10).toString()
        if(workDate){
            setValue(this,{'empkeyWorkday':workDate})
           
        }
    }
    
};

export default EmpKeyinfo;