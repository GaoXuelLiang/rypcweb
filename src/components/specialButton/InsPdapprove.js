import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
// // 提交审批
// const button_approvel = t => {
//     if (t.tableselected.length === 0) {
//         t.$Modal.warning({
//             title: t.$t("reminder.remind"),
//             content: t.$t("reminder.leastone"),
//         });
//     } else {
//         t.$Modal.confirm({
//             title: t.$t('reminder.remind'),
//             content: '请确认数据',
//             onOk: () => {
//                 getDataLevelUserLoginData({
//                     _mt: t.$global.mt + 'InsPdapprove.submitApprove',
//                     APids: t.tableselected.toString(),
//                     APlogType: '提交审批',
//                 }).then((res) => {
//                     if (isSuccess(res, t)) {
//                         t.$Modal.success({
//                             title: t.$t('reminder.suc'),
//                             content: '成功',
//                         })
//                         t.getData()
//                     }
//                 }).catch(() => {
//                     t.$Modal.error({
//                         title: t.$t('reminder.err'),
//                         content: t.$t('reminder.errormessage'),
//                     })
//                 })
//             },
//             onCancel: () => {
//             },
//         })
//     }
// };
// 通过
const button_pass = t => {
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
                    _mt: t.$global.mt + 'InsPdapprove.approverefuse',
                    APids: t.tableselected.toString(),
                    APupType: 'pass',
                    APlogType: '通过',
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(()=>{
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '成功',
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
            },
        })
    } 
}
// 提交审批
const button_approvel = t => {	
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
                let status = '';
                if(t.titleName === '商保派单申请') {
                    status = '02inapproval'
                }else if (t.titleName === '商保派单审批') {
                    status = '03passapprove'
                }
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'InsPdapprove.changeStatus',
                    APupdIds: t.tableselected.toString(),
                    APtoStatus: status,
                    APfinaFlag: '0'
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(()=>{
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '成功',
                            })
                        },1200)
                        t.getData()
                    }
                }).catch(() => {
                    setTimeout(()=>{
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    },1200)
                })
            },
            onCancel: () => {
            },
        })
    }
};
// 拒绝
const button_refuse = t => {
    // console.log('03rejectapproval')
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认拒绝数据',
            onOk: () => {
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'InsPdapprove.changeStatus',
                    APupdIds: t.tableselected.toString(),
                    APtoStatus: '01tosubmit',
                    APfinaFlag: '1'
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        setTimeout(()=>{
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '拒绝成功',
                            })
                        },1200)
                        t.getData()
                    }
                }).catch(() => {
                    setTimeout(()=>{
                        t.$Modal.error({
                            title: t.$t('reminder.err'),
                            content: t.$t('reminder.errormessage'),
                        })
                    },1200)
                })
            },
            onCancel: () => {
            },
        })
        
    }
};
// 重新申请
const button_applyFor = t => {
    // console.log('01tosubmit')
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'InsPdapprove.changeStatus',
            APupdIds: t.tableselected.toString(),
            APtoStatus: '02inapproval',
            APfinaFlag: '0'
        }).then((res) => {
            if (isSuccess(res, t)) {
                setTimeout(()=>{
                    t.$Modal.success({
                        title: t.$t('reminder.suc'),
                        content: '重新申请成功',
                    })
                },1200)
                t.getData()
            }
        }).catch(() => {
            setTimeout(()=>{
                t.$Modal.error({
                    title: t.$t('reminder.err'),
                    content: t.$t('reminder.errormessage'),
                })
            },1200)
        })
    }
};
export default {
    button_approvel,
    button_refuse,
    button_applyFor,
    button_pass
}