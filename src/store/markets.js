// const exchanges = require('../config/exchanges.json')

const state = {
  list: {},
  currentKey: null
}

const getters = {
  list (state) {
    return state.list
  },
  id (state) {
    return state.currentKey
  },
  getByKey: (state) => (exchangeKey) => {
    if (typeof state.list[exchangeKey] !== 'object') {
      return {}
    }

    return state.list[exchangeKey]
  }
}

const actions = {
  setId ({commit, state}, payload) {
    if (state.marketId !== payload.id) {
      commit('changeId', payload)
    }
  },
  save ({commit, state}, payload) {
    commit('saveMarket', payload)
    commit('mutateMarket')
  }
  // TODO: rewrite logic
  // async getMarkets ({commit, state}, id) {
  //   const _call = function (url) {
  //     return new Promise((resolve, reject) => {
  //       fetch(url)
  //         .then(r => r.json())
  //         .then(r => resolve(r))
  //         .catch(e => reject(e))
  //     })
  //   }

  //   commit('clearMarket')

  //   if (typeof state.cache[id] !== 'undefined') {
  //     commit('setFromCache', id)
  //     return state.list
  //   }

  //   const data = exchanges[id]['markets'].split('|')
  //   const response = await _call(data[0])

  //   let result = response // reslts from API call
  //   let lastIndex = 2 // last index for O operation

  //   for (let i = 0, len = data[1].length; i < len; i++) { // Operation while
  //     switch (data[1][i]) {
  //       case 'F': // While operation
  //         for (let item in result) {
  //           let final = null
  //           let val = result[item]

  //           const symb = data[data.length - 1].split('+') // get value ticker

  //           if (len > i + 1) {
  //             val = val[data[lastIndex]]
  //           }

  //           if (symb.length === 1) {
  //             final = (symb[0] === 'key' ? item : (symb[0] === 'value' ? val : val[symb[0]]))
  //           } else {
  //             final = val[symb[0]] + '' + val[symb[1]]
  //           }

  //           commit('saveMarket', final)
  //         }
  //         break

  //       case 'O': // Open operation
  //         result = result[data[lastIndex]]
  //         lastIndex++
  //         break
  //     }
  //   }

  //   commit('mutateMarket')
  //   commit('pushIntoCache', id)
  //   // console.log(state.list[0]['name'])
  //   return state.list
  // }
}

const mutations = {
  changeId (state, payload) {
    state.currentKey = payload.id
  },
  saveMarket (state, payload) {
    if (typeof state.list[payload.id] !== 'object') {
      state.list[payload.id] = {}
    }
    state.list[payload.id] = payload.list
  },
  mutateMarket (state) {
    // console.log(typeof state)
    state.list = Object.values(state.list).map((val) => ({name: val.base + '-' + val.quote, isActive: false}))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
