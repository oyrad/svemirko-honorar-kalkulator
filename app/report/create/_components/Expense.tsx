import Input from '@/app/_atoms/Input';
import { Expense as ExpenseType } from '@/types/types';
import Remove from '@/app/_icons/Remove';

interface ExpenseProps {
  index: number;
  expense: ExpenseType;
  updateExpense: (id: number, field: string, value: string) => void;
  removeExpense: (id: number) => void;
}

export default function Expense({
  index,
  expense,
  updateExpense,
  removeExpense,
}: ExpenseProps) {
  return (
    <div className="flex space-x-2 items-end">
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {index === 0 && <label>Naziv</label>}
        <Input
          name="expenseName"
          type="text"
          value={expense.name}
          onChange={(e) => updateExpense(expense.id, 'name', e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {index === 0 && <label>Iznos</label>}
        <Input
          name="expenseAmount"
          type="number"
          value={expense.amount}
          onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {index === 0 && <label>Tko je platio</label>}
        <select
          value={expense.whoPaid}
          onChange={(e) => updateExpense(expense.id, 'whoPaid', e.target.value)}
          className="border border-gray-200 rounded-md shadow px-2 py-0.5 text-sm outline-none cursor-pointer"
        >
          <option value={1}>Marko</option>
          <option value={2}>Tali</option>
          <option value={3}>Dario</option>
        </select>
      </div>
      <Remove onClick={() => removeExpense(expense.id)} />
    </div>
  );
}
