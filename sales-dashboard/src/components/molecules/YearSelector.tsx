"use client";

import type { SalesYear } from "@/types/sales";

type YearSelectorProps = {
  years: SalesYear[];
  value: SalesYear;
  onChange: (year: SalesYear) => void;
};

export function YearSelector({ onChange, value, years }: YearSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Sales year">
      {years.map((year) => (
        <button
          className={`h-10 rounded-lg border px-4 text-sm font-semibold transition ${
            value === year
              ? "border-[#15171a] bg-[#15171a] text-white"
              : "border-[#d7d0c2] bg-white text-[#4f555c] hover:border-[#15171a] hover:text-[#15171a]"
          }`}
          key={year}
          onClick={() => onChange(year)}
          type="button"
        >
          {year}
        </button>
      ))}
    </div>
  );
}
