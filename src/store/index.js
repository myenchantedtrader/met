import Vuex from 'vuex'
import Vue from 'vue'
// import cart from './cart'
// import products from './products'
import exchanges from './exchanges'
import keys from './keys'
import markets from './markets'

Vue.use(Vuex)

export default new Vuex.Store({
  debug: true,
  strict: true,
  modules: {
    // cart,
    // products
    exchanges,
    keys,
    markets
  }
})
