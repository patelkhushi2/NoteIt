# NoteIt
CSIT415 Final Project

Project Description: Web-based notetaking app that would be able to use text and folders. 

## Features 
- Google sign-in with Firebase Authentication
- Rich text note editor using Quill
- Create, edit, and delete notes
- Default folders: School, Work, and Personal
- Custom folder creation, renaming, colors, and deletion
- Favorites view
- Archived notes view
- Search by title, note content, or folder
- Sort notes by newest, oldest, title A-Z, or title Z-A
- Light and dark mode
- Accent color settings
- Export notes as PDF or TXT
- Copy notes to clipboard
- Firebase-backed support message form

## Tech Stack

- HTML
- CSS
- JavaScript
- Firebase Authentication
- Firebase Firestore
- Firebase Hosting
- Quill rich text editor

## Project Structure

```txt
src/
  index.html        Login page
  index.js          Login/auth logic
  home.html         Main notes page
  home.js           Notes, folders, search, archive, export, and support logic
  home_style.css    Main app styling
  toggle.js         Theme toggle logic
  firebase.js       Firebase configuration
firebase.json       Firebase hosting configuration
firestore.rules     Firestore security rules

Deployment 

The project is configured for Firebase deployement 

Group Members
- Shari Li
- Khushi Patel  
- Sade Adeaca
- Muhammad Javed

## Firebase Authentication Setup

The login page supports Google and verified email/password accounts. Before deploying:

1. In Firebase Console, open **Authentication > Sign-in method** and enable **Email/Password** and **Google**.
2. In **Authentication > Settings > Password policy**, require a minimum password length of at least 8 characters and enable the complexity requirements appropriate for the project.
3. Enable email enumeration protection for the Firebase project.
4. Deploy the Firestore ownership rules with `firebase deploy --only firestore:rules`.

## Note Sharing

Note owners can share a note with another verified NoteIT account by email. Shared notes appear under **Shared With Me** and remain read-only for recipients. Deploy the current Firestore rules before using this feature.
