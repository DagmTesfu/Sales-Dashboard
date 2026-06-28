"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BadgeDollarSign,
  CalendarCheck,
  ReceiptText,
  TrendingUp,
} from "lucide-react";
import { MetricCard } from "@/components/atoms/MetricCard";
import { ChartTypeSwitch } from "@/components/molecules/ChartTypeSwitch";
import { ThresholdFilter } from "@/components/molecules/ThresholdFilter";
import { YearSelector } from "@/components/molecules/YearSelector";
import { SalesChart } from "@/components/organisms/SalesChart";
import type { ChartType, SalesApiResponse, SalesYear } from "@/types/sales";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

const numberFormatter = new Intl.NumberFormat("en-US");

const fallbackYears: SalesYear[] = [2024, 2023, 2022];

export function SalesDashboard() {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [data, setData] = useState<SalesApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [threshold, setThreshold] = useState(90000);
  const [year, setYear] = useState<SalesYear>(2024);

  useEffect(() => {
    const controller = new AbortController();
    const searchParams = new URLSearchParams({
      threshold: String(threshold),
      year: String(year),
    });

    setIsLoading(true);
    setError(null);

    fetch(`/api/sales?${searchParams.toString()}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load sales data");
        }

        return response.json() as Promise<SalesApiResponse>;
      })
      .then(setData)
      .catch((fetchError: Error) => {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [threshold, year]);

  const metrics = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        detail: `${data.summary.monthsAboveThreshold} month(s) at or above ${currencyFormatter.format(data.threshold)}`,
        icon: <BadgeDollarSign size={20} />,
        label: "Filtered sales",
        tone: "teal" as const,
        value: currencyFormatter.format(data.summary.totalSales),
      },
      {
        detail: "Across the currently visible months",
        icon: <TrendingUp size={20} />,
        label: "Average month",
        tone: "amber" as const,
        value: currencyFormatter.format(data.summary.averageSales),
      },
      {
        detail: `${data.summary.topMonth.month} leads the selected view`,
        icon: <CalendarCheck size={20} />,
        label: "Top month",
        tone: "rose" as const,
        value: currencyFormatter.format(data.summary.topMonth.sales),
      },
      {
        detail: "Mock order count from the same data feed",
        icon: <ReceiptText size={20} />,
        label: "Orders",
        tone: "ink" as const,
        value: numberFormatter.format(data.summary.totalOrders),
      },
    ];
  }, [data]);

  return (
    <section className="grid gap-6">
      <div className="grid gap-4 rounded-lg border border-[#ded7c9] bg-[#fffdf8] p-5 shadow-sm lg:grid-cols-[1fr_auto_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-[#0f766e]">
            Sales explorer
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-[#15171a]">
            Revenue by year
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667078]">
            Compare the 2024, 2023, and 2022 mock sales results with a custom
            threshold and switchable chart types.
          </p>
        </div>
        <YearSelector
          onChange={setYear}
          value={year}
          years={data?.years ?? fallbackYears}
        />
        <div className="min-w-48">
          <ThresholdFilter onChange={setThreshold} value={threshold} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="rounded-lg border border-[#ded7c9] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#15171a]">
              {year} sales performance
            </h2>
            <p className="mt-1 text-sm text-[#667078]">
              {data?.source.note ?? "Loading the sales data feed."}
            </p>
          </div>
          <ChartTypeSwitch onChange={setChartType} value={chartType} />
        </div>

        <div className="mt-6">
          {error ? (
            <div className="grid h-[360px] place-items-center rounded-lg border border-dashed border-[#d7d0c2] bg-[#fbfaf7] text-center">
              <div>
                <p className="font-semibold text-[#15171a]">Data unavailable</p>
                <p className="mt-1 text-sm text-[#667078]">{error}</p>
              </div>
            </div>
          ) : isLoading || !data ? (
            <div className="h-[360px] animate-pulse rounded-lg bg-[#f1ece2]" />
          ) : (
            <SalesChart chartType={chartType} data={data.monthly} />
          )}
        </div>

        {data ? (
          <a
            className="mt-4 inline-flex text-sm font-medium text-[#0f766e] hover:text-[#134e4a]"
            href={data.source.url}
            rel="noreferrer"
            target="_blank"
          >
            Data reference: {data.source.label}
          </a>
        ) : null}
      </div>
    </section>
  );
}
