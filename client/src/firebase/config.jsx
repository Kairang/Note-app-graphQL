// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.evn.VITE_apiKey,
  authDomain: import.meta.evn.VITE_authDomain,
  projectId: import.meta.evn.VITE_projectId,
  storageBucket: import.meta.evn.VITE_storageBucket,
  messagingSenderId: import.meta.evn.VITE_messagingSenderId,
  appId: import.meta.evn.VITE_appId,
  measurementId: import.meta.evn.VITE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
