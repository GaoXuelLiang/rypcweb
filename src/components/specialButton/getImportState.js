/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-11-12 10:43:48
 * @LastEditTime: 2020-11-16 14:21:09
 * @LastEditors: Sok
 */
import { getDataLevelUserLoginData } from '../../axios/axios'
import { isSuccess } from '../../lib/util'

export const getImportState  = (t)=> {
    // const t = this
    t.isSpinTable = true
    getDataLevelUserLoginData({
        _mt: t.$global.mt + 'UserJobQueue.compStatusQuery',
        APjobueueId: t.jobQueueId,
    }).then((res) => {
        if (isSuccess(res, t)) {
            if (res.data.content[0].status === -1) {
                window.clearInterval(t.imp)
                t.isSpinTable = false
                return
            }
            if (res.data.content[0].status != 100) {
                setTimeout(()=>{
                    window.setInterval(getImportState(t), 3000)  
                },2000) 
            } else {
                t.isSpinTable = false
                window.clearInterval(t.imp)
                t.isSpinTable = false
                    setTimeout(() => {
                        t.$Modal.success({
                            title: t.$t('reminder.suc'),
                            content: '核算成功',
                        })
                    },1200)
                t.getData()
            }
        } else {
            clearInterval(t.imp)
            t.isSpinTable = false
            setTimeout(() => {
            t.$Modal.error({
                    title: t.$t('reminder.err'),
                    content: '核算失败',
                })
             },1200)
        }
    }).catch(() => {
        clearInterval(t.imp)
        t.isSpinTable = false
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
    })
}