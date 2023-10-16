import React from "react";
import Card from "../atoms/Card";

export default function BookingFeeCard({
  totalPay,
  isThereBookingFee,
  setIsThereBookingFee,
}) {
  return (
    <Card className="flex justify-between py-2">
      <div className="flex items-center space-x-2">
        <input
          name="isThereBookingFee"
          type="checkbox"
          checked={isThereBookingFee}
          onChange={() => setIsThereBookingFee(!isThereBookingFee)}
        />
        <label htmlFor="isThereBookingFee" className="text-sm">
          Booking fee
        </label>
      </div>
      <p className="font-semibold">
        {isThereBookingFee ? (totalPay * 0.1).toFixed(2) : "-"}
      </p>
    </Card>
  );
}
