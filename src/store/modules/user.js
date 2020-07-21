const state = {
  userinfo: {},
  deptinfo: {},
  purviews: []
}

const mutations = {
  SET_USER_INFO: (state, logininfo) => {
    state.userinfo=logininfo['user'];
    state.deptinfo=logininfo['dept'];
    state.purviews=logininfo['purview'];
  }
}
const actions = {
  setuserinfo({ commit }, logininfo) {
    commit('SET_USER_INFO', logininfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
