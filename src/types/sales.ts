export type SalesYear = 2022 | 2023 | 2024;

export type ChartType = "bar" | "line" | "pie";

export type SalesMonth = {
  month: string;
  sales: number;
  orders: number;
  online: number;
  retail: number;
  wholesale: number;
};

export type SalesSummary = {
  totalSales: number;
  averageSales: number;
  totalOrders: number;
  topMonth: SalesMonth;
  monthsAboveThreshold: number;
};

export type SalesDataSource = {
  label: string;
  url: string;
  note: string;
};

export type SalesApiResponse = {
  years: SalesYear[];
  selectedYear: SalesYear;
  threshold: number;
  monthly: SalesMonth[];
  summary: SalesSummary;
  source: SalesDataSource;
};
