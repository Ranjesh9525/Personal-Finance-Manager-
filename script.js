// Define an array to store the income and expense transactions
let transactions = [];

// Function to show prompt and update heading
function showPrompt() {
  const name = prompt("Please enter your name:");
  const headingElement = document.getElementById('heading');
  headingElement.textContent = `${name}'s Finance Tracker`;
  if(name == null){
    headingElement.textContent = `Personal Finance Tracker`;
  }
}

// Function to calculate the total balance
function calculateBalance() {
  let balance = 0;
  transactions.forEach(transaction => {
    if (transaction.type === 'income') {
      balance += transaction.amount;
    } else if (transaction.type === 'expense') {
      balance -= transaction.amount;
    }
  });
  return balance;
}


// Function to display the transactions and balance on the web page
function displayTransactions() {
  const transactionTable = document.getElementById('transaction-table');
  const balanceElement = document.getElementById('balance');

  // Clear the table and balance element
  transactionTable.innerHTML = '';
  balanceElement.textContent = '';

  transactions.forEach(transaction => {
    // Create a new row for each transaction
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.description}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.type}</td>
      <td>
        <button class="edit-button" onclick="editTransaction(${transaction.id})">Edit</button>
        <button class="delete-button" onclick="deleteTransaction(${transaction.id})">Delete</button>
      </td>
    `;

    transactionTable.appendChild(row);
  });

  // Display the current balance
  balanceElement.textContent = calculateBalance();
}

// Function to add a new transaction
function addTransaction() {
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const typeSelect = document.getElementById('type');

  const description = descriptionInput.value;
  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  if (description && amount) {
    const newTransaction = {
      id: Date.now(), // Generate a unique ID using the current timestamp
      description,
      amount,
      type
    };

    transactions.push(newTransaction);
    displayTransactions();

    // Reset the input fields
    descriptionInput.value = '';
    amountInput.value = '';
    typeSelect.value = 'income';
  }
}

// Function to edit a transaction
function editTransaction(id) {
  const transaction = transactions.find(transaction => transaction.id === id);
  if (transaction) {
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const typeSelect = document.getElementById('type');

    // Set the input fields to the values of the selected transaction
    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    typeSelect.value = transaction.type;

    // Remove the transaction from the array
    transactions = transactions.filter(transaction => transaction.id !== id);
    displayTransactions();
  }
}

// Function to delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  displayTransactions();
}

// Add event listener to the "Add Transaction" button
const addTransactionButton = document.getElementById('add-transaction');
addTransactionButton.addEventListener('click', addTransaction);

// Display initial transactions
displayTransactions();

