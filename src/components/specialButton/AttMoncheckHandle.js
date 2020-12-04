import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
const button_verify = t => {
    // console.log(t,"T")
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        t.isSpinTable = true;
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '您确认审批数据吗？',
            onOk: () => {
                let type = '';
                if(t.titleName === "月度考勤数据维护") {
                    type = 'confirm'
                }else if (t.titleName === '月度考勤数据提报') {
                    type = 'submit'
                }
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'AttMoncheckHandle.stateUpdate',
                    APids: t.tableselected.toString(),
                    APupType: type,
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$Modal.success({
                            title: t.$t('reminder.suc'),
                            content: '确认成功',
                        })
                        t.getData()
                    }
                    t.isSpinTable = false;
                }).catch(() => {
                    t.isSpinTable = false;
                    t.$Modal.error({
                        title: t.$t('reminder.err'),
                        content: t.$t('reminder.errormessage'),
                    })
                })
            },
            onCancel: () => {
                t.isSpinTable = false;
            },
        })
    }
}
export default {
    button_verify
}