import { db } from "./firebase.js";

const insertTestData = async () => {
    /**
     * WARNING. See below code.
     */
    const safeGuard = true;
    if (safeGuard) {
        alert('safe guard is true. Please advise.');
        return;
    }
    const acutePlusCustomerId = '0A3cnt7v2ecAQYxdwzY1fZNFZYx1';
    const acutePlusCustomerObj = {
        animals: ['Sheeba'],
        firstName: 'David',
        lastName: 'Seager',
        points: 0
    };
    const animalId = 'wHur1Ce5OstSgjwRT0U7';
    const animalObject = {
        animalType: 'Horse',
        vetId: 'CpBQbv9RlORPl5w87MAq',
        horseName: 'Sheeba',
        horseMicrochipNumber: '',
        horseSex: 'Mare',
        horseBreed: 'Oldenburg',
        selectedPlan: '1'
    };
    const subscriptionId = 'sub_1Jz0V7G8J3BCc7RDsAHFzNrd';
    const benefitWindowObj = {
        availableFunds: 750000,
        wellnessExamDates: [],
        coveredBenefits: {
            pbecPassport: 0,
            physicalExam: 0,
            performanceExam: 0,
            influenzaVaccine: 0,
            rhinoVaccine: 0,
            cogginsTest: 0,
            tetanusVaccine: 0,
            easternEncephalitisVaccine: 0,
            westernEncephalitisVaccine: 0,
            westNileVaccine: 0,
            floatTeeth: 0,
        },
        startDateInMs: 1636227624464
    };
    const benefitWindowId = 'QBmJpYrP4KAP1rskiJ1P';
    const practiceObj = {
        stripeAccountId: 'acct_1JmLfi4hkkVBSXTx',
        name: 'Palm Beach Equine Center'
    };

    const vets = [
        {
            fullName: 'SCOTT J. SWERDLIN, DVM, MRCVS',
            email: '',
            activeReferralCount: 0,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/acute-plus.appspot.com/o/avatars%2FwkWyh8jGxuhD6MBxren2tCvYHF13%2FCpBQbv9RlORPl5w87MAq?alt=media&token=cc99ab31-117d-445b-af28-52daf3d5b230'
        },
        {
            fullName: 'ROBERT W. BRUSIE, DVM, DACVS',
            email: '',
            activeReferralCount: 0,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/acute-plus.appspot.com/o/avatars%2FwkWyh8jGxuhD6MBxren2tCvYHF13%2F2yJ1aQ3SVCPK4ly0iezS?alt=media&token=dd0d15c4-5e4f-4815-b7b5-31128662d87d'
        },
        /*
        {
            fullName: 'PAUL WOLLENMAN, DVM',
            email: '',
            activeReferralCount: 0,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/acute-plus.appspot.com/o/avatars%2FwkWyh8jGxuhD6MBxren2tCvYHF13%2FBzV5KRci0zG4qGWf9iVY?alt=media&token=2db37fb2-cf87-4678-82d3-5f1d8f8c102d'
        },
        {
            fullName: 'PETER HEIDMANN, DVM, DACVIM',
            email: '',
            activeReferralCount: 0,
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/acute-plus.appspot.com/o/avatars%2FwkWyh8jGxuhD6MBxren2tCvYHF13%2FZNH96Fc9sitOaRzQxR6C?alt=media&token=f3b4ed8c-78b8-4cd2-8af4-039ff840abf5'
        }
        */
    ];

    const vetId = 'hJ665Iks2ENllzpYG7FfxuKJgTr1';
    const adminId = 'xLt3qLiBvXcd0xcJRN3M5Bew74H2';
    const practiceId = 'jlTqvArvrkPztOjKl7wo';

    await db.collection('users').doc(adminId).set({
        practiceId: 'wkWyh8jGxuhD6MBxren2tCvYHF13'
    });

    await db.collection('users').doc(vetId).set({
        practiceId: 'wkWyh8jGxuhD6MBxren2tCvYHF13'
    });

    await db.collection('practices').doc(practiceId).set(practiceObj).then(() => {
        // ADD SCOTT AS ADMIN
        db.collection('practices').doc(practiceId)
            .collection('admins').doc(adminId).set(vets[0]);
        db.collection('practices').doc(practiceId)
            .collection('vets').doc(adminId).set(vets[0]);
        // ADDING SIMPLE VET
        db.collection('practices').doc(practiceId)
            .collection('vets').doc(vetId).set(vets[1]);
    });

    return db.collection('acute_plus_customers').doc(acutePlusCustomerId).set(acutePlusCustomerObj).then(() => {
        db.collection('acute_plus_customers').doc(acutePlusCustomerId)
            .collection('animals').doc(animalId).set(animalObject).then(() => {
                db.collection('acute_plus_customers').doc(acutePlusCustomerId)
                    .collection('animals').doc(animalId)
                    .collection('subscriptions').doc(subscriptionId).set({}).then(() => {
                        db.collection('acute_plus_customers').doc(acutePlusCustomerId)
                            .collection('animals').doc(animalId)
                            .collection('subscriptions').doc(subscriptionId)
                            .collection('benefit_windows').doc(benefitWindowId).set(benefitWindowObj);

                        const request = {
                            acuteServicesRecieved: [
                                'fractureRepair',
                                'upperRespiratoryInfectionOrPneumonia'
                            ],
                            wellnessServicesRecieved: [
                                'performanceExam',
                                'floatTeeth'
                            ],
                            dateOfVisit: '1994-03-02',
                            descriptionOfVisitAndFindings: 'This was dope dude',
                            horseDied: false,
                            vetEmailAddress: 'ok@ok.com',
                            vetName: 'Tom Johnson',
                            vetPhoneNumber: '5558887777',
                            submissionDate: + new Date()
                        };


                        db.collection('practices').doc(practiceId)
                            .collection('customer_submitted_incidents').add({
                                animalId,
                                customerId: acutePlusCustomerId,
                                request
                            });

                    });
            });
    });

};

export { insertTestData };