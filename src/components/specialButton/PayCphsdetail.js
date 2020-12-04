/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-14 15:38:08
 * @LastEditTime: 2020-11-03 20:55:57
 * @LastEditors: Sok
 */
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
// 核算
const button_check = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else if (t.tableselected.length > 1) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: '请选择一条数据核算',
        });
    } else {
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {
                let data = {
                    _mt: t.$global.mt + 'PaySalacalc.cacl',
                    APmainId: t.tableselected.toString(),
                    APlogType: '核算',
                }
                const ids = []

                for (let i = 0; i < t.selectionAlldata.length; i++) {
                    // 添加到
                    ids.push(t.selectionAlldata[i].payhrcRound)
                }
                const round = ids.toString()
                if (round == '01round') {
                    data.APround = '01round'
                } else if (round == '90final') {
                    data.APround = '90final'
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
// 提交确认
const button_submitcon = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else if (t.tableselected.length > 1) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: '请选择一条数据提交确认',
        });
    } else {
        t.$Modal.confirm({
            title: t.$t('reminder.remind'),
            content: '请确认数据',
            onOk: () => {
                let data = {
                    _mt: t.$global.mt + 'PayCphsdetail.setState',
                    APids: t.tableselected.toString(),
                    // APlogType:'1',
                    APlogType: '提交确认',
                    // APflowState:'03ToBeConfirmed'
                }
                const ids = []
                for (let i = 0; i < t.selectionAlldata.length; i++) {
                    // 添加到
                    ids.push(t.selectionAlldata[i].payhrcRound)
                }
                const round = ids.toString()
                if (round == '01round') {
                    data.APstatus = '02salaryUnconfirmed'
                } else {
                    data.APstatus = '04companyUnconformed'
                }
                getDataLevelUserLoginData(data).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.content[0].value == '2') {
                            t.$Modal.success({
                                title: t.$t('reminder.suc'),
                                content: '成功',
                            })
                            t.getData()
                        } else {
                            t.$Modal.error({
                                title: t.$t('reminder.err'),
                                content: t.$t('reminder.errormessage'),
                            })
                        }
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
// // 确认
// const button_confirm = t => {
//     if (t.tableselected.length === 0) {
//         t.$Modal.warning({
//             title: t.$t("reminder.remind"),
//             content: t.$t("reminder.leastone"),
//         });
//     }else if (t.tableselected.length  >1){
//         t.$Modal.warning({
//             title: t.$t("reminder.remind"),
//             content: '请选择一条数据提交确认',
//         });
//     } else{
//         t.$Modal.confirm({
//             title: t.$t('reminder.remind'),
//             content: '请确认数据',
//             onOk: () => {
//                 let data = {
//                     _mt: t.$global.mt + 'PayCphsdetail.setState',
//                     APids: t.tableselected.toString(),
//                     APlogType: '确认',
//                     // APtype:'1',
//                     // APflowState:'04confirmed'
//                 }
//                 const ids = []
//                 const status = []
//                 for(let i = 0; i <  t.selectionAlldata.length; i++){
//                     // 添加到
//                     ids.push(t.selectionAlldata[i].paycphRound)
//                     status.push(t.selectionAlldata[i].stutas)
//                 } 
//                 const round = ids.toString()
//                 const nice = status.toString()
//                 if(round=='01round'){
//                     data.APstatus = '03salaryConfirmed'
//                 }else{
//                     if(nice =='06BPyesprincipalNo'){
//                         data.APstatus = '07companyHeadconfirmed'
//                     }else{
//                         data.APstatus = '06BPyesprincipalNo'
//                     } 
//                 }   
//                 getDataLevelUserLoginData(
//                         data
//                 ).then((res) => {
//                     if (isSuccess(res, t)) {
//                         setTimeout(()=>{
//                             t.$Modal.success({
//                                 title: t.$t('reminder.suc'),
//                                 content: '成功',
//                             })
//                         },1200)
//                         t.getData()
//                     }
//                 }).catch(() => {
//                     setTimeout(()=>{
//                         t.$Modal.error({
//                             title: t.$t('reminder.err'),
//                             content: t.$t('reminder.errormessage'),
//                         })
//                     },1200)
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
    button_check,
    button_submitcon,
    // button_confirm,
    button_sealingAccount,
    button_back
}