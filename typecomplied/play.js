"use strict";
const amountDisplay = document.getElementById('display-amount');
const typeSelect = document.getElementById('input-select');
const descriptionValue = document.getElementById('description-value');
const amountValue = document.getElementById('amount-value');
const addExpenceBtn = document.getElementById('add-expence-btn');
const creditExpence = document.getElementById('credit-expence');
const debitExpence = document.getElementById('debit-expence');
const crebitSummaryDisplay = document.getElementById('display-summary-credit');
const debitExpenceSummary = document.getElementById('display-summary-debit');
const ExpenceItems = [];
let totalAmount = 0;
class Expence {
    constructor(type, desc, amount) {
        this.id = 0;
        this.amount = amount;
        this.desc = desc;
        this.type = type;
        this.id = ++Expence.currentId;
    }
}
Expence.currentId = 0;
function addExpenceItem() {
    creditExpence.innerHTML = '';
    debitExpence.innerHTML = '';
    for (let i = 0; i < ExpenceItems.length; i++) {
        const expItem = ExpenceItems[i];
        const selectedDiv = expItem.type === 'credit' ? creditExpence : debitExpence;
        const cssDiv = expItem.type === 'credit' ? 'credit-item' : 'debit-item';
        const template = `
      <div class=${cssDiv}>
        <div class='desc'>${expItem.desc}</div>
      <div class='amt'>₦${expItem.amount.toLocaleString()}</div>
      <div class='delete-button-div'>
    <button class='delete-button deleteExpence(${expItem.id})'>X</button>
      </div>
      </div>
    `;
        selectedDiv.insertAdjacentHTML('beforeend', template);
    }
}
function calculateTotalAmount() {
    return ExpenceItems.reduce((total, exp) => {
        let amount = exp.amount;
        if (exp.type === 'debit') {
            amount = -exp.amount;
        }
        total += amount;
        return total;
    }, 0);
}
function calculateSummary() {
    let debitTotal = 0;
    let creditTotal = 0;
    ExpenceItems.forEach(exp => {
        let amount = exp.amount;
        if (exp.type === 'credit') {
            creditTotal += amount;
            crebitSummaryDisplay.innerHTML = `Credit: ↑₦${creditTotal.toLocaleString()}.00`;
        }
        else {
            debitTotal += amount;
            debitExpenceSummary.innerHTML = `Debit: ↓₦${debitTotal.toLocaleString()}.00`;
        }
    });
}
function deleteExpence(id) {
    let exp = ExpenceItems.find((expense) => {
        return expense.id === id;
    });
    let index = ExpenceItems.indexOf(exp);
    ExpenceItems.splice(index, 1);
    displayExpenceItem();
}
function displayExpenceItem() {
    const selectedType = typeSelect.value === 'credit' ? 'credit' : 'debit';
    const amountResult = Number(amountValue.value);
    const exp = new Expence(selectedType, descriptionValue.value.toUpperCase(), amountResult);
    ExpenceItems.push(exp);
    totalAmount = calculateTotalAmount();
    amountDisplay.innerHTML = `Balance: ₦${totalAmount.toLocaleString()}.00`;
    descriptionValue.value = '';
    amountValue.value = '';
}
addExpenceBtn.addEventListener('click', (event) => {
    event.preventDefault();
    displayExpenceItem();
    calculateSummary();
    addExpenceItem();
});
