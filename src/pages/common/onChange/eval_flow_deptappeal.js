/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const eval_flow_deptappeal = {
  all_dis() {
    eval_flow_deptappeal.evalDeptisupscore_dis(this)
  },
  evalDeptisupscore(node) {
    eval_flow_deptappeal.evalDeptisupscore_set(this.$parent)
    eval_flow_deptappeal.evalDeptisupscore_dis(this.$parent)
  },
  evalDeptisupscore_set(t) {
    // 是否修改评分
    if (t.valueMap.evalDeptisupscore && t.$refs[t.valueMap.evalDeptisupscore][0].formDataSubmit.evalDeptisupscore === '0') {
      if (t.valueMap.evalDeptnewscore) {
        t.$refs[t.valueMap.evalDeptnewscore][0].$set(t.$refs[t.valueMap.evalDeptnewscore][0].formDataSubmit, 'evalDeptnewscore', '')
      }
    }
  },
  evalDeptisupscore_dis(t) {
    // 是否修改评分
    if (t.valueMap.evalDeptisupscore) {
      if (t.$refs[t.valueMap.evalDeptisupscore][0].formDataSubmit.evalDeptisupscore === '0') {
        if (t.valueMap.evalDeptnewscore) {
          t.$refs[t.valueMap.evalDeptnewscore][0].$delete(t.$refs[t.valueMap.evalDeptnewscore][0].formshow, 'evalDeptnewscore')
        }
      } else {
        if (t.valueMap.evalDeptnewscore) {
          t.$refs[t.valueMap.evalDeptnewscore][0].$set(t.$refs[t.valueMap.evalDeptnewscore][0].formshow, 'evalDeptnewscore', '')
        }
      }
    }
  },
}
export default eval_flow_deptappeal
