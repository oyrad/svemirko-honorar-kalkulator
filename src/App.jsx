import { useState, useMemo } from "react";
import TotalPayCard from "./components/TotalPayCard";
import SettingsCard from "./components/SettingsCard";
import EarningsCard from "./components/EarningsCard";
import ExpensesCard from "./components/ExpensesCard";

export default function App() {
  const [totalPay, setTotalPay] = useState("");
  const [isThereBookingFee, setIsThereBookingFee] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [split, setSplit] = useState("deal");

  const bandFee = useMemo(() => {
    let totalBandFee = parseFloat(totalPay) || 0;
    if (isThereBookingFee) {
      totalBandFee = totalPay * 0.9;
    }
    expenses.forEach((expense) => (totalBandFee -= expense.amount));

    return totalBandFee;
  }, [totalPay, isThereBookingFee, expenses]);

  return (
    <div className="space-y-4 2xl:px-96 xl:px-[24rem] lg:px-[20rem] md:px-[16rem]">
      <TotalPayCard
        totalPay={totalPay}
        setTotalPay={setTotalPay}
        isThereBookingFee={isThereBookingFee}
        setIsThereBookingFee={setIsThereBookingFee}
      />
      <SettingsCard
        totalPay={totalPay}
        isThereBookingFee={isThereBookingFee}
        setIsThereBookingFee={setIsThereBookingFee}
        split={split}
        setSplit={setSplit}
      />
      <ExpensesCard
        totalPay={totalPay}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <EarningsCard bandFee={bandFee} expenses={expenses} split={split} />
    </div>
  );
}
