import { Debt as DebtType } from '@/types/types';
import Input from '@/app/_atoms/Input';
import Remove from '@/app/_icons/Remove';

interface DebtProps {
  index: number;
  debt: DebtType;
  updateDebt: (id: number, field: string, value: string) => void;
  removeDebt: (id: number) => void;
}

export default function Debt({
  index,
  debt,
  updateDebt,
  removeDebt,
}: DebtProps) {
  return (
    <div className="flex space-x-2 items-end">
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {index === 0 && <label>Naziv</label>}
        <Input
          name="expenseName"
          type="text"
          value={debt.name}
          onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {index === 0 && <label>Iznos</label>}
        <Input
          name="expenseAmount"
          type="number"
          value={debt.amount}
          onChange={(e) => updateDebt(debt.id, 'amount', e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {index === 0 && <label>Tko</label>}
        <select
          value={debt.from}
          onChange={(e) => updateDebt(debt.id, 'from', e.target.value)}
          className="border border-gray-200 rounded-md shadow px-2 py-0.5 text-sm outline-none cursor-pointer"
        >
          <option value={1}>Marko</option>
          <option value={2}>Tali</option>
          <option value={3}>Dario</option>
        </select>
      </div>
      <div className="flex flex-col space-y-1 text-xs text-gray-700">
        {index === 0 && <label>Kome</label>}
        <select
          value={debt.to}
          onChange={(e) => updateDebt(debt.id, 'to', e.target.value)}
          className="border border-gray-200 rounded-md shadow px-2 py-0.5 text-sm outline-none cursor-pointer"
        >
          <option value={1}>Marku</option>
          <option value={2}>Taliju</option>
          <option value={3}>Dariju</option>
        </select>
      </div>
      <Remove onClick={() => removeDebt(debt.id)} />
    </div>
  );
}
