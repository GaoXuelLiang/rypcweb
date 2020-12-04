/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-14 15:38:08
 * @LastEditTime: 2020-11-16 14:01:27
 * @LastEditors: Sok
 */
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
import { getImportState } from "./getImportState";
// 核算
const button_check = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else if (t.tableselected.length  >1){
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: '请选择一条数据核算',
        });
    }else{
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'PaysSalaryBusi.cacl',
                    APmainId: t.tableselected.toString(),
                    APlogType: '核算',
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        // let imp = null
                        // let jobQueueId = ''
                        t.jobQueueId = res.data.content[0].jobQueueId
                        t.imp = window.setInterval(getImportState(t), 3000)  
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    },1200)
                })
            },
            onCancel: () => {
                t.$refs.selection.selectAll(false)
            },
        })
    }
};
// 提交确认
const button_submitConfirmation = t => {
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
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'PaysSalaryBusi.setStatus',
                    APids: t.tableselected.toString(),
                    APtype:'1',
                    APlogType: '提交确认',
                    APflowState:'03ToBeConfirmed'
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(() => {
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '提交确认成功',
                            })
                        },1200)
                        t.getData()
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    },1200)
                })
            },
            onCancel: () => {
                t.$refs.selection.selectAll(false)
            },
        })
    }
};
// 确认
const button_verify = t => {
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
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'PaysSalaryBusi.setStatus',
                    APids: t.tableselected.toString(),
                    APlogType: '确认',
                    APtype:'1',
                    APflowState:'04confirmed'
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(() => {
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '确认成功',
                            })
                        },1200)
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
// 封账
const button_sealingAccount = t => {
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
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'PaysSalaryBusi.setStatus',
                    APids: t.tableselected.toString(),
                    APlogType: '封账',
                    APtype:'1',
                    APflowState:'05alreadySealed'
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(() => {
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '封账成功',
                            })
                        },1200)
                        t.getData()
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    },1200)
                })
            },
            onCancel: () => {
                t.$refs.selection.selectAll(false)
            },
        })
    }
};
// 退回
const button_back = t => {
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
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'PaysSalaryBusi.setStatus',
                    APids: t.tableselected.toString(),
                    APlogType: '退回',
                    APtype:'2',
                    APflowState:t.status
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(() => {
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '退回成功',
                            })
                        },1200)
                        t.getData()
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    },1200)
                })
            },
            onCancel: () => {
                t.$refs.selection.selectAll(false)
            },
        })
    }
};
export default {
    button_check,
    button_submitConfirmation,
    button_verify,
    button_sealingAccount,
    button_back
}