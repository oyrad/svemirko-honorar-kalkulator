import { useState, useMemo } from "react";
import "./App.css";
import PersonCard from "./components/PersonCard";
import Expense from "./components/Expense";
import ExpensesTable from "./components/ExpensesTable";

const MARKO_RATE = 0.45;
const TALI_RATE = 0.275;
const DARIO_RATE = 0.275;

export default function App() {
  const [totalPay, setTotalPay] = useState("");
  const [isThereBookingFee, setIsThereBookingFee] = useState(true);
  const [expenses, setExpenses] = useState([]);

  const bandFee = useMemo(() => {
    let totalBandFee = parseInt(totalPay) || 0;
    if (isThereBookingFee) {
      totalBandFee = totalPay * 0.9;
    }
    expenses.forEach((expense) => (totalBandFee -= expense.amount));

    return totalBandFee;
  }, [totalPay, isThereBookingFee, expenses]);

  function addExpense() {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        id: Date.now(),
        name: "",
        amount: "",
        whoPaid: "1",
      },
    ]);
  }

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
    <>
      <p>svemirko honorar kalkulator</p>
      <input
        name="totalPay"
        type="number"
        value={totalPay}
        onChange={(e) => setTotalPay(e.target.value)}
      />
      <input
        type="checkbox"
        checked={isThereBookingFee}
        onChange={() => setIsThereBookingFee(!isThereBookingFee)}
      />
      <button onClick={addExpense} disabled={!totalPay}>
        Dodaj trošak
      </button>
      <ExpensesTable expenses={expenses} setExpenses={setExpenses} />
      <div className="flex flex-col space-y-2">
        {isThereBookingFee && (
          <PersonCard name="Bojan" pay={totalPay * 0.1} expenses={[]} />
        )}
        <PersonCard
          name="Marko"
          bandFee={bandFee}
          rate={MARKO_RATE}
          pay={calculatePay(MARKO_RATE, "1")}
          expenses={expenses.filter((expense) => expense.whoPaid === "1")}
        />
        <PersonCard
          name="Tali"
          bandFee={bandFee}
          rate={TALI_RATE}
          pay={calculatePay(TALI_RATE, "2")}
          expenses={expenses.filter((expense) => expense.whoPaid === "2")}
        />
        <PersonCard
          name="Dario"
          bandFee={bandFee}
          rate={DARIO_RATE}
          pay={calculatePay(DARIO_RATE, "3")}
          expenses={expenses.filter((expense) => expense.whoPaid === "3")}
        />
      </div>
    </>
  );
}
