import { getAuth, signInWithCredential, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const functions = require("firebase-functions");
const accountSid = 'AC492a6defb12e8b5500eeb1a8c66c533d';
const authToken = 'ef244d3f9560b4afd810246f61dde73a';
const client = require('twilio')(accountSid, authToken);

exports.sendMsg = functions.https.onCall(async (data, context) => {
    console.log("hello")
    client.messages
        .create({
            body: data.text,
            messagingServiceSid: 'MGd2057833deb688079642b2cd717d0926',
            to: '+15618183829'
        })
        .then(message => console.log(message.sid))
        .done();
    return ({ data: message.sid })
});

