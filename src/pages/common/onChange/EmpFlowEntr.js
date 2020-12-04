/*
 * @Author: chneY 
 * @Date: 2020-10-05 10:54:03 
 * @Last Modified by: chenY
 * @Last Modified time: 2020-11-05 14:48:20
 */

import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import pinyin from '../../../../node_modules/js-pinyin/index'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
import EmpFlowTurnover from './EmpFlowTurnover';
let gsBasepro = '';//基本比例
let gsAchipro = '';//绩效比例
let gsTranssub1 = '';//一线城市交通
let gsTranssub2 = '';//其他城市
let rank = ''  //职等
const EmpFlowEntr = {
    all_dis () {
        EmpFlowEntr.entSbgjzpl_dis(this)
        EmpFlowEntr.setDisplay(this)
        EmpFlowEntr.entEmpedate_dis(this)
        EmpFlowEntr.entEmpcate_dis(this)
        EmpFlowEntr.Hosfhus_dis(this)
        EmpFlowEntr.setSdate(this)
        EmpFlowEntr.initSetDis(this)
        EmpFlowEntr.resetData(this)
        
    },
    /**
     * @description  姓名带出拼音和英文名
     * @param {*} node
     * @returns
     */
    entEmpname (node) {
        let pinyin = require('js-pinyin');
        pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
        let re = /[^\u4e00-\u9fa5]/;
        const isChinese = str => !re.test(str);
        if (!isChinese(node.value)) {
            return false;
        } else {
            let entEmppny = pinyin.getFullChars(node.value)
            let entEnname = pinyin.getCamelChars(node.value)
            // setValue(this, { 'entEmppny': entEmppny, 'entEnname': entEnname })
            setValue(this, { 'entEmppny': entEmppny })
        }
    },
    //背调是否通过
    entOnepass(node){
        const t =  this
       if(t.formDataSubmit[node.ruleText] !== ''){
        let value  = node.thisValue
        if(value == '0'){
            setValue(t,{'entTrigger':'1'})
        }else{
            setValue(t,{'entTrigger':'0'})
        }
       } 
    },
    /**
     * @description 身份证号带出性别和出生日期
     * @param {*} node
     */
    entIdcanum (node) {
        const t = this
        let userCardType = t.$refs.entIdcaype.thisValue
        if (userCardType == '01id') {
            let userCard = t.formDataSubmit[node.ruleText]
            if (userCard.length == 18) {
                let birth = userCard.substring(6, 10) + "-" + userCard.substring(10, 12) + "-" + userCard.substring(12, 14)
                if (birth) {
                    setValue(t, { 'entEmpbirdate': birth })
                }
                if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
                    setValue(t, { 'entEmpgender': '01male' })
                } else {
                    setValue(t, { 'entEmpgender': '02female' })
                }
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'EmpFlowEntr.checkentry',
                    APentIdcanum: userCard,
                    APentIdcaype: userCardType
                }).then((res) => {
                    if (isSuccess(res, t)) {
                        if (res.data.content[0].value === '0') {
                            setValue(t, { 'entEmpiscxemp': '0' })
                        } else {
                            setValue(t, { 'entEmpiscxemp': '1' })
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    },
    /**
     * @description: 上家公司税前月薪
     * @param {*}
     * @return {*}
     */
    entLcsqyx (node) {
        const t = this
       
            EmpFlowEntr.sumlcsqnx(t)
      
    },
    //上家公司交通补贴
    entLcjtbt(node){
        console.log('ssssss')
        const t = this
        
            EmpFlowEntr.sumlcsqnx(t)
       
    },
    //上家公司通讯补贴
    entLctxbt(node){
        const t = this
       
            EmpFlowEntr.sumlcsqnx(t)
        
    },
    //上家公司-餐饮补贴
    entCybt(node){
        const t = this
      
            EmpFlowEntr.sumlcsqnx(t)
       
    },
    //上家公司-住宿补贴
    entZsbt(node){
        const t = this
      
            EmpFlowEntr.sumlcsqnx(t)
       
    },
     //上家公司-其他补贴
     entLcqtbt(node){
        const t = this
     
            EmpFlowEntr.sumlcsqnx(t)
       
    },
     //上家公司-年节福利
     entLcnjfl(node){
        const t = this
     
            EmpFlowEntr.sumlcsqnx(t)
       
    },
     //上家公司-年终奖金
     entLcnzjj(node){
        const t = this
      
            EmpFlowEntr.sumlcsqnx(t)
       
    },
     //上家公司-其他奖金/佣金
     entLcqtyj(node){
        const t = this
      
            EmpFlowEntr.sumlcsqnx(t)
    
    },
    /**
     * @description: 上家公司税前年薪计算
     * @param {*}
     * @return {*}
     */
    sumlcsqnx (t) {
        let formshow = t.formshow;
        let lcsqyx = t.$refs.entLcsqyx.thisValue;
        let entLcjtbt = t.$refs.entLcjtbt.thisValue;
        let entLctxbt = t.$refs.entLctxbt.thisValue;
        let entCybt = t.$refs.entCybt.thisValue;
        let entZsbt = t.$refs.entZsbt.thisValue;
        let entLcqtbt = t.$refs.entLcqtbt.thisValue;
        let entLcnjfl = t.$refs.entLcnjfl.thisValue;
        let entLcnzjj = t.$refs.entLcnzjj.thisValue;
        let entLcqtyj = t.$refs.entLcqtyj.thisValue;
        let allSumMoney = 0
        if (!isNaN(lcsqyx) && formshow.entLcsqyx !== undefined) {
            allSumMoney += Number(lcsqyx)*12;
        }
        if (!isNaN(entLctxbt) && formshow.entLctxbt !== undefined) {
            allSumMoney += Number(entLctxbt)*12;
        }
        if (!isNaN(entCybt) && formshow.entCybt !== undefined) {
            allSumMoney += Number(entCybt)*12;
        }
        if (!isNaN(entLcjtbt) && formshow.entLcjtbt !== undefined) {
            allSumMoney += Number(entLcjtbt)*12
        }
        if (!isNaN(entZsbt) && formshow.entZsbt !== undefined) {
            allSumMoney += Number(entZsbt)*12;
        }
        if (!isNaN(entLcqtbt) && formshow.entLcqtbt !== undefined) {
            allSumMoney += Number(entLcqtbt)*12;
        }
        if (!isNaN(entLcnjfl) && formshow.entLcnjfl !== undefined) {
            allSumMoney += Number(entLcnjfl);
        }
        if (!isNaN(entLcnzjj) && formshow.entLcnzjj !== undefined) {
            allSumMoney += Number(entLcnzjj);
        }
        if (!isNaN(entLcqtyj) && formshow.entLcqtyj !== undefined) {
            allSumMoney += Number(entLcqtyj);
        }
        console.log(allSumMoney,'allSumMoney')
        if(allSumMoney!==0){
            setValue(t, { 'entLcsqnx': allSumMoney.toFixed(2).toString() })
        }else{
            setValue(t, { 'entLcsqnx': allSumMoney.toFixed(2).toString() })
        }
    },

    /**
     * @description: 
     * @param {*}
     * @return {*}
     */
    resetData (t) {
        //initSetValue(t, { 'eftuBankname': data.empNameid })
        let data = t.niceData
       console.log(t,'789456123')
       let valueMap = t.valueMap
       let self = t.$refs
       if(valueMap.entCompname && self[valueMap.entCompname][0].formDataSubmit.entCompname === ''){
           //公司名称
           initSetValue(t,{'entCompname':data.entLegalDis})
       }
       if(valueMap.entCposition && self[valueMap.entCposition][0].formDataSubmit.entCposition === ''){
           //公司职务
           initSetValue(t,{'entCposition':data.entDutyIdDis})
       }
       if(valueMap.entCmailbox && self[valueMap.entCmailbox][0].formDataSubmit.entCmailbox === ''){
           //邮箱C
          initSetValue(t,{'entCmailbox':data.entCommail})
       }
       if(valueMap.entContactnum && self[valueMap.entContactnum][0].formDataSubmit.entContactnum === ''){
           //手机号
           initSetValue(t,{'entContactnum':data.entMobile})
       }
       if(valueMap.entCaddress && self[valueMap.entCaddress][0].formDataSubmit.entCaddress === ''){
           //公司地址
           initSetValue(t,{'entCaddress':data.entLegtRegaddr})
       }
    },
    /**
     * @description 出生日期 带出实际出生日期
     * @param {*} node
    */
    entEmpbirdate (node) {
        // 出生日期
        // console.log(node.value,"entEmpbirdate");
        const t = this;
        // entSjbirth 实际出生日期
        if (node.value) {
            setValue(t, { 'entSjbirth': node.value })
        }
    },
    // entEmppoid(node){
    //     const t = this
    // },
    //外部薪酬竞争力
    callwai (t) {
        let entEmppoid = t.$parent.$refs[t.$parent.valueMap.entEmppoid][0].formDataSubmit.entEmppoid;
        let entMongzbz = t.$parent.$refs[t.$parent.valueMap.entMongzbz][0].formDataSubmit.entMongzbz;
        if (!entEmppoid || entEmppoid === '' || !entMongzbz || entMongzbz === '') {
            return;
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.getAvgSal',
            APpostId: entEmppoid,
        }).then((res) => {
            if (isSuccess(res, t)) {
                console.log(res, "res")
                if (res.data.content[0].hasOwnProperty('value')) {
                    let val = res.data.content[0].value
                    if (val == 0) {
                        val = 1
                    }
                    let vals = ((Number(entMongzbz) / Number(val)) * 100).toFixed(2)
                    setValue(t, { 'entInsalarycop': vals })
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * @description 选择推荐人 带出推荐奖
     * @param {*} 
     */
    callRank (t) {
        let entEmppoid = t.$parent.$refs[t.$parent.valueMap.entEmppoid][0].formDataSubmit.entEmppoid;
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.retentTjaward',
            APentEmppoid: entEmppoid,
        }).then((res) => {
            if (isSuccess(res, t)) {
                console.log(res, "res")
                if (res.data.content[0].hasOwnProperty('gsAward')) {
                    gsBasepro = res.data.content[0].gsBasepro;
                    gsAchipro = res.data.content[0].gsAchipro;
                    let obj = {
                        'entTjaward': res.data.content[0].gsAward,
                    }
                    setValue(t, obj)
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    /**
     * @description 汇报人 选择当前部门的员工;带教人 选择当前部门的员工
     * @param {*} node
     */
    entEmpdepid (node) {
        /**
         * 汇报人 选择当前部门的员工 ent_reporter
         * 带教人 选择当前部门的员工 ent_teacher
         * entEmpdepid 部门id、
         */
        const t = this;
        console.log(t, "t")
        if (t.formDataSubmit[node.ruleText] !== '') {
            let entEmpdepid = t.formDataSubmit[node.ruleText];
            t.formData.columns.forEach(item => {
                if (item.clmName === 'entReporter' || item.clmName === 'entTeacher') {
                    item.clmfilter = `empDeptid=$${entEmpdepid}`;
                    console.log(item, "itemmmmm")
                }
            })
        }
    },

    //是否缴纳社保公积金

    entPssechosf (node) {
        const t = this
        let arr = ['entLegal', 'entMonpay', 'entSsecsocial', 'entHosfsocial', 'entShprovider', 'entSsecinsbase', 'entEmailsup', 'entHosfhusbase']
        if (t.formDataSubmit[node.ruleText] === '1') {
            displayEvent(t, 1, arr)
        } else {
            displayEvent(t, 0, arr)
        }
    },
    /**
     * @description 选择岗位 带出职等信息
     * @param {*} node
     */

    //根据职级计算
    entRankinfoIdDis (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            rank = node.thisValue
            console.log(rank, '4414')
            switch (rank) {
                case '13':
                    setValue(t, { 'entTranstandard': '4500' })
                    break;
                case '12':
                    setValue(t, { 'entTranstandard': '3500' })
                    break;
            }
            EmpFlowEntr.sumJtTx(t)
            EmpFlowEntr.callRank(t)
            EmpFlowEntr.callwai(t)
        }
    },
    // entWorkplace (node) {

    // },
    // entRecqd (node) {
    //     const t = this
    //     let arr = ['entLtcompany']
    //     let arry = ['entEmpcomtid', 'entTjaward']
    //     if (t.formDataSubmit[node.ruleText] == '01headhunter') {
    //         displayEvent(t, 1, arr)
    //     } else {
    //         displayEvent(t, 0, arr)
    //     }
    //     if (t.formDataSubmit[node.ruleText] == '06internal') {
    //         displayEvent(t, 1, arry)
    //     } else {
    //         displayEvent(t, 0, arry)
    //     }
    // },
    entMongzbz (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            EmpFlowEntr.callRank(t)
            EmpFlowEntr.sumOutsalarycop(t)
            EmpFlowEntr.callwai(t)
            EmpFlowEntr.sumJtTx(t)
            EmpFlowEntr.sumBaseMony(t)
            EmpFlowEntr.sumallMoney(t)
            //EmpFlowEntr.sumOutsalarycop(t,node.thisValue)
        }
    },
    //营销佣金点数
    entYgyxyj(node){
        const t = this
        let nodes = t.$parent.$refs
        let map = t.$parent.valueMap
        if(t.formDataSubmit[node.ruleText] !== ""){
            nodes[map.entYgyamount][0].dis.entYgyamount = false
        }else{
            nodes[map.entYgyamount][0].dis.entYgyamount = true
        }
    },
    entEmpedate (node) {
        EmpFlowEntr.sumOutsalarycop(this)
    },
    sunmTxjt (t) {
        if (rank) {

            let rank1 = parseInt(rank)

            if (rank1 >= 12 && rank1 <= 13) {
                setValue(t, { 'entTxjt': '500' })
            }
            if (rank1 >= 9 && rank1 <= 10) {
                setValue(t, { 'entTxjt': '400' })
            }
            if (rank1 >= 7 && rank1 <= 8) {
                setValue(t, { 'entTxjt': '350' })
            }
            if (rank1 >= 5 && rank1 <= 6) {
                setValue(t, { 'entTxjt': '250' })
            }
            if (rank1 == 4) {
                setValue(t, { 'entTxjt': '200' })
            }
            if (rank1 == 3) {
                setValue(t, { 'entTxjt': '150' })
            }
            if (rank1 >= 1 && rank1 <= 2) {
                setValue(t, { 'entTxjt': '100' })
            }
        }
    },
    sumjtjt (t) {
        let rank1 = parseInt(rank)
        let place = t.$refs.entWorkplace.thisValue;
        if (place !== '' && place !== undefined) {
            if (place === '北京市' || place === '上海市' || place === '广州市' || place === '深圳市') {
                //EmpFlowEntr.sunmJtjt(t,1)
                if (rank1 >= 9 && rank1 <= 10) {
                    setValue(t, { 'entTranstandard': '2000' })
                }
                if (rank1 >= 7 && rank1 <= 8) {
                    setValue(t, { 'entTranstandard': '1500' })
                }
                if (rank1 >= 5 && rank1 <= 6) {
                    setValue(t, { 'entTranstandard': '600' })
                }
                if (rank1 == 4) {
                    setValue(t, { 'entTranstandard': '500' })
                }
                if (rank1 == 3) {
                    setValue(t, { 'entTranstandard': '300' })
                }
                if (rank1 >= 1 && rank1 <= 2) {
                    setValue(t, { 'entTranstandard': '200' })
                }

            } else {
                //EmpFlowEntr.sunmJtjt(t,2)
                if (rank1 >= 9 && rank1 <= 10) {
                    setValue(t, { 'entTranstandard': '1800' })
                }
                if (rank1 >= 7 && rank1 <= 8) {
                    setValue(t, { 'entTranstandard': '1200' })
                }
                if (rank1 >= 5 && rank1 <= 6) {
                    setValue(t, { 'entTranstandard': '500' })
                }
                if (rank1 == 4) {
                    setValue(t, { 'entTranstandard': '200' })
                }
                if (rank1 == 3) {
                    setValue(t, { 'entTranstandard': '150' })
                }
                if (rank1 >= 1 && rank1 <= 2) {
                    setValue(t, { 'entTranstandard': '100' })
                }

            }
        }
    },
    entWorkplace (node) {
        EmpFlowEntr.sumOutsalarycop(this)
        //EmpFlowEntr.sunmTxjt(this)
        const t = this;
        // let rank1 = parseInt(rank)
        // let place = node.thisValue;
        // EmpFlowEntr.sumjtjt(this)
        EmpFlowEntr.sumJtTx(t)
    },
    //交通津贴通讯津贴

    // sumJtTx(t){
    //     let entEmppoid = t.$parent.$refs[t.$parent.valueMap.entEmppoid][0].formDataSubmit.entEmppoid;
    //     let entWorkplace = t.$parent.$refs[t.$parent.valueMap.entWorkplace][0].formDataSubmit.entWorkplace;
    //     getDataLevelUserLoginData({
    //         _mt: t.$global.mt + 'EmpFlowEntr.retentTransMoney',
    //         APentPostId: entEmppoid
    //     }).then((res) => {
    //         if (isSuccess(res, t)) {
    //             let op = res.data.content[0];
    //             if (op) {
    //                 let transtandard = op.transtandard
    //                 let txjt =  op.txjt
    //                 if(!entWorkplace || entWorkplace === ''){
    //                     return
    //                 }else{
    //                     setValue(t,{'entTranstandard':transtandard})
    //                 }
    //                 setValue(t,{'entTxjt':txjt})

    //             }
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // },
    sumOutsalarycop (t) {
        let entEmppoid = t.$parent.$refs[t.$parent.valueMap.entEmppoid][0].formDataSubmit.entEmppoid;
        let entEmpedate = t.$parent.$refs[t.$parent.valueMap.entEmpedate][0].formDataSubmit.entEmpedate;
        let entWorkplace = t.$parent.$refs[t.$parent.valueMap.entWorkplace][0].formDataSubmit.entWorkplace;
        let entMongzbz = t.$parent.$refs[t.$parent.valueMap.entMongzbz][0].formDataSubmit.entMongzbz;
        if (!entEmppoid || entEmppoid === '' || !entEmpedate || entEmpedate === '' || !entWorkplace || entWorkplace === '' || !entMongzbz || entMongzbz === '') {
            return;
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowEntr.retentCityAndMedian',
            APentCityId: entWorkplace,
            APentDate: new Date(entEmpedate).getFullYear(),
            APentPostId: entEmppoid
        }).then((res) => {
            if (isSuccess(res, t)) {
                let op = res.data.content[0];
                if (op.gsMedian && op.cnNoun) {
                    let gsMed = Number(res.data.content[0].gsMedian);
                    let cnNoun = Number(res.data.content[0].cnNoun);
                    let sum = Number(entMongzbz) / (cnNoun * gsMed) * 100
                    setValue(t, { 'entOutsalarycop': parseFloat(sum).toFixed(2) })
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    sumBaseMony (t) {
        //let rankidh = t.$refs.eteaRankidhDis.thisValue; //职等
        // let rankidh = 5
        let wagemon = t.$refs.entMongzbz.thisValue //月度工资标准
        let reg = /^(((\d)|([1-9]\d+))(\.\d+)?)$/
        if (wagemon !== '' && reg.test(wagemon)) {
            if (gsBasepro !== '' && gsAchipro !== '') {
                // let rank = parseInt(rankidh)
                let wage = Number(wagemon)
                let baseRate = Number(gsBasepro);
                let perfRate = Number(gsAchipro);
                let obj = {
                    entMonjbgz: (wage * baseRate / 100).toFixed(2),
                    entMonjxgz: (wage * perfRate / 100).toFixed(2)
                }
                setValue(t, obj)
            }
        }
        EmpFlowEntr.sumJtTx(t)
    },
    entYgnzj(node){
        const t = this
        EmpFlowEntr.sumallMoney(t)
    },
    initSetDis(t){
        let entYgyamount = '';
        let entYgyxyj = '';
        if(t.valueMap.entYgyamount){
            entYgyamount=t.$refs[t.valueMap.entYgyamount][0].formDataSubmit.entYgyamount
            entYgyxyj=t.$refs[t.valueMap.entYgyxyj][0].formDataSubmit.entYgyxyj
            if(entYgyamount>0 && entYgyamount!==''){
                t.$refs[t.valueMap.entYgyxyj][0].dis.entYgyxyj = false
            }else{
                t.$refs[t.valueMap.entYgyxyj][0].dis.entYgyxyj = true
            }
            if(entYgyxyj>0 && entYgyxyj!==''){
                t.$refs[t.valueMap.entYgyamount][0].dis.entYgyamount = false
            }else{
                t.$refs[t.valueMap.entYgyamount][0].dis.entYgyamount = true
            }
        }
    },
    //预估年度佣金总额
    entYgyamount (node) {
        const t = this
        let nodes = t.$parent.$refs
        let map = t.$parent.valueMap
        if(t.formDataSubmit[node.ruleText] !== ""){
            nodes[map.entYgyxyj][0].dis.entYgyxyj = false
        }else{
            nodes[map.entYgyxyj][0].dis.entYgyxyj = true
        }
        EmpFlowEntr.sumallMoney(t)
    },
    entMonjbgz (node) {
        const t = this
        EmpFlowEntr.sumallMoney(t)
    },
    entTranstandard (node) {
        const t = this
        EmpFlowEntr.sumallMoney(t)
    },
    entTxjt (node) {
        const t = this
        EmpFlowEntr.sumallMoney(t)
    },
    entAllowance (node) {
        const t = this
        EmpFlowEntr.sumallMoney(t)
    },
    entHomecost (node) {
        const t = this
        EmpFlowEntr.sumallMoney(t)
    },
    ygnzj (node) {
        const t = this
        EmpFlowEntr.sumallMoney(t)
    },
    entElse (node) {
        const t = this
        EmpFlowEntr.sumallMoney(t)
    },
    sumallMoney (t) {
        let type = t.$parent.formDataSubmit.entEmpcate
        if (type == 'empcategory-10trainee') {
            return;
        } else {
            //let entPlatform = t.$parent.$refs[t.$parent.valueMap.entPlatform][0].formDataSubmit.entPlatform //平台
            let wagemon = t.$refs.entMongzbz.thisValue //月度工资标准
            let monjbgz = t.$refs.entMonjbgz.thisValue //基本工资标准
            let transtandard = t.$refs.entTranstandard.thisValue //交通津贴
            let txjt = t.$refs.entTxjt.thisValue //通讯津贴
            let allowance = t.$refs.entAllowance.thisValue //管理津贴
            let homecost = t.$refs.entHomecost.thisValue //安家费
            let ygyamount = t.$refs.entYgyamount.thisValue //预估年度佣金总额
            let ygnzj = t.$refs.entYgnzj.thisValue //预估年终奖
            let entElse = t.$refs.entElse.thisValue //其它
            let mulMoney = 0;
            let allMoney = 0;
            let formshow = t.formshow;
            if (!isNaN(wagemon) && formshow.entMongzbz !== undefined) {
                mulMoney += Number(wagemon);
            }
            // if (entPlatform === 'bussector-01market') {
            //     if (type === 'empcategory-05market' || type === 'empcategory-01manager') {
            //         if (!isNaN(wagemon) && formshow.entMongzbz !== undefined) {
            //             mulMoney += Number(wagemon);
            //         }
            //     } else {
            //         if (!isNaN(monjbgz) && formshow.entMonjbgz !== undefined) {
            //             mulMoney += Number(monjbgz);
            //         }
            //     }
            // } else {
            //     if (type !== 'empcategory-05market') {
            //         if (!isNaN(monjbgz) && formshow.entMonjbgz !== undefined) {
            //             mulMoney += Number(monjbgz);
            //         }
            //     } else {
            //         if (!isNaN(wagemon) && formshow.entMongzbz !== undefined) {
            //             mulMoney += Number(wagemon);
            //         }
            //     }
            // }
            if (!isNaN(transtandard) && formshow.entTranstandard !== undefined) {
                mulMoney += Number(transtandard);
            }
            if (!isNaN(txjt) && formshow.entTxjt !== undefined) {
                mulMoney += Number(txjt);
            }
            if (!isNaN(allowance) && formshow.entAllowance !== undefined) {
                mulMoney += Number(allowance);
            }
            allMoney = mulMoney * 12;
            if (!isNaN(homecost) && formshow.entHomecost !== undefined) {
                allMoney += Number(homecost);
            }
            if (!isNaN(entElse) && formshow.entElse !== undefined) {
                allMoney += Number(entElse);
            }
            if (!isNaN(ygyamount) && formshow.entYgyamount !== undefined) {
                allMoney += Number(ygyamount);
            }
            if (!isNaN(ygnzj) && formshow.entYgnzj !== undefined) {
                allMoney += Number(ygnzj);
            }
            console.log(allMoney,'allMoney')
            
            if (allMoney) {
                setValue(t, { 'entYtotalsum': allMoney.toFixed(2).toString()})
            }else{
                setValue(t, { 'entYtotalsum': allMoney.toFixed(2).toString()})
            }
        }
    },
    /**
     * @description 薪资涨幅
     * @param {*} node
     */
    entYtotalsum (node) {
        const t = this
        let num1 = node.thisValue;
        let valueMap = t.$parent.valueMap;
        let num2 = 0;
        if (valueMap.entLcsqnx) {
            num2 = t.$parent.$refs[valueMap.entLcsqnx][0].formDataSubmit.entLcsqnx;
        }
        // let map = t.$parent.valueMap.entLcsqnx;
        // let num2 =  t.$parent.$refs[map][0].formDataSubmit.entLcsqnx;
        // console.log(num1,num2,"number")
        let rate = '';
        if (num1 && num2) {
            rate = (((num1 - num2) / num2) * 100).toFixed(2)
            if(num2==0){

                setValue(t, { 'entSalaryinc': '0' })
            }else{
                setValue(t, { 'entSalaryinc': rate })
            }
        } else {
            rate = ''
        }
        // console.log(rate,"rate")
    },
    /**
     * @description 薪资涨幅
     * @param {*} node
     */
    entLcsqnx (node) {
        const t = this
        let num1 = node.thisValue;
        let map = t.$parent.valueMap.entYtotalsum;
        let num2 = t.$parent.$refs[map][0].formDataSubmit.entYtotalsum;
        // console.log(num1,num2,"nummmm")
        let rate = '';
        if (num1 && num2) {
            rate = (((num2 - num1) / num1) * 100).toFixed(2)
            if(num1==0){

                setValue(t, { 'entSalaryinc': '0' })
            }else{
                setValue(t, { 'entSalaryinc': rate })
            }
        } else {
            rate = ''
        }
        // console.log(rate,"rate")
    },
    /**
     * @description 合同开始日期 计算：合同结束日期 & 试用期开始日期 & 试用期结束日期
     * @param {*} node
     */
    entSdate (node) {
        const t = this;
        EmpFlowEntr.entSdate_dis(t, node);
        setValue(t, { 'entPeriodsdate': node.thisValue })
    },
    /**
     * @description 合同开始日期 计算：合同结束日期 & 试用期开始日期 & 试用期结束日期
     * @param {*} node
     */
    entCondur (node) {
        const t = this;
        EmpFlowEntr.entSdate_dis(t);
    },
    /**
    * @description 社保缴纳月份默认为入职日期
    * @param {*} node
    */
    entEmpedate_dis (t) {
        if (t.valueMap.entEmpedate) {
            let valueMap = t.valueMap.entEmpedate;
            let entEmpedate = t.$refs[valueMap][0].$refs.entEmpedate;
            let value = entEmpedate.thisValue;
            if (value) {
                // console.log(value,"daaaaa")
                if (t.valueMap.entMonpay) {
                    if (!t.$refs[t.valueMap.entMonpay][0].$refs.entMonpay.thisValue) {
                        let sDate = new Date(value);
                        let y = sDate.getFullYear();
                        let m = sDate.getMonth() + 1;
                        let date = y + '-' + (m < 10 ? '0' + m : m);
                        t.$refs[t.valueMap.entMonpay][0].$refs.entMonpay.thisValue = date;
                        t.$refs[t.valueMap.entMonpay][0].formDataSubmit.entMonpay = date;
                        // console.log(date,"date")
                    }
                }
            }
        }
    },
    //初始化合同开始  试用开始日期
    // initSetSdates(t){
    //     //入职日期
    //     let entEmpedate = t.data[0].entEmpedate
    //     console.log(entEmpedate,'111111')
    //     initSetValue(t,{'entSdate':entEmpedate})
    //     initSetValue(t,{'entPeriodsdate':entEmpedate})
    // },
    // 社保公积金缴纳地带出社保缴纳地和公积金缴纳地
    entSbgjzpl_dis (t) {
        // ent_ssecsocial 社保缴纳地
        // ent_hosfsocial 公积金缴纳地
        if (t.valueMap.entSbgjzpl) {
            let valueMap = t.valueMap.entSbgjzpl;

            let value = t.$refs[valueMap][0].formDataSubmit.entSbgjzplDis;
            let id = t.$refs[valueMap][0].formDataSubmit.entSbgjzpl;
            if (value && id) {
                if(t.valueMap.entSsecsocial){
                    if (!t.$refs[t.valueMap.entSsecsocial][0].$refs.entSsecsocial.thisId) {
                        t.$refs[t.valueMap.entSsecsocial][0].$refs.entSsecsocial.thisValue = value;
                        t.$refs[t.valueMap.entSsecsocial][0].formDataSubmit.entSsecsocial = id;
                    }
                }
                if(t.valueMap.entHosfsocial){
                    if (!t.$refs[t.valueMap.entHosfsocial][0].$refs.entHosfsocial.thisId) {
                        t.$refs[t.valueMap.entHosfsocial][0].$refs.entHosfsocial.thisValue = value;
                        t.$refs[t.valueMap.entHosfsocial][0].formDataSubmit.entHosfsocial = id;
                    }
                }
            }
        }
    },

    /**
    * @description 员工分类为营销一线人员 带出：住房公积金基数 & 社会保险基数
    * @param {*} node
    */
    entEmpcate_dis (t) {
        // console.log(t,"tttttttttttttttttt")
        // console.log(t.$children,"children");
        // if(t.valueMap.entEmpcate) {
        //     let valueMap = t.valueMap.entEmpcate;
        //     let entEmpcate =  t.$refs[valueMap][0].$refs.entEmpcate;
        //     let value = entEmpcate.thisValue;
        //     if(value) {
        //         console.log(value,"valueeeeeee")
        //         if(value === ''){}
        //     }
        // }
    },
    entPeriodsdate (node) {
        const t = this
        EmpFlowEntr.periodedate_dis(t)
    },
    entTperiod (node) {
        const t = this
        EmpFlowEntr.periodedate_dis(t)
    },
    //试用开始计算结束
    periodedate_dis (t) {
        // 试用期限 entTperiod
        //试用期开始日期 entPeriodsdate
        // 试用期结束日期 entPeriodedate
        let addMonth = t.formDataSubmit.entTperiod
        let periodsdate = t.formDataSubmit.entPeriodsdate
        let months = parseInt(addMonth)
        console.log(addMonth, '3333555841111111')
        if (periodsdate !== '' && months !== NaN) {
            let enDates = new Date(periodsdate)
            let m = enDates.getMonth() + 1
            let qLastMonth = m + months
            enDates.setMonth(qLastMonth)
            let y = enDates.getFullYear()
            let mm = enDates.getMonth()
            let day = enDates.getDate() - 1
            let days = y + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day)
            if (days) {
                setValue(t, { 'entPeriodedate': days })
            }
        }
    },
    /**
     * @description 合同开始日期 计算：合同结束日期 & 试用期开始日期 & 试用期结束日期
     * @param {*} node
     */

    entSdate_dis (t, node) {
        let entSdate = t.$refs.entSdate.thisValue;
        let entCondur = t.$refs.entCondur.thisValue;
        let date = '';
        let smy = '';
        if (entSdate !== '') {
            let initYear = parseInt(entCondur)
            if (initYear >= 1 && initYear < 10) {
                //console.log(addYear,'11111113333337777777')
                let enDates = new Date(entSdate)
                enDates.setFullYear(enDates.getFullYear() + initYear)
                let m = enDates.getMonth() + 1
                let y = enDates.getFullYear()
                let qLastMonth = (Math.floor(m / 3) + 1) * 3
                enDates.setMonth(qLastMonth)
                enDates.setDate(0)
                let mm = enDates.getMonth() + 1
                let day = enDates.getDate()
                let days = y + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (day < 10 ? '0' + day : day)
                if (days) {
                    //    t.formEmpValidate.empconYedate = days
                    setValue(t, { 'entEdate': days })
                } else {
                    setValue(t, { 'entEdate': '' })
                }
            } else {
                setValue(t, { 'entEdate': '' })
            }
        }
        // if (entSdate) {
        //     if (node && node !== undefined) {
        //         setValue(t, { 'entPeriodsdate': node.value });
        //     }
        //     let initYear = parseInt(entCondur)
        //     if(initYear>=1 && initYear<10){

        //         let sDate = new Date(entSdate);
        //         let y = sDate.getFullYear();//年份
        //         let m = sDate.getMonth() + 1;//月份
        //         let d = sDate.getDate();//日
        //         let firstDay = new Date(y, m, 1)//当月第一天
        //         let lastDay = (new Date(firstDay.getTime() - 1000 * 60 * 60 * 24)).getDate();//当月最后一天
        //         if (t.$refs.entTperiod.thisValue) {
        //             let x = t.$refs.entTperiod.thisValue;
        //             let sm = Number(x) + Number(sDate.getMonth() + 1);
        //             let sy = y;
        //             let sd = d;
        //             if (sm > 12) {
        //                 sm = sm - 12;
        //                 sy = y + 1;
        //             }
        //             if (sd === lastDay) {
        //                 if (sm === 2) {
        //                     sd = 28;
        //                 }
        //                 if (sm === 1 || sm === 3 || sm === 5 || sm === 7 || sm === 8 || sm === 10 || sm === 12) {
        //                     sd = 31;
        //                 }
        //                 if (sm === 4 || sm === 6 || sm === 9 || sm === 11) {
        //                     sd = 30;
        //                 }
        //             }
        //             smy = sy + '-' + (sm < 10 ? '0' + sm : sm) + '-' + (sd < 10 ? '0' + sd : sd)
        //         }
        //         if (m % 3 !== 0) {
        //             m = (Math.floor(m / 3) + 1) * 3
        //         }
        //         date = (Number(y) + entCondur) + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
        //         setValue(t, { 'entEdate': date });

        //     } else {
        //         setValue(t, { 'entPeriodsdate': '' });
        //     }
        //     setValue(t, { 'entPeriodedate': smy });
        //     }
        // 试用期限 entTperiod
        // 试用期开始日期 entPeriodsdate
        // 试用期结束日期 entPeriodedate
    },
    ent_reporter (node) {
        const t = this;
        console.log(t, "ttt")
    },
    /**
     * @description 安家费：当是否管培生为“是”时显示
     * @param {*} node
     */
    entEmpisgps (node) {
        const t = this;
        let entPlatform = t.formDataSubmit.entPlatform;//平台
        let entEmpisgps = t.formDataSubmit[node.ruleText];
        let arr = ['entHomecost']

        if (t.formDataSubmit[node.ruleText] !== '') {
            EmpFlowEntr.sumJtTx(t)
            EmpFlowEntr.sumallMoney(t)
            if (entEmpisgps === '1') {
                displayEvent(t,1,arr)

                setValue({ 'entHomecost': '10000' })
            } else {

                displayEvent(t, 0,arr)

                setValue({ 'entHomecost': '0' })
            }
            // if (entPlatform) {
            //     if (entPlatform === 'bussector-04capital') {
            //         let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1];
            //         let arr1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //         if (entEmpisgps === '1') {
            //             EmpFlowEntr.showHide(t, arr, 1)

            //             setValue({ 'entHomecost': '10000' })
            //         } else {

            //             EmpFlowEntr.showHide(t, arr1, 1)

            //             setValue({ 'entHomecost': '0' })
            //         }
            //     } else {
            //         let arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
            //         let arr1 = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //         if (entEmpisgps === '1') {
            //             EmpFlowEntr.showHide(t, arr, 1)

            //             setValue({ 'entHomecost': '10000' })
            //         } else {
            //             EmpFlowEntr.showHide(t, arr1, 1)

            //             setValue({ 'entHomecost': '0' })
            //         }
            //     }
            // } else {
            //     let arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
            //     let arr1 = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
            //     if (entEmpisgps === '1') {
            //         EmpFlowEntr.showHide(t, arr, 1)
            //         setValue({ 'entHomecost': '10000' })
            //     } else {
            //         EmpFlowEntr.showHide(t, arr1, 1)
            //         setValue({ 'entHomecost': '0' })
            //     }
            // }

        }
    },

    //设置参保时间
    setSdate (t) {
        if(t.valueMap.entEmpedate){
            console.log('ent_cbdate','789')
            let valueMap = t.valueMap.entEmpedate;
    
            let entEmpedate = t.$refs[valueMap][0].$refs.entEmpedate;
            let value = entEmpedate.thisValue;
            if(value){
                initSetValue(t,{'entCbdate':value})
            }
        }
        if(t.valueMap.entOnepass){
            let valueMap = t.valueMap.entOnepass;
    
            let entOnepass = t.$refs[valueMap][0].$refs.entOnepass;
            let value = entOnepass.thisValue;
            if(value == '0'){
                initSetValue(t,{'entTrigger':'1'})
            }else{
                initSetValue(t,{'entTrigger':'0'})
            }
        }
    },
    // //是否管培生显示隐藏
    // entEmpisgps (node) {
    //     const t = this
    //     let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
    //     if (node.value === '1') {
    //         EmpFlowEntr.showHide(t, arr, 0)
    //     }

    // },
    /**
  * @description: 交通津贴  通讯津贴赋值
  * @param {*}
  * @return {*}
  */
    sumJtTx (t) {
        let entEmppoid = t.$parent.$refs[t.$parent.valueMap.entEmppoid][0].formDataSubmit.entEmppoid;
        console.log(t, '5555555')
        let place = t.$refs.entWorkplace.thisValue


        //let econRankinfoDis = t.$parent.$refs[t.$parent.valueMap.econRankinfoDis][0].formDataSubmit.econRankinfoDis;
        // if(node){
        //     let place = node.thisValue;
        // }
        if (entEmppoid || entEmppoid !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpFlowEntr.retentTransMoney',
                APentEmppoid: entEmppoid
            }).then((res) => {
                if (isSuccess(res, t)) {
                    let op = res.data.content[0];
                    gsBasepro = res.data.content[0].gsBasepro;
                    gsAchipro = res.data.content[0].gsAchipro;
                    let gsTranssub1 = res.data.content[0].gsTranssub1;
                    let gsTranssub2 = res.data.content[0].gsTranssub2;
                    let obj = {//通讯津贴标准
                        'entTxjt': res.data.content[0].gsCommsub
                    }
                    setValue(t, obj)
                    if (place !== '' && place !== undefined) {
                        if (place === '北京市' || place === '上海市' || place === '广州市' || place === '深圳市') {
                            setValue(t, { 'entTranstandard': gsTranssub1 })
                            console.log(place, gsTranssub1, '11111')
                        } else {
                            setValue(t, { 'entTranstandard': gsTranssub2 })
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
     * @description 管理津贴字段，当所选平台为：资本平台时显示；预估营销佣金点数、预估年度佣金总额当所选平台为： 项目管理平台-营销中心 、资本平台显示
     *              日工资标准：当员工分类为实习生时，显示
     *              安家费：当是否管培生为“是”时显示
     * @param {*} node
     */
    setDisplay (t) {
        let entEmpedate =''
         //入职日期
         if(t.valueMap){

              entEmpedate = t.$refs[t.valueMap.entEmpedate][0].formDataSubmit.entEmpedate
         }
         console.log(entEmpedate,'111111')
         initSetValue(t,{'entSdate':entEmpedate})
         initSetValue(t,{'entPeriodsdate':entEmpedate})
         //debugger
        // let arr =[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        let valueMap = t.valueMap;
        let entPlatform = '';
        let entEmpcate = '';
        let entEmpisgps = '';
        let arrs = ['entHomecost']
        console.log(valueMap.entPlatform, "valueMap.entPlatform")
        if (t.niceData) {
            //entPlatform = t.$refs[valueMap.entPlatform][0].formDataSubmit.entPlatform;//平台
            entPlatform = t.niceData.entPlatform;//平台
        }
        if (t.niceData) {
            //entEmpcate = t.$refs[valueMap.entEmpcate][0].formDataSubmit.entEmpcate;//分类
            entEmpcate = t.niceData.entEmpcate;//分类
        }
        if (t.niceData) {
            //entEmpisgps = t.$refs[valueMap.entEmpisgps][0].formDataSubmit.entEmpisgps;//管培生
            entEmpisgps = t.niceData.entEmpisgps;//管培生
        }

        /**
         * ent_empisgps 是否是管培生
         * ent_homecost 安家费
         * 
         */
        if (entPlatform) {
            if (entEmpcate) {
                if (entPlatform === 'bussector-04capital') {//资本平台
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        initDisplayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        initDisplayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                } else if (entPlatform === 'bussector-01market') {//项目管理平台-营销中心
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        initDisplayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        initDisplayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                } else {
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        initDisplayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        initDisplayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                }
                EmpFlowEntr.showHide(t, arr, 0);
                if (entEmpisgps === '1') {
                    initDisplayEvent(t,1,arrs)
                    setValue({ 'entHomecost': '10000' })
                } else {
                    initDisplayEvent(t, 0,arrs)
                    setValue({ 'entHomecost': '0' })
                }
            } else {
                EmpFlowEntr.showHide(t, arr, 0);
                if (entEmpisgps === '1') {
                    initDisplayEvent(t,1,arrs)
                    setValue({ 'entHomecost': '10000' })
                } else {
                    initDisplayEvent(t, 0,arrs)
                    setValue({ 'entHomecost': '0' })
                }
            }
        } else {
            EmpFlowEntr.showHide(t, arr, 0);
            if (entEmpisgps === '1') {
                initDisplayEvent(t,1,arrs)
                setValue({ 'entHomecost': '10000' })
            } else {
                initDisplayEvent(t, 0,arrs)
                setValue({ 'entHomecost': '0' })
            }
        }
        // if (valueMap.entEmpisgps || entPlatform) {
        //    if(valueMap.entEmpisgps && entEmpisgps === '1'){
        //        entEmpisgps = t.$refs[valueMap.entEmpisgps][0].formDataSubmit.entEmpisgps;
        //        arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
        //        EmpFlowEntr.showHide(t, arr, 0);
        //        initSetValue({ 'entHomecost': '10000' })
        //    }else {
                //EmpFlowEntr.showHide(t, arr1, 0);
        //     }
        // }

        // /**
        //  * 汇报人 选择当前部门的员工 ent_reporter
        //  * 带教人 选择当前部门的员工 ent_teacher
        //  * entEmpdepid 部门id、
        //  */
        // // console.log(valueMap.entEmpdepid,"valueMap.entEmpdepid")
        // if (valueMap.entEmpdepid) {
        //     let entEmpdepid = t.$refs[valueMap.entEmpdepid][0].formDataSubmit.entEmpdepid;
        //     // console.log(entEmpdepid,"entEmpdepid")
        //     t.$refs[valueMap.entEmpdepid][0].formData.columns.forEach(item => {
        //         if(item.clmName === 'entReporter' || item.clmName === 'entTeacher') {
        //             item.clmfilter = `empDeptid=$${entEmpdepid}`;
        //             console.log(item,"itemmmmm")
        //         }
        //     })
        // }
        // console.log(t,"t")
    },
    entPlatform (node) {
        const t = this;
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let arrs = ['entHomecost']
        //let arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        if (t.formDataSubmit[node.ruleText] !== '') {
            let entPlatform = t.formDataSubmit[node.ruleText];//平台
            let entEmpcate = t.formDataSubmit.entEmpcate;//员工分类
            let entEmpisgps = t.$refs.entEmpisgps.thisValue;
            console.log(entEmpcate, "entEmpcate")
            console.log(entEmpisgps, "entEmpisgps")
            EmpFlowEntr.sumJtTx(t)
            EmpFlowEntr.sumallMoney(t)
            if (entEmpcate && entPlatform) {
                if (entPlatform === 'bussector-04capital') {//资本平台
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        displayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        displayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                } else if (entPlatform === 'bussector-01market') {//项目管理平台-营销中心
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        displayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        displayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                } else {
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        displayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        displayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                }
                EmpFlowEntr.showHide(t, arr, 1);
                if (entEmpisgps === '1') {
                    displayEvent(t,1,arrs)
                    setValue({ 'entHomecost': '10000' })
                } else {
                    displayEvent(t, 0,arrs)
                    setValue({ 'entHomecost': '0' })
                }
            } else {
                //EmpFlowEntr.showHide(t, arr, 1);
            }
        } else {
            // EmpFlowEntr.showHide(t, arr, 1);
        }

        // let entPlatform = t.formDataSubmit[node.ruleText];//平台
        // let showVal = ['entAllowance']
        // let showBlock = ['entYgyxyj,entYgyamount']
        // if (entPlatform === 'bussector-01market') {
        //     displayEvent(t, 1, showBlock)
        // } else {
        //     displayEvent(t, 0, showBlock)
        // }
        // if (entPlatform === 'bussector-04capital') {
        //     displayEvent(t, 1, showVal)
        //     displayEvent(t, 1, showBlock)
        // } else {
        //     displayEvent(t, 0, showVal)
        //     displayEvent(t, 0, showBlock)

        // }
    },
    //初始化社会保险 住房公积金赋值
    Hosfhus_dis (t) {
        // let val = t.valueMap.entEmpcate
        let entEmpcate = ''//员工分类
        let entMongzbz = ''
    if(t.valueMap.entEmpcate ){
        entEmpcate = t.$refs[t.valueMap.entEmpcate][0].formDataSubmit.entEmpcate//员工分类
    }
    if(t.niceData.entMongzbz){
        entMongzbz = t.niceData.entMongzbz===''?'0':t.niceData.entMongzbz
        
    }
      if(entEmpcate ==='empcategory-05market'){
        console.log(t,'121212121212')
            initSetValue(t,{'entHosfhusbase':'1000'})
            initSetValue(t,{'entSsecinsbase':'1000'})
        }else{
            initSetValue(t,{'entHosfhusbase':entMongzbz})
            initSetValue(t,{'entSsecinsbase':entMongzbz})
        }
    },
    entEmpcate (node) {
        const t = this;
        // let arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
        let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let arrs = ['entHomecost']
        if (t.formDataSubmit[node.ruleText] !== '') {
            let entPlatform = t.formDataSubmit.entPlatform;//平台
            let entEmpcate = t.formDataSubmit[node.ruleText];//员工分类
            let entEmpisgps = t.$refs.entEmpisgps.thisValue;
            console.log(entPlatform, "entPlatform")
            if (entEmpcate === 'empcategory-10trainee') {
                setValue(t, { 'entYtotalsum': '0' })
            }
            EmpFlowEntr.sumJtTx(t)
            EmpFlowEntr.sumallMoney(t)
            if (entPlatform && entEmpcate) {
                if (entPlatform === 'bussector-04capital') {//资本平台
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        displayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        displayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                } else if (entPlatform === 'bussector-01market') {//项目管理平台-营销中心
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        displayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        displayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                } else {
                    switch (entEmpcate) {
                        case 'empcategory-01manager'://管理人员
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-05market'://营销一线人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-10trainee'://实习生
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-15consultant'://顾问
                            arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
                            break;
                        case 'empcategory-25out'://外部人员
                            arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            break;
                        case 'empcategory-30support'://后勤辅助(保洁/司机/厨师)
                            arr = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
                            break;
                    }
                    if (entEmpisgps === '1') {
                        displayEvent(t,1,arrs)
                        setValue({ 'entHomecost': '10000' })
                    } else {
                        displayEvent(t, 0,arrs)
                        setValue({ 'entHomecost': '0' })
                    }
                }
                EmpFlowEntr.showHide(t, arr, 1);
                if (entEmpisgps === '1') {
                    displayEvent(t,1,arrs)
                    setValue({ 'entHomecost': '10000' })
                } else {
                    displayEvent(t, 0,arrs)
                    setValue({ 'entHomecost': '0' })
                }
            } else {
                //EmpFlowEntr.showHide(t, arr, 1);
            }
        } else {
            // EmpFlowEntr.showHide(t, arr, 1);
        }
    },
    showHide (t, arr, init) {
        let dom = [
            'entMongzbz', 'entMonjbgz', 'entMonjxgz', 'entYgnzj', 'entTranstandard', 'entTxjt',
            'entCpubt', 'entTjbt', 'entAllowance', 'entDaygzbz', 'entHomecost', 'entElse',
            'entYgyxyj', 'entYgyamount', 'entYtotalsum', 'entInsalarycop', 'entOutsalarycop', 'entSalaryinc'
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
     * @description: 启动背调日期
     * @param {*}
     * @return {*}
     */
    entBddate (node) {
        const t = this
        if (t.formDataSubmit[node.ruleText] !== '') {
            let modelDate = t.$refs.entBddate.thisValue
            let modelDates = new Date(modelDate)
            let date = new Date()
            if (modelDates <= date) {
                t.$Modal.warning({
                    title: '提示',
                    content: '启动背调日期时间不能小于当前时间',
                })
                setValue(t, { 'entBddate': '' })
            }

        }
    }

}
export default EmpFlowEntr
