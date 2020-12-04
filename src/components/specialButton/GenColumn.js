
import { getDataLevelUserLogin, getDataLevelUserLoginData} from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
// 生成虚拟字段
const button_initColumnDis = (t) => {

    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        console.log('xuni1')
        t.$Modal.confirm({
            title: t.$t("reminder.remind"),
            content:t.$t("reminder.generated"),
            onOk: () => {
                const data = {
                    _mt: t.$global.mt + "GenColumn.initColumnDis",
                    APpid: t.mainId,
                    APfunId: "1",
                    APlogType: "生成虚拟字段",
                    APids: t.tableselected.toString(),
                };
                t.isSpinTable = true;
                getDataLevelUserLoginData(data)
                    .then((res) => {
                        try {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value == "1") {
                                    t.tableselected = [];
                                    t.isSpinTable = false;
                                    t.getData();
                                }
                            }
                        } catch (res) {
                            t.$Modal.error({
                                title: t.$t("reminder.err"),
                                content: t.$t("reminder.errormessage"),
                            });
                        }
                    })
                    .catch(() => {
                        t.isSpinTable = false;
                        t.$Modal.error({
                            title: t.$t("reminder.err"),
                            content: t.$t("reminder.errormessage"),
                        });
                    });
            },
            onCancel: () => { },
        });
    }
}

const button_updImp = (t) => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        t.$Modal.confirm({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.primaryKey"),
            onOk: () => {
                t.isSpinTable = true;
                getDataLevelUserLoginData({
                    _mt: t.mt + t.tbName + ".UpdOrimport",
                    APfunId: "1",
                    APlogType: "导入必填",
                    APids: t.tableselected.toString(),
                    APstatusbutton: 0,
                })
                    .then((res) => {
                        try {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value == "1") {
                                    t.tableselected = [];
                                    t.isSpinTable = false;
                                    t.getData();
                                }
                            } else {
                                t.isSpinTable = false;
                            }
                        } catch (res) {
                            t.$Modal.error({
                                title: t.$t("reminder.err"),
                                content: t.$t("reminder.errormessage"),
                            });
                        }
                    })
                    .catch(() => {
                        t.$Modal.error({
                            title: t.$t("reminder.err"),
                            content: t.$t("reminder.errormessage"),
                        });
                    });
            },
            onCancel: () => { },
        });
    }
}
 
const button_updNull = (t) => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        t.$Modal.confirm({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.required"),
            onOk: () => {
                t.isSpinTable = true;
                getDataLevelUserLoginData({
                    _mt: t.mt + t.tbName + ".UpdOrimport",
                    APfunId: "1",
                    APlogType: "导入必填",
                    APids: t.tableselected.toString(),
                    APstatusbutton: 1,
                })
                    .then((res) => {
                        try {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value == "1") {
                                    t.tableselected = [];
                                    t.isSpinTable = false;
                                    t.getData();
                                }
                            } else {
                                t.isSpinTable = false;
                            }
                        } catch (res) {
                            t.$Modal.error({
                                title: t.$t("reminder.err"),
                                content: t.$t("reminder.errormessage"),
                            });
                        }
                    })
                    .catch(() => {
                        t.$Modal.error({
                            title: t.$t("reminder.err"),
                            content: t.$t("reminder.errormessage"),
                        });
                    });
            },
            onCancel: () => { },
        });
    }
}
//是否重复
const button_isRepeat = (t) => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        t.$Modal.confirm({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.isRepeat"),
            onOk: () => {
                t.isSpinTable = true;
                getDataLevelUserLoginData({
                    _mt: t.mt + t.tbName + ".UpdOrimport",
                    APfunId: "1",
                    APlogType: "是否重复",
                    APids: t.tableselected.toString(),
                    APstatusbutton: 2,
                })
                    .then((res) => {
                        try {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value == "1") {
                                    t.tableselected = [];
                                    t.isSpinTable = false;
                                    t.getData();
                                }
                            } else {
                                t.isSpinTable = false;
                            }
                        } catch (res) {
                            t.$Modal.error({
                                title: t.$t("reminder.err"),
                                content: t.$t("reminder.errormessage"),
                            });
                        }
                    })
                    .catch(() => {
                        t.$Modal.error({
                            title: t.$t("reminder.err"),
                            content: t.$t("reminder.errormessage"),
                        });
                    });
            },
            onCancel: () => { },
        });
    }
}
//是否导出
const button_isExport = (t) => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        t.$Modal.confirm({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.isExport"),
            onOk: () => {
                t.isSpinTable = true;
                getDataLevelUserLoginData({
                    _mt: t.mt + t.tbName + ".UpdOrimport",
                    APfunId: "1",
                    APlogType: "是否导出",
                    APids: t.tableselected.toString(),
                    APstatusbutton: 3,
                })
                    .then((res) => {
                        try {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value == "1") {
                                    t.tableselected = [];
                                    t.isSpinTable = false;
                                    t.getData();
                                }
                            } else {
                                t.isSpinTable = false;
                            }
                        } catch (res) {
                            t.$Modal.error({
                                title: t.$t("reminder.err"),
                                content: t.$t("reminder.errormessage"),
                            });
                        }
                    })
                    .catch(() => {
                        t.$Modal.error({
                            title: t.$t("reminder.err"),
                            content: t.$t("reminder.errormessage"),
                        });
                    });
            },
            onCancel: () => { },
        });
    }
}
//生成虚拟字段

export default {
    button_initColumnDis,
    button_updImp,
    button_updNull,
    button_isRepeat,
    button_isExport
}