const state = {
  cookieinfo: {}
}

const mutations = {
  SET_COOKIE_INFO: (state, cookieinfo) => {
    state.cookieinfo=cookieinfo;
  }
}
const actions = {
  setcookieinfo({ commit }, cookieinfo) {
    commit('SET_COOKIE_INFO', cookieinfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
