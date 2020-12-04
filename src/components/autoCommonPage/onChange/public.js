/*
 * @Description: 
 * @Author: Gaoxueliang
 * @Date: 2020-10-24 14:13:52
 * @LastEditTime: 2020-11-10 21:28:54
 * @LastEditors: Sok
 */
//显示隐藏事件
export const initDisplayEvent = (t, state, arr) => {
    let obj = {}
    t = t.$refs.commonSingleForm
    t.formData1.columns.map((item) => {
        let name = item.clmName
        return obj[name] = item.sffDefault ? (item.sffDefault.indexOf('&') > -1 ? item.sffDefault.split('&')[0] : item.sffDefault) : ''
    })
    for (let v of arr) {
        if (state) {
            t.$set(t.formshow, v, '')
            t.$set(t.formDataSubmit, v, obj[v])
        } else {
            t.$delete(t.formshow, v)
            t.$set(t.formDataSubmit, v, '')
            // t.$delete(t.formDataSubmit, v)
        }
    }
}
//显示隐藏事件
export const initDisplayEventZz = (t, state, arr) => {
    let obj = {}
    t = t.$refs.commonSingleForm
    t.formData.columns.map((item) => {
        let name = item.clmName
        return obj[name] = item.sffDefault ? (item.sffDefault.indexOf('&') > -1 ? item.sffDefault.split('&')[0] : item.sffDefault) : ''
    })
    for (let v of arr) {
        if (state) {
            t.$set(t.formshow, v, '')
            t.$set(t.formDataSubmit, v, obj[v])
        } else {
            t.$delete(t.formshow, v)
            t.$set(t.formDataSubmit, v, '')
            // t.$delete(t.formDataSubmit, v)
        }
    }
}
//显示隐藏事件
export const displayEvent = (t, state, arr) => {
    let obj = {}
    // t = t.$refs.commonSingleForm
    t.formData1.columns.map((item) => {
        let name = item.clmName
        return obj[name] = item.sffDefault ? (item.sffDefault.indexOf('&') > -1 ? item.sffDefault.split('&')[0] : item.sffDefault) : ''
    })
    for (let v of arr) {
        if (state) {
            t.$set(t.formshow, v, '')
            t.$set(t.formDataSubmit, v, obj[v])
        } else {
            t.$delete(t.formshow, v)
            t.$set(t.formDataSubmit, v, '')
            // t.$delete(t.formDataSubmit, v)
        }
    }
}
//设置值事件
export const setValue = (t, obj) => {
    // console.log(t, 'tttttttttt')
    // console.log(obj, 'objjjjjjjjj')
    for (let v in obj) {
        if (obj.hasOwnProperty(v)) {
            t.$set(t.formDataSubmit, v, obj[v])
        }
    }
}
//设置弹出框值事件
export const setModalValue = (t, obj) => {
    // console.log(t, 'tttttttttt')
    // console.log(obj, 'objjjjjjjjj')
    // for (let v in obj) {
    //     if (obj.hasOwnProperty(v)) {
    //         t.$set(t.formDataSubmit, v, obj[v])
    //     }
    // }
    for (let item in obj) {
        if (item.toString().indexOf("Dis") !== -1) {
            for (let i = 0; i < t.formData.columns.length; i++) {
                let str = item.toString().replace("Dis", "");
                if (t.formData.columns[i].clmName === str) {
                    t.formData.columns[i].clmDisValue = obj[item];
                    t.$refs[str].thisValue = obj[item]
                }
            }
        }
        for (let item2 in t.formDataSubmit) {
            if (item === item2) {
                t.$set(t.formDataSubmit, item2, obj[item]);
                t.$store.state.flowClmkMap.popForm[
                    item2
                ] = obj[item];
                let objMap = {}
                objMap[item2] = obj[item]
                t.$store.commit("flowClmkMap/setPopFormValue", objMap);
            }
        }
    }
}

// 控制禁填和输入
export const disabledEvent = (t, state, arr) => {
    let obj = {}
    t = t.$refs.commonSingleForm
    t.formData1.columns.map((item) => {
        let name = item.clmName
        return obj[name] = item.sffDefault ? (item.sffDefault.indexOf('&') > -1 ? item.sffDefault.split('&')[0] : item.sffDefault) : ''
    })
    for (let v of arr) {
        if (state) {
            t.$set(t.dis, v, true)
            t.$set(t.formDataSubmit, v, obj[v])
        } else {
            t.$set(t.dis, v, false)
            t.$set(t.formDataSubmit, v, obj[v])
        }
    }
}