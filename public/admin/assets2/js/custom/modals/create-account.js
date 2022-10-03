/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
	var __webpack_exports__ = {};
	/*!**********************************************************************************!*\
	  !*** ../../../themes/metronic/html/demo1/src/js/custom/modals/create-account.js ***!
	  \**********************************************************************************/


	// Class definition
	var KTCreateAccount = function () {
		// Elements
		var modal;
		var modalEl;

		var stepper;
		var form;
		var formSubmitButton;
		var formContinueButton;
		var formPreviousButton;

		// Variables
		var stepperObj;
		var validations = [];
		var isEmailVerified = false;

		// Private Functions
		var initStepper = function () {
			// Initialize Stepper
			stepperObj = new KTStepper(stepper);

			// Stepper change event
			stepperObj.on('kt.stepper.changed', function (stepper) {

				if (stepperObj.getCurrentStepIndex() === 7) {
					refreshPetEnrollmentSummary();
				}

				if (stepperObj.getCurrentStepIndex() === 4) {
					formSubmitButton.classList.remove('d-none');
					formSubmitButton.classList.add('d-inline-block');
					formContinueButton.classList.add('d-none');
				} else if (stepperObj.getCurrentStepIndex() === 5 && !isEmailVerified) {
					formPreviousButton.classList.add('d-none');
					formContinueButton.classList.remove('d-none');
					formContinueButton.disabled = true;
					formContinueButton.setAttribute('data-kt-indicator', 'on');
					formSubmitButton.classList.add('d-none');
				} else {
					formSubmitButton.classList.remove('d-inline-block');
					formSubmitButton.classList.remove('d-none');
					formContinueButton.classList.remove('d-none');
					formPreviousButton.classList.remove('d-none');
				}
			});

			// Validation before going to next page
			stepperObj.on('kt.stepper.next', function (stepper) {
				console.log('stepper.next');



				// Validate form before change stepper step
				var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for currnt step

				if (validator) {
					validator.validate().then(function (status) {
						console.log('validated!');

						if (status == 'Valid') {

							if (isEmailVerified && stepper.getCurrentStepIndex() === 3) {
								stepper.goTo(6);
							} else {
								stepper.goNext();
							}

							KTUtil.scrollTop();
						} else {
							Swal.fire({
								text: "Sorry, looks like there are some errors detected, please try again.",
								icon: "error",
								buttonsStyling: false,
								confirmButtonText: "Ok, got it!",
								customClass: {
									confirmButton: "btn btn-light"
								}
							}).then(function () {
								KTUtil.scrollTop();
							});
						}
					});
				} else {
					stepper.goNext();

					KTUtil.scrollTop();
				}
			});

			// Prev event
			stepperObj.on('kt.stepper.previous', function (stepper) {
				console.log('stepper.previous');

				console.log(stepperObj.getCurrentStepIndex());

				const currentIndex = stepperObj.getCurrentStepIndex();

				if (isEmailVerified) {
					if (currentIndex === 6 || currentIndex === 5) {
						stepper.goTo(3);
						KTUtil.scrollTop();
						return;
					}
				}

				stepper.goPrevious();
				KTUtil.scrollTop();
			});
		}

		var refreshPetEnrollmentSummary = function () {

			const existingEnrollment = {};

			var spans = document.querySelectorAll('.enrollEmailSent');
			for (let i = 0; i < spans.length; i++) {
				spans[i].innerText = email;
			}

			const petNameEle = document.getElementById('petNameInput');
			const petName = petNameEle.value.trim();
			existingEnrollment.petName = petName;

			spans = document.querySelectorAll('.petNameSpan');
			for (let i = 0; i < spans.length; i++) {
				spans[i].innerText = petName;
			}


			const isMale = document.getElementById("male_choice").checked;
			const isDog = document.getElementById("dogChoice").checked;
			const species = isDog ? 'Dog' : 'Cat';
			const petSex = isMale ? 'Male' : 'Female';

			existingEnrollment.isMale = isMale;
			existingEnrollment.isDog = isDog;

			const petInformationDiv = document.getElementById('petInformationDiv');
			const petAgeInput = document.getElementById('petAgeInput');
			const petAge = petAgeInput.value;
			existingEnrollment.petAge = petAge;

			let yearOrYears = 'year';
			if (petAge !== 1) {
				yearOrYears += 's';
			}
			const petAgeString = `${petAge} ${yearOrYears} old`;

			const animalBreedSelect = document.getElementById('animalBreedSelect');
			console.log('tom', $(animalBreedSelect).val());
			existingEnrollment.petBreed = animalBreedSelect.value;
			const petBreed = animalBreedSelect.options[animalBreedSelect.selectedIndex].text;


			const isYearlySelected = document.getElementById('yearlyRadio').checked;
			const isMonthlySelected = document.getElementById('monthlyRadio').checked;

			if (isYearlySelected === false && isMonthlySelected === false) {
				$('#yearlyRadio').prop('checked', true).trigger('change');
			} else {
				updateCheckoutDetails(isYearlySelected ? 1 : 2);
			}


			const plans = ['Bronze', 'Silver', 'Gold'];
			const planIcons = ['bronzeSelected', 'silverSelected', 'goldSelected'];
			const planAmounts = ['$2500', '$5,000', '$7,500'];
			const planAmountsPerMonth = ['$35', '$55', '$95'];
			const planInputs = document.querySelectorAll('[name="member_plan"]');
			const membershipInfoDiv = document.getElementById('membershipInfoDiv');
			for (let i = 0; i < planInputs.length; i++) {
				if (planInputs[i].checked) {
					existingEnrollment.selectedPlan = i;
					document.querySelector('.membershipChosen').innerText = plans[i] + ' Membership';
					document.getElementById(planIcons[i]).style.display = 'flex';
					const selectedMembershipInfo = `
					Up to ${planAmounts[i]} annual benefit. <br/>
					Automatic renewal after 12 months.
					`;
					membershipInfoDiv.innerHTML = selectedMembershipInfo;
				} else {
					document.getElementById(planIcons[i]).style.display = 'none';
				}
			}

			/**
			 * TODO: also set these values as hidden input fields
			 */
			existingEnrollment.practiceId = localStorage.getItem('practiceId');
			existingEnrollment.vetId = localStorage.getItem('vetId');

			if (existingEnrollment.practiceId === null || existingEnrollment.vetId === null) {
				/**
				 * TODO: handle this error elegantly.
				 */
				alert('Error occurred. Please contact support. You can try a different browser.');
				return false;
			}

			existingEnrollment.owner = {
				firstName: document.getElementById('ownerFirstNameInput').value,
				lastName: document.getElementById('ownerLastNameInput').value,
				phoneNumber: document.getElementById('ownerCellPhoneNumberInput').value,
				billingAddress: {
					lineOne: document.getElementById('ownerBillingAddressLineOneInput').value,
					lineTwo: document.getElementById('ownerBillingAddressLineTwoInput').value,
					city: document.getElementById('ownerBillingAddressCityInput').value,
					state: document.getElementById('stateSelect').value,
					zip: document.getElementById('ownerBillingAddressZipcodeInput').value,
				}
			};


			localStorage.setItem('existingEnrollment', JSON.stringify(existingEnrollment));


			const html = `
			${petSex} ${species}<br/>
			${petAgeString}<br/>
			${petBreed}<br/>
			`;

			petInformationDiv.innerHTML = html;

			const checkoutBtn = document.getElementById('checkoutBtn');
			checkoutBtn.disabled = true;
			checkoutBtn.setAttribute("data-kt-indicator", "on");

			const createStripeSessionCallable = firebase.functions().httpsCallable('createStripeSession');
			createStripeSessionCallable({
				enrollment: existingEnrollment
			}).then((response) => {
				if (response.data.success) {
					const stripeSessionURL = response.data.session.url;
					console.log(stripeSessionURL);
					checkoutBtn.disabled = false;
					checkoutBtn.removeAttribute("data-kt-indicator");
					checkoutBtn.onclick = function (e) {
						e.preventDefault();
						window.location.replace(stripeSessionURL);
					};
				}
			});

		};

		var handleForm = function () {
			formSubmitButton.addEventListener('click', function (e) {
				// Validate form before change stepper step
				var validator = validations[3]; // get validator for last form

				validator.validate().then(function (status) {
					console.log('validated!');

					if (status == 'Valid') {
						// Prevent default button action
						e.preventDefault();

						// Disable button to avoid multiple click 
						formSubmitButton.disabled = true;

						// Show loading indication
						formSubmitButton.setAttribute('data-kt-indicator', 'on');

						// Simulate form submission
						/*
						setTimeout(function() {
							
						}, 2000);
						*/

						const IS_LIVE = false;
						const HOST = IS_LIVE ? "https://acuteplus.app" : "http://localhost:5000";
						/**
						 * TODO: ideally we would want to fix this such that 
						 * it doesn't rely on the redirect to auth ... 
						 */
						var actionCodeSettings = {
							// URL you want to redirect back to. The domain (www.example.com) for this
							// URL must be in the authorized domains list in the Firebase Console.
							url: HOST + '/email_verified/', // this is where we can add get parameters
							// This must be true.
							handleCodeInApp: true
						};

						const emailEle = document.getElementById('email');
						const email = emailEle.value.trim();

						firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
							.then(() => {
								// The link was successfully sent. Inform the user.
								// Save the email locally so you don't need to ask the user for it again
								// if they open the link on the same device.
								window.localStorage.setItem('emailForSignIn', email);
								// Hide loading indication
								formSubmitButton.removeAttribute('data-kt-indicator');
								// Enable button
								formSubmitButton.disabled = false;
								stepperObj.goNext();
							})
							.catch((error) => {
								var errorCode = error.code;
								var errorMessage = error.message;
								Swal.fire({
									text: errorCode + " " + errorMessage,
									icon: "error",
									buttonsStyling: false,
									confirmButtonText: "I'll try again later.",
									customClass: {
										confirmButton: "btn btn-light"
									}
								}).then(function () {
									KTUtil.scrollTop();
								});
							});



					} else {
						Swal.fire({
							text: "Sorry, looks like there are some errors detected, please try again.",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn btn-light"
							}
						}).then(function () {
							KTUtil.scrollTop();
						});
					}
				});
			});

		}

		var initValidation = function () {
			// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
			// Step 1
			validations.push(FormValidation.formValidation(
				form,
				{
					fields: {
						animal_type: {
							validators: {
								notEmpty: {
									message: 'You must select a species'
								}
							}
						}
					},
					plugins: {
						trigger: new FormValidation.plugins.Trigger(),
						bootstrap: new FormValidation.plugins.Bootstrap5({
							rowSelector: '.fv-row',
							eleInvalidClass: '',
							eleValidClass: ''
						})
					}
				}
			));

			// Step 2
			validations.push(FormValidation.formValidation(
				form,
				{
					fields: {
						'pet_name': {
							validators: {
								notEmpty: {
									message: 'Pet name is required'
								}
							}
						},
						'pet_age': {
							validators: {
								notEmpty: {
									message: 'Pet age is required'
								}
							}
						},
						'animal_sex': {
							validators: {
								notEmpty: {
									message: 'Pet sex is required'
								}
							}
						},
						'animal_breed': {
							validators: {
								notEmpty: {
									message: 'Breed is required'
								}
							}
						}
					},
					plugins: {
						trigger: new FormValidation.plugins.Trigger(),
						// Bootstrap Framework Integration
						bootstrap: new FormValidation.plugins.Bootstrap5({
							rowSelector: '.fv-row',
							eleInvalidClass: '',
							eleValidClass: ''
						})
					}
				}
			));

			// Step 3
			validations.push(FormValidation.formValidation(
				form,
				{
					fields: {},
					plugins: {
						trigger: new FormValidation.plugins.Trigger(),
						// Bootstrap Framework Integration
						bootstrap: new FormValidation.plugins.Bootstrap5({
							rowSelector: '.fv-row',
							eleInvalidClass: '',
							eleValidClass: ''
						})
					}
				}
			));

			// Step 4
			validations.push(FormValidation.formValidation(
				form,
				{
					fields: {
						'email': {
							validators: {
								notEmpty: {
									message: 'Email is required'
								},
								emailAddress: {
									message: 'The value is not a valid email address'
								}
							}
						},
						'email_2': {
							validators: {
								notEmpty: {
									message: 'Email is required'
								},
								emailAddress: {
									message: 'The value is not a valid email address'
								},
								callback: {
									message: 'The two emails do not match',
									callback: function (input) {
										const otherEmail = document.getElementById('email');
										return input.value == otherEmail.value;
									}
								}
							}
						}
					},
					plugins: {
						trigger: new FormValidation.plugins.Trigger(),
						// Bootstrap Framework Integration
						bootstrap: new FormValidation.plugins.Bootstrap5({
							rowSelector: '.fv-row',
							eleInvalidClass: '',
							eleValidClass: ''
						})
					}
				}
			));

			// Step 5
			validations.push(FormValidation.formValidation(
				form,
				{
					fields: {},
					plugins: {
						trigger: new FormValidation.plugins.Trigger(),
						// Bootstrap Framework Integration
						bootstrap: new FormValidation.plugins.Bootstrap5({
							rowSelector: '.fv-row',
							eleInvalidClass: '',
							eleValidClass: ''
						})
					}
				}
			));

			// Step 6
			validations.push(FormValidation.formValidation(
				form,
				{
					fields: {
						'ownerFirstName': {
							validators: {
								notEmpty: {
									message: 'First Name is required'
								}
							}
						},
						'ownerLastName': {
							validators: {
								notEmpty: {
									message: 'Last Name is required'
								}
							}
						},
						'ownerCellPhoneNumber': {
							validators: {
								notEmpty: {
									message: 'Cell Phone is required'
								}
							}
						},
						'ownerBillingAddressLineOne': {
							validators: {
								notEmpty: {
									message: 'Line One is required'
								}
							}
						},
						'ownerBillingAddressCity': {
							validators: {
								notEmpty: {
									message: 'City is required'
								}
							}
						},
						'ownerBillingAddressState': {
							validators: {
								notEmpty: {
									message: 'State is required'
								}
							}
						},
						'ownerBillingAddressZipcode': {
							validators: {
								notEmpty: {
									message: 'Zipcode is required'
								}
							}
						},
					},
					plugins: {
						trigger: new FormValidation.plugins.Trigger(),
						// Bootstrap Framework Integration
						bootstrap: new FormValidation.plugins.Bootstrap5({
							rowSelector: '.fv-row',
							eleInvalidClass: '',
							eleValidClass: ''
						})
					}
				}
			));




		}

		var handleFormSubmit = function () {

		}

		var setIsEmailVerified = function () {
			isEmailVerified = true;
		}

		var goToCheckoutStep = function () {
			isEmailVerified = true;
			stepperObj.goTo(7);
		}

		var goToOwnerDetailsStep = function () {
			formContinueButton.disabled = false;
			formContinueButton.removeAttribute('data-kt-indicator');
			isEmailVerified = true;
			stepperObj.goTo(6);
		}

		return {
			// Public Functions
			init: function () {
				// Elements
				modalEl = document.querySelector('#kt_modal_create_account');
				if (modalEl) {
					modal = new bootstrap.Modal(modalEl);
				}

				stepper = document.querySelector('#kt_create_account_stepper');
				form = stepper.querySelector('#kt_create_account_form');
				formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
				formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');
				formPreviousButton = stepper.querySelector('[data-kt-stepper-action="previous"]');

				initStepper();
				initValidation();
				handleForm();
			},
			goToCheckoutStep: goToCheckoutStep,
			setIsEmailVerified: setIsEmailVerified,
			goToOwnerDetailsStep: goToOwnerDetailsStep
		};
	}();

	window.KTCreateAccount = KTCreateAccount;

	// On document ready
	KTUtil.onDOMContentLoaded(function () {
		KTCreateAccount.init();
	});
	/******/
})()
	;
//# sourceMappingURL=create-account.js.map