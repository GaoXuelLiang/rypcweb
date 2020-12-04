
import { displayEvent, setValue, initDisplayEvent, initSetValue } from './public'
import { getDataLevelUserLoginData } from '@/axios/axios'
import { isSuccess } from '@/lib/util'
let unitId = '';
let deptId = '';
let minusDay;//年假
let vaclogType = '';//假期状态
let selempId = '';
let unit = '';//业务单位
const AttFlowVacate = {
    all_dis () {
        // EmpFlowTermination.setDefaultValue(this)
        AttFlowVacate.initVaHuman(this)
    },
    // 员工ID
    empId (node) {
      //const t = this;
      //selempId= t.oldValue;
      //console.log(selempId,"员工ID");
      //DataFun(t)
    },
    //全天半天
    vacHalf(node){
      const t = this;
      DataFun(t)
    },
    // 休假类型
    vacType (node) {
        const t = this;
        vaclogType = t.formDataSubmit[node.ruleText];
        DataFun(t)
    },
    // 开始日期
    vacStartTime (node) {
        const t = this;
        DataFun(t)

    },
    // 结束日期
    vacLeavTime (node) {
        // let ev = e || window.event;
        // var elm = ev.target || ev.srcElement;
        // console.log(elm.tagName,"触发事件元素，结束日期点击次数+1");
        const t = this;
        DataFun(t)

    },
    // 控制病假条扫描件必填
    vacDaysoff (node) {
      const t = this;
      if(t.formshow.hasOwnProperty('vacBjfile')) {
        if(t.formDataSubmit[node.ruleText] !== '' && t.formDataSubmit[node.ruleText] !== undefined) {
          let vacDaysoff = t.formDataSubmit[node.ruleText]
          if(Number(vacDaysoff) > 1) {
            t.$refs.vacBjfile.$children[0].$children[0].isRequired = true;
            t.$set(t.ruler.vacBjfile[0], 'required', true)
          }else {
            t.$refs.vacBjfile.$children[0].$children[0].isRequired = false;
            t.$set(t.ruler.vacBjfile[0], 'required', false)
          }
        }else {
          t.$refs.vacBjfile.$children[0].$children[0].isRequired = false;
          t.$set(t.ruler.vacBjfile[0], 'required', false)
        }
        t.$refs.vacBjfile.$children[0].$children[0].resetField()
      }
    },
    // 初始化当前请假人员
    initVaHuman (t) {
      if(!t.thisSetpName) {
        getDataLevelUserLoginData({
          _mt: t.$global.mt + 'AttFlowVacate.addById',
          AProleType: localStorage.roleType
        }).then(res => {
          if(isSuccess(res, t)) {
            let data = res.data.content[0]
            let obj = {
              'empId': data.empId,
              'empName': data.empName,
              'deptId': data.deptId,
              'postId': data.postId,
              'postIdDis': data.postIdDis,
              'vacRank': data.vacRank,
              'vacRankDis': data.vacRankDis
            }
            initSetValue(t, obj)
            selempId=data.empId
            //console.log(data.empId,"data.empId");
            //console.log(selempId,"selempId");
            t.$refs[t.valueMap.empId][0].$refs.empId.thisValue = data.empId
            t.$refs[t.valueMap.deptId][0].$refs.deptId.thisValue = data.deptIdDis
          }
        }).catch(() => {

        })
      }
    }
}

function DataFun (t) {
    if (t.formDataSubmit["vacStartTime"] !== "" && t.formDataSubmit["vacLeavTime"] !== "") {
        let vacStartTime = t.formDataSubmit["vacStartTime"]
        let vacLeavTime = t.formDataSubmit["vacLeavTime"]
        let allOrHalf=""
        // 判断年假并赋值
        if (vaclogType === "01ALeave" || vaclogType === "05ILeaves" || vaclogType === "07PaLeave" || vaclogType === "08SLeave") {
            allOrHalf = t.formDataSubmit['vacHalf']
        }
        if(selempId === null || selempId === ""){
          return
        }
        if (vaclogType === "01ALeave" && allOrHalf === ""){
          return
        }
        if (vaclogType === null || vaclogType === "" || vacStartTime === "" || vacLeavTime === ""){
          return
        }
        if (vacStartTime === "" || vacLeavTime === ""){
          return
        }

        // 判断开始结束日期
        if (new Date(vacStartTime) > new Date(vacLeavTime)) {
            return
        }
        const data = {};
        data._mt = t.$global.mt+'AttFlowVacate.toMinusDay';
        data.APlogType = '剩余年假天数计算';
        data.APstartTime = vacStartTime;
        data.APendTime = vacLeavTime;
        data.APvacationType = vaclogType;
        data.APminusDay = '0.0';
        data.APallOrHalf = allOrHalf;
        data.unitId = selempId;
        for(let dat in data) {
          if(!data[dat]) {
            delete data[dat]
          }
        }
        getDataLevelUserLoginData(data).then((res) => {
                if (isSuccess(res, t)) {
                    if(res.data.content[0]) {
                        let data = res.data.content[0];
                        let obj = {
                            'vacDaysoff': data.calVacDay,
                            'vacHalfdaysoff': data.minusday,
                            'vacSplrhalfdaysoff': data.minusYear
                        }
                        setValue(t, obj)
                    }
                }else{
                  let obj = {
                    'vacDaysoff': ""
                  }
                  setValue(t, obj)
                }
            }).catch(() => {
                t.$Modal.error({
                    title: t.$t('reminder.err'),
                    content: t.$t('reminder.errormessage'),
                })
            }).finally(()=>{
        })

    }
}


export default AttFlowVacate
