import { isLoggedInUserAdmin } from "./firebase_auth.js";

const spinner = '<span class="spinner-border spinner-border-sm align-middle ms-2"></span>';
const spinnerHidden = '<span style="display:none" class="spinner-border spinner-border-sm align-middle ms-2"></span>';
const spinnerLarge = '<span class="spinner-border spinner-border-lg align-middle ms-2"></span>';

const redirectToLoginPage = () => {
    window.location.replace("../login/");
};

const dateToYMD = (date, alternative = false) => {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    if (alternative) {
        return '' + (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y;
    } else {
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }
}

function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

const initCommonListeners = async () => {
    $('#signoutBtn').on('click', function (e) {
        e.preventDefault();
        firebase.auth().signOut();
    });

    /**
     * We should be using express accounts
     */
    let shouldFetch = false;
    const isAdmin = await isLoggedInUserAdmin();

    if (!isAdmin) {
        shouldFetch = false;
    } else if (typeof (Storage) !== "undefined") {
        const stripeDashboardLastFetchDate = localStorage.getItem('stripeDashboardLastFetchDate');
        if (stripeDashboardLastFetchDate !== null) {
            const now = +new Date();
            const diffMS = now - stripeDashboardLastFetchDate;
            if (diffMS <= 600000) {
                shouldFetch = false;
            }
        }
    }
    if (shouldFetch) {
        const createExpressLinkCallable = firebase.functions().httpsCallable('createExpressLink');
        createExpressLinkCallable().then((response) => {
            $('#stripeExpressDashboardLink').attr('href', response.data.url);
            $('#stripeExpressDashboardLink .menu-title').text('Express Dashboard');
            localStorage.setItem('stripeDashboardLastFetchDate', +new Date());
            localStorage.setItem('stripeDashboardURL', response.data.url);
        });
    } else {
        if (isAdmin && false) {
            // $('#stripeExpressDashboardLink').attr('href', localStorage.getItem('stripeDashboardURL'));
            // $('#stripeExpressDashboardLink .menu-title').text('Express Dashboard');
        } else {
            $('#stripeExpressDashboardLink').parent().remove();
        }
    }

};

function convertToMoneyString(val) {
    let moneyString = '$';
    if (val === 0) {
        return moneyString + val;
    }
    val = val.toString();
    moneyString += val.substring(0, val.length - 2) + '.' + val.substring(val.length - 2, val.length);
    return moneyString;
}

const dropZoneWithId = function (id) {
    return `
        <form class="form" action="none" method="post">
            <div class="fv-row">
                <div style='margin:1em;' class="dropzone" id="${id}">
                    <div class="dz-message needsclick">
                        <i class="bi bi-file-earmark-arrow-up text-primary fs-3x"></i>
                        <div class="ms-4">
                            <h3 class="fs-5 fw-bolder text-gray-900 mb-1">Drop files here or click to upload.</h3>
                            <span class="fs-7 fw-bold text-gray-400">Upload up to 10 files</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    `;
};

export { spinner, spinnerLarge, redirectToLoginPage, dateToYMD, initCommonListeners, datediff, convertToMoneyString, spinnerHidden, dropZoneWithId };