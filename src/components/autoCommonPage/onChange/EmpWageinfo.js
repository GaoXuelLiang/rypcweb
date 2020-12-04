import { displayEvent, setValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
const EmpWageinfo = {
    all_dis () {
        EmpWageinfo.wgifRank_dis(this)
    },
    	
    wgifRank_dis(t) {
        let rankId = t.formlist.form.wgifRank;
        // console.log(rankId,"rankId")
        getDataLevelUserLoginData({
            _mt:t.$global.mt + 'BaseSofrat.getByRankid',
            APrankid: rankId
        }).then(res => {
            if(isSuccess(res, t)) {
                // console.log(res.data.content[0]);
                // wgif_gdbl   固比
                // wgif_fdbl  浮比
                if(res.data.content[0]) {
                    let data = res.data.content[0];
                    // console.log(t.$refs.commonSingleForm,"commonSingleForm")
                    t.$refs.commonSingleForm.formDataSubmit.wgifGdbl = data.sofrSolid
                    t.$refs.commonSingleForm.formDataSubmit.wgifFdbl = data.sofrFloat
                }
            }
        })
    }
}
export default EmpWageinfo