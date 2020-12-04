/**
 * Created by xionglei on 2018/12/25.
 */
const flowClmkMap = {
    namespaced: true,
    state: {
        // 弹出选择，(物理列表名称: 字段名称)
        clmkvMap: {},
        // 该步骤，所有表单，布局为弹出框的数据 key, value
        popForm: {},
        emppId: '',
        localField: {},  // 全局变量
        getLocalField: {},
        setPopField: {},
    },
    mutations: {
        setClmkvMap (state, value) {
            state.clmkvMap = value
        },
        setPopForm (state, value) {
            state.popForm = value
        },
        setPopFormValue (state, value) {
            for (let v in value) {
                state.popForm[v] = value[v]
            }

        },
        setEmppId (state, value) {
            state.emppId = value
        },
        setLocalField (state, value) {
            state.localField = value
        },
        getLocalField (state, value) {
            state.getLocalField = value
        },
        setPopField (state, value) {
            state.setPopField = value
        },
    },
}

export default flowClmkMap
