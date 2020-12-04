/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-24 14:55:41
 * @LastEditTime: 2020-11-30 18:20:54
 * @LastEditors: guwenjiang
 */
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, deepCopy } from '@/lib/util'
// 保存数据块
let ChildDataBloks = []
let dataBlocks = []
// 保存匹配数据块id
let Nicea = 'quitWfile'
let Niceb = 'quitReatype'
let newarr = ["quitWfile", 'quitVfile', 'quitZcfile', 'quitCzfile', 'quitOtfile', 'quitAutowfile']
let oldarr = ['czqComment', 'fswComment', 'quitIsczqtk', "quitIsczqtkDis", "quitIswbcz", "quitIswbczDis", 'quitIsyfswc', 'quitIsyfswcDis', 'quitIsyzyw', 'quitIsyzywDis', 'wbcComment', "yzyComment"]
const EmpFlowQuitxian = {
    all_dis () {
        EmpFlowQuitxian.all_quitType(this)
        EmpFlowQuitxian.initRequired(this)
    },
    // 切换离职原因控制主动被动并处理数据块显示隐藏及控制验证
    quitReatype (node) {
        let arr = ['quitIswbcz','wbcComment','quitIsyzyw','yzyComment','quitIsyfswc','fswComment','quitIsczqtk','czqComment']
        const t = this;
        if(t.formDataSubmit[node.ruleText] !== ''&&t.formDataSubmit[node.ruleText]!='01A'){
            document.getElementsByClassName('content')[1].children[2].style.display = 'none'
            setValue(t, {'quitType': '02involuntary'})
            t.$parent.ChildDataBloks = deepCopy(ChildDataBloks).slice(2,3)
            // displayEvent(t, 0, arr)
            let n = t.$parent.$refs[t.$parent.valueMap.czqComment][0];
            for(let i of arr){
                if(n.ruler[i][0]){
                    t.$set(n.ruler[i][0], 'required', false)
                }
            }
            n.$refs.formList.resetFields()
            if(t.$parent.valueMap.quitWfile) {
                let valueMap1 = t.$parent.valueMap.quitWfile;
                let dom1 = t.$parent.$refs[valueMap1][0];
                dom1.$refs.quitWfile.$children[0].$children[0].isRequired = true
                t.$set(dom1.ruler.quitWfile[0], 'required', true)
                // dom1.$refs.quitWfile.$children[0].$children[0].resetField()
            }
            if(t.$parent.valueMap.quitCzfile) {
                let valueMap2 = t.$parent.valueMap.quitCzfile;
                let dom2 = t.$parent.$refs[valueMap2][0];
                dom2.$refs.quitCzfile.$children[0].$children[0].isRequired = false
                t.$set(dom2.ruler.quitCzfile[0], 'required', false)
                // dom2.$refs.quitCzfile.$children[0].$children[0].resetField()
            }
        }else{
            setValue(t, {'quitType': '01voluntary'})
            t.$parent.ChildDataBloks =  ChildDataBloks
            t.$parent.dataBlocks =  dataBlocks
            document.getElementsByClassName('content')[1].children[2].style.display = 'block'
            // displayEvent(t, 1, arr)
            if(t.$parent.valueMap.quitWfile) {
                let valueMap1 = t.$parent.valueMap.quitWfile;
                let dom1 = t.$parent.$refs[valueMap1][0];
                dom1.$refs.quitWfile.$children[0].$children[0].isRequired = false
                t.$set(dom1.ruler.quitWfile[0], 'required', false)
                // dom1.$refs.quitWfile.$children[0].$children[0].resetField()
            }
            if(t.$parent.valueMap.quitCzfile) {
                let valueMap2 = t.$parent.valueMap.quitCzfile;
                let dom2 = t.$parent.$refs[valueMap2][0];
                dom2.$refs.quitCzfile.$children[0].$children[0].isRequired = true
                t.$set(dom2.ruler.quitCzfile[0], 'required', true)
                // dom2.$refs.quitCzfile.$children[0].$children[0].resetField()
            }
        }
    },
    // 初始化数据块及验证
    all_quitType (t) {
        ChildDataBloks = t.ChildDataBloks;
        dataBlocks = t.dataBlocks
        console.log(t,'fathert')
        let valueMap = t.valueMap[Niceb]
        let father = t.$refs[valueMap][0]
        let arr = ['quitIswbcz','wbcComment','quitIsyzyw','yzyComment','quitIsyfswc','fswComment','quitIsczqtk','czqComment']
        let valueMap1 = t.valueMap.quitWfile;
        let valueMap2 = t.valueMap.quitCzfile;
        if(father.formDataSubmit.quitReatype!='01A'){
            initSetValue(t, {'quitType': '02involuntary'})
            for(let v of arr) {
                if(t.$refs[t.valueMap[v]]) {
                    if(t.$refs[t.valueMap[v]][0].formshow.hasOwnProperty(v)) {
                        initDisplayEvent(t, 0, v)
                    }
                }
            }
            let ref = t.valueMap.quitIsyzyw.split('block')[1];
            if (t.approvalType) {
                for(let i of t.dataBlocks){
                    if(i.id==ref){
                        if(t.$refs.hasOwnProperty(i.flsdbOrder)) {
                            t.$refs[i.flsdbOrder][0].style.display = 'none' 
                        }
                    }
                }
                t.ChildDataBloks = ChildDataBloks.slice(2,3)
            } else {
                document.getElementsByClassName('content')[1].children[2].style.display = 'none'
                t.ChildDataBloks = ChildDataBloks.slice(2,3)
            }
            // document.getElementsByClassName('content')[1].children[2].style.display = 'none'
            if(t.$refs[valueMap1]) {
                let dom1 = t.$refs[valueMap1][0];
                dom1.$refs.quitWfile.$children[0].$children[0].isRequired = true
                t.$set(dom1.ruler.quitWfile[0], 'required', true)
                dom1.$refs.quitWfile.$children[0].$children[0].resetField()
            }
            if(t.$refs[valueMap2]) {
                let dom2 = t.$refs[valueMap2][0];
                dom2.$refs.quitCzfile.$children[0].$children[0].isRequired = false
                t.$set(dom2.ruler.quitCzfile[0], 'required', false)
                dom2.$refs.quitCzfile.$children[0].$children[0].resetField()
            }
        }else{
            if (!t.approvalType) {
                document.getElementsByClassName('content')[1].children[2].style.display = 'block'
            }
            // document.getElementsByClassName('content')[1].children[2].style.display = 'block'
            initSetValue(t, {'quitType': '01voluntary'})
            for(let v of arr) {
                if(t.$refs[t.valueMap[v]]) {
                    if(t.$refs[t.valueMap[v]][0].formshow.hasOwnProperty(v)) {
                        initDisplayEvent(t, 1, v)
                    }
                }
            }
            if(t.$refs[valueMap1]) {
                let dom1 = t.$refs[valueMap1][0];
                dom1.$refs.quitWfile.$children[0].$children[0].isRequired = false
                t.$set(dom1.ruler.quitWfile[0], 'required', false)
                dom1.$refs.quitWfile.$children[0].$children[0].resetField()
            }
            if(t.$refs[valueMap2]) {
                let dom2 = t.$refs[valueMap2][0];
                dom2.$refs.quitCzfile.$children[0].$children[0].isRequired = true
                t.$set(dom2.ruler.quitCzfile[0], 'required', true)
                dom2.$refs.quitCzfile.$children[0].$children[0].resetField()
            }
        }
    },
    format (n) {
        return n > 9 ? n : '0' + n;
    },
    emphId (node) {
        const t = this
        const emphId = t.formDataSubmit[node.ruleText]
        let id = t.formDataSubmit.id
        if (id == undefined || id == '') {
            id = 0
        }
        if (emphId == undefined || emphId == '') {
            // let obj = {
            //     // "emphId":'',
            //     // "emphIdDis":'',
            //     'quitEmpnameDis':'',
            //     'quitEmppyDis':'',
            //     'quitUnitid':'',
            //     'quitUnitidDis':'',
            //     'deptId':'',
            //     'deptIdDis':'',
            //     "quitPostid":'',
            //     "quitPostidDis":'',
            //     "quitRankidDis":'',
            //     "quitEmpid":'',
            //     "quitEmpidDis":'',
            //     "quitRankid":'',
            //     "quitRankidDis":'',
            //     "empMobile":''
            //     // 'eftuGstypeDis':data.empWttypeDis,
            //     // 'eftuHtdqdaysDis':data.empDuedateDis,

            // }
            // t.$nextTick(()=>setValue(t, obj))
            return
        }
        getDataLevelUserLoginData({
            _mt: t.$global.mt + 'EmpFlowQuit.checkEmpinfo',
            APquitId: id,
            APempId: emphId,
        }).then(res => {
            if (isSuccess(res, t)) {
                // console.log(res,"resEMP")
                if (res.data.content[0]) {
                    let data = res.data.content[0];
                    if (data.value == "error") {
                        t.$Modal.warning({
                            title: t.$t("reminder.remind"),
                            content: "正在离职的员工不可再次离职！",
                        });
                        let obj = {
                            "emphId": '',
                            "emphIdDis": '',
                            'quitEmpnameDis': '',
                            'quitEmppyDis': '',
                            'quitUnitid': '',
                            'quitUnitidDis': '',
                            'deptId': '',
                            'deptIdDis': '',
                            "quitPostid": '',
                            "quitPostidDis": '',
                            "quitRankidDis": '',
                            "quitEmpid": '',
                            "quitEmpidDis": '',
                            "quitRankid": '',
                            "quitRankidDis": '',
                            "empMobile": ''
                            // 'eftuGstypeDis':data.empWttypeDis,
                            // 'eftuHtdqdaysDis':data.empDuedateDis,

                        }
                        node.thisVal = ''
                        node.thisId = ''
                        t.$nextTick(() => setValue(t, obj))
                    }
                }
            }
        })
    },
    /**
     * @description: 工作交接确认选是备注必填
     * @param {*}
     * @return {*}
     */  
    quitIswbcz (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'wbcComment')
    },
    quitIsyzyw (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'yzyComment')
    },
    quitIsyfswc (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'fswComment')
    },
    quitIsczqtk (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'czqComment')
    },
    /**
     * @description: 接任人交接内容选是备注必填
     * @param {*}
     * @return {*}
     */  
    quitIsyqspfw (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'qspComment')
    },
    quitIsjjfh (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'jfhComment')
    },
    quitIsdsffh (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'dsfComment')
    },
    quitIsjjgt (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'jgtComment')
    },
    quitIssdjd (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'sdjdComment')
    },
    quitIsfxcd (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'fxcdComment')
    },
    quitIsfxwt (node) {
        const t = this;
        EmpFlowQuitxian.setRequired(t, node, 'fxwtComment')
    },
    /**
     * @description: 设置必填方法
     * @param {*} t
     * @param {*} node
     * @param {*} required
     * @return {*}
     */
    setRequired (t, node, required) {
        if(t.formshow.hasOwnProperty(node.ruleText)) {
            let value = t.formDataSubmit[node.ruleText];
            t.$nextTick(() => {
                if(value !== '0') {
                    t.$refs[required].$children[0].$children[0].isRequired = true;
                    t.$set(t.ruler[required][0], 'required', true)
                }else {
                    t.$refs[required].$children[0].$children[0].isRequired = false;
                    t.$set(t.ruler[required][0], 'required', false)
                    // t.$refs[required].$children[0].$children[0].resetField()
                }
            })
        }
    },
    /**
     * @description: 初始化必填方法
     * @param {*} t
     * @return {*}
     */
    initRequired (t) {
        let arr = [
            {quitIswbcz: 'wbcComment'},
            {quitIsyzyw: 'yzyComment'},
            {quitIsyfswc: 'fswComment'},
            {quitIsczqtk: 'czqComment'}
        ]
        arr.forEach(item => {
            for(let key in item) {
                if(t.$refs[t.valueMap[key]]) {
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
    }  
}
export default EmpFlowQuitxian