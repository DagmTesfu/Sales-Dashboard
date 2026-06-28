import type { ReactNode } from "react";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f5ef] px-4 py-5 text-[#15171a] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5">
        <nav className="flex items-center justify-between border-b border-[#ded7c9] pb-4">
          <div>
            <p className="text-sm font-semibold uppercase text-[#0f766e]">
              Atomic Sales
            </p>
            <p className="mt-1 text-sm text-[#667078]">Dashboard</p>
          </div>
          <div className="h-9 rounded-lg border border-[#d7d0c2] bg-white px-3 py-2 text-sm font-semibold text-[#434950]">
            Next.js 15
          </div>
        </nav>
        {children}
      </div>
    </main>
  );
}
