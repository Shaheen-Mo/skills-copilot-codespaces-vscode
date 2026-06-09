import { createSaleAction } from "./actions";
import { StatusBadge } from "@/components/tables/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { requirePermission } from "@/lib/auth/require-permission";

const recentSales = [
  { sale_no: "SO-1007", customer: "Maria Santos", item: "Walnut L-Shape Sofa", total: 1250, status: "reserved" },
  { sale_no: "SO-1008", customer: "Joel Reyes", item: "Queen Storage Bed", total: 890, status: "delivered" },
];

export default async function SalesPage() {
  if (isSupabaseConfigured()) await requirePermission("page.sales.view");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Sales Entry</h2>
        <p className="text-sm text-muted-foreground">Capture cash or credit sales. Deposits create reservations when stock is available.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>New Sale</CardTitle></CardHeader>
        <CardContent>
          <form action={createSaleAction} className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="customer_name">Customer</Label>
              <Input id="customer_name" name="customer_name" placeholder="Maria Santos" required />
            </div>
            <input type="hidden" name="location_id" value="00000000-0000-4000-8000-000000000001" />
            <input type="hidden" name="product_variant_id" value="00000000-0000-4000-8000-000000000101" />
            <div className="space-y-2">
              <Label>Payment Mode</Label>
              <NativeSelect name="payment_mode" defaultValue="cash">
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
                <option value="mixed">Mixed</option>
              </NativeSelect>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit_amount">Deposit</Label>
              <Input id="deposit_amount" name="deposit_amount" type="number" min="0" step="0.01" defaultValue="100" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Furniture Item</Label>
              <Input value="Walnut L-Shape Sofa / SKU SOFA-L-001" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty">Qty</Label>
              <Input id="qty" name="qty" type="number" min="1" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit_price">Unit Price</Label>
              <Input id="unit_price" name="unit_price" type="number" min="0" step="0.01" defaultValue="1250" />
            </div>
            <div className="md:col-span-4 flex justify-end">
              <Button>Save Sale</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Recent Sales</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Sale #</TableHead><TableHead>Customer</TableHead><TableHead>Item</TableHead><TableHead>Total</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>{recentSales.map((sale) => <TableRow key={sale.sale_no}><TableCell>{sale.sale_no}</TableCell><TableCell>{sale.customer}</TableCell><TableCell>{sale.item}</TableCell><TableCell>${sale.total.toLocaleString()}</TableCell><TableCell><StatusBadge status={sale.status} /></TableCell></TableRow>)}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
