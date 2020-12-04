const huntData = {
  namespaced: true,
  state: {
    hcVendorid: '', // 供应商ID
    huntInfoShow: false,
    huntDisShow: false,
    evalGid: '', // 岗位ID
  },
  mutations: {
    setEvalGid(state, value) {
      state.evalGid = value
    },
    setHcVendorid(state, value) {
      state.hcVendorid = value
    },
    setHuntInfoShow(state) {
      state.huntInfoShow = true
    },
    setHuntInfoHide(state) {
      state.huntInfoShow = false
    },
    setHuntDisShow(state) {
      state.huntInfoShow = true
    },
    setHuntDisHide(state) {
      state.huntInfoShow = false
    },
  },
}

export default huntData
