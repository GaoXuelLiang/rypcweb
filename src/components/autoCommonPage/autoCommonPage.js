const autoCommonPage = {
    namespaced: true,
    state: {
        // 主表数据
        mainTable: [],
        // 子表1数据
        childTable: [],
        // 主表id
        mainId: "",
        // 子表1id
        childId: "",
        index: 0,
        //操作类型
        logType: "",
        //子表操作类型
        childType: "",
        // 弹出选择，(物理列表名称: 字段名称)
        searchClmkvMap: {},
        // 所有表单，布局为弹出框的数据 key, value
        searchPopForm: {},
        //搜索框查询值
        searchValue: {}
    },
    mutations: {
        setMainTable (state, value) {
            state.mainTable = value;
        },
        addNewArrayMainTable (state, res) {
            state.mainTable.unshift(res);
        },
        updateArrayMainTable (state, res) {
            if (state.mainTable.length === 0) {
                state.mainTable.push(res);
            } else {
                state.mainTable.splice(state.index, 1, res);
            }
        },
        setChildTable (state, value) {
            state.childTable = value;
        },
        addNewArrayChildTable1 (state, res) {
            state.childTable.unshift(res);
        },
        updateArrayChildTable (state, res) {
            if (state.childTable.length === 0) {
                state.childTable.push(res);
            } else {
                state.childTable.splice(state.index, 1, res);
            }
        },
        setIndex (state, value) {
            state.index = value;
        },
        setMainId (state, value) {
            state.mainId = value;
        },
        setChildId (state, value) {
            state.childId = value;
        },
        setLogType (state, value) {
            state.logType = value;
        },
        setChildLogType (state, value) {
            state.childType = value;
        },
        setSearchClmkvMap (state, value) {
            state.searchClmkvMap = value
        },
        setSearchPopForm (state, value) {
            state.searchPopForm = value
        },
        setSearchValue (state, value) {
            state.searchValue = value
        },
    }
};

export default autoCommonPage;
