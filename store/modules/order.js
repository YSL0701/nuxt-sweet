import firebaseApp from '~/firebase/'
var { firebase, db } = firebaseApp
export default {
  state: {
    recipientInfo: {},
    paymentInfo: {},
    receiptInfo: {}
  },
  mutations: {
    addRecipientInfo(state, payload) {
      state.recipientInfo = payload
    },
    addPaymentInfo(state, payload) {
      state.paymentInfo = payload
    }
  },
  actions: {
    updateOrderToDb({ commit }, { uid, orderData }) {
      return db
        .collection('users')
        .doc(uid)
        .update({
          order: orderData
        })
    }
  }
}
