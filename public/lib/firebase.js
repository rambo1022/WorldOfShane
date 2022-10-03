let db;
import { getBlob } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";
const initFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyBCQNBIg64yrIe81v0aj8CX7xmwRU2Jw9U",
        authDomain: "acute-plus.firebaseapp.com",
        projectId: "acute-plus",
        storageBucket: "acute-plus.appspot.com",
        messagingSenderId: "588537767627",
        appId: "1:588537767627:web:246cdbf097bd642fae5d4e"
    };
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    if (location.hostname === 'localhost') {
        firebase.functions().useEmulator("localhost", 5001);
       // db.useEmulator("localhost", 8080);
    }
};

export { initFirebase, db, getBlob };