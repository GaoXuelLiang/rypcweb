import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
let gsBasepro = '';//基本比例
let gsAchipro = '';//绩效比例
let gsTranssub1 = '';//一线城市交通
let gsTranssub2 = '';//其他城市
let unitId = '';
let postId = '';
let rank = '';
let flsg = true;  // 合同开始日期赋值状态
const EmpFlowConrenew = {
    all_dis () {
        EmpFlowConrenew.shHi(this)
        EmpFlowConrenew.setInitDisplays(this)
        EmpFlowConrenew.initSetDis(this)
        // EmpFlowConrenew.econSalaryadj_dis(this)
    },
    /**
     * @description 员工主数据带出合同信息
     * @param {*} node
     */
    // 选人重置开始时间变量
    empId (node) {
        const t = this;
        let sCondate = t.formDataSubmit['econConsdate'];
        if (sCondate && sCondate !== '') {
            sCondate = new Date(sCondate);
            sCondate = sCondate.setDate(sCondate.getDate() + 1);
            sCondate = new Date(sCondate).format('yyyy-MM-dd');

            let obj = {
                'econConsdate': sCondate,//合同开始日期
            }

            setValue(t, obj)
        }
    },
    econConsdate (node) {

    },
    //预计到岗日期
    econExpadate (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            let modelDate = t.$refs.econExpadate.thisValue
            let modelDates = new Date(modelDate)
            let date = new Date()
            if (modelDates <= date) {
                t.$Modal.warning({
                    title: '提示',
                    content: '预计到岗日期时间不能小于当前时间',
                })
                setValue(t, { 'econExpadate': '' })
            }

        }
    },
    //年度佣金  佣金点数
    initSetDis (t) {
        let econMarpoints = '';
        let econOtherfei = '';
        if (t.valueMap.econMarpoints) {
            econMarpoints = t.$refs[t.valueMap.econMarpoints][0].formDataSubmit.econMarpoints
            econOtherfei = t.$refs[t.valueMap.econOtherfei][0].formDataSubmit.econOtherfei
            if (econMarpoints > 0 && econMarpoints !== '') {
                t.$refs[t.valueMap.econOtherfei][0].dis.econOtherfei = false
            } else {
                t.$refs[t.valueMap.econOtherfei][0].dis.econOtherfei = true
            }
            if (econOtherfei > 0 && econOtherfei !== '') {
                t.$refs[t.valueMap.econMarpoints][0].dis.econMarpoints = false
            } else {
                t.$refs[t.valueMap.econMarpoints][0].dis.econMarpoints = true
            }
        }
    },
    //营销点数
    econOtherfei (node) {
        const t = this
        let nodes = t.$parent.$refs
        let map = t.$parent.valueMap
        if (t.formDataSubmit[node.ruleText] !== "") {
            nodes[map.econMarpoints][0].dis.econMarpoints = false
        } else {
            nodes[map.econMarpoints][0].dis.econMarpoints = true
        }
    },
    /**
    * @description:续签重新赋值
    * @param {*}
    * @return {*}
    */
    recetData (t) {
        console.log(t, '4556555')
        let empId = t.$parent.$refs[t.$parent.valueMap.empId][0].formDataSubmit.empId
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
                        let obj = {
                            econLegtPerson: data.empLegtPerson,
                            econLegtRegaddr: data.empLegtRegaddr,
                            econLegalra: data.empLegalid,
                            econLegalraDis: data.empLegalidDis,
                            econConsdate: data.empSdate,
                            econRedockPhone: data.empMobile,
                            econRedockMail: data.empPersmail,
                            'econContype': data.empCategory,
                            'econCondur': data.empDuration,
                            'econConsdate': data.empSdate,
                            'eftuStartwork': data.empFworkdate,

                            'econConedate': data.empEdate,
                            'econWorktype': data.empWttype,
                            'econDaynotice': data.empDuedate = '' ? '060' : data.empDuedate,
                        }
                        setValue(t, obj)
                    }
                }
            })
        }
    },
    econWorknum (node) {
        const t = this

        if (t.formDataSubmit[node.ruleText] !== '') {
            EmpFlowConrenew.setInitDisplay(t)
        }
    },
    econCondur (node) {
        const t = this;
        // debugger
        if (t.formDataSubmit[node.ruleText] !== '') {
            let econCondur = t.formDataSubmit[node.ruleText];
            let econConsdate = t.formDataSubmit.econConsdate;
            if (econConsdate) {
                econConsdate = econConsdate.split('-');
                let y = Number(econConsdate[0]);
                let m = Number(econConsdate[1]);
                let d = Number(econConsdate[2]);
                let date = '';
                if (y !== 9999) {
                    switch (econCondur) {
                        // case '1':
                        //     date = ( y + 1 ) + '-' + ( m < 10 ? '0' + m : m ) + '-' + ( d < 10 ? '0' + d : d );
                        //     break;
                        // case '3':
                        //     date = ( y + 3 ) + '-' + ( m < 10 ? '0' + m : m ) + '-' + ( d < 10 ? '0' + d : d );
                        //     break;
                        // case '5':
                        //     date = ( y + 5 ) + '-' + ( m < 10 ? '0' + m : m ) + '-' + ( d < 10 ? '0' + d : d );
                        //     break;
                        case '1':
                            date = (y + 1) + '-' + EmpFlowConrenew.formatM(m)
                            break;
                        case '3':
                            date = (y + 3) + '-' + EmpFlowConrenew.formatM(m)
                            break;
                        case '5':
                            date = (y + 5) + '-' + EmpFlowConrenew.formatM(m)
                            break;
                    }
                } else {
                    date = t.formDataSubmit.econConsdate
                }
                setValue(t, { 'econConedate': date })
            }
        }
    },
    //职等
    econRankinfoDis (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            rank = node.thisValue
            EmpFlowConrenew.sumJtTx(t)
            EmpFlowConrenew.callwai(t)
            EmpFlowConrenew.sumOutsalarycop(t)
        }
    },
    /**
  * @description: 外部薪酬竞争力
  * @param {*}
  * @return {*}
  */

    sumOutsalarycop (t) {
        let econPostid = t.$parent.$refs[t.$parent.valueMap.econPostid][0].formDataSubmit.econPostid;
        let econEntrydate = t.$parent.$refs[t.$parent.valueMap.econEntrydate][0].formDataSubmit.econEntrydate;
        let econDailyspa = t.$parent.$refs[t.$parent.valueMap.econDailyspa][0].formDataSubmit.econDailyspa;
        let econWagemon = t.$parent.$refs[t.$parent.valueMap.econWagemon][0].formDataSubmit.econWagemon;
        if (!econPostid || econPostid === '' || !econEntrydate || econEntrydate === '' || !econDailyspa || econDailyspa === '' || !econWagemon || econWagemon === '') {
            return;
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.retentCityAndMedian',
            APentCityId: econDailyspa,
            APentDate: new Date(econEntrydate).getFullYear(),
            APentPostId: econPostid
        }).then((res) => {
            if (isSuccess(res, t)) {
                let op = res.data.content[0];
                if (op.gsMedian && op.cnNoun) {
                    let gsMed = Number(res.data.content[0].gsMedian);
                    let cnNoun = Number(res.data.content[0].cnNoun);
                    let sum = Number(econWagemon) / (cnNoun * gsMed) * 100
                    setValue(t, { 'econExtercomp': parseFloat(sum).toFixed(2) })
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
    * @description: 内部薪酬竞争力
    * @param {*}
    * @return {*}
    */
    callwai (t) {
        let econPostid = t.$parent.$refs[t.$parent.valueMap.econPostid][0].formDataSubmit.econPostid;
        let econWagemon = t.$parent.$refs[t.$parent.valueMap.econWagemon][0].formDataSubmit.econWagemon;
        if (!econPostid || econPostid === '' || !econWagemon || econWagemon === '') {
            return;
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.getAvgSal',
            APpostId: econPostid,
        }).then((res) => {
            if (isSuccess(res, t)) {
                console.log(res, "res")
                if (res.data.content[0].hasOwnProperty('value')) {
                    let val = res.data.content[0].value
                    if (val == 0) {
                        val = 1
                    }
                    let vals = ((Number(econWagemon) / Number(val)) * 100).toFixed(2)
                    setValue(t, { 'econIntcomp': vals })
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },

    /**
     * @description:薪资涨幅
     * @param {*}
     * @return {*}
     */
    sumSalaryup (t) {
        let empId = t.$parent.$data.formDataSubmit.empId
        let map = t.$parent.valueMap.econYsalsum;
        let num1 = t.$parent.$refs[map][0].formDataSubmit.econYsalsum;
        let rate = ''
        if (empId && empId !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpFlowTurnover.getBefNum',
                APempId: empId,
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let num2 = res.data.content[0].value
                    if (num1 && num2) {
                        rate = (((num1 - num2) / num2) * 100).toFixed(2)
                        setValue(t, { 'econSalaryup': rate })
                    } else {
                        rate = '0'
                        setValue(t, { 'econSalaryup': rate })
                    }
                }
            })
        }
    },
    /**
   * @description: 交通津贴  通讯津贴赋值
   * @param {*}
   * @return {*}
   */
    sumJtTx (t) {
        let econPostid = t.$parent.$refs[t.$parent.valueMap.econPostid][0].formDataSubmit.econPostid;
        console.log(t, '5555555')
        let place = t.$parent.$refs[t.$parent.valueMap.econDailyspaDis][0].formDataSubmit.econDailyspaDis;


        let econRankinfoDis = t.$parent.$refs[t.$parent.valueMap.econRankinfoDis][0].formDataSubmit.econRankinfoDis;
        // if(node){
        //     let place = node.thisValue;
        // }
        if (econRankinfoDis || econRankinfoDis !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpFlowEntr.retentTransMoney',
                APentEmppoid: econPostid
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let op = res.data.content[0];

                    gsBasepro = res.data.content[0].gsBasepro;
                    gsAchipro = res.data.content[0].gsAchipro;
                    let gsTranssub1 = res.data.content[0].gsTranssub1;
                    let gsTranssub2 = res.data.content[0].gsTranssub2;
                    let obj = {//通讯津贴标准
                        'econCommrate': res.data.content[0].gsCommsub
                    }
                    setValue(t, obj)
                    if (place !== '' && place !== undefined) {
                        if (place === '北京市' || place === '上海市' || place === '广州市' || place === '深圳市') {
                            setValue(t, { 'econTransccu': gsTranssub1 })
                            console.log(place, gsTranssub1, '11111')
                        } else {
                            setValue(t, { 'econTransccu': gsTranssub2 })
                            console.log(place, gsTranssub2, '22222222')
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    },

    /**
     * @description 月度工资标准 带出月度基本工资、月度绩效工资
     * @param {*} node
     */
    econWagemon (node) {
        const t = this;
        if (t.formDataSubmit[node.ruleText] !== '') {
            let wagemon = t.formDataSubmit[node.ruleText] //月度工资标准
            let reg = /^(((\d)|([1-9]\d+))(\.\d+)?)$/
            if (reg.test(wagemon)) {
                if (gsBasepro !== '' && gsAchipro !== '') {
                    let wage = Number(wagemon)
                    let baseRate = Number(gsBasepro);
                    let perfRate = Number(gsAchipro);
                    let obj = {
                        'econBasemon': (wage * baseRate / 100).toFixed(2),
                        'econMonperf': (wage * perfRate / 100).toFixed(2)
                    }
                    setValue(t, obj)
                }
            }
            EmpFlowConrenew.callwai(t)
            EmpFlowConrenew.sumJtTx(t)
            EmpFlowConrenew.sumOutsalarycop(t)
            EmpFlowConrenew.econYsalsum_dis(t)
        }
    },
    econBasemon (node) {
        const t = this;
        EmpFlowConrenew.econYsalsum_dis(t)
    },
    econTransccu (node) {
        const t = this;
        EmpFlowConrenew.econYsalsum_dis(t)
    },
    econCommrate (node) {
        const t = this;
        EmpFlowConrenew.econYsalsum_dis(t)
    },
    econMarpoints (node) {
        const t = this;
        let nodes = t.$parent.$refs
        let map = t.$parent.valueMap
        if (t.formDataSubmit[node.ruleText] !== "") {
            nodes[map.econOtherfei][0].dis.econOtherfei = false
        } else {
            nodes[map.econOtherfei][0].dis.econOtherfei = true
        }
        EmpFlowConrenew.econYsalsum_dis(t)
    },
    econSetcosts (node) {
        const t = this;
        EmpFlowConrenew.econYsalsum_dis(t)
    },
    econYmoneysum (node) {
        const t = this;
        EmpFlowConrenew.econYsalsum_dis(t)
    },
    econYubonus (node) {
        const t = this;
        EmpFlowConrenew.econYsalsum_dis(t)
    },
    /**
    * @description （月基本工资标准+交通津贴+通讯津贴+管理津贴）×12+安家费+预估年度佣金总额，如果员工类型为实习生，则无需计算
    * @param {*} this
    */
    econYsalsum_dis (t) {
        console.log(t, '1')
        let valueMap = t.$parent.valueMap.econStaff;
        let econStaff = t.$parent.$refs[valueMap][0].formDataSubmit.econStaff;
        let mulMoney = 0;
        let allMoney = 0;
        let formshow = t.formshow;
        let monjbgz = t.$parent.$refs[t.$parent.valueMap.econBasemon][0].formDataSubmit.econBasemon //基本工资标准
        let econPlatform = t.$parent.$refs[t.$parent.valueMap.econPlatform][0].formDataSubmit.econPlatform //平台
        let econYmoneysum = t.$refs.econYmoneysum.thisValue //其它
        let econYubonus = t.$refs.econYubonus.thisValue //年终奖
        let wagemon = t.$parent.$refs[t.$parent.valueMap.econWagemon][0].formDataSubmit.econWagemon//月度工资标准
        let transtandard = t.$parent.$refs[t.$parent.valueMap.econTransccu][0].formDataSubmit.econTransccu //交通津贴
        let txjt = t.$parent.$refs[t.$parent.valueMap.econCommrate][0].formDataSubmit.econCommrate  //通讯津贴
        let allowance = t.$parent.$refs[t.$parent.valueMap.econSetcosts][0].formDataSubmit.econSetcosts //管理津贴
        // let homecost = t.$refs.eftuSetcosts.thisValue //安家费
        let ygyamount = t.$parent.$refs[t.$parent.valueMap.econMarpoints][0].formDataSubmit.econMarpoints//预估年度佣金总额
        console.log(econStaff, '55555')
        if (econStaff === 'empcategory-10trainee') {
            return;
        } else {
            if (!isNaN(wagemon) && formshow.econWagemon !== undefined) {
                mulMoney += Number(wagemon);
            }
            // if(econPlatform==='bussector-01market'){

            //     if(econStaff==='empcategory-05market' || econStaff==='empcategory-01manager' ){
            //         if (!isNaN(wagemon) && formshow.econWagemon !== undefined) {
            //             mulMoney += Number(wagemon);
            //         }
            //     }else{
            //         if (!isNaN(monjbgz) && formshow.econBasemon !== undefined) {
            //             mulMoney += Number(monjbgz);
            //         }
            //     }              
            // }else{
            //     if(econStaff!=='empcategory-05market'){
            //         if (!isNaN(monjbgz) && formshow.econBasemon !== undefined) {
            //             mulMoney += Number(monjbgz);
            //         }
            //     }else{
            //         if (!isNaN(wagemon) && formshow.econWagemon !== undefined) {
            //             mulMoney += Number(wagemon);
            //         }
            //     }
            // }
            if (!isNaN(transtandard) && formshow.econTransccu !== undefined) {
                mulMoney += Number(transtandard);
            }
            if (!isNaN(txjt) && formshow.econCommrate !== undefined) {
                mulMoney += Number(txjt);
            }
            if (!isNaN(allowance) && formshow.econSetcosts !== undefined) {
                mulMoney += Number(allowance);
            }
            allMoney = mulMoney * 12;
            // if(!isNaN(homecost) && formshow.eftuSetcosts !== undefined) {
            //     allMoney += Number(homecost);
            // }
            if (!isNaN(econYmoneysum) && formshow.econYmoneysum !== undefined) {
                allMoney += Number(econYmoneysum);
            }
            if (!isNaN(econYubonus) && formshow.econYubonus !== undefined) {
                allMoney += Number(econYubonus);
            }
            if (!isNaN(ygyamount) && formshow.econMarpoints !== undefined) {
                allMoney += Number(ygyamount);
            }
            console.log(allMoney, '2222')

            setValue(t, { 'econYsalsum': allMoney.toFixed(2).toString() })
        }
    },
    // 是否发起续签
    econIsinrew (node) {
        const t = this;
        let isInrew = t.formDataSubmit[node.ruleText];
        let arr = []
        EmpFlowConrenew.recetData(t)
        if (isInrew === "01agree") {
            // 续签
            //续签法律实体禁填
            t.$parent.$refs[t.$parent.valueMap.econLegalra][0].dis.econLegalra = false
            arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
            EmpFlowConrenew.isXuQian(t, arr, 1)
            t.$parent.$refs[t.$parent.valueMap.econSalaryadj][0].dis.econSalaryadj = true
            
        } else if (isInrew === "02refuse") {
            t.$parent.$refs[t.$parent.valueMap.econSalaryadj][0].dis.econSalaryadj = false
            // 不续签
            t.$parent.$refs[t.$parent.valueMap.econSalaryadj][0].formDataSubmit.econSalaryadj = '0' 
            console.log(t, '88888')
            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
            EmpFlowConrenew.isXuQian(t, arr, 1)
        } else if (isInrew === "03delay") {
            // 顺延
            t.$parent.$refs[t.$parent.valueMap.econLegalra][0].dis.econLegalra = false
            t.$parent.$refs[t.$parent.valueMap.econSalaryadj][0].dis.econSalaryadj = true
            displayEvent(t, 1, ['econSalaryadj'])
            arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
            EmpFlowConrenew.isXuQian(t, arr, 1)
        }
    },
    // 初次回显
    shHi (t) {
        let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
        let arr1 = ['econLabour', 'econDelaydoc', 'econPayform']
        initDisplayEvent(t, 0, arr1)
        let econSalaryadj = t.$refs[t.valueMap.econSalaryadj][0].formDataSubmit.econSalaryadj
        let isInrew = t.$refs[t.valueMap.econIsinrew][0].formDataSubmit.econIsinrew
        console.log(t, '666666')
        if (isInrew === "01agree") {
            // 续签
            arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
            t.$refs[t.valueMap.econLegalra][0].dis.econLegalra = false
            if (econSalaryadj == '1') {
                initDisplayEvent(t, 1, ['econLabour', 'econPayform'])
            } else {
                initDisplayEvent(t, 1, ['econLabour'])
            }

            EmpFlowConrenew.isXuQian(t, arr, 0)
        } else if (isInrew === "02refuse") {
            // 不续签
            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
            t.$refs[t.valueMap.econSalaryadj][0].dis.econSalaryadj = false

            t.$refs[t.valueMap.econSalaryadj][0].formDataSubmit.econSalaryadj = '0'
            EmpFlowConrenew.isXuQian(t, arr, 0)
        } else if (isInrew === "03delay") {
            // 顺延
            t.$refs[t.valueMap.econLegalra][0].dis.econLegalra = false
            arr = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]
            EmpFlowConrenew.isXuQian(t, arr, 0)
            initDisplayEvent(t, 1, ['econDelaydoc'])
        }
    },
    //续签显隐
    isXuQian (t, arr, init) {
        let dom = [
            "econLegalra", "econLegtPerson", "econLegtRegaddr",
            "econContype", "econCondur", "econConsdate", "econConedate", "econWorktype", "econDaynotice",
            "econReperson", "econRedock", "econRedockPhone", "econRedockMail", "econNocreason", "econDelay", "econExpadate"
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
    // 合同结束日期的计算方法 
    formatM (m) {
        if (m <= 3 && m >= 1) {
            return '03-31'
        }
        if (m <= 6 && m > 3) {
            return '06-30'
        }
        if (m <= 9 && m > 6) {
            return '09-30'
        }
        if (m <= 12 && m > 9) {
            return '12-31'
        }
    },
    // 薪资是否调整
    econSalaryadj (node) {
        const t = this;
        const parent = t.$parent
        let empName = parent.$refs[parent.valueMap.empId][0].formDataSubmit["empIdDis"]
        let empId = parent.$refs[parent.valueMap.empId][0].formDataSubmit["empId"]
        let isSaladj = parent.$refs[parent.valueMap.econSalaryadj][0].formDataSubmit["econSalaryadj"]
        // let empName = t.$refs.empId.thisValue;
        // let empId = t.$refs.empId.id;
        // let isSaladj = t.$refs.econSalaryadj.thisValue;
        EmpFlowConrenew.sumJtTx(t)
        if (empName) {
            if (isSaladj === "1") {
                EmpFlowConrenew.setInitDisplay(t)
                // 状态是，渲染薪酬信息
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'EmpInfo.getById',
                    APid: empId,
                    APffk: `gep${t.funId}`
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0]) {
                            let data = res.data.content[0];
                            let obj = {
                                'econWagemon': data.empMongzbz,
                                'econBasemon': data.empMonjbgz,
                                'econMonperf': data.empMonjxgz,
                                'econYubonus': data.empYgnzj,
                                'econTransccu': data.empTranstandard,
                                'econCommrate': data.empTxjt,
                                'econSetcosts': data.empAllowance,
                                'econOtherfei': data.empYgyxyj,
                                'econMarpoints': data.empYgyamount,
                                'econYmoneysum': data.empElse,
                                'econYsalsum': data.empYtotalsum,
                                'econIntcomp': data.empInsalarycop,
                                'econExtercomp': data.empOutsalarycop,
                                'econSalaryup': data.empSalaryinc
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
                let arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                EmpFlowConrenew.showHide(t, arr1, 1)
            }
        } else {
            // t.$Modal.warning({
            //     title: t.$t('reminder.remind'),
            //     content: "请先选择员工数据",
            // })
            return;
        }
    },
    //薪资初始化显示隐藏
    setInitDisplays (t) {
        let arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        let arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let valueMap = t.valueMap;
        let econPlatform = ''; //异动后平台
        let econStaff = ''; //员工分类
        let econSalaryadj = '';//薪资是否调整
        console.log(t, '111')
        console.log(valueMap.econPlatform, "valueMap.econPlatform")
        if (valueMap.econSalaryadj) {
            econSalaryadj = t.$refs[valueMap.econSalaryadj][0].formDataSubmit.econSalaryadj;//是否薪资调整
        }
        if (valueMap.econPlatform) {
            econPlatform = t.$refs[valueMap.econPlatform][0].formDataSubmit.econPlatform;//平台
        }
        if (valueMap.econStaff) {
            econStaff = t.$refs[valueMap.econStaff][0].formDataSubmit.econStaff;//分类
        }

        if (econPlatform) {

            if (econStaff) {
                if (econPlatform === 'bussector-04capital') {//资本平台
                    switch (econStaff) {
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
                } else if (econPlatform === 'bussector-01market') {//项目管理平台-营销中心
                    switch (econStaff) {
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
                    switch (econStaff) {
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
                EmpFlowConrenew.showHide(t, arr, 0);
            } else {
                EmpFlowConrenew.showHide(t, arr, 0);
            }
        } else {
            EmpFlowConrenew.showHide(t, arr, 0);
        }
        if (econSalaryadj == '0') {
            EmpFlowConrenew.showHide(t, arr1, 0);
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
        let arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        let valueMap = t.$parent.valueMap;
        let econPlatform = ''; //异动后平台
        let econStaff = ''; //员工分类
        let econSalaryadj = '';//薪资是否调整
        console.log(t, '111')
        console.log(valueMap.econPlatform, "valueMap.econPlatform")
        if (valueMap.econSalaryadj) {
            econSalaryadj = t.$parent.$refs[valueMap.econSalaryadj][0].formDataSubmit.econSalaryadj;//是否薪资调整
        }
        if (valueMap.econPlatform) {
            econPlatform = t.$parent.$refs[valueMap.econPlatform][0].formDataSubmit.econPlatform;//平台
        }
        if (valueMap.econStaff) {
            econStaff = t.$parent.$refs[valueMap.econStaff][0].formDataSubmit.econStaff;//分类
        }

        if (econPlatform) {

            if (econStaff) {
                if (econPlatform === 'bussector-04capital') {//资本平台
                    switch (econStaff) {
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
                } else if (econPlatform === 'bussector-01market') {//项目管理平台-营销中心
                    switch (econStaff) {
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
                    switch (econStaff) {
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
                EmpFlowConrenew.showHide(t, arr, 1);
            } else {
                EmpFlowConrenew.showHide(t, arr, 1);
            }
        } else {
            EmpFlowConrenew.showHide(t, arr, 1);
        }
        if (econSalaryadj == '0') {
            EmpFlowConrenew.showHide(t, arr1, 1);
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
            'econWagemon', 'econBasemon', 'econMonperf', 'econYubonus', 'econTransccu', 'econCommrate',
            'econComputer', 'econHealth', 'econSetcosts', 'econDay', 'econHours', 'econYmoneysum',
            'econOtherfei', 'econMarpoints', 'econYsalsum', 'econIntcomp', 'econExtercomp', 'econSalaryup'
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
    //
    // 列表回显
    // econSalaryadj_dis (t) {
    //     // console.log(t,'t');
    //     let empName = t.$refs[t.valueMap.empId][0].formDataSubmit["empId"]
    //     // debugger
    //     if (empName) {
    //         t.$refs[t.valueMap.econSalaryadj][0].dis.econSalaryadj = true;
    //     }else {
    //         t.$refs[t.valueMap.econSalaryadj][0].dis.econSalaryadj = false;
    //     }
    // }
}
export default EmpFlowConrenew;