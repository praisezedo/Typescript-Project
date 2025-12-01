"use strict";
const display = document.querySelector('.display');
const addBtn = document.querySelector('.add-btn');
const subBtn = document.querySelector('.sub-btn');
const resetBtn = document.querySelector('.reset-btn');
const saveDisplay = document.querySelector('.saved-count');
let count = 0;
let fixed = 0;
function i() {
    count = count + 1;
    if (typeof display.innerHTML !== null) {
        display.innerHTML = count.toString();
    }
    else {
        return;
    }
}
function d() {
    count = count - 1;
    if (typeof display.innerHTML !== null) {
        display.innerHTML = count.toString();
        if (count <= 0) {
            count = 0;
            display.innerHTML = fixed.toString();
        }
    }
    else {
        return;
    }
}
function r() {
    count = 0;
    if (typeof display.innerHTML !== null) {
        display.innerHTML = count.toString();
    }
    else {
        return;
    }
}
function s() {
    let savedCount = count;
    saveDisplay.innerHTML = savedCount.toString();
}
