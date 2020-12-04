const sysFunctionsJS = {
    namespaced: true,
    state: {
        // 主表数据
        mainTable: [],
        // 子表1数据
        childTable1: [],
        // 主表id
        mainId: '',
        flowId: '',
        flowstepId: '',
        // 子表1id
        childId1: '',
        index: 0,
    },
    mutations:{
        setMainId(state, value) {
            state.mainId = value
        },
    }
}
export default sysFunctionsJS