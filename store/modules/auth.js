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
      provider.setCustomParameters({
        login_hint: 'user@example.com'
      })
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
    checkUser({ commit }) {
      auth.onAuthStateChanged(user => {
        commit('setUser', user)
      })
    }
  }
}
