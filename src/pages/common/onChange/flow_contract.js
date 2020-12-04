/**
 * Created by jack on 2018/5/5.
 */
const emp_flow_contract = {
  all_dis() {
    emp_flow_contract.empconIsextension_dis(this)
    emp_flow_contract.empconIstrainer_dis(this)
  //  emp_flow_contract.empconHrsysupdate_dis(this)
    emp_flow_contract.empconIsextendofbusines_dis(this)
    emp_flow_contract.empconIsextendofself_dis(this)

  },
  empconContracttype(node) {
    emp_flow_contract.empconContractsdate_set(this.$parent)
  },
  empconContractperiod(node) {
    emp_flow_contract.empconContractsdate_set(this.$parent)
  },
  empconContractsdate() {
    emp_flow_contract.empconContractsdate_set(this.$parent)
  },
  empconIsextension(node) {
    emp_flow_contract.empconIsextension_set(this.$parent)
    emp_flow_contract.empconIsextension_dis(this.$parent)
  },
  empconIsextendofbusines(node) {
    emp_flow_contract.empconIsextendofbusines_set(this.$parent)
    emp_flow_contract.empconIsextendofbusines_dis(this.$parent)
  },
  empconHrsysupdate(node) {
    emp_flow_contract.empconHrsysupdate_set(this.$parent)
    emp_flow_contract.empconHrsysupdate_dis(this.$parent)
  },
  empconDocagain(node) {
    emp_flow_contract.empconDocagain_set(this.$parent)
    emp_flow_contract.empconDocagain_dis(this.$parent)
  },
  empconDocconfirm(node) {
    emp_flow_contract.empconDocconfirm_set(this.$parent)
    emp_flow_contract.empconDocconfirm_dis(this.$parent)
  },
  empconIsextendofself(node) {
    emp_flow_contract.empconIsextendofself_set(this.$parent)
    emp_flow_contract.empconIsextendofself_dis(this.$parent)
  },
  empconIstrainer(node) {
    emp_flow_contract.empconIstrainer_set(this.$parent)
    emp_flow_contract.empconIstrainer_dis(this.$parent)
  },

  empconIsextension_set(t) {
    // 是否续签合同，清空合同信息
    if (t.valueMap.empconIsextension && t.$refs[t.valueMap.empconIsextension][0].formDataSubmit.empconIsextension === '0') {
      if (t.valueMap.empconContracttype) {
        t.$refs[t.valueMap.empconContracttype][0].$set(t.$refs[t.valueMap.empconContracttype][0].formDataSubmit, 'empconContracttype', '')
      }
      if (t.valueMap.empconContractperiod) {
        t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].formDataSubmit, 'empconContractperiod', '')
      }
      if (t.valueMap.empconContractsdate) {
        t.$refs[t.valueMap.empconContractsdate][0].$set(t.$refs[t.valueMap.empconContractsdate][0].formDataSubmit, 'empconContractsdate', '')
      }
      if (t.valueMap.empconContractedate) {
        t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formDataSubmit, 'empconContractedate', '')
      }
      if (t.valueMap.empconMaincomp) {
        t.$refs[t.valueMap.empconMaincomp][0].$set(t.$refs[t.valueMap.empconMaincomp][0].formDataSubmit, 'empconMaincomp', '')
        t.$refs[t.valueMap.empconMaincomp][0].$refs.empconMaincomp.thisValue = ''
      }
      if (t.valueMap.empconConfidential) {
        t.$refs[t.valueMap.empconConfidential][0].$set(t.$refs[t.valueMap.empconConfidential][0].formDataSubmit, 'empconConfidential', '')
      }
      if (t.valueMap.empconContractworktime) {
        t.$refs[t.valueMap.empconContractworktime][0].$set(t.$refs[t.valueMap.empconContractworktime][0].formDataSubmit, 'empconContractworktime', '')
      }
    } else {
      if (t.valueMap.empconNorereason) {
        t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formDataSubmit, 'empconNorereason', '')
      }
      if (t.valueMap.empconRejectaction) {
        t.$refs[t.valueMap.empconRejectaction][0].$set(t.$refs[t.valueMap.empconRejectaction][0].formDataSubmit, 'empconRejectaction', '01Relieve')
      }
    }
  },

  empconIsextension_dis(t) {
    // 是否续签合同，显示隐藏合同信息
    if (t.valueMap.empconIsextension) {
      if (t.$refs[t.valueMap.empconIsextension][0].formDataSubmit.empconIsextension === '0') {
        if (t.valueMap.empconContracttype) {
          t.$refs[t.valueMap.empconContracttype][0].$delete(t.$refs[t.valueMap.empconContracttype][0].formshow, 'empconContracttype')
        }
        if (t.valueMap.empconContractperiod) {
          t.$refs[t.valueMap.empconContractperiod][0].$delete(t.$refs[t.valueMap.empconContractperiod][0].formshow, 'empconContractperiod')
        }
        if (t.valueMap.empconContractsdate) {
          t.$refs[t.valueMap.empconContractsdate][0].$delete(t.$refs[t.valueMap.empconContractsdate][0].formshow, 'empconContractsdate')
        }
        if (t.valueMap.empconContractedate) {
          t.$refs[t.valueMap.empconContractedate][0].$delete(t.$refs[t.valueMap.empconContractedate][0].formshow, 'empconContractedate')
        }
        if (t.valueMap.empconMaincomp) {
          t.$refs[t.valueMap.empconMaincomp][0].$delete(t.$refs[t.valueMap.empconMaincomp][0].formshow, 'empconMaincomp')
        }
        if (t.valueMap.empconConfidential) {
          t.$refs[t.valueMap.empconConfidential][0].$delete(t.$refs[t.valueMap.empconConfidential][0].formshow, 'empconConfidential')
        }
        if (t.valueMap.empconContractworktime) {
          t.$refs[t.valueMap.empconContractworktime][0].$delete(t.$refs[t.valueMap.empconContractworktime][0].formshow, 'empconContractworktime')
        }
        if (t.valueMap.empconContracttimes) {
          t.$refs[t.valueMap.empconContracttimes][0].$delete(t.$refs[t.valueMap.empconContracttimes][0].formshow, 'empconContracttimes')
        }
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason', '')
        }
        if (t.valueMap.empconRejectaction) {
          t.$refs[t.valueMap.empconRejectaction][0].$set(t.$refs[t.valueMap.empconRejectaction][0].formshow, 'empconRejectaction', '')
        }
      } else {
        if (t.valueMap.empconContracttype) {
          t.$refs[t.valueMap.empconContracttype][0].$set(t.$refs[t.valueMap.empconContracttype][0].formshow, 'empconContracttype', '')
        }
        if (t.valueMap.empconContractperiod) {
          t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].formshow, 'empconContractperiod', '')
        }
        if (t.valueMap.empconContractsdate) {
          t.$refs[t.valueMap.empconContractsdate][0].$set(t.$refs[t.valueMap.empconContractsdate][0].formshow, 'empconContractsdate', '')
        }
        if (t.valueMap.empconContractedate) {
          t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formshow, 'empconContractedate', '')
        }
        if (t.valueMap.empconMaincomp) {
          t.$refs[t.valueMap.empconMaincomp][0].$set(t.$refs[t.valueMap.empconMaincomp][0].formshow, 'empconMaincomp', '')
        }
        if (t.valueMap.empconConfidential) {
          t.$refs[t.valueMap.empconConfidential][0].$set(t.$refs[t.valueMap.empconConfidential][0].formshow, 'empconConfidential', '')
        }
        if (t.valueMap.empconContractworktime) {
          t.$refs[t.valueMap.empconContractworktime][0].$set(t.$refs[t.valueMap.empconContractworktime][0].formshow, 'empconContractworktime', '')
        }
        if (t.valueMap.empconContracttimes) {
          t.$refs[t.valueMap.empconContracttimes][0].$set(t.$refs[t.valueMap.empconContracttimes][0].formshow, 'empconContracttimes', '')
        }
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$delete(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason')
        }
        if (t.valueMap.empconRejectaction) {
          t.$refs[t.valueMap.empconRejectaction][0].$delete(t.$refs[t.valueMap.empconRejectaction][0].formshow, 'empconRejectaction')
        }
      }
    }
  },
  empconDocagain_set(t) {
    // 续签第五步是否重新签署文件
    if (t.valueMap.empconDocagain && t.$refs[t.valueMap.empconDocagain][0].formDataSubmit.empconDocagain === '0' && t.valueMap.empconDocconfirm && t.$refs[t.valueMap.empconDocconfirm][0].formDataSubmit.empconDocconfirm === '0') {
    } else {
      if (t.valueMap.empconNorereason) {
        t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formDataSubmit, 'empconNorereason', '')
      }
      if (t.valueMap.empconRejectaction) {
        t.$refs[t.valueMap.empconRejectaction][0].$set(t.$refs[t.valueMap.empconRejectaction][0].formDataSubmit, 'empconRejectaction', '')
      }
    }
  },

  empconDocagain_dis(t) {
    // 续签第五步是否重新签署文件 显示隐藏 不签署原因、后续管理动作
    if (t.valueMap.empconDocagain && t.valueMap.empconDocconfirm) {
      if (t.$refs[t.valueMap.empconDocagain][0].formDataSubmit.empconDocagain === '0' && t.$refs[t.valueMap.empconDocconfirm][0].formDataSubmit.empconDocconfirm === '0') {
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason', '')
        }
        if (t.valueMap.empconRejectaction) {
          t.$refs[t.valueMap.empconRejectaction][0].$set(t.$refs[t.valueMap.empconRejectaction][0].formshow, 'empconRejectaction', '')
        }
      } else {
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$delete(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason')
        }
        if (t.valueMap.empconRejectaction) {
          t.$refs[t.valueMap.empconRejectaction][0].$delete(t.$refs[t.valueMap.empconRejectaction][0].formshow, 'empconRejectaction')
        }
      }
    }
  },
  empconDocconfirm_set(t) {
    // 续签第五步是否重新签署文件
    if (t.valueMap.empconDocagain && t.$refs[t.valueMap.empconDocagain][0].formDataSubmit.empconDocagain === '0' && t.valueMap.empconDocconfirm && t.$refs[t.valueMap.empconDocconfirm][0].formDataSubmit.empconDocconfirm === '0') {
    } else {
      if (t.valueMap.empconNorereason) {
        t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formDataSubmit, 'empconNorereason', '')
      }
      if (t.valueMap.empconRejectaction) {
        t.$refs[t.valueMap.empconRejectaction][0].$set(t.$refs[t.valueMap.empconRejectaction][0].formDataSubmit, 'empconRejectaction', '')
      }
    }
  },

  empconDocconfirm_dis(t) {
    // 续签第五步是否重新签署文件 显示隐藏 不签署原因、后续管理动作
    if (t.valueMap.empconDocagain && t.valueMap.empconDocconfirm) {
      if (t.$refs[t.valueMap.empconDocagain][0].formDataSubmit.empconDocagain === '0' && t.$refs[t.valueMap.empconDocconfirm][0].formDataSubmit.empconDocconfirm === '0') {
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason', '')
        }
        if (t.valueMap.empconRejectaction) {
          t.$refs[t.valueMap.empconRejectaction][0].$set(t.$refs[t.valueMap.empconRejectaction][0].formshow, 'empconRejectaction', '01Relieve')
        }
      } else {
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$delete(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason')
        }
        if (t.valueMap.empconRejectaction) {
          t.$refs[t.valueMap.empconRejectaction][0].$delete(t.$refs[t.valueMap.empconRejectaction][0].formshow, 'empconRejectaction')
        }
      }
    }
  },
  //
  // empconIsextendofself_set(t) {
  //   // 是否续签合同，清空合同信息
  //   if (t.valueMap.empconIsextendofself && t.$refs[t.valueMap.empconIsextendofself][0].formDataSubmit.empconIsextendofself === '0') {
  //     if (t.valueMap.empconSelfeval) {
  //       t.$refs[t.valueMap.empconSelfeval][0].$set(t.$refs[t.valueMap.empconSelfeval][0].formDataSubmit, 'empconSelfeval', '')
  //     }
  //     // 第一步 是否同意续签
  //     if (t.valueMap.empconContracttype) {
  //       t.$refs[t.valueMap.empconContracttype][0].$set(t.$refs[t.valueMap.empconContracttype][0].formDataSubmit, 'empconContracttype', '')
  //     }
  //     if (t.valueMap.empconContractperiod) {
  //       t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].formDataSubmit, 'empconContractperiod', '')
  //     }
  //     if (t.valueMap.empconContractsdate) {
  //       t.$refs[t.valueMap.empconContractsdate][0].$set(t.$refs[t.valueMap.empconContractsdate][0].formDataSubmit, 'empconContractsdate', '')
  //     }
  //     if (t.valueMap.empconContractedate) {
  //       t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formDataSubmit, 'empconContractedate', '')
  //     }
  //     if (t.valueMap.empconMaincomp) {
  //       t.$refs[t.valueMap.empconMaincomp][0].$set(t.$refs[t.valueMap.empconMaincomp][0].formDataSubmit, 'empconMaincomp', '')
  //     }
  //     if (t.valueMap.empconContracttimes) {
  //       t.$refs[t.valueMap.empconContracttimes][0].$set(t.$refs[t.valueMap.empconContracttimes][0].formDataSubmit, 'empconContracttimes', '')
  //     }
  //     if (t.valueMap.empconConfidential) {
  //       t.$refs[t.valueMap.empconConfidential][0].$set(t.$refs[t.valueMap.empconConfidential][0].formDataSubmit, 'empconConfidential', '')
  //     }
  //     if (t.valueMap.empconContractworktime) {
  //       t.$refs[t.valueMap.empconContractworktime][0].$set(t.$refs[t.valueMap.empconContractworktime][0].formDataSubmit, 'empconContractworktime', '')
  //     }
  //   } else {
  //     if (t.valueMap.empconDisreason) {
  //       t.$refs[t.valueMap.empconDisreason][0].$set(t.$refs[t.valueMap.empconDisreason][0].formDataSubmit, 'empconDisreason', '')
  //     }
  //   }
  // },

  // empconIsextendofself_dis(t) {
  //   // 是否续签合同，显示隐藏合同信息
  //   if (t.valueMap.empconIsextendofself) {
  //     if (t.$refs[t.valueMap.empconIsextendofself][0].formDataSubmit.empconIsextendofself === '0') {
  //       if (t.valueMap.empconDisreason) {
  //         t.$refs[t.valueMap.empconDisreason][0].$set(t.$refs[t.valueMap.empconDisreason][0].formshow, 'empconDisreason', '')
  //       }
  //       if (t.valueMap.empconSelfeval) {
  //         t.$refs[t.valueMap.empconSelfeval][0].$delete(t.$refs[t.valueMap.empconSelfeval][0].formshow, 'empconSelfeval')
  //       }
  //       // 第一步 是否同意续签
  //       if (t.valueMap.empconContracttype) {
  //         t.$refs[t.valueMap.empconContracttype][0].$delete(t.$refs[t.valueMap.empconContracttype][0].formshow, 'empconContracttype')
  //       }
  //       if (t.valueMap.empconContractperiod) {
  //         t.$refs[t.valueMap.empconContractperiod][0].$delete(t.$refs[t.valueMap.empconContractperiod][0].formshow, 'empconContractperiod')
  //       }
  //       if (t.valueMap.empconContractsdate) {
  //         t.$refs[t.valueMap.empconContractsdate][0].$delete(t.$refs[t.valueMap.empconContractsdate][0].formshow, 'empconContractsdate')
  //       }
  //       if (t.valueMap.empconContractedate) {
  //         t.$refs[t.valueMap.empconContractedate][0].$delete(t.$refs[t.valueMap.empconContractedate][0].formshow, 'empconContractedate')
  //       }
  //       if (t.valueMap.empconMaincomp) {
  //         t.$refs[t.valueMap.empconMaincomp][0].$delete(t.$refs[t.valueMap.empconMaincomp][0].formshow, 'empconMaincomp')
  //       }
  //       if (t.valueMap.empconContracttimes) {
  //         t.$refs[t.valueMap.empconContracttimes][0].$delete(t.$refs[t.valueMap.empconContracttimes][0].formshow, 'empconContracttimes')
  //       }
  //       if (t.valueMap.empconConfidential) {
  //         t.$refs[t.valueMap.empconConfidential][0].$delete(t.$refs[t.valueMap.empconConfidential][0].formshow, 'empconConfidential')
  //       }
  //       if (t.valueMap.empconContractworktime) {
  //         t.$refs[t.valueMap.empconContractworktime][0].$delete(t.$refs[t.valueMap.empconContractworktime][0].formshow, 'empconContractworktime')
  //       }
  //     } else {
  //       if (t.valueMap.empconDisreason) {
  //         t.$refs[t.valueMap.empconDisreason][0].$delete(t.$refs[t.valueMap.empconDisreason][0].formshow, 'empconDisreason')
  //       }
  //       if (t.valueMap.empconSelfeval) {
  //         t.$refs[t.valueMap.empconSelfeval][0].$set(t.$refs[t.valueMap.empconSelfeval][0].formshow, 'empconSelfeval', '')
  //       }
  //       // 第一步 是否同意续签
  //       if (t.valueMap.empconContracttype) {
  //         t.$refs[t.valueMap.empconContracttype][0].$set(t.$refs[t.valueMap.empconContracttype][0].formshow, 'empconContracttype', '')
  //       }
  //       if (t.valueMap.empconContractperiod) {
  //         t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].formshow, 'empconContractperiod', '')
  //       }
  //       if (t.valueMap.empconContractsdate) {
  //         t.$refs[t.valueMap.empconContractsdate][0].$set(t.$refs[t.valueMap.empconContractsdate][0].formshow, 'empconContractsdate', '')
  //       }
  //       if (t.valueMap.empconContractedate) {
  //         t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formshow, 'empconContractedate', '')
  //       }
  //       if (t.valueMap.empconMaincomp) {
  //         t.$refs[t.valueMap.empconMaincomp][0].$set(t.$refs[t.valueMap.empconMaincomp][0].formshow, 'empconMaincomp', '')
  //       }
  //       if (t.valueMap.empconContracttimes) {
  //         t.$refs[t.valueMap.empconContracttimes][0].$set(t.$refs[t.valueMap.empconContracttimes][0].formshow, 'empconContracttimes', '')
  //       }
  //       if (t.valueMap.empconConfidential) {
  //         t.$refs[t.valueMap.empconConfidential][0].$set(t.$refs[t.valueMap.empconConfidential][0].formshow, 'empconConfidential', '')
  //       }
  //       if (t.valueMap.empconContractworktime) {
  //         t.$refs[t.valueMap.empconContractworktime][0].$set(t.$refs[t.valueMap.empconContractworktime][0].formshow, 'empconContractworktime', '')
  //       }
  //     }
  //   }
  // },
  empconIsextendofbusines_set(t) {
    // 上级经理觉得是否续签员工合同, 清空信息
    if (t.valueMap.empconIsextendofbusines && t.$refs[t.valueMap.empconIsextendofbusines][0].formDataSubmit.empconIsextendofbusines === '0') {
      if (t.valueMap.empconRenewsugg) {
        t.$refs[t.valueMap.empconRenewsugg][0].$set(t.$refs[t.valueMap.empconRenewsugg][0].formDataSubmit, 'empconContracttype', '')
      }
    } else {
      if (t.valueMap.empconNorereason) {
        t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formDataSubmit, 'empconNorereason', '')
      }
    }
  },
  empconIsextendofbusines_dis(t) {
    // 上级经理觉得是否续签员工合同, 显示隐藏
    if (t.valueMap.empconIsextendofbusines) {
      if (t.$refs[t.valueMap.empconIsextendofbusines][0].formDataSubmit.empconIsextendofbusines === '0') {
        if (t.valueMap.empconRenewsugg) {
          t.$refs[t.valueMap.empconRenewsugg][0].$delete(t.$refs[t.valueMap.empconRenewsugg][0].formshow, 'empconRenewsugg')
        }
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$set(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason', '')
        }
      } else {
        if (t.valueMap.empconRenewsugg) {
          t.$refs[t.valueMap.empconRenewsugg][0].$set(t.$refs[t.valueMap.empconRenewsugg][0].formshow, 'empconRenewsugg')
        }
        if (t.valueMap.empconNorereason) {
          t.$refs[t.valueMap.empconNorereason][0].$delete(t.$refs[t.valueMap.empconNorereason][0].formshow, 'empconNorereason', '')
        }
      }
    }
  },
  empconIstrainer_set(t) {
    if (t.$refs[t.valueMap.empconIstrainer][0].formDataSubmit.empconIstrainer === '0') {
      if (t.valueMap.empconTraineeounds) {
        t.$refs[t.valueMap.empconTraineeounds][0].$set(t.$refs[t.valueMap.empconTraineeounds][0].formDataSubmit, 'empconTraineeounds', '')
      }
    }
  },
  empconIstrainer_dis(t) {
    if (t.valueMap.empconIstrainer) {
      if (t.$refs[t.valueMap.empconIstrainer][0].formDataSubmit.empconIstrainer === '0') {
        if (t.valueMap.empconTraineeounds) {
          t.$refs[t.valueMap.empconTraineeounds][0].$delete(t.$refs[t.valueMap.empconTraineeounds][0].formshow, 'empconTraineeounds')
        }
      } else {
        if (t.valueMap.empconTraineeounds) {
          t.$refs[t.valueMap.empconTraineeounds][0].$set(t.$refs[t.valueMap.empconTraineeounds][0].formshow, 'empconTraineeounds', '')
        }
      }
    }
  },
  // 自动计算合同到期日
  // empnhContracttype 合同类别  empnhContractperiod 合同期限  empnhContractsdate 合同开始日期 empnhContractedate 合同结束日期

  //  类别 empconContracttype    期限 empconContractperiod   开始日期 empconContractsdate   结束日期 empconContractedate
  empconContractsdate_set(t) {
    // console.log(t.$refs[t.valueMap.empconContracttype][0].formDataSubmit.empconContracttype)
    if (t.$refs[t.valueMap.empconContracttype][0].formDataSubmit.empconContracttype === '01fixedperiod') {

      // t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].dis, 'empconContractperiod', true)
      // t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].formDataSubmit, 'empconContractperiod', '3')
      t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formDataSubmit, 'empconContractedate', '')
      // t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].dis, 'empconContractedate', false)


      let consdate  // 合同开始时间
      if (t.valueMap.empconContractsdate) {
        consdate = new Date(t.$refs[t.valueMap.empconContractsdate][0].formDataSubmit.empconContractsdate)
      }
      let conperiod
      if (t.valueMap.empconContractperiod) {
        conperiod = t.$refs[t.valueMap.empconContractperiod][0].formDataSubmit.empconContractperiod
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
          consdate.setDate(consdate.getDate())
          let currentMonth = consdate.getMonth()  // 取得月份数
          let lastDay = new Date(consdate.getFullYear(), currentMonth + 1, 0)
          t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formDataSubmit, 'empconContractedate', lastDay.getFullYear() + '-' + (lastDay.getMonth()+1) + '-' + lastDay.getDate())
        }
      } else {
        // t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].dis, 'empconContractedate', true)
        t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formDataSubmit, 'empconContractedate', '')
      }
    } else {
      t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].formDataSubmit, 'empconContractperiod', '0')
      // t.$refs[t.valueMap.empconContractperiod][0].$set(t.$refs[t.valueMap.empconContractperiod][0].dis, 'empconContractperiod', false)
      // t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].dis, 'empconContractedate', false)
      // t.$refs[t.valueMap.empconContractsdate][0].$set(t.$refs[t.valueMap.empconContractsdate][0].dis, 'empconContractsdate', false)
      t.$refs[t.valueMap.empconContractedate][0].$set(t.$refs[t.valueMap.empconContractedate][0].formDataSubmit, 'empconContractedate', '9999-12-31')
    }
  },
}
export default emp_flow_contract
