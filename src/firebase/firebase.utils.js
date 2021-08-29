import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCS1hjs2aBfo0GWqA0Kz9XuXaz1ydGXXlY",
  authDomain: "crwn-db-97b2f.firebaseapp.com",
  projectId: "crwn-db-97b2f",
  storageBucket: "crwn-db-97b2f.appspot.com",
  messagingSenderId: "910452065951",
  appId: "1:910452065951:web:8e01e20a0a3631d2bdc4aa",
  measurementId: "G-EHDDCHMEEY",
};

const app = initializeApp(config);

const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot._document) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(doc(db, `users/${userAuth.uid}`), {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log("error creating user", e.message);
    }
  }

  return userRef;
};

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
