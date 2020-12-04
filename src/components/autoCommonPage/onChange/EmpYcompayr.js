/*
 * @Author: guwenjiang
 * @Date: 2020-10-31 10:48:29
 * @LastEditors: g05047
 * @LastEditTime: 2020-11-19 10:16:21
 */
import { displayEvent, setValue } from './public'
const EmpYcompayr = {
    all_dis() {
        EmpYcompayr.init_ycprKemu(this)
    },
    init_ycprKemu(t) {
        let filter = t.$parent.flsdbSubfilter ? t.$parent.flsdbSubfilter.split('=')[1] : ''
        setTimeout(() => {
            t.$refs.commonSingleForm.formDataSubmit.ycprKemu = filter
        },20)
    }
}
export default EmpYcompayr