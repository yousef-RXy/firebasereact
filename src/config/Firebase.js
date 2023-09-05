// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA0eUAf0f5nE7J7EQR-Xckr9QYXNHlbH1Y",
	authDomain: "jou-rx.firebaseapp.com",
	projectId: "jou-rx",
	storageBucket: "jou-rx.appspot.com",
	messagingSenderId: "503513017879",
	appId: "1:503513017879:web:4f9f2f365d179aad037652",
	measurementId: "G-CWCKX3RPEW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
