import { useState, useMemo } from "react";
import TotalPayCard from "./components/TotalPayCard";
import BookingFeeCard from "./components/BookingFeeCard";
import EarningsCard from "./components/EarningsCard";
import ExpensesCard from "./components/ExpensesCard";

export default function App() {
  const [totalPay, setTotalPay] = useState("");
  const [isThereBookingFee, setIsThereBookingFee] = useState(true);
  const [expenses, setExpenses] = useState([]);

  const bandFee = useMemo(() => {
    let totalBandFee = parseFloat(totalPay) || 0;
    if (isThereBookingFee) {
      totalBandFee = totalPay * 0.9;
    }
    expenses.forEach((expense) => (totalBandFee -= expense.amount));

    return totalBandFee;
  }, [totalPay, isThereBookingFee, expenses]);

  return (
    <div className="space-y-4">
      <TotalPayCard
        totalPay={totalPay}
        setTotalPay={setTotalPay}
        isThereBookingFee={isThereBookingFee}
        setIsThereBookingFee={setIsThereBookingFee}
      />
      <BookingFeeCard
        totalPay={totalPay}
        isThereBookingFee={isThereBookingFee}
        setIsThereBookingFee={setIsThereBookingFee}
      />
      <ExpensesCard
        totalPay={totalPay}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <EarningsCard bandFee={bandFee} expenses={expenses} />
    </div>
  );
}
