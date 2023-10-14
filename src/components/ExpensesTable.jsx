import React from "react";
import Expense from "./Expense";

export default function ExpensesTable({ expenses, setExpenses }) {
  function updateExpense(id, field, value) {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => {
        if (expense.id === id) {
          return { ...expense, [field]: value };
        } else {
          return expense;
        }
      })
    );
  }

  function removeExpense(id) {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  }

  return expenses.map((expense) => (
    <Expense
      key={expense.id}
      expense={expense}
      updateExpense={updateExpense}
      removeExpense={removeExpense}
    />
  ));
}
