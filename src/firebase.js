// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcYWRhjWu__EoCKd4j97fJ1cSadg16HV0",
  authDomain: "realtor-clone-react-8874b.firebaseapp.com",
  projectId: "realtor-clone-react-8874b",
  storageBucket: "realtor-clone-react-8874b.appspot.com",
  messagingSenderId: "674837230156",
  appId: "1:674837230156:web:71048ef114d599e5b67ae9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()