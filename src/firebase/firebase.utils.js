import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCS1hjs2aBfo0GWqA0Kz9XuXaz1ydGXXlY",
  authDomain: "crwn-db-97b2f.firebaseapp.com",
  projectId: "crwn-db-97b2f",
  storageBucket: "crwn-db-97b2f.appspot.com",
  messagingSenderId: "910452065951",
  appId: "1:910452065951:web:8e01e20a0a3631d2bdc4aa",
  measurementId: "G-EHDDCHMEEY",
};

initializeApp(config);

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
