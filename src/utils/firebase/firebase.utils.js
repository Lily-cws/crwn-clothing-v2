// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGNZ0bccjLQAbHZ66BdkX4LN2KyooLhng",
  authDomain: "crwn-clothing-2ceca.firebaseapp.com",
  projectId: "crwn-clothing-2ceca",
  storageBucket: "crwn-clothing-2ceca.appspot.com",
  messagingSenderId: "953971939347",
  appId: "1:953971939347:web:77671764c362d21af3c7e6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize GoogleAuth Provider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Initialize Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  // console.log("userDocRef",userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  // console.log("userSnapShot", userSnapShot);
  // console.log("userSnapShot check if user exist in firebase db", userSnapShot.exists());


  // If user data does not exist
  // create / set the document with the data from userAuth in the firebase collection
  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // if user data exists
  // return userDocRef
  return userDocRef ;
};

export const createAuthUserWithEmailAndPassword = async (email,password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
};

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password);
};

export const signOutUser = async () => await signOut(auth);

// When a user successfully signs in, you can get information about the user in the observer.
// List of user properties available https://firebase.google.com/docs/auth/admin/manage-users?hl=en&authuser=0
// this is an open listener, hence beware of memory leak
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);



