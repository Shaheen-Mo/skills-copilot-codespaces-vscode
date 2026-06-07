import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserRole } from "@/lib/auth/get-user-role";
import { can } from "@/lib/permissions/can";

const schema = z.object({ location_id: z.string().uuid(), counted_cash: z.coerce.number().nonnegative() });

export async function POST(request: Request) {
  const role = await getCurrentUserRole();
  if (!can(role, "finance.cash_close")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const payload = schema.parse(await request.json());
  return NextResponse.json({ ok: true, payload });
}
