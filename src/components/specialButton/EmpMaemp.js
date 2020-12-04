import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
// offer发起
// const button_offer = t => {
//     if (t.tableselected.length === 0) {
//         t.$Modal.warning({
//             title: t.$t("reminder.remind"),
//             content: t.$t("reminder.leastone")
//         });
//     } else {
//         t.$Modal.confirm({
//             title: t.$t("reminder.remind"),
//             content: t.$t("reminder.isOffersponsor"),
//             onOk9
//                 const data = {
//                     _mt: t.$global.mt + "EmpMaemp.sendOffer",
//                     APlogType: t.$t("button.sponsor"),
//                     APids: t.tableselected.toString(),
//                     url:pubsource.pub_prvf_cur+'/NewemployeeLoginmain/NewemployeeLogin'
//                 };
//                 t.isSpinTable = true;
//                 getDataLevelUserLoginData(data)
//                     .then(res => {
//                         try {
//                             if (isSuccess(res, t)) {
//                                 if (res.data.content[0].value == "1") {
//                                     t.tableselected = [];
//                                     t.getData();
//                                     t.$Modal.success({
//                                         title: t.$t("reminder.suc"),
//                                         content: t.$t("reminder.sponsorSucess"),
//                                     });
//                                 }else{
//                                     t.$Modal.success({
//                                         title: t.$t("reminder.err"),
//                                         content: t.$t("reminder.sponsorError"),
//                                     });
//                                 }
//                             }
//                         } catch (res) {
//                             t.$Modal.error({
//                                 title: t.$t("reminder.err"),
//                                 content: t.$t("reminder.errormessage")
//                             });
//                         }
//                     })
//                     .catch(() => {
//                         t.$Modal.error({
//                             title: t.$t("reminder.err"),
//                             content: t.$t("reminder.errormessage")
//                         });
//                     })
//                     .finally(() => {
//                         t.isSpinTable = false;
//                     });
//             },
//             onCancel: () => { }
//         });
//     }
// };
//入职发起
// const   button_entry = t => {
//     if (t.tableselected.length === 0) {
//         t.$Modal.warning({
//             title: t.$t("reminder.remind"),
//             content: t.$t("reminder.leastone")
//         });
//     } else {
//         t.$Modal.confirm({
//             title: t.$t("reminder.remind"),
//             content: t.$t("reminder.isEntrysponsor"),
//             onOk: () => {
//                 const data = {
//                     _mt: t.$global.mt + "EmpMaemp.sendByIds",
//                     APlogType: t.$t("button.entry"),
//                     AProleType: t.$store.state.user.roleType,
//                     APids: t.tableselected.toString()
//                 };
//                 t.isSpinTable = true;
//                 getDataLevelUserLoginData(data)
//                     .then(res => {
//                         try {
//                             if (isSuccess(res, t)) {
//                                 if (res.data.content[0].value == "1") {
//                                     t.tableselected = [];
//                                     t.getData();
//                                     t.$Modal.success({
//                                         title: t.$t("reminder.suc"),
//                                         content: t.$t("reminder.sponsorSucess"),
//                                     });
//                                 }else{
//                                     t.$Modal.success({
//                                         title: t.$t("reminder.err"),
//                                         content: t.$t("reminder.sponsorError"),
//                                     });
//                                 }
//                             }
//                         } catch (res) {
//                             t.$Modal.error({
//                                 title: t.$t("reminder.err"),
//                                 content: t.$t("reminder.errormessage")
//                             });
//                         }
//                     })
//                     .catch(() => {
//                         t.$Modal.error({
//                             title: t.$t("reminder.err"),
//                             content: t.$t("reminder.errormessage")
//                         });
//                     })
//                     .finally(() => {
//                         t.isSpinTable = false;
//                     });
//             },
//             onCancel: () => { }
//         });
//     }
// };
//背调结果导入
// const   button_backResImport = t => {
//     t.imp_mt = t.$global.mt +  'EmpMaback.importData'
//     t.openImport = true
//     // t.$refs.importExcel.getDowModelFile()
// };
const button_backBatchDownload = t =>{
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone")
        });
    } else{
        const data = {
            _mt: t.$global.mt + "EmpMaemp.downLoadFile",
            APlogType: '背景资料批量下载',
            // AProleType: t.$store.state.user.roleType,
            APids: t.tableselected.toString()
        };
        t.isSpinTable = true;
        getDataLevelUserLoginData(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                            t.tableselected = [];
                            let result = res.data.content[0].value.split(':')[1]
                            let names  = res.data.content[0].value.split(':')[0]
                            getDataLevelUserLoginData({
                                _mt: t.$global.mt + 'UserInfo.getfiletoken',
                                APisprivate: true,
                                APlogType: '导出',
                                APfilekey: result,
                                APexpiresecs: 180
                            }).then((res) => {
                                if (isSuccess(res, t)) {
                                   
                                    localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
                                    if (t.isIE()) {
                                        window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filename)
                                    } else {
                                        let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(names)
                                        let link = document.createElement('a')
                                        link.href = doclink
                                        link.download = 'downloadfiletemp'
                                        link.click()
                                    }
                                    t.$Message.success({
                                        top: 100,
                                        content:'下载成功',
                                        duration:3
                                    });
                                    t.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
                                    localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
                                }
                            }).catch(() => {
                                t.$Modal.error({
                                    title: t.$t('reminder.err'),
                                    content: t.$t('reminder.errormessage'),
                                })
                            })
                            
                        }
                    })
                .catch(() => {
                    t.$Modal.error({
                        title: t.$t("reminder.err"),
                        content: t.$t("reminder.errormessage")
                    });
                })
                .finally(() => {
                    t.isSpinTable = false;
                    t.$refs.selection.selectAll(false)
                });
    }
}
//拒绝流程
const   button_refuseFlow = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone")
        });
    } else {
        t.$Modal.confirm({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.isRefusedhire"),
            onOk: () => {
                const data = {
                    _mt: t.$global.mt + "EmpMaemp.refuseFlow",
                    APlogType: t.$t("button.refuse"),
                    AProleType: t.$store.state.user.roleType,
                    APids: t.tableselected.toString()
                };
                t.isSpinTable = true;
                getDataLevelUserLoginData(data)
                    .then(res => {
                        try {
                            if (isSuccess(res, t)) {
                                // if (res.data.content[0].value == "1") {
                                    t.tableselected = [];
                                    t.getData();
                                    t.$Modal.success({
                                        title: t.$t("reminder.suc"),
                                        content: t.$t("reminder.opesuccess")
                                    });
                                // } else {
                                //     t.$Modal.success({
                                //         title: t.$t("reminder.err"),
                                //         content: t.$t("reminder.refuseError"),
                                //     });
                                // }
                            }
                        } catch (res) {
                            t.$Modal.error({
                                title: t.$t("reminder.err"),
                                content: t.$t("reminder.errormessage")
                            });
                        }
                    })
                    .catch(() => {
                        t.$Modal.error({
                            title: t.$t("reminder.err"),
                            content: t.$t("reminder.errormessage")
                        });
                    })
                    .finally(() => {
                        t.isSpinTable = false;
                    });
            },
            onCancel: () => { }
        });
    }
};
export default {
    // button_offer,
    // button_entry,
    // button_backResImport,
    button_refuseFlow,
    button_backBatchDownload
};
