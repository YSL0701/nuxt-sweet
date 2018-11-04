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
    logout({ commit }) {
      auth.signOut().then(user => {
        commit('setUser', null)
      })
    },
    test({ commit }) {
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
      auth.useDeviceLanguage()
      auth
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken
            // ...
          }
          // The signed-in user info.
          var user = result.user
          commit('setUser', user)
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
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
