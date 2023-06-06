import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm4J9ZKsLz2ou9QaWYvrem0QuqDWnICBM",
  authDomain: "bluwberry-53eca.firebaseapp.com",
  projectId: "bluwberry-53eca",
  storageBucket: "bluwberry-53eca.appspot.com",
  messagingSenderId: "162391886076",
  appId: "1:162391886076:web:5c1af62be32467c9f32f79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
