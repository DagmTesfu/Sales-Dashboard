import type { InputHTMLAttributes } from "react";

type NumberInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function NumberInput({ label, className = "", ...props }: NumberInputProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[#434950]">
      <span>{label}</span>
      <input
        className={`h-10 w-full rounded-lg border border-[#d7d0c2] bg-white px-3 text-sm text-[#15171a] outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#99f6e4] ${className}`}
        inputMode="numeric"
        type="number"
        {...props}
      />
    </label>
  );
}
