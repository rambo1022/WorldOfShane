import { db, functions } from "../../assets/js/firebase.js"
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
        const accountSid = 'AC492a6defb12e8b5500eeb1a8c66c533d';
        const authToken = '7b667d33fa6fe5e724806fc151bb76bf';
        const client = require('twilio')(accountSid, authToken);

        client.messages
            .create({
                to: '+15614022851'
            })
            .then(message => console.log(message.sid))
            .done();
    });
});

