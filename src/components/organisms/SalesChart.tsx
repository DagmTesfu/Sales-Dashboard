"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartType, SalesMonth } from "@/types/sales";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact",
  style: "currency",
});

const pieColors = ["#0f766e", "#f59e0b", "#e11d48"];

type SalesChartProps = {
  chartType: ChartType;
  data: SalesMonth[];
};

export function SalesChart({ chartType, data }: SalesChartProps) {
  if (data.length === 0) {
    return (
      <div className="grid h-[360px] place-items-center rounded-lg border border-dashed border-[#d7d0c2] bg-[#fbfaf7] text-center">
        <div>
          <p className="font-semibold text-[#15171a]">No months match</p>
          <p className="mt-1 text-sm text-[#667078]">
            Lower the threshold to bring sales data back into view.
          </p>
        </div>
      </div>
    );
  }

  const channelData = [
    {
      name: "Online",
      value: data.reduce((sum, row) => sum + row.online, 0),
    },
    {
      name: "Retail",
      value: data.reduce((sum, row) => sum + row.retail, 0),
    },
    {
      name: "Wholesale",
      value: data.reduce((sum, row) => sum + row.wholesale, 0),
    },
  ];

  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer height="100%" width="100%">
        {chartType === "pie" ? (
          <PieChart>
            <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} />
            <Legend />
            <Pie
              cx="50%"
              cy="47%"
              data={channelData}
              dataKey="value"
              innerRadius={72}
              nameKey="name"
              outerRadius={128}
              paddingAngle={3}
            >
              {channelData.map((entry, index) => (
                <Cell fill={pieColors[index % pieColors.length]} key={entry.name} />
              ))}
            </Pie>
          </PieChart>
        ) : chartType === "line" ? (
          <LineChart data={data} margin={{ bottom: 8, left: 6, right: 18, top: 12 }}>
            <CartesianGrid stroke="#e7e0d2" strokeDasharray="4 4" />
            <XAxis dataKey="month" stroke="#667078" tickLine={false} />
            <YAxis
              stroke="#667078"
              tickFormatter={(value) => compactCurrencyFormatter.format(Number(value))}
              tickLine={false}
              width={72}
            />
            <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} />
            <Line
              activeDot={{ r: 7 }}
              dataKey="sales"
              name="Sales"
              stroke="#0f766e"
              strokeWidth={3}
              type="monotone"
            />
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ bottom: 8, left: 6, right: 18, top: 12 }}>
            <CartesianGrid stroke="#e7e0d2" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" stroke="#667078" tickLine={false} />
            <YAxis
              stroke="#667078"
              tickFormatter={(value) => compactCurrencyFormatter.format(Number(value))}
              tickLine={false}
              width={72}
            />
            <Tooltip formatter={(value) => currencyFormatter.format(Number(value))} />
            <Bar dataKey="sales" fill="#0f766e" name="Sales" radius={[6, 6, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
