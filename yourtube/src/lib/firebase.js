// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP6T5zkC3wvC4pBZlp6ZWzZ6qbzIcPFSg",
  authDomain: "yourtube-c7544.firebaseapp.com",
  projectId: "yourtube-c7544",
  storageBucket: "yourtube-c7544.firebasestorage.app",
  messagingSenderId: "434747226345",
  appId: "1:434747226345:web:ebde8bc095a8fbafc15878"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
