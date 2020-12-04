import { displayEvent, setValue } from './public'
const PaysThawingTime = {
    all_dis () {
        PaysThawingTime.curYear(this)
    },
    curYear (t) {
        let myDate = new Date();
        let cYear = myDate.getFullYear().toString();
        if(t.logType === '新增') {
            t.formlist.form.thawYear = cYear;
        }
    }
};

export default PaysThawingTime;