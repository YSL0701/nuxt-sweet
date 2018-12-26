import firebaseApp from '~/firebase/'
var { firebase, auth, db } = firebaseApp
// import Vue from 'vue'
export default {
  state: {
    user: '',
    isLogin: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    loginStatus(state, payload) {
      if (payload) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    }
  },
  actions: {
    emailRegistered({ commit }, payload) {
      return new Promise((resolve, reject) => {
        auth
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            commit('setUser', user.user)
            commit('loginStatus', true)
            resolve(user.user)
          })
          .catch(err => {
            console.log('err', err)
            if (err.code === 'auth/email-already-in-use') {
              return reject('email已被使用過！')
            } else if (err.code === 'auth/invalid-email') {
              return reject('email格式錯誤！')
            } else {
              return reject()
            }
          })
      })
    },
    emailLogin({ commit }, payload) {
      return new Promise((resolve, reject) => {
        auth
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(user => {
            commit('setUser', user)
            commit('loginStatus', true)
            console.log(user)
            resolve(user.user)
          })
          .catch(err => {
            console.log('err', err)
            if (err.code === 'auth/wrong-password') {
              return reject('密碼錯誤！')
            } else if (err.code === 'auth/user-not-found') {
              return reject('帳號不存在！')
            } else if (err.code === 'auth/invalid-email') {
              return reject('email格式錯誤！')
            } else {
              return reject()
            }
          })
      })
    },
    googleLogin({ commit }, payload) {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase.auth().useDeviceLanguage()
      return new Promise((resolve, reject) => {
        auth
          .signInWithPopup(provider)
          .then(function(result) {
            var token = result.credential.accessToken
            var user = result.user
            commit('setUser', user)
            commit('loginStatus', true)
            resolve(user)
          })
          .catch(function(error) {
            var errorCode = error.code
            var errorMessage = error.message
            var email = error.email
            var credential = error.credential
            reject()
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        auth.signOut().then(user => {
          commit('setUser', null)
          commit('loginStatus', false)
          resolve('uid')
        })
      })
    },
    fbLogin({ commit }) {
      var provider = new firebase.auth.FacebookAuthProvider()
      auth.useDeviceLanguage()
      return new Promise((resolve, reject) => {
        auth
          .signInWithPopup(provider)
          .then(function(result) {
            var token = result.credential.accessToken
            var user = result.user
            commit('setUser', user)
            commit('loginStatus', true)
            resolve(user)
          })
          .catch(function(error) {
            var errorCode = error.code
            var errorMessage = error.message
            var email = error.email
            var credential = error.credential
            reject()
          })
      })
    },
    twitterLogin({ commit }) {
      var provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().useDeviceLanguage()
      return new Promise((resolve, reject) => {
        auth
          .signInWithPopup(provider)
          .then(function(result) {
            var token = result.credential.accessToken
            var secret = result.credential.secret
            var user = result.user
            commit('setUser', user)
            commit('loginStatus', true)
            resolve(user)
          })
          .catch(function(error) {
            var errorCode = error.code
            var errorMessage = error.message
            var email = error.email
            var credential = error.credential
            reject()
          })
      })
    },
    checkUser({ commit }, uid) {
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
          commit('setUser', user)
          if (user.uid === uid) {
            resolve(user.uid)
          }
        })
      })
    },
    setUserToDb({ commit }, payload) {
      return new Promise((resolve, reject) => {
        db.collection('users')
          .doc(payload.uid)
          .get()
          .then(user => {
            if (!user.data()) {
              db.collection('users')
                .doc(payload.uid)
                .set({
                  uid: payload.uid,
                  cart: [],
                  order: [],
                  order_unfinished: {}
                })
            }
            resolve(payload)
          })
      })
    }
  }
}
