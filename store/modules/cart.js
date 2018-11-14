import axios from 'axios'
import firebaseApp from '~/firebase/'
var { firebase, db } = firebaseApp
export default {
  state: {
    cart: []
  },
  mutations: {
    setCart(state, payload) {
      state.cart.push({ id: payload.id, qty: 1 })
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
        state.cart = JSON.parse(localCart)
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
    },
    getDbCartData({commit},uid){
      db.collection('users').doc(uid).get().then(user=>{
        var dbCart = user.data().cart
        var localCart = localStorage.getItem('cart')
        if(localCart){
          JSON.parse(localCart).
        }
      })
    }
  }
}
