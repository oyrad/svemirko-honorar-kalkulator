import React from "react";
import Card from "../atoms/Card";

export default function SettingsCard({
  totalPay,
  isThereBookingFee,
  setIsThereBookingFee,
  split,
  setSplit,
}) {
  return (
    <Card className="flex flex-col py-3 space-y-1">
      <p className="font-semibold">Postavke</p>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <input
            name="isThereBookingFee"
            type="checkbox"
            id="booking"
            checked={isThereBookingFee}
            onChange={() => setIsThereBookingFee(!isThereBookingFee)}
          />
          <label for="booking" className="text-sm">
            Booking fee
          </label>
        </div>
        {/* <p className="font-semibold">
          {isThereBookingFee ? (totalPay * 0.1).toFixed(2) : "-"}
        </p> */}
      </div>
      <div className="grid grid-cols-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="deal"
            id="deal"
            checked={split === "deal"}
            onChange={() => setSplit("deal")}
          />
          <label className="text-sm" for="deal">
            45/27.5/27.5
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            value="equal"
            id="equal"
            checked={split === "equal"}
            onChange={() => setSplit("equal")}
          />
          <label className="text-sm" for="equal">
            Svi isto
          </label>
        </div>
      </div>
    </Card>
  );
}
