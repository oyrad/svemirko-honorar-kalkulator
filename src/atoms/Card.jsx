import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white p-4 shadow-lg rounded-md ${className}`}>
      {children}
    </div>
  );
}
