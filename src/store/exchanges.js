const exchanges = require('../config/exchanges.json')

const state = {
  list: exchanges,
  currentKey: null
}

const getters = {
  list (state) {
    return state.list
  },
  id (state) {
    return state.currentKey
  }// ,
  // getExchangeIdByName: (state) => (name) => {
  //   return state.list.findIndex((value) => value.name.toLowerCase() === name.toLowerCase())
  // }
}

const actions = {
  setId ({commit, state}, id) {
    if (state.currentKey !== id) {
      commit('changeId', id)
    }
  }
}

const mutations = {
  changeId (state, id) {
    state.currentKey = id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
