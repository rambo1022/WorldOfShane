
const functions = require("firebase-functions");
const accountSid = 'AC492a6defb12e8b5500eeb1a8c66c533d';
const authToken = 'cdc2de510ff86f5c9b7dcf985e33adf7';
const client = require('twilio')(accountSid, authToken);

exports.sendMsg = functions.https.onCall( async (data, context) => {
    
    await client.messages 
      .create({ 
         body: data.text,  
         messagingServiceSid: 'MGd2057833deb688079642b2cd717d0926',      
         to: data.phone
       }) ;
      return {};
});

