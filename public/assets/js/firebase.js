let db;
import { getBlob } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-storage.js";
const initFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDICIdZC31U_8vhxVpXMKXiL2PP15dXOW4",
        authDomain: "worldofshane-bca65.firebaseapp.com",
        databaseURL: "https://worldofshane-bca65-default-rtdb.firebaseio.com",
        projectId: "worldofshane-bca65",
        storageBucket: "worldofshane-bca65.appspot.com",
        messagingSenderId: "894302409537",
        appId: "1:894302409537:web:300c2711bf977e82e607c0"
      };
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    if (location.hostname === 'localhost') {
        firebase.functions().useEmulator("localhost", 5001);
        db.useEmulator("localhost", 8080);
    }
};

export { initFirebase, db, getBlob };