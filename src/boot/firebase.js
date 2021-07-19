// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"


// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCrYXPRUbRDfojzQCVh59gIdoanLLTGNq4",
  authDomain: "smartchat-6459e.firebaseapp.com",
  projectId: "smartchat-6459e",
  storageBucket: "smartchat-6459e.appspot.com",
  messagingSenderId: "575153108308",
  appId: "1:575153108308:web:a659078c943e4b66e004c1"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();
export { firebaseAuth, firebaseDb }