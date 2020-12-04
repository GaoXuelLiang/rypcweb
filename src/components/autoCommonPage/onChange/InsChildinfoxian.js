/*
 * @Author: guwenjiang
 * @Date: 2020-11-17 19:03:47
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-17 19:29:52
 */
import { displayEvent, setValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
const InsChildinfo = {
    all_dis () {
        
    },
    inscIdcard (node) {
        const t = this
        let reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i; 
        let value = node.value
        if(value.length === 18) {
            if(reg.test(value)){
                let birth = value.substring(6, 10) + "-" + value.substring(10, 12) + "-" + value.substring(12, 14)
                setValue(t,{'inscCbirth':birth})
            }else{
                setValue(t,{'inscCbirth':''})
            }
        }
    }
};

export default InsChildinfo;