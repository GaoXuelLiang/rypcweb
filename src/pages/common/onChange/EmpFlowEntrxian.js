import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
const EmpFlowEntr = {
    all_dis() {
        // EmpFlowEntr.entContractime_dis(this)
        EmpFlowEntr.initShowHide(this)
    },
    entEmpname (node) {
        let pinyin = require('js-pinyin');
        pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
        let re = /^[\u4e00-\u9fa5]{1}$/;
        const isChinese = str => !re.test(str);
        if (!isChinese(node.value)) {
            return false;
        } else {
            let entEmppny = pinyin.getFullChars(node.value)
            setValue(this, { 'entEmppny': entEmppny })
        }
    },
    entEmpenplacid (node) {
        const t = this;
        if(t.formDataSubmit[node.ruleText] !== '' && t.formDataSubmit.hasOwnProperty(node.ruleText)) {
            let placeId = t.formDataSubmit[node.ruleText];
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'BaseEntplace.getById',
                APid: placeId,
                APffk: `glc${t.funId}`
            }).then(res => {
                if(isSuccess(res, t)) {
                    if(JSON.stringify(res.data.content[0]) !== '{}') {
                        let data = res.data.content[0];
                        if(data.entIsycser === '0') {
                            setValue(t, {'entEmpaddre': data.entAddr})
                            t.dis.entEmpaddre = false
                        }else {
                            setValue(t, {'entEmpaddre': ''})
                            t.dis.entEmpaddre = true
                        }
                    }
                }
            }).catch(() => {

            })
        }else {
            setValue(t, {'entEmpaddre': ''})
            t.dis.entEmpaddre = true
        }
    },
    place_disabled(t){
        if(t.valueMap.entEmpenplacid) {
            let placeId = t.$refs[t.valueMap.entEmpenplacid][0].formDataSubmit.entEmpenplacid
            if(placeId) {
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'BaseEntplace.getById',
                    APid: placeId,
                    APffk: ''
                }).then(res => {
                    if(isSuccess(res, t)) {
                        if(JSON.stringify(res.data.content[0]) !== '{}') {
                            let data = res.data.content[0];
                            if(data.entIsycser === '0') {
                                t.$refs[t.valueMap.entEmpenplacid][0].dis.entEmpaddre = false
                            }else {
                                t.$refs[t.valueMap.entEmpenplacid][0].dis.entEmpaddre = true
                            }
                        }
                    }
                })
            }
        }
    },
    entContrtime (node) {
        const t = this;
        // EmpFlowEntr.entContractime_dis(t);
    },
    entDeadline(node) {
        const t = this;
        // EmpFlowEntr.entContractime_dis(t);
    },
    entContractime_dis (t) {
        let valueMap = '';
        let startDate = '';
        let deadline = '';
        if(t.valueMap) {
            valueMap = t.valueMap;
            if(valueMap.entContrtime) {
                startDate = t.$refs[valueMap.entContrtime][0].formDataSubmit.entContrtime;
            }
            if(valueMap.entDeadline) {
                deadline = t.$refs[valueMap.entDeadline][0].formDataSubmit.entDeadline; 
            }
        }else {
            valueMap = t.$parent.valueMap;
            if(valueMap.entContrtime) {
                startDate = t.$parent.$refs[valueMap.entContrtime][0].formDataSubmit.entContrtime;
            }
            if(valueMap.entDeadline) {
                deadline = t.$parent.$refs[valueMap.entDeadline][0].formDataSubmit.entDeadline; 
            }
        }
        if(valueMap.entContractime) {
            if(startDate && deadline !== '99' && deadline !== '0' && deadline !== '') {
                let date = '';
                let y = Number(startDate.split('-')[0]);
                let m = Number(startDate.split('-')[1]);
                let d = Number(startDate.split('-')[2]);
                switch(deadline) {
                    case '1':
                        y += 1;
                        break;
                    case '3':
                        y += 3;
                        break;
                    case '5':
                        y += 5;
                        break;
                }
                date = y + '-' + EmpFlowEntr.format(m) + '-' + EmpFlowEntr.format(d)
                if(t.valueMap) {
                    initSetValue(t, {'entContractime': date})
                }else {
                    setValue(t, {'entContractime': date})
                }
            }else {
                if(t.valueMap) {
                    initSetValue(t, {'entContractime': ''})
                }else {
                    setValue(t, {'entContractime': ''})
                }
            }
        }
    },
    format (n) {
        return n > 9 ? n : '0' + n;
    },
    /**
     * @description: 选择国家显示隐藏地址
     * @param {*} node
     * @return {*}
     */
    entCoutid (node) {
        const t = this;
        let arr = ['entProid', 'entCityid', 'entNcouid', 'entCardproid', 'entCardid', 'entCardcouid', 'entCardaddrs'];
        if(node.thisValue !== '中国') {
            for(let v of arr) {
                t.$refs[v].thisValue = ''
            }
            displayEvent(t, 0, arr);
        }else {
            displayEvent(t, 1, arr);
        }
    },
    /**
     * @description: 初始化显示隐藏
     * @param {*} t
     * @return {*}
     */
    initShowHide (t) {
        // 学位毕业证的显示隐藏
        let valueMap = t.valueMap;
        if(valueMap.entAcid) {
            let entAcid = t.$refs[valueMap.entAcid][0].formDataSubmit.entAcid;//最高学历
            let entIslguow = '0';
            if(valueMap.entIslguow) {
                entIslguow = t.$refs[valueMap.entIslguow][0].formDataSubmit.entIslguow;//是否国外
            }
            if(entAcid === '13doctoral' || entAcid === '14doctor') {//博士
                initDisplayEvent(t, 1, ['entBacdiplo', 'entBacficate', 'entMastdiplo', 'entMastficate', 'entDocficate', 'entDocdiplo'])
                if(entIslguow === '1') {
                    initDisplayEvent(t, 0, ['entBkhwfile', 'entBshwfile'])//本科海外学历认证;硕士海外学历认证
                    initDisplayEvent(t, 1, ['entBbhwfile'])//博士海外学历认证
                }else {
                    initDisplayEvent(t, 0, ['entBkhwfile', 'entBshwfile', 'entBbhwfile'])
                }
                // initDisplayEvent(t, 0, ['entMastdiplo', 'entMastficate'])
            }else if(entAcid === '10master' || entAcid === '11EMBAmaster' || entAcid === '12EBAmaster') {//硕士
                initDisplayEvent(t, 1, ['entBacdiplo', 'entBacficate', 'entMastdiplo', 'entMastficate'])
                initDisplayEvent(t, 0, ['entDocficate', 'entDocdiplo'])
                if(entIslguow === '1') {
                    initDisplayEvent(t, 0, ['entBkhwfile', 'entBbhwfile']);
                    initDisplayEvent(t, 1, ['entBshwfile'])
                }else {
                    initDisplayEvent(t, 0, ['entBkhwfile', 'entBshwfile', 'entBbhwfile'])
                }
            }else if(entAcid === '09bachelor') {//本科
                initDisplayEvent(t, 1, ['entBacdiplo', 'entBacficate'])
                initDisplayEvent(t, 0, ['entMastdiplo', 'entMastficate', 'entDocficate', 'entDocdiplo'])
                if(entIslguow === '1') {
                    initDisplayEvent(t, 0, ['entBshwfile', 'entBbhwfile']);
                    initDisplayEvent(t, 1, ['entBkhwfile'])
                }else {
                    initDisplayEvent(t, 0, ['entBkhwfile', 'entBshwfile', 'entBbhwfile'])
                }
            }else {
                initDisplayEvent(t, 0, ['entBacdiplo', 'entBacficate', 'entMastdiplo', 'entMastficate', 'entDocficate', 'entDocdiplo', 'entBkhwfile', 'entBshwfile', 'entBbhwfile'])
            }

        }
        // 居住地显示隐藏
        if(valueMap.entCoutid) {
            let entCoutidDis = t.$refs[valueMap.entCoutid][0].formDataSubmit.entCoutidDis;
            let arr = ['entProid', 'entCityid', 'entNcouid', 'entCardproid', 'entCardid', 'entCardcouid', 'entCardaddrs'];
            if(entCoutidDis !== '中国') {
                initDisplayEvent(t, 0, arr)
            }else {
                initDisplayEvent(t, 1, arr)
            }
        }
    }
}
export default EmpFlowEntr