import { displayEvent, setValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
const EmpContract = {
    all_dis() {
        EmpContract.callRank(this)
    },
    // empconSdate(node){
    //     let senDate =node.value
    //     let enDates = new Date(senDate)
    //     let enDate = enDates.setFullYear(enDates.getFullYear()+3)
    //     let m=enDates.getMonth()+1
    //     let y=enDates.getFullYear()
    //     let qLastMonth = (Math.floor(m / 3) + 1) * 3
    //     enDates.setMonth(qLastMonth)
    //     enDates.setDate(0)
    //     let mm=enDates.getMonth()+1
    //     let day=enDates.getDate()
    //     let days=y+'-'+(mm<10?'0'+mm:mm)+'-'+(day<10?'0'+day:day)
    //     if(days){
    //         setValue(this,{'empconYedate':days})
    //     }
    // },
    empconSdate(node){
        const t = this
        //console.log(t,'555555555')
        let addYear = t.formDataSubmit.empconDuration
        console.log(addYear,'11111333339999')
        if(t.formDataSubmit[node.ruleText]!==''){
            let initYear = parseInt(addYear)
            if(initYear>=1 && initYear<10){
                console.log(addYear,'11111113333337777777')
                let enDates = new Date(node.thisValue)
                let enDate = enDates.setFullYear(enDates.getFullYear()+parseInt(addYear))
                let m=enDates.getMonth()+1
                let y=enDates.getFullYear()
                let qLastMonth = (Math.floor(m / 3) + 1) * 3
                enDates.setMonth(qLastMonth)
                enDates.setDate(0)
                let mm=enDates.getMonth()+1
                let day=enDates.getDate()
                let days=y+'-'+(mm<10?'0'+mm:mm)+'-'+(day<10?'0'+day:day)
                if(days){
                //    t.formEmpValidate.empconYedate = days
                    setValue(this,{'empconYedate':days})
                }
            }else{
                setValue(this,{'empconYedate':''})
            }
        }else{
            setValue(this,{'empconYedate':''})
        }
    },
     //试用日期
     empconPsdate(node){
        // console.log(val,'333355584')
        const t = this
        let addMonth = t.formDataSubmit.empconTrialperiod
        let months = parseInt(addMonth)
        console.log(addMonth,'3333555841111111')
        if(t.formDataSubmit[node.ruleText]!=='' && months!== NaN){
            let enDates = new Date(node.thisValue)
            let m=enDates.getMonth()+1
            let qLastMonth = m+months
            enDates.setMonth(qLastMonth)
            let y=enDates.getFullYear()
            let mm=enDates.getMonth()
            let day=enDates.getDate()-1
            let days=y+'-'+(mm<10?'0'+mm:mm)+'-'+(day<10?'0'+day:day)
            if(days){
                setValue(this,{'empconPedate':days})
            }
        }else{
            setValue(this,{'empconPedate':''})
        }
    },
    callRank (t) {
        console.log(t,'333333')
        const tt = this
        if(t.$global.mt !== 'znjs') {
            return;
        }
        let empId = t.formlist.form.empId
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpContract.getNum',
            APempId: empId,
        }).then((res) => {
            if (isSuccess(res, t)) {
                console.log(res, "res")
                let number = res.data.content[0].value
                t.$refs.commonSingleForm.formDataSubmit.empconQdcs =number
                //setValue(tt,{'empconQdcs':number})
                
            }
        }).catch((err) => {
            console.log(err)
        })
    },
};

export default EmpContract;