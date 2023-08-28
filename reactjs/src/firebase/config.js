import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

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
const auth = firebase.auth;
const db = firebase.firestore();

export { auth, db };
export default firebase;
