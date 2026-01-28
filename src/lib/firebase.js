import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDkKUluDS4IgNwmhpw4cYdtf_3W97QOc4",
  authDomain: "voteverse-b7f3a.firebaseapp.com",
  projectId: "voteverse-b7f3a",
  storageBucket: "voteverse-b7f3a.firebasestorage.app",
  messagingSenderId: "24171050681",
  appId: "1:24171050681:web:4eee171404f434faa80d68",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopup = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  return { idToken, user: result.user };
};
