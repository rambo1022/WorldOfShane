import { insertTestData } from './insert_test_data.js';
import { db } from './firebase.js';
let practiceId = null;
let loggedInUser;
let isAdmin = null;
let isOnboarding = false;
let permissions;

const initFirebaseAuthWithCallbacks = (
    userIsLoggedInCallback,
    userIsNotLoggedInCallback,
    authErrorCallback
) => {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            loggedInUser = user;
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const insertParam = urlParams.get('insert');
            if (insertParam == 1) {
                await insertTestData();
            }
            db.collection('users').doc(user.uid).get().then(userRef => {
                const user = userRef.data();
                practiceId = user.practiceId;
                isOnboarding = user?.isOnboardUser === true;
                permissions = user.permissions;
                userIsLoggedInCallback();
            });
        } else {
            userIsNotLoggedInCallback();
        }
    }, function (error) {
        authErrorCallback(error);
    });
};

const isLoggedInUserAdmin = async () => {
    if (isAdmin !== null) {
        return isAdmin;
    }
    const practiceAdmin = await db.collection('practices').doc(practiceId)
        .collection('admins').doc(loggedInUser.uid).get();
    isAdmin = practiceAdmin.exists;
    return isAdmin;
};

const isLoggedInUserMasterAdmin = async () => {
    return loggedInUser.uid === '0A3cnt7v2ecAQYxdwzY1fZNFZYx1';
};

const isLoggedInUserAbleToApproveOrDenyIncidents = () => {
    return permissions?.approveOrDenyIncidents === true;
};

const getLoggedInUserId = () => {
    return loggedInUser.uid;
};

export { initFirebaseAuthWithCallbacks, practiceId, isLoggedInUserAdmin, isLoggedInUserMasterAdmin, isOnboarding, permissions, isLoggedInUserAbleToApproveOrDenyIncidents, getLoggedInUserId };