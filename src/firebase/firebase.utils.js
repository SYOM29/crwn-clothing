import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  onSnapshot,
  runTransaction,
  setDoc,
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);

  try {
    await runTransaction(db, async (transaction) => {
      objectsToAdd.forEach((object) => {
        const newDocRef = doc(collectionRef);
        transaction.set(newDocRef, object);
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export const getCollections = (updateCollections) => {
  const collectionRef = collection(db, "collections");

  onSnapshot(collectionRef, (snapShot) => {
    const collectionsMap = convertCollections(snapShot);
    updateCollections(collectionsMap);
  });
};

const convertCollections = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);
