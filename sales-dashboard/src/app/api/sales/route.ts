import { NextRequest, NextResponse } from "next/server";
import { buildSalesResponse, parseSalesYear } from "@/lib/sales-data";

export function GET(request: NextRequest) {
  const year = parseSalesYear(request.nextUrl.searchParams.get("year"));
  const parsedThreshold = Number(
    request.nextUrl.searchParams.get("threshold") ?? 0,
  );
  const threshold = Number.isFinite(parsedThreshold)
    ? Math.max(0, parsedThreshold)
    : 0;

  return NextResponse.json(buildSalesResponse(year, threshold));
}
