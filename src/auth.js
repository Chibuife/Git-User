// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth,
  onAuthStateChanged
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDicZI_NvCu9mVHg0vDzMX6MbgkdsyFA8w",
  authDomain: "user-1c690.firebaseapp.com",
  projectId: "user-1c690",
  storageBucket: "user-1c690.appspot.com",
  messagingSenderId: "701523677485",
  appId: "1:701523677485:web:307268ca72b3970324c3a4",
  measurementId: "G-7FHDCEVGNT"
};

const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseapp)
