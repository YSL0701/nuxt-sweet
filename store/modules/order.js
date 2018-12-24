import firebaseApp from '~/firebase/'
var { firebase, db } = firebaseApp
export default {
  state: {
    recipientInfo: {},
    paymentInfo: {},
    receiptInfo: {},
    orderInfo: []
  },
  mutations: {
    addRecipientInfo(state, payload) {
      if (payload) {
        state.recipientInfo = payload
      }
    },
    addPaymentInfo(state, payload) {
      if (payload) {
        state.paymentInfo = payload
      }
    },
    addReceiptInfo(state, payload) {
      if (payload) {
        state.receiptInfo = payload
      }
    },
    clearOrderInfo(state) {
      state.recipientInfo = {}
      state.paymentInfo = {}
      state.receiptInfo = {}
    },
    setOrderInfo(state, payload) {
      state.orderInfo = payload
    },
    removeCompleteOrderInfo(state) {
      state.orderInfo = []
    }
  },
  actions: {
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
    },
    createOrder({ commit }, finalOrderData) {
      return db
        .collection('users')
        .doc(finalOrderData.uid)
        .update({
          order: firebase.firestore.FieldValue.arrayUnion(finalOrderData)
        })
    },
    getOrder({ commit }, uid) {
      return new Promise((resolve, reject) => {
        db.collection('users')
          .doc(uid)
          .get()
          .then(user => {
            var Order = user.data().order
            commit('setOrderInfo', Order)
            resolve()
          })
      })
    }
  }
}
