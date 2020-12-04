/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const eval_flow_appeal = {
  all_dis() {
    eval_flow_appeal.evalIsupscore_dis(this)
  },
  evalIsupscore(node) {
    eval_flow_appeal.evalIsupscore_dis(this.$parent)
  },
  evalIsupscore_dis(t) {
    if (t.valueMap.evalIsupscore) {
      if (t.$refs[t.valueMap.evalIsupscore][0].formDataSubmit.evalIsupscore === '0') {
        if (t.valueMap.evalNewscore) {
          t.$refs[t.valueMap.evalNewscore][0].$delete(t.$refs[t.valueMap.evalNewscore][0].formshow, 'evalNewscore')
        }
      } else {
        if (t.valueMap.evalNewscore) {
          t.$refs[t.valueMap.evalNewscore][0].$set(t.$refs[t.valueMap.evalNewscore][0].formshow, 'evalNewscore', '')
        }
      }
    }
  },
}

export default eval_flow_appeal
