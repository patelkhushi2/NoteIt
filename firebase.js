import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkTHZxPxxCU9duApGXrcQdh9-fB7YxtRU",
  authDomain: "noteit-e97f4.firebaseapp.com",
  projectId: "noteit-e97f4",
  storageBucket: "noteit-e97f4.firebasestorage.app",
  messagingSenderId: "574621367786",
  appId: "1:574621367786:web:40fb273a33409ecae38693",
  measurementId: "G-T1S9HBPNKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);