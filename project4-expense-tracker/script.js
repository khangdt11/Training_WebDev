// Khai báo
const transactionForm = document.getElementById('transaction-form');
const decriptionElement = document.getElementById('description');
const ammoutElement = document.getElementById('amount');
const transactionList = document.getElementById('transaction-list');
const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income-amount');
const expensesElement = document.getElementById('expense-amount');
// Nếu không tồn tại transaction trả về rỗng
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

transactionForm.addEventListener('submit', addTransaction);

function addTransaction (e) {
    e.preventDefault();

    //Lấy dữ liệu từ form
    const desValue = decriptionElement.value.trim();
    const amount = Number(ammoutElement.value); //string
    
    transactions.push({
        id:Date.now(),
        desValue,
        amount
    })

    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateTransactionList();
    updateSumary();

    transactionForm.reset()
}   

function updateTransactionList() {
    transactionList.innerHTML = ``

    const sortedList = [...transactions].reverse();

    sortedList.forEach((transaction) => {
       const transactionElement = createTransactionElement(transaction);
       transactionList.appendChild(transactionElement);
    });
}


function createTransactionElement(transaction) {
    const li = document.createElement('li');
    li.classList.add('transaction');
    li.classList.add(transaction.amount > 0 ? 'income' : 'expense');

    li.innerHTML = `
        <span> ${transaction.desValue}</span>
        <span> ${transaction.amount}
            <button class = "delete-btn" onclick='removeTransaction(${transaction.id})'>x</button>
        </span>
    `;
    return li;
}

function updateSumary() {
    const balance = transactions.reduce((acc, transaction) => {
        return acc + transaction.amount;
    }, 0);

    const income = transactions.filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expenses = transactions.filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    // update UI
    balanceElement.textContent = formatCurrency(balance);
    incomeElement.textContent = formatCurrency(income);
    expensesElement.textContent = format(expenses);
}

function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number);
}

function removeTransaction (id) {
    transactions = transactions.filter( transaction => transaction.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    updateTransactionList();
    updateSumary();
}

// initial render
updateTransactionList();
updateSumary();

