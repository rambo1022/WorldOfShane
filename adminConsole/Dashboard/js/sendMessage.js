import { db, functions } from "./firebase.js"
import { collection, getDocs, addDoc, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-functions.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';

$(document).ready(async function () {
    $("#sendMessageSelector").change(function () {
        if ($(`#sendMessageSelector`).val() != "Specific") {
            $('#specificAmount').html("")
        } else {
            const htmlstring = `<input type="text" class="form-control" id="specificAmountInput"
             placeholder="Enter Full Name">`
            $('#specificAmount').html(htmlstring)
        }
    });
    
    $(document.body).on('click', '#sendTextMessage', async function () {
        const text = $('#messageText')
        const sendMsgCallable = httpsCallable(functions, 'sendMsg');
        await sendMsgCallable({ text: "text" }).then((result) => {
            console.log(result)
        });
    });
});

