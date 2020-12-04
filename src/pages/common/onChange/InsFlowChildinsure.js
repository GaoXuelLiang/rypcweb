/*
 * @Author: guwenjiang
 * @Date: 2020-09-29 13:49:26
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-17 16:41:57
 */
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
const InsFlowChildinsure = {
    all_dis () {
        InsFlowChildinsure.initVaHuman(this)
    },
    insuIdtype (node) {
        InsFlowChildinsure.initBirthOrCard(this);
    },
    insuIdcard (node) {
        InsFlowChildinsure.initBirthOrCard(this);
    },
    insuCbirth (node) {
        InsFlowChildinsure.initBirthOrCard(this);
    },
    initBirthOrCard (t) {
        let type = t.formDataSubmit.insuIdtype;//证件类型
        let idCard = t.formDataSubmit.insuIdcard;//身份证号
        let birth = t.formDataSubmit.insuCbirth;//生日
        let birthday = "";
        if(type === '01id' && idCard) {
            if(idCard.length === 18) {
                birthday = idCard.slice(6, 14).replace(/(.{4})(.{2})/,'$1-$2-');
                if(birth !== '' && birth != birthday) {
                    t.$Message.warning("身份证号或生日填写有误!")
                    let obj = {
                        'insuCbirth':'',
                        'insuIdcard':''
                    }
                    setValue(t,obj)
                }else {
                    setValue(t,{'insuCbirth':birthday})
                }
            }else if(idCard.length > 18) {
                t.$Message.warning("身份证号填写有误!")
                setValue(t,{'insuIdcard':''})
            }
        }
    },
    /**
     * @description: 初始化当前人员
     * @param {*} this
     * @return {*}
     */  
    initVaHuman (t) {
        if(!t.thisSetpName) {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'InsFlowChildinsure.addById',
                AProleType: localStorage.roleType
            }).then(res => {
                if(isSuccess(res, t)) {
                    let data = res.data.content[0]
                    let obj = {
                        'insuEmpid': data.insuEmpid,
                        'insuUscope': data.insuUscope,
                        'insuPos': data.insuPos,
                        'insuPosDis': data.insuPosDis,
                        'insuRankid': data.insuRankid,
                        'insuRankidDis': data.insuRankidDis
                    }
                    initSetValue(t, obj)
                    t.$refs[t.valueMap.insuEmpid][0].$refs.insuEmpid.thisValue = data.insuEmpidDis
                }
            }).catch(() => {
    
            })
        }
    }  
}
export default InsFlowChildinsure;