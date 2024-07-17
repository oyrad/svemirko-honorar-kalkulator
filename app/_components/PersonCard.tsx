import { useState } from 'react';
import { cn, getNetRoyaltiesByPerson } from '@/libs/utils';
import ChevronDown from '@/app/_icons/ChevronDown';
import { Expense } from '@/types/types';

interface PersonCardProps {
  personIndex: string;
  name: string;
  rate: number;
  expenses: Expense[];
  netRoyalties: number;
  bgColor: string;
  isExpandable?: boolean;
}

export default function PersonCard({
  personIndex,
  name,
  rate,
  expenses,
  netRoyalties,
  bgColor,
  isExpandable = true,
}: PersonCardProps) {
  const [isExpanded, setIsExpanded] = useState(!isExpandable);

  return (
    <div
      className={cn(
        'rounded-lg py-2 px-4 shadow dark:text-black',
        isExpandable && 'cursor-pointer',
        bgColor,
      )}
      onClick={() => {
        isExpandable && setIsExpanded(!isExpanded);
      }}
    >
      <div className="flex justify-between items-center">
        <p className="text-slate-900 text-sm">{name}</p>
        <div className="flex space-x-2 items-center">
          <p className="font-semibold">
            {getNetRoyaltiesByPerson(
              personIndex,
              netRoyalties,
              rate,
              expenses,
            ).toFixed(2)}
          </p>
          {isExpandable && (
            <div
              className={cn(
                'transform transition-transform duration-300 ease-in-out cursor-pointer',
                isExpanded && 'rotate-180',
              )}
            >
              <ChevronDown />
            </div>
          )}
        </div>
      </div>
      {isExpanded && (
        <div key={personIndex} className="text-right text-xs text-gray-700">
          <p>
            {netRoyalties.toFixed(2)} * {(rate * 100).toFixed(1)}% ={' '}
            {(netRoyalties * rate).toFixed(2)}
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
