"use client";

import { BarChart3, LineChart, PieChart } from "lucide-react";
import type { ReactNode } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import type { ChartType } from "@/types/sales";

const chartTypes: Array<{
  type: ChartType;
  label: string;
  icon: ReactNode;
}> = [
  { type: "bar", label: "Bar chart", icon: <BarChart3 size={18} /> },
  { type: "line", label: "Line chart", icon: <LineChart size={18} /> },
  { type: "pie", label: "Pie chart", icon: <PieChart size={18} /> },
];

type ChartTypeSwitchProps = {
  value: ChartType;
  onChange: (value: ChartType) => void;
};

export function ChartTypeSwitch({ onChange, value }: ChartTypeSwitchProps) {
  return (
    <div className="flex items-center gap-2">
      {chartTypes.map((item) => (
        <IconButton
          active={value === item.type}
          icon={item.icon}
          key={item.type}
          label={item.label}
          onClick={() => onChange(item.type)}
        />
      ))}
    </div>
  );
}
