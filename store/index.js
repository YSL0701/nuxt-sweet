import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import product from './modules/product'
Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      product
    }
  })

export default store
