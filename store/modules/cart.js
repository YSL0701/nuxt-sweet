import axios from 'axios'

export default {
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload)
    },
    removeCartAll(state) {
      state.cart = []
    },
    saveCart(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setCart(state) {
      var localCart = localStorage.getItem('cart')
      if (localCart) {
        state.cart = localStorage.getItem('cart')
      }
    }
  },
  actions: {}
}
