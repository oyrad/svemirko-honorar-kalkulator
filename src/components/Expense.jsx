import React from "react";

export default function Expense({ expense, updateExpense, removeExpense }) {
  return (
    <>
      <input
        name="expenseName"
        value={expense.name}
        onChange={(e) => updateExpense(expense.id, "name", e.target.value)}
      />
      <input
        name="expenseAmount"
        value={expense.amount}
        onChange={(e) => updateExpense(expense.id, "amount", e.target.value)}
      />
      <select
        value={expense.whoPaid}
        onChange={(e) => updateExpense(expense.id, "whoPaid", e.target.value)}
      >
        <option value={1}>Marko</option>
        <option value={2}>Tali</option>
        <option value={3}>Dario</option>
      </select>
      <button onClick={() => removeExpense(expense.id)}>del</button>
    </>
  );
}
