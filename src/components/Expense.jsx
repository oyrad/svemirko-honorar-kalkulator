import React from "react";
import InputField from "../atoms/InputField";
import DeleteIcon from "../icons/DeleteIcon";

export default function Expense({ expense, updateExpense, removeExpense }) {
  return (
    <div className="flex space-x-1.5 items-center">
      <InputField
        name="expenseName"
        placeholder="Naziv"
        value={expense.name}
        onChange={(e) => updateExpense(expense.id, "name", e.target.value)}
      />
      <InputField
        name="expenseAmount"
        placeholder="Iznos"
        type="number"
        value={expense.amount}
        onChange={(e) => updateExpense(expense.id, "amount", e.target.value)}
      />
      <select
        value={expense.whoPaid}
        onChange={(e) => updateExpense(expense.id, "whoPaid", e.target.value)}
        className="border border-gray-200 rounded-md shadow px-2 py-0.5 text-sm"
      >
        <option value={1}>Marko</option>
        <option value={2}>Tali</option>
        <option value={3}>Dario</option>
      </select>
      <DeleteIcon onClick={() => removeExpense(expense.id)} />
    </div>
  );
}
