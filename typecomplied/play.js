"use strict";
// =============================
// ELEMENT REFERENCES
// =============================
const amountDisplay = document.getElementById('display-amount');
const typeSelect = document.getElementById('input-select');
const descriptionValue = document.getElementById('description-value');
const amountValue = document.getElementById('amount-value');
const addExpenceBtn = document.getElementById('add-expence-btn');
const creditExpence = document.getElementById('credit-expence');
const debitExpence = document.getElementById('debit-expence');
const crebitSummaryDisplay = document.getElementById('display-summary-credit');
const debitExpenceSummary = document.getElementById('display-summary-debit');
// =============================
// DATA STRUCTURES
// =============================
class Expense {
    constructor(type, desc, amount) {
        this.type = type;
        this.desc = desc;
        this.amount = amount;
        this.id = ++Expense.currentId;
    }
}
Expense.currentId = 0;
const ExpenseItems = [];
// =============================
// CORE FUNCTIONS
// =============================
// Add new expense entry
function addExpense() {
    const selectedType = typeSelect.value;
    const description = descriptionValue.value.trim();
    const amount = Number(amountValue.value);
    if (!description || !amount || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }
    const expense = new Expense(selectedType, description.toUpperCase(), amount);
    ExpenseItems.push(expense);
    descriptionValue.value = '';
    amountValue.value = '';
    updateUI();
}
// Delete an expense by ID
function deleteExpense(id) {
    const index = ExpenseItems.findIndex(exp => exp.id === id);
    if (index !== -1) {
        ExpenseItems.splice(index, 1);
        updateUI();
    }
}
// =============================
// CALCULATIONS
// =============================
// Total account balance
function calculateTotalBalance() {
    return ExpenseItems.reduce((total, exp) => {
        return exp.type === "credit" ? total + exp.amount : total - exp.amount;
    }, 0);
}
// Total credit and debit summary
function calculateSummary() {
    let credit = 0;
    let debit = 0;
    ExpenseItems.forEach(exp => {
        exp.type === "credit" ? (credit += exp.amount) : (debit += exp.amount);
    });
    crebitSummaryDisplay.innerHTML = `Credit: ↑₦${credit.toLocaleString()}.00`;
    debitExpenceSummary.innerHTML = `Debit: ↓₦${debit.toLocaleString()}.00`;
}
// =============================
// RENDER FUNCTIONS
// =============================
// Re-render all items in the UI
function renderExpenseItems() {
    creditExpence.innerHTML = '';
    debitExpence.innerHTML = '';
    ExpenseItems.forEach(exp => {
        const container = exp.type === "credit" ? creditExpence : debitExpence;
        const cssClass = exp.type === "credit" ? "credit-item" : "debit-item";
        const template = `
      <div class="${cssClass}">
        <div class="desc">${exp.desc}</div>
        <div class="amt">₦${exp.amount.toLocaleString()}</div>
        <div class="delete-button-div">
          <button class="delete-button" data-id="${exp.id}">X</button>
        </div>
      </div>
    `;
        container.insertAdjacentHTML("beforeend", template);
    });
}
// Update balance, summary, and expense list
function updateUI() {
    const total = calculateTotalBalance();
    amountDisplay.innerHTML = `Balance: ₦${total.toLocaleString()}.00`;
    calculateSummary();
    renderExpenseItems();
}
// =============================
// EVENT LISTENERS
// =============================
// Add new expense
addExpenceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addExpense();
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addExpense();
    }
});
// Delete buttons (event delegation)
function onDeleteClick(e) {
    const target = e.target;
    const btn = target.closest(".delete-button");
    if (btn) {
        const id = Number(btn.dataset.id);
        if (!isNaN(id))
            deleteExpense(id);
    }
}
creditExpence.addEventListener("click", onDeleteClick);
debitExpence.addEventListener("click", onDeleteClick);
