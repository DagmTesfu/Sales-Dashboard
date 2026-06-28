import { SalesDashboard } from "@/components/organisms/SalesDashboard";
import { DashboardShell } from "@/components/templates/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <SalesDashboard />
    </DashboardShell>
  );
}
