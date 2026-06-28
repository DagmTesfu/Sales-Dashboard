"use client";

import { NumberInput } from "@/components/atoms/NumberInput";

type ThresholdFilterProps = {
  value: number;
  onChange: (value: number) => void;
};

export function ThresholdFilter({ onChange, value }: ThresholdFilterProps) {
  return (
    <NumberInput
      label="Sales threshold"
      min={0}
      onChange={(event) => onChange(Number(event.target.value) || 0)}
      step={5000}
      value={value}
    />
  );
}
