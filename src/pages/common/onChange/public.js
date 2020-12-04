/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-16 21:20:30
 * @LastEditTime: 2020-11-03 22:18:57
 * @LastEditors: Please set LastEditors
 */
//显示隐藏事件
export const displayEvent = (t, state, arr, init) => {
    let obj = {}
    for (let v of arr) {
        let valueMap = t.$parent.valueMap[v];
        if (!valueMap) {
            return
        }
        t = t.$parent.$refs[valueMap][0];
        t.formData1.columns.map((item) => {
            let name = item.clmName
            return obj[name] = item.sffDefault ? item.sffDefault : ''
        })

        if (state) {
            t.$set(t.formshow, v, '')
            t.$set(t.formDataSubmit, v, obj[v])
        } else {
            t.$delete(t.formshow, v)
            t.$set(t.formDataSubmit, v, '')
        }
    }
}
//设置值事件
export const setValue = (t, obj) => {
    for (let v in obj) {
        if (t.$parent.valueMap.hasOwnProperty(v)) {
            let valueMap = t.$parent.valueMap[v];
            t = t.$parent.$refs[valueMap][0];
            if (obj.hasOwnProperty(v)) {
                t.$set(t.formDataSubmit, v, obj[v])
            }
            // 弹出框 t.formData.columns 的clmDisValue 重新辅助
            for (let item in obj) {
                if (item.toString().indexOf("Dis") !== -1) {
                    for (let i = 0; i < t.formData.columns.length; i++) {
                        let str = item.toString().replace("Dis", "");
                        if (t.formData.columns[i].clmName === str) {
                            t.formData.columns[i].clmDisValue = obj[item];
                            // t.$set(t.formData.columns[i],clmDisValue,obj[item])
                        }
                    }
                }
            }
        }
    }
}
//初始显示隐藏事件
export const initDisplayEvent = (t, state, arr) => {
    let obj = {}
    for (let v of arr) {
        let valueMap = t.valueMap[v];
        if (!valueMap) {
            return
        }
        let tt = t.$refs[valueMap][0];
        tt.formData1.columns.map((item) => {
            let name = item.clmName
            return obj[name] = item.clmValue ? item.clmValue : (item.sffDefault ? item.sffDefault : '')
        })
        if (state) {
            tt.$set(tt.formshow, v, '')
            tt.$set(tt.formDataSubmit, v, obj[v])
        } else {
            tt.$delete(tt.formshow, v)
            tt.$set(tt.formDataSubmit, v, '')
        }
    }

}
//初始设置值事件
export const initSetValue = (t, obj) => {
    for (let v in obj) {
        if (obj.hasOwnProperty(v)) {
            let valueMap = t.valueMap[v];
            if (valueMap) {
                console.log(t.$refs[valueMap][0], "t.$refs[valueMap][0]")
                let tt = t.$refs[valueMap][0]
                tt.$set(tt.formDataSubmit, v, obj[v])
                if (tt.$refs[v] && tt.$refs[v].dataKey && tt.$refs[v].dataKey !== '') {
                    let disValue = v + "Dis"
                    tt.$refs[v].thisValue = obj[disValue] ? obj[disValue] : ''
                }
            }
        }
    }
}