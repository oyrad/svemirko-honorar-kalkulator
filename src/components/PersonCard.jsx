import React, { useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";

export default function PersonCard({
  name,
  bandFee,
  rate,
  pay,
  expenses,
  bgColor,
  bookerCard = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`rounded-lg py-2 px-4 shadow ${bgColor}`}>
      <div className="flex justify-between items-center">
        <p className="text-slate-900 text-sm">{name}</p>
        <div className="flex space-x-2 items-center">
          <p className="font-semibold">{pay.toFixed(2)}</p>
          {!bookerCard && (
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className={`transform ${
                isExpanded && "rotate-180"
              } transition-transform duration-300 ease-in-out cursor-pointer`}
            >
              <ChevronDownIcon />
            </div>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="text-right text-xs">
          <p>
            {bandFee} * {(rate * 100).toFixed(1)}% ={" "}
            {(bandFee * rate).toFixed(2)}
          </p>
          {expenses.map((expense) => {
            if (expense.amount) {
              return (
                <p>
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
