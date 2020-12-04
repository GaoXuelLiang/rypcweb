/**
 * Created by Aaron on 2018/4/19.
 */

import {getDataLevelUserLogin} from '../../../axios/axios'

const emp_address = {
  all_dis() {
    emp_address.empaddrType_dis(this)
  },
  empaddrType(node) {
    emp_address.empaddrType_dis(this.$parent)
  },
  // 户籍地址
  empaddrType_dis(t) {
    console.log(t)
    if (t.valueMap.empaddrType) {
      console.log(t.$refs[t.valueMap.empaddrType])
      console.log(t.$refs[t.valueMap.empaddrType])
      if (t.$refs[t.valueMap.empaddrType].formDataSubmit.empaddrType === '02register') {
        if (t.valueMap.empaddrRegisterproperty) {
          t.$refs[t.valueMap.empaddrRegisterproperty].$set(t.$refs[t.valueMap.empaddrRegisterproperty].formshow, 'empaddrRegisterproperty', '')
        }
      } else {
        if (t.valueMap.empaddrRegisterproperty) {
          t.$refs[t.valueMap.empaddrRegisterproperty].$delete(t.$refs[t.valueMap.empaddrRegisterproperty].formshow, 'empaddrRegisterproperty')
        }
      }
    }
  },
}

export default emp_address
// export default flow1
