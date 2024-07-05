import { useState } from 'react';
import { cn } from '@/utils/utils';
import ChevronDown from '@/app/_icons/ChevronDown';
import { useRoyaltiesStore } from '@/stores/royaltiesStore';
import { AnimatePresence, motion } from 'framer-motion';

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
  const { expenses, debts, netBandPay } = useRoyaltiesStore();

  function calculatePay(rate: number, index: string) {
    let totalPayWithExpensesAndDebts = netBandPay * rate;
    expenses.forEach((expense) => {
      if (expense.whoPaid === index && expense.amount) {
        totalPayWithExpensesAndDebts += parseInt(expense.amount);
      }
    });

    debts.forEach((debt) => {
      if (!debt.amount || debt.from === debt.to) return;

      if (debt.from === index) {
        totalPayWithExpensesAndDebts -= parseInt(debt.amount);
      } else if (debt.to === index) {
        totalPayWithExpensesAndDebts += parseInt(debt.amount);
      }
    });

    return totalPayWithExpensesAndDebts;
  }

  return (
    <motion.div
      className={cn(
        'rounded-lg py-2 px-4 shadow cursor-pointer person-card',
        bgColor,
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <AnimatePresence>
        <div className="flex justify-between items-center">
          <p className="text-slate-900 text-sm">{name}</p>
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">
              {calculatePay(rate, personIndex).toFixed(2)}
            </p>
            <div
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
          <motion.div
            className="text-right text-xs"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{ opacity: 0 }}
          >
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
            {debts
              .filter((debt) => debt.from === personIndex)
              .map((debt) => {
                if (debt.amount) {
                  return (
                    <p key={debt.id}>
                      - {debt.amount} {debt.name}
                    </p>
                  );
                }
              })}
            {debts
              .filter((debt) => debt.to === personIndex)
              .map((debt) => {
                if (debt.amount) {
                  return (
                    <p key={debt.id}>
                      + {debt.amount} {debt.name}
                    </p>
                  );
                }
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
