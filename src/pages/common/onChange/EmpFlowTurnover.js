
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
let panel = '';
let empmode = '';
let gsBasepro = '';//基本比例
let gsAchipro = '';//绩效比例
let postIds = '';//岗位ID
let places = '';//places
let placeDis = '';
let startMyDate = ''; //入职日期
let unitId = "";
let myCpubt = '';//电脑补贴
let empQudate = ''; //离职日期
let rank = '';  // 职等
const EmpFlowTurnover = {
    all_dis () {
        //EmpFlowTurnover.setDefaultValue(this)
        //EmpFlowTurnover.setDisplay(this)
        //EmpFlowTurnover.sumCpubt(this)
        EmpFlowTurnover.setInitDisplay(this)
        EmpFlowTurnover.publicShowHide(this, 'init')
        EmpFlowTurnover.initSetDis(this)
        EmpFlowTurnover.resetBank(this)
    },
    //年度佣金  佣金点数
    initSetDis (t) {
        let eftuYmoneysum = '';
        let eftuMarpoints = '';
        if (t.valueMap.eftuYmoneysum) {
            eftuYmoneysum = t.$refs[t.valueMap.eftuYmoneysum][0].formDataSubmit.eftuYmoneysum
            eftuMarpoints = t.$refs[t.valueMap.eftuMarpoints][0].formDataSubmit.eftuMarpoints
            if (eftuYmoneysum > 0 && eftuYmoneysum !== '') {
                t.$refs[t.valueMap.eftuMarpoints][0].dis.eftuMarpoints = false
            } else {
                t.$refs[t.valueMap.eftuMarpoints][0].dis.eftuMarpoints = true
            }
            if (eftuMarpoints > 0 && eftuMarpoints !== '') {
                t.$refs[t.valueMap.eftuYmoneysum][0].dis.eftuYmoneysum = false
            } else {
                t.$refs[t.valueMap.eftuYmoneysum][0].dis.eftuYmoneysum = true
            }
        }
    },
    //营销点数
    eftuMarpoints (node) {
        const t = this
        let nodes = t.$parent.$refs
        let map = t.$parent.valueMap
        if (t.formDataSubmit[node.ruleText] !== "") {
            nodes[map.eftuYmoneysum][0].dis.eftuYmoneysum = false
        } else {
            nodes[map.eftuYmoneysum][0].dis.eftuYmoneysum = true
        }
    },
    getDistanceMonth (t) {
        //let startTime = t.dataBlocks[0].formlist.form.eftuEntrydate
        let startTime = startMyDate
        let endTime = ""
        // 最后工作日期
        if (t.valueMap) {
            if (t.valueMap.eftuChadate) {
                endTime = t.$refs[t.valueMap.eftuChadate][0].formDataSubmit.eftuChadate
            }
        }
        startTime = new Date(startTime)
        endTime = new Date(endTime)
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
        //电脑补贴
        let eterCompre = myCpubt
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
        initSetValue(t, { "eftuComreturn": ((rtnMoney.toFixed(2)).toString()) })
    },
    /**
    * @description 异动类型为内部异动带出合同信息
    * @param {*} node
    */
    empId (node) {

    },
    //银行信息赋值
    resetBank (t) {
        console.log(t, '213')
        let empId = '';
        if (t.valueMap.empId) {

            empId = t.$refs[t.valueMap.empId][0].formDataSubmit.empId
        }

        if (empId || empId !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpInfo.getById',
                APid: empId,
                APffk: `gep${t.funId}`,
            }).then(res => {
                if (isSuccess(res, t)) {
                    // console.log(res,"resEMP")
                    if (res.data.content[0]) {
                        let data = res.data.content[0];
                        startMyDate = data.empEndate
                        myCpubt = data.empCpubt
                        console.log(data, 'data')
                        if (data.empEndate) {
                            EmpFlowTurnover.getDistanceMonth(t)
                        }
                        initSetValue(t, { 'eftuBankname': data.empNameid })
                        initSetValue(t, { 'eftuBanknameDis': data.empNameidDis })
                        initSetValue(t, { 'eftuAccbank': data.empDeposit })
                        initSetValue(t, { 'eftuBanknum': data.empAccount })
                    }
                }
            })
        }
    },
    /**
     * @description:异动重新赋值
     * @param {*}
     * @return {*}
     */
    recetData (t) {
        console.log(t, '4556555')
        let empId = t.$parent.$refs[t.$parent.valueMap.empId][0].formDataSubmit.empId
        const parent = t.$parent
        //异动类型
        let eftuCharea = '';
        //异动原因
        let eftuChatype = '';
        if (empId && empId !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpInfo.getById',
                APid: empId,
                APffk: `gep${t.funId}`,
            }).then(res => {
                if (isSuccess(res, t)) {
                    // console.log(res,"resEMP")
                    if (res.data.content[0]) {
                        let data = res.data.content[0];
                        console.log(data, 'data')
                        panel = data.empPanel
                        empmode = data.empEmpmode
                        postIds = data.empPostid
                        places = data.empWkcity
                        placeDis = data.empWkcityDis
                        unitId = data.empUnitid

                        let obj = {
                            eftuIsgps: data.empIsgps,
                            eftuIsgpsDis: data.empIsgpsDis,
                            //  eftuChatype : data.empYdtype,
                            //  eftuChatypeDis : data.empYdtypeDis,
                            'eftuGstype': data.empWttype,
                            eftuChaformb: data.empPanel,
                            eftuChaformbDis: data.empPanelDis,
                            eftuUnitidb: data.empUnitid,
                            eftuUnitidbDis: data.empUnitidDis,
                            eftuLegidb: data.empLegalid,
                            eftuLegidbDis: data.empLegalidDis,
                            // eftuChadate: data.empYddate,
                            eftuDeptidb: data.empDeptid,
                            eftuDeptidbDis: data.empDeptidDis,
                            eftuPostidb: data.empPostid,
                            eftuPostidbDis: data.empPostidDis,
                            eftuChaflowb: data.empZpid,
                            eftuChaflowbDis: data.empZpidDis,
                            eftuChaemptb: data.empEmpmode,
                            eftuChaemptbDis: data.empEmpmodeDis,
                            eftuChahrbpb: data.empHrbp,
                            eftuChahrbpbDis: data.empHrbpDis,
                            eftuChapeob: data.empHzdjr,
                            eftuChapeobDis: data.empHzdjrDis,
                            eftuFhosfpay: data.empAccumla,
                            eteaRankidqDis: data.empRankinfoIdDis,
                            eteaBusridqDis: data.empBusridDis,
                            CeteaBumdidqDis: data.empBumdidDis,
                            eteaDutyidqDis: data.empDutyIdDis,
                            eftuFssecpay: data.empSocialcity,
                            eftuFssecpayDis: data.empSocialcityDis,
                            //eftuSeryear: data.empWorkyear,
                            eftuDaychawb: data.empWkcity,
                            eftuDaychawbDis: data.empWkcityDis,
                            eteaRankqDis: data.empRankinfo,
                            eteaBumdidqDis: data.empBumdidDis,
                            eftuFssecpay: data.empSocialcity,
                            eftuFhosfpay: data.empAccumla,
                            eftuFssecpayDis: data.empSocialcityDis,
                            eftuFhosfpayDis: data.empAccumlaDis,
                            eftuHtdqdays: data.empDuedate,
                            eftuHtdqdaysDis: data.empDuedateDis,
                        }
                        setValue(t, obj)
                        if (parent.valueMap) {
                            eftuCharea = parent.$refs[parent.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]
                            eftuChatype = parent.$refs[parent.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]
                            // eftuLegidb = parent.formDataSubmit["eftuLegidb"]
                            // eftuLegidbDis = parent.formDataSubmit["eftuLegidbDis"]
                            // eftuUnitidb = parent.formDataSubmit["eftuUnitidb"]
                            // eftuUnitidbDis = parent.formDataSubmit["eftuUnitidbDis"]
                            if (eftuChatype && eftuCharea) {
                                if (eftuChatype === '2001' && (eftuCharea !== 'bar005' || eftuCharea !== 'bar003')) {
                                    //t.$refs.eftuUnitida.thisId = unitId
                                    console.log(t.$store.state.flowClmkMap.popForm, '555555')
                                    let obj = {
                                        'eftuLegida': data.empLegalid,
                                        'eftuLegidaDis': data.empLegalidDis,
                                        'eftuUnitida': data.empUnitid,
                                        'eftuUnitidaDis': data.empUnitidDis,
                                        'eftuDaychawa': data.empWkcity,
                                        'eftuDaychawaDis': data.empWkcityDis,
                                    }
                                    setValue(t, obj)

                                    //debugger
                                    //赋不上值
                                    t.$store.state.flowClmkMap.popForm.eftuUnitida = data.empUnitid
                                    t.$refs.eftuUnitida.thisId = data.empUnitid
                                    console.log(t.$refs.eftuUnitida, 888888)
                                }
                            }
                        }

                    }
                }
            })
        }
    },
    /**
     * @description: 电脑补贴计算
     * @param {*}
     * @return {*}
     */
    sumCpubt (t) {
        console.log(t, '4556555')
        let empId = t.$refs[t.valueMap.empId][0].formDataSubmit.empId
        if (empId && empId !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpInfo.getById',
                APid: empId,
                APffk: `gep${t.funId}`,
            }).then(res => {
                if (isSuccess(res, t)) {
                    // console.log(res,"resEMP")
                    if (res.data.content[0]) {
                        let data = res.data.content[0];
                        let myCpubt = data.empCpubt
                        let empQudate = data.empQudate
                        //debugger
                        console.log('111')
                    }
                }
            })
        }
    },
    /**
     * @description: 薪资是否调整
     * @param {*}
     * @return {*}
     */
    // 薪资是否调整
    eftuSalaryadj (node) {
        const t = this;
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let arr2 = ['eftuIscalculate','eftuIsnotpaid']
        const parent = t.$parent
        let empId = parent.$refs[parent.valueMap.empId][0].formDataSubmit["empId"]
        let eftuSalaryadj = parent.$refs[parent.valueMap.eftuSalaryadj][0].formDataSubmit["eftuSalaryadj"]
        // let empName = t.$refs.empId.thisValue;
        // let empId = t.$refs.empId.id;
        // let isSaladj = t.$refs.econSalaryadj.thisValue;
        if (empId) {
            if (eftuSalaryadj === "1") {
                EmpFlowTurnover.panelShowHide(t)
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'EmpInfo.getById',
                    APid: empId,
                    APffk: `gep${t.funId}`
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0]) {
                            let data = res.data.content[0];
                            panel = data.empPanel
                            empmode = data.empEmpmode
                            postIds = data.empPostid
                            places = data.empWkcity
                            placeDis = data.empWkcityDis
                            let obj = {
                                'eftuWagemon': data.empMongzbz,
                                'eftuBasemon': data.empMonjbgz,
                                'eftuMonperf': data.empMonjxgz,
                                'eftuYubonus': data.empYgnzj,
                                'eftuTransccu': data.empTranstandard,
                                'eftuCommrate': data.empTxjt,
                                'eftuSetcosts': data.empAllowance,
                                'eftuOtherfei': data.empYgyxyj,
                                'eftuMarpoints': data.empYgyamount,
                                'eftuYmoneysum': data.empElse,
                                'eftuYsalsum': data.empYtotalsum,
                                'eftuIntcomp': data.empInsalarycop,
                                'eftuExtercomp': data.empOutsalarycop,
                                'eftuSalaryup': data.empSalaryinc
                            }
                            setValue(t, obj)
                        }
                    }
                }).catch(() => {
                    t.$Modal.error({
                        title: t.$t('reminder.err'),
                        content: t.$t('reminder.errormessage'),
                    })
                })
            } else {
                EmpFlowTurnover.showHide(t, arr, 1)
                displayEvent(t,0,arr2)
            }
        }
    },
    /**
     * @description:根据平台员工分类薪资是否调整字段显示隐藏
     * @param {*}
     * @return {*}
     */
    panelShowHide (t) {
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //debugger
        let arr2 = ['eftuIscalculate','eftuIsnotpaid']
        const parent = t.$parent
        let empId = parent.$refs[parent.valueMap.empId][0].formDataSubmit["empId"]
        let eftuSalaryadj = parent.$refs[parent.valueMap.eftuSalaryadj][0].formDataSubmit["eftuSalaryadj"]
        let eftuChaformb = ''; //异动前平台
        let eftuChaemptb = ''; //异动前员工分类
        let eftuChaplata = ''; //异动后平台
        let eftuChaempta = ''; //异动后员工分类
        console.log(t, '789')
        let eftuChatype = parent.$refs[parent.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]; //异动类型
        let eftuCharea = parent.$refs[parent.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]; //异动原因
        //若异动类型为公司内异动并且 异动类型为降薪或特殊调薪  平台员工分类为 异动前平台 异动前岗位分类

        if (eftuChatype == '2001' && (eftuCharea === 'bar005' || eftuCharea === 'bar003')) {
            eftuChaplata = panel//平台
            eftuChaempta = empmode//员工分类
        } else {
            eftuChaplata = parent.$refs[parent.valueMap.eftuChaplata][0].formDataSubmit["eftuChaplata"]//平台
            eftuChaempta = parent.$refs[parent.valueMap.eftuChaempta][0].formDataSubmit["eftuChaempta"];//员工分类
        }
        console.log(eftuChaplata, "eftuChaplata")

        if (eftuChaempta === 'empcategory-10trainee') {
            setValue(t, { 'eftuYsalsum': '0' })
        }
        //debugger
        if (eftuChaplata && eftuChaempta && eftuSalaryadj == '1') {
            EmpFlowTurnover.sumJtTx(t)
            displayEvent(t,1,arr2)
            if (eftuChaplata === 'bussector-04capital') {//资本平台
                switch (eftuChaempta) {
                    case 'empcategory-01manager'://管理人员
                        arr = [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                        break;
                    case 'empcategory-05market'://营销一线人员
                        arr = [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                        break;
                    case 'empcategory-10trainee'://实习生
                        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                        break;
                    case 'empcategory-15consultant'://顾问
                        arr = [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                        break;
                    case 'empcategory-25out'://外部人员
                        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        break;
                    case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                        arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                        break;
                }
            } else if (eftuChaplata === 'bussector-01market') {//项目管理平台-营销中心
                switch (eftuChaempta) {
                    case 'empcategory-01manager'://管理人员
                        arr = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                        break;
                    case 'empcategory-05market'://营销一线人员
                        arr = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                        break;
                    case 'empcategory-10trainee'://实习生
                        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                        break;
                    case 'empcategory-15consultant'://顾问
                        arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                        break;
                    case 'empcategory-25out'://外部人员
                        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        break;
                    case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                        arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                        break;
                }
            } else {
                switch (eftuChaempta) {
                    case 'empcategory-01manager'://管理人员
                        arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                        break;
                    case 'empcategory-05market'://营销一线人员
                        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        break;
                    case 'empcategory-10trainee'://实习生
                        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                        break;
                    case 'empcategory-15consultant'://顾问
                        arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                        break;
                    case 'empcategory-25out'://外部人员
                        arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        break;
                    case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                        arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                        break;
                }
            }
            EmpFlowTurnover.showHide(t, arr, 1);
        }
    },

    /**
     * @description: 异动后职等计算 交通通讯津贴
     * @param {*}
     * @return {*}
     */
    eteaRankidhDis (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            rank = node.thisValue
            console.log(rank, '4414')
            EmpFlowTurnover.sumJtTx(t)
            EmpFlowTurnover.callwai(t)
        }
    },
    /**
     * @description: 交通津贴  通讯津贴赋值
     * @param {*}
     * @return {*}
     */
    sumJtTx (t, node) {
        let eftuCpostida = '';
        let place = '';
        const parent = t.$parent
        let eftuChatype = parent.$refs[parent.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]; //异动类型
        let eftuCharea = parent.$refs[parent.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]; //异动原因
        //若异动类型为公司内异动并且 异动类型为降薪或特殊调薪  平台员工分类为 异动前平台 异动前岗位分类


        if (eftuChatype == '2001' && (eftuCharea === 'bar005' || eftuCharea === 'bar003')) {
            eftuCpostida = postIds//岗位
            place = placeDis//员工分类
        } else {
            eftuCpostida = t.$parent.$refs[t.$parent.valueMap.eftuCpostida][0].formDataSubmit.eftuCpostida;
            place = t.$refs.eftuDaychawa.thisValue;
        }
        if (eftuCpostida || eftuCpostida !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpFlowEntr.retentTransMoney',
                APentEmppoid: eftuCpostida
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let op = res.data.content[0];
                    if (op.hasOwnProperty('gsAward')) {
                        gsBasepro = res.data.content[0].gsBasepro;
                        gsAchipro = res.data.content[0].gsAchipro;
                        let gsTranssub1 = res.data.content[0].gsTranssub1;
                        let gsTranssub2 = res.data.content[0].gsTranssub2;
                        let obj = {//通讯津贴标准
                            'eftuCommrate': res.data.content[0].gsCommsub
                        }
                        setValue(t, obj)
                        if (place !== '' && place !== undefined) {
                            if (place === '北京市' || place === '上海市' || place === '广州市' || place === '深圳市') {
                                setValue(t, { 'eftuTransccu': gsTranssub1 })
                                console.log(place, gsTranssub1, '11111')
                            } else {
                                setValue(t, { 'eftuTransccu': gsTranssub2 })
                                console.log(place, gsTranssub2, '22222222')
                            }
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    /**
     * @description: 内部薪酬竞争力
     * @param {*}
     * @return {*}
     */
    callwai (t) {
        let eftuCpostida = ''
        const parent = t.$parent
        let eftuChatype = parent.$refs[parent.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]; //异动类型
        let eftuCharea = parent.$refs[parent.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]; //异动原因
        //若异动类型为公司内异动并且 异动类型为降薪或特殊调薪  平台员工分类为 异动前平台 异动前岗位分类

        if (eftuChatype == '2001' && (eftuCharea === 'bar005' || eftuCharea === 'bar003')) {
            eftuCpostida = postIds//岗位
        } else {
            eftuCpostida = t.$parent.$refs[t.$parent.valueMap.eftuCpostida][0].formDataSubmit.eftuCpostida;
        }
        let eftuWagemon = t.$parent.$refs[t.$parent.valueMap.eftuWagemon][0].formDataSubmit.eftuWagemon;
        if (!eftuCpostida || eftuCpostida === '' || !eftuWagemon || eftuWagemon === '') {
            return;
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.getAvgSal',
            APpostId: eftuCpostida,
        }).then((res) => {
            if (isSuccess(res, t)) {
                console.log(res, "res")
                if (res.data.content[0].hasOwnProperty('value')) {
                    let val = res.data.content[0].value
                    if (val == 0) {
                        val = 1
                    }
                    let vals = ((Number(eftuWagemon) / Number(val)) * 100).toFixed(2)
                    setValue(t, { 'eftuIntcomp': vals })
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * @description: 根据异动类型  合同是否禁填
     * @param {*}
     * @return {*}
     */
    eftuChatype (node) {
        const t = this
        //let arr = ['eftuContype','eftuContra','eftuConsdate','eftuConedate','eftuGstype','eftuHtdqdays']
        console.log(t, 'tttttttttttt')
        if (t.formDataSubmit[node.ruleText] !== '') {
            EmpFlowTurnover.publicShowHide(t)
            EmpFlowTurnover.recetData(t)
            // if (node.thisValue == '2001') {
            //     EmpFlowTurnover.setDisabled(t, false)
            // } else {
            //     EmpFlowTurnover.setDisabled(t, true)
            // }
            // setTimeout(()=>{

            //     EmpFlowTurnover.setAfterData(t)
            // },50)
        }
    },
    /**
     * @description: 根据异动类型合同是否禁填字段
     * @param {*}
     * @return {*}
     */
    setDisabled (t, type) {
        let node = t.$parent.$refs
        let map = t.$parent.valueMap
        node[map.eftuContype][0].dis.eftuContype = type
        node[map.eftuContra][0].dis.eftuContra = type
        node[map.eftuConsdate][0].dis.eftuConsdate = type
        node[map.eftuConedate][0].dis.eftuConedate = type
        node[map.eftuGstype][0].dis.eftuGstype = type
        node[map.eftuHtdqdays][0].dis.eftuHtdqdays = type
    },
    /**
     * @description: 跨公司异动 异动前单位、异动后单位需要卡住，不能选同一单位
     * @param {*}
     * @return {*}
     */
    eftuUnitida (node) {
        const t = this
        let eftuUnitidb = t.$parent.formDataSubmit.eftuUnitidb
        let eftuUnitidbDis = t.$parent.formDataSubmit.eftuUnitidbDis
        let eftuChatype = t.$parent.formDataSubmit.eftuChatype
        console.log(t, '789')
        if (t.formDataSubmit[node.ruleText] !== '') {
            if (eftuChatype === '2002' && (eftuUnitidb === node.thisId || eftuUnitidbDis === node.thisValue)) {
                t.$Modal.warning({
                    title: '提示',
                    content: '跨公司异动，异动单位不能相同',
                })
            }
        }
    },
    /**
     * @description: 异动原因
     * @param {*} node
     * @return {*}
     */
    eftuCharea (node) {
        const t = this
        EmpFlowTurnover.publicShowHide(t)
        EmpFlowTurnover.recetData(t)
        // setTimeout(() => {

        //     EmpFlowTurnover.setAfterData(t)
        // },50);

    },
    // //根据异动前赋值异动后
    // setAfterData(t){
    //     const parent = t.$parent
    //     //异动类型
    //     let eftuCharea = '';
    //     //异动原因
    //     let eftuChatype = '';
    //     //异动前法律实体
    //     let eftuLegidb = '';
    //     let eftuLegidbDis = '';
    //     //异动前所属单位
    //     let eftuUnitidb = ""
    //     let eftuUnitidbDis = ""
    //     //异动前日常办公地
    //     let eftuDaychawb = '';
    //     let eftuDaychawbDis = '';
    //     if(parent.valueMap){
    //         eftuCharea = parent.$refs[parent.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]
    //         eftuChatype = parent.$refs[parent.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]
    //         eftuLegidb = parent.formDataSubmit["eftuLegidb"]
    //         eftuLegidbDis = parent.formDataSubmit["eftuLegidbDis"]
    //         eftuUnitidb = parent.formDataSubmit["eftuUnitidb"]
    //         eftuUnitidbDis = parent.formDataSubmit["eftuUnitidbDis"]
    //         if (eftuChatype && eftuCharea) {


    //             if (eftuChatype === '2001' && (eftuCharea !== 'bar005' || eftuCharea !== 'bar003')) {
    //                 //t.$refs.eftuUnitida.thisId = unitId
    //                 console.log(t.$store.state.flowClmkMap.popForm,'555555')
    //                 let obj={
    //                     'eftuLegida':eftuLegidb,
    //                     'eftuLegidaDis':eftuLegidbDis,
    //                     'eftuUnitida':eftuUnitidb,
    //                     'eftuUnitidaDis':eftuUnitidbDis,
    //                     'eftuDaychawa':eftuDaychawb,
    //                     'eftuDaychawaDis':eftuDaychawbDis,
    //                 }
    //                 setValue(t,obj)

    //                 //debugger
    //                 //赋不上值
    //                 t.$store.state.flowClmkMap.popForm.eftuLegida = eftuUnitidb
    //                 t.$refs.eftuUnitida.thisId = eftuUnitidb
    //                 console.log( t.$refs.eftuUnitida,888888)
    //             }
    //         }
    //     }
    //     //公司内异动且异动原因不等于降薪和特殊调薪
    // },
    publicShowHide (t, init) {
        const parent = t.$parent
        let eftuCharea = '';
        let eftuChatype = '';
        if (t.valueMap) {
            if (t.valueMap.eftuCharea) {
                eftuCharea = t.$refs[t.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]
            }
            if (t.valueMap.eftuChatype) {
                eftuChatype = t.$refs[t.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]
            }
        } else {
            eftuCharea = parent.$refs[parent.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]
            eftuChatype = parent.$refs[parent.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]
        }
        let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        let arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        if (eftuChatype && eftuCharea && !init) {
            console.log(eftuCharea, 'eftuCharea')
            if (eftuChatype == '2001' && (eftuCharea === 'bar005' || eftuCharea === 'bar003')) {
                EmpFlowTurnover.eftuChareaShowHide(t, arr1, 1)
            } else {
                EmpFlowTurnover.eftuChareaShowHide(t, arr, 1)
            }
        }
        if (eftuChatype && eftuCharea && init) {
            if (eftuChatype == '2001' && (eftuCharea === 'bar005' || eftuCharea === 'bar003')) {
                EmpFlowTurnover.eftuChareaShowHide(t, arr1, 0)
            } else {
                EmpFlowTurnover.eftuChareaShowHide(t, arr, 0)
            }
        }
    },
    /**
     * @description: 异动原因显隐
     * @param {*} t
     * @param {*} arr
     * @return {*}
     */
    eftuChareaShowHide (t, arr, init) {
        let dom = ['eftuShmove', 'eftuChaformb', 'eftuUnitidb', 'eftuLegidb', 'eftuDeptidb', 'eftuPostidb', 'eftuChaflowb', 'eftuChaemptb', 'eftuDaychawb',
            'eftuChahrbpb', 'eftuChapeob', 'eftuChapickb', 'eftuChaplata', 'eftuUnitida', 'eftuLegida', 'eftuDeptida', 'eftuCpostida', 'eftuChaflowa',
            'eftuChaempta', 'eftuDaychawa', 'eftuChahrbpa', 'eftuChapeoa', 'eftuChapicka', 'eftuDeparta', 'eftuSsecpay', 'eftuFhosfpay', 'eteaDutyidqDis',
            'eteaRankidqDis', 'eteaBusridqDis', 'eteaBumdidqDis', 'eteaRankqDis', 'eteaDutyidhDis', 'eteaRankidhDis', 'eteaBusridhDis', 'eteaBumdidhDis',
            'eteaRankhDis', 'eftuHosfpay', 'eftuFssecpay', 'eftuChaformbDis', 'eftuUnitidbDis', 'eftuLegidbDis', 'eftuDeptidbDis', 'eftuPostidbDis', 'eftuChaflowbDis',
            'eftuChaemptbDis', 'eftuDaychawbDis', 'eftuChahrbpbDis', 'eftuChapeobDis', 'eftuFhosfpayDis', 'eftuFssecpayDis'
        ]

        for (let i = 0; i < dom.length; i++) {
            if (arr[i]) {
                if (init) {
                    displayEvent(t, 1, dom[i].split(' '));
                } else {
                    initDisplayEvent(t, 1, dom[i].split(' '))
                }
            } else {
                if (init) {
                    displayEvent(t, 0, dom[i].split(' '));
                } else {
                    initDisplayEvent(t, 0, dom[i].split(' '))
                }
            }
        }
    },
    /**
     * @description: 异动后日常办公地 异动后日常办公地 和 职等 带出 交通津贴标准
     * @param {*}
     * @return {*}
     */
    eftuDaychawa (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            EmpFlowTurnover.sumJtTx(t, node)
        }
        EmpFlowTurnover.sumOutsalarycop(t)
    },
    /**
     * @description: 入职日期
     * @param {*}
     * @return {*}
     */
    eftuEntrydate (node) {
        const t = this
        let nowDate = new Date()
        let senDate = new Date(node.thisValue);
        let workDates = (nowDate.getTime() - senDate.getTime()) / (24 * 60 * 60 * 1000 * 365)
        let workDate = (Math.ceil(workDates * 10) / 10).toString() + '年'
        if (workDate) {
            setValue(this, { 'eftuSeryear': workDate })

        }
        EmpFlowTurnover.sumOutsalarycop(t)
    },

    /**
     * @description: 月基本工资 月度工资标准 带出月度基本工资、月度绩效工资
     * @param {*}
     * @return {*}
     */
    eftuWagemon (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            let wagemon = t.formDataSubmit[node.ruleText] //月度工资标准
            let reg = /^(((\d)|([1-9]\d+))(\.\d+)?)$/
            if (reg.test(wagemon)) {
                if (gsBasepro !== '' && gsAchipro !== '') {
                    let wage = Number(wagemon)
                    let baseRate = Number(gsBasepro);
                    let perfRate = Number(gsAchipro);
                    let obj = {
                        'eftuBasemon': (wage * baseRate / 100).toFixed(2),
                        'eftuMonperf': (wage * perfRate / 100).toFixed(2)
                    }
                    setValue(t, obj)
                }
            }
            EmpFlowTurnover.callwai(t)
            EmpFlowTurnover.sumJtTx(t)
            EmpFlowTurnover.sumOutsalarycop(t)
            EmpFlowTurnover.eftuYsalsum_dis(t)
        }

    },
    /**
     * @description: 外部薪酬竞争力
     * @param {*}
     * @return {*}
     */

    sumOutsalarycop (t) {
        let eftuCpostida = ''
        let eftuEntrydate = t.$parent.$refs[t.$parent.valueMap.eftuEntrydate][0].formDataSubmit.eftuEntrydate;
        let eftuDaychawa = ''
        let eftuWagemon = t.$parent.$refs[t.$parent.valueMap.eftuWagemon][0].formDataSubmit.eftuWagemon;
        const parent = t.$parent
        let eftuChatype = parent.$refs[parent.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]; //异动类型
        let eftuCharea = parent.$refs[parent.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]; //异动原因
        //若异动类型为公司内异动并且 异动类型为降薪或特殊调薪  平台员工分类为 异动前平台 异动前岗位分类

        if (eftuChatype == '2001' && (eftuCharea === 'bar005' || eftuCharea === 'bar003')) {
            eftuCpostida = postIds//岗位
            eftuDaychawa = places
        } else {
            eftuCpostida = t.$parent.$refs[t.$parent.valueMap.eftuCpostida][0].formDataSubmit.eftuCpostida;
            eftuDaychawa = t.$parent.$refs[t.$parent.valueMap.eftuDaychawa][0].formDataSubmit.eftuDaychawa;
        }
        if (!eftuCpostida || eftuCpostida === '' || !eftuWagemon || eftuWagemon === '') {
            return;
        }
        if (!eftuCpostida || eftuCpostida === '' || !eftuEntrydate || eftuEntrydate === '' || !eftuDaychawa || eftuDaychawa === '' || !eftuWagemon || eftuWagemon === '') {
            return;
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.retentCityAndMedian',
            APentCityId: eftuDaychawa,
            APentDate: new Date(eftuEntrydate).getFullYear(),
            APentPostId: eftuCpostida
        }).then((res) => {
            if (isSuccess(res, t)) {
                let op = res.data.content[0];
                if (op.gsMedian && op.cnNoun) {
                    let gsMed = Number(res.data.content[0].gsMedian);
                    let cnNoun = Number(res.data.content[0].cnNoun);
                    let sum = Number(eftuWagemon) / (cnNoun * gsMed) * 100
                    setValue(t, { 'eftuExtercomp': parseFloat(sum).toFixed(2) })
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    // 服务年限
    eftuSeryear (node) {
        let seryear = node.thisValue;
        // if (seryear !== '' && seryear !== undefined) {
        //     if (seryear.indexOf("年") !== -1 || seryear.indexOf("月") !== -1) {
        //         return
        //     } else {
        //         let eftuYears = seryear.split('.')[0]
        //         let eftuMoth = Math.ceil(('0' + '.' + seryear.split('.')[1]) * 12)
        //         // let newDay;
        //         let obj;
        //         if (eftuYears === 0) {
        //             if (eftuMoth === 0) {
        //                 // newDay = 0;
        //                 obj = {
        //                     'eftuSeryear': nweDay,
        //                 }
        //             } else {
        //                 // newDay = eftuMoth + "月";
        //                 obj = {
        //                     'eftuSeryear': eftuMoth + "月"
        //                 }
        //             }
        //         } else {
        //             if (eftuMoth === 0) {
        //                 // nweDay = eftuYears + '年';
        //                 obj = {
        //                     'eftuSeryear': eftuYears + '年',
        //                 }
        //             } else {
        //                 // nweDay = eftuYears + '年' + eftuMoth + '月';
        //                 obj = {
        //                     'eftuSeryear': eftuYears + '年' + eftuMoth + '月',
        //                 }
        //             }
        //         }
        //         setValue(this, obj)
        //     }
        //}
    },
    /**
     * @description 营销平台，预估点数与总额，只能填写一个
     * @param {*} node
     */
    // eftuMarpoints (node) {
    //     const t = this;
    //     let valueMap = t.$parent.valueMap.eftuChaplata;
    //     let eftuChaplata = t.$parent.$refs[valueMap][0].formDataSubmit.eftuChaplata;
    //     if (t.formDataSubmit[node.ruleText] !== '') {
    //         if (eftuChaplata === '01market') {
    //             t.formDataSubmit.eftuYmoneysum = ''
    //         }
    //     }
    // },
    eftuBasemon (node) {
        const t = this;
        EmpFlowTurnover.eftuYsalsum_dis(t)
    },
    eftuTransccu (node) {
        const t = this;
        EmpFlowTurnover.eftuYsalsum_dis(t)
    },
    eftuCommrate (node) {
        const t = this;
        EmpFlowTurnover.eftuYsalsum_dis(t)
    },
    eftuAllowan (node) {
        const t = this;
        EmpFlowTurnover.eftuYsalsum_dis(t)
    },
    eftuSetcosts (node) {
        const t = this;
        EmpFlowTurnover.eftuYsalsum_dis(t)
    },
    eftuOtherfei (node) {
        const t = this
        EmpFlowTurnover.eftuYsalsum_dis(t)
    },
    eftuYubonus (node) {
        const t = this
        EmpFlowTurnover.eftuYsalsum_dis(t)
    },
    /**
     * @description 营销平台，预估点数与总额，只能填写一个
     * @param {*} node
     */
    eftuYmoneysum (node) {
        const t = this;
        let nodes = t.$parent.$refs
        let map = t.$parent.valueMap
        let valueMap = t.$parent.valueMap.eftuChaplata;
        let eftuChaplata = t.$parent.$refs[valueMap][0].formDataSubmit.eftuChaplata;
        if (t.formDataSubmit[node.ruleText] !== "") {
            nodes[map.eftuMarpoints][0].dis.eftuMarpoints = false
        } else {
            nodes[map.eftuMarpoints][0].dis.eftuMarpoints = true
        }
        EmpFlowTurnover.eftuYsalsum_dis(t)
    },
    /**
     * @description （月基本工资标准+交通津贴+通讯津贴+管理津贴）×12+安家费+预估年度佣金总额，如果员工类型为实习生，则无需计算
     * @param {*} this
     */
    eftuYsalsum_dis (t) {
        let parent = t.$parent;
        let formshow = t.formshow;
        let eftuChaplata = ''; //异动后平台
        let eftuChaempta = ''; //异动后员工分类
        console.log(t, '789')
        let eftuChatype = parent.$refs[parent.valueMap.eftuChatype][0].formDataSubmit["eftuChatype"]; //异动类型
        let eftuCharea = parent.$refs[parent.valueMap.eftuCharea][0].formDataSubmit["eftuCharea"]; //异动原因
        //若异动类型为公司内异动并且 异动类型为降薪或特殊调薪  平台员工分类为 异动前平台 异动前岗位分类

        if (eftuChatype == '2001' && (eftuCharea === 'bar005' || eftuCharea === 'bar003')) {
            eftuChaplata = panel//平台
            eftuChaempta = empmode//员工分类
        } else {
            eftuChaplata = parent.$refs[parent.valueMap.eftuChaplata][0].formDataSubmit["eftuChaplata"]//平台
            eftuChaempta = parent.$refs[parent.valueMap.eftuChaempta][0].formDataSubmit["eftuChaempta"];//员工分类
        }

        //let eftuChaempta = t.$parent.$refs[valueMap][0].formDataSubmit.eftuChaempta;
        if (eftuChaempta === '10trainee') {
            return;
        } else {
            let monjbgz = t.$refs.eftuBasemon.thisValue //基本工资标准
            let wagemon = t.$refs.eftuWagemon.thisValue //月度工资标准
            let transtandard = t.$refs.eftuTransccu.thisValue //交通津贴
            let txjt = t.$refs.eftuCommrate.thisValue //通讯津贴
            let allowance = t.$refs.eftuAllowan.thisValue //管理津贴
            let homecost = t.$refs.eftuSetcosts.thisValue //安家费
            let eftuOtherfei = t.$refs.eftuOtherfei.thisValue //其它费用
            let eftuYubonus = t.$refs.eftuYubonus.thisValue
            let ygyamount = t.$refs.eftuYmoneysum.thisValue //预估年度佣金总额
            let mulMoney = 0;
            let allMoney = 0;
            if (!isNaN(wagemon) && formshow.eftuWagemon !== undefined) {
                mulMoney += Number(wagemon);
            }

            // if (eftuChaplata === 'bussector-01market') {

            //     if (eftuChaempta === 'empcategory-05market' || eftuChaempta === 'empcategory-01manager') {
            //         if (!isNaN(wagemon) && formshow.eftuWagemon !== undefined) {
            //             mulMoney += Number(wagemon);
            //         }
            //     } else {
            //         if (!isNaN(monjbgz) && formshow.eftuBasemon !== undefined) {
            //             mulMoney += Number(monjbgz);
            //         }
            //     }

            // } else {
            //     if (eftuChaempta !== 'empcategory-05market') {
            //         if (!isNaN(monjbgz) && formshow.eftuBasemon !== undefined) {
            //             mulMoney += Number(monjbgz);
            //         }
            //     } else {
            //         if (!isNaN(wagemon) && formshow.eftuWagemon !== undefined) {
            //             mulMoney += Number(wagemon);
            //         }
            //     }
            // }
            // if(eftuChaempta!=='empcategory-05market'){
            //     if (!isNaN(monjbgz) && formshow.eftuBasemon !== undefined) {
            //         mulMoney += Number(monjbgz);
            //     }
            // }else{
            //     if (!isNaN(wagemon) && formshow.eftuWagemon !== undefined) {
            //         mulMoney += Number(wagemon);
            //     }
            // }
            if (!isNaN(transtandard) && formshow.eftuTransccu !== undefined) {
                mulMoney += Number(transtandard);
            }
            if (!isNaN(txjt) && formshow.eftuCommrate !== undefined) {
                mulMoney += Number(txjt);
            }
            if (!isNaN(allowance) && formshow.eftuAllowan !== undefined) {
                mulMoney += Number(allowance);
            }
            allMoney = mulMoney * 12;
            if (!isNaN(homecost) && formshow.eftuSetcosts !== undefined) {
                allMoney += Number(homecost);
            }
            if (!isNaN(eftuOtherfei) && formshow.eftuOtherfei !== undefined) {
                allMoney += Number(eftuOtherfei);
            }
            if (!isNaN(eftuYubonus) && formshow.eftuYubonus !== undefined) {
                allMoney += Number(eftuYubonus);
            }
            if (!isNaN(ygyamount) && formshow.eftuYmoneysum !== undefined) {
                allMoney += Number(ygyamount);
            }
            setValue(t, { 'eftuYsalsum': allMoney.toFixed(2).toString() })
            EmpFlowTurnover.sumSalaryup(t)
        }
    },
    /**
     * @description:薪资涨幅
     * @param {*}
     * @return {*}
     */
    sumSalaryup (t) {
        let empId = t.$parent.$data.formDataSubmit.empId
        let map = t.$parent.valueMap.eftuYsalsum;
        let num1 = t.$parent.$refs[map][0].formDataSubmit.eftuYsalsum;
        let rate = ''
        if (empId && empId !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpFlowTurnover.getBefNum',
                APempId: empId,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let num2 = res.data.content[0].value
                    if (num1 && num2) {
                        if (parseInt(num2) > 1) {
                            rate = (((num1 - num2) / num2) * 100).toFixed(2)
                            setValue(t, { 'eftuSalaryup': rate })
                        } else {
                            rate = '0'
                            setValue(t, { 'eftuSalaryup': rate })
                        }
                    }
                }
            })
        }
    },
    /**
     * @description 异动生效日期年月 = 社保公积金转移年月;异动生效日期 = 商保转移时间
     * @param {*} node
     */
    eftuChadate (node) {
        // eftuChadate 异动生效日期
        // eftuTrantime 社保公积金转移年月
        // eftuBusinstime 商保转移时间
        const t = this;
        // let modelDates = new Date(node.thisValue)
        // let date = new Date()
        // if (modelDates > date) {
        //     setValue(t, { 'eftuChadate': node.thisValue })
        // } else {
        //     console.log(t, '33333')
        //     t.$refs.eftuChadate.thisValue = ""
        //     t.$refs.eftuChadate.value = ""
        //     t.formDataSubmit.eftuChadate = ""
        //     t.$store.state.flowClmkMap.popForm.eftuChadate = ''
        //     t.$Modal.warning({
        //         title: '提示',
        //         content: '异动生效日期时间不能早于当前时间',
        //     })
        //     if (node.thisValue == '') {
        //         setValue(t, { 'eftuChadate': '' })
        //     }
        // }
       
        if (t.formDataSubmit[node.ruleText] !== '') {
            if (t.$parent.valueMap.eftuTrantime) {
                let eftuTrantime = t.$parent.$refs[t.$parent.valueMap.eftuTrantime][0].formDataSubmit.eftuTrantime;
                if (!eftuTrantime) {
                    let arr = eftuChadate.split('-');
                    setValue(t, { 'eftuTrantime': arr[0] + '-' + arr[1] })
                }
            }
            if (t.$parent.valueMap.eftuBusinstime) {
                let eftuBusinstime = t.$parent.$refs[t.$parent.valueMap.eftuBusinstime][0].formDataSubmit.eftuBusinstime;
                if (!eftuBusinstime) {
                    setValue(t, { 'eftuTrantime': eftuChadate })
                }
            }
        }
    },
    /**
     * @description 营销平台，绩效工资及月工资标准 不显示;资本平台,管理津贴显示
     * @param {*} node
     */
    // eftuChaplata (node) {
    //     const t = this;
    //     if(t.formDataSubmit[node.ruleText] !== '') {
    //         let platform = t.formDataSubmit[node.ruleText];
    //         // if(platform === '04capital') {//为资本时管理津贴显示
    //         //     displayEvent(t, 1, ['eftuAllowan'])
    //         // }else {
    //         //     displayEvent(t, 0, ['eftuAllowan'])
    //         // }
    //         // if(platform === '01market') {//为营销时绩效工资和月工资标准不显示
    //         //     displayEvent(t, 0, ['eftuWagemon','eftuMonperf'])
    //         //     displayEvent(t, 1, ['eftuMarpoints'])
    //         // }else {
    //         //     displayEvent(t, 1, ['eftuWagemon','eftuMonperf'])
    //         //     displayEvent(t, 0, ['eftuMarpoints'])
    //         // }
    //     }
    // },
    setDisplay (t) {
        // eftu_chaplata 异动后平台   04capital资本  01market营销
        console.log(t, '55555555555555')
        if (t.valueMap.eftuChaplata) {
            let valueMap = t.valueMap.eftuChaplata;
            let eftuChaplata = t.$refs[valueMap][0].$refs.eftuChaplata;
            let platform = eftuChaplata.thisValue;
            if (platform === '04capital') {//为资本时管理津贴显示
                initDisplayEvent(t, 1, ['eftuAllowan'])
            } else {
                initDisplayEvent(t, 0, ['eftuAllowan'])
            }
            if (platform === '01market') {//为营销时绩效工资和月工资标准不显示
                initDisplayEvent(t, 0, ['eftuWagemon', 'eftuMonperf'])
                initDisplayEvent(t, 1, ['eftuMarpoints'])
            } else {
                initDisplayEvent(t, 1, ['eftuWagemon', 'eftuMonperf'])
                initDisplayEvent(t, 0, ['eftuMarpoints'])
            }
        }
    },
    /**
    * @description 管理津贴字段，当所选平台为：资本平台时显示；预估营销佣金点数、预估年度佣金总额当所选平台为： 项目管理平台-营销中心 、资本平台显示
    *              日工资标准：当员工分类为实习生时，显示
    *              安家费：当是否管培生为“是”时显示
    * @param {*} node
    */
    setInitDisplay (t) {
        let arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        let valueMap = t.valueMap;
        let eftuChaplata = ''; //异动后平台
        let eftuChaempta = ''; //员工分类
        let eftuSalaryadj = '';//薪资是否调整
        let eftuIsgps = ''; //管培生
        console.log(t, '111')
        let arr2 = ['eftuIscalculate','eftuIsnotpaid']
        initDisplayEvent(t,0,arr2)
        console.log(valueMap.eftuChaplata, "valueMap.eftuChaplata")
        if (valueMap.eftuIsgps) {
            eftuIsgps = t.$refs[valueMap.eftuIsgps][0].formDataSubmit.eftuIsgps;//是否管培生
        }
        if (t.niceData.eftuSalaryadj) {
            eftuSalaryadj = t.niceData.eftuSalaryadj//是否薪资调整
        }
        if (valueMap.eftuChaplata) {
            eftuChaplata = t.$refs[valueMap.eftuChaplata][0].formDataSubmit.eftuChaplata;//平台
        }
        if (valueMap.eftuChaempta) {
            eftuChaempta = t.$refs[valueMap.eftuChaempta][0].formDataSubmit.eftuChaempta;//分类
        }
        
        if (eftuChaplata && eftuChaempta && eftuSalaryadj==='1') {
            //debugger
            initDisplayEvent(t,1,arr2)
            if (eftuChaempta) {
                if (eftuChaplata === 'bussector-04capital') {//资本平台
                    switch (eftuChaempta) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                } else if (eftuChaplata === 'bussector-01market') {//项目管理平台-营销中心
                    switch (eftuChaempta) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                } else {
                    switch (eftuChaempta) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                }
                EmpFlowTurnover.showHide(t, arr, 0);
            } else {
                EmpFlowTurnover.showHide(t, arr, 0);
            }
        } else {
            EmpFlowTurnover.showHide(t, arr1, 0);
            initDisplayEvent(t,0,arr2) 
        }
        if (eftuSalaryadj == '0') {
            EmpFlowTurnover.showHide(t, arr1, 0);
        }
    },
    /**
     * @description: 员工分类触发事件
     * @param {*} node
     * @return {*}
     */
    eftuChaempta (node) {
        const t = this;
        // let arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        const parent = t.$parent
        // let eftuSalaryadj = parent.$refs[parent.valueMap.eftuSalaryadj][0].formDataSubmit["eftuSalaryadj"]
        // let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // if (t.formDataSubmit[node.ruleText] !== '') {
        let eftuChaplata = t.formDataSubmit.eftuChaplata;//平台
        let eftuChaempta = t.formDataSubmit[node.ruleText];//员工分类
        EmpFlowTurnover.sumJtTx(t)
        EmpFlowTurnover.panelShowHide(t)
        // console.log(eftuChaplata, "eftuChaplata")
        // if (eftuChaempta === 'empcategory-10trainee') {
        //     setValue(t, { 'eftuYsalsum': '0' })
        // }
        //     if (eftuChaplata && eftuChaempta) {
        //         EmpFlowTurnover.sumJtTx(t)
        //         if (eftuChaplata === 'bussector-04capital') {//资本平台
        //             switch (eftuChaempta) {
        //                 case 'empcategory-01manager'://管理人员
        //                     arr = [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
        //                     break;
        //                 case 'empcategory-05market'://营销一线人员
        //                     arr = [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
        //                     break;
        //                 case 'empcategory-10trainee'://实习生
        //                     arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        //                     break;
        //                 case 'empcategory-15consultant'://顾问
        //                     arr = [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        //                     break;
        //                 case 'empcategory-25out'://外部人员
        //                     arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //                     break;
        //                 case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
        //                     arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        //                     break;
        //             }
        //         } else if (eftuChaplata === 'bussector-01market') {//项目管理平台-营销中心
        //             switch (eftuChaempta) {
        //                 case 'empcategory-01manager'://管理人员
        //                     arr = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
        //                     break;
        //                 case 'empcategory-05market'://营销一线人员
        //                     arr = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
        //                     break;
        //                 case 'empcategory-10trainee'://实习生
        //                     arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        //                     break;
        //                 case 'empcategory-15consultant'://顾问
        //                     arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
        //                     break;
        //                 case 'empcategory-25out'://外部人员
        //                     arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //                     break;
        //                 case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
        //                     arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        //                     break;
        //             }
        //         } else {
        //             switch (eftuChaempta) {
        //                 case 'empcategory-01manager'://管理人员
        //                     arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        //                     break;
        //                 case 'empcategory-05market'://营销一线人员
        //                     arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //                     break;
        //                 case 'empcategory-10trainee'://实习生
        //                     arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        //                     break;
        //                 case 'empcategory-15consultant'://顾问
        //                     arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        //                     break;
        //                 case 'empcategory-25out'://外部人员
        //                     arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //                     break;
        //                 case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
        //                     arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        //                     break;
        //             }
        //         }
        //         EmpFlowTurnover.showHide(t, arr, 1);
        //     } else {
        //         EmpFlowTurnover.sumJtTx(t)
        //     }
        // } else {
        //     EmpFlowTurnover.sumJtTx(t)
        // }
    },
    /**
     * @description: 员工平台触发事件
     * @param {*}
     * @return {*}
     */
    eftuChaplata (node) {
        const t = this;
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //let arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        const parent = t.$parent
        let eftuSalaryadj = parent.$refs[parent.valueMap.eftuSalaryadj][0].formDataSubmit["eftuSalaryadj"]
        if (t.formDataSubmit[node.ruleText] !== '') {
            EmpFlowTurnover.panelShowHide(t)
            EmpFlowTurnover.sumJtTx(t)
            // let eftuChaplata = t.formDataSubmit[node.ruleText];//平台
            // let eftuChaempta = t.formDataSubmit.eftuChaempta;//员工分类
            // let eftuIsgps = t.$refs.eftuIsgps.thisValue;
            // console.log(eftuChaempta, "eftuChaempta")
            // console.log(eftuIsgps, "eftuIsgps")
            // if (eftuChaempta && eftuChaempta) {
            //     EmpFlowTurnover.sumJtTx(t)
            //     if (eftuChaplata === 'bussector-04capital') {//资本平台
            //         switch (eftuChaempta) {
            //             case 'empcategory-01manager'://管理人员
            //                 arr = [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //                 break;
            //             case 'empcategory-05market'://营销一线人员
            //                 arr = [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //                 break;
            //             case 'empcategory-10trainee'://实习生
            //                 arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
            //                 break;
            //             case 'empcategory-15consultant'://顾问
            //                 arr = [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
            //                 break;
            //             case 'empcategory-25out'://外部人员
            //                 arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //                 break;
            //             case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
            //                 arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
            //                 break;
            //         }
            //     } else if (eftuChaplata === 'bussector-01market') {//项目管理平台-营销中心
            //         switch (eftuChaempta) {
            //             case 'empcategory-01manager'://管理人员
            //                 arr = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //                 break;
            //             case 'empcategory-05market'://营销一线人员
            //                 arr = [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //                 break;
            //             case 'empcategory-10trainee'://实习生
            //                 arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
            //                 break;
            //             case 'empcategory-15consultant'://顾问
            //                 arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //                 break;
            //             case 'empcategory-25out'://外部人员
            //                 arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //                 break;
            //             case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
            //                 arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
            //                 break;
            //         }
            //         // switch (eftuIsgps) {
            //         //     case '1'://是管培生
            //         //         arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
            //         //         break;
            //         //     case '0'://不是管培生
            //         //         arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //         //         break;
            //         // }
            //     } else {
            //         switch (eftuChaempta) {
            //             case 'empcategory-01manager'://管理人员
            //                 arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
            //                 break;
            //             case 'empcategory-05market'://营销一线人员
            //                 arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //                 break;
            //             case 'empcategory-10trainee'://实习生
            //                 arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
            //                 break;
            //             case 'empcategory-15consultant'://顾问
            //                 arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
            //                 break;
            //             case 'empcategory-25out'://外部人员
            //                 arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            //                 break;
            //             case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
            //                 arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
            //                 break;
            //         }
            //         // switch (eftuIsgps) {
            //         //     case '1'://是管培生
            //         //         arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
            //         //         break;
            //         //     case '0'://不是管培生
            //         //         arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //         //         break;
            //         // }
            //     }
            //     EmpFlowTurnover.showHide(t, arr, 1);
            // } else {
            //     EmpFlowTurnover.sumJtTx(t)
            //     EmpFlowTurnover.showHide(t, arr, 1);
            // }
        }
    },
    /**
     * @description: 字段显示隐藏方法
     * @param {*} t
     * @param {*} arr
     * @param {*} init
     * @return {*}
     */
    showHide (t, arr, init) {
        let dom = [
            'eftuWagemon', 'eftuBasemon', 'eftuMonperf', 'eftuYubonus', 'eftuTransccu', 'eftuCommrate',
            'eftuComallow', 'eftuExamallow', 'eftuAllowan', 'eftuDaysalary', 'eftuSetcosts', 'eftuOtherfei',
            'eftuMarpoints', 'eftuYmoneysum', 'eftuYsalsum', 'eftuIntcomp', 'eftuExtercomp', 'eftuSalaryup'
        ];
        for (let i = 0; i < dom.length; i++) {
            if (arr[i]) {
                if (init) {
                    displayEvent(t, 1, dom[i].split(' '));
                } else {
                    initDisplayEvent(t, 1, dom[i].split(' '))
                }
            } else {
                if (init) {
                    displayEvent(t, 0, dom[i].split(' '));
                } else {
                    initDisplayEvent(t, 0, dom[i].split(' '))
                }
            }
        }
    },
    /**
     * @description:电脑回退
     * @param {*}
     * @return {*}
     */
    eftuComreturn (node) {
        const t = this
        EmpFlowTurnover.sumAllmoney(t)
    },
    /**
     * @description:  借款金额
     * @param {*} node
     * @return {*}
     */
    eftuBroamount (node) {
        const t = this
        EmpFlowTurnover.sumAllmoney(t)
    },
    /**
     * @description: 其他金额
     * @param {*} node
     * @return {*}
     */
    eftuOthermon (node) {
        const t = this
        EmpFlowTurnover.sumAllmoney(t)
    },
    /**
     * @description: 备用金
     * @param {*} node
     * @return {*}
     */
    eftuResmount (node) {
        const t = this
        EmpFlowTurnover.sumAllmoney(t)
    },
    /**
     * @description: 服装费
     * @param {*}
     * @return {*}
     */
    eftuColsamount (node) {
        const t = this
        EmpFlowTurnover.sumAllmoney(t)
    },
    /**
     * @description: 财务确认合计
     * @param {*}
     * @return {*}
     */
    sumAllmoney (t) {
        const parent = t.$parent
        //let eftuSum = parent.$refs[parent.valueMap.eftuSum][0].formDataSubmit["eftuSum"] //合计
        let eftuComreturn = parent.$refs[parent.valueMap.eftuComreturn][0].formDataSubmit["eftuComreturn"] //电脑退回
        let eftuBroamount = parent.$refs[parent.valueMap.eftuBroamount][0].formDataSubmit["eftuBroamount"]  //借款金额
        let eftuOthermon = parent.$refs[parent.valueMap.eftuOthermon][0].formDataSubmit["eftuOthermon"]  //其它金额
        let eftuResmount = parent.$refs[parent.valueMap.eftuResmount][0].formDataSubmit["eftuResmount"]  //备用金
        let eftuColsamount = parent.$refs[parent.valueMap.eftuColsamount][0].formDataSubmit["eftuColsamount"]  //服装费

        let allMoneys = Number(eftuComreturn) + Number(eftuBroamount) + Number(eftuOthermon) + Number(eftuResmount) + Number(eftuColsamount)

        setValue(t, { 'eftuSum': allMoneys })
    },

}
export default EmpFlowTurnover
