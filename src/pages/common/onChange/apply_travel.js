import { getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'

const apply_travel = {
  all_dis() {
    apply_travel.apptrName_dis(this)
    apply_travel.apptrMamconfirm_dis(this)
  },
  apptrMamconfirm(node) {
    apply_travel.apptrMamconfirm_set(this.$parent)
    apply_travel.apptrMamconfirm_dis(this.$parent)
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

  // 出差
  apptrName(node) {
    // apply_leaveorder.apptrName_set(this.$parent)
    apply_leaveorder.apptrName_dis(this.$parent)
  },

  // 单据编号
  apptrName_dis(t) {
    // 单据编号
    if (t.valueMap.apptrName) {
      if (t.$refs[t.valueMap.apptrName][0].formDataSubmit.apptrName === '') {
        if (localStorage.getItem('flowStatus') === 'add') {
          getDataLevelUserLogin({
            _mt:  this.$global.mt+'ApplyTravel.getEmpMasterByUserId',
          }).then((res) => {
            const data = res.data.content[0]
            // console.log(data.apptrHirecompanyDis)
            // console.log(data.apptrPostlevel)
            t.$refs[t.valueMap.apptrName][0].$set(t.$refs[t.valueMap.apptrName][0].formDataSubmit, 'apptrName', data.apptrName)

            t.$refs[t.valueMap.apptrWorkno][0].$set(t.$refs[t.valueMap.apptrWorkno][0].formDataSubmit, 'apptrWorkno', data.apptrWorkno)

            t.$refs[t.valueMap.apptrOrder][0].$set(t.$refs[t.valueMap.apptrOrder][0].formDataSubmit, 'apptrOrder', data.apptrOrder)

            t.$refs[t.valueMap.apptrHirecompany][0].$set(t.$refs[t.valueMap.apptrHirecompany][0].formDataSubmit, 'apptrHirecompany', data.apptrHirecompany)
            t.$refs[t.valueMap.apptrHirecompany][0].$refs['apptrHirecompany'].thisValue = data.apptrHirecompanyDis

            t.$refs[t.valueMap.apptrDept][0].$set(t.$refs[t.valueMap.apptrDept][0].formDataSubmit, 'apptrDept', data.apptrDept)
            t.$refs[t.valueMap.apptrDept][0].$refs['apptrDept'].thisValue = data.apptrDeptDis

            t.$refs[t.valueMap.apptrPost][0].$set(t.$refs[t.valueMap.apptrPost][0].formDataSubmit, 'apptrPost', data.apptrPost)
            t.$refs[t.valueMap.apptrPost][0].$refs['apptrPost'].thisValue = data.apptrPostDis

            t.$refs[t.valueMap.apptrPostlevel][0].$set(t.$refs[t.valueMap.apptrPostlevel][0].formDataSubmit, 'apptrPostlevel', data.apptrPostlevel)

            t.$refs[t.valueMap.apptrEmpmapping][0].$set(t.$refs[t.valueMap.apptrEmpmapping][0].formDataSubmit, 'apptrEmpmapping', data.apptrEmpmapping)

            t.$refs[t.valueMap.apptrBusipmp][0].$set(t.$refs[t.valueMap.apptrBusipmp][0].formDataSubmit, 'apptrBusipmp', data.apptrBusipmp)
            t.$refs[t.valueMap.apptrBusipmp][0].$refs['apptrBusipmp'].thisValue = data.apptrBusipmpDis

            localStorage.setItem('apptrOrder', data.id)

            t.$refs[t.valueMap.apptrEmpid][0].$set(t.$refs[t.valueMap.apptrEmpid][0].formDataSubmit, 'apptrEmpid', data.apptrEmpid)

            t.$refs[t.valueMap.apptrType][0].$set(t.$refs[t.valueMap.apptrType][0].formDataSubmit, 'apptrType', data.apptrType)

            t.$refs[t.valueMap.applvHirecompany][0].$refs['applvHirecompany'].thisValue = data.applvHirecompanyDis
          })
        }
        // else if (localStorage.getItem('flowStatus') === 'upd') {
        //   getDataLevelUserLogin({
        //     _mt:  this.$global.mt+'ApplyTravel.getEmpMasterByUserId',
        //   }).then((res) => {
        //     const data = res.data.content[0]
        //     t.$refs[t.valueMap.apptrName][0].$set(t.$refs[t.valueMap.apptrName][0].formDataSubmit, 'apptrName', data.apptrName)
        //
        //     t.$refs[t.valueMap.apptrOrder][0].$set(t.$refs[t.valueMap.apptrOrder][0].formDataSubmit, 'apptrOrder', data.apptrOrder)
        //
        //     localStorage.setItem('apptrOrder', data.apptrOrder)
        //
        //     t.$refs[t.valueMap.apptrWorkno][0].$set(t.$refs[t.valueMap.apptrWorkno][0].formDataSubmit, 'apptrWorkno', data.apptrWorkno)
        //
        //     t.$refs[t.valueMap.apptrEmpid][0].$set(t.$refs[t.valueMap.apptrEmpid][0].formDataSubmit, 'apptrEmpid', data.apptrEmpid)
        //
        //     t.$refs[t.valueMap.apptrHirecompany][0].$set(t.$refs[t.valueMap.apptrHirecompany][0].formDataSubmit, 'apptrHirecompany', data.apptrHirecompany)
        //
        //     t.$refs[t.valueMap.apptrDept][0].$set(t.$refs[t.valueMap.apptrDept][0].formDataSubmit, 'apptrDept', data.apptrDept)
        //
        //     t.$refs[t.valueMap.apptrPost][0].$set(t.$refs[t.valueMap.apptrPost][0].formDataSubmit, 'apptrPost', data.apptrPost)
        //
        //     t.$refs[t.valueMap.apptrHirecompany][0].$refs['apptrHirecompany'].thisValue = data.apptrHirecompanyDis
        //
        //     t.$refs[t.valueMap.apptrDept][0].$refs['apptrDept'].thisValue = data.apptrDeptDis
        //
        //     t.$refs[t.valueMap.apptrPost][0].$refs['apptrPost'].thisValue = data.apptrPostDis
        //
        //     t.$refs[t.valueMap.apptrPostlevel][0].$set(t.$refs[t.valueMap.apptrPostlevel][0].formDataSubmit, 'apptrPostlevel', data.apptrPostlevel)
        //
        //     t.$refs[t.valueMap.apptrEmpmapping][0].$set(t.$refs[t.valueMap.apptrEmpmapping][0].formDataSubmit, 'apptrEmpmapping', data.apptrEmpmapping)
        //   })
        // }
      }
    }
  },

}
export default apply_travel
