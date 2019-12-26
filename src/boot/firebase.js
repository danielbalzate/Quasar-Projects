import * as firebase from "firebase/app";
import "firebase/firestore";

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: "AIzaSyBHNeLdixYx0-2Vvcj_Sh0UBADs_HXZn2E",
  authDomain: "quasar-l.firebaseapp.com",
  databaseURL: "https://quasar-l.firebaseio.com",
  projectId: "quasar-l",
  storageBucket: "quasar-l.appspot.com",
  messagingSenderId: "162761921861",
  appId: "1:162761921861:web:3cad29024e20992374da2c"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };
