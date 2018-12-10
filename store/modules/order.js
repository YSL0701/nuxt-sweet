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
    },
    addreceiptInfo(state, payload) {
      state.receiptInfo = payload
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
    },
    updateUnfinishedOrderToDb({ commit }, { uid, orderData }) {
      return db
        .collection('users')
        .doc(uid)
        .update({
          order_unfinished: orderData
        })
    },
    getUnfinishedOrder({ commit }, uid) {
      return new Promise((resolve, reject) => {
        db.collection('users')
          .doc(uid)
          .get()
          .then(user => {
            var unfinishedOrder = user.data().order_unfinished
            commit('addRecipientInfo', unfinishedOrder.recipientInfo)
            commit('addPaymentInfo', unfinishedOrder.paymentInfo)
            commit('addReceiptInfo', unfinishedOrder.receiptInfo)
            resolve()
          })
      })
    }
  }
}
