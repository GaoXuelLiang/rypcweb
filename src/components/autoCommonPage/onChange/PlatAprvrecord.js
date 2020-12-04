/*
 * @Author: guwenjiang
 * @Date: 2020-11-05 16:34:17
 * @LastEditors: Sok
 * @LastEditTime: 2020-12-03 11:16:02
 */
import { displayEvent, setValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
const PlatAprvrecord = {
    all_dis () {
        PlatAprvrecord.initFilter(this)
        PlatAprvrecord.initValue(this)
        PlatAprvrecord.initDname(this)
    },
    initFilter(t) {
        return
        // if(t.$global.mt !== 'xian') {
        //     return
        // }
        // 审批步骤添加过滤条件
        t.formData.columns.forEach(item => {
            if(item.clmName === 'aprdStepid') {
                item.clmfilter = `aprdDataid=$${t.$parent.mainId};aprdFlowid=$${t.$parent.flowId};aprdFlowidStep=$${t.$parent.stepId};aprdCheck='0'`
            }
        })
    },
    initValue (t) {
        return
        // if(t.$global.mt !== 'xian') {
        //     return
        // }
        // 修改状态清空审批步骤类型
        if(t.logType === '修改') {
            let form = t.formlist.form;
            if(form.aprdIsdelflag === '0') {
                t.formlist.form.aprdSteptype = ''
            }
        } 
    },
    initDname (t) {
        return
        // if(t.$global.mt !== 'xian') {
        //     return
        // }
        // 修改字段的 clmDname
        t.formData.columns.forEach(item => {
            if(item.clmName === 'aprdStepid') {
                item.clmDname = '附近步骤'
            }
        })
    }
};

export default PlatAprvrecord;