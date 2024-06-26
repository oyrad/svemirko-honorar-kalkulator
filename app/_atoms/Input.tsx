import { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function Input({
  name,
  type,
  value,
  onChange,
  placeholder = '',
}: InputProps) {
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
