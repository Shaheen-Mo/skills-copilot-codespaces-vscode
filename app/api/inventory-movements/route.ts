import { NextResponse } from "next/server";
import { getCurrentUserRole } from "@/lib/auth/get-user-role";
import { can } from "@/lib/permissions/can";
import { createInventoryMovementSchema } from "@/lib/validators/inventory";

export async function POST(request: Request) {
  const role = await getCurrentUserRole();
  if (!can(role, "inventory.movement.create")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const payload = createInventoryMovementSchema.parse(await request.json());
  return NextResponse.json({ ok: true, payload });
}
