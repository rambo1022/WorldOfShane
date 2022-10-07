import { db,functions } from "../../../public/assets/js/firebase.js"
import { collection, getDocs, addDoc, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-functions.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';


$(document).ready(async function () {
    loadCards();
    $(document.body).on('click', '#openMusicModal', async function () {
        $('#musicModal').modal('show')
    });
    $(document.body).on('click', '#addMusicBtn', async function () {
        const link = $('#musicLink').val()
        const size = $('#musicModalSize').val()
        const apple = $('#appleMusicLink').val()
        const youtube = $('#youtubeMusicLink').val()
        try { 
            const docRef = await addDoc(collection(db, "Music"), {
                Link: link,
                Size: size,
                Platforms:{
                    Apple: apple || null,
                    Youtube: youtube || null
                }
            });
            loadCards()
        } catch (e) {
            console.error("Error adding document: ", e);
        }3
    });
    $(document.body).on('click', '#removeMusicBtn', async function () {
        const uid = $(this).data('uid')
        removeCard(uid)
    });
    $(document.body).on('click', '#sendMsgBtn', async function () {
        const sendMsgCallable = httpsCallable(functions, 'sendMsg');
        await sendMsgCallable().then((result) => {
                console.log(result)
            });
    });
    $(document.body).on('click', '#closeModal', async function () {
        console.log('yo')
        $('#musicModal').modal('hide')
    });
});
async function loadCards() {
    //Resets the Rows that will contain the cards
    $(`#insertLinkSmall`).html("")
    $(`#insertLinkMedium`).html("")
    $(`#insertLinkLarge`).html("")
    //Finds all of the links, looks through their data, and uses the information to create the card
    const querySnapshot = await getDocs(collection(db, "Music"));
    querySnapshot.forEach((doc) => {
        const link = doc.data().Link
        let size = doc.data().Size
        if(doc.data().Platforms){
            const apple = doc.data().Platforms.Apple 
            const youtube = doc.data().Platforms.Youtube 
        }   
        if (size === "Small") {
            size = "width: 24rem;"
            const htmlstring = ` 
            <div class="col-4 mx-auto">
            <div class="card" id="sizeSmall" style="${size}">
            <div class="card-body">
            ${link}
            <div class="d-flex flex-row bd-highlight mb-3">
                <div class="row">
                    <img src="../../../public/admin/assets2/css/youtubeIcon.webp" height="50px" width="50px"> <img src="../../../public/admin/assets2/css/youtube.png" height="50px" width="50px">
                    
                </div>
            </div>
            <span></span>
            </div>
            <div class="col-sm">
                <button type="button" style="float:right;" data-uid=${doc.id} id="removeMusicBtn" class="btn btn-dark">Remove</button>
            </div>
            </div>
            </div>`
            $(`#insertLinkSmall`).append(htmlstring)
        } else if (size === "Medium") {
            size = "width: 36rem";
            const htmlstring = `
            <div class="col-6 mx-auto">
            <div class="card" style="}">
            <div class="card-body">
            ${link}
            </div>
            <div class="col-sm">
                <button type="button" style="float:right;" data-uid=${doc.id} id="removeMusicBtn" class="btn btn-dark">Remove</button>
            </div>
            </div>
            </div>`
            $(`#insertLinkMedium`).append(htmlstring)
        } else if (size === "Large") {
            size = ""
            const htmlstring = `
            <div class="col-12 mx-auto" >
            <div class="card" style="">
            <div class="card-body">
            ${link}
            </div>
            <div class="col-sm">
                <button type="button" style="float:right;" data-uid=${doc.id} id="removeMusicBtn" class="btn btn-dark">Remove</button>
            </div>
            </div>
            </div>`
            $(`#insertLinkLarge`).append(htmlstring)
        }
    });
}

async function removeCard(uid) {
    await deleteDoc(doc(db, "Music", uid));
    loadCards()

}





