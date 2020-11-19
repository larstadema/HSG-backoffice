import Firebase from 'firebase/app'
import 'firebase/auth' // for authentication
import 'firebase/firestore' // for cloud firestore
import 'firebase/functions' // for cloud functions
import 'firebase/analytics' // for analytics

let config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
}

const Fire = Firebase.initializeApp(config)
var db = Firebase.firestore()
if (window.location.hostname === 'localhost') {
  db.settings({
    host: 'localhost:8080',
    ssl: false,
  })
}
Firebase.analytics()
export default Fire
