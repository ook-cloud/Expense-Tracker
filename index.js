// ---------- State ----------
let transactions = [];
let selectedType = "income";

// ---------- DOM references ----------

// const form = document.getElementById("tx-form");
// const amountInput = document.getElementById("tx-amount");
// const categoryInput = document.getElementById("tx-category");
// const nameInput = document.getElementById("tx-name");
// const typeToggle = document.getElementById("type-toggle");
// const typeHidden = document.getElementById("tx-type");

// const balanceAmountEl = document.getElementById("balance-amount");
// const totalIncomeEl = document.getElementById("total-income");
// const totalExpenseEl = document.getElementById("total-expense");
// const txListEl = document.getElementById("tx-list");
// const emptyStateEl = document.getElementById("empty-state");
// const categoryStripEl = document.getElementById("category-strip");
// const monthLabelEl = document.getElementById("month-label");

// const STORAGE_KEY = "ledger-transactions";

// // ---------- Persistence ----------

// function loadTransactions() {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   if (stored) {
//     try {
//       transactions = JSON.parse(stored);
//     } catch (e) {
//       transactions = [];
//     }
//   }
// }

// function saveTransactions() {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
// }

// // ---------- Formatting helpers ----------

// function formatCurrency(amount) {
//   return (
//     Math.abs(amount).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }) + " ₮"
//   );
// }

// function setMonthLabel() {
//   const now = new Date();
//   const options = { month: "long", year: "numeric" };
//   monthLabelEl.textContent = now.toLocaleDateString("mn-MN", options);
// }

// // ---------- Type toggle (income / expense) ----------

// typeToggle.addEventListener("click", (event) => {
//   const pill = event.target.closest(".type-pill");
//   if (!pill) return;

//   selectedType = pill.dataset.type;
//   typeHidden.value = selectedType;

//   [...typeToggle.children].forEach((child) => {
//     child.classList.remove("active-income", "active-expense", "inactive");
//     if (child.dataset.type === selectedType) {
//       child.classList.add(
//         selectedType === "income" ? "active-income" : "active-expense",
//       );
//     } else {
//       child.classList.add("inactive");
//     }
//   });
// });

// // ---------- Form submit ----------

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const amount = parseFloat(amountInput.value);
//   const category = categoryInput.value;
//   const name = nameInput.value.trim() || category;

//   if (!amount || amount <= 0 || !category) return;

//   const transaction = {
//     id: Date.now(),
//     type: selectedType,
//     amount: amount,
//     category: category,
//     name: name,
//     date: new Date().toISOString(),
//   };

//   transactions.push(transaction);
//   saveTransactions();
//   render();

//   form.reset();
//   selectedType = "income";
//   typeHidden.value = "income";
//   [...typeToggle.children].forEach((child) => {
//     child.classList.remove("active-income", "active-expense", "inactive");
//     child.classList.add(
//       child.dataset.type === "income" ? "active-income" : "inactive",
//     );
//   });
// });

// // ---------- Delete transaction ----------

// function deleteTransaction(id) {
//   transactions = transactions.filter((tx) => tx.id !== id);
//   saveTransactions();
//   render();
// }

// // ---------- Calculations ----------

// function calculateBalance() {
//   return transactions.reduce((total, tx) => {
//     return tx.type === "income" ? total + tx.amount : total - tx.amount;
//   }, 0);
// }

// function calculateTotals() {
//   return transactions.reduce(
//     (totals, tx) => {
//       if (tx.type === "income") {
//         totals.income += tx.amount;
//       } else {
//         totals.expense += tx.amount;
//       }
//       return totals;
//     },
//     { income: 0, expense: 0 },
//   );
// }

// function calculateCategoryTotals() {
//   const expenseTx = transactions.filter((tx) => tx.type === "expense");
//   const categoryTotals = expenseTx.reduce((totals, tx) => {
//     totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
//     return totals;
//   }, {});
//   return categoryTotals;
// }

// // ---------- Rendering ----------

// function renderBalance() {
//   const balance = calculateBalance();
//   balanceAmountEl.textContent =
//     (balance < 0 ? "−" : "") + formatCurrency(balance);

//   const totals = calculateTotals();
//   totalIncomeEl.textContent = formatCurrency(totals.income);
//   totalExpenseEl.textContent = formatCurrency(totals.expense);
// }

// function renderTransactionList() {
//   txListEl.innerHTML = "";

//   if (transactions.length === 0) {
//     emptyStateEl.hidden = false;
//     return;
//   }
//   emptyStateEl.hidden = true;

//   const sorted = [...transactions].sort((a, b) => b.id - a.id);

//   sorted.forEach((tx) => {
//     const row = document.createElement("div");
//     row.className = "tx-row";

//     const sign = tx.type === "income" ? "+" : "−";
//     const amountClass = tx.type === "income" ? "pos" : "neg";
//     const dotClass = tx.type === "income" ? "" : "exp";

//     row.innerHTML = `
//       <div class="tx-left">
//         <div class="tx-dot ${dotClass}"></div>
//         <div>
//           <div class="tx-name">${escapeHtml(tx.name)}</div>
//           <div class="tx-cat">${escapeHtml(tx.category)}</div>
//         </div>
//       </div>
//       <div class="tx-right">
//         <div class="tx-amount ${amountClass}">${sign}${formatCurrency(tx.amount)}</div>
//         <button class="tx-delete" data-id="${tx.id}" aria-label="Delete transaction">✕</button>
//       </div>
//     `;

//     txListEl.appendChild(row);
//   });

//   // Wire up delete buttons

//   txListEl.querySelectorAll(".tx-delete").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       deleteTransaction(Number(btn.dataset.id));
//     });
//   });
// }

// function renderCategoryBreakdown() {
//   categoryStripEl.innerHTML = "";

//   const categoryTotals = calculateCategoryTotals();
//   const categories = Object.keys(categoryTotals);

//   if (categories.length === 0) return;

//   const maxTotal = Math.max(...Object.values(categoryTotals));

//   categories.forEach((category) => {
//     const total = categoryTotals[category];
//     const percent = maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0;

//     const chip = document.createElement("div");
//     chip.className = "cat-chip";
//     chip.innerHTML = `
//       <div class="name">${escapeHtml(category)}</div>
//       <div class="bar-track"><div class="bar-fill" style="width:${percent}%"></div></div>
//       <div class="val">${formatCurrency(total)}</div>
//     `;
//     categoryStripEl.appendChild(chip);
//   });
// }

// function escapeHtml(str) {
//   const div = document.createElement("div");
//   div.textContent = str;
//   return div.innerHTML;
// }

// function render() {
//   renderBalance();
//   renderTransactionList();
//   renderCategoryBreakdown();
// }

// // ---------- Init ----------

// loadTransactions();
// setMonthLabel();
// render();
// // ehnii udur
