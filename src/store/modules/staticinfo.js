const state = {
  staticinfo: {}
}

const mutations = {
  SET_STAT_INFO: (state, staticinfo) => {
    for(let i=0;i<staticinfo.length;i++){
      let cjn=staticinfo[i];
      let cid=cjn["dictvalue"];
      state.staticinfo[cid]=cjn;
    }
  }
}
const actions = {
  setstaticinfo({ commit }, staticinfo) {
    commit('SET_STAT_INFO', staticinfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
