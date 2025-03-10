import { Expense as ExpenseType } from '@/types/types';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction } from 'react';
import { Expense } from '@/app/report/create/_components/Expense';
import { Card } from '@/ui/atoms/Card';
import { Button } from '@/ui/atoms/Button';

interface ExpenseListProps {
  expenses: ExpenseType[];
  setExpenses: Dispatch<SetStateAction<ExpenseType[]>>;
}

export function Expenses({ expenses, setExpenses }: ExpenseListProps) {
  function addExpense() {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        id: Date.now(),
        name: '',
        amount: '',
        whoPaid: '1',
      },
    ]);
  }

  function updateExpense(id: number, field: string, value: string) {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) => {
        if (expense.id === id) {
          return { ...expense, [field]: value };
        } else {
          return expense;
        }
      }),
    );
  }

  function removeExpense(id: number) {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  }

  return (
    <Card className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Troškovi</p>
        <Button onClick={addExpense} type="button" className="bg-slate-100 hover:bg-slate-200">
          <PlusIcon className="size-4" />
          <p className="text-sm font-semibold">Dodaj</p>
        </Button>
      </div>
      {expenses.length > 0 && (
        <div className="flex flex-col space-y-1">
          {expenses.map((expense: ExpenseType, index) => (
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
    </Card>
  );
}
