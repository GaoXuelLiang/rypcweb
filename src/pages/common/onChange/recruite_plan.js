const recruite_plan = {
  all_dis() {
    recruite_plan.planCode_dis(this)
    // recruite_plan.planIfpass_dis(this)
  },
  // 计划单号
  planCode(node) {
    recruite_plan.planCode_set(this.$parent)
    recruite_plan.planCode_dis(this.$parent)
  },
  // // 是否审批通过
  // planIfpassDis(node) {
  //   recruite_plan.planIfpass_set(this.$parent)
  //   recruite_plan.planIfpass_dis(this.$parent)
  // },
  // 计划单号是否存在
  planCode_set(t) {
    if (t.valueMap.planCode && t.$refs[t.valueMap.planCode][0].formDataSubmit.planCode === '') {
      if (t.valueMap.planCode) {
        t.$refs[t.valueMap.planCode][0].$set(t.$refs[t.valueMap.requestCode][0].formDataSubmit, 'planCode', '')
      }
    }
  },
  planCode_dis(t) {
    if (t.valueMap.planCode) {
      if (t.$refs[t.valueMap.planCode][0].formDataSubmit.planCode === '') {
        if (t.valueMap.planCode) {
          t.$refs[t.valueMap.planCode][0].$delete(t.$refs[t.valueMap.planCode][0].formshow, 'planCode')
        }
      } else {
        if (t.valueMap.planCode) {
          t.$refs[t.valueMap.planCode][0].$set(t.$refs[t.valueMap.planCode][0].formshow, 'planCode', '')
        }
      }
    }
  },
// 审批是否通过
//   planIfpass_set(t) {
//     if (t.valueMap.planIfpass && t.$refs[t.valueMap.planIfpass][0].formDataSubmit.planIfpass === '1') {
//       if (t.valueMap.planReason) {
//         t.$refs[t.valueMap.planReason][0].$set(t.$refs[t.valueMap.planReason][0].formDataSubmit, 'planReason', '')
//       }
//     }
//   },
//   planIfpass_dis(t) {
//     if (t.valueMap.planIfpass) {
//       if (t.$refs[t.valueMap.planIfpass][0].formDataSubmit.planIfpass === '1') {
//         if (t.valueMap.planReason) {
//           t.$refs[t.valueMap.planReason][0].$delete(t.$refs[t.valueMap.planReason][0].formshow, 'planReason')
//         }
//       } else {
//         if (t.valueMap.planReason) {
//           t.$refs[t.valueMap.planReason][0].$set(t.$refs[t.valueMap.planReason][0].formshow, 'planReason', '')
//         }
//       }
//     }
//   },
}

export default recruite_plan
