import {getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../../axios/axios'
let empStatus = ''
const apply_leaveorder = {
  all_dis() {
    apply_leaveorder.applvMamconfirm_dis(this)
    apply_leaveorder.applvType_dis(this)
    apply_leaveorder.applvOrder_dis(this)
    apply_leaveorder.applvEdate_dis(this)
    apply_leaveorder.applvDuration_dis(this)
    apply_leaveorder.applvSdate_dis(this)
  },
  // 开始时间
  applvSdate(node) {
    apply_leaveorder.applvSdate_set(this.$parent)
    //   apply_leaveorder.applvEdate_dis(this.$parent)
  },
  // 结束时间
  applvEdate(node) {
    apply_leaveorder.applvEdate_set(this.$parent)
    //   apply_leaveorder.applvEdate_dis(this.$parent)
  },
  // 单号
  applvMamconfirm(node) {
    apply_leaveorder.applvMamconfirm_set(this.$parent)
    apply_leaveorder.applvMamconfirm_dis(this.$parent)
  },

  // 请假类型
  applvType(node) {
    apply_leaveorder.applvType_set(this.$parent)
    apply_leaveorder.applvType_dis(this.$parent)
  },


  // 请假类型
  applvOrder(node) {
    // apply_leaveorder.applvOrder_set(this.$parent)
    apply_leaveorder.applvOrder_dis(this.$parent)
  },

  // 休假时长
  applvDuration(node) {
    apply_leaveorder.applvDuration_set(this.$parent)
    // apply_leaveorder.applvDuration_dis(this.$parent)
  },

  // 开始时间
  applvSdate_set(t) {
    // 开始时间
    let applvSdate = t.$refs[t.valueMap.applvSdate][0].formDataSubmit.applvSdate
    // if (!t.$refs[t.valueMap.applvEdate][0].formDataSubmit.applvEdate) {
    //   t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].formDataSubmit, 'applvEdate', applvSdate)
    // }
    // 结束时间
    let applvEdate = t.$refs[t.valueMap.applvEdate][0].formDataSubmit.applvEdate


    // 判断结束时间不能小于开始时间
    // if (applvSdate && applvEdate) {
    //   let _begintime = new Date(applvSdate).getTime()
    //   let _endtime = new Date(applvEdate).getTime()
    //   if (_endtime < _begintime) {
    //     // t.$refs[t.valueMap.applvSdate][0].$set(t.$refs[t.valueMap.applvSdate][0].formDataSubmit, 'applvSdate', '')
    //     t.$Modal.warning({
    //       title: '提示',
    //       content: '结束时间不能小于开始时间，请重新选择开始时间',
    //     })
    //   }
    // }

    // 根据开始时间跟结束时间自动算出休假时长
    if (localStorage.getItem('applvEdate_ks') !== applvSdate) {
      if (applvSdate && applvEdate) {
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'ApplyLeaveorder.caclVacationDuration',
          empId: t.$refs[t.valueMap.applvEmpid][0].formDataSubmit.applvEmpid,
          vocationType: t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType,
          startTime: applvSdate,
          endTime: applvEdate,
        }).then((res) => {
          const data = res.data.content[0]
          console.log(data.value)
          if (data.value === 'failed') {
            t.$refs[t.valueMap.applvSdate][0].$set(t.$refs[t.valueMap.applvSdate][0].formDataSubmit, 'applvSdate', '')
            t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].formDataSubmit, 'applvDuration', '')
            t.$Modal.warning({
              title: '提示',
              content: '结束时间不能小于开始时间，请重新选择开始时间',
            })
          } else {
            t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].formDataSubmit, 'applvDuration', data.value)
          }
        })
      }
      localStorage.setItem('applvEdate_ks', '')
    }
    localStorage.setItem('applvEdate_ks', applvSdate)
  },

  // 结束时间长
  applvEdate_set(t) {
    // 开始时间
    let applvSdate = t.$refs[t.valueMap.applvSdate][0].formDataSubmit.applvSdate
    // 结束时间
    let applvEdate = t.$refs[t.valueMap.applvEdate][0].formDataSubmit.applvEdate

    // if (applvSdate === '') {
    //   t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].formDataSubmit, 'applvEdate', '')
    //   t.$Modal.warning({
    //     title: '提示',
    //     content: '请先选择开始时间',
    //   })
    // }
    //
    //
    // // 判断结束时间不能小于开始时间
    // if (applvSdate && applvEdate) {
    //   let _begintime = new Date(applvSdate).getTime()
    //   let _endtime = new Date(applvEdate).getTime()
    //   if (_endtime < _begintime) {
    //     t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].formDataSubmit, 'applvEdate', applvSdate)
    //     t.$Modal.warning({
    //       title: '提示',
    //       content: '结束时间不能小于开始时间，请重新选择结束时间',
    //     })
    //   }
    // }

    // 根据开始时间跟结束时间自动算出休假时长
    if (localStorage.getItem('applvEdate_js') !== applvEdate) {
      if (applvSdate && applvEdate) {
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'ApplyLeaveorder.caclVacationDuration',
          empId: t.$refs[t.valueMap.applvEmpid][0].formDataSubmit.applvEmpid,
          vocationType: t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType,
          startTime: applvSdate,
          endTime: applvEdate,
        }).then((res) => {
          const data = res.data.content[0]
          console.log(data.value)
          if (data.value === 'failed') {
            t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].formDataSubmit, 'applvEdate', '')
            t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].formDataSubmit, 'applvDuration', '')
            t.$Modal.warning({
              title: '提示',
              content: '结束时间不能小于开始时间，请重新选择结束时间',
            })
          } else {
            t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].formDataSubmit, 'applvDuration', data.value)
          }
        })
      }
      localStorage.setItem('applvEdate_js', '')
    }
    localStorage.setItem('applvEdate_js', applvEdate)
  },

  // 休假时长
  applvDuration_set(t) {
    // 休假时长
    let applvDuration = t.$refs[t.valueMap.applvDuration][0].formDataSubmit.applvDuration
    // 可休时长
    let applvAvailable = t.$refs[t.valueMap.applvAvailable][0].formDataSubmit.applvAvailable

    // console.log(111, (+applvDuration > +applvAvailable))
    if (+applvDuration > +applvAvailable && applvAvailable !== '') {
      // 当选择请假类型的时候进行休假时长的清空
      t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].formDataSubmit, 'applvDuration', '')
      t.$Modal.warning({
        title: '提示',
        content: '休假时长超过可休时长，请重新填写休假时长',
      })
    }
  },

  applvEdate_dis(t) {
    // 请假类型
    if (t.valueMap.applvType) {
      if (t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '10Industrialinjuryleave' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '03sickleave' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '02affairlevae'
      || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '04adjustleave') {
        if (t.valueMap.applvAvailable) {
          t.$refs[t.valueMap.applvAvailable][0].$delete(t.$refs[t.valueMap.applvAvailable][0].formshow, 'applvAvailable')
        }
        if (t.valueMap.applvUserd) {
          t.$refs[t.valueMap.applvUserd][0].$delete(t.$refs[t.valueMap.applvUserd][0].formshow, 'applvUserd')
        }
      } else {
        if (t.valueMap.applvAvailable) {
          t.$refs[t.valueMap.applvAvailable][0].$set(t.$refs[t.valueMap.applvAvailable][0].formshow, 'applvAvailable', '')
        }
        if (t.valueMap.applvUserd) {
          t.$refs[t.valueMap.applvUserd][0].$set(t.$refs[t.valueMap.applvUserd][0].formshow, 'applvUserd', '')
        }
      }

      if (t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '03sickleave' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '02affairlevae' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '04adjustleave') {
        t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].dis, 'applvDuration', false)
      } else {
        t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].dis, 'applvDuration', true)
      }
    }
  },

  applvType_set(t) {
    let cname
    console.log(t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType)
    if (t.valueMap.applvType) {
      cname = t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType
    }

    // 当选择请假类型的时候进行休假时长的清空
    t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].formDataSubmit, 'applvDuration', '')
    // 清空结束时间
    t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].formDataSubmit, 'applvEdate', '')

    if (t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType !== '' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '03sickleave' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '02affairlevae' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '04adjustleave') {
      if (t.valueMap.applvAvailable) {
        t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].dis, 'applvDuration', true)
        t.$refs[t.valueMap.applvAvailable][0].$set(t.$refs[t.valueMap.applvAvailable][0].formDataSubmit, 'applvAvailable', '')
      }
      if (t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '01annuallevae') { // 年假
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'ApplyAnandbrk.getVacationInfo',
          empId: t.$refs[t.valueMap.applvEmpid][0].formDataSubmit.applvEmpid,
        }).then((res) => {
          const data = res.data.content[0]
          // 判断员工如果是试用期不让请年假
          if (empStatus !== '01active') {
            t.$refs[t.valueMap.applvSdate][0].$set(t.$refs[t.valueMap.applvSdate][0].dis, 'applvSdate', false)
            t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].dis, 'applvEdate', false)
            t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvReson', false)
            t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvDuration', false)
            t.$Modal.warning({
              title: '提示',
              content: '当前在试用期,不能进行年假调休得申请',
            })
            return
          } else {
            t.$refs[t.valueMap.applvSdate][0].$set(t.$refs[t.valueMap.applvSdate][0].dis, 'applvSdate', true)
            t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].dis, 'applvEdate', true)
            t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvReson', true)
            t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvDuration', true)
          }
          if (data.appAnbrkSerplus === '0.0' || data.appAnbrkSerplus === undefined) { // 可休
            t.$refs[t.valueMap.applvAvailable][0].$set(t.$refs[t.valueMap.applvAvailable][0].formDataSubmit, 'applvAvailable', '')
            t.$refs[t.valueMap.applvUserd][0].$set(t.$refs[t.valueMap.applvUserd][0].formDataSubmit, 'applvUserd', '')
            t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].dis, 'applvDuration', false)
            t.$Modal.warning({
              title: '提示',
              content: '没有可休时长，请重新选择其他请假类型',
            })
          } else {
            t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].dis, 'applvDuration', true)
          }
          if (res.data.content[0].appAnbrkSerplus === '0.00') {
            console.log(1111)
            t.$refs[t.valueMap.applvSdate][0].$set(t.$refs[t.valueMap.applvSdate][0].dis, 'applvSdate', false)
            t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].dis, 'applvEdate', false)
            t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvReson', false)
            t.$Modal.warning({
              title: '提示',
              content: '可休时长为0，不可提交',
            })
          } else {
            t.$refs[t.valueMap.applvSdate][0].$set(t.$refs[t.valueMap.applvSdate][0].dis, 'applvSdate', true)
            t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].dis, 'applvEdate', true)
            t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvReson', true)
            // 可休时长
            t.$refs[t.valueMap.applvAvailable][0].$set(t.$refs[t.valueMap.applvAvailable][0].formDataSubmit, 'applvAvailable', data.appAnbrkSerplus)
            localStorage.setItem('appAnbrkSerplus', data.appAnbrkSerplus)
            // 已休时长
            t.$refs[t.valueMap.applvUserd][0].$set(t.$refs[t.valueMap.applvUserd][0].formDataSubmit, 'applvUserd', data.appAnbrkFinished)
          }
        })
      } else if (t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '05marriageleave'
        || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '06maternityleave' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '07paternityleave'
        || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '08homeleave' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '09funeralleave'
        || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '10Industrialinjuryleave' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '11lactation leave') {
        t.$refs[t.valueMap.applvSdate][0].$set(t.$refs[t.valueMap.applvSdate][0].dis, 'applvSdate', true)
        t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].dis, 'applvEdate', true)
        t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvReson', true)
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'ApplyOtherleveal.getVacationInfo',
          empId: t.$refs[t.valueMap.applvEmpid][0].formDataSubmit.applvEmpid,
          vacationType: cname,
        }).then((res) => {
          const data = res.data.content[0]
          console.log(data.appOthlvSerplus)
          if (data.appOthlvSerplus === '0.0' || data.appOthlvSerplus === undefined) {
            t.$refs[t.valueMap.applvAvailable][0].$set(t.$refs[t.valueMap.applvAvailable][0].formDataSubmit, 'applvAvailable', '')
            t.$refs[t.valueMap.applvUserd][0].$set(t.$refs[t.valueMap.applvUserd][0].formDataSubmit, 'applvUserd', '')
            t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].dis, 'applvDuration', false)
            t.$Modal.warning({
              title: '提示',
              content: '没有可休时长，请重新选择其他请假类型',
            })
          } else {
            t.$refs[t.valueMap.applvDuration][0].$set(t.$refs[t.valueMap.applvDuration][0].dis, 'applvDuration', true)
          }
          if (!data.appOthlvSerplus) {
            t.$refs[t.valueMap.applvAvailable][0].$set(t.$refs[t.valueMap.applvAvailable][0].formDataSubmit, 'applvAvailable', '0.0')
            t.$refs[t.valueMap.applvUserd][0].$set(t.$refs[t.valueMap.applvUserd][0].formDataSubmit, 'applvUserd', '0.0')
          } else {
            // 可休时长
            t.$refs[t.valueMap.applvAvailable][0].$set(t.$refs[t.valueMap.applvAvailable][0].formDataSubmit, 'applvAvailable', data.appOthlvSerplus)
            localStorage.setItem('appAnbrkSerplus', data.appAnbrkSerplus)
            // 已休时长
            t.$refs[t.valueMap.applvUserd][0].$set(t.$refs[t.valueMap.applvUserd][0].formDataSubmit, 'applvUserd', data.appOthlvFinished)
          }
        })
      } else {
        t.$refs[t.valueMap.applvSdate][0].$set(t.$refs[t.valueMap.applvSdate][0].dis, 'applvSdate', true)
        t.$refs[t.valueMap.applvEdate][0].$set(t.$refs[t.valueMap.applvEdate][0].dis, 'applvEdate', true)
        t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvReson', true)
        t.$refs[t.valueMap.applvReson][0].$set(t.$refs[t.valueMap.applvReson][0].dis, 'applvDuration', true)
      }
    }
  },

  applvType_dis(t) {
    // 请假类型
    if (t.valueMap.applvType) {
      if (t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '02affairlevae' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '03sickleave' || t.$refs[t.valueMap.applvType][0].formDataSubmit.applvType === '04adjustleave') {
        if (t.valueMap.applvAvailable) {
          t.$refs[t.valueMap.applvAvailable][0].$delete(t.$refs[t.valueMap.applvAvailable][0].formshow, 'applvAvailable')
        }
        if (t.valueMap.applvUserd) {
          t.$refs[t.valueMap.applvUserd][0].$delete(t.$refs[t.valueMap.applvUserd][0].formshow, 'applvUserd')
        }
      } else {
        if (t.valueMap.applvAvailable) {
          t.$refs[t.valueMap.applvAvailable][0].$set(t.$refs[t.valueMap.applvAvailable][0].formshow, 'applvAvailable', '')
        }
        if (t.valueMap.applvUserd) {
          t.$refs[t.valueMap.applvUserd][0].$set(t.$refs[t.valueMap.applvUserd][0].formshow, 'applvUserd', '')
        }
      }
    }
  },
  // 单据编号
  applvOrder_dis(t) {
    // 单据编号
    if (t.valueMap.applvOrder) {
      if (t.$refs[t.valueMap.applvOrder][0].formDataSubmit.applvOrder === '') {
        getDataLevelUserLogin({
          _mt:  this.$global.mt+'ApplyLeaveorder.getEmpMasterByUserId',
        }).then((res) => {
          const data = res.data.content[0]
          console.log(data)
          t.$refs[t.valueMap.applvName][0].$set(t.$refs[t.valueMap.applvName][0].formDataSubmit, 'applvName', data.applvName)

          t.$refs[t.valueMap.applvWorkno][0].$set(t.$refs[t.valueMap.applvWorkno][0].formDataSubmit, 'applvWorkno', data.applvWorkno)

          console.log(111111, t.$refs[t.valueMap.applvOrder][0].formDataSubmit.applvOrder)
          if (t.$refs[t.valueMap.applvOrder][0].formDataSubmit.applvOrder === '') {
            t.$refs[t.valueMap.applvOrder][0].$set(t.$refs[t.valueMap.applvOrder][0].formDataSubmit, 'applvOrder', 'xxxxxx')
          } else {
            t.$refs[t.valueMap.applvOrder][0].$set(t.$refs[t.valueMap.applvOrder][0].formDataSubmit, 'applvOrder', data.applvOrder)
          }

          // t.$refs[t.valueMap.applvOrder][0].$set(t.$refs[t.valueMap.applvOrder][0].formDataSubmit, 'applvOrder', data.applvOrder)

          t.$refs[t.valueMap.applvBusipmp][0].$set(t.$refs[t.valueMap.applvBusipmp][0].formDataSubmit, 'applvBusipmp', data.applvBusipmp)

          t.$refs[t.valueMap.applvHirecompany][0].$set(t.$refs[t.valueMap.applvHirecompany][0].formDataSubmit, 'applvHirecompany', data.applvHirecompany)

          t.$refs[t.valueMap.applvDept][0].$set(t.$refs[t.valueMap.applvDept][0].formDataSubmit, 'applvDept', data.applvDept)

          t.$refs[t.valueMap.applvBusipmp][0].$set(t.$refs[t.valueMap.applvBusipmp][0].formDataSubmit, 'applvBusipmp', data.applvBusipmp)   // ------

          t.$refs[t.valueMap.applvPost][0].$set(t.$refs[t.valueMap.applvPost][0].formDataSubmit, 'applvPost', data.applvPost)

          t.$refs[t.valueMap.applvHirecompany][0].$refs['applvHirecompany'].thisValue = data.applvHirecompanyDis

          t.$refs[t.valueMap.applvDept][0].$refs['applvDept'].thisValue = data.applvDeptDis

          t.$refs[t.valueMap.applvPost][0].$refs['applvPost'].thisValue = data.applvPostDis

          t.$refs[t.valueMap.applvPost][0].$refs['applvBusipmp'].thisValue = data.applvBusipmpDis   // ------

          t.$refs[t.valueMap.applvPostlevel][0].$set(t.$refs[t.valueMap.applvPostlevel][0].formDataSubmit, 'applvPostlevel', data.applvPostlevel)

          t.$refs[t.valueMap.applvEmpmapping][0].$set(t.$refs[t.valueMap.applvEmpmapping][0].formDataSubmit, 'applvEmpmapping', data.applvEmpmapping)

          t.$refs[t.valueMap.applvEmpid][0].$set(t.$refs[t.valueMap.applvEmpid][0].formDataSubmit, 'applvEmpid', data.applvEmpid)
          empStatus = data.empStatus
        })
      }
    }
  },
  // 上级经理是否通过审批
  applvMamconfirm_set(t) {
    if (t.valueMap.applvMamconfirm && t.$refs[t.valueMap.applvMamconfirm][0].formDataSubmit.applvMamconfirm === '1') {
      if (t.valueMap.applvMamnonconres) {
        t.$refs[t.valueMap.applvMamnonconres][0].$set(t.$refs[t.valueMap.applvMamnonconres][0].formDataSubmit, 'applvMamnonconres', '')
      }
    }
  },
  applvMamconfirm_dis(t) {
    if (t.valueMap.applvMamconfirm) {
      if (t.$refs[t.valueMap.applvMamconfirm][0].formDataSubmit.applvMamconfirm === '1') {
        if (t.valueMap.applvMamnonconres) {
          t.$refs[t.valueMap.applvMamnonconres][0].$delete(t.$refs[t.valueMap.applvMamnonconres][0].formshow, 'applvMamnonconres')
        }
      } else {
        if (t.valueMap.applvMamnonconres) {
          t.$refs[t.valueMap.applvMamnonconres][0].$set(t.$refs[t.valueMap.applvMamnonconres][0].formshow, 'applvMamnonconres', '')
        }
      }
    }
  },
}
export default apply_leaveorder
