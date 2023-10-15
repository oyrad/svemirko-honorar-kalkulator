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
      className="py-0.5 px-2 rounded-md w-full border-b-2"
    />
  );
}
