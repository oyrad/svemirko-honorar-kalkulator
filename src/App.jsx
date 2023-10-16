import { useState, useMemo } from "react";
import PersonCard from "./components/PersonCard";
import ExpensesTable from "./components/ExpensesTable";
import PayForm from "./components/PayForm";
import PlusIcon from "./icons/PlusIcon";

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
    <div className="space-y-4">
      <PayForm
        totalPay={totalPay}
        setTotalPay={setTotalPay}
        isThereBookingFee={isThereBookingFee}
        setIsThereBookingFee={setIsThereBookingFee}
      />
      <div className="bg-white p-4 shadow-lg rounded-md space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Troškovi</p>
          <button
            onClick={addExpense}
            disabled={!totalPay}
            className="flex space-x-1 items-center bg-slate-100 py-1 px-3 rounded-xl shadow"
          >
            <PlusIcon />
            <p className="text-sm font-semibold">Dodaj</p>
          </button>
        </div>
        {expenses.length > 0 && (
          <ExpensesTable expenses={expenses} setExpenses={setExpenses} />
        )}
      </div>
      <div className="flex flex-col space-y-2 bg-white shadow-lg rounded-md p-4">
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
          bgColor="bg-emerald-100"
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
          bgColor="bg-cyan-100"
        />
        {isThereBookingFee && (
          <PersonCard
            name="Bojan"
            pay={totalPay * 0.1}
            expenses={[]}
            bookerCard
            bgColor="bg-sky-100"
          />
        )}
      </div>
    </div>
  );
}
