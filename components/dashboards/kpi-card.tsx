import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KpiCard({ title, value, caption }: { title: string; value: string; caption?: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {caption ? <p className="mt-1 text-xs text-muted-foreground">{caption}</p> : null}
      </CardContent>
    </Card>
  );
}
