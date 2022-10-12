import { db,functions } from "./firebase.js"
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
        await sendMsgCallable({text:"text"}).then((result) => {
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
            <div class="card" id="sizeSmall">
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
            <div style="display: flex; flex-direction:row; ">
            <div class="card" >
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






(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";


    // Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "USA",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "rgba(235, 22, 22, .7)"
                },
                {
                    label: "UK",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "rgba(235, 22, 22, .5)"
                },
                {
                    label: "AU",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "rgba(235, 22, 22, .3)"
                }
            ]
            },
        options: {
            responsive: true
        }
    });


    // Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(235, 22, 22, .5)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    });
    


    // Single Line Chart
    var ctx3 = $("#line-chart").get(0).getContext("2d");
    var myChart3 = new Chart(ctx3, {
        type: "line",
        data: {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [{
                label: "Salse",
                fill: false,
                backgroundColor: "rgba(235, 22, 22, .7)",
                data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Pie Chart
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(235, 22, 22, .7)",
                    "rgba(235, 22, 22, .6)",
                    "rgba(235, 22, 22, .5)",
                    "rgba(235, 22, 22, .4)",
                    "rgba(235, 22, 22, .3)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });

    
})(jQuery);

