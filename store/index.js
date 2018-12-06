import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import product from './modules/product'
import cart from './modules/cart'
import message from './modules/message'
import loading from './modules/loading'
import order from './modules/order'
Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      product,
      cart,
      message,
      loading,
      order
    }
  })

export default store
