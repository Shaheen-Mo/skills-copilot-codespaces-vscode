import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserRole } from "@/lib/auth/get-user-role";
import { can } from "@/lib/permissions/can";

const schema = z.object({ delivery_id: z.string().uuid(), status: z.enum(["scheduled", "out_for_delivery", "completed", "failed"]) });

export async function PATCH(request: Request) {
  const role = await getCurrentUserRole();
  if (!can(role, "delivery.complete")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const payload = schema.parse(await request.json());
  return NextResponse.json({ ok: true, payload });
}
