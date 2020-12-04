import { displayEvent, setValue } from './public'
const SsecAddAdmit = {
    all_dis () {
    },
    secaAddtype (node) {
        const t = this;
        SsecAddAdmit.secaAddmonth_dis(t);
    },
    secaAddtime (node) {
        const t = this;
        SsecAddAdmit.secaAddmonth_dis(t);
    },
    /**
     * @description 员工带出增员月份 secaAddtype增员类型  secaAddtime增员日期
     * @param {*} node
     */
    secaAddmonth_dis (t) {
        if(t.formDataSubmit) {
            let secaAddtype = t.formDataSubmit.secaAddtype;
            let secaAddtime = t.formDataSubmit.secaAddtime;
            if(secaAddtype === '01entry') {
                if(secaAddtime) {
                    let year = secaAddtime.split('-')[0];
                    let month = Number(secaAddtime.split('-')[1]);
                    let day = secaAddtime.split('-')[2];
                    let date = '';
                    if(Number(month) == 12) {
                        if(Number(day) > 15) {
                            month = 1;
                            year++;
                        }
                    }else {
                        if(Number(day) > 15) {
                            month++;
                        }
                    }
                    date = year + '-' + (month < 10 ? '0' + month : month);
                    setValue(t, {'secaAddmonth': date});
                }else {
                    setValue(t, {'secaAddmonth': ''});
                }
            }
        } 
    }
}
export default SsecAddAdmit;