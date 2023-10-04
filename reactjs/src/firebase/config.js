import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAxXXOa4iWYpx8DAcc93ljP153eq08eVjM",
	authDomain: "react-chat-2e5ef.firebaseapp.com",
	projectId: "react-chat-2e5ef",
	storageBucket: "react-chat-2e5ef.appspot.com",
	messagingSenderId: "286209525102",
	appId: "1:286209525102:web:471ec56db5474bcc38ed7f",
	measurementId: "G-SN87C1TZT5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const FBProvider = new GoogleAuthProvider();
