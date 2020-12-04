
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
let gsBasepro = '';//基本比例
let gsAchipro = '';//绩效比例
let gsTranssub1 = '';//一线城市交通
let gsTranssub2 = '';//其他城市
const EmpFlowRegular = {
    all_dis () {
        EmpFlowRegular.setInitDisplays(this)
        EmpFlowRegular.initSetDis(this)
    },
    // initEnclosure(this){
        
    // },
    //年度佣金  佣金点数
    initSetDis(t){
        let efreYmoneysum = '';
        let efreMarpoints = '';
        if(t.valueMap.efreYmoneysum){
            efreYmoneysum=t.$refs[t.valueMap.efreYmoneysum][0].formDataSubmit.efreYmoneysum
            efreMarpoints=t.$refs[t.valueMap.efreMarpoints][0].formDataSubmit.efreMarpoints
            if(efreYmoneysum>0 && efreYmoneysum!==''){
                t.$refs[t.valueMap.efreMarpoints][0].dis.efreMarpoints = false
            }else{
                t.$refs[t.valueMap.efreMarpoints][0].dis.efreMarpoints = true
            }
            if(efreMarpoints>0 && efreMarpoints!==''){
                t.$refs[t.valueMap.efreYmoneysum][0].dis.efreYmoneysum = false
            }else{
                t.$refs[t.valueMap.efreYmoneysum][0].dis.efreYmoneysum = true
            }
        }
    },
     /**
     * @description: 基本工资带出
     * @param {*}
     * @return {*}
     */
    sumJBGZ(t){
        let efrePostid = t.$parent.$refs[t.$parent.valueMap.efrePostid][0].formDataSubmit.efrePostid;

        let place = t.$parent.$refs[t.$parent.valueMap.efreDailyspa][0].formDataSubmit.efreDailyspaDis;
        let efreRankidDis = t.$parent.$refs[t.$parent.valueMap.efreRankidDis][0].formDataSubmit.efreRankidDis;

        // if(node){
        //     let place = node.thisValue;
        // }
        if(efreRankidDis || efreRankidDis!==''){
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpFlowEntr.retentTransMoney',
                APentEmppoid: efrePostid
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let op = res.data.content[0];
                    if(op.hasOwnProperty('gsBasepro')) {
                        gsBasepro = res.data.content[0].gsBasepro;
                        gsAchipro = res.data.content[0].gsAchipro;
                        let gsTranssub1 = res.data.content[0].gsTranssub1;
                        let gsTranssub2 = res.data.content[0].gsTranssub2;
                        let obj = {//通讯津贴标准
                            'efreCommrate':res.data.content[0].gsCommsub
                        }
                        setValue(t, obj)
                        if(place !== '' && place !== undefined) {
                            if(place === '北京市' || place === '上海市' || place === '广州市' || place === '深圳市') {
                                setValue(t,{'efreTransccu':gsTranssub1})
                                console.log(place,gsTranssub1,'11111')
                            }else {
                                setValue(t,{'efreTransccu':gsTranssub2})
                                console.log(place,gsTranssub2,'22222222')
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
    callwai(t){
        let efrePostid = t.$parent.$refs[t.$parent.valueMap.efrePostid][0].formDataSubmit.efrePostid;
        let efreWagemon = t.$parent.$refs[t.$parent.valueMap.efreWagemon][0].formDataSubmit.efreWagemon;
        if(!efrePostid || efrePostid === ''||!efreWagemon || efreWagemon===''){
            return;
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.getAvgSal',
            APpostId: efrePostid,
        }).then((res) => {
            if (isSuccess(res, t)) {
                console.log(res, "res")
                if(res.data.content[0].hasOwnProperty('value')){
                    let val = res.data.content[0].value
                    if(val == 0){
                        val=1
                    }
                    let vals = ((Number(efreWagemon)/Number(val))*100).toFixed(2)
                    setValue(t, { 'efreIntcomp':vals})
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    efreProfeknow (node) {
        const t = this;
        EmpFlowRegular.efreSumscore_dis(t);
    },
    efrePerform (node) {
        const t = this;
        EmpFlowRegular.efreSumscore_dis(t);
    },
    efreTeamwork (node) {
        const t = this;
        EmpFlowRegular.efreSumscore_dis(t);
    },
    efreProactive (node) {
        const t = this;
        EmpFlowRegular.efreSumscore_dis(t);
    },
    efreShare (node) {
        const t = this;
        EmpFlowRegular.efreSumscore_dis(t);
    },
    /**
     * @description  合计分数
     * @param {*} node
     * @returns
     */
    efreSumscore_dis (t) {
        // efreProfeknow 专业知识 20%
        // efrePerform 工作业绩 30%
        // efreTeamwork 团队协作/管理 20%
        // efreProactive 积极主动 20%
        // efreShare 分享创新 10%
        // efreSumscore 合计分数
        let efreProfeknow = t.formDataSubmit.efreProfeknow;
        let efrePerform = t.formDataSubmit.efrePerform;
        let efreTeamwork = t.formDataSubmit.efreTeamwork;
        let efreProactive = t.formDataSubmit.efreProactive;
        let efreShare = t.formDataSubmit.efreShare;
        let sum = '';
        let num = '0';
        let obj = {};
        // console.log(efreProfeknow,"efreProfeknow")
        if(!isNaN(efreProfeknow) && !isNaN(efrePerform) && !isNaN(efreTeamwork) && !isNaN(efreProactive) && !isNaN(efreShare)
            && Number(efreProfeknow) > 0 && Number(efreProfeknow) <= 100
            && Number(efrePerform) > 0 && Number(efrePerform) <= 100
            && Number(efreTeamwork) > 0 && Number(efreTeamwork) <= 100
            && Number(efreProactive) > 0 && Number(efreProactive) <= 100
            && Number(efreShare) > 0 && Number(efreShare) <= 100
        ) {
            sum = (efreProfeknow * 0.2 + efrePerform * 0.3 + efreTeamwork * 0.2 + efreProactive * 0.2 + efreShare * 0.1);
            if(sum >= 60)  {
                num = '1';
                t.$parent.$refs[t.$parent.valueMap.efreConver][0].dis.efreConver = true;
            }else {
                t.$parent.$refs[t.$parent.valueMap.efreConver][0].dis.efreConver = false;
            }
            obj = {
                'efreSumscore': sum.toFixed(2).toString(),
                'efreConver': num
            }
            setValue(t, obj)
        }
    },
    /**
     * @description 月度工资标准 带出月度基本工资、月度绩效工资
     * @param {*} node
     */
    efreWagemon (node) {
        const t = this;
        if(t.formDataSubmit[node.ruleText] !== '') {
            let wagemon = t.formDataSubmit[node.ruleText] //月度工资标准
            let reg = /^(((\d)|([1-9]\d+))(\.\d+)?)$/
            if (reg.test(wagemon)) {
                if (!isNaN(gsBasepro) && !isNaN(gsAchipro)) {
                    let wage = Number(wagemon)
                    let baseRate = Number(gsBasepro);
                    let perfRate = Number(gsAchipro);
                    let obj = {
                        'efreBasemon': (wage * baseRate / 100).toFixed(2),
                        'efreMonperf': (wage * perfRate / 100).toFixed(2)
                    }
                    setValue(t, obj)
                }
                EmpFlowRegular.callwai(t)
                EmpFlowRegular.sumOutsalarycop(t)
                EmpFlowRegular.sumJBGZ(t)
                EmpFlowRegular.initAllData(t)
            }
        }
    },
     /**
     * @description: 外部薪酬竞争力
     * @param {*}
     * @return {*}
     */
    sumOutsalarycop (t) {
        let efrePostid = t.$parent.$refs[t.$parent.valueMap.efrePostid][0].formDataSubmit.efrePostid;
        let efreEntrydate = t.$parent.$refs[t.$parent.valueMap.efreEntrydate][0].formDataSubmit.efreEntrydate;
        let efreWagemon = t.$parent.$refs[t.$parent.valueMap.efreWagemon][0].formDataSubmit.efreWagemon;
        let efreDailyspa = t.$parent.$refs[t.$parent.valueMap.efreDailyspa][0].formDataSubmit.efreDailyspa;
        if (!efrePostid || efrePostid === '' || !efreEntrydate || efreEntrydate === '' || !efreWagemon || efreWagemon === '' || !efreDailyspa || efreDailyspa === '') {
            return;
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.retentCityAndMedian',
            APentCityId: efreDailyspa,
            APentDate: new Date(efreEntrydate).getFullYear(),
            APentPostId: efrePostid
        }).then((res) => {
            if (isSuccess(res, t)) {
                let op = res.data.content[0];
                if (op.gsMedian && op.cnNoun) {
                    let gsMed = Number(res.data.content[0].gsMedian);
                    let cnNoun = Number(res.data.content[0].cnNoun);
                    let sum = Number(efreWagemon) / (cnNoun * gsMed) * 100
                    setValue(t, { 'efreExtercomp': parseFloat(sum).toFixed(2) })
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    efreBasemon (node) {
        const t = this;
        EmpFlowRegular.efreYsalsum_dis(t)
    },
    efreTransccu (node) {
        const t = this;
        EmpFlowRegular.efreYsalsum_dis(t)
    },
    efreCommrate (node) {
        const t = this;
        EmpFlowRegular.efreYsalsum_dis(t)
    },
    efreAllowan (node) {
        const t = this;
        EmpFlowRegular.efreYsalsum_dis(t)
    },
    efreSetcosts (node) {
        const t = this;
        EmpFlowRegular.efreYsalsum_dis(t)
    },
    //营销点数
    efreMarpoints(node){
        const t = this
        let nodes = t.$parent.$refs
        let map = t.$parent.valueMap
        if(t.formDataSubmit[node.ruleText] !== ""){
            nodes[map.efreYmoneysum][0].dis.efreYmoneysum = false
        }else{
            nodes[map.efreYmoneysum][0].dis.efreYmoneysum = true
        }
    },
    //年度佣金总额
    efreYmoneysum (node) {
        const t = this;
        let nodes = t.$parent.$refs
        let map = t.$parent.valueMap
        if(t.formDataSubmit[node.ruleText] !== ""){
            nodes[map.efreMarpoints][0].dis.efreMarpoints = false
        }else{
            nodes[map.efreMarpoints][0].dis.efreMarpoints = true
        }
        EmpFlowRegular.efreYsalsum_dis(t)
    },
    efreOthermon (node) {
        const t = this;
        EmpFlowRegular.efreYsalsum_dis(t)
    },
      /**
     * @description: 初始获取值薪资涨幅
     * @param {*}
     * @return {*}
     */
    initAllData(t){
        console.log(t,'4556555')
        let empId = '';
        let efreYsalsum = '';
        if(t.$refs.empId || t.$refs.efreYsalsum){
            empId = t.$refs.empId.thisId
            efreYsalsum = t.$refs.efreYsalsum.thisValue
        }
        if(empId && empId !== ''){
            getDataLevelUserLoginData({
                _mt:t.$global.mt+'EmpInfo.getById',
                APid:empId,
                APffk: `gep${t.funId}`,
            }).then(res => {
                if(isSuccess(res, t)) {
                    // console.log(res,"resEMP")
                    let data = res.data.content[0];
                        let nian = data.empYtotalsum
                        if(nian && parseInt(nian)>1){
                            let efreSalaryup=(Number(efreYsalsum) - Number(nian))/ Number(nian)
                            if(efreSalaryup){
                                setValue(t,{'efreSalaryup':efreSalaryup.toFixed(2).toString()})
                            }
                        }else{
                            setValue(t,{'efreSalaryup':'0'})
                        }
                }
            })
        }
     },
    /**
     * @description （月基本工资标准+交通津贴+通讯津贴+管理津贴）×12+安家费+预估年度佣金总额，如果员工类型为实习生，则无需计算
     * @param {*} this
     */
    efreYsalsum_dis (t) {
        let valueMap = t.$parent.valueMap.efreStaff;
        let formshow  = t.formshow;
        let efreStaff = t.$parent.$refs[valueMap][0].formDataSubmit.efreStaff;
        if (efreStaff === 'empcategory-10trainee') {
            return;
        } else {
            let monjbgz = t.$refs.efreBasemon.thisValue //基本工资标准
            let wagemon = t.$refs.efreWagemon.thisValue //月度工资标准
            let transtandard = t.$refs.efreTransccu.thisValue //交通津贴
            let efrePlatform = t.$parent.$refs[t.$parent.valueMap.efrePlatform][0].formDataSubmit.efrePlatform //平台
            let txjt = t.$refs.efreCommrate.thisValue //通讯津贴
            let efreOthermon = t.$refs.efreOthermon.thisValue //其它
            let allowance = t.$refs.efreAllowan.thisValue //管理津贴
            let homecost = t.$refs.efreSetcosts.thisValue //安家费
            let ygyamount = t.$refs.efreYmoneysum.thisValue //预估年度佣金总额
            let mulMoney = 0;
            let allMoney = 0;
            if (!isNaN(wagemon) && formshow.efreWagemon !== undefined) {
                mulMoney += Number(wagemon);
            }
            //  if(efrePlatform==='bussector-01market'){
            //     if(efreStaff==='empcategory-05market' || efreStaff==='empcategory-01manager' ){
            //         if (!isNaN(wagemon) && formshow.efreWagemon !== undefined) {
            //             mulMoney += Number(wagemon);
            //         }
            //     }else{
            //         if (!isNaN(monjbgz) && formshow.efreBasemon !== undefined) {
            //             mulMoney += Number(monjbgz);
            //         }
            //     }
                
            // }else{
            //     if(efreStaff!=='empcategory-05market'){
            //         if (!isNaN(monjbgz) && formshow.efreBasemon !== undefined) {
            //             mulMoney += Number(monjbgz);
            //         }
            //     }else{
            //         if (!isNaN(wagemon) && formshow.efreWagemon !== undefined) {
            //             mulMoney += Number(wagemon);
            //         }
            //     }
            // }
            if(!isNaN(transtandard) && formshow.efreTransccu !== undefined) {
                mulMoney += Number(transtandard);
            }
            if(!isNaN(txjt) && formshow.efreCommrate !== undefined) {
                mulMoney += Number(txjt);
            }
            if(!isNaN(allowance) && formshow.efreAllowan !== undefined) {
                mulMoney += Number(allowance);
            }
            allMoney = mulMoney * 12;
            if(!isNaN(homecost) && formshow.efreSetcosts !== undefined) {
                allMoney += Number(homecost);
            }
            if(!isNaN(efreOthermon) && formshow.efreOthermon !== undefined) {
                allMoney += Number(efreOthermon);
            }
            if(!isNaN(ygyamount) && formshow.efreYmoneysum !== undefined) {
                allMoney += Number(ygyamount);
            }
            setValue(t, { 'efreYsalsum': allMoney.toFixed(2).toString() })
        }
    },
    efreSalaryadj(node){
        const t = this
        const parent = t.$parent
        let empName = parent.$refs[parent.valueMap.empId][0].formDataSubmit["empIdDis"]
        let empId = parent.$refs[parent.valueMap.empId][0].formDataSubmit["empId"]
        let isSaladj = parent.$refs[parent.valueMap.efreSalaryadj][0].formDataSubmit["efreSalaryadj"]
        if ( empName ) {
            if ( isSaladj === "1" ) {
                // 状态是，渲染薪酬信息
                EmpFlowRegular.setInitDisplay(t)
                //EmpFlowRegular.sumJBGZ(t)
                getDataLevelUserLoginData({
                    _mt:t.$global.mt+'EmpInfo.getById',
                    APid:empId,
                    APffk: `gep${t.funId}`
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        if(res.data.content[0]) {
                            let data = res.data.content[0];
                            if(data.hasOwnProperty('empMongzbz')){

                                let obj = {
                                    'efreWagemon': data.empMongzbz,
                                    'efreBasemon': data.empMonjbgz,
                                    'efreMonperf': data.empMonjxgz,
                                    'efreYubonus': data.empYgnzj,
                                    'efreTransccu': data.empTranstandard,
                                    'efreCommrate': data.empTxjt,
                                    'efreSetcosts': data.empAllowance,
                                    'efreOtherfei': data.empYgyxyj,
                                    'efreMarpoints': data.empYgyamount,
                                    'efreYmoneysum': data.empElse,
                                    'efreYsalsum': data.empYtotalsum,
                                    'efreIntcomp': data.empInsalarycop,
                                    'efreExtercomp': data.empOutsalarycop,
                                    'efreSalaryup': data.empSalaryinc
                                }
                                setValue(t, obj)
                            }
                        }
                    }
                })
            }else{
                let arr1 =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                EmpFlowRegular.showHide(t,arr1,1)
            }
        } else {
            t.$Modal.warning({
                title: t.$t('reminder.remind'),
                content: "请先选择员工数据",
            })
            return;
        }
    },
     //薪资初始化显示隐藏
     setInitDisplays (t) {
        let arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        let arr1 =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let valueMap = t.valueMap; 
        let efrePlatform = ''; //平台
        let efreStaff = ''; //员工分类
        let efreSalaryadj = '';//薪资是否调整
        let efreIsguanp = ''; //是否管培生
        console.log(t,'111')
        console.log(valueMap.efrePlatform, "valueMap.efrePlatform")
        if(valueMap.efreSalaryadj){
             efreSalaryadj = t.$refs[valueMap.efreSalaryadj][0].formDataSubmit.efreSalaryadj;//是否薪资调整
        }
        if (valueMap.efrePlatform) {
            efrePlatform = t.$refs[valueMap.efrePlatform][0].formDataSubmit.efrePlatform;//平台
        }
        if (valueMap.efreStaff) {
            efreStaff = t.$refs[valueMap.efreStaff][0].formDataSubmit.efreStaff;//分类
        }
        if (valueMap.efreIsguanp) {
            efreIsguanp = t.$refs[valueMap.efreIsguanp][0].formDataSubmit.efreIsguanp;//分类
        }
        if (efrePlatform) {
            if (efreStaff) {
                if (efrePlatform === 'bussector-04capital') {//资本平台
                    switch (efreStaff) {
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
                } else if (efrePlatform === 'bussector-01market') {//项目管理平台-营销中心
                    switch (efreStaff) {
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
                    switch (efreStaff) {
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
                EmpFlowRegular.showHide(t, arr,0);
            } else {
                EmpFlowRegular.showHide(t, arr, 0);
            }
        } else {
            EmpFlowRegular.showHide(t, arr, 0);
        }
        if(efreSalaryadj=='0'){
            EmpFlowRegular.showHide(t, arr1, 0);
       }
     },
        /**
     * @description 管理津贴字段，当所选平台为：资本平台时显示；预估营销佣金点数、预估年度佣金总额当所选平台为： 项目管理平台-营销中心 、资本平台显示
     *              日工资标准：当员工分类为实习生时，显示
     *              安家费：当是否管培生为“是”时显示
     * @param {*} node
     */
    setInitDisplay (t) {
        let arr1 =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let arr = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        let valueMap = t.$parent.valueMap; 
        let efrePlatform = ''; //异动后平台
        let efreStaff = ''; //员工分类
        let efreSalaryadj = '';//薪资是否调整
        let efreIsguanp = ''; //是否管培生
        console.log(t,'111')
        console.log(valueMap.efrePlatform, "valueMap.efrePlatform")
        if(valueMap.efreSalaryadj){
             efreSalaryadj = t.$parent.$refs[valueMap.efreSalaryadj][0].formDataSubmit.efreSalaryadj;//是否薪资调整
        }
        if (valueMap.efrePlatform) {
            efrePlatform = t.$parent.$refs[valueMap.efrePlatform][0].formDataSubmit.efrePlatform;//平台
        }
        if (valueMap.efreStaff) {
            efreStaff = t.$parent.$refs[valueMap.efreStaff][0].formDataSubmit.efreStaff;//分类
        }
        if (valueMap.efreIsguanp) {
            efreIsguanp = t.$parent.$refs[valueMap.efreIsguanp][0].formDataSubmit.efreIsguanp;//分类
        }
 
        if (efrePlatform) {
 
            if (efreStaff) {
                if (efrePlatform === 'bussector-04capital') {//资本平台
                    switch (efreStaff) {
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
                } else if (efrePlatform === 'bussector-01market') {//项目管理平台-营销中心
                    switch (efreStaff) {
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
                    switch (efreStaff) {
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
                EmpFlowRegular.showHide(t, arr, 1);
            } else {
                EmpFlowRegular.showHide(t, arr, 1);
            }
        } else {
            EmpFlowRegular.showHide(t, arr, 1);
        }
         if(efreSalaryadj=='0'){
             EmpFlowRegular.showHide(t, arr1, 1);
        }
        let arrs = ['efreSetcosts']
       if(efreIsguanp == '1'){
            displayEvent(t,1,arrs)
            setValue(t,{'efreSetcosts':'10000'})
        }else{
            displayEvent(t,0,arrs)
            setValue({t,'efreSetcosts':'0'})
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
            'efreWagemon', 'efreBasemon', 'efreMonperf', 'eftuYubonus', 'efreTransccu', 'efreCommrate',
            'econComputer', 'econHealth','efreAllowan', 'econDay', 'efreSetcosts', 'efreOthermon',
            'efreMarpoints', 'efreYmoneysum', 'efreYsalsum', 'efreIntcomp', 'efreExtercomp', 'efreSalaryup'
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
   
}
export default EmpFlowRegular