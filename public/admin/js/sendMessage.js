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
        placeholder="Enter specific amount">`
            $('#specificAmount').html(htmlstring)
        }
    });
});

