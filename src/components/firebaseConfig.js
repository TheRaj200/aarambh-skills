// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, GoogleAuthProvider, signInWithCredential, signInWithPhoneNumber } from "firebase/auth";

// Firebase configuration details
const firebaseConfig = {
    apiKey: "AIzaSyD9BO12zg69_rD6zWpf3IK-I1krUCKCfjQ",
    authDomain: "aarambh-9209f.firebaseapp.com",
    projectId: "aarambh-9209f",
    storageBucket: "aarambh-9209f.firebasestorage.app",
    messagingSenderId: "589360450650",
    appId: "1:589360450650:web:876d10ed871784e1899c63",
    measurementId: "G-HW2EHTLNDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";

export { auth, RecaptchaVerifier, GoogleAuthProvider, signInWithCredential, signInWithPhoneNumber };
