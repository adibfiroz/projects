// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2SgtsO_Ecrv2_FHRbM4hVAqAyPKTLyHQ",
  authDomain: "bluwberry-b6147.firebaseapp.com",
  projectId: "bluwberry-b6147",
  storageBucket: "bluwberry-b6147.appspot.com",
  messagingSenderId: "71428007099",
  appId: "1:71428007099:web:4cc6ac13217d890cf5759e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
