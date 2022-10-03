import { getAuth, getRedirectResult, signInWithRedirect, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { db, functions } from "../../assets/js/firebase.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-functions.js";
const provider = new GoogleAuthProvider();

const auth = getAuth();
$(document).ready(async function () {
    const loginBtn = $('#signInWithGoogle')
    $(document.body).on('click', '#signInWithGoogle', async function () {
        console.log("clicked")
        signInWithRedirect(auth, provider)
    }); 
    getRedirectResult(auth)
    .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
});

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    //use this object to construct a generated chart 
    data: {
        labels: ['October'],
        datasets: [{
            label: 'Visits',
            data: [12],
            backgroundColor: [
                'rgba(54, 162, 235)',
            ],
            borderColor: [
                'rgba(54, 162, 235)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});


