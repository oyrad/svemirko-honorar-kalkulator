import { useState } from 'react';
import { cn } from '@/utils/utils';
import ChevronDown from '@/app/_icons/ChevronDown';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';

interface PersonCardProps {
  personIndex: string;
  name: string;
  rate: number;
  bgColor: string;
}

export default function PersonCard({
  personIndex,
  name,
  rate,
  bgColor,
}: PersonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { expenses, netBandPay } = useRoyaltiesStore();

  function calculatePay(rate, index) {
    let totalPayWithExpenses = netBandPay * rate;
    expenses.forEach((expense) => {
      if (expense.whoPaid === index && expense.amount) {
        totalPayWithExpenses += parseInt(expense.amount);
      }
    });
    return totalPayWithExpenses;
  }

  return (
    <div className={cn('rounded-lg py-2 px-4 shadow', bgColor)}>
      <div className="flex justify-between items-center">
        <p className="text-slate-900 text-sm">{name}</p>
        <div className="flex space-x-2 items-center">
          <p className="font-semibold">
            {calculatePay(rate, personIndex).toFixed(2)}
          </p>
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'transform transition-transform duration-300 ease-in-out cursor-pointer',
              isExpanded && 'rotate-180',
            )}
          >
            <ChevronDown />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="text-right text-xs">
          <p>
            {netBandPay.toFixed(2)} * {(rate * 100).toFixed(1)}% ={' '}
            {(netBandPay * rate).toFixed(2)}
          </p>
          {expenses
            .filter((expense) => expense.whoPaid === personIndex)
            .map((expense) => {
              if (expense.amount) {
                return (
                  <p key={expense.id}>
                    + {expense.amount} {expense.name}
                  </p>
                );
              }
            })}
        </div>
      )}
    </div>
  );
}
