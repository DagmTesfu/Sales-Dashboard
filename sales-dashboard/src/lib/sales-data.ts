import type {
  SalesApiResponse,
  SalesDataSource,
  SalesMonth,
  SalesSummary,
  SalesYear,
} from "@/types/sales";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const rawSales: Record<SalesYear, Array<[number, number]>> = {
  2022: [
    [64000, 318],
    [68200, 339],
    [71500, 352],
    [69000, 341],
    [78200, 386],
    [83300, 408],
    [79500, 395],
    [86200, 427],
    [90500, 446],
    [94800, 468],
    [111400, 535],
    [125700, 592],
  ],
  2023: [
    [74800, 356],
    [78600, 372],
    [84200, 401],
    [81200, 389],
    [93500, 442],
    [99600, 466],
    [101400, 482],
    [108700, 512],
    [113900, 537],
    [119500, 559],
    [137600, 624],
    [151900, 683],
  ],
  2024: [
    [89500, 416],
    [94700, 438],
    [103200, 477],
    [99500, 461],
    [116800, 529],
    [124200, 561],
    [129900, 585],
    [136700, 616],
    [143400, 642],
    [152600, 681],
    [174300, 763],
    [196400, 842],
  ],
};

export const salesDataSource: SalesDataSource = {
  label: "Kaggle Sample Sales Data",
  url: "https://www.kaggle.com/datasets/kyanyoga/sample-sales-data",
  note: "Mock 2022-2024 figures shaped after a public Kaggle sales dataset so the app runs without Kaggle credentials.",
};

export const availableYears = [2024, 2023, 2022] as const;

export function getSalesRows(year: SalesYear): SalesMonth[] {
  return rawSales[year].map(([sales, orders], index) => {
    const online = Math.round(sales * (0.42 + (index % 3) * 0.015));
    const retail = Math.round(sales * (0.34 - (index % 2) * 0.012));

    return {
      month: months[index],
      sales,
      orders,
      online,
      retail,
      wholesale: sales - online - retail,
    };
  });
}

export function getSalesSummary(rows: SalesMonth[]): SalesSummary {
  const totalSales = rows.reduce((sum, row) => sum + row.sales, 0);
  const totalOrders = rows.reduce((sum, row) => sum + row.orders, 0);
  const topMonth =
    rows.length > 0
      ? rows.reduce((best, row) => (row.sales > best.sales ? row : best))
      : {
          month: "None",
          online: 0,
          orders: 0,
          retail: 0,
          sales: 0,
          wholesale: 0,
        };

  return {
    totalSales,
    averageSales: rows.length ? Math.round(totalSales / rows.length) : 0,
    totalOrders,
    topMonth,
    monthsAboveThreshold: rows.length,
  };
}

export function buildSalesResponse(
  year: SalesYear,
  threshold: number,
): SalesApiResponse {
  const monthly = getSalesRows(year).filter((row) => row.sales >= threshold);

  return {
    years: [...availableYears],
    selectedYear: year,
    threshold,
    monthly,
    summary: getSalesSummary(monthly),
    source: salesDataSource,
  };
}

export function parseSalesYear(value: string | null): SalesYear {
  const parsed = Number(value);

  if (parsed === 2022 || parsed === 2023 || parsed === 2024) {
    return parsed;
  }

  return 2024;
}
