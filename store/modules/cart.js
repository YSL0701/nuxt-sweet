import axios from 'axios'
import firebaseApp from '~/firebase/'
var { firebase, db } = firebaseApp
export default {
  state: {
    cart: []
  },
  mutations: {
    pushToCart(state, { id, price, title, imageUrl }) {
      state.cart.push({ id, qty: 1, price: parseInt(price, 10), title, imageUrl })
    },
    setMutipleProductToCart(state, payload) {
      state.cart = payload
    },
    removeCartAll(state) {
      state.cart = []
    },
    saveCartToLocal(state) {
      var saveData = state.cart.map(item => {
        return {
          id: item.id,
          qty: item.qty,
          price: item.price,
          title: item.title,
          imageUrl: item.imageUrl
        }
      })
      localStorage.setItem('cart', JSON.stringify(saveData))
    },
    localDataToCart(state) {
      var localCart = localStorage.getItem('cart')
      if (localCart) {
        state.cart = JSON.parse(localCart)
      }
    },
    qtyModify(state, { index, modify }) {
      state.cart[index].qty = state.cart[index].qty + modify
    },
    removeCartProduct(state, id) {
      var removeIndex = state.cart.findIndex(product => product.id === id)
      state.cart.splice(removeIndex, 1)
    }
  },
  actions: {
    addToDbCart({ commit }, { id, qty, uid, price, title, imageUrl }) {
      return db
        .collection('users')
        .doc(uid)
        .update({
          cart: firebase.firestore.FieldValue.arrayUnion({ id, qty, price, title, imageUrl })
        })
    },
    getDbCartData({ commit }, uid) {
      commit('removeCartAll')
      return new Promise((resolve, reject) => {
        db.collection('users')
          .doc(uid)
          .get()
          .then(user => {
            var dbCart = user.data().cart
            var localCart = localStorage.getItem('cart')
            if (localCart) {
              let localFilterData = JSON.parse(localCart).filter(local => {
                return dbCart.every(item => item.id !== local.id)
              })
              let mixCart = [...dbCart, ...localFilterData]
              commit('setMutipleProductToCart', mixCart)
              localStorage.removeItem('cart')
              resolve({ mixCart, uid })
            } else {
              commit('setMutipleProductToCart', dbCart)
            }
          })
      })
    },
    updateCartToDb({ commit }, { uid, newCart }) {
      return db
        .collection('users')
        .doc(uid)
        .update({
          cart: newCart
        })
    }
  }
}
