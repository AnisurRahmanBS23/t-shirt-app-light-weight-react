import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCtqsCpmJ1PuULfnY9cseLXOqdubctkF0w",
    authDomain: "web-app-33d8d.firebaseapp.com",
    projectId: "web-app-33d8d",
    storageBucket: "web-app-33d8d.firebasestorage.app",
    messagingSenderId: "468027197382",
    appId: "1:468027197382:web:397a99c31176e1752d14c7",
    measurementId: "G-RX91X8KQKT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
