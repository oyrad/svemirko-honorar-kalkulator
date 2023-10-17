import React from "react";
import Expense from "./Expense";
import Card from "../atoms/Card";
import PlusIcon from "../icons/PlusIcon";

export default function ExpensesCard({ totalPay, expenses, setExpenses }) {
  function addExpense() {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        id: Date.now(),
        name: "",
        amount: "",
        whoPaid: "1",
      },
    ]);
  }

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

  return (
    <Card className="space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Troškovi</p>
        <button
          onClick={addExpense}
          className="flex space-x-1 items-center bg-slate-100 py-1 px-3 rounded-xl shadow"
        >
          <PlusIcon />
          <p className="text-sm font-semibold">Dodaj</p>
        </button>
      </div>
      {expenses.length > 0 && (
        <div className="flex flex-col space-y-1">
          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              updateExpense={updateExpense}
              removeExpense={removeExpense}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
