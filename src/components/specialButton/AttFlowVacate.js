import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
const button_revocationlea = t => {
    // console.log(t,"T")
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认是否撤销请假？',
            onOk: () => {
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'AttFlowVacate.revocasubmit',
                    APid: t.tableselected.toString(),
                    APlogType: "撤销请假"
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        t.$Modal.success({
                            title: t.$t('reminder.suc'),
                            content: '销假成功',
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
            },
        })
    }
}
export default {
    button_revocationlea
}