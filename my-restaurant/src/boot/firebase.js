import * as firebase from "firebase/app";
import "firebase/firestore";
require("firebase/database");
require("firebase/firestore");
require("firebase/auth");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD1UjuW30l_O7lpBzzZD4WotIfLmK-k7co",
  authDomain: "my-pro-restaurant.firebaseapp.com",
  databaseURL: "https://my-pro-restaurant.firebaseio.com",
  projectId: "my-pro-restaurant",
  storageBucket: "my-pro-restaurant.appspot.com",
  messagingSenderId: "531534967637",
  appId: "1:531534967637:web:cf979f4b22bab01b2675dc"
};
// Initialize Firebase

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDB = firebaseApp.database();
let firebaseFirestore = firebaseApp.firestore();
let db = firebaseApp.firestore();

export { db, firebase, firebaseAuth, firebaseDB, firebaseFirestore };
