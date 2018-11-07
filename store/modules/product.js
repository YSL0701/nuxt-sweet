import axios from 'axios'

export default {
  state: {
    allProducts: [],
    productsByPage: []
  },
  mutations: {
    setProducts(state, payload) {
      state.allProducts = payload
    },
    setProductsByPage(state, payload) {
      state.productsByPage = payload
    }
  },
  actions: {
    getAllProducts({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.PRODUCT_API}/products/all`).then(res => {
          commit('setProducts', res.data.products)
          resolve()
        })
      })
    },
    getProductsByPage({ commit }, page = 1) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.PRODUCT_API}/products/?page=${page}`).then(res => {
          commit('setProductsByPage', res.data.products)
          resolve()
        })
      })
    }
  }
}
