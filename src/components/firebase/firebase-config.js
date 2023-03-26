import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  // apiKey: "AIzaSyCUxOU-JgclfDmmRpisoiZZ6scAsJ3q6Xk",
  // authDomain: "lafih-974bb.firebaseapp.com",
  projectId: "lafih-974bb",
  storageBucket: "lafih-974bb.appspot.com",
  messagingSenderId: "835410521435",
  appId: "1:835410521435:web:788fa183194dba088ebe7e",
  measurementId: "G-5BDG9Z3ZQB",
});

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
