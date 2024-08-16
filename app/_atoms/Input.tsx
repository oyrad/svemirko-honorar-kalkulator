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
      className="py-1 px-2 rounded-md w-full shadow-sm text-black text-sm outline-none border border-gray-300"
    />
  );
}
