import { Badge } from "@/components/ui/badge";

const styles: Record<string, string> = {
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  reserved: "bg-amber-100 text-amber-700 border-amber-200",
  under_review: "bg-amber-100 text-amber-700 border-amber-200",
  overdue: "bg-red-100 text-red-700 border-red-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant="outline" className={styles[status] ?? "bg-slate-100 text-slate-700 border-slate-200"}>{status.replaceAll("_", " ")}</Badge>;
}
