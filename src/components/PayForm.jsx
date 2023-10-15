import React from "react";
import InputField from "../atoms/InputField";

export default function PayForm({
  totalPay,
  setTotalPay,
  isThereBookingFee,
  setIsThereBookingFee,
}) {
  return (
    <div className="flex flex-col bg-white rounded-md shadow-lg p-4 space-y-2">
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
      <div className="flex space-x-2">
        <input
          name="isThereBookingFee"
          type="checkbox"
          checked={isThereBookingFee}
          onChange={() => setIsThereBookingFee(!isThereBookingFee)}
        />
        <label htmlFor="isThereBookingFee" className="text-sm font-semibold">
          Booking fee
        </label>
      </div>
    </div>
  );
}
