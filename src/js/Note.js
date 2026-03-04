// ====== Firebase Setup ======
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔴 PASTE YOUR FIREBASE CONFIG HERE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQag1nQJPGm-LnxSCfIfUI42DNQ8Ev1_w",
  authDomain: "noteit-8b57d.firebaseapp.com",
  projectId: "noteit-8b57d",
  storageBucket: "noteit-8b57d.firebasestorage.app",
  messagingSenderId: "913521285762",
  appId: "1:913521285762:web:6f6eb3e2a377f78b2a729b",
  measurementId: "G-TK4K3XLZZR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ====== UI ELEMENTS ======
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authMessage = document.getElementById("authMessage");

const authSection = document.getElementById("auth-section");
const notesSection = document.getElementById("notes-section");

const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const notesList = document.getElementById("notesList");


// ====== REGISTER ======
registerBtn.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    authMessage.textContent = "Account created!";
  } catch (error) {
    authMessage.textContent = error.message;
  }
});


// ====== LOGIN ======
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    authMessage.textContent = "Logged in!";
  } catch (error) {
    authMessage.textContent = error.message;
  }
});


// ====== LOGOUT ======
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
});


// ====== AUTH STATE LISTENER ======
onAuthStateChanged(auth, async (user) => {
  if (user) {
    authSection.style.display = "none";
    notesSection.style.display = "block";
    loadNotes(user.uid);
  } else {
    authSection.style.display = "block";
    notesSection.style.display = "none";
  }
});


// ====== SAVE NOTE ======
saveNoteBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "notes"), {
    text: noteInput.value,
    userId: user.uid
  });

  noteInput.value = "";
  loadNotes(user.uid);
});


// ====== LOAD NOTES ======
async function loadNotes(userId) {
  notesList.innerHTML = "";

  const q = query(collection(db, "notes"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = doc.data().text;
    notesList.appendChild(li);
  });
}