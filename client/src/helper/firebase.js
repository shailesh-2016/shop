import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiXKmIlnlBNp7ksCU5Kx-4JuKBD_0DQAw",
  authDomain: "fir-23f38.firebaseapp.com",
  projectId: "fir-23f38",
  storageBucket: "fir-23f38.appspot.com", // ✅ correct spelling
  messagingSenderId: "429371171443",
  appId: "1:429371171443:web:bc110deaa5abb291e00006",
  measurementId: "G-CNY1NMP0QZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
