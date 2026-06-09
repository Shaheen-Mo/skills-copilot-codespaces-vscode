import { NextResponse } from "next/server";
import { createSaleSchema } from "@/lib/validators/sales";
import { can } from "@/lib/permissions/can";
import { getCurrentUserRole } from "@/lib/auth/get-user-role";

export async function POST(request: Request) {
  const role = await getCurrentUserRole();
  if (!can(role, "sales.create")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const payload = createSaleSchema.parse(await request.json());
  return NextResponse.json({ ok: true, payload });
}
