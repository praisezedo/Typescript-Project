
const amountDisplay = document.getElementById('display-amount')! as HTMLHeadingElement;
const typeSelect = document.getElementById('input-select')! as HTMLSelectElement;
const descriptionValue = document.getElementById('description-value')! as HTMLInputElement;
const amountValue = document.getElementById('amount-value')! as HTMLInputElement;
const addExpenceBtn = document.getElementById('add-expence-btn')! as HTMLButtonElement;
const dateValue = document.getElementById('date-value')! as HTMLInputElement;

const creditExpence = document.getElementById('credit-expence')! as HTMLDivElement;
const debitExpence = document.getElementById('debit-expence')! as HTMLDivElement;

const crebitSummaryDisplay = document.getElementById('display-summary-credit')! as HTMLHeadingElement;
const debitExpenceSummary = document.getElementById('display-summary-debit')! as HTMLHeadingElement;

class Expense {
  private static currentId = 0;
  readonly id: number;

  constructor(
    public type: "credit" | "debit",
    public desc: string,
    public amount: number,
    public date: string,
    id?: number 
  ) {
    if (typeof id === 'number') {
      this.id = id;
      // keep static counter up-to-date so new ids don't clash with restored ones
      if (id > Expense.currentId) Expense.currentId = id;
    } else {
      this.id = ++Expense.currentId;
    }
  }
}

const ExpenseItems: Expense[] = [];

// Save and load from localStorage
const STORAGE_KEY = 'track_expense_items';

function saveToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ExpenseItems));
  } catch (err) {
    console.error('Failed to save expenses to localStorage', err);
  }
}

function loadFromLocalStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw) as Array<{ id: number; type: "credit" | "debit"; desc: string; amount: number; date: string }>;
    ExpenseItems.length = 0;
    parsed.forEach(item => {
      // restore using constructor with id so next id stays unique
      ExpenseItems.push(new Expense(item.type, item.desc, item.amount, item.date, item.id));
    });
    updateUI();
  } catch (err) {
    console.error('Failed to load expenses from localStorage', err);
  }
}

// Add new expense entry
function addExpense() {
  const selectedType = typeSelect.value as "credit" | "debit";
  const description = descriptionValue.value.trim();
  const amount = Number(amountValue.value);
  const date = dateValue.value;
  if (!description || !amount || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const expense = new Expense(
    selectedType,
    description.toUpperCase(),
    amount,
    date
  );

  ExpenseItems.push(expense);

  // clear inputs
  descriptionValue.value = '';
  amountValue.value = '';
  dateValue.value = '';

  // persist and update UI
  saveToLocalStorage();
  updateUI();
}

// Delete an expense by ID
function deleteExpense(id: number) {
  const index = ExpenseItems.findIndex(exp => exp.id === id);
  if (index !== -1) {
    ExpenseItems.splice(index, 1);
    saveToLocalStorage(); // persist after deletion
    updateUI();
  }
}
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
        <div class="date">${exp.date}</div>
          <button class="delete-button" data-id="${exp.id}">X</button>
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

// Load saved expenses on startup
loadFromLocalStorage();

// Add new expense
addExpenceBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addExpense();
});
window.addEventListener('keydown' , (e) => {
     if(e.key === 'Enter') {
      addExpense();
     }
})
// Delete buttons 
function onDeleteClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const btn = target.closest(".delete-button") as HTMLButtonElement | null;

  if (btn) {
    const id = Number(btn.dataset.id);
    if (!isNaN(id)) deleteExpense(id);
  }
}

creditExpence.addEventListener("click", onDeleteClick);
debitExpence.addEventListener("click", onDeleteClick);




