/**
 * Created by Aaron on 2018/4/19.
 */
const apply_additional = {
  all_dis() {
     apply_additional.attRecIsapply_dis(this)
  },
  attRecIsapply(node) {
     apply_additional.attRecIsapply_set(this.$parent)
     apply_additional.attRecIsapply_dis(this.$parent)
  },
  attRecIsapply_set(t) {
    // 是否 隐藏前清空字段值
     if (t.valueMap.attRecIsapply && t.$refs[t.valueMap.attRecIsapply][0].formDataSubmit.attRecIsapply === '1') {
      if (t.valueMap.attRecAddireason) {
        t.$refs[t.valueMap.attRecAddireason][0].$set(t.$refs[t.valueMap.attRecAddireason][0].formDataSubmit, 'attRecAddireason', '')
      }
    }
  },
  attRecIsapply_dis(t) {
    // 是否
    if (t.valueMap.attRecIsapply) {
      if (t.$refs[t.valueMap.attRecIsapply][0].formDataSubmit.attRecIsapply === '1') {
        if (t.valueMap.attRecAddireason) {
          t.$refs[t.valueMap.attRecAddireason][0].$delete(t.$refs[t.valueMap.attRecAddireason][0].formshow, 'attRecAddireason')
        }
      } else {
        if (t.valueMap.attRecAddireason) {
          t.$refs[t.valueMap.attRecAddireason][0].$set(t.$refs[t.valueMap.attRecAddireason][0].formshow, 'attRecAddireason', '')
        }
      }
    }
  },

}

export default apply_additional
