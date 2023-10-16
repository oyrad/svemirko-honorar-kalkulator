import React from "react";
import InputField from "../atoms/InputField";
import Card from "../atoms/Card";

export default function PayForm({
  totalPay,
  setTotalPay,
  isThereBookingFee,
  setIsThereBookingFee,
}) {
  return (
    <Card className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-1">
        <label htmlFor="totalPay" className="font-semibold">
          Honorar
        </label>
        <InputField
          name="totalPay"
          type="number"
          value={totalPay}
          onChange={(e) => setTotalPay(e.target.value)}
        />
      </div>
    </Card>
  );
}
