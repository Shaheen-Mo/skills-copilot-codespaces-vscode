import { KpiCard } from "@/components/dashboards/kpi-card";
import { StatusBadge } from "@/components/tables/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { requirePermission } from "@/lib/auth/require-permission";

const fallbackMetrics = {
  salesToday: 4280,
  overdueCount: 9,
  openDeliveries: 6,
  lowStock: 4,
};

export default async function OwnerDashboardPage() {
  if (isSupabaseConfigured()) await requirePermission("page.owner_dashboard.view");

  let metrics = fallbackMetrics;
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const today = new Date().toISOString().slice(0, 10);
    const [{ data: sales }, { data: overdue }, { data: deliveries }, { data: stockAlerts }] = await Promise.all([
      supabase.from("sales").select("total_amount").gte("sale_datetime", today),
      supabase.from("installment_schedule").select("id").eq("status", "overdue"),
      supabase.from("deliveries").select("id").in("status", ["pending", "scheduled", "out_for_delivery"]),
      supabase.from("inventory_balances").select("id").lte("available_qty", 2),
    ]);
    metrics = {
      salesToday: (sales ?? []).reduce((sum, sale) => sum + Number(sale.total_amount ?? 0), 0),
      overdueCount: overdue?.length ?? 0,
      openDeliveries: deliveries?.length ?? 0,
      lowStock: stockAlerts?.length ?? 0,
    };
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Owner Dashboard</h2>
        <p className="text-sm text-muted-foreground">Daily control panel for sales, cash, credit, delivery, and stock health.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard title="Sales Today" value={`$${metrics.salesToday.toLocaleString()}`} caption="cash + approved credit" />
        <KpiCard title="Overdue Installments" value={String(metrics.overdueCount)} caption="needs collection action" />
        <KpiCard title="Open Deliveries" value={String(metrics.openDeliveries)} caption="pending completion" />
        <KpiCard title="Low Stock" value={String(metrics.lowStock)} caption="available qty ≤ 2" />
      </div>
      <Card>
        <CardHeader><CardTitle>Operational Controls</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <StatusBadge status="reserved" />
          <StatusBadge status="under_review" />
          <StatusBadge status="overdue" />
          <StatusBadge status="completed" />
        </CardContent>
      </Card>
    </div>
  );
}
