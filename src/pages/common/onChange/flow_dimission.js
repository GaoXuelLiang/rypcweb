/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_flow_dimission = {
  all_dis() {
 //   emp_flow_dimission.empdimCompany_dis(this)
 //   emp_flow_dimission.empdimIsalcompens_dis(this)
 //   emp_flow_dimission.empdimApplicant_set(this)
  //  emp_flow_dimission.empdimWardtype_dis(this)
  //  emp_flow_dimission.empdimGetcertificate_dis(this)
    emp_flow_dimission.empdimConfirm_dis(this)
    emp_flow_dimission.empdimIsdimcompens_dis(this)
 //   emp_flow_dimission.empdimHrsysupdate_dis(this)
    emp_flow_dimission.empdimDimreason_dis(this)
    emp_flow_dimission.empdimIstrainer_dis(this)
  },
  empdimIstrainer(node) {
    emp_flow_dimission.empdimIstrainer_set(this.$parent)
    emp_flow_dimission.empdimIstrainer_dis(this.$parent)
  },
  empdimDimreason(node) {
    emp_flow_dimission.empdimDimreason_set(this.$parent)
    emp_flow_dimission.empdimDimreason_dis(this.$parent)
  },
  empdimHrsysupdate(node) {
    emp_flow_dimission.empdimHrsysupdate_set(this.$parent)
    emp_flow_dimission.empdimHrsysupdate_dis(this.$parent)
  },
  empdimIsdimcompens(node) {
    emp_flow_dimission.empdimIsdimcompens_set(this.$parent)
    emp_flow_dimission.empdimIsdimcompens_dis(this.$parent)
  },
  empdimConfirm(node) {
    emp_flow_dimission.empdimConfirm_set(this.$parent)
    emp_flow_dimission.empdimConfirm_dis(this.$parent)
  },
  empdimGetcertificate(node) {
    emp_flow_dimission.empdimGetcertificate_set(this.$parent)
    emp_flow_dimission.empdimGetcertificate_dis(this.$parent)
  },
  empdimIsalcompens(node) {
    emp_flow_dimission.empdimIsalcompens_set(this.$parent)
    emp_flow_dimission.empdimIsalcompens_dis(this.$parent)
  },
  empdimWardtype(node) {
    emp_flow_dimission.empdimWardtype_set(this.$parent)
    emp_flow_dimission.empdimWardtype_dis(this.$parent)
  },
  empintIsconfirm(node) {
    emp_flow_internaltransfer.empintIsconfirm_set(this.$parent)
    emp_flow_internaltransfer.empintIsconfirm_dis(this.$parent)
  },

  empdimIstrainer_set(t) {
    // if (t.$refs[t.valueMap.empdimIstrainer][0].formDataSubmit.empdimIstrainer === '0') {
    //   if (t.valueMap.empdimTraineeounds) {
    //     t.$refs[t.valueMap.empdimTraineeounds][0].$set(t.$refs[t.valueMap.empdimTraineeounds][0].formDataSubmit, 'empdimTraineeounds', '')
    //   }
    // }
  },

  empdimIstrainer_dis(t) {
    // 是否调动确认，显示隐藏合同信息
    if (t.valueMap.empdimIstrainer) {
      console.log(t.$refs[t.valueMap.empdimIstrainer][0].formDataSubmit.empdimIstrainer)
      if (t.$refs[t.valueMap.empdimIstrainer][0].formDataSubmit.empdimIstrainer === '0') {
          t.$refs[t.valueMap.empdimTraineeounds][0].$delete(t.$refs[t.valueMap.empdimTraineeounds][0].formshow, 'empdimTraineeounds')
      } else {
          t.$refs[t.valueMap.empdimTraineeounds][0].$set(t.$refs[t.valueMap.empdimTraineeounds][0].formshow, 'empdimTraineeounds', '')
      }
    }
  },

  empdimDimreason_set(t) {
    if (t.valueMap.empdimDimreason) {
      // console.log(t.$refs[t.valueMap.empdimDimreason][0].$refs.empdimDimreason)
      if (t.$refs[t.valueMap.empdimDimreason][0].$refs.empdimDimreason.thisValue !== '其他原因') {
      t.$refs[t.valueMap.empdimDimotherreas][0].$set(t.$refs[t.valueMap.empdimDimotherreas][0].formDataSubmit, 'empdimDimotherreas', '')
     }
   }
  },

  empdimDimreason_dis(t) {
    // 是否调动确认，显示隐藏合同信息
    if (t.valueMap.empdimDimreason) {
      // console.log(t.$refs[t.valueMap.empdimDimreason][0].$refs.empdimDimreason.thisValue)
      if (t.$refs[t.valueMap.empdimDimreason][0].$refs.empdimDimreason.thisValue !== '其他原因') {
        t.$refs[t.valueMap.empdimDimotherreas][0].$delete(t.$refs[t.valueMap.empdimDimotherreas][0].formshow, 'empdimDimotherreas')
      } else {
        t.$refs[t.valueMap.empdimDimotherreas][0].$set(t.$refs[t.valueMap.empdimDimotherreas][0].formshow, 'empdimDimotherreas')
      }
    }
  },


  // empdimCompany(node) {
  //   // node是子对象，this是父级对象
  //   delete this.formshow.empdimDept
  //   delete this.formshow.empdimCname
  // },
  empdimCompany_dis(t) {
    // alert(t.$store.state.user.name)
    // alert(t.$store.state.user.userId)
    // empdimApplicant
    // t.$refs[t.valueMap.empdimDept][0].$delete(t.$refs[t.valueMap.empdimDept][0].formshow, 'empdimDept')
    // t.$refs[t.valueMap.empdimCname][0].$delete(t.$refs[t.valueMap.empdimCname][0].formshow, 'empdimCname')
  },
  empdimApplicant_set(t) {
      if (t.valueMap.empdimApplicant) {
        t.$refs[t.valueMap.empdimApplicant][0].$set(t.$refs[t.valueMap.empdimApplicant][0].formDataSubmit, 'empdimApplicant',  t.$store.state.user.userId)
        t.$refs[t.valueMap.empdimApplicant][0].$refs.empdimApplicant.thisValue = t.$store.state.user.name
      }
    if (t.valueMap.empdimApplydate) {
      t.$refs[t.valueMap.empdimApplydate][0].$set(t.$refs[t.valueMap.empdimApplydate][0].formDataSubmit, 'empdimApplydate',  new Date().format('yyyy-MM-dd'))
    }
  },
  // empdimWorkno(node) {
  //   const t = this.$parent
  //   // if (this.$parent.valueMap.empdimWorkno && this.$parent.$refs[this.$parent.valueMap.empdimWorkno][0].formDataSubmit.empdimWorkno !== '') {
  //     getDataLevelUserLogin({
  //       _mt:  this.$global.mt+'EmpPayrollSalaryBase.getByEmpWorkno',
  //       empWorkno: this.$parent.$refs[this.$parent.valueMap.empdimWorkno][0].formDataSubmit.empdimWorkno,
  //     }).then((res) => {
  //       if (isSuccess(res, this.$parent)) {
  //         t.$refs[t.valueMap.empdimPostlevel][0].$set(t.$refs[t.valueMap.empdimPostlevel][0].formDataSubmit, 'empdimPostlevel', res.data.content[0].empsalbsPostlevel)
  //         t.$refs[t.valueMap.empdimSalarylevel][0].$set(t.$refs[t.valueMap.empdimSalarylevel][0].formDataSubmit, 'empdimSalarylevel', res.data.content[0].empsalbsSalarylevel)
  //         t.$refs[t.valueMap.empdimTravellevel][0].$set(t.$refs[t.valueMap.empdimTravellevel][0].formDataSubmit, 'empdimTravellevel', res.data.content[0].empsalbsTravellevel)
  //         t.$refs[t.valueMap.empdimAdminlevel][0].$set(t.$refs[t.valueMap.empdimAdminlevel][0].formDataSubmit, 'empdimAdminlevel', res.data.content[0].empsalbsAdminlevel)
  //       }
  //     }).catch(() => {
  //       this.$Modal.error({
  //         title: '错误',
  //         content: '网络错误',
  //       })
  //     })
  //   // }
  // },
  empdimHrsysupdate_dis(t) {
    if (t.valueMap.empdimHrsysupdate) {
      if (t.$refs[t.valueMap.empdimHrsysupdate][0].formDataSubmit.empdimHrsysupdate === '0') {
        if (t.valueMap.empdimHrsysfinishdate) {
          t.$refs[t.valueMap.empdimHrsysfinishdate][0].$delete(t.$refs[t.valueMap.empdimHrsysfinishdate][0].formshow, 'empdimHrsysfinishdate')
        }
      } else {
        if (t.valueMap.empdimHrsysfinishdate) {
          t.$refs[t.valueMap.empdimHrsysfinishdate][0].$set(t.$refs[t.valueMap.empdimHrsysfinishdate][0].formshow, 'empdimHrsysfinishdate', '')
        }
      }
    }
  },
  empdimHrsysupdate_set(t) {
    if (t.valueMap.empdimHrsysupdate && t.$refs[t.valueMap.empdimHrsysupdate][0].formDataSubmit.empdimHrsysupdate === '0') {
      if (t.valueMap.empdimHrsysfinishdate) {
        t.$refs[t.valueMap.empdimHrsysfinishdate][0].$set(t.$refs[t.valueMap.empdimHrsysfinishdate][0].formDataSubmit, 'empdimHrsysfinishdate', '')
      }
    }
  },
  empdimIsdimcompens_dis(t) {
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
  },
  empdimWardtype_set(t) {
    // 奖金发放类型
    if (t.valueMap.empdimWardtype && t.$refs[t.valueMap.empdimWardtype][0].formDataSubmit.empdimWardtype === '03none') {
      if (t.valueMap.empdimWardrate) {
        t.$refs[t.valueMap.empdimWardrate][0].$set(t.$refs[t.valueMap.empdimWardrate][0].formDataSubmit, 'empdimWardrate', '')
      }
      if (t.valueMap.empdimWardamount) {
        t.$refs[t.valueMap.empdimWardamount][0].$set(t.$refs[t.valueMap.empdimWardamount][0].formDataSubmit, 'empdimWardamount', '')
      }
      if (t.valueMap.empdimWardmonth) {
        t.$refs[t.valueMap.empdimWardmonth][0].$set(t.$refs[t.valueMap.empdimWardmonth][0].formDataSubmit, 'empdimWardmonth', '')
      }
    }
  },
  empdimWardtype_dis(t) {
    // 奖金发放类型为不发放
    if (t.valueMap.empdimWardtype) {
      if (t.$refs[t.valueMap.empdimWardtype][0].formDataSubmit.empdimWardtype === '03none') {
        if (t.valueMap.empdimWardrate) {
          t.$refs[t.valueMap.empdimWardrate][0].$delete(t.$refs[t.valueMap.empdimWardrate][0].formshow, 'empdimWardrate')
        }
        if (t.valueMap.empdimWardamount) {
          t.$refs[t.valueMap.empdimWardamount][0].$delete(t.$refs[t.valueMap.empdimWardamount][0].formshow, 'empdimWardamount')
        }
        if (t.valueMap.empdimWardmonth) {
          t.$refs[t.valueMap.empdimWardmonth][0].$delete(t.$refs[t.valueMap.empdimWardmonth][0].formshow, 'empdimWardmonth')
        }
      } else {
        if (t.valueMap.empdimWardtype) {
          t.$refs[t.valueMap.empdimWardtype][0].$set(t.$refs[t.valueMap.empdimWardtype][0].formshow, 'empdimWardtype', '')
        }
        if (t.valueMap.empdimWardamount) {
          t.$refs[t.valueMap.empdimWardamount][0].$set(t.$refs[t.valueMap.empdimWardamount][0].formshow, 'empdimWardamount', '')
        }
        if (t.valueMap.empdimWardmonth) {
          t.$refs[t.valueMap.empdimWardmonth][0].$set(t.$refs[t.valueMap.empdimWardmonth][0].formshow, 'empdimWardmonth', '')
        }
      }
    }
  },
  empdimGetcertificate_set(t) {
    // 是否需要离职证明
    if (t.valueMap.empdimGetcertificate && t.$refs[t.valueMap.empdimGetcertificate][0].formDataSubmit.empdimGetcertificate === '0') {
      if (t.valueMap.empdimCerpdate) {
        t.$refs[t.valueMap.empdimCerpdate][0].$set(t.$refs[t.valueMap.empdimCerpdate][0].formDataSubmit, 'empdimCerpdate', '')
      }
      if (t.valueMap.empdimCerdlvdate) {
        t.$refs[t.valueMap.empdimCerdlvdate][0].$set(t.$refs[t.valueMap.empdimCerdlvdate][0].formDataSubmit, 'empdimCerdlvdate', '')
      }
    }
  },
  empdimGetcertificate_dis(t) {
    // 是否需要离职证明
    if (t.valueMap.empdimGetcertificate) {
      if (t.$refs[t.valueMap.empdimGetcertificate][0].formDataSubmit.empdimGetcertificate === '0') {
        if (t.valueMap.empdimCerpdate) {
          t.$refs[t.valueMap.empdimCerpdate][0].$delete(t.$refs[t.valueMap.empdimCerpdate][0].formshow, 'empdimCerpdate')
        }
        if (t.valueMap.empdimCerdlvdate) {
          t.$refs[t.valueMap.empdimCerdlvdate][0].$delete(t.$refs[t.valueMap.empdimCerdlvdate][0].formshow, 'empdimCerdlvdate')
        }
      } else {
        if (t.valueMap.empdimCerpdate) {
          t.$refs[t.valueMap.empdimCerpdate][0].$set(t.$refs[t.valueMap.empdimCerpdate][0].formshow, 'empdimCerpdate', '')
        }
        if (t.valueMap.empdimCerdlvdate) {
          t.$refs[t.valueMap.empdimCerdlvdate][0].$set(t.$refs[t.valueMap.empdimCerdlvdate][0].formshow, 'empdimCerdlvdate', '')
        }
      }
    }
  },
  empdimConfirm_set(t) {
    // 离职手续确认
    if (t.valueMap.empdimConfirm && t.$refs[t.valueMap.empdimConfirm][0].formDataSubmit.empdimConfirm === '1') {
      if (t.valueMap.empdimNotcfmreason) {
        t.$refs[t.valueMap.empdimNotcfmreason][0].$set(t.$refs[t.valueMap.empdimNotcfmreason][0].formDataSubmit, 'empdimNotcfmreason', '')
      }
    }
  },
  empdimConfirm_dis(t) {
    // 离职手续确认
    if (t.valueMap.empdimConfirm) {
      if(t.$refs[t.valueMap.empdimConfirm][0].formDataSubmit.empdimConfirm === ''){
        t.$refs[t.valueMap.empdimConfirm][0].$set(t.$refs[t.valueMap.empdimConfirm][0].formDataSubmit, 'empdimConfirm', '0')
      }else if (t.$refs[t.valueMap.empdimConfirm][0].formDataSubmit.empdimConfirm === '1') {
        if (t.valueMap.empdimNotcfmreason) {
          t.$refs[t.valueMap.empdimNotcfmreason][0].$delete(t.$refs[t.valueMap.empdimNotcfmreason][0].formshow, 'empdimNotcfmreason')
        }
      } else {
        if (t.valueMap.empdimNotcfmreason) {
          t.$refs[t.valueMap.empdimNotcfmreason][0].$set(t.$refs[t.valueMap.empdimNotcfmreason][0].formshow, 'empdimNotcfmreason', '')
        }
      }
    }
  },
}

export default emp_flow_dimission
