const recruite_request = {
  all_dis() {
    recruite_request.requestCode_dis(this)
    // recruite_request.requestPmifpass_dis(this)
    // recruite_request.requestBpifpass_dis(this)
    // recruite_request.requestCoeifpass_dis(this)
    // recruite_request.requestCeoifpass_dis(this)
  },
  // 单号
  requestCode(node) {
    recruite_request.requestCode_set(this.$parent)
    recruite_request.requestCode_dis(this.$parent)
  },
  // requestPmifpass(node) {
  //   recruite_request.requestPmifpass_set(this.$parent)
  //   recruite_request.requestPmifpass_dis(this.$parent)
  // },
  // requestBpifpass(node) {
  //   recruite_request.requestBpifpass_set(this.$parent)
  //   recruite_request.requestBpifpass_dis(this.$parent)
  // },
  // requestCoeifpass(node) {
  //   recruite_request.requestCoeifpass_set(this.$parent)
  //   recruite_request.requestCoeifpass_dis(this.$parent)
  // },
  // requestCeoifpass(node) {
  //   recruite_request.requestCeoifpass_set(this.$parent)
  //   recruite_request.requestCeoifpass_dis(this.$parent)
  // },
  // 单号是否存在
  requestCode_set(t) {
    if (t.valueMap.requestCode && t.$refs[t.valueMap.requestCode][0].formDataSubmit.requestCode === '') {
      if (t.valueMap.requestCode) {
        t.$refs[t.valueMap.requestCode][0].$set(t.$refs[t.valueMap.requestCode][0].formDataSubmit, 'requestCode', '')
      }
    }
  },
  requestCode_dis(t) {
    if (t.valueMap.requestCode) {
      if (t.$refs[t.valueMap.requestCode][0].formDataSubmit.requestCode === '') {
        if (t.valueMap.requestCode) {
          t.$refs[t.valueMap.requestCode][0].$delete(t.$refs[t.valueMap.requestCode][0].formshow, 'requestCode')
        }
      } else {
        if (t.valueMap.requestCode) {
          t.$refs[t.valueMap.requestCode][0].$set(t.$refs[t.valueMap.requestCode][0].formshow, 'requestCode', '')
        }
      }
    }
  },
  // // 上级经理是否通过审批
  // requestPmifpass_set(t) {
  //   if (t.valueMap.requestPmifpass && t.$refs[t.valueMap.requestPmifpass][0].formDataSubmit.requestPmifpass === '1') {
  //     if (t.valueMap.requestPmerson) {
  //       t.$refs[t.valueMap.requestPmerson][0].$set(t.$refs[t.valueMap.requestPmerson][0].formDataSubmit, 'requestPmerson', '')
  //     }
  //   }
  // },
  // requestPmifpass_dis(t) {
  //   if (t.valueMap.requestPmifpass) {
  //     if (t.$refs[t.valueMap.requestPmifpass][0].formDataSubmit.requestPmifpass === '1') {
  //       if (t.valueMap.requestPmerson) {
  //         t.$refs[t.valueMap.requestPmerson][0].$delete(t.$refs[t.valueMap.requestPmerson][0].formshow, 'requestPmerson')
  //       }
  //     } else {
  //       if (t.valueMap.requestPmerson) {
  //         t.$refs[t.valueMap.requestPmerson][0].$set(t.$refs[t.valueMap.requestPmerson][0].formshow, 'requestPmerson', '')
  //       }
  //     }
  //   }
  // },
  // // BP是否通过审批
  // requestBpifpass_set(t) {
  //   if (t.valueMap.requestBpifpass && t.$refs[t.valueMap.requestBpifpass][0].formDataSubmit.requestBpifpass === '1') {
  //     if (t.valueMap.requestBperson) {
  //       t.$refs[t.valueMap.requestBperson][0].$set(t.$refs[t.valueMap.requestBperson][0].formDataSubmit, 'requestBperson', '')
  //     }
  //   }
  // },
  // requestBpifpass_dis(t) {
  //   if (t.valueMap.requestBpifpass) {
  //     if (t.$refs[t.valueMap.requestBpifpass][0].formDataSubmit.requestBpifpass === '1') {
  //       if (t.valueMap.requestBperson) {
  //         t.$refs[t.valueMap.requestBperson][0].$delete(t.$refs[t.valueMap.requestBperson][0].formshow, 'requestBperson')
  //       }
  //     } else {
  //       if (t.valueMap.requestBperson) {
  //         t.$refs[t.valueMap.requestBperson][0].$set(t.$refs[t.valueMap.requestBperson][0].formshow, 'requestBperson', '')
  //       }
  //     }
  //   }
  // },
  // // COE是否通过审批
  // requestCoeifpass_set(t) {
  //   if (t.valueMap.requestCoeifpass && t.$refs[t.valueMap.requestCoeifpass][0].formDataSubmit.requestCoeifpass === '1') {
  //     if (t.valueMap.requestCodereason) {
  //       t.$refs[t.valueMap.requestCodereason][0].$set(t.$refs[t.valueMap.requestCodereason][0].formDataSubmit, 'requestCodereason', '')
  //     }
  //   }
  // },
  // requestCoeifpass_dis(t) {
  //   if (t.valueMap.requestCoeifpass) {
  //     if (t.$refs[t.valueMap.requestCoeifpass][0].formDataSubmit.requestCoeifpass === '1') {
  //       if (t.valueMap.requestCodereason) {
  //         t.$refs[t.valueMap.requestCodereason][0].$delete(t.$refs[t.valueMap.requestCodereason][0].formshow, 'requestCodereason')
  //       }
  //     } else {
  //       if (t.valueMap.requestCodereason) {
  //         t.$refs[t.valueMap.requestCodereason][0].$set(t.$refs[t.valueMap.requestCodereason][0].formshow, 'requestCodereason', '')
  //       }
  //     }
  //   }
  // },
  // // ceo是否通过审批
  // requestCeoifpass_set(t) {
  //   if (t.valueMap.requestCeoifpass && t.$refs[t.valueMap.requestCeoifpass][0].formDataSubmit.requestCeoifpass === '1') {
  //     if (t.valueMap.requestPmerson) {
  //       t.$refs[t.valueMap.requestPmerson][0].$set(t.$refs[t.valueMap.requestPmerson][0].formDataSubmit, 'requestPmerson', '')
  //     }
  //   }
  // },
  // requestCeoifpass_dis(t) {
  //   if (t.valueMap.requestCeoifpass) {
  //     if (t.$refs[t.valueMap.requestCeoifpass][0].formDataSubmit.requestCeoifpass === '1') {
  //       if (t.valueMap.requestCeodereason) {
  //         t.$refs[t.valueMap.requestCeodereason][0].$delete(t.$refs[t.valueMap.requestCeodereason][0].formshow, 'requestCeodereason')
  //       }
  //     } else {
  //       if (t.valueMap.requestCeodereason) {
  //         t.$refs[t.valueMap.requestCeodereason][0].$set(t.$refs[t.valueMap.requestCeodereason][0].formshow, 'requestCeodereason', '')
  //       }
  //     }
  //   }
  // },
}
export default recruite_request
