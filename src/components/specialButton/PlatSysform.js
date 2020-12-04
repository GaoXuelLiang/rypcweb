/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-21 14:13:41
 * @LastEditTime: 2020-10-07 16:27:51
 * @LastEditors: Sok
 */
import { getDataLevelUserLoginData } from "@/axios/axios";
import { isSuccess, deepCopy } from "@/lib/util";
// 复制
const button_copy = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone")
        });
    } else {
        t.$Modal.confirm({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.confirmCopy"),
            onOk: () => {
                const data = {
                    _mt: t.$global.mt + "PlatSysform.copyData",
                    APlogType: t.$t("status.copy"),
                    APids: t.tableselected.toString()
                };
                t.isSpinTable = true;
                getDataLevelUserLoginData(data)
                    .then(res => {
                        try {
                            if (isSuccess(res, t)) {
                                if (res.data.content[0].value == "1") {
                                    t.tableselected = [];
                                    t.getData();
                                }
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
//清除配置缓存
const button_del_redis = t => {
    let data = {
        _mt: t.$global.mt + "PlatSysform.delRedisColumn",
    };
    getDataLevelUserLoginData(data)
        .then((res) => {
            if (isSuccess(res, t)) {
                t.$Modal.success({
                    title: t.$t("reminder.suc"),
                    content: t.$t("lang_homePage.platSetting.setSuccess"),
                });
            }
        })
        .catch(() => {
            t.$Modal.error({
                title: t.$t("reminder.err"),
                content: t.$t("reminder.errormessage"),
            });
        });
};

//清除所有缓存
const button_Alldel_redis = t => {
    let data = {
        _mt: t.$global.mt + "PlatSysform.delAllRedis",
    };
    getDataLevelUserLoginData(data)
        .then((res) => {
            if (isSuccess(res, t)) {
                t.$Modal.success({
                    title: t.$t("reminder.suc"),
                    content: t.$t("lang_homePage.platSetting.setSuccess"),
                });
            }
        })
        .catch(() => {
            t.$Modal.error({
                title: t.$t("reminder.err"),
                content: t.$t("reminder.errormessage"),
            });
        });
};
export default {
    button_copy,
    button_del_redis,
    button_Alldel_redis
};
