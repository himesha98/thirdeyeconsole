import firebase from "firebase/compat/app"
import "firebase/compat/database"
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCiqTCPv597pPAktTyJKybBQYluKrG7o6Q",
    authDomain: "thirdeye-8cc26.firebaseapp.com",
    databaseURL: "https://thirdeye-8cc26-default-rtdb.firebaseio.com",

    projectId: "thirdeye-8cc26",
    storageBucket: "thirdeye-8cc26.appspot.com",
    messagingSenderId: "971446173528",
    appId: "1:971446173528:web:3e75a66c0921edd6186f2d",
    measurementId: "G-BRPQ845TB3"
  };

const firebaseapp = firebase.initializeApp(firebaseConfig)
export const databaseRef = firebaseapp.database().ref()
export const notesRef = databaseRef.child("notes")
export const contentsRef = databaseRef.child("contents")
export const storage = getStorage()
const database = getDatabase(firebaseapp);

export default firebase;