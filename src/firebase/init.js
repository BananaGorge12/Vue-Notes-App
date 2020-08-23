import firebase from 'firebase'
//import firestore from 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyAp7NVDm5UQ0ziU_ex-IFU7JA1pqZagNQE",
    authDomain: "geegle-keep.firebaseapp.com",
    databaseURL: "https://geegle-keep.firebaseio.com",
    projectId: "geegle-keep",
    storageBucket: "geegle-keep.appspot.com",
    messagingSenderId: "403895443137",
    appId: "1:403895443137:web:302adcdb64a01834023e40",
    measurementId: "G-X7NG6BM8BD"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore()
  firebase.analytics();