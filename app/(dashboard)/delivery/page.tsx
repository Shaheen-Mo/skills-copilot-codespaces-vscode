import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeliveryPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Delivery</h2>
      <Card><CardHeader><CardTitle>MVP workspace</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">This module is scaffolded for the next build step.</CardContent></Card>
    </div>
  );
}
