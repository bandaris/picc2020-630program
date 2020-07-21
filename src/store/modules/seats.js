const state = {
  sumRoleNavName: '',
}

const mutations = {
  SET_SUM_NAVNAME:(state,logininfo)=>{
    state.sumRoleNavName=logininfo;
  }
}
const actions = {
  setsumnavname({ commit }, logininfo) {
    commit('SET_SUM_NAVNAME', logininfo)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
