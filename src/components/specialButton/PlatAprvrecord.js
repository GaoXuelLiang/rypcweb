/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-07 15:08:43
 * @LastEditTime: 2020-12-03 10:49:06
 * @LastEditors: Sok
 */
import { getDataLevelUserLogin, getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
// 检验步骤审批
const button_InspectionApproval = (t) => {
    t.$parent.loadingSpin = true;
    let Newdata = {};
    if (t.$global.mt === 'xian') {
        // let parent = t.$parent.$refs
        // Newdata = deepCopy(parent[(t.$parent.valueMap.id)][0].formDataSubmit)
        // for (let v in Newdata) {
        //     if (v == '_mt' || v == 'APlogType') {
        //         delete Newdata[v]
        //     }
        // }
        Newdata = {
            id: t.mainId
        }
    } else {
        Newdata = {
            id: t.mainId
        }
    }
    let data = {
        _mt: t.$global.mt + t.mainTbName + '.testAprvFlow',
        APflowId: t.flowId,
        APstepId: t.stepId,
        AProleType: t.$store.state.user.roleType,
        APlogType: '检验步骤审批',
        APfunId: t.funId,
        APdata: Newdata
    }
    getDataLevelUserLoginData(data).then((res) => {
        if (isSuccess(res, t)) {
            t.$Modal.success({
                title: t.$t('reminder.suc'),
                content: '检验步骤审批',
            })
            t.page = 1;
            t.getData()
        }
    }).catch(() => {
        t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
        })
    }).finally(() => {
        t.$parent.loadingSpin = false;
    })
}

export default {
    button_InspectionApproval,

}