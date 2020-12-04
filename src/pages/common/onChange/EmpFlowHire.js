
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
let threeGears = 0;//薪酬三档值
let deptAvg = 0;//同部门标准
let postAvg = 0;//同岗位标准
let ChildDataBloks = []
const EmpFlowHire = {
    all_dis () {
        EmpFlowHire.empBumd_is(this);
        EmpFlowHire.emphMode_dis(this);
        EmpFlowHire.disabled_dis(this);
        EmpFlowHire.zhidang_dis(this);
        EmpFlowHire.place_disabled(this);
        let arr = [
            {emphPaycg: 'emphPaycgm'},
            {emphRankcg: 'emphRankcgm'},
            {emphXlcg: 'emphXlcgm'},
            {emphSecg: 'emphSecgm'}
        ]
        EmpFlowHire.init_required(this, arr)
        if(this.stepCode === "flow_hire_1100" && this.stepState !== "p_flowst_3") {
            EmpFlowHire.emphIdnum_dis(this, 0);
        }
        // ChildDataBloks = this.ChildDataBloks
        EmpFlowHire.init_childTable(this)
        EmpFlowHire.init_gufubi(this)
        EmpFlowHire.init_emphPayb(this)
    },
    empBumd_is(t){
        initDisplayEvent(t, 0, ['empBumdDis'])
    },
    emphCname (node) {
        let pinyin = require('js-pinyin');
        pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
        let re = /^[\u4e00-\u9fa5]{1}$/;
        const isChinese = str => !re.test(str);
        if (!isChinese(node.value)) {
            return false;
        } else {
            let entEmppny = pinyin.getFullChars(node.value)
            let entEnname = pinyin.getCamelChars(node.value)
            setValue(this, { 'emphPinyin': entEmppny })
        }
    },
    /**
     * @description 身份证号带出性别和出生日期
     * @param {*} node
     */
    // emphMaincostcen(node){
    //     debugger
    //     const t = this
    //     emphMaincostcen = t.formDataSubmit[node.ruleText]
    //     if(t.$refs.emphIdtype.thisValue.emphDeptid){
            
    //     }
    // },
    emphIdnum (node) {
        const t = this
        let emphIdtype = t.$refs.emphIdtype.thisValue//emphIdtype
        if (emphIdtype == '01id') {
            let userCard = t.formDataSubmit[node.ruleText]
            if (userCard.length == 18) {
                let date = new Date();
                let year = date.getFullYear();
                let age = year - Number(userCard.substring(6, 10));
                // console.log(year,"year")
                // console.log(age,"age")
                setValue(t, {'emphAge': age.toString()})
                if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
                    setValue(t, { 'emphGender': '01male' })
                } else {
                    setValue(t, { 'emphGender': '02female' })
                }
                EmpFlowHire.emphIdnum_dis(t, 1);
            }
        }
    },
    emphIdtype (node) {
        const t = this;
        EmpFlowHire.emphIdnum_dis(t, 1);
    },
    /**
     * @description 入职地点带出入职地点地址
     * @param {*} node
     */
    emphEncity (node){
        const t = this;
        // if(node.thisId !== t.formDataSubmit[node.ruleText] || !node.thisValue)
        if(t.formDataSubmit[node.ruleText] !== '' && t.formDataSubmit[node.ruleText] !== undefined) {
            let placeId = t.formDataSubmit[node.ruleText]
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'BaseEntplace.getById',
                APid: placeId,
                APffk: ''
            }).then(res => {
                if(isSuccess(res, t)) {
                    if(JSON.stringify(res.data.content[0]) !== '{}') {
                        let data = res.data.content[0];
                        if(data.entIsycser === '0') {
                            setValue(t, {'emphEncityad': data.entAddr})
                            t.dis.emphEncityad = false
                        }else {
                            setValue(t, {'emphEncityad': ''})
                            t.dis.emphEncityad = true
                        }
                    }
                }
            })
        }else {
            setValue(t, {'emphEncityad': ''})
            t.dis.emphEncityad = true
        }
    },
    place_disabled(t){
        if(t.valueMap.emphEncity) {
            let placeId = t.$refs[t.valueMap.emphEncity][0].formDataSubmit.emphEncity
            if(placeId) {
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'BaseEntplace.getById',
                    APid: placeId,
                    APffk: ''
                }).then(res => {
                    if(isSuccess(res, t)) {
                        if(JSON.stringify(res.data.content[0]) !== '{}') {
                            let data = res.data.content[0];
                            if(data.entIsycser === '0') {
                                t.$refs[t.valueMap.emphEncity][0].dis.emphEncityad = false
                            }else {
                                t.$refs[t.valueMap.emphEncity][0].dis.emphEncityad = true
                            }
                        }
                    }
                })
            }
        }
    },
    /**
     * @description 员工类别显示隐藏
     * @param {*} node
     */
    emphMode (node) {
        const t = this;
        if(t.formDataSubmit[node.ruleText] !== '') {
            let emphMode = t.formDataSubmit[node.ruleText];
            let rankId = t.formDataSubmit.emphRankid;
            let emphIsthirteen = t.$parent.$refs[t.$parent.valueMap.emphIsthirteen][0].formDataSubmit.emphIsthirteen
            let arr = [];
            let gufubi = ['emphGbidDis','emphFbidDis']
            switch(emphMode) {
                case '01regular'://正式员工
                    arr = [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
                    if(t.$parent.thisSetpName !== '') {
                        t.$parent.ChildDataBloks = ChildDataBloks
                        t.$parent.showSum = true
                    }
                    if(emphIsthirteen === '1') {
                        displayEvent(t, 0, gufubi)
                    }else {
                        displayEvent(t, 1, gufubi)
                    }
                    break;
                case '03intern'://实习生
                    arr = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                    let obj = {
                        'emphPaybz': '',
                        'emphPayb': ''
                    }
                    if(t.$parent.thisSetpName !== '') {
                        t.$parent.ChildDataBloks = ChildDataBloks.slice(ChildDataBloks.length - 1)
                        t.$parent.showSum = false
                    }
                    displayEvent(t, 0, gufubi)
                    setValue(t, obj)
                    break;
                case '04contract'://劳务人员
                    arr = [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
                    if(t.$parent.thisSetpName !== '') {
                        t.$parent.ChildDataBloks = ChildDataBloks
                        t.$parent.showSum = true
                    }
                    if(emphIsthirteen === '1') {
                        displayEvent(t, 0, gufubi)
                    }else {
                        displayEvent(t, 1, gufubi)
                    }
                    break;
            }
            EmpFlowHire.showHide(t, arr)
            if(emphMode !== '03intern') {
                if(rankId) {
                    EmpFlowHire.zhidang(t, rankId);
                    EmpFlowHire.buzhu(t, rankId);
                    EmpFlowHire.gufubi(t, rankId);
                    EmpFlowHire.rankAboverules(t)
                }
                EmpFlowHire.emphPayb_dis(t);
            }
            EmpFlowHire.emphIdnum_dis(t, 1)
        }
    },
    /**
     * @description 是否13薪 隐藏固浮比 计算奖金和固定收入
     * @param {*} node
     */
    emphIsthirteen (node) {
        const t = this;
        let value = t.formDataSubmit[node.ruleText];
        let arr = ['emphGbidDis', 'emphFbidDis'];
        let emphMode = t.$parent.$refs[t.$parent.valueMap.emphMode][0].formDataSubmit.emphMode;
        if(value === '1' || emphMode === '03intern') {
            displayEvent(t, 0, arr)
        }else {
            let rankId = t.$parent.$refs[t.$parent.valueMap.emphRankid][0].formDataSubmit.emphRankid;
            if(rankId) {
                EmpFlowHire.gufubi(t, rankId);
            }
            displayEvent(t, 1, arr)
        }
    },
    /**
     * @description 学历超规
     * @param {*} node
     */
    emphFxuel (node) {
        const t = this;
        if(t.formDataSubmit[node.ruleText] !== '') {
            let emphFxuel = t.formDataSubmit[node.ruleText];
            let num = '0';
            if(emphFxuel === '1999before') {
                num = '1';
            }
            setValue(t, {'emphXlcg': num})
        }
    },
    /**
     * @description 岗位选择后清空级联
     * @param {*} node
     */
    emphDeptpid(node) {
        const t = this;
        let postType = t.formDataSubmit.emphPostype;
        if(node.thisValue !== '' && node.thisValue !== undefined) {
            EmpFlowHire.emphPayb_dis(t);
            if(postType === 'staff' || postType === 'teamleader') {
                getDataLevelUserLoginData({
                    _mt: t.$global.mt + 'OrgPost.getById',
                    APffk:'0',
                    APid: node.thisId
                }).then( res => {
                    if(isSuccess(res, t)) {
                        if(res.data.content[0]) {
                            let data = res.data.content[0];
                            // let obj = {
                            //     'emphRankid': data.rankId,
                            //     'emphRankidDis': data.rankIdDis
                            // }
                            // setValue(t, obj)
                            t.$refs.emphRankid.thisValue = data.rankIdDis
                            t.$refs.emphRankid.thisId = data.rankId
                            t.$store.state.flowClmkMap.popForm.emphRankid = data.rankId
                        }
                    }
                })
            }
        }
        if(node.thisId !== t.formDataSubmit[node.ruleText] || !node.thisValue) {
            EmpFlowHire.emptyOut(t)
        }
    },
    /**
     * @description 职级超规
     * @param {*} node
     */
    rankAboverules(t){
        let num = '0';
        let rank = t.$refs.emphRankid.thisValue;
        if(Number(rank) > 3) {
            num = '1';
        }
        setValue(t, {'emphRankcg': num})
    },
    /**
     * @description 薪酬超规说明必填
     * @param {*} node
     */
    emphPaycg (node) {
        const t = this;
        EmpFlowHire.required(t, node, 'emphPaycgm')
    },
    /**
     * @description 职级超规说明必填
     * @param {*} node
     */
    emphRankcg (node) {
        const t = this;
        EmpFlowHire.required(t, node, 'emphRankcgm')
    },
    /**
     * @description 学历超规说明必填
     * @param {*} node
     */
    emphXlcg (node) {
        const t = this;
        EmpFlowHire.required(t, node, 'emphXlcgm')
    },
    /**
     * @description 二次入职超规说明必填
     * @param {*} node
     */
    emphSecg (node) {
        const t = this;
        EmpFlowHire.required(t, node, 'emphSecgm')
    },
    emptyOut (t) {
        let obj = {
            'emphXulid': '',
            'emphXulidDis': '',
            'empBumdIdDis': '',
            'empBusrIdDis': ''
        }
        setValue(t, obj);
        t.$refs.emphXulidDis.thisValue = ''
        t.$refs.empBumdIdDis.thisValue = ''
        t.$refs.empBusrIdDis.thisValue = ''
    },
    emphRankid (node) {
        const t = this;
        // emphGbid;emphGbidDis
        // emphFbid;emphFbidDis
        // emphMhbt,emphMcbt,emphMbt,emphMjtbt,emphMotbt
        if(node.thisValue !== '' && node.thisValue !== undefined && t.formDataSubmit.hasOwnProperty(node.ruleText)) {
            let rankId = t.formDataSubmit[node.ruleText];
            if(rankId) {
                EmpFlowHire.rankAboverules(t)
                EmpFlowHire.zhidang(t,rankId);
                EmpFlowHire.buzhu(t,rankId);
                EmpFlowHire.gufubi(t, rankId);
            }
            setTimeout(() => {
                EmpFlowHire.emphPayb_dis(t);
            }, 20);
        }else {
            let obj = {
                'emphPaybz': '',
                'emphPaybzDis': '',
                'emphGbid': '',
                'emphGbidDis': '',
                'emphFbid': '',
                'emphFbidDis': '',
                'emphMhbt': '',
                'emphMcbt': '',
                'emphMbt': '',
                'emphMjtbt': '',
                'emphMotbt': '',
                'emphYsubsidy': ''
            }
            setValue(t, obj)
        }
    },
    gufubi (t, id) {
        getDataLevelUserLoginData({
            _mt:t.$global.mt + 'BaseSofrat.getByRankid',
            APrankid: id
        }).then(res => {
            if(isSuccess(res, t)) {
                // console.log(res.data.content[0]);
                // emph_gbid  	emph_gbid_dis 固比
                // emph_fbid   emph_fbid_dis  浮比
                if(res.data.content[0]) {
                    let data = res.data.content[0];
                    let obj = {
                        'emphGbid': data.sofrSolid,
                        'emphGbidDis': data.sofrSolid,
                        'emphFbid': data.sofrFloat,
                        'emphFbidDis': data.sofrFloat
                    }
                    setValue(t, obj)
                }
            }
        })
    },
    buzhu (t, id) {
        getDataLevelUserLoginData({
            _mt:t.$global.mt + 'OrgZhijimonth.getByRankid',
            APrankid: id
        }).then(res => {
            if(isSuccess(res, t)) {
                if(res.data.content[0]) {
                    // console.log(res,"ressss")
                    let data = res.data.content[0];
                    let arr = [];
                    let sum = 0;
                    arr.push(data.zfmoZfbt,data.zfmoCfbt,data.zfmoTxbt,data.zfmoJtbt,data.zfmoQtbt)
                    for(let i=0;i<arr.length;i++) {
                        if(arr[i]) {
                            sum += arr[i] * 12;
                        }
                    }
                    let obj = {
                        'emphMhbt': data.zfmoZfbt,
                        'emphMcbt': data.zfmoCfbt,
                        'emphMbt': data.zfmoTxbt,
                        'emphMjtbt': data.zfmoJtbt,
                        'emphMotbt': data.zfmoQtbt,
                        'emphYsubsidy': sum.toFixed(2)
                    }
                    setValue(t, obj)
                }
            }
        })
    },
    zhidang (t, id) {
        threeGears = 0;
        getDataLevelUserLoginData({
            _mt:t.$global.mt + 'OrgZhijidang.getByRankid',
            APrankid: id
        }).then(res => {
            if(isSuccess(res, t)) {
                if(res.data.content[0].value) {
                    let data = res.data.content[0].value.split(',');
                    let id = data[0].split(':')[1];
                    let i=0;
                    for(;i<data.length;) {
                        if(data[i].split(':')[0] === 'Ⅲ档') {
                            threeGears = data[i].split(':')[1];
                            break;
                        }
                        i++;
                    }
                    if(i === data.length) {
                        threeGears = 0;
                    }
                    let obj = {
                        'emphPaybz': id,
                        'emphPaybzDis': res.data.content[0].value
                    }
                    setValue(t, obj)
                    t.$store.commit('flowList/setThreeGears',threeGears)
                }else {
                    let obk = {
                        'emphPaybz': '',
                        'emphPaybzDis': ''
                    }
                    setValue(t, obk)
                    t.$store.commit('flowList/setThreeGears',0)
                }
            }
        })
    },
    zhidang_dis(t) {
        if(t.valueMap.emphRankid) {

            let id = t.$refs[t.valueMap.emphRankid][0].formDataSubmit.emphRankid;
            // console.log(id,"id");
            if(id !== '' && id !== undefined) {
                getDataLevelUserLoginData({
                    _mt:t.$global.mt + 'OrgZhijidang.getByRankid',
                    APrankid: id
                }).then(res => {
                    if(isSuccess(res, t)) {
                        if(res.data.content[0].value) {
                            let data = res.data.content[0].value.split(',');
                            let i=0;
                            for(;i<data.length;) {
                                if(data[i].split(':')[0] === 'Ⅲ档') {
                                    threeGears = data[i].split(':')[1];
                                    break;
                                }
                                i++;
                            }
                            if(i === data.length) {
                                threeGears = 0;
                            }
                            t.$store.commit('flowList/setThreeGears',threeGears)
                        }
                    }
                })
            }
        }
    },
    /**
     * @description 薪酬超规
     * @param {*} node
     */
    emphYzcost (node) {
        const t = this;
        EmpFlowHire.sum(t);
        // EmpFlowHire.emphPayb_dis(t);
        if(t.formDataSubmit[node.ruleText] !== '') {
            let currentIncome = t.formDataSubmit[node.ruleText];
            let originIncome = t.$store.state.flowList.originIncome;
            let valueMap = t.$parent.valueMap;
            // console.log(t,"t")
            let emphIspftc = '';
            let emphIsylqy = '';
            let emphComptype = '';
            let rate = 0;
            let rate1 = '';
            let rate2 = '';
            if(valueMap.emphIspftc) {
                emphIspftc = t.$parent.$refs[valueMap.emphIspftc][0].formDataSubmit.emphIspftc;// emph_ispftc 频繁跳槽
            }
            if(valueMap.emphIsylqy) {
                emphIsylqy = t.$parent.$refs[valueMap.emphIsylqy][0].formDataSubmit.emphIsylqy;// emph_isylqy 一流企业
            }
            if(valueMap.emphComptype) {
                emphComptype = t.$parent.$refs[valueMap.emphComptype][0].formDataSubmit.emphComptype;// emph_comptype 事业单位/公务员/国企员工
            }
            // 薪酬比率
            let deptId = t.$parent.$refs[valueMap.emphDeptid][0].formDataSubmit.emphDeptid;
            let postId = t.$parent.$refs[valueMap.emphDeptpid][0].formDataSubmit.emphDeptpid;
            // debugger
            if(postId && deptId) {
                let three = threeGears !== 0 ? (Number(currentIncome) / threeGears * 100).toFixed(2) : '0.00';
                let deptAvgXz = Number(deptAvg) !== 0 ? (Number(currentIncome) / Number(deptAvg) * 100).toFixed(2) : '0.00';
                let postAvgxXz = Number(postAvg) !== 0 ? (Number(currentIncome) / Number(postAvg) * 100).toFixed(2) : '0.00';
                deptAvgXz = `建议薪酬/同部门平均标准：${deptAvgXz}%`
                postAvgxXz = `建议薪酬/同岗位平均标准：${postAvgxXz}%`
                three = `建议薪酬/薪酬标准3档值：${three}%`
                let arr = [deptAvgXz,postAvgxXz,three];
                let obj = {
                    'emphPayb': arr.join(','),
                    'emphPaybDis': arr.join(',')
                }
                setValue(t, obj);
            }
            // 年度总收入增幅
            if(!isNaN(currentIncome) && Number(currentIncome)!== 0 && t.$parent.thisSetpName !== '') {
                let totalGrowth = (Number(currentIncome) - Number(originIncome)) / Number(currentIncome) * 100;
                // console.log(totalGrowth,"totalGrowth")
                setValue(t, {'emphYzcz': totalGrowth.toFixed(2)})
            }else {
                setValue(t, {'emphYzcz':'0.00'})
            }
            // 薪酬超规
            if(threeGears && !isNaN(currentIncome)) {
                rate = Number(currentIncome) / Number(threeGears);
                // console.log(rate,"rate")
                if(rate > 1) {
                    setValue(t, {'emphPaycg': '1'})
                    return
                }else {
                    setValue(t, {'emphPaycg': '0'})
                }
            }
            if(!isNaN(currentIncome) && !isNaN(originIncome) && Number(originIncome) !== 0 && Number(currentIncome) !== 0) {
                rate1 = (currentIncome - originIncome) / currentIncome;
                rate2 = currentIncome / originIncome;
                // console.log(originIncome,"originIncome")
                if(emphIspftc === '1') {
                    if(rate1 > 0.05) {
                        // this.$parent.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                        setValue(t, {'emphPaycg': '1'})
                    }else{
                        setValue(t, {'emphPaycg': '0'})
                    }
                }else {
                    if(emphComptype === '1') {
                        if(rate2 > 0.75) {
                            // this.$parent.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                            setValue(t, {'emphPaycg': '1'})
                        }else {
                            setValue(t, {'emphPaycg': '0'})
                        }
                    }else {
                        if(emphIsylqy === '1') {
                            if(rate1 > 0.5) {
                                // this.$parent.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                                setValue(t, {'emphPaycg': '1'})
                            }else {
                                setValue(t, {'emphPaycg': '0'})
                            }
                        }else {
                            if(rate1 > 0.25) {
                                // this.$parent.$refs[valueMap.emphPaycg][0].formDataSubmit.emphPaycg = '1';
                                setValue(t, {'emphPaycg': '1'})
                            }else {
                                setValue(t, {'emphPaycg': '0'})
                            }
                        }
                    }
                }
            }
        }
    },
    /**
     * @description 年度固定收入增幅
     * @param {*} node
     */
    emphYgcost (node) {
        const t = this;
        let fixedIncome = t.$store.state.flowList.fixedIncome;
        if(t.formDataSubmit[node.ruleText] !== '' && t.$parent.thisSetpName !== '') {
            let emphYgcost = t.formDataSubmit[node.ruleText];
            if(!isNaN(fixedIncome) && !isNaN(emphYgcost) && Number(emphYgcost) !== 0  && t.$parent.thisSetpName !== '') {
                let fixGroth = (Number(emphYgcost) - Number(fixedIncome))/Number(emphYgcost) * 100;
                setValue(t, {'emphYgcz': fixGroth.toFixed(2)})
            }else {
                setValue(t, {'emphYgcz': '0.00'})
            }
        }
    },
    /**
     * @description 二次入职超规  emphIdnum（证件号）   emphIdtype（证件类型）
     * @param {*} node
     */
    emphIdnum_dis(t, init) {
        // EmpBaseinfo.getEmpByIdnum
        let emphIdnum = '';
        let emphIdtype = '';
        if(t.valueMap) {
            emphIdnum = t.$refs[t.valueMap.emphIdnum][0].formDataSubmit.emphIdnum;
            emphIdtype = t.$refs[t.valueMap.emphIdtype][0].formDataSubmit.emphIdtype;
        }  else if(t.$parent.valueMap){
            emphIdnum = t.$parent.$refs[t.$parent.valueMap.emphIdnum][0].formDataSubmit.emphIdnum;
            emphIdtype = t.$parent.$refs[t.$parent.valueMap.emphIdtype][0].formDataSubmit.emphIdtype;
        } else {
            emphIdnum = t.formDataSubmit.emphIdnum;
            emphIdtype = t.formDataSubmit.emphIdtype;
        }
        // console.log(t,"t")
        // console.log(emphIdtype,"emphIdtype")
        // console.log(emphIdnum,"emphIdnum")
        if(emphIdtype !== '' && emphIdtype !== undefined) {
            if(emphIdnum !== '' && emphIdnum !== undefined) {
                getDataLevelUserLoginData({
                    _mt:t.$global.mt + 'EmpBaseinfo.getEmpByIdnum',
                    empPopcode:emphIdnum,
                    empPaptype:emphIdtype
                }).then(res => {
                    if(isSuccess(res, t)) {
                        // console.log(res.data.content[0].value);
                        if(res.data.content[0].value == 1) {
                            if(init) {
                                setValue(t, {'emphSecg': '1'})
                            }else {
                                initSetValue(t, {'emphSecg': '1'})
                            }
                            // setValue(t, {'emphSecg': '1'})
                        }else {
                            // setValue(t, {'emphSecg': '0'})
                            if(init) {
                                setValue(t, {'emphSecg': '0'})
                            }else {
                                initSetValue(t, {'emphSecg': '0'})
                            }
                        }
                    }
                })
            }
        }
    },
     /**
     * @description 薪酬比率
     * @param {*} node
     */
    emphPayb_dis (t) {
        // console.log(t,"ttt")
        let valueMap = t.$parent.valueMap;
        let emphDeptpid = t.$parent.$refs[valueMap.emphDeptpid][0].formDataSubmit.emphDeptpid;
        let emphDeptid = t.$parent.$refs[valueMap.emphDeptid][0].formDataSubmit.emphDeptid;
        let emphYzcost = t.$parent.$refs[valueMap.emphYzcost][0].formDataSubmit.emphYzcost;
        if(emphDeptpid && emphDeptid) {
            getDataLevelUserLoginData({
                _mt:t.$global.mt + 'EmpBaseinfo.getAllEmpAvgxz',
                APdeptid: emphDeptid,
                APpostid:emphDeptpid
            }).then(res => {
                // console.log(res,"resss")
                if(res.data.content[0].value) {
                    let data = res.data.content[0].value.split(',');
                    let arr = [];
                    let three = threeGears !== 0 ? (Number(emphYzcost) / threeGears * 100).toFixed(2) : '0.00';
                    for(let val of data) {
                        let v = val.split(':');
                        let s = '';
                        let n = Number(v[1]) !== 0 ? (Number(emphYzcost) / Number(v[1]) * 100).toFixed(2) : '0.00'
                        if(v[0] === 'deptAvgXz') {
                            s = `建议薪酬/同部门平均标准：${n}%`
                            deptAvg = v[1]
                        }
                        if(v[0] === 'postAvgxXz') {
                            s = `建议薪酬/同岗位平均标准：${n}%`
                            postAvg = v[1]
                        }
                        arr.push(s);
                    }
                    three = `建议薪酬/薪酬标准3档值：${three}%`
                    arr.push(three);
                    // console.log(three,"three")
                    // console.log(arr,"arrrr")
                    let obj = {
                        'emphPayb': arr.join(','),
                        'emphPaybDis': arr.join(',')
                    }
                    setValue(t, obj);
                }else {
                    let obk = {
                        'emphPayb': '',
                        'emphPaybDis': ''
                    }
                    setValue(t, obk);
                }
            })
        }
    },
    emphGbidDis (node) {
        const t = this;
        EmpFlowHire.sum(t);
    },
    emphFbidDis (node) {
        const t = this;
        EmpFlowHire.sum(t);
    },
    emphPostype (node) {
        const t = this;
        t.$refs.emphDeptpid.thisId = ''
        t.$refs.emphDeptpid.thisValue = ''
        let dis = false;
        switch(this.formDataSubmit[node.ruleText]) {
            case 'cadre':
                dis = true;
                break;
            case 'keyposition':
                dis = true;
                break;
            case 'staff':
                dis = false;
                break;
            case 'teamleader':
                dis = false;
                break;
        }
        t.dis.emphRankid = dis;
        EmpFlowHire.emphPostype_dis(t);
    },
    disabled_dis(t) {
        let postType = '';
        let dis = false;
        if(t.valueMap.emphPostype) {
            postType = t.$refs[t.valueMap.emphPostype][0].formDataSubmit.emphPostype;
            switch(postType) {
                case 'cadre':
                    dis = true;
                    break;
                case 'keyposition':
                    dis = true;
                    break;
                case 'staff':
                    dis = false;
                    break;
                case 'teamleader':
                    dis = false;
                    break;
            }
            t.$refs[t.valueMap.emphPostype][0].dis.emphRankid = dis;
        }
    },
    emphDeptid (node) {
        const t = this;
        EmpFlowHire.emphPostype_dis(t);
        EmpFlowHire.emphPayb_dis(t);
    },
    emphPostype_dis (t) {
        let emphPostype = t.formDataSubmit.emphPostype;
        let emphDeptid = t.$refs.emphDeptid.thisId;
        let emphDeptidDis = t.$refs.emphDeptid.thisValue;
        t.formData.columns.forEach(item => {
            if(item.clmName === 'emphDeptpid') {
                if(emphPostype !== '') {
                    if(emphDeptid !== '' && emphDeptidDis !== '') {
                        let filter = '';
                        switch(emphPostype) {
                            case 'cadre':
                                filter = `postType//$cadre;postDeptid=$${emphDeptid}`
                                break;
                            case 'staff':
                                filter = `postType//$staff`
                                break;
                            case 'teamleader':
                                filter = `postType//$teamleader`
                                break;
                            case 'keyposition':
                                filter = `postType//$keyposition;postDeptid=$${emphDeptid}`
                                break;
                        }
                        item.clmfilter = filter;
                    }else {
                        switch(emphPostype) {
                            case 'cadre':
                                item.clmfilter = `postType//$cadre`
                                break;
                            case 'staff':
                                item.clmfilter = `postType//$staff`
                                break;
                            case 'teamleader':
                                item.clmfilter = `postType//$teamleader`
                                break;
                            case 'keyposition':
                                item.clmfilter = `postType//$keyposition`
                                break;
                        }
                    }
                }
            }
        })
    },
    sum (t) {
        let sum = t.$refs.emphYzcost.thisValue; //年度现金总收入
        let solid_rate = t.$refs.emphGbidDis.thisValue;//固定比例
        let float_rate = t.$refs.emphFbidDis.thisValue;//浮动比例
        let reg = /^(((\d)|([1-9]\d+))(\.\d+)?)$/;
        let emphYgcost,emphMzcost,emphYbonus;
        let emphIsthirteen = t.formDataSubmit.emphIsthirteen;
        if(sum != '0' && reg.test(sum)) {
            if(emphIsthirteen === '0') {
                if(solid_rate !== '' && solid_rate !== undefined) {
                    emphYgcost = (sum * (solid_rate / 10)).toFixed(2);
                    emphMzcost = (emphYgcost / 12).toFixed(2);
                }else {
                    emphYgcost = '';
                    emphMzcost = '';
                }
                if(float_rate !=='' && float_rate !== undefined) {
                    emphYbonus = (sum * (float_rate / 10)).toFixed(2);
                }else {
                    emphYbonus = ''
                }
            }else {
                emphYgcost = (sum * 12 / 13).toFixed(2)
                emphMzcost = (emphYgcost / 12).toFixed(2)
                emphYbonus = (sum / 13).toFixed(2)
            }
        }else {
            emphYgcost = ''
            emphMzcost = ''
            emphYbonus = ''
        }
        let obj = {
            'emphYgcost' : emphYgcost,
            'emphMzcost' : emphMzcost,
            'emphYbonus' : emphYbonus
        }
        setValue(t, obj)
    },
    emphMode_dis (t) {
        let valueMap = t.valueMap;
        let emphMode = '';
        if(valueMap.emphMode) {
            emphMode  = t.$refs[valueMap.emphMode][0].formDataSubmit.emphMode;//分类
        }
        if(emphMode) {
            switch(emphMode) {
                case '01regular'://正式员工
                    initDisplayEvent(t, 0, ['emphDailywage'])
                    break;
                case '03intern'://实习生
                    let arr = ['emphYzcost','emphIsthirteen','emphYgcost','emphSyqdiscount',
                    'emphYbonus','emphMzcost','emphMhbt','emphMbt','emphMcbt','emphMjtbt','emphYsubsidy',
                    'emphMotbt','emphYgcz','emphYzcz','emphQrgfb','emphMaincostcen','emphPaybzDis','emphPaybDis',
                    'emphPaycg','emphPaycgm','emphRankcg','emphRankcgm','emphSecg','emphSecgm'];
                    initDisplayEvent(t, 0, arr)
                    break;
                case '04contract'://劳务人员
                    initDisplayEvent(t, 0, ['emphDailywage'])
                    break;
            }
        }
    },
    showHide (t, arr) {
        // 'emphGbidDis','emphFbidDis',
        let dom = [
            'emphDailywage','emphYzcost','emphIsthirteen','emphYgcost','emphSyqdiscount',
            'emphYbonus','emphMzcost','emphMhbt','emphMbt','emphMcbt','emphMjtbt','emphYsubsidy',
            'emphMotbt','emphYgcz','emphYzcz','emphQrgfb','emphMaincostcen','emphPaybzDis','emphPaybDis',
            'emphPaycg','emphPaycgm','emphRankcg','emphRankcgm','emphSecg','emphSecgm'
        ];
        for(let i = 0; i < dom.length; i++) {
            if(arr[i]) {
                displayEvent(t, 1, dom[i].split(' '));
            }else {
                displayEvent(t, 0, dom[i].split(' '));
            }
        }
    },
    required (t, node, required) {
        if(t.formshow.hasOwnProperty(node.ruleText)) {
            let value = t.formDataSubmit[node.ruleText];
            t.$nextTick(() => {
                if(value !== '0') {
                    t.$refs[required].$children[0].$children[0].isRequired = true;
                    t.$set(t.ruler[required][0], 'required', true)
                }else {
                    t.$refs[required].$children[0].$children[0].isRequired = false;
                    t.$set(t.ruler[required][0], 'required', false)
                }
                t.$refs[required].$children[0].$children[0].resetField()
            })
        }
    },
    init_required(t, arr) {
        arr.forEach(item => {
            for(let key in item) {
                if(t.valueMap[key]) {
                    if( t.$refs[t.valueMap[key]][0].formshow.hasOwnProperty(key)) {
                        let value = t.$refs[t.valueMap[key]][0].formDataSubmit[key]
                        t.$nextTick(() => {
                            if(value !== '0') {
                                t.$refs[t.valueMap[key]][0].$refs[item[key]].$children[0].$children[0].isRequired = true;
                                t.$set(t.$refs[t.valueMap[key]][0].ruler[item[key]][0], 'required', true)
                            }else {
                                t.$refs[t.valueMap[key]][0].$refs[item[key]].$children[0].$children[0].isRequired = false;
                                t.$set(t.$refs[t.valueMap[key]][0].ruler[item[key]][0], 'required', false)
                            }
                        })
                    }
                }
            }
        })
    },
    init_childTable(t) {
        let valueMap = t.valueMap;
        let emphMode = '';
        ChildDataBloks = t.ChildDataBloks;
        if(valueMap.emphMode) {
            emphMode  = t.$refs[valueMap.emphMode][0].formDataSubmit.emphMode;//分类
            if(t.thisSetpName !== '') {
                if(emphMode === '03intern') {
                    t.ChildDataBloks = ChildDataBloks.slice(ChildDataBloks.length - 1)
                    t.showSum = false
                }else {
                    t.ChildDataBloks = ChildDataBloks
                    t.showSum = true
                }
            }
        }
    },
    init_gufubi(t) {
        let valueMap = t.valueMap
        if(valueMap.emphIsthirteen) {
            let emphIsthirteen = t.$refs[valueMap.emphIsthirteen][0].formDataSubmit.emphIsthirteen;
            let arr = ['emphGbidDis', 'emphFbidDis'];
            if(emphIsthirteen === '1') {
                initDisplayEvent(t, 0, arr)
            }else {
                initDisplayEvent(t, 1, arr)
            }
        }
    },
    /**
     * @description: 初始化薪酬比率
     * @param {*} t
     * @return {*}
     */
    init_emphPayb (t) {
        if(t.thisSetpName === '') {
            threeGears = 0;//薪酬三档值
            deptAvg = 0;//同部门标准
            postAvg = 0;//同岗位标准
        }else {
            // 同部门薪酬标准&同岗位薪酬标准
            let emphDeptpid = t.$refs[t.valueMap.emphDeptpid][0].formDataSubmit.emphDeptpid;
            let emphDeptid = t.$refs[t.valueMap.emphDeptid][0].formDataSubmit.emphDeptid;
            if(emphDeptpid && emphDeptid) {
                getDataLevelUserLoginData({
                    _mt:t.$global.mt + 'EmpBaseinfo.getAllEmpAvgxz',
                    APdeptid: emphDeptid,
                    APpostid:emphDeptpid
                }).then(res => {
                    if(res.data.content[0].value) {
                        let data = res.data.content[0].value.split(',');
                        for(let val of data) {
                            let v = val.split(':');
                            if(v[0] === 'deptAvgXz') {
                                deptAvg = v[1]
                            }
                            if(v[0] === 'postAvgxXz') {
                                postAvg = v[1]
                            }
                        }
                    }else {
                        deptAvg = 0;
                        postAvg = 0;
                    }
                })
            }
            //  三档值
            let data = t.$refs[t.valueMap.emphPaybz][0].formDataSubmit.emphPaybz;
            if(data !== '' && data !== undefined) {
                data = data.split(',')
                let i=0;
                for(;i<data.length;) {
                    if(data[i].split(':')[0] === 'Ⅲ档') {
                        threeGears = data[i].split(':')[1];
                        break;
                    }
                    i++;
                }
                if(i === data.length) {
                    threeGears = 0;
                }
            }else {
                threeGears = 0;
            }
            t.$store.commit('flowList/setThreeGears',threeGears)
        }
    }
}
export default EmpFlowHire
