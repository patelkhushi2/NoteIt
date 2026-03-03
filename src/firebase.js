import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkTHZxPxxCU9duApGXrcQdh9-fB7YxtRU",
  authDomain: "noteit-e97f4.firebaseapp.com",
  projectId: "noteit-e97f4",
  storageBucket: "noteit-e97f4.firebasestorage.app",
  messagingSenderId: "574621367786",
  appId: "1:574621367786:web:40fb273a33409ecae38693"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };