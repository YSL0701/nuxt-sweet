import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '~/firebase.config.js'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

var firestore = firebase.firestore()

var settings = {
  timestampsInSnapshots: true
}

firestore.settings(settings)

// export var auth = firebase.auth()
// export var db = firestore
// export var fire = firebase
export default {
  firebase,
  auth: firebase.auth(),
  db: firestore
}
