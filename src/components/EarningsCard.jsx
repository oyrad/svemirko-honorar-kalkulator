import React from "react";
import Card from "../atoms/Card";
import PersonCard from "../components/PersonCard";

const MARKO_RATE = 0.45;
const TALI_RATE = 0.275;
const DARIO_RATE = 0.275;

export default function EarningsCard({ bandFee, expenses }) {
  function calculatePay(rate, index) {
    let totalPayWithExpenses = bandFee * rate;
    expenses.forEach((expense) => {
      if (expense.whoPaid === index && expense.amount) {
        totalPayWithExpenses += parseInt(expense.amount);
      }
    });
    return totalPayWithExpenses;
  }

  return (
    <Card className="flex flex-col space-y-2">
      <div className=" flex justify-between items-center">
        <p className="font-semibold">Zarada</p>
        <p className="font-semibold">{bandFee.toFixed(2)}</p>
      </div>
      <PersonCard
        name="Marko"
        bandFee={bandFee}
        rate={MARKO_RATE}
        pay={calculatePay(MARKO_RATE, "1")}
        expenses={expenses.filter((expense) => expense.whoPaid === "1")}
        bgColor="bg-green-100"
      />
      <PersonCard
        name="Tali"
        bandFee={bandFee}
        rate={TALI_RATE}
        pay={calculatePay(TALI_RATE, "2")}
        expenses={expenses.filter((expense) => expense.whoPaid === "2")}
        bgColor="bg-teal-100"
      />
      <PersonCard
        name="Dario"
        bandFee={bandFee}
        rate={DARIO_RATE}
        pay={calculatePay(DARIO_RATE, "3")}
        expenses={expenses.filter((expense) => expense.whoPaid === "3")}
        bgColor="bg-sky-100"
      />
    </Card>
  );
}
