// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNhmpNwLp5UzcNqtRLBZ034EOjS0uSx8M",
  authDomain: "kanban-app-e9014.firebaseapp.com",
  projectId: "kanban-app-e9014",
  storageBucket: "kanban-app-e9014.firebasestorage.app",
  messagingSenderId: "732887279792",
  appId: "1:732887279792:web:b19ec25a6fcb28574d3375"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Authentification
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);