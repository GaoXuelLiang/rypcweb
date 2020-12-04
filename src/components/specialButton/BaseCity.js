/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-08-12 16:42:15
 * @LastEditTime: 2020-10-07 15:11:48
 * @LastEditors: Sok
 */
import { getDataLevelUserLogin,getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from "@/lib/util";
const button_pinyin = (t) => {
    getDataLevelUserLoginData({
        _mt: t.$global.mt + 'BaseCity.updCodetoPinYin',
        APfunId: '1',
        APlogType: '转拼音编码',
    }).then((res) => {
        if (isSuccess(res, t)) {
            t.$Modal.success({
                title: t.$t('reminder.suc'),
                content: '转换成功',
            })
            t.getData()
        }
    }).catch(() => {
        t.$Modal.error({
            title: t.$t('reminder.err'),
            content: t.$t('reminder.errormessage'),
        })
    })
}
const button_start = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'BaseCity.getEmpByIdnum',
            APids: t.tableselected.toString(),
            APlogType: "启用",
            APstatus: '1'
        }).then((res) => {
            if (isSuccess(res, t)) {
                t.$Modal.success({
                    title: t.$t('reminder.suc'),
                    content: '启用成功',
                })
                t.getData()
            }
        }).catch(() => {
            t.$Modal.error({
                title: t.$t('reminder.err'),
                content: t.$t('reminder.errormessage'),
            })
        })
    }
}
const button_stop = t => {
    if (t.tableselected.length === 0) {
        t.$Modal.warning({
            title: t.$t("reminder.remind"),
            content: t.$t("reminder.leastone"),
        });
    } else {
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'BaseCity.getEmpByIdnum',
            APids: t.tableselected.toString(),
            APlogType: "停用",
            APstatus: '0'
        }).then((res) => {
            if (isSuccess(res, t)) {
                t.$Modal.success({
                    title: t.$t('reminder.suc'),
                    content: '停用成功',
                })
                t.getData()
            }
        }).catch(() => {
            t.$Modal.error({
                title: t.$t('reminder.err'),
                content: t.$t('reminder.errormessage'),
            })
        })
    }
}
export default {
    button_pinyin,
    button_start,
    button_stop
}