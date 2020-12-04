/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_flow_probation = {
  all_dis() {
    emp_flow_probation.empprobIspass_dis(this)
    emp_flow_probation.empprobMgtbehavior_dis(this)
    emp_flow_probation.empprobIspass2_dis(this)
    emp_flow_probation.empprobIfchgsa2_dis(this)
    emp_flow_probation.empprobMgtbehavior2_dis(this)
    emp_flow_probation.empprobIsadfinish_dis(this)
    emp_flow_probation.empprobIstrainer_dis(this)
  },
  empprobIstrainer(node) {
    emp_flow_probation.empprobIstrainer_set(this.$parent)
    emp_flow_probation.empprobIstrainer_dis(this.$parent)
  },
  empprobIsadfinish(node) {
    emp_flow_probation.empprobIsadfinish_set(this.$parent)
    emp_flow_probation.empprobIsadfinish_dis(this.$parent)
  },
  empprobIspass(node) {
    emp_flow_probation.empprobIspass_dis(this.$parent)
  },
  empprobIspass2(node) {
    emp_flow_probation.empprobIspass2_dis(this.$parent)
  },
  empprobMgtbehavior(node) {
    emp_flow_probation.empprobMgtbehavior_dis(this.$parent)
  },
  empprobIfchgsa2(node) {
    emp_flow_probation.empprobIfchgsa2_dis(this.$parent)
  },
  empprobMgtbehavior2(node) {
    emp_flow_probation.empprobMgtbehavior2_dis(this.$parent)
  },
/*  empdimIsdimcompens(node) {
    emp_flow_dimission.empdimIsdimcompens_set(this.$parent)
    emp_flow_dimission.empdimIsdimcompens_dis(this.$parent)
  },*/

  empprobIstrainer_set(t) {
    if (t.$refs[t.valueMap.empprobIstrainer][0].formDataSubmit.empprobIstrainer === '0') {
      if (t.valueMap.empprobTraineeounds) {
        t.$refs[t.valueMap.empprobTraineeounds][0].$set(t.$refs[t.valueMap.empprobTraineeounds][0].formDataSubmit, 'empprobTraineeounds', '')
      }
    }
  },

  empprobIstrainer_dis(t) {
    // 是否调动确认，显示隐藏合同信息
    if (t.valueMap.empprobIstrainer) {
      if (t.$refs[t.valueMap.empprobIstrainer][0].formDataSubmit.empprobIstrainer === '0') {
        if (t.valueMap.empprobTraineeounds) {
          t.$refs[t.valueMap.empprobTraineeounds][0].$delete(t.$refs[t.valueMap.empprobTraineeounds][0].formshow, 'empprobTraineeounds')
        }
      } else {
        if (t.valueMap.empprobTraineeounds) {
          t.$refs[t.valueMap.empprobTraineeounds][0].$set(t.$refs[t.valueMap.empprobTraineeounds][0].formshow, 'empprobTraineeounds', '')
        }
      }
    }
  },

  empprobIsadfinish_set(t) {
    if (t.$refs[t.valueMap.empprobIsadfinish][0].formDataSubmit.empprobIsadfinish === '0') {
      if (t.valueMap.empprobIsadfinishdate) {
        t.$refs[t.valueMap.empprobIsadfinishdate][0].$set(t.$refs[t.valueMap.empprobIsadfinishdate][0].formDataSubmit, 'empprobIsadfinishdate', '')
      }
    }
  },

  empprobIsadfinish_dis(t) {
    // 是否调动确认，显示隐藏合同信息
    if (t.valueMap.empprobIsadfinish) {
      if (t.$refs[t.valueMap.empprobIsadfinish][0].formDataSubmit.empprobIsadfinish === '0') {
        if (t.valueMap.empprobIsadfinishdate) {
          t.$refs[t.valueMap.empprobIsadfinishdate][0].$delete(t.$refs[t.valueMap.empprobIsadfinishdate][0].formshow, 'empprobIsadfinishdate')
        }
      } else {
        if (t.valueMap.empprobIsadfinishdate) {
          t.$refs[t.valueMap.empprobIsadfinishdate][0].$set(t.$refs[t.valueMap.empprobIsadfinishdate][0].formshow, 'empprobIsadfinishdate', '')
        }
      }
    }
  },


  empprobIspass_dis(t) {
    if (t.valueMap.empprobIspass) {
      if (t.$refs[t.valueMap.empprobIspass][0].formDataSubmit.empprobIspass === '01agree') {
        t.$refs[t.valueMap.empprobIfchgsa][0].$set(t.$refs[t.valueMap.empprobIfchgsa][0].formshow, 'empprobIfchgsa', '')
        t.$refs[t.valueMap.empprobMgtbehavior][0].$delete(t.$refs[t.valueMap.empprobMgtbehavior][0].formshow, 'empprobMgtbehavior')
        t.$refs[t.valueMap.empprobSeptime][0].$delete(t.$refs[t.valueMap.empprobSeptime][0].formshow, 'empprobSeptime')
        t.$refs[t.valueMap.empprobPatime][0].$delete(t.$refs[t.valueMap.empprobPatime][0].formshow, 'empprobPatime')
      } else {
        t.$refs[t.valueMap.empprobIfchgsa][0].$delete(t.$refs[t.valueMap.empprobIfchgsa][0].formshow, 'empprobIfchgsa')
        t.$refs[t.valueMap.empprobMgtbehavior][0].$set(t.$refs[t.valueMap.empprobMgtbehavior][0].formshow, 'empprobMgtbehavior', '')
        t.$refs[t.valueMap.empprobSeptime][0].$set(t.$refs[t.valueMap.empprobSeptime][0].formshow, 'empprobSeptime', '')
        t.$refs[t.valueMap.empprobPatime][0].$set(t.$refs[t.valueMap.empprobPatime][0].formshow, 'empprobPatime', '')
      }
    }
  },
  empprobMgtbehavior_dis(t){
    if (t.valueMap.empprobMgtbehavior) {
      if(t.$refs[t.valueMap.empprobIspass][0].formDataSubmit.empprobIspass === '02disagree') {
        if (t.$refs[t.valueMap.empprobMgtbehavior][0].formDataSubmit.empprobMgtbehavior === '01sep') {
//          empprobMgtbehavior
          t.$refs[t.valueMap.empprobSeptime][0].$set(t.$refs[t.valueMap.empprobSeptime][0].formshow, 'empprobSeptime', '')
          t.$refs[t.valueMap.empprobPatime][0].$delete(t.$refs[t.valueMap.empprobPatime][0].formshow, 'empprobPatime')
        } else {
          t.$refs[t.valueMap.empprobPatime][0].$set(t.$refs[t.valueMap.empprobPatime][0].formshow, 'empprobPatime', '')
          t.$refs[t.valueMap.empprobSeptime][0].$delete(t.$refs[t.valueMap.empprobSeptime][0].formshow, 'empprobSeptime')
        }
      }
    }
  },

  empprobIspass2_dis(t) {
    if (t.valueMap.empprobIspass2) {
      if (t.$refs[t.valueMap.empprobIspass2][0].formDataSubmit.empprobIspass2 === '01agree') {
        t.$refs[t.valueMap.empprobIfchgsa2][0].$set(t.$refs[t.valueMap.empprobIfchgsa2][0].formshow, 'empprobIfchgsa2', '')
        t.$refs[t.valueMap.empprobMgtbehavior2][0].$delete(t.$refs[t.valueMap.empprobMgtbehavior2][0].formshow, 'empprobMgtbehavior2')
        t.$refs[t.valueMap.empprobSeptime2][0].$delete(t.$refs[t.valueMap.empprobSeptime2][0].formshow, 'empprobSeptime2')
        t.$refs[t.valueMap.empprobPatime2][0].$delete(t.$refs[t.valueMap.empprobPatime2][0].formshow, 'empprobPatime2')
      } else {
        t.$refs[t.valueMap.empprobIfchgsa2][0].$delete(t.$refs[t.valueMap.empprobIfchgsa2][0].formshow, 'empprobIfchgsa2')
        t.$refs[t.valueMap.empprobPostlevel2][0].$delete(t.$refs[t.valueMap.empprobPostlevel2][0].formshow, 'empprobPostlevel2')
        t.$refs[t.valueMap.empprobSalarylevel2][0].$delete(t.$refs[t.valueMap.empprobSalarylevel2][0].formshow, 'empprobSalarylevel2')
        t.$refs[t.valueMap.empprobTravellevel2][0].$delete(t.$refs[t.valueMap.empprobTravellevel2][0].formshow, 'empprobTravellevel2')
        t.$refs[t.valueMap.empprobAdminlevel2][0].$delete(t.$refs[t.valueMap.empprobAdminlevel2][0].formshow, 'empprobAdminlevel2')
        t.$refs[t.valueMap.empprobSalbase][0].$delete(t.$refs[t.valueMap.empprobSalbase][0].formshow, 'empprobSalbase')
        t.$refs[t.valueMap.empprobSalaward][0].$delete(t.$refs[t.valueMap.empprobSalaward][0].formshow, 'empprobSalaward')
        t.$refs[t.valueMap.empprobMgtbehavior2][0].$set(t.$refs[t.valueMap.empprobMgtbehavior2][0].formshow, 'empprobMgtbehavior2', '')
        t.$refs[t.valueMap.empprobSeptime2][0].$set(t.$refs[t.valueMap.empprobSeptime2][0].formshow, 'empprobSeptime2', '')
        t.$refs[t.valueMap.empprobPatime2][0].$set(t.$refs[t.valueMap.empprobPatime2][0].formshow, 'empprobPatime2', '')
      }
    }
  },
  empprobIfchgsa2_dis(t){
    if (t.valueMap.empprobIfchgsa2) {
      if (t.$refs[t.valueMap.empprobIspass2][0].formDataSubmit.empprobIspass2 === '01agree'){
        if (t.$refs[t.valueMap.empprobIfchgsa2][0].formDataSubmit.empprobIfchgsa2 === '1') {
          t.$refs[t.valueMap.empprobPostlevel2][0].$set(t.$refs[t.valueMap.empprobPostlevel2][0].formshow, 'empprobPostlevel2','')
          t.$refs[t.valueMap.empprobSalarylevel2][0].$set(t.$refs[t.valueMap.empprobSalarylevel2][0].formshow, 'empprobSalarylevel2','')
          t.$refs[t.valueMap.empprobTravellevel2][0].$set(t.$refs[t.valueMap.empprobTravellevel2][0].formshow, 'empprobTravellevel2','')
          t.$refs[t.valueMap.empprobAdminlevel2][0].$set(t.$refs[t.valueMap.empprobAdminlevel2][0].formshow, 'empprobAdminlevel2','')
          t.$refs[t.valueMap.empprobSalbase][0].$set(t.$refs[t.valueMap.empprobSalbase][0].formshow, 'empprobSalbase','')
          t.$refs[t.valueMap.empprobSalaward][0].$set(t.$refs[t.valueMap.empprobSalaward][0].formshow, 'empprobSalaward','')
        }else {
          t.$refs[t.valueMap.empprobPostlevel2][0].$delete(t.$refs[t.valueMap.empprobPostlevel2][0].formshow, 'empprobPostlevel2')
          t.$refs[t.valueMap.empprobSalarylevel2][0].$delete(t.$refs[t.valueMap.empprobSalarylevel2][0].formshow, 'empprobSalarylevel2')
          t.$refs[t.valueMap.empprobTravellevel2][0].$delete(t.$refs[t.valueMap.empprobTravellevel2][0].formshow, 'empprobTravellevel2')
          t.$refs[t.valueMap.empprobAdminlevel2][0].$delete(t.$refs[t.valueMap.empprobAdminlevel2][0].formshow, 'empprobAdminlevel2')
          t.$refs[t.valueMap.empprobSalbase][0].$delete(t.$refs[t.valueMap.empprobSalbase][0].formshow, 'empprobSalbase')
          t.$refs[t.valueMap.empprobSalaward][0].$delete(t.$refs[t.valueMap.empprobSalaward][0].formshow, 'empprobSalaward')
        }
      }
    }
  },
  empprobMgtbehavior2_dis(t) {
    if (t.valueMap.empprobMgtbehavior2) {
      if(t.$refs[t.valueMap.empprobIspass2][0].formDataSubmit.empprobIspass2 === '02disagree') {
        if (t.$refs[t.valueMap.empprobMgtbehavior2][0].formDataSubmit.empprobMgtbehavior2 === '01sep') {
//          empprobMgtbehavior
          t.$refs[t.valueMap.empprobSeptime2][0].$set(t.$refs[t.valueMap.empprobSeptime2][0].formshow, 'empprobSeptime2', '')
          t.$refs[t.valueMap.empprobPatime2][0].$delete(t.$refs[t.valueMap.empprobPatime2][0].formshow, 'empprobPatime2')
        } else {
          t.$refs[t.valueMap.empprobPatime2][0].$set(t.$refs[t.valueMap.empprobPatime2][0].formshow, 'empprobPatime2', '')
          t.$refs[t.valueMap.empprobSeptime2][0].$delete(t.$refs[t.valueMap.empprobSeptime2][0].formshow, 'empprobSeptime2')
        }
      }
    }
  },
  /*empdimWorkno(node) {
    const t = this.$parent
    // if (this.$parent.valueMap.empdimWorkno && this.$parent.$refs[this.$parent.valueMap.empdimWorkno][0].formDataSubmit.empdimWorkno !== '') {
      getDataLevelUserLogin({
        _mt:  this.$global.mt+'EmpPayrollSalaryBase.getByEmpWorkno',
        empWorkno: this.$parent.$refs[this.$parent.valueMap.empdimWorkno][0].formDataSubmit.empdimWorkno,
      }).then((res) => {
        if (isSuccess(res, this.$parent)) {
          t.$refs[t.valueMap.empdimPostlevel][0].$set(t.$refs[t.valueMap.empdimPostlevel][0].formDataSubmit, 'empdimPostlevel', res.data.content[0].empsalbsPostlevel)
          t.$refs[t.valueMap.empdimSalarylevel][0].$set(t.$refs[t.valueMap.empdimSalarylevel][0].formDataSubmit, 'empdimSalarylevel', res.data.content[0].empsalbsSalarylevel)
          t.$refs[t.valueMap.empdimTravellevel][0].$set(t.$refs[t.valueMap.empdimTravellevel][0].formDataSubmit, 'empdimTravellevel', res.data.content[0].empsalbsTravellevel)
          t.$refs[t.valueMap.empdimAdminlevel][0].$set(t.$refs[t.valueMap.empdimAdminlevel][0].formDataSubmit, 'empdimAdminlevel', res.data.content[0].empsalbsAdminlevel)
        }
      }).catch(() => {
        this.$Modal.error({
          title: '错误',
          content: '网络错误',
        })
      })
    // }
  },*/
  /*empdimIsdimcompens_dis(t) {
    if (t.valueMap.empdimIsdimcompens) {
      if (t.$refs[t.valueMap.empdimIsdimcompens][0].formDataSubmit.empdimIsdimcompens === '0') {
        if (t.valueMap.empdimDimamt) {
          t.$refs[t.valueMap.empdimDimamt][0].$delete(t.$refs[t.valueMap.empdimDimamt][0].formshow, 'empdimDimamt')
        }
        if (t.valueMap.empdimDimamttax) {
          t.$refs[t.valueMap.empdimDimamttax][0].$delete(t.$refs[t.valueMap.empdimDimamttax][0].formshow, 'empdimDimamttax')
        }
        if (t.valueMap.empdimDimamtmonth) {
          t.$refs[t.valueMap.empdimDimamtmonth][0].$delete(t.$refs[t.valueMap.empdimDimamtmonth][0].formshow, 'empdimDimamtmonth')
        }
      } else {
        if (t.valueMap.empdimAllegaldays) {
          t.$refs[t.valueMap.empdimDimamt][0].$set(t.$refs[t.valueMap.empdimDimamt][0].formshow, 'empdimDimamt', '')
        }
        if (t.valueMap.empdimDimamttax) {
          t.$refs[t.valueMap.empdimDimamttax][0].$set(t.$refs[t.valueMap.empdimDimamttax][0].formshow, 'empdimDimamttax', '')
        }
        if (t.valueMap.empdimDimamtmonth) {
          t.$refs[t.valueMap.empdimDimamtmonth][0].$set(t.$refs[t.valueMap.empdimDimamtmonth][0].formshow, 'empdimDimamtmonth', '')
        }
      }
    }
  },
  empdimIsdimcompens_set(t) {
    if (t.valueMap.empdimIsdimcompens && t.$refs[t.valueMap.empdimIsdimcompens][0].formDataSubmit.empdimIsdimcompens === '0') {
      if (t.valueMap.empdimDimamt) {
        t.$refs[t.valueMap.empdimDimamt][0].$set(t.$refs[t.valueMap.empdimDimamt][0].formDataSubmit, 'empdimDimamt', '')
        // t.$refs[t.valueMap.empdimAllegaldays][0].$refs.empdimAllegaldays.thisValue = ''
      }
      if (t.valueMap.empdimDimamttax) {
        t.$refs[t.valueMap.empdimDimamttax][0].$set(t.$refs[t.valueMap.empdimDimamttax][0].formDataSubmit, 'empdimDimamttax', '')
      }
      if (t.valueMap.empdimDimamtmonth) {
        t.$refs[t.valueMap.empdimDimamtmonth][0].$set(t.$refs[t.valueMap.empdimDimamtmonth][0].formDataSubmit, 'empdimDimamtmonth', '')
      }
    }
  },
  empdimIsalcompens_dis(t) {
    if (t.valueMap.empdimIsalcompens) {
      if (t.$refs[t.valueMap.empdimIsalcompens][0].formDataSubmit.empdimIsalcompens === '0') {
        if (t.valueMap.empdimAllegaldays) {
          t.$refs[t.valueMap.empdimAllegaldays][0].$delete(t.$refs[t.valueMap.empdimAllegaldays][0].formshow, 'empdimAllegaldays')
        }
        if (t.valueMap.empdimAllegalamt) {
          t.$refs[t.valueMap.empdimAllegalamt][0].$delete(t.$refs[t.valueMap.empdimAllegalamt][0].formshow, 'empdimAllegalamt')
        }
        if (t.valueMap.empdimAlcompdays) {
          t.$refs[t.valueMap.empdimAlcompdays][0].$delete(t.$refs[t.valueMap.empdimAlcompdays][0].formshow, 'empdimAlcompdays')
        }
        if (t.valueMap.empdimAlcompamt) {
          t.$refs[t.valueMap.empdimAlcompamt][0].$delete(t.$refs[t.valueMap.empdimAlcompamt][0].formshow, 'empdimAlcompamt')
        }
        if (t.valueMap.empdimAlmonth) {
          t.$refs[t.valueMap.empdimAlmonth][0].$delete(t.$refs[t.valueMap.empdimAlmonth][0].formshow, 'empdimAlmonth')
        }
      } else {
        if (t.valueMap.empdimAllegaldays) {
          t.$refs[t.valueMap.empdimAllegaldays][0].$set(t.$refs[t.valueMap.empdimAllegaldays][0].formshow, 'empdimAllegaldays', '')
        }
        if (t.valueMap.empdimAllegalamt) {
          t.$refs[t.valueMap.empdimAllegalamt][0].$set(t.$refs[t.valueMap.empdimAllegalamt][0].formshow, 'empdimAllegalamt', '')
        }
        if (t.valueMap.empdimAlcompdays) {
          t.$refs[t.valueMap.empdimAlcompdays][0].$set(t.$refs[t.valueMap.empdimAlcompdays][0].formshow, 'empdimAlcompdays', '')
        }
        if (t.valueMap.empdimAlcompamt) {
          t.$refs[t.valueMap.empdimAlcompamt][0].$set(t.$refs[t.valueMap.empdimAlcompamt][0].formshow, 'empdimAlcompamt', '')
        }
        if (t.valueMap.empdimAlmonth) {
          t.$refs[t.valueMap.empdimAlmonth][0].$set(t.$refs[t.valueMap.empdimAlmonth][0].formshow, 'empdimAlmonth', '')
        }
      }
    }
  },
  empdimIsalcompens_set(t) {
    if (t.valueMap.empdimIsalcompens && t.$refs[t.valueMap.empdimIsalcompens][0].formDataSubmit.empdimIsalcompens === '0') {
      if (t.valueMap.empdimAllegaldays) {
        t.$refs[t.valueMap.empdimAllegaldays][0].$set(t.$refs[t.valueMap.empdimAllegaldays][0].formDataSubmit, 'empdimAllegaldays', '')
        // t.$refs[t.valueMap.empdimAllegaldays][0].$refs.empdimAllegaldays.thisValue = ''
      }
      if (t.valueMap.empdimAllegalamt) {
        t.$refs[t.valueMap.empdimAllegalamt][0].$set(t.$refs[t.valueMap.empdimAllegalamt][0].formDataSubmit, 'empdimAllegalamt', '')
      }
      if (t.valueMap.empdimAlcompdays) {
        t.$refs[t.valueMap.empdimAlcompdays][0].$set(t.$refs[t.valueMap.empdimAlcompdays][0].formDataSubmit, 'empdimAlcompdays', '')
      }
      if (t.valueMap.empdimAlcompamt) {
        t.$refs[t.valueMap.empdimAlcompamt][0].$set(t.$refs[t.valueMap.empdimAlcompamt][0].formDataSubmit, 'empdimAlcompamt', '')
      }
      if (t.valueMap.empdimAlmonth) {
        t.$refs[t.valueMap.empdimAlmonth][0].$set(t.$refs[t.valueMap.empdimAlmonth][0].formDataSubmit, 'empdimAlmonth', '')
      }
    }
  },*/
}

export default emp_flow_probation
