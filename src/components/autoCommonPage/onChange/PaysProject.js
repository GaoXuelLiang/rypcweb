import { initDisplayEvent, displayEvent, setValue } from './public'
const PaysProject = {
    all_dis() {
      // PaysProject.proProtypegs(this);
    },
    proProtypeDis (node) {
      const t = this;
      let xzType = t.formDataSubmit[node.ruleText];
      console.log(xzType,"数据类型");
      let arr = ['proFormula', 'proMulremark', 'proCarry']
      if ( xzType === "字符串" || xzType === "日期") {
        displayEvent ( t, 0, arr)
      } else {
        displayEvent ( t, 1, arr)
      }
    },
    // 列表初始回显（有bug）
    // proProtypegs (t) {
    //   console.log(t.formData.columns,"修改列表回显数据")
    //   let type = t.formData.columns[13].clmValue;
    //   // console.log(type,"回显数据类型");
    //   debugger
    //   let arr = ['proFormula', 'proMulremark', 'proCarry']
    //   let obj = {}
    //   if ( type === "字符串" || type === "日期") {
    //     // displayEvent ( t, 0, arr)
    //   } else {
    //     displayEvent ( t, 1, arr)
    //   }
    //   t.formData.columns.map((item) => {
    //       let name = item.clmName
    //       return obj[name] = item.sffDefault ? item.sffDefault : ''
    //   })
    //   for (let v of arr) {
    //       if (state) {
    //           t.$set(t.formshow, v, '')
    //           t.$set(t.formDataSubmit, v, obj[v])
    //       } else {
    //           t.$delete(t.formshow, v)
    //       }
    //   }
    // },
}
export default PaysProject