/**
 * Created by Aaron on 2018/4/19.
 */
const emp_flow_internaltransfer = {
  all_dis() {
    emp_flow_internaltransfer.empintIsexpensecard_dis(this)
    emp_flow_internaltransfer.empintIstrainer_dis(this)
    emp_flow_internaltransfer.empintIsmanager_dis(this)
    emp_flow_internaltransfer.empintIschgsalary_dis(this)
    emp_flow_internaltransfer.empintIsconfirm_dis(this)
    emp_flow_internaltransfer.empintIsagreetransfer_dis(this)
  },
  empintIsexpensecard(node) {
    emp_flow_internaltransfer.empintIsexpensecard_dis(this.$parent)
    // emp_flow_internaltransfer.empintIsexpensecard_set(this.$parent)
  },
  empintContracttype(node) {
    emp_flow_internaltransfer.empintContractsdate_set(this.$parent)
  },
  empintContractperiod(node) {
    emp_flow_internaltransfer.empintContractsdate_set(this.$parent)
  },
  empintIstrainer(node) {
    emp_flow_internaltransfer.empintIstrainer_dis(this.$parent)
  },
  empintTransfertype(node) {
    emp_flow_internaltransfer.empintTransfertype_set(this.$parent)
  },
  empintIsagreetransfer(node) {
    emp_flow_internaltransfer.empintIsagreetransfer_set(this.$parent)
    emp_flow_internaltransfer.empintIsagreetransfer_dis(this.$parent)
  },
  empintIsmanager(node) {
    emp_flow_internaltransfer.empintIsmanager_set(this.$parent)
    emp_flow_internaltransfer.empintIsmanager_dis(this.$parent)
  },
  empintIschgsalary(node) {
    emp_flow_internaltransfer.empintIschgsalary_set(this.$parent)
    emp_flow_internaltransfer.empintIschgsalary_dis(this.$parent)
  },
  empintIsconfirm(node) {
    emp_flow_internaltransfer.empintIsconfirm_set(this.$parent)
    emp_flow_internaltransfer.empintIsconfirm_dis(this.$parent)
  },
  // 报销是否令卡发放
  empintIsexpensecard_dis(t) {
    if (t.valueMap.empintIsexpensecard) {
      if (t.$refs[t.valueMap.empintIsexpensecard][0].formDataSubmit.empintIsexpensecard === '0' || !t.$refs[t.valueMap.empintIsexpensecard][0].formDataSubmit.empintIsexpensecard) {
        if (t.valueMap.empintExpensebank) {
          t.$refs[t.valueMap.empintExpensebank][0].$delete(t.$refs[t.valueMap.empintExpensebank][0].formshow, 'empintExpensebank')
        }
        if (t.valueMap.empintExpenseaccount) {
          t.$refs[t.valueMap.empintExpenseaccount][0].$delete(t.$refs[t.valueMap.empintExpenseaccount][0].formshow, 'empintExpenseaccount')
        }
        if (t.valueMap.empintExpenseaccname) {
          t.$refs[t.valueMap.empintExpenseaccname][0].$delete(t.$refs[t.valueMap.empintExpenseaccname][0].formshow, 'empintExpenseaccname')
        }
        if (t.valueMap.empintSalexpensebank) {
          t.$refs[t.valueMap.empintSalexpensebank][0].$delete(t.$refs[t.valueMap.empintSalexpensebank][0].formshow, 'empintSalexpensebank')
        }
      } else {
        if (t.valueMap.empintExpensebank) {
          t.$refs[t.valueMap.empintExpensebank][0].$set(t.$refs[t.valueMap.empintExpensebank][0].formshow, 'empintExpensebank', '')
        }
        if (t.valueMap.empintExpenseaccount) {
          t.$refs[t.valueMap.empintExpenseaccount][0].$set(t.$refs[t.valueMap.empintExpenseaccount][0].formshow, 'empintExpenseaccount', '')
        }
        if (t.valueMap.empintExpenseaccname) {
          t.$refs[t.valueMap.empintExpenseaccname][0].$set(t.$refs[t.valueMap.empintExpenseaccname][0].formshow, 'empintExpenseaccname', '')
        }
        if (t.valueMap.empintSalexpensebank) {
          t.$refs[t.valueMap.empintSalexpensebank][0].$set(t.$refs[t.valueMap.empintSalexpensebank][0].formshow, 'empintSalexpensebank', '')
        }
      }
    }
  },
  empintIsexpensecard_set(t) {
    if (t.valueMap.empintIsexpensecard && t.$refs[t.valueMap.empintIsexpensecard][0].formDataSubmit.empintIsexpensecard.thisValue === '0') {
      if (t.valueMap.empintSalexpensebank) {
        t.$refs[t.valueMap.empintSalexpensebank][0].$set(t.$refs[t.valueMap.empintSalexpensebank][0].formDataSubmit, 'empintSalexpensebank','')
      }
      if (t.valueMap.empintExpensebank) {
        t.$refs[t.valueMap.empintExpensebank][0].$set(t.$refs[t.valueMap.empintExpensebank][0].formDataSubmit, 'empintExpensebank', '')
      }
      if (t.valueMap.empintExpenseaccount) {
        t.$refs[t.valueMap.empintExpenseaccount][0].$set(t.$refs[t.valueMap.empintExpenseaccount][0].formDataSubmit, 'empintExpenseaccount', '')
      }
      if (t.valueMap.empintExpenseaccname) {
        t.$refs[t.valueMap.empintExpenseaccname][0].$set(t.$refs[t.valueMap.empintExpenseaccname][0].formDataSubmit, 'empintExpenseaccname', '')
      }
    }
  },
  // 自动计算合同到期日
  // empintContracttype 合同类别  empintContractperiod 合同期限  empintContractsdate 合同开始日期 empintContractedate 合同结束日期
  empintContractsdate_set(t) {
  // console.log(t.$refs[t.valueMap.empintContracttype][0].formDataSubmit.empintContracttype)
  if (t.$refs[t.valueMap.empintContracttype][0].formDataSubmit.empintContracttype === '01fixedperiod') {

    // t.$refs[t.valueMap.empintContractperiod][0].$set(t.$refs[t.valueMap.empintContractperiod][0].dis, 'empintContractperiod', true)
    // t.$refs[t.valueMap.empintContractperiod][0].$set(t.$refs[t.valueMap.empintContractperiod][0].formDataSubmit, 'empintContractperiod', '3')
    t.$refs[t.valueMap.empintContractedate][0].$set(t.$refs[t.valueMap.empintContractedate][0].formDataSubmit, 'empintContractedate', '')
    // t.$refs[t.valueMap.empintContractedate][0].$set(t.$refs[t.valueMap.empintContractedate][0].dis, 'empintContractedate', false)


    let consdate  // 合同开始时间
    if (t.valueMap.empintContractsdate) {
      consdate = new Date(t.$refs[t.valueMap.empintContractsdate][0].formDataSubmit.empintContractsdate)
    }
    let conperiod
    if (t.valueMap.empintContractperiod) {
      conperiod = t.$refs[t.valueMap.empintContractperiod][0].formDataSubmit.empintContractperiod
    }
    if (conperiod !== '99' && conperiod !== '0') {
      let sdate = consdate.getDate()
      let monthEndDate = new Date(consdate.getFullYear(), consdate.getMonth() + 1, 0).getDate()
      if (sdate === monthEndDate) {
        let conperiodnum = Number(conperiod)
        consdate.setFullYear(consdate.getFullYear() + conperiodnum)
        consdate.setDate(consdate.getDate())
        let currentMonth = consdate.getMonth()  // 取得月份数
        let lastDay = new Date(consdate.getFullYear(), currentMonth + 2, 0)
        t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formDataSubmit, 'empconContractedate', lastDay.getFullYear() + '-' + (lastDay.getMonth()+1) + '-' + lastDay.getDate())
      } else {
        let conperiodnum = Number(conperiod)
        consdate.setFullYear(consdate.getFullYear() + conperiodnum)
        consdate.setDate(consdate.getDate() - 1)
        // console.log(consdate)
        let currentMonth = consdate.getMonth()  // 取得月份数
        let lastDay = new Date(consdate.getFullYear(), currentMonth + 1, 0)
        t.$refs[t.valueMap.empintContractedate][0].$set(t.$refs[t.valueMap.empintContractedate][0].formDataSubmit, 'empintContractedate', lastDay.getFullYear() + '-' + (lastDay.getMonth()+1) + '-' + lastDay.getDate())
      }
    } else {
      // t.$refs[t.valueMap.empintContractedate][0].$set(t.$refs[t.valueMap.empintContractedate][0].dis, 'empintContractedate', true)
      t.$refs[t.valueMap.empintContractedate][0].$set(t.$refs[t.valueMap.empintContractedate][0].formDataSubmit, 'empintContractedate', '')
    }
  } else {
    t.$refs[t.valueMap.empintContractperiod][0].$set(t.$refs[t.valueMap.empintContractperiod][0].formDataSubmit, 'empintContractperiod', '0')
    // t.$refs[t.valueMap.empintContractperiod][0].$set(t.$refs[t.valueMap.empintContractperiod][0].dis, 'empintContractperiod', false)
    // t.$refs[t.valueMap.empintContractedate][0].$set(t.$refs[t.valueMap.empintContractedate][0].dis, 'empintContractedate', false)
    // t.$refs[t.valueMap.empintContractsdate][0].$set(t.$refs[t.valueMap.empintContractsdate][0].dis, 'empintContractsdate', false)
    t.$refs[t.valueMap.empintContractedate][0].$set(t.$refs[t.valueMap.empintContractedate][0].formDataSubmit, 'empintContractedate', '9999-12-31')
  }
},
  empintIstrainer_dis(t) {
    if (t.valueMap.empintIstrainer && t.$refs[t.valueMap.empintIstrainer][0].formDataSubmit.empintIstrainer === '0') {
      if (t.valueMap.empintTraineeounds) {
        t.$refs[t.valueMap.empintTraineeounds][0].$delete(t.$refs[t.valueMap.empintTraineeounds][0].formshow, 'empintTraineeounds')
      }
    } else {
      if (t.valueMap.empintTraineeounds) {
        t.$refs[t.valueMap.empintTraineeounds][0].$set(t.$refs[t.valueMap.empintTraineeounds][0].formshow, 'empintTraineeounds', '')
      }
    }
  },
  empintTransfertype_set(t) {
    if (t.valueMap.empintTransfertype && t.$refs[t.valueMap.empintTransfertype][0].formDataSubmit.empintTransfertype === '1') {
        let comp
        let compDis
      if (t.valueMap.empintHirecompany) {
         comp = t.$refs[t.valueMap.empintHirecompany][0].formDataSubmit.empintHirecompany
         compDis = t.$refs[t.valueMap.empintHirecompany][0].$refs.empintHirecompany.thisValue
      }
      // console.log('comp=' + comp)
      // console.log('compDis=' + compDis)
      t.$refs[t.valueMap.empintNewcomp][0].$set(t.$refs[t.valueMap.empintNewcomp][0].formDataSubmit, 'empintNewcomp', comp)
      t.$refs[t.valueMap.empintNewcomp][0].$refs.empintNewcomp.thisValue = compDis
      t.$store.state.flowClmkMap.popForm.empintNewcomp = comp
    } else {
      t.$refs[t.valueMap.empintNewcomp][0].$set(t.$refs[t.valueMap.empintNewcomp][0].formDataSubmit, 'empintNewcomp', '')
      t.$refs[t.valueMap.empintNewcomp][0].$set(t.$refs[t.valueMap.empintNewcomp][0].formDataSubmit, 'empintNewdept', '')
      t.$refs[t.valueMap.empintNewcomp][0].$refs.empintNewcomp.thisValue = ''
      t.$refs[t.valueMap.empintNewcomp][0].$refs.empintNewdept.thisValue = ''
      t.$store.state.flowClmkMap.popForm.empintNewcomp = ''
    }
  },
  empintIsagreetransfer_set(t) {
    // 是否调动确认，清空合同信息
   // console.log(t.$refs[t.valueMap.empintIsagreetransfer][0].formDataSubmit.empintIsagreetransfer)
    if (t.valueMap.empintIsagreetransfer && t.$refs[t.valueMap.empintIsagreetransfer][0].formDataSubmit.empintIsagreetransfer === '1') {
      if (t.valueMap.empintNagretrafreson) {
        t.$refs[t.valueMap.empintNagretrafreson][0].$set(t.$refs[t.valueMap.empintNagretrafreson][0].formDataSubmit, 'empintNagretrafreson', '')
      }
    }
  },

  empintIsagreetransfer_dis(t) {
    // 是否调动确认，显示隐藏合同信息
    if (t.valueMap.empintIsagreetransfer) {
      if (t.$refs[t.valueMap.empintIsagreetransfer][0].formDataSubmit.empintIsagreetransfer === '1') {
        if (t.valueMap.empintNagretrafreson) {
          t.$refs[t.valueMap.empintNagretrafreson][0].$delete(t.$refs[t.valueMap.empintNagretrafreson][0].formshow, 'empintNagretrafreson')
        }
      } else {
        if (t.valueMap.empintNagretrafreson) {
          t.$refs[t.valueMap.empintNagretrafreson][0].$set(t.$refs[t.valueMap.empintNagretrafreson][0].formshow, 'empintNagretrafreson', '')
        }
      }
    }
  },

  empintIsconfirm_set(t) {
    // 是否同意调动
    if (t.valueMap.empintIsconfirm && t.$refs[t.valueMap.empintIsconfirm][0].formDataSubmit.empintIsconfirm === '1') {
      if (t.valueMap.empintNocmreason) {
        t.$refs[t.valueMap.empintNocmreason][0].$set(t.$refs[t.valueMap.empintNocmreason][0].formDataSubmit, 'empintNocmreason', '')
      }
    }
  },
  empintIsconfirm_dis(t) {
    // 是否同意调动显示隐藏
    if (t.valueMap.empintIsconfirm) {
      if (t.$refs[t.valueMap.empintIsconfirm][0].formDataSubmit.empintIsconfirm === '') {
        t.$refs[t.valueMap.empintIsconfirm][0].$set(t.$refs[t.valueMap.empintIsconfirm][0].formDataSubmit, 'empintIsconfirm', "0")
      } else if (t.$refs[t.valueMap.empintIsconfirm][0].formDataSubmit.empintIsconfirm === '1') {
        if (t.valueMap.empintNocmreason) {
          t.$refs[t.valueMap.empintNocmreason][0].$delete(t.$refs[t.valueMap.empintNocmreason][0].formshow, 'empintNocmreason')
        }
      } else {
        if (t.valueMap.empintNocmreason) {
          t.$refs[t.valueMap.empintNocmreason][0].$set(t.$refs[t.valueMap.empintNocmreason][0].formshow, 'empintNocmreason', '')
        }
      }
    }
  },
  empintIsmanager_set(t) {
    // 是否上级经理清空继任者员工号与继任者姓名
    if (t.valueMap.empintIsmanager && t.$refs[t.valueMap.empintIsmanager][0].formDataSubmit.empintIsmanager === '0') {
      if (t.valueMap.empintPmpnext) {
        t.$refs[t.valueMap.empintPmpnext][0].$set(t.$refs[t.valueMap.empintPmpnext][0].formDataSubmit, 'empintPmpnext', '')
        t.$refs[t.valueMap.empintIsmanager][0].$refs.empintPmpnext.thisValue = ''
      }
      if (t.valueMap.empintPmpnextname) {
        t.$refs[t.valueMap.empintPmpnextname][0].$set(t.$refs[t.valueMap.empintPmpnextname][0].formDataSubmit, 'empintPmpnextname', '')
      }
    }
  },

  empintIsmanager_dis(t) {
    // 是否上级经理显隐继任者员工号与继任者姓名
    if (t.valueMap.empintIsmanager) {
      if (t.$refs[t.valueMap.empintIsmanager][0].formDataSubmit.empintIsmanager === '0') {
        if (t.valueMap.empintPmpnext) {
          t.$refs[t.valueMap.empintPmpnext][0].$delete(t.$refs[t.valueMap.empintPmpnext][0].formshow, 'empintPmpnext')
        }
        if (t.valueMap.empintPmpnextname) {
          t.$refs[t.valueMap.empintPmpnextname][0].$delete(t.$refs[t.valueMap.empintPmpnextname][0].formshow, 'empintPmpnextname')
        }
      } else {
        if (t.valueMap.empintPmpnext) {
          t.$refs[t.valueMap.empintPmpnext][0].$set(t.$refs[t.valueMap.empintPmpnext][0].formshow, 'empintPmpnext', '')
        }
        if (t.valueMap.empintPmpnextname) {
          t.$refs[t.valueMap.empintPmpnextname][0].$set(t.$refs[t.valueMap.empintPmpnextname][0].formshow, 'empintPmpnextname', '')
        }
      }
    }
  },

  empintIschgsalary_set(t) {
    // 是否调整基本工资清空
    if (t.valueMap.empintIschgsalary && t.$refs[t.valueMap.empintIschgsalary][0].formDataSubmit.empintIschgsalary === '0') {
      if (t.valueMap.empintSalbase) {
        t.$refs[t.valueMap.empintSalbase][0].$set(t.$refs[t.valueMap.empintSalbase][0].formDataSubmit, 'empintSalbase', '')
      }
    }
  },

  empintIschgsalary_dis(t) {
    // 是否调整基本工资显示隐藏
    if (t.valueMap.empintIschgsalary) {
      if (t.$refs[t.valueMap.empintIschgsalary][0].formDataSubmit.empintIschgsalary === '0') {
        if (t.valueMap.empintSalbase) {
          t.$refs[t.valueMap.empintSalbase][0].$delete(t.$refs[t.valueMap.empintSalbase][0].formshow, 'empintSalbase')
        }
      } else {
        if (t.valueMap.empintSalbase) {
          t.$refs[t.valueMap.empintSalbase][0].$set(t.$refs[t.valueMap.empintSalbase][0].formshow, 'empintSalbase', '')
        }
      }
    }
  },
}

export default emp_flow_internaltransfer
// export default flow1
