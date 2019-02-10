const state = {
  list: {}
}

const actions = {
  save ({commit}, payload) {
    commit('push', payload)
  }
}

const mutations = {
  push (state, payload) {
    if (typeof state.list[payload.id] !== 'object') {
      state.list[payload.id] = []
    }

    state.list[payload.id].push({label: payload.label, api: payload.api, secret: payload.secret})
  }
}

const getters = {
  getById: (state) => (id) => {
    // TODO: add check
    return state.list[id]
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
