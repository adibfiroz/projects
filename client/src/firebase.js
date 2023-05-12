import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxqbPQSqSoMVsIqe789IJ95DcaFjGR7qM",
  authDomain: "videoapp-bc84e.firebaseapp.com",
  projectId: "videoapp-bc84e",
  storageBucket: "videoapp-bc84e.appspot.com",
  messagingSenderId: "52001409572",
  appId: "1:52001409572:web:946dee6980055bda6166b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
