import { useState, useMemo } from "react";
import "./App.css";
import PersonCard from "./components/PersonCard";
import ExpensesTable from "./components/ExpensesTable";
import InputField from "./components/InputField";

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
      <div className="flex flex-col bg-white rounded-md shadow-lg p-4">
        <InputField
          name="totalPay"
          type="number"
          placeholder="Ukupni honorar"
          value={totalPay}
          onChange={(e) => setTotalPay(e.target.value)}
        />
        <div className="flex space-x-2">
          <input
            name="isThereBookingFee"
            type="checkbox"
            checked={isThereBookingFee}
            onChange={() => setIsThereBookingFee(!isThereBookingFee)}
          />
          <label htmlFor="isThereBookingFee">Booker fee</label>
        </div>
      </div>
      <button onClick={addExpense} disabled={!totalPay}>
        Dodaj trošak
      </button>
      <ExpensesTable expenses={expenses} setExpenses={setExpenses} />
      <div className="flex flex-col space-y-2">
        <PersonCard
          name="Marko"
          bandFee={bandFee}
          rate={MARKO_RATE}
          pay={calculatePay(MARKO_RATE, "1")}
          expenses={expenses.filter((expense) => expense.whoPaid === "1")}
          bgColor="bg-fuchsia-200"
        />
        <PersonCard
          name="Tali"
          bandFee={bandFee}
          rate={TALI_RATE}
          pay={calculatePay(TALI_RATE, "2")}
          expenses={expenses.filter((expense) => expense.whoPaid === "2")}
          bgColor="bg-amber-200"
        />
        <PersonCard
          name="Dario"
          bandFee={bandFee}
          rate={DARIO_RATE}
          pay={calculatePay(DARIO_RATE, "3")}
          expenses={expenses.filter((expense) => expense.whoPaid === "3")}
          bgColor="bg-cyan-200"
        />
        {isThereBookingFee && (
          <PersonCard
            name="Bojan"
            pay={totalPay * 0.1}
            expenses={[]}
            bookerCard
            bgColor="bg-red-200"
          />
        )}
      </div>
    </>
  );
}
