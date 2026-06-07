import { StatusBadge } from "@/components/tables/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requirePermission } from "@/lib/auth/require-permission";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

const applications = [
  { id: "CA-1001", customer: "Maria Santos", item: "L-Shape Sofa Set", requested: 1150, term: 12, score: 74, status: "under_review" },
  { id: "CA-1002", customer: "Joel Reyes", item: "Queen Storage Bed", requested: 720, term: 6, score: 82, status: "approved" },
];

export default async function CreditPage() {
  if (isSupabaseConfigured()) await requirePermission("page.credit.view");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Credit Application Review</h2>
        <p className="text-sm text-muted-foreground">Approve or reject installment applications before creating credit accounts.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Applications Queue</CardTitle></CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Application</TableHead><TableHead>Customer</TableHead><TableHead>Furniture</TableHead><TableHead>Requested</TableHead><TableHead>Term</TableHead><TableHead>Score</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>{applications.map((app) => <TableRow key={app.id}><TableCell>{app.id}</TableCell><TableCell>{app.customer}</TableCell><TableCell>{app.item}</TableCell><TableCell>${app.requested.toLocaleString()}</TableCell><TableCell>{app.term} mo</TableCell><TableCell>{app.score}</TableCell><TableCell><StatusBadge status={app.status} /></TableCell><TableCell className="space-x-2 text-right"><Button size="sm" variant="secondary">View</Button><Button size="sm">Approve</Button><Button size="sm" variant="destructive">Reject</Button></TableCell></TableRow>)}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
