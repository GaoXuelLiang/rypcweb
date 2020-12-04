const apply_travelchange = {
  all_dis() {
    apply_travelchange.apptrMamconfirm_dis(this)
  },
  apptrMamconfirm(node) {
    apply_travelchange.apptrMamconfirm_set(this.$parent)
    apply_travelchange.apptrMamconfirm_dis(this.$parent)
  },
  // 是否Payroll Log Check（SCM）
  apptrMamconfirm_set(t) {
    // 是否Payroll Log Check（SCM）隐藏前清空字段值
    if (t.valueMap.apptrMamconfirm && t.$refs[t.valueMap.apptrMamconfirm][0].formDataSubmit.apptrMamconfirm === '1') {
      if (t.valueMap.apptrMamnonconres) {
        t.$refs[t.valueMap.apptrMamnonconres][0].$set(t.$refs[t.valueMap.apptrMamnonconres][0].formDataSubmit, 'apptrMamnonconres', '')
      }
    }
  },
  apptrMamconfirm_dis(t) {
    // 是否Payroll Log Check（SCM）
    if (t.valueMap.apptrMamconfirm) {
      if (t.$refs[t.valueMap.apptrMamconfirm][0].formDataSubmit.apptrMamconfirm === '1') {
        if (t.valueMap.apptrMamnonconres) {
          t.$refs[t.valueMap.apptrMamnonconres][0].$delete(t.$refs[t.valueMap.apptrMamnonconres][0].formshow, 'apptrMamnonconres')
        }
      } else {
        if (t.valueMap.apptrMamnonconres) {
          t.$refs[t.valueMap.apptrMamnonconres][0].$set(t.$refs[t.valueMap.apptrMamnonconres][0].formshow, 'apptrMamnonconres', '')
        }
      }
    }
  },

}
export default apply_travelchange
