"use strict";
const selectedType = document.getElementById('options');
const EmailCon = document.getElementById('email');
const PhoneCon = document.getElementById('phone');
const emailInput = document.getElementById('email-input');
const phoneInput = document.getElementById('phone-input');
const resultCon = document.getElementById('result-display');
const validateBtn = document.getElementById('verify-btn');
function toggleInputFields() {
    if (selectedType.value.trim() === 'Email Validation') {
        EmailCon.classList.remove('hidden');
        EmailCon.classList.add('visible');
        PhoneCon.classList.add('hidden');
        PhoneCon.classList.remove('visible');
    }
    else if (selectedType.value.trim() === 'Phone Validation') {
        PhoneCon.classList.remove('hidden');
        PhoneCon.classList.add('visible');
        EmailCon.classList.add('hidden');
        EmailCon.classList.remove('visible');
    }
    else {
        EmailCon.classList.add('hidden');
        PhoneCon.classList.add('hidden');
    }
}
const emailVerification = (email) => {
    const emailPattern = /^[0-9a-z]+@[\w{3,5}]+\.\w{2,3}$/gm;
    if (emailPattern.test(email) === true) {
        resultCon.innerText = 'Valid Email Address✅';
    }
    else {
        resultCon.innerText = 'Invalid Email Address❓';
    }
};
const phoneVerification = (phone) => {
    const phonePattern = /^(?:\+234|0)([789][01]\d{8})$/gm;
    if (phonePattern.test(phone) === true) {
        resultCon.innerText = 'Valid Phone Number✅';
    }
    else {
        resultCon.innerText = 'Invalid Phone Number❓';
    }
};
function checkValidationType() {
    if (selectedType.value.trim() === 'Email Validation') {
        emailVerification(emailInput.value.trim());
    }
    else if (selectedType.value.trim() === 'Phone Validation') {
        phoneVerification(phoneInput.value.trim());
    }
    else {
        resultCon.innerText = 'Please select a validation type';
    }
}
validateBtn.addEventListener('click', checkValidationType);
selectedType.addEventListener('change', toggleInputFields);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkValidationType();
    }
});
