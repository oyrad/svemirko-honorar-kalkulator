'use client';

import Card from '@/app/_atoms/Card';
import Plus from '@/app/_icons/Plus';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import Debt from '@/app/_components/Debt';
import Button from '@/app/_atoms/Button';

export default function DebtList() {
  const { debts, setDebts } = useRoyaltiesStore();

  function addDebt() {
    setDebts([
      ...debts,
      {
        id: Date.now(),
        name: '',
        amount: '',
        from: '1',
        to: '1',
      },
    ]);
  }

  function updateDebt(id: number, field: string, value: string) {
    setDebts(
      debts.map((debt) => {
        if (debt.id === id) {
          return { ...debt, [field]: value };
        } else {
          return debt;
        }
      }),
    );
  }

  function removeDebt(id: number) {
    setDebts(debts.filter((debt) => debt.id !== id));
  }

  return (
    <Card className="flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Dugovanja</p>
        <Button onClick={addDebt}>
          <Plus />
          <p className="text-sm font-semibold">Dodaj</p>
        </Button>
      </div>
      {debts.length > 0 && (
        <div className="flex flex-col space-y-1">
          {debts.map((debt, index) => (
            <Debt
              key={debt.id}
              index={index}
              debt={debt}
              updateDebt={updateDebt}
              removeDebt={removeDebt}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
