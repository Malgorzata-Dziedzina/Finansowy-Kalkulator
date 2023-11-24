document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector("#add-income");
  const incomeList = document.querySelector("#income-list");
  let availableAmount = document.querySelector("#available-amount");
  let totalIncome = document.querySelector("#total-income");

  const addExpense = document.querySelector("#add-expense");
  const expenseList = document.querySelector("#expense-list");
  let totalExpenses = document.querySelector("#total-expenses");

  function updateSummary() {
    let incomeTotal = 0;
    Array.from(incomeList.children).forEach((li) => {
      const valueSpan = li.querySelector(".income-value");
      if (valueSpan) {
        incomeTotal += parseFloat(valueSpan.innerText);
      }
    });

    let expenseTotal = 0;
    Array.from(expenseList.children).forEach((li) => {
      const valueSpan = li.querySelector(".expense-value");
      if (valueSpan) {
        expenseTotal += parseFloat(valueSpan.innerText);
      }
    });

    let balance = incomeTotal - expenseTotal;

    if (balance < 0) {
      availableAmount.innerText = `Jesteś na minusie ${Math.abs(balance)} zł`;
    } else if (balance === 0) {
      availableAmount.innerText = "Bilans wynosi 0 zł";
    } else {
      availableAmount.innerText = `Możesz jeszcze wydać ${balance} zł`;
    }

    totalIncome.innerText = incomeTotal;
    totalExpenses.innerText = expenseTotal;
  }

  addButton.addEventListener("click", function () {
    const incomeName = document.querySelector("#income-name").value;
    const incomeValue = document.querySelector("#income-value").value;

    if (!isNaN(incomeValue) && incomeValue >= 0) {
      const li = document.createElement("li");

      li.innerHTML = `${incomeName}: <span class="income-value">${incomeValue}</span>
                                            <button class="edit">Edytuj</button>
                                            <button class="delete">Usuń</button>`;

      incomeList.appendChild(li);
      document.querySelector("#income-name").value = "";
      document.querySelector("#income-value").value = "";
      updateSummary();
    } else {
      alert("Wprowadź poprawne dane");
    }
  });

  incomeList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete")) {
      event.target.parentElement.remove();
      updateSummary();
    } else if (event.target.classList.contains("edit")) {
      const li = event.target.parentElement;
      const incomeName = li.childNodes[0].nodeValue.trim().slice(0, -1);
      const incomeValue = li.querySelector(".income-value").innerText;

      li.innerHTML = `Nazwa: <input type="text" value="${incomeName}" class="edit-name">
                        Kwota: <input type="number" value="${incomeValue}" class="edit-value">
                        <button class="save">Zapisz</button>`;
    } else if (event.target.classList.contains("save")) {
      const li = event.target.parentElement;
      const newName = li.querySelector(".edit-name").value;
      const newValue = parseFloat(li.querySelector(".edit-value").value);

      if (!isNaN(newValue) && newValue >= 0) {
        li.innerHTML = `${newName}: <span class="income-value">${newValue}</span>
                                            <button class="edit">Edytuj</button>
                                            <button class="delete">Usuń</button>`;
        updateSummary();
      } else {
        alert("Proszę podać prawidłową kwotę");
      }
    }
  });

  addExpense.addEventListener("click", function () {
    const expenseName = document.querySelector("#expense-name").value;
    const expenseValue = document.querySelector("#expense-value").value;

    if (!isNaN(expenseValue) && expenseValue >= 0) {
      const li = document.createElement("li");

      li.innerHTML = `${expenseName}: <span class="expense-value">${expenseValue}</span>
                                      <button class="edit-expense">Edytuj</button>
                                      <button class="delete-expense">Usuń</button>`;

      expenseList.appendChild(li);
      document.querySelector("#expense-name").value = "";
      document.querySelector("#expense-value").value = "";
      updateSummary();
    } else {
      alert("Wprowadź poprawne dane");
    }
  });

  expenseList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-expense")) {
      event.target.parentElement.remove();
      updateSummary();
    } else if (event.target.classList.contains("edit-expense")) {
      const li = event.target.parentElement;
      const expenseName = li.childNodes[0].nodeValue.trim().slice(0, -1);
      const expenseValue = li.querySelector(".expense-value").innerText;

      li.innerHTML = `Nazwa: <input type="text" value=${expenseName}" class="edit-expensename">
                      Kwota: <input type="number" value="${expenseValue}" class="edit-expensevalue">
                      <button class="save-expense">Zapisz</button>`;
    } else if (event.target.classList.contains("save-expense")) {
      const li = event.target.parentElement;
      const newName = li.querySelector(".edit-expensename").value;
      const newValue = parseFloat(li.querySelector(".edit-expensevalue").value);

      if (!isNaN(newValue) && newValue >= 0) {
        li.innerHTML = `${newName}: <span class="expense-value">${newValue}</span>
                                    <button class="edit">Edytuj</button>
                                    <button class="delete">Usuń</button>`;
        updateSummary();
      } else {
        alert("Proszę podać prawidłową kwotę");
      }
    }
  });
});
