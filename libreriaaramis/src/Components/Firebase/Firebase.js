import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDR_sGt6MEVBgZzktDgdSVXTP9i20yFhJQ",
    authDomain: "aramisdatabase.firebaseapp.com",
    projectId: "aramisdatabase",
    storageBucket: "aramisdatabase.appspot.com",
    messagingSenderId: "396925678938",
    appId: "1:396925678938:web:29e8c6ff4c919a66ddaf63",
    measurementId: "G-2CJ4MC1P2V"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);