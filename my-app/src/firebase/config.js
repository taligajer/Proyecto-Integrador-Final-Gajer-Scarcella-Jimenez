import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBDwWpam3ZSdvarPMgk0SonZBmsGydr5yw",
  authDomain: "prog3-tali-guille-delfi.firebaseapp.com",
  projectId: "prog3-tali-guille-delfi",
  storageBucket: "prog3-tali-guille-delfi.appspot.com",
  messagingSenderId: "583926250974",
  appId: "1:583926250974:web:4e2c916a75835c6861714f"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();