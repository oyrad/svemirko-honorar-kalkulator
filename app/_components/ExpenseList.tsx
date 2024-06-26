'use client';

import Card from '@/app/_atoms/Card';
import Plus from '@/app/_icons/Plus';
import Expense from '@/app/_components/Expense';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import Button from '@/app/_atoms/Button';

export default function ExpenseList() {
  const { expenses, setExpenses } = useRoyaltiesStore();

  function addExpense() {
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        name: '',
        amount: '',
        whoPaid: '1',
      },
    ]);
  }

  function updateExpense(id: number, field: string, value: string) {
    setExpenses(
      expenses.map((expense) => {
        if (expense.id === id) {
          return { ...expense, [field]: value };
        } else {
          return expense;
        }
      }),
    );
  }

  function removeExpense(id: number) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <Card className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Troškovi</p>
        <Button onClick={addExpense}>
          <Plus />
          <p className="text-sm font-semibold">Dodaj</p>
        </Button>
      </div>
      {expenses.length > 0 && (
        <div className="flex flex-col space-y-1">
          {expenses.map((expense, index) => (
            <Expense
              key={expense.id}
              index={index}
              expense={expense}
              updateExpense={updateExpense}
              removeExpense={removeExpense}
            />
          ))}
        </div>
      )}
      {expenses.length !== 0 && (
        <p className="text-sm text-slate-500">
          Ukupno:{' '}
          {expenses.reduce((acc, expense) => acc + Number(expense.amount), 0)}
        </p>
      )}
    </Card>
  );
}
