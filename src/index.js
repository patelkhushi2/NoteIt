import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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
    const provider = new GoogleAuthProvider();
    const btn = document.getElementById("googleLoginBtn");
    const status = document.getElementById("statusMsg");

    onAuthStateChanged(auth, (user) => {
      if (user) window.location.href = "home.html";
    });

    btn.addEventListener("click", async () => {
      status.className = "status";
      status.textContent = "Opening Google sign-in...";
      try {
        await signInWithPopup(auth, provider);
        window.location.href = "home.html";
      } catch (err) {
        console.error(err);
        status.className = "status error";
        if (err.code === "auth/popup-blocked") {
          status.textContent = "⚠️ Popup blocked! In Safari go to Settings → Websites → Pop-up Windows → set 127.0.0.1 to Allow.";
        } else if (err.code === "auth/unauthorized-domain") {
          status.textContent = "⚠️ Go to Firebase Console → Authentication → Settings → Authorized Domains → Add 127.0.0.1";
        } else {
          status.textContent = "❌ " + err.message;
        }
      }
    });