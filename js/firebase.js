import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcv6vHUy5aTI7AxyqkxoEmGTxWEnh2gTU",
  authDomain: "ultra-library.firebaseapp.com",
  projectId: "ultra-library",
  storageBucket: "ultra-library.appspot.com",
  messagingSenderId: "852458086551",
  appId: "1:852458086551:web:104b41729e5b09f19f49d2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
};