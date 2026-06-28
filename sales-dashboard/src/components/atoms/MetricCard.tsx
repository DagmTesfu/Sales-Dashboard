import type { ReactNode } from "react";

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  tone: "teal" | "amber" | "rose" | "ink";
};

const toneStyles: Record<MetricCardProps["tone"], string> = {
  teal: "bg-[#e2f4ef] text-[#0f766e]",
  amber: "bg-[#fff0cf] text-[#a16207]",
  rose: "bg-[#ffe4e6] text-[#be123c]",
  ink: "bg-[#e8edf2] text-[#273447]",
};

export function MetricCard({
  detail,
  icon,
  label,
  tone,
  value,
}: MetricCardProps) {
  return (
    <article className="rounded-lg border border-[#ded7c9] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#667078]">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-[#15171a]">{value}</p>
        </div>
        <div className={`rounded-lg p-2.5 ${toneStyles[tone]}`}>{icon}</div>
      </div>
      <p className="mt-4 text-sm text-[#667078]">{detail}</p>
    </article>
  );
}
