import React, { useState } from "react";

export default function PersonCard({ name, bandFee, rate, pay, expenses }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="rounded-lg p-2 bg-emerald-400">
      <div className="flex justify-between">
        <p>
          {name}: {pay}
        </p>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`transform ${
            isExpanded && "rotate-180"
          } transition-transform duration-300 ease-in-out cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="text-right">
          <p>
            {bandFee} * {rate} = {bandFee * rate}
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
