
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
let unitId = '';
let deptId = '';
const EmpFlowTermination = {
    all_dis () {
        //EmpFlowTermination.setDefaultValue(this)
        EmpFlowTermination.getDistanceMonth(this)
        // EmpFlowTermination.eterCompre(this)
        EmpFlowTermination.setUserData(this)
        EmpFlowTermination.initLetterShow(this)
    },
    /**
* @description: 自助离职申请初始化赋值
* @param {*}
* @return {*}
*/
    setUserData (t) {
        let empId = t.$store.state.user.empId;
        let roleType = localStorage.getItem('roleType')
        if (empId && empId !== '' && roleType === '6essmss') {
            t.$refs[t.valueMap.eterTemtype][0].dis.eterTemtype = false
            t.$refs[t.valueMap.empId][0].dis.empId = false
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpInfo.getById',
                APid: empId,
                APffk: `gep${t.funId}`,
            }).then(res => {
                if (isSuccess(res, t)) {
                    let data = res.data.content[0];
                    let obj = {
                        'empId': data.id,
                        'empIdDis': data.empName,
                        'empPhotoDis': data.empHead,
                        'eterPlatform': data.empPanel,
                        'eterPlatformDis': data.empPanelDis,
                        'eterUnitid': data.empUnitid,
                        'eterUnitidDis': data.empUnitidDis,
                        'deptId': data.empDeptid,
                        'deptIdDis': data.empDeptidDis,
                        'eterPostid': data.empPostid,
                        'eterPostidDis': data.empPostidDis,
                        'eterStaff': data.empEmpmode,
                        'eterStaffDis': data.empEmpmodeDis,
                        'eterIsgps': data.empIsgps,
                        'eterIsgpsDis': data.empIsgpsDis,
                        'empPositionDis': data.empDutyIdDis,
                        'empRankDis': data.empRankinfoIdDis,
                        'empJobCateDis': data.empBusridDis,
                        'empFunctionDis': data.empBumdidDis,
                        'eterEndate': data.empEndate,
                        'eterSdate': data.empSdate,
                        'eterEdate': data.empEdate,
                        'eterDailyspa': data.empWkcity,
                        'eterDailyspaDis': data.empWkcityDis,
                        'eterWorkdate': data.empFworkdate,
                        'eterPeomail': data.empPersmail,
                        'eterHrbpper': data.empHrbp,
                        'eterHrbpperDis': data.empHrbpDis,
                        'eterEmpnoDis': data.empEmpno,
                        'eterPeomail': data.empPersmail,
                        'eterSeryear': data.empWorkday,
                        'eterDailyspaDis': data.empWkcityDis,
                        'eterDailyspa': data.empWkcity,
                        'empCpubt': data.empCpubt,
                        'empHzdjr': data.empHzdjr,
                        'empHzdjrDis': data.empHzdjrDis,
                    }
                    initSetValue(t, obj)
                }
            })
        }
    },
    empId (node) {
        const t = this;
        let roleType = localStorage.getItem('roleType')
        if (t.formDataSubmit[node.ruleText] !== '' && roleType !== '6essmss') {
            //如是内部异动则带出原合同信息且可修改
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpInfo.getById',
                APid: t.formDataSubmit[node.ruleText],
                APffk: `gep${t.$parent.funId}`,
            }).then(res => {
                if (isSuccess(res, t)) {
                    // console.log(res,"resEMP")
                    if (res.data.content[0]) {
                        let data = res.data.content[0];
                        unitId = data.empUnitid;//公司id
                        deptId = data.empDeptid;//部门id
                        t.formData.columns.forEach(item => {
                            if (item.clmName === 'eterWorktra') {
                                item.clmfilter = `empDeptid=$${deptId}`;
                            }
                            if (item.clmName === 'eterSucjob') {
                                item.clmfilter = `empUnitid=$${unitId}`;
                            }
                        })
                    }
                }
            })
        }
        setTimeout(() => {
            let roleType = localStorage.roleType;
            if (roleType === "6essmss") {
                t.$Modal.warning({
                    title: t.$t('reminder.remind'),
                    content: "请在离职日期前确保您的报销审批已完成",
                })
            }
        }, 100);
    },
    //最后工作日期
    eterWorkldate (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            let modelDate = t.$refs.eterWorkldate.thisValue
            let modelDates = new Date(modelDate)
            let date = new Date()
            if (modelDates <= date) {
                t.$Modal.warning({
                    title: '提示',
                    content: '最后工作日期时间不能早于当前时间',
                })
                setValue(t, { 'eterWorkldate': '' })
            }

        }
    },
    //入职日期
    eterEndate (node) {
        let nowDate = new Date()
        let senDate = new Date(node.thisValue);
        let workDates = (nowDate.getTime() - senDate.getTime()) / (24 * 60 * 60 * 1000 * 365)
        let workDate = (Math.ceil(workDates * 10) / 10).toString() + '年'
        if (workDate) {
            setValue(this, { 'eterSeryear': workDate })
        }
    },
    eterIssuanceDis (t) {
        if (t.$parent.valueMap.eterTemagr) {
            let valueMap = t.$parent.valueMap.eterTemagr;
            let dom = t.$parent.$refs[valueMap][0];
            if (t.formDataSubmit['eterIssuance'] === '0') {
                t.$nextTick(() => {
                    dom.$refs.eterTemagr.$children[0].$children[0].isRequired = false
                    t.$set(dom.ruler.eterTemagr[0], 'required', false)
                    dom.$refs.eterTemagr.$children[0].$children[0].resetField()
                })
            }
        }
    },
    //离职类型
    eterTemtype (node) {
        const t = this
        let arr = ['eterLzamount', 'eterIssuance', 'eterLzamonth', 'eterTemagr']
        console.log(node, "node");
        if (t.$parent.valueMap.eterReletter) {
            let valueMap = t.$parent.valueMap.eterReletter;
            let dom = t.$parent.$refs[valueMap][0];
            if (dom.$refs.eterReletter.$children.length > 0) {
                if (node.value === '02involuntary') {
                    dom.$refs.eterReletter.$children[0].$children[0].isRequired = false
                    t.$set(dom.ruler.eterReletter[0], 'required', false)
                } else {
                    dom.$refs.eterReletter.$children[0].$children[0].isRequired = true
                    t.$set(dom.ruler.eterReletter[0], 'required', true)
                }
                dom.$refs.eterReletter.$children[0].$children[0].resetField()
            }
        }
        if (this.formDataSubmit[node.ruleText] == '01voluntary') {
            displayEvent(t, 0, arr);
            displayEvent(t, 1, ['eterReletter']);
        } else {
            displayEvent(t, 1, arr);
            displayEvent(t, 0, ['eterReletter'])
            EmpFlowTermination.eterIssuanceDis(t)
        }
    },
    initLetterShow(t){
        let eterIssuance = ''; //是否发放离职赔偿金
        let eterTemtype = ""; //离职类型
        let eterReletter = ""; //辞职信
        
        let valueMap = t.valueMap.eterReletter
        let dom = t.$refs[valueMap][0]
        if(t.valueMap.eterIssuance){
            eterIssuance = t.$refs[t.valueMap.eterIssuance][0].formDataSubmit.eterIssuance
        }
        if(t.valueMap.eterTemtype){
            eterTemtype = t.$refs[t.valueMap.eterTemtype][0].formDataSubmit.eterTemtype
        }
        if(eterTemtype === '02involuntary'){
            initDisplayEvent(t,1,['eterIssuance','eterTemagr'])
        }else{
            initDisplayEvent(t,0,['eterIssuance','eterTemagr'])
        }
        if(eterTemtype === "01voluntary"){
            initDisplayEvent(t,1,['eterReletter'])
            
        }else{
            initDisplayEvent(t,0,['eterReletter'])
        }
        if (dom.$refs.eterReletter.$children.length > 0) {
            if (eterTemtype === '01voluntary') {
                dom.$refs.eterReletter.$children[0].$children[0].isRequired = true
                t.$set(dom.ruler.eterReletter[0], 'required', true)
            }
            // } else {
            //     dom.$refs.eterReletter.$children[0].$children[0].isRequired = true
            //     t.$set(dom.ruler.eterReletter[0], 'required', true)
            // }
            dom.$refs.eterReletter.$children[0].$children[0].resetField()
        }
    },
    eterSeryear (node) {
        const t = this;
        // let eterSeryear = t.formDataSubmit[node.ruleText];
        // if (eterSeryear && eterSeryear !== '') {
        //     if (eterSeryear.indexOf('月') === -1 && eterSeryear.indexOf('年') === -1) {
        //         let eftuYears = eterSeryear.split('.')[0]
        //         let eftuMoth = Math.ceil(('0' + '.' + eterSeryear.split('.')[1]) * 12);
        //         let nweDay = "";
        //         if (eftuYears == 0) {
        //             if (eftuMoth == 0) {
        //                 nweDay = '0'
        //                 return
        //             }
        //             nweDay = eftuMoth + '个月'
        //         } else if (eftuMoth == 0) {
        //             nweDay = eftuYears + '年'
        //         } else {
        //             nweDay = eftuYears + '年' + eftuMoth + '个月'
        //         }
        //         let obj = {
        //             'eterSeryear': nweDay,
        //         }
        //         setValue(t, obj)
        //     }
        // }
    },
    getDistanceMonth (t) {
        let startTime = t.dataBlocks[0].formlist.form.eterEndate
        // 最后工作日期
        let lastWork = t.dataBlocks[1].formlist.form.eterWorkldate
        // let endTime = t.$store.state.flowClmkMap.popForm["eterWorkldate"];
        let valueMap = t.valueMap.eterWorkldate;
        let endTime = t.$refs[valueMap][0].formDataSubmit['eterWorkldate']
        if (!endTime || endTime === '') {
            endTime = new Date()
        } else {
            endTime = new Date(endTime)
        }
        // let endTime = t.$store.state.flowClmkMap.popForm["eterWorkldate"];
        startTime = new Date(startTime)

        var dateToMonth = 1
        var startDate = startTime.getDate() + startTime.getHours() / 24 + startTime.getMinutes() / 24 / 60;
        var endDate = endTime.getDate() + endTime.getHours() / 24 + endTime.getMinutes() / 24 / 60;
        if (endDate >= startDate) {
            dateToMonth = 1
        } else {
            dateToMonth = 0
        }
        let yearToMonth = (endTime.getYear() - startTime.getYear()) * 12
        let monthToMonth = endTime.getMonth() - startTime.getMonth()
        let totalMOnth = yearToMonth + monthToMonth + dateToMonth
        let eterCompre = t.dataBlocks[0].formlist.form.empCpubt
        if (eterCompre == '' || eterCompre == 0 || eterCompre == undefined) {
            eterCompre = 0
        } else {
            eterCompre = eterCompre.split('-')[0]
        }
        let rtnMoney = 0.00
        if (totalMOnth / 36 >= 1) {
            rtnMoney = 0.00
        } else {
            rtnMoney = eterCompre - (eterCompre / 36 * totalMOnth)
        }
        // 根据最后工作日期带出社保公积金商保缴纳月份
        let stopGe = ""
        // eter_shstop   eter_inssup
        if (lastWork && lastWork !== "") {
            let stopY = lastWork.split('-')[0]
            let stopM = lastWork.split('-')[1]
            stopGe = stopY + '-' + stopM;
        }
        // 
        initSetValue(t, { "eterShstop": stopGe })
        initSetValue(t, { "eterInssup": stopGe })

        initSetValue(t, { "eterCompre": (rtnMoney.toFixed(2)).toString() })
        initSetValue(t, { "eterTotal": (rtnMoney.toFixed(2)).toString() })
        t.$store.state.flowClmkMap.popForm["eterCompre"] = (rtnMoney.toFixed(2)).toString();
    },
    eterBoramount (node) {
        const t = this;
        let eterBoramount = t.formDataSubmit[node.ruleText];
        let eterReserve = '0'
        let eterCompre = '0'
        let eterClocost = '0'
        let eterOtherec = '0'
        let eterTotal = ''
        let obj = this.$store.state.flowClmkMap.popForm
        for (let i in obj) {
            if (i == 'eterReserve' && obj[i] != '') {
                eterReserve = obj[i]
            } else if (i == 'eterCompre' && obj[i] != '') {
                eterCompre = obj[i]
            } else if (i == 'eterClocost' && obj[i] != '') {
                eterClocost = obj[i]
            } else if (i == 'eterOtherec' && obj[i] != '') {
                eterOtherec = obj[i]
            }
        }
        if (eterBoramount.trim() == '') {
            eterBoramount = '0'
        }
        eterTotal = parseFloat(eterReserve) + parseFloat(eterBoramount) + parseFloat(eterCompre) + parseFloat(eterClocost) + parseFloat(eterOtherec)
        setValue(t, { "eterTotal": (eterTotal.toFixed(2)).toString() })
    },
    eterReserve (node) {
        const t = this;
        let eterReserve = t.formDataSubmit[node.ruleText];
        let eterBoramount = '0'
        let eterCompre = '0'
        let eterClocost = '0'
        let eterOtherec = '0'
        let eterTotal = ''
        let obj = this.$store.state.flowClmkMap.popForm
        for (let i in obj) {
            if (i == 'eterBoramount' && obj[i] != '') {
                eterBoramount = obj[i]
            } else if (i == 'eterCompre' && obj[i] != '') {
                eterCompre = obj[i]
            } else if (i == 'eterClocost' && obj[i] != '') {
                eterClocost = obj[i]
            } else if (i == 'eterOtherec' && obj[i] != '') {
                eterOtherec = obj[i]
            }
        }
        if (eterReserve.trim() == '') {
            eterReserve = '0'
        }
        eterTotal = parseFloat(eterReserve) + parseFloat(eterBoramount) + parseFloat(eterCompre) + parseFloat(eterClocost) + parseFloat(eterOtherec)
        setValue(t, { "eterTotal": (eterTotal.toFixed(2)).toString() })
    },
    eterCompre (node) {
        const t = this
        let eterCompre = t.formDataSubmit[node.ruleText]
        let eterBoramount = '0'
        let eterReserve = '0'
        let eterClocost = '0'
        let eterOtherec = '0'
        let eterTotal = ''
        let obj = this.$store.state.flowClmkMap.popForm
        for (let i in obj) {
            if (i == 'eterBoramount' && obj[i] != '') {
                eterBoramount = obj[i]
            } else if (i == 'eterReserve' && obj[i] != '') {
                eterReserve = obj[i]
            } else if (i == 'eterClocost' && obj[i] != '') {
                eterClocost = obj[i]
            } else if (i == 'eterOtherec' && obj[i] != '') {
                eterOtherec = obj[i]
            }
        }
        if (eterCompre.trim() == '') {
            eterCompre = '0'
        }
        eterTotal = parseFloat(eterReserve) + parseFloat(eterBoramount) + parseFloat(eterCompre) + parseFloat(eterClocost) + parseFloat(eterOtherec)
        setValue(t, { "eterTotal": (eterTotal.toFixed(2)).toString() })
    },
    eterClocost (node) {
        const t = this;
        let eterClocost = t.formDataSubmit[node.ruleText];
        let eterBoramount = '0'
        let eterReserve = '0'
        let eterCompre = '0'
        let eterOtherec = '0'
        let eterTotal = ''
        let obj = this.$store.state.flowClmkMap.popForm
        for (let i in obj) {
            if (i == 'eterBoramount' && obj[i] != '') {
                eterBoramount = obj[i]
            } else if (i == 'eterCompre' && obj[i] != '') {
                eterCompre = obj[i]
            } else if (i == 'eterReserve' && obj[i] != '') {
                eterReserve = obj[i]
            } else if (i == 'eterOtherec' && obj[i] != '') {
                eterOtherec = obj[i]
            }
        }
        if (eterClocost.trim() == '') {
            eterClocost = '0'
        }
        eterTotal = parseFloat(eterReserve) + parseFloat(eterBoramount) + parseFloat(eterCompre) + parseFloat(eterClocost) + parseFloat(eterOtherec)
        setValue(t, { "eterTotal": (eterTotal.toFixed(2)).toString() })
    },
    eterOtherec (node) {
        const t = this;
        let eterOtherec = t.formDataSubmit[node.ruleText];
        let eterBoramount = '0'
        let eterReserve = '0'
        let eterCompre = '0'
        let eterClocost = '0'
        let eterTotal = ''
        let obj = this.$store.state.flowClmkMap.popForm
        for (let i in obj) {
            if (i == 'eterBoramount' && obj[i] != '') {
                eterBoramount = obj[i]
            } else if (i == 'eterCompre' && obj[i] != '') {
                eterCompre = obj[i]
            } else if (i == 'eterClocost' && obj[i] != '') {
                eterClocost = obj[i]
            } else if (i == 'eterReserve' && obj[i] != '') {
                eterReserve = obj[i]
            }
        }
        if (eterOtherec.trim() == '') {
            eterOtherec = '0'
        }
        eterTotal = parseFloat(eterReserve) + parseFloat(eterBoramount) + parseFloat(eterCompre) + parseFloat(eterClocost) + parseFloat(eterOtherec)
        setValue(t, { "eterTotal": (eterTotal.toFixed(2)).toString() })
    },
    setDefaultValue (t) {
        let eftuYear = t.dataBlocks[0].formlist.form.eterSdate
        // let date = (new Date()).getTime()
        // //let eftuYear = '1.9'
        // let dates = new Date(eftuYear).getTime()
        // let day = date - dates
        // let myDay = new Date(day)
        // const y = myDay.getFullYear()
        // const m = myDay.getMonth()+1<10?'0'+myDay.getMonth()+1:myDay.getMonth()+1
        //const newDay=EmpFlowTermination.setFullYear(eftuYear)
        console.log(newDay, '8888')
        // if (eftuYear !== '') {
        //     // let eftuYears = eftuYear.split('.')[0]
        //     // let eftuMoth = Math.ceil(('0' + '.' + eftuYear.split('.')[1]) * 12)
        //     let nweDay = y + '年' + m + '个月'
        //     let obj = {
        //         'eterSeryear': nweDay,
        //     }
        //     initSetValue(t, obj)
        // }
    },

    // 离职补偿金发放月份逻辑判断
    eterLzamonth (node) {
        const t = this;
        let laDate = t.formDataSubmit[node.ruleText];
        // console.log(laMonth,"月份");
        if (laDate && laDate !== "") {
            let laYear = laDate.split('-')[0]
            let laMOnth = laDate.split('-')[1]
            let Dates = new Date()
            let nowYear = Dates.getFullYear()
            let nowMonth = Dates.getMonth() + 1;
            // 判断
            if (laYear >= nowYear) {
                if (laMOnth < nowMonth) {
                    this.$Modal.warning({
                        title: this.$t('reminder.remind'),
                        content: "离职赔偿金发放月份不能小于当前年月"
                    })
                    return;
                } else {

                }
            } else {
                this.$Modal.warning({
                    title: this.$t('reminder.remind'),
                    content: "离职赔偿金发放月份不能小于当前年月"
                })
                return;
            }
        }
    },
    //是否发放离职补偿金
    eterIssuance (node) {
        const t = this;
        console.log(node, "node")
        if (t.$parent.valueMap.eterTemagr) {
            let valueMap = t.$parent.valueMap.eterTemagr;
            let dom = t.$parent.$refs[valueMap][0];
            if (t.formDataSubmit['eterIssuance'] === '0') {
                if (dom.$refs.eterTemagr.$children.length > 0) {
                    dom.$refs.eterTemagr.$children[0].$children[0].isRequired = false
                    t.$set(dom.ruler.eterTemagr[0], 'required', false)
                    dom.$refs.eterTemagr.$children[0].$children[0].resetField()
                }

            } else {
                if (dom.$refs.eterTemagr.$children.length > 0) {
                    dom.$refs.eterTemagr.$children[0].$children[0].isRequired = true
                    t.$set(dom.ruler.eterTemagr[0], 'required', true)
                    dom.$refs.eterTemagr.$children[0].$children[0].resetField()
                }
            }

        }
    }
}
export default EmpFlowTermination
