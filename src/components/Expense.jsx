import React from "react";
import InputField from "../atoms/InputField";
import DeleteIcon from "../icons/DeleteIcon";

export default function Expense({
  expenseIndex,
  expense,
  updateExpense,
  removeExpense,
}) {
  return (
    <div className="flex space-x-1.5 items-end">
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {expenseIndex === 0 && <label>Naziv</label>}
        <InputField
          name="expenseName"
          value={expense.name}
          onChange={(e) => updateExpense(expense.id, "name", e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {expenseIndex === 0 && <label>Iznos</label>}
        <InputField
          name="expenseAmount"
          type="number"
          value={expense.amount}
          onChange={(e) => updateExpense(expense.id, "amount", e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {expenseIndex === 0 && <label>Tko je platio</label>}
        <select
          value={expense.whoPaid}
          onChange={(e) => updateExpense(expense.id, "whoPaid", e.target.value)}
          className="border border-gray-200 rounded-md shadow px-2 py-0.5 text-sm outline-none cursor-pointer"
        >
          <option value={1}>Marko</option>
          <option value={2}>Tali</option>
          <option value={3}>Dario</option>
        </select>
      </div>
      <DeleteIcon onClick={() => removeExpense(expense.id)} />
    </div>
  );
}
