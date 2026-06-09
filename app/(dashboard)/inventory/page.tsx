import { createInventoryMovementAction } from "./actions";
import { StatusBadge } from "@/components/tables/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requirePermission } from "@/lib/auth/require-permission";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

const movements = [
  { id: "MOV-2041", sku: "SOFA-L-001", location: "Main Warehouse", type: "reserve_out", qty: 1, time: "Today 10:22" },
  { id: "MOV-2042", sku: "BED-Q-009", location: "Store A", type: "sold_out_delivery", qty: 1, time: "Today 12:40" },
];

export default async function InventoryPage() {
  if (isSupabaseConfigured()) await requirePermission("page.inventory.view");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Inventory Movements</h2>
        <p className="text-sm text-muted-foreground">Post stock changes through the inventory ledger. Balances are derived from movements.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Post Movement</CardTitle></CardHeader>
        <CardContent>
          <form action={createInventoryMovementAction} className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Movement Type</Label>
              <NativeSelect name="movement_type" defaultValue="stock_in_purchase">
                <option value="stock_in_purchase">Stock in purchase</option>
                <option value="stock_in_adjustment">Stock in adjustment</option>
                <option value="reserve_out">Reserve out</option>
                <option value="reserve_release">Reserve release</option>
                <option value="damage_out">Damage out</option>
              </NativeSelect>
            </div>
            <input type="hidden" name="product_variant_id" value="00000000-0000-4000-8000-000000000101" />
            <input type="hidden" name="location_id" value="00000000-0000-4000-8000-000000000001" />
            <div className="space-y-2 md:col-span-2">
              <Label>Product Variant</Label>
              <Input value="SOFA-L-001 · Walnut L-Shape Sofa" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty">Qty</Label>
              <Input id="qty" name="qty" type="number" min="1" defaultValue="1" />
            </div>
            <div className="space-y-2 md:col-span-4">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" name="notes" placeholder="Receiving PO, correction reason, or transfer note" />
            </div>
            <div className="flex justify-end md:col-span-4"><Button>Post Movement</Button></div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Recent Ledger Entries</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>SKU</TableHead><TableHead>Location</TableHead><TableHead>State</TableHead><TableHead>Qty</TableHead><TableHead>Time</TableHead></TableRow></TableHeader>
            <TableBody>{movements.map((movement) => <TableRow key={movement.id}><TableCell>{movement.id}</TableCell><TableCell>{movement.sku}</TableCell><TableCell>{movement.location}</TableCell><TableCell><StatusBadge status={movement.type === "reserve_out" ? "reserved" : "completed"} /></TableCell><TableCell>{movement.qty}</TableCell><TableCell>{movement.time}</TableCell></TableRow>)}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
