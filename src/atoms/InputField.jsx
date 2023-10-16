import React from "react";

export default function InputField({
  name,
  type,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="py-0.5 px-2 rounded-md w-full shadow-sm border border-gray-200 text-sm outline-none"
    />
  );
}
