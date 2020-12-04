/**
 * Created by Aaron on 2018/4/19.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_bonuspenalty = {
  all_dis() {
    emp_bonuspenalty.ebpType_dis(this)
    emp_bonuspenalty.ebpRelieve_dis(this)
  },
  // 奖惩类型
  ebpType(node) {
    emp_bonuspenalty.ebpType_set(this.$parent)
    emp_bonuspenalty.ebpType_dis(this.$parent)
  },
  // 是否解除
  ebpRelieve(node) {
    emp_bonuspenalty.ebpRelieve_set(this.$parent)
    emp_bonuspenalty.ebpRelieve_dis(this.$parent)
  },
  // 奖惩类型
  ebpType_set(t) {
    console.log(t.valueMap)
    if (t.valueMap.ebpType) {
      if (t.$refs.commonSingleForm.formDataSubmit.ebpType === '01reward') { // 奖惩类型为奖励
        if (t.valueMap.ebpBreaktype) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpBreaktype', '')
        }
        if (t.valueMap.ebpPunishtype) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpPunishtype', '')
        }
        if (t.valueMap.ebpPunishdate) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpPunishdate', '')
        }
        if (t.valueMap.ebpBreaklink) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpBreaklink', '')
        }
      } else { // 奖惩类型为惩处
        if (t.valueMap.ebpAwardtype) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpAwardtype', '')
        }
        if (t.valueMap.ebpAwardway) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpAwardway', '')
        }
        if (t.valueMap.ebpAwarddate) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpAwarddate', '')
        }
        if (t.valueMap.ebpAwardlink) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpAwardlink', '')
        }
      }
    }
  },
  ebpType_dis(t) {
    if (t.valueMap.ebpType) {
      if (t.$refs.commonSingleForm.formDataSubmit.ebpType === '01reward') {
        // 奖励类型为奖惩类型删除惩罚相关的内容
        if (t.valueMap.ebpBreaktype) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpBreaktype')
        }
        if (t.valueMap.ebpPunishtype) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpPunishtype')
        }
        if (t.valueMap.ebpPunishdate) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpPunishdate')
        }
        if (t.valueMap.ebpBreaklink) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpBreaklink')
        }
        // 展示奖励相关的信息
        if (t.valueMap.ebpAwardtype) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpAwardtype', '')
        }
        if (t.valueMap.ebpAwardway) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpAwardway', '')
        }
        if (t.valueMap.ebpAwarddate) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpAwarddate', '')
        }
        if (t.valueMap.ebpAwardlink) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpAwardlink', '')
        }
      } else {
        // 删除奖励相关的信息
        if (t.valueMap.ebpAwardtype) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpAwardtype')
        }
        if (t.valueMap.ebpAwardway) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpAwardway')
        }
        if (t.valueMap.ebpAwarddate) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpAwarddate')
        }
        if (t.valueMap.ebpAwardlink) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpAwardlink')
        }
        // 展示惩罚相关的信息
        if (t.valueMap.ebpBreaktype) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpBreaktype', '')
        }
        if (t.valueMap.ebpPunishtype) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpPunishtype', '')
        }
        if (t.valueMap.ebpPunishdate) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpPunishdate', '')
        }
        if (t.valueMap.ebpBreaklink) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpBreaklink', '')
        }
      }
    }
  },
  // 是否解除数据
  ebpRelieve_set(t) {
    if (t.valueMap.ebpRelieve && t.$refs.commonSingleForm.formDataSubmit.ebpRelieve === '0') {
      if (t.valueMap.ebpRelievereason) {
        t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpRelievereason', '')
      }
      if (t.valueMap.ebpRelievedate) {
        t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpRelievedate', '')
      }
      if (t.valueMap.ebpRelievelink) {
        t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formDataSubmit, 'ebpRelievelink', '')
      }
    }
  },
  ebpRelieve_dis(t) {
    if (t.valueMap.ebpRelieve) {
      if (t.$refs.commonSingleForm.formDataSubmit.ebpRelieve === '0') {
        if (t.valueMap.ebpRelievereason) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpRelievereason')
        }
        if (t.valueMap.ebpRelievedate) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpRelievedate')
        }
        if (t.valueMap.ebpRelievelink) {
          t.$refs.commonSingleForm.$delete(t.$refs.commonSingleForm.formshow, 'ebpRelievelink')
        }
      } else {
        if (t.valueMap.ebpRelievereason) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpRelievereason', '')
        }
        if (t.valueMap.ebpRelievedate) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpRelievedate', '')
        }
        if (t.valueMap.ebpRelievelink) {
          t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.formshow, 'ebpRelievelink', '')
        }
      }
    }
  },
}

export default emp_bonuspenalty
