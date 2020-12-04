/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-14 15:38:08
 * @LastEditTime: 2020-11-20 23:45:20
 * @LastEditors: g05047
 */
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
// 确认
const button_verify  = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else{
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {
                let data = {
                    _mt: t.$global.mt + 'PaysMaperiodicPro.stateUpdate',
                    APids: t.tableselected.toString(),
                    APlogType: '确认',
                    APupType:"confirm"
                }
                const ids = []
               
                for(let i = 0; i <  t.selectionAlldata.length; i++){
                    // 添加到
                    ids.push(t.selectionAlldata[i].payhrcRound)
                } 
                getDataLevelUserLoginData(
                        data
                ).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$Modal.success({
                            title: t.$t('reminder.suc'),
                            content: '成功',
                        })
                        t.getData()
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: t.$t('reminder.err'),
                        content: t.$t('reminder.errormessage'),
                    })
                })
            },
            onCancel: () => {
                t.$refs.selection.selectAll(false)
            },
        })
    }
};

export default {
    // button_verify
}