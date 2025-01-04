import { forwardRef, InputHTMLAttributes } from 'react';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      className="py-1 px-2 rounded-md w-full shadow-sm text-black text-sm outline-none border border-gray-300"
      {...props}
    />
  );
});
