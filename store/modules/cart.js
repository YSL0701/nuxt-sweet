import axios from 'axios'
import firebaseApp from '~/firebase/'
var { firebase, db } = firebaseApp
export default {
  state: {
    cart: []
  },
  mutations: {
    setCart(state, payload) {
      state.cart.push(payload)
    },
    removeCartAll(state) {
      state.cart = []
    },
    saveCartToLocal(state) {
      var saveData = state.cart.map(item => {
        return {
          id: item.id,
          qty: item.qty
        }
      })
      localStorage.setItem('cart', JSON.stringify(saveData))
    },
    localDataToCart(state) {
      var localCart = localStorage.getItem('cart')
      if (localCart) {
        state.cart = localStorage.getItem('cart')
      }
    }
  },
  actions: {
    addToCart({ commit }, { id, qty, uid }) {
      return db
        .collection('users')
        .doc(uid)
        .update({
          cart: firebase.firestore.FieldValue.arrayUnion({ id, qty })
        })
    }
  }
}
