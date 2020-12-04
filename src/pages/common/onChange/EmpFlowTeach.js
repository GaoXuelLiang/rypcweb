/*
 * @Author: your name
 * @Date: 2020-10-13 13:44:16
 * @LastEditTime: 2020-12-01 23:12:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hxpcweb\src\pages\common\onChange\EmpFlowTeach.js
 */
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess, } from '@/lib/util'
const EmpFlowTeach = {
    all_dis () {
        EmpFlowTeach.empchushiDis(this)
    },
    empId(node){
     
    },
    eteaPostidDis(node){
        const t = this 
        let empId = '';
        if(t.$parent.valueMap.empId){

            empId = t.$parent.$refs[t.$parent.valueMap.empId][0].formDataSubmit.empId
        }

        if (empId || empId !== '') {
            getDataLevelUserLoginData({
                _mt: t.$global.mt + 'EmpInfo.getById',
                APid: empId,
                APffk: `gep${t.funId}`,
            }).then(res => {
                if (isSuccess(res, t)) {
                     console.log(res,"resEMP")
                    if (res.data.content[0]) {
                        let data = res.data.content[0];
                        let obj= {
                            eteaTeastaff:data.empTeacher,
                            eteaTeastaffDis:data.empTeacherDis
                        }
                        setValue(t,obj)
                    }
                }
            })
        }
        console.log('111')
    },
    eteaPerscore(node){
        const t = this
       // console.log(node)
        if(t.formDataSubmit[node.ruleText]!==''){
            let val = parseInt(node.thisValue);
            if(val>= 90 && val<= 100){
                setValue(t,{'eteaPerrating':'per_A'})
            }
            if(val>= 80 && val<90){
                setValue(t,{'eteaPerrating':'per_B'})
            }
            if(val>= 70 && val<80){
                setValue(t,{'eteaPerrating':'per_C'})
            }
            if(val>= 60 && val<70){
                setValue(t,{'eteaPerrating':'per_D'})
            }
            if(val<60){
                setValue(t,{'eteaPerrating':'per_E'})
            } 
        }
    },
    eteaIsinterview(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaIsgiftpack(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaIslearnmap(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaIslearncou(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaOnewktrain(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaIswelmeal(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaIswelmeet(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaIsmentor(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaTutor(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
  
    eteaIsment(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaIsexecsec(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
    eteaIstrain(node){
        const t =this
        EmpFlowTeach.saveDisabled(t,node.thisValue)
    },
  
    saveDisabled(t,val){
        let data = t.formDataSubmit
        if(
            data.eteaIsinterview === '0' ||
            data.eteaIsgiftpack === '0' ||
            data.eteaIslearnmap === '0' ||
            data.eteaIslearncou === '0' ||
            data.eteaOnewktrain === '0' ||
            data.eteaIswelmeal === '0' ||
            data.eteaIswelmeet === '0' ||
            data.eteaIsmentor === '0' ||
            data.eteaTutor === '0' ||
            data.eteaIsment === '0' ||
            data.eteaIsexecsec === '0' ||
            data.eteaIstrain === '0'

        ){
            t.$parent.thisDis = true
        }else{
            t.$parent.thisDis = false
        }
    },
    empchushiDis(t){
        let round = t.$refs[t.valueMap.eteaRound][0].formDataSubmit.eteaRound
        let arr = [0,0,0,0,0,0,0,0,0,0,0,0,0]
        if(round ==='1'){
            console.log(round,'11111111111111111111')
            arr = [0,0,1,0,1,1,1,1,1,1,0,1,1];
            EmpFlowTeach.showHide(t,arr)
        }else if(round ==='2') {
            console.log(round,'22222222222222222222222')
            arr = [1,1,1,1,1,0,0,0,0,0,0,0,0];
            EmpFlowTeach.showHide(t,arr)

        }else{
          arr= [0,0,1,1,1,0,0,0,0,0,0,0,0]
            EmpFlowTeach.showHide(t,arr)
        }
    },
    showHide (t, arr, init) {
        let dom = ['eteaIstrain','eteaIsexecsec','eteaIsinterview','eteaIsment','eteaTutor','eteaIsmentor','eteaIswelmeet','eteaIswelmeal','eteaOnewktrain','eteaIslearncou','eteaIslearnmap','eteaIsgiftpack']

        for (let i = 0; i < dom.length; i++) {
            if (arr[i]) {
                initDisplayEvent(t, 1, dom[i].split(' '))
                //console.log(dom[i].split(' '),'111111111111111111111111111')
            } else {     
                initDisplayEvent(t, 0, dom[i].split(' '))
                //console.log(dom[i].split(' '),'000000000000000000000000')
            }
        }
    },   

}
export default EmpFlowTeach