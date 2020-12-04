import { displayEvent, setValue,initDisplayEventZz } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
let orgScope = '';//组织范围 
const OrgUnits = {
    all_dis () {
        OrgUnits.init_showH(this)
        OrgUnits.init_required(this);
    },
    init_showH (t) {
        if(t.$global.mt !== 'znjs') {
            return;
        }
        // 管理层级  unitLeveltype
        let arr = ['unitProject']
        t.$nextTick(() => {
            if (t.logType === "修改") {
                // console.log(t,"ttt组织信息");
                let dom = t.$refs.commonSingleForm.formDataSubmit.unitLeveltype;
                // unitLeveltype
                // debugger
                if (dom === "03projectcomp") {
                    initDisplayEventZz(t, 1, arr)
                    // 中文全称不可修改
                    t.$refs.commonSingleForm.dis.unitFnameCn = false;
                    // t.$refs.commonSingleForm.$refs.unitProject.$children[0].$children[0].isRequired = true;
                    // // t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.ruler.unitProject[0], 'required', true)
                    // setTimeout(() => {
                    //     t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.ruler.unitProject[0], 'required', true)
                    // }, 100);
                } else {
                    initDisplayEventZz(t, 0, arr)
                    t.$refs.commonSingleForm.dis.unitFnameCn = true;
                    // t.$refs.commonSingleForm.$refs.unitProject.$children[0].$children[0].isRequired = false;
                    // // t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.ruler.unitProject[0], 'required', false)
                    // setTimeout(() => {
                    //     t.$refs.commonSingleForm.$set(t.$refs.commonSingleForm.ruler.unitProject[0], 'required', false)
                    // }, 100);
                }
            }
        })
    },
    // unitFnameCn (node) {
    // unitScopeDis 组织范围
    // unitPidDis  所属上级
    // let value = '';
    // let scope = '';
    // let obj = {};
    // console.log(orgScope,"orgScope");
    // if(orgScope) {
    //     value = node.thisValue ? orgScope + ' / ' + node.thisValue : orgScope
    // }else {
    //     value = node.thisValue
    // }
    // if(this.$refs.hasOwnProperty('unitScope')) {
    //     scope = 'unitScope';
    // }
    // if(this.$refs.hasOwnProperty('unitScopeDis')) {
    //     scope = 'unitScopeDis';
    // }
    // obj[scope] = value;
    // setValue(this, obj)
    // },
    // unitPid (node) {
    // const t = this;
    // let value = '';
    // let scope = '';
    // let obj = {};//znjsOrgUnits.getById
    // if(t.$refs.hasOwnProperty('unitScope')) {
    //     scope = 'unitScope';
    // }
    // if(t.$refs.hasOwnProperty('unitScopeDis')) {
    //     scope = 'unitScopeDis';
    // }
    // if(t.formDataSubmit[node.ruleText] !== '') {
    //     getDataLevelUserLoginData({
    //         _mt: t.$global.mt + 'OrgUnits.getById',
    //         APid: t.formDataSubmit[node.ruleText],
    //         APffk: `gec${t.funId}`
    //     }).then(res => {
    //         if (isSuccess(res, t)) {
    //             if(res.data.content[0].hasOwnProperty(scope)){
    //                 orgScope = res.data.content[0][scope];
    //                 if(orgScope) {
    //                     value = t.$refs.unitFnameCn.thisValue 
    //                             ? orgScope +' / '
    //                             + t.$refs.unitFnameCn.thisValue 
    //                             : orgScope
    //                 }else {
    //                     value = t.$refs.unitFnameCn.thisValue
    //                 }
    //                 obj[scope] = value;
    //                 setValue(t, obj)
    //             }
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }else {
    //     orgScope = '';
    //     value = t.$refs.unitFnameCn.thisValue;
    //     obj[scope] = value;
    //     setValue(t, obj)
    // }
    // },
    status (node) {
        let dom = this.$refs.unitEdate.$children[0].$children[0].isRequired;
        if (node.value == '03invalid') {
            this.$refs.unitEdate.$children[0].$children[0].isRequired = true;
            // this.$set(this.ruler.unitEdate[0], 'required', true)
            this.ruler.unitEdate.forEach(item => {
                this.$set(item, 'required', true) 
            });
        } else {
            this.$refs.unitEdate.$children[0].$children[0].isRequired = false;
            // this.$set(this.ruler.unitEdate[0], 'required', false)
            this.ruler.unitEdate.forEach(item => {
                this.$set(item, 'required', false) 
            });
        }
        this.$refs.unitEdate.$children[0].$children[0].resetField()
    },
    init_required(t) {
        setTimeout(() => {
            let dom = t.$refs.commonSingleForm
            let value = dom.formDataSubmit.status
            if (value == '03invalid') {
                dom.$refs.unitEdate.$children[0].$children[0].isRequired = true;
                dom.ruler.unitEdate.forEach(item => {
                    t.$set(item, 'required', true) 
                });
            } else {
                dom.$refs.unitEdate.$children[0].$children[0].isRequired = false;
                dom.ruler.unitEdate.forEach(item => {
                    t.$set(item, 'required', false) 
                });
            }
            dom.$refs.unitEdate.$children[0].$children[0].resetField()
        }, 20)
    },
    unitFnameCn (node) {
        const t = this
        let scope = t.$refs.unitScope.thisValue
        let jian = t.$refs.unitSnameCn.thisValue
        let newVal = scope.split('>')[0] + '>' + node.thisValue
        setValue(t, { unitScope: newVal })
        if (t.formDataSubmit[node.ruleText] == '') {
            let obj = {
                unitSnameCn: '',
                unitFnameEn: '',
                unitSnameEn: '',
            }
            setValue(t, obj)
        }
    },
    // 管理层级
    unitLeveltype (node) {
        let unitLtype = this.formDataSubmit[node.ruleText];
        // 明源对接项目字段 	unit_project
        let arr = ['unitProject']
        if (unitLtype === "03projectcomp") {
            // debugger
            displayEvent(this, 1, arr)
            // 中文全称不可修改
            this.dis.unitFnameCn = false;
            // this.$refs.unitProject.$children[0].$children[0].isRequired = true;
            // // this.$set(this.ruler.unitProject[0], 'required', false)
            // setTimeout(() => {
            //     this.$set(this.ruler.unitProject[0], 'required', true)
            // }, 100);
        } else {
            // debugger
            displayEvent(this, 0, arr)
            // this.dis.unitFnameCn = true;
            // this.$refs.unitProject.$children[0].$children[0].isRequired = false;
            // // this.$set(this.ruler.unitProject[0], 'required', false)
            // setTimeout(() => {
            //     this.$set(this.ruler.unitProject[0], 'required', false)
            // }, 100);
            if (!this.dis.unitFnameCn) {
                this.dis.unitFnameCn = true;
                let objs = {
                    unitFnameCn: '',
                    unitSnameCn: '',
                    unitProject: '',
                    unitProjectDis: ''
                }
                setValue(this, objs)
            }
            this.$refs.unitProject.thisId = ''
            this.$refs.unitProject.thisValue = ''
        }
        // unitLtype
        // this.$refs.unitProject.$children[0].$children[0].resetField()
    },
    unitProject (node) {
        // debugger
        const t = this;
        let status = this.$refs.unitLeveltype.thisValue;
        let unitName = node.thisValue;
        if (status === "03projectcomp") {
            let obj = {
                unitFnameCn: unitName,
                unitSnameCn: unitName,
            }
            setValue(t, obj)
        }
    }
    // unitPid(node){
    //     const t = this
    //     if(node.thisValue == ''){
    //         t.formDataSubmit.unitPid = ""
    //         t.formDataSubmit.unitPidDis = ""
    //         t.formDataSubmit.unitScope = ""
    //         t.formDataSubmit.unitFnameCn = ""
    //     }else{

    //     }
    // }
}
export default OrgUnits;
