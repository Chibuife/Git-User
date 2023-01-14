// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth,
  onAuthStateChanged
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDU1JUFGZuOjrxsn3A06nRvTJeZ9dcx-0E",
  authDomain: "git-users-6ccfb.firebaseapp.com",
  projectId: "git-users-6ccfb",
  storageBucket: "git-users-6ccfb.appspot.com",
  messagingSenderId: "734462876904",
  appId: "1:734462876904:web:71b4528b53e4b834a3bd5d",
  measurementId: "G-H50DFZH6RJ"
};

const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseapp)
