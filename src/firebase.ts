// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkwjMtvu9VN1ll-6e2KqIvnN1oMtlpy_M",
  authDomain: "project-manager-4d3f3.firebaseapp.com",
  projectId: "project-manager-4d3f3",
  storageBucket: "project-manager-4d3f3.firebasestorage.app",
  messagingSenderId: "383445211297",
  appId: "1:383445211297:web:73247dfcc42534d62f78e0",
  measurementId: "G-LZPZ424J7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase Auth instance
export const auth = getAuth(app);