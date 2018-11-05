import firebaseApp from '~/firebase/'
var { firebase, auth } = firebaseApp
export default {
  state: {
    user: ''
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
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
            resolve(user)
            commit('setUser', user)
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
      auth.signOut().then(user => {
        commit('setUser', null)
      })
    },
    googleLogin_redirect({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithRedirect(provider)
    },
    fbLogin({ commit }) {
      var provider = new firebase.auth.FacebookAuthProvider()
      auth.useDeviceLanguage()
      auth
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken
          var user = result.user
          commit('setUser', user)
        })
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          var email = error.email
          var credential = error.credential
        })
    },
    fbLogin_redirect({ commit }) {
      var provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithRedirect(provider)
    },
    twitterLogin({ commit }) {
      var provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().useDeviceLanguage()
      auth
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken
          var secret = result.credential.secret
          var user = result.user
          commit('setUser', user)
        })
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          var email = error.email
          var credential = error.credential
        })
    },
    twitterLogin_redirect({ commit }) {
      var provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().useDeviceLanguage()
      firebase.auth().signInWithRedirect(provider)
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
