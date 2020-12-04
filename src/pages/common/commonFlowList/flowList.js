const flowList = {
  namespaced: true,
  state: {
    tableColumns: [],
    flowData:{},
    originIncome:'',
    threeGears: '',
    fixedIncome:''
  },
  mutations: {
    setTableColumns(state, value) {
      state.tableColumns = value;
    },
    setFlowData(state, value) {
      state.flowData = value;
    },
    setOriginIncome (state, value) {
      state.originIncome = value;
    },
    setThreeGears (state, value) {
      state.threeGears = value;
    },
    setFixedIncome (state, value) {
      state.fixedIncome = value;
    }
  },
  actions: {
    resetOriginIncome({commit}, originIncome) {
      commit('setOriginIncome', originIncome)
    },
    resetThreeGears({commit}, threeGears) {
      commit('setThreeGears', threeGears)
    },
    resetFixedIncome({commit}, fixedIncome) {
      commit('setFixedIncome', fixedIncome)
    }
  }
};

export default flowList;
