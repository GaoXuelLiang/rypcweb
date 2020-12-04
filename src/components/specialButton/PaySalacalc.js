/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-14 15:38:08
 * @LastEditTime: 2020-11-07 16:56:45
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
    } else {
        const ids = [];
        for (let v of t.selectionAlldata) {
            if (t.status.indexOf('01accounting') !== -1 && v.payhrcRound === '01round') {
                ids.push(v.id)
            } else if (t.status.indexOf('03salaryConfirmed') !== -1 && v.payhrcRound === '90final') {
                ids.push(v.id)
            }
        }
        if (ids.length < 1) {
            t.$Modal.warning({
                title: t.$t('reminder.err'),
                content: '请选择符合条件的数据！',
            })
            return
        }
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {
                let round = t.status.indexOf('01accounting') !== -1 ? '01round' : '90final'
                let data = {
                    _mt: t.$global.mt + 'PaySalacalc.cacl',
                    APmainId: ids.toString(),
                    APlogType: '核算',
                    APround: round
                }
                getDataLevelUserLoginData(
                    data
                ).then((res) => {
                    if (isSuccess(res, t)) {
                        t.jobQueueId = res.data.content[0].jobQueueId
                        t.imp = window.setInterval(getImportState(t), 3000)
                        // t.getData()
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    }, 1200)
                })
            },
            onCancel: () => {
                t.$refs.selection.selectAll(false)
            },
        })
    }
}; 
// 提交确认
const button_submitcon = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        const ids = [];
        for (let v of t.selectionAlldata) {
            if (t.status.indexOf('01accounting') !== -1 && v.payhrcRound === '01round') {
                ids.push(v.id)
            } else if (t.status.indexOf('03salaryConfirmed') !== -1 && v.payhrcRound === '90final') {
                ids.push(v.id)
            }
        }
        if (ids.length < 1) {
            t.$Modal.warning({
                title: t.$t('reminder.err'),
                content: '请选择符合条件的数据！',
            })
            return
        }
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {
                let status = t.status.indexOf('01accounting') !== -1 ? '02salaryUnconfirmed' : '04companyUnconformed'
                let data = {
                    _mt: t.$global.mt + 'PaySalacalc.setState',
                    APids: ids.toString(),
                    APlogType: '提交确认',
                    APstatus: status
                }
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].value == '2') {
                            setTimeout(() => {
                                t.$Modal.success({
                                    title: t.$t('reminder.suc'),
                                    content: '成功',
                                })
                            }, 1200)
                            t.getData()
                        } else {
                            setTimeout(() => {
                                t.$Modal.error({
                                    title: t.$t('reminder.err'),
                                    content: '提交确认失败',
                                })
                            }, 1200)
                        }
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    }, 1200)
                })
            },
            onCancel: () => {
                t.$refs.selection.selectAll(false)
            },
        })
    }
};
// 确认
// const button_confirm = t => {
//     if (t.tableselected.length === 0) {
//         t.$Modal.warning({
//             title: t.$t("reminder.remind"),
//             content: t.$t("reminder.leastone"),
//         });
//     } else {
//         const ids = [];
//         for (let v of t.selectionAlldata) {
//             if (t.status.indexOf('02salaryUnconfirmed') !== -1 && v.stutas === '02salaryUnconfirmed') {
//                 ids.push(v.id)
//             } else if (t.status.indexOf('01BPunconfirmed') !== -1 && v.stutas === '01BPunconfirmed') {
//                 ids.push(v.id)
//             } else if (t.status.indexOf('06BPyesprincipalNo') !== -1 && v.stutas === '06BPyesprincipalNo') {
//                 ids.push(v.id)
//             }
//         }
//         if (ids.length < 1) {
//             t.$Modal.warning({
//                 title: t.$t('reminder.err'),
//                 content: '请选择符合条件的数据！',
//             })
//             return
//         }
//         t.$Modal.confirm({
//             title: t.$t('reminder.remind'),
//             content: '请确认数据',
//             onOk: () => {
//                 let status = ""
//                 if (t.status.indexOf('02salaryUnconfirmed') !== -1) {
//                     status = "03salaryConfirmed"
//                 } else if (t.status.indexOf('01BPunconfirmed') !== -1) {
//                     status = "06BPyesprincipalNo"
//                 } else if (t.status.indexOf('06BPyesprincipalNo') !== -1) {
//                     status = "07companyHeadconfirmed"
//                 }
//                 let data = {
//                     _mt: t.$global.mt + 'PaySalacalc.setState',
//                     APids: ids.toString(),
//                     APlogType: '确认',
//                     APstatus: status,
//                 }
//                 getDataLevelUserLoginData(
//                     data
//                 ).then((res) => {
//                     if (isSuccess(res, t)) {
//                         setTimeout(() => {
//                             t.$Modal.success({
//                                 title: t.$t('reminder.suc'),
//                                 content: '成功',
//                             })
//                         }, 1200)
//                         t.getData()
//                     }
//                 }).catch(() => {
//                     setTimeout(() => {
//                         t.$Modal.error({
//                             title: t.$t('reminder.err'),
//                             content: t.$t('reminder.errormessage'),
//                         })
//                     }, 1200)
//                 })
//             },
//             onCancel: () => {
//                 t.$refs.selection.selectAll(false)
//             },
//         })
//     }
// };
// 封账
const button_sealingAccount = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'PaysSalaryBusi.setStatus',
                    APids: t.tableselected.toString(),
                    APlogType: '封账',
                    APtype: '1',
                    APflowState: '05alreadySealed'
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(() => {
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '成功',
                            })
                        }, 1200)
                        t.getData()
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    }, 1200)
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
    } else {
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'PaysSalaryBusi.setStatus',
                    APids: t.tableselected.toString(),
                    APlogType: '退回',
                    APtype: '2',
                    APflowState: t.status
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(() => {
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '成功',
                            })
                        }, 1200)
                        t.getData()
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    }, 1200)
                })
            },
            onCancel: () => {
                t.$refs.selection.selectAll(false)
            },
        })
    }
};
//重新核算中止
const button_stopHs = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        const ids = [];
        for (let v of t.selectionAlldata) {
            if (t.status.indexOf('03salaryConfirmed') !== -1 && v.payhrcRound === '90final') {
                if (v.stutas === '04companyUnconformed' || v.stutas === '03salaryConfirmed') {
                    ids.push(v.id)
                }
            }
        }
        if (ids.length < 1) {
            t.$Modal.warning({
                title: t.$t('reminder.err'),
                content: '请选择符合条件的数据！',
            })
            return
        }
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {

                let data = {
                    _mt: t.$global.mt + 'PaySalacalc.setState',
                    APids: ids.toString(),
                    APlogType: '重新核算中止',
                    APstatus: '06reaccounting'
                }
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].value == '2') {
                            setTimeout(() => {
                                t.$Modal.success({
                                    title: t.$t('reminder.suc'),
                                    content: '成功',
                                })
                            }, 1200)
                            t.getData()
                        } else {
                            setTimeout(() => {
                                t.$Modal.error({
                                    title: t.$t('reminder.err'),
                                    content: '中止失败',
                                })
                            }, 1200)
                        }
                    }
                }).catch(() => {
                    setTimeout(() => {
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    }, 1200)
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
    button_submitcon,
    // button_confirm,
    button_stopHs,
    button_sealingAccount,
    button_back
}