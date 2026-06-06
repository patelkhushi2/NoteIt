import { auth, provider } from "./firebase.js"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emailAuthForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const displayNameInput = document.getElementById("displayName");
  const nameField = document.getElementById("nameField");
  const confirmPasswordField = document.getElementById("confirmPasswordField");
  const emailAuthBtn = document.getElementById("emailAuthBtn");
  const googleBtn = document.getElementById("googleLoginBtn");
  const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
  const signInTab = document.getElementById("signInTab");
  const createAccountTab = document.getElementById("createAccountTab");
  const status = document.getElementById("statusMsg");
  let isCreatingAccount = false;
  let isHandlingAuth = false;

  function isPasswordAccount(user) {
    return user.providerData.some((profile) => profile.providerId === "password");
  }

  function setStatus(message = "", type = "") {
    status.className = type ? `status ${type}` : "status";
    status.textContent = message;
  }

  function setBusy(isBusy) {
    emailAuthBtn.disabled = isBusy;
    googleBtn.disabled = isBusy;
    forgotPasswordBtn.disabled = isBusy;
  }

  function setMode(createAccount) {
    isCreatingAccount = createAccount;
    signInTab.classList.toggle("active", !createAccount);
    createAccountTab.classList.toggle("active", createAccount);
    signInTab.setAttribute("aria-selected", String(!createAccount));
    createAccountTab.setAttribute("aria-selected", String(createAccount));
    nameField.classList.toggle("hidden", !createAccount);
    confirmPasswordField.classList.toggle("hidden", !createAccount);
    displayNameInput.required = createAccount;
    confirmPasswordInput.required = createAccount;
    passwordInput.autocomplete = createAccount ? "new-password" : "current-password";
    emailAuthBtn.textContent = createAccount ? "Create Account" : "Sign In";
    forgotPasswordBtn.hidden = createAccount;
    setStatus();
  }

  function friendlyError(err) {
    switch (err.code) {
      case "auth/email-already-in-use":
        return "An account already exists for this email. Try signing in.";
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "The email or password is incorrect.";
      case "auth/invalid-email":
        return "Enter a valid email address.";
      case "auth/weak-password":
        return "Choose a stronger password with at least 8 characters.";
      case "auth/too-many-requests":
        return "Too many attempts. Wait a moment and try again.";
      case "auth/popup-blocked":
        return "Your browser blocked the Google sign-in popup. Allow popups and try again.";
      case "auth/unauthorized-domain":
        return "This domain is not authorized in Firebase Authentication settings.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in must be enabled in Firebase Authentication settings.";
      default:
        return err.message || "Authentication failed. Please try again.";
    }
  }

  onAuthStateChanged(auth, async (user) => {
    if (!user || isHandlingAuth) return;
    if (isPasswordAccount(user) && !user.emailVerified) {
      await signOut(auth);
      setStatus("Check your email and verify your account before signing in.", "success");
      return;
    }
    window.location.href = "home.html";
  });

  signInTab.addEventListener("click", () => setMode(false));
  createAccountTab.addEventListener("click", () => setMode(true));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!form.reportValidity()) return;
    if (isCreatingAccount && password.length < 8) {
      setStatus("Choose a password with at least 8 characters.", "error");
      return;
    }
    if (isCreatingAccount && password !== confirmPasswordInput.value) {
      setStatus("The passwords do not match.", "error");
      return;
    }

    isHandlingAuth = true;
    setBusy(true);
    setStatus(isCreatingAccount ? "Creating your secure account..." : "Signing you in...");
    try {
      if (isCreatingAccount) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: displayNameInput.value.trim() });
        await sendEmailVerification(credential.user);
        await signOut(auth);
        form.reset();
        setMode(false);
        setStatus("Account created. Check your email to verify your account, then sign in.", "success");
        return;
      }

      const credential = await signInWithEmailAndPassword(auth, email, password);
      if (!credential.user.emailVerified) {
        await sendEmailVerification(credential.user);
        await signOut(auth);
        setStatus("Verify your email before signing in. We sent you a new verification link.", "success");
        return;
      }
      window.location.href = "home.html";
    } catch (err) {
      console.error(err);
      if (isCreatingAccount && auth.currentUser) {
        await signOut(auth);
      }
      setStatus(friendlyError(err), "error");
    } finally {
      isHandlingAuth = false;
      setBusy(false);
    }
  });

  forgotPasswordBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    if (!email) {
      setStatus("Enter your email address first, then select forgot password.", "error");
      emailInput.focus();
      return;
    }

    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("If an account exists for that email, a password-reset link has been sent.", "success");
    } catch (err) {
      console.error(err);
      setStatus(friendlyError(err), "error");
    } finally {
      setBusy(false);
    }
  });

  googleBtn.addEventListener("click", async () => {
    setBusy(true);
    setStatus("Opening Google sign-in...");
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "home.html";
    } catch (err) {
      console.error(err);
      setStatus(friendlyError(err), "error");
    } finally {
      setBusy(false);
    }
  });
});
