import firebaseApp from '~/firebase/'
var { firebase, auth } = firebaseApp
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
      auth.createUserWithEmailAndPassword(payload.email, payload.password).then(user => user)
    },
    emailLogin({ commit }, payload) {
      auth.signInWithEmailAndPassword(payload.email, payload.password).then(user => {
        commit('setUser', user)
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
          })
      })
    },
    checkUser({ commit }) {
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
          commit('setUser', user)
          resolve(true)
        })
      })
    }
  }
}
